// Hacienda Turística San Francisco - Panel de Administración del Cliente (en Español)
// Allows the owner to manage: gallery photos, opening hours, special announcements

import React, { useState, useEffect } from 'react';
import { useSiteAdmin } from '@/contexts/SiteAdminContext';
import {
  LogOut, Image as ImageIcon, FileText, Bell, Calendar,
  Upload, Trash2, Save, AlertTriangle, CheckCircle2, X, Plus
} from 'lucide-react';

const API = process.env.REACT_APP_BACKEND_URL + '/api';

const SanFranciscoAdminDashboard = () => {
  const { admin, logout } = useSiteAdmin();
  const [activeTab, setActiveTab] = useState('config');
  const [config, setConfig] = useState(null);
  const [gallery, setGallery] = useState([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [toast, setToast] = useState(null);

  const showToast = (msg, type = 'success') => {
    setToast({ msg, type });
    setTimeout(() => setToast(null), 4000);
  };

  useEffect(() => {
    loadAll();
  }, []);

  const loadAll = async () => {
    setLoading(true);
    try {
      const [cfgRes, galRes] = await Promise.all([
        fetch(`${API}/site-admin/config`, { credentials: 'include' }),
        fetch(`${API}/site-admin/gallery`, { credentials: 'include' })
      ]);
      if (cfgRes.ok) setConfig(await cfgRes.json());
      if (galRes.ok) setGallery(await galRes.json());
    } catch (e) {
      showToast('Error al cargar datos', 'error');
    } finally {
      setLoading(false);
    }
  };

  const saveConfig = async () => {
    setSaving(true);
    try {
      const res = await fetch(`${API}/site-admin/config`, {
        method: 'PUT',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(config)
      });
      if (!res.ok) throw new Error('Error al guardar');
      showToast('Cambios guardados con éxito');
    } catch (e) {
      showToast('Error al guardar los cambios', 'error');
    } finally {
      setSaving(false);
    }
  };

  const uploadImage = async (file, target = 'gallery') => {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('target', target);
    try {
      const res = await fetch(`${API}/site-admin/upload`, {
        method: 'POST',
        credentials: 'include',
        body: formData
      });
      if (!res.ok) throw new Error('Upload failed');
      const data = await res.json();
      return data.url || data.path;
    } catch (e) {
      showToast('Error al subir el archivo', 'error');
      return null;
    }
  };

  const handleGalleryUpload = async (e) => {
    const files = Array.from(e.target.files || []);
    if (!files.length) return;
    showToast(`Subiendo ${files.length} foto${files.length > 1 ? 's' : ''}...`);
    for (const file of files) {
      const url = await uploadImage(file, 'gallery');
      if (url) {
        await fetch(`${API}/site-admin/gallery`, {
          method: 'POST',
          credentials: 'include',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            url,
            caption: '',
            sort_order: gallery.length
          })
        });
      }
    }
    await loadAll();
    showToast('Fotos añadidas a la galería');
    e.target.value = '';
  };

  const deleteGalleryImage = async (id) => {
    if (!window.confirm('¿Eliminar esta foto de la galería?')) return;
    try {
      const res = await fetch(`${API}/site-admin/gallery/${id}`, {
        method: 'DELETE',
        credentials: 'include'
      });
      if (!res.ok) throw new Error();
      setGallery(gallery.filter(g => g.image_id !== id));
      showToast('Foto eliminada');
    } catch (e) {
      showToast('Error al eliminar', 'error');
    }
  };

  const addEvent = () => {
    const events = config?.events || [];
    setConfig({
      ...config,
      events: [...events, {
        id: `ev_${Date.now()}`,
        title: 'Nuevo evento',
        date: '',
        description: '',
        active: true
      }]
    });
  };

  const updateEvent = (idx, patch) => {
    const events = [...(config?.events || [])];
    events[idx] = { ...events[idx], ...patch };
    setConfig({ ...config, events });
  };

  const removeEvent = (idx) => {
    if (!window.confirm('¿Eliminar este evento?')) return;
    const events = [...(config?.events || [])];
    events.splice(idx, 1);
    setConfig({ ...config, events });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center text-white">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-600 mx-auto mb-4" />
          <p>Cargando...</p>
        </div>
      </div>
    );
  }

  const tabs = [
    { id: 'config', label: 'Anuncio especial', icon: Bell },
    { id: 'menu', label: 'Carta (PDF)', icon: FileText },
    { id: 'gallery', label: 'Galería', icon: ImageIcon },
    { id: 'events', label: 'Eventos', icon: Calendar }
  ];

  return (
    <div className="min-h-screen bg-gray-50" data-site="sanfrancisco">
      {/* Header */}
      <header className="bg-black border-b-4 border-red-600 shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between flex-wrap gap-3">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-full border-2 border-red-600 flex items-center justify-center bg-black">
              <span className="text-red-600 font-bold text-lg">IS</span>
            </div>
            <div>
              <h1 className="text-white font-bold text-lg">Hacienda Turística San Francisco</h1>
              <p className="text-gray-400 text-xs">Panel de Administración</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-gray-300 text-sm hidden sm:block">{admin?.email}</span>
            <button
              onClick={logout}
              className="flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-md text-sm font-medium transition-colors"
              data-testid="sanfrancisco-logout-btn"
            >
              <LogOut size={16} />
              Salir
            </button>
          </div>
        </div>
      </header>

      {/* Toast */}
      {toast && (
        <div className={`fixed top-24 right-4 z-50 px-5 py-3 rounded-lg shadow-2xl flex items-center gap-2 ${
          toast.type === 'error' ? 'bg-red-600 text-white' : 'bg-green-600 text-white'
        }`} data-testid="admin-toast">
          {toast.type === 'error' ? <AlertTriangle size={18} /> : <CheckCircle2 size={18} />}
          <span className="font-medium">{toast.msg}</span>
        </div>
      )}

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Tabs */}
        <div className="flex flex-wrap gap-2 mb-8 border-b border-gray-200">
          {tabs.map(t => {
            const Icon = t.icon;
            return (
              <button
                key={t.id}
                onClick={() => setActiveTab(t.id)}
                className={`flex items-center gap-2 px-5 py-3 font-medium transition-all border-b-2 ${
                  activeTab === t.id
                    ? 'text-red-600 border-red-600'
                    : 'text-gray-600 border-transparent hover:text-red-600'
                }`}
                data-testid={`admin-tab-${t.id}`}
              >
                <Icon size={18} />
                <span className="text-sm">{t.label}</span>
              </button>
            );
          })}
        </div>

        {/* SPECIAL ANNOUNCEMENT */}
        {activeTab === 'config' && (
          <div className="bg-white rounded-lg shadow-md p-6 lg:p-8 max-w-3xl">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Anuncio especial</h2>
            <p className="text-gray-600 mb-6 text-sm">
              Muestra un mensaje destacado en la parte superior del sitio web (vacaciones, fiestas, ofertas...).
            </p>
            <label className="flex items-center gap-3 cursor-pointer mb-6">
              <input
                type="checkbox"
                checked={config?.special_announcement_active || false}
                onChange={(e) => setConfig({ ...config, special_announcement_active: e.target.checked })}
                className="w-5 h-5 accent-red-600"
                data-testid="ann-active-toggle"
              />
              <span className="font-medium text-gray-800">Activar anuncio</span>
            </label>
            <div className="mb-5">
              <label className="block text-sm font-medium text-gray-700 mb-2">Mensaje</label>
              <textarea
                value={config?.special_announcement || ''}
                onChange={(e) => setConfig({ ...config, special_announcement: e.target.value })}
                rows={3}
                placeholder="Ej.: ¡Cerrado del 24 al 26 de diciembre por las fiestas!"
                className="w-full px-4 py-3 rounded-md border border-gray-300 focus:border-red-500 focus:ring-2 focus:ring-red-500/20 outline-none"
                data-testid="ann-message-input"
              />
            </div>
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">Tipo</label>
              <div className="flex gap-3">
                {[
                  { v: 'info', label: 'Info', color: 'blue' },
                  { v: 'success', label: 'Bueno', color: 'green' },
                  { v: 'warning', label: 'Atención', color: 'amber' }
                ].map(opt => (
                  <label key={opt.v} className={`px-4 py-2 rounded-md border cursor-pointer ${
                    (config?.special_announcement_type || 'info') === opt.v
                      ? `bg-${opt.color}-50 border-${opt.color}-500 text-${opt.color}-700 font-medium`
                      : 'border-gray-200 text-gray-600 hover:border-gray-400'
                  }`}>
                    <input
                      type="radio"
                      name="ann-type"
                      checked={(config?.special_announcement_type || 'info') === opt.v}
                      onChange={() => setConfig({ ...config, special_announcement_type: opt.v })}
                      className="hidden"
                    />
                    {opt.label}
                  </label>
                ))}
              </div>
            </div>
            <button
              onClick={saveConfig}
              disabled={saving}
              className="bg-red-600 hover:bg-red-700 disabled:bg-gray-400 text-white px-6 py-3 rounded-md font-medium flex items-center gap-2 transition-colors"
              data-testid="save-config-btn"
            >
              <Save size={18} />
              {saving ? 'Guardando...' : 'Guardar cambios'}
            </button>
          </div>
        )}

        {/* MENU PDF */}
        {activeTab === 'menu' && (
          <div className="bg-white rounded-lg shadow-md p-6 lg:p-8 max-w-3xl">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Carta del restaurante</h2>
            <p className="text-gray-600 mb-6 text-sm">
              Sube tu carta como PDF o imagen JPG. Los clientes podrán descargarla directamente desde la página del menú.
            </p>
            
            {config?.menu_pdf_url && (
              <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-md flex items-center gap-3">
                <CheckCircle2 size={20} className="text-green-600 flex-shrink-0" />
                <div className="flex-1">
                  <p className="text-sm font-medium text-green-800">Carta actual:</p>
                  <a href={config.menu_pdf_url} target="_blank" rel="noopener noreferrer" className="text-green-700 underline text-sm break-all">
                    {config.menu_pdf_url}
                  </a>
                </div>
              </div>
            )}

            <label className="block w-full border-2 border-dashed border-red-300 rounded-lg p-8 text-center cursor-pointer hover:bg-red-50 transition-colors">
              <Upload size={32} className="mx-auto mb-3 text-red-600" />
              <p className="font-medium text-gray-800 mb-1">Subir nueva carta</p>
              <p className="text-xs text-gray-500">PDF, JPG o PNG (máx. 10MB)</p>
              <input
                type="file"
                accept=".pdf,image/*"
                onChange={async (e) => {
                  const file = e.target.files?.[0];
                  if (!file) return;
                  showToast('Subiendo carta...');
                  const url = await uploadImage(file, 'menu');
                  if (url) {
                    setConfig({ ...config, menu_pdf_url: url });
                    showToast('Carta subida — no olvides guardar');
                  }
                  e.target.value = '';
                }}
                className="hidden"
                data-testid="menu-upload-input"
              />
            </label>

            <button
              onClick={saveConfig}
              disabled={saving}
              className="mt-6 bg-red-600 hover:bg-red-700 disabled:bg-gray-400 text-white px-6 py-3 rounded-md font-medium flex items-center gap-2 transition-colors"
            >
              <Save size={18} />
              {saving ? 'Guardando...' : 'Guardar cambios'}
            </button>
          </div>
        )}

        {/* GALLERY */}
        {activeTab === 'gallery' && (
          <div>
            <div className="flex items-center justify-between flex-wrap gap-3 mb-6">
              <div>
                <h2 className="text-2xl font-bold text-gray-900">Galería de fotos</h2>
                <p className="text-gray-600 text-sm">{gallery.length} foto{gallery.length !== 1 ? 's' : ''}</p>
              </div>
              <label className="bg-red-600 hover:bg-red-700 text-white px-5 py-3 rounded-md font-medium cursor-pointer flex items-center gap-2 transition-colors">
                <Plus size={18} />
                Añadir fotos
                <input
                  type="file"
                  accept="image/*"
                  multiple
                  onChange={handleGalleryUpload}
                  className="hidden"
                  data-testid="gallery-upload-input"
                />
              </label>
            </div>

            {gallery.length === 0 ? (
              <div className="bg-white rounded-lg shadow-md p-12 text-center">
                <ImageIcon size={48} className="mx-auto mb-4 text-gray-300" />
                <p className="text-gray-600">Aún no hay fotos en la galería.</p>
                <p className="text-gray-500 text-sm mt-1">Sube las primeras fotos para que aparezcan en el sitio web.</p>
              </div>
            ) : (
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {gallery.map(img => (
                  <div key={img.image_id} className="group relative aspect-square bg-gray-100 rounded-lg overflow-hidden shadow-md">
                    <img src={img.url} alt={img.caption || ''} className="w-full h-full object-cover" />
                    <button
                      onClick={() => deleteGalleryImage(img.image_id)}
                      className="absolute top-2 right-2 bg-red-600 hover:bg-red-700 text-white rounded-full w-8 h-8 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                      title="Eliminar"
                      data-testid={`delete-gallery-${img.image_id}`}
                    >
                      <Trash2 size={14} />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* EVENTS */}
        {activeTab === 'events' && (
          <div>
            <div className="flex items-center justify-between flex-wrap gap-3 mb-6">
              <div>
                <h2 className="text-2xl font-bold text-gray-900">Eventos especiales</h2>
                <p className="text-gray-600 text-sm">Cenas temáticas, noches especiales, ofertas...</p>
              </div>
              <button
                onClick={addEvent}
                className="bg-red-600 hover:bg-red-700 text-white px-5 py-3 rounded-md font-medium flex items-center gap-2 transition-colors"
                data-testid="add-event-btn"
              >
                <Plus size={18} />
                Nuevo evento
              </button>
            </div>

            <div className="space-y-4">
              {(config?.events || []).map((ev, i) => (
                <div key={ev.id || i} className="bg-white rounded-lg shadow-md p-6 border-l-4 border-red-600">
                  <div className="grid md:grid-cols-2 gap-4 mb-4">
                    <div>
                      <label className="block text-xs font-medium text-gray-600 mb-1 uppercase tracking-wider">Título</label>
                      <input
                        value={ev.title || ''}
                        onChange={(e) => updateEvent(i, { title: e.target.value })}
                        className="w-full px-4 py-2.5 rounded-md border border-gray-300 focus:border-red-500 outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-gray-600 mb-1 uppercase tracking-wider">Fecha</label>
                      <input
                        type="date"
                        value={ev.date || ''}
                        onChange={(e) => updateEvent(i, { date: e.target.value })}
                        className="w-full px-4 py-2.5 rounded-md border border-gray-300 focus:border-red-500 outline-none"
                      />
                    </div>
                  </div>
                  <div className="mb-4">
                    <label className="block text-xs font-medium text-gray-600 mb-1 uppercase tracking-wider">Descripción</label>
                    <textarea
                      value={ev.description || ''}
                      onChange={(e) => updateEvent(i, { description: e.target.value })}
                      rows={2}
                      className="w-full px-4 py-2.5 rounded-md border border-gray-300 focus:border-red-500 outline-none"
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={ev.active !== false}
                        onChange={(e) => updateEvent(i, { active: e.target.checked })}
                        className="w-4 h-4 accent-red-600"
                      />
                      <span className="text-sm text-gray-700">Visible en el sitio</span>
                    </label>
                    <button
                      onClick={() => removeEvent(i)}
                      className="text-red-600 hover:text-red-800 flex items-center gap-1 text-sm font-medium"
                    >
                      <Trash2 size={14} />
                      Eliminar
                    </button>
                  </div>
                </div>
              ))}
              {(!config?.events || config.events.length === 0) && (
                <div className="bg-white rounded-lg shadow-md p-12 text-center">
                  <Calendar size={48} className="mx-auto mb-4 text-gray-300" />
                  <p className="text-gray-600">Aún no hay eventos programados.</p>
                </div>
              )}
            </div>

            {config?.events?.length > 0 && (
              <button
                onClick={saveConfig}
                disabled={saving}
                className="mt-6 bg-red-600 hover:bg-red-700 disabled:bg-gray-400 text-white px-6 py-3 rounded-md font-medium flex items-center gap-2 transition-colors"
                data-testid="save-events-btn"
              >
                <Save size={18} />
                {saving ? 'Guardando...' : 'Guardar eventos'}
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default SanFranciscoAdminDashboard;
