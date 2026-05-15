// Hacienda Turística San Francisco - Translations (ES default, EN, FR, IT, DE)
const _ = (es, en, fr, it, de) => ({ es, en, fr, it, de });

export const translations = {
  brand: {
    name: 'Hacienda Turística San Francisco',
    short: 'San Francisco',
    tagline: _(
      'Cabalgatas · Aventuras · Naturaleza',
      'Horseback Riding · Adventures · Nature',
      'Balades à cheval · Aventures · Nature',
      'Passeggiate a Cavallo · Avventure · Natura',
      'Reiten · Abenteuer · Natur'
    ),
    subtitle: _(
      'Vive la experiencia campestre en familia',
      'Live the country experience with your family',
      'Vivez l\'expérience champêtre en famille',
      'Vivi l\'esperienza campestre in famiglia',
      'Erleben Sie das Landleben mit der Familie'
    )
  },
  nav: {
    home: _('Inicio', 'Home', 'Accueil', 'Home', 'Startseite'),
    about: _('Quiénes Somos', 'About Us', 'Qui Sommes-Nous', 'Chi Siamo', 'Über Uns'),
    hospedaje: _('Hospedaje', 'Lodging', 'Hébergement', 'Alloggio', 'Unterkunft'),
    caballos: _('Caballos', 'Horses', 'Chevaux', 'Cavalli', 'Pferde'),
    animales: _('Animales', 'Animals', 'Animaux', 'Animali', 'Tiere'),
    actividades: _('Actividades', 'Activities', 'Activités', 'Attività', 'Aktivitäten'),
    eventos: _('Eventos', 'Events', 'Événements', 'Eventi', 'Events'),
    restaurante: _('Restaurante', 'Restaurant', 'Restaurant', 'Ristorante', 'Restaurant'),
    contacto: _('Contacto', 'Contact', 'Contact', 'Contatto', 'Kontakt'),
    gallery: _('Galería', 'Gallery', 'Galerie', 'Galleria', 'Galerie')
  },
  contact: {
    phone: '+593 99 906 0566',
    whatsapp: '+593 99 906 0566',
    whatsappLink: 'https://wa.me/593999060566',
    email: 'info@sanfrancisco-haciendaturistica.com',
    address: 'Vía a Quinindé Km 22, Santo Domingo de los Tsáchilas, Ecuador',
    addressShort: 'Vía a Quinindé Km 22, Santo Domingo, Ecuador'
  },
  home: {
    welcome: _(
      'Bienvenidos a la',
      'Welcome to',
      'Bienvenue à la',
      'Benvenuti alla',
      'Willkommen in der'
    ),
    cta: {
      reserve: _('Reservar por WhatsApp', 'Book via WhatsApp', 'Réserver par WhatsApp', 'Prenota su WhatsApp', 'Per WhatsApp buchen'),
      explore: _('Descubrir', 'Discover', 'Découvrir', 'Scopri', 'Entdecken')
    },
    intro: _(
      'Un espacio natural único a 22 km de Santo Domingo donde la familia, la aventura y la naturaleza se encuentran. Cabañas, paseos a caballo, mini-granja, piscinas y mucho más.',
      'A unique natural space 22 km from Santo Domingo where family, adventure and nature meet. Cabins, horseback riding, mini-farm, pools and much more.',
      'Un espace naturel unique à 22 km de Santo Domingo où la famille, l\'aventure et la nature se rencontrent. Cabanes, balades à cheval, mini-ferme, piscines et bien plus.',
      'Uno spazio naturale unico a 22 km da Santo Domingo dove famiglia, avventura e natura si incontrano. Cabañas, passeggiate a cavallo, mini-fattoria, piscine e molto altro.',
      'Ein einzigartiger Naturraum 22 km von Santo Domingo entfernt, wo sich Familie, Abenteuer und Natur treffen. Hütten, Reiten, Mini-Bauernhof, Schwimmbäder und vieles mehr.'
    )
  }
};

export default translations;
