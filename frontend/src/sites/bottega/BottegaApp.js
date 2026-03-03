import React, { useState, useEffect, createContext, useContext } from 'react';
import './bottega.css';
import { Routes, Route, Link, useNavigate, useLocation } from 'react-router-dom';
import { Phone, Mail, MapPin, Clock, ChefHat, Utensils, Wine, Globe } from 'lucide-react';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const BASE_PATH = '/site/bottega';
const IMG_BASE = 'https://raw.githubusercontent.com/tranquille2004/Bottega/main/frontend/public/images';

// Image paths mapping to actual files in the repo
const IMAGES = {
  logo: `${IMG_BASE}/logo.jpg`,
  hero: `${IMG_BASE}/gallery1.jpg`,
  about: `${IMG_BASE}/new-photo21.jpg`,
  fworksLogo: `${IMG_BASE}/fworksbuilders-logo.png`,
  gallery: [
    `${IMG_BASE}/gallery5.jpg`,
    `${IMG_BASE}/gallery6.jpg`,
    `${IMG_BASE}/gallery1.jpg`,
    `${IMG_BASE}/new-photo1.jpg`,
    `${IMG_BASE}/new-photo2.jpg`,
    `${IMG_BASE}/new-photo3.jpg`,
    `${IMG_BASE}/new-photo4.jpg`,
    `${IMG_BASE}/new-photo5.jpg`,
    `${IMG_BASE}/new-photo6.jpg`,
    `${IMG_BASE}/new-photo7.jpg`,
    `${IMG_BASE}/new-photo8.jpg`,
    `${IMG_BASE}/new-photo9.jpg`,
    `${IMG_BASE}/new-photo10.jpg`,
    `${IMG_BASE}/new-photo11.webp`,
    `${IMG_BASE}/new-photo12.webp`,
    `${IMG_BASE}/new-photo13.webp`,
    `${IMG_BASE}/new-photo14.webp`,
    `${IMG_BASE}/new-photo15.webp`,
    `${IMG_BASE}/new-photo16.webp`,
    `${IMG_BASE}/new-photo17.jpg`,
    `${IMG_BASE}/new-photo18.jpg`,
    `${IMG_BASE}/new-photo19.jpg`,
    `${IMG_BASE}/new-photo20.jpg`,
    `${IMG_BASE}/new-photo21.jpg`,
    `${IMG_BASE}/new-photo22.jpg`,
    `${IMG_BASE}/new-photo23.jpg`,
  ],
  features: {
    quality: `${IMG_BASE}/new-photo21.jpg`,
    fresh: `${IMG_BASE}/new-photo23.jpg`,
    ambiance: `${IMG_BASE}/gallery4.jpg`,
  }
};

// Bordeaux color from logo
const BRAND_COLOR = '#7D3C32';

// ===========================================
// TRANSLATIONS
// ===========================================
const translations = {
  nl: {
    home: "Home", about: "Over Ons", menu: "Kaart", gallery: "Galerij", hours: "Openingstijden", contact: "Contact", reserve: "Reserveren",
    heroTitle: "Welkom bij La Bottega Italiana", heroSubtitle: "Authentieke Italiaanse keuken in Herent",
    reserveTable: "Reserveer Tafel", orderTakeaway: "Afhalen Bestellen",
    closureNotice: "Voor het einde van het jaar zijn wij gesloten op: 24, 25 december en 29, 30, 31 december en 1 januari 2026.", letOp: "Let op:",
    aboutTitle: "Authentieke Italiaanse Ervaring", aboutText: "In het hart van Herent biedt La Bottega Italiana u een unieke culinaire ervaring. Met onze authentieke Italiaanse keuken en warme ambiance creëren wij onvergetelijke momenten.",
    feature1Title: "Italiaanse Kwaliteit", feature1Text: "Authentieke Italiaanse ingrediënten",
    feature2Title: "Verse Bereiding", feature2Text: "Dagelijks vers bereid",
    feature3Title: "Elegante Ambiance", feature3Text: "Verfijnde eetervaring",
    restaurantAtmosphere: "Restaurant Sfeer", ourDishes: "Onze Gerechten",
    galleryPageTitle: "Foto Galerij", galleryPageSubtitle: "Ontdek onze gerechten en restaurant sfeer",
    menuTitle: "Ons Menu", menuSubtitle: "Ontdek onze authentieke Italiaanse gerechten", ourMenu: "Onze Kaart", viewMenu: "Bekijk onze volledige menukaart",
    pizzas: "Pizza's", pizzasText: "Alleen beschikbaar in de avonden",
    groupMenus: "Groepsmenu's", groupMenusText: "Perfect voor groepen en feesten",
    viewMenuLink: "Bekijk Menu →", viewPizzas: "Bekijk Pizza's →", viewGroupMenus: "Bekijk Menu's →",
    hoursTitle: "Openingstijden", openingHours: "Openingsuren",
    monTue: "Ma - Di", wedFri: "Wo - Vr", sat: "Za", sun: "Zo",
    pizzaNotice: "Pizza's", pizzaNoticeText: "Alleen beschikbaar in de avonden",
    closedOn: "Gesloten op", closedDays: "Maandagmiddag, dinsdagmiddag en zaterdagmiddag",
    takeawayInfo: "Afhalen kan gedurende de normale openingstijden",
    contactTitle: "Contact & Locatie", contactSubtitle: "Bezoek ons in Herent of neem contact met ons op",
    address: "Adres", phone: "Telefoon", email: "Email", emailNote: "(Alleen voor info, reservaties via website)", website: "Website",
    ctaTitle: "Klaar voor een onvergetelijke ervaring?", ctaSubtitle: "Reserveer nu uw tafel of bestel afhaalmaaltijden",
    restaurantType: "Italiaans restaurant & pizzeria", allRightsReserved: "Alle rechten voorbehouden",
    webmasterText: "Ziet u een fout op deze site? Of zoekt u een professionele website? Contacteer de webmaster via WhatsApp.",
    reservePageTitle: "Reserveren Ter Plaatse", reservePageSubtitle: "Vul het formulier in om een tafel te reserveren", backToHome: "← Terug naar Home",
    takeaway: "Afhalen", takeawayPageTitle: "Afhalen Bestellen", takeawayPageSubtitle: "Vul het formulier in om afhaalmaaltijden te bestellen", clickForMenu: "KLIK HIER VOOR DE KAART →",
    groupMenusPageTitle: "Groepsmenu's", groupMenusPageSubtitle: "Perfecte keuze voor groepen vanaf 10 personen",
    downloadPDF: "📄 Download Groepsmenu's PDF", reserveForGroups: "Reserveer voor Groepen", minimumPersons: "Menu mogelijk vanaf minimaal 10 personen",
    aperitivo: "Aperitivo (spumante)", surprise: "Verrassingsdessert", orChoice: "OF", wineIncluded: "½ fles huiswijn per persoon",
  },
  fr: {
    home: "Accueil", about: "À Propos", menu: "Carte", gallery: "Galerie", hours: "Horaires", contact: "Contact", reserve: "Réserver",
    heroTitle: "Bienvenue chez La Bottega Italiana", heroSubtitle: "Cuisine italienne authentique à Herent",
    reserveTable: "Réserver une Table", orderTakeaway: "Commander à Emporter",
    closureNotice: "Pour la fin de l'année, nous sommes fermés les: 24, 25 décembre et 29, 30, 31 décembre et 1er janvier 2026.", letOp: "Attention:",
    aboutTitle: "Expérience Italienne Authentique", aboutText: "Au cœur de Herent, La Bottega Italiana vous offre une expérience culinaire unique. Avec notre cuisine italienne authentique et notre ambiance chaleureuse, nous créons des moments inoubliables.",
    feature1Title: "Qualité Italienne", feature1Text: "Ingrédients italiens authentiques",
    feature2Title: "Préparation Fraîche", feature2Text: "Préparé frais quotidiennement",
    feature3Title: "Ambiance Élégante", feature3Text: "Expérience gastronomique raffinée",
    restaurantAtmosphere: "Atmosphère du Restaurant", ourDishes: "Nos Plats",
    galleryPageTitle: "Galerie de Photos", galleryPageSubtitle: "Découvrez nos plats et l'atmosphère du restaurant",
    menuTitle: "Notre Menu", menuSubtitle: "Découvrez nos plats italiens authentiques", ourMenu: "Notre Carte", viewMenu: "Voir notre carte complète",
    pizzas: "Pizzas", pizzasText: "Disponibles uniquement le soir",
    groupMenus: "Menus de Groupe", groupMenusText: "Parfait pour les groupes et fêtes",
    viewMenuLink: "Voir le Menu →", viewPizzas: "Voir les Pizzas →", viewGroupMenus: "Voir les Menus →",
    hoursTitle: "Horaires d'Ouverture", openingHours: "Heures d'ouverture",
    monTue: "Lun - Mar", wedFri: "Mer - Ven", sat: "Sam", sun: "Dim",
    pizzaNotice: "Pizzas", pizzaNoticeText: "Disponibles uniquement le soir",
    closedOn: "Fermé", closedDays: "Lundi midi, mardi midi et samedi midi",
    takeawayInfo: "Plats à emporter disponibles pendant les heures normales",
    contactTitle: "Contact & Localisation", contactSubtitle: "Visitez-nous à Herent ou contactez-nous",
    address: "Adresse", phone: "Téléphone", email: "Email", emailNote: "(Uniquement pour info, réservations via site web)", website: "Site Web",
    ctaTitle: "Prêt pour une expérience inoubliable?", ctaSubtitle: "Réservez votre table ou commandez à emporter",
    restaurantType: "Restaurant italien & pizzeria", allRightsReserved: "Tous droits réservés",
    webmasterText: "Vous voyez une erreur sur ce site ? Ou cherchez-vous un site web professionnel ? Contactez le webmaster via WhatsApp.",
    reservePageTitle: "Réserver Sur Place", reservePageSubtitle: "Remplissez le formulaire pour réserver une table", backToHome: "← Retour à l'Accueil",
    takeaway: "À Emporter", takeawayPageTitle: "Commander à Emporter", takeawayPageSubtitle: "Remplissez le formulaire pour commander", clickForMenu: "CLIQUEZ ICI POUR LA CARTE →",
    groupMenusPageTitle: "Menus de Groupe", groupMenusPageSubtitle: "Choix parfait pour les groupes à partir de 10 personnes",
    downloadPDF: "📄 Télécharger le PDF des Menus de Groupe", reserveForGroups: "Réserver pour Groupes", minimumPersons: "Menu disponible à partir de 10 personnes minimum",
    aperitivo: "Aperitivo (spumante)", surprise: "Dessert surprise", orChoice: "OU", wineIncluded: "½ bouteille de vin maison par personne",
  },
  en: {
    home: "Home", about: "About Us", menu: "Menu Card", gallery: "Gallery", hours: "Hours", contact: "Contact", reserve: "Reserve",
    heroTitle: "Welcome to La Bottega Italiana", heroSubtitle: "Authentic Italian cuisine in Herent",
    reserveTable: "Reserve Table", orderTakeaway: "Order Takeaway",
    closureNotice: "For the end of the year, we are closed on: 24, 25 December and 29, 30, 31 December and 1 January 2026.", letOp: "Notice:",
    aboutTitle: "Authentic Italian Experience", aboutText: "In the heart of Herent, La Bottega Italiana offers you a unique culinary experience. With our authentic Italian cuisine and warm ambiance, we create unforgettable moments.",
    feature1Title: "Italian Quality", feature1Text: "Authentic Italian ingredients",
    feature2Title: "Fresh Preparation", feature2Text: "Freshly prepared daily",
    feature3Title: "Elegant Ambiance", feature3Text: "Refined dining experience",
    restaurantAtmosphere: "Restaurant Atmosphere", ourDishes: "Our Dishes",
    galleryPageTitle: "Photo Gallery", galleryPageSubtitle: "Discover our dishes and restaurant atmosphere",
    menuTitle: "Our Menu", menuSubtitle: "Discover our authentic Italian dishes", ourMenu: "Our Menu", viewMenu: "View our complete menu",
    pizzas: "Pizzas", pizzasText: "Available only in the evenings",
    groupMenus: "Group Menus", groupMenusText: "Perfect for groups and parties",
    viewMenuLink: "View Menu →", viewPizzas: "View Pizzas →", viewGroupMenus: "View Menus →",
    hoursTitle: "Opening Hours", openingHours: "Opening hours",
    monTue: "Mon - Tue", wedFri: "Wed - Fri", sat: "Sat", sun: "Sun",
    pizzaNotice: "Pizzas", pizzaNoticeText: "Available only in the evenings",
    closedOn: "Closed", closedDays: "Monday afternoon, Tuesday afternoon and Saturday afternoon",
    takeawayInfo: "Takeaway available during normal opening hours",
    contactTitle: "Contact & Location", contactSubtitle: "Visit us in Herent or get in touch",
    address: "Address", phone: "Phone", email: "Email", emailNote: "(For info only, reservations via website)", website: "Website",
    ctaTitle: "Ready for an unforgettable experience?", ctaSubtitle: "Reserve your table or order takeaway",
    restaurantType: "Italian restaurant & pizzeria", allRightsReserved: "All rights reserved",
    webmasterText: "Do you see an error on this site? Or are you looking for a professional website? Contact the webmaster via WhatsApp.",
    reservePageTitle: "Reserve for Dining", reservePageSubtitle: "Fill in the form to reserve a table", backToHome: "← Back to Home",
    takeaway: "Takeaway", takeawayPageTitle: "Order Takeaway", takeawayPageSubtitle: "Fill in the form to order takeaway", clickForMenu: "CLICK HERE FOR THE MENU →",
    groupMenusPageTitle: "Group Menus", groupMenusPageSubtitle: "Perfect choice for groups from 10 people",
    downloadPDF: "📄 Download Group Menus PDF", reserveForGroups: "Reserve for Groups", minimumPersons: "Menu available from minimum 10 people",
    aperitivo: "Aperitivo (spumante)", surprise: "Surprise dessert", orChoice: "OR", wineIncluded: "½ bottle per person of housewine",
  },
  de: {
    home: "Startseite", about: "Über Uns", menu: "Karte", gallery: "Galerie", hours: "Öffnungszeiten", contact: "Kontakt", reserve: "Reservieren",
    heroTitle: "Willkommen bei La Bottega Italiana", heroSubtitle: "Authentische italienische Küche in Herent",
    reserveTable: "Tisch Reservieren", orderTakeaway: "Essen zum Mitnehmen",
    closureNotice: "Zum Jahresende sind wir geschlossen am: 24., 25. Dezember und 29., 30., 31. Dezember und 1. Januar 2026.", letOp: "Hinweis:",
    aboutTitle: "Authentisches Italienisches Erlebnis", aboutText: "Im Herzen von Herent bietet Ihnen La Bottega Italiana ein einzigartiges kulinarisches Erlebnis.",
    feature1Title: "Italienische Qualität", feature1Text: "Authentische italienische Zutaten",
    feature2Title: "Frische Zubereitung", feature2Text: "Täglich frisch zubereitet",
    feature3Title: "Elegantes Ambiente", feature3Text: "Raffiniertes Speiseerlebnis",
    restaurantAtmosphere: "Restaurant Atmosphäre", ourDishes: "Unsere Gerichte",
    galleryPageTitle: "Fotogalerie", galleryPageSubtitle: "Entdecken Sie unsere Gerichte und die Restaurant-Atmosphäre",
    menuTitle: "Unser Menü", menuSubtitle: "Entdecken Sie unsere authentischen italienischen Gerichte", ourMenu: "Unsere Karte", viewMenu: "Siehe unsere vollständige Speisekarte",
    pizzas: "Pizzas", pizzasText: "Nur abends verfügbar", groupMenus: "Gruppenmenüs", groupMenusText: "Perfekt für Gruppen und Feiern",
    viewMenuLink: "Menü Ansehen →", viewPizzas: "Pizzas Ansehen →", viewGroupMenus: "Menüs Ansehen →",
    hoursTitle: "Öffnungszeiten", openingHours: "Öffnungszeiten", monTue: "Mo - Di", wedFri: "Mi - Fr", sat: "Sa", sun: "So",
    pizzaNotice: "Pizzas", pizzaNoticeText: "Nur abends verfügbar", closedOn: "Geschlossen", closedDays: "Montagnachmittag, Dienstagnachmittag und Samstagnachmittag",
    takeawayInfo: "Mitnehmen während der normalen Öffnungszeiten möglich",
    contactTitle: "Kontakt & Standort", contactSubtitle: "Besuchen Sie uns in Herent oder kontaktieren Sie uns",
    address: "Adresse", phone: "Telefon", email: "E-Mail", emailNote: "(Nur für Info, Reservierungen über Website)", website: "Webseite",
    ctaTitle: "Bereit für ein unvergessliches Erlebnis?", ctaSubtitle: "Reservieren Sie Ihren Tisch oder bestellen Sie zum Mitnehmen",
    restaurantType: "Italienisches Restaurant & Pizzeria", allRightsReserved: "Alle Rechte vorbehalten",
    webmasterText: "Sehen Sie einen Fehler auf dieser Website? Oder suchen Sie eine professionelle Website? Kontaktieren Sie den Webmaster über WhatsApp.",
    reservePageTitle: "Tisch Reservieren", reservePageSubtitle: "Füllen Sie das Formular aus, um einen Tisch zu reservieren", backToHome: "← Zurück zur Startseite",
    takeaway: "Mitnehmen", takeawayPageTitle: "Essen zum Mitnehmen Bestellen", takeawayPageSubtitle: "Füllen Sie das Formular aus, um zu bestellen", clickForMenu: "HIER KLICKEN FÜR DIE KARTE →",
    groupMenusPageTitle: "Gruppenmenüs", groupMenusPageSubtitle: "Perfekte Wahl für Gruppen ab 10 Personen",
    downloadPDF: "📄 Gruppenmenüs PDF Herunterladen", reserveForGroups: "Für Gruppen Reservieren", minimumPersons: "Menü verfügbar ab mindestens 10 Personen",
    aperitivo: "Aperitivo (Spumante)", surprise: "Überraschungsdessert", orChoice: "ODER", wineIncluded: "½ Flasche Hauswein pro Person",
  },
  es: {
    home: "Inicio", about: "Sobre Nosotros", menu: "Carta", gallery: "Galería", hours: "Horario", contact: "Contacto", reserve: "Reservar",
    heroTitle: "Bienvenido a La Bottega Italiana", heroSubtitle: "Cocina italiana auténtica en Herent",
    reserveTable: "Reservar Mesa", orderTakeaway: "Pedir para Llevar",
    closureNotice: "Para fin de año, estamos cerrados: 24, 25 de diciembre y 29, 30, 31 de diciembre y 1 de enero de 2026.", letOp: "Aviso:",
    aboutTitle: "Experiencia Italiana Auténtica", aboutText: "En el corazón de Herent, La Bottega Italiana le ofrece una experiencia culinaria única.",
    feature1Title: "Calidad Italiana", feature1Text: "Ingredientes italianos auténticos",
    feature2Title: "Preparación Fresca", feature2Text: "Preparado fresco diariamente",
    feature3Title: "Ambiente Elegante", feature3Text: "Experiencia gastronómica refinada",
    restaurantAtmosphere: "Ambiente del Restaurante", ourDishes: "Nuestros Platos",
    galleryPageTitle: "Galería de Fotos", galleryPageSubtitle: "Descubra nuestros platos y el ambiente del restaurante",
    menuTitle: "Nuestro Menú", menuSubtitle: "Descubra nuestros platos italianos auténticos", ourMenu: "Nuestra Carta", viewMenu: "Ver nuestra carta completa",
    pizzas: "Pizzas", pizzasText: "Disponible solo por la noche", groupMenus: "Menús de Grupo", groupMenusText: "Perfecto para grupos y fiestas",
    viewMenuLink: "Ver Menú →", viewPizzas: "Ver Pizzas →", viewGroupMenus: "Ver Menús →",
    hoursTitle: "Horario de Apertura", openingHours: "Horario", monTue: "Lun - Mar", wedFri: "Mié - Vie", sat: "Sáb", sun: "Dom",
    pizzaNotice: "Pizzas", pizzaNoticeText: "Disponible solo por la noche", closedOn: "Cerrado", closedDays: "Lunes por la tarde, martes por la tarde y sábado por la tarde",
    takeawayInfo: "Para llevar disponible durante el horario normal",
    contactTitle: "Contacto & Ubicación", contactSubtitle: "Visítenos en Herent o póngase en contacto",
    address: "Dirección", phone: "Teléfono", email: "Email", emailNote: "(Solo para info, reservas via sitio web)", website: "Sitio Web",
    ctaTitle: "¿Listo para una experiencia inolvidable?", ctaSubtitle: "Reserve su mesa o pida para llevar",
    restaurantType: "Restaurante italiano & pizzería", allRightsReserved: "Todos los derechos reservados",
    webmasterText: "¿Ve un error en este sitio? ¿O busca un sitio web profesional? Contacte al webmaster vía WhatsApp.",
    reservePageTitle: "Reservar para Comer", reservePageSubtitle: "Complete el formulario para reservar una mesa", backToHome: "← Volver al Inicio",
    takeaway: "Para Llevar", takeawayPageTitle: "Pedir para Llevar", takeawayPageSubtitle: "Complete el formulario para pedir", clickForMenu: "HAGA CLIC AQUÍ PARA LA CARTA →",
    groupMenusPageTitle: "Menús de Grupo", groupMenusPageSubtitle: "Elección perfecta para grupos desde 10 personas",
    downloadPDF: "📄 Descargar PDF de Menús de Grupo", reserveForGroups: "Reservar para Grupos", minimumPersons: "Menú disponible desde mínimo 10 personas",
    aperitivo: "Aperitivo (spumante)", surprise: "Postre sorpresa", orChoice: "O", wineIncluded: "½ botella de vino de la casa por persona",
  },
  it: {
    home: "Home", about: "Chi Siamo", menu: "Carta", gallery: "Galleria", hours: "Orari", contact: "Contatto", reserve: "Prenota",
    heroTitle: "Benvenuti a La Bottega Italiana", heroSubtitle: "Cucina italiana autentica a Herent",
    reserveTable: "Prenota Tavolo", orderTakeaway: "Ordina d'Asporto",
    closureNotice: "Per la fine dell'anno, siamo chiusi: 24, 25 dicembre e 29, 30, 31 dicembre e 1 gennaio 2026.", letOp: "Avviso:",
    aboutTitle: "Esperienza Italiana Autentica", aboutText: "Nel cuore di Herent, La Bottega Italiana vi offre un'esperienza culinaria unica.",
    feature1Title: "Qualità Italiana", feature1Text: "Ingredienti italiani autentici",
    feature2Title: "Preparazione Fresca", feature2Text: "Preparato fresco ogni giorno",
    feature3Title: "Atmosfera Elegante", feature3Text: "Esperienza gastronomica raffinata",
    restaurantAtmosphere: "Atmosfera del Ristorante", ourDishes: "I Nostri Piatti",
    galleryPageTitle: "Galleria Fotografica", galleryPageSubtitle: "Scopri i nostri piatti e l'atmosfera del ristorante",
    menuTitle: "Il Nostro Menu", menuSubtitle: "Scopri i nostri piatti italiani autentici", ourMenu: "La Nostra Carta", viewMenu: "Vedi il nostro menu completo",
    pizzas: "Pizze", pizzasText: "Disponibili solo la sera", groupMenus: "Menu di Gruppo", groupMenusText: "Perfetto per gruppi e feste",
    viewMenuLink: "Vedi Menu →", viewPizzas: "Vedi Pizze →", viewGroupMenus: "Vedi Menu →",
    hoursTitle: "Orari di Apertura", openingHours: "Orari", monTue: "Lun - Mar", wedFri: "Mer - Ven", sat: "Sab", sun: "Dom",
    pizzaNotice: "Pizze", pizzaNoticeText: "Disponibili solo la sera", closedOn: "Chiuso", closedDays: "Lunedì pomeriggio, martedì pomeriggio e sabato pomeriggio",
    takeawayInfo: "D'asporto disponibile durante gli orari normali",
    contactTitle: "Contatto & Posizione", contactSubtitle: "Visitaci a Herent o contattaci",
    address: "Indirizzo", phone: "Telefono", email: "Email", emailNote: "(Solo per info, prenotazioni via sito web)", website: "Sito Web",
    ctaTitle: "Pronto per un'esperienza indimenticabile?", ctaSubtitle: "Prenota il tuo tavolo o ordina d'asporto",
    restaurantType: "Ristorante italiano & pizzeria", allRightsReserved: "Tutti i diritti riservati",
    webmasterText: "Vedi un errore su questo sito? O stai cercando un sito web professionale? Contatta il webmaster tramite WhatsApp.",
    reservePageTitle: "Prenota per Cenare", reservePageSubtitle: "Compila il modulo per prenotare un tavolo", backToHome: "← Torna alla Home",
    takeaway: "D'Asporto", takeawayPageTitle: "Ordina d'Asporto", takeawayPageSubtitle: "Compila il modulo per ordinare", clickForMenu: "CLICCA QUI PER LA CARTA →",
    groupMenusPageTitle: "Menu di Gruppo", groupMenusPageSubtitle: "Scelta perfetta per gruppi da 10 persone",
    downloadPDF: "📄 Scarica PDF Menu di Gruppo", reserveForGroups: "Prenota per Gruppi", minimumPersons: "Menu disponibile da minimo 10 persone",
    aperitivo: "Aperitivo (spumante)", surprise: "Dessert a sorpresa", orChoice: "O", wineIncluded: "½ bottiglia di vino della casa a persona",
  },
};

const languageNames = { nl: "Nederlands", fr: "Français", en: "English", de: "Deutsch", es: "Español", it: "Italiano" };

// ===========================================
// LANGUAGE CONTEXT
// ===========================================
const LanguageContext = createContext();

const LanguageProvider = ({ children }) => {
  const [language, setLanguage] = useState('nl');
  const t = (key) => translations[language]?.[key] || translations['nl'][key] || key;
  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) throw new Error('useLanguage must be used within a LanguageProvider');
  return context;
};

// ===========================================
// LANGUAGE SWITCHER
// ===========================================
const LanguageSwitcher = () => {
  const { language, setLanguage } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const languages = ['nl', 'fr', 'en', 'de', 'es', 'it'];

  return (
    <div className="relative">
      <button onClick={() => setIsOpen(!isOpen)} className="flex items-center space-x-2 px-3 py-2 rounded-lg hover:bg-gray-100 transition-colors">
        <Globe className="w-5 h-5 text-[#7D3C32]" />
        <span className="text-sm font-medium text-gray-700 uppercase">{language}</span>
      </button>
      {isOpen && (
        <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-xl border border-gray-200 z-50">
          {languages.map((lang) => (
            <button key={lang} onClick={() => { setLanguage(lang); setIsOpen(false); }}
              className={`w-full text-left px-4 py-2 hover:bg-gray-50 transition-colors first:rounded-t-lg last:rounded-b-lg ${language === lang ? 'bg-[#7D3C32] text-white hover:bg-[#6A3229]' : 'text-gray-700'}`}>
              {languageNames[lang]}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

// ===========================================
// SCROLL TO TOP
// ===========================================
function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => { window.scrollTo(0, 0); }, [pathname]);
  return null;
}

// ===========================================
// FOOTER
// ===========================================
function Footer() {
  const { t } = useLanguage();
  return (
    <footer className="bg-gray-900 text-white py-12 px-4">
      <div className="max-w-7xl mx-auto text-center">
        <div className="mb-6">
          <h3 className="text-2xl font-bold mb-2">La Bottega Italiana</h3>
          <p className="text-gray-400">{t('restaurantType')}</p>
        </div>
        <div className="flex flex-col md:flex-row justify-center items-center space-y-2 md:space-y-0 md:space-x-8 mb-6 text-sm text-gray-400">
          <span>Wilselsesteenweg 93, 3020 Herent</span>
          <span className="hidden md:inline">•</span>
          <a href="tel:+3216600421" className="hover:text-white transition-colors">+32 16 60 04 21</a>
          <span className="hidden md:inline">•</span>
          <a href="mailto:bottega@mail.be" className="hover:text-white transition-colors">bottega@mail.be</a>
        </div>
        <div className="mb-4">
          <a href="https://www.labottegaherent.com" className="text-gray-400 hover:text-white transition-colors">www.labottegaherent.com</a>
        </div>
        <div className="border-t border-gray-800 pt-6 pb-4 text-sm text-gray-400">
          <p>&copy; {new Date().getFullYear()} La Bottega Italiana. {t('allRightsReserved')}.</p>
        </div>

        {/* Webmaster Section */}
        <div className="border-t border-gray-800 pt-4">
          <div className="text-center text-sm text-gray-400 mb-3">
            <p>{t('webmasterText')}</p>
          </div>
          <div className="flex items-center justify-center gap-2 text-xs text-gray-500">
            <img src={IMAGES.fworksLogo} alt="f.works" className="h-5" />
            <span>Webmaster: fworksbuilders bv. </span>
            <a href="https://wa.me/32494516064" target="_blank" rel="noopener noreferrer" className="hover:text-gray-400 transition-colors">
              +32 494 51 60 64 (WhatsApp)
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

// ===========================================
// NAVIGATION
// ===========================================
function Navigation() {
  const { t } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  
  return (
    <nav className="fixed w-full bg-white/95 backdrop-blur-sm shadow-md z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          <Link to={BASE_PATH} className="flex items-center space-x-2">
            <img src={IMAGES.logo} alt="La Bottega Italiana" className="h-10 w-auto" />
            <div className="hidden sm:block">
              <h1 className="text-lg font-bold text-gray-900">La Bottega Italiana</h1>
              <p className="text-xs text-gray-600">Herent</p>
            </div>
          </Link>
          
          {/* Desktop Menu - exact like original */}
          <div className="hidden lg:flex items-center space-x-6">
            <Link to={BASE_PATH} className="text-sm font-medium text-gray-700 hover:text-[#7D3C32] transition-colors">{t('home')}</Link>
            <a href="#about" className="text-sm font-medium text-gray-700 hover:text-[#7D3C32] transition-colors">{t('about')}</a>
            <Link to={`${BASE_PATH}/kaart`} className="text-sm font-medium text-gray-700 hover:text-[#7D3C32] transition-colors">{t('menu')}</Link>
            <Link to={`${BASE_PATH}/galerie`} className="text-sm font-medium text-gray-700 hover:text-[#7D3C32] transition-colors">{t('gallery')}</Link>
            <Link to={`${BASE_PATH}/groepmenus`} className="text-sm font-medium text-gray-700 hover:text-[#7D3C32] transition-colors">{t('groupMenus')}</Link>
            <a href="#hours" className="text-sm font-medium text-gray-700 hover:text-[#7D3C32] transition-colors">{t('hours')}</a>
            <a href="#contact" className="text-sm font-medium text-gray-700 hover:text-[#7D3C32] transition-colors">{t('contact')}</a>
            <LanguageSwitcher />
          </div>

          {/* Desktop Buttons */}
          <div className="hidden lg:flex items-center space-x-3">
            <Link to={`${BASE_PATH}/reserveren`} className="bg-[#7D3C32] text-white px-6 py-2.5 rounded-lg font-medium hover:bg-[#6A3229] transition-colors shadow-lg hover:shadow-xl">
              {t('reserve')}
            </Link>
            <Link to={`${BASE_PATH}/afhalen`} className="bg-white text-[#7D3C32] border-2 border-[#7D3C32] px-5 py-2.5 rounded-lg font-medium hover:bg-[#7D3C32] hover:text-white transition-colors shadow-lg hover:shadow-xl">
              {t('takeaway')}
            </Link>
          </div>

          {/* Mobile: Language Switcher + Hamburger */}
          <div className="lg:hidden flex items-center space-x-3">
            <LanguageSwitcher />
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 rounded-md text-gray-700 hover:text-[#7D3C32] hover:bg-gray-100 transition-colors"
            >
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                {isOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="lg:hidden pb-4">
            <div className="flex flex-col space-y-3">
              <Link to={BASE_PATH} onClick={() => setIsOpen(false)} className="py-2 text-sm font-medium text-gray-700 hover:text-[#7D3C32] transition-colors">{t('home')}</Link>
              <a href="#about" onClick={() => setIsOpen(false)} className="py-2 text-sm font-medium text-gray-700 hover:text-[#7D3C32] transition-colors">{t('about')}</a>
              <Link to={`${BASE_PATH}/kaart`} onClick={() => setIsOpen(false)} className="py-2 text-sm font-medium text-gray-700 hover:text-[#7D3C32] transition-colors">{t('menu')}</Link>
              <Link to={`${BASE_PATH}/galerie`} onClick={() => setIsOpen(false)} className="py-2 text-sm font-medium text-gray-700 hover:text-[#7D3C32] transition-colors">{t('gallery')}</Link>
              <Link to={`${BASE_PATH}/groepmenus`} onClick={() => setIsOpen(false)} className="py-2 text-sm font-medium text-gray-700 hover:text-[#7D3C32] transition-colors">{t('groupMenus')}</Link>
              <a href="#hours" onClick={() => setIsOpen(false)} className="py-2 text-sm font-medium text-gray-700 hover:text-[#7D3C32] transition-colors">{t('hours')}</a>
              <a href="#contact" onClick={() => setIsOpen(false)} className="py-2 text-sm font-medium text-gray-700 hover:text-[#7D3C32] transition-colors">{t('contact')}</a>
              <div className="flex flex-col space-y-3 pt-4 border-t border-gray-200">
                <Link to={`${BASE_PATH}/reserveren`} onClick={() => setIsOpen(false)} className="bg-[#7D3C32] text-white px-6 py-3 rounded-lg font-medium hover:bg-[#6A3229] transition-colors text-center">
                  {t('reserve')}
                </Link>
                <Link to={`${BASE_PATH}/afhalen`} onClick={() => setIsOpen(false)} className="bg-white text-[#7D3C32] border-2 border-[#7D3C32] px-5 py-3 rounded-lg font-medium hover:bg-[#7D3C32] hover:text-white transition-colors text-center">
                  {t('takeaway')}
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}

// ===========================================
// HOME PAGE
// ===========================================
function HomePage() {
  const { t } = useLanguage();
  const navigate = useNavigate();

  return (
    <div className="min-h-screen">
      <Navigation />
      
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center">
        <div className="absolute inset-0">
          <img src={IMAGES.hero} alt="La Bottega Italiana" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-black/50"></div>
        </div>
        <div className="relative z-10 text-center text-white px-4">
          <h1 className="text-5xl md:text-7xl font-bold mb-6" data-testid="hero-title">{t('heroTitle')}</h1>
          <p className="text-xl md:text-2xl mb-8 font-light">{t('heroSubtitle')}</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button onClick={() => navigate(`${BASE_PATH}/reserveren`)} className="bg-[#7D3C32] hover:bg-[#6A3229] text-white px-8 py-4 rounded-lg text-lg font-semibold transition-all shadow-lg hover:shadow-2xl transform hover:scale-105" data-testid="reserve-table-btn">
              {t('reserveTable')}
            </button>
            <button onClick={() => navigate(`${BASE_PATH}/afhalen`)} className="bg-white text-gray-900 hover:bg-gray-100 px-8 py-4 rounded-lg text-lg font-semibold transition-all shadow-lg hover:shadow-2xl transform hover:scale-105" data-testid="takeaway-btn">
              {t('orderTakeaway')}
            </button>
          </div>
        </div>
        
        {/* Holiday Notice */}
        <div className="absolute bottom-0 left-0 right-0 bg-[#FFF4E6] border-l-4 border-[#7D3C32] py-6 px-4">
          <div className="max-w-7xl mx-auto text-center">
            <p className="text-[#7D3C32] font-medium" data-testid="closure-notice">
              <span className="font-bold">{t('letOp')}</span> {t('closureNotice')}
            </p>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">{t('aboutTitle')}</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">{t('aboutText')}</p>
          </div>

          {/* Features Grid */}
          <div className="grid md:grid-cols-3 gap-8 mb-16">
            <div className="bg-white rounded-lg shadow-lg overflow-hidden transform hover:scale-105 transition-all">
              <img src={IMAGES.features.quality} alt="Italiaanse Kwaliteit" className="w-full h-64 object-cover" />
              <div className="p-6 text-center">
                <div className="flex justify-center mb-4">
                  <ChefHat className="w-12 h-12 text-[#7D3C32]" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">{t('feature1Title')}</h3>
                <p className="text-gray-600">{t('feature1Text')}</p>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-lg overflow-hidden transform hover:scale-105 transition-all">
              <img src={IMAGES.features.fresh} alt="Verse Bereiding" className="w-full h-64 object-cover" />
              <div className="p-6 text-center">
                <div className="flex justify-center mb-4">
                  <Utensils className="w-12 h-12 text-[#7D3C32]" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">{t('feature2Title')}</h3>
                <p className="text-gray-600">{t('feature2Text')}</p>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-lg overflow-hidden transform hover:scale-105 transition-all">
              <img src={IMAGES.features.ambiance} alt="Elegante Ambiance" className="w-full h-64 object-cover" />
              <div className="p-6 text-center">
                <div className="flex justify-center mb-4">
                  <Wine className="w-12 h-12 text-[#7D3C32]" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">{t('feature3Title')}</h3>
                <p className="text-gray-600">{t('feature3Text')}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Menu Section */}
      <section className="py-20 px-4 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">{t('menuTitle')}</h2>
            <p className="text-lg text-gray-600">{t('menuSubtitle')}</p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <Link to={`${BASE_PATH}/kaart`} className="bg-white rounded-lg p-8 text-center hover:shadow-xl transition-all transform hover:scale-105" data-testid="menu-card-link">
              <div className="flex justify-center mb-4">
                <Utensils className="w-16 h-16 text-[#7D3C32]" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">{t('ourMenu')}</h3>
              <p className="text-gray-600 mb-4">{t('viewMenu')}</p>
              <span className="text-[#7D3C32] font-semibold">{t('viewMenuLink')}</span>
            </Link>

            <Link to={`${BASE_PATH}/groepmenus`} className="bg-white rounded-lg p-8 text-center hover:shadow-xl transition-all transform hover:scale-105" data-testid="group-menu-link">
              <div className="flex justify-center mb-4">
                <Wine className="w-16 h-16 text-[#7D3C32]" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">{t('groupMenus')}</h3>
              <p className="text-gray-600 mb-4">{t('groupMenusText')}</p>
              <span className="text-[#7D3C32] font-semibold">{t('viewGroupMenus')}</span>
            </Link>
          </div>
        </div>
      </section>

      {/* Opening Hours */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">{t('hoursTitle')}</h2>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Left Column - Opening Hours */}
            <div className="bg-white rounded-lg shadow-lg p-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">{t('openingHours')}</h3>
              <div className="space-y-3" data-testid="opening-hours">
                <div className="flex justify-between items-center">
                  <span className="text-gray-700 font-medium">{t('monTue')}</span>
                  <span className="text-gray-600">18:00 - 22:00</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-700 font-medium">{t('wedFri')}</span>
                  <span className="text-gray-600">12:00 - 14:00, 18:00 - 22:00</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-700 font-medium">{t('sat')}</span>
                  <span className="text-gray-600">18:00 - 22:00</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-700 font-medium">{t('sun')}</span>
                  <span className="text-gray-600">12:00 - 14:00, 18:00 - 22:00</span>
                </div>
              </div>
              <div className="mt-6 pt-6 border-t border-gray-200">
                <p className="text-sm text-gray-600">{t('takeawayInfo')}</p>
              </div>
            </div>

            {/* Right Column - Important Info */}
            <div className="space-y-6">
              <div className="bg-[#7D3C32] text-white rounded-lg shadow-lg p-8">
                <div className="flex items-start space-x-4">
                  <Clock className="w-8 h-8 flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="text-xl font-bold mb-2">{t('pizzas')}</h3>
                    <p className="text-white/90">{t('pizzasText')}</p>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-lg shadow-lg p-8">
                <div className="flex items-start space-x-4">
                  <MapPin className="w-8 h-8 text-[#7D3C32] flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">{t('closedOn')}</h3>
                    <p className="text-gray-600">{t('closedDays')}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-20 px-4 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">{t('contactTitle')}</h2>
            <p className="text-lg text-gray-600">{t('contactSubtitle')}</p>
          </div>

          <div className="grid md:grid-cols-2 gap-12">
            <div className="space-y-6" data-testid="contact-info">
              <div className="flex items-start space-x-4">
                <MapPin className="w-6 h-6 text-[#7D3C32] flex-shrink-0 mt-1" />
                <div>
                  <h3 className="font-bold text-gray-900 mb-1">{t('address')}</h3>
                  <p className="text-gray-600">Wilselsesteenweg 93</p>
                  <p className="text-gray-600">3020 Herent (Leuven)</p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <Phone className="w-6 h-6 text-[#7D3C32] flex-shrink-0 mt-1" />
                <div>
                  <h3 className="font-bold text-gray-900 mb-1">{t('phone')}</h3>
                  <a href="tel:+3216600421" className="text-gray-600 hover:text-[#7D3C32] transition-colors">
                    +32 16 60 04 21
                  </a>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <Mail className="w-6 h-6 text-[#7D3C32] flex-shrink-0 mt-1" />
                <div>
                  <h3 className="font-bold text-gray-900 mb-1">{t('email')}</h3>
                  <a href="mailto:bottega@mail.be" className="text-gray-600 hover:text-[#7D3C32] transition-colors">
                    bottega@mail.be
                  </a>
                  <p className="text-sm text-gray-500 mt-1">{t('emailNote')}</p>
                </div>
              </div>

              <div className="pt-6 border-t border-gray-200">
                <p className="text-sm text-gray-500">BTW nummer: BE682764984</p>
              </div>
            </div>

            <div className="bg-gray-100 rounded-lg overflow-hidden shadow-lg h-96">
              <iframe
                title="Google Maps Location"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2517.8!2d4.6709!3d50.9247!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47c161f0e0e0e0e0%3A0x0!2sWilselsesteenweg%2093%2C%203020%20Herent!5e0!3m2!1snl!2sbe!4v1234567890"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
              ></iframe>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 bg-[#7D3C32] text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">{t('ctaTitle')}</h2>
          <p className="text-xl mb-8">{t('ctaSubtitle')}</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button onClick={() => navigate(`${BASE_PATH}/reserveren`)} className="bg-white text-[#7D3C32] px-8 py-4 rounded-lg font-semibold hover:bg-gray-100 transition-all shadow-lg hover:shadow-2xl transform hover:scale-105" data-testid="cta-reserve-btn">
              {t('reserveTable')}
            </button>
            <button onClick={() => navigate(`${BASE_PATH}/afhalen`)} className="bg-transparent border-2 border-white text-white px-8 py-4 rounded-lg font-semibold hover:bg-white hover:text-[#7D3C32] transition-all shadow-lg hover:shadow-2xl transform hover:scale-105" data-testid="cta-takeaway-btn">
              {t('orderTakeaway')}
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <div className="mb-6">
            <h3 className="text-2xl font-bold mb-2">La Bottega Italiana</h3>
            <p className="text-gray-400">{t('restaurantType')}</p>
          </div>
          <div className="flex flex-col md:flex-row justify-center items-center space-y-2 md:space-y-0 md:space-x-8 mb-6 text-sm text-gray-400">
            <span>Wilselsesteenweg 93, 3020 Herent</span>
            <span className="hidden md:inline">•</span>
            <a href="tel:+3216600421" className="hover:text-white transition-colors">+32 16 60 04 21</a>
            <span className="hidden md:inline">•</span>
            <a href="mailto:bottega@mail.be" className="hover:text-white transition-colors">bottega@mail.be</a>
          </div>
          <div className="mb-4">
            <a href="https://www.labottegaherent.com" className="text-gray-400 hover:text-white transition-colors">www.labottegaherent.com</a>
          </div>
          <div className="border-t border-gray-800 pt-6 pb-4 text-sm text-gray-400">
            <p>&copy; {new Date().getFullYear()} La Bottega Italiana. {t('allRightsReserved')}.</p>
          </div>

          {/* Webmaster Section */}
          <div className="border-t border-gray-800 pt-4">
            <div className="text-center text-sm text-gray-400 mb-3">
              <p>{t('webmasterText')}</p>
            </div>
            <div className="flex items-center justify-center gap-2 text-xs text-gray-500">
              <img src={IMAGES.fworksLogo} alt="f.works" className="h-5" />
              <span>Webmaster: fworksbuilders bv. </span>
              <a href="https://wa.me/32494516064" target="_blank" rel="noopener noreferrer" className="hover:text-gray-400 transition-colors">
                +32 494 51 60 64 (WhatsApp)
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

// ===========================================
// KAART PAGE
// ===========================================
function KaartPage() {
  const { t } = useLanguage();

  return (
    <div className="min-h-screen">
      <Navigation />
      <div className="pt-20">
        <div className="max-w-7xl mx-auto px-4 py-12">
          <div className="text-center mb-8">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">{t('ourMenu')}</h1>
            <p className="text-lg text-gray-600 mb-8">Onze kaart (ter plaatse en ook afhalen) / Notre carte (sur place et aussi pour emporter)</p>

            {/* Download Button */}
            <div className="flex justify-center mb-8">
              <a
                href="https://labottegaherent.weebly.com/onze-kaart1.html"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center bg-[#7D3C32] text-white px-8 py-4 rounded-lg font-semibold hover:bg-[#6A3229] transition-all shadow-lg hover:shadow-xl"
              >
                📄 Bekijk Kaart Online
              </a>
            </div>
          </div>

          {/* PDF Viewer using Google Docs */}
          <div className="bg-white rounded-lg shadow-xl overflow-hidden mb-6">
            <iframe
              src="https://labottegaherent.weebly.com/onze-kaart1.html"
              className="w-full"
              style={{ height: '1200px', border: 'none' }}
              title="La Bottega Kaart"
            >
              <p className="p-8 text-center text-gray-600">
                De kaart kan niet worden weergegeven.
                <a href="https://labottegaherent.weebly.com/onze-kaart1.html" target="_blank" rel="noopener noreferrer" className="text-[#7D3C32] underline ml-2">
                  Klik hier om de kaart te bekijken
                </a>
              </p>
            </iframe>
          </div>

          <div className="mt-8 text-center">
            <Link to={BASE_PATH} className="text-[#7D3C32] hover:underline font-medium text-lg">
              {t('backToHome')}
            </Link>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

// ===========================================
// GALERIE PAGE
// ===========================================
function GaleriePage() {
  const { t } = useLanguage();
  const [selectedImage, setSelectedImage] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  const openLightbox = (index) => {
    setSelectedImage(IMAGES.gallery[index]);
    setCurrentIndex(index);
  };

  const closeLightbox = () => setSelectedImage(null);

  const nextImage = () => {
    const newIndex = (currentIndex + 1) % IMAGES.gallery.length;
    setSelectedImage(IMAGES.gallery[newIndex]);
    setCurrentIndex(newIndex);
  };

  const prevImage = () => {
    const newIndex = (currentIndex - 1 + IMAGES.gallery.length) % IMAGES.gallery.length;
    setSelectedImage(IMAGES.gallery[newIndex]);
    setCurrentIndex(newIndex);
  };

  return (
    <div className="min-h-screen">
      <Navigation />
      <div className="pt-20">
        <div className="max-w-7xl mx-auto px-4 py-12">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">{t('galleryPageTitle')}</h1>
            <p className="text-lg text-gray-600">{t('galleryPageSubtitle')}</p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {IMAGES.gallery.map((image, index) => (
              <img
                key={index}
                src={image}
                alt={`Photo ${index + 1}`}
                className="w-full h-64 object-cover rounded-lg shadow-md hover:shadow-xl transition-all hover:scale-105 cursor-pointer"
                onClick={() => openLightbox(index)}
              />
            ))}
          </div>

          {/* Lightbox Modal */}
          {selectedImage && (
            <div className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4" onClick={closeLightbox}>
              <button onClick={closeLightbox} className="absolute top-4 right-4 text-white text-4xl hover:text-gray-300 z-60">×</button>
              <button onClick={(e) => { e.stopPropagation(); prevImage(); }} className="absolute left-4 text-white text-5xl hover:text-gray-300 z-60">‹</button>
              <img src={selectedImage} alt="Enlarged" className="max-w-full max-h-full object-contain" onClick={(e) => e.stopPropagation()} />
              <button onClick={(e) => { e.stopPropagation(); nextImage(); }} className="absolute right-4 text-white text-5xl hover:text-gray-300 z-60">›</button>
              <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 text-white text-sm">{currentIndex + 1} / {IMAGES.gallery.length}</div>
            </div>
          )}

          <div className="mt-12 text-center">
            <Link to={BASE_PATH} className="text-[#7D3C32] hover:underline font-medium text-lg">{t('backToHome')}</Link>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

// ===========================================
// GROEPMENUS PAGE - Exact replica of original
// ===========================================
function GroepmenusPage() {
  const { t } = useLanguage();

  const menus = [
    {
      id: 1,
      price: "€45,-",
      items: [
        "Rundercarpaccio met raketsalade en parmezaanse kaas / Carpaccio de boeuf, roquette et parmesan / Beefcarpaccio with arugula salad and parmesan cheese",
        "Gemarineerde zalm / Saumon mariné / Marinated salmon",
        "Parmigiana: Gegratineerde aubergines met gerookte mozzarella",
        "Antipasto 'della Bottega': Italiaanse charcuterie, kaas",
      ],
      main: [
        "Ravioli al Tartufo: Ravioli met truffel",
        "Gebraden zalm met grof zout, purée van spinazie, spumante saus",
        "Involtino di vitello: Kalfsrollade gevuld met hesp en kaas, portsaus, rozijnen, pijnboompitten en pasta",
      ],
      wine: false,
    },
    {
      id: 2,
      price: "€55,-",
      items: [
        "Triologie van zeecarpaccio: zwaardvis, tonijn, zalm",
        "Parmaham met burratina",
        "Sapori 'La Bottega': Rundercarpaccio, vitello tonnato, Parmaham",
        "Scampi met truffel en groene asperges",
      ],
      main: [
        "Tagliata: Runderlapje op een bedje van rucola en parmezaanse kaas",
        "Millefeuille van kabeljauw met gerookte zalm, groene kool en purée met kreeftensaus",
        "Trio van verse pasta 'Bottega': ravioli met truffel, tortelloni met ricotta, tagliatelle met paddenstoelen en parmaham",
      ],
      wine: true,
    },
    {
      id: 3,
      price: "€65,-",
      items: [
        "Vitello Tonnato: Kalfslapje, crème van tonijn, ansjovis, mayonnaise en kappertjes",
        "Gerookte zalm / Saumon fumé / Smoked salmon",
        "Ravioli met kreeft / Ravioli de homard / Lobster ravioli",
        "Salade van ganzenlever, sperziebonen, venkel en zoet-zure vinaigrette",
      ],
      main: [
        "Runderfilet Rossini: Ganzenlever met rodewijnsaus, aardappelen en seizoensgroenten",
        "Ravioli met ganzenlever, porto saus, kalfszwezerik",
        "Gegrilde vissoorten met salade",
      ],
      wine: true,
    },
  ];

  return (
    <div className="min-h-screen bg-gray-900">
      <Navigation />
      <div className="pt-20">
        <div className="max-w-7xl mx-auto px-4 py-12">
          {/* Header - exact like original */}
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-[#7D3C32] mb-4">{t('groupMenusPageTitle')}</h1>
            <p className="text-lg text-gray-300 mb-2">{t('groupMenusPageSubtitle')}</p>
            <div className="w-20 h-1 bg-[#7D3C32] mx-auto my-6"></div>
            
            {/* Buttons - exact like original */}
            <div className="flex flex-col items-center gap-4 mt-8">
              <a
                href="https://www.labottegaherent.com/groepmenus-bottega.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center bg-white text-gray-800 border border-gray-300 px-6 py-3 rounded-lg font-medium hover:bg-gray-100 transition-all shadow-lg hover:shadow-xl"
              >
                📄 Download Groepmenus PDF
              </a>
              <Link
                to={`${BASE_PATH}/reserveren`}
                className="inline-flex items-center justify-center bg-[#7D3C32] text-white px-6 py-3 rounded-lg font-semibold hover:bg-[#6A3229] transition-all shadow-lg hover:shadow-xl"
              >
                Reserveer voor groepen
              </Link>
            </div>
          </div>

          {/* Menus - Three cards side by side with dark styling like original */}
          <div className="grid md:grid-cols-3 gap-6 mb-12">
            {menus.map((menu) => (
              <div key={menu.id} className="bg-gradient-to-br from-stone-800 to-stone-700 rounded-lg shadow-2xl overflow-hidden border-2 border-stone-600 text-white">
                {/* Menu Header */}
                <div className="p-6 border-b border-white/20 text-center">
                  <h2 className="text-2xl font-bold text-stone-200 mb-2">Menu {menu.id}</h2>
                  <div className="text-4xl font-bold">{menu.price}</div>
                </div>

                {/* Menu Content */}
                <div className="p-6">
                  {/* Aperitivo */}
                  <div className="mb-6">
                    <h3 className="text-lg font-semibold text-stone-200 mb-4 text-center">Aperitivo (spumante)</h3>
                    <div className="space-y-2">
                      {menu.items.map((item, idx) => (
                        <div key={idx}>
                          <p className="text-sm leading-relaxed text-center text-white/90">{item}</p>
                          {idx < menu.items.length - 1 && (
                            <div className="text-center my-2 text-xs text-white/70">OF / OU / OR</div>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Divider */}
                  <div className="text-center my-6 text-white/40 font-bold text-lg">--O--</div>

                  {/* Main Course */}
                  <div className="mb-6">
                    <div className="space-y-2">
                      {menu.main.map((item, idx) => (
                        <div key={idx}>
                          <p className="text-sm leading-relaxed text-center text-white/90">{item}</p>
                          {idx < menu.main.length - 1 && (
                            <div className="text-center my-2 text-xs text-white/70">OF / OU / OR</div>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Divider */}
                  <div className="text-center my-6 text-white/40 font-bold text-lg">--O--</div>

                  {/* Dessert */}
                  <div className="mb-6">
                    <p className="text-sm text-center text-white/90">Verrassingsdessert</p>
                  </div>

                  {/* Wine Inclusion */}
                  {menu.wine && (
                    <div className="bg-white/10 p-4 rounded-lg text-center mt-6 border border-white/20">
                      <p className="text-stone-200 font-bold text-sm">½ fles huiswijn per persoon</p>
                      <p className="text-white/70 text-xs mt-1">½ bouteille de vin par personne • ½ bottle per person of housewine</p>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Minimum Persons Note */}
          <div className="text-center p-6">
            <p className="font-bold text-lg text-gray-300">{t('minimumPersons')}</p>
          </div>

          {/* Back to Home */}
          <div className="mt-8 text-center">
            <Link to={BASE_PATH} className="text-[#7D3C32] hover:underline font-medium text-lg">
              ← {t('backToHome')}
            </Link>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

// ===========================================
// RESERVEREN PAGE
// ===========================================
function ReserverenPage() {
  const { t } = useLanguage();
  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      <div className="pt-24 pb-16 px-4">
        <div className="max-w-4xl mx-auto">
          <Link to={BASE_PATH} className="text-[#7D3C32] hover:underline mb-6 inline-block">{t('backToHome')}</Link>
          <h1 className="text-4xl font-serif text-[#7D3C32] mb-4 text-center">{t('reservePageTitle')}</h1>
          <p className="text-gray-600 mb-8 text-center">{t('reservePageSubtitle')}</p>

          <div className="bg-[#FFF4E6] border-l-4 border-[#7D3C32] p-6 mb-8 rounded">
            <p className="text-[#7D3C32] font-medium">
              <span className="font-bold">{t('letOp')}</span> {t('closureNotice')}
            </p>
          </div>
          
          <div className="bg-white rounded-xl shadow-lg overflow-hidden">
            <iframe 
              src="https://form.jotform.com/222292165889366"
              style={{ width: '100%', minHeight: '800px', border: 'none' }}
              title="Reservation Form"
              scrolling="yes"
            />
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

// ===========================================
// AFHALEN PAGE
// ===========================================
function AfhalenPage() {
  const { t } = useLanguage();
  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      <div className="pt-24 pb-16 px-4">
        <div className="max-w-4xl mx-auto">
          <Link to={BASE_PATH} className="text-[#7D3C32] hover:underline mb-6 inline-block">{t('backToHome')}</Link>
          <h1 className="text-4xl font-serif text-[#7D3C32] mb-4 text-center">{t('takeawayPageTitle')}</h1>
          <p className="text-gray-600 mb-4 text-center">{t('takeawayPageSubtitle')}</p>

          <div className="bg-[#FFF4E6] border-l-4 border-[#7D3C32] p-6 mb-8 rounded">
            <p className="text-[#7D3C32] font-medium mb-2">
              <span className="font-bold">{t('letOp')}</span> {t('closureNotice')}
            </p>
            <p className="text-[#7D3C32] font-medium">
              <span className="font-bold">Pizza's</span> alleen beschikbaar in de avonden!
            </p>
          </div>
          
          <div className="text-center mb-8">
            <a href="https://labottegaherent.weebly.com/onze-kaart1.html" target="_blank" rel="noopener noreferrer"
              className="text-[#7D3C32] font-semibold hover:underline text-lg">
              {t('clickForMenu')}
            </a>
          </div>
          
          <div className="bg-white rounded-xl shadow-lg overflow-hidden">
            <iframe 
              src="https://form.jotform.com/222305012976349"
              style={{ width: '100%', minHeight: '800px', border: 'none' }}
              title="Takeaway Form"
              scrolling="yes"
            />
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

// ===========================================
// CONFIRMATION PAGES
// ===========================================
function ConfirmationPage() {
  const { t } = useLanguage();
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <div className="max-w-md text-center">
        <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <svg className="w-10 h-10 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h1 className="text-3xl font-serif text-[#7D3C32] mb-4">Grazie!</h1>
        <p className="text-gray-600 mb-8">Uw reservatie is ontvangen. U ontvangt een bevestiging per e-mail.</p>
        <Link to={BASE_PATH} className="bg-[#7D3C32] text-white px-6 py-3 rounded-lg hover:bg-[#6A3229] transition-colors inline-block">
          {t('backToHome')}
        </Link>
      </div>
    </div>
  );
}

function Confirmation2Page() {
  const { t } = useLanguage();
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <div className="max-w-md text-center">
        <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <svg className="w-10 h-10 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h1 className="text-3xl font-serif text-[#7D3C32] mb-4">Grazie!</h1>
        <p className="text-gray-600 mb-8">Uw bestelling is ontvangen. U ontvangt een bevestiging per e-mail.</p>
        <Link to={BASE_PATH} className="bg-[#7D3C32] text-white px-6 py-3 rounded-lg hover:bg-[#6A3229] transition-colors inline-block">
          {t('backToHome')}
        </Link>
      </div>
    </div>
  );
}

// ===========================================
// MAIN APP
// ===========================================
function App() {
  return (
    <LanguageProvider>
      <ScrollToTop />
      <div className="bottega-app">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/kaart" element={<KaartPage />} />
          <Route path="/galerie" element={<GaleriePage />} />
          <Route path="/groepmenus" element={<GroepmenusPage />} />
          <Route path="/reserveren" element={<ReserverenPage />} />
          <Route path="/afhalen" element={<AfhalenPage />} />
          <Route path="/confirmation" element={<ConfirmationPage />} />
          <Route path="/confirmation2" element={<Confirmation2Page />} />
          <Route path="*" element={<HomePage />} />
        </Routes>
      </div>
    </LanguageProvider>
  );
}

export default App;
