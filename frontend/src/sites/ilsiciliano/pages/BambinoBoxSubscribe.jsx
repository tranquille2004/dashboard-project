import React from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { useBasePath } from '../contexts/BasePathContext';
import { Link } from 'react-router-dom';
import { ChevronLeft, MessageCircle, Phone, Pizza } from 'lucide-react';

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

        {/* JotForm placeholder - to be replaced with actual JotForm embed */}
        <div
          id="jotform-container"
          className="bg-gradient-to-br from-gray-900 to-black rounded-2xl border border-gold/20 p-8 md:p-12 mb-10 min-h-[360px] flex flex-col items-center justify-center text-center"
          data-testid="jotform-placeholder"
        >
          {/* TODO: vervang dit blok door de JotForm embed-code (iframe of script). */}
          <div className="w-16 h-16 rounded-full bg-gold/10 border-2 border-gold/40 flex items-center justify-center mb-5">
            <Pizza size={28} className="text-gold" />
          </div>
          <p className="text-gold text-lg font-semibold mb-2">{t.comingSoon[language]}</p>
          <p className="text-gray-400 text-sm max-w-md">{t.fallbackInfo[language]}</p>
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
