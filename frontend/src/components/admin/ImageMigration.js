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

  return (
    <div className="min-h-screen bg-gray-900 text-white p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-2 flex items-center gap-3">
          <Image className="w-8 h-8" />
          Afbeeldingen Migratie
        </h1>
        <p className="text-gray-400 mb-8">
          Migreer alle lokale afbeeldingen naar Emergent Object Storage
        </p>

        {/* Status Card */}
        <div className="bg-gray-800 rounded-xl p-6 mb-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold">Huidige Status</h2>
            <button
              onClick={fetchStatus}
              className="text-gray-400 hover:text-white transition-colors"
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
                <div className="text-sm text-gray-400">Gemigreerd</div>
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

        {/* Migration Button */}
        <div className="bg-gray-800 rounded-xl p-6 mb-6">
          <h2 className="text-xl font-semibold mb-4">Optie 1: Lokale Migratie</h2>
          <p className="text-gray-400 mb-4">
            Upload afbeeldingen die lokaal op deze server staan naar Object Storage.
            (Werkt alleen als er lokale afbeeldingen zijn)
          </p>
          
          <button
            onClick={startMigration}
            disabled={migrating || importing}
            className={`w-full py-4 rounded-lg font-semibold text-lg flex items-center justify-center gap-3 transition-colors ${
              migrating || importing
                ? 'bg-gray-600 cursor-not-allowed'
                : 'bg-blue-600 hover:bg-blue-700'
            }`}
          >
            {migrating ? (
              <>
                <Loader2 className="w-6 h-6 animate-spin" />
                Migratie bezig... Dit kan enkele minuten duren
              </>
            ) : (
              <>
                <Upload className="w-6 h-6" />
                Start Lokale Migratie
              </>
            )}
          </button>
        </div>

        {/* Import from Preview Button */}
        <div className="bg-gradient-to-r from-purple-900/50 to-blue-900/50 border border-purple-500 rounded-xl p-6 mb-6">
          <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
            <Database className="w-6 h-6 text-purple-400" />
            Optie 2: Importeer van Preview (AANBEVOLEN)
          </h2>
          <p className="text-gray-300 mb-4">
            De afbeeldingen zijn al geüpload naar Object Storage vanuit de preview omgeving.
            Klik hieronder om de database records te importeren zodat productie weet waar de afbeeldingen staan.
          </p>
          
          <button
            onClick={importFromPreview}
            disabled={migrating || importing}
            className={`w-full py-4 rounded-lg font-semibold text-lg flex items-center justify-center gap-3 transition-colors ${
              migrating || importing
                ? 'bg-gray-600 cursor-not-allowed'
                : 'bg-purple-600 hover:bg-purple-700'
            }`}
          >
            {importing ? (
              <>
                <Loader2 className="w-6 h-6 animate-spin" />
                Records importeren...
              </>
            ) : (
              <>
                <Download className="w-6 h-6" />
                Importeer Records van Preview
              </>
            )}
          </button>
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
        {result && (
          <div className="bg-gray-800 rounded-xl p-6">
            <div className="flex items-center gap-3 mb-4">
              <CheckCircle className="w-6 h-6 text-green-400" />
              <h2 className="text-xl font-semibold">
                {result.source === 'preview import' ? 'Import Resultaat' : 'Migratie Resultaat'}
              </h2>
            </div>
            
            {result.source === 'preview import' ? (
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div className="bg-green-900/30 border border-green-500 rounded-lg p-4 text-center">
                  <div className="text-2xl font-bold text-green-400">{result.imported || 0}</div>
                  <div className="text-sm text-gray-400">Geïmporteerd</div>
                </div>
                <div className="bg-yellow-900/30 border border-yellow-500 rounded-lg p-4 text-center">
                  <div className="text-2xl font-bold text-yellow-400">{result.skipped || 0}</div>
                  <div className="text-sm text-gray-400">Al aanwezig</div>
                </div>
              </div>
            ) : (
              <div className="grid grid-cols-3 gap-4 mb-4">
                <div className="bg-green-900/30 border border-green-500 rounded-lg p-4 text-center">
                  <div className="text-2xl font-bold text-green-400">{result.success || 0}</div>
                  <div className="text-sm text-gray-400">Gelukt</div>
                </div>
                <div className="bg-yellow-900/30 border border-yellow-500 rounded-lg p-4 text-center">
                  <div className="text-2xl font-bold text-yellow-400">{result.skipped || 0}</div>
                  <div className="text-sm text-gray-400">Overgeslagen</div>
                </div>
                <div className="bg-red-900/30 border border-red-500 rounded-lg p-4 text-center">
                  <div className="text-2xl font-bold text-red-400">{result.failed || 0}</div>
                  <div className="text-sm text-gray-400">Mislukt</div>
                </div>
              </div>
            )}

            {result.errors && result.errors.length > 0 && (
              <div className="mt-4">
                <h3 className="font-semibold mb-2 text-red-400">Fouten:</h3>
                <div className="bg-gray-900 rounded-lg p-4 max-h-40 overflow-y-auto">
                  {result.errors.map((err, i) => (
                    <div key={i} className="text-sm text-red-300 mb-1">{err}</div>
                  ))}
                </div>
              </div>
            )}
            
            {result.source === 'preview import' && result.imported > 0 && (
              <div className="mt-4 p-4 bg-green-900/20 border border-green-500 rounded-lg">
                <p className="text-green-300">
                  ✅ Succes! De afbeeldingen worden nu geserveerd vanuit Object Storage.
                  Ververs uw website om de foto's te zien.
                </p>
              </div>
            )}
          </div>
        )}

        {/* Instructions */}
        <div className="mt-8 bg-gray-800 rounded-xl p-6">
          <h2 className="text-xl font-semibold mb-4">Instructies</h2>
          <ol className="list-decimal list-inside space-y-2 text-gray-300">
            <li><strong>Voor PRODUCTIE:</strong> Klik op "Importeer 874 Records van Preview" (paarse knop)</li>
            <li>Dit haalt de database records op van de preview omgeving</li>
            <li>De afbeeldingen staan al in Object Storage - alleen de records moeten worden gesynchroniseerd</li>
            <li>Na succes worden alle afbeeldingen automatisch geladen op uw websites</li>
          </ol>
        </div>
      </div>
    </div>
  );
};

export default ImageMigration;
