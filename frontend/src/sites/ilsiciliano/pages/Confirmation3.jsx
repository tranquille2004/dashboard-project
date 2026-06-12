import React from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../contexts/LanguageContext';
import { useBasePath } from '../contexts/BasePathContext';
import { CheckCircle, Baby } from 'lucide-react';

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

const Confirmation3 = () => {
  const { language } = useLanguage();
  const basePath = useBasePath();
  const homePath = basePath || '/';

  const content = {
    nl: {
      title: 'Grazie!',
      subtitle: 'Inschrijving goed ontvangen!',
      message3: 'Wij bekijken onze email de gehele dag dus uw inschrijving is genoteerd. Wij nemen contact met u op per email of WhatsApp.',
      backButton: 'Klik hier om terug te gaan naar de site',
      extra: 'U ontvangt een automatische bevestigingsmail. Voor vragen over de Bambino Box kunt u ons altijd contacteren via email.'
    },
    fr: {
      title: 'Grazie!',
      subtitle: 'Inscription bien reçue!',
      message3: 'Nous vérifions notre email toute la journée donc votre inscription est bien notée. Nous vous contacterons par email ou WhatsApp.',
      backButton: 'Cliquez ici pour retourner au site',
      extra: 'Vous recevrez un email de confirmation automatique. Pour toute question sur la Bambino Box, vous pouvez nous contacter par email.'
    },
    en: {
      title: 'Grazie!',
      subtitle: 'Subscription received!',
      message3: 'We check our email all day so your subscription has been noted. We will contact you by email or WhatsApp.',
      backButton: 'Click here to return to the site',
      extra: 'You will receive an automatic confirmation email. For any questions about the Bambino Box, feel free to contact us by email.'
    },
    es: {
      title: 'Grazie!',
      subtitle: '¡Inscripción recibida correctamente!',
      message3: 'Revisamos nuestro correo electrónico todo el día, por lo que su inscripción ha sido registrada. Nos pondremos en contacto con usted por correo electrónico o WhatsApp.',
      backButton: 'Haga clic aquí para volver al sitio',
      extra: 'Recibirá un correo electrónico de confirmación automático. Para cualquier consulta sobre la Bambino Box, no dude en contactarnos por correo electrónico.'
    },
    de: {
      title: 'Grazie!',
      subtitle: 'Anmeldung erfolgreich empfangen!',
      message3: 'Wir überprüfen unsere E-Mails den ganzen Tag, daher wurde Ihre Anmeldung notiert. Wir werden Sie per E-Mail oder WhatsApp kontaktieren.',
      backButton: 'Klicken Sie hier, um zur Website zurückzukehren',
      extra: 'Sie erhalten eine automatische Bestätigungs-E-Mail. Bei Fragen zur Bambino Box können Sie uns jederzeit per E-Mail kontaktieren.'
    },
    it: {
      title: 'Grazie!',
      subtitle: 'Iscrizione ricevuta correttamente!',
      message3: 'Controlliamo la nostra email tutto il giorno quindi la tua iscrizione è stata registrata. Ti contatteremo via email o WhatsApp.',
      backButton: 'Clicca qui per tornare al sito',
      extra: 'Riceverai un\'email di conferma automatica. Per qualsiasi domanda sulla Bambino Box, non esitare a contattarci via email.'
    }
  };

  const t = content[language] || content.es;

  return (
    <div className="min-h-screen bg-black pt-20" data-testid="bambino-confirmation-page">
      {/* Inject animation CSS */}
      <style>{pulseAnimation}</style>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Success Icon with Heartbeat Animation */}
        <div className="flex justify-center mb-8">
          <div
            className="bg-green-500/20 p-6 rounded-full"
            style={{ animation: 'heartbeat 1.5s ease-in-out infinite' }}
            data-testid="bambino-confirmation-icon"
          >
            <CheckCircle size={80} className="text-green-500" strokeWidth={2.5} />
          </div>
        </div>

        {/* Title */}
        <h1 className="text-5xl md:text-6xl font-bold text-gold text-center mb-3">
          {t.title}
        </h1>

        {/* Bambino Box pill */}
        <div className="flex justify-center mb-8">
          <span className="inline-flex items-center gap-2 bg-gold/10 border border-gold/30 text-gold px-4 py-1.5 rounded-full text-sm font-semibold uppercase tracking-wider">
            <Baby size={16} /> Bambino Box
          </span>
        </div>

        {/* Main Message */}
        <div className="bg-gradient-to-br from-gold/5 to-transparent border-2 border-gold/20 rounded-lg p-8 md:p-12 mb-8">
          <h2 className="text-2xl md:text-3xl font-bold text-white text-center mb-8">
            {t.subtitle}
          </h2>

          <div className="space-y-6 text-gray-300">
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
            data-testid="bambino-confirmation-back-btn"
          >
            {t.backButton}
          </Link>
        </div>

        {/* Additional Info */}
        <div className="mt-12 text-center">
          <p className="text-gray-400 text-sm max-w-3xl mx-auto">
            {t.extra}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Confirmation3;
