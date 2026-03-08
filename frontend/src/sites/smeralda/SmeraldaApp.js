import React, { useState, useEffect } from 'react';
import { Menu, X, Phone, Mail, MapPin, ChevronDown, ChevronLeft, ChevronRight, Globe, Star, Wifi, Car, UtensilsCrossed, Waves, Sun, Home, Bed, Users, Calendar } from 'lucide-react';

// fworks logo for footer
const FWORKS_LOGO = '/images/fworksbuilders.png';

// Images
const IMAGES = {
  logo: '/images/smeralda/logo-full.png',
  poolMain: '/images/smeralda/pool-main.jpg',
  hero: [
    '/images/smeralda/pool-main.jpg',
    '/images/smeralda/hero-1.png',
    '/images/smeralda/hero-2.png',
    '/images/smeralda/hero-3.png',
    '/images/smeralda/hero-4.png',
    '/images/smeralda/hero-5.png',
    '/images/smeralda/hero-6.png'
  ],
  standard: [
    '/images/smeralda/standard-1.png',
    '/images/smeralda/standard-2.png',
    '/images/smeralda/standard-3.png',
    '/images/smeralda/standard-4.png',
    '/images/smeralda/standard-5.png',
    '/images/smeralda/standard-6.png',
    '/images/smeralda/standard-terrace-1.png',
    '/images/smeralda/standard-terrace-2.png'
  ],
  executive: [
    '/images/smeralda/executive-1.png',
    '/images/smeralda/executive-2.png',
    '/images/smeralda/executive-3.png',
    '/images/smeralda/executive-4.png',
    '/images/smeralda/executive-5.png',
    '/images/smeralda/executive-6.png',
    '/images/smeralda/exec-pool-1.png',
    '/images/smeralda/exec-pool-2.png',
    '/images/smeralda/exec-pool-3.png'
  ],
  gallery: [
    '/images/smeralda/pool-main.jpg',
    '/images/smeralda/gallery-1.jpg',
    '/images/smeralda/gallery-2.jpg',
    '/images/smeralda/gallery-3.jpg',
    '/images/smeralda/gallery-4.jpg',
    '/images/smeralda/gallery-5.jpg',
    '/images/smeralda/gallery-6.jpg',
    '/images/smeralda/pool-area-1.png',
    '/images/smeralda/property-1.png',
    '/images/smeralda/property-2.png',
    '/images/smeralda/property-5.png',
    '/images/smeralda/bg-reserve.jpg'
  ]
};

// Translations
const translations = {
  en: {
    nav: { home: 'Home', apartments: 'Apartments', standard: 'Standard', executive: 'Executive', prices: 'Prices', gallery: 'Gallery', contact: 'Contact', location: 'Location' },
    hero: { title: 'Résidence Villa Smeralda', subtitle: 'Your paradise in Sardinia', cta: 'Book Now', location: 'Telti, Sardinia - Italy' },
    intro: {
      title: 'Welcome to Villa Smeralda',
      text: 'Beautiful independent apartments in a private fenced park of 30,000 m² full of flowers, fruit trees, vineyards and animals. Large shared pool, restaurant, and bar on site.',
      features: ['Large Swimming Pool', 'Free WiFi', 'Air Conditioning', 'Private Terrace', 'BBQ', 'Restaurant & Bar']
    },
    apartments: {
      title: 'Our Apartments',
      standard: {
        title: 'Standard Apartment',
        subtitle: 'Shared Pool',
        desc: 'Private apartments of 60m² with fully equipped kitchen, private terrace with barbecue, bedroom, living room and bathroom.',
        features: ['1 or 2 bedrooms', 'Up to 7 persons', 'Shared pool', 'Garden or pool view'],
        oneBed: '1-Bedroom (up to 5 persons)',
        twoBed: '2-Bedroom (up to 7 persons)'
      },
      executive: {
        title: 'Executive Apartment',
        subtitle: 'Private Pool',
        desc: 'Our premium apartment built in 2017, separated from others and higher on the hill with amazing views. The only one with a private pool!',
        features: ['1 bedroom + wall bed', 'Up to 5 persons', 'Private pool', 'Mountain view']
      }
    },
    prices: {
      title: 'Prices 2026',
      subtitle: 'Below prices are rack rates. Contact us for better deals. Long stays get discounts.',
      perNight: 'per night',
      from: 'From',
      seasons: {
        low: 'Apr 1 - Jun 15',
        mid1: 'Jun 16 - Jun 30',
        high1: 'Jul 1 - Jul 31',
        peak: 'Aug 1 - Aug 31',
        mid2: 'Sep 1 - Sep 15',
        low2: 'Sep 16 - Oct 13'
      },
      extras: {
        title: 'Additional Information',
        items: [
          'Prices are per apartment for up to 4 persons',
          'Extra person: €15 per night',
          'Final cleaning: €70 one-time',
          'Gas: €5 extra, Electricity: €10 extra',
          'Breakfast: €10 per person',
          'Dinner with wine: €40 per person',
          'Airport pickup Olbia: €30',
          'Airport pickup Alghero: €80'
        ]
      }
    },
    gallery: { title: 'Gallery', subtitle: 'Discover our beautiful property' },
    contact: {
      title: 'Contact & Reservation',
      subtitle: 'We speak 6 languages and reply within 24 hours',
      form: { name: 'Full Name', email: 'Email', phone: 'Phone', arrival: 'Arrival Date', departure: 'Departure Date', apartment: 'Apartment Type', persons: 'Number of Persons', message: 'Message', submit: 'Send Request', select: 'Select...', oneBed: '1-Bedroom Standard', twoBed: '2-Bedroom Standard', execApt: 'Executive Apartment' },
      info: { phone: 'WhatsApp Only', address: 'Address', company: 'Company' },
      bookiply: 'Or book instantly via our partner Bookiply'
    },
    location: {
      title: 'How to Find Us',
      text: 'We are located only 5km from Olbia and 20 minutes from the sea. Olbia Costa Smeralda airport is 10 minutes by car.',
      directions: 'Search "Villa Smeralda Telti" on Google Maps'
    },
    footer: {
      rights: 'All rights reserved',
      webmaster: 'Website by'
    },
    features: {
      pool: 'Swimming Pool',
      wifi: 'Free WiFi',
      ac: 'Air Conditioning',
      parking: 'Free Parking',
      bbq: 'BBQ',
      restaurant: 'Restaurant',
      bar: 'Bar',
      garden: '30,000m² Garden',
      animals: 'Horses & Animals',
      beach: '20 min to Beach'
    }
  },
  nl: {
    nav: { home: 'Home', apartments: 'Appartementen', standard: 'Standaard', executive: 'Executive', prices: 'Prijzen', gallery: 'Galerij', contact: 'Contact', location: 'Locatie' },
    hero: { title: 'Résidence Villa Smeralda', subtitle: 'Uw paradijs op Sardinië', cta: 'Boek Nu', location: 'Telti, Sardinië - Italië' },
    intro: {
      title: 'Welkom bij Villa Smeralda',
      text: 'Prachtige onafhankelijke appartementen in een privé omheind park van 30.000 m² vol bloemen, fruitbomen, wijngaarden en dieren. Groot gemeenschappelijk zwembad, restaurant en bar.',
      features: ['Groot Zwembad', 'Gratis WiFi', 'Airconditioning', 'Privé Terras', 'BBQ', 'Restaurant & Bar']
    },
    apartments: {
      title: 'Onze Appartementen',
      standard: {
        title: 'Standaard Appartement',
        subtitle: 'Gedeeld Zwembad',
        desc: 'Privé appartementen van 60m² met volledig uitgeruste keuken, privé terras met barbecue, slaapkamer, woonkamer en badkamer.',
        features: ['1 of 2 slaapkamers', 'Tot 7 personen', 'Gedeeld zwembad', 'Tuin- of zwembadzicht'],
        oneBed: '1-Slaapkamer (tot 5 personen)',
        twoBed: '2-Slaapkamers (tot 7 personen)'
      },
      executive: {
        title: 'Executive Appartement',
        subtitle: 'Privé Zwembad',
        desc: 'Ons premium appartement gebouwd in 2017, gescheiden van de andere en hoger op de heuvel met geweldig uitzicht. De enige met privé zwembad!',
        features: ['1 slaapkamer + wandbed', 'Tot 5 personen', 'Privé zwembad', 'Bergzicht']
      }
    },
    prices: {
      title: 'Prijzen 2026',
      subtitle: 'Onderstaande prijzen zijn standaardtarieven. Neem contact op voor betere deals. Lange verblijven krijgen korting.',
      perNight: 'per nacht',
      from: 'Vanaf',
      seasons: {
        low: '1 apr - 15 jun',
        mid1: '16 jun - 30 jun',
        high1: '1 jul - 31 jul',
        peak: '1 aug - 31 aug',
        mid2: '1 sep - 15 sep',
        low2: '16 sep - 13 okt'
      },
      extras: {
        title: 'Extra Informatie',
        items: [
          'Prijzen zijn per appartement voor max 4 personen',
          'Extra persoon: €15 per nacht',
          'Eindschoonmaak: €70 eenmalig',
          'Gas: €5 extra, Elektriciteit: €10 extra',
          'Ontbijt: €10 per persoon',
          'Diner met wijn: €40 per persoon',
          'Luchthaven ophalen Olbia: €30',
          'Luchthaven ophalen Alghero: €80'
        ]
      }
    },
    gallery: { title: 'Galerij', subtitle: 'Ontdek ons prachtige domein' },
    contact: {
      title: 'Contact & Reservering',
      subtitle: 'Wij spreken 6 talen en antwoorden binnen 24 uur',
      form: { name: 'Volledige Naam', email: 'E-mail', phone: 'Telefoon', arrival: 'Aankomstdatum', departure: 'Vertrekdatum', apartment: 'Type Appartement', persons: 'Aantal Personen', message: 'Bericht', submit: 'Verstuur Aanvraag', select: 'Selecteer...', oneBed: '1-Slaapkamer Standaard', twoBed: '2-Slaapkamers Standaard', execApt: 'Executive Appartement' },
      info: { phone: 'Alleen WhatsApp', address: 'Adres', company: 'Bedrijf' },
      bookiply: 'Of boek direct via onze partner Bookiply'
    },
    location: {
      title: 'Hoe Ons Te Vinden',
      text: 'We liggen op slechts 5km van Olbia en 20 minuten van de zee. Olbia Costa Smeralda luchthaven is 10 minuten met de auto.',
      directions: 'Zoek "Villa Smeralda Telti" op Google Maps'
    },
    footer: {
      rights: 'Alle rechten voorbehouden',
      webmaster: 'Website door'
    },
    features: {
      pool: 'Zwembad',
      wifi: 'Gratis WiFi',
      ac: 'Airconditioning',
      parking: 'Gratis Parkeren',
      bbq: 'BBQ',
      restaurant: 'Restaurant',
      bar: 'Bar',
      garden: '30.000m² Tuin',
      animals: 'Paarden & Dieren',
      beach: '20 min naar Strand'
    }
  },
  fr: {
    nav: { home: 'Accueil', apartments: 'Appartements', standard: 'Standard', executive: 'Executive', prices: 'Tarifs', gallery: 'Galerie', contact: 'Contact', location: 'Localisation' },
    hero: { title: 'Résidence Villa Smeralda', subtitle: 'Votre paradis en Sardaigne', cta: 'Réserver', location: 'Telti, Sardaigne - Italie' },
    intro: {
      title: 'Bienvenue à Villa Smeralda',
      text: 'Beaux appartements indépendants dans un parc privé clôturé de 30 000 m² plein de fleurs, arbres fruitiers, vignes et animaux. Grande piscine partagée, restaurant et bar sur place.',
      features: ['Grande Piscine', 'WiFi Gratuit', 'Climatisation', 'Terrasse Privée', 'BBQ', 'Restaurant & Bar']
    },
    apartments: {
      title: 'Nos Appartements',
      standard: {
        title: 'Appartement Standard',
        subtitle: 'Piscine Partagée',
        desc: 'Appartements privés de 60m² avec cuisine équipée, terrasse privée avec barbecue, chambre, salon et salle de bain.',
        features: ['1 ou 2 chambres', 'Jusqu\'à 7 personnes', 'Piscine partagée', 'Vue jardin ou piscine'],
        oneBed: '1 Chambre (jusqu\'à 5 pers.)',
        twoBed: '2 Chambres (jusqu\'à 7 pers.)'
      },
      executive: {
        title: 'Appartement Executive',
        subtitle: 'Piscine Privée',
        desc: 'Notre appartement premium construit en 2017, séparé des autres et plus haut sur la colline avec une vue magnifique. Le seul avec piscine privée!',
        features: ['1 chambre + lit mural', 'Jusqu\'à 5 personnes', 'Piscine privée', 'Vue montagne']
      }
    },
    prices: {
      title: 'Tarifs 2026',
      subtitle: 'Les prix ci-dessous sont des tarifs standards. Contactez-nous pour de meilleures offres.',
      perNight: 'par nuit',
      from: 'À partir de',
      seasons: {
        low: '1 avr - 15 juin',
        mid1: '16 juin - 30 juin',
        high1: '1 juil - 31 juil',
        peak: '1 août - 31 août',
        mid2: '1 sep - 15 sep',
        low2: '16 sep - 13 oct'
      },
      extras: {
        title: 'Informations Supplémentaires',
        items: [
          'Prix par appartement pour max 4 personnes',
          'Personne supplémentaire: €15 par nuit',
          'Ménage final: €70 une fois',
          'Gaz: €5, Électricité: €10',
          'Petit-déjeuner: €10 par personne',
          'Dîner avec vin: €40 par personne',
          'Transfert aéroport Olbia: €30',
          'Transfert aéroport Alghero: €80'
        ]
      }
    },
    gallery: { title: 'Galerie', subtitle: 'Découvrez notre belle propriété' },
    contact: {
      title: 'Contact & Réservation',
      subtitle: 'Nous parlons 6 langues et répondons sous 24h',
      form: { name: 'Nom Complet', email: 'E-mail', phone: 'Téléphone', arrival: 'Date d\'arrivée', departure: 'Date de départ', apartment: 'Type d\'appartement', persons: 'Nombre de personnes', message: 'Message', submit: 'Envoyer', select: 'Sélectionner...', oneBed: '1 Chambre Standard', twoBed: '2 Chambres Standard', execApt: 'Appartement Executive' },
      info: { phone: 'WhatsApp Uniquement', address: 'Adresse', company: 'Société' },
      bookiply: 'Ou réservez directement via notre partenaire Bookiply'
    },
    location: {
      title: 'Comment Nous Trouver',
      text: 'Nous sommes situés à seulement 5km d\'Olbia et 20 minutes de la mer. L\'aéroport Olbia Costa Smeralda est à 10 minutes en voiture.',
      directions: 'Cherchez "Villa Smeralda Telti" sur Google Maps'
    },
    footer: {
      rights: 'Tous droits réservés',
      webmaster: 'Site web par'
    },
    features: {
      pool: 'Piscine',
      wifi: 'WiFi Gratuit',
      ac: 'Climatisation',
      parking: 'Parking Gratuit',
      bbq: 'BBQ',
      restaurant: 'Restaurant',
      bar: 'Bar',
      garden: 'Jardin 30.000m²',
      animals: 'Chevaux & Animaux',
      beach: '20 min de la Plage'
    }
  },
  it: {
    nav: { home: 'Home', apartments: 'Appartamenti', standard: 'Standard', executive: 'Executive', prices: 'Prezzi', gallery: 'Galleria', contact: 'Contatti', location: 'Dove Siamo' },
    hero: { title: 'Résidence Villa Smeralda', subtitle: 'Il tuo paradiso in Sardegna', cta: 'Prenota Ora', location: 'Telti, Sardegna - Italia' },
    intro: {
      title: 'Benvenuti a Villa Smeralda',
      text: 'Bellissimi appartamenti indipendenti in un parco privato recintato di 30.000 m² pieno di fiori, alberi da frutto, vigneti e animali. Grande piscina condivisa, ristorante e bar in loco.',
      features: ['Grande Piscina', 'WiFi Gratuito', 'Aria Condizionata', 'Terrazza Privata', 'BBQ', 'Ristorante & Bar']
    },
    apartments: {
      title: 'I Nostri Appartamenti',
      standard: {
        title: 'Appartamento Standard',
        subtitle: 'Piscina Condivisa',
        desc: 'Appartamenti privati di 60m² con cucina attrezzata, terrazza privata con barbecue, camera da letto, soggiorno e bagno.',
        features: ['1 o 2 camere', 'Fino a 7 persone', 'Piscina condivisa', 'Vista giardino o piscina'],
        oneBed: '1 Camera (fino a 5 pers.)',
        twoBed: '2 Camere (fino a 7 pers.)'
      },
      executive: {
        title: 'Appartamento Executive',
        subtitle: 'Piscina Privata',
        desc: 'Il nostro appartamento premium costruito nel 2017, separato dagli altri e più in alto sulla collina con vista mozzafiato. L\'unico con piscina privata!',
        features: ['1 camera + letto a muro', 'Fino a 5 persone', 'Piscina privata', 'Vista montagna']
      }
    },
    prices: {
      title: 'Prezzi 2026',
      subtitle: 'I prezzi sotto sono tariffe standard. Contattateci per offerte migliori.',
      perNight: 'a notte',
      from: 'Da',
      seasons: {
        low: '1 apr - 15 giu',
        mid1: '16 giu - 30 giu',
        high1: '1 lug - 31 lug',
        peak: '1 ago - 31 ago',
        mid2: '1 set - 15 set',
        low2: '16 set - 13 ott'
      },
      extras: {
        title: 'Informazioni Aggiuntive',
        items: [
          'Prezzi per appartamento per max 4 persone',
          'Persona extra: €15 a notte',
          'Pulizia finale: €70 una tantum',
          'Gas: €5, Elettricità: €10',
          'Colazione: €10 a persona',
          'Cena con vino: €40 a persona',
          'Transfer aeroporto Olbia: €30',
          'Transfer aeroporto Alghero: €80'
        ]
      }
    },
    gallery: { title: 'Galleria', subtitle: 'Scopri la nostra bella proprietà' },
    contact: {
      title: 'Contatti & Prenotazione',
      subtitle: 'Parliamo 6 lingue e rispondiamo entro 24 ore',
      form: { name: 'Nome Completo', email: 'E-mail', phone: 'Telefono', arrival: 'Data Arrivo', departure: 'Data Partenza', apartment: 'Tipo Appartamento', persons: 'Numero Persone', message: 'Messaggio', submit: 'Invia Richiesta', select: 'Seleziona...', oneBed: '1 Camera Standard', twoBed: '2 Camere Standard', execApt: 'Appartamento Executive' },
      info: { phone: 'Solo WhatsApp', address: 'Indirizzo', company: 'Azienda' },
      bookiply: 'Oppure prenota direttamente tramite il nostro partner Bookiply'
    },
    location: {
      title: 'Come Trovarci',
      text: 'Siamo situati a soli 5km da Olbia e 20 minuti dal mare. L\'aeroporto Olbia Costa Smeralda è a 10 minuti in auto.',
      directions: 'Cerca "Villa Smeralda Telti" su Google Maps'
    },
    footer: {
      rights: 'Tutti i diritti riservati',
      webmaster: 'Sito web di'
    },
    features: {
      pool: 'Piscina',
      wifi: 'WiFi Gratuito',
      ac: 'Aria Condizionata',
      parking: 'Parcheggio Gratuito',
      bbq: 'BBQ',
      restaurant: 'Ristorante',
      bar: 'Bar',
      garden: 'Giardino 30.000m²',
      animals: 'Cavalli & Animali',
      beach: '20 min dalla Spiaggia'
    }
  },
  es: {
    nav: { home: 'Inicio', apartments: 'Apartamentos', standard: 'Estándar', executive: 'Executive', prices: 'Precios', gallery: 'Galería', contact: 'Contacto', location: 'Ubicación' },
    hero: { title: 'Résidence Villa Smeralda', subtitle: 'Tu paraíso en Cerdeña', cta: 'Reservar', location: 'Telti, Cerdeña - Italia' },
    intro: {
      title: 'Bienvenidos a Villa Smeralda',
      text: 'Hermosos apartamentos independientes en un parque privado vallado de 30.000 m² lleno de flores, árboles frutales, viñedos y animales. Gran piscina compartida, restaurante y bar.',
      features: ['Gran Piscina', 'WiFi Gratis', 'Aire Acondicionado', 'Terraza Privada', 'BBQ', 'Restaurante & Bar']
    },
    apartments: {
      title: 'Nuestros Apartamentos',
      standard: {
        title: 'Apartamento Estándar',
        subtitle: 'Piscina Compartida',
        desc: 'Apartamentos privados de 60m² con cocina equipada, terraza privada con barbacoa, dormitorio, salón y baño.',
        features: ['1 o 2 dormitorios', 'Hasta 7 personas', 'Piscina compartida', 'Vista jardín o piscina'],
        oneBed: '1 Dormitorio (hasta 5 pers.)',
        twoBed: '2 Dormitorios (hasta 7 pers.)'
      },
      executive: {
        title: 'Apartamento Executive',
        subtitle: 'Piscina Privada',
        desc: 'Nuestro apartamento premium construido en 2017, separado de los demás y más alto en la colina con vistas increíbles. ¡El único con piscina privada!',
        features: ['1 dormitorio + cama mural', 'Hasta 5 personas', 'Piscina privada', 'Vista montaña']
      }
    },
    prices: {
      title: 'Precios 2026',
      subtitle: 'Los precios son tarifas estándar. Contáctenos para mejores ofertas.',
      perNight: 'por noche',
      from: 'Desde',
      seasons: {
        low: '1 abr - 15 jun',
        mid1: '16 jun - 30 jun',
        high1: '1 jul - 31 jul',
        peak: '1 ago - 31 ago',
        mid2: '1 sep - 15 sep',
        low2: '16 sep - 13 oct'
      },
      extras: {
        title: 'Información Adicional',
        items: [
          'Precios por apartamento para máx. 4 personas',
          'Persona extra: €15 por noche',
          'Limpieza final: €70 una vez',
          'Gas: €5, Electricidad: €10',
          'Desayuno: €10 por persona',
          'Cena con vino: €40 por persona',
          'Transfer aeropuerto Olbia: €30',
          'Transfer aeropuerto Alghero: €80'
        ]
      }
    },
    gallery: { title: 'Galería', subtitle: 'Descubre nuestra hermosa propiedad' },
    contact: {
      title: 'Contacto & Reserva',
      subtitle: 'Hablamos 6 idiomas y respondemos en 24 horas',
      form: { name: 'Nombre Completo', email: 'E-mail', phone: 'Teléfono', arrival: 'Fecha Llegada', departure: 'Fecha Salida', apartment: 'Tipo Apartamento', persons: 'Número de Personas', message: 'Mensaje', submit: 'Enviar', select: 'Seleccionar...', oneBed: '1 Dormitorio Estándar', twoBed: '2 Dormitorios Estándar', execApt: 'Apartamento Executive' },
      info: { phone: 'Solo WhatsApp', address: 'Dirección', company: 'Empresa' },
      bookiply: 'O reserve directamente a través de nuestro socio Bookiply'
    },
    location: {
      title: 'Cómo Encontrarnos',
      text: 'Estamos ubicados a solo 5km de Olbia y 20 minutos del mar. El aeropuerto Olbia Costa Smeralda está a 10 minutos en coche.',
      directions: 'Busque "Villa Smeralda Telti" en Google Maps'
    },
    footer: {
      rights: 'Todos los derechos reservados',
      webmaster: 'Sitio web por'
    },
    features: {
      pool: 'Piscina',
      wifi: 'WiFi Gratis',
      ac: 'Aire Acondicionado',
      parking: 'Parking Gratis',
      bbq: 'BBQ',
      restaurant: 'Restaurante',
      bar: 'Bar',
      garden: 'Jardín 30.000m²',
      animals: 'Caballos & Animales',
      beach: '20 min de la Playa'
    }
  },
  de: {
    nav: { home: 'Startseite', apartments: 'Apartments', standard: 'Standard', executive: 'Executive', prices: 'Preise', gallery: 'Galerie', contact: 'Kontakt', location: 'Anfahrt' },
    hero: { title: 'Résidence Villa Smeralda', subtitle: 'Ihr Paradies auf Sardinien', cta: 'Jetzt Buchen', location: 'Telti, Sardinien - Italien' },
    intro: {
      title: 'Willkommen in Villa Smeralda',
      text: 'Wunderschöne unabhängige Apartments in einem privaten eingezäunten Park von 30.000 m² voller Blumen, Obstbäume, Weinberge und Tiere. Großer Gemeinschaftspool, Restaurant und Bar vor Ort.',
      features: ['Großer Pool', 'Kostenloses WLAN', 'Klimaanlage', 'Private Terrasse', 'BBQ', 'Restaurant & Bar']
    },
    apartments: {
      title: 'Unsere Apartments',
      standard: {
        title: 'Standard Apartment',
        subtitle: 'Gemeinschaftspool',
        desc: 'Private Apartments mit 60m², voll ausgestatteter Küche, privater Terrasse mit Grill, Schlafzimmer, Wohnzimmer und Bad.',
        features: ['1 oder 2 Schlafzimmer', 'Bis zu 7 Personen', 'Gemeinschaftspool', 'Garten- oder Poolblick'],
        oneBed: '1 Schlafzimmer (bis 5 Pers.)',
        twoBed: '2 Schlafzimmer (bis 7 Pers.)'
      },
      executive: {
        title: 'Executive Apartment',
        subtitle: 'Privater Pool',
        desc: 'Unser Premium-Apartment aus 2017, getrennt von den anderen und höher am Hang mit atemberaubender Aussicht. Das einzige mit privatem Pool!',
        features: ['1 Schlafzimmer + Wandbett', 'Bis zu 5 Personen', 'Privater Pool', 'Bergblick']
      }
    },
    prices: {
      title: 'Preise 2026',
      subtitle: 'Die unten angegebenen Preise sind Standardtarife. Kontaktieren Sie uns für bessere Angebote.',
      perNight: 'pro Nacht',
      from: 'Ab',
      seasons: {
        low: '1. Apr - 15. Jun',
        mid1: '16. Jun - 30. Jun',
        high1: '1. Jul - 31. Jul',
        peak: '1. Aug - 31. Aug',
        mid2: '1. Sep - 15. Sep',
        low2: '16. Sep - 13. Okt'
      },
      extras: {
        title: 'Zusätzliche Informationen',
        items: [
          'Preise pro Apartment für max. 4 Personen',
          'Zusätzliche Person: €15 pro Nacht',
          'Endreinigung: €70 einmalig',
          'Gas: €5, Strom: €10',
          'Frühstück: €10 pro Person',
          'Abendessen mit Wein: €40 pro Person',
          'Flughafentransfer Olbia: €30',
          'Flughafentransfer Alghero: €80'
        ]
      }
    },
    gallery: { title: 'Galerie', subtitle: 'Entdecken Sie unser schönes Anwesen' },
    contact: {
      title: 'Kontakt & Reservierung',
      subtitle: 'Wir sprechen 6 Sprachen und antworten innerhalb von 24 Stunden',
      form: { name: 'Vollständiger Name', email: 'E-Mail', phone: 'Telefon', arrival: 'Anreisedatum', departure: 'Abreisedatum', apartment: 'Apartmenttyp', persons: 'Anzahl Personen', message: 'Nachricht', submit: 'Anfrage Senden', select: 'Auswählen...', oneBed: '1 Schlafzimmer Standard', twoBed: '2 Schlafzimmer Standard', execApt: 'Executive Apartment' },
      info: { phone: 'Nur WhatsApp', address: 'Adresse', company: 'Firma' },
      bookiply: 'Oder buchen Sie direkt über unseren Partner Bookiply'
    },
    location: {
      title: 'So Finden Sie Uns',
      text: 'Wir befinden uns nur 5km von Olbia und 20 Minuten vom Meer entfernt. Der Flughafen Olbia Costa Smeralda ist 10 Minuten mit dem Auto entfernt.',
      directions: 'Suchen Sie "Villa Smeralda Telti" auf Google Maps'
    },
    footer: {
      rights: 'Alle Rechte vorbehalten',
      webmaster: 'Website von'
    },
    features: {
      pool: 'Schwimmbad',
      wifi: 'Kostenloses WLAN',
      ac: 'Klimaanlage',
      parking: 'Kostenlos Parken',
      bbq: 'BBQ',
      restaurant: 'Restaurant',
      bar: 'Bar',
      garden: '30.000m² Garten',
      animals: 'Pferde & Tiere',
      beach: '20 Min zum Strand'
    }
  }
};

// Pricing data
const PRICES = {
  standard1: { low: 125, mid1: 150, high1: 209, peak: 249, mid2: 145, low2: 129 },
  standard2: { low: 130, mid1: 165, high1: 219, peak: 259, mid2: 155, low2: 139 },
  executive: { low: 139, mid1: 175, high1: 229, peak: 265, mid2: 165, low2: 145 }
};

const SmeraldaApp = () => {
  const [lang, setLang] = useState('en');
  const [menuOpen, setMenuOpen] = useState(false);
  const [heroIndex, setHeroIndex] = useState(0);
  const [activeSection, setActiveSection] = useState('home');
  const t = translations[lang];

  // Auto-rotate hero images
  useEffect(() => {
    const timer = setInterval(() => {
      setHeroIndex((prev) => (prev + 1) % IMAGES.hero.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  // Track visitor
  useEffect(() => {
    const API = process.env.REACT_APP_BACKEND_URL;
    fetch(`${API}/api/public/track-visit`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ site_slug: 'smeralda' })
    }).catch(() => {});
  }, []);

  const scrollTo = (id) => {
    setMenuOpen(false);
    setActiveSection(id);
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  const ImageSlider = ({ images, className = '' }) => {
    const [idx, setIdx] = useState(0);
    return (
      <div className={`relative overflow-hidden rounded-xl ${className}`}>
        <img src={images[idx]} alt="" className="w-full h-full object-cover" />
        <button onClick={() => setIdx((idx - 1 + images.length) % images.length)} 
          className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white p-2 rounded-full shadow-lg">
          <ChevronLeft className="w-5 h-5 text-gray-800" />
        </button>
        <button onClick={() => setIdx((idx + 1) % images.length)}
          className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white p-2 rounded-full shadow-lg">
          <ChevronRight className="w-5 h-5 text-gray-800" />
        </button>
        <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-2">
          {images.map((_, i) => (
            <button key={i} onClick={() => setIdx(i)}
              className={`w-2 h-2 rounded-full transition-all ${i === idx ? 'bg-white w-6' : 'bg-white/50'}`} />
          ))}
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-white" style={{ fontFamily: "'Poppins', sans-serif" }}>
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-md shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex justify-between items-center h-16 sm:h-20">
            <img src={IMAGES.logo} alt="Villa Smeralda" className="h-10 sm:h-14 w-auto" />
            
            {/* Desktop Nav */}
            <div className="hidden lg:flex items-center gap-6">
              {['home', 'apartments', 'prices', 'gallery', 'contact', 'location'].map((item) => (
                <button key={item} onClick={() => scrollTo(item)}
                  className={`text-sm font-medium transition-colors ${activeSection === item ? 'text-blue-600' : 'text-gray-600 hover:text-blue-600'}`}>
                  {t.nav[item]}
                </button>
              ))}
            </div>

            {/* Language Selector */}
            <div className="flex items-center gap-2">
              <div className="hidden sm:flex items-center gap-1 bg-gray-100 rounded-lg p-1">
                {['en', 'nl', 'fr', 'it', 'es', 'de'].map((l) => (
                  <button key={l} onClick={() => setLang(l)}
                    className={`px-2 py-1 rounded text-xs font-medium transition-all ${lang === l ? 'bg-white shadow text-blue-600' : 'text-gray-500 hover:text-gray-700'}`}>
                    {l.toUpperCase()}
                  </button>
                ))}
              </div>
              <button onClick={() => setMenuOpen(!menuOpen)} className="lg:hidden p-2">
                {menuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {menuOpen && (
          <div className="lg:hidden bg-white border-t">
            <div className="px-4 py-4 space-y-3">
              {['home', 'apartments', 'prices', 'gallery', 'contact', 'location'].map((item) => (
                <button key={item} onClick={() => scrollTo(item)}
                  className="block w-full text-left py-2 text-gray-600 hover:text-blue-600 font-medium">
                  {t.nav[item]}
                </button>
              ))}
              <div className="flex flex-wrap gap-2 pt-3 border-t">
                {['en', 'nl', 'fr', 'it', 'es', 'de'].map((l) => (
                  <button key={l} onClick={() => setLang(l)}
                    className={`px-3 py-1.5 rounded text-sm font-medium ${lang === l ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-600'}`}>
                    {l.toUpperCase()}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section id="home" className="relative h-screen min-h-[600px]">
        <div className="absolute inset-0">
          {IMAGES.hero.map((img, i) => (
            <img key={i} src={img} alt="" 
              className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ${i === heroIndex ? 'opacity-100' : 'opacity-0'}`} />
          ))}
          <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/20 to-black/60" />
        </div>
        <div className="relative h-full flex flex-col items-center justify-center text-center text-white px-4">
          <p className="text-sm sm:text-base tracking-[0.3em] uppercase mb-4 text-white/90">{t.hero.location}</p>
          <h1 className="text-4xl sm:text-5xl lg:text-7xl font-bold mb-4">{t.hero.title}</h1>
          <p className="text-xl sm:text-2xl lg:text-3xl font-light mb-8 text-white/90">{t.hero.subtitle}</p>
          <button onClick={() => scrollTo('contact')}
            className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-full text-lg font-semibold transition-all hover:scale-105 shadow-xl">
            {t.hero.cta}
          </button>
        </div>
        {/* Hero Indicators */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-2">
          {IMAGES.hero.map((_, i) => (
            <button key={i} onClick={() => setHeroIndex(i)}
              className={`w-3 h-3 rounded-full transition-all ${i === heroIndex ? 'bg-white w-8' : 'bg-white/50 hover:bg-white/70'}`} />
          ))}
        </div>
      </section>

      {/* Intro Section */}
      <section className="py-16 sm:py-24 bg-gradient-to-b from-blue-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">{t.intro.title}</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">{t.intro.text}</p>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
            {[
              { icon: Waves, label: t.features.pool },
              { icon: Wifi, label: t.features.wifi },
              { icon: Sun, label: t.features.ac },
              { icon: Car, label: t.features.parking },
              { icon: UtensilsCrossed, label: t.features.restaurant },
              { icon: Home, label: t.features.garden }
            ].map(({ icon: Icon, label }, i) => (
              <div key={i} className="bg-white rounded-xl p-4 sm:p-6 text-center shadow-lg hover:shadow-xl transition-shadow border border-gray-100">
                <Icon className="w-8 h-8 mx-auto mb-3 text-blue-600" />
                <p className="text-sm font-medium text-gray-700">{label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Apartments Section */}
      <section id="apartments" className="py-16 sm:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <h2 className="text-3xl sm:text-4xl font-bold text-center text-gray-900 mb-12">{t.apartments.title}</h2>
          
          {/* Standard Apartment */}
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 mb-16">
            <ImageSlider images={IMAGES.standard} className="h-[300px] sm:h-[400px] lg:h-[500px]" />
            <div className="flex flex-col justify-center">
              <span className="text-blue-600 font-semibold mb-2">{t.apartments.standard.subtitle}</span>
              <h3 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4">{t.apartments.standard.title}</h3>
              <p className="text-gray-600 mb-6">{t.apartments.standard.desc}</p>
              <div className="grid grid-cols-2 gap-3 mb-6">
                {t.apartments.standard.features.map((feature, i) => (
                  <div key={i} className="flex items-center gap-2 text-gray-700">
                    <div className="w-2 h-2 bg-blue-600 rounded-full" />
                    <span className="text-sm">{feature}</span>
                  </div>
                ))}
              </div>
              <div className="flex flex-col sm:flex-row gap-3">
                <div className="bg-blue-50 rounded-lg px-4 py-3">
                  <p className="text-sm text-blue-600 font-medium">{t.apartments.standard.oneBed}</p>
                  <p className="text-xl font-bold text-gray-900">{t.prices.from} €125 <span className="text-sm font-normal text-gray-500">{t.prices.perNight}</span></p>
                </div>
                <div className="bg-blue-50 rounded-lg px-4 py-3">
                  <p className="text-sm text-blue-600 font-medium">{t.apartments.standard.twoBed}</p>
                  <p className="text-xl font-bold text-gray-900">{t.prices.from} €130 <span className="text-sm font-normal text-gray-500">{t.prices.perNight}</span></p>
                </div>
              </div>
            </div>
          </div>

          {/* Executive Apartment */}
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12">
            <div className="flex flex-col justify-center order-2 lg:order-1">
              <span className="text-amber-600 font-semibold mb-2">{t.apartments.executive.subtitle}</span>
              <h3 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4">{t.apartments.executive.title}</h3>
              <p className="text-gray-600 mb-6">{t.apartments.executive.desc}</p>
              <div className="grid grid-cols-2 gap-3 mb-6">
                {t.apartments.executive.features.map((feature, i) => (
                  <div key={i} className="flex items-center gap-2 text-gray-700">
                    <div className="w-2 h-2 bg-amber-600 rounded-full" />
                    <span className="text-sm">{feature}</span>
                  </div>
                ))}
              </div>
              <div className="bg-amber-50 rounded-lg px-4 py-3 inline-block">
                <p className="text-sm text-amber-600 font-medium">Executive (up to 5 persons)</p>
                <p className="text-xl font-bold text-gray-900">{t.prices.from} €139 <span className="text-sm font-normal text-gray-500">{t.prices.perNight}</span></p>
              </div>
            </div>
            <ImageSlider images={IMAGES.executive} className="h-[300px] sm:h-[400px] lg:h-[500px] order-1 lg:order-2" />
          </div>
        </div>
      </section>

      {/* Prices Section */}
      <section id="prices" className="py-16 sm:py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">{t.prices.title}</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">{t.prices.subtitle}</p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 mb-12">
            {/* Standard 1-Bed */}
            <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
              <img src="/images/smeralda/price-standard-1.jpg" alt="" className="w-full h-48 object-cover" />
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-1">{t.apartments.standard.title}</h3>
                <p className="text-sm text-gray-500 mb-4">{t.apartments.standard.oneBed}</p>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between"><span className="text-gray-500">{t.prices.seasons.low}</span><span className="font-semibold">€{PRICES.standard1.low}</span></div>
                  <div className="flex justify-between"><span className="text-gray-500">{t.prices.seasons.mid1}</span><span className="font-semibold">€{PRICES.standard1.mid1}</span></div>
                  <div className="flex justify-between"><span className="text-gray-500">{t.prices.seasons.high1}</span><span className="font-semibold">€{PRICES.standard1.high1}</span></div>
                  <div className="flex justify-between bg-amber-50 -mx-2 px-2 py-1 rounded"><span className="text-amber-700">{t.prices.seasons.peak}</span><span className="font-bold text-amber-700">€{PRICES.standard1.peak}</span></div>
                  <div className="flex justify-between"><span className="text-gray-500">{t.prices.seasons.mid2}</span><span className="font-semibold">€{PRICES.standard1.mid2}</span></div>
                  <div className="flex justify-between"><span className="text-gray-500">{t.prices.seasons.low2}</span><span className="font-semibold">€{PRICES.standard1.low2}</span></div>
                </div>
              </div>
            </div>

            {/* Standard 2-Bed */}
            <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
              <img src="/images/smeralda/price-standard-2.jpg" alt="" className="w-full h-48 object-cover" />
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-1">{t.apartments.standard.title}</h3>
                <p className="text-sm text-gray-500 mb-4">{t.apartments.standard.twoBed}</p>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between"><span className="text-gray-500">{t.prices.seasons.low}</span><span className="font-semibold">€{PRICES.standard2.low}</span></div>
                  <div className="flex justify-between"><span className="text-gray-500">{t.prices.seasons.mid1}</span><span className="font-semibold">€{PRICES.standard2.mid1}</span></div>
                  <div className="flex justify-between"><span className="text-gray-500">{t.prices.seasons.high1}</span><span className="font-semibold">€{PRICES.standard2.high1}</span></div>
                  <div className="flex justify-between bg-amber-50 -mx-2 px-2 py-1 rounded"><span className="text-amber-700">{t.prices.seasons.peak}</span><span className="font-bold text-amber-700">€{PRICES.standard2.peak}</span></div>
                  <div className="flex justify-between"><span className="text-gray-500">{t.prices.seasons.mid2}</span><span className="font-semibold">€{PRICES.standard2.mid2}</span></div>
                  <div className="flex justify-between"><span className="text-gray-500">{t.prices.seasons.low2}</span><span className="font-semibold">€{PRICES.standard2.low2}</span></div>
                </div>
              </div>
            </div>

            {/* Executive */}
            <div className="bg-white rounded-2xl shadow-lg overflow-hidden border-2 border-amber-400">
              <div className="bg-amber-400 text-white text-center py-1 text-sm font-semibold">PREMIUM</div>
              <img src="/images/smeralda/price-executive.jpg" alt="" className="w-full h-48 object-cover" />
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-1">{t.apartments.executive.title}</h3>
                <p className="text-sm text-gray-500 mb-4">{t.apartments.executive.subtitle}</p>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between"><span className="text-gray-500">{t.prices.seasons.low}</span><span className="font-semibold">€{PRICES.executive.low}</span></div>
                  <div className="flex justify-between"><span className="text-gray-500">{t.prices.seasons.mid1}</span><span className="font-semibold">€{PRICES.executive.mid1}</span></div>
                  <div className="flex justify-between"><span className="text-gray-500">{t.prices.seasons.high1}</span><span className="font-semibold">€{PRICES.executive.high1}</span></div>
                  <div className="flex justify-between bg-amber-50 -mx-2 px-2 py-1 rounded"><span className="text-amber-700">{t.prices.seasons.peak}</span><span className="font-bold text-amber-700">€{PRICES.executive.peak}</span></div>
                  <div className="flex justify-between"><span className="text-gray-500">{t.prices.seasons.mid2}</span><span className="font-semibold">€{PRICES.executive.mid2}</span></div>
                  <div className="flex justify-between"><span className="text-gray-500">{t.prices.seasons.low2}</span><span className="font-semibold">€{PRICES.executive.low2}</span></div>
                </div>
              </div>
            </div>
          </div>

          {/* Extra Info */}
          <div className="bg-white rounded-xl p-6 shadow-lg">
            <h4 className="font-bold text-gray-900 mb-4">{t.prices.extras.title}</h4>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3">
              {t.prices.extras.items.map((item, i) => (
                <div key={i} className="flex items-start gap-2 text-sm text-gray-600">
                  <div className="w-1.5 h-1.5 bg-blue-600 rounded-full mt-2 flex-shrink-0" />
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Gallery Section */}
      <section id="gallery" className="py-16 sm:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">{t.gallery.title}</h2>
            <p className="text-gray-600">{t.gallery.subtitle}</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4">
            {IMAGES.gallery.map((img, i) => (
              <div key={i} className={`rounded-xl overflow-hidden cursor-pointer group ${
                i === 0 ? 'col-span-2 row-span-2' : 
                i === 3 || i === 7 ? 'col-span-2' : ''
              }`}>
                <img src={img} alt={`Gallery ${i + 1}`} 
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" 
                  style={{ minHeight: i === 0 ? '400px' : i === 3 || i === 7 ? '200px' : '180px' }} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-16 sm:py-24 bg-blue-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">{t.contact.title}</h2>
            <p className="text-blue-200">{t.contact.subtitle}</p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <div className="bg-white rounded-2xl p-6 sm:p-8 text-gray-900">
              <form className="space-y-4" onSubmit={(e) => {
                e.preventDefault();
                const formData = new FormData(e.target);
                const subject = `Reservation Request - Villa Smeralda`;
                const body = `Name: ${formData.get('name')}%0D%0AEmail: ${formData.get('email')}%0D%0APhone: ${formData.get('phone')}%0D%0AArrival: ${formData.get('arrival')}%0D%0ADeparture: ${formData.get('departure')}%0D%0AApartment: ${formData.get('apartment')}%0D%0APersons: ${formData.get('persons')}%0D%0AMessage: ${formData.get('message')}`;
                window.location.href = `mailto:villasmeralda1980@gmail.com?subject=${subject}&body=${body}`;
              }}>
                <div className="grid sm:grid-cols-2 gap-4">
                  <input name="name" type="text" placeholder={t.contact.form.name} required
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500" />
                  <input name="email" type="email" placeholder={t.contact.form.email} required
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500" />
                </div>
                <input name="phone" type="tel" placeholder={t.contact.form.phone}
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500" />
                <div className="grid sm:grid-cols-2 gap-4">
                  <input name="arrival" type="date" required
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500" />
                  <input name="departure" type="date" required
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500" />
                </div>
                <div className="grid sm:grid-cols-2 gap-4">
                  <select name="apartment" required
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
                    <option value="">{t.contact.form.select}</option>
                    <option value="1bed">{t.contact.form.oneBed}</option>
                    <option value="2bed">{t.contact.form.twoBed}</option>
                    <option value="executive">{t.contact.form.execApt}</option>
                  </select>
                  <select name="persons" required
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
                    <option value="">{t.contact.form.persons}</option>
                    {[1,2,3,4,5,6,7].map(n => <option key={n} value={n}>{n}</option>)}
                  </select>
                </div>
                <textarea name="message" rows={4} placeholder={t.contact.form.message}
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500" />
                <button type="submit"
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white py-4 rounded-lg font-semibold transition-colors">
                  {t.contact.form.submit}
                </button>
              </form>
            </div>

            {/* Contact Info */}
            <div className="space-y-8">
              <div>
                <h3 className="text-xl font-bold mb-6">{t.contact.info.phone}</h3>
                <a href="https://wa.me/32494516064" target="_blank" rel="noopener noreferrer"
                  className="inline-flex items-center gap-3 bg-green-500 hover:bg-green-600 text-white px-6 py-4 rounded-xl text-lg font-semibold transition-colors">
                  <Phone className="w-6 h-6" />
                  +32 494 516 064
                </a>
              </div>

              <div>
                <h3 className="text-xl font-bold mb-4">{t.contact.info.address}</h3>
                <div className="flex items-start gap-3 text-blue-200">
                  <MapPin className="w-5 h-5 mt-1 flex-shrink-0" />
                  <div>
                    <p>Località CAPRULEDDU Via Campu 179</p>
                    <p>S.P.38, 07020 Telti (SS)</p>
                    <p>Sardegna, Italia</p>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-xl font-bold mb-4">{t.contact.info.company}</h3>
                <div className="text-blue-200 text-sm">
                  <p>Smeralda Immobiliare srl</p>
                  <p>IT06286710964</p>
                </div>
              </div>

              <div>
                <a href="mailto:villasmeralda1980@gmail.com" className="flex items-center gap-3 text-blue-200 hover:text-white transition-colors">
                  <Mail className="w-5 h-5" />
                  villasmeralda1980@gmail.com
                </a>
              </div>

              {/* TripAdvisor */}
              <div className="bg-white/10 rounded-xl p-4 flex items-center gap-4">
                <div className="flex text-yellow-400">
                  {[1,2,3,4].map(i => <Star key={i} className="w-5 h-5 fill-current" />)}
                  <Star className="w-5 h-5" />
                </div>
                <span className="text-sm">4.2/5 on TripAdvisor (51 reviews)</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Location Section */}
      <section id="location" className="py-16 sm:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">{t.location.title}</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">{t.location.text}</p>
          </div>
          <div className="rounded-2xl overflow-hidden shadow-xl">
            <iframe 
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3044.8234!2d9.382295!3d40.906636!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x12d94c8d3f7e9e9d%3A0xa345c8e9f8e9d8e9!2sVilla%20Smeralda!5e0!3m2!1sen!2sit!4v1234567890"
              width="100%" height="450" style={{ border: 0 }} allowFullScreen="" loading="lazy"
              referrerPolicy="no-referrer-when-downgrade" title="Villa Smeralda Location"
            />
          </div>
          <p className="text-center text-gray-500 mt-4 text-sm">{t.location.directions}</p>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="flex items-center gap-4">
              <img src={IMAGES.logo} alt="Villa Smeralda" className="h-12 w-auto brightness-0 invert" />
              <div className="text-sm text-gray-400">
                <p>Résidence Villa Smeralda</p>
                <p>Telti, Sardegna - Italia</p>
              </div>
            </div>
            <div className="text-center md:text-right text-sm text-gray-400">
              <p>&copy; {new Date().getFullYear()} Villa Smeralda. {t.footer.rights}</p>
              <div className="mt-2 flex items-center justify-center md:justify-end gap-2">
                <span>{t.footer.webmaster}</span>
                <a href="https://fworksbuilders.com" target="_blank" rel="noopener noreferrer" 
                  className="flex items-center gap-2 text-blue-400 hover:text-blue-300 transition-colors">
                  <img src={FWORKS_LOGO} alt="fworks builders" className="h-6 w-auto" />
                  <span>fworks builders</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </footer>

      {/* Tawk.to Chat Widget */}
      <script type="text/javascript" dangerouslySetInnerHTML={{
        __html: `
          var Tawk_API=Tawk_API||{}, Tawk_LoadStart=new Date();
          (function(){
            var s1=document.createElement("script"),s0=document.getElementsByTagName("script")[0];
            s1.async=true;
            s1.src='https://embed.tawk.to/YOUR_TAWK_ID/default';
            s1.charset='UTF-8';
            s1.setAttribute('crossorigin','*');
            s0.parentNode.insertBefore(s1,s0);
          })();
        `
      }} />
    </div>
  );
};

export default SmeraldaApp;
