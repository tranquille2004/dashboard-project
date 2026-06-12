import React, { useEffect } from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { useBasePath } from '../contexts/BasePathContext';
import { Link } from 'react-router-dom';
import { ChevronLeft, MessageCircle, Phone } from 'lucide-react';

const _ = (es, en, it, fr) => ({ es, en, it, fr, nl: es, de: en });

const t = {
  badge: _('Bambino Box · Inscripción', 'Bambino Box · Sign-up', 'Bambino Box · Iscrizione', 'Bambino Box · Inscription'),
  title: _('Inscríbete al Bambino Box', 'Sign up for Bambino Box', 'Iscriviti al Bambino Box', 'Inscris-toi à la Bambino Box'),
  intro: _(
    'Completa el formulario y nos pondremos en contacto contigo para confirmar tu reserva y darte todos los detalles de la experiencia Bambino Box.',
    'Fill in the form and we will contact you to confirm your booking and share all the details of the Bambino Box experience.',
    'Compila il modulo e ti contatteremo per confermare la prenotazione e darti tutti i dettagli dell\'esperienza Bambino Box.',
    'Remplis le formulaire et nous te contacterons pour confirmer ta réservation et partager tous les détails de l\'expérience Bambino Box.'
  ),
  comingSoon: _('Formulario disponible muy pronto', 'Form available very soon', 'Modulo disponibile a brevissimo', 'Formulaire disponible très bientôt'),
  fallbackInfo: _(
    'Mientras tanto, contáctanos directamente por WhatsApp o teléfono:',
    'Meanwhile, contact us directly via WhatsApp or phone:',
    'Nel frattempo, contattaci direttamente su WhatsApp o telefono:',
    'En attendant, contacte-nous directement par WhatsApp ou téléphone :'
  ),
  whatsappBtn: _('Escribir por WhatsApp', 'Message on WhatsApp', 'Scrivi su WhatsApp', 'Écrire sur WhatsApp'),
  callBtn: _('Llamar al restaurante', 'Call the restaurant', 'Chiama il ristorante', 'Appeler le restaurant'),
  backBtn: _('Volver al Bambino Box', 'Back to Bambino Box', 'Torna al Bambino Box', 'Retour à la Bambino Box'),
};

const BambinoBoxSubscribe = () => {
  const { language } = useLanguage();
  const basePath = useBasePath();

  // Load JotForm auto-resize handler so the iframe expands to fit its content
  useEffect(() => {
    const SCRIPT_SRC = 'https://cdn.jotfor.ms/s/umd/latest/for-form-embed-handler.js';
    const IFRAME_SELECTOR = "iframe[id='JotFormIFrame-261618903639667']";
    const initHandler = () => {
      try {
        if (window.jotformEmbedHandler) {
          window.jotformEmbedHandler(IFRAME_SELECTOR, 'https://form.jotform.com/');
        }
      } catch (e) { /* noop */ }
    };
    const existing = document.querySelector(`script[src="${SCRIPT_SRC}"]`);
    if (existing) {
      initHandler();
    } else {
      const s = document.createElement('script');
      s.src = SCRIPT_SRC;
      s.async = true;
      s.onload = initHandler;
      document.body.appendChild(s);
    }
  }, []);

  const whatsappText = encodeURIComponent(
    language === 'es' ? 'Hola, me gustaría inscribirme al Bambino Box'
      : language === 'it' ? 'Ciao, vorrei iscrivermi al Bambino Box'
      : language === 'fr' ? 'Bonjour, je voudrais m\'inscrire à la Bambino Box'
      : 'Hello, I\'d like to sign up for the Bambino Box'
  );

  return (
    <div className="min-h-screen bg-black pt-24 pb-20">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Back link */}
        <Link
          to={`${basePath}/bambino-box`}
          className="inline-flex items-center gap-2 text-gold hover:text-white transition-colors mb-8 text-sm"
          data-testid="subscribe-back-link"
        >
          <ChevronLeft size={18} /> {t.backBtn[language]}
        </Link>

        {/* Header */}
        <div className="text-center mb-10">
          <span className="inline-block px-4 py-1.5 rounded-full bg-gold/10 border border-gold/40 text-gold text-xs tracking-[0.3em] uppercase mb-6">
            {t.badge[language]}
          </span>
          <h1 className="text-4xl md:text-5xl font-bold text-gold mb-4">{t.title[language]}</h1>
          <p className="text-gray-300 leading-relaxed max-w-2xl mx-auto">{t.intro[language]}</p>
        </div>

        {/* JotForm embed - Bambino Box inscription */}
        <div
          className="bg-gradient-to-br from-gray-900 to-black rounded-2xl border border-gold/20 p-2 md:p-4 mb-10 overflow-hidden"
          data-testid="bambino-jotform-container"
        >
          <iframe
            id="JotFormIFrame-261618903639667"
            title="Inscripción bambino box - Il Siciliano"
            onLoad={() => { try { window.scrollTo(0, 0); } catch (e) { /* noop */ } }}
            allow="geolocation; microphone; camera; fullscreen; payment"
            src="https://form.jotform.com/261618903639667"
            frameBorder="0"
            scrolling="no"
            className="w-full block rounded-lg bg-white"
            style={{ minWidth: '100%', maxWidth: '100%', height: '600px', border: 'none' }}
            data-testid="bambino-jotform-iframe"
          />
        </div>

        {/* Fallback contact options */}
        <div className="flex flex-wrap items-center justify-center gap-3 md:gap-4">
          <a
            href={`https://wa.me/593984110781?text=${whatsappText}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 bg-[#25D366] text-white font-bold rounded-lg hover:bg-[#1FB856] transition-all shadow-lg"
            data-testid="subscribe-whatsapp"
          >
            <MessageCircle size={18} /> {t.whatsappBtn[language]}
          </a>
          <a
            href="tel:+593984110781"
            className="inline-flex items-center gap-2 px-6 py-3 border-2 border-gold text-gold font-bold rounded-lg hover:bg-gold/10 transition-all"
            data-testid="subscribe-call"
          >
            <Phone size={18} /> {t.callBtn[language]}
          </a>
        </div>
      </div>
    </div>
  );
};

export default BambinoBoxSubscribe;
