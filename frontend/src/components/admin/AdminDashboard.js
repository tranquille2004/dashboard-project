import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '@/contexts/AuthContext';
import { 
  Plus, Settings, Image, Menu, Users, Globe, LogOut, 
  ChevronRight, Trash2, Edit, Eye, Clock, Phone, Mail,
  BarChart2, X, MapPin, TrendingUp, Activity, ExternalLink,
  Calendar, UserCheck, Check, AlertTriangle, Bug, ChevronDown, ChevronUp
} from 'lucide-react';

const API = process.env.REACT_APP_BACKEND_URL + '/api';
const FWORKS_LOGO = 'https://customer-assets.emergentagent.com/job_c5f93e02-948a-4de4-99bb-a726a04220a7/artifacts/d9j7q5w4_fworksbuilders4.gif';

// Admin Dashboard Translations
const translations = {
  fr: {
    title: 'fworksbuilders',
    logout: 'Déconnexion',
    totalSites: 'Total Websites',
    restaurants: 'Restaurants',
    otherBusiness: 'Autres Entreprises',
    mySites: 'Mes Websites',
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
    noData: 'Pas de données',
    welcome: 'Bienvenue Franck de Schiffart!',
    sitesOnline: 'sites en ligne',
    visitorsToday: 'visiteurs aujourd\'hui'
  },
  nl: {
    title: 'fworksbuilders',
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
    noData: 'Geen gegevens',
    welcome: 'Welkom Franck de Schiffart!',
    sitesOnline: 'sites online',
    visitorsToday: 'bezoekers vandaag'
  },
  en: {
    title: 'fworksbuilders',
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
    noData: 'No data',
    welcome: 'Welcome Franck de Schiffart!',
    sitesOnline: 'sites online',
    visitorsToday: 'visitors today'
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
  const [siteHealth, setSiteHealth] = useState([]);
  const [alerts, setAlerts] = useState([]);
  const [checkingHealth, setCheckingHealth] = useState(false);
  const [liveVisitor, setLiveVisitor] = useState(null);
  const [lastHealthCheck, setLastHealthCheck] = useState(null);
  const [pathStats, setPathStats] = useState({}); // keyed by site_slug
  const [pathLoading, setPathLoading] = useState({}); // keyed by site_slug
  const [pathExpanded, setPathExpanded] = useState({}); // keyed by site_slug

  const togglePathStats = async (slug) => {
    const isOpen = !!pathExpanded[slug];
    setPathExpanded(prev => ({ ...prev, [slug]: !isOpen }));
    if (!isOpen && !pathStats[slug]) {
      setPathLoading(prev => ({ ...prev, [slug]: true }));
      try {
        const res = await axios.get(`${API}/admin/path-stats/${slug}`, { withCredentials: true });
        setPathStats(prev => ({ ...prev, [slug]: res.data.paths || [] }));
      } catch (e) {
        console.error('Path stats error:', e);
        setPathStats(prev => ({ ...prev, [slug]: [] }));
      } finally {
        setPathLoading(prev => ({ ...prev, [slug]: false }));
      }
    }
  };

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

  // Automatic health check every 2 minutes
  useEffect(() => {
    if (!user) return;
    
    // Initial health check after 5 seconds
    const initialCheck = setTimeout(() => {
      checkSiteHealth();
    }, 5000);
    
    // Then every 2 minutes
    const interval = setInterval(() => {
      checkSiteHealth();
    }, 2 * 60 * 1000);
    
    return () => {
      clearTimeout(initialCheck);
      clearInterval(interval);
    };
  }, [user]);

  // Real live visitor data (fetches from backend)
  useEffect(() => {
    if (!user) return;
    
    const fetchLiveVisitor = async () => {
      try {
        const response = await axios.get(`${API}/admin/live-visitor`, { withCredentials: true });
        if (response.data) {
          setLiveVisitor(response.data);
          // Hide after 5 seconds
          setTimeout(() => setLiveVisitor(null), 5000);
        }
      } catch (error) {
        // Silently fail - no fake data
      }
    };
    
    // Check for new visitors every 30 seconds
    const interval = setInterval(fetchLiveVisitor, 30000);
    
    // Initial check after 5 seconds
    const initialDelay = setTimeout(fetchLiveVisitor, 5000);
    
    return () => {
      clearInterval(interval);
      clearTimeout(initialDelay);
    };
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
      
      // Load alerts
      try {
        const alertsResponse = await axios.get(`${API}/admin/alerts`, { withCredentials: true });
        // Handle both paginated response and direct array
        const alertsData = alertsResponse.data.alerts || alertsResponse.data;
        setAlerts(Array.isArray(alertsData) ? alertsData : []);
      } catch (alertsError) {
        console.error('Error loading alerts:', alertsError);
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

  const checkSiteHealth = async () => {
    setCheckingHealth(true);
    try {
      const response = await axios.get(`${API}/admin/health-check`, { withCredentials: true });
      setSiteHealth(response.data);
      setLastHealthCheck(new Date());
      // Reload alerts after health check
      const alertsResponse = await axios.get(`${API}/admin/alerts`, { withCredentials: true });
      const alertsData = alertsResponse.data.alerts || alertsResponse.data;
      setAlerts(Array.isArray(alertsData) ? alertsData : []);
    } catch (error) {
      console.error('Error checking health:', error);
    } finally {
      setCheckingHealth(false);
    }
  };

  const dismissAlert = async (alertId) => {
    try {
      await axios.delete(`${API}/admin/alerts/${alertId}`, { withCredentials: true });
      setAlerts(alerts.filter(a => a.alert_id !== alertId));
    } catch (error) {
      console.error('Error dismissing alert:', error);
    }
  };

  const formatDuration = (minutes) => {
    if (!minutes) return '-';
    if (minutes < 60) return `${minutes} min`;
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return `${hours}u ${mins}m`;
  };

  const formatDate = (dateStr) => {
    if (!dateStr) return '-';
    const date = new Date(dateStr);
    return date.toLocaleString(lang === 'nl' ? 'nl-NL' : lang === 'fr' ? 'fr-FR' : 'en-US', {
      day: '2-digit',
      month: '2-digit',
      hour: '2-digit',
      minute: '2-digit'
    });
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
    <div className="min-h-screen bg-stone-100" style={{ fontFamily: "'DM Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif" }}>
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-stone-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-4">
              <img src={FWORKS_LOGO} alt="fworks builders" className="h-8 sm:h-10 w-auto" />
              <div className="hidden sm:block">
                <h1 className="text-lg font-bold text-stone-800">{t('title')}</h1>
                <p className="text-xs text-stone-500">{sites.length} websites actief</p>
              </div>
            </div>
            
            <div className="flex items-center gap-3">
              {/* Language Switcher */}
              <div className="flex bg-stone-100 rounded-lg p-0.5">
                {['fr', 'nl', 'en'].map(l => (
                  <button key={l} onClick={() => setLang(l)}
                    className={`px-2.5 py-1 rounded-md text-xs font-medium transition-all ${lang === l ? 'bg-white shadow text-stone-900' : 'text-stone-500 hover:text-stone-700'}`}>
                    {l.toUpperCase()}
                  </button>
                ))}
              </div>
              
              {/* User */}
              <div className="hidden sm:flex items-center gap-2 text-sm text-stone-600">
                {user.picture && <img src={user.picture} alt={user.name} className="w-7 h-7 rounded-full" />}
                <span className="max-w-[120px] truncate">{user.name}</span>
              </div>
              
              <button onClick={logout} className="flex items-center gap-1.5 text-stone-500 hover:text-stone-700 text-sm" data-testid="logout-btn">
                <LogOut className="w-4 h-4" />
                <span className="hidden sm:inline">{t('logout')}</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-6">
        {/* Live Visitor Popup */}
        {liveVisitor && (
          <div className="fixed bottom-6 right-6 bg-white rounded-xl shadow-lg border border-stone-200 p-4 animate-bounce-in z-50 max-w-xs">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-teal-400 to-teal-600 flex items-center justify-center">
                <Users className="w-5 h-5 text-white" />
              </div>
              <div>
                <p className="text-sm font-medium text-stone-800">
                  {liveVisitor.country}
                </p>
                <p className="text-xs text-stone-500">
                  bekijkt <span className="font-medium text-teal-600">{liveVisitor.site}</span>
                </p>
                <p className="text-xs text-stone-400">{liveVisitor.page}</p>
              </div>
              <div className="w-2 h-2 bg-green-500 rounded-full animate-ping"></div>
            </div>
          </div>
        )}

        {/* Status Overview */}
        <div className="bg-white rounded-xl border border-stone-200 p-4 mb-6">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h2 className="text-lg font-bold text-stone-800">{t('welcome')} 👋</h2>
              <p className="text-sm text-stone-500">
                {new Date().toLocaleDateString(lang === 'nl' ? 'nl-NL' : lang === 'fr' ? 'fr-FR' : 'en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
              </p>
            </div>
            <div className="flex items-center gap-4">
              {/* Site Status Summary */}
              <div className="flex items-center gap-2 bg-teal-50 text-teal-700 px-3 py-1.5 rounded-lg text-sm">
                <div className="w-2 h-2 bg-teal-500 rounded-full animate-pulse"></div>
                <span className="font-medium">{sites.length} {t('sitesOnline')}</span>
              </div>
              <div className="hidden sm:flex items-center gap-2 bg-amber-50 text-amber-700 px-3 py-1.5 rounded-lg text-sm">
                <Activity className="w-4 h-4" />
                <span className="font-medium">
                  {Object.values(siteStats).reduce((sum, s) => sum + (s?.today || 0), 0)} {t('visitorsToday')}
                </span>
              </div>
              {/* Health Check Button */}
              <button 
                onClick={checkSiteHealth}
                disabled={checkingHealth}
                className="flex items-center gap-2 bg-stone-100 hover:bg-stone-200 text-stone-600 px-3 py-1.5 rounded-lg text-sm transition-colors disabled:opacity-50"
                title={lastHealthCheck ? `Laatste check: ${lastHealthCheck.toLocaleTimeString()}` : 'Nog niet gecheckt'}
              >
                <Activity className={`w-4 h-4 ${checkingHealth ? 'animate-spin' : ''}`} />
                <span className="hidden sm:inline">{checkingHealth ? 'Checking...' : 'Check Status'}</span>
              </button>
              {lastHealthCheck && (
                <span className="hidden lg:inline text-xs text-stone-400">
                  {lastHealthCheck.toLocaleTimeString()}
                </span>
              )}
            </div>
          </div>
        </div>

        {/* Admin Tools Quick Links */}
        <div className="bg-white rounded-xl border border-stone-200 mb-6 px-4 py-3 flex flex-wrap items-center gap-3">
          <span className="text-sm font-medium text-stone-600 mr-2">Tools:</span>
          <Link to="/admin/billing" data-testid="admin-tool-billing"
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-blue-50 hover:bg-blue-100 text-blue-700 text-sm font-medium transition-colors">
            <BarChart2 className="w-4 h-4" /> Facturatie
          </Link>
          <Link to="/admin/migrate" data-testid="admin-tool-migrate"
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-purple-50 hover:bg-purple-100 text-purple-700 text-sm font-medium transition-colors">
            <Activity className="w-4 h-4" /> Afbeeldingen Sync
          </Link>
          <Link to="/admin/alerts" data-testid="admin-tool-alerts"
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-amber-50 hover:bg-amber-100 text-amber-700 text-sm font-medium transition-colors">
            <TrendingUp className="w-4 h-4" /> Alle Alerts
          </Link>
          <button data-testid="admin-tool-cleanup-bots"
            onClick={async () => {
              if (!window.confirm('Alle bot-/crawler-bezoeken uit de statistieken verwijderen?')) return;
              try {
                const res = await axios.post(`${API}/admin/analytics/cleanup-bots`, {}, { withCredentials: true });
                alert(`${res.data.removed} bot-bezoeken verwijderd.\nTotaal voor: ${res.data.before_total} → na: ${res.data.after_total}\n\nPer site:\n${Object.entries(res.data.per_site_removed || {}).map(([k,v]) => `  ${k}: ${v}`).join('\n')}`);
                window.location.reload();
              } catch (e) { alert('Fout: ' + (e.response?.data?.detail || e.message)); }
            }}
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-rose-50 hover:bg-rose-100 text-rose-700 text-sm font-medium transition-colors">
            <Bug className="w-4 h-4" /> Bots opruimen
          </button>
        </div>

        {/* Alerts Section - Always visible */}
        <div className="bg-white rounded-xl border border-stone-200 mb-6 overflow-hidden">
          <div className="px-4 py-3 bg-stone-50 border-b border-stone-200 flex items-center justify-between">
            <div className="flex items-center gap-2">
              {alerts.filter(a => a.is_active).length > 0 ? (
                <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
              ) : (
                <div className="w-2 h-2 bg-teal-500 rounded-full"></div>
              )}
              <h3 className="font-semibold text-stone-800">
                Site Alerts ({alerts.filter(a => a.is_active).length} actief)
              </h3>
            </div>
            <Link 
              to="/admin/alerts" 
              className="text-sm text-teal-600 hover:text-teal-700 font-medium"
            >
              Bekijk Alle →
            </Link>
          </div>
          
          {alerts.length === 0 ? (
            <div className="px-4 py-6 text-center">
              <Check className="w-8 h-8 text-teal-500 mx-auto mb-2" />
              <p className="text-stone-600 font-medium">Geen alerts</p>
              <p className="text-stone-400 text-sm">Alle systemen werken normaal</p>
            </div>
          ) : (
            <div className="divide-y divide-stone-100 max-h-64 overflow-y-auto">
              {alerts.map(alert => {
                const isTrafficAlert = alert.alert_type === 'traffic' || alert.status === 'no_visitors';
                const isReservationAlert = alert.alert_type === 'reservation' || alert.status === 'no_reservations';
                const bgColor = !alert.is_active ? 'bg-stone-50' : 
                  isReservationAlert ? 'bg-purple-50' :
                  isTrafficAlert ? 'bg-amber-50' : 'bg-red-50';
                const iconBg = !alert.is_active ? 'bg-stone-200' : 
                  isReservationAlert ? 'bg-purple-100' :
                  isTrafficAlert ? 'bg-amber-100' : 'bg-red-100';
                const iconColor = !alert.is_active ? 'text-teal-600' : 
                  isReservationAlert ? 'text-purple-600' :
                  isTrafficAlert ? 'text-amber-600' : 'text-red-600';
                const statusColor = !alert.is_active ? 'text-teal-600' : 
                  isReservationAlert ? 'text-purple-600' :
                  isTrafficAlert ? 'text-amber-600' : 'text-red-600';
                const statusText = !alert.is_active ? 'Opgelost' : 
                  isReservationAlert ? 'Geen reservaties (1u+)' :
                  isTrafficAlert ? 'Geen bezoekers (2u+)' : 'Offline';
                
                return (
                  <div key={alert.alert_id} className={`px-4 py-3 flex items-center justify-between ${bgColor}`}>
                    <div className="flex items-center gap-3">
                      <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${iconBg}`}>
                        {!alert.is_active ? (
                          <Check className={`w-4 h-4 ${iconColor}`} />
                        ) : isReservationAlert ? (
                          <Clock className={`w-4 h-4 ${iconColor}`} />
                        ) : isTrafficAlert ? (
                          <Users className={`w-4 h-4 ${iconColor}`} />
                        ) : (
                          <X className={`w-4 h-4 ${iconColor}`} />
                        )}
                      </div>
                      <div>
                        <p className="font-medium text-stone-900 text-sm">{alert.site_name}</p>
                        <p className="text-xs text-stone-500">{alert.message || alert.domain}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className={`text-sm font-medium ${statusColor}`}>
                        {statusText}
                      </p>
                      <p className="text-xs text-stone-500">
                        {formatDate(alert.started_at)}
                        {alert.duration_minutes && ` • ${formatDuration(alert.duration_minutes)}`}
                      </p>
                    </div>
                    {alert.is_active && (
                      <button 
                        onClick={() => dismissAlert(alert.alert_id)}
                        className="ml-3 p-1.5 text-stone-400 hover:text-stone-600 hover:bg-stone-100 rounded"
                        title="Dismiss"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    )}
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Sites Header */}
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-bold text-stone-800">{t('mySites')}</h2>
          <button
            onClick={() => setShowNewSiteModal(true)}
            className="flex items-center gap-1.5 bg-teal-600 text-white px-3 py-2 rounded-lg hover:bg-teal-700 transition-colors text-sm font-medium"
            data-testid="add-site-btn"
          >
            <Plus className="w-4 h-4" />
            <span className="hidden sm:inline">{t('newSite')}</span>
          </button>
        </div>
        
        {/* Sites Grid */}
        {sites.length === 0 ? (
          <div className="bg-white rounded-xl border border-stone-200 p-12 text-center">
            <Globe className="w-12 h-12 text-stone-300 mx-auto mb-3" />
            <p className="text-stone-500">{t('noSites')}</p>
            <p className="text-stone-400 text-sm">{t('clickToStart')}</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {sites.map(site => {
              // Check if this site has an active health alert (= site is DOWN)
              const slug = site.slug;
              const sid = site.site_id;
              const healthAlert = alerts.find(a => a.is_active && a.alert_type === 'health' && (a.site_id === slug || a.site_id === sid));
              const isOnline = !healthAlert;
              return (
              <div key={site.site_id} className="bg-white rounded-xl border border-stone-200 overflow-hidden hover:shadow-lg transition-shadow">
                {/* Site Header */}
                <div className="p-4 border-b border-stone-100">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-teal-500 to-teal-600 flex items-center justify-center">
                        <Globe className="w-5 h-5 text-white" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-stone-900 text-sm">{site.name}</h3>
                        <p className="text-xs text-stone-400 truncate max-w-[150px]">
                          {site.domains?.length > 0 ? site.domains[0] : `/${site.slug}`}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <div className="relative flex items-center" data-testid={`site-status-${site.slug}`}
                           title={isOnline ? 'Online — site werkt correct' : `Offline — ${healthAlert?.message || 'site bereikbaar issue'}`}>
                        {isOnline ? (
                          <>
                            <span className="absolute inline-flex h-3 w-3 rounded-full bg-emerald-400 opacity-75 animate-ping"></span>
                            <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
                          </>
                        ) : (
                          <>
                            <span className="absolute inline-flex h-3 w-3 rounded-full bg-red-400 opacity-75 animate-ping"></span>
                            <span className="relative inline-flex rounded-full h-3 w-3 bg-red-600"></span>
                          </>
                        )}
                      </div>
                      <a href={site.domains?.length > 0 ? `https://${site.domains[0]}` : `/site/${site.slug}`} 
                         target="_blank" rel="noopener noreferrer"
                         className="p-1.5 text-stone-400 hover:text-teal-600 transition-colors">
                        <ExternalLink className="w-4 h-4" />
                      </a>
                    </div>
                  </div>
                </div>
                
                {/* Stats */}
                {siteStats[site.site_id] && (
                  <>
                  <div className="grid grid-cols-4 divide-x divide-stone-100 bg-stone-50">
                    <div className="p-3 text-center">
                      <p className="text-lg font-bold text-teal-600">{siteStats[site.site_id].today}</p>
                      <p className="text-[10px] text-stone-500 uppercase tracking-wide">{t('today')}</p>
                    </div>
                    <div className="p-3 text-center">
                      <p className="text-lg font-bold text-sky-600">{siteStats[site.site_id].week}</p>
                      <p className="text-[10px] text-stone-500 uppercase tracking-wide">{t('week')}</p>
                    </div>
                    <div className="p-3 text-center">
                      <p className="text-lg font-bold text-violet-600">{siteStats[site.site_id].month}</p>
                      <p className="text-[10px] text-stone-500 uppercase tracking-wide">{t('month')}</p>
                    </div>
                    <div className="p-3 text-center">
                      <p className="text-lg font-bold text-stone-600">{siteStats[site.site_id].total}</p>
                      <p className="text-[10px] text-stone-500 uppercase tracking-wide">{t('total')}</p>
                    </div>
                  </div>
                  {/* Per-page breakdown toggle */}
                  <button onClick={() => togglePathStats(site.slug)}
                    data-testid={`toggle-paths-${site.slug}`}
                    className="w-full px-4 py-2 text-xs text-stone-500 hover:text-violet-600 hover:bg-violet-50 transition-colors flex items-center justify-center gap-1 border-t border-stone-100">
                    {pathExpanded[site.slug]
                      ? <>Verberg per pagina <ChevronUp className="w-3 h-3" /></>
                      : <>Bekijk per pagina <ChevronDown className="w-3 h-3" /></>}
                  </button>
                  {pathExpanded[site.slug] && (
                    <div className="bg-stone-50/50 border-t border-stone-100 px-3 py-2 text-xs" data-testid={`path-stats-${site.slug}`}>
                      {pathLoading[site.slug] ? (
                        <p className="text-center text-stone-400 py-2">Laden...</p>
                      ) : (pathStats[site.slug] || []).length === 0 ? (
                        <p className="text-center text-stone-400 py-2">Nog geen pagina-data — tracking begint pas na deploy.</p>
                      ) : (
                        <table className="w-full">
                          <thead>
                            <tr className="text-[10px] uppercase text-stone-400 border-b border-stone-200">
                              <th className="text-left py-1.5 font-medium">Pagina</th>
                              <th className="text-right py-1.5 font-medium">7d</th>
                              <th className="text-right py-1.5 font-medium">30d</th>
                              <th className="text-right py-1.5 font-medium">Tot.</th>
                            </tr>
                          </thead>
                          <tbody>
                            {(pathStats[site.slug] || []).map((row, idx) => {
                              const label = row.path === '/' || row.path.match(/^\/site\/[^/]+\/?$/)
                                ? '🏠 Homepage'
                                : row.path.replace(/^\/site\/[^/]+/, '');
                              return (
                                <tr key={idx} className="border-b border-stone-100 last:border-0">
                                  <td className="py-1.5 text-stone-700 truncate max-w-[160px]" title={row.path}>{label}</td>
                                  <td className="py-1.5 text-right text-sky-600 font-semibold">{row.week}</td>
                                  <td className="py-1.5 text-right text-violet-600 font-semibold">{row.month}</td>
                                  <td className="py-1.5 text-right text-stone-600">{row.total}</td>
                                </tr>
                              );
                            })}
                          </tbody>
                        </table>
                      )}
                    </div>
                  )}
                  </>
                )}
                
                {/* Actions */}
                <div className="p-3 flex items-center justify-between border-t border-stone-100">
                  <div className="flex items-center gap-1">
                    <button onClick={() => openStatsModal(site.site_id)}
                      className="p-2 text-stone-400 hover:text-violet-600 hover:bg-violet-50 rounded-lg transition-colors" title={t('statistics')}>
                      <BarChart2 className="w-4 h-4" />
                    </button>
                    <Link to={`/site/${site.slug}`} target="_blank"
                      className="p-2 text-stone-400 hover:text-sky-600 hover:bg-sky-50 rounded-lg transition-colors" title="Preview">
                      <Eye className="w-4 h-4" />
                    </Link>
                    <Link to={`/admin/sites/${site.site_id}`}
                      className="p-2 text-stone-400 hover:text-teal-600 hover:bg-teal-50 rounded-lg transition-colors" title="Bewerken">
                      <Edit className="w-4 h-4" />
                    </Link>
                    <button onClick={() => deleteSite(site.site_id)}
                      className="p-2 text-stone-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors" title="Verwijderen">
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                  <Link to={`/admin/sites/${site.site_id}`}
                    className="flex items-center gap-1 text-teal-600 hover:text-teal-800 text-xs font-medium">
                    <span>{t('manage')}</span>
                    <ChevronRight className="w-3 h-3" />
                  </Link>
                </div>
              </div>
              );
            })}
          </div>
        )}
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

      {/* Statistics Modal - Mobile Responsive */}
      {showStatsModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-2 sm:p-4">
          <div className="bg-white rounded-xl shadow-xl w-full max-w-2xl max-h-[95vh] sm:max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-white border-b px-4 sm:px-6 py-3 sm:py-4 flex items-center justify-between">
              <h2 className="text-base sm:text-xl font-semibold text-gray-900 flex items-center space-x-2">
                <BarChart2 className="w-4 sm:w-5 h-4 sm:h-5 text-purple-600" />
                <span className="truncate">{t('statistics')}: {selectedSiteStats?.site_name || '...'}</span>
              </h2>
              <button onClick={() => setShowStatsModal(false)} className="p-1.5 hover:bg-gray-100 rounded flex-shrink-0">
                <X className="w-5 h-5" />
              </button>
            </div>
            
            {loadingStats ? (
              <div className="p-8 sm:p-12 text-center text-gray-500">Loading...</div>
            ) : selectedSiteStats ? (
              <div className="p-4 sm:p-6 space-y-4 sm:space-y-6">
                {/* Overview Stats - 2x2 grid on mobile */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-4">
                  <div className="bg-green-50 rounded-lg p-3 sm:p-4 text-center">
                    <p className="text-xl sm:text-2xl font-bold text-green-600">{selectedSiteStats.stats?.today || 0}</p>
                    <p className="text-xs sm:text-sm text-green-700">{t('today')}</p>
                  </div>
                  <div className="bg-blue-50 rounded-lg p-3 sm:p-4 text-center">
                    <p className="text-xl sm:text-2xl font-bold text-blue-600">{selectedSiteStats.stats?.week || 0}</p>
                    <p className="text-xs sm:text-sm text-blue-700">{t('week')}</p>
                  </div>
                  <div className="bg-purple-50 rounded-lg p-3 sm:p-4 text-center">
                    <p className="text-xl sm:text-2xl font-bold text-purple-600">{selectedSiteStats.stats?.month || 0}</p>
                    <p className="text-xs sm:text-sm text-purple-700">{t('month')}</p>
                  </div>
                  <div className="bg-gray-100 rounded-lg p-3 sm:p-4 text-center">
                    <p className="text-xl sm:text-2xl font-bold text-gray-700">{selectedSiteStats.stats?.total || 0}</p>
                    <p className="text-xs sm:text-sm text-gray-600">{t('total')}</p>
                  </div>
                </div>

                {/* Countries */}
                <div>
                  <h3 className="text-sm font-semibold text-gray-700 mb-2 sm:mb-3 flex items-center space-x-2">
                    <MapPin className="w-4 h-4" />
                    <span>{t('byCountry')}</span>
                  </h3>
                  {selectedSiteStats.countries?.length > 0 ? (
                    <div className="bg-gray-50 rounded-lg p-3 sm:p-4">
                      <div className="space-y-2">
                        {selectedSiteStats.countries.map((c, i) => (
                          <div key={i} className="flex items-center justify-between">
                            <span className="text-xs sm:text-sm text-gray-700">{c.country}</span>
                            <span className="text-xs sm:text-sm font-medium text-gray-900">{c.visitors}</span>
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
                  <h3 className="text-sm font-semibold text-gray-700 mb-2 sm:mb-3">{t('dailyVisits')} (7 {t('week').toLowerCase()})</h3>
                  {selectedSiteStats.daily?.length > 0 ? (
                    <div className="bg-gray-50 rounded-lg p-3 sm:p-4">
                      <div className="flex items-end justify-between h-24 sm:h-32 space-x-1 sm:space-x-2">
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
                              <span className="text-[10px] sm:text-xs text-gray-500 mt-1">{d.date?.slice(-5)}</span>
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
                  <h3 className="text-sm font-semibold text-gray-700 mb-2 sm:mb-3">{t('recentVisitors')}</h3>
                  {selectedSiteStats.recent_visitors?.length > 0 ? (
                    <div className="bg-gray-50 rounded-lg divide-y">
                      {selectedSiteStats.recent_visitors.map((v, i) => (
                        <div key={i} className="px-3 sm:px-4 py-2 flex items-center justify-between text-xs sm:text-sm">
                          <span className="text-gray-600">{v.country || 'Unknown'}</span>
                          <span className="text-gray-400 text-[10px] sm:text-xs">{new Date(v.timestamp).toLocaleString()}</span>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-sm text-gray-500">{t('noData')}</p>
                  )}
                </div>
              </div>
            ) : (
              <div className="p-8 sm:p-12 text-center text-gray-500">{t('noData')}</div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;
