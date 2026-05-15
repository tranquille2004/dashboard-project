import React from 'react';
import { Phone, Mail, MapPin, MessageCircle, Instagram, Facebook } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { translations } from '../data/translations';

const Contacto = () => {
  const { language } = useLanguage();
  const t = translations;

  const labels = {
    title: { es:'Contacto', en:'Contact', fr:'Contact', it:'Contatto', de:'Kontakt' },
    subtitle: {
      es:'Estamos a tu disposición. Contáctanos para reservar tu visita o estadía.',
      en:'We are at your disposal. Contact us to book your visit or stay.',
      fr:'Nous sommes à votre disposition. Contactez-nous pour réserver votre visite ou séjour.',
      it:'Siamo a tua disposizione. Contattaci per prenotare la tua visita o soggiorno.',
      de:'Wir stehen zu Ihrer Verfügung. Kontaktieren Sie uns, um Ihren Besuch oder Aufenthalt zu buchen.'
    },
    howToFind: { es:'Cómo llegar', en:'How to find us', fr:'Comment nous trouver', it:'Come trovarci', de:'So finden Sie uns' },
    route: {
      es:'Estamos ubicados a 22 km de Santo Domingo de los Tsáchilas, sobre la Vía a Quinindé. Fácil acceso en vehículo. Hay parqueadero amplio para nuestros visitantes.',
      en:'We are located 22 km from Santo Domingo de los Tsáchilas, on the road to Quinindé. Easy access by vehicle. We have ample parking for our visitors.',
      fr:'Nous sommes situés à 22 km de Santo Domingo de los Tsáchilas, sur la route de Quinindé. Accès facile en véhicule. Parking spacieux pour nos visiteurs.',
      it:'Ci troviamo a 22 km da Santo Domingo de los Tsáchilas, sulla strada per Quinindé. Facile accesso in auto. Ampio parcheggio per i nostri visitatori.',
      de:'Wir befinden uns 22 km von Santo Domingo de los Tsáchilas an der Straße nach Quinindé. Leicht mit dem Fahrzeug zu erreichen. Ausreichend Parkplätze für unsere Besucher.'
    }
  };

  return (
    <div className="min-h-screen bg-black pt-24 pb-16">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 animate-fade-in">
          <h1 className="text-5xl md:text-6xl font-bold text-gold mb-4">{labels.title[language]}</h1>
          <div className="w-24 h-1 bg-gold mx-auto mb-6"></div>
          <p className="text-xl text-cream/80 max-w-3xl mx-auto" style={{color:'rgba(245,230,202,0.8)'}}>{labels.subtitle[language]}</p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 mb-12">
          <a href={t.contact.whatsappLink} target="_blank" rel="noopener noreferrer" className="hover-lift bg-gradient-to-br from-gray-900 to-black p-8 rounded-lg border border-gold/30 hover:border-gold text-center transition-all">
            <MessageCircle size={48} className="text-gold mx-auto mb-4" />
            <h3 className="text-cream font-bold text-xl mb-2" style={{color:'#F5E6CA'}}>WhatsApp</h3>
            <p className="text-gold text-lg">{t.contact.whatsapp}</p>
          </a>
          <a href={`tel:+593999060566`} className="hover-lift bg-gradient-to-br from-gray-900 to-black p-8 rounded-lg border border-gold/30 hover:border-gold text-center transition-all">
            <Phone size={48} className="text-gold mx-auto mb-4" />
            <h3 className="text-cream font-bold text-xl mb-2" style={{color:'#F5E6CA'}}>{ {es:'Teléfono',en:'Phone',fr:'Téléphone',it:'Telefono',de:'Telefon'}[language] }</h3>
            <p className="text-gold text-lg">{t.contact.phone}</p>
          </a>
          <a href={`mailto:${t.contact.email}`} className="hover-lift bg-gradient-to-br from-gray-900 to-black p-8 rounded-lg border border-gold/30 hover:border-gold text-center transition-all">
            <Mail size={48} className="text-gold mx-auto mb-4" />
            <h3 className="text-cream font-bold text-xl mb-2" style={{color:'#F5E6CA'}}>Email</h3>
            <p className="text-gold text-sm break-all">{t.contact.email}</p>
          </a>
        </div>

        {/* Social */}
        <div className="flex items-center justify-center gap-4 mb-12">
          <a href="https://www.instagram.com/haciendaturisticasanfrancisco/" target="_blank" rel="noopener noreferrer" className="p-4 border-2 border-gold/40 rounded-full text-gold hover:bg-gold hover:text-black transition-all">
            <Instagram size={28} />
          </a>
          <a href="https://www.facebook.com/clubsanfranciscoec" target="_blank" rel="noopener noreferrer" className="p-4 border-2 border-gold/40 rounded-full text-gold hover:bg-gold hover:text-black transition-all">
            <Facebook size={28} />
          </a>
          <a href="https://www.tiktok.com/@haciendasanfranciso" target="_blank" rel="noopener noreferrer" className="p-4 border-2 border-gold/40 rounded-full text-gold hover:bg-gold hover:text-black transition-all">
            <svg className="w-7 h-7" viewBox="0 0 24 24" fill="currentColor"><path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5.8 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1.84-.1z"/></svg>
          </a>
        </div>

        {/* Address & Map */}
        <div className="grid md:grid-cols-2 gap-8 mb-8">
          <div className="bg-gradient-to-br from-gray-900 to-black p-8 rounded-lg border border-gold/20">
            <MapPin size={40} className="text-gold mb-4" />
            <h2 className="text-2xl font-bold text-gold mb-3">{labels.howToFind[language]}</h2>
            <p className="text-cream text-lg mb-3" style={{color:'#F5E6CA'}}>{t.contact.address}</p>
            <p className="text-cream/70 leading-relaxed" style={{color:'rgba(245,230,202,0.7)'}}>{labels.route[language]}</p>
          </div>
          <div className="rounded-lg overflow-hidden border border-gold/20 shadow-2xl bg-black min-h-[300px] flex flex-col">
            <iframe
              title="Club San Francisco en Google Maps"
              src="https://www.google.com/maps?q=Club+San+Francisco+Hacienda+Tur%C3%ADstica+Santo+Domingo&output=embed"
              className="w-full flex-1"
              style={{ minHeight: '300px', border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
            <a
              href="https://share.google/yhoXo68S5dEMJWKr8"
              target="_blank"
              rel="noopener noreferrer"
              className="block text-center py-3 bg-black/80 border-t border-gold/20 text-gold hover:bg-gold hover:text-black transition-all text-sm font-semibold"
            >
              {{ es:'Abrir en Google Maps ↗', en:'Open in Google Maps ↗', fr:'Ouvrir dans Google Maps ↗', it:'Apri in Google Maps ↗', de:'In Google Maps öffnen ↗' }[language]}
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contacto;
