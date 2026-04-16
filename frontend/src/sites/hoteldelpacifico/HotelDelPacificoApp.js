// Hotel del Pacifico - Santo Domingo, Ecuador
// Luxury Hotel Website with Classic Design

import React, { useState, useEffect } from 'react';
import { Routes, Route, Link, useLocation } from 'react-router-dom';
import { Menu, X, Phone, Mail, MapPin, Clock, Wifi, Tv, Wind, Car, Coffee, Users, Building, ChevronDown, Facebook, Instagram, Globe, Star, Utensils, Camera, Home as HomeIcon, DollarSign, Mountain, MessageCircle, Sparkles, Shield, Heart, Navigation as NavigationIcon, ShoppingBag } from 'lucide-react';
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
      contact: 'Contacto',
      events: 'Eventos'
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
      features: ['Aire acondicionado', 'WiFi de alta velocidad', 'Smart TV', 'Baño privado', 'Servicio de limpieza diario', 'Agua caliente 24 horas', 'Amenities']
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
      pastryGalleryTitle: 'Nuestra Especialidad',
      pastryGallerySubtitle: 'Descubra nuestra exquisita selección de postres y creaciones artesanales, elaborados diariamente con los mejores ingredientes.',
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
    events: {
      title: 'Eventos Especiales',
      subtitle: 'Experiencias únicas en Hotel del Pacífico',
      upcoming: 'Próximos Eventos',
      past: 'Eventos Pasados',
      noEvents: 'No hay eventos programados en este momento. ¡Vuelve pronto!',
      date: 'Fecha',
      time: 'Hora',
      location: 'Lugar',
      price: 'Valor',
      reserve: 'Reservar Lugar',
      limitedSpots: 'Cupos limitados'
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
      contact: 'Contact',
      events: 'Events'
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
      features: ['Silent air conditioning', 'High-speed WiFi', 'Smart TV with streaming', 'Luxury private bathroom', 'Daily cleaning service', '24-hour hot water', 'Premium amenities']
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
      pastryGalleryTitle: 'Our Specialty',
      pastryGallerySubtitle: 'Discover our exquisite selection of desserts and artisan creations, made daily with the finest ingredients.',
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
    events: {
      title: 'Special Events',
      subtitle: 'Unique experiences at Hotel del Pacífico',
      upcoming: 'Upcoming Events',
      past: 'Past Events',
      noEvents: 'No events scheduled at this time. Check back soon!',
      date: 'Date',
      time: 'Time',
      location: 'Location',
      price: 'Price',
      reserve: 'Reserve Your Spot',
      limitedSpots: 'Limited spots'
    },
    footer: {
      rights: 'All rights reserved',
      slogan: 'Your home away from home in Santo Domingo'
    }
  },
  fr: {
    nav: { home: 'Accueil', rooms: 'Chambres', prices: 'Tarifs', photos: 'Galerie', restaurant: 'Restaurant', attractions: 'Découvrir', contact: 'Contact', events: 'Événements' },
    hero: { welcome: 'Bienvenue au', title: 'Hotel del Pacífico', subtitle: 'Une oasis de tranquillité et d\'élégance au cœur de Santo Domingo de los Tsáchilas', cta: 'Réserver', explore: 'Découvrir' },
    home: { experience: 'L\'Expérience', experienceTitle: 'Où le Confort Rencontre l\'Élégance', experienceText: 'Situé au cœur vibrant de Santo Domingo de los Tsáchilas, l\'Hotel del Pacífico offre une expérience unique où le confort moderne rencontre la chaleur équatorienne.', features: 'Nos Services Exclusifs', rooms36: '36 Chambres de Luxe', roomsDesc: 'Espaces spacieux et élégants avec tout le confort', restaurant: 'Restaurant La Orquídea', restaurantDesc: 'Gastronomie exceptionnelle aux saveurs locales et internationales', businessCenter: 'Centre de Conférences', businessDesc: 'Salles équipées de technologie audiovisuelle', pastry: 'Pâtisserie Artisanale', pastryDesc: 'Délices maison préparés quotidiennement', amenities: 'Équipements Premium', wifi: 'WiFi Haut Débit', ac: 'Climatisation', tv: 'Smart TV', parking: 'Parking Privé', cleaning: 'Service de Chambre', location: 'Emplacement Privilégié', locationText: 'Au cœur de la ville, avec la sérénité d\'un refuge privé', whyUs: 'Pourquoi Nous Choisir?', reason1: 'Attention Personnalisée', reason1Desc: 'Notre équipe est dédiée à rendre votre séjour mémorable', reason2: 'Emplacement Stratégique', reason2Desc: 'À quelques minutes des principales attractions', reason3: 'Tranquillité Garantie', reason3Desc: 'Une oasis de paix au milieu de la ville' },
    rooms: { title: 'Nos Chambres', subtitle: 'Élégance et confort dans chaque détail', description: '36 chambres conçues pour votre confort', single: 'Chambre Classique', singleDesc: 'Parfaite pour les voyageurs individuels', double: 'Chambre Supérieure', doubleDesc: 'Spacieuse et élégante', suite: 'Suite Exécutive', suiteDesc: 'Notre option la plus exclusive', allInclude: 'Toutes nos chambres incluent:', features: ['Climatisation silencieuse', 'WiFi haut débit', 'Smart TV', 'Salle de bain privée', 'Nettoyage quotidien', 'Eau chaude 24h', 'Amenities premium'] },
    prices: { title: 'Tarifs', subtitle: 'Investissement dans votre confort', perNight: 'par nuit', includes: 'Tous les tarifs incluent:', breakfast: 'Petit-déjeuner buffet', taxes: 'Taxes', wifi: 'WiFi illimité', parking: 'Parking', contact: 'Demander une Réservation' },
    photos: { title: 'Galerie', subtitle: 'Découvrez nos espaces' },
    restaurant: { title: 'Restaurant La Orquídea', subtitle: 'Une expérience gastronomique inoubliable', description: 'Notre restaurant combine les meilleurs ingrédients locaux avec des techniques culinaires internationales.', breakfast: 'Petit-déjeuner', breakfastTime: 'Horaires à venir', breakfastDesc: 'Commencez votre journée avec notre buffet varié', lunch: 'Déjeuner', lunchTime: 'Horaires à venir', lunchDesc: 'Délectez-vous de notre sélection de plats', dinner: 'Dîner', dinnerTime: 'Horaires à venir', dinnerDesc: 'Une soirée parfaite avec notre menu gourmet', pastry: 'Pâtisserie Artisanale', pastryDesc: 'Profitez de nos créations exquises préparées quotidiennement.', banquet: 'Salle d\'Événements', banquetDesc: 'Espace polyvalent pour événements corporatifs et célébrations.' },
    attractions: { title: 'Découvrez Santo Domingo', subtitle: 'La porte d\'entrée de la côte équatorienne', intro: 'Santo Domingo de los Tsáchilas est une terre de contrastes.', tsachilas: 'Communauté Tsáchila', tsachilasDesc: 'Plongez dans la fascinante culture des Tsáchilas.', waterfalls: 'Cascades Naturelles', waterfallsDesc: 'Découvrez des cascades impressionnantes.', malecon: 'Malecón San Gabriel del Baba', maleconDesc: 'Profitez d\'une promenade au bord de la rivière.', jelenTenka: 'Jelen Tenka', jelenTenkaDesc: 'Centre touristique offrant une immersion complète.' },
    contact: { title: 'Contact', subtitle: 'À votre service', address: 'Adresse', phone: 'Téléphone', email: 'Email', hours: 'Réception 24h/24', formTitle: 'Envoyez-nous un message', getDirections: 'Itinéraire', viewOnMap: 'Voir sur Google Maps', form: { name: 'Nom complet', email: 'Email', phone: 'Téléphone', message: 'Votre message', send: 'Envoyer' } },
    footer: { rights: 'Tous droits réservés', slogan: 'Votre chez-vous loin de chez vous' },
    events: { title: 'Événements Spéciaux', subtitle: 'Expériences uniques à l\'Hotel del Pacífico', upcoming: 'Événements à Venir', past: 'Événements Passés', noEvents: 'Aucun événement programmé pour le moment.', date: 'Date', time: 'Heure', location: 'Lieu', price: 'Prix', reserve: 'Réserver', limitedSpots: 'Places limitées' }
  },
  it: {
    nav: { home: 'Home', rooms: 'Camere', prices: 'Tariffe', photos: 'Galleria', restaurant: 'Ristorante', attractions: 'Scoprire', contact: 'Contatto', events: 'Eventi' },
    hero: { welcome: 'Benvenuti al', title: 'Hotel del Pacífico', subtitle: 'Un\'oasi di tranquillità ed eleganza nel cuore di Santo Domingo de los Tsáchilas', cta: 'Prenota Ora', explore: 'Scopri di Più' },
    home: { experience: 'L\'Esperienza', experienceTitle: 'Dove il Comfort Incontra l\'Eleganza', experienceText: 'Situato nel vivace centro di Santo Domingo de los Tsáchilas, l\'Hotel del Pacífico offre un\'esperienza unica dove il comfort moderno incontra il calore ecuadoriano.', features: 'I Nostri Servizi Esclusivi', rooms36: '36 Camere di Lusso', roomsDesc: 'Spazi ampi ed eleganti con tutti i comfort', restaurant: 'Ristorante La Orquídea', restaurantDesc: 'Gastronomia eccezionale con sapori locali e internazionali', businessCenter: 'Centro Congressi', businessDesc: 'Sale attrezzate con tecnologia audiovisiva', pastry: 'Pasticceria Artigianale', pastryDesc: 'Delizie fatte in casa preparate quotidianamente', amenities: 'Comfort Premium', wifi: 'WiFi ad Alta Velocità', ac: 'Climatizzazione', tv: 'Smart TV', parking: 'Parcheggio Privato', cleaning: 'Servizio in Camera', location: 'Posizione Privilegiata', locationText: 'Nel cuore della città, con la serenità di un rifugio privato', whyUs: 'Perché Sceglierci?', reason1: 'Attenzione Personalizzata', reason1Desc: 'Il nostro team è dedicato a rendere il vostro soggiorno memorabile', reason2: 'Posizione Strategica', reason2Desc: 'A pochi minuti dalle principali attrazioni', reason3: 'Tranquillità Garantita', reason3Desc: 'Un\'oasi di pace nel mezzo della città' },
    rooms: { title: 'Le Nostre Camere', subtitle: 'Eleganza e comfort in ogni dettaglio', description: '36 camere progettate per il massimo comfort', single: 'Camera Classica', singleDesc: 'Perfetta per viaggiatori individuali', double: 'Camera Superior', doubleDesc: 'Spaziosa ed elegante', suite: 'Suite Executive', suiteDesc: 'La nostra opzione più esclusiva', allInclude: 'Tutte le nostre camere includono:', features: ['Aria condizionata silenziosa', 'WiFi ad alta velocità', 'Smart TV', 'Bagno privato di lusso', 'Pulizia giornaliera', 'Acqua calda 24h', 'Amenities premium'] },
    prices: { title: 'Tariffe', subtitle: 'Investimento nel vostro comfort', perNight: 'per notte', includes: 'Tutte le tariffe includono:', breakfast: 'Colazione a buffet', taxes: 'Tasse', wifi: 'WiFi illimitato', parking: 'Parcheggio', contact: 'Richiedi Prenotazione' },
    photos: { title: 'Galleria', subtitle: 'Scopri i nostri spazi' },
    restaurant: { title: 'Ristorante La Orquídea', subtitle: 'Un\'esperienza gastronomica indimenticabile', description: 'Il nostro ristorante combina i migliori ingredienti locali con tecniche culinarie internazionali.', breakfast: 'Colazione', breakfastTime: 'Orari in arrivo', breakfastDesc: 'Inizia la giornata con il nostro buffet', lunch: 'Pranzo', lunchTime: 'Orari in arrivo', lunchDesc: 'Deliziati con la nostra selezione', dinner: 'Cena', dinnerTime: 'Orari in arrivo', dinnerDesc: 'Una serata perfetta con il nostro menu gourmet', pastry: 'Pasticceria Artigianale', pastryDesc: 'Goditi le nostre creazioni squisite preparate quotidianamente.', banquet: 'Sala Eventi', banquetDesc: 'Spazio versatile per eventi aziendali e celebrazioni.' },
    attractions: { title: 'Scopri Santo Domingo', subtitle: 'La porta d\'ingresso alla costa ecuadoriana', intro: 'Santo Domingo de los Tsáchilas è una terra di contrasti.', tsachilas: 'Comunità Tsáchila', tsachilasDesc: 'Immergiti nell\'affascinante cultura dei Tsáchila.', waterfalls: 'Cascate Naturali', waterfallsDesc: 'Scopri cascate impressionanti.', malecon: 'Lungofiume San Gabriel del Baba', maleconDesc: 'Goditi una passeggiata lungo il fiume.', jelenTenka: 'Jelen Tenka', jelenTenkaDesc: 'Centro turistico con immersione completa nelle tradizioni.' },
    contact: { title: 'Contatto', subtitle: 'Al vostro servizio', address: 'Indirizzo', phone: 'Telefono', email: 'Email', hours: 'Reception 24 ore', formTitle: 'Inviaci un messaggio', getDirections: 'Indicazioni', viewOnMap: 'Vedi su Google Maps', form: { name: 'Nome completo', email: 'Email', phone: 'Telefono', message: 'Il tuo messaggio', send: 'Invia Messaggio' } },
    footer: { rights: 'Tutti i diritti riservati', slogan: 'La vostra casa lontano da casa' },
    events: { title: 'Eventi Speciali', subtitle: 'Esperienze uniche all\'Hotel del Pacífico', upcoming: 'Prossimi Eventi', past: 'Eventi Passati', noEvents: 'Nessun evento in programma al momento.', date: 'Data', time: 'Ora', location: 'Luogo', price: 'Prezzo', reserve: 'Prenota', limitedSpots: 'Posti limitati' }
  },
  de: {
    nav: { home: 'Startseite', rooms: 'Zimmer', prices: 'Preise', photos: 'Galerie', restaurant: 'Restaurant', attractions: 'Entdecken', contact: 'Kontakt', events: 'Events' },
    hero: { welcome: 'Willkommen im', title: 'Hotel del Pacífico', subtitle: 'Eine Oase der Ruhe und Eleganz im Herzen von Santo Domingo de los Tsáchilas', cta: 'Jetzt Buchen', explore: 'Mehr Entdecken' },
    home: { experience: 'Das Erlebnis', experienceTitle: 'Wo Komfort auf Eleganz Trifft', experienceText: 'Im pulsierenden Zentrum von Santo Domingo de los Tsáchilas gelegen, bietet das Hotel del Pacífico ein einzigartiges Erlebnis, bei dem moderner Komfort auf ecuadorianische Herzlichkeit trifft.', features: 'Unsere Exklusiven Services', rooms36: '36 Luxuszimmer', roomsDesc: 'Geräumige und elegante Räume mit allem Komfort', restaurant: 'Restaurant La Orquídea', restaurantDesc: 'Außergewöhnliche Gastronomie mit lokalen und internationalen Aromen', businessCenter: 'Kongresszentrum', businessDesc: 'Säle mit modernster audiovisueller Technik', pastry: 'Handwerkliche Konditorei', pastryDesc: 'Täglich frisch zubereitete hausgemachte Köstlichkeiten', amenities: 'Premium Ausstattung', wifi: 'Highspeed-WLAN', ac: 'Klimatisierung', tv: 'Smart TV', parking: 'Privatparkplatz', cleaning: 'Zimmerservice', location: 'Privilegierte Lage', locationText: 'Im Herzen der Stadt, mit der Ruhe eines privaten Refugiums', whyUs: 'Warum Uns Wählen?', reason1: 'Persönliche Betreuung', reason1Desc: 'Unser Team ist engagiert, Ihren Aufenthalt unvergesslich zu machen', reason2: 'Strategische Lage', reason2Desc: 'Minuten von den Hauptattraktionen entfernt', reason3: 'Garantierte Ruhe', reason3Desc: 'Eine Oase des Friedens inmitten der Stadt' },
    rooms: { title: 'Unsere Zimmer', subtitle: 'Eleganz und Komfort in jedem Detail', description: '36 Zimmer für maximalen Komfort', single: 'Klassisches Zimmer', singleDesc: 'Perfekt für Einzelreisende', double: 'Superior Zimmer', doubleDesc: 'Geräumig und elegant', suite: 'Executive Suite', suiteDesc: 'Unsere exklusivste Option', allInclude: 'Alle unsere Zimmer beinhalten:', features: ['Leise Klimaanlage', 'Highspeed-WLAN', 'Smart TV', 'Luxuriöses Privatbad', 'Tägliche Reinigung', '24h Warmwasser', 'Premium Amenities'] },
    prices: { title: 'Preise', subtitle: 'Investition in Ihren Komfort', perNight: 'pro Nacht', includes: 'Alle Preise beinhalten:', breakfast: 'Frühstücksbuffet', taxes: 'Steuern', wifi: 'Unbegrenztes WLAN', parking: 'Parkplatz', contact: 'Buchung Anfragen' },
    photos: { title: 'Galerie', subtitle: 'Entdecken Sie unsere Räume' },
    restaurant: { title: 'Restaurant La Orquídea', subtitle: 'Ein unvergessliches gastronomisches Erlebnis', description: 'Unser Restaurant kombiniert die besten lokalen Zutaten mit internationalen Kochtechniken.', breakfast: 'Frühstück', breakfastTime: 'Zeiten folgen', breakfastDesc: 'Starten Sie mit unserem vielfältigen Buffet', lunch: 'Mittagessen', lunchTime: 'Zeiten folgen', lunchDesc: 'Genießen Sie unsere Auswahl', dinner: 'Abendessen', dinnerTime: 'Zeiten folgen', dinnerDesc: 'Ein perfekter Abend mit unserem Gourmet-Menü', pastry: 'Handwerkliche Konditorei', pastryDesc: 'Genießen Sie unsere täglich frisch zubereiteten Kreationen.', banquet: 'Veranstaltungssaal', banquetDesc: 'Vielseitiger Raum für Firmenveranstaltungen und Feiern.' },
    attractions: { title: 'Entdecken Sie Santo Domingo', subtitle: 'Das Tor zur ecuadorianischen Küste', intro: 'Santo Domingo de los Tsáchilas ist ein Land der Kontraste.', tsachilas: 'Tsáchila-Gemeinschaft', tsachilasDesc: 'Tauchen Sie ein in die faszinierende Kultur der Tsáchila.', waterfalls: 'Natürliche Wasserfälle', waterfallsDesc: 'Entdecken Sie beeindruckende Wasserfälle.', malecon: 'Uferpromenade San Gabriel del Baba', maleconDesc: 'Genießen Sie einen Spaziergang am Fluss.', jelenTenka: 'Jelen Tenka', jelenTenkaDesc: 'Touristenzentrum mit vollständiger Immersion in die Traditionen.' },
    contact: { title: 'Kontakt', subtitle: 'Zu Ihren Diensten', address: 'Adresse', phone: 'Telefon', email: 'E-Mail', hours: '24-Stunden-Rezeption', formTitle: 'Senden Sie uns eine Nachricht', getDirections: 'Wegbeschreibung', viewOnMap: 'Auf Google Maps ansehen', form: { name: 'Vollständiger Name', email: 'E-Mail', phone: 'Telefon', message: 'Ihre Nachricht', send: 'Nachricht Senden' } },
    footer: { rights: 'Alle Rechte vorbehalten', slogan: 'Ihr Zuhause fernab von Zuhause' },
    events: { title: 'Besondere Events', subtitle: 'Einzigartige Erlebnisse im Hotel del Pacífico', upcoming: 'Kommende Events', past: 'Vergangene Events', noEvents: 'Derzeit keine Events geplant.', date: 'Datum', time: 'Zeit', location: 'Ort', price: 'Preis', reserve: 'Reservieren', limitedSpots: 'Begrenzte Plätze' }
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
    { path: '/site/hoteldelpacifico', label: t.nav.home },
    { path: '/site/hoteldelpacifico/habitaciones', label: t.nav.rooms },
    { path: '/site/hoteldelpacifico/precios', label: t.nav.prices },
    { path: '/site/hoteldelpacifico/fotos', label: t.nav.photos },
    { path: '/site/hoteldelpacifico/restaurante', label: t.nav.restaurant },
    { path: '/site/hoteldelpacifico/atractivos', label: t.nav.attractions },
    { path: '/site/hoteldelpacifico/contacto', label: t.nav.contact },
    { path: '/site/hoteldelpacifico/eventos', label: t.nav.events }
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
          <Link to="/site/hoteldelpacifico" className="flex items-center">
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
            <Link to="/site/hoteldelpacifico/habitaciones" className="block text-emerald-100/70 hover:text-amber-300 transition-colors text-sm">{t.nav.rooms}</Link>
            <Link to="/site/hoteldelpacifico/restaurante" className="block text-emerald-100/70 hover:text-amber-300 transition-colors text-sm">{t.nav.restaurant}</Link>
            <Link to="/site/hoteldelpacifico/atractivos" className="block text-emerald-100/70 hover:text-amber-300 transition-colors text-sm">{t.nav.attractions}</Link>
            <Link to="/site/hoteldelpacifico/contacto" className="block text-emerald-100/70 hover:text-amber-300 transition-colors text-sm">{t.nav.contact}</Link>
            <Link to="/site/hoteldelpacifico/eventos" className="block text-emerald-100/70 hover:text-amber-300 transition-colors text-sm">{t.nav.events}</Link>
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
            href="https://www.fworksbuilders.com" 
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
        className="absolute inset-0 w-full h-full object-cover object-center"
        style={{ objectPosition: '50% 30%' }}
      >
        <source src={IMG('/images/hoteldelpacifico/hotel-v8.mp4')} type="video/mp4" />
      </video>
      
      {/* Green Overlay Filter */}
      <div className="absolute inset-0 bg-emerald-900/80" />
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
          <Link to="/site/hoteldelpacifico/contacto" className="bg-amber-500 hover:bg-amber-600 text-emerald-950 px-10 py-4 text-sm tracking-widest uppercase font-medium transition-all duration-300 hover:shadow-lg hover:shadow-amber-500/30">
            {t.hero.cta}
          </Link>
          <Link to="/site/hoteldelpacifico/habitaciones" className="border border-white/30 hover:border-amber-400 hover:text-amber-300 text-white px-10 py-4 text-sm tracking-widest uppercase font-light transition-all duration-300">
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
const ROOM_IMAGES = [
  '/images/hoteldelpacifico/rooms/DSC08298.jpg',
  '/images/hoteldelpacifico/rooms/DSC08309.jpg'
];

const RoomsPage = ({ t, roomPrices }) => {
  const defaultRooms = [
    { name: t.rooms.single, desc: t.rooms.singleDesc, price: '$0' },
    { name: t.rooms.double, desc: t.rooms.doubleDesc, price: '$0', featured: true }
  ];

  const rooms = roomPrices ? roomPrices.map((rp, i) => ({
    name: rp.name_es || defaultRooms[i]?.name || rp.name_en,
    desc: rp.description_es || defaultRooms[i]?.desc || '',
    price: rp.price > 0 ? `$${rp.price}` : '$0',
    featured: rp.is_featured || false,
    features: rp.features || []
  })) : defaultRooms;

  return (
  <div className="bg-amber-50/30 pt-24">
    {/* Hero with Background */}
    <section className="relative py-20 text-white text-center overflow-hidden">
      <div className="absolute inset-0">
        <img 
          src={IMG('/images/hoteldelpacifico/backgrounds/hotel-entrance.jpg')} 
          alt="" 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-emerald-800/80" />
      </div>
      <div className="relative z-10">
        <p className="text-amber-300 text-xs tracking-[0.3em] uppercase mb-4">{t.nav.rooms}</p>
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif mb-4">{t.rooms.title}</h1>
        <Divider />
        <p className="text-emerald-100/70 mt-6 max-w-xl mx-auto">{t.rooms.subtitle}</p>
      </div>
    </section>

    {/* Room Cards */}
    <section className="py-24 bg-gradient-to-b from-white to-amber-50/50">
      <div className="max-w-6xl mx-auto px-6">
        <p className="text-center text-gray-600 mb-16 max-w-2xl mx-auto">{t.rooms.description}</p>
        
        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {rooms.map((room, i) => (
            <div key={i} className={`bg-white overflow-hidden shadow-lg hover:shadow-2xl transition-shadow duration-500 border ${room.featured ? 'border-amber-400 ring-1 ring-amber-400' : 'border-amber-100'}`} data-testid={`room-card-${i}`}>
              <div className="h-56 relative overflow-hidden border-b border-amber-100">
                <img src={IMG(ROOM_IMAGES[i] || ROOM_IMAGES[0])} alt={room.name} className="w-full h-full object-cover" />
                {room.featured && <div className="absolute top-4 right-4 bg-amber-500 text-white px-3 py-1 text-xs tracking-wider uppercase z-10">Popular</div>}
              </div>
              <div className="p-8">
                <h3 className="text-2xl font-serif text-emerald-800 mb-2">{room.name}</h3>
                <p className="text-gray-500 text-sm mb-6">{room.desc}</p>
                <div className="flex items-baseline gap-2">
                  {room.price === '$0' ? (
                    <span className="text-lg text-gray-400 italic">Precio próximamente</span>
                  ) : (
                    <>
                      <span className="text-3xl font-serif text-amber-600">{room.price}</span>
                      <span className="text-gray-400 text-sm">/ {t.prices.perNight}</span>
                    </>
                  )}
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
)};

// ============================================
// PRICES PAGE - LUXURY VERSION
// ============================================
const PricesPage = ({ t, roomPrices }) => {
  const defaultRooms = [
    { name: t.rooms.single, price: '$0', desc: t.rooms.singleDesc, features: ['WiFi', 'Smart TV', 'A/C', t.prices.breakfast] },
    { name: t.rooms.double, price: '$0', desc: t.rooms.doubleDesc, featured: true, features: ['WiFi', 'Smart TV', 'A/C', t.prices.breakfast, 'Mini Bar'] }
  ];

  const rooms = roomPrices ? roomPrices.map((rp, i) => ({
    name: rp.name_es || defaultRooms[i]?.name || rp.name_en,
    desc: rp.description_es || defaultRooms[i]?.desc || '',
    price: rp.price > 0 ? `$${rp.price}` : '$0',
    featured: rp.is_featured || false,
    features: rp.features || defaultRooms[i]?.features || []
  })) : defaultRooms;

  return (
  <div className="bg-amber-50/30 pt-24">
    <section className="relative py-20 text-white text-center overflow-hidden">
      <div className="absolute inset-0">
        <img 
          src={IMG('/images/hoteldelpacifico/backgrounds/hotel-social.jpg')} 
          alt="" 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-emerald-800/80" />
      </div>
      <div className="relative z-10">
        <p className="text-amber-300 text-xs tracking-[0.3em] uppercase mb-4">{t.nav.prices}</p>
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif mb-4">{t.prices.title}</h1>
        <Divider />
        <p className="text-emerald-100/70 mt-6">{t.prices.subtitle}</p>
      </div>
    </section>

    <section className="py-24 bg-gradient-to-b from-white to-amber-50/50">
      <div className="max-w-6xl mx-auto px-6">
        {/* Price Cards */}
        <div className="grid md:grid-cols-2 gap-8 mb-16 max-w-4xl mx-auto">
          {rooms.map((room, i) => (
            <div key={i} className={`relative bg-white overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-500 ${room.featured ? 'ring-2 ring-amber-400 scale-105' : 'border border-amber-100'}`} data-testid={`price-card-${i}`}>
              {room.featured && (
                <div className="absolute top-0 left-0 right-0 bg-amber-500 text-white text-center py-2 text-xs tracking-widest uppercase">
                  Popular
                </div>
              )}
              <div className={`p-8 ${room.featured ? 'pt-14' : ''}`}>
                <h3 className="text-2xl font-serif text-emerald-800 mb-2">{room.name}</h3>
                <p className="text-gray-500 text-sm mb-6">{room.desc}</p>
                
                <div className="border-t border-b border-amber-100 py-6 my-6">
                  {room.price === '$0' ? (
                    <div className="text-center">
                      <p className="text-lg text-gray-400 italic">Precio próximamente</p>
                    </div>
                  ) : (
                    <div className="text-center">
                      <span className="text-4xl font-serif text-amber-600">{room.price}</span>
                      <span className="text-gray-400 text-sm ml-2">/ {t.prices.perNight}</span>
                    </div>
                  )}
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
                  to="/site/hoteldelpacifico/contacto" 
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
)};

// ============================================
// PHOTOS PAGE - LUXURY VERSION
// ============================================
const GALLERY_ROOM_IMAGES = [
  'DSC08245.jpg', 'DSC08247.jpg', 'DSC08249.jpg', 'DSC08251.jpg',
  'DSC08254.jpg', 'DSC08257.jpg', 'DSC08259.jpg', 'DSC08261.jpg',
  'DSC08263.jpg', 'DSC08270.jpg', 'DSC08273.jpg', 'DSC08275.jpg',
  'DSC08278.jpg', 'DSC08280.jpg', 'DSC08282.jpg', 'DSC08286.jpg',
  'DSC08288.jpg', 'DSC08292.jpg', 'DSC08296.jpg', 'DSC08298.jpg',
  'DSC08301.jpg', 'DSC08303.jpg', 'DSC08309.jpg', 'DSC08311.jpg',
  'DSC08315.jpg', 'DSC08316.jpg', 'DSC08317.jpg', 'DSC08320.jpg',
  'DSC08322.jpg', 'DSC08326.jpg', 'DSC08328.jpg', 'DSC08330.jpg',
  'DSC08332.jpg', 'DSC08334.jpg', 'DSC08336.jpg'
];

const PhotosPage = ({ t }) => {
  const [selectedPhoto, setSelectedPhoto] = useState(null);

  return (
  <div className="bg-amber-50/30 pt-24">
    <section className="relative py-20 text-white text-center overflow-hidden">
      <div className="absolute inset-0">
        <img 
          src={IMG('/images/hoteldelpacifico/rooms/DSC08298.jpg')} 
          alt="" 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-emerald-800/80" />
      </div>
      <div className="relative z-10">
        <p className="text-amber-300 text-xs tracking-[0.3em] uppercase mb-4">{t.nav.photos}</p>
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif mb-4">{t.photos.title}</h1>
        <Divider />
        <p className="text-emerald-100/70 mt-6">{t.photos.subtitle}</p>
      </div>
    </section>

    <section className="py-24 bg-gradient-to-b from-white to-amber-50/50">
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {GALLERY_ROOM_IMAGES.map((img, i) => (
            <div 
              key={i} 
              className="aspect-square overflow-hidden cursor-pointer group hover:shadow-lg transition-shadow border border-amber-200/50"
              onClick={() => setSelectedPhoto(i)}
              data-testid={`gallery-photo-${i}`}
            >
              <img 
                src={IMG(`/images/hoteldelpacifico/rooms/${img}`)} 
                alt={`Hotel foto ${i + 1}`} 
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                style={{ opacity: 1 }}
              />
            </div>
          ))}
        </div>
      </div>
    </section>

    {/* Lightbox */}
    {selectedPhoto !== null && (
      <div 
        className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4"
        onClick={() => setSelectedPhoto(null)}
      >
        <button 
          className="absolute top-6 right-6 text-white/70 hover:text-white z-50"
          onClick={() => setSelectedPhoto(null)}
        >
          <X className="w-8 h-8" />
        </button>
        <button 
          className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-3 rounded-full z-50"
          onClick={(e) => { e.stopPropagation(); setSelectedPhoto((prev) => (prev - 1 + GALLERY_ROOM_IMAGES.length) % GALLERY_ROOM_IMAGES.length); }}
        >
          &#8249;
        </button>
        <img 
          src={IMG(`/images/hoteldelpacifico/rooms/${GALLERY_ROOM_IMAGES[selectedPhoto]}`)} 
          alt="" 
          className="max-w-full max-h-[85vh] object-contain"
          onClick={(e) => e.stopPropagation()}
        />
        <button 
          className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-3 rounded-full z-50"
          onClick={(e) => { e.stopPropagation(); setSelectedPhoto((prev) => (prev + 1) % GALLERY_ROOM_IMAGES.length); }}
        >
          &#8250;
        </button>
        <div className="absolute bottom-6 text-white/60 text-sm">
          {selectedPhoto + 1} / {GALLERY_ROOM_IMAGES.length}
        </div>
      </div>
    )}
  </div>
)};

// ============================================
// RESTAURANT PAGE - LUXURY VERSION
// ============================================
// ============================================
// PATISSERIE GALLERY COMPONENT
// ============================================
const RESTAURANT_IMAGES = [
  'DSC00017.jpeg', 'DSC07834.jpg', 'DSC00019.jpeg', 'DSC07843.jpg',
  'DSC00022.jpeg', 'DSC07853.jpg', 'DSC00029.jpeg', 'DSC07867.jpg',
  'DSC00031.jpeg', 'DSC07879.jpg', 'DSC00033.jpeg', 'DSC07890.jpg',
  'DSC00045.jpeg', 'DSC07904.jpg', 'DSC00054.jpeg', 'DSC07909.jpg',
  'DSC00060.jpeg', 'DSC07919.jpg', 'DSC00081.jpeg', 'DSC07933.jpg',
  'DSC00112.jpeg', 'DSC07942.jpg', 'DSC00114.jpeg', 'DSC07952.jpg',
  'DSC00120.jpeg', 'DSC07963.jpg', 'DSC00141.jpeg', 'DSC07973.jpg',
  'DSC00148.jpeg', 'DSC07980.jpg', 'DSC00150.jpeg', 'DSC07993.jpg',
  'DSC00171.jpeg', 'DSC08002.jpg', 'DSC00200.jpeg', 'DSC08009.jpg',
  'DSC00218.jpeg', 'DSC08016.jpg', 'DSC00236.jpeg', 'DSC08028.jpg',
  'DSC08045.jpg', 'DSC08053.jpg', 'DSC08062.jpg', 'DSC08070.jpg',
  'DSC08077.jpg', 'DSC08092.jpg', 'DSC08108.jpg', 'DSC08114.jpg',
  'DSC08133.jpg', 'DSC08145.jpg'
];

const PatisserieGallery = ({ t }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [selectedImage, setSelectedImage] = useState(null);
  const autoPlayRef = React.useRef(null);

  // Auto-play logic
  useEffect(() => {
    if (isAutoPlaying && !selectedImage) {
      autoPlayRef.current = setInterval(() => {
        setCurrentIndex((prev) => (prev + 1) % RESTAURANT_IMAGES.length);
      }, 3000);
    }
    
    return () => {
      if (autoPlayRef.current) {
        clearInterval(autoPlayRef.current);
      }
    };
  }, [isAutoPlaying, selectedImage]);

  // Stop auto-play on user interaction
  const handleUserInteraction = () => {
    setIsAutoPlaying(false);
  };

  // Navigate to specific image
  const goToImage = (index) => {
    handleUserInteraction();
    setCurrentIndex(index);
  };

  // Navigate prev/next
  const goToPrev = () => {
    handleUserInteraction();
    setCurrentIndex((prev) => (prev - 1 + RESTAURANT_IMAGES.length) % RESTAURANT_IMAGES.length);
  };

  const goToNext = () => {
    handleUserInteraction();
    setCurrentIndex((prev) => (prev + 1) % RESTAURANT_IMAGES.length);
  };

  // Open lightbox
  const openLightbox = (index) => {
    handleUserInteraction();
    setSelectedImage(index);
  };

  // Close lightbox
  const closeLightbox = () => {
    setSelectedImage(null);
  };

  // Get visible thumbnails (show 6 at a time on desktop)
  const getVisibleThumbnails = () => {
    const visible = [];
    for (let i = 0; i < 6; i++) {
      const index = (currentIndex + i) % RESTAURANT_IMAGES.length;
      visible.push({ index, image: RESTAURANT_IMAGES[index] });
    }
    return visible;
  };

  return (
    <div className="relative">
      {/* Main Gallery Display */}
      <div className="relative aspect-[16/9] max-h-[500px] overflow-hidden rounded-lg shadow-xl mb-6">
        <img
          src={IMG(`/images/hoteldelpacifico/restaurant/${RESTAURANT_IMAGES[currentIndex]}`)}
          alt={`Patisserie ${currentIndex + 1}`}
          className="w-full h-full object-cover transition-opacity duration-500"
          onClick={() => openLightbox(currentIndex)}
        />
        
        {/* Navigation Arrows */}
        <button
          onClick={goToPrev}
          className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-black/50 hover:bg-black/70 text-white rounded-full flex items-center justify-center transition-all"
        >
          <ChevronDown className="w-6 h-6 rotate-90" />
        </button>
        <button
          onClick={goToNext}
          className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-black/50 hover:bg-black/70 text-white rounded-full flex items-center justify-center transition-all"
        >
          <ChevronDown className="w-6 h-6 -rotate-90" />
        </button>
        
        {/* Image Counter */}
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-black/60 text-white px-4 py-2 rounded-full text-sm">
          {currentIndex + 1} / {RESTAURANT_IMAGES.length}
        </div>
        
        {/* Auto-play indicator */}
        {isAutoPlaying && (
          <div className="absolute top-4 right-4 bg-amber-500/80 text-white px-3 py-1 rounded-full text-xs flex items-center gap-2">
            <span className="w-2 h-2 bg-white rounded-full animate-pulse" />
            Auto
          </div>
        )}
        
        {/* Click to enlarge hint */}
        <div className="absolute bottom-4 right-4 bg-black/60 text-white px-3 py-1 rounded-full text-xs">
          Click para ampliar
        </div>
      </div>

      {/* Thumbnail Strip */}
      <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
        {RESTAURANT_IMAGES.map((image, index) => (
          <button
            key={index}
            onClick={() => goToImage(index)}
            className={`flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden transition-all ${
              index === currentIndex 
                ? 'ring-2 ring-amber-500 scale-105' 
                : 'opacity-60 hover:opacity-100'
            }`}
          >
            <img
              src={IMG(`/images/hoteldelpacifico/restaurant/${image}`)}
              alt={`Thumbnail ${index + 1}`}
              className="w-full h-full object-cover"
            />
          </button>
        ))}
      </div>

      {/* Resume Auto-play Button */}
      {!isAutoPlaying && (
        <button
          onClick={() => setIsAutoPlaying(true)}
          className="mt-4 mx-auto block bg-emerald-700 hover:bg-emerald-600 text-white px-6 py-2 rounded-full text-sm transition-colors"
        >
          ▶ Reanudar presentación automática
        </button>
      )}

      {/* Lightbox Modal */}
      {selectedImage !== null && (
        <div 
          className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center p-4"
          onClick={closeLightbox}
        >
          <button
            onClick={closeLightbox}
            className="absolute top-4 right-4 w-12 h-12 bg-white/10 hover:bg-white/20 text-white rounded-full flex items-center justify-center z-50"
          >
            <X className="w-6 h-6" />
          </button>
          
          <button
            onClick={(e) => { e.stopPropagation(); setSelectedImage((prev) => (prev - 1 + RESTAURANT_IMAGES.length) % RESTAURANT_IMAGES.length); }}
            className="absolute left-4 top-1/2 -translate-y-1/2 w-14 h-14 bg-white/10 hover:bg-white/20 text-white rounded-full flex items-center justify-center"
          >
            <ChevronDown className="w-8 h-8 rotate-90" />
          </button>
          
          <img
            src={IMG(`/images/hoteldelpacifico/restaurant/${RESTAURANT_IMAGES[selectedImage]}`)}
            alt={`Patisserie ${selectedImage + 1}`}
            className="max-w-full max-h-[90vh] object-contain"
            onClick={(e) => e.stopPropagation()}
          />
          
          <button
            onClick={(e) => { e.stopPropagation(); setSelectedImage((prev) => (prev + 1) % RESTAURANT_IMAGES.length); }}
            className="absolute right-4 top-1/2 -translate-y-1/2 w-14 h-14 bg-white/10 hover:bg-white/20 text-white rounded-full flex items-center justify-center"
          >
            <ChevronDown className="w-8 h-8 -rotate-90" />
          </button>
          
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-white text-sm">
            {selectedImage + 1} / {RESTAURANT_IMAGES.length}
          </div>
        </div>
      )}
    </div>
  );
};

const RestaurantPage = ({ t }) => (
  <div className="bg-amber-50/30 pt-20">
    <section className="relative py-6 text-white text-center overflow-hidden">
      {/* Background Image with Green Filter */}
      <div className="absolute inset-0 overflow-hidden">
        <img 
          src={IMG('/images/hoteldelpacifico/restaurant/DSC07834.jpg')} 
          alt="" 
          className="w-[200%] h-[200%] object-cover absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
        />
        <div className="absolute inset-0 bg-emerald-800/60" />
      </div>
      
      {/* Content */}
      <div className="relative z-10">
        <p className="text-amber-300 text-xs tracking-[0.3em] uppercase">{t.nav.restaurant}</p>
        <img 
          src={IMG('/images/hoteldelpacifico/la-orquidea-logo.png')} 
          alt="La Orquídea Café" 
          className="h-[400px] md:h-[450px] lg:h-[500px] w-auto mx-auto -my-8"
        />
        <Divider />
        <p className="text-emerald-100/80 max-w-xl mx-auto text-sm">{t.restaurant.subtitle}</p>
      </div>
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

    {/* Patisserie Gallery Section */}
    <section className="py-24 bg-gradient-to-b from-amber-50 to-white">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-12">
          <p className="text-amber-600 text-xs tracking-[0.3em] uppercase mb-4">{t.restaurant.pastryGalleryTitle || 'Nuestra Especialidad'}</p>
          <h2 className="text-3xl md:text-4xl font-serif text-emerald-800 mb-4">{t.restaurant.pastry}</h2>
          <Divider />
          <p className="text-gray-600 mt-6 max-w-2xl mx-auto">
            {t.restaurant.pastryGallerySubtitle || 'Descubra nuestra exquisita selección de postres y creaciones artesanales, elaborados diariamente con los mejores ingredientes.'}
          </p>
        </div>
        
        <PatisserieGallery t={t} />
      </div>
    </section>
  </div>
);

// ============================================
// ATTRACTIONS PAGE - LUXURY VERSION
// ============================================
const AttractionsPage = ({ t }) => (
  <div className="bg-amber-50/50 pt-24">
    <section className="relative py-20 text-white text-center overflow-hidden">
      <div className="absolute inset-0">
        <img 
          src={IMG('/images/hoteldelpacifico/attractions/jelen-tenka.jpg')} 
          alt="" 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-emerald-800/80" />
      </div>
      <div className="relative z-10">
        <p className="text-amber-300 text-xs tracking-[0.3em] uppercase mb-4">{t.nav.attractions}</p>
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif mb-4">{t.attractions.title}</h1>
        <Divider />
        <p className="text-emerald-100/70 mt-6 max-w-xl mx-auto">{t.attractions.subtitle}</p>
      </div>
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
              image: IMG('/images/hoteldelpacifico/attractions/tsachila.jpg'),
              distance: '15-30 min',
              tip: 'Visita guiada recomendada',
              highlights: ['Cultura ancestral', 'Rituales tradicionales', 'Artesanías'],
              imagePosition: 'center'
            },
            { 
              title: t.attractions.waterfalls, 
              desc: t.attractions.waterfallsDesc, 
              icon: Mountain,
              image: IMG('/images/hoteldelpacifico/attractions/cascadas.jpg'),
              distance: '20-45 min',
              tip: 'Llevar ropa cómoda',
              highlights: ['Cascada del Diablo', 'Cascada Napac', 'Senderos naturales'],
              imagePosition: 'top'
            },
            { 
              title: t.attractions.malecon, 
              desc: t.attractions.maleconDesc, 
              icon: MapPin,
              image: IMG('/images/hoteldelpacifico/attractions/sangabriel.jpg'),
              distance: '10 min',
              tip: 'Ideal para paseo al atardecer',
              highlights: ['Gastronomía local', 'Vista al río', 'Área recreativa'],
              imagePosition: 'center'
            },
            { 
              title: t.attractions.jelenTenka, 
              desc: t.attractions.jelenTenkaDesc, 
              icon: Star,
              image: IMG('/images/hoteldelpacifico/attractions/jelen-tenka.jpg'),
              distance: '25 min',
              tip: 'Reservar con anticipación',
              highlights: ['Experiencia inmersiva', 'Comida típica', 'Naturaleza'],
              imagePosition: 'center'
            },
            { 
              title: t.attractions.bomboli || 'Bombolí',
              desc: t.attractions.bomboliDesc || 'Mirador icónico de Santo Domingo con vista panorámica de toda la ciudad. El lugar perfecto para fotos y disfrutar del atardecer.',
              icon: Mountain,
              image: IMG('/images/hoteldelpacifico/attractions/bomboli.webp'),
              distance: '15 min',
              tip: 'Ideal para atardecer',
              highlights: ['Vista panorámica', 'Fotografía', 'Mirador'],
              imagePosition: 'bottom'
            },
            { 
              title: 'Bombolí Shopping',
              desc: 'El centro comercial más moderno de Santo Domingo. Tiendas de marca, cine, patio de comidas y entretenimiento para toda la familia.',
              icon: ShoppingBag,
              image: IMG('/images/hoteldelpacifico/attractions/bomboli-shopping.jpg'),
              distance: '15 min',
              tip: 'Abierto todos los días',
              highlights: ['Tiendas', 'Cine', 'Patio de comidas'],
              imagePosition: 'center'
            },
            { 
              title: 'La Cuadra',
              desc: 'Zona gastronómica y de entretenimiento con una amplia variedad de restaurantes, bares y tiendas. El lugar ideal para disfrutar de la vida nocturna.',
              icon: Utensils,
              image: IMG('/images/hoteldelpacifico/attractions/cuadra.jpg'),
              distance: '10 min',
              tip: 'Mejor experiencia de noche',
              highlights: ['Restaurantes', 'Bares', 'Vida nocturna'],
              imagePosition: 'center'
            },
            { 
              title: 'Vía Aventura',
              desc: 'Ruta escénica perfecta para ciclismo y senderismo. A lo largo del camino encontrará empanadas típicas, parques acuáticos, restaurantes y diversas actividades al aire libre.',
              icon: Mountain,
              image: IMG('/images/hoteldelpacifico/attractions/via-aventura.jpg'),
              distance: '20-40 min',
              tip: 'Ideal para actividades al aire libre',
              highlights: ['Ciclismo', 'Senderismo', 'Parques acuáticos', 'Gastronomía'],
              imagePosition: 'center'
            },
            { 
              title: 'Parques Acuáticos - Julio Moreno',
              desc: 'En la comuna Julio Moreno, a lo largo de la Vía Aventura, encontrará decenas de parques acuáticos para disfrutar en familia. Toboganes, piscinas y diversión garantizada.',
              icon: Star,
              image: IMG('/images/hoteldelpacifico/attractions/aquapark.jpg'),
              distance: '30-45 min',
              tip: 'Llevar ropa de baño y protector solar',
              highlights: ['Toboganes', 'Piscinas', 'Familia', 'Diversión'],
              imagePosition: 'center'
            }
          ].map((item, i) => (
            <div key={i} className="bg-white border border-amber-200/50 shadow-md hover:shadow-xl transition-all duration-500 group overflow-hidden">
              <div className="h-48 relative overflow-hidden">
                <img 
                  src={item.image} 
                  alt={item.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  style={{ objectPosition: item.imagePosition }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-emerald-900/60 to-transparent" />
                <div className="absolute bottom-4 left-4 w-12 h-12 rounded-full bg-white/20 backdrop-blur flex items-center justify-center">
                  <item.icon className="w-6 h-6 text-white" />
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
          to="/site/hoteldelpacifico/contacto" 
          className="inline-block bg-emerald-700 hover:bg-emerald-600 text-white px-10 py-4 text-sm tracking-widest uppercase transition-colors"
        >
          Contáctenos
        </Link>
      </div>
    </section>
  </div>
);

// ============================================
// EVENTS PAGE - SPECIAL EVENTS
// ============================================
const DEFAULT_EVENTS = [
  {
    id: 'pinta-mascota-2026',
    title: 'Taller "Pinta tu Mascota"',
    description: '¿Te imaginas transformar a tu mascota en una obra de arte única? Te invito a vivir una experiencia creativa y especial donde podrás pintar a tu peludito paso a paso, aunque no tengas experiencia previa.',
    includes: [
      'Guía personalizada durante todo el proceso',
      'Materiales completos para pintar',
      'Un espacio relajado y divertido',
      'Copa de Vino y Bocaditos',
      '¡Tu propia obra lista para llevar a casa!'
    ],
    note: 'Solo necesitas enviarnos una foto clara de tu mascota',
    date: '2026-04-26',
    date_display: 'Domingo 26 de Abril',
    time: '9:00 a 13:00',
    location: 'Hotel del Pacífico',
    price: '$20',
    image: '/images/hoteldelpacifico/events/pinta-mascota.jpg',
    is_active: true
  }
];

const EventsPage = ({ t, siteEvents }) => {
  const events = siteEvents && siteEvents.length > 0 ? siteEvents : DEFAULT_EVENTS;
  const now = new Date();
  const upcoming = events.filter(e => e.is_active && new Date(e.date) >= new Date(now.toDateString()));
  const past = events.filter(e => !e.is_active || new Date(e.date) < new Date(now.toDateString()));

  return (
  <div className="bg-amber-50/30 pt-24">
    <section className="relative py-20 text-white text-center overflow-hidden">
      <div className="absolute inset-0">
        <img 
          src={IMG('/images/hoteldelpacifico/events/pinta-mascota.jpg')} 
          alt="" 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-emerald-800/80" />
      </div>
      <div className="relative z-10">
        <p className="text-amber-300 text-xs tracking-[0.3em] uppercase mb-4">{t.nav.events}</p>
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif mb-4">{t.events.title}</h1>
        <Divider />
        <p className="text-emerald-100/70 mt-6">{t.events.subtitle}</p>
      </div>
    </section>

    <section className="py-24 bg-gradient-to-b from-white to-amber-50/50">
      <div className="max-w-5xl mx-auto px-6">
        {upcoming.length > 0 && (
          <>
            <h2 className="text-2xl font-serif text-emerald-800 mb-10 text-center">{t.events.upcoming}</h2>
            {upcoming.map((event, i) => (
              <div key={event.id || i} className="bg-white shadow-xl border border-amber-100 overflow-hidden mb-10" data-testid={`event-card-${i}`}>
                <div className="md:flex">
                  {event.image && (
                    <div className="md:w-2/5 h-72 md:h-auto relative overflow-hidden">
                      <img src={IMG(event.image)} alt={event.title} className="w-full h-full object-cover" style={{ opacity: 1 }} />
                    </div>
                  )}
                  <div className="md:w-3/5 p-8 md:p-10">
                    <h3 className="text-2xl md:text-3xl font-serif text-emerald-800 mb-4">{event.title}</h3>
                    <p className="text-gray-600 mb-6">{event.description}</p>
                    
                    {event.includes && event.includes.length > 0 && (
                      <div className="mb-6">
                        <p className="text-sm font-semibold text-emerald-700 mb-2">Incluye:</p>
                        <ul className="space-y-1.5">
                          {event.includes.map((item, j) => (
                            <li key={j} className="flex items-start gap-2 text-sm text-gray-600">
                              <Star className="w-3 h-3 text-amber-500 mt-1 flex-shrink-0" />
                              {item}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {event.note && (
                      <p className="text-sm text-amber-700 bg-amber-50 px-4 py-2 rounded mb-6">{event.note}</p>
                    )}

                    <div className="grid grid-cols-2 gap-4 mb-6">
                      <div className="flex items-center gap-2 text-sm text-gray-700">
                        <Clock className="w-4 h-4 text-emerald-600" />
                        <div>
                          <p className="font-medium">{event.date_display}</p>
                          <p className="text-gray-400">{event.time}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-gray-700">
                        <MapPin className="w-4 h-4 text-emerald-600" />
                        <p>{event.location}</p>
                      </div>
                    </div>

                    <div className="flex items-center justify-between pt-4 border-t border-amber-100">
                      <div>
                        <span className="text-3xl font-serif text-amber-600">{event.price}</span>
                        <p className="text-xs text-gray-400 mt-1">{t.events.limitedSpots}</p>
                      </div>
                      <a 
                        href={`https://wa.me/593988802941?text=${encodeURIComponent(`Hola, quiero reservar para el evento: ${event.title}`)}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="bg-amber-500 hover:bg-amber-600 text-white px-8 py-3 text-sm tracking-widest uppercase font-medium transition-colors"
                      >
                        {t.events.reserve}
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </>
        )}

        {upcoming.length === 0 && (
          <div className="text-center py-16">
            <Sparkles className="w-12 h-12 text-amber-400 mx-auto mb-4" />
            <p className="text-gray-500 text-lg">{t.events.noEvents}</p>
          </div>
        )}
      </div>
    </section>
  </div>
)};

// ============================================
// CONTACT PAGE - LUXURY VERSION
// ============================================
const ContactPage = ({ t }) => (
  <div className="bg-amber-50/30 pt-24">
    <section className="relative py-20 text-white text-center overflow-hidden">
      <div className="absolute inset-0">
        <img 
          src={IMG('/images/hoteldelpacifico/attractions/bomboli.webp')} 
          alt="" 
          className="w-full h-full object-cover"
          style={{ objectPosition: 'bottom' }}
        />
        <div className="absolute inset-0 bg-emerald-800/80" />
      </div>
      <div className="relative z-10">
        <p className="text-amber-300 text-xs tracking-[0.3em] uppercase mb-4">{t.nav.contact}</p>
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif mb-4">{t.contact.title}</h1>
        <Divider />
        <p className="text-emerald-100/70 mt-6">{t.contact.subtitle}</p>
      </div>
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

            {/* WhatsApp Direct Contact Button */}
            <a
              href={`https://wa.me/593988802941?text=${encodeURIComponent('Hola, me gustaría recibir información o hacer una reservación en Hotel del Pacífico.')}`}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-10 flex items-center justify-center gap-3 w-full bg-[#25D366] hover:bg-[#1ebe57] text-white py-5 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 group"
              data-testid="whatsapp-contact-btn"
            >
              <MessageCircle className="w-7 h-7 group-hover:scale-110 transition-transform" />
              <span className="text-lg font-semibold tracking-wide">WhatsApp: +593 98 880 2941</span>
            </a>
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
// UNDER CONSTRUCTION PAGE
// ============================================
const UnderConstructionPage = ({ t, language, setLanguage }) => {
  const languages = [
    { code: 'es', name: 'ES' },
    { code: 'en', name: 'EN' },
    { code: 'fr', name: 'FR' },
    { code: 'it', name: 'IT' },
    { code: 'de', name: 'DE' }
  ];

  const underConstructionText = {
    es: {
      title: 'Próximamente',
      subtitle: 'Estamos trabajando en algo especial para usted',
      contact: 'Mientras tanto, puede contactarnos:',
      followUs: 'Síguenos en redes sociales',
      builtBy: 'Sitio web actualmente en construcción por:'
    },
    en: {
      title: 'Coming Soon',
      subtitle: 'We are working on something special for you',
      contact: 'In the meantime, you can contact us:',
      followUs: 'Follow us on social media',
      builtBy: 'Website currently being built by:'
    },
    fr: {
      title: 'Bientôt Disponible',
      subtitle: 'Nous travaillons sur quelque chose de spécial pour vous',
      contact: 'En attendant, vous pouvez nous contacter:',
      followUs: 'Suivez-nous sur les réseaux sociaux',
      builtBy: 'Site web actuellement en construction par:'
    },
    it: {
      title: 'Prossimamente',
      subtitle: 'Stiamo lavorando a qualcosa di speciale per voi',
      contact: 'Nel frattempo, potete contattarci:',
      followUs: 'Seguici sui social media',
      builtBy: 'Sito web attualmente in costruzione da:'
    },
    de: {
      title: 'Demnächst Verfügbar',
      subtitle: 'Wir arbeiten an etwas Besonderem für Sie',
      contact: 'In der Zwischenzeit können Sie uns kontaktieren:',
      followUs: 'Folgen Sie uns in den sozialen Medien',
      builtBy: 'Webseite wird derzeit erstellt von:'
    }
  };

  const ucText = underConstructionText[language] || underConstructionText.es;

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Video Background */}
      <video 
        autoPlay 
        loop 
        muted 
        playsInline
        className="absolute inset-0 w-full h-full object-cover object-center"
        style={{ objectPosition: '50% 30%' }}
      >
        <source src={IMG('/images/hoteldelpacifico/hotel-v8.mp4')} type="video/mp4" />
      </video>
      
      {/* Green Overlay Filter */}
      <div className="absolute inset-0 bg-emerald-900/85" />
      <div className="absolute inset-0 bg-gradient-to-b from-emerald-900/50 via-transparent to-emerald-900/80" />
      
      {/* Content */}
      <div className="relative z-10 min-h-screen flex flex-col items-center justify-center text-white px-6">
        {/* Language Selector - Top Right */}
        <div className="absolute top-6 right-6 flex items-center gap-1 bg-black/20 backdrop-blur-sm rounded-full px-4 py-2">
          {languages.map((lang, i) => (
            <React.Fragment key={lang.code}>
              <button
                onClick={() => setLanguage(lang.code)}
                className={`px-2 py-1 text-xs tracking-wider transition-all duration-300 ${
                  language === lang.code
                    ? 'text-amber-300 font-semibold'
                    : 'text-white/70 hover:text-white'
                }`}
              >
                {lang.name}
              </button>
              {i < languages.length - 1 && <span className="text-white/30">|</span>}
            </React.Fragment>
          ))}
        </div>

        {/* Main Content */}
        <div className="text-center max-w-2xl">
          {/* Logo */}
          <img 
            src={IMG('/images/hoteldelpacifico/hotel-logo.png')} 
            alt="Hotel del Pacífico" 
            className="h-48 md:h-64 lg:h-72 w-auto mx-auto mb-8"
          />
          
          {/* Under Construction Badge */}
          <div className="inline-flex items-center gap-2 bg-amber-500/90 text-emerald-950 px-6 py-2 rounded-full mb-8">
            <Sparkles className="w-4 h-4" />
            <span className="text-sm font-medium tracking-wider uppercase">{ucText.title}</span>
            <Sparkles className="w-4 h-4" />
          </div>
          
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-serif mb-4">Hotel del Pacífico</h1>
          <p className="text-emerald-100/80 text-lg md:text-xl mb-12">{ucText.subtitle}</p>
          
          {/* Contact Info */}
          <div className="bg-black/20 backdrop-blur-sm rounded-2xl p-8 mb-8">
            <p className="text-amber-300 text-sm tracking-wider uppercase mb-6">{ucText.contact}</p>
            <div className="space-y-4">
              <a 
                href={`tel:${HOTEL_INFO.phone}`}
                className="flex items-center justify-center gap-3 text-white hover:text-amber-300 transition-colors"
              >
                <Phone size={18} className="text-amber-400" />
                <span>{HOTEL_INFO.phone}</span>
              </a>
              <a 
                href={`tel:${HOTEL_INFO.phone2}`}
                className="flex items-center justify-center gap-3 text-white hover:text-amber-300 transition-colors"
              >
                <Phone size={18} className="text-amber-400" />
                <span>{HOTEL_INFO.phone2}</span>
              </a>
              <a 
                href={`mailto:${HOTEL_INFO.email}`}
                className="flex items-center justify-center gap-3 text-white hover:text-amber-300 transition-colors"
              >
                <Mail size={18} className="text-amber-400" />
                <span>{HOTEL_INFO.email}</span>
              </a>
              <a 
                href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(HOTEL_INFO.address)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-3 text-white hover:text-amber-300 transition-colors"
              >
                <MapPin size={18} className="text-amber-400" />
                <span className="text-sm">{HOTEL_INFO.address}</span>
              </a>
            </div>
          </div>
          
          {/* Social Media */}
          <div className="text-center mb-10">
            <p className="text-emerald-200/50 text-xs tracking-wider uppercase mb-4">{ucText.followUs}</p>
            <div className="flex justify-center gap-4">
              <a 
                href="https://www.facebook.com/hoteldelpacifico.sd" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="w-12 h-12 rounded-full border border-emerald-400/30 flex items-center justify-center text-emerald-200 hover:bg-amber-500 hover:border-amber-500 hover:text-white transition-all duration-300"
              >
                <Facebook size={20} />
              </a>
              <a 
                href="https://www.instagram.com/hoteldelpacifico.sd" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="w-12 h-12 rounded-full border border-emerald-400/30 flex items-center justify-center text-emerald-200 hover:bg-amber-500 hover:border-amber-500 hover:text-white transition-all duration-300"
              >
                <Instagram size={20} />
              </a>
              <a 
                href={`https://wa.me/${HOTEL_INFO.phone.replace(/[^0-9]/g, '')}`}
                target="_blank" 
                rel="noopener noreferrer" 
                className="w-12 h-12 rounded-full border border-emerald-400/30 flex items-center justify-center text-emerald-200 hover:bg-amber-500 hover:border-amber-500 hover:text-white transition-all duration-300"
              >
                <MessageCircle size={20} />
              </a>
            </div>
          </div>

          {/* Built By Section - Prominent */}
          <div className="bg-black/30 backdrop-blur-sm rounded-2xl p-6 border border-amber-400/30">
            <p className="text-amber-300 text-sm tracking-wider uppercase mb-4">{ucText.builtBy}</p>
            <a 
              href="https://www.fworksbuilders.com" 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex flex-col items-center gap-3 group"
            >
              <img 
                src={IMG('/images/fworksbuilders-logo.png')}
                alt="fworksbuilders" 
                className="h-14 md:h-16 w-auto group-hover:scale-105 transition-transform duration-300"
              />
              <span className="text-white text-lg font-medium group-hover:text-amber-300 transition-colors">
                fworksbuilders
              </span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

// ============================================
// MAIN APP COMPONENT
// ============================================
// Set to true to show only the Under Construction page
const UNDER_CONSTRUCTION_MODE = true;

// Complete Hotel SEO Data for Google Rich Results
const HOTEL_SEO_DATA = {
  name: 'Hotel del Pacífico',
  stars: '3',
  priceRange: '$$',
  numberOfRooms: 36,
  phone: '+593 98 880 2941',
  email: 'hotel.delpacifico@hotmail.com',
  logo: 'https://www.hoteldelpacifico.net/images/hoteldelpacifico/hotel-logo.png',
  streetAddress: 'Av. 29 de Mayo entre Ibarra y Latacunga',
  city: 'Santo Domingo',
  region: 'Santo Domingo de los Tsáchilas',
  postalCode: '230101',
  country: 'EC',
  latitude: -0.2531,
  longitude: -79.1719,
  geoRegion: 'EC-SD',
  geoPlacename: 'Santo Domingo de los Tsáchilas',
  geoPosition: '-0.2531;-79.1719',
  themeColor: '#065f46',
  checkinTime: '14:00',
  checkoutTime: '12:00',
  petsAllowed: false,
  languages: ['Spanish', 'English', 'French', 'Italian', 'German'],
  paymentAccepted: ['Cash', 'Credit Card', 'Debit Card'],
  currencies: 'USD',
  mapUrl: 'https://www.google.com/maps/search/?api=1&query=Hotel+del+Pacifico+Santo+Domingo+Ecuador',
  amenities: [
    'Free WiFi',
    'Air conditioning',
    'Smart TV',
    'Private parking',
    'Restaurant',
    'Room service',
    'Business center',
    'Conference room',
    '24-hour front desk',
    'Hot water',
    'Laundry service'
  ],
  socialMedia: [
    'https://www.facebook.com/hoteldelpacifico.sd',
    'https://www.instagram.com/hoteldelpacifico.sd'
  ],
  breadcrumbs: [
    { name: 'Ecuador', url: 'https://www.hoteldelpacifico.net' },
    { name: 'Santo Domingo', url: 'https://www.hoteldelpacifico.net' },
    { name: 'Hotel del Pacífico', url: 'https://www.hoteldelpacifico.net' }
  ]
};

// Alternate language URLs for hreflang tags
const ALTERNATE_LANGUAGES = {
  'es': 'https://www.hoteldelpacifico.net',
  'en': 'https://www.hoteldelpacifico.net',
  'fr': 'https://www.hoteldelpacifico.net',
  'it': 'https://www.hoteldelpacifico.net',
  'de': 'https://www.hoteldelpacifico.net'
};

const HotelDelPacificoApp = () => {
  const [language, setLanguage] = useState('es');
  const [roomPrices, setRoomPrices] = useState(null);
  const [siteEvents, setSiteEvents] = useState(null);
  const t = translations[language];

  // Fetch room prices and events from API
  useEffect(() => {
    const API = process.env.REACT_APP_BACKEND_URL + '/api';
    fetch(`${API}/public/site/hoteldelpacifico`)
      .then(res => res.json())
      .then(data => {
        if (data?.config?.room_prices) {
          setRoomPrices(data.config.room_prices);
        }
        if (data?.config?.events) {
          setSiteEvents(data.config.events);
        }
      })
      .catch(() => {});
  }, []);

  // Language-specific SEO descriptions
  const seoDescriptions = {
    es: 'Hotel del Pacífico: Su oasis de tranquilidad y elegancia en Santo Domingo de los Tsáchilas, Ecuador. 36 habitaciones confortables, restaurante La Orquídea, centro de negocios y sala de conferencias. Ideal para viajeros de negocios y turistas. Reservas: +593 98 880 2941',
    en: 'Hotel del Pacífico: Your oasis of tranquility and elegance in Santo Domingo de los Tsáchilas, Ecuador. 36 comfortable rooms, La Orquídea restaurant, business center and conference room. Ideal for business travelers and tourists. Reservations: +593 98 880 2941',
    fr: 'Hotel del Pacífico: Votre oasis de tranquillité et d\'élégance à Santo Domingo de los Tsáchilas, Équateur. 36 chambres confortables, restaurant La Orquídea, centre d\'affaires. Réservations: +593 98 880 2941',
    it: 'Hotel del Pacífico: La vostra oasi di tranquillità ed eleganza a Santo Domingo de los Tsáchilas, Ecuador. 36 camere confortevoli, ristorante La Orquídea, centro business. Prenotazioni: +593 98 880 2941',
    de: 'Hotel del Pacífico: Ihre Oase der Ruhe und Eleganz in Santo Domingo de los Tsáchilas, Ecuador. 36 komfortable Zimmer, Restaurant La Orquídea, Business Center. Reservierungen: +593 98 880 2941'
  };

  const seoKeywords = {
    es: 'hotel santo domingo ecuador, hotel del pacifico, alojamiento santo domingo, hotel negocios ecuador, hotel tsachilas, la orquidea restaurante, hotel centro santo domingo, hospedaje ecuador, hotel 3 estrellas santo domingo, reservas hotel ecuador',
    en: 'hotel santo domingo ecuador, hotel del pacifico, accommodation santo domingo, business hotel ecuador, hotel tsachilas, la orquidea restaurant, hotel downtown santo domingo, lodging ecuador, 3 star hotel santo domingo, hotel reservations ecuador',
    fr: 'hôtel santo domingo equateur, hotel del pacifico, hébergement santo domingo, hôtel affaires equateur, hotel tsachilas, restaurant la orquidea, hôtel centre santo domingo, logement equateur',
    it: 'hotel santo domingo ecuador, hotel del pacifico, alloggio santo domingo, hotel business ecuador, hotel tsachilas, ristorante la orquidea, hotel centro santo domingo, albergo ecuador',
    de: 'hotel santo domingo ecuador, hotel del pacifico, unterkunft santo domingo, business hotel ecuador, hotel tsachilas, restaurant la orquidea, hotel zentrum santo domingo, übernachtung ecuador'
  };

  const seoTitles = {
    es: 'Hotel del Pacífico | Hotel 3 Estrellas en Santo Domingo, Ecuador',
    en: 'Hotel del Pacífico | 3-Star Hotel in Santo Domingo, Ecuador',
    fr: 'Hotel del Pacífico | Hôtel 3 Étoiles à Santo Domingo, Équateur',
    it: 'Hotel del Pacífico | Hotel 3 Stelle a Santo Domingo, Ecuador',
    de: 'Hotel del Pacífico | 3-Sterne-Hotel in Santo Domingo, Ecuador'
  };

  // Show Under Construction page on ALL domains EXCEPT the Emergent preview URL
  // On production: emergent.host serves the iframe content, hoteldelpacifico.net is the parent
  // Only show full site when directly on preview.emergentagent.com with /site/hoteldelpacifico path
  const currentHost = window.location.hostname;
  const currentPath = window.location.pathname;
  const isPreviewDev = currentHost.includes('preview.emergentagent.com') && currentPath.includes('/site/hoteldelpacifico');
  const isLocalhost = currentHost === 'localhost' || currentHost === '127.0.0.1';
  const isProduction = !isPreviewDev && !isLocalhost;
  
  if (UNDER_CONSTRUCTION_MODE && isProduction) {
    return (
      <div className="min-h-screen">
        <SEO 
          title={seoTitles[language]}
          description={seoDescriptions[language]}
          keywords={seoKeywords[language]}
          image="https://www.hoteldelpacifico.net/images/hoteldelpacifico/hotel-logo.png"
          url="https://www.hoteldelpacifico.net"
          siteName="Hotel del Pacífico"
          locale={language === 'es' ? 'es_EC' : language}
          type="hotel"
          hotelData={HOTEL_SEO_DATA}
          alternateLanguages={ALTERNATE_LANGUAGES}
        />
        <URLSync />
        <UnderConstructionPage t={t} language={language} setLanguage={setLanguage} />
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <SEO 
        title={seoTitles[language]}
        description={seoDescriptions[language]}
        keywords={seoKeywords[language]}
        image="https://www.hoteldelpacifico.net/images/hoteldelpacifico/hotel-logo.png"
        url="https://www.hoteldelpacifico.net"
        siteName="Hotel del Pacífico"
        locale={language === 'es' ? 'es_EC' : language}
        type="hotel"
        hotelData={HOTEL_SEO_DATA}
        alternateLanguages={ALTERNATE_LANGUAGES}
      />
      <URLSync />
      
      <Navigation language={language} setLanguage={setLanguage} t={t} />
      
      <Routes>
        <Route index element={<HomePage t={t} />} />
        <Route path="habitaciones" element={<RoomsPage t={t} roomPrices={roomPrices} />} />
        <Route path="precios" element={<PricesPage t={t} roomPrices={roomPrices} />} />
        <Route path="fotos" element={<PhotosPage t={t} />} />
        <Route path="restaurante" element={<RestaurantPage t={t} />} />
        <Route path="atractivos" element={<AttractionsPage t={t} />} />
        <Route path="contacto" element={<ContactPage t={t} />} />
        <Route path="eventos" element={<EventsPage t={t} siteEvents={siteEvents} />} />
        <Route path="*" element={<HomePage t={t} />} />
      </Routes>
      
      <Footer t={t} />
    </div>
  );
};

export default HotelDelPacificoApp;
