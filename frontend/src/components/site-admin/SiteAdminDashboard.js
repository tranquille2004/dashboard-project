import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useSiteAdmin } from '@/contexts/SiteAdminContext';
import { 
  LogOut, Menu, Clock, Image, Save, Plus, Trash2, 
  Check, X, AlertCircle, Settings, DollarSign, Star, Bed, Eye, Calendar, Upload
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
    { id: 'overview', label: 'Resumen', icon: Settings, always: true },
    { id: 'room_prices', label: isHotel ? 'Tarifas' : null, icon: DollarSign, permission: 'prices', hotelOnly: true },
    { id: 'events', label: isHotel ? 'Eventos' : null, icon: Calendar, permission: 'prices', hotelOnly: true },
    { id: 'hours', label: 'Horarios', icon: Clock, permission: 'opening_hours' },
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
                {permissions.menu_items && <li>✓ Menú</li>}
                {permissions.menu_prices && <li>✓ Precios</li>}
                {permissions.opening_hours && <li>✓ Horarios</li>}
                {permissions.closure_notice && <li>✓ Avisos de cierre</li>}
                {permissions.gallery && <li>✓ Fotos</li>}
                {permissions.contact_info && <li>✓ Contacto</li>}
              </ul>
            </div>
          </div>

          {/* Content */}
          <div className="flex-1">
            <div className="bg-white rounded-lg shadow p-6">
              {/* Overview Tab */}
              {activeTab === 'overview' && (
                <div className="space-y-6">
                  <h2 className="text-xl font-semibold border-b pb-4">Resumen</h2>
                  <div className="grid grid-cols-2 gap-6">
                    <div className="bg-gray-50 rounded-lg p-6">
                      <h3 className="font-medium text-gray-700 mb-2">Sitio Web</h3>
                      <p className="text-2xl font-bold text-gray-900">{site?.name}</p>
                      <p className="text-gray-500">{site?.domains?.[0] || site?.slug}</p>
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

// Room Prices Tab Component for Hotels
const RoomPricesTab = ({ config, setConfig, saveConfig, saving }) => {
  const [showPreview, setShowPreview] = useState(false);
  const roomPrices = config?.room_prices || [
    { id: 'single', name_es: 'Habitación Clásica', name_en: 'Classic Room', description_es: '', price: 0, features: ['WiFi', 'Smart TV', 'A/C'], is_featured: false },
    { id: 'double', name_es: 'Habitación Superior', name_en: 'Superior Room', description_es: '', price: 0, features: ['WiFi', 'Smart TV', 'A/C', 'Mini Bar'], is_featured: true },
    { id: 'suite', name_es: 'Suite Ejecutiva', name_en: 'Executive Suite', description_es: '', price: 0, features: ['WiFi', 'Smart TV', 'A/C', 'Mini Bar', 'Jacuzzi'], is_featured: false }
  ];

  const updateRoom = (index, field, value) => {
    const updated = [...roomPrices];
    updated[index] = { ...updated[index], [field]: value };
    setConfig({ ...config, room_prices: updated });
  };

  const addFeature = (index) => {
    const feature = prompt('Nueva característica (ej. WiFi, Jacuzzi, Mini Bar):');
    if (!feature) return;
    const updated = [...roomPrices];
    updated[index] = { ...updated[index], features: [...(updated[index].features || []), feature] };
    setConfig({ ...config, room_prices: updated });
  };

  const removeFeature = (roomIndex, featureIndex) => {
    const updated = [...roomPrices];
    updated[roomIndex] = { ...updated[roomIndex], features: updated[roomIndex].features.filter((_, i) => i !== featureIndex) };
    setConfig({ ...config, room_prices: updated });
  };

  const addRoom = () => {
    const newRoom = {
      id: `room_${Date.now()}`,
      name_es: 'Nueva Habitación',
      name_en: 'New Room',
      description_es: '',
      price: 0,
      features: ['WiFi'],
      is_featured: false
    };
    setConfig({ ...config, room_prices: [...roomPrices, newRoom] });
  };

  const removeRoom = (index) => {
    if (!window.confirm('¿Está seguro que desea eliminar este tipo de habitación?')) return;
    const updated = roomPrices.filter((_, i) => i !== index);
    setConfig({ ...config, room_prices: updated });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between border-b pb-4">
        <h2 className="text-xl font-semibold" data-testid="room-prices-title">Tarifas</h2>
        <div className="flex gap-3">
          <button
            onClick={() => setShowPreview(!showPreview)}
            className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors ${showPreview ? 'bg-amber-500 text-white' : 'bg-amber-100 text-amber-700 hover:bg-amber-200'}`}
            data-testid="preview-room-prices-btn"
          >
            <Eye className="w-4 h-4" />
            <span>{showPreview ? 'Ocultar Vista Previa' : 'Vista Previa'}</span>
          </button>
          <button
            onClick={addRoom}
            className="flex items-center space-x-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
            data-testid="add-room-btn"
          >
            <Plus className="w-4 h-4" />
            <span>Agregar Tipo</span>
          </button>
          <button
            onClick={saveConfig}
            disabled={saving}
            className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50"
            data-testid="save-room-prices-btn"
          >
            <Save className="w-4 h-4" />
            <span>{saving ? 'Guardando...' : 'Guardar'}</span>
          </button>
        </div>
      </div>

      <p className="text-sm text-gray-500">
        Configure aquí las tarifas. Se actualizan automáticamente en el sitio web.
        Ponga el precio en 0 para mostrar "Precio próximamente".
      </p>

      {/* Live Preview Panel */}
      {showPreview && (
        <div className="bg-emerald-900 rounded-xl p-8 text-white" data-testid="room-prices-preview">
          <div className="text-center mb-6">
            <p className="text-amber-400 text-xs tracking-widest uppercase mb-2">Vista previa - Así se ve en el sitio web</p>
            <h3 className="text-2xl font-serif">Tarifas</h3>
          </div>
          <div className="grid md:grid-cols-3 gap-4">
            {roomPrices.map((room, i) => (
              <div key={room.id || i} className={`bg-white text-gray-800 rounded-lg overflow-hidden shadow-lg ${room.is_featured ? 'ring-2 ring-amber-400 scale-105' : ''}`}>
                {room.is_featured && (
                  <div className="bg-amber-500 text-white text-center py-1.5 text-xs tracking-widest uppercase">Popular</div>
                )}
                <div className="p-5">
                  <h4 className="text-lg font-serif text-emerald-800 mb-1">{room.name_es || 'Nombre'}</h4>
                  <p className="text-gray-400 text-xs mb-3">{room.description_es || 'Sin descripción'}</p>
                  <div className="border-t border-b border-gray-100 py-3 my-3 text-center">
                    {room.price > 0 ? (
                      <>
                        <span className="text-2xl font-serif text-amber-600">${room.price}</span>
                        <span className="text-gray-400 text-xs ml-1">/ por noche</span>
                      </>
                    ) : (
                      <span className="text-sm text-gray-400 italic">Precio próximamente</span>
                    )}
                  </div>
                  <ul className="space-y-1.5">
                    {(room.features || []).map((f, j) => (
                      <li key={j} className="flex items-center gap-2 text-xs text-gray-600">
                        <Star className="w-3 h-3 text-emerald-500" />
                        {f}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {roomPrices.map((room, index) => (
        <div key={room.id || index} className={`border rounded-lg p-6 space-y-4 ${room.is_featured ? 'border-amber-400 bg-amber-50/50' : 'border-gray-200'}`}
             data-testid={`room-card-${index}`}>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Bed className="w-5 h-5 text-emerald-600" />
              <span className="font-semibold text-lg">{room.name_es || 'Nuevo tipo'}</span>
              {room.is_featured && <span className="px-2 py-0.5 bg-amber-500 text-white text-xs rounded">Popular</span>}
            </div>
            <div className="flex items-center gap-3">
              <label className="flex items-center gap-2 text-sm cursor-pointer">
                <input
                  type="checkbox"
                  checked={room.is_featured || false}
                  onChange={(e) => updateRoom(index, 'is_featured', e.target.checked)}
                  className="w-4 h-4 rounded border-gray-300 text-amber-500"
                />
                Popular
              </label>
              <button onClick={() => removeRoom(index)} className="p-1.5 text-red-500 hover:bg-red-50 rounded" data-testid={`remove-room-${index}`}>
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs text-gray-500 mb-1">Nombre (Español)</label>
              <input
                type="text"
                value={room.name_es || ''}
                onChange={(e) => updateRoom(index, 'name_es', e.target.value)}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm text-gray-900 bg-white"
                placeholder="Habitación Clásica"
                data-testid={`room-name-es-${index}`}
              />
            </div>
            <div>
              <label className="block text-xs text-gray-500 mb-1">Nombre (Inglés)</label>
              <input
                type="text"
                value={room.name_en || ''}
                onChange={(e) => updateRoom(index, 'name_en', e.target.value)}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm text-gray-900 bg-white"
                placeholder="Classic Room"
                data-testid={`room-name-en-${index}`}
              />
            </div>
          </div>

          <div>
            <label className="block text-xs text-gray-500 mb-1">Beschrijving (Spaans)</label>
            <textarea
              value={room.description_es || ''}
              onChange={(e) => updateRoom(index, 'description_es', e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm text-gray-900 bg-white h-16"
              placeholder="Perfecta para viajeros individuales..."
              data-testid={`room-desc-${index}`}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs text-gray-500 mb-1">Precio por noche ($)</label>
              <input
                type="number"
                step="0.50"
                min="0"
                value={room.price || 0}
                onChange={(e) => updateRoom(index, 'price', parseFloat(e.target.value) || 0)}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm text-gray-900 bg-white"
                data-testid={`room-price-${index}`}
              />
              {room.price === 0 && <p className="text-xs text-amber-600 mt-1">Precio 0 = "Precio próximamente" en el sitio web</p>}
            </div>
          </div>

          <div>
            <label className="block text-xs text-gray-500 mb-2">Características</label>
            <div className="flex flex-wrap gap-2">
              {(room.features || []).map((feature, fi) => (
                <span key={fi} className="inline-flex items-center gap-1.5 px-3 py-1 bg-emerald-50 text-emerald-700 text-sm rounded-full border border-emerald-200">
                  <Star className="w-3 h-3" />
                  {feature}
                  <button onClick={() => removeFeature(index, fi)} className="ml-1 text-red-400 hover:text-red-600">
                    <X className="w-3 h-3" />
                  </button>
                </span>
              ))}
              <button
                onClick={() => addFeature(index)}
                className="inline-flex items-center gap-1 px-3 py-1 bg-gray-100 text-gray-600 text-sm rounded-full border border-gray-200 hover:bg-gray-200"
                data-testid={`add-feature-${index}`}
              >
                <Plus className="w-3 h-3" />
                Agregar
              </button>
            </div>
          </div>
        </div>
      ))}
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
          <img src={`${API}/images${currentImage.replace('/images', '')}`} alt="" className="w-full h-full object-cover" />
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
                src={img.startsWith('http') ? img : `${API}/images${img.replace('/images', '')}`} 
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
