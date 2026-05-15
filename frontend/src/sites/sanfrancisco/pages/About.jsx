import React from 'react';
import { Download, FileText } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { translations } from '../data/translations';

const About = () => {
  const { language } = useLanguage();
  const t = translations;

  const story = {
    es: 'La Hacienda Turística San Francisco es un espacio natural único ubicado a 22 km de Santo Domingo, donde la familia, la aventura y la naturaleza se encuentran. Ofrecemos alojamiento cómodo en habitaciones, suites y cabañas, ideales para familias, parejas o grupos. Nuestros servicios incluyen desayuno campestre, restaurante, piscina y amplias áreas recreativas — todo en un entorno natural perfecto para descansar y desconectarse de la ciudad.',
    en: 'San Francisco Hacienda Turística is a unique natural space located 22 km from Santo Domingo, where family, adventure and nature meet. We offer comfortable accommodation in rooms, suites and cabins, ideal for families, couples or groups. Our services include country breakfast, restaurant, swimming pool and ample recreational areas — all in a natural environment perfect for resting and disconnecting from the city.',
    fr: 'La Hacienda Turística San Francisco est un espace naturel unique situé à 22 km de Santo Domingo, où la famille, l\'aventure et la nature se rencontrent. Nous offrons un hébergement confortable en chambres, suites et cabanes, idéal pour familles, couples ou groupes. Nos services incluent petit-déjeuner champêtre, restaurant, piscine et vastes espaces récréatifs — le tout dans un environnement naturel parfait pour se reposer et se déconnecter de la ville.',
    it: 'La Hacienda Turística San Francisco è uno spazio naturale unico situato a 22 km da Santo Domingo, dove famiglia, avventura e natura si incontrano. Offriamo alloggio confortevole in camere, suite e cabañas, ideali per famiglie, coppie o gruppi. I nostri servizi includono colazione campestre, ristorante, piscina e ampie aree ricreative — il tutto in un ambiente naturale perfetto per riposare e disconnettersi dalla città.',
    de: 'Die San Francisco Hacienda Turística ist ein einzigartiger Naturraum, 22 km von Santo Domingo entfernt, wo sich Familie, Abenteuer und Natur begegnen. Wir bieten komfortable Unterkünfte in Zimmern, Suiten und Hütten, ideal für Familien, Paare oder Gruppen. Unsere Dienstleistungen umfassen ländliches Frühstück, Restaurant, Schwimmbad und großzügige Erholungsbereiche — alles in einer natürlichen Umgebung, perfekt zum Entspannen und Abschalten vom Stadtleben.'
  };

  const labels = {
    title: { es:'Quiénes Somos', en:'About Us', fr:'Qui Sommes-Nous', it:'Chi Siamo', de:'Über Uns' },
    catalogTitle: { es:'Nuestro Catálogo', en:'Our Catalog', fr:'Notre Catalogue', it:'Il Nostro Catalogo', de:'Unser Katalog' },
    catalogDesc: {
      es: 'Descubre todos nuestros servicios, planes y tarifas en nuestro catálogo completo.',
      en: 'Discover all our services, plans and rates in our complete catalog.',
      fr: 'Découvrez tous nos services, plans et tarifs dans notre catalogue complet.',
      it: 'Scopri tutti i nostri servizi, piani e tariffe nel nostro catalogo completo.',
      de: 'Entdecken Sie alle unsere Dienstleistungen, Pläne und Preise in unserem vollständigen Katalog.'
    },
    download: { es:'Descargar PDF', en:'Download PDF', fr:'Télécharger PDF', it:'Scarica PDF', de:'PDF herunterladen' },
    viewBelow: { es:'O véalo aquí abajo', en:'Or view it below', fr:'Ou consultez-le ci-dessous', it:'O guardalo qui sotto', de:'Oder hier unten ansehen' }
  };

  return (
    <div className="min-h-screen bg-black pt-24 pb-16">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12 animate-fade-in">
          <h1 className="text-5xl md:text-6xl font-bold text-gold mb-4">{labels.title[language]}</h1>
          <div className="w-24 h-1 bg-gold mx-auto"></div>
        </div>

        {/* Hero image + Story */}
        <div className="grid md:grid-cols-2 gap-12 mb-20 items-center">
          <img src="/images/sanfrancisco/gallery/gallery-01.jpg" alt="Hacienda San Francisco" className="w-full h-96 object-cover rounded-lg shadow-2xl border border-gold/20" />
          <div className="space-y-6 leading-relaxed text-cream/90 text-lg" style={{color:'#F5E6CA'}}>
            <p>{story[language]}</p>
          </div>
        </div>

        {/* PDF Section */}
        <div className="bg-gradient-to-br from-gray-900 to-black p-8 md:p-10 rounded-lg border border-gold/30 shadow-2xl mb-12">
          <div className="text-center mb-8">
            <FileText size={64} className="text-gold mx-auto mb-4" />
            <h2 className="text-3xl md:text-4xl font-bold text-gold mb-3">{labels.catalogTitle[language]}</h2>
            <p className="text-cream/80 text-lg max-w-2xl mx-auto" style={{color:'rgba(245,230,202,0.8)'}}>{labels.catalogDesc[language]}</p>
          </div>
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-10">
            <a href="/images/sanfrancisco/pdf/catalogo-sanfrancisco.pdf" download="Catalogo-San-Francisco.pdf"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-gold text-black font-bold rounded-lg hover:bg-gold/90 transition-all duration-300 transform hover:scale-105 shadow-lg">
              <Download size={20} />
              {labels.download[language]}
            </a>
          </div>
          <p className="text-center text-cream/60 text-sm mb-6" style={{color:'rgba(245,230,202,0.6)'}}>↓ {labels.viewBelow[language]} ↓</p>
          {/* Embedded PDF preview */}
          <div className="relative w-full bg-black rounded-lg overflow-hidden border border-gold/20" style={{ paddingBottom: '141%' /* A4 ratio */ }}>
            <iframe
              src="/images/sanfrancisco/pdf/catalogo-sanfrancisco.pdf#view=FitH"
              title="Catálogo Hacienda San Francisco"
              className="absolute inset-0 w-full h-full"
              style={{ border: 0 }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
