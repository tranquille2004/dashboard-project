import React, { useState, useEffect } from 'react';
import { Upload, CheckCircle, AlertCircle, Loader2, Image, RefreshCw, Download, Database } from 'lucide-react';

// Use current origin for API calls - works on both preview and production
const API = window.location.origin + '/api';

// Hardcoded records from preview - all 874 images that are in Object Storage
const PREVIEW_RECORDS_URL = 'https://image-restore-21.preview.emergentagent.com/api/admin/migrate/export-records';

const ImageMigration = () => {
  const [status, setStatus] = useState(null);
  const [migrating, setMigrating] = useState(false);
  const [importing, setImporting] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);

  const fetchStatus = async () => {
    try {
      const res = await fetch(`${API}/admin/migrate/status`);
      const data = await res.json();
      setStatus(data);
    } catch (e) {
      setError('Kon status niet ophalen');
    }
  };

  useEffect(() => {
    fetchStatus();
  }, []);

  const startMigration = async () => {
    setMigrating(true);
    setError(null);
    setResult(null);
    
    try {
      const res = await fetch(`${API}/admin/migrate/start`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' }
      });
      const data = await res.json();
      
      if (res.ok) {
        setResult(data);
        fetchStatus();
      } else {
        setError(data.detail || 'Migratie mislukt');
      }
    } catch (e) {
      setError('Netwerk fout: ' + e.message);
    } finally {
      setMigrating(false);
    }
  };

  const importFromPreview = async () => {
    setImporting(true);
    setError(null);
    setResult(null);
    
    try {
      // First, fetch records from preview
      let exportRes;
      try {
        exportRes = await fetch(PREVIEW_RECORDS_URL);
      } catch (fetchErr) {
        throw new Error(`Kon preview niet bereiken: ${fetchErr.message}`);
      }
      
      if (!exportRes.ok) {
        throw new Error(`Preview gaf HTTP ${exportRes.status}`);
      }
      
      const contentType = exportRes.headers.get('content-type') || '';
      if (!contentType.includes('application/json')) {
        const text = await exportRes.text();
        throw new Error(`Preview gaf geen JSON terug (${contentType}). Eerste 80 chars: ${text.substring(0, 80)}`);
      }
      
      const exportData = await exportRes.json();
      
      if (!exportData.records || exportData.records.length === 0) {
        throw new Error('Geen records gevonden in preview');
      }
      
      // Import in batches of 200 to avoid Cloudflare 520 / timeout
      const BATCH_SIZE = 200;
      const records = exportData.records;
      let totalImported = 0;
      let totalSkipped = 0;
      const batches = Math.ceil(records.length / BATCH_SIZE);
      
      for (let i = 0; i < batches; i++) {
        const batch = records.slice(i * BATCH_SIZE, (i + 1) * BATCH_SIZE);
        
        const importRes = await fetch(`${API}/admin/migrate/import-records`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ records: batch })
        });
        
        if (!importRes.ok) {
          const errText = await importRes.text();
          throw new Error(`Batch ${i + 1}/${batches} faalde (HTTP ${importRes.status}): ${errText.substring(0, 120)}`);
        }
        
        const importCT = importRes.headers.get('content-type') || '';
        if (!importCT.includes('application/json')) {
          const text = await importRes.text();
          throw new Error(`Batch ${i + 1}/${batches} gaf geen JSON (${importCT}). Eerste 80 chars: ${text.substring(0, 80)}`);
        }
        
        const importData = await importRes.json();
        totalImported += importData.imported || 0;
        totalSkipped += importData.skipped || 0;
        
        // Update progress
        setResult({
          message: `Bezig... batch ${i + 1} van ${batches} voltooid`,
          imported: totalImported,
          skipped: totalSkipped,
          total_from_preview: records.length,
          source: 'preview import',
          progress: true
        });
      }
      
      setResult({
        message: 'Import complete',
        imported: totalImported,
        skipped: totalSkipped,
        total_from_preview: records.length,
        source: 'preview import'
      });
      fetchStatus();
    } catch (e) {
      setError('Import fout: ' + e.message);
    } finally {
      setImporting(false);
    }
  };

  const syncAll = async () => {
    setMigrating(true);
    setImporting(true);
    setError(null);
    setResult(null);

    const summary = {
      message: 'Synchronisatie compleet',
      source: 'sync-all',
      uploaded: 0,        // newly uploaded from local
      skipped_upload: 0,  // already in storage (local migration)
      failed_upload: 0,
      imported: 0,        // records imported from preview
      skipped_import: 0,
      step: '',
    };

    try {
      // ============================================================
      // STEP 1: Upload local files from THIS environment to storage
      // ============================================================
      summary.step = 'Stap 1/2: Lokale bestanden naar Object Storage uploaden...';
      setResult({ ...summary, progress: true });

      const localRes = await fetch(`${API}/admin/migrate/start`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' }
      });
      if (!localRes.ok) {
        const txt = await localRes.text();
        throw new Error(`Lokale migratie HTTP ${localRes.status}: ${txt.substring(0, 100)}`);
      }
      const localData = await localRes.json();
      summary.uploaded = localData.success || 0;
      summary.skipped_upload = localData.skipped || 0;
      summary.failed_upload = localData.failed || 0;

      // ============================================================
      // STEP 2: Import any missing records from preview
      // ============================================================
      summary.step = 'Stap 2/2: Records van preview ophalen...';
      setResult({ ...summary, progress: true });

      const exportRes = await fetch(PREVIEW_RECORDS_URL);
      if (!exportRes.ok) {
        throw new Error(`Preview onbereikbaar (HTTP ${exportRes.status})`);
      }
      const exportData = await exportRes.json();
      const records = exportData.records || [];

      if (records.length === 0) {
        throw new Error('Geen records gevonden in preview');
      }

      const BATCH_SIZE = 200;
      const batches = Math.ceil(records.length / BATCH_SIZE);
      for (let i = 0; i < batches; i++) {
        const batch = records.slice(i * BATCH_SIZE, (i + 1) * BATCH_SIZE);
        const importRes = await fetch(`${API}/admin/migrate/import-records`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ records: batch })
        });
        if (!importRes.ok) {
          throw new Error(`Batch ${i + 1}/${batches} faalde (HTTP ${importRes.status})`);
        }
        const importData = await importRes.json();
        summary.imported += importData.imported || 0;
        summary.skipped_import += importData.skipped || 0;
        summary.step = `Stap 2/2: Batch ${i + 1}/${batches} voltooid...`;
        setResult({ ...summary, progress: true });
      }

      summary.step = '';
      setResult(summary);
      fetchStatus();
    } catch (e) {
      setError('Synchronisatie fout: ' + e.message);
    } finally {
      setMigrating(false);
      setImporting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-2 flex items-center gap-3">
          <Image className="w-8 h-8" />
          Afbeeldingen Synchronisatie
        </h1>
        <p className="text-gray-400 mb-8">
          Eén klik om alle nieuwe afbeeldingen + records bij te werken in productie
        </p>

        {/* Status Card */}
        <div className="bg-gray-800 rounded-xl p-6 mb-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold">Huidige Status</h2>
            <button
              onClick={fetchStatus}
              className="text-gray-400 hover:text-white transition-colors"
              data-testid="refresh-status-btn"
            >
              <RefreshCw className="w-5 h-5" />
            </button>
          </div>
          {status ? (
            <div className="grid grid-cols-3 gap-4">
              <div className="bg-gray-700 rounded-lg p-4 text-center">
                <div className="text-3xl font-bold text-blue-400">{status.local_count || 0}</div>
                <div className="text-sm text-gray-400">Lokale afbeeldingen</div>
              </div>
              <div className="bg-gray-700 rounded-lg p-4 text-center">
                <div className="text-3xl font-bold text-green-400">{status.migrated_count || 0}</div>
                <div className="text-sm text-gray-400">In Object Storage</div>
              </div>
              <div className="bg-gray-700 rounded-lg p-4 text-center">
                <div className={`text-3xl font-bold ${status.storage_initialized ? 'text-green-400' : 'text-red-400'}`}>
                  {status.storage_initialized ? '✓' : '✗'}
                </div>
                <div className="text-sm text-gray-400">Storage Actief</div>
              </div>
            </div>
          ) : (
            <div className="text-center py-4 text-gray-400">Laden...</div>
          )}
        </div>

        {/* ONE BIG SYNC BUTTON */}
        <div className="bg-gradient-to-br from-purple-900/60 to-blue-900/60 border-2 border-purple-500 rounded-2xl p-8 mb-6">
          <h2 className="text-2xl font-bold mb-3 flex items-center gap-3">
            <Database className="w-7 h-7 text-purple-400" />
            Synchroniseer Alles
          </h2>
          <p className="text-gray-300 mb-6 leading-relaxed">
            Eén klik die alles regelt:<br />
            <span className="text-purple-200">1.</span> Upload nieuwe afbeeldingen vanaf deze server naar Object Storage<br />
            <span className="text-purple-200">2.</span> Synchroniseer database records van preview (zodat alle foto's beschikbaar zijn)
          </p>
          <button
            onClick={syncAll}
            disabled={migrating || importing}
            data-testid="sync-all-btn"
            className={`w-full py-5 rounded-xl font-bold text-xl flex items-center justify-center gap-3 transition-all shadow-lg ${
              migrating || importing
                ? 'bg-gray-600 cursor-not-allowed'
                : 'bg-purple-600 hover:bg-purple-700 hover:shadow-purple-500/30 hover:scale-[1.01]'
            }`}
          >
            {(migrating || importing) ? (
              <>
                <Loader2 className="w-7 h-7 animate-spin" />
                Synchronisatie bezig...
              </>
            ) : (
              <>
                <Upload className="w-7 h-7" />
                Synchroniseer Alles
              </>
            )}
          </button>
          {(migrating || importing) && result?.step && (
            <p className="text-center text-purple-200 mt-4 text-sm">{result.step}</p>
          )}
        </div>

        {/* Error */}
        {error && (
          <div className="bg-red-900/50 border border-red-500 rounded-xl p-6 mb-6">
            <div className="flex items-center gap-3 text-red-400">
              <AlertCircle className="w-6 h-6" />
              <span className="font-semibold">Fout</span>
            </div>
            <p className="mt-2 text-red-300">{error}</p>
          </div>
        )}

        {/* Results */}
        {result && !result.progress && (
          <div className="bg-gray-800 rounded-xl p-6">
            <div className="flex items-center gap-3 mb-4">
              <CheckCircle className="w-6 h-6 text-green-400" />
              <h2 className="text-xl font-semibold">Synchronisatie Resultaat</h2>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
              <div className="bg-green-900/30 border border-green-500 rounded-lg p-4 text-center">
                <div className="text-2xl font-bold text-green-400">{result.uploaded || 0}</div>
                <div className="text-xs text-gray-400">Nieuw geüpload</div>
              </div>
              <div className="bg-blue-900/30 border border-blue-500 rounded-lg p-4 text-center">
                <div className="text-2xl font-bold text-blue-400">{result.imported || 0}</div>
                <div className="text-xs text-gray-400">Records geïmporteerd</div>
              </div>
              <div className="bg-yellow-900/30 border border-yellow-500 rounded-lg p-4 text-center">
                <div className="text-2xl font-bold text-yellow-400">{(result.skipped_upload || 0) + (result.skipped_import || 0)}</div>
                <div className="text-xs text-gray-400">Al aanwezig</div>
              </div>
              <div className="bg-red-900/30 border border-red-500 rounded-lg p-4 text-center">
                <div className="text-2xl font-bold text-red-400">{result.failed_upload || 0}</div>
                <div className="text-xs text-gray-400">Mislukt</div>
              </div>
            </div>

            <div className="mt-4 p-4 bg-green-900/20 border border-green-500 rounded-lg">
              <p className="text-green-300">
                ✅ Alle afbeeldingen zijn nu beschikbaar in productie. Ververs uw website om ze te zien.
              </p>
            </div>
          </div>
        )}

        {/* Instructions */}
        <div className="mt-8 bg-gray-800 rounded-xl p-6">
          <h2 className="text-xl font-semibold mb-4">Wanneer gebruik je deze knop?</h2>
          <ol className="list-decimal list-inside space-y-2 text-gray-300">
            <li>Na elke <strong>Deploy</strong> waarbij nieuwe afbeeldingen of video's zijn toegevoegd</li>
            <li>Als foto's op uw site een zwart kader of 404 fout tonen</li>
            <li>Eén klik regelt alles: upload + records sync</li>
          </ol>
        </div>
      </div>
    </div>
  );
};

export default ImageMigration;
