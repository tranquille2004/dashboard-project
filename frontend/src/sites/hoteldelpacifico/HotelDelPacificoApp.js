// Hotel del Pacifico - Santo Domingo, Ecuador
// Luxury Hotel Website with Classic Design

import React, { useState, useEffect } from 'react';
import { Routes, Route, Link, useLocation } from 'react-router-dom';
import { Menu, X, Phone, Mail, MapPin, Clock, Wifi, Tv, Wind, Car, Coffee, Users, Building, ChevronDown, Facebook, Instagram, Globe, Star, Utensils, Camera, Home as HomeIcon, DollarSign, Mountain, MessageCircle, Sparkles, Shield, Heart, Navigation as NavigationIcon } from 'lucide-react';
import SEO from '@/components/SEO';
import URLSync from '@/components/URLSync';
import { IMG } from '@/utils/imageHelper';

// ============================================
// TRANSLATIONS (keeping the same structure)
// ============================================
const translations = {
  es: {
    nav: {
      home: 'Inicio',
      rooms: 'Habitaciones',
      prices: 'Tarifas',
      photos: 'Galería',
      restaurant: 'Restaurante',
      attractions: 'Descubrir',
      contact: 'Contacto'
    },
    hero: {
      welcome: 'Bienvenidos a',
      title: 'Hotel del Pacífico',
      subtitle: 'Un oasis de tranquilidad y elegancia en el corazón de Santo Domingo de los Tsáchilas',
      cta: 'Reservar Ahora',
      explore: 'Descubrir Más'
    },
    home: {
      experience: 'Sobre Nosotros',
      experienceTitle: 'Una Excelente Opción de Alojamiento',
      experienceText: 'El Hotel del Pacífico es una excelente opción de alojamiento en la ciudad de Santo Domingo, ideal tanto para viajeros de negocios como para turistas que desean descubrir la región.',
      experienceText2: 'Pensado especialmente como un hotel de negocios, dispone de un moderno centro de negocios y una sala de conferencias equipada con tecnología audiovisual, perfecta para reuniones, capacitaciones y eventos corporativos.',
      experienceText3: 'A pesar de su ubicación estratégica en pleno centro de la ciudad, el interior del hotel se caracteriza por ser muy tranquilo, proporcionando un ambiente ideal para el descanso.',
      experienceText4: 'Gracias a su combinación de servicios, ubicación y comodidad, el Hotel del Pacífico se posiciona como un lugar ideal tanto para ejecutivos en viaje de trabajo como para turistas que desean explorar Santo Domingo y sus alrededores.',
      features: 'Nuestros Servicios Exclusivos',
      rooms36: '36 Habitaciones Confortables',
      roomsDesc: 'Habitaciones diseñadas para ofrecer descanso y funcionalidad en un ambiente acogedor',
      restaurant: 'Restaurante La Orquídea',
      restaurantDesc: 'Variedad de platos que combinan sabores locales, brindando una experiencia gastronómica completa',
      businessCenter: 'Centro de Negocios',
      businessDesc: 'Moderno centro de negocios y sala de conferencias equipada con tecnología audiovisual para reuniones y eventos corporativos',
      pastry: 'Pastelería Propia',
      pastryDesc: 'Tartas y bocadillos caseros elaborados diariamente, perfectos para cualquier momento del día',
      amenities: 'Comodidades Premium',
      wifi: 'WiFi de Alta Velocidad',
      ac: 'Climatización',
      tv: 'Smart TV',
      parking: 'Estacionamiento Privado',
      cleaning: 'Servicio de Habitación',
      location: 'Ubicación Privilegiada',
      locationText: 'Fácil acceso a la cultura Tsáchila, Bombolí con vistas panorámicas, restaurantes, bares, shopping, y cascadas cercanas',
      whyUs: '¿Por Qué Elegirnos?',
      reason1: 'Perfecto para Negocios y Turismo',
      reason1Desc: 'Ideal tanto para ejecutivos en viaje de trabajo como para turistas que desean explorar la región',
      reason2: 'Ubicación Estratégica',
      reason2Desc: 'En el corazón de Santo Domingo, punto de conexión privilegiado entre la Costa y la Sierra ecuatoriana',
      reason3: 'Servicios Completos',
      reason3Desc: 'Restaurante, pastelería propia, centro de negocios y sala de conferencias en un solo lugar'
    },
    rooms: {
      title: 'Nuestras Habitaciones',
      subtitle: 'Confort y funcionalidad en un ambiente acogedor',
      description: 'Este hotel de 3 estrellas cuenta con 36 cómodas habitaciones diseñadas para ofrecer descanso y funcionalidad',
      single: 'Habitación Clásica',
      singleDesc: 'Perfecta para viajeros individuales que buscan comodidad y tranquilidad',
      double: 'Habitación Superior',
      doubleDesc: 'Espaciosa y elegante, ideal para parejas o viajeros de negocios',
      suite: 'Suite Ejecutiva',
      suiteDesc: 'Nuestra opción más exclusiva con área de estar independiente',
      allInclude: 'Todas nuestras habitaciones incluyen:',
      features: ['Aire acondicionado', 'WiFi de alta velocidad', 'Smart TV', 'Baño privado', 'Servicio de limpieza diario', 'Agua caliente 24 horas', 'Amenities', 'Caja de seguridad']
    },
    prices: {
      title: 'Tarifas',
      subtitle: 'Inversión en su comodidad',
      perNight: 'por noche',
      includes: 'Todas las tarifas incluyen:',
      breakfast: 'Desayuno buffet',
      taxes: 'Impuestos',
      wifi: 'WiFi ilimitado',
      parking: 'Estacionamiento',
      contact: 'Solicitar Reserva'
    },
    photos: {
      title: 'Galería',
      subtitle: 'Descubra nuestros espacios'
    },
    restaurant: {
      title: 'Restaurante La Orquídea',
      subtitle: 'Una experiencia gastronómica completa',
      description: 'Nuestro restaurante ofrece una variedad de platos que combinan sabores locales, brindando una experiencia gastronómica completa sin necesidad de salir del hotel.',
      breakfast: 'Desayuno',
      breakfastTime: 'Horario próximamente',
      breakfastDesc: 'Comience su día con nuestro variado buffet de desayuno',
      lunch: 'Almuerzo',
      lunchTime: 'Horario próximamente',
      lunchDesc: 'Deléitese con nuestra selección de platos con sabores locales',
      dinner: 'Cena',
      dinnerTime: 'Horario próximamente',
      dinnerDesc: 'Una velada perfecta con nuestra carta variada',
      pastry: 'Pastelería Propia',
      pastryDesc: 'El hotel cuenta con una pastelería propia donde se elaboran tartas y bocadillos caseros, perfectos para disfrutar en cualquier momento del día.',
      banquet: 'Salón de Conferencias',
      banquetDesc: 'Sala de conferencias equipada con tecnología audiovisual, perfecta para reuniones, capacitaciones y eventos corporativos.'
    },
    attractions: {
      title: 'Descubra Santo Domingo',
      subtitle: 'La puerta de entrada a la costa ecuatoriana',
      intro: 'Santo Domingo de los Tsáchilas es una tierra de contrastes, donde la rica cultura indígena se mezcla con la exuberante naturaleza tropical. Permítanos guiarle hacia experiencias inolvidables.',
      tsachilas: 'Comunidad Tsáchila',
      tsachilasDesc: 'Sumérjase en la fascinante cultura de los Tsáchilas, conocidos como "Colorados" por su tradicional pintura de cabello con achiote. Una experiencia cultural auténtica y enriquecedora.',
      waterfalls: 'Cascadas Naturales',
      waterfallsDesc: 'Descubra impresionantes cascadas escondidas entre la exuberante vegetación tropical. Aventura y naturaleza en estado puro.',
      malecon: 'Malecón San Gabriel del Baba',
      maleconDesc: 'Disfrute de un paseo junto al río en este encantador malecón con áreas verdes, gastronomía local y espacios recreativos para toda la familia.',
      jelenTenka: 'Jelen Tenka',
      jelenTenkaDesc: 'Centro turístico que ofrece una inmersión completa en las tradiciones Tsáchilas: rituales ancestrales, gastronomía típica y conexión con la naturaleza.',
      bomboli: 'Bombolí',
      bomboliDesc: 'Sector conocido por sus vistas panorámicas, restaurantes y bares. También se encuentra el Bombolí Shopping para quienes buscan una experiencia de compras.',
      rivers: 'Ríos y Cascadas',
      riversDesc: 'Disfrute de la naturaleza en los ríos y cascadas cercanas, ideales para quienes buscan relajación o aventura en medio de la exuberante vegetación tropical.'
    },
    contact: {
      title: 'Contacto',
      subtitle: 'Estamos a su servicio',
      address: 'Dirección',
      phone: 'Teléfono',
      email: 'Correo Electrónico',
      hours: 'Recepción 24 horas',
      formTitle: 'Envíenos un mensaje',
      getDirections: 'Cómo llegar',
      viewOnMap: 'Ver en Google Maps',
      form: {
        name: 'Nombre completo',
        email: 'Correo electrónico',
        phone: 'Teléfono',
        message: 'Su mensaje',
        send: 'Enviar Mensaje'
      }
    },
    footer: {
      rights: 'Todos los derechos reservados',
      slogan: 'Su hogar lejos de casa en Santo Domingo'
    }
  },
  en: {
    nav: {
      home: 'Home',
      rooms: 'Rooms',
      prices: 'Rates',
      photos: 'Gallery',
      restaurant: 'Dining',
      attractions: 'Explore',
      contact: 'Contact'
    },
    hero: {
      welcome: 'Welcome to',
      title: 'Hotel del Pacífico',
      subtitle: 'An oasis of tranquility and elegance in the heart of Santo Domingo de los Tsáchilas',
      cta: 'Book Now',
      explore: 'Discover More'
    },
    home: {
      experience: 'The Experience',
      experienceTitle: 'Where Comfort Meets Elegance',
      experienceText: 'Located in the vibrant center of Santo Domingo de los Tsáchilas, Hotel del Pacífico offers a unique experience where modern comfort meets Ecuadorian warmth. Despite our central location, our guests enjoy a quiet and sophisticated atmosphere, away from the city bustle.',
      features: 'Our Exclusive Services',
      rooms36: '36 Luxury Rooms',
      roomsDesc: 'Spacious and elegant spaces with all amenities for a perfect stay',
      restaurant: 'La Orquídea Restaurant',
      restaurantDesc: 'Exceptional gastronomy with local and international flavors',
      businessCenter: 'Convention Center',
      businessDesc: 'Halls equipped with state-of-the-art audiovisual technology',
      pastry: 'Artisan Pastry Shop',
      pastryDesc: 'Homemade delights prepared daily by our master pastry chefs',
      amenities: 'Premium Amenities',
      wifi: 'High-Speed WiFi',
      ac: 'Climate Control',
      tv: 'Smart TV',
      parking: 'Private Parking',
      cleaning: 'Room Service',
      location: 'Privileged Location',
      locationText: 'In the heart of the city, yet with the serenity of a private retreat',
      whyUs: 'Why Choose Us?',
      reason1: 'Perfect for Business & Tourism',
      reason1Desc: 'Ideal for both business executives and tourists who want to explore the region',
      reason2: 'Strategic Location',
      reason2Desc: 'In the heart of Santo Domingo, a privileged connection point between the Coast and the Ecuadorian Highlands',
      reason3: 'Complete Services',
      reason3Desc: 'Restaurant, pastry shop, business center and conference room all in one place'
    },
    rooms: {
      title: 'Our Rooms',
      subtitle: 'Elegance and comfort in every detail',
      description: '36 rooms designed to provide you maximum comfort during your stay',
      single: 'Classic Room',
      singleDesc: 'Perfect for individual travelers seeking comfort and tranquility',
      double: 'Superior Room',
      doubleDesc: 'Spacious and elegant, ideal for couples or business travelers',
      suite: 'Executive Suite',
      suiteDesc: 'Our most exclusive option with separate living area',
      allInclude: 'All our rooms include:',
      features: ['Silent air conditioning', 'High-speed WiFi', 'Smart TV with streaming', 'Luxury private bathroom', 'Daily cleaning service', '24-hour hot water', 'Premium amenities', 'Safety box']
    },
    prices: {
      title: 'Rates',
      subtitle: 'Investment in your comfort',
      perNight: 'per night',
      includes: 'All rates include:',
      breakfast: 'Buffet breakfast',
      taxes: 'Taxes',
      wifi: 'Unlimited WiFi',
      parking: 'Parking',
      contact: 'Request Booking'
    },
    photos: {
      title: 'Gallery',
      subtitle: 'Discover our spaces'
    },
    restaurant: {
      title: 'La Orquídea Restaurant',
      subtitle: 'An unforgettable gastronomic experience',
      description: 'Our restaurant combines the best local ingredients with international culinary techniques, creating a gastronomic experience that will delight your palate.',
      breakfast: 'Breakfast',
      breakfastTime: 'Schedule coming soon',
      breakfastDesc: 'Start your day with our varied breakfast buffet',
      lunch: 'Lunch',
      lunchTime: 'Schedule coming soon',
      lunchDesc: 'Delight yourself with our selection of executive dishes',
      dinner: 'Dinner',
      dinnerTime: 'Schedule coming soon',
      dinnerDesc: 'A perfect evening with our gourmet menu',
      pastry: 'Artisan Pastry Shop',
      pastryDesc: 'Enjoy our exquisite creations: cakes, pastries, desserts and snacks prepared daily with select ingredients.',
      banquet: 'Event Hall',
      banquetDesc: 'Versatile space for corporate events, conferences and special celebrations. Equipped with state-of-the-art audiovisual technology and personalized catering service.'
    },
    attractions: {
      title: 'Discover Santo Domingo',
      subtitle: 'The gateway to the Ecuadorian coast',
      intro: 'Santo Domingo de los Tsáchilas is a land of contrasts, where rich indigenous culture blends with lush tropical nature. Let us guide you to unforgettable experiences.',
      tsachilas: 'Tsáchila Community',
      tsachilasDesc: 'Immerse yourself in the fascinating Tsáchila culture, known as "Colorados" for their traditional achiote hair painting. An authentic and enriching cultural experience.',
      waterfalls: 'Natural Waterfalls',
      waterfallsDesc: 'Discover impressive waterfalls hidden among lush tropical vegetation. Adventure and nature in its purest state.',
      malecon: 'San Gabriel del Baba Boardwalk',
      maleconDesc: 'Enjoy a riverside walk on this charming boardwalk with green areas, local gastronomy and recreational spaces for the whole family.',
      jelenTenka: 'Jelen Tenka',
      jelenTenkaDesc: 'Tourist center offering a complete immersion in Tsáchila traditions: ancestral rituals, typical gastronomy and connection with nature.',
      bomboli: 'Bombolí',
      bomboliDesc: 'Gastronomic zone in the heights of Santo Domingo with restaurants and bars offering spectacular panoramic views of the city. The perfect place for a romantic dinner or celebrating with friends.'
    },
    contact: {
      title: 'Contact',
      subtitle: 'At your service',
      address: 'Address',
      phone: 'Phone',
      email: 'Email',
      hours: '24-hour reception',
      formTitle: 'Send us a message',
      getDirections: 'Get Directions',
      viewOnMap: 'View on Google Maps',
      form: {
        name: 'Full name',
        email: 'Email',
        phone: 'Phone',
        message: 'Your message',
        send: 'Send Message'
      }
    },
    footer: {
      rights: 'All rights reserved',
      slogan: 'Your home away from home in Santo Domingo'
    }
  },
  fr: {
    nav: { home: 'Accueil', rooms: 'Chambres', prices: 'Tarifs', photos: 'Galerie', restaurant: 'Restaurant', attractions: 'Découvrir', contact: 'Contact' },
    hero: { welcome: 'Bienvenue au', title: 'Hotel del Pacífico', subtitle: 'Une oasis de tranquillité et d\'élégance au cœur de Santo Domingo de los Tsáchilas', cta: 'Réserver', explore: 'Découvrir' },
    home: { experience: 'L\'Expérience', experienceTitle: 'Où le Confort Rencontre l\'Élégance', experienceText: 'Situé au cœur vibrant de Santo Domingo de los Tsáchilas, l\'Hotel del Pacífico offre une expérience unique où le confort moderne rencontre la chaleur équatorienne.', features: 'Nos Services Exclusifs', rooms36: '36 Chambres de Luxe', roomsDesc: 'Espaces spacieux et élégants avec tout le confort', restaurant: 'Restaurant La Orquídea', restaurantDesc: 'Gastronomie exceptionnelle aux saveurs locales et internationales', businessCenter: 'Centre de Conférences', businessDesc: 'Salles équipées de technologie audiovisuelle', pastry: 'Pâtisserie Artisanale', pastryDesc: 'Délices maison préparés quotidiennement', amenities: 'Équipements Premium', wifi: 'WiFi Haut Débit', ac: 'Climatisation', tv: 'Smart TV', parking: 'Parking Privé', cleaning: 'Service de Chambre', location: 'Emplacement Privilégié', locationText: 'Au cœur de la ville, avec la sérénité d\'un refuge privé', whyUs: 'Pourquoi Nous Choisir?', reason1: 'Attention Personnalisée', reason1Desc: 'Notre équipe est dédiée à rendre votre séjour mémorable', reason2: 'Emplacement Stratégique', reason2Desc: 'À quelques minutes des principales attractions', reason3: 'Tranquillité Garantie', reason3Desc: 'Une oasis de paix au milieu de la ville' },
    rooms: { title: 'Nos Chambres', subtitle: 'Élégance et confort dans chaque détail', description: '36 chambres conçues pour votre confort', single: 'Chambre Classique', singleDesc: 'Parfaite pour les voyageurs individuels', double: 'Chambre Supérieure', doubleDesc: 'Spacieuse et élégante', suite: 'Suite Exécutive', suiteDesc: 'Notre option la plus exclusive', allInclude: 'Toutes nos chambres incluent:', features: ['Climatisation silencieuse', 'WiFi haut débit', 'Smart TV', 'Salle de bain privée', 'Nettoyage quotidien', 'Eau chaude 24h', 'Amenities premium', 'Coffre-fort'] },
    prices: { title: 'Tarifs', subtitle: 'Investissement dans votre confort', perNight: 'par nuit', includes: 'Tous les tarifs incluent:', breakfast: 'Petit-déjeuner buffet', taxes: 'Taxes', wifi: 'WiFi illimité', parking: 'Parking', contact: 'Demander une Réservation' },
    photos: { title: 'Galerie', subtitle: 'Découvrez nos espaces' },
    restaurant: { title: 'Restaurant La Orquídea', subtitle: 'Une expérience gastronomique inoubliable', description: 'Notre restaurant combine les meilleurs ingrédients locaux avec des techniques culinaires internationales.', breakfast: 'Petit-déjeuner', breakfastTime: 'Horaires à venir', breakfastDesc: 'Commencez votre journée avec notre buffet varié', lunch: 'Déjeuner', lunchTime: 'Horaires à venir', lunchDesc: 'Délectez-vous de notre sélection de plats', dinner: 'Dîner', dinnerTime: 'Horaires à venir', dinnerDesc: 'Une soirée parfaite avec notre menu gourmet', pastry: 'Pâtisserie Artisanale', pastryDesc: 'Profitez de nos créations exquises préparées quotidiennement.', banquet: 'Salle d\'Événements', banquetDesc: 'Espace polyvalent pour événements corporatifs et célébrations.' },
    attractions: { title: 'Découvrez Santo Domingo', subtitle: 'La porte d\'entrée de la côte équatorienne', intro: 'Santo Domingo de los Tsáchilas est une terre de contrastes.', tsachilas: 'Communauté Tsáchila', tsachilasDesc: 'Plongez dans la fascinante culture des Tsáchilas.', waterfalls: 'Cascades Naturelles', waterfallsDesc: 'Découvrez des cascades impressionnantes.', malecon: 'Malecón San Gabriel del Baba', maleconDesc: 'Profitez d\'une promenade au bord de la rivière.', jelenTenka: 'Jelen Tenka', jelenTenkaDesc: 'Centre touristique offrant une immersion complète.' },
    contact: { title: 'Contact', subtitle: 'À votre service', address: 'Adresse', phone: 'Téléphone', email: 'Email', hours: 'Réception 24h/24', formTitle: 'Envoyez-nous un message', getDirections: 'Itinéraire', viewOnMap: 'Voir sur Google Maps', form: { name: 'Nom complet', email: 'Email', phone: 'Téléphone', message: 'Votre message', send: 'Envoyer' } },
    footer: { rights: 'Tous droits réservés', slogan: 'Votre chez-vous loin de chez vous' }
  },
  it: {
    nav: { home: 'Home', rooms: 'Camere', prices: 'Tariffe', photos: 'Galleria', restaurant: 'Ristorante', attractions: 'Scoprire', contact: 'Contatto' },
    hero: { welcome: 'Benvenuti al', title: 'Hotel del Pacífico', subtitle: 'Un\'oasi di tranquillità ed eleganza nel cuore di Santo Domingo de los Tsáchilas', cta: 'Prenota Ora', explore: 'Scopri di Più' },
    home: { experience: 'L\'Esperienza', experienceTitle: 'Dove il Comfort Incontra l\'Eleganza', experienceText: 'Situato nel vivace centro di Santo Domingo de los Tsáchilas, l\'Hotel del Pacífico offre un\'esperienza unica dove il comfort moderno incontra il calore ecuadoriano.', features: 'I Nostri Servizi Esclusivi', rooms36: '36 Camere di Lusso', roomsDesc: 'Spazi ampi ed eleganti con tutti i comfort', restaurant: 'Ristorante La Orquídea', restaurantDesc: 'Gastronomia eccezionale con sapori locali e internazionali', businessCenter: 'Centro Congressi', businessDesc: 'Sale attrezzate con tecnologia audiovisiva', pastry: 'Pasticceria Artigianale', pastryDesc: 'Delizie fatte in casa preparate quotidianamente', amenities: 'Comfort Premium', wifi: 'WiFi ad Alta Velocità', ac: 'Climatizzazione', tv: 'Smart TV', parking: 'Parcheggio Privato', cleaning: 'Servizio in Camera', location: 'Posizione Privilegiata', locationText: 'Nel cuore della città, con la serenità di un rifugio privato', whyUs: 'Perché Sceglierci?', reason1: 'Attenzione Personalizzata', reason1Desc: 'Il nostro team è dedicato a rendere il vostro soggiorno memorabile', reason2: 'Posizione Strategica', reason2Desc: 'A pochi minuti dalle principali attrazioni', reason3: 'Tranquillità Garantita', reason3Desc: 'Un\'oasi di pace nel mezzo della città' },
    rooms: { title: 'Le Nostre Camere', subtitle: 'Eleganza e comfort in ogni dettaglio', description: '36 camere progettate per il massimo comfort', single: 'Camera Classica', singleDesc: 'Perfetta per viaggiatori individuali', double: 'Camera Superior', doubleDesc: 'Spaziosa ed elegante', suite: 'Suite Executive', suiteDesc: 'La nostra opzione più esclusiva', allInclude: 'Tutte le nostre camere includono:', features: ['Aria condizionata silenziosa', 'WiFi ad alta velocità', 'Smart TV', 'Bagno privato di lusso', 'Pulizia giornaliera', 'Acqua calda 24h', 'Amenities premium', 'Cassaforte'] },
    prices: { title: 'Tariffe', subtitle: 'Investimento nel vostro comfort', perNight: 'per notte', includes: 'Tutte le tariffe includono:', breakfast: 'Colazione a buffet', taxes: 'Tasse', wifi: 'WiFi illimitato', parking: 'Parcheggio', contact: 'Richiedi Prenotazione' },
    photos: { title: 'Galleria', subtitle: 'Scopri i nostri spazi' },
    restaurant: { title: 'Ristorante La Orquídea', subtitle: 'Un\'esperienza gastronomica indimenticabile', description: 'Il nostro ristorante combina i migliori ingredienti locali con tecniche culinarie internazionali.', breakfast: 'Colazione', breakfastTime: 'Orari in arrivo', breakfastDesc: 'Inizia la giornata con il nostro buffet', lunch: 'Pranzo', lunchTime: 'Orari in arrivo', lunchDesc: 'Deliziati con la nostra selezione', dinner: 'Cena', dinnerTime: 'Orari in arrivo', dinnerDesc: 'Una serata perfetta con il nostro menu gourmet', pastry: 'Pasticceria Artigianale', pastryDesc: 'Goditi le nostre creazioni squisite preparate quotidianamente.', banquet: 'Sala Eventi', banquetDesc: 'Spazio versatile per eventi aziendali e celebrazioni.' },
    attractions: { title: 'Scopri Santo Domingo', subtitle: 'La porta d\'ingresso alla costa ecuadoriana', intro: 'Santo Domingo de los Tsáchilas è una terra di contrasti.', tsachilas: 'Comunità Tsáchila', tsachilasDesc: 'Immergiti nell\'affascinante cultura dei Tsáchila.', waterfalls: 'Cascate Naturali', waterfallsDesc: 'Scopri cascate impressionanti.', malecon: 'Lungofiume San Gabriel del Baba', maleconDesc: 'Goditi una passeggiata lungo il fiume.', jelenTenka: 'Jelen Tenka', jelenTenkaDesc: 'Centro turistico con immersione completa nelle tradizioni.' },
    contact: { title: 'Contatto', subtitle: 'Al vostro servizio', address: 'Indirizzo', phone: 'Telefono', email: 'Email', hours: 'Reception 24 ore', formTitle: 'Inviaci un messaggio', getDirections: 'Indicazioni', viewOnMap: 'Vedi su Google Maps', form: { name: 'Nome completo', email: 'Email', phone: 'Telefono', message: 'Il tuo messaggio', send: 'Invia Messaggio' } },
    footer: { rights: 'Tutti i diritti riservati', slogan: 'La vostra casa lontano da casa' }
  },
  de: {
    nav: { home: 'Startseite', rooms: 'Zimmer', prices: 'Preise', photos: 'Galerie', restaurant: 'Restaurant', attractions: 'Entdecken', contact: 'Kontakt' },
    hero: { welcome: 'Willkommen im', title: 'Hotel del Pacífico', subtitle: 'Eine Oase der Ruhe und Eleganz im Herzen von Santo Domingo de los Tsáchilas', cta: 'Jetzt Buchen', explore: 'Mehr Entdecken' },
    home: { experience: 'Das Erlebnis', experienceTitle: 'Wo Komfort auf Eleganz Trifft', experienceText: 'Im pulsierenden Zentrum von Santo Domingo de los Tsáchilas gelegen, bietet das Hotel del Pacífico ein einzigartiges Erlebnis, bei dem moderner Komfort auf ecuadorianische Herzlichkeit trifft.', features: 'Unsere Exklusiven Services', rooms36: '36 Luxuszimmer', roomsDesc: 'Geräumige und elegante Räume mit allem Komfort', restaurant: 'Restaurant La Orquídea', restaurantDesc: 'Außergewöhnliche Gastronomie mit lokalen und internationalen Aromen', businessCenter: 'Kongresszentrum', businessDesc: 'Säle mit modernster audiovisueller Technik', pastry: 'Handwerkliche Konditorei', pastryDesc: 'Täglich frisch zubereitete hausgemachte Köstlichkeiten', amenities: 'Premium Ausstattung', wifi: 'Highspeed-WLAN', ac: 'Klimatisierung', tv: 'Smart TV', parking: 'Privatparkplatz', cleaning: 'Zimmerservice', location: 'Privilegierte Lage', locationText: 'Im Herzen der Stadt, mit der Ruhe eines privaten Refugiums', whyUs: 'Warum Uns Wählen?', reason1: 'Persönliche Betreuung', reason1Desc: 'Unser Team ist engagiert, Ihren Aufenthalt unvergesslich zu machen', reason2: 'Strategische Lage', reason2Desc: 'Minuten von den Hauptattraktionen entfernt', reason3: 'Garantierte Ruhe', reason3Desc: 'Eine Oase des Friedens inmitten der Stadt' },
    rooms: { title: 'Unsere Zimmer', subtitle: 'Eleganz und Komfort in jedem Detail', description: '36 Zimmer für maximalen Komfort', single: 'Klassisches Zimmer', singleDesc: 'Perfekt für Einzelreisende', double: 'Superior Zimmer', doubleDesc: 'Geräumig und elegant', suite: 'Executive Suite', suiteDesc: 'Unsere exklusivste Option', allInclude: 'Alle unsere Zimmer beinhalten:', features: ['Leise Klimaanlage', 'Highspeed-WLAN', 'Smart TV', 'Luxuriöses Privatbad', 'Tägliche Reinigung', '24h Warmwasser', 'Premium Amenities', 'Safe'] },
    prices: { title: 'Preise', subtitle: 'Investition in Ihren Komfort', perNight: 'pro Nacht', includes: 'Alle Preise beinhalten:', breakfast: 'Frühstücksbuffet', taxes: 'Steuern', wifi: 'Unbegrenztes WLAN', parking: 'Parkplatz', contact: 'Buchung Anfragen' },
    photos: { title: 'Galerie', subtitle: 'Entdecken Sie unsere Räume' },
    restaurant: { title: 'Restaurant La Orquídea', subtitle: 'Ein unvergessliches gastronomisches Erlebnis', description: 'Unser Restaurant kombiniert die besten lokalen Zutaten mit internationalen Kochtechniken.', breakfast: 'Frühstück', breakfastTime: 'Zeiten folgen', breakfastDesc: 'Starten Sie mit unserem vielfältigen Buffet', lunch: 'Mittagessen', lunchTime: 'Zeiten folgen', lunchDesc: 'Genießen Sie unsere Auswahl', dinner: 'Abendessen', dinnerTime: 'Zeiten folgen', dinnerDesc: 'Ein perfekter Abend mit unserem Gourmet-Menü', pastry: 'Handwerkliche Konditorei', pastryDesc: 'Genießen Sie unsere täglich frisch zubereiteten Kreationen.', banquet: 'Veranstaltungssaal', banquetDesc: 'Vielseitiger Raum für Firmenveranstaltungen und Feiern.' },
    attractions: { title: 'Entdecken Sie Santo Domingo', subtitle: 'Das Tor zur ecuadorianischen Küste', intro: 'Santo Domingo de los Tsáchilas ist ein Land der Kontraste.', tsachilas: 'Tsáchila-Gemeinschaft', tsachilasDesc: 'Tauchen Sie ein in die faszinierende Kultur der Tsáchila.', waterfalls: 'Natürliche Wasserfälle', waterfallsDesc: 'Entdecken Sie beeindruckende Wasserfälle.', malecon: 'Uferpromenade San Gabriel del Baba', maleconDesc: 'Genießen Sie einen Spaziergang am Fluss.', jelenTenka: 'Jelen Tenka', jelenTenkaDesc: 'Touristenzentrum mit vollständiger Immersion in die Traditionen.' },
    contact: { title: 'Kontakt', subtitle: 'Zu Ihren Diensten', address: 'Adresse', phone: 'Telefon', email: 'E-Mail', hours: '24-Stunden-Rezeption', formTitle: 'Senden Sie uns eine Nachricht', getDirections: 'Wegbeschreibung', viewOnMap: 'Auf Google Maps ansehen', form: { name: 'Vollständiger Name', email: 'E-Mail', phone: 'Telefon', message: 'Ihre Nachricht', send: 'Nachricht Senden' } },
    footer: { rights: 'Alle Rechte vorbehalten', slogan: 'Ihr Zuhause fernab von Zuhause' }
  }
};

// ============================================
// HOTEL INFO
// ============================================
const HOTEL_INFO = {
  name: 'Hotel del Pacífico',
  address: 'Av. 29 de Mayo entre Ibarra y Latacunga, Santo Domingo, Ecuador',
  phone: '+593 98 880 2941',
  phone2: '+593 2 275 2806',
  email: 'hotel.delpacifico@hotmail.com',
  website: 'www.hoteldelpacifico.com'
};

// ============================================
// LUXURY NAVIGATION COMPONENT
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
    { path: '', label: t.nav.home },
    { path: 'habitaciones', label: t.nav.rooms },
    { path: 'precios', label: t.nav.prices },
    { path: 'fotos', label: t.nav.photos },
    { path: 'restaurante', label: t.nav.restaurant },
    { path: 'atractivos', label: t.nav.attractions },
    { path: 'contacto', label: t.nav.contact }
  ];

  const languages = [
    { code: 'es', name: 'ES' },
    { code: 'en', name: 'EN' },
    { code: 'fr', name: 'FR' },
    { code: 'it', name: 'IT' },
    { code: 'de', name: 'DE' }
  ];

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${scrolled ? 'bg-white/95 backdrop-blur-md shadow-lg' : 'bg-gradient-to-b from-black/50 to-transparent'}`}>
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex justify-between items-center h-24">
          {/* Logo */}
          <Link to="" className="flex items-center">
            <img 
              src={IMG('/images/hoteldelpacifico/hotel-logo.png')} 
              alt="Hotel del Pacífico" 
              className="h-16 w-auto"
            />
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`text-sm tracking-wider uppercase transition-all duration-300 hover:text-amber-500 ${
                  scrolled ? 'text-gray-700' : 'text-white/90'
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Language Selector */}
          <div className="hidden lg:flex items-center gap-1 border-l border-white/20 pl-6 ml-6">
            {languages.map((lang, i) => (
              <React.Fragment key={lang.code}>
                <button
                  onClick={() => setLanguage(lang.code)}
                  className={`px-2 py-1 text-xs tracking-wider transition-all duration-300 ${
                    language === lang.code
                      ? scrolled ? 'text-amber-600 font-semibold' : 'text-amber-300 font-semibold'
                      : scrolled ? 'text-gray-500 hover:text-amber-600' : 'text-white/70 hover:text-white'
                  }`}
                >
                  {lang.name}
                </button>
                {i < languages.length - 1 && <span className={scrolled ? 'text-gray-300' : 'text-white/30'}>|</span>}
              </React.Fragment>
            ))}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className={`lg:hidden p-2 ${scrolled ? 'text-emerald-900' : 'text-white'}`}
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="lg:hidden bg-white border-t">
          <div className="px-6 py-6 space-y-1">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                onClick={() => setIsOpen(false)}
                className="block px-4 py-3 text-gray-700 hover:bg-emerald-50 hover:text-emerald-800 rounded-lg transition-colors text-sm tracking-wider uppercase"
              >
                {link.label}
              </Link>
            ))}
            <div className="flex gap-2 px-4 pt-4 border-t mt-4">
              {languages.map((lang) => (
                <button
                  key={lang.code}
                  onClick={() => { setLanguage(lang.code); setIsOpen(false); }}
                  className={`px-3 py-2 text-xs rounded ${
                    language === lang.code ? 'bg-emerald-800 text-white' : 'bg-gray-100 text-gray-700'
                  }`}
                >
                  {lang.name}
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
// LUXURY FOOTER COMPONENT
// ============================================
const Footer = ({ t }) => (
  <footer className="bg-emerald-800 text-white">
    {/* Main Footer */}
    <div className="max-w-7xl mx-auto px-6 lg:px-8 py-16">
      <div className="grid md:grid-cols-4 gap-12">
        {/* Brand */}
        <div className="md:col-span-1">
          <div className="mb-6">
            <img 
              src={IMG('/images/hoteldelpacifico/hotel-logo.png')} 
              alt="Hotel del Pacífico" 
              className="h-20 w-auto"
            />
          </div>
          <p className="text-emerald-100/70 text-sm leading-relaxed">{t.footer.slogan}</p>
          <div className="flex gap-4 mt-6">
            <a href="https://www.facebook.com/hoteldelpacifico.sd" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full border border-emerald-600 flex items-center justify-center text-emerald-200 hover:bg-amber-500 hover:border-amber-500 hover:text-white transition-all duration-300">
              <Facebook size={18} />
            </a>
            <a href="https://www.instagram.com/hoteldelpacifico.sd" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full border border-emerald-600 flex items-center justify-center text-emerald-200 hover:bg-amber-500 hover:border-amber-500 hover:text-white transition-all duration-300">
              <Instagram size={18} />
            </a>
          </div>
        </div>

        {/* Quick Links */}
        <div>
          <h4 className="text-amber-300 text-xs tracking-[0.2em] uppercase mb-6">Navegación</h4>
          <div className="space-y-3">
            <Link to="habitaciones" className="block text-emerald-100/70 hover:text-amber-300 transition-colors text-sm">{t.nav.rooms}</Link>
            <Link to="restaurante" className="block text-emerald-100/70 hover:text-amber-300 transition-colors text-sm">{t.nav.restaurant}</Link>
            <Link to="atractivos" className="block text-emerald-100/70 hover:text-amber-300 transition-colors text-sm">{t.nav.attractions}</Link>
            <Link to="contacto" className="block text-emerald-100/70 hover:text-amber-300 transition-colors text-sm">{t.nav.contact}</Link>
          </div>
        </div>

        {/* Contact */}
        <div>
          <h4 className="text-amber-300 text-xs tracking-[0.2em] uppercase mb-6">{t.contact.title}</h4>
          <div className="space-y-4 text-sm">
            <a 
              href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(HOTEL_INFO.address)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-start gap-3 text-emerald-100/70 hover:text-amber-300 transition-colors cursor-pointer"
            >
              <MapPin size={16} className="text-amber-300 mt-1 flex-shrink-0" />
              <span className="hover:underline">{HOTEL_INFO.address}</span>
            </a>
            <p className="flex items-center gap-3 text-emerald-100/70">
              <Phone size={16} className="text-amber-300" />
              {HOTEL_INFO.phone}
            </p>
            <p className="flex items-center gap-3 text-emerald-100/70">
              <Phone size={16} className="text-amber-300" />
              {HOTEL_INFO.phone2}
            </p>
            <p className="flex items-center gap-3 text-emerald-100/70">
              <Mail size={16} className="text-amber-300" />
              {HOTEL_INFO.email}
            </p>
          </div>
        </div>

        {/* Hours */}
        <div>
          <h4 className="text-amber-300 text-xs tracking-[0.2em] uppercase mb-6">{t.contact.hours}</h4>
          <div className="flex items-center gap-3 text-emerald-100/70 text-sm">
            <Clock size={16} className="text-amber-300" />
            <span>24/7</span>
          </div>
        </div>
      </div>
    </div>

    {/* Bottom Bar */}
    <div className="border-t border-emerald-700">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-6">
        <p className="text-center text-emerald-200/50 text-xs tracking-wider">
          © {new Date().getFullYear()} Hotel del Pacífico. {t.footer.rights}.
        </p>
        
        {/* Webmaster Contact */}
        <div className="mt-4 pt-4 border-t border-emerald-700/50 flex items-center justify-center gap-3 text-xs opacity-70 hover:opacity-100 transition-opacity">
          <a 
            href="https://wa.me/593989013622" 
            target="_blank" 
            rel="noopener noreferrer"
            className="flex items-center gap-3"
          >
            <img 
              src={IMG('/images/fworksbuilders-logo.png')}
              alt="fworksbuilders logo" 
              className="h-7 w-auto hover:opacity-80 transition-opacity"
            />
            <span className="text-emerald-200/70">Webmaster:</span>
            <span className="text-amber-300 hover:text-amber-200 transition-colors font-medium">
              fworksbuilders
            </span>
          </a>
        </div>
      </div>
    </div>
  </footer>
);

// ============================================
// DECORATIVE DIVIDER
// ============================================
const Divider = () => (
  <div className="flex items-center justify-center gap-4 py-2">
    <div className="w-16 h-px bg-gradient-to-r from-transparent to-amber-400" />
    <Sparkles className="w-4 h-4 text-amber-400" />
    <div className="w-16 h-px bg-gradient-to-l from-transparent to-amber-400" />
  </div>
);

// ============================================
// HOME PAGE - LUXURY VERSION
// ============================================
const HomePage = ({ t }) => (
  <div className="bg-amber-50/30">
    {/* Hero Section with Video Background */}
    <section className="relative h-screen flex items-center justify-center overflow-hidden">
      {/* Video Background */}
      <video 
        autoPlay 
        loop 
        muted 
        playsInline
        className="absolute inset-0 w-full h-full object-cover"
      >
        <source src={IMG('/images/hoteldelpacifico/hotel-video.mp4')} type="video/mp4" />
      </video>
      
      {/* Green Overlay Filter */}
      <div className="absolute inset-0 bg-emerald-900/70" />
      <div className="absolute inset-0 bg-gradient-to-b from-emerald-900/50 via-transparent to-emerald-900/70" />
      
      {/* Content */}
      <div className="relative z-10 text-center text-white px-6 max-w-4xl pt-16">
        <p className="text-amber-300 text-sm tracking-[0.4em] uppercase mb-4 animate-fade-in">{t.hero.welcome}</p>
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif mb-3 tracking-wide">{t.hero.title}</h1>
        
        {/* Large Hotel Logo */}
        <div className="flex justify-center my-4">
          <img 
            src={IMG('/images/hoteldelpacifico/hotel-logo.png')} 
            alt="Hotel del Pacífico" 
            className="h-40 md:h-52 lg:h-64 w-auto"
          />
        </div>
        
        <p className="text-lg md:text-xl text-emerald-100/80 max-w-2xl mx-auto leading-relaxed font-light">{t.hero.subtitle}</p>
        <div className="flex flex-wrap justify-center gap-4 mt-10">
          <Link to="contacto" className="bg-amber-500 hover:bg-amber-600 text-emerald-950 px-10 py-4 text-sm tracking-widest uppercase font-medium transition-all duration-300 hover:shadow-lg hover:shadow-amber-500/30">
            {t.hero.cta}
          </Link>
          <Link to="habitaciones" className="border border-white/30 hover:border-amber-400 hover:text-amber-300 text-white px-10 py-4 text-sm tracking-widest uppercase font-light transition-all duration-300">
            {t.hero.explore}
          </Link>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-white/50">
        <div className="w-px h-16 bg-gradient-to-b from-amber-400 to-transparent animate-pulse" />
      </div>
    </section>

    {/* Experience Section - About Us */}
    <section className="py-24 lg:py-32 bg-gradient-to-b from-white to-amber-50/50">
      <div className="max-w-5xl mx-auto px-6 lg:px-8">
        <div className="text-center mb-12">
          <p className="text-amber-600 text-xs tracking-[0.3em] uppercase mb-4">{t.home.experience}</p>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif text-emerald-800 mb-6">{t.home.experienceTitle}</h2>
          <Divider />
        </div>
        
        {/* Full Description Text */}
        <div className="space-y-6 text-gray-700 text-lg leading-relaxed">
          <p>{t.home.experienceText}</p>
          <p>{t.home.experienceText2}</p>
          <p>{t.home.experienceText3}</p>
          <p className="font-medium text-emerald-800">{t.home.experienceText4}</p>
        </div>
      </div>
    </section>

    {/* Services Section */}
    <section className="py-24 bg-emerald-800 text-white relative overflow-hidden">
      <div className="absolute inset-0 opacity-10" style={{backgroundImage: 'radial-gradient(circle at 2px 2px, rgba(255,255,255,0.15) 1px, transparent 0)', backgroundSize: '32px 32px'}} />
      <div className="max-w-6xl mx-auto px-6 lg:px-8 relative">
        <div className="text-center mb-16">
          <p className="text-amber-400 text-xs tracking-[0.3em] uppercase mb-4">{t.home.features}</p>
          <h2 className="text-3xl md:text-4xl font-serif">{t.home.features}</h2>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {[
            { icon: Building, title: t.home.rooms36, desc: t.home.roomsDesc },
            { icon: Utensils, title: t.home.restaurant, desc: t.home.restaurantDesc },
            { icon: Users, title: t.home.businessCenter, desc: t.home.businessDesc },
            { icon: Coffee, title: t.home.pastry, desc: t.home.pastryDesc }
          ].map((item, i) => (
            <div key={i} className="text-center group">
              <div className="w-20 h-20 mx-auto mb-6 border border-amber-400/30 rounded-full flex items-center justify-center group-hover:bg-amber-500 group-hover:border-amber-500 transition-all duration-500">
                <item.icon className="w-8 h-8 text-amber-400 group-hover:text-emerald-950 transition-colors duration-500" />
              </div>
              <h3 className="text-lg font-serif mb-3">{item.title}</h3>
              <p className="text-emerald-200/70 text-sm leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>

    {/* Amenities Strip */}
    <section className="py-16 bg-amber-50 border-y border-amber-200/50">
      <div className="max-w-6xl mx-auto px-6 lg:px-8">
        <div className="flex flex-wrap justify-center gap-8 md:gap-16">
          {[
            { icon: Wifi, label: t.home.wifi },
            { icon: Wind, label: t.home.ac },
            { icon: Tv, label: t.home.tv },
            { icon: Car, label: t.home.parking },
            { icon: Star, label: t.home.cleaning }
          ].map((item, i) => (
            <div key={i} className="flex items-center gap-3 text-emerald-800">
              <item.icon className="w-5 h-5 text-amber-600" />
              <span className="text-sm tracking-wide">{item.label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>

    {/* Why Choose Us */}
    <section className="py-24 bg-white">
      <div className="max-w-6xl mx-auto px-6 lg:px-8">
        <div className="text-center mb-16">
          <p className="text-amber-600 text-xs tracking-[0.3em] uppercase mb-4">{t.home.whyUs}</p>
          <h2 className="text-3xl md:text-4xl font-serif text-emerald-800">{t.home.whyUs}</h2>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {[
            { icon: Heart, title: t.home.reason1, desc: t.home.reason1Desc },
            { icon: MapPin, title: t.home.reason2, desc: t.home.reason2Desc },
            { icon: Shield, title: t.home.reason3, desc: t.home.reason3Desc }
          ].map((item, i) => (
            <div key={i} className="bg-gradient-to-b from-amber-50/50 to-white border border-amber-100 p-8 text-center hover:shadow-xl transition-shadow duration-500">
              <div className="w-16 h-16 mx-auto mb-6 bg-emerald-700 rounded-full flex items-center justify-center">
                <item.icon className="w-7 h-7 text-amber-300" />
              </div>
              <h3 className="text-xl font-serif text-emerald-800 mb-3">{item.title}</h3>
              <p className="text-gray-600 text-sm leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>

    {/* Location Banner */}
    <section className="py-20 bg-gradient-to-r from-emerald-700 to-emerald-800 text-white">
      <div className="max-w-4xl mx-auto px-6 text-center">
        <MapPin className="w-12 h-12 mx-auto mb-6 text-amber-300" />
        <h2 className="text-3xl font-serif mb-4">{t.home.location}</h2>
        <p className="text-emerald-100/80 text-lg mb-2">{t.home.locationText}</p>
        <a 
          href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(HOTEL_INFO.address)}`}
          target="_blank"
          rel="noopener noreferrer"
          className="text-amber-200 hover:text-amber-100 text-sm tracking-wide mt-4 inline-block hover:underline transition-colors"
        >
          {HOTEL_INFO.address}
        </a>
      </div>
    </section>
  </div>
);

// ============================================
// ROOMS PAGE - LUXURY VERSION
// ============================================
const RoomsPage = ({ t }) => (
  <div className="bg-amber-50/30 pt-24">
    {/* Hero */}
    <section className="py-20 bg-gradient-to-b from-emerald-800 to-emerald-700 text-white text-center">
      <p className="text-amber-300 text-xs tracking-[0.3em] uppercase mb-4">{t.nav.rooms}</p>
      <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif mb-4">{t.rooms.title}</h1>
      <Divider />
      <p className="text-emerald-100/70 mt-6 max-w-xl mx-auto">{t.rooms.subtitle}</p>
    </section>

    {/* Room Cards */}
    <section className="py-24 bg-gradient-to-b from-white to-amber-50/50">
      <div className="max-w-6xl mx-auto px-6">
        <p className="text-center text-gray-600 mb-16 max-w-2xl mx-auto">{t.rooms.description}</p>
        
        <div className="grid md:grid-cols-3 gap-8">
          {[
            { name: t.rooms.single, desc: t.rooms.singleDesc, price: '$0' },
            { name: t.rooms.double, desc: t.rooms.doubleDesc, price: '$0', featured: true },
            { name: t.rooms.suite, desc: t.rooms.suiteDesc, price: '$0' }
          ].map((room, i) => (
            <div key={i} className={`bg-white overflow-hidden shadow-lg hover:shadow-2xl transition-shadow duration-500 border ${room.featured ? 'border-amber-400 ring-1 ring-amber-400' : 'border-amber-100'}`}>
              <div className="h-56 bg-gradient-to-br from-amber-50 to-amber-100/50 flex items-center justify-center relative border-b border-amber-100">
                {room.featured && <div className="absolute top-4 right-4 bg-amber-500 text-white px-3 py-1 text-xs tracking-wider uppercase">Popular</div>}
                <Building className="w-16 h-16 text-emerald-600/30" />
              </div>
              <div className="p-8">
                <h3 className="text-2xl font-serif text-emerald-800 mb-2">{room.name}</h3>
                <p className="text-gray-500 text-sm mb-6">{room.desc}</p>
                <div className="flex items-baseline gap-2">
                  <span className="text-3xl font-serif text-amber-600">{room.price}</span>
                  <span className="text-gray-400 text-sm">/ {t.prices.perNight}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Amenities */}
        <div className="mt-20 bg-white p-10 shadow-lg border border-amber-100">
          <h3 className="text-2xl font-serif text-emerald-800 text-center mb-8">{t.rooms.allInclude}</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {t.rooms.features.map((feature, i) => (
              <div key={i} className="flex items-center gap-3">
                <div className="w-2 h-2 bg-amber-500 rounded-full" />
                <span className="text-gray-700 text-sm">{feature}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  </div>
);

// ============================================
// PRICES PAGE - LUXURY VERSION
// ============================================
const PricesPage = ({ t }) => (
  <div className="bg-amber-50/30 pt-24">
    <section className="py-20 bg-gradient-to-b from-emerald-800 to-emerald-700 text-white text-center">
      <p className="text-amber-300 text-xs tracking-[0.3em] uppercase mb-4">{t.nav.prices}</p>
      <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif mb-4">{t.prices.title}</h1>
      <Divider />
      <p className="text-emerald-100/70 mt-6">{t.prices.subtitle}</p>
    </section>

    <section className="py-24 bg-gradient-to-b from-white to-amber-50/50">
      <div className="max-w-6xl mx-auto px-6">
        {/* Price Cards */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          {[
            { 
              name: t.rooms.single, 
              price: '$0', 
              desc: t.rooms.singleDesc,
              features: ['WiFi', 'Smart TV', 'A/C', t.prices.breakfast]
            },
            { 
              name: t.rooms.double, 
              price: '$0', 
              desc: t.rooms.doubleDesc,
              featured: true,
              features: ['WiFi', 'Smart TV', 'A/C', t.prices.breakfast, 'Mini Bar']
            },
            { 
              name: t.rooms.suite, 
              price: '$0', 
              desc: t.rooms.suiteDesc,
              features: ['WiFi', 'Smart TV', 'A/C', t.prices.breakfast, 'Mini Bar', 'Jacuzzi']
            }
          ].map((room, i) => (
            <div key={i} className={`relative bg-white overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-500 ${room.featured ? 'ring-2 ring-amber-400 scale-105' : 'border border-amber-100'}`}>
              {room.featured && (
                <div className="absolute top-0 left-0 right-0 bg-amber-500 text-white text-center py-2 text-xs tracking-widest uppercase">
                  Popular
                </div>
              )}
              <div className={`p-8 ${room.featured ? 'pt-14' : ''}`}>
                <h3 className="text-2xl font-serif text-emerald-800 mb-2">{room.name}</h3>
                <p className="text-gray-500 text-sm mb-6">{room.desc}</p>
                
                <div className="border-t border-b border-amber-100 py-6 my-6">
                  <div className="text-center">
                    <span className="text-4xl font-serif text-amber-600">{room.price}</span>
                    <span className="text-gray-400 text-sm ml-2">/ {t.prices.perNight}</span>
                  </div>
                  <p className="text-center text-xs text-gray-400 mt-2 italic">Precio próximamente</p>
                </div>
                
                <ul className="space-y-3">
                  {room.features.map((feature, j) => (
                    <li key={j} className="flex items-center gap-3 text-sm text-gray-600">
                      <div className="w-5 h-5 rounded-full bg-emerald-100 flex items-center justify-center">
                        <Star className="w-3 h-3 text-emerald-600" />
                      </div>
                      {feature}
                    </li>
                  ))}
                </ul>
                
                <Link 
                  to="contacto" 
                  className={`block mt-8 text-center py-3 text-sm tracking-widest uppercase transition-colors ${
                    room.featured 
                      ? 'bg-amber-500 hover:bg-amber-600 text-white' 
                      : 'bg-emerald-700 hover:bg-emerald-600 text-white'
                  }`}
                >
                  {t.prices.contact}
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* What's Included */}
        <div className="bg-white border border-amber-100 shadow-lg p-10">
          <h3 className="font-serif text-emerald-800 text-2xl text-center mb-8">{t.prices.includes}</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { icon: Coffee, label: t.prices.breakfast },
              { icon: Wifi, label: t.prices.wifi },
              { icon: Car, label: t.prices.parking },
              { icon: Star, label: t.prices.taxes }
            ].map((item, i) => (
              <div key={i} className="flex flex-col items-center text-center p-4">
                <div className="w-14 h-14 rounded-full bg-amber-50 flex items-center justify-center mb-3">
                  <item.icon className="w-6 h-6 text-emerald-700" />
                </div>
                <span className="text-sm text-gray-700">{item.label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Special Notice */}
        <div className="mt-10 bg-emerald-50 border border-emerald-200 p-6 text-center">
          <p className="text-emerald-800 text-sm">
            <span className="font-medium">Nota:</span> Los precios serán actualizados próximamente. 
            Para consultas inmediatas, contáctenos directamente.
          </p>
        </div>
      </div>
    </section>
  </div>
);

// ============================================
// PHOTOS PAGE - LUXURY VERSION
// ============================================
const PhotosPage = ({ t }) => (
  <div className="bg-amber-50/30 pt-24">
    <section className="py-20 bg-gradient-to-b from-emerald-800 to-emerald-700 text-white text-center">
      <p className="text-amber-300 text-xs tracking-[0.3em] uppercase mb-4">{t.nav.photos}</p>
      <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif mb-4">{t.photos.title}</h1>
      <Divider />
      <p className="text-emerald-100/70 mt-6">{t.photos.subtitle}</p>
    </section>

    <section className="py-24 bg-gradient-to-b from-white to-amber-50/50">
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {[...Array(12)].map((_, i) => (
            <div key={i} className="aspect-square bg-gradient-to-br from-amber-50 to-amber-100/50 border border-amber-200/50 flex items-center justify-center group cursor-pointer overflow-hidden hover:shadow-lg transition-shadow">
              <Camera className="w-10 h-10 text-amber-400/50 group-hover:scale-110 transition-transform duration-500" />
            </div>
          ))}
        </div>
        <p className="text-center text-gray-400 mt-12 text-sm tracking-wider">Fotos próximamente / Photos coming soon</p>
      </div>
    </section>
  </div>
);

// ============================================
// RESTAURANT PAGE - LUXURY VERSION
// ============================================
const RestaurantPage = ({ t }) => (
  <div className="bg-amber-50/30 pt-24">
    <section className="py-12 bg-gradient-to-b from-emerald-800 to-emerald-700 text-white text-center">
      <p className="text-amber-300 text-xs tracking-[0.3em] uppercase mb-2">{t.nav.restaurant}</p>
      <div className="flex justify-center mb-2">
        <img 
          src={IMG('/images/hoteldelpacifico/la-orquidea-logo.png')} 
          alt="La Orquídea Café" 
          className="h-56 md:h-64 lg:h-80 w-auto"
        />
      </div>
      <Divider />
      <p className="text-emerald-100/70 mt-2 max-w-xl mx-auto">{t.restaurant.subtitle}</p>
    </section>

    <section className="py-24 bg-white">
      <div className="max-w-4xl mx-auto px-6 text-center">
        <p className="text-gray-600 text-lg leading-relaxed">{t.restaurant.description}</p>
      </div>
    </section>

    {/* Meal Times */}
    <section className="py-20 bg-gradient-to-b from-amber-50 to-white">
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid md:grid-cols-3 gap-8">
          {[
            { icon: Coffee, title: t.restaurant.breakfast, time: t.restaurant.breakfastTime, desc: t.restaurant.breakfastDesc },
            { icon: Utensils, title: t.restaurant.lunch, time: t.restaurant.lunchTime, desc: t.restaurant.lunchDesc },
            { icon: Sparkles, title: t.restaurant.dinner, time: t.restaurant.dinnerTime, desc: t.restaurant.dinnerDesc }
          ].map((meal, i) => (
            <div key={i} className="bg-white p-10 text-center shadow-md border border-amber-100 hover:shadow-xl transition-shadow">
              <div className="w-16 h-16 mx-auto mb-6 bg-emerald-700 rounded-full flex items-center justify-center">
                <meal.icon className="w-7 h-7 text-amber-300" />
              </div>
              <h3 className="text-xl font-serif text-emerald-800 mb-2">{meal.title}</h3>
              <p className="text-amber-600 text-sm mb-4">{meal.time}</p>
              <p className="text-gray-500 text-sm">{meal.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>

    {/* Pastry & Banquet */}
    <section className="py-24 bg-white">
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid md:grid-cols-2 gap-12">
          <div className="bg-amber-50 p-10 border border-amber-200">
            <h3 className="text-2xl font-serif text-emerald-800 mb-4">{t.restaurant.pastry}</h3>
            <p className="text-gray-600 leading-relaxed">{t.restaurant.pastryDesc}</p>
          </div>
          <div className="bg-gradient-to-br from-amber-50 to-white p-10 border border-amber-200">
            <h3 className="text-2xl font-serif text-emerald-800 mb-4">{t.restaurant.banquet}</h3>
            <p className="text-gray-600 leading-relaxed">{t.restaurant.banquetDesc}</p>
          </div>
        </div>
      </div>
    </section>
  </div>
);

// ============================================
// ATTRACTIONS PAGE - LUXURY VERSION
// ============================================
const AttractionsPage = ({ t }) => (
  <div className="bg-amber-50/50 pt-24">
    <section className="py-20 bg-gradient-to-b from-emerald-800 to-emerald-900 text-white text-center">
      <p className="text-amber-300 text-xs tracking-[0.3em] uppercase mb-4">{t.nav.attractions}</p>
      <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif mb-4">{t.attractions.title}</h1>
      <Divider />
      <p className="text-emerald-100/70 mt-6 max-w-xl mx-auto">{t.attractions.subtitle}</p>
    </section>

    <section className="py-16 bg-white">
      <div className="max-w-4xl mx-auto px-6 text-center">
        <p className="text-gray-600 text-lg leading-relaxed">{t.attractions.intro}</p>
      </div>
    </section>

    {/* Main Attractions */}
    <section className="py-24 bg-gradient-to-b from-amber-50 to-white">
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid md:grid-cols-2 gap-8">
          {[
            { 
              title: t.attractions.tsachilas, 
              desc: t.attractions.tsachilasDesc, 
              icon: Users,
              distance: '15-30 min',
              tip: 'Visita guiada recomendada',
              highlights: ['Cultura ancestral', 'Rituales tradicionales', 'Artesanías']
            },
            { 
              title: t.attractions.waterfalls, 
              desc: t.attractions.waterfallsDesc, 
              icon: Mountain,
              distance: '20-45 min',
              tip: 'Llevar ropa cómoda',
              highlights: ['Cascada del Diablo', 'Cascada Napac', 'Senderos naturales']
            },
            { 
              title: t.attractions.malecon, 
              desc: t.attractions.maleconDesc, 
              icon: MapPin,
              distance: '10 min',
              tip: 'Ideal para paseo al atardecer',
              highlights: ['Gastronomía local', 'Vista al río', 'Área recreativa']
            },
            { 
              title: t.attractions.jelenTenka, 
              desc: t.attractions.jelenTenkaDesc, 
              icon: Star,
              distance: '25 min',
              tip: 'Reservar con anticipación',
              highlights: ['Experiencia inmersiva', 'Comida típica', 'Naturaleza']
            },
            { 
              title: t.attractions.bomboli, 
              desc: t.attractions.bomboliDesc, 
              icon: Utensils,
              distance: '15 min',
              tip: 'Ideal para atardecer y noche',
              highlights: ['Restaurantes', 'Bares', 'Vista panorámica']
            }
          ].map((item, i) => (
            <div key={i} className="bg-white border border-amber-200/50 shadow-md hover:shadow-xl transition-all duration-500 group overflow-hidden">
              <div className="h-48 bg-gradient-to-br from-emerald-700 to-emerald-800 flex items-center justify-center relative">
                <div className="w-20 h-20 rounded-full bg-white/10 backdrop-blur flex items-center justify-center group-hover:scale-110 transition-transform duration-500">
                  <item.icon className="w-10 h-10 text-white" />
                </div>
                {/* Distance Badge */}
                <div className="absolute top-4 right-4 bg-amber-500 text-white px-3 py-1 text-xs tracking-wider">
                  {item.distance}
                </div>
              </div>
              <div className="p-8">
                <h3 className="text-xl font-serif text-emerald-800 mb-3">{item.title}</h3>
                <p className="text-gray-600 text-sm leading-relaxed mb-4">{item.desc}</p>
                
                {/* Highlights */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {item.highlights.map((h, j) => (
                    <span key={j} className="bg-amber-50 text-amber-700 px-3 py-1 text-xs rounded-full border border-amber-200">
                      {h}
                    </span>
                  ))}
                </div>
                
                {/* Tip */}
                <div className="flex items-center gap-2 text-emerald-700 text-xs mt-4 pt-4 border-t border-amber-100">
                  <Star className="w-4 h-4 text-amber-500" />
                  <span className="italic">{item.tip}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>

    {/* Travel Tips Section */}
    <section className="py-16 bg-emerald-800 text-white">
      <div className="max-w-4xl mx-auto px-6 text-center">
        <h3 className="text-2xl font-serif mb-6">Consejos para su Visita</h3>
        <div className="grid md:grid-cols-3 gap-8">
          <div className="p-4">
            <Clock className="w-8 h-8 mx-auto mb-3 text-amber-300" />
            <p className="text-sm text-emerald-100">Mejor época: Todo el año. Clima tropical durante todo el año.</p>
          </div>
          <div className="p-4">
            <Car className="w-8 h-8 mx-auto mb-3 text-amber-300" />
            <p className="text-sm text-emerald-100">Transporte: Podemos coordinar tours y transporte privado.</p>
          </div>
          <div className="p-4">
            <MessageCircle className="w-8 h-8 mx-auto mb-3 text-amber-300" />
            <p className="text-sm text-emerald-100">Consulte en recepción para información y reservas de tours.</p>
          </div>
        </div>
      </div>
    </section>

    {/* CTA Section */}
    <section className="py-16 bg-amber-50">
      <div className="max-w-4xl mx-auto px-6 text-center">
        <h3 className="text-2xl font-serif text-emerald-800 mb-4">¿Listo para Explorar?</h3>
        <p className="text-gray-600 mb-8">Nuestro equipo puede ayudarle a planificar sus excursiones</p>
        <Link 
          to="contacto" 
          className="inline-block bg-emerald-700 hover:bg-emerald-600 text-white px-10 py-4 text-sm tracking-widest uppercase transition-colors"
        >
          Contáctenos
        </Link>
      </div>
    </section>
  </div>
);

// ============================================
// CONTACT PAGE - LUXURY VERSION
// ============================================
const ContactPage = ({ t }) => (
  <div className="bg-amber-50/30 pt-24">
    <section className="py-20 bg-gradient-to-b from-emerald-800 to-emerald-700 text-white text-center">
      <p className="text-amber-300 text-xs tracking-[0.3em] uppercase mb-4">{t.nav.contact}</p>
      <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif mb-4">{t.contact.title}</h1>
      <Divider />
      <p className="text-emerald-100/70 mt-6">{t.contact.subtitle}</p>
    </section>

    <section className="py-24 bg-gradient-to-b from-white to-amber-50/50">
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-16">
          {/* Contact Info */}
          <div>
            <div className="mb-4">
              <span className="text-xs tracking-[0.3em] uppercase text-amber-600">Hotel</span>
              <h2 className="text-3xl font-serif text-emerald-800">del Pacífico</h2>
            </div>
            
            <div className="space-y-8 mt-10">
              <div className="flex items-start gap-5">
                <div className="w-12 h-12 bg-emerald-700 rounded-full flex items-center justify-center flex-shrink-0">
                  <MapPin className="w-5 h-5 text-amber-300" />
                </div>
                <div>
                  <h3 className="font-medium text-emerald-800 mb-1">{t.contact.address}</h3>
                  <a 
                    href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(HOTEL_INFO.address)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-600 hover:text-emerald-700 hover:underline transition-colors"
                  >
                    {HOTEL_INFO.address}
                  </a>
                </div>
              </div>
              
              <div className="flex items-start gap-5">
                <div className="w-12 h-12 bg-emerald-700 rounded-full flex items-center justify-center flex-shrink-0">
                  <Phone className="w-5 h-5 text-amber-300" />
                </div>
                <div>
                  <h3 className="font-medium text-emerald-800 mb-1">{t.contact.phone}</h3>
                  <p className="text-gray-600">{HOTEL_INFO.phone}</p>
                  <p className="text-gray-600">{HOTEL_INFO.phone2}</p>
                </div>
              </div>
              
              <div className="flex items-start gap-5">
                <div className="w-12 h-12 bg-emerald-700 rounded-full flex items-center justify-center flex-shrink-0">
                  <Mail className="w-5 h-5 text-amber-300" />
                </div>
                <div>
                  <h3 className="font-medium text-emerald-800 mb-1">{t.contact.email}</h3>
                  <p className="text-gray-600">{HOTEL_INFO.email}</p>
                </div>
              </div>
              
              <div className="flex items-start gap-5">
                <div className="w-12 h-12 bg-emerald-700 rounded-full flex items-center justify-center flex-shrink-0">
                  <Clock className="w-5 h-5 text-amber-300" />
                </div>
                <div>
                  <h3 className="font-medium text-emerald-800 mb-1">{t.contact.hours}</h3>
                  <p className="text-gray-600">24/7</p>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="bg-white p-10 shadow-xl border border-amber-100">
            <h3 className="text-xl font-serif text-emerald-800 mb-8">{t.contact.formTitle}</h3>
            <form className="space-y-6">
              <div>
                <label className="block text-sm text-gray-600 mb-2">{t.contact.form.name}</label>
                <input type="text" className="w-full px-4 py-3 border border-amber-200 focus:border-amber-400 focus:ring-1 focus:ring-amber-400 outline-none transition-colors bg-amber-50/30" />
              </div>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm text-gray-600 mb-2">{t.contact.form.email}</label>
                  <input type="email" className="w-full px-4 py-3 border border-amber-200 focus:border-amber-400 focus:ring-1 focus:ring-amber-400 outline-none transition-colors bg-amber-50/30" />
                </div>
                <div>
                  <label className="block text-sm text-gray-600 mb-2">{t.contact.form.phone}</label>
                  <input type="tel" className="w-full px-4 py-3 border border-amber-200 focus:border-amber-400 focus:ring-1 focus:ring-amber-400 outline-none transition-colors bg-amber-50/30" />
                </div>
              </div>
              <div>
                <label className="block text-sm text-gray-600 mb-2">{t.contact.form.message}</label>
                <textarea rows={5} className="w-full px-4 py-3 border border-amber-200 focus:border-amber-400 focus:ring-1 focus:ring-amber-400 outline-none transition-colors resize-none bg-amber-50/30" />
              </div>
              <button type="submit" className="w-full bg-emerald-700 hover:bg-emerald-600 text-white py-4 text-sm tracking-widest uppercase transition-colors">
                {t.contact.form.send}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>

    {/* Google Maps Section */}
    <section className="relative">
      {/* Map Embed */}
      <div className="h-96 w-full">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3989.7925!2d-79.1719!3d-0.2522!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x91d54e9c7f8f8f8f%3A0x0!2sAv.%2029%20de%20Mayo%2C%20Santo%20Domingo%2C%20Ecuador!5e0!3m2!1ses!2sec!4v1699999999999!5m2!1ses!2sec"
          width="100%"
          height="100%"
          style={{ border: 0 }}
          allowFullScreen=""
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          title="Hotel del Pacífico Location"
          className="grayscale-[30%] contrast-[1.1]"
        />
      </div>
      
      {/* Directions Button Overlay */}
      <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex flex-col sm:flex-row gap-3">
        <a
          href={`https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(HOTEL_INFO.address)}`}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 bg-emerald-700 hover:bg-emerald-600 text-white px-6 py-3 shadow-lg transition-colors"
        >
          <NavigationIcon className="w-5 h-5" />
          <span className="text-sm font-medium tracking-wide">{t.contact.getDirections}</span>
        </a>
        <a
          href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(HOTEL_INFO.address)}`}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 bg-white hover:bg-amber-50 text-emerald-800 border border-emerald-700 px-6 py-3 shadow-lg transition-colors"
        >
          <MapPin className="w-5 h-5" />
          <span className="text-sm font-medium tracking-wide">{t.contact.viewOnMap}</span>
        </a>
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
    <div className="min-h-screen">
      <SEO 
        title="Hotel del Pacífico - Santo Domingo, Ecuador | Hotel de Lujo"
        description="Hotel del Pacífico: Su oasis de tranquilidad y elegancia en Santo Domingo de los Tsáchilas. 36 habitaciones de lujo, restaurante La Orquídea, centro de convenciones. Reservas: info@hoteldelpacifico.com"
        keywords="hotel santo domingo, hotel ecuador, hotel del pacifico, hotel de lujo ecuador, alojamiento santo domingo, hotel tsachilas, la orquidea restaurante, hotel centro santo domingo"
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
