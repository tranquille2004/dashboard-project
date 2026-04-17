import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSiteAdmin } from '@/contexts/SiteAdminContext';
import { Mail, Lock, AlertCircle } from 'lucide-react';

const SiteAdminLogin = ({ preSelectedSite }) => {
  const { login } = useSiteAdmin();
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      await login(email, password);
      navigate('/mijn-site');
    } catch (err) {
      setError(err.response?.data?.detail || 'Error al iniciar sesión. Verifique sus datos.');
    } finally {
      setLoading(false);
    }
  };

  const siteNames = {
    'cantina': 'La Cantina Italiana',
    'bottega': 'La Bottega Herent',
    'ascoli': "L'Ascoli Zaventem",
    'mercato': 'Ristorante Mercato',
    'tracemaster': 'Tracemaster',
    'theobeans': 'Theo Beans Export',
    'hoteldelpacifico': 'Hotel del Pacífico'
  };
  const siteName = preSelectedSite ? siteNames[preSelectedSite] || preSelectedSite : null;
  const isHotel = preSelectedSite === 'hoteldelpacifico';

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        <div className="bg-white rounded-2xl shadow-xl p-8">
          <div className="text-center mb-8">
            {siteName ? (
              <>
                <h1 className="text-2xl font-bold text-gray-900">{siteName}</h1>
                <p className="text-gray-600 mt-2">{isHotel ? 'Administración' : 'Administración'}</p>
              </>
            ) : (
              <>
                <h1 className="text-2xl font-bold text-gray-900">Iniciar Sesión</h1>
                <p className="text-gray-600 mt-2">Inicie sesión para administrar su sitio web</p>
              </>
            )}
          </div>

          {error && (
            <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg flex items-center space-x-3 text-red-700">
              <AlertCircle className="w-5 h-5 flex-shrink-0" />
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Correo electrónico</label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="admin@ejemplo.com"
                  required
                  data-testid="site-admin-email"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Contraseña</label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="••••••••"
                  required
                  data-testid="site-admin-password"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              data-testid="site-admin-login-btn"
            >
              {loading ? 'Iniciando sesión...' : 'Iniciar Sesión'}
            </button>
          </form>

          <div className="mt-6 text-center text-sm text-gray-500">
            <p>¿Problemas para acceder? Contacte al administrador.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SiteAdminLogin;
