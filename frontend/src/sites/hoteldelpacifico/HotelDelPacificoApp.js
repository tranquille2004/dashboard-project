// Hotel del Pacifico - Santo Domingo, Ecuador
// Main App Component with Multi-language Support

import React, { useState, useEffect } from 'react';
import { Routes, Route, Link, useLocation } from 'react-router-dom';
import { Menu, X, Phone, Mail, MapPin, Clock, Wifi, Tv, Wind, Car, Coffee, Users, Building, ChevronDown, Facebook, Instagram, Globe, Star, Utensils, Camera, Home as HomeIcon, DollarSign, Mountain, MessageCircle } from 'lucide-react';
import SEO from '@/components/SEO';
import URLSync from '@/components/URLSync';
import { IMG } from '@/utils/imageHelper';

// ============================================
// TRANSLATIONS
// ============================================
const translations = {
  es: {
    nav: {
      home: 'Inicio',
      rooms: 'Habitaciones',
      prices: 'Precios',
      photos: 'Fotos',
      restaurant: 'Restaurante',
      attractions: 'Atractivos',
      contact: 'Contacto'
    },
    hero: {
      title: 'Hotel del Pacífico',
      subtitle: 'Tu oasis de tranquilidad en el corazón de Santo Domingo',
      cta: 'Reservar Ahora',
      explore: 'Explorar'
    },
    home: {
      welcome: 'Bienvenidos',
      welcomeText: 'Ubicado en el vibrante centro de Santo Domingo de los Tsáchilas, Hotel del Pacífico ofrece una experiencia única donde la comodidad moderna se encuentra con la calidez ecuatoriana. A pesar de nuestra ubicación céntrica, nuestros huéspedes disfrutan de un ambiente tranquilo y relajante.',
      features: 'Nuestros Servicios',
      rooms36: '36 Habitaciones',
      roomsDesc: 'Amplias y confortables con todas las comodidades',
      restaurant: 'Restaurante La Orquídea',
      restaurantDesc: 'Desayuno, almuerzo y cena con cocina local e internacional',
      businessCenter: 'Centro de Negocios',
      businessDesc: 'Salón de banquetes con equipos audiovisuales',
      pastry: 'Pastelería',
      pastryDesc: 'Deliciosos pasteles y bocadillos caseros',
      amenities: 'Comodidades',
      wifi: 'WiFi Gratis',
      ac: 'Aire Acondicionado',
      tv: 'Smart TV',
      parking: 'Parqueadero',
      cleaning: 'Limpieza Diaria',
      location: 'Ubicación Perfecta',
      locationText: 'En el centro de la ciudad pero con la tranquilidad que necesitas'
    },
    rooms: {
      title: 'Nuestras Habitaciones',
      subtitle: '36 habitaciones diseñadas para tu comodidad',
      single: 'Habitación Simple',
      double: 'Habitación Doble',
      suite: 'Suite',
      allInclude: 'Todas las habitaciones incluyen:',
      features: ['Aire acondicionado', 'WiFi de alta velocidad', 'Smart TV', 'Baño privado', 'Limpieza diaria', 'Agua caliente 24h']
    },
    prices: {
      title: 'Tarifas',
      subtitle: 'Precios competitivos para tu estadía perfecta',
      perNight: 'por noche',
      includes: 'Incluye:',
      breakfast: 'Desayuno incluido',
      taxes: 'Impuestos incluidos',
      contact: 'Contáctenos para reservas'
    },
    photos: {
      title: 'Galería',
      subtitle: 'Descubre nuestras instalaciones'
    },
    restaurant: {
      title: 'Restaurante La Orquídea',
      subtitle: 'Sabores que enamoran',
      description: 'Nuestro restaurante ofrece una experiencia gastronómica única con platos de la cocina ecuatoriana e internacional. Disfruta de ingredientes frescos y locales preparados por nuestros expertos chefs.',
      breakfast: 'Desayuno',
      breakfastTime: 'Horario próximamente',
      lunch: 'Almuerzo',
      lunchTime: 'Horario próximamente',
      dinner: 'Cena',
      dinnerTime: 'Horario próximamente',
      pastry: 'Pastelería',
      pastryDesc: 'Disfruta de nuestros deliciosos pasteles, tortas y bocadillos caseros preparados diariamente.',
      banquet: 'Salón de Banquetes',
      banquetDesc: 'Espacio ideal para eventos corporativos y celebraciones, equipado con tecnología audiovisual moderna.'
    },
    attractions: {
      title: 'Atractivos Turísticos',
      subtitle: 'Descubre Santo Domingo de los Tsáchilas',
      intro: 'Santo Domingo es la puerta de entrada a la costa ecuatoriana, rica en cultura, naturaleza y aventura.',
      tsachilas: 'Comunidad Tsáchila',
      tsachilasDesc: 'Conoce la fascinante cultura de los Tsáchilas, conocidos como "Colorados" por su tradicional pintura de cabello con achiote. Una experiencia cultural única.',
      waterfalls: 'Cascadas',
      waterfallsDesc: 'La región cuenta con impresionantes cascadas rodeadas de exuberante vegetación tropical. Perfectas para el ecoturismo y la aventura.',
      malecon: 'Malecón San Gabriel del Baba',
      maleconDesc: 'Un hermoso paseo junto al río con áreas verdes, restaurantes y espacios recreativos para toda la familia.',
      jelenTenka: 'Jelen Tenka',
      jelenTenkaDesc: 'Centro turístico y cultural que ofrece una inmersión en las tradiciones Tsáchilas con rituales, gastronomía y naturaleza.'
    },
    contact: {
      title: 'Contacto',
      subtitle: 'Estamos aquí para ayudarte',
      address: 'Dirección',
      phone: 'Teléfono',
      email: 'Correo Electrónico',
      hours: 'Recepción 24 horas',
      form: {
        name: 'Nombre',
        email: 'Correo',
        message: 'Mensaje',
        send: 'Enviar Mensaje'
      }
    },
    footer: {
      rights: 'Todos los derechos reservados',
      slogan: 'Tu hogar lejos de casa en Santo Domingo'
    }
  },
  en: {
    nav: {
      home: 'Home',
      rooms: 'Rooms',
      prices: 'Rates',
      photos: 'Photos',
      restaurant: 'Restaurant',
      attractions: 'Attractions',
      contact: 'Contact'
    },
    hero: {
      title: 'Hotel del Pacífico',
      subtitle: 'Your oasis of tranquility in the heart of Santo Domingo',
      cta: 'Book Now',
      explore: 'Explore'
    },
    home: {
      welcome: 'Welcome',
      welcomeText: 'Located in the vibrant center of Santo Domingo de los Tsáchilas, Hotel del Pacífico offers a unique experience where modern comfort meets Ecuadorian warmth. Despite our central location, our guests enjoy a quiet and relaxing atmosphere.',
      features: 'Our Services',
      rooms36: '36 Rooms',
      roomsDesc: 'Spacious and comfortable with all amenities',
      restaurant: 'La Orquídea Restaurant',
      restaurantDesc: 'Breakfast, lunch and dinner with local and international cuisine',
      businessCenter: 'Business Center',
      businessDesc: 'Banquet hall with audiovisual equipment',
      pastry: 'Pastry Shop',
      pastryDesc: 'Delicious homemade cakes and snacks',
      amenities: 'Amenities',
      wifi: 'Free WiFi',
      ac: 'Air Conditioning',
      tv: 'Smart TV',
      parking: 'Parking',
      cleaning: 'Daily Cleaning',
      location: 'Perfect Location',
      locationText: 'In the city center but with the tranquility you need'
    },
    rooms: {
      title: 'Our Rooms',
      subtitle: '36 rooms designed for your comfort',
      single: 'Single Room',
      double: 'Double Room',
      suite: 'Suite',
      allInclude: 'All rooms include:',
      features: ['Air conditioning', 'High-speed WiFi', 'Smart TV', 'Private bathroom', 'Daily cleaning', '24h hot water']
    },
    prices: {
      title: 'Rates',
      subtitle: 'Competitive prices for your perfect stay',
      perNight: 'per night',
      includes: 'Includes:',
      breakfast: 'Breakfast included',
      taxes: 'Taxes included',
      contact: 'Contact us for reservations'
    },
    photos: {
      title: 'Gallery',
      subtitle: 'Discover our facilities'
    },
    restaurant: {
      title: 'La Orquídea Restaurant',
      subtitle: 'Flavors that captivate',
      description: 'Our restaurant offers a unique gastronomic experience with dishes from Ecuadorian and international cuisine. Enjoy fresh, local ingredients prepared by our expert chefs.',
      breakfast: 'Breakfast',
      breakfastTime: 'Schedule coming soon',
      lunch: 'Lunch',
      lunchTime: 'Schedule coming soon',
      dinner: 'Dinner',
      dinnerTime: 'Schedule coming soon',
      pastry: 'Pastry Shop',
      pastryDesc: 'Enjoy our delicious homemade cakes, pies and snacks prepared daily.',
      banquet: 'Banquet Hall',
      banquetDesc: 'Ideal space for corporate events and celebrations, equipped with modern audiovisual technology.'
    },
    attractions: {
      title: 'Tourist Attractions',
      subtitle: 'Discover Santo Domingo de los Tsáchilas',
      intro: 'Santo Domingo is the gateway to the Ecuadorian coast, rich in culture, nature and adventure.',
      tsachilas: 'Tsáchila Community',
      tsachilasDesc: 'Learn about the fascinating Tsáchila culture, known as "Colorados" for their traditional achiote hair painting. A unique cultural experience.',
      waterfalls: 'Waterfalls',
      waterfallsDesc: 'The region has impressive waterfalls surrounded by lush tropical vegetation. Perfect for ecotourism and adventure.',
      malecon: 'San Gabriel del Baba Boardwalk',
      maleconDesc: 'A beautiful riverside promenade with green areas, restaurants and recreational spaces for the whole family.',
      jelenTenka: 'Jelen Tenka',
      jelenTenkaDesc: 'Tourist and cultural center offering an immersion in Tsáchila traditions with rituals, gastronomy and nature.'
    },
    contact: {
      title: 'Contact',
      subtitle: 'We are here to help you',
      address: 'Address',
      phone: 'Phone',
      email: 'Email',
      hours: '24-hour reception',
      form: {
        name: 'Name',
        email: 'Email',
        message: 'Message',
        send: 'Send Message'
      }
    },
    footer: {
      rights: 'All rights reserved',
      slogan: 'Your home away from home in Santo Domingo'
    }
  },
  fr: {
    nav: {
      home: 'Accueil',
      rooms: 'Chambres',
      prices: 'Tarifs',
      photos: 'Photos',
      restaurant: 'Restaurant',
      attractions: 'Attractions',
      contact: 'Contact'
    },
    hero: {
      title: 'Hotel del Pacífico',
      subtitle: 'Votre oasis de tranquillité au cœur de Santo Domingo',
      cta: 'Réserver',
      explore: 'Explorer'
    },
    home: {
      welcome: 'Bienvenue',
      welcomeText: 'Situé au cœur vibrant de Santo Domingo de los Tsáchilas, l\'Hotel del Pacífico offre une expérience unique où le confort moderne rencontre la chaleur équatorienne. Malgré notre emplacement central, nos clients profitent d\'une atmosphère calme et relaxante.',
      features: 'Nos Services',
      rooms36: '36 Chambres',
      roomsDesc: 'Spacieuses et confortables avec toutes les commodités',
      restaurant: 'Restaurant La Orquídea',
      restaurantDesc: 'Petit-déjeuner, déjeuner et dîner avec cuisine locale et internationale',
      businessCenter: 'Centre d\'Affaires',
      businessDesc: 'Salle de banquet avec équipements audiovisuels',
      pastry: 'Pâtisserie',
      pastryDesc: 'Délicieux gâteaux et snacks faits maison',
      amenities: 'Commodités',
      wifi: 'WiFi Gratuit',
      ac: 'Climatisation',
      tv: 'Smart TV',
      parking: 'Parking',
      cleaning: 'Nettoyage Quotidien',
      location: 'Emplacement Parfait',
      locationText: 'Au centre-ville mais avec la tranquillité dont vous avez besoin'
    },
    rooms: {
      title: 'Nos Chambres',
      subtitle: '36 chambres conçues pour votre confort',
      single: 'Chambre Simple',
      double: 'Chambre Double',
      suite: 'Suite',
      allInclude: 'Toutes les chambres incluent:',
      features: ['Climatisation', 'WiFi haut débit', 'Smart TV', 'Salle de bain privée', 'Nettoyage quotidien', 'Eau chaude 24h']
    },
    prices: {
      title: 'Tarifs',
      subtitle: 'Prix compétitifs pour un séjour parfait',
      perNight: 'par nuit',
      includes: 'Inclus:',
      breakfast: 'Petit-déjeuner inclus',
      taxes: 'Taxes incluses',
      contact: 'Contactez-nous pour réserver'
    },
    photos: {
      title: 'Galerie',
      subtitle: 'Découvrez nos installations'
    },
    restaurant: {
      title: 'Restaurant La Orquídea',
      subtitle: 'Des saveurs qui séduisent',
      description: 'Notre restaurant offre une expérience gastronomique unique avec des plats de la cuisine équatorienne et internationale. Profitez d\'ingrédients frais et locaux préparés par nos chefs experts.',
      breakfast: 'Petit-déjeuner',
      breakfastTime: 'Horaires à venir',
      lunch: 'Déjeuner',
      lunchTime: 'Horaires à venir',
      dinner: 'Dîner',
      dinnerTime: 'Horaires à venir',
      pastry: 'Pâtisserie',
      pastryDesc: 'Dégustez nos délicieux gâteaux, tartes et snacks faits maison préparés quotidiennement.',
      banquet: 'Salle de Banquet',
      banquetDesc: 'Espace idéal pour événements corporatifs et célébrations, équipé de technologie audiovisuelle moderne.'
    },
    attractions: {
      title: 'Attractions Touristiques',
      subtitle: 'Découvrez Santo Domingo de los Tsáchilas',
      intro: 'Santo Domingo est la porte d\'entrée de la côte équatorienne, riche en culture, nature et aventure.',
      tsachilas: 'Communauté Tsáchila',
      tsachilasDesc: 'Découvrez la fascinante culture des Tsáchilas, connus comme "Colorados" pour leur peinture traditionnelle des cheveux à l\'achiote. Une expérience culturelle unique.',
      waterfalls: 'Cascades',
      waterfallsDesc: 'La région possède d\'impressionnantes cascades entourées d\'une végétation tropicale luxuriante. Parfait pour l\'écotourisme et l\'aventure.',
      malecon: 'Malecón San Gabriel del Baba',
      maleconDesc: 'Une belle promenade au bord de la rivière avec des espaces verts, des restaurants et des espaces récréatifs pour toute la famille.',
      jelenTenka: 'Jelen Tenka',
      jelenTenkaDesc: 'Centre touristique et culturel offrant une immersion dans les traditions Tsáchilas avec rituels, gastronomie et nature.'
    },
    contact: {
      title: 'Contact',
      subtitle: 'Nous sommes là pour vous aider',
      address: 'Adresse',
      phone: 'Téléphone',
      email: 'Email',
      hours: 'Réception 24h/24',
      form: {
        name: 'Nom',
        email: 'Email',
        message: 'Message',
        send: 'Envoyer'
      }
    },
    footer: {
      rights: 'Tous droits réservés',
      slogan: 'Votre chez-vous loin de chez vous à Santo Domingo'
    }
  },
  it: {
    nav: {
      home: 'Home',
      rooms: 'Camere',
      prices: 'Prezzi',
      photos: 'Foto',
      restaurant: 'Ristorante',
      attractions: 'Attrazioni',
      contact: 'Contatto'
    },
    hero: {
      title: 'Hotel del Pacífico',
      subtitle: 'La tua oasi di tranquillità nel cuore di Santo Domingo',
      cta: 'Prenota Ora',
      explore: 'Esplora'
    },
    home: {
      welcome: 'Benvenuti',
      welcomeText: 'Situato nel vivace centro di Santo Domingo de los Tsáchilas, l\'Hotel del Pacífico offre un\'esperienza unica dove il comfort moderno incontra il calore ecuadoriano. Nonostante la nostra posizione centrale, i nostri ospiti godono di un\'atmosfera tranquilla e rilassante.',
      features: 'I Nostri Servizi',
      rooms36: '36 Camere',
      roomsDesc: 'Spaziose e confortevoli con tutti i comfort',
      restaurant: 'Ristorante La Orquídea',
      restaurantDesc: 'Colazione, pranzo e cena con cucina locale e internazionale',
      businessCenter: 'Business Center',
      businessDesc: 'Sala banchetti con attrezzature audiovisive',
      pastry: 'Pasticceria',
      pastryDesc: 'Deliziose torte e snack fatti in casa',
      amenities: 'Comfort',
      wifi: 'WiFi Gratuito',
      ac: 'Aria Condizionata',
      tv: 'Smart TV',
      parking: 'Parcheggio',
      cleaning: 'Pulizia Giornaliera',
      location: 'Posizione Perfetta',
      locationText: 'Nel centro città ma con la tranquillità di cui hai bisogno'
    },
    rooms: {
      title: 'Le Nostre Camere',
      subtitle: '36 camere progettate per il tuo comfort',
      single: 'Camera Singola',
      double: 'Camera Doppia',
      suite: 'Suite',
      allInclude: 'Tutte le camere includono:',
      features: ['Aria condizionata', 'WiFi ad alta velocità', 'Smart TV', 'Bagno privato', 'Pulizia giornaliera', 'Acqua calda 24h']
    },
    prices: {
      title: 'Tariffe',
      subtitle: 'Prezzi competitivi per il tuo soggiorno perfetto',
      perNight: 'per notte',
      includes: 'Include:',
      breakfast: 'Colazione inclusa',
      taxes: 'Tasse incluse',
      contact: 'Contattaci per prenotazioni'
    },
    photos: {
      title: 'Galleria',
      subtitle: 'Scopri le nostre strutture'
    },
    restaurant: {
      title: 'Ristorante La Orquídea',
      subtitle: 'Sapori che conquistano',
      description: 'Il nostro ristorante offre un\'esperienza gastronomica unica con piatti della cucina ecuadoriana e internazionale. Goditi ingredienti freschi e locali preparati dai nostri chef esperti.',
      breakfast: 'Colazione',
      breakfastTime: 'Orario in arrivo',
      lunch: 'Pranzo',
      lunchTime: 'Orario in arrivo',
      dinner: 'Cena',
      dinnerTime: 'Orario in arrivo',
      pastry: 'Pasticceria',
      pastryDesc: 'Goditi le nostre deliziose torte, crostate e snack fatti in casa preparati quotidianamente.',
      banquet: 'Sala Banchetti',
      banquetDesc: 'Spazio ideale per eventi aziendali e celebrazioni, dotato di moderna tecnologia audiovisiva.'
    },
    attractions: {
      title: 'Attrazioni Turistiche',
      subtitle: 'Scopri Santo Domingo de los Tsáchilas',
      intro: 'Santo Domingo è la porta d\'ingresso alla costa ecuadoriana, ricca di cultura, natura e avventura.',
      tsachilas: 'Comunità Tsáchila',
      tsachilasDesc: 'Scopri l\'affascinante cultura dei Tsáchila, conosciuti come "Colorados" per la loro tradizionale pittura dei capelli con achiote. Un\'esperienza culturale unica.',
      waterfalls: 'Cascate',
      waterfallsDesc: 'La regione vanta impressionanti cascate circondate da lussureggiante vegetazione tropicale. Perfette per l\'ecoturismo e l\'avventura.',
      malecon: 'Lungofiume San Gabriel del Baba',
      maleconDesc: 'Una bella passeggiata lungo il fiume con aree verdi, ristoranti e spazi ricreativi per tutta la famiglia.',
      jelenTenka: 'Jelen Tenka',
      jelenTenkaDesc: 'Centro turistico e culturale che offre un\'immersione nelle tradizioni Tsáchila con rituali, gastronomia e natura.'
    },
    contact: {
      title: 'Contatto',
      subtitle: 'Siamo qui per aiutarti',
      address: 'Indirizzo',
      phone: 'Telefono',
      email: 'Email',
      hours: 'Reception 24 ore',
      form: {
        name: 'Nome',
        email: 'Email',
        message: 'Messaggio',
        send: 'Invia Messaggio'
      }
    },
    footer: {
      rights: 'Tutti i diritti riservati',
      slogan: 'La tua casa lontano da casa a Santo Domingo'
    }
  },
  de: {
    nav: {
      home: 'Startseite',
      rooms: 'Zimmer',
      prices: 'Preise',
      photos: 'Fotos',
      restaurant: 'Restaurant',
      attractions: 'Sehenswürdigkeiten',
      contact: 'Kontakt'
    },
    hero: {
      title: 'Hotel del Pacífico',
      subtitle: 'Ihre Oase der Ruhe im Herzen von Santo Domingo',
      cta: 'Jetzt Buchen',
      explore: 'Entdecken'
    },
    home: {
      welcome: 'Willkommen',
      welcomeText: 'Im pulsierenden Zentrum von Santo Domingo de los Tsáchilas gelegen, bietet das Hotel del Pacífico ein einzigartiges Erlebnis, bei dem moderner Komfort auf ecuadorianische Herzlichkeit trifft. Trotz unserer zentralen Lage genießen unsere Gäste eine ruhige und entspannte Atmosphäre.',
      features: 'Unsere Services',
      rooms36: '36 Zimmer',
      roomsDesc: 'Geräumig und komfortabel mit allen Annehmlichkeiten',
      restaurant: 'Restaurant La Orquídea',
      restaurantDesc: 'Frühstück, Mittag- und Abendessen mit lokaler und internationaler Küche',
      businessCenter: 'Business Center',
      businessDesc: 'Bankettsaal mit audiovisueller Ausstattung',
      pastry: 'Konditorei',
      pastryDesc: 'Köstliche hausgemachte Kuchen und Snacks',
      amenities: 'Ausstattung',
      wifi: 'Kostenloses WLAN',
      ac: 'Klimaanlage',
      tv: 'Smart TV',
      parking: 'Parkplatz',
      cleaning: 'Tägliche Reinigung',
      location: 'Perfekte Lage',
      locationText: 'Im Stadtzentrum, aber mit der Ruhe, die Sie brauchen'
    },
    rooms: {
      title: 'Unsere Zimmer',
      subtitle: '36 Zimmer für Ihren Komfort gestaltet',
      single: 'Einzelzimmer',
      double: 'Doppelzimmer',
      suite: 'Suite',
      allInclude: 'Alle Zimmer beinhalten:',
      features: ['Klimaanlage', 'Highspeed-WLAN', 'Smart TV', 'Eigenes Bad', 'Tägliche Reinigung', '24h Warmwasser']
    },
    prices: {
      title: 'Preise',
      subtitle: 'Wettbewerbsfähige Preise für Ihren perfekten Aufenthalt',
      perNight: 'pro Nacht',
      includes: 'Inklusive:',
      breakfast: 'Frühstück inklusive',
      taxes: 'Steuern inklusive',
      contact: 'Kontaktieren Sie uns für Reservierungen'
    },
    photos: {
      title: 'Galerie',
      subtitle: 'Entdecken Sie unsere Einrichtungen'
    },
    restaurant: {
      title: 'Restaurant La Orquídea',
      subtitle: 'Geschmack, der begeistert',
      description: 'Unser Restaurant bietet ein einzigartiges gastronomisches Erlebnis mit Gerichten der ecuadorianischen und internationalen Küche. Genießen Sie frische, lokale Zutaten, zubereitet von unseren erfahrenen Köchen.',
      breakfast: 'Frühstück',
      breakfastTime: 'Zeiten folgen',
      lunch: 'Mittagessen',
      lunchTime: 'Zeiten folgen',
      dinner: 'Abendessen',
      dinnerTime: 'Zeiten folgen',
      pastry: 'Konditorei',
      pastryDesc: 'Genießen Sie unsere köstlichen hausgemachten Kuchen, Torten und Snacks, die täglich frisch zubereitet werden.',
      banquet: 'Bankettsaal',
      banquetDesc: 'Idealer Raum für Firmenveranstaltungen und Feiern, ausgestattet mit moderner audiovisueller Technik.'
    },
    attractions: {
      title: 'Sehenswürdigkeiten',
      subtitle: 'Entdecken Sie Santo Domingo de los Tsáchilas',
      intro: 'Santo Domingo ist das Tor zur ecuadorianischen Küste, reich an Kultur, Natur und Abenteuer.',
      tsachilas: 'Tsáchila-Gemeinschaft',
      tsachilasDesc: 'Lernen Sie die faszinierende Kultur der Tsáchila kennen, die wegen ihrer traditionellen Haarbemalung mit Achiote als "Colorados" bekannt sind. Ein einzigartiges kulturelles Erlebnis.',
      waterfalls: 'Wasserfälle',
      waterfallsDesc: 'Die Region verfügt über beeindruckende Wasserfälle, umgeben von üppiger tropischer Vegetation. Perfekt für Ökotourismus und Abenteuer.',
      malecon: 'Uferpromenade San Gabriel del Baba',
      maleconDesc: 'Eine schöne Flusspromenade mit Grünflächen, Restaurants und Freizeitbereichen für die ganze Familie.',
      jelenTenka: 'Jelen Tenka',
      jelenTenkaDesc: 'Tourismus- und Kulturzentrum, das ein Eintauchen in die Tsáchila-Traditionen mit Ritualen, Gastronomie und Natur bietet.'
    },
    contact: {
      title: 'Kontakt',
      subtitle: 'Wir sind für Sie da',
      address: 'Adresse',
      phone: 'Telefon',
      email: 'E-Mail',
      hours: '24-Stunden-Rezeption',
      form: {
        name: 'Name',
        email: 'E-Mail',
        message: 'Nachricht',
        send: 'Nachricht Senden'
      }
    },
    footer: {
      rights: 'Alle Rechte vorbehalten',
      slogan: 'Ihr Zuhause fernab von Zuhause in Santo Domingo'
    }
  }
};

// ============================================
// HOTEL INFO
// ============================================
const HOTEL_INFO = {
  name: 'Hotel del Pacífico',
  address: 'Av. 29 de Mayo entre Ibarra y Latacunga, Santo Domingo, Ecuador',
  phone: '+593 0 000 0000',
  email: 'info@hoteldelpacifico.com',
  website: 'www.hoteldelpacifico.com'
};

// ============================================
// NAVIGATION COMPONENT
// ============================================
const Navigation = ({ language, setLanguage, t }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { path: '', label: t.nav.home, icon: HomeIcon },
    { path: 'habitaciones', label: t.nav.rooms, icon: Building },
    { path: 'precios', label: t.nav.prices, icon: DollarSign },
    { path: 'fotos', label: t.nav.photos, icon: Camera },
    { path: 'restaurante', label: t.nav.restaurant, icon: Utensils },
    { path: 'atractivos', label: t.nav.attractions, icon: Mountain },
    { path: 'contacto', label: t.nav.contact, icon: MessageCircle }
  ];

  const languages = [
    { code: 'es', flag: '🇪🇨', name: 'ES' },
    { code: 'en', flag: '🇺🇸', name: 'EN' },
    { code: 'fr', flag: '🇫🇷', name: 'FR' },
    { code: 'it', flag: '🇮🇹', name: 'IT' },
    { code: 'de', flag: '🇩🇪', name: 'DE' }
  ];

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'bg-white shadow-lg' : 'bg-transparent'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <Link to="" className="flex items-center gap-3">
            <div className={`text-2xl font-bold ${scrolled ? 'text-green-700' : 'text-white'}`}>
              Hotel del Pacífico
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-6">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`text-sm font-medium transition-colors hover:text-green-500 ${
                  scrolled ? 'text-gray-700' : 'text-white'
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Language Selector */}
          <div className="hidden lg:flex items-center gap-2">
            {languages.map((lang) => (
              <button
                key={lang.code}
                onClick={() => setLanguage(lang.code)}
                className={`px-2 py-1 text-sm rounded transition-colors ${
                  language === lang.code
                    ? 'bg-green-600 text-white'
                    : scrolled ? 'text-gray-600 hover:bg-gray-100' : 'text-white hover:bg-white/20'
                }`}
              >
                {lang.flag} {lang.name}
              </button>
            ))}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className={`lg:hidden p-2 ${scrolled ? 'text-gray-700' : 'text-white'}`}
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="lg:hidden bg-white border-t shadow-lg">
          <div className="px-4 py-4 space-y-2">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                onClick={() => setIsOpen(false)}
                className="flex items-center gap-3 px-4 py-3 text-gray-700 hover:bg-green-50 hover:text-green-700 rounded-lg transition-colors"
              >
                <link.icon size={20} />
                {link.label}
              </Link>
            ))}
            <div className="flex gap-2 px-4 pt-4 border-t">
              {languages.map((lang) => (
                <button
                  key={lang.code}
                  onClick={() => { setLanguage(lang.code); setIsOpen(false); }}
                  className={`px-3 py-2 text-sm rounded ${
                    language === lang.code ? 'bg-green-600 text-white' : 'bg-gray-100 text-gray-700'
                  }`}
                >
                  {lang.flag}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

// ============================================
// FOOTER COMPONENT
// ============================================
const Footer = ({ t }) => (
  <footer className="bg-gray-900 text-white">
    <div className="max-w-7xl mx-auto px-4 py-12">
      <div className="grid md:grid-cols-3 gap-8">
        {/* Hotel Info */}
        <div>
          <h3 className="text-2xl font-bold text-green-400 mb-4">Hotel del Pacífico</h3>
          <p className="text-gray-400 mb-4">{t.footer.slogan}</p>
          <div className="flex gap-4">
            <a href="#" className="text-gray-400 hover:text-green-400 transition-colors">
              <Facebook size={24} />
            </a>
            <a href="#" className="text-gray-400 hover:text-green-400 transition-colors">
              <Instagram size={24} />
            </a>
          </div>
        </div>

        {/* Contact */}
        <div>
          <h4 className="text-lg font-semibold mb-4">{t.contact.title}</h4>
          <div className="space-y-2 text-gray-400">
            <p className="flex items-center gap-2">
              <MapPin size={16} className="text-green-400" />
              {HOTEL_INFO.address}
            </p>
            <p className="flex items-center gap-2">
              <Phone size={16} className="text-green-400" />
              {HOTEL_INFO.phone}
            </p>
            <p className="flex items-center gap-2">
              <Mail size={16} className="text-green-400" />
              {HOTEL_INFO.email}
            </p>
          </div>
        </div>

        {/* Quick Links */}
        <div>
          <h4 className="text-lg font-semibold mb-4">{t.nav.home}</h4>
          <div className="space-y-2">
            <Link to="habitaciones" className="block text-gray-400 hover:text-green-400 transition-colors">{t.nav.rooms}</Link>
            <Link to="restaurante" className="block text-gray-400 hover:text-green-400 transition-colors">{t.nav.restaurant}</Link>
            <Link to="atractivos" className="block text-gray-400 hover:text-green-400 transition-colors">{t.nav.attractions}</Link>
            <Link to="contacto" className="block text-gray-400 hover:text-green-400 transition-colors">{t.nav.contact}</Link>
          </div>
        </div>
      </div>

      <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-500">
        <p>© {new Date().getFullYear()} Hotel del Pacífico. {t.footer.rights}.</p>
      </div>
    </div>
  </footer>
);

// ============================================
// HOME PAGE
// ============================================
const HomePage = ({ t }) => (
  <div>
    {/* Hero Section */}
    <section className="relative h-screen flex items-center justify-center bg-gradient-to-br from-green-900 via-green-800 to-black">
      <div className="absolute inset-0 bg-black/40" />
      <div className="relative z-10 text-center text-white px-4 max-w-4xl">
        <h1 className="text-5xl md:text-7xl font-bold mb-6">{t.hero.title}</h1>
        <p className="text-xl md:text-2xl mb-8 text-gray-200">{t.hero.subtitle}</p>
        <div className="flex flex-wrap justify-center gap-4">
          <Link to="contacto" className="bg-green-600 hover:bg-green-700 text-white px-8 py-4 rounded-lg text-lg font-semibold transition-colors">
            {t.hero.cta}
          </Link>
          <Link to="habitaciones" className="bg-white/10 hover:bg-white/20 text-white px-8 py-4 rounded-lg text-lg font-semibold transition-colors border border-white/30">
            {t.hero.explore}
          </Link>
        </div>
      </div>
      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
        <ChevronDown size={32} className="text-white/70" />
      </div>
    </section>

    {/* Welcome Section */}
    <section className="py-20 bg-white">
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">{t.home.welcome}</h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">{t.home.welcomeText}</p>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="text-center p-6 bg-green-50 rounded-xl">
            <Building className="w-12 h-12 text-green-600 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 mb-2">{t.home.rooms36}</h3>
            <p className="text-gray-600">{t.home.roomsDesc}</p>
          </div>
          <div className="text-center p-6 bg-green-50 rounded-xl">
            <Utensils className="w-12 h-12 text-green-600 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 mb-2">{t.home.restaurant}</h3>
            <p className="text-gray-600">{t.home.restaurantDesc}</p>
          </div>
          <div className="text-center p-6 bg-green-50 rounded-xl">
            <Users className="w-12 h-12 text-green-600 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 mb-2">{t.home.businessCenter}</h3>
            <p className="text-gray-600">{t.home.businessDesc}</p>
          </div>
          <div className="text-center p-6 bg-green-50 rounded-xl">
            <Coffee className="w-12 h-12 text-green-600 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 mb-2">{t.home.pastry}</h3>
            <p className="text-gray-600">{t.home.pastryDesc}</p>
          </div>
        </div>
      </div>
    </section>

    {/* Amenities Section */}
    <section className="py-20 bg-gray-900 text-white">
      <div className="max-w-6xl mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12">{t.home.amenities}</h2>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8">
          <div className="text-center">
            <Wifi className="w-10 h-10 text-green-400 mx-auto mb-3" />
            <p>{t.home.wifi}</p>
          </div>
          <div className="text-center">
            <Wind className="w-10 h-10 text-green-400 mx-auto mb-3" />
            <p>{t.home.ac}</p>
          </div>
          <div className="text-center">
            <Tv className="w-10 h-10 text-green-400 mx-auto mb-3" />
            <p>{t.home.tv}</p>
          </div>
          <div className="text-center">
            <Car className="w-10 h-10 text-green-400 mx-auto mb-3" />
            <p>{t.home.parking}</p>
          </div>
          <div className="text-center">
            <Star className="w-10 h-10 text-green-400 mx-auto mb-3" />
            <p>{t.home.cleaning}</p>
          </div>
        </div>
      </div>
    </section>

    {/* Location Section */}
    <section className="py-20 bg-green-700 text-white">
      <div className="max-w-4xl mx-auto px-4 text-center">
        <MapPin className="w-16 h-16 mx-auto mb-6" />
        <h2 className="text-3xl font-bold mb-4">{t.home.location}</h2>
        <p className="text-xl text-green-100">{t.home.locationText}</p>
        <p className="mt-4 text-green-200">{HOTEL_INFO.address}</p>
      </div>
    </section>
  </div>
);

// ============================================
// ROOMS PAGE
// ============================================
const RoomsPage = ({ t }) => (
  <div className="pt-20">
    {/* Hero */}
    <section className="bg-gradient-to-br from-green-800 to-green-900 text-white py-20">
      <div className="max-w-4xl mx-auto px-4 text-center">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">{t.rooms.title}</h1>
        <p className="text-xl text-green-200">{t.rooms.subtitle}</p>
      </div>
    </section>

    {/* Room Types */}
    <section className="py-20 bg-white">
      <div className="max-w-6xl mx-auto px-4">
        <div className="grid md:grid-cols-3 gap-8">
          {/* Single Room */}
          <div className="bg-gray-50 rounded-2xl overflow-hidden shadow-lg">
            <div className="h-48 bg-gradient-to-br from-green-600 to-green-800 flex items-center justify-center">
              <Building className="w-20 h-20 text-white/50" />
            </div>
            <div className="p-6">
              <h3 className="text-2xl font-bold text-gray-900 mb-2">{t.rooms.single}</h3>
              <p className="text-3xl font-bold text-green-600 mb-4">$0 <span className="text-sm font-normal text-gray-500">{t.prices.perNight}</span></p>
            </div>
          </div>

          {/* Double Room */}
          <div className="bg-gray-50 rounded-2xl overflow-hidden shadow-lg border-2 border-green-500">
            <div className="h-48 bg-gradient-to-br from-green-600 to-green-800 flex items-center justify-center">
              <Building className="w-20 h-20 text-white/50" />
            </div>
            <div className="p-6">
              <h3 className="text-2xl font-bold text-gray-900 mb-2">{t.rooms.double}</h3>
              <p className="text-3xl font-bold text-green-600 mb-4">$0 <span className="text-sm font-normal text-gray-500">{t.prices.perNight}</span></p>
            </div>
          </div>

          {/* Suite */}
          <div className="bg-gray-50 rounded-2xl overflow-hidden shadow-lg">
            <div className="h-48 bg-gradient-to-br from-green-600 to-green-800 flex items-center justify-center">
              <Building className="w-20 h-20 text-white/50" />
            </div>
            <div className="p-6">
              <h3 className="text-2xl font-bold text-gray-900 mb-2">{t.rooms.suite}</h3>
              <p className="text-3xl font-bold text-green-600 mb-4">$0 <span className="text-sm font-normal text-gray-500">{t.prices.perNight}</span></p>
            </div>
          </div>
        </div>

        {/* All rooms include */}
        <div className="mt-16 bg-green-50 rounded-2xl p-8">
          <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">{t.rooms.allInclude}</h3>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {t.rooms.features.map((feature, index) => (
              <div key={index} className="flex items-center gap-3">
                <div className="w-2 h-2 bg-green-500 rounded-full" />
                <span className="text-gray-700">{feature}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  </div>
);

// ============================================
// PRICES PAGE
// ============================================
const PricesPage = ({ t }) => (
  <div className="pt-20">
    {/* Hero */}
    <section className="bg-gradient-to-br from-green-800 to-green-900 text-white py-20">
      <div className="max-w-4xl mx-auto px-4 text-center">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">{t.prices.title}</h1>
        <p className="text-xl text-green-200">{t.prices.subtitle}</p>
      </div>
    </section>

    {/* Price Table */}
    <section className="py-20 bg-white">
      <div className="max-w-4xl mx-auto px-4">
        <div className="bg-gray-50 rounded-2xl overflow-hidden shadow-lg">
          <table className="w-full">
            <thead className="bg-green-700 text-white">
              <tr>
                <th className="px-6 py-4 text-left">{t.nav.rooms}</th>
                <th className="px-6 py-4 text-right">{t.prices.perNight}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              <tr className="hover:bg-green-50">
                <td className="px-6 py-4 font-medium">{t.rooms.single}</td>
                <td className="px-6 py-4 text-right text-2xl font-bold text-green-600">$0</td>
              </tr>
              <tr className="hover:bg-green-50">
                <td className="px-6 py-4 font-medium">{t.rooms.double}</td>
                <td className="px-6 py-4 text-right text-2xl font-bold text-green-600">$0</td>
              </tr>
              <tr className="hover:bg-green-50">
                <td className="px-6 py-4 font-medium">{t.rooms.suite}</td>
                <td className="px-6 py-4 text-right text-2xl font-bold text-green-600">$0</td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className="mt-8 bg-green-100 rounded-xl p-6">
          <h3 className="font-semibold text-green-800 mb-3">{t.prices.includes}</h3>
          <ul className="space-y-2 text-green-700">
            <li className="flex items-center gap-2">
              <Star className="w-4 h-4" /> {t.prices.breakfast}
            </li>
            <li className="flex items-center gap-2">
              <Star className="w-4 h-4" /> {t.prices.taxes}
            </li>
          </ul>
        </div>

        <div className="mt-8 text-center">
          <Link to="contacto" className="inline-block bg-green-600 hover:bg-green-700 text-white px-8 py-4 rounded-lg text-lg font-semibold transition-colors">
            {t.prices.contact}
          </Link>
        </div>
      </div>
    </section>
  </div>
);

// ============================================
// PHOTOS PAGE
// ============================================
const PhotosPage = ({ t }) => (
  <div className="pt-20">
    {/* Hero */}
    <section className="bg-gradient-to-br from-green-800 to-green-900 text-white py-20">
      <div className="max-w-4xl mx-auto px-4 text-center">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">{t.photos.title}</h1>
        <p className="text-xl text-green-200">{t.photos.subtitle}</p>
      </div>
    </section>

    {/* Photo Grid Placeholder */}
    <section className="py-20 bg-gray-100">
      <div className="max-w-6xl mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {[...Array(12)].map((_, i) => (
            <div key={i} className="aspect-square bg-gradient-to-br from-green-200 to-green-300 rounded-lg flex items-center justify-center">
              <Camera className="w-12 h-12 text-green-600/50" />
            </div>
          ))}
        </div>
        <p className="text-center text-gray-500 mt-8">Fotos próximamente / Photos coming soon</p>
      </div>
    </section>
  </div>
);

// ============================================
// RESTAURANT PAGE
// ============================================
const RestaurantPage = ({ t }) => (
  <div className="pt-20">
    {/* Hero */}
    <section className="bg-gradient-to-br from-green-800 to-green-900 text-white py-20">
      <div className="max-w-4xl mx-auto px-4 text-center">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">{t.restaurant.title}</h1>
        <p className="text-xl text-green-200">{t.restaurant.subtitle}</p>
      </div>
    </section>

    {/* Description */}
    <section className="py-16 bg-white">
      <div className="max-w-4xl mx-auto px-4 text-center">
        <p className="text-lg text-gray-600">{t.restaurant.description}</p>
      </div>
    </section>

    {/* Meal Times */}
    <section className="py-16 bg-gray-50">
      <div className="max-w-6xl mx-auto px-4">
        <div className="grid md:grid-cols-3 gap-8">
          <div className="bg-white rounded-xl p-8 shadow-lg text-center">
            <Coffee className="w-12 h-12 text-green-600 mx-auto mb-4" />
            <h3 className="text-xl font-bold text-gray-900 mb-2">{t.restaurant.breakfast}</h3>
            <p className="text-gray-500">{t.restaurant.breakfastTime}</p>
          </div>
          <div className="bg-white rounded-xl p-8 shadow-lg text-center">
            <Utensils className="w-12 h-12 text-green-600 mx-auto mb-4" />
            <h3 className="text-xl font-bold text-gray-900 mb-2">{t.restaurant.lunch}</h3>
            <p className="text-gray-500">{t.restaurant.lunchTime}</p>
          </div>
          <div className="bg-white rounded-xl p-8 shadow-lg text-center">
            <Utensils className="w-12 h-12 text-green-600 mx-auto mb-4" />
            <h3 className="text-xl font-bold text-gray-900 mb-2">{t.restaurant.dinner}</h3>
            <p className="text-gray-500">{t.restaurant.dinnerTime}</p>
          </div>
        </div>
      </div>
    </section>

    {/* Pastry & Banquet */}
    <section className="py-16 bg-white">
      <div className="max-w-6xl mx-auto px-4">
        <div className="grid md:grid-cols-2 gap-8">
          <div className="bg-green-50 rounded-xl p-8">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">{t.restaurant.pastry}</h3>
            <p className="text-gray-600">{t.restaurant.pastryDesc}</p>
          </div>
          <div className="bg-green-50 rounded-xl p-8">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">{t.restaurant.banquet}</h3>
            <p className="text-gray-600">{t.restaurant.banquetDesc}</p>
          </div>
        </div>
      </div>
    </section>
  </div>
);

// ============================================
// ATTRACTIONS PAGE
// ============================================
const AttractionsPage = ({ t }) => (
  <div className="pt-20">
    {/* Hero */}
    <section className="bg-gradient-to-br from-green-800 to-green-900 text-white py-20">
      <div className="max-w-4xl mx-auto px-4 text-center">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">{t.attractions.title}</h1>
        <p className="text-xl text-green-200">{t.attractions.subtitle}</p>
      </div>
    </section>

    {/* Intro */}
    <section className="py-12 bg-white">
      <div className="max-w-4xl mx-auto px-4 text-center">
        <p className="text-lg text-gray-600">{t.attractions.intro}</p>
      </div>
    </section>

    {/* Attractions Grid */}
    <section className="py-16 bg-gray-50">
      <div className="max-w-6xl mx-auto px-4">
        <div className="grid md:grid-cols-2 gap-8">
          {/* Tsáchilas */}
          <div className="bg-white rounded-xl overflow-hidden shadow-lg">
            <div className="h-48 bg-gradient-to-br from-orange-500 to-red-600 flex items-center justify-center">
              <Users className="w-20 h-20 text-white/50" />
            </div>
            <div className="p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-2">{t.attractions.tsachilas}</h3>
              <p className="text-gray-600">{t.attractions.tsachilasDesc}</p>
            </div>
          </div>

          {/* Waterfalls */}
          <div className="bg-white rounded-xl overflow-hidden shadow-lg">
            <div className="h-48 bg-gradient-to-br from-blue-500 to-cyan-600 flex items-center justify-center">
              <Mountain className="w-20 h-20 text-white/50" />
            </div>
            <div className="p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-2">{t.attractions.waterfalls}</h3>
              <p className="text-gray-600">{t.attractions.waterfallsDesc}</p>
            </div>
          </div>

          {/* Malecón */}
          <div className="bg-white rounded-xl overflow-hidden shadow-lg">
            <div className="h-48 bg-gradient-to-br from-green-500 to-teal-600 flex items-center justify-center">
              <MapPin className="w-20 h-20 text-white/50" />
            </div>
            <div className="p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-2">{t.attractions.malecon}</h3>
              <p className="text-gray-600">{t.attractions.maleconDesc}</p>
            </div>
          </div>

          {/* Jelen Tenka */}
          <div className="bg-white rounded-xl overflow-hidden shadow-lg">
            <div className="h-48 bg-gradient-to-br from-purple-500 to-pink-600 flex items-center justify-center">
              <Globe className="w-20 h-20 text-white/50" />
            </div>
            <div className="p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-2">{t.attractions.jelenTenka}</h3>
              <p className="text-gray-600">{t.attractions.jelenTenkaDesc}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
);

// ============================================
// CONTACT PAGE
// ============================================
const ContactPage = ({ t }) => (
  <div className="pt-20">
    {/* Hero */}
    <section className="bg-gradient-to-br from-green-800 to-green-900 text-white py-20">
      <div className="max-w-4xl mx-auto px-4 text-center">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">{t.contact.title}</h1>
        <p className="text-xl text-green-200">{t.contact.subtitle}</p>
      </div>
    </section>

    {/* Contact Info & Form */}
    <section className="py-20 bg-white">
      <div className="max-w-6xl mx-auto px-4">
        <div className="grid md:grid-cols-2 gap-12">
          {/* Contact Info */}
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-8">Hotel del Pacífico</h2>
            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <MapPin className="w-6 h-6 text-green-600 mt-1" />
                <div>
                  <h3 className="font-semibold text-gray-900">{t.contact.address}</h3>
                  <p className="text-gray-600">{HOTEL_INFO.address}</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <Phone className="w-6 h-6 text-green-600 mt-1" />
                <div>
                  <h3 className="font-semibold text-gray-900">{t.contact.phone}</h3>
                  <p className="text-gray-600">{HOTEL_INFO.phone}</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <Mail className="w-6 h-6 text-green-600 mt-1" />
                <div>
                  <h3 className="font-semibold text-gray-900">{t.contact.email}</h3>
                  <p className="text-gray-600">{HOTEL_INFO.email}</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <Clock className="w-6 h-6 text-green-600 mt-1" />
                <div>
                  <h3 className="font-semibold text-gray-900">{t.contact.hours}</h3>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="bg-gray-50 rounded-xl p-8">
            <form className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">{t.contact.form.name}</label>
                <input type="text" className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">{t.contact.form.email}</label>
                <input type="email" className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">{t.contact.form.message}</label>
                <textarea rows={4} className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent" />
              </div>
              <button type="submit" className="w-full bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors">
                {t.contact.form.send}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>

    {/* Map Placeholder */}
    <section className="h-96 bg-gray-200 flex items-center justify-center">
      <div className="text-center text-gray-500">
        <MapPin className="w-16 h-16 mx-auto mb-4" />
        <p>Google Maps - {HOTEL_INFO.address}</p>
      </div>
    </section>
  </div>
);

// ============================================
// MAIN APP COMPONENT
// ============================================
const HotelDelPacificoApp = () => {
  const [language, setLanguage] = useState('es');
  const t = translations[language];

  return (
    <div className="min-h-screen bg-white">
      <SEO 
        title="Hotel del Pacífico - Santo Domingo, Ecuador"
        description="Hotel del Pacífico: Tu oasis de tranquilidad en Santo Domingo de los Tsáchilas. 36 habitaciones, restaurante La Orquídea, business center, WiFi gratis, parking."
        keywords="hotel santo domingo, hotel ecuador, hotel del pacifico, alojamiento santo domingo, hotel tsachilas, la orquidea restaurante"
        image="https://www.hoteldelpacifico.com/images/hotel/hero.jpg"
        url="https://www.hoteldelpacifico.com"
        siteName="Hotel del Pacífico"
        locale="es_EC"
      />
      <URLSync />
      
      <Navigation language={language} setLanguage={setLanguage} t={t} />
      
      <Routes>
        <Route index element={<HomePage t={t} />} />
        <Route path="habitaciones" element={<RoomsPage t={t} />} />
        <Route path="precios" element={<PricesPage t={t} />} />
        <Route path="fotos" element={<PhotosPage t={t} />} />
        <Route path="restaurante" element={<RestaurantPage t={t} />} />
        <Route path="atractivos" element={<AttractionsPage t={t} />} />
        <Route path="contacto" element={<ContactPage t={t} />} />
        <Route path="*" element={<HomePage t={t} />} />
      </Routes>
      
      <Footer t={t} />
    </div>
  );
};

export default HotelDelPacificoApp;
