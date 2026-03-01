import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Globe, Users, Menu, Shield, ChevronRight, Zap, BarChart } from 'lucide-react';

const LandingPage = () => {
  const { user, login, loading } = useAuth();

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      {/* Header */}
      <header className="fixed top-0 w-full z-50 bg-slate-900/80 backdrop-blur-md border-b border-slate-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <div className="flex items-center space-x-3">
            <Globe className="w-8 h-8 text-blue-500" />
            <span className="text-xl font-bold text-white">WebPlatform</span>
          </div>
          <div>
            {loading ? (
              <div className="w-8 h-8 border-2 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
            ) : user ? (
              <Link
                to="/admin"
                className="flex items-center space-x-2 bg-blue-600 text-white px-6 py-2.5 rounded-lg font-medium hover:bg-blue-700 transition-all"
                data-testid="dashboard-link"
              >
                <span>Dashboard</span>
                <ChevronRight className="w-4 h-4" />
              </Link>
            ) : (
              <button
                onClick={login}
                className="flex items-center space-x-2 bg-blue-600 text-white px-6 py-2.5 rounded-lg font-medium hover:bg-blue-700 transition-all hover:shadow-lg hover:shadow-blue-500/25"
                data-testid="login-btn"
              >
                <span>Inloggen met Google</span>
              </button>
            )}
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="pt-32 pb-20 px-4">
        <div className="max-w-5xl mx-auto text-center">
          <div className="inline-flex items-center space-x-2 bg-blue-500/10 border border-blue-500/30 rounded-full px-4 py-2 mb-8">
            <Zap className="w-4 h-4 text-blue-400" />
            <span className="text-blue-400 text-sm font-medium">Multi-tenant Website Platform</span>
          </div>
          
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">
            Al je websites
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400"> op één plek</span>
          </h1>
          
          <p className="text-xl text-slate-400 mb-10 max-w-2xl mx-auto">
            Beheer meerdere websites vanuit één dashboard. Restaurants, bedrijven, portfolio's - 
            alles gecombineerd met slechts één hosting.
          </p>
          
          {user ? (
            <Link
              to="/admin"
              className="inline-flex items-center space-x-2 bg-gradient-to-r from-blue-600 to-cyan-600 text-white px-8 py-4 rounded-xl font-semibold text-lg hover:shadow-xl hover:shadow-blue-500/25 transition-all transform hover:scale-105"
            >
              <span>Naar Dashboard</span>
              <ChevronRight className="w-5 h-5" />
            </Link>
          ) : (
            <button
              onClick={login}
              className="inline-flex items-center space-x-2 bg-gradient-to-r from-blue-600 to-cyan-600 text-white px-8 py-4 rounded-xl font-semibold text-lg hover:shadow-xl hover:shadow-blue-500/25 transition-all transform hover:scale-105"
              data-testid="hero-login-btn"
            >
              <span>Start Nu - Gratis</span>
              <ChevronRight className="w-5 h-5" />
            </button>
          )}
        </div>
      </section>

      {/* Features */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-slate-800/50 border border-slate-700 rounded-2xl p-8 hover:border-blue-500/50 transition-colors">
              <div className="w-14 h-14 bg-blue-500/10 rounded-xl flex items-center justify-center mb-6">
                <Globe className="w-7 h-7 text-blue-500" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-3">Meerdere Domeinen</h3>
              <p className="text-slate-400">
                Koppel onbeperkt domeinen aan je websites. Elke klant ziet alleen zijn eigen site.
              </p>
            </div>

            <div className="bg-slate-800/50 border border-slate-700 rounded-2xl p-8 hover:border-green-500/50 transition-colors">
              <div className="w-14 h-14 bg-green-500/10 rounded-xl flex items-center justify-center mb-6">
                <Menu className="w-7 h-7 text-green-500" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-3">Restaurant Features</h3>
              <p className="text-slate-400">
                Menu's, reserveringen, afhaalbestellingen - alles wat een restaurant nodig heeft.
              </p>
            </div>

            <div className="bg-slate-800/50 border border-slate-700 rounded-2xl p-8 hover:border-purple-500/50 transition-colors">
              <div className="w-14 h-14 bg-purple-500/10 rounded-xl flex items-center justify-center mb-6">
                <Users className="w-7 h-7 text-purple-500" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-3">Elk Type Bedrijf</h3>
              <p className="text-slate-400">
                Niet alleen restaurants - ook kappers, tandartsen, winkels en meer.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-20 px-4 border-t border-slate-800">
        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-3 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold text-white mb-2">1</div>
              <div className="text-slate-400">Hosting</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-white mb-2">∞</div>
              <div className="text-slate-400">Websites</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-white mb-2">€€€</div>
              <div className="text-slate-400">Besparing</div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-4 border-t border-slate-800">
        <div className="max-w-6xl mx-auto text-center text-slate-500 text-sm">
          <p>© {new Date().getFullYear()} WebPlatform. Alle rechten voorbehouden.</p>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
