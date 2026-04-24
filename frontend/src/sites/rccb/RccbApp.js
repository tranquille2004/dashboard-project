// RCCB - Retail Cleaning Care Belgium
// Modern multi-language cleaning company website

import React, { useState, useEffect } from 'react';
import { Routes, Route, Link, useLocation, NavLink } from 'react-router-dom';
import {
  Menu, X, Phone, Mail, MapPin, Clock, ChevronRight, ChevronDown,
  Building2, ShoppingBag, Home as HomeIcon, Dumbbell, Briefcase, Hotel,
  Sparkles, Square, HardHat, ShieldCheck, Droplets, Leaf,
  MessageCircle, CheckCircle2, ArrowRight, Globe, Send, Star
} from 'lucide-react';
import SEO from '@/components/SEO';
import { IMG } from '@/utils/imageHelper';
import VideoHero from './VideoHero';
import {
  translations, WHATSAPP_NUMBER, WHATSAPP_LINK, EMAIL, PHONE, ADDRESS, VAT, PHOTOS
} from './translations';

const BASE = '/site/rccb';

// ========== Scroll to top on navigation ==========
const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => { window.scrollTo({ top: 0, behavior: 'smooth' }); }, [pathname]);
  return null;
};

// ========== Analytics tracker ==========
const PageTracker = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    const API = process.env.REACT_APP_BACKEND_URL + '/api';
    const page = pathname.replace(BASE, '') || '/';
    fetch(`${API}/analytics/track`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ site_id: 'site_rccb', page })
    }).catch(() => {});
  }, [pathname]);
  return null;
};

// ========== Icon map ==========
const ICONS = {
  Building2, ShoppingBag, HomeIcon, Dumbbell, Briefcase, Hotel,
  Sparkles, Square, HardHat, ShieldCheck, Droplets, Leaf
};

// ========== Language hook ==========
const useLanguage = () => {
  const [lang, setLang] = useState(() => {
    const saved = typeof window !== 'undefined' ? localStorage.getItem('rccb_lang') : null;
    if (saved && translations[saved]) return saved;
    const browserLang = typeof navigator !== 'undefined' ? navigator.language.slice(0, 2) : 'nl';
    return translations[browserLang] ? browserLang : 'nl';
  });
  const changeLang = (l) => {
    setLang(l);
    try { localStorage.setItem('rccb_lang', l); } catch (e) {}
  };
  return [lang, changeLang, translations[lang]];
};

// ========== Smart link that auto-prefixes on /site/ preview routes ==========
const useSmartPrefix = () => {
  const { pathname } = useLocation();
  return pathname.startsWith(BASE) ? BASE : '';
};

// ========== Navigation ==========
const Navigation = ({ lang, setLang, t }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [langOpen, setLangOpen] = useState(false);
  const prefix = useSmartPrefix();

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', handler, { passive: true });
    handler();
    return () => window.removeEventListener('scroll', handler);
  }, []);

  const links = [
    { to: `${prefix}/`, label: t.nav.home, end: true },
    { to: `${prefix}/services`, label: t.nav.services },
    { to: `${prefix}/gallery`, label: t.nav.gallery },
    { to: `${prefix}/contact`, label: t.nav.contact }
  ];

  const langFlags = { nl: '🇧🇪', fr: '🇧🇪', en: '🇬🇧', de: '🇧🇪' };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? 'bg-white/95 backdrop-blur-lg shadow-sm py-2'
          : 'bg-transparent py-4'
      }`}
      data-testid="rccb-header"
    >
      <div className="max-w-7xl mx-auto px-5 lg:px-8 flex items-center justify-between">
        <Link to={`${prefix}/`} className="flex items-center gap-3 group" data-testid="rccb-logo-link">
          <img
            src={IMG('/images/rccb/logo.avif')}
            alt="RCCB"
            className={`transition-all duration-500 ${scrolled ? 'h-10' : 'h-12'}`}
          />
          <span className={`hidden md:block font-semibold tracking-tight transition-colors ${
            scrolled ? 'text-emerald-900' : 'text-white'
          }`}>
            RCCB<span className={`font-light ml-1 ${scrolled ? 'text-gray-500' : 'text-emerald-200'}`}>Group</span>
          </span>
        </Link>

        {/* Desktop Nav links */}
        <nav className="hidden lg:flex items-center gap-1">
          {links.map((l) => (
            <NavLink
              key={l.to}
              to={l.to}
              end={l.end}
              className={({ isActive }) =>
                `px-5 py-2 text-sm tracking-wide transition-all duration-300 relative group ${
                  scrolled
                    ? isActive ? 'text-emerald-700 font-medium' : 'text-gray-700 hover:text-emerald-700'
                    : isActive ? 'text-emerald-200' : 'text-white/90 hover:text-white'
                }`
              }
              data-testid={`nav-link-${l.label.toLowerCase()}`}
            >
              {({ isActive }) => (
                <>
                  {l.label}
                  <span className={`absolute bottom-0 left-1/2 -translate-x-1/2 h-px bg-emerald-500 transition-all duration-300 ${
                    isActive ? 'w-6' : 'w-0 group-hover:w-6'
                  }`} />
                </>
              )}
            </NavLink>
          ))}
        </nav>

        {/* Right side: Language switcher (always visible) + CTA (desktop) + Hamburger (mobile) */}
        <div className="flex items-center gap-2">
          {/* Language switcher - ALWAYS visible (desktop + mobile) */}
          <div className="relative">
            <button
              onClick={() => setLangOpen(!langOpen)}
              className={`flex items-center gap-1.5 px-3 py-2 text-sm rounded-full border transition-all ${
                scrolled
                  ? 'border-gray-200 text-gray-700 hover:border-emerald-300'
                  : 'border-white/30 text-white hover:border-white/60'
              }`}
              data-testid="lang-switcher-btn"
            >
              <Globe className="w-4 h-4" />
              <span className="uppercase font-medium">{lang}</span>
              <ChevronDown className={`w-3 h-3 transition-transform ${langOpen ? 'rotate-180' : ''}`} />
            </button>
            {langOpen && (
              <>
                <div className="fixed inset-0 z-10" onClick={() => setLangOpen(false)} />
                <div className="absolute right-0 top-full mt-2 bg-white rounded-xl shadow-xl py-2 min-w-[160px] z-20 border border-gray-100">
                  {['nl', 'fr', 'en', 'de'].map((l) => (
                    <button
                      key={l}
                      onClick={() => { setLang(l); setLangOpen(false); }}
                      className={`w-full text-left px-4 py-2 text-sm flex items-center gap-2 hover:bg-emerald-50 ${
                        lang === l ? 'text-emerald-700 font-medium bg-emerald-50/50' : 'text-gray-700'
                      }`}
                      data-testid={`lang-option-${l}`}
                    >
                      <span>{langFlags[l]}</span>
                      {{ nl: 'Nederlands', fr: 'Français', en: 'English', de: 'Deutsch' }[l]}
                    </button>
                  ))}
                </div>
              </>
            )}
          </div>

          {/* Desktop CTA */}
          <Link
            to={`${prefix}/contact`}
            className="hidden lg:inline-flex ml-2 px-5 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-medium rounded-full transition-all duration-300 hover:shadow-lg hover:shadow-emerald-500/30 items-center gap-2"
            data-testid="nav-cta-quote"
          >
            {t.hero.ctaPrimary}
            <ArrowRight className="w-4 h-4" />
          </Link>

          {/* Mobile hamburger */}
          <button
            className={`lg:hidden p-2 ${scrolled ? 'text-emerald-900' : 'text-white'}`}
            onClick={() => setIsOpen(!isOpen)}
            data-testid="mobile-menu-btn"
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile menu (language switcher is NOT here anymore — it's always visible in header) */}
      {isOpen && (
        <div className="lg:hidden bg-white shadow-xl border-t border-gray-100" data-testid="mobile-menu">
          <div className="px-5 py-4 flex flex-col gap-1">
            {links.map((l) => (
              <NavLink
                key={l.to}
                to={l.to}
                end={l.end}
                onClick={() => setIsOpen(false)}
                className={({ isActive }) =>
                  `px-4 py-3 rounded-lg text-sm transition-colors ${
                    isActive ? 'bg-emerald-50 text-emerald-700 font-medium' : 'text-gray-700 hover:bg-gray-50'
                  }`
                }
              >
                {l.label}
              </NavLink>
            ))}
            <Link
              to={`${prefix}/contact`}
              onClick={() => setIsOpen(false)}
              className="mt-3 bg-emerald-600 text-white text-center py-3 rounded-full text-sm font-medium"
            >
              {t.hero.ctaPrimary}
            </Link>
          </div>
        </div>
      )}
    </header>
  );
};

// ========== Floating WhatsApp button ==========
const WhatsAppButton = () => (
  <a
    href={WHATSAPP_LINK}
    target="_blank"
    rel="noopener noreferrer"
    className="fixed bottom-6 right-6 z-40 group"
    aria-label="WhatsApp"
    data-testid="whatsapp-float-btn"
  >
    <div className="relative">
      <span className="absolute inset-0 bg-green-500 rounded-full animate-ping opacity-20" />
      <div className="relative bg-[#25D366] hover:bg-[#1FAD55] text-white w-14 h-14 rounded-full flex items-center justify-center shadow-lg shadow-green-500/40 transition-all duration-300 group-hover:scale-110">
        <svg className="w-7 h-7" fill="currentColor" viewBox="0 0 24 24">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
        </svg>
      </div>
    </div>
  </a>
);

// ========== Footer ==========
const Footer = ({ t }) => {
  const prefix = useSmartPrefix();
  return (
    <footer className="bg-emerald-950 text-emerald-100" data-testid="rccb-footer">
      <div className="max-w-7xl mx-auto px-5 lg:px-8 py-16 grid md:grid-cols-4 gap-10">
        <div className="md:col-span-2">
          <div className="flex items-center gap-3 mb-5">
            <div className="bg-white rounded-lg p-2">
              <img src={IMG('/images/rccb/logo.avif')} alt="RCCB" className="h-10" />
            </div>
            <div>
              <div className="text-white font-semibold text-lg">RCCB Group</div>
              <div className="text-emerald-300 text-xs tracking-wider">Retail Cleaning Care Belgium</div>
            </div>
          </div>
          <p className="text-emerald-200/80 text-sm leading-relaxed max-w-md">{t.footer.tagline}</p>
          <a
            href={WHATSAPP_LINK}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 mt-6 px-5 py-2.5 bg-[#25D366] hover:bg-[#1FAD55] text-white rounded-full text-sm font-medium transition-all"
          >
            <MessageCircle className="w-4 h-4" />
            {t.contact.whatsapp}
          </a>
        </div>

        <div>
          <div className="text-white font-semibold mb-4 text-sm tracking-widest uppercase">{t.footer.navTitle}</div>
          <ul className="space-y-2.5 text-sm">
            <li><Link to={`${prefix}/`} className="hover:text-emerald-300 transition-colors">{t.nav.home}</Link></li>
            <li><Link to={`${prefix}/services`} className="hover:text-emerald-300 transition-colors">{t.nav.services}</Link></li>
            <li><Link to={`${prefix}/gallery`} className="hover:text-emerald-300 transition-colors">{t.nav.gallery}</Link></li>
            <li><Link to={`${prefix}/contact`} className="hover:text-emerald-300 transition-colors">{t.nav.contact}</Link></li>
          </ul>
        </div>

        <div>
          <div className="text-white font-semibold mb-4 text-sm tracking-widest uppercase">{t.footer.contactTitle}</div>
          <ul className="space-y-3 text-sm">
            <li className="flex items-start gap-2">
              <MapPin className="w-4 h-4 text-emerald-400 mt-0.5 flex-shrink-0" />
              <span>{ADDRESS}</span>
            </li>
            <li className="flex items-center gap-2">
              <Phone className="w-4 h-4 text-emerald-400" />
              <a href={`tel:${PHONE.replace(/\s/g, '')}`} className="hover:text-emerald-300 transition-colors">{PHONE}</a>
            </li>
            <li className="flex items-center gap-2">
              <Mail className="w-4 h-4 text-emerald-400" />
              <a href={`mailto:${EMAIL}`} className="hover:text-emerald-300 transition-colors">{EMAIL}</a>
            </li>
            <li className="text-emerald-400/70 text-xs pt-2">{VAT}</li>
          </ul>
        </div>
      </div>

      <div className="border-t border-emerald-900">
        <div className="max-w-7xl mx-auto px-5 lg:px-8 py-5 flex flex-col md:flex-row items-center justify-between gap-3 text-xs text-emerald-300/60">
          <div>© {new Date().getFullYear()} Retail Cleaning Care Belgium. {t.footer.legal}</div>
          <div className="flex items-center gap-2">
            <span className="opacity-70">{t.footer.webmaster.split(':')[0]}:</span>
            <a
              href="https://www.fworksbuilders.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-emerald-300 hover:text-white transition-colors font-medium"
              data-testid="webmaster-link"
            >
              fworksbuilders
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

// ========== HOME PAGE ==========
const HomePage = ({ t }) => {
  const prefix = useSmartPrefix();
  return (
    <>
      <SEO title="RCCB — Retail Cleaning Care Belgium" description={t.hero.subtitle} />

      {/* HERO VIDEO */}
      <VideoHero>
        <div className="max-w-5xl mx-auto px-5 lg:px-8 text-center text-white pt-20">
          <p className="text-emerald-200 text-xs md:text-sm tracking-[0.4em] uppercase mb-5 fade-in-up" data-testid="hero-tagline">
            {t.hero.tagline}
          </p>
          <h1 className="text-4xl sm:text-5xl lg:text-7xl font-light tracking-tight mb-6 leading-[1.05] fade-in-up" style={{ animationDelay: '0.1s' }}>
            {t.hero.title}
            <br />
            <span className="italic text-emerald-300 font-serif">{t.hero.titleAccent}</span>
          </h1>
          <p className="text-base md:text-lg text-white/80 max-w-2xl mx-auto leading-relaxed mb-10 fade-in-up" style={{ animationDelay: '0.2s' }}>
            {t.hero.subtitle}
          </p>
          <div className="flex flex-wrap justify-center gap-4 fade-in-up" style={{ animationDelay: '0.3s' }}>
            <Link
              to={`${prefix}/contact`}
              className="group bg-emerald-500 hover:bg-emerald-400 text-emerald-950 px-8 py-4 rounded-full text-sm font-medium tracking-wide transition-all duration-300 hover:shadow-2xl hover:shadow-emerald-500/40 hover:-translate-y-0.5 flex items-center gap-2"
              data-testid="hero-cta-primary"
            >
              {t.hero.ctaPrimary}
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </Link>
            <Link
              to={`${prefix}/services`}
              className="border border-white/30 hover:border-white hover:bg-white/10 text-white px-8 py-4 rounded-full text-sm font-medium tracking-wide transition-all duration-300 backdrop-blur-sm"
              data-testid="hero-cta-secondary"
            >
              {t.hero.ctaSecondary}
            </Link>
          </div>
        </div>
      </VideoHero>

      {/* STORY / NOTRE HISTOIRE */}
      <section className="py-24 lg:py-32 bg-white relative overflow-hidden">
        <div
          className="absolute -top-24 -right-24 w-96 h-96 bg-emerald-100/40 rounded-full blur-3xl"
          aria-hidden
        />
        <div className="max-w-6xl mx-auto px-5 lg:px-8 relative">
          <div className="grid lg:grid-cols-5 gap-12 items-start">
            <div className="lg:col-span-2">
              <p className="text-emerald-600 text-xs tracking-[0.3em] uppercase mb-4 font-medium">{t.story.kicker}</p>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-light text-emerald-950 leading-tight mb-6">
                {t.story.title}
              </h2>
              <div className="h-1 w-16 bg-emerald-500 mb-8" />
              <div className="bg-emerald-50 rounded-2xl p-6 border-l-4 border-emerald-500">
                <p className="text-emerald-800 text-sm font-medium tracking-widest uppercase mb-2">{t.story.mission}</p>
                <p className="text-emerald-950 text-lg leading-relaxed">{t.story.missionText}</p>
              </div>
            </div>
            <div className="lg:col-span-3 space-y-5 text-gray-700 text-base lg:text-lg leading-relaxed">
              <p>{t.story.p1}</p>
              <p>{t.story.p2}</p>
              <p className="font-medium text-emerald-900">{t.story.p3}</p>
            </div>
          </div>
        </div>
      </section>

      {/* STATS BANNER */}
      <section className="py-16 bg-emerald-900 text-white">
        <div className="max-w-6xl mx-auto px-5 lg:px-8 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {[
            { num: '10+', label: t.stats.years },
            { num: '150+', label: t.stats.clients },
            { num: '25+', label: t.stats.team },
            { num: 'BE', label: t.stats.area }
          ].map((s, i) => (
            <div key={i} className="border-l border-emerald-700 first:border-l-0 md:first:border-l-0 pl-4" data-testid={`stat-${i}`}>
              <div className="text-4xl md:text-5xl font-light text-emerald-200 mb-2">{s.num}</div>
              <div className="text-xs md:text-sm text-emerald-100/70 tracking-widest uppercase">{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* SERVICES TEASER */}
      <section className="py-24 lg:py-32 bg-gradient-to-b from-white to-emerald-50/40">
        <div className="max-w-7xl mx-auto px-5 lg:px-8">
          <div className="text-center mb-16">
            <p className="text-emerald-600 text-xs tracking-[0.3em] uppercase mb-4 font-medium">{t.services.kicker}</p>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-light text-emerald-950 max-w-3xl mx-auto leading-tight">
              {t.services.title}
            </h2>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {t.services.list.slice(0, 6).map((s, i) => {
              const Icon = ICONS[s.icon] || Sparkles;
              return (
                <div
                  key={i}
                  className="group bg-white p-8 rounded-2xl border border-gray-100 hover:border-emerald-300 hover:shadow-xl hover:shadow-emerald-500/5 transition-all duration-500 hover:-translate-y-1"
                  data-testid={`service-card-home-${i}`}
                >
                  <div className="w-12 h-12 rounded-xl bg-emerald-50 flex items-center justify-center mb-5 group-hover:bg-emerald-600 transition-colors duration-300">
                    <Icon className="w-6 h-6 text-emerald-600 group-hover:text-white transition-colors duration-300" />
                  </div>
                  <h3 className="text-lg font-semibold text-emerald-950 mb-2">{s.title}</h3>
                  <p className="text-gray-600 text-sm leading-relaxed">{s.desc}</p>
                </div>
              );
            })}
          </div>
          <div className="text-center mt-12">
            <Link
              to={`${prefix}/services`}
              className="inline-flex items-center gap-2 text-emerald-700 hover:text-emerald-900 text-sm font-medium tracking-wide group"
              data-testid="services-see-all"
            >
              {t.hero.ctaSecondary}
              <ChevronRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
        </div>
      </section>

      {/* WHY US */}
      <section className="py-24 lg:py-32 bg-emerald-950 text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-5" style={{
          backgroundImage: 'radial-gradient(circle at 1px 1px, rgba(255,255,255,0.8) 1px, transparent 0)',
          backgroundSize: '32px 32px'
        }} />
        <div className="max-w-6xl mx-auto px-5 lg:px-8 relative">
          <div className="mb-16 max-w-2xl">
            <p className="text-emerald-400 text-xs tracking-[0.3em] uppercase mb-4 font-medium">{t.why.kicker}</p>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-light leading-tight">{t.why.title}</h2>
          </div>
          <div className="grid md:grid-cols-2 gap-10">
            {t.why.points.map((p, i) => (
              <div key={i} className="flex gap-5" data-testid={`why-point-${i}`}>
                <div className="flex-shrink-0">
                  <div className="w-10 h-10 rounded-full bg-emerald-500/20 border border-emerald-400/30 flex items-center justify-center">
                    <CheckCircle2 className="w-5 h-5 text-emerald-300" />
                  </div>
                </div>
                <div>
                  <h3 className="text-xl font-medium mb-2">{p.title}</h3>
                  <p className="text-emerald-100/70 leading-relaxed">{p.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="py-20 bg-white">
        <div className="max-w-5xl mx-auto px-5 lg:px-8">
          <div className="bg-gradient-to-br from-emerald-600 to-emerald-800 rounded-3xl p-12 lg:p-16 text-center text-white relative overflow-hidden">
            <div className="absolute -top-24 -right-24 w-64 h-64 bg-white/10 rounded-full blur-3xl" />
            <div className="absolute -bottom-24 -left-24 w-64 h-64 bg-emerald-400/20 rounded-full blur-3xl" />
            <div className="relative">
              <h2 className="text-3xl md:text-4xl font-light mb-4">{t.services.ctaTitle}</h2>
              <p className="text-emerald-100 text-lg mb-8 max-w-2xl mx-auto">{t.services.ctaText}</p>
              <Link
                to={`${prefix}/contact`}
                className="inline-flex items-center gap-2 bg-white text-emerald-700 hover:bg-emerald-50 px-8 py-4 rounded-full font-medium transition-all hover:shadow-2xl hover:-translate-y-0.5"
                data-testid="final-cta-btn"
              >
                {t.services.ctaBtn}
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

// ========== SERVICES PAGE ==========
const ServicesPage = ({ t }) => {
  const [filter, setFilter] = useState('all');
  const prefix = useSmartPrefix();

  const filtered = filter === 'all' ? t.services.list : t.services.list.filter(s => s.category === filter);

  return (
    <>
      <SEO title={`${t.nav.services} — RCCB`} description={t.services.subtitle} />

      {/* Page hero */}
      <section className="relative pt-40 pb-20 bg-gradient-to-br from-emerald-950 via-emerald-900 to-emerald-800 overflow-hidden">
        <div className="absolute inset-0 opacity-10" style={{
          backgroundImage: 'radial-gradient(circle at 2px 2px, rgba(255,255,255,0.3) 1px, transparent 0)',
          backgroundSize: '28px 28px'
        }} />
        <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-500/20 rounded-full blur-3xl" />
        <div className="max-w-6xl mx-auto px-5 lg:px-8 relative text-white">
          <p className="text-emerald-300 text-xs tracking-[0.3em] uppercase mb-4">{t.services.kicker}</p>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-light leading-tight mb-6 max-w-3xl">
            {t.services.title}
          </h1>
          <p className="text-lg text-emerald-100/80 max-w-2xl leading-relaxed">{t.services.subtitle}</p>
        </div>
      </section>

      {/* Filters */}
      <section className="py-10 bg-white sticky top-[72px] z-30 border-b border-gray-100">
        <div className="max-w-6xl mx-auto px-5 lg:px-8 flex flex-wrap gap-3 justify-center">
          <button
            onClick={() => setFilter('all')}
            className={`px-5 py-2.5 rounded-full text-sm font-medium transition-all ${
              filter === 'all' ? 'bg-emerald-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
            data-testid="filter-all"
          >
            {t.nav.services}
          </button>
          <button
            onClick={() => setFilter('b2b')}
            className={`px-5 py-2.5 rounded-full text-sm font-medium transition-all ${
              filter === 'b2b' ? 'bg-emerald-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
            data-testid="filter-b2b"
          >
            {t.services.categories.b2b}
          </button>
          <button
            onClick={() => setFilter('specialist')}
            className={`px-5 py-2.5 rounded-full text-sm font-medium transition-all ${
              filter === 'specialist' ? 'bg-emerald-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
            data-testid="filter-specialist"
          >
            {t.services.categories.specialist}
          </button>
        </div>
      </section>

      {/* Services grid */}
      <section className="py-20 bg-gradient-to-b from-white to-emerald-50/30">
        <div className="max-w-7xl mx-auto px-5 lg:px-8">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((s, i) => {
              const Icon = ICONS[s.icon] || Sparkles;
              return (
                <div
                  key={`${filter}-${i}`}
                  className="group relative bg-white p-8 rounded-2xl border border-gray-100 hover:border-emerald-300 hover:shadow-xl hover:shadow-emerald-500/5 transition-all duration-500 hover:-translate-y-1 overflow-hidden"
                  data-testid={`service-card-${i}`}
                >
                  <div className="absolute top-0 right-0 text-[8px] tracking-widest uppercase px-3 py-1 bg-emerald-50 text-emerald-700 rounded-bl-lg">
                    {s.category === 'b2b' ? t.services.categories.b2b : t.services.categories.specialist}
                  </div>
                  <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-emerald-500 to-emerald-700 flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-500 shadow-lg shadow-emerald-500/20">
                    <Icon className="w-7 h-7 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold text-emerald-950 mb-3">{s.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{s.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-emerald-950 text-white">
        <div className="max-w-4xl mx-auto px-5 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-light mb-4">{t.services.ctaTitle}</h2>
          <p className="text-emerald-100/80 text-lg mb-8">{t.services.ctaText}</p>
          <Link
            to={`${prefix}/contact`}
            className="inline-flex items-center gap-2 bg-emerald-500 hover:bg-emerald-400 text-emerald-950 px-8 py-4 rounded-full font-medium transition-all hover:shadow-2xl hover:shadow-emerald-500/40 hover:-translate-y-0.5"
          >
            {t.services.ctaBtn}
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>
    </>
  );
};

// ========== GALLERY PAGE ==========
const GalleryPage = ({ t }) => {
  const [visible, setVisible] = useState(18);
  const [lightbox, setLightbox] = useState(null);

  const showMore = () => setVisible((v) => Math.min(v + 18, PHOTOS.length));

  // Close lightbox on Escape; navigate with arrows
  useEffect(() => {
    if (lightbox === null) return;
    const onKey = (e) => {
      if (e.key === 'Escape') setLightbox(null);
      else if (e.key === 'ArrowRight') setLightbox((i) => (i + 1) % PHOTOS.length);
      else if (e.key === 'ArrowLeft') setLightbox((i) => (i - 1 + PHOTOS.length) % PHOTOS.length);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [lightbox]);

  return (
    <>
      <SEO title={`${t.gallery.title} — RCCB`} description={t.gallery.subtitle} />

      <section className="relative pt-40 pb-16 bg-gradient-to-br from-emerald-950 via-emerald-900 to-emerald-800 overflow-hidden">
        <div className="absolute top-0 left-0 w-96 h-96 bg-emerald-500/20 rounded-full blur-3xl" />
        <div className="max-w-6xl mx-auto px-5 lg:px-8 relative text-white">
          <p className="text-emerald-300 text-xs tracking-[0.3em] uppercase mb-4">{t.gallery.kicker}</p>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-light leading-tight mb-6">{t.gallery.title}</h1>
          <p className="text-lg text-emerald-100/80 max-w-2xl leading-relaxed">{t.gallery.subtitle}</p>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-5 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-4">
            {PHOTOS.slice(0, visible).map((src, i) => (
              <button
                key={src}
                onClick={() => setLightbox(i)}
                className="group relative aspect-square overflow-hidden rounded-xl bg-gray-100"
                data-testid={`gallery-photo-${i}`}
              >
                <img
                  src={IMG(src)}
                  alt={`RCCB ${i + 1}`}
                  loading="lazy"
                  style={{ opacity: 1 }}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-emerald-950/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </button>
            ))}
          </div>

          {visible < PHOTOS.length && (
            <div className="text-center mt-12">
              <button
                onClick={showMore}
                className="px-8 py-3 border-2 border-emerald-600 text-emerald-700 hover:bg-emerald-600 hover:text-white rounded-full font-medium transition-all"
                data-testid="gallery-load-more"
              >
                {t.gallery.loadMore}
              </button>
            </div>
          )}
        </div>
      </section>

      {/* Lightbox */}
      {lightbox !== null && (
        <div
          className="fixed inset-0 z-[60] bg-black/95 flex items-center justify-center p-4 backdrop-blur-sm"
          onClick={() => setLightbox(null)}
          data-testid="gallery-lightbox"
        >
          <button
            onClick={() => setLightbox(null)}
            className="absolute top-6 right-6 text-white hover:text-emerald-300 z-10"
            aria-label="Close"
          >
            <X className="w-8 h-8" />
          </button>
          <button
            onClick={(e) => { e.stopPropagation(); setLightbox((lightbox - 1 + PHOTOS.length) % PHOTOS.length); }}
            className="absolute left-4 md:left-8 text-white/70 hover:text-white p-2"
          >
            <ChevronRight className="w-8 h-8 rotate-180" />
          </button>
          <img
            src={IMG(PHOTOS[lightbox])}
            alt=""
            className="max-h-[90vh] max-w-[90vw] object-contain rounded-lg"
            onClick={(e) => e.stopPropagation()}
          />
          <button
            onClick={(e) => { e.stopPropagation(); setLightbox((lightbox + 1) % PHOTOS.length); }}
            className="absolute right-4 md:right-8 text-white/70 hover:text-white p-2"
          >
            <ChevronRight className="w-8 h-8" />
          </button>
          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 text-white/60 text-sm">
            {lightbox + 1} / {PHOTOS.length}
          </div>
        </div>
      )}
    </>
  );
};

// ========== CONTACT PAGE ==========
const ContactPage = ({ t }) => {
  const [form, setForm] = useState({ name: '', company: '', email: '', phone: '', service: '', message: '' });
  const [status, setStatus] = useState('idle'); // idle | submitting | success | error

  const onSubmit = async (e) => {
    e.preventDefault();
    setStatus('submitting');
    try {
      const API = process.env.REACT_APP_BACKEND_URL + '/api';
      const res = await fetch(`${API}/public/contact`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ site: 'rccb', ...form })
      });
      if (!res.ok) throw new Error('failed');
      setStatus('success');
      setForm({ name: '', company: '', email: '', phone: '', service: '', message: '' });
    } catch (err) {
      setStatus('error');
    }
  };

  const onChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  return (
    <>
      <SEO title={`${t.nav.contact} — RCCB`} description={t.contact.subtitle} />

      <section className="relative pt-40 pb-16 bg-gradient-to-br from-emerald-950 via-emerald-900 to-emerald-800 overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-500/20 rounded-full blur-3xl" />
        <div className="max-w-6xl mx-auto px-5 lg:px-8 relative text-white">
          <p className="text-emerald-300 text-xs tracking-[0.3em] uppercase mb-4">{t.contact.kicker}</p>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-light leading-tight mb-6">{t.contact.title}</h1>
          <p className="text-lg text-emerald-100/80 max-w-2xl leading-relaxed">{t.contact.subtitle}</p>
        </div>
      </section>

      <section className="py-20 bg-gradient-to-b from-white to-emerald-50/30">
        <div className="max-w-6xl mx-auto px-5 lg:px-8 grid lg:grid-cols-5 gap-12">
          {/* Form */}
          <div className="lg:col-span-3 bg-white rounded-2xl p-8 lg:p-10 shadow-xl shadow-emerald-900/5 border border-gray-100">
            <form onSubmit={onSubmit} className="space-y-5" data-testid="contact-form">
              <div className="grid md:grid-cols-2 gap-5">
                <div>
                  <label className="block text-xs uppercase tracking-widest text-gray-500 mb-2">{t.contact.formName} *</label>
                  <input
                    required name="name" value={form.name} onChange={onChange}
                    className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 outline-none transition-all"
                    data-testid="contact-input-name"
                  />
                </div>
                <div>
                  <label className="block text-xs uppercase tracking-widest text-gray-500 mb-2">{t.contact.formCompany}</label>
                  <input
                    name="company" value={form.company} onChange={onChange}
                    className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 outline-none transition-all"
                    data-testid="contact-input-company"
                  />
                </div>
              </div>
              <div className="grid md:grid-cols-2 gap-5">
                <div>
                  <label className="block text-xs uppercase tracking-widest text-gray-500 mb-2">{t.contact.formEmail} *</label>
                  <input
                    required type="email" name="email" value={form.email} onChange={onChange}
                    className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 outline-none transition-all"
                    data-testid="contact-input-email"
                  />
                </div>
                <div>
                  <label className="block text-xs uppercase tracking-widest text-gray-500 mb-2">{t.contact.formPhone}</label>
                  <input
                    type="tel" name="phone" value={form.phone} onChange={onChange}
                    className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 outline-none transition-all"
                    data-testid="contact-input-phone"
                  />
                </div>
              </div>
              <div>
                <label className="block text-xs uppercase tracking-widest text-gray-500 mb-2">{t.contact.formService}</label>
                <select
                  name="service" value={form.service} onChange={onChange}
                  className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 outline-none transition-all bg-white"
                  data-testid="contact-input-service"
                >
                  <option value="">{t.contact.selectService}</option>
                  {t.services.list.map((s, i) => (
                    <option key={i} value={s.title}>{s.title}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-xs uppercase tracking-widest text-gray-500 mb-2">{t.contact.formMessage} *</label>
                <textarea
                  required rows="5" name="message" value={form.message} onChange={onChange}
                  className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 outline-none transition-all resize-none"
                  data-testid="contact-input-message"
                />
              </div>
              {status === 'success' && (
                <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-lg text-emerald-800 text-sm flex items-center gap-2" data-testid="contact-success">
                  <CheckCircle2 className="w-5 h-5" />
                  {t.contact.formSuccess}
                </div>
              )}
              {status === 'error' && (
                <div className="p-4 bg-red-50 border border-red-200 rounded-lg text-red-800 text-sm" data-testid="contact-error">
                  {t.contact.formError}
                </div>
              )}
              <button
                type="submit"
                disabled={status === 'submitting'}
                className="w-full md:w-auto bg-emerald-600 hover:bg-emerald-700 disabled:bg-gray-400 text-white px-8 py-3.5 rounded-full font-medium transition-all hover:shadow-lg hover:shadow-emerald-500/30 flex items-center justify-center gap-2"
                data-testid="contact-submit-btn"
              >
                {status === 'submitting' ? t.contact.formSubmitting : t.contact.formSubmit}
                <Send className="w-4 h-4" />
              </button>
            </form>
          </div>

          {/* Info */}
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-gradient-to-br from-emerald-600 to-emerald-800 rounded-2xl p-8 text-white">
              <h3 className="text-xs tracking-widest uppercase text-emerald-200 mb-4">{t.contact.infoTitle}</h3>
              <div className="space-y-5">
                <div className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-emerald-200 flex-shrink-0 mt-0.5" />
                  <span className="text-sm leading-relaxed">{ADDRESS}</span>
                </div>
                <div className="flex items-center gap-3">
                  <Phone className="w-5 h-5 text-emerald-200" />
                  <a href={`tel:${PHONE.replace(/\s/g, '')}`} className="text-sm hover:text-emerald-200 transition-colors">{PHONE}</a>
                </div>
                <div className="flex items-center gap-3">
                  <Mail className="w-5 h-5 text-emerald-200" />
                  <a href={`mailto:${EMAIL}`} className="text-sm hover:text-emerald-200 transition-colors">{EMAIL}</a>
                </div>
                <div className="text-xs text-emerald-200/70 pt-2 border-t border-emerald-500/40">{VAT}</div>
              </div>
            </div>

            <a
              href={WHATSAPP_LINK}
              target="_blank"
              rel="noopener noreferrer"
              className="group block bg-[#25D366] hover:bg-[#1FAD55] text-white rounded-2xl p-6 transition-all hover:shadow-2xl hover:shadow-green-500/30 hover:-translate-y-0.5"
              data-testid="contact-whatsapp-card"
            >
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center flex-shrink-0">
                  <MessageCircle className="w-6 h-6" />
                </div>
                <div className="flex-1">
                  <div className="text-sm font-semibold">WhatsApp</div>
                  <div className="text-xs text-white/80">{t.contact.whatsapp}</div>
                </div>
                <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
              </div>
            </a>

            <div className="bg-white rounded-2xl p-6 border border-gray-100">
              <div className="flex items-center gap-2 text-emerald-700 mb-3">
                <Clock className="w-4 h-4" />
                <h3 className="text-xs tracking-widest uppercase font-semibold">{t.contact.hoursTitle}</h3>
              </div>
              <ul className="space-y-2 text-sm text-gray-700">
                <li>{t.contact.hoursWeek}</li>
                <li>{t.contact.hoursSat}</li>
                <li className="text-gray-400">{t.contact.hoursSun}</li>
              </ul>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

// ========== MAIN APP ==========
export default function RccbApp() {
  const [lang, setLang, t] = useLanguage();

  return (
    <div className="min-h-screen bg-white font-sans" data-site="rccb">
      <ScrollToTop />
      <PageTracker />
      <Navigation lang={lang} setLang={setLang} t={t} />

      <main style={{ paddingTop: 0 }}>
        <Routes>
          <Route path="/" element={<HomePage t={t} />} />
          <Route path="/services" element={<ServicesPage t={t} />} />
          <Route path="/gallery" element={<GalleryPage t={t} />} />
          <Route path="/contact" element={<ContactPage t={t} />} />
          <Route path="/site/rccb" element={<HomePage t={t} />} />
          <Route path="/site/rccb/services" element={<ServicesPage t={t} />} />
          <Route path="/site/rccb/gallery" element={<GalleryPage t={t} />} />
          <Route path="/site/rccb/contact" element={<ContactPage t={t} />} />
          <Route path="*" element={<HomePage t={t} />} />
        </Routes>
      </main>

      <Footer t={t} />
      <WhatsAppButton />
    </div>
  );
}
