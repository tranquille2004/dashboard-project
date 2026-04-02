import React from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../contexts/LanguageContext';
import { useBasePath } from '../contexts/BasePathContext';
import { CheckCircle, ShoppingBag } from 'lucide-react';

// CSS voor de hartslag animatie
const pulseAnimation = `
  @keyframes heartbeat {
    0% { transform: scale(1); }
    25% { transform: scale(1.1); }
    50% { transform: scale(1); }
    75% { transform: scale(1.05); }
    100% { transform: scale(1); }
  }
`;

const ConfirmationTakeaway = () => {
  const { language } = useLanguage();
  const basePath = useBasePath();
  const homePath = basePath || '/';

  const content = {
    nl: {
      title: 'Grazie!',
      subtitle: 'Bedankt, uw afhaalbestelling is goed ontvangen!',
      message1: 'WIJ KONTAKTEREN U NIET, tenzij wij bijkomende vragen hebben.',
      message2: 'Om dubbele bestellingen te vermijden, aub BEL ONS NIET voor deze bestelling!',
      message3: 'Wij bekijken onze email de gehele dag dus uw bestelling is genoteerd.',
      backButton: 'Klik hier om terug te gaan naar de site',
      confirmNote: 'U ontvangt een automatische bevestigingsmail met de details van uw bestelling.'
    },
    fr: {
      title: 'Grazie!',
      subtitle: 'Merci, votre commande à emporter a bien été reçue!',
      message1: 'NOUS NE VOUS RECONTACTONS PAS, sauf en cas de questions supplémentaires.',
      message2: 'Pour éviter des commandes en double, s\'il vous plaît NE TELEPHONEZ PAS pour cette commande!',
      message3: 'Nous vérifions les commandes par email toute la journée donc votre demande est bien notée.',
      backButton: 'Cliquez ici pour retourner au site',
      confirmNote: 'Vous recevrez un email de confirmation automatique avec les détails de votre commande.'
    },
    en: {
      title: 'Grazie!',
      subtitle: 'Thank you, your takeaway order has been received!',
      message1: 'WE WILL NOT CONTACT YOU, unless we have additional questions.',
      message2: 'To avoid double orders, please DO NOT CALL for this order!',
      message3: 'We check our email all day so your order has been noted.',
      backButton: 'Click here to return to the site',
      confirmNote: 'You will receive an automatic confirmation email with your order details.'
    },
    es: {
      title: 'Grazie!',
      subtitle: '¡Gracias, su pedido para llevar ha sido recibido!',
      message1: 'NO LE CONTACTAREMOS, a menos que tengamos preguntas adicionales.',
      message2: '¡Para evitar pedidos dobles, por favor NO LLAME para este pedido!',
      message3: 'Revisamos nuestro correo electrónico todo el día, por lo que su pedido ha sido registrado.',
      backButton: 'Haga clic aquí para volver al sitio',
      confirmNote: 'Recibirá un correo electrónico de confirmación automático con los detalles de su pedido.'
    },
    de: {
      title: 'Grazie!',
      subtitle: 'Vielen Dank, Ihre Abholbestellung ist eingegangen!',
      message1: 'WIR WERDEN SIE NICHT KONTAKTIEREN, es sei denn, wir haben zusätzliche Fragen.',
      message2: 'Um Doppelbestellungen zu vermeiden, rufen Sie bitte NICHT für diese Bestellung an!',
      message3: 'Wir überprüfen unsere E-Mails den ganzen Tag, daher wurde Ihre Bestellung notiert.',
      backButton: 'Klicken Sie hier, um zur Website zurückzukehren',
      confirmNote: 'Sie erhalten eine automatische Bestätigungs-E-Mail mit Ihren Bestelldetails.'
    },
    it: {
      title: 'Grazie!',
      subtitle: 'Grazie, il tuo ordine da asporto è stato ricevuto!',
      message1: 'NON TI CONTATTEREMO, a meno che non abbiamo domande aggiuntive.',
      message2: 'Per evitare ordini doppi, per favore NON CHIAMARE per questo ordine!',
      message3: 'Controlliamo la nostra email tutto il giorno quindi il tuo ordine è stato registrato.',
      backButton: 'Clicca qui per tornare al sito',
      confirmNote: 'Riceverai un\'email di conferma automatica con i dettagli del tuo ordine.'
    }
  };

  const t = content[language] || content.nl;

  return (
    <div className="min-h-screen bg-black pt-20">
      {/* Inject animation CSS */}
      <style>{pulseAnimation}</style>
      
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Success Icon with Heartbeat Animation */}
        <div className="flex justify-center mb-8">
          <div 
            className="bg-green-500/20 p-6 rounded-full relative"
            style={{ animation: 'heartbeat 1.5s ease-in-out infinite' }}
          >
            <CheckCircle size={80} className="text-green-500" strokeWidth={2.5} />
            <ShoppingBag size={28} className="text-gold absolute bottom-4 right-4" />
          </div>
        </div>

        {/* Title */}
        <h1 className="text-5xl md:text-6xl font-bold text-gold text-center mb-6">
          {t.title}
        </h1>

        {/* Main Message */}
        <div className="bg-gradient-to-br from-gold/5 to-transparent border-2 border-gold/20 rounded-lg p-8 md:p-12 mb-8">
          <h2 className="text-2xl md:text-3xl font-bold text-white text-center mb-8">
            {t.subtitle}
          </h2>

          <div className="space-y-6 text-gray-300">
            <p className="text-lg md:text-xl leading-relaxed">
              <span className="font-bold text-green-500">✓</span> {t.message1}
            </p>
            
            <p className="text-lg md:text-xl leading-relaxed">
              <span className="font-bold text-green-500">✓</span> {t.message2}
            </p>
            
            <p className="text-lg md:text-xl leading-relaxed">
              <span className="font-bold text-green-500">✓</span> {t.message3}
            </p>
          </div>
        </div>

        {/* Back to Home Button */}
        <div className="text-center">
          <Link
            to={homePath}
            className="inline-block bg-gold text-black px-8 py-4 rounded-lg font-bold text-lg hover:bg-gold/90 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
          >
            {t.backButton}
          </Link>
        </div>

        {/* Additional Info */}
        <div className="mt-12 text-center">
          <p className="text-gray-400 text-sm max-w-3xl mx-auto">
            {t.confirmNote}
          </p>
        </div>
      </div>
    </div>
  );
};

export default ConfirmationTakeaway;
