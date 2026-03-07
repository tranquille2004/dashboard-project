import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '@/contexts/AuthContext';
import { 
  Plus, Settings, Image, Menu, Users, Globe, LogOut, 
  ChevronRight, Trash2, Edit, Eye, Clock, Phone, Mail,
  BarChart2, X, MapPin
} from 'lucide-react';

const API = process.env.REACT_APP_BACKEND_URL + '/api';
const FWORKS_LOGO = 'https://customer-assets.emergentagent.com/job_c5f93e02-948a-4de4-99bb-a726a04220a7/artifacts/d9j7q5w4_fworksbuilders4.gif';

// Admin Dashboard Translations
const translations = {
  fr: {
    title: 'Plateforme Web',
    logout: 'Déconnexion',
    totalSites: 'Total Sites Web',
    restaurants: 'Restaurants',
    otherBusiness: 'Autres Entreprises',
    mySites: 'Mes Sites Web',
    newSite: 'Nouveau Site',
    noSites: 'Pas encore de sites',
    clickToStart: 'Cliquez sur "Nouveau Site" pour commencer',
    manage: 'Gérer',
    name: 'Nom',
    slug: 'Slug (URL)',
    type: 'Type',
    restaurant: 'Restaurant',
    business: 'Autre Entreprise',
    cancel: 'Annuler',
    create: 'Créer',
    confirmDelete: 'Êtes-vous sûr de vouloir supprimer ce site?',
    visitors: 'Visiteurs',
    today: "Aujourd'hui",
    week: 'Semaine',
    month: 'Mois',
    total: 'Total',
    statistics: 'Statistiques',
    uniqueVisitors: 'Visiteurs uniques',
    byCountry: 'Par pays',
    dailyVisits: 'Visites quotidiennes',
    recentVisitors: 'Visiteurs récents',
    noData: 'Pas de données'
  },
  nl: {
    title: 'Website Platform',
    logout: 'Uitloggen',
    totalSites: 'Totaal Websites',
    restaurants: 'Restaurants',
    otherBusiness: 'Andere Bedrijven',
    mySites: 'Mijn Websites',
    newSite: 'Nieuwe Website',
    noSites: 'Nog geen websites',
    clickToStart: 'Klik op "Nieuwe Website" om te beginnen',
    manage: 'Beheren',
    name: 'Naam',
    slug: 'Slug (URL)',
    type: 'Type',
    restaurant: 'Restaurant',
    business: 'Ander Bedrijf',
    cancel: 'Annuleren',
    create: 'Aanmaken',
    confirmDelete: 'Weet je zeker dat je deze site wilt verwijderen?',
    visitors: 'Bezoekers',
    today: 'Vandaag',
    week: 'Week',
    month: 'Maand',
    total: 'Totaal',
    statistics: 'Statistieken',
    uniqueVisitors: 'Unieke bezoekers',
    byCountry: 'Per land',
    dailyVisits: 'Dagelijkse bezoeken',
    recentVisitors: 'Recente bezoekers',
    noData: 'Geen gegevens'
  },
  en: {
    title: 'Website Platform',
    logout: 'Log out',
    totalSites: 'Total Websites',
    restaurants: 'Restaurants',
    otherBusiness: 'Other Businesses',
    mySites: 'My Websites',
    newSite: 'New Website',
    noSites: 'No websites yet',
    clickToStart: 'Click "New Website" to get started',
    manage: 'Manage',
    name: 'Name',
    slug: 'Slug (URL)',
    type: 'Type',
    restaurant: 'Restaurant',
    business: 'Other Business',
    cancel: 'Cancel',
    create: 'Create',
    confirmDelete: 'Are you sure you want to delete this site?',
    visitors: 'Visitors',
    today: 'Today',
    week: 'Week',
    month: 'Month',
    total: 'Total',
    statistics: 'Statistics',
    uniqueVisitors: 'Unique visitors',
    byCountry: 'By country',
    dailyVisits: 'Daily visits',
    recentVisitors: 'Recent visitors',
    noData: 'No data'
  }
};

const AdminDashboard = () => {
  const { user, logout, loading: authLoading } = useAuth();
  const navigate = useNavigate();
  const [sites, setSites] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showNewSiteModal, setShowNewSiteModal] = useState(false);
  const [newSite, setNewSite] = useState({ name: '', slug: '', site_type: 'restaurant' });
  const [lang, setLang] = useState(() => localStorage.getItem('admin_lang') || 'fr');
  const [siteStats, setSiteStats] = useState({});
  const [showStatsModal, setShowStatsModal] = useState(false);
  const [selectedSiteStats, setSelectedSiteStats] = useState(null);
  const [loadingStats, setLoadingStats] = useState(false);

  const t = (key) => translations[lang]?.[key] || key;

  const openStatsModal = async (siteId) => {
    setLoadingStats(true);
    setShowStatsModal(true);
    try {
      const response = await axios.get(`${API}/admin/sites/${siteId}/stats`, { withCredentials: true });
      setSelectedSiteStats(response.data);
    } catch (error) {
      console.error('Error loading detailed stats:', error);
    } finally {
      setLoadingStats(false);
    }
  };

  useEffect(() => {
    localStorage.setItem('admin_lang', lang);
  }, [lang]);

  useEffect(() => {
    if (!authLoading && !user) {
      navigate('/');
    }
  }, [user, authLoading, navigate]);

  useEffect(() => {
    if (user) {
      loadSites();
    }
  }, [user]);

  const loadSites = async () => {
    try {
      const response = await axios.get(`${API}/admin/sites`, { withCredentials: true });
      setSites(response.data);
      
      // Load stats for all sites
      try {
        const statsResponse = await axios.get(`${API}/admin/all-stats`, { withCredentials: true });
        const statsMap = {};
        statsResponse.data.forEach(stat => {
          statsMap[stat.site_id] = stat;
        });
        setSiteStats(statsMap);
      } catch (statsError) {
        console.error('Error loading stats:', statsError);
      }
    } catch (error) {
      console.error('Error loading sites:', error);
    } finally {
      setLoading(false);
    }
  };

  const createSite = async () => {
    try {
      await axios.post(`${API}/admin/sites`, newSite, { withCredentials: true });
      setShowNewSiteModal(false);
      setNewSite({ name: '', slug: '', site_type: 'restaurant' });
      loadSites();
    } catch (error) {
      console.error('Error creating site:', error);
    }
  };

  const deleteSite = async (siteId) => {
    if (!window.confirm(t('confirmDelete'))) return;
    try {
      await axios.delete(`${API}/admin/sites/${siteId}`, { withCredentials: true });
      loadSites();
    } catch (error) {
      console.error('Error deleting site:', error);
    }
  };

  if (authLoading || loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (!user) return null;

  return (
    <div className="min-h-screen bg-gray-50" style={{ fontFamily: "'Poppins', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif" }}>
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 py-3 flex justify-between items-center">
          <div className="flex items-center space-x-4">
            <img src={FWORKS_LOGO} alt="fworks builders" className="h-10 w-auto" />
          </div>
          <div className="flex items-center space-x-3">
            {/* Language Switcher */}
            <div className="flex items-center space-x-1 bg-gray-100 rounded-md p-0.5">
              {['fr', 'nl', 'en'].map(l => (
                <button key={l} onClick={() => setLang(l)}
                  className={`px-2 py-1 rounded text-xs font-medium transition-colors ${lang === l ? 'bg-white shadow-sm text-gray-900' : 'text-gray-500 hover:text-gray-700'}`}>
                  {l.toUpperCase()}
                </button>
              ))}
            </div>
            <div className="flex items-center space-x-2">
              {user.picture && (
                <img src={user.picture} alt={user.name} className="w-7 h-7 rounded-full" />
              )}
              <span className="text-gray-600 text-sm">{user.name}</span>
            </div>
            <button
              onClick={logout}
              className="flex items-center space-x-1 text-gray-500 hover:text-gray-700 text-sm"
              data-testid="logout-btn"
            >
              <LogOut className="w-4 h-4" />
              <span>{t('logout')}</span>
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-4 sm:px-6 py-6">
        {/* Sites List */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200">
          <div className="px-4 py-3 border-b border-gray-200 flex justify-between items-center">
            <h2 className="text-lg font-semibold text-gray-800">{t('mySites')}</h2>
            <button
              onClick={() => setShowNewSiteModal(true)}
              className="flex items-center space-x-1.5 bg-blue-600 text-white px-3 py-1.5 rounded-md hover:bg-blue-700 transition-colors text-sm"
              data-testid="add-site-btn"
            >
              <Plus className="w-4 h-4" />
              <span>{t('newSite')}</span>
            </button>
          </div>
          
          {sites.length === 0 ? (
            <div className="p-8 text-center">
              <Globe className="w-12 h-12 text-gray-300 mx-auto mb-3" />
              <p className="text-gray-500">{t('noSites')}</p>
              <p className="text-gray-400 text-sm">{t('clickToStart')}</p>
            </div>
          ) : (
            <div className="divide-y divide-gray-100">
              {sites.map(site => (
                <div key={site.site_id} className="px-4 py-2 hover:bg-gray-50 transition-colors border-b border-gray-100 last:border-0">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 rounded-md flex items-center justify-center bg-blue-50">
                        <Globe className="w-4 h-4 text-blue-600" />
                      </div>
                      <div>
                        <h3 className="text-sm font-medium text-gray-900">{site.name}</h3>
                        <p className="text-gray-400 text-xs">
                          {site.domains?.length > 0 ? site.domains[0] : `/${site.slug}`}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-1">
                      <button
                        onClick={() => openStatsModal(site.site_id)}
                        className="p-1.5 text-gray-400 hover:text-purple-600 transition-colors"
                        title={t('statistics')}
                      >
                        <BarChart2 className="w-4 h-4" />
                      </button>
                      <Link
                        to={`/site/${site.slug}`}
                        target="_blank"
                        className="p-1.5 text-gray-400 hover:text-blue-600 transition-colors"
                        title="Preview"
                      >
                        <Eye className="w-4 h-4" />
                      </Link>
                      <Link
                        to={`/admin/sites/${site.site_id}`}
                        className="p-1.5 text-gray-400 hover:text-green-600 transition-colors"
                        title="Bewerken"
                      >
                        <Edit className="w-4 h-4" />
                      </Link>
                      <button
                        onClick={() => deleteSite(site.site_id)}
                        className="p-1.5 text-gray-400 hover:text-red-600 transition-colors"
                        title="Verwijderen"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                      <Link
                        to={`/admin/sites/${site.site_id}`}
                        className="flex items-center space-x-1 text-blue-600 hover:text-blue-800 text-sm ml-2"
                      >
                        <span>{t('manage')}</span>
                        <ChevronRight className="w-3 h-3" />
                      </Link>
                    </div>
                  </div>
                  {/* Compact Visitor Stats */}
                  {siteStats[site.site_id] && (
                    <div className="mt-1 ml-11 flex items-center space-x-3 text-xs">
                      <span className="text-gray-400">{t('visitors')}:</span>
                      <span className="text-green-600">{t('today')}: {siteStats[site.site_id].today}</span>
                      <span className="text-blue-600">{t('week')}: {siteStats[site.site_id].week}</span>
                      <span className="text-purple-600">{t('month')}: {siteStats[site.site_id].month}</span>
                      <span className="text-gray-500">{t('total')}: {siteStats[site.site_id].total}</span>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </main>

      {/* New Site Modal */}
      {showNewSiteModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-xl p-6 w-full max-w-md">
            <h3 className="text-xl font-semibold mb-4">{t('newSite')}</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">{t('name')}</label>
                <input
                  type="text"
                  value={newSite.name}
                  onChange={(e) => setNewSite({ ...newSite, name: e.target.value })}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="La Cantina Italiana"
                  data-testid="new-site-name"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">{t('slug')}</label>
                <input
                  type="text"
                  value={newSite.slug}
                  onChange={(e) => setNewSite({ ...newSite, slug: e.target.value.toLowerCase().replace(/\s+/g, '-') })}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="cantina"
                  data-testid="new-site-slug"
                />
              </div>
            </div>
            <div className="flex justify-end space-x-3 mt-6">
              <button
                onClick={() => setShowNewSiteModal(false)}
                className="px-4 py-2 text-gray-600 hover:text-gray-900"
              >
                {t('cancel')}
              </button>
              <button
                onClick={createSite}
                disabled={!newSite.name || !newSite.slug}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
                data-testid="create-site-btn"
              >
                {t('create')}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Statistics Modal */}
      {showStatsModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-white border-b px-6 py-4 flex items-center justify-between">
              <h2 className="text-xl font-semibold text-gray-900 flex items-center space-x-2">
                <BarChart2 className="w-5 h-5 text-purple-600" />
                <span>{t('statistics')}: {selectedSiteStats?.site_name || '...'}</span>
              </h2>
              <button onClick={() => setShowStatsModal(false)} className="p-1 hover:bg-gray-100 rounded">
                <X className="w-5 h-5" />
              </button>
            </div>
            
            {loadingStats ? (
              <div className="p-12 text-center text-gray-500">Loading...</div>
            ) : selectedSiteStats ? (
              <div className="p-6 space-y-6">
                {/* Overview Stats */}
                <div className="grid grid-cols-4 gap-4">
                  <div className="bg-green-50 rounded-lg p-4 text-center">
                    <p className="text-2xl font-bold text-green-600">{selectedSiteStats.stats?.today || 0}</p>
                    <p className="text-sm text-green-700">{t('today')}</p>
                  </div>
                  <div className="bg-blue-50 rounded-lg p-4 text-center">
                    <p className="text-2xl font-bold text-blue-600">{selectedSiteStats.stats?.week || 0}</p>
                    <p className="text-sm text-blue-700">{t('week')}</p>
                  </div>
                  <div className="bg-purple-50 rounded-lg p-4 text-center">
                    <p className="text-2xl font-bold text-purple-600">{selectedSiteStats.stats?.month || 0}</p>
                    <p className="text-sm text-purple-700">{t('month')}</p>
                  </div>
                  <div className="bg-gray-100 rounded-lg p-4 text-center">
                    <p className="text-2xl font-bold text-gray-700">{selectedSiteStats.stats?.total || 0}</p>
                    <p className="text-sm text-gray-600">{t('total')}</p>
                  </div>
                </div>

                {/* Countries */}
                <div>
                  <h3 className="text-sm font-semibold text-gray-700 mb-3 flex items-center space-x-2">
                    <MapPin className="w-4 h-4" />
                    <span>{t('byCountry')}</span>
                  </h3>
                  {selectedSiteStats.countries?.length > 0 ? (
                    <div className="bg-gray-50 rounded-lg p-4">
                      <div className="space-y-2">
                        {selectedSiteStats.countries.map((c, i) => (
                          <div key={i} className="flex items-center justify-between">
                            <span className="text-sm text-gray-700">{c.country}</span>
                            <span className="text-sm font-medium text-gray-900">{c.visitors} {t('visitors').toLowerCase()}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  ) : (
                    <p className="text-sm text-gray-500">{t('noData')}</p>
                  )}
                </div>

                {/* Daily Visits */}
                <div>
                  <h3 className="text-sm font-semibold text-gray-700 mb-3">{t('dailyVisits')} (7 {t('week').toLowerCase()})</h3>
                  {selectedSiteStats.daily?.length > 0 ? (
                    <div className="bg-gray-50 rounded-lg p-4">
                      <div className="flex items-end justify-between h-32 space-x-2">
                        {selectedSiteStats.daily.slice().reverse().map((d, i) => {
                          const maxVisitors = Math.max(...selectedSiteStats.daily.map(x => x.visitors), 1);
                          const height = (d.visitors / maxVisitors) * 100;
                          return (
                            <div key={i} className="flex-1 flex flex-col items-center">
                              <div 
                                className="w-full bg-blue-500 rounded-t"
                                style={{ height: `${Math.max(height, 5)}%` }}
                                title={`${d.date}: ${d.visitors}`}
                              />
                              <span className="text-xs text-gray-500 mt-1">{d.date?.slice(-5)}</span>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  ) : (
                    <p className="text-sm text-gray-500">{t('noData')}</p>
                  )}
                </div>

                {/* Recent Visitors */}
                <div>
                  <h3 className="text-sm font-semibold text-gray-700 mb-3">{t('recentVisitors')}</h3>
                  {selectedSiteStats.recent_visitors?.length > 0 ? (
                    <div className="bg-gray-50 rounded-lg divide-y">
                      {selectedSiteStats.recent_visitors.map((v, i) => (
                        <div key={i} className="px-4 py-2 flex items-center justify-between text-sm">
                          <span className="text-gray-600">{v.country || 'Unknown'}</span>
                          <span className="text-gray-400 text-xs">{new Date(v.timestamp).toLocaleString()}</span>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-sm text-gray-500">{t('noData')}</p>
                  )}
                </div>
              </div>
            ) : (
              <div className="p-12 text-center text-gray-500">{t('noData')}</div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;
