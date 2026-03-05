import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useSiteAdmin } from '@/contexts/SiteAdminContext';
import { 
  LogOut, Menu, Clock, Image, Save, Plus, Trash2, 
  Check, X, AlertCircle, Settings
} from 'lucide-react';

const API = process.env.REACT_APP_BACKEND_URL + '/api';

const SiteAdminDashboard = () => {
  const { admin, site, logout, loading: authLoading, hasPermission } = useSiteAdmin();
  const navigate = useNavigate();
  
  const [activeTab, setActiveTab] = useState('overview');
  const [config, setConfig] = useState(null);
  const [menuItems, setMenuItems] = useState([]);
  const [gallery, setGallery] = useState([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState(null);

  useEffect(() => {
    if (!authLoading && !admin) {
      navigate('/restaurant-login');
    }
  }, [admin, authLoading, navigate]);

  useEffect(() => {
    if (admin) {
      loadData();
    }
  }, [admin]);

  const loadData = async () => {
    try {
      const [configRes, menuRes, galleryRes] = await Promise.all([
        axios.get(`${API}/site-admin/config`, { withCredentials: true }),
        axios.get(`${API}/site-admin/menu`, { withCredentials: true }),
        axios.get(`${API}/site-admin/gallery`, { withCredentials: true })
      ]);
      setConfig(configRes.data);
      setMenuItems(menuRes.data);
      setGallery(galleryRes.data);
    } catch (error) {
      console.error('Error loading data:', error);
    } finally {
      setLoading(false);
    }
  };

  const showMessage = (text, type = 'success') => {
    setMessage({ text, type });
    setTimeout(() => setMessage(null), 3000);
  };

  const saveConfig = async () => {
    setSaving(true);
    try {
      await axios.put(`${API}/site-admin/config`, config, { withCredentials: true });
      showMessage('Instellingen opgeslagen!');
    } catch (error) {
      showMessage(error.response?.data?.detail || 'Fout bij opslaan', 'error');
    } finally {
      setSaving(false);
    }
  };

  const addMenuItem = async () => {
    try {
      const response = await axios.post(`${API}/site-admin/menu`, {
        category: 'main',
        name_nl: 'Nieuw Item',
        price: 0,
        sort_order: menuItems.length
      }, { withCredentials: true });
      setMenuItems([...menuItems, response.data]);
      showMessage('Item toegevoegd!');
    } catch (error) {
      showMessage(error.response?.data?.detail || 'Fout bij toevoegen', 'error');
    }
  };

  const updateMenuItem = async (itemId, updates) => {
    try {
      await axios.put(`${API}/site-admin/menu/${itemId}`, updates, { withCredentials: true });
      setMenuItems(menuItems.map(item => item.item_id === itemId ? { ...item, ...updates } : item));
    } catch (error) {
      showMessage(error.response?.data?.detail || 'Fout bij bijwerken', 'error');
    }
  };

  const deleteMenuItem = async (itemId) => {
    if (!window.confirm('Weet je zeker dat je dit item wilt verwijderen?')) return;
    try {
      await axios.delete(`${API}/site-admin/menu/${itemId}`, { withCredentials: true });
      setMenuItems(menuItems.filter(item => item.item_id !== itemId));
      showMessage('Item verwijderd!');
    } catch (error) {
      showMessage(error.response?.data?.detail || 'Fout bij verwijderen', 'error');
    }
  };

  const addGalleryImage = async () => {
    const url = prompt('Voer de URL van de afbeelding in:');
    if (!url) return;
    try {
      const response = await axios.post(`${API}/site-admin/gallery`, { 
        url, 
        sort_order: gallery.length 
      }, { withCredentials: true });
      setGallery([...gallery, response.data]);
      showMessage('Foto toegevoegd!');
    } catch (error) {
      showMessage(error.response?.data?.detail || 'Fout bij toevoegen', 'error');
    }
  };

  const deleteGalleryImage = async (imageId) => {
    try {
      await axios.delete(`${API}/site-admin/gallery/${imageId}`, { withCredentials: true });
      setGallery(gallery.filter(img => img.image_id !== imageId));
      showMessage('Foto verwijderd!');
    } catch (error) {
      showMessage(error.response?.data?.detail || 'Fout bij verwijderen', 'error');
    }
  };

  if (authLoading || loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (!admin) return null;

  const permissions = admin.permissions || {};

  const tabs = [
    { id: 'overview', label: 'Overzicht', icon: Settings, always: true },
    { id: 'hours', label: 'Openingstijden', icon: Clock, permission: 'opening_hours' },
    { id: 'menu', label: 'Menu', icon: Menu, permission: 'menu_items' },
    { id: 'gallery', label: 'Foto\'s', icon: Image, permission: 'gallery' },
  ].filter(tab => tab.always || permissions[tab.permission]);

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Message Toast */}
      {message && (
        <div className={`fixed top-4 right-4 z-50 px-6 py-3 rounded-lg shadow-lg flex items-center space-x-2 ${
          message.type === 'error' ? 'bg-red-500 text-white' : 'bg-green-500 text-white'
        }`}>
          {message.type === 'error' ? <AlertCircle className="w-5 h-5" /> : <Check className="w-5 h-5" />}
          <span>{message.text}</span>
        </div>
      )}

      {/* Header */}
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">{site?.name}</h1>
              <p className="text-gray-500 text-sm">Welkom, {admin.name}</p>
            </div>
            <button
              onClick={logout}
              className="flex items-center space-x-2 text-gray-600 hover:text-gray-900"
              data-testid="site-admin-logout-btn"
            >
              <LogOut className="w-5 h-5" />
              <span>Uitloggen</span>
            </button>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex gap-8">
          {/* Sidebar */}
          <div className="w-64 flex-shrink-0">
            <nav className="bg-white rounded-lg shadow p-4 space-y-1">
              {tabs.map(tab => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${
                    activeTab === tab.id
                      ? 'bg-blue-50 text-blue-700'
                      : 'text-gray-600 hover:bg-gray-50'
                  }`}
                >
                  <tab.icon className="w-5 h-5" />
                  <span>{tab.label}</span>
                </button>
              ))}
            </nav>

            {/* Permissions Info */}
            <div className="mt-4 bg-blue-50 rounded-lg p-4">
              <h4 className="font-medium text-blue-900 mb-2">Jouw Rechten</h4>
              <ul className="text-sm text-blue-700 space-y-1">
                {permissions.menu_items && <li>✓ Menu items</li>}
                {permissions.menu_prices && <li>✓ Prijzen aanpassen</li>}
                {permissions.opening_hours && <li>✓ Openingstijden</li>}
                {permissions.closure_notice && <li>✓ Sluitingsbericht</li>}
                {permissions.gallery && <li>✓ Foto's</li>}
                {permissions.contact_info && <li>✓ Contact info</li>}
              </ul>
            </div>
          </div>

          {/* Content */}
          <div className="flex-1">
            <div className="bg-white rounded-lg shadow p-6">
              {/* Overview Tab */}
              {activeTab === 'overview' && (
                <div className="space-y-6">
                  <h2 className="text-xl font-semibold border-b pb-4">Overzicht</h2>
                  <div className="grid grid-cols-2 gap-6">
                    <div className="bg-gray-50 rounded-lg p-6">
                      <h3 className="font-medium text-gray-700 mb-2">Website</h3>
                      <p className="text-2xl font-bold text-gray-900">{site?.name}</p>
                      <p className="text-gray-500">{site?.domains?.[0] || site?.slug}</p>
                    </div>
                    <div className="bg-gray-50 rounded-lg p-6">
                      <h3 className="font-medium text-gray-700 mb-2">Menu Items</h3>
                      <p className="text-2xl font-bold text-gray-900">{menuItems.length}</p>
                    </div>
                  </div>

                  {/* Special Announcement Section */}
                  <div className="border-2 border-orange-200 bg-orange-50 rounded-lg p-6">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-lg font-semibold text-orange-800">
                        📢 Speciale Aankondiging
                      </h3>
                      <label className="flex items-center space-x-2 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={config?.special_announcement_active || false}
                          onChange={(e) => setConfig({ ...config, special_announcement_active: e.target.checked })}
                          className="w-5 h-5 rounded border-gray-300 text-orange-600 focus:ring-orange-500"
                        />
                        <span className="text-sm font-medium text-gray-700">Actief op website</span>
                      </label>
                    </div>
                    <p className="text-sm text-orange-700 mb-3">
                      Dit bericht wordt getoond op de homepage en reserveringspagina's. 
                      Gebruik voor bijzondere evenementen zoals kerst, nieuwjaar, sluitingsdagen, etc.
                    </p>
                    <div className="mb-3">
                      <label className="block text-sm font-medium text-gray-700 mb-1">Type bericht</label>
                      <select
                        value={config?.special_announcement_type || 'info'}
                        onChange={(e) => setConfig({ ...config, special_announcement_type: e.target.value })}
                        className="w-full border border-gray-300 rounded-lg px-3 py-2 text-gray-900 bg-white"
                      >
                        <option value="info">ℹ️ Informatie (blauw)</option>
                        <option value="warning">⚠️ Waarschuwing (oranje)</option>
                        <option value="success">✅ Goed nieuws (groen)</option>
                      </select>
                    </div>
                    <textarea
                      value={config?.special_announcement || ''}
                      onChange={(e) => setConfig({ ...config, special_announcement: e.target.value })}
                      className="w-full border border-gray-300 rounded-lg px-4 py-3 text-gray-900 bg-white h-32"
                      placeholder="Bijv: 🎄 Kerst Menu beschikbaar! Reserveer nu voor 24 & 25 december. Speciaal 4-gangen menu voor €55 p.p."
                    />
                    <button
                      onClick={saveConfig}
                      disabled={saving}
                      className="mt-3 flex items-center space-x-2 px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 disabled:opacity-50"
                    >
                      <Save className="w-4 h-4" />
                      <span>{saving ? 'Opslaan...' : 'Aankondiging Opslaan'}</span>
                    </button>
                  </div>

                  {permissions.closure_notice && (
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Sluitingsbericht (zichtbaar op de website)
                      </label>
                      <textarea
                        value={config?.closure_notice || ''}
                        onChange={(e) => setConfig({ ...config, closure_notice: e.target.value })}
                        className="w-full border border-gray-300 rounded-lg px-4 py-3 text-gray-900 bg-white h-24"
                        placeholder="Bijv: Wij zijn gesloten van 24-26 december..."
                      />
                      <button
                        onClick={saveConfig}
                        disabled={saving}
                        className="mt-3 flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50"
                      >
                        <Save className="w-4 h-4" />
                        <span>{saving ? 'Opslaan...' : 'Opslaan'}</span>
                      </button>
                    </div>
                  )}
                </div>
              )}

              {/* Hours Tab */}
              {activeTab === 'hours' && permissions.opening_hours && (
                <div className="space-y-6">
                  <div className="flex items-center justify-between border-b pb-4">
                    <h2 className="text-xl font-semibold">Openingstijden</h2>
                    <button
                      onClick={saveConfig}
                      disabled={saving}
                      className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50"
                    >
                      <Save className="w-4 h-4" />
                      <span>{saving ? 'Opslaan...' : 'Opslaan'}</span>
                    </button>
                  </div>
                  
                  <div>
                    <p className="text-gray-600 mb-4">
                      Voer je openingstijden in als JSON formaat. Bijvoorbeeld:
                    </p>
                    <pre className="bg-gray-100 p-4 rounded-lg text-sm mb-4">
{`{
  "Ma - Di": "18:00 - 22:00",
  "Wo - Vr": "12:00 - 14:00, 18:00 - 22:00",
  "Za": "18:00 - 22:00",
  "Zo": "12:00 - 14:00, 18:00 - 22:00"
}`}
                    </pre>
                    <textarea
                      value={JSON.stringify(config?.opening_hours || {}, null, 2)}
                      onChange={(e) => {
                        try {
                          const hours = JSON.parse(e.target.value);
                          setConfig({ ...config, opening_hours: hours });
                        } catch (err) {}
                      }}
                      className="w-full border border-gray-300 rounded-lg px-4 py-3 text-gray-900 bg-white h-48 font-mono text-sm"
                    />
                  </div>
                </div>
              )}

              {/* Menu Tab */}
              {activeTab === 'menu' && permissions.menu_items && (
                <div className="space-y-6">
                  <div className="flex items-center justify-between border-b pb-4">
                    <h2 className="text-xl font-semibold">Menu Items</h2>
                    <button
                      onClick={addMenuItem}
                      className="flex items-center space-x-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
                    >
                      <Plus className="w-5 h-5" />
                      <span>Item Toevoegen</span>
                    </button>
                  </div>
                  
                  {menuItems.length === 0 ? (
                    <div className="text-center py-12 text-gray-500">
                      <Menu className="w-12 h-12 mx-auto mb-4 opacity-50" />
                      <p>Nog geen menu items. Klik op "Item Toevoegen" om te beginnen.</p>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {menuItems.map(item => (
                        <div key={item.item_id} className="border rounded-lg p-4">
                          <div className="grid grid-cols-4 gap-4">
                            <div>
                              <label className="block text-xs text-gray-500 mb-1">Categorie</label>
                              <select
                                value={item.category}
                                onChange={(e) => updateMenuItem(item.item_id, { category: e.target.value })}
                                className="w-full border border-gray-300 rounded px-2 py-1.5 text-sm text-gray-900 bg-white"
                              >
                                <option value="antipasti">Antipasti</option>
                                <option value="primi">Primi</option>
                                <option value="secondi">Secondi</option>
                                <option value="desserts">Desserts</option>
                                <option value="drinks">Dranken</option>
                                <option value="main">Hoofdgerecht</option>
                                <option value="starter">Voorgerecht</option>
                              </select>
                            </div>
                            <div className="col-span-2">
                              <label className="block text-xs text-gray-500 mb-1">Naam</label>
                              <input
                                type="text"
                                value={item.name_nl}
                                onChange={(e) => updateMenuItem(item.item_id, { name_nl: e.target.value })}
                                className="w-full border border-gray-300 rounded px-2 py-1.5 text-sm text-gray-900 bg-white"
                              />
                            </div>
                            <div className="flex items-end space-x-2">
                              <div className="flex-1">
                                <label className="block text-xs text-gray-500 mb-1">Prijs (€)</label>
                                <input
                                  type="number"
                                  step="0.50"
                                  value={item.price}
                                  onChange={(e) => updateMenuItem(item.item_id, { price: parseFloat(e.target.value) })}
                                  className="w-full border border-gray-300 rounded px-2 py-1.5 text-sm text-gray-900 bg-white"
                                  disabled={!permissions.menu_prices}
                                />
                              </div>
                              <button
                                onClick={() => deleteMenuItem(item.item_id)}
                                className="p-2 text-red-500 hover:bg-red-50 rounded"
                                title="Verwijderen"
                              >
                                <Trash2 className="w-4 h-4" />
                              </button>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}

              {/* Gallery Tab */}
              {activeTab === 'gallery' && permissions.gallery && (
                <div className="space-y-6">
                  <div className="flex items-center justify-between border-b pb-4">
                    <h2 className="text-xl font-semibold">Foto's</h2>
                    <button
                      onClick={addGalleryImage}
                      className="flex items-center space-x-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
                    >
                      <Plus className="w-5 h-5" />
                      <span>Foto Toevoegen</span>
                    </button>
                  </div>
                  
                  {gallery.length === 0 ? (
                    <div className="text-center py-12 text-gray-500">
                      <Image className="w-12 h-12 mx-auto mb-4 opacity-50" />
                      <p>Nog geen foto's. Klik op "Foto Toevoegen" om te beginnen.</p>
                    </div>
                  ) : (
                    <div className="grid grid-cols-4 gap-4">
                      {gallery.map(img => (
                        <div key={img.image_id} className="relative group">
                          <img
                            src={img.url}
                            alt="Gallery"
                            className="w-full h-32 object-cover rounded-lg"
                          />
                          <button
                            onClick={() => deleteGalleryImage(img.image_id)}
                            className="absolute top-2 right-2 p-1.5 bg-red-500 text-white rounded opacity-0 group-hover:opacity-100 transition-opacity"
                            title="Verwijderen"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SiteAdminDashboard;
