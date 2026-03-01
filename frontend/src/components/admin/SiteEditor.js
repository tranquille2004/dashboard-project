import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '@/contexts/AuthContext';
import { 
  ArrowLeft, Save, Globe, Settings, Image, Menu, Users, 
  Clock, Phone, Mail, MapPin, Facebook, Instagram, Plus, Trash2, Eye, UserPlus, Shield
} from 'lucide-react';

const API = process.env.REACT_APP_BACKEND_URL + '/api';

const SiteEditor = () => {
  const { siteId } = useParams();
  const navigate = useNavigate();
  const { user, loading: authLoading } = useAuth();
  
  const [activeTab, setActiveTab] = useState('general');
  const [site, setSite] = useState(null);
  const [config, setConfig] = useState(null);
  const [menuItems, setMenuItems] = useState([]);
  const [groupMenus, setGroupMenus] = useState([]);
  const [gallery, setGallery] = useState([]);
  const [siteAdmins, setSiteAdmins] = useState([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [showAddAdminModal, setShowAddAdminModal] = useState(false);
  const [newAdmin, setNewAdmin] = useState({ name: '', email: '', password: '', permissions: {
    menu_items: true,
    menu_prices: true,
    opening_hours: true,
    closure_notice: true,
    gallery: true,
    contact_info: false,
    group_menus: true
  }});

  useEffect(() => {
    if (!authLoading && !user) {
      navigate('/');
    }
  }, [user, authLoading, navigate]);

  useEffect(() => {
    if (user && siteId) {
      loadSiteData();
    }
  }, [user, siteId]);

  const loadSiteData = async () => {
    try {
      const [siteRes, configRes, menuRes, groupRes, galleryRes, adminsRes] = await Promise.all([
        axios.get(`${API}/admin/sites/${siteId}`, { withCredentials: true }),
        axios.get(`${API}/admin/sites/${siteId}/config`, { withCredentials: true }),
        axios.get(`${API}/admin/sites/${siteId}/menu`, { withCredentials: true }),
        axios.get(`${API}/admin/sites/${siteId}/group-menus`, { withCredentials: true }),
        axios.get(`${API}/admin/sites/${siteId}/gallery`, { withCredentials: true }),
        axios.get(`${API}/admin/sites/${siteId}/admins`, { withCredentials: true })
      ]);
      setSite(siteRes.data);
      setConfig(configRes.data);
      setMenuItems(menuRes.data);
      setGroupMenus(groupRes.data);
      setGallery(galleryRes.data);
      setSiteAdmins(adminsRes.data);
    } catch (error) {
      console.error('Error loading site:', error);
    } finally {
      setLoading(false);
    }
  };

  const saveSite = async () => {
    setSaving(true);
    try {
      await axios.put(`${API}/admin/sites/${siteId}`, site, { withCredentials: true });
      alert('Site opgeslagen!');
    } catch (error) {
      console.error('Error saving site:', error);
      alert('Fout bij opslaan');
    } finally {
      setSaving(false);
    }
  };

  const saveConfig = async () => {
    setSaving(true);
    try {
      await axios.put(`${API}/admin/sites/${siteId}/config`, config, { withCredentials: true });
      alert('Instellingen opgeslagen!');
    } catch (error) {
      console.error('Error saving config:', error);
      alert('Fout bij opslaan');
    } finally {
      setSaving(false);
    }
  };

  const addMenuItem = async () => {
    const newItem = {
      category: 'main',
      name_nl: 'Nieuw Item',
      price: 0,
      sort_order: menuItems.length
    };
    try {
      const response = await axios.post(`${API}/admin/sites/${siteId}/menu`, newItem, { withCredentials: true });
      setMenuItems([...menuItems, response.data]);
    } catch (error) {
      console.error('Error adding menu item:', error);
    }
  };

  const updateMenuItem = async (itemId, updates) => {
    try {
      await axios.put(`${API}/admin/sites/${siteId}/menu/${itemId}`, updates, { withCredentials: true });
      setMenuItems(menuItems.map(item => item.item_id === itemId ? { ...item, ...updates } : item));
    } catch (error) {
      console.error('Error updating menu item:', error);
    }
  };

  const deleteMenuItem = async (itemId) => {
    if (!window.confirm('Weet je zeker dat je dit item wilt verwijderen?')) return;
    try {
      await axios.delete(`${API}/admin/sites/${siteId}/menu/${itemId}`, { withCredentials: true });
      setMenuItems(menuItems.filter(item => item.item_id !== itemId));
    } catch (error) {
      console.error('Error deleting menu item:', error);
    }
  };

  const addGalleryImage = async () => {
    const url = prompt('Voer de URL van de afbeelding in:');
    if (!url) return;
    try {
      const response = await axios.post(`${API}/admin/sites/${siteId}/gallery`, { url, sort_order: gallery.length }, { withCredentials: true });
      setGallery([...gallery, response.data]);
    } catch (error) {
      console.error('Error adding image:', error);
    }
  };

  const deleteGalleryImage = async (imageId) => {
    try {
      await axios.delete(`${API}/admin/sites/${siteId}/gallery/${imageId}`, { withCredentials: true });
      setGallery(gallery.filter(img => img.image_id !== imageId));
    } catch (error) {
      console.error('Error deleting image:', error);
    }
  };

  const addSiteAdmin = async () => {
    try {
      const response = await axios.post(`${API}/admin/sites/${siteId}/admins`, newAdmin, { withCredentials: true });
      setSiteAdmins([...siteAdmins, response.data]);
      setShowAddAdminModal(false);
      setNewAdmin({ name: '', email: '', password: '', permissions: {
        menu_items: true,
        menu_prices: true,
        opening_hours: true,
        closure_notice: true,
        gallery: true,
        contact_info: false,
        group_menus: true
      }});
      alert('Beheerder toegevoegd!');
    } catch (error) {
      alert(error.response?.data?.detail || 'Fout bij toevoegen');
    }
  };

  const updateAdminPermissions = async (adminId, permissions) => {
    try {
      await axios.put(`${API}/admin/sites/${siteId}/admins/${adminId}`, { permissions }, { withCredentials: true });
      setSiteAdmins(siteAdmins.map(a => a.admin_id === adminId ? { ...a, permissions } : a));
    } catch (error) {
      console.error('Error updating permissions:', error);
    }
  };

  const deleteSiteAdmin = async (adminId) => {
    if (!window.confirm('Weet je zeker dat je deze beheerder wilt verwijderen?')) return;
    try {
      await axios.delete(`${API}/admin/sites/${siteId}/admins/${adminId}`, { withCredentials: true });
      setSiteAdmins(siteAdmins.filter(a => a.admin_id !== adminId));
    } catch (error) {
      console.error('Error deleting admin:', error);
    }
  };

  const toggleAdminActive = async (adminId, isActive) => {
    try {
      await axios.put(`${API}/admin/sites/${siteId}/admins/${adminId}`, { is_active: isActive }, { withCredentials: true });
      setSiteAdmins(siteAdmins.map(a => a.admin_id === adminId ? { ...a, is_active: isActive } : a));
    } catch (error) {
      console.error('Error toggling admin:', error);
    }
  };

  if (authLoading || loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (!user || !site) return null;

  const tabs = [
    { id: 'general', label: 'Algemeen', icon: Settings },
    { id: 'contact', label: 'Contact & Uren', icon: Clock },
    { id: 'menu', label: 'Menu', icon: Menu },
    { id: 'gallery', label: 'Foto\'s', icon: Image },
    { id: 'admins', label: 'Beheerders', icon: Shield },
  ];

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Link to="/admin" className="text-gray-500 hover:text-gray-700">
                <ArrowLeft className="w-6 h-6" />
              </Link>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">{site.name}</h1>
                <p className="text-gray-500 text-sm">{site.slug}</p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <Link
                to={`/site/${site.slug}`}
                target="_blank"
                className="flex items-center space-x-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
              >
                <Eye className="w-5 h-5" />
                <span>Preview</span>
              </Link>
              <button
                onClick={activeTab === 'general' || activeTab === 'contact' ? saveConfig : saveSite}
                disabled={saving}
                className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50"
                data-testid="save-btn"
              >
                <Save className="w-5 h-5" />
                <span>{saving ? 'Opslaan...' : 'Opslaan'}</span>
              </button>
            </div>
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
          </div>

          {/* Content */}
          <div className="flex-1">
            <div className="bg-white rounded-lg shadow p-6">
              {/* General Tab */}
              {activeTab === 'general' && (
                <div className="space-y-6">
                  <h2 className="text-xl font-semibold border-b pb-4">Algemene Instellingen</h2>
                  
                  <div className="grid grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Site Naam</label>
                      <input
                        type="text"
                        value={site.name}
                        onChange={(e) => setSite({ ...site, name: e.target.value })}
                        className="w-full border border-gray-300 rounded-lg px-3 py-2"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Slug</label>
                      <input
                        type="text"
                        value={site.slug}
                        onChange={(e) => setSite({ ...site, slug: e.target.value })}
                        className="w-full border border-gray-300 rounded-lg px-3 py-2"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Domeinen (één per regel)</label>
                    <textarea
                      value={site.domains?.join('\n') || ''}
                      onChange={(e) => setSite({ ...site, domains: e.target.value.split('\n').filter(d => d.trim()) })}
                      className="w-full border border-gray-300 rounded-lg px-3 py-2 h-24"
                      placeholder="lacantinaitaliana.net&#10;www.lacantinaitaliana.net"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Primaire Kleur</label>
                      <div className="flex items-center space-x-2">
                        <input
                          type="color"
                          value={config?.primary_color || '#7D3C32'}
                          onChange={(e) => setConfig({ ...config, primary_color: e.target.value })}
                          className="w-12 h-10 border border-gray-300 rounded cursor-pointer"
                        />
                        <input
                          type="text"
                          value={config?.primary_color || '#7D3C32'}
                          onChange={(e) => setConfig({ ...config, primary_color: e.target.value })}
                          className="flex-1 border border-gray-300 rounded-lg px-3 py-2"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Logo URL</label>
                      <input
                        type="text"
                        value={config?.logo_url || ''}
                        onChange={(e) => setConfig({ ...config, logo_url: e.target.value })}
                        className="w-full border border-gray-300 rounded-lg px-3 py-2"
                        placeholder="https://..."
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Reserveringsformulier URL (JotForm etc.)</label>
                    <input
                      type="text"
                      value={config?.reservation_form_url || ''}
                      onChange={(e) => setConfig({ ...config, reservation_form_url: e.target.value })}
                      className="w-full border border-gray-300 rounded-lg px-3 py-2"
                      placeholder="https://form.jotform.com/..."
                    />
                  </div>

                  <div className="flex items-center space-x-4">
                    <label className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        checked={config?.has_reservations !== false}
                        onChange={(e) => setConfig({ ...config, has_reservations: e.target.checked })}
                        className="w-4 h-4"
                      />
                      <span>Reserveringen ingeschakeld</span>
                    </label>
                    <label className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        checked={config?.has_takeaway === true}
                        onChange={(e) => setConfig({ ...config, has_takeaway: e.target.checked })}
                        className="w-4 h-4"
                      />
                      <span>Afhalen ingeschakeld</span>
                    </label>
                  </div>
                </div>
              )}

              {/* Contact & Hours Tab */}
              {activeTab === 'contact' && (
                <div className="space-y-6">
                  <h2 className="text-xl font-semibold border-b pb-4">Contact & Openingstijden</h2>
                  
                  <div className="grid grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        <MapPin className="w-4 h-4 inline mr-1" /> Adres
                      </label>
                      <input
                        type="text"
                        value={config?.address || ''}
                        onChange={(e) => setConfig({ ...config, address: e.target.value })}
                        className="w-full border border-gray-300 rounded-lg px-3 py-2"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        <Phone className="w-4 h-4 inline mr-1" /> Telefoon
                      </label>
                      <input
                        type="text"
                        value={config?.phone || ''}
                        onChange={(e) => setConfig({ ...config, phone: e.target.value })}
                        className="w-full border border-gray-300 rounded-lg px-3 py-2"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        <Mail className="w-4 h-4 inline mr-1" /> Email
                      </label>
                      <input
                        type="email"
                        value={config?.email || ''}
                        onChange={(e) => setConfig({ ...config, email: e.target.value })}
                        className="w-full border border-gray-300 rounded-lg px-3 py-2"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">BTW Nummer</label>
                      <input
                        type="text"
                        value={config?.btw_number || ''}
                        onChange={(e) => setConfig({ ...config, btw_number: e.target.value })}
                        className="w-full border border-gray-300 rounded-lg px-3 py-2"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        <Facebook className="w-4 h-4 inline mr-1" /> Facebook URL
                      </label>
                      <input
                        type="text"
                        value={config?.facebook_url || ''}
                        onChange={(e) => setConfig({ ...config, facebook_url: e.target.value })}
                        className="w-full border border-gray-300 rounded-lg px-3 py-2"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        <Instagram className="w-4 h-4 inline mr-1" /> Instagram URL
                      </label>
                      <input
                        type="text"
                        value={config?.instagram_url || ''}
                        onChange={(e) => setConfig({ ...config, instagram_url: e.target.value })}
                        className="w-full border border-gray-300 rounded-lg px-3 py-2"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      <Clock className="w-4 h-4 inline mr-1" /> Openingstijden (JSON)
                    </label>
                    <textarea
                      value={JSON.stringify(config?.opening_hours || {}, null, 2)}
                      onChange={(e) => {
                        try {
                          setConfig({ ...config, opening_hours: JSON.parse(e.target.value) });
                        } catch (err) {}
                      }}
                      className="w-full border border-gray-300 rounded-lg px-3 py-2 h-40 font-mono text-sm"
                      placeholder='{"ma-di": "18:00-22:00", "wo-vr": "12:00-14:00, 18:00-22:00"}'
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Sluitingsbericht</label>
                    <textarea
                      value={config?.closure_notice || ''}
                      onChange={(e) => setConfig({ ...config, closure_notice: e.target.value })}
                      className="w-full border border-gray-300 rounded-lg px-3 py-2 h-20"
                      placeholder="Voor het einde van het jaar zijn wij gesloten op..."
                    />
                  </div>
                </div>
              )}

              {/* Menu Tab */}
              {activeTab === 'menu' && (
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
                      <p>Nog geen menu items</p>
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
                                className="w-full border border-gray-300 rounded px-2 py-1 text-sm"
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
                              <label className="block text-xs text-gray-500 mb-1">Naam (NL)</label>
                              <input
                                type="text"
                                value={item.name_nl}
                                onChange={(e) => updateMenuItem(item.item_id, { name_nl: e.target.value })}
                                className="w-full border border-gray-300 rounded px-2 py-1 text-sm"
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
                                  className="w-full border border-gray-300 rounded px-2 py-1 text-sm"
                                />
                              </div>
                              <button
                                onClick={() => deleteMenuItem(item.item_id)}
                                className="p-2 text-red-500 hover:bg-red-50 rounded"
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
              {activeTab === 'gallery' && (
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
                      <p>Nog geen foto's</p>
                    </div>
                  ) : (
                    <div className="grid grid-cols-4 gap-4">
                      {gallery.map(img => (
                        <div key={img.image_id} className="relative group">
                          <img
                            src={img.url}
                            alt={img.alt_text || 'Gallery'}
                            className="w-full h-32 object-cover rounded-lg"
                          />
                          <button
                            onClick={() => deleteGalleryImage(img.image_id)}
                            className="absolute top-2 right-2 p-1 bg-red-500 text-white rounded opacity-0 group-hover:opacity-100 transition-opacity"
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

export default SiteEditor;
