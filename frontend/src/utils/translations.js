// Translations for Site Admin Dashboard
export const translations = {
  fr: {
    // Header
    management: 'Gestion',
    welcome: 'Bienvenue',
    logout: 'Déconnexion',
    
    // Navigation
    overview: 'Aperçu',
    openingHours: 'Heures d\'ouverture',
    menu: 'Menu',
    photos: 'Photos',
    
    // Overview
    closureNotice: 'Avis de fermeture',
    closurePlaceholder: 'Ex: Nous sommes fermés du 24 au 26 décembre...',
    save: 'Enregistrer',
    saving: 'Enregistrement...',
    
    // Menu
    addItem: 'Ajouter un plat',
    category: 'Catégorie',
    name: 'Nom',
    price: 'Prix',
    deleteConfirm: 'Supprimer ce plat?',
    
    // Categories
    antipasti: 'Antipasti',
    primi: 'Primi',
    secondi: 'Secondi',
    desserts: 'Desserts',
    drinks: 'Boissons',
    
    // Gallery
    addPhoto: 'Ajouter une photo',
    photoUrl: 'URL de l\'image:',
    
    // Messages
    saved: 'Enregistré!',
    itemAdded: 'Plat ajouté!',
    deleted: 'Supprimé!',
    error: 'Erreur',
    
    // Language
    language: 'Langue',
  },
  
  nl: {
    // Header
    management: 'Beheer',
    welcome: 'Welkom',
    logout: 'Uitloggen',
    
    // Navigation
    overview: 'Overzicht',
    openingHours: 'Openingstijden',
    menu: 'Menu',
    photos: 'Foto\'s',
    
    // Overview
    closureNotice: 'Sluitingsbericht',
    closurePlaceholder: 'Bijv: Wij zijn gesloten van 24-26 december...',
    save: 'Opslaan',
    saving: 'Opslaan...',
    
    // Menu
    addItem: 'Item Toevoegen',
    category: 'Categorie',
    name: 'Naam',
    price: 'Prijs',
    deleteConfirm: 'Item verwijderen?',
    
    // Categories
    antipasti: 'Antipasti',
    primi: 'Primi',
    secondi: 'Secondi',
    desserts: 'Desserts',
    drinks: 'Dranken',
    
    // Gallery
    addPhoto: 'Foto Toevoegen',
    photoUrl: 'URL van de afbeelding:',
    
    // Messages
    saved: 'Opgeslagen!',
    itemAdded: 'Item toegevoegd!',
    deleted: 'Verwijderd!',
    error: 'Fout',
    
    // Language
    language: 'Taal',
  },
  
  en: {
    // Header
    management: 'Management',
    welcome: 'Welcome',
    logout: 'Log out',
    
    // Navigation
    overview: 'Overview',
    openingHours: 'Opening Hours',
    menu: 'Menu',
    photos: 'Photos',
    
    // Overview
    closureNotice: 'Closure Notice',
    closurePlaceholder: 'E.g.: We are closed from December 24-26...',
    save: 'Save',
    saving: 'Saving...',
    
    // Menu
    addItem: 'Add Item',
    category: 'Category',
    name: 'Name',
    price: 'Price',
    deleteConfirm: 'Delete this item?',
    
    // Categories
    antipasti: 'Antipasti',
    primi: 'Primi',
    secondi: 'Secondi',
    desserts: 'Desserts',
    drinks: 'Drinks',
    
    // Gallery
    addPhoto: 'Add Photo',
    photoUrl: 'Image URL:',
    
    // Messages
    saved: 'Saved!',
    itemAdded: 'Item added!',
    deleted: 'Deleted!',
    error: 'Error',
    
    // Language
    language: 'Language',
  }
};

export const getTranslation = (lang, key) => {
  return translations[lang]?.[key] || translations['fr'][key] || key;
};
