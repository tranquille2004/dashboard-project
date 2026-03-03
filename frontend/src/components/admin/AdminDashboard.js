import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '@/contexts/AuthContext';
import { 
  Plus, Settings, Image, Menu, Users, Globe, LogOut, 
  ChevronRight, Trash2, Edit, Eye, Clock, Phone, Mail 
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
    confirmDelete: 'Êtes-vous sûr de vouloir supprimer ce site?'
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
    confirmDelete: 'Weet je zeker dat je deze site wilt verwijderen?'
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
    confirmDelete: 'Are you sure you want to delete this site?'
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

  const t = (key) => translations[lang]?.[key] || key;

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
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <div className="flex items-center space-x-4">
            <img src={FWORKS_LOGO} alt="fworks builders" className="h-12 w-auto" />
            <h1 className="text-2xl font-bold text-gray-900">fworksbuilders websites</h1>
          </div>
          <div className="flex items-center space-x-4">
            {/* Language Switcher */}
            <div className="flex items-center space-x-1 bg-gray-100 rounded-lg p-1">
              {['fr', 'nl', 'en'].map(l => (
                <button key={l} onClick={() => setLang(l)}
                  className={`px-3 py-1.5 rounded text-sm font-medium transition-colors ${lang === l ? 'bg-white shadow text-gray-900' : 'text-gray-500 hover:text-gray-700'}`}>
                  {l.toUpperCase()}
                </button>
              ))}
            </div>
            <div className="flex items-center space-x-2">
              {user.picture && (
                <img src={user.picture} alt={user.name} className="w-8 h-8 rounded-full" />
              )}
              <span className="text-gray-700">{user.name}</span>
            </div>
            <button
              onClick={logout}
              className="flex items-center space-x-1 text-gray-600 hover:text-gray-900"
              data-testid="logout-btn"
            >
              <LogOut className="w-5 h-5" />
              <span>{t('logout')}</span>
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-sm">{t('totalSites')}</p>
                <p className="text-3xl font-bold text-gray-900">{sites.length}</p>
              </div>
              <Globe className="w-12 h-12 text-blue-500 opacity-50" />
            </div>
          </div>
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-sm">{t('restaurants')}</p>
                <p className="text-3xl font-bold text-gray-900">
                  {sites.filter(s => s.site_type === 'restaurant').length}
                </p>
              </div>
              <Menu className="w-12 h-12 text-green-500 opacity-50" />
            </div>
          </div>
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-sm">{t('otherBusiness')}</p>
                <p className="text-3xl font-bold text-gray-900">
                  {sites.filter(s => s.site_type !== 'restaurant').length}
                </p>
              </div>
              <Users className="w-12 h-12 text-purple-500 opacity-50" />
            </div>
          </div>
        </div>

        {/* Sites List */}
        <div className="bg-white rounded-lg shadow">
          <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center">
            <h2 className="text-xl font-semibold text-gray-900">{t('mySites')}</h2>
            <button
              onClick={() => setShowNewSiteModal(true)}
              className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
              data-testid="add-site-btn"
            >
              <Plus className="w-5 h-5" />
              <span>{t('newSite')}</span>
            </button>
          </div>
          
          {sites.length === 0 ? (
            <div className="p-12 text-center">
              <Globe className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <p className="text-gray-500 text-lg">{t('noSites')}</p>
              <p className="text-gray-400">{t('clickToStart')}</p>
            </div>
          ) : (
            <div className="divide-y divide-gray-200">
              {sites.map(site => (
                <div key={site.site_id} className="p-6 hover:bg-gray-50 transition-colors">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${
                        site.site_type === 'restaurant' ? 'bg-green-100' : 'bg-purple-100'
                      }`}>
                        {site.site_type === 'restaurant' ? (
                          <Menu className="w-6 h-6 text-green-600" />
                        ) : (
                          <Globe className="w-6 h-6 text-purple-600" />
                        )}
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900">{site.name}</h3>
                        <p className="text-gray-500 text-sm">
                          {site.domains?.length > 0 ? site.domains[0] : `/${site.slug}`}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Link
                        to={`/site/${site.slug}`}
                        target="_blank"
                        className="p-2 text-gray-400 hover:text-blue-600 transition-colors"
                        title="Preview"
                      >
                        <Eye className="w-5 h-5" />
                      </Link>
                      <Link
                        to={`/admin/sites/${site.site_id}`}
                        className="p-2 text-gray-400 hover:text-green-600 transition-colors"
                        title="Bewerken"
                      >
                        <Edit className="w-5 h-5" />
                      </Link>
                      <button
                        onClick={() => deleteSite(site.site_id)}
                        className="p-2 text-gray-400 hover:text-red-600 transition-colors"
                        title="Verwijderen"
                      >
                        <Trash2 className="w-5 h-5" />
                      </button>
                      <Link
                        to={`/admin/sites/${site.site_id}`}
                        className="flex items-center space-x-1 text-blue-600 hover:text-blue-800"
                      >
                        <span>{t('manage')}</span>
                        <ChevronRight className="w-4 h-4" />
                      </Link>
                    </div>
                  </div>
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
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">{t('type')}</label>
                <select
                  value={newSite.site_type}
                  onChange={(e) => setNewSite({ ...newSite, site_type: e.target.value })}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  data-testid="new-site-type"
                >
                  <option value="restaurant">{t('restaurant')}</option>
                  <option value="business">{t('business')}</option>
                </select>
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
    </div>
  );
};

export default AdminDashboard;
