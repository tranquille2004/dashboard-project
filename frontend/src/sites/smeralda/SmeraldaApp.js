import React, { useState, useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { Menu, X, Phone, Mail, MapPin, ChevronLeft, ChevronRight, Star, Wifi, Car, UtensilsCrossed, Waves, Sun, Home, Bed, Users, Bath, TreePine, Mountain, CheckCircle } from 'lucide-react';
import SEO from '@/components/SEO';
import URLSync from '@/components/URLSync';

// SEO Configuration for Smeralda
const SEO_CONFIG = {
  siteName: "Résidence Villa Smeralda",
  defaultImage: 'https://smeraldavacanze.it/images/smeralda/hero-pool-main.jpg',
  baseUrl: 'https://smeraldavacanze.it',
  title: "Villa Smeralda | Vakantieappartementen Sardinië, Italië",
  description: "Résidence Villa Smeralda - Prachtige vakantieappartementen in Sardinië, Italië. Groot zwembad, restaurant, bar. Standaard en Executive appartementen met privé zwembad. Boek nu uw droomvakantie!",
  keywords: "vakantie Sardinië, appartement Sardinia, Villa Smeralda, Italië vakantie, zwembad, Telti, Costa Smeralda, vakantiewoning, ferienwohnung sardinien"
};

// fworks logo for footer
const FWORKS_LOGO = '/images/fworksbuilders.png';

// Generate image arrays
const generateImages = (prefix, count) => 
  Array.from({ length: count }, (_, i) => `/images/smeralda/${prefix}-${i + 1}.jpg`);

// Images organized by type
const IMAGES = {
  logo: '/images/smeralda/logo-full.png',
  heroMain: '/images/smeralda/hero-pool-main.jpg', // Single hero image - pool with palm trees
  standard: generateImages('std', 40), // Use first 40 of 71
  executive: generateImages('exec', 15),
  mobilhome: [
    '/images/smeralda/mobilhome-1.jpg',
    '/images/smeralda/mobilhome-6.jpg',
    '/images/smeralda/mobilhome-11.jpg',
    '/images/smeralda/mobilhome-12.jpg',
    '/images/smeralda/mobilhome-13.jpg',
    '/images/smeralda/mobilhome-14.jpg',
  ],
  exterior: generateImages('ext', 30), // Use first 30 of 48
};

// Translations - 6 languages
const translations = {
  en: {
    nav: { home: 'Home', apartments: 'Accommodations', standard: 'Standard', executive: 'Executive', mobilhome: 'Mobile Home', prices: 'Prices 2026', gallery: 'Gallery', services: 'Services', contact: 'Contact', location: 'How to Find Us' },
    hero: { title: 'Résidence Villa Smeralda', subtitle: 'Your paradise in Sardinia', cta: 'Book Now', location: 'Telti, Sardinia - Italy' },
    intro: {
      title: 'Welcome to Villa Smeralda',
      text: 'Beautiful independent apartments in a private fenced park of 30,000 m² full of flowers, fruit trees, vineyards and animals. Large shared pool, restaurant, and bar on site.',
      features: ['Large Swimming Pool', 'Free WiFi', 'Air Conditioning', 'Private Terrace', 'BBQ', 'Restaurant & Bar']
    },
    apartments: {
      title: 'Our Accommodations',
      standard: {
        title: 'Standard Apartment',
        subtitle: 'Shared Pool',
        desc: 'Private apartments of 60m² with fully equipped kitchen, private terrace with barbecue, bedroom, living room and bathroom. Available in 1 or 2 bedroom configuration.',
        features: ['1 or 2 bedrooms', 'Up to 7 persons', 'Shared pool', 'Private terrace', 'Full kitchen', 'Air conditioning'],
        btn: 'View Gallery'
      },
      executive: {
        title: 'Executive Apartment',
        subtitle: 'Private Pool',
        desc: 'Our premium apartment built in 2017, separated from others and higher on the hill with amazing views. The only apartment with a private pool! Features 1 bedroom plus a wall bed in the living room.',
        features: ['1 bedroom + wall bed', 'Up to 5 persons', 'Private pool', 'Mountain view', 'Premium finishing', 'Panoramic terrace'],
        btn: 'View Gallery'
      },
      mobilhome: {
        title: 'Mobile Home',
        subtitle: 'Private Pool',
        desc: 'Our newest addition! A cozy mobile home with modern interior, fully equipped kitchen, bathroom with indoor and outdoor shower, and your own private pool. Perfect for couples or small families.',
        features: ['1 bedroom', '2-4 pers (4 if child incl.)', 'Private pool', 'Outdoor shower', 'Full kitchen', 'BBQ area'],
        btn: 'View Gallery'
      }
    },
    prices: {
      title: 'Prices 2026',
      subtitle: 'Prices below are rack rates per night. Contact us for special deals on longer stays.',
      perNight: '/night',
      from: 'From',
      oneBed: '1-Bedroom',
      twoBed: '2-Bedroom',
      seasons: {
        period: 'Period',
        low: 'Apr 1 - Jun 15',
        mid1: 'Jun 16 - Jun 30',
        high1: 'Jul 1 - Jul 31',
        peak: 'Aug 1 - Aug 31',
        mid2: 'Sep 1 - Sep 15',
        low2: 'Sep 16 - Oct 13'
      },
      extras: {
        title: 'Additional Information',
        mandatory: 'Mandatory',
        optional: 'Optional',
        mandatoryItems: [
          'Prices are per apartment for up to 4 persons',
          'Extra person: €15 per night',
          'Final cleaning: €70 one-time',
          'Gas consumption: €5 extra per stay',
          'Electricity: €10 extra per stay',
          'Pet: €150 per stay'
        ],
        optionalItems: [
          'Breakfast: €10 per person',
          'Dinner with wine: €40 per person',
          'Airport pickup Olbia: €30',
          'Airport pickup Alghero: €80'
        ]
      }
    },
    gallery: { 
      title: 'Photo Gallery', 
      subtitle: 'Discover our beautiful property and surroundings',
      tabs: { standard: 'Standard Apartments', executive: 'Executive', mobilhome: 'Mobile Home', exterior: 'Park & Surroundings' }
    },
    contact: {
      title: 'Contact & Reservation',
      subtitle: 'We speak 6 languages and reply within 24 hours',
      form: { name: 'Full Name', email: 'Email', phone: 'Phone', arrival: 'Arrival Date', departure: 'Departure Date', apartment: 'Accommodation Type', persons: 'Number of Persons', message: 'Message', submit: 'Send Request', select: 'Select...', oneBed: '1-Bedroom Standard', twoBed: '2-Bedroom Standard', execApt: 'Executive Apartment', mobHome: 'Mobile Home' },
      info: { phone: 'WhatsApp Only', address: 'Address', company: 'Company' },
    },
    services: {
      title: 'Services',
      subtitle: 'We arrange everything for your perfect holiday',
      carRental: {
        title: 'Car Rental',
        desc: 'The best way to discover our beautiful island is with a rental car. Book via us for the best prices - cheaper than airport or online! Basic insurance included.',
        price: 'From €65 per day',
        cta: 'Ask a Quote',
        cars: ['Smart Forfour (automatic)', 'Fiat Panda', 'Citroën C3', 'Toyota Yaris', 'Lancia Musa']
      },
      boatRental: {
        title: 'Boat Tours',
        desc: 'We are only 20 minutes from the sea. The Costa Smeralda has the most beautiful crystal clear waters. Arrange a half-day or full-day boat tour via us.',
        cta: 'Ask a Quote'
      },
      flights: {
        title: 'Flight Information',
        desc: 'Olbia airport is only 10 minutes away. Airport transfer from Olbia available for €30. Transfer from Alghero (2 hours) is available for €80.',
        airlines: 'Popular airlines: Ryanair, EasyJet, TUIfly, Transavia, Vueling, Lufthansa, Eurowings',
        tip: 'Check Google Flights for the best deals!'
      }
    },
    location: {
      title: 'How to Find Us',
      text: 'We are located only 5km from Olbia and 20 minutes from the beautiful beaches. Olbia Costa Smeralda airport is just 10 minutes by car.',
      directions: 'Search "Villa Smeralda Telti" on Google Maps'
    },
    footer: { rights: 'All rights reserved', webmaster: 'Website by' },
    features: { pool: 'Swimming Pool', wifi: 'Free WiFi', ac: 'Air Conditioning', parking: 'Free Parking', bbq: 'BBQ', restaurant: 'Restaurant' }
  },
  nl: {
    nav: { home: 'Home', apartments: 'Accommodaties', standard: 'Standaard', executive: 'Executive', mobilhome: 'Stacaravan', prices: 'Prijzen 2026', gallery: 'Galerij', services: 'Diensten', contact: 'Contact', location: 'Bereikbaarheid' },
    hero: { title: 'Résidence Villa Smeralda', subtitle: 'Uw paradijs op Sardinië', cta: 'Boek Nu', location: 'Telti, Sardinië - Italië' },
    intro: {
      title: 'Welkom bij Villa Smeralda',
      text: 'Prachtige onafhankelijke appartementen in een privé omheind park van 30.000 m² vol bloemen, fruitbomen, wijngaarden en dieren. Groot gemeenschappelijk zwembad, restaurant en bar.',
      features: ['Groot Zwembad', 'Gratis WiFi', 'Airconditioning', 'Privé Terras', 'BBQ', 'Restaurant & Bar']
    },
    apartments: {
      title: 'Onze Accommodaties',
      standard: {
        title: 'Standaard Appartement',
        subtitle: 'Gedeeld Zwembad',
        desc: 'Privé appartementen van 60m² met volledig uitgeruste keuken, privé terras met barbecue, slaapkamer, woonkamer en badkamer. Beschikbaar met 1 of 2 slaapkamers.',
        features: ['1 of 2 slaapkamers', 'Tot 7 personen', 'Gedeeld zwembad', 'Privé terras', 'Volledige keuken', 'Airconditioning'],
        btn: 'Bekijk Galerij'
      },
      executive: {
        title: 'Executive Appartement',
        subtitle: 'Privé Zwembad',
        desc: 'Ons premium appartement gebouwd in 2017, gescheiden van de andere en hoger op de heuvel met geweldig uitzicht. Het enige appartement met privé zwembad! Heeft 1 slaapkamer plus een wandbed in de woonkamer.',
        features: ['1 slaapkamer + wandbed', 'Tot 5 personen', 'Privé zwembad', 'Bergzicht', 'Premium afwerking', 'Panoramisch terras'],
        btn: 'Bekijk Galerij'
      },
      mobilhome: {
        title: 'Stacaravan',
        subtitle: 'Privé Zwembad',
        desc: 'Onze nieuwste toevoeging! Een gezellige stacaravan met modern interieur, volledig uitgeruste keuken, badkamer met binnen- en buitendouche, en uw eigen privé zwembad. Perfect voor koppels of kleine gezinnen.',
        features: ['1 slaapkamer', '2-4 pers (4 met kind)', 'Privé zwembad', 'Buitendouche', 'Volledige keuken', 'BBQ gebied'],
        btn: 'Bekijk Galerij'
      }
    },
    prices: {
      title: 'Prijzen 2026',
      subtitle: 'Onderstaande prijzen zijn standaardtarieven per nacht. Neem contact op voor speciale deals bij langere verblijven.',
      perNight: '/nacht',
      from: 'Vanaf',
      oneBed: '1-Slaapkamer',
      twoBed: '2-Slaapkamers',
      seasons: {
        period: 'Periode',
        low: '1 apr - 15 jun',
        mid1: '16 jun - 30 jun',
        high1: '1 jul - 31 jul',
        peak: '1 aug - 31 aug',
        mid2: '1 sep - 15 sep',
        low2: '16 sep - 13 okt'
      },
      extras: {
        title: 'Extra Informatie',
        mandatory: 'Verplicht',
        optional: 'Optioneel',
        mandatoryItems: [
          'Prijzen zijn per appartement voor max 4 personen',
          'Extra persoon: €15 per nacht',
          'Eindschoonmaak: €70 eenmalig',
          'Gasverbruik: €5 extra per verblijf',
          'Elektriciteit: €10 extra per verblijf',
          'Huisdier: €150 per verblijf'
        ],
        optionalItems: [
          'Ontbijt: €10 per persoon',
          'Diner met wijn: €40 per persoon',
          'Luchthaven ophalen Olbia: €30',
          'Luchthaven ophalen Alghero: €80'
        ]
      }
    },
    gallery: { 
      title: 'Fotogalerij', 
      subtitle: 'Ontdek ons prachtige domein en omgeving',
      tabs: { standard: 'Standaard Appartementen', executive: 'Executive', mobilhome: 'Stacaravan', exterior: 'Park & Omgeving' }
    },
    contact: {
      title: 'Contact & Reservering',
      subtitle: 'Wij spreken 6 talen en antwoorden binnen 24 uur',
      form: { name: 'Volledige Naam', email: 'E-mail', phone: 'Telefoon', arrival: 'Aankomstdatum', departure: 'Vertrekdatum', apartment: 'Type Accommodatie', persons: 'Aantal Personen', message: 'Bericht', submit: 'Verstuur Aanvraag', select: 'Selecteer...', oneBed: '1-Slaapkamer Standaard', twoBed: '2-Slaapkamers Standaard', execApt: 'Executive Appartement', mobHome: 'Stacaravan' },
      info: { phone: 'Alleen WhatsApp', address: 'Adres', company: 'Bedrijf' },
    },
    services: {
      title: 'Diensten',
      subtitle: 'Wij regelen alles voor uw perfecte vakantie',
      carRental: {
        title: 'Autoverhuur',
        desc: 'De beste manier om ons prachtige eiland te ontdekken is met een huurauto. Boek via ons voor de beste prijzen - goedkoper dan op de luchthaven of online! Basisverzekering inbegrepen.',
        price: 'Vanaf €65 per dag',
        cta: 'Vraag een Offerte',
        cars: ['Smart Forfour (automaat)', 'Fiat Panda', 'Citroën C3', 'Toyota Yaris', 'Lancia Musa']
      },
      boatRental: {
        title: 'Boottochten',
        desc: 'We liggen op slechts 20 minuten van de zee. De Costa Smeralda heeft het mooiste kristalheldere water. Regel via ons een halve dag of hele dag boottocht.',
        cta: 'Vraag een Offerte'
      },
      flights: {
        title: 'Vluchtinformatie',
        desc: 'De luchthaven van Olbia is slechts 10 minuten rijden. Luchthaventransfer vanaf Olbia beschikbaar voor €30. Transfer vanaf Alghero (2 uur) is beschikbaar voor €80.',
        airlines: 'Populaire airlines: Ryanair, EasyJet, TUIfly, Transavia, Vueling, Lufthansa, Eurowings',
        tip: 'Check Google Flights voor de beste deals!'
      }
    },
    location: {
      title: 'Hoe Ons Te Vinden',
      text: 'We liggen op slechts 5km van Olbia en 20 minuten van de prachtige stranden. Olbia Costa Smeralda luchthaven is slechts 10 minuten met de auto.',
      directions: 'Zoek "Villa Smeralda Telti" op Google Maps'
    },
    footer: { rights: 'Alle rechten voorbehouden', webmaster: 'Website door' },
    features: { pool: 'Zwembad', wifi: 'Gratis WiFi', ac: 'Airconditioning', parking: 'Gratis Parkeren', bbq: 'BBQ', restaurant: 'Restaurant' }
  },
  fr: {
    nav: { home: 'Accueil', apartments: 'Hébergements', standard: 'Standard', executive: 'Executive', mobilhome: 'Mobil-home', prices: 'Tarifs 2026', gallery: 'Galerie', services: 'Services', contact: 'Contact', location: 'Comment Nous Trouver' },
    hero: { title: 'Résidence Villa Smeralda', subtitle: 'Votre paradis en Sardaigne', cta: 'Réserver', location: 'Telti, Sardaigne - Italie' },
    intro: {
      title: 'Bienvenue à Villa Smeralda',
      text: 'Beaux appartements indépendants dans un parc privé clôturé de 30 000 m² plein de fleurs, arbres fruitiers, vignes et animaux. Grande piscine partagée, restaurant et bar sur place.',
      features: ['Grande Piscine', 'WiFi Gratuit', 'Climatisation', 'Terrasse Privée', 'BBQ', 'Restaurant & Bar']
    },
    apartments: {
      title: 'Nos Hébergements',
      standard: {
        title: 'Appartement Standard',
        subtitle: 'Piscine Partagée',
        desc: 'Appartements privés de 60m² avec cuisine équipée, terrasse privée avec barbecue, chambre, salon et salle de bain. Disponible en configuration 1 ou 2 chambres.',
        features: ['1 ou 2 chambres', 'Jusqu\'à 7 personnes', 'Piscine partagée', 'Terrasse privée', 'Cuisine complète', 'Climatisation'],
        btn: 'Voir Galerie'
      },
      executive: {
        title: 'Appartement Executive',
        subtitle: 'Piscine Privée',
        desc: 'Notre appartement premium construit en 2017, séparé des autres et plus haut sur la colline avec une vue magnifique. Le seul appartement avec piscine privée! Dispose de 1 chambre plus un lit mural.',
        features: ['1 chambre + lit mural', 'Jusqu\'à 5 personnes', 'Piscine privée', 'Vue montagne', 'Finitions premium', 'Terrasse panoramique'],
        btn: 'Voir Galerie'
      },
      mobilhome: {
        title: 'Mobil-home',
        subtitle: 'Piscine Privée',
        desc: 'Notre dernière nouveauté! Un mobil-home cosy avec intérieur moderne, cuisine équipée, salle de bain avec douche intérieure et extérieure, et votre propre piscine privée. Parfait pour les couples ou petites familles.',
        features: ['1 chambre', '2-4 pers (4 avec enfant)', 'Piscine privée', 'Douche extérieure', 'Cuisine complète', 'Coin BBQ'],
        btn: 'Voir Galerie'
      }
    },
    prices: {
      title: 'Tarifs 2026',
      subtitle: 'Les prix ci-dessous sont des tarifs standards par nuit. Contactez-nous pour des offres spéciales sur les longs séjours.',
      perNight: '/nuit',
      from: 'À partir de',
      oneBed: '1 Chambre',
      twoBed: '2 Chambres',
      seasons: {
        period: 'Période',
        low: '1 avr - 15 juin',
        mid1: '16 juin - 30 juin',
        high1: '1 juil - 31 juil',
        peak: '1 août - 31 août',
        mid2: '1 sep - 15 sep',
        low2: '16 sep - 13 oct'
      },
      extras: {
        title: 'Informations Supplémentaires',
        mandatory: 'Obligatoire',
        optional: 'Optionnel',
        mandatoryItems: [
          'Prix par appartement pour max 4 personnes',
          'Personne supplémentaire: €15 par nuit',
          'Ménage final: €70 une fois',
          'Consommation gaz: €5 extra par séjour',
          'Électricité: €10 extra par séjour',
          'Animal: €150 par séjour'
        ],
        optionalItems: [
          'Petit-déjeuner: €10 par personne',
          'Dîner avec vin: €40 par personne',
          'Transfert aéroport Olbia: €30',
          'Transfert aéroport Alghero: €80'
        ]
      }
    },
    gallery: { 
      title: 'Galerie Photo', 
      subtitle: 'Découvrez notre belle propriété et ses environs',
      tabs: { standard: 'Appartements Standard', executive: 'Executive', mobilhome: 'Mobil-home', exterior: 'Parc & Environs' }
    },
    contact: {
      title: 'Contact & Réservation',
      subtitle: 'Nous parlons 6 langues et répondons sous 24h',
      form: { name: 'Nom Complet', email: 'E-mail', phone: 'Téléphone', arrival: 'Date d\'arrivée', departure: 'Date de départ', apartment: 'Type d\'hébergement', persons: 'Nombre de personnes', message: 'Message', submit: 'Envoyer', select: 'Sélectionner...', oneBed: '1 Chambre Standard', twoBed: '2 Chambres Standard', execApt: 'Appartement Executive', mobHome: 'Mobil-home' },
      info: { phone: 'WhatsApp Uniquement', address: 'Adresse', company: 'Société' },
    },
    services: {
      title: 'Services',
      subtitle: 'Nous organisons tout pour vos vacances parfaites',
      carRental: {
        title: 'Location de Voiture',
        desc: 'La meilleure façon de découvrir notre belle île est en voiture de location. Réservez via nous pour les meilleurs prix - moins cher qu\'à l\'aéroport ou en ligne! Assurance de base incluse.',
        price: 'À partir de €65 par jour',
        cta: 'Demander un Devis',
        cars: ['Smart Forfour (automatique)', 'Fiat Panda', 'Citroën C3', 'Toyota Yaris', 'Lancia Musa']
      },
      boatRental: {
        title: 'Tours en Bateau',
        desc: 'Nous sommes à seulement 20 minutes de la mer. La Costa Smeralda a les eaux cristallines les plus belles. Organisez une excursion d\'une demi-journée ou journée complète via nous.',
        cta: 'Demander un Devis'
      },
      flights: {
        title: 'Informations Vol',
        desc: 'L\'aéroport d\'Olbia est à seulement 10 minutes. Transfert depuis Olbia disponible pour €30. Transfert depuis Alghero (2 heures) disponible pour €80.',
        airlines: 'Compagnies populaires: Ryanair, EasyJet, TUIfly, Transavia, Vueling, Lufthansa, Eurowings',
        tip: 'Consultez Google Flights pour les meilleures offres!'
      }
    },
    location: {
      title: 'Comment Nous Trouver',
      text: 'Nous sommes situés à seulement 5km d\'Olbia et 20 minutes des belles plages. L\'aéroport Olbia Costa Smeralda est à 10 minutes en voiture.',
      directions: 'Cherchez "Villa Smeralda Telti" sur Google Maps'
    },
    footer: { rights: 'Tous droits réservés', webmaster: 'Site web par' },
    features: { pool: 'Piscine', wifi: 'WiFi Gratuit', ac: 'Climatisation', parking: 'Parking Gratuit', bbq: 'BBQ', restaurant: 'Restaurant' }
  },
  it: {
    nav: { home: 'Home', apartments: 'Alloggi', standard: 'Standard', executive: 'Executive', mobilhome: 'Casa Mobile', prices: 'Prezzi 2026', gallery: 'Galleria', services: 'Servizi', contact: 'Contatti', location: 'Come Trovarci' },
    hero: { title: 'Résidence Villa Smeralda', subtitle: 'Il tuo paradiso in Sardegna', cta: 'Prenota Ora', location: 'Telti, Sardegna - Italia' },
    intro: {
      title: 'Benvenuti a Villa Smeralda',
      text: 'Bellissimi appartamenti indipendenti in un parco privato recintato di 30.000 m² pieno di fiori, alberi da frutto, vigneti e animali. Grande piscina condivisa, ristorante e bar in loco.',
      features: ['Grande Piscina', 'WiFi Gratuito', 'Aria Condizionata', 'Terrazza Privata', 'BBQ', 'Ristorante & Bar']
    },
    apartments: {
      title: 'I Nostri Alloggi',
      standard: {
        title: 'Appartamento Standard',
        subtitle: 'Piscina Condivisa',
        desc: 'Appartamenti privati di 60m² con cucina attrezzata, terrazza privata con barbecue, camera da letto, soggiorno e bagno. Disponibile con 1 o 2 camere da letto.',
        features: ['1 o 2 camere', 'Fino a 7 persone', 'Piscina condivisa', 'Terrazza privata', 'Cucina completa', 'Aria condizionata'],
        btn: 'Vedi Galleria'
      },
      executive: {
        title: 'Appartamento Executive',
        subtitle: 'Piscina Privata',
        desc: 'Il nostro appartamento premium costruito nel 2017, separato dagli altri e più in alto sulla collina con vista mozzafiato. L\'unico appartamento con piscina privata! Ha 1 camera più un letto a muro.',
        features: ['1 camera + letto a muro', 'Fino a 5 persone', 'Piscina privata', 'Vista montagna', 'Finiture premium', 'Terrazza panoramica'],
        btn: 'Vedi Galleria'
      },
      mobilhome: {
        title: 'Casa Mobile',
        subtitle: 'Piscina Privata',
        desc: 'La nostra ultima novità! Una casa mobile accogliente con interni moderni, cucina attrezzata, bagno con doccia interna ed esterna, e la vostra piscina privata. Perfetta per coppie o piccole famiglie.',
        features: ['1 camera', '2-4 pers (4 con bambino)', 'Piscina privata', 'Doccia esterna', 'Cucina completa', 'Area BBQ'],
        btn: 'Vedi Galleria'
      }
    },
    prices: {
      title: 'Prezzi 2026',
      subtitle: 'I prezzi sotto sono tariffe standard a notte. Contattateci per offerte speciali sui soggiorni lunghi.',
      perNight: '/notte',
      from: 'Da',
      oneBed: '1 Camera',
      twoBed: '2 Camere',
      seasons: {
        period: 'Periodo',
        low: '1 apr - 15 giu',
        mid1: '16 giu - 30 giu',
        high1: '1 lug - 31 lug',
        peak: '1 ago - 31 ago',
        mid2: '1 set - 15 set',
        low2: '16 set - 13 ott'
      },
      extras: {
        title: 'Informazioni Aggiuntive',
        mandatory: 'Obbligatorio',
        optional: 'Opzionale',
        mandatoryItems: [
          'Prezzi per appartamento per max 4 persone',
          'Persona extra: €15 a notte',
          'Pulizia finale: €70 una tantum',
          'Consumo gas: €5 extra per soggiorno',
          'Elettricità: €10 extra per soggiorno',
          'Animale: €150 per soggiorno'
        ],
        optionalItems: [
          'Colazione: €10 a persona',
          'Cena con vino: €40 a persona',
          'Transfer aeroporto Olbia: €30',
          'Transfer aeroporto Alghero: €80'
        ]
      }
    },
    gallery: { 
      title: 'Galleria Fotografica', 
      subtitle: 'Scopri la nostra bella proprietà e i dintorni',
      tabs: { standard: 'Appartamenti Standard', executive: 'Executive', mobilhome: 'Casa Mobile', exterior: 'Parco & Dintorni' }
    },
    contact: {
      title: 'Contatti & Prenotazione',
      subtitle: 'Parliamo 6 lingue e rispondiamo entro 24 ore',
      form: { name: 'Nome Completo', email: 'E-mail', phone: 'Telefono', arrival: 'Data Arrivo', departure: 'Data Partenza', apartment: 'Tipo Alloggio', persons: 'Numero Persone', message: 'Messaggio', submit: 'Invia Richiesta', select: 'Seleziona...', oneBed: '1 Camera Standard', twoBed: '2 Camere Standard', execApt: 'Appartamento Executive', mobHome: 'Casa Mobile' },
      info: { phone: 'Solo WhatsApp', address: 'Indirizzo', company: 'Azienda' },
    },
    services: {
      title: 'Servizi',
      subtitle: 'Organizziamo tutto per la vostra vacanza perfetta',
      carRental: {
        title: 'Noleggio Auto',
        desc: 'Il modo migliore per scoprire la nostra bella isola è con un\'auto a noleggio. Prenotate tramite noi per i migliori prezzi - più economico che in aeroporto o online! Assicurazione base inclusa.',
        price: 'Da €65 al giorno',
        cta: 'Richiedi Preventivo',
        cars: ['Smart Forfour (automatico)', 'Fiat Panda', 'Citroën C3', 'Toyota Yaris', 'Lancia Musa']
      },
      boatRental: {
        title: 'Tour in Barca',
        desc: 'Siamo a soli 20 minuti dal mare. La Costa Smeralda ha le acque cristalline più belle. Organizzate un\'escursione di mezza giornata o giornata intera tramite noi.',
        cta: 'Richiedi Preventivo'
      },
      flights: {
        title: 'Informazioni Volo',
        desc: 'L\'aeroporto di Olbia è a soli 10 minuti. Transfer da Olbia disponibile a €30. Transfer da Alghero (2 ore) disponibile a €80.',
        airlines: 'Compagnie popolari: Ryanair, EasyJet, TUIfly, Transavia, Vueling, Lufthansa, Eurowings',
        tip: 'Controllate Google Flights per le migliori offerte!'
      }
    },
    location: {
      title: 'Come Trovarci',
      text: 'Siamo situati a soli 5km da Olbia e 20 minuti dalle belle spiagge. L\'aeroporto Olbia Costa Smeralda è a 10 minuti in auto.',
      directions: 'Cerca "Villa Smeralda Telti" su Google Maps'
    },
    footer: { rights: 'Tutti i diritti riservati', webmaster: 'Sito web di' },
    features: { pool: 'Piscina', wifi: 'WiFi Gratuito', ac: 'Aria Condizionata', parking: 'Parcheggio Gratuito', bbq: 'BBQ', restaurant: 'Ristorante' }
  },
  es: {
    nav: { home: 'Inicio', apartments: 'Alojamientos', standard: 'Estándar', executive: 'Executive', mobilhome: 'Casa Móvil', prices: 'Precios 2026', gallery: 'Galería', services: 'Servicios', contact: 'Contacto', location: 'Cómo Llegar' },
    hero: { title: 'Résidence Villa Smeralda', subtitle: 'Tu paraíso en Cerdeña', cta: 'Reservar', location: 'Telti, Cerdeña - Italia' },
    intro: {
      title: 'Bienvenidos a Villa Smeralda',
      text: 'Hermosos apartamentos independientes en un parque privado vallado de 30.000 m² lleno de flores, árboles frutales, viñedos y animales. Gran piscina compartida, restaurante y bar.',
      features: ['Gran Piscina', 'WiFi Gratis', 'Aire Acondicionado', 'Terraza Privada', 'BBQ', 'Restaurante & Bar']
    },
    apartments: {
      title: 'Nuestros Alojamientos',
      standard: {
        title: 'Apartamento Estándar',
        subtitle: 'Piscina Compartida',
        desc: 'Apartamentos privados de 60m² con cocina equipada, terraza privada con barbacoa, dormitorio, salón y baño. Disponible en configuración de 1 o 2 dormitorios.',
        features: ['1 o 2 dormitorios', 'Hasta 7 personas', 'Piscina compartida', 'Terraza privada', 'Cocina completa', 'Aire acondicionado'],
        btn: 'Ver Galería'
      },
      executive: {
        title: 'Apartamento Executive',
        subtitle: 'Piscina Privada',
        desc: 'Nuestro apartamento premium construido en 2017, separado de los demás y más alto en la colina con vistas increíbles. ¡El único apartamento con piscina privada! Tiene 1 dormitorio más cama mural.',
        features: ['1 dormitorio + cama mural', 'Hasta 5 personas', 'Piscina privada', 'Vista montaña', 'Acabados premium', 'Terraza panorámica'],
        btn: 'Ver Galería'
      },
      mobilhome: {
        title: 'Casa Móvil',
        subtitle: 'Piscina Privada',
        desc: '¡Nuestra última novedad! Una acogedora casa móvil con interior moderno, cocina equipada, baño con ducha interior y exterior, y su propia piscina privada. Perfecta para parejas o familias pequeñas.',
        features: ['1 dormitorio', '2-4 pers (4 con niño)', 'Piscina privada', 'Ducha exterior', 'Cocina completa', 'Zona BBQ'],
        btn: 'Ver Galería'
      }
    },
    prices: {
      title: 'Precios 2026',
      subtitle: 'Los precios son tarifas estándar por noche. Contáctenos para ofertas especiales en estancias largas.',
      perNight: '/noche',
      from: 'Desde',
      oneBed: '1 Dormitorio',
      twoBed: '2 Dormitorios',
      seasons: {
        period: 'Período',
        low: '1 abr - 15 jun',
        mid1: '16 jun - 30 jun',
        high1: '1 jul - 31 jul',
        peak: '1 ago - 31 ago',
        mid2: '1 sep - 15 sep',
        low2: '16 sep - 13 oct'
      },
      extras: {
        title: 'Información Adicional',
        mandatory: 'Obligatorio',
        optional: 'Opcional',
        mandatoryItems: [
          'Precios por apartamento para máx. 4 personas',
          'Persona extra: €15 por noche',
          'Limpieza final: €70 una vez',
          'Consumo gas: €5 extra por estancia',
          'Electricidad: €10 extra por estancia',
          'Mascota: €150 por estancia'
        ],
        optionalItems: [
          'Desayuno: €10 por persona',
          'Cena con vino: €40 por persona',
          'Transfer aeropuerto Olbia: €30',
          'Transfer aeropuerto Alghero: €80'
        ]
      }
    },
    gallery: { 
      title: 'Galería de Fotos', 
      subtitle: 'Descubre nuestra hermosa propiedad y alrededores',
      tabs: { standard: 'Apartamentos Estándar', executive: 'Executive', mobilhome: 'Casa Móvil', exterior: 'Parque & Alrededores' }
    },
    contact: {
      title: 'Contacto & Reserva',
      subtitle: 'Hablamos 6 idiomas y respondemos en 24 horas',
      form: { name: 'Nombre Completo', email: 'E-mail', phone: 'Teléfono', arrival: 'Fecha Llegada', departure: 'Fecha Salida', apartment: 'Tipo Alojamiento', persons: 'Número de Personas', message: 'Mensaje', submit: 'Enviar', select: 'Seleccionar...', oneBed: '1 Dormitorio Estándar', twoBed: '2 Dormitorios Estándar', execApt: 'Apartamento Executive', mobHome: 'Casa Móvil' },
      info: { phone: 'Solo WhatsApp', address: 'Dirección', company: 'Empresa' },
    },
    services: {
      title: 'Servicios',
      subtitle: 'Organizamos todo para sus vacaciones perfectas',
      carRental: {
        title: 'Alquiler de Coches',
        desc: 'La mejor manera de descubrir nuestra hermosa isla es con un coche de alquiler. ¡Reserve a través de nosotros para los mejores precios - más barato que en el aeropuerto o en línea! Seguro básico incluido.',
        price: 'Desde €65 por día',
        cta: 'Solicitar Presupuesto',
        cars: ['Smart Forfour (automático)', 'Fiat Panda', 'Citroën C3', 'Toyota Yaris', 'Lancia Musa']
      },
      boatRental: {
        title: 'Tours en Barco',
        desc: 'Estamos a solo 20 minutos del mar. La Costa Smeralda tiene las aguas cristalinas más hermosas. Organice una excursión de medio día o día completo a través de nosotros.',
        cta: 'Solicitar Presupuesto'
      },
      flights: {
        title: 'Información de Vuelos',
        desc: 'El aeropuerto de Olbia está a solo 10 minutos. Transfer desde Olbia disponible por €30. Transfer desde Alghero (2 horas) disponible por €80.',
        airlines: 'Aerolíneas populares: Ryanair, EasyJet, TUIfly, Transavia, Vueling, Lufthansa, Eurowings',
        tip: '¡Consulte Google Flights para las mejores ofertas!'
      }
    },
    location: {
      title: 'Cómo Encontrarnos',
      text: 'Estamos a solo 5km de Olbia y 20 minutos de las hermosas playas. El aeropuerto Olbia Costa Smeralda está a 10 minutos en coche.',
      directions: 'Busque "Villa Smeralda Telti" en Google Maps'
    },
    footer: { rights: 'Todos los derechos reservados', webmaster: 'Sitio web por' },
    features: { pool: 'Piscina', wifi: 'WiFi Gratis', ac: 'Aire Acondicionado', parking: 'Parking Gratis', bbq: 'BBQ', restaurant: 'Restaurante' }
  },
  de: {
    nav: { home: 'Startseite', apartments: 'Unterkünfte', standard: 'Standard', executive: 'Executive', mobilhome: 'Mobilheim', prices: 'Preise 2026', gallery: 'Galerie', services: 'Services', contact: 'Kontakt', location: 'Anfahrt' },
    hero: { title: 'Résidence Villa Smeralda', subtitle: 'Ihr Paradies auf Sardinien', cta: 'Jetzt Buchen', location: 'Telti, Sardinien - Italien' },
    intro: {
      title: 'Willkommen in Villa Smeralda',
      text: 'Wunderschöne unabhängige Apartments in einem privaten eingezäunten Park von 30.000 m² voller Blumen, Obstbäume, Weinberge und Tiere. Großer Gemeinschaftspool, Restaurant und Bar vor Ort.',
      features: ['Großer Pool', 'Kostenloses WLAN', 'Klimaanlage', 'Private Terrasse', 'BBQ', 'Restaurant & Bar']
    },
    apartments: {
      title: 'Unsere Unterkünfte',
      standard: {
        title: 'Standard Apartment',
        subtitle: 'Gemeinschaftspool',
        desc: 'Private Apartments mit 60m², voll ausgestatteter Küche, privater Terrasse mit Grill, Schlafzimmer, Wohnzimmer und Bad. Verfügbar mit 1 oder 2 Schlafzimmern.',
        features: ['1 oder 2 Schlafzimmer', 'Bis zu 7 Personen', 'Gemeinschaftspool', 'Private Terrasse', 'Volle Küche', 'Klimaanlage'],
        btn: 'Galerie Ansehen'
      },
      executive: {
        title: 'Executive Apartment',
        subtitle: 'Privater Pool',
        desc: 'Unser Premium-Apartment aus 2017, getrennt von anderen und höher am Hang mit atemberaubender Aussicht. Das einzige Apartment mit privatem Pool! Hat 1 Schlafzimmer plus Schrankbett.',
        features: ['1 Schlafzimmer + Schrankbett', 'Bis zu 5 Personen', 'Privater Pool', 'Bergblick', 'Premium-Ausstattung', 'Panoramaterrasse'],
        btn: 'Galerie Ansehen'
      },
      mobilhome: {
        title: 'Mobilheim',
        subtitle: 'Privater Pool',
        desc: 'Unsere neueste Ergänzung! Ein gemütliches Mobilheim mit modernem Interieur, voll ausgestatteter Küche, Bad mit Innen- und Außendusche, und Ihrem eigenen privaten Pool. Perfekt für Paare oder kleine Familien.',
        features: ['1 Schlafzimmer', '2-4 Pers (4 mit Kind)', 'Privater Pool', 'Außendusche', 'Volle Küche', 'BBQ-Bereich'],
        btn: 'Galerie Ansehen'
      }
    },
    prices: {
      title: 'Preise 2026',
      subtitle: 'Die unten angegebenen Preise sind Standardtarife pro Nacht. Kontaktieren Sie uns für Sonderangebote bei längeren Aufenthalten.',
      perNight: '/Nacht',
      from: 'Ab',
      oneBed: '1 Schlafzimmer',
      twoBed: '2 Schlafzimmer',
      seasons: {
        period: 'Zeitraum',
        low: '1. Apr - 15. Jun',
        mid1: '16. Jun - 30. Jun',
        high1: '1. Jul - 31. Jul',
        peak: '1. Aug - 31. Aug',
        mid2: '1. Sep - 15. Sep',
        low2: '16. Sep - 13. Okt'
      },
      extras: {
        title: 'Zusätzliche Informationen',
        mandatory: 'Pflicht',
        optional: 'Optional',
        mandatoryItems: [
          'Preise pro Apartment für max. 4 Personen',
          'Zusätzliche Person: €15 pro Nacht',
          'Endreinigung: €70 einmalig',
          'Gasverbrauch: €5 extra pro Aufenthalt',
          'Strom: €10 extra pro Aufenthalt',
          'Haustier: €150 pro Aufenthalt'
        ],
        optionalItems: [
          'Frühstück: €10 pro Person',
          'Abendessen mit Wein: €40 pro Person',
          'Flughafentransfer Olbia: €30',
          'Flughafentransfer Alghero: €80'
        ]
      }
    },
    gallery: { 
      title: 'Fotogalerie', 
      subtitle: 'Entdecken Sie unser schönes Anwesen und Umgebung',
      tabs: { standard: 'Standard Apartments', executive: 'Executive', mobilhome: 'Mobilheim', exterior: 'Park & Umgebung' }
    },
    contact: {
      title: 'Kontakt & Reservierung',
      subtitle: 'Wir sprechen 6 Sprachen und antworten innerhalb von 24 Stunden',
      form: { name: 'Vollständiger Name', email: 'E-Mail', phone: 'Telefon', arrival: 'Anreisedatum', departure: 'Abreisedatum', apartment: 'Unterkunftstyp', persons: 'Anzahl Personen', message: 'Nachricht', submit: 'Anfrage Senden', select: 'Auswählen...', oneBed: '1 Schlafzimmer Standard', twoBed: '2 Schlafzimmer Standard', execApt: 'Executive Apartment', mobHome: 'Mobilheim' },
      info: { phone: 'Nur WhatsApp', address: 'Adresse', company: 'Firma' },
    },
    services: {
      title: 'Services',
      subtitle: 'Wir organisieren alles für Ihren perfekten Urlaub',
      carRental: {
        title: 'Mietwagen',
        desc: 'Der beste Weg, unsere schöne Insel zu entdecken, ist mit einem Mietwagen. Buchen Sie über uns für die besten Preise - günstiger als am Flughafen oder online! Basisversicherung inklusive.',
        price: 'Ab €65 pro Tag',
        cta: 'Angebot Anfragen',
        cars: ['Smart Forfour (Automatik)', 'Fiat Panda', 'Citroën C3', 'Toyota Yaris', 'Lancia Musa']
      },
      boatRental: {
        title: 'Bootstouren',
        desc: 'Wir sind nur 20 Minuten vom Meer entfernt. Die Costa Smeralda hat das schönste kristallklare Wasser. Organisieren Sie einen Halbtages- oder Ganztagesausflug über uns.',
        cta: 'Angebot Anfragen'
      },
      flights: {
        title: 'Fluginformationen',
        desc: 'Der Flughafen Olbia ist nur 10 Minuten entfernt. Transfer ab Olbia verfügbar für €30. Transfer ab Alghero (2 Stunden) ist für €80 verfügbar.',
        airlines: 'Beliebte Airlines: Ryanair, EasyJet, TUIfly, Transavia, Vueling, Lufthansa, Eurowings',
        tip: 'Prüfen Sie Google Flights für die besten Angebote!'
      }
    },
    location: {
      title: 'So Finden Sie Uns',
      text: 'Wir befinden uns nur 5km von Olbia und 20 Minuten von den schönen Stränden entfernt. Der Flughafen Olbia Costa Smeralda ist 10 Minuten mit dem Auto.',
      directions: 'Suchen Sie "Villa Smeralda Telti" auf Google Maps'
    },
    footer: { rights: 'Alle Rechte vorbehalten', webmaster: 'Website von' },
    features: { pool: 'Schwimmbad', wifi: 'Kostenloses WLAN', ac: 'Klimaanlage', parking: 'Kostenlos Parken', bbq: 'BBQ', restaurant: 'Restaurant' }
  }
};

// Pricing data - 2026
const PRICES = {
  standard1: { low: 125, mid1: 150, high1: 209, peak: 249, mid2: 145, low2: 129 },
  standard2: { low: 130, mid1: 165, high1: 219, peak: 259, mid2: 155, low2: 139 },
  executive: { low: 139, mid1: 175, high1: 229, peak: 265, mid2: 165, low2: 145 },
  mobilhome: { low: 130, mid1: 165, high1: 219, peak: 259, mid2: 155, low2: 139 }
};

// Confirmation Page Component
const ConfirmationPage = () => {
  const [lang] = useState('en');
  const t = translations[lang];
  
  // Track confirmation page visit
  useEffect(() => {
    const API = process.env.REACT_APP_BACKEND_URL;
    fetch(`${API}/api/public/track-visit`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ 
        site_slug: 'smeralda',
        path: '/confirmation'
      })
    }).catch(() => {});
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white flex items-center justify-center p-4">
      <SEO 
        title="Bedankt voor uw aanvraag | Villa Smeralda"
        description="Uw reserveringsaanvraag is succesvol verzonden."
        url="https://smeraldavacanze.it/confirmation"
        siteName={SEO_CONFIG.siteName}
      />
      <div className="max-w-lg w-full bg-white rounded-2xl shadow-xl p-8 text-center">
        <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <CheckCircle className="w-12 h-12 text-green-600" />
        </div>
        <h1 className="text-3xl font-bold text-gray-900 mb-4">
          Grazie! / Bedankt!
        </h1>
        <p className="text-lg text-gray-600 mb-6">
          La vostra richiesta è stata inviata con successo.<br/>
          Uw aanvraag is succesvol verzonden.
        </p>
        <p className="text-gray-500 mb-8">
          Vi risponderemo al più presto.<br/>
          Wij nemen zo snel mogelijk contact met u op.
        </p>
        <a 
          href="/"
          className="inline-block bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-xl font-semibold transition-colors"
        >
          Torna alla Home / Terug naar Home
        </a>
        <div className="mt-8 pt-6 border-t">
          <img src={IMAGES.logo} alt="Villa Smeralda" className="h-10 mx-auto opacity-50" />
        </div>
      </div>
    </div>
  );
};

// Main Homepage Content Component
const SmeraldaHomePage = () => {
  const [lang, setLang] = useState('en');
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [galleryTab, setGalleryTab] = useState('standard');
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxImages, setLightboxImages] = useState([]);
  const [lightboxIndex, setLightboxIndex] = useState(0);
  const t = translations[lang];

  // Track visitor with path
  useEffect(() => {
    const API = process.env.REACT_APP_BACKEND_URL;
    fetch(`${API}/api/public/track-visit`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ 
        site_slug: 'smeralda',
        path: window.location.pathname
      })
    }).catch(() => {});
  }, []);

  // Tawk.to live chat - load via script
  useEffect(() => {
    var Tawk_API = window.Tawk_API || {};
    var Tawk_LoadStart = new Date();
    var s1 = document.createElement("script");
    var s0 = document.getElementsByTagName("script")[0];
    s1.async = true;
    s1.src = 'https://embed.tawk.to/5d83c092c22bdd393bb6bf8b/default';
    s1.charset = 'UTF-8';
    s1.setAttribute('crossorigin', '*');
    s0.parentNode.insertBefore(s1, s0);
    
    return () => {
      // Cleanup on unmount
      if (window.Tawk_API && window.Tawk_API.hideWidget) {
        window.Tawk_API.hideWidget();
      }
    };
  }, []);

  const scrollTo = (id) => {
    setMenuOpen(false);
    setActiveSection(id);
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  const openLightbox = (images, index = 0) => {
    setLightboxImages(images);
    setLightboxIndex(index);
    setLightboxOpen(true);
  };

  // Image Slider Component - stops auto-rotation on manual interaction
  const ImageSlider = ({ images, className = '', autoRotate = false }) => {
    const [idx, setIdx] = useState(0);
    const [userInteracted, setUserInteracted] = useState(false);
    const validImages = images.filter(img => img);
    
    // Auto-rotate only if enabled AND user hasn't interacted
    useEffect(() => {
      if (!autoRotate || userInteracted || validImages.length <= 1) return;
      const timer = setInterval(() => {
        setIdx((prev) => (prev + 1) % validImages.length);
      }, 5000);
      return () => clearInterval(timer);
    }, [autoRotate, userInteracted, validImages.length]);
    
    const handleManualNav = (newIdx) => {
      setUserInteracted(true); // Stop auto-rotation
      setIdx(newIdx);
    };
    
    return (
      <div className={`relative overflow-hidden rounded-xl ${className}`}>
        <img 
          src={validImages[idx]} 
          alt="" 
          className="w-full h-full object-cover cursor-pointer"
          onClick={() => openLightbox(validImages, idx)}
          onError={(e) => { e.target.style.display = 'none'; }}
        />
        {validImages.length > 1 && (
          <>
            <button onClick={(e) => { e.stopPropagation(); handleManualNav((idx - 1 + validImages.length) % validImages.length); }} 
              className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white p-2 rounded-full shadow-lg">
              <ChevronLeft className="w-5 h-5 text-gray-800" />
            </button>
            <button onClick={(e) => { e.stopPropagation(); handleManualNav((idx + 1) % validImages.length); }}
              className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white p-2 rounded-full shadow-lg">
              <ChevronRight className="w-5 h-5 text-gray-800" />
            </button>
          </>
        )}
        <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-2">
          {validImages.slice(0, 6).map((_, i) => (
            <button key={i} onClick={(e) => { e.stopPropagation(); handleManualNav(i); }}
              className={`w-2 h-2 rounded-full transition-all ${i === idx ? 'bg-white w-6' : 'bg-white/50'}`} />
          ))}
          {validImages.length > 6 && <span className="text-white text-xs">+{validImages.length - 6}</span>}
        </div>
      </div>
    );
  };

  // Lightbox Component
  const Lightbox = () => {
    if (!lightboxOpen) return null;
    return (
      <div className="fixed inset-0 bg-black/95 z-[100] flex items-center justify-center" onClick={() => setLightboxOpen(false)}>
        <button className="absolute top-4 right-4 text-white p-2 hover:bg-white/20 rounded-full" onClick={() => setLightboxOpen(false)}>
          <X className="w-8 h-8" />
        </button>
        <button className="absolute left-4 top-1/2 -translate-y-1/2 text-white p-2 hover:bg-white/20 rounded-full"
          onClick={(e) => { e.stopPropagation(); setLightboxIndex((lightboxIndex - 1 + lightboxImages.length) % lightboxImages.length); }}>
          <ChevronLeft className="w-10 h-10" />
        </button>
        <img 
          src={lightboxImages[lightboxIndex]} 
          alt="" 
          className="max-h-[90vh] max-w-[90vw] object-contain"
          onClick={(e) => e.stopPropagation()}
        />
        <button className="absolute right-4 top-1/2 -translate-y-1/2 text-white p-2 hover:bg-white/20 rounded-full"
          onClick={(e) => { e.stopPropagation(); setLightboxIndex((lightboxIndex + 1) % lightboxImages.length); }}>
          <ChevronRight className="w-10 h-10" />
        </button>
        <div className="absolute bottom-4 text-white text-sm">{lightboxIndex + 1} / {lightboxImages.length}</div>
      </div>
    );
  };

  // Gallery images based on tab
  const getGalleryImages = () => {
    switch(galleryTab) {
      case 'standard': return IMAGES.standard;
      case 'executive': return IMAGES.executive;
      case 'mobilhome': return IMAGES.mobilhome;
      case 'exterior': return IMAGES.exterior;
      default: return IMAGES.standard;
    }
  };

  return (
    <div className="min-h-screen bg-white" style={{ fontFamily: "'Poppins', sans-serif" }}>
      <SEO 
        title={SEO_CONFIG.title}
        description={SEO_CONFIG.description}
        keywords={SEO_CONFIG.keywords}
        image={SEO_CONFIG.defaultImage}
        url={SEO_CONFIG.baseUrl}
        siteName={SEO_CONFIG.siteName}
        locale="it_IT"
      />
      <Lightbox />
      
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-md shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex justify-between items-center h-16 sm:h-20">
            <img src={IMAGES.logo} alt="Villa Smeralda" className="h-10 sm:h-14 w-auto" />
            
            {/* Desktop Nav */}
            <div className="hidden lg:flex items-center gap-4">
              {['home', 'apartments', 'prices', 'gallery', 'services', 'contact', 'location'].map((item) => (
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
              {['home', 'apartments', 'prices', 'gallery', 'services', 'contact', 'location'].map((item) => (
                <button key={item} onClick={() => scrollTo(item)}
                  className="block w-full text-left py-2 text-gray-600 hover:text-blue-600 font-medium">
                  {t.nav[item]}
                </button>
              ))}
              <div className="flex flex-wrap gap-2 pt-3 border-t">
                {['en', 'nl', 'fr', 'it', 'es', 'de'].map((l) => (
                  <button key={l} onClick={() => { setLang(l); setMenuOpen(false); }}
                    className={`px-3 py-1.5 rounded text-sm font-medium ${lang === l ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-600'}`}>
                    {l.toUpperCase()}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}
      </nav>

      {/* Hero Section - Static single image */}
      <section id="home" className="relative h-screen min-h-[600px]">
        <div className="absolute inset-0">
          <img src={IMAGES.heroMain} alt="Villa Smeralda Pool" 
            className="absolute inset-0 w-full h-full object-cover" />
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
              { icon: TreePine, label: '30,000m²' }
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
            <ImageSlider images={IMAGES.standard.slice(0, 10)} className="h-[300px] sm:h-[400px] lg:h-[500px]" autoRotate={true} />
            <div className="flex flex-col justify-center">
              <h3 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-1">{t.apartments.standard.title}</h3>
              <span className="text-blue-600 font-semibold mb-4">{t.apartments.standard.subtitle}</span>
              <p className="text-gray-600 mb-6">{t.apartments.standard.desc}</p>
              <div className="grid grid-cols-2 gap-3 mb-6">
                {t.apartments.standard.features.map((feature, i) => (
                  <div key={i} className="flex items-center gap-2 text-gray-700">
                    <div className="w-2 h-2 bg-blue-600 rounded-full" />
                    <span className="text-sm">{feature}</span>
                  </div>
                ))}
              </div>
              <div className="flex flex-col sm:flex-row gap-3 mb-4">
                <div className="bg-blue-50 rounded-lg px-4 py-3">
                  <p className="text-sm text-blue-600 font-medium">{t.prices.oneBed}</p>
                  <p className="text-xl font-bold text-gray-900">{t.prices.from} €125 <span className="text-sm font-normal text-gray-500">{t.prices.perNight}</span></p>
                </div>
                <div className="bg-blue-50 rounded-lg px-4 py-3">
                  <p className="text-sm text-blue-600 font-medium">{t.prices.twoBed}</p>
                  <p className="text-xl font-bold text-gray-900">{t.prices.from} €130 <span className="text-sm font-normal text-gray-500">{t.prices.perNight}</span></p>
                </div>
              </div>
              <button onClick={() => { setGalleryTab('standard'); scrollTo('gallery'); }}
                className="text-blue-600 hover:text-blue-800 font-medium text-sm flex items-center gap-1">
                {t.apartments.standard.btn} <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Executive Apartment */}
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 mb-16">
            <div className="flex flex-col justify-center order-2 lg:order-1">
              <h3 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-1">{t.apartments.executive.title}</h3>
              <span className="text-amber-600 font-semibold mb-4">{t.apartments.executive.subtitle}</span>
              <p className="text-gray-600 mb-6">{t.apartments.executive.desc}</p>
              <div className="grid grid-cols-2 gap-3 mb-6">
                {t.apartments.executive.features.map((feature, i) => (
                  <div key={i} className="flex items-center gap-2 text-gray-700">
                    <div className="w-2 h-2 bg-amber-600 rounded-full" />
                    <span className="text-sm">{feature}</span>
                  </div>
                ))}
              </div>
              <div className="bg-amber-50 rounded-lg px-4 py-3 inline-block mb-4">
                <p className="text-sm text-amber-600 font-medium">{t.prices.oneBed} + Wall Bed</p>
                <p className="text-xl font-bold text-gray-900">{t.prices.from} €139 <span className="text-sm font-normal text-gray-500">{t.prices.perNight}</span></p>
              </div>
              <button onClick={() => { setGalleryTab('executive'); scrollTo('gallery'); }}
                className="text-amber-600 hover:text-amber-800 font-medium text-sm flex items-center gap-1">
                {t.apartments.executive.btn} <ChevronRight className="w-4 h-4" />
              </button>
            </div>
            <ImageSlider images={IMAGES.executive} className="h-[300px] sm:h-[400px] lg:h-[500px] order-1 lg:order-2" autoRotate={true} />
          </div>

          {/* Mobile Home */}
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12">
            <ImageSlider images={IMAGES.mobilhome} className="h-[300px] sm:h-[400px] lg:h-[500px]" autoRotate={true} />
            <div className="flex flex-col justify-center">
              <div className="inline-flex items-center gap-2 mb-1">
                <h3 className="text-2xl sm:text-3xl font-bold text-gray-900">{t.apartments.mobilhome.title}</h3>
                <span className="bg-green-100 text-green-700 text-xs font-bold px-2 py-1 rounded">NEW</span>
              </div>
              <span className="text-green-600 font-semibold mb-4">{t.apartments.mobilhome.subtitle}</span>
              <p className="text-gray-600 mb-6">{t.apartments.mobilhome.desc}</p>
              <div className="grid grid-cols-2 gap-3 mb-6">
                {t.apartments.mobilhome.features.map((feature, i) => (
                  <div key={i} className="flex items-center gap-2 text-gray-700">
                    <div className="w-2 h-2 bg-green-600 rounded-full" />
                    <span className="text-sm">{feature}</span>
                  </div>
                ))}
              </div>
              <div className="bg-green-50 rounded-lg px-4 py-3 inline-block mb-4">
                <p className="text-sm text-green-600 font-medium">{t.prices.oneBed} + {t.apartments.mobilhome.subtitle}</p>
                <p className="text-xl font-bold text-gray-900">{t.prices.from} €130 <span className="text-sm font-normal text-gray-500">{t.prices.perNight}</span></p>
              </div>
              <button onClick={() => { setGalleryTab('mobilhome'); scrollTo('gallery'); }}
                className="text-green-600 hover:text-green-800 font-medium text-sm flex items-center gap-1">
                {t.apartments.mobilhome.btn} <ChevronRight className="w-4 h-4" />
              </button>
            </div>
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

          {/* Price Cards */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            {/* Standard 1-Bed */}
            <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
              <div className="h-40 overflow-hidden">
                <img src={IMAGES.standard[0]} alt="" className="w-full h-full object-cover" />
              </div>
              <div className="p-5">
                <h3 className="text-lg font-bold text-gray-900">{t.apartments.standard.title}</h3>
                <p className="text-sm text-gray-500 mb-4">{t.prices.oneBed}</p>
                <div className="space-y-1.5 text-sm">
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
              <div className="h-40 overflow-hidden">
                <img src={IMAGES.standard[5]} alt="" className="w-full h-full object-cover" />
              </div>
              <div className="p-5">
                <h3 className="text-lg font-bold text-gray-900">{t.apartments.standard.title}</h3>
                <p className="text-sm text-gray-500 mb-4">{t.prices.twoBed}</p>
                <div className="space-y-1.5 text-sm">
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
              <div className="bg-amber-400 text-white text-center py-1 text-xs font-bold">PREMIUM</div>
              <div className="h-40 overflow-hidden">
                <img src={IMAGES.executive[0]} alt="" className="w-full h-full object-cover" />
              </div>
              <div className="p-5">
                <h3 className="text-lg font-bold text-gray-900">{t.apartments.executive.title}</h3>
                <p className="text-sm text-gray-500 mb-4">{t.apartments.executive.subtitle}</p>
                <div className="space-y-1.5 text-sm">
                  <div className="flex justify-between"><span className="text-gray-500">{t.prices.seasons.low}</span><span className="font-semibold">€{PRICES.executive.low}</span></div>
                  <div className="flex justify-between"><span className="text-gray-500">{t.prices.seasons.mid1}</span><span className="font-semibold">€{PRICES.executive.mid1}</span></div>
                  <div className="flex justify-between"><span className="text-gray-500">{t.prices.seasons.high1}</span><span className="font-semibold">€{PRICES.executive.high1}</span></div>
                  <div className="flex justify-between bg-amber-50 -mx-2 px-2 py-1 rounded"><span className="text-amber-700">{t.prices.seasons.peak}</span><span className="font-bold text-amber-700">€{PRICES.executive.peak}</span></div>
                  <div className="flex justify-between"><span className="text-gray-500">{t.prices.seasons.mid2}</span><span className="font-semibold">€{PRICES.executive.mid2}</span></div>
                  <div className="flex justify-between"><span className="text-gray-500">{t.prices.seasons.low2}</span><span className="font-semibold">€{PRICES.executive.low2}</span></div>
                </div>
              </div>
            </div>

            {/* Mobilhome */}
            <div className="bg-white rounded-2xl shadow-lg overflow-hidden border-2 border-green-400">
              <div className="bg-green-500 text-white text-center py-1 text-xs font-bold">NEW</div>
              <div className="h-40 overflow-hidden">
                <img src={IMAGES.mobilhome[0]} alt="" className="w-full h-full object-cover" />
              </div>
              <div className="p-5">
                <h3 className="text-lg font-bold text-gray-900">{t.apartments.mobilhome.title}</h3>
                <p className="text-sm text-gray-500 mb-4">{t.apartments.mobilhome.subtitle}</p>
                <div className="space-y-1.5 text-sm">
                  <div className="flex justify-between"><span className="text-gray-500">{t.prices.seasons.low}</span><span className="font-semibold">€{PRICES.mobilhome.low}</span></div>
                  <div className="flex justify-between"><span className="text-gray-500">{t.prices.seasons.mid1}</span><span className="font-semibold">€{PRICES.mobilhome.mid1}</span></div>
                  <div className="flex justify-between"><span className="text-gray-500">{t.prices.seasons.high1}</span><span className="font-semibold">€{PRICES.mobilhome.high1}</span></div>
                  <div className="flex justify-between bg-green-50 -mx-2 px-2 py-1 rounded"><span className="text-green-700">{t.prices.seasons.peak}</span><span className="font-bold text-green-700">€{PRICES.mobilhome.peak}</span></div>
                  <div className="flex justify-between"><span className="text-gray-500">{t.prices.seasons.mid2}</span><span className="font-semibold">€{PRICES.mobilhome.mid2}</span></div>
                  <div className="flex justify-between"><span className="text-gray-500">{t.prices.seasons.low2}</span><span className="font-semibold">€{PRICES.mobilhome.low2}</span></div>
                </div>
              </div>
            </div>
          </div>

          {/* Extra Info - Mandatory & Optional */}
          <div className="bg-white rounded-xl p-6 shadow-lg">
            <h4 className="font-bold text-gray-900 mb-4">{t.prices.extras.title}</h4>
            <div className="grid md:grid-cols-2 gap-6">
              {/* Mandatory */}
              <div>
                <h5 className="text-sm font-semibold text-red-600 mb-3 flex items-center gap-2">
                  <span className="w-2 h-2 bg-red-600 rounded-full"></span>
                  {t.prices.extras.mandatory}
                </h5>
                <div className="space-y-2">
                  {t.prices.extras.mandatoryItems.map((item, i) => (
                    <div key={i} className="flex items-start gap-2 text-sm text-gray-700">
                      <div className="w-1.5 h-1.5 bg-red-400 rounded-full mt-2 flex-shrink-0" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>
              {/* Optional */}
              <div>
                <h5 className="text-sm font-semibold text-green-600 mb-3 flex items-center gap-2">
                  <span className="w-2 h-2 bg-green-600 rounded-full"></span>
                  {t.prices.extras.optional}
                </h5>
                <div className="space-y-2">
                  {t.prices.extras.optionalItems.map((item, i) => (
                    <div key={i} className="flex items-start gap-2 text-sm text-gray-700">
                      <div className="w-1.5 h-1.5 bg-green-400 rounded-full mt-2 flex-shrink-0" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Gallery Section with Tabs */}
      <section id="gallery" className="py-16 sm:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-8">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">{t.gallery.title}</h2>
            <p className="text-gray-600">{t.gallery.subtitle}</p>
          </div>

          {/* Gallery Tabs */}
          <div className="flex flex-wrap justify-center gap-2 mb-8">
            {['standard', 'executive', 'mobilhome', 'exterior'].map((tab) => (
              <button key={tab} onClick={() => setGalleryTab(tab)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                  galleryTab === tab 
                    ? 'bg-blue-600 text-white shadow-lg' 
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}>
                {t.gallery.tabs[tab]}
              </button>
            ))}
          </div>

          {/* Gallery Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {getGalleryImages().slice(0, 16).map((img, i) => (
              <div key={i} className={`rounded-xl overflow-hidden cursor-pointer group ${
                i === 0 ? 'col-span-2 row-span-2' : ''
              }`} onClick={() => openLightbox(getGalleryImages(), i)}>
                <img src={img} alt="" 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" 
                  style={{ minHeight: i === 0 ? '400px' : '180px' }}
                  onError={(e) => { e.target.parentElement.style.display = 'none'; }}
                />
              </div>
            ))}
          </div>
          {getGalleryImages().length > 16 && (
            <p className="text-center text-gray-500 mt-4 text-sm">
              +{getGalleryImages().length - 16} more photos - click any image to view all
            </p>
          )}
        </div>
      </section>

      {/* Services Section - Car Rental, Boat Tours, Flights */}
      <section id="services" className="py-16 sm:py-24 bg-gradient-to-b from-blue-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">{t.services.title}</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">{t.services.subtitle}</p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Car Rental */}
            <div className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
              <div className="h-48 overflow-hidden">
                <img 
                  src="https://images.unsplash.com/photo-1725103895205-4b958d980520?w=800&q=80" 
                  alt="Car rental in Sardinia" 
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-6">
                <div className="flex items-center gap-2 mb-3">
                  <Car className="w-6 h-6 text-blue-600" />
                  <h3 className="text-xl font-bold text-gray-900">{t.services.carRental.title}</h3>
                </div>
                <p className="text-gray-600 text-sm mb-4">{t.services.carRental.desc}</p>
                <div className="bg-blue-50 rounded-lg px-4 py-2 mb-4">
                  <p className="text-blue-600 font-bold">{t.services.carRental.price}</p>
                </div>
                <div className="flex flex-wrap gap-2 mb-4">
                  {t.services.carRental.cars.slice(0, 3).map((car, i) => (
                    <span key={i} className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded">{car}</span>
                  ))}
                </div>
                <button onClick={() => scrollTo('contact')}
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg font-medium transition-colors">
                  {t.services.carRental.cta}
                </button>
              </div>
            </div>

            {/* Boat Tours */}
            <div className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
              <div className="h-48 overflow-hidden">
                <img 
                  src="https://images.unsplash.com/photo-1634405277712-617c29ea436e?w=800&q=80" 
                  alt="Boat tours Costa Smeralda" 
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-6">
                <div className="flex items-center gap-2 mb-3">
                  <Waves className="w-6 h-6 text-cyan-600" />
                  <h3 className="text-xl font-bold text-gray-900">{t.services.boatRental.title}</h3>
                </div>
                <p className="text-gray-600 text-sm mb-4">{t.services.boatRental.desc}</p>
                <div className="grid grid-cols-2 gap-2 mb-4">
                  <img src="https://images.unsplash.com/photo-1570299630586-ee0d58600179?w=400&q=80" alt="" className="rounded-lg h-20 w-full object-cover" />
                  <img src="https://images.unsplash.com/photo-1688142819011-200dbbd01049?w=400&q=80" alt="" className="rounded-lg h-20 w-full object-cover" />
                </div>
                <button onClick={() => scrollTo('contact')}
                  className="w-full bg-cyan-600 hover:bg-cyan-700 text-white py-2 rounded-lg font-medium transition-colors">
                  {t.services.boatRental.cta}
                </button>
              </div>
            </div>

            {/* Flights */}
            <div className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
              <div className="h-48 overflow-hidden">
                <img 
                  src="https://images.unsplash.com/photo-1502646136642-4c344ccd35c4?w=800&q=80" 
                  alt="Flight to Sardinia" 
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-6">
                <div className="flex items-center gap-2 mb-3">
                  <Mountain className="w-6 h-6 text-amber-600" />
                  <h3 className="text-xl font-bold text-gray-900">{t.services.flights.title}</h3>
                </div>
                <p className="text-gray-600 text-sm mb-4">{t.services.flights.desc}</p>
                <p className="text-xs text-gray-500 mb-2">{t.services.flights.airlines}</p>
                <div className="bg-amber-50 rounded-lg px-4 py-2 mb-4">
                  <p className="text-amber-700 font-medium text-sm">{t.services.flights.tip}</p>
                </div>
                <a href="https://www.google.com/travel/flights" target="_blank" rel="noopener noreferrer"
                  className="block w-full bg-amber-600 hover:bg-amber-700 text-white py-2 rounded-lg font-medium transition-colors text-center">
                  Google Flights →
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section - Warm terracotta theme */}
      <section id="contact" className="py-16 sm:py-24 bg-gradient-to-br from-amber-800 via-orange-800 to-amber-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">{t.contact.title}</h2>
            <p className="text-amber-200">{t.contact.subtitle}</p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12">
            {/* Contact Form - JotForm */}
            <div className="bg-white rounded-2xl p-2 sm:p-4 text-gray-900 overflow-hidden">
              <iframe 
                id="JotFormIFrame-81427604547358" 
                title="Villa Smeralda Online Request Form" 
                allowTransparency="true" 
                allow="geolocation; microphone; camera; fullscreen; payment" 
                src="https://form.jotform.com/81427604547358" 
                frameBorder="0" 
                style={{width: '110%', height: '400px', border: 'none', transform: 'scale(0.75)', transformOrigin: 'top left'}} 
              />
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
                <div className="flex items-start gap-3 text-amber-200">
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
                <div className="text-amber-200 text-sm">
                  <p>Smeralda Immobiliare srl</p>
                  <p>IT06286710964</p>
                </div>
              </div>

              <div>
                <a href="mailto:villasmeralda1980@gmail.com" className="flex items-center gap-3 text-amber-200 hover:text-white transition-colors">
                  <Mail className="w-5 h-5" />
                  villasmeralda1980@gmail.com
                </a>
              </div>

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
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3044.8!2d9.35!3d40.88!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x12d949c4f98a48d5%3A0x8f3c2a1b4c5d6e7f!2sVilla%20Smeralda%20Telti!5e0!3m2!1sen!2sit!4v1700000000000"
              width="100%" height="400" style={{ border: 0 }} allowFullScreen="" loading="lazy"
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
                  <img src={FWORKS_LOGO} alt="fworks builders" className="h-5 w-auto" />
                  <span>fworks builders</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </footer>
      
      {/* Tawk.to Live Chat - loaded via script */}
    </div>
  );
};

// Main App Component with Routes
const SmeraldaApp = () => {
  return (
    <Routes>
      <Route index element={<SmeraldaHomePage />} />
      <Route path="confirmation" element={<ConfirmationPage />} />
      <Route path="*" element={<SmeraldaHomePage />} />
    </Routes>
  );
};

export default SmeraldaApp;
