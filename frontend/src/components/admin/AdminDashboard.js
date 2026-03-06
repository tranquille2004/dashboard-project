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
    <div className="min-h-screen bg-gray-50" style={{ fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" }}>
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
                <div key={site.site_id} className="px-4 py-3 hover:bg-gray-50 transition-colors">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="w-9 h-9 rounded-md flex items-center justify-center bg-blue-50">
                        <Globe className="w-5 h-5 text-blue-600" />
                      </div>
                      <div>
                        <h3 className="text-sm font-medium text-gray-900">{site.name}</h3>
                        <p className="text-gray-400 text-xs">
                          {site.domains?.length > 0 ? site.domains[0] : `/${site.slug}`}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-1">
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
    </div>
  );
};

export default AdminDashboard;
