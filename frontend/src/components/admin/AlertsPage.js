import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  AlertTriangle, Bell, Clock, CheckCircle, XCircle, 
  Users, Calendar, Filter, RefreshCw, ChevronLeft,
  TrendingUp, Activity, Server, ShoppingCart
} from 'lucide-react';
import axios from 'axios';

const API = process.env.REACT_APP_BACKEND_URL + '/api';

const AlertsPage = () => {
  const [alerts, setAlerts] = useState([]);
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState({
    type: 'all',
    status: 'all',
    site: 'all'
  });
  const [page, setPage] = useState(0);
  const [total, setTotal] = useState(0);
  const limit = 20;

  useEffect(() => {
    fetchAlerts();
    fetchStats();
  }, [filter, page]);

  const fetchAlerts = async () => {
    try {
      let url = `${API}/admin/alerts?limit=${limit}&offset=${page * limit}`;
      if (filter.type !== 'all') url += `&alert_type=${filter.type}`;
      if (filter.status !== 'all') url += `&is_active=${filter.status === 'active'}`;
      if (filter.site !== 'all') url += `&site_id=${filter.site}`;
      
      const response = await axios.get(url, { withCredentials: true });
      setAlerts(response.data.alerts || response.data);
      setTotal(response.data.total || response.data.length);
    } catch (error) {
      console.error('Error fetching alerts:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchStats = async () => {
    try {
      const response = await axios.get(`${API}/admin/alerts/stats`, { withCredentials: true });
      setStats(response.data);
    } catch (error) {
      console.error('Error fetching stats:', error);
    }
  };

  const dismissAlert = async (alertId) => {
    try {
      await axios.delete(`${API}/admin/alerts/${alertId}`, { withCredentials: true });
      fetchAlerts();
      fetchStats();
    } catch (error) {
      console.error('Error dismissing alert:', error);
    }
  };

  const formatDate = (dateStr) => {
    if (!dateStr) return '-';
    const date = new Date(dateStr);
    return date.toLocaleString('nl-NL', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const formatDuration = (minutes) => {
    if (!minutes) return '-';
    if (minutes < 60) return `${minutes} min`;
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return `${hours}u ${mins}m`;
  };

  const getAlertIcon = (alertType, status) => {
    if (status === 'no_reservations') return <ShoppingCart className="w-5 h-5" />;
    if (status === 'no_visitors') return <Users className="w-5 h-5" />;
    if (alertType === 'health') return <Server className="w-5 h-5" />;
    return <AlertTriangle className="w-5 h-5" />;
  };

  const getAlertColor = (alert) => {
    if (!alert.is_active) return 'bg-stone-100 border-stone-200 text-stone-600';
    if (alert.status === 'no_reservations') return 'bg-purple-50 border-purple-200 text-purple-700';
    if (alert.status === 'no_visitors') return 'bg-amber-50 border-amber-200 text-amber-700';
    return 'bg-red-50 border-red-200 text-red-700';
  };

  const getStatusBadge = (alert) => {
    if (!alert.is_active) {
      return <span className="px-2 py-1 text-xs rounded-full bg-teal-100 text-teal-700">Opgelost</span>;
    }
    if (alert.status === 'no_reservations') {
      return <span className="px-2 py-1 text-xs rounded-full bg-purple-100 text-purple-700">Geen Reservaties</span>;
    }
    if (alert.status === 'no_visitors') {
      return <span className="px-2 py-1 text-xs rounded-full bg-amber-100 text-amber-700">Geen Bezoekers</span>;
    }
    if (alert.status === 'down') {
      return <span className="px-2 py-1 text-xs rounded-full bg-red-100 text-red-700">Site Down</span>;
    }
    return <span className="px-2 py-1 text-xs rounded-full bg-stone-100 text-stone-700">{alert.status}</span>;
  };

  const getTypeLabel = (type) => {
    const labels = {
      'health': 'Site Status',
      'traffic': 'Bezoekers',
      'reservation': 'Reservaties'
    };
    return labels[type] || type;
  };

  return (
    <div className="min-h-screen bg-stone-100 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-6">
          <Link to="/admin" className="inline-flex items-center text-stone-600 hover:text-stone-900 mb-4">
            <ChevronLeft className="w-4 h-4 mr-1" />
            Terug naar Dashboard
          </Link>
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-stone-900">Alert Centrum</h1>
              <p className="text-stone-600">Alle meldingen en waarschuwingen voor je websites</p>
            </div>
            <button
              onClick={() => { fetchAlerts(); fetchStats(); }}
              className="flex items-center gap-2 px-4 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700"
            >
              <RefreshCw className="w-4 h-4" />
              Vernieuwen
            </button>
          </div>
        </div>

        {/* Stats Cards */}
        {stats && (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
            <div className="bg-white rounded-xl p-4 border border-stone-200">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-red-100 flex items-center justify-center">
                  <Bell className="w-5 h-5 text-red-600" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-stone-900">{stats.active_alerts}</p>
                  <p className="text-sm text-stone-500">Actieve Alerts</p>
                </div>
              </div>
            </div>
            <div className="bg-white rounded-xl p-4 border border-stone-200">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-amber-100 flex items-center justify-center">
                  <Calendar className="w-5 h-5 text-amber-600" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-stone-900">{stats.today_alerts}</p>
                  <p className="text-sm text-stone-500">Vandaag</p>
                </div>
              </div>
            </div>
            <div className="bg-white rounded-xl p-4 border border-stone-200">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-blue-100 flex items-center justify-center">
                  <TrendingUp className="w-5 h-5 text-blue-600" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-stone-900">{stats.week_alerts}</p>
                  <p className="text-sm text-stone-500">Deze Week</p>
                </div>
              </div>
            </div>
            <div className="bg-white rounded-xl p-4 border border-stone-200">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-teal-100 flex items-center justify-center">
                  <Clock className="w-5 h-5 text-teal-600" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-stone-900">{stats.avg_resolution_minutes}m</p>
                  <p className="text-sm text-stone-500">Gem. Oplostijd</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Alert Type Stats */}
        {stats?.by_type && Object.keys(stats.by_type).length > 0 && (
          <div className="bg-white rounded-xl p-4 border border-stone-200 mb-6">
            <h3 className="font-semibold text-stone-900 mb-3">Alerts per Type</h3>
            <div className="flex flex-wrap gap-3">
              {Object.entries(stats.by_type).map(([type, count]) => (
                <div key={type} className="flex items-center gap-2 px-3 py-2 bg-stone-50 rounded-lg">
                  <span className="font-medium text-stone-700">{getTypeLabel(type)}:</span>
                  <span className="font-bold text-stone-900">{count}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Filters */}
        <div className="bg-white rounded-xl p-4 border border-stone-200 mb-6">
          <div className="flex flex-wrap items-center gap-4">
            <div className="flex items-center gap-2">
              <Filter className="w-4 h-4 text-stone-500" />
              <span className="text-sm font-medium text-stone-700">Filters:</span>
            </div>
            
            <select
              value={filter.type}
              onChange={(e) => { setFilter({...filter, type: e.target.value}); setPage(0); }}
              className="px-3 py-2 border border-stone-200 rounded-lg text-sm"
            >
              <option value="all">Alle Types</option>
              <option value="health">Site Status</option>
              <option value="traffic">Bezoekers</option>
              <option value="reservation">Reservaties</option>
            </select>
            
            <select
              value={filter.status}
              onChange={(e) => { setFilter({...filter, status: e.target.value}); setPage(0); }}
              className="px-3 py-2 border border-stone-200 rounded-lg text-sm"
            >
              <option value="all">Alle Status</option>
              <option value="active">Actief</option>
              <option value="resolved">Opgelost</option>
            </select>
            
            <select
              value={filter.site}
              onChange={(e) => { setFilter({...filter, site: e.target.value}); setPage(0); }}
              className="px-3 py-2 border border-stone-200 rounded-lg text-sm"
            >
              <option value="all">Alle Sites</option>
              <option value="cantina">La Cantina</option>
              <option value="bottega">La Bottega</option>
              <option value="ascoli">L'Ascoli</option>
              <option value="mercato">Mercato</option>
              <option value="smeralda">Smeralda</option>
              <option value="fworks">FWorks</option>
              <option value="theobeans">Theo Beans</option>
              <option value="tracemaster">Tracemaster</option>
            </select>
          </div>
        </div>

        {/* Alerts List */}
        <div className="bg-white rounded-xl border border-stone-200 overflow-hidden">
          <div className="px-4 py-3 bg-stone-50 border-b border-stone-200">
            <h3 className="font-semibold text-stone-800">
              Alert Geschiedenis ({total} totaal)
            </h3>
          </div>
          
          {loading ? (
            <div className="p-8 text-center text-stone-500">
              <RefreshCw className="w-8 h-8 mx-auto mb-2 animate-spin" />
              Laden...
            </div>
          ) : alerts.length === 0 ? (
            <div className="p-8 text-center text-stone-500">
              <CheckCircle className="w-12 h-12 mx-auto mb-2 text-teal-500" />
              <p>Geen alerts gevonden</p>
            </div>
          ) : (
            <div className="divide-y divide-stone-100">
              {alerts.map(alert => (
                <div 
                  key={alert.alert_id} 
                  className={`p-4 ${getAlertColor(alert)} border-l-4`}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex items-start gap-3">
                      <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                        !alert.is_active ? 'bg-stone-200' : 
                        alert.status === 'no_reservations' ? 'bg-purple-100' :
                        alert.status === 'no_visitors' ? 'bg-amber-100' : 'bg-red-100'
                      }`}>
                        {getAlertIcon(alert.alert_type, alert.status)}
                      </div>
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <h4 className="font-semibold text-stone-900">{alert.site_name}</h4>
                          {getStatusBadge(alert)}
                        </div>
                        <p className="text-sm text-stone-600 mb-2">{alert.message}</p>
                        <div className="flex flex-wrap gap-4 text-xs text-stone-500">
                          <span className="flex items-center gap-1">
                            <Clock className="w-3 h-3" />
                            Start: {formatDate(alert.started_at)}
                          </span>
                          {alert.resolved_at && (
                            <span className="flex items-center gap-1">
                              <CheckCircle className="w-3 h-3" />
                              Opgelost: {formatDate(alert.resolved_at)}
                            </span>
                          )}
                          {alert.duration_minutes && (
                            <span className="flex items-center gap-1">
                              <Activity className="w-3 h-3" />
                              Duur: {formatDuration(alert.duration_minutes)}
                            </span>
                          )}
                          <span className="px-2 py-0.5 bg-stone-200 rounded text-stone-600">
                            {getTypeLabel(alert.alert_type)}
                          </span>
                        </div>
                      </div>
                    </div>
                    {alert.is_active && (
                      <button
                        onClick={() => dismissAlert(alert.alert_id)}
                        className="px-3 py-1.5 text-sm bg-stone-200 hover:bg-stone-300 rounded-lg text-stone-700"
                      >
                        Dismiss
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
          
          {/* Pagination */}
          {total > limit && (
            <div className="px-4 py-3 bg-stone-50 border-t border-stone-200 flex items-center justify-between">
              <span className="text-sm text-stone-600">
                Pagina {page + 1} van {Math.ceil(total / limit)}
              </span>
              <div className="flex gap-2">
                <button
                  onClick={() => setPage(Math.max(0, page - 1))}
                  disabled={page === 0}
                  className="px-3 py-1 text-sm bg-white border border-stone-200 rounded hover:bg-stone-50 disabled:opacity-50"
                >
                  Vorige
                </button>
                <button
                  onClick={() => setPage(page + 1)}
                  disabled={(page + 1) * limit >= total}
                  className="px-3 py-1 text-sm bg-white border border-stone-200 rounded hover:bg-stone-50 disabled:opacity-50"
                >
                  Volgende
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Legend */}
        <div className="mt-6 bg-white rounded-xl p-4 border border-stone-200">
          <h3 className="font-semibold text-stone-800 mb-3">Alert Types Legenda</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-red-500"></div>
              <span className="text-sm text-stone-600">Site Down (Health)</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-amber-500"></div>
              <span className="text-sm text-stone-600">Geen Bezoekers (2u+)</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-purple-500"></div>
              <span className="text-sm text-stone-600">Geen Reservaties (1u+)</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-teal-500"></div>
              <span className="text-sm text-stone-600">Opgelost</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AlertsPage;
