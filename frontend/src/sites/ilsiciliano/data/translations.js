// Il Siciliano - Trattoria Pizzeria - Santo Domingo, Ecuador
// 4 Languages: ES (default), EN, IT, FR
// NL/DE kept as fallback aliases to avoid breaking Il Siciliano-cloned components.

const _ = (es, en, it, fr) => ({ es, en, it, fr, nl: es, de: en });

export const translations = {
  nav: {
    home: _('Inicio', 'Home', 'Home', 'Accueil'),
    about: _('Nosotros', 'About', 'Chi Siamo', 'À propos'),
    menu: _('Menú', 'Menu', 'Menu', 'Carte'),
    groupMenus: _('Menús de Grupo', 'Group Menus', 'Menu di Gruppo', 'Menus de Groupe'),
    takeaway: _('Para Llevar', 'Takeaway', 'Da Asporto', 'À emporter'),
    reserve: _('Reservar', 'Reserve', 'Prenota', 'Réserver'),
    gallery: _('Galería', 'Gallery', 'Galleria', 'Galerie'),
    info: _('Info', 'Info', 'Info', 'Info')
  },
  home: {
    welcome: _(
      'Bienvenidos a Il Siciliano',
      'Welcome to Il Siciliano',
      'Benvenuti a Il Siciliano',
      'Bienvenue chez Il Siciliano'
    ),
    subtitle: _(
      'Trattoria & Pizzería — el verdadero sabor de Sicilia en Santo Domingo',
      'Trattoria & Pizzeria — the real taste of Sicily in Santo Domingo',
      'Trattoria & Pizzeria — il vero sapore della Sicilia a Santo Domingo',
      'Trattoria & Pizzeria — le vrai goût de la Sicile à Santo Domingo'
    ),
    closedNotice: _('', '', '', ''),
    cta: {
      reserve: _('Reservar mesa', 'Book a table', 'Prenota un tavolo', 'Réserver une table'),
      takeaway: _('Pedir para llevar', 'Order takeaway', 'Ordina da asporto', 'Commander à emporter')
    }
  },
  hours: {
    title: _('Horario', 'Opening Hours', 'Orari di Apertura', 'Horaires'),
    lunch: '12:00 - 15:00',
    dinner: '18:30 - 22:30',
    closed: _(
      'Lunes cerrado todo el día',
      'Closed all day Monday',
      'Chiuso tutto il lunedì',
      'Fermé toute la journée lundi'
    )
  },
  contact: {
    address: 'Av. Quito y Tulcán, Santo Domingo, Ecuador',
    phone: '+593 98 411 0781',
    email: 'info@ilsiciliano.ec',
    emailNote: _(
      '(email solo para información, reservas a través de este sitio web)',
      '(email for information only, reservations via this website)',
      '(email solo per informazioni, prenotazioni tramite questo sito)',
      '(email pour information uniquement, réservations via ce site)'
    )
  },
  about: {
    title: _('Nuestra historia', 'Our story', 'La nostra storia', 'Notre histoire'),
    content: {
      es: `Il Siciliano nació del sueño de traer a Santo Domingo los sabores auténticos de la Italia del sur — directamente desde las trattorias familiares de Sicilia, donde la comida es un gesto de amor y la mesa se llena de conversación y risas.\n\nNuestra cocina se basa en tres pilares simples pero esenciales: productos frescos, recetas transmitidas de generación en generación, y la paciencia que exige la verdadera gastronomía italiana. Amasamos la pasta a mano cada día, horneamos nuestras pizzas en horno de leña a más de 400°C, y seleccionamos los ingredientes con el cuidado de quien cocina para la propia familia.\n\nDesde los arancini siciliani hasta la pasta alla Norma, desde la pizza margherita más clásica hasta las especialidades del chef, cada plato cuenta una historia. Una historia de Palermo, de Catania, de los pueblos costeros donde el mar se mezcla con el aroma del limón y el aceite de oliva.\n\nBienvenidos a Il Siciliano — donde cada comida es una pequeña vacación en Sicilia.`,
      en: `Il Siciliano was born from the dream of bringing to Santo Domingo the authentic flavors of Southern Italy — straight from the family trattorias of Sicily, where food is a gesture of love and the table fills up with conversation and laughter.\n\nOur kitchen is built on three simple but essential pillars: fresh produce, recipes handed down from generation to generation, and the patience that true Italian cuisine demands. We knead our pasta by hand every day, bake our pizzas in a wood-fired oven at over 400°C, and pick our ingredients with the care of someone cooking for their own family.\n\nFrom arancini siciliani to pasta alla Norma, from the most classic pizza margherita to the chef's specialties, every dish tells a story. A story of Palermo, of Catania, of the coastal villages where the sea blends with the aroma of lemons and olive oil.\n\nWelcome to Il Siciliano — where every meal is a small vacation in Sicily.`,
      it: `Il Siciliano nasce dal sogno di portare a Santo Domingo i sapori autentici dell'Italia meridionale — direttamente dalle trattorie familiari della Sicilia, dove il cibo è un gesto d'amore e la tavola si riempie di conversazione e risate.\n\nLa nostra cucina si basa su tre pilastri semplici ma essenziali: prodotti freschi, ricette tramandate di generazione in generazione, e la pazienza che la vera gastronomia italiana richiede. Impastiamo la pasta a mano ogni giorno, cuociamo le nostre pizze in forno a legna a oltre 400°C, e selezioniamo gli ingredienti con la cura di chi cucina per la propria famiglia.\n\nDagli arancini siciliani alla pasta alla Norma, dalla pizza margherita più classica alle specialità dello chef, ogni piatto racconta una storia. Una storia di Palermo, di Catania, dei paesi costieri dove il mare si mescola con il profumo del limone e dell'olio d'oliva.\n\nBenvenuti a Il Siciliano — dove ogni pasto è una piccola vacanza in Sicilia.`,
      fr: `Il Siciliano est né du rêve d'apporter à Santo Domingo les saveurs authentiques du sud de l'Italie — directement des trattorias familiales de Sicile, où la nourriture est un geste d'amour et où la table se remplit de conversation et de rires.\n\nNotre cuisine repose sur trois piliers simples mais essentiels : des produits frais, des recettes transmises de génération en génération, et la patience que la vraie gastronomie italienne exige. Nous pétrissons nos pâtes à la main chaque jour, cuisons nos pizzas au four à bois à plus de 400°C, et choisissons nos ingrédients avec le soin de quelqu'un qui cuisine pour sa propre famille.\n\nDes arancini siciliani aux pâtes alla Norma, de la pizza margherita la plus classique aux spécialités du chef, chaque plat raconte une histoire. Une histoire de Palerme, de Catane, des villages côtiers où la mer se mélange à l'arôme des citrons et de l'huile d'olive.\n\nBienvenue chez Il Siciliano — où chaque repas est une petite vacance en Sicile.`,
      nl: '',
      de: ''
    }
  },
  menu: {
    title: _('Nuestra carta', 'Our menu', 'Il nostro menu', 'Notre carte'),
    subtitle: _(
      'Cocina siciliana auténtica — para comer aquí o para llevar',
      'Authentic Sicilian cuisine — dine-in or takeaway',
      'Cucina siciliana autentica — sul posto o da asporto',
      'Cuisine sicilienne authentique — sur place ou à emporter'
    ),
    download: _('Descargar la carta', 'Download menu', 'Scarica il menu', 'Télécharger la carte')
  },
  reserve: {
    title: _(
      'Reservar una mesa',
      'Reserve a table',
      'Prenota un tavolo',
      'Réserver une table'
    ),
    description: _(
      'Puede utilizar el formulario para reservar su mesa. Su reserva quedará confirmada automáticamente. Solo le contactaremos si estamos al completo o si necesitamos más información.',
      'You can use the form below to reserve your table. Your booking is automatically confirmed. We will only contact you back if we are fully booked or if we need more information.',
      'Potete utilizzare il modulo per prenotare il vostro tavolo. La vostra prenotazione sarà confermata automaticamente. Vi ricontatteremo solo se siamo al completo o se abbiamo bisogno di ulteriori informazioni.',
      "Vous pouvez utiliser le formulaire pour réserver votre table. Votre réservation est confirmée automatiquement. Nous vous recontacterons uniquement si nous sommes complets ou si nous avons besoin de plus d'informations."
    ),
    groupNote: _(
      'Para reservas de 15 personas o más, le responderemos dentro de 12 horas con una propuesta de menú.',
      'For bookings of 15 people or more, we will respond within 12 hours with a menu proposal.',
      'Per prenotazioni di 15 persone o più, vi risponderemo entro 12 ore con una proposta di menu.',
      'Pour les réservations de 15 personnes ou plus, nous vous répondrons dans les 12 heures avec une proposition de menu.'
    )
  },
  takeaway: {
    title: _('Para Llevar', 'Takeaway', 'Da Asporto', 'À emporter'),
    subtitle: _(
      '¡Solo recogida en el restaurante!',
      'Pickup at the restaurant only!',
      'Solo ritiro al ristorante!',
      'Retrait au restaurant uniquement !'
    ),
    description: _(
      'Utilice el formulario para hacer su pedido. Pase a recogerlo en el horario acordado. Su pedido queda confirmado automáticamente.',
      'Use the form to place your order. Come and pick it up at the agreed time. Your order is automatically confirmed.',
      'Utilizzate il modulo per effettuare il vostro ordine. Venite a ritirarlo all\'orario concordato. Il vostro ordine è confermato automaticamente.',
      'Utilisez le formulaire pour passer votre commande. Venez la récupérer à l\'heure convenue. Votre commande est confirmée automatiquement.'
    ),
    note: _(
      'Esto es solo para LLEVAR. Si desea comer en el restaurante',
      'This is for TAKEAWAY only. If you want to dine in',
      'Questo è solo per ASPORTO. Se volete mangiare al ristorante',
      'Ceci est uniquement pour EMPORTER. Si vous souhaitez manger sur place'
    ),
    clickHere: _('haga clic aquí', 'click here', 'cliccate qui', 'cliquez ici')
  },
  gallery: {
    title: _('Galería', 'Gallery', 'Galleria', 'Galerie')
  }
};
