import React from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { Star, ExternalLink, MessageSquare } from 'lucide-react';

const PLACE_NAME = 'Il Siciliano — Trattoria Pizzería';
const GOOGLE_PLACE_URL = 'https://www.google.com/maps/place/Restaurante+Pizzer%C3%ADa+el+Italiano/@-0.247468,-79.1529096,17z/data=!4m6!3m5!1s0x91d5479778d5995d:0x130ec80e54aacf81!8m2!3d-0.247468!4d-79.1529096!16s%2Fg%2F11f6djqgr7';
// Direct write-a-review link (lands on Google with the write-review pop-up open)
const WRITE_REVIEW_URL = 'https://search.google.com/local/writereview?placeid=ChIJXZnVeJdH1ZER0c-qVA7IDhM';
// Embed iframe of the location (works without an API key)
const GOOGLE_EMBED_URL = 'https://www.google.com/maps?q=Il+Siciliano+Santo+Domingo+Ecuador&output=embed';

const REVIEW_PAGE_T = {
  es: {
    title: 'Reseñas de nuestros clientes',
    subtitle: 'Lo que dicen los amantes de la auténtica cocina italiana',
    intro: 'Visita nuestra página de Google para leer todas las opiniones de nuestros clientes. ¿Ya nos has visitado? ¡Nos encantaría conocer tu experiencia!',
    write: 'Escribir una reseña en Google',
    view: 'Ver todas las reseñas en Google',
    embedLabel: 'Reseñas y ubicación en Google Maps',
    ctaTitle: '¿Te gustó tu visita?',
    ctaText: 'Tu opinión nos ayuda a mejorar y a que otros amantes de la auténtica cocina italiana nos descubran. ¡Solo te toma 30 segundos!'
  },
  en: {
    title: 'Customer reviews',
    subtitle: 'What lovers of authentic Italian cuisine say about us',
    intro: 'Visit our Google page to read all reviews from our customers. Already been here? We would love to hear about your experience!',
    write: 'Write a review on Google',
    view: 'See all reviews on Google',
    embedLabel: 'Reviews and location on Google Maps',
    ctaTitle: 'Enjoyed your visit?',
    ctaText: 'Your opinion helps us improve and lets other lovers of authentic Italian cuisine find us. It only takes 30 seconds!'
  },
  fr: {
    title: 'Avis de nos clients',
    subtitle: 'Ce que disent les amateurs de la cuisine italienne authentique',
    intro: 'Consultez notre page Google pour lire tous les avis de nos clients. Déjà venu chez nous ? Partagez votre expérience !',
    write: 'Écrire un avis sur Google',
    view: 'Voir tous les avis sur Google',
    embedLabel: 'Avis et emplacement sur Google Maps',
    ctaTitle: 'Vous avez aimé votre visite ?',
    ctaText: 'Votre avis nous aide à nous améliorer et permet à d\'autres amateurs de cuisine italienne authentique de nous découvrir. Ça ne prend que 30 secondes !'
  },
  it: {
    title: 'Recensioni dei nostri clienti',
    subtitle: 'Cosa dicono gli amanti dell\'autentica cucina italiana',
    intro: 'Visita la nostra pagina Google per leggere tutte le opinioni dei clienti. Sei già stato da noi? Ci farebbe piacere conoscere la tua esperienza!',
    write: 'Scrivi una recensione su Google',
    view: 'Vedi tutte le recensioni su Google',
    embedLabel: 'Recensioni e posizione su Google Maps',
    ctaTitle: 'Ti è piaciuta la tua visita?',
    ctaText: 'La tua opinione ci aiuta a migliorare e permette ad altri amanti della cucina italiana autentica di scoprirci. Bastano 30 secondi!'
  },
  nl: {
    title: 'Klantenrecensies',
    subtitle: 'Wat liefhebbers van authentieke Italiaanse keuken over ons zeggen',
    intro: 'Bezoek onze Google pagina om alle recensies van klanten te lezen. Al bij ons geweest? We horen graag jouw ervaring!',
    write: 'Schrijf een review op Google',
    view: 'Bekijk alle reviews op Google',
    embedLabel: 'Reviews en locatie op Google Maps',
    ctaTitle: 'Beviel je bezoek?',
    ctaText: 'Jouw mening helpt ons te verbeteren en zorgt dat andere liefhebbers van authentieke Italiaanse keuken ons vinden. Kost maar 30 seconden!'
  },
  de: {
    title: 'Kundenbewertungen',
    subtitle: 'Was Liebhaber authentischer italienischer Küche über uns sagen',
    intro: 'Besuchen Sie unsere Google-Seite, um alle Bewertungen unserer Gäste zu lesen. Schon bei uns gewesen? Wir freuen uns über Ihre Erfahrung!',
    write: 'Eine Bewertung auf Google schreiben',
    view: 'Alle Bewertungen auf Google ansehen',
    embedLabel: 'Bewertungen und Standort auf Google Maps',
    ctaTitle: 'Hat Ihnen Ihr Besuch gefallen?',
    ctaText: 'Ihre Meinung hilft uns, besser zu werden und andere Liebhaber authentischer italienischer Küche zu uns zu bringen. Dauert nur 30 Sekunden!'
  }
};

const Reviews = () => {
  const { language } = useLanguage();
  const t = REVIEW_PAGE_T[language] || REVIEW_PAGE_T.es;

  return (
    <div className="min-h-screen bg-black pt-20" data-testid="reviews-page">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex justify-center gap-1 mb-4">
            {[...Array(5)].map((_, i) => (
              <Star key={i} size={28} className="text-gold fill-gold" />
            ))}
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gold mb-3" data-testid="reviews-title">
            {t.title}
          </h1>
          <div className="w-16 h-0.5 bg-gold mx-auto mb-6" />
          <p className="text-gray-300 text-lg md:text-xl max-w-3xl mx-auto">
            {t.subtitle}
          </p>
        </div>

        {/* Intro + CTA card */}
        <div className="bg-gradient-to-br from-gold/10 via-transparent to-transparent border-2 border-gold/30 rounded-2xl p-6 md:p-10 mb-10">
          <p className="text-gray-300 text-base md:text-lg leading-relaxed mb-6 text-center max-w-3xl mx-auto">
            {t.intro}
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href={WRITE_REVIEW_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-gold text-black px-7 py-4 rounded-lg font-bold hover:bg-gold/90 transform hover:scale-105 transition-all shadow-lg"
              data-testid="write-review-btn"
            >
              <MessageSquare size={20} />
              {t.write}
            </a>
            <a
              href={GOOGLE_PLACE_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 border-2 border-gold/40 text-gold px-7 py-4 rounded-lg font-semibold hover:bg-gold/10 transition-all"
              data-testid="view-reviews-btn"
            >
              <ExternalLink size={18} />
              {t.view}
            </a>
          </div>
        </div>

        {/* Google Maps embed (shows location + clickable to see reviews on Google) */}
        <div className="bg-gradient-to-br from-gray-900 to-black border border-gold/20 rounded-2xl overflow-hidden shadow-2xl">
          <div className="aspect-video w-full">
            <iframe
              src={GOOGLE_EMBED_URL}
              width="100%"
              height="100%"
              style={{ border: 0 }}
              loading="lazy"
              allowFullScreen
              referrerPolicy="no-referrer-when-downgrade"
              title={t.embedLabel}
              data-testid="google-maps-embed"
            />
          </div>
        </div>

        {/* Second CTA below the map */}
        <div className="mt-10 text-center">
          <h3 className="text-2xl md:text-3xl font-bold text-gold mb-3">{t.ctaTitle}</h3>
          <p className="text-gray-300 mb-6 max-w-2xl mx-auto">{t.ctaText}</p>
          <a
            href={WRITE_REVIEW_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-gold text-black px-8 py-4 rounded-lg font-bold hover:bg-gold/90 transform hover:scale-105 transition-all shadow-lg text-lg"
            data-testid="write-review-btn-bottom"
          >
            <Star size={22} className="fill-black" />
            {t.write}
          </a>
        </div>
      </div>
    </div>
  );
};

export default Reviews;
