import React, { useState, useEffect } from 'react';
import { Upload, CheckCircle, AlertCircle, Loader2, Image, RefreshCw } from 'lucide-react';

const API = process.env.REACT_APP_BACKEND_URL + '/api';

const ImageMigration = () => {
  const [status, setStatus] = useState(null);
  const [migrating, setMigrating] = useState(false);
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
          <h2 className="text-xl font-semibold mb-4">Start Migratie</h2>
          <p className="text-gray-400 mb-4">
            Klik op de knop hieronder om alle afbeeldingen te uploaden naar Emergent Object Storage.
            Dit kan enkele minuten duren afhankelijk van het aantal afbeeldingen.
          </p>
          
          <button
            onClick={startMigration}
            disabled={migrating}
            className={`w-full py-4 rounded-lg font-semibold text-lg flex items-center justify-center gap-3 transition-colors ${
              migrating
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
                Start Migratie naar Object Storage
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
              <h2 className="text-xl font-semibold">Migratie Resultaat</h2>
            </div>
            
            <div className="grid grid-cols-3 gap-4 mb-4">
              <div className="bg-green-900/30 border border-green-500 rounded-lg p-4 text-center">
                <div className="text-2xl font-bold text-green-400">{result.success}</div>
                <div className="text-sm text-gray-400">Gelukt</div>
              </div>
              <div className="bg-yellow-900/30 border border-yellow-500 rounded-lg p-4 text-center">
                <div className="text-2xl font-bold text-yellow-400">{result.skipped}</div>
                <div className="text-sm text-gray-400">Overgeslagen</div>
              </div>
              <div className="bg-red-900/30 border border-red-500 rounded-lg p-4 text-center">
                <div className="text-2xl font-bold text-red-400">{result.failed}</div>
                <div className="text-sm text-gray-400">Mislukt</div>
              </div>
            </div>

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
          </div>
        )}

        {/* Instructions */}
        <div className="mt-8 bg-gray-800 rounded-xl p-6">
          <h2 className="text-xl font-semibold mb-4">Instructies</h2>
          <ol className="list-decimal list-inside space-y-2 text-gray-300">
            <li>Controleer eerst of de Storage Actief status groen is (✓)</li>
            <li>Klik op "Start Migratie" om alle afbeeldingen te uploaden</li>
            <li>Wacht tot de migratie is voltooid (dit kan enkele minuten duren)</li>
            <li>Na succesvolle migratie worden afbeeldingen automatisch vanuit Object Storage geserveerd</li>
          </ol>
        </div>
      </div>
    </div>
  );
};

export default ImageMigration;
