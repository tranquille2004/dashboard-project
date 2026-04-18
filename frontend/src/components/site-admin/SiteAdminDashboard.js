import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useSiteAdmin } from '@/contexts/SiteAdminContext';
import { 
  LogOut, Menu, Clock, Image, Save, Plus, Trash2, 
  Check, X, AlertCircle, Settings, DollarSign, Star, Bed, Eye, Calendar, Upload, BarChart3
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
        name_nl: 'Nuevo Elemento',
        price: 0,
        sort_order: menuItems.length
      }, { withCredentials: true });
      setMenuItems([...menuItems, response.data]);
      showMessage('Elemento agregado!');
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
    if (!window.confirm('¿Está seguro que desea eliminar este elemento?')) return;
    try {
      await axios.delete(`${API}/site-admin/menu/${itemId}`, { withCredentials: true });
      setMenuItems(menuItems.filter(item => item.item_id !== itemId));
      showMessage('Elemento eliminado!');
    } catch (error) {
      showMessage(error.response?.data?.detail || 'Fout bij verwijderen', 'error');
    }
  };

  const addGalleryImage = async () => {
    const url = prompt('Ingrese la URL de la imagen:');
    if (!url) return;
    try {
      const response = await axios.post(`${API}/site-admin/gallery`, { 
        url, 
        sort_order: gallery.length 
      }, { withCredentials: true });
      setGallery([...gallery, response.data]);
      showMessage('Foto agregada!');
    } catch (error) {
      showMessage(error.response?.data?.detail || 'Fout bij toevoegen', 'error');
    }
  };

  const deleteGalleryImage = async (imageId) => {
    try {
      await axios.delete(`${API}/site-admin/gallery/${imageId}`, { withCredentials: true });
      setGallery(gallery.filter(img => img.image_id !== imageId));
      showMessage('Foto eliminada!');
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

  const isHotel = site?.site_type === 'hotel';

  const tabs = [
    { id: 'overview', label: 'Anuncio Especial', icon: Settings, always: true },
    { id: 'stats', label: isHotel ? 'Estadísticas' : null, icon: BarChart3, permission: 'prices', hotelOnly: true },
    { id: 'room_prices', label: isHotel ? 'Tarifas' : null, icon: DollarSign, permission: 'prices', hotelOnly: true },
    { id: 'events', label: isHotel ? 'Eventos' : null, icon: Calendar, permission: 'prices', hotelOnly: true },
    { id: 'hours', label: !isHotel ? 'Horarios' : null, icon: Clock, permission: 'opening_hours' },
    { id: 'menu', label: 'Menú', icon: Menu, permission: 'menu_items' },
    { id: 'gallery_hotel', label: isHotel ? 'Fotos Hotel' : null, icon: Image, permission: 'gallery', hotelOnly: true },
    { id: 'gallery_restaurant', label: isHotel ? 'Fotos Restaurante' : null, icon: Image, permission: 'gallery', hotelOnly: true },
    { id: 'gallery', label: !isHotel ? 'Fotos' : null, icon: Image, permission: 'gallery' },
  ].filter(tab => {
    if (tab.hotelOnly && !isHotel) return false;
    if (!tab.label) return false;
    return tab.always || permissions[tab.permission];
  });

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
              <p className="text-gray-500 text-sm">Bienvenido, {admin.name}</p>
            </div>
            <button
              onClick={logout}
              className="flex items-center space-x-2 text-gray-600 hover:text-gray-900"
              data-testid="site-admin-logout-btn"
            >
              <LogOut className="w-5 h-5" />
              <span>Cerrar Sesión</span>
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
              <h4 className="font-medium text-blue-900 mb-2">Tus Permisos</h4>
              <ul className="text-sm text-blue-700 space-y-1">
                {permissions.prices && <li>✓ Tarifas</li>}
                {permissions.prices && <li>✓ Eventos</li>}
                {permissions.menu_items && <li>✓ Menú</li>}
                {permissions.gallery && <li>✓ Fotos Hotel</li>}
                {permissions.gallery && <li>✓ Fotos Restaurante</li>}
                {permissions.contact_info && <li>✓ Contacto</li>}
                {permissions.opening_hours && !isHotel && <li>✓ Horarios</li>}
              </ul>
            </div>
          </div>

          {/* Content */}
          <div className="flex-1">
            <div className="bg-white rounded-lg shadow p-6">
              {/* Overview Tab */}
              {activeTab === 'overview' && (
                <div className="space-y-6">
                  <h2 className="text-xl font-semibold border-b pb-4">Anuncio Especial</h2>
                  <div className="grid grid-cols-2 gap-6">
                    <div className="bg-gray-50 rounded-lg p-6">
                      <h3 className="font-medium text-gray-700 mb-2">Sitio Web</h3>
                      <p className="text-2xl font-bold text-gray-900">{site?.name}</p>
                      <p className="text-gray-500">hoteldelpacifico.net</p>
                    </div>
                    <div className="bg-gray-50 rounded-lg p-6">
                      <h3 className="font-medium text-gray-700 mb-2">Elementos del Menú</h3>
                      <p className="text-2xl font-bold text-gray-900">{menuItems.length}</p>
                    </div>
                  </div>

                  {/* Special Announcement Section */}
                  <div className="border-2 border-orange-200 bg-orange-50 rounded-lg p-6">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-lg font-semibold text-orange-800">
                        Anuncio Especial
                      </h3>
                      <label className="flex items-center space-x-2 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={config?.special_announcement_active || false}
                          onChange={(e) => setConfig({ ...config, special_announcement_active: e.target.checked })}
                          className="w-5 h-5 rounded border-gray-300 text-orange-600 focus:ring-orange-500"
                        />
                        <span className="text-sm font-medium text-gray-700">Activo en sitio web</span>
                      </label>
                    </div>
                    <p className="text-sm text-orange-700 mb-3">
                      Este mensaje se muestra en la página principal. 
                      Úselo para eventos especiales, cierres, etc.
                    </p>
                    <div className="mb-3">
                      <label className="block text-sm font-medium text-gray-700 mb-1">Tipo de mensaje</label>
                      <select
                        value={config?.special_announcement_type || 'info'}
                        onChange={(e) => setConfig({ ...config, special_announcement_type: e.target.value })}
                        className="w-full border border-gray-300 rounded-lg px-3 py-2 text-gray-900 bg-white"
                      >
                        <option value="info">Información (azul)</option>
                        <option value="warning">Advertencia (naranja)</option>
                        <option value="success">Buenas noticias (verde)</option>
                      </select>
                    </div>
                    <textarea
                      value={config?.special_announcement || ''}
                      onChange={(e) => setConfig({ ...config, special_announcement: e.target.value })}
                      className="w-full border border-gray-300 rounded-lg px-4 py-3 text-gray-900 bg-white h-32"
                      placeholder="Ej: Menú especial de Navidad disponible. ¡Reserve ahora!"
                    />
                    <button
                      onClick={saveConfig}
                      disabled={saving}
                      className="mt-3 flex items-center space-x-2 px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 disabled:opacity-50"
                    >
                      <Save className="w-4 h-4" />
                      <span>{saving ? 'Guardando...' : 'Guardar Anuncio'}</span>
                    </button>
                  </div>

                  {permissions.closure_notice && (
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Aviso de cierre (visible en el sitio web)
                      </label>
                      <textarea
                        value={config?.closure_notice || ''}
                        onChange={(e) => setConfig({ ...config, closure_notice: e.target.value })}
                        className="w-full border border-gray-300 rounded-lg px-4 py-3 text-gray-900 bg-white h-24"
                        placeholder="Ej: Estaremos cerrados del 24 al 26 de diciembre..."
                      />
                      <button
                        onClick={saveConfig}
                        disabled={saving}
                        className="mt-3 flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50"
                      >
                        <Save className="w-4 h-4" />
                        <span>{saving ? 'Guardando...' : 'Guardar'}</span>
                      </button>
                    </div>
                  )}
                </div>
              )}

              {/* Hours Tab */}
              {activeTab === 'hours' && permissions.opening_hours && (
                <div className="space-y-6">
                  <div className="flex items-center justify-between border-b pb-4">
                    <h2 className="text-xl font-semibold">Horarios</h2>
                    <button
                      onClick={saveConfig}
                      disabled={saving}
                      className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50"
                    >
                      <Save className="w-4 h-4" />
                      <span>{saving ? 'Guardando...' : 'Guardar'}</span>
                    </button>
                  </div>
                  
                  <div>
                    <p className="text-gray-600 mb-4">
                      Ingrese sus horarios en formato JSON. Por ejemplo:
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
                      <span>Agregar Elemento</span>
                    </button>
                  </div>
                  
                  {menuItems.length === 0 ? (
                    <div className="text-center py-12 text-gray-500">
                      <Menu className="w-12 h-12 mx-auto mb-4 opacity-50" />
                      <p>No hay elementos en el menú. Haga clic en "Agregar Elemento" para comenzar.</p>
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
                              <label className="block text-xs text-gray-500 mb-1">Nombre</label>
                              <input
                                type="text"
                                value={item.name_nl}
                                onChange={(e) => updateMenuItem(item.item_id, { name_nl: e.target.value })}
                                className="w-full border border-gray-300 rounded px-2 py-1.5 text-sm text-gray-900 bg-white"
                              />
                            </div>
                            <div className="flex items-end space-x-2">
                              <div className="flex-1">
                                <label className="block text-xs text-gray-500 mb-1">Precio ($)</label>
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
                                title="Eliminar"
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

              {/* Stats Tab - Hotel only */}
              {activeTab === 'stats' && isHotel && (
                <StatsTab />
              )}

              {/* Room Prices Tab - Hotel only */}
              {activeTab === 'room_prices' && isHotel && permissions.prices && (
                <RoomPricesTab config={config} setConfig={setConfig} saveConfig={saveConfig} saving={saving} />
              )}

              {/* Events Tab - Hotel only */}
              {activeTab === 'events' && isHotel && permissions.prices && (
                <EventsTab config={config} setConfig={setConfig} saveConfig={saveConfig} saving={saving} />
              )}

              {/* Gallery Tab - non-hotel */}
              {activeTab === 'gallery' && !isHotel && permissions.gallery && (
                <div className="space-y-6">
                  <div className="flex items-center justify-between border-b pb-4">
                    <h2 className="text-xl font-semibold">Fotos</h2>
                    <button onClick={addGalleryImage} className="flex items-center space-x-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700">
                      <Plus className="w-5 h-5" /><span>Agregar Foto</span>
                    </button>
                  </div>
                  {gallery.length === 0 ? (
                    <div className="text-center py-12 text-gray-500">
                      <Image className="w-12 h-12 mx-auto mb-4 opacity-50" />
                      <p>No hay fotos. Haga clic en "Agregar Foto" para comenzar.</p>
                    </div>
                  ) : (
                    <div className="grid grid-cols-4 gap-4">
                      {gallery.map(img => (
                        <div key={img.image_id} className="relative group">
                          <img src={img.url} alt="" className="w-full h-32 object-cover rounded-lg" />
                          <button onClick={() => deleteGalleryImage(img.image_id)} className="absolute top-2 right-2 p-1.5 bg-red-500 text-white rounded opacity-0 group-hover:opacity-100 transition-opacity" title="Eliminar">
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}

              {/* Hotel Gallery Tab */}
              {activeTab === 'gallery_hotel' && isHotel && permissions.gallery && (
                <GalleryManager title="Galería del Hotel" folder="rooms" config={config} setConfig={setConfig} saveConfig={saveConfig} saving={saving} configKey="hotel_gallery" />
              )}

              {/* Restaurant Gallery Tab */}
              {activeTab === 'gallery_restaurant' && isHotel && permissions.gallery && (
                <GalleryManager title="Galería del Restaurante" folder="restaurant" config={config} setConfig={setConfig} saveConfig={saveConfig} saving={saving} configKey="restaurant_gallery" />
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Room Prices Tab Component for Hotels - AC/Ventilador format
const RoomPricesTab = ({ config, setConfig, saveConfig, saving }) => {
  const pricing = config?.room_prices?.pricing || { ac: [], fan: [] };

  const updatePrice = (category, index, value) => {
    const updated = { ...pricing };
    updated[category] = [...updated[category]];
    updated[category][index] = { ...updated[category][index], price: parseFloat(value) || 0 };
    setConfig({ ...config, room_prices: { ...config?.room_prices, pricing: updated } });
  };

  const addRoom = (category) => {
    const name = prompt('Nombre del tipo (ej. Individual, Matrimonial, Doble, Triple):');
    if (!name) return;
    const updated = { ...pricing };
    updated[category] = [...updated[category], { type: name, price: 0 }];
    setConfig({ ...config, room_prices: { ...config?.room_prices, pricing: updated } });
  };

  const removeRoom = (category, index) => {
    if (!window.confirm('¿Eliminar este tipo de habitación?')) return;
    const updated = { ...pricing };
    updated[category] = updated[category].filter((_, i) => i !== index);
    setConfig({ ...config, room_prices: { ...config?.room_prices, pricing: updated } });
  };

  const PriceCategory = ({ title, subtitle, category, accent }) => (
    <div className="border rounded-lg overflow-hidden">
      <div className={`${accent} text-white p-4 text-center`}>
        <h3 className="text-lg font-serif">{title}</h3>
        <p className="text-emerald-200 text-xs">{subtitle}</p>
      </div>
      <div className="divide-y">
        {(pricing[category] || []).map((room, i) => (
          <div key={i} className="flex items-center gap-4 px-4 py-3">
            <span className="flex-1 text-gray-700 text-sm">Hab. {room.type}</span>
            <div className="flex items-center gap-2">
              <span className="text-gray-400 text-sm">$</span>
              <input type="number" step="0.50" min="0" value={room.price || 0}
                onChange={(e) => updatePrice(category, i, e.target.value)}
                className="w-24 border border-gray-300 rounded px-2 py-1 text-sm text-right text-gray-900 bg-white" />
            </div>
            <button onClick={() => removeRoom(category, i)} className="p-1 text-red-400 hover:text-red-600"><Trash2 className="w-3.5 h-3.5" /></button>
          </div>
        ))}
      </div>
      <button onClick={() => addRoom(category)} className="w-full flex items-center justify-center gap-1 py-2 text-sm text-emerald-600 hover:bg-emerald-50 border-t">
        <Plus className="w-3.5 h-3.5" /> Agregar tipo
      </button>
    </div>
  );

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between border-b pb-4">
        <h2 className="text-xl font-semibold">Tarifas</h2>
        <button onClick={saveConfig} disabled={saving} className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50">
          <Save className="w-4 h-4" /><span>{saving ? 'Guardando...' : 'Guardar'}</span>
        </button>
      </div>
      <p className="text-sm text-gray-500">Configure las tarifas por noche. Los cambios se reflejan automáticamente en el sitio web.</p>
      <div className="grid md:grid-cols-2 gap-6">
        <PriceCategory title="Aire Acondicionado" subtitle="Air Conditioning" category="ac" accent="bg-emerald-700" />
        <PriceCategory title="Ventilador" subtitle="Fan" category="fan" accent="bg-emerald-600" />
      </div>
    </div>
  );
};

// Events Tab Component for Hotels
// Image Upload Helper
const ImageUploader = ({ currentImage, onUploaded, folder }) => {
  const [uploading, setUploading] = useState(false);

  const handleUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    try {
      const formData = new FormData();
      formData.append('file', file);
      formData.append('folder', folder);
      const res = await axios.post(`${API}/site-admin/upload`, formData, {
        withCredentials: true,
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      if (res.data?.path) onUploaded(res.data.path);
    } catch (err) {
      alert('Error al subir: ' + (err.response?.data?.detail || err.message));
    }
    setUploading(false);
  };

  return (
    <div className="space-y-2">
      {currentImage && (
        <div className="w-full h-40 bg-gray-100 rounded-lg overflow-hidden">
          <img src={currentImage} alt="" className="w-full h-full object-cover" />
        </div>
      )}
      <label className={`flex items-center justify-center gap-2 px-4 py-3 border-2 border-dashed rounded-lg cursor-pointer transition-colors ${uploading ? 'border-gray-300 bg-gray-50' : 'border-emerald-300 hover:border-emerald-500 hover:bg-emerald-50'}`}>
        <Upload className="w-4 h-4" />
        <span className="text-sm">{uploading ? 'Subiendo...' : currentImage ? 'Cambiar foto' : 'Subir foto'}</span>
        <input type="file" accept="image/*" onChange={handleUpload} disabled={uploading} className="hidden" />
      </label>
    </div>
  );
};

const EventsTab = ({ config, setConfig, saveConfig, saving }) => {
  const events = config?.events || [];

  const addEvent = () => {
    const newEvent = {
      id: `event_${Date.now()}`,
      title: '',
      description: '',
      date: new Date().toISOString().split('T')[0],
      date_display: '',
      time: '',
      location: 'Hotel del Pacífico',
      price: '',
      info: '',
      image: '',
      is_active: true
    };
    setConfig({ ...config, events: [...events, newEvent] });
  };

  const updateEvent = (index, field, value) => {
    const updated = [...events];
    updated[index] = { ...updated[index], [field]: value };
    setConfig({ ...config, events: updated });
  };

  const removeEvent = (index) => {
    if (!window.confirm('¿Está seguro que desea eliminar este evento?')) return;
    setConfig({ ...config, events: events.filter((_, i) => i !== index) });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between border-b pb-4">
        <h2 className="text-xl font-semibold" data-testid="events-title">Eventos Especiales</h2>
        <div className="flex gap-3">
          <button onClick={addEvent} className="flex items-center space-x-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700" data-testid="add-event-btn">
            <Plus className="w-4 h-4" /><span>Agregar Evento</span>
          </button>
          <button onClick={saveConfig} disabled={saving} className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50" data-testid="save-events-btn">
            <Save className="w-4 h-4" /><span>{saving ? 'Guardando...' : 'Guardar'}</span>
          </button>
        </div>
      </div>

      <p className="text-sm text-gray-500">Administre aquí los eventos especiales. Los eventos activos se muestran en el sitio web.</p>

      {events.length === 0 ? (
        <div className="text-center py-12 text-gray-500">
          <Calendar className="w-12 h-12 mx-auto mb-4 opacity-50" />
          <p>Nog geen events. Klik op "Event Toevoegen" om te beginnen.</p>
        </div>
      ) : events.map((event, index) => (
        <div key={event.id || index} className={`border rounded-lg p-6 space-y-4 ${event.is_active ? 'border-emerald-400 bg-emerald-50/30' : 'border-gray-200 bg-gray-50'}`} data-testid={`event-card-${index}`}>
          <div className="flex items-center justify-between">
            <span className="font-semibold text-lg">{event.title || 'Nuevo evento'}</span>
            <div className="flex items-center gap-3">
              <label className="flex items-center gap-2 text-sm cursor-pointer">
                <input type="checkbox" checked={event.is_active || false} onChange={(e) => updateEvent(index, 'is_active', e.target.checked)} className="w-4 h-4 rounded" />
                Activo
              </label>
              <button onClick={() => removeEvent(index)} className="p-1.5 text-red-500 hover:bg-red-50 rounded"><Trash2 className="w-4 h-4" /></button>
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-4">
            {/* Left: Form Fields */}
            <div className="md:col-span-2 space-y-4">
              <div>
                <label className="block text-xs text-gray-500 mb-1">Título</label>
                <input type="text" value={event.title || ''} onChange={(e) => updateEvent(index, 'title', e.target.value)} className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm text-gray-900 bg-white" placeholder='Taller "Pinta tu Mascota"' />
              </div>

              <div>
                <label className="block text-xs text-gray-500 mb-1">Descripción</label>
                <textarea value={event.description || ''} onChange={(e) => updateEvent(index, 'description', e.target.value)} className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm text-gray-900 bg-white h-20" placeholder="Describa el evento..." />
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="block text-xs text-gray-500 mb-1">Fecha</label>
                  <input type="date" value={event.date || ''} onChange={(e) => updateEvent(index, 'date', e.target.value)} className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm text-gray-900 bg-white" />
                </div>
                <div>
                  <label className="block text-xs text-gray-500 mb-1">Fecha para mostrar</label>
                  <input type="text" value={event.date_display || ''} onChange={(e) => updateEvent(index, 'date_display', e.target.value)} className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm text-gray-900 bg-white" placeholder="Domingo 26 de Abril" />
                </div>
                <div>
                  <label className="block text-xs text-gray-500 mb-1">Hora</label>
                  <input type="text" value={event.time || ''} onChange={(e) => updateEvent(index, 'time', e.target.value)} className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm text-gray-900 bg-white" placeholder="9:00 a 13:00" />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs text-gray-500 mb-1">Ubicación / Dirección</label>
                  <input type="text" value={event.location || ''} onChange={(e) => updateEvent(index, 'location', e.target.value)} className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm text-gray-900 bg-white" />
                </div>
                <div>
                  <label className="block text-xs text-gray-500 mb-1">Precio</label>
                  <input type="text" value={event.price || ''} onChange={(e) => updateEvent(index, 'price', e.target.value)} className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm text-gray-900 bg-white" placeholder="$20" />
                </div>
              </div>

              <div>
                <label className="block text-xs text-gray-500 mb-1">Información adicional (incluye, notas, etc.)</label>
                <textarea value={event.info || ''} onChange={(e) => updateEvent(index, 'info', e.target.value)} className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm text-gray-900 bg-white h-20" placeholder="Materiales incluidos, Copa de Vino y Bocaditos, ..." />
              </div>
            </div>

            {/* Right: Photo Upload */}
            <div>
              <label className="block text-xs text-gray-500 mb-1">Event foto</label>
              <ImageUploader 
                currentImage={event.image} 
                onUploaded={(path) => updateEvent(index, 'image', path)} 
                folder="events" 
              />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

// Stats Tab Component
const StatsTab = () => {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      try {
        const res = await axios.get(`${API}/site-admin/analytics`, { withCredentials: true });
        setStats(res.data);
      } catch (err) {
        console.error('Stats load error:', err);
      }
      setLoading(false);
    };
    load();
  }, []);

  if (loading) return <div className="text-center py-12 text-gray-500">Cargando estadísticas...</div>;
  if (!stats) return <div className="text-center py-12 text-gray-500">No se pudieron cargar las estadísticas.</div>;

  const maxDaily = Math.max(...(stats.daily || []).map(d => d.visits), 1);

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold border-b pb-4">Visitantes Únicos</h2>

      {/* Summary Cards */}
      <div className="grid grid-cols-4 gap-4">
        {[
          { label: 'Hoy', value: stats.today, color: 'bg-blue-50 text-blue-700' },
          { label: 'Esta Semana', value: stats.week, color: 'bg-emerald-50 text-emerald-700' },
          { label: 'Este Mes', value: stats.month, color: 'bg-amber-50 text-amber-700' },
          { label: 'Total', value: stats.total, color: 'bg-purple-50 text-purple-700' }
        ].map((card, i) => (
          <div key={i} className={`${card.color} rounded-lg p-5 text-center`}>
            <p className="text-3xl font-bold">{card.value}</p>
            <p className="text-sm mt-1 opacity-75">{card.label}</p>
          </div>
        ))}
      </div>

      {/* Daily Chart */}
      {stats.daily && stats.daily.length > 0 && (
        <div className="bg-white border rounded-lg p-6">
          <h3 className="font-medium text-gray-700 mb-4">Visitantes Únicos por Día (últimos 30 días)</h3>
          <div className="flex items-end gap-1 h-40">
            {stats.daily.map((day, i) => (
              <div key={i} className="flex-1 flex flex-col items-center gap-1 group relative">
                <div className="absolute -top-8 bg-gray-800 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 whitespace-nowrap z-10">
                  {day.date}: {day.visits} visitas
                </div>
                <div
                  className="w-full bg-emerald-500 rounded-t hover:bg-emerald-600 transition-colors min-h-[2px]"
                  style={{ height: `${(day.visits / maxDaily) * 100}%` }}
                />
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="grid md:grid-cols-2 gap-6">
        {/* Countries */}
        <div className="bg-white border rounded-lg p-6">
          <h3 className="font-medium text-gray-700 mb-4">Visitantes por País</h3>
          {stats.countries && stats.countries.length > 0 ? (
            <div className="space-y-2">
              {stats.countries.map((c, i) => (
                <div key={i} className="flex items-center justify-between">
                  <span className="text-sm text-gray-700">{c.country}</span>
                  <div className="flex items-center gap-2">
                    <div className="w-24 bg-gray-100 rounded-full h-2">
                      <div className="bg-emerald-500 h-2 rounded-full" style={{ width: `${(c.visits / stats.countries[0].visits) * 100}%` }} />
                    </div>
                    <span className="text-sm font-medium text-gray-600 w-10 text-right">{c.visits}</span>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-sm text-gray-400">Aún no hay datos de países.</p>
          )}
        </div>

        {/* Top Pages */}
        <div className="bg-white border rounded-lg p-6">
          <h3 className="font-medium text-gray-700 mb-4">Páginas Más Visitadas</h3>
          {stats.pages && stats.pages.length > 0 ? (
            <div className="space-y-2">
              {stats.pages.map((p, i) => (
                <div key={i} className="flex items-center justify-between">
                  <span className="text-sm text-gray-700">{p.page === '/' ? 'Inicio' : p.page.split('/').pop() || p.page}</span>
                  <span className="text-sm font-medium text-gray-600">{p.visits}</span>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-sm text-gray-400">Aún no hay datos de páginas.</p>
          )}
        </div>
      </div>
    </div>
  );
};

// Gallery Manager Component for Hotels (Hotel + Restaurant galleries)
const GalleryManager = ({ title, folder, config, setConfig, saveConfig, saving, configKey }) => {
  const [uploading, setUploading] = useState(false);
  const images = config?.[configKey] || [];

  const handleUpload = async (e) => {
    const files = Array.from(e.target.files || []);
    if (!files.length) return;
    setUploading(true);
    const newImages = [...images];
    for (const file of files) {
      try {
        const formData = new FormData();
        formData.append('file', file);
        formData.append('folder', folder);
        const res = await axios.post(`${API}/site-admin/upload`, formData, {
          withCredentials: true,
          headers: { 'Content-Type': 'multipart/form-data' }
        });
        if (res.data?.path) newImages.push(res.data.path);
      } catch (err) {
        alert('Error: ' + (err.response?.data?.detail || err.message));
      }
    }
    setConfig({ ...config, [configKey]: newImages });
    setUploading(false);
  };

  const removeImage = (index) => {
    if (!window.confirm('¿Eliminar esta foto?')) return;
    const updated = images.filter((_, i) => i !== index);
    setConfig({ ...config, [configKey]: updated });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between border-b pb-4">
        <h2 className="text-xl font-semibold">{title}</h2>
        <div className="flex gap-3">
          <label className={`flex items-center space-x-2 px-4 py-2 rounded-lg cursor-pointer transition-colors ${uploading ? 'bg-gray-400 text-white' : 'bg-green-600 text-white hover:bg-green-700'}`}>
            <Upload className="w-4 h-4" />
            <span>{uploading ? 'Subiendo...' : 'Subir Fotos'}</span>
            <input type="file" accept="image/*" multiple onChange={handleUpload} disabled={uploading} className="hidden" />
          </label>
          <button onClick={saveConfig} disabled={saving} className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50">
            <Save className="w-4 h-4" />
            <span>{saving ? 'Guardando...' : 'Guardar'}</span>
          </button>
        </div>
      </div>

      <p className="text-sm text-gray-500">
        {images.length} foto(s). Suba nuevas fotos o elimine las existentes. Los cambios se guardan al hacer clic en "Guardar".
      </p>

      {images.length === 0 ? (
        <div className="text-center py-12 text-gray-500">
          <Image className="w-12 h-12 mx-auto mb-4 opacity-50" />
          <p>No hay fotos. Use el botón "Subir Fotos" para agregar.</p>
        </div>
      ) : (
        <div className="grid grid-cols-4 gap-4">
          {images.map((img, i) => (
            <div key={i} className="relative group rounded-lg overflow-hidden border border-gray-200">
              <img 
                src={img} 
                alt="" 
                className="w-full h-32 object-cover" 
              />
              <button 
                onClick={() => removeImage(i)} 
                className="absolute top-2 right-2 p-1.5 bg-red-500 text-white rounded opacity-0 group-hover:opacity-100 transition-opacity"
                title="Eliminar"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SiteAdminDashboard;
