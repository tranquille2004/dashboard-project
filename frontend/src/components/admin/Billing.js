import React, { useEffect, useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '@/contexts/AuthContext';
import { ArrowLeft, Plus, Edit3, Trash2, Check, X, Calendar, Euro, FileText, CheckCircle2 } from 'lucide-react';

const API = process.env.REACT_APP_BACKEND_URL + '/api';

// All known production domains
const DOMAINS = [
  { slug: 'bottega', domain: 'labottegaherent.com', name: 'La Bottega Italiana' },
  { slug: 'cantina', domain: 'lacantinaitaliana.net', name: 'La Cantina Italiana' },
  { slug: 'ascoli', domain: 'ascolizaventem.com', name: "L'Ascoli Zaventem" },
  { slug: 'mercato', domain: 'ristorantemercato.be', name: 'Ristorante Mercato' },
  { slug: 'tracemaster', domain: 'tracemaster-rastreadores.com', name: 'Tracemaster GPS' },
  { slug: 'theobeans', domain: 'theobeans-export.com', name: 'Theo Beans Export' },
  { slug: 'fworks', domain: 'fworksbuilders.com', name: 'fworksbuilders' },
  { slug: 'smeralda', domain: 'smeraldavacanze.it', name: 'Villa Smeralda' },
  { slug: 'albertopantoja', domain: 'albertopantoja.com', name: 'Alberto Pantoja' },
  { slug: 'hoteldelpacifico', domain: 'hoteldelpacifico.net', name: 'Hotel del Pacífico' },
  { slug: 'rccb', domain: 'rccbgroup.be', name: 'RCCB Belgium' },
  { slug: 'ilsiciliano', domain: 'ilsiciliano-santodomingo.com', name: 'Il Siciliano' },
  { slug: 'sanfrancisco', domain: 'sanfrancisco-haciendaturistica.com', name: 'Club San Francisco' },
];

const fmtEUR = (n) =>
  new Intl.NumberFormat('nl-BE', { style: 'currency', currency: 'EUR', minimumFractionDigits: 2 }).format(n || 0);
const todayISO = () => new Date().toISOString().slice(0, 10);
const currentYear = () => new Date().getFullYear();

const Billing = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [invoices, setInvoices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedYear, setSelectedYear] = useState(currentYear());
  const [editingId, setEditingId] = useState(null);
  const [showAdd, setShowAdd] = useState(false);
  const [form, setForm] = useState({
    site_slug: DOMAINS[0].slug,
    invoice_date: todayISO(),
    amount: '',
    year: currentYear(),
    note: '',
    paid: false,
  });

  useEffect(() => {
    if (!user) { navigate('/admin'); return; }
    fetchInvoices();
  }, [user]);

  const fetchInvoices = async () => {
    try {
      const res = await axios.get(`${API}/admin/billing/invoices`, { withCredentials: true });
      setInvoices(res.data.invoices || []);
    } catch (e) {
      console.error('Load invoices error:', e);
    } finally { setLoading(false); }
  };

  const resetForm = () => setForm({
    site_slug: DOMAINS[0].slug, invoice_date: todayISO(),
    amount: '', year: currentYear(), note: '', paid: false,
  });

  const createInvoice = async () => {
    if (!form.amount || parseFloat(form.amount) <= 0) { alert('Vul een geldig bedrag in'); return; }
    try {
      const payload = { ...form, amount: parseFloat(form.amount), year: parseInt(form.year) };
      await axios.post(`${API}/admin/billing/invoices`, payload, { withCredentials: true });
      setShowAdd(false); resetForm(); fetchInvoices();
    } catch (e) { alert('Fout: ' + (e.response?.data?.detail || e.message)); }
  };

  const updateInvoice = async (id, patch) => {
    try {
      await axios.put(`${API}/admin/billing/invoices/${id}`, patch, { withCredentials: true });
      fetchInvoices();
    } catch (e) { alert('Fout: ' + (e.response?.data?.detail || e.message)); }
  };

  const deleteInvoice = async (id) => {
    if (!window.confirm('Factuur verwijderen?')) return;
    try {
      await axios.delete(`${API}/admin/billing/invoices/${id}`, { withCredentials: true });
      fetchInvoices();
    } catch (e) { alert('Fout: ' + (e.response?.data?.detail || e.message)); }
  };

  // --- Aggregations ---
  const years = useMemo(() => {
    const ys = new Set([currentYear()]);
    invoices.forEach(i => ys.add(i.year));
    return Array.from(ys).sort((a, b) => b - a);
  }, [invoices]);

  const yearInvoices = invoices.filter(i => i.year === selectedYear);
  const yearTotal = yearInvoices.reduce((s, i) => s + (i.amount || 0), 0);
  const yearPaid = yearInvoices.filter(i => i.paid).reduce((s, i) => s + (i.amount || 0), 0);
  const yearOutstanding = yearTotal - yearPaid;

  const perSite = useMemo(() => {
    const map = {};
    DOMAINS.forEach(d => { map[d.slug] = { ...d, count: 0, total: 0, paid: 0 }; });
    yearInvoices.forEach(i => {
      if (!map[i.site_slug]) map[i.site_slug] = { slug: i.site_slug, name: i.site_slug, domain: '', count: 0, total: 0, paid: 0 };
      map[i.site_slug].count += 1;
      map[i.site_slug].total += i.amount || 0;
      if (i.paid) map[i.site_slug].paid += i.amount || 0;
    });
    return Object.values(map).sort((a, b) => b.total - a.total);
  }, [yearInvoices]);

  const domainBySlug = (slug) => DOMAINS.find(d => d.slug === slug) || { name: slug, domain: '' };

  if (loading) return <div className="min-h-screen bg-gray-900 text-white flex items-center justify-center">Laden...</div>;

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <header className="border-b border-white/10 bg-gray-900/80 backdrop-blur sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-5 py-4 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <button onClick={() => navigate('/admin')} className="p-2 rounded-lg hover:bg-white/10 transition-colors" data-testid="back-btn">
              <ArrowLeft size={20} />
            </button>
            <div>
              <h1 className="text-xl font-bold flex items-center gap-2"><FileText size={20} className="text-blue-400" /> Facturatie</h1>
              <p className="text-xs text-gray-400">Beheer jaarlijkse facturen per website</p>
            </div>
          </div>
          <button onClick={() => { resetForm(); setShowAdd(true); }} data-testid="add-invoice-btn"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 font-medium transition-colors">
            <Plus size={18} /> Nieuwe factuur
          </button>
        </div>
      </header>

      <div className="max-w-7xl mx-auto p-5 md:p-8 space-y-8">
        {/* Year selector + Totals */}
        <div className="flex flex-wrap gap-3 items-center">
          <span className="text-sm text-gray-400">Jaar:</span>
          {years.map(y => (
            <button key={y} onClick={() => setSelectedYear(y)} data-testid={`year-${y}`}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${selectedYear === y ? 'bg-blue-600 text-white' : 'bg-white/5 hover:bg-white/10 text-gray-300'}`}>
              {y}
            </button>
          ))}
        </div>

        <div className="grid sm:grid-cols-3 gap-4">
          <div className="bg-gradient-to-br from-blue-900/40 to-blue-950/40 border border-blue-500/30 rounded-2xl p-6">
            <div className="text-xs text-blue-300 uppercase tracking-wider mb-2">Totaal {selectedYear}</div>
            <div className="text-3xl font-bold" data-testid="year-total">{fmtEUR(yearTotal)}</div>
            <div className="text-xs text-gray-400 mt-1">{yearInvoices.length} factuur{yearInvoices.length !== 1 ? 'en' : ''}</div>
          </div>
          <div className="bg-gradient-to-br from-green-900/40 to-green-950/40 border border-green-500/30 rounded-2xl p-6">
            <div className="text-xs text-green-300 uppercase tracking-wider mb-2">Betaald</div>
            <div className="text-3xl font-bold text-green-400" data-testid="year-paid">{fmtEUR(yearPaid)}</div>
          </div>
          <div className="bg-gradient-to-br from-amber-900/40 to-amber-950/40 border border-amber-500/30 rounded-2xl p-6">
            <div className="text-xs text-amber-300 uppercase tracking-wider mb-2">Openstaand</div>
            <div className="text-3xl font-bold text-amber-400" data-testid="year-outstanding">{fmtEUR(yearOutstanding)}</div>
          </div>
        </div>

        {/* Per-site totals */}
        <div className="bg-white/5 rounded-2xl p-6 border border-white/10">
          <h2 className="text-lg font-bold mb-4">Per website — {selectedYear}</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="text-xs uppercase text-gray-400 border-b border-white/10">
                  <th className="text-left py-3 px-2">Website</th>
                  <th className="text-left py-3 px-2 hidden md:table-cell">Domein</th>
                  <th className="text-right py-3 px-2"># Facturen</th>
                  <th className="text-right py-3 px-2">Betaald</th>
                  <th className="text-right py-3 px-2">Totaal</th>
                </tr>
              </thead>
              <tbody>
                {perSite.map(s => (
                  <tr key={s.slug} className="border-b border-white/5 hover:bg-white/5">
                    <td className="py-3 px-2 font-medium">{s.name}</td>
                    <td className="py-3 px-2 hidden md:table-cell text-gray-400 text-xs">{s.domain}</td>
                    <td className="py-3 px-2 text-right">{s.count}</td>
                    <td className="py-3 px-2 text-right text-green-400">{s.paid ? fmtEUR(s.paid) : '—'}</td>
                    <td className="py-3 px-2 text-right font-bold">{s.total ? fmtEUR(s.total) : '—'}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Invoices list */}
        <div className="bg-white/5 rounded-2xl p-6 border border-white/10">
          <h2 className="text-lg font-bold mb-4">Facturen {selectedYear}</h2>
          {yearInvoices.length === 0 ? (
            <p className="text-gray-400 text-center py-10">Nog geen facturen voor {selectedYear}. Klik op "Nieuwe factuur" om te beginnen.</p>
          ) : (
            <div className="space-y-3" data-testid="invoices-list">
              {yearInvoices.sort((a, b) => b.invoice_date.localeCompare(a.invoice_date)).map(inv => (
                <InvoiceRow key={inv.invoice_id} inv={inv} domain={domainBySlug(inv.site_slug)}
                  editing={editingId === inv.invoice_id}
                  onEdit={() => setEditingId(inv.invoice_id)}
                  onCancel={() => setEditingId(null)}
                  onSave={(patch) => { updateInvoice(inv.invoice_id, patch); setEditingId(null); }}
                  onDelete={() => deleteInvoice(inv.invoice_id)}
                  onTogglePaid={() => updateInvoice(inv.invoice_id, { paid: !inv.paid })} />
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Add modal */}
      {showAdd && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4" onClick={() => setShowAdd(false)}>
          <div className="bg-gray-800 rounded-2xl p-6 max-w-md w-full border border-white/10" onClick={e => e.stopPropagation()}>
            <h3 className="text-xl font-bold mb-4">Nieuwe factuur</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm text-gray-300 mb-1.5">Website</label>
                <select value={form.site_slug} onChange={e => setForm({ ...form, site_slug: e.target.value })}
                  data-testid="form-site" className="w-full bg-gray-700 rounded-lg px-3 py-2.5 text-white border border-white/10 focus:border-blue-500 outline-none">
                  {DOMAINS.map(d => <option key={d.slug} value={d.slug}>{d.name} — {d.domain}</option>)}
                </select>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-sm text-gray-300 mb-1.5">Factuurdatum</label>
                  <input type="date" value={form.invoice_date} onChange={e => setForm({ ...form, invoice_date: e.target.value, year: new Date(e.target.value).getFullYear() })}
                    data-testid="form-date" className="w-full bg-gray-700 rounded-lg px-3 py-2.5 text-white border border-white/10 focus:border-blue-500 outline-none" />
                </div>
                <div>
                  <label className="block text-sm text-gray-300 mb-1.5">Jaar</label>
                  <input type="number" value={form.year} onChange={e => setForm({ ...form, year: e.target.value })}
                    data-testid="form-year" className="w-full bg-gray-700 rounded-lg px-3 py-2.5 text-white border border-white/10 focus:border-blue-500 outline-none" />
                </div>
              </div>
              <div>
                <label className="block text-sm text-gray-300 mb-1.5">Bedrag (€)</label>
                <input type="number" step="0.01" placeholder="0,00" value={form.amount} onChange={e => setForm({ ...form, amount: e.target.value })}
                  data-testid="form-amount" className="w-full bg-gray-700 rounded-lg px-3 py-2.5 text-white border border-white/10 focus:border-blue-500 outline-none" />
              </div>
              <div>
                <label className="block text-sm text-gray-300 mb-1.5">Notitie (optioneel)</label>
                <textarea rows={2} value={form.note} onChange={e => setForm({ ...form, note: e.target.value })}
                  data-testid="form-note" className="w-full bg-gray-700 rounded-lg px-3 py-2.5 text-white border border-white/10 focus:border-blue-500 outline-none resize-none" />
              </div>
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="checkbox" checked={form.paid} onChange={e => setForm({ ...form, paid: e.target.checked })}
                  data-testid="form-paid" className="w-4 h-4" />
                <span className="text-sm">Reeds betaald</span>
              </label>
            </div>
            <div className="flex gap-3 mt-6">
              <button onClick={() => setShowAdd(false)} className="flex-1 py-2.5 rounded-lg bg-gray-700 hover:bg-gray-600 font-medium transition-colors">Annuleren</button>
              <button onClick={createInvoice} data-testid="form-save" className="flex-1 py-2.5 rounded-lg bg-blue-600 hover:bg-blue-700 font-bold transition-colors">Opslaan</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

const InvoiceRow = ({ inv, domain, editing, onEdit, onCancel, onSave, onDelete, onTogglePaid }) => {
  const [draft, setDraft] = useState({
    invoice_date: inv.invoice_date, amount: inv.amount, note: inv.note || '', site_slug: inv.site_slug,
  });
  useEffect(() => { setDraft({ invoice_date: inv.invoice_date, amount: inv.amount, note: inv.note || '', site_slug: inv.site_slug }); }, [inv, editing]);

  if (editing) {
    return (
      <div className="bg-blue-900/20 rounded-xl p-4 border border-blue-500/30">
        <div className="grid md:grid-cols-[1.2fr_1fr_0.8fr_auto] gap-3 items-start">
          <select value={draft.site_slug} onChange={e => setDraft({ ...draft, site_slug: e.target.value })}
            className="bg-gray-800 rounded-lg px-3 py-2 text-sm border border-white/10 focus:border-blue-500 outline-none">
            {DOMAINS.map(d => <option key={d.slug} value={d.slug}>{d.name}</option>)}
          </select>
          <input type="date" value={draft.invoice_date} onChange={e => setDraft({ ...draft, invoice_date: e.target.value })}
            className="bg-gray-800 rounded-lg px-3 py-2 text-sm border border-white/10 focus:border-blue-500 outline-none" />
          <input type="number" step="0.01" value={draft.amount} onChange={e => setDraft({ ...draft, amount: parseFloat(e.target.value) })}
            className="bg-gray-800 rounded-lg px-3 py-2 text-sm border border-white/10 focus:border-blue-500 outline-none" />
          <div className="flex gap-2">
            <button onClick={() => onSave({ ...draft, year: new Date(draft.invoice_date).getFullYear() })} className="p-2 rounded-lg bg-green-600 hover:bg-green-700"><Check size={16} /></button>
            <button onClick={onCancel} className="p-2 rounded-lg bg-gray-700 hover:bg-gray-600"><X size={16} /></button>
          </div>
        </div>
        <input type="text" placeholder="Notitie" value={draft.note} onChange={e => setDraft({ ...draft, note: e.target.value })}
          className="w-full mt-3 bg-gray-800 rounded-lg px-3 py-2 text-sm border border-white/10 focus:border-blue-500 outline-none" />
      </div>
    );
  }

  return (
    <div className="bg-white/5 hover:bg-white/10 rounded-xl p-4 border border-white/5 transition-colors">
      <div className="flex flex-wrap items-center gap-4">
        <div className="flex-1 min-w-[200px]">
          <div className="font-semibold">{domain.name}</div>
          <div className="text-xs text-gray-400">{domain.domain}</div>
          {inv.note && <div className="text-xs text-gray-300 mt-1 italic">"{inv.note}"</div>}
        </div>
        <div className="flex items-center gap-2 text-sm text-gray-300">
          <Calendar size={14} /> {new Date(inv.invoice_date).toLocaleDateString('nl-BE')}
        </div>
        <div className="text-xl font-bold text-white flex items-center gap-1">
          {new Intl.NumberFormat('nl-BE', { style: 'currency', currency: 'EUR' }).format(inv.amount || 0)}
        </div>
        <button onClick={onTogglePaid} className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors flex items-center gap-1.5 ${inv.paid ? 'bg-green-600/30 text-green-300 border border-green-500/40' : 'bg-amber-600/20 text-amber-300 border border-amber-500/30 hover:bg-amber-600/30'}`}>
          {inv.paid ? <><CheckCircle2 size={14} /> Betaald</> : 'Openstaand'}
        </button>
        <div className="flex gap-1">
          <button onClick={onEdit} className="p-2 rounded-lg hover:bg-white/10" title="Bewerken"><Edit3 size={16} /></button>
          <button onClick={onDelete} className="p-2 rounded-lg hover:bg-red-600/30 text-red-400" title="Verwijderen"><Trash2 size={16} /></button>
        </div>
      </div>
    </div>
  );
};

export default Billing;
