import React from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../contexts/LanguageContext';
import { CheckCircle } from 'lucide-react';

const Confirmation = () => {
  const { language } = useLanguage();

  const content = {
    nl: {
      title: 'Grazie!',
      subtitle: 'Bedankt, uw reservatie is bevestigd!',
      message1: 'WIJ KONTAKTEREN U NIET, tenzij wij bijkomende vragen hebben of vol zijn.',
      message2: 'Om dubbele reservaties te vermijden, aub BEL ONS NIET voor deze aanvraag!',
      message3: 'Wij bekijken onze email de gehele dag dus uw aanvraag is genoteerd.',
      backButton: 'Klik hier om terug te gaan naar de site'
    },
    fr: {
      title: 'Grazie!',
      subtitle: 'Merci, votre réservation est confirmée!',
      message1: 'NOUS NE VOUS RECONTACTONS PAS, sauf en cas de questions supplémentaires ou en cas ou nous sommes complet.',
      message2: 'Pour éviter des réservations en double, s\'il vous plaît NE TELEPHONEZ PAS pour cette réservation!',
      message3: 'Nous vérifions les réservations par email toute la journée donc votre demande est bien notée.',
      backButton: 'Cliquez ici pour retourner au site'
    },
    en: {
      title: 'Grazie!',
      subtitle: 'Thank you, your reservation is confirmed!',
      message1: 'WE WILL NOT CONTACT YOU, unless we have additional questions or are fully booked.',
      message2: 'To avoid double reservations, please DO NOT CALL for this request!',
      message3: 'We check our email all day so your request has been noted.',
      backButton: 'Click here to return to the site'
    },
    es: {
      title: 'Grazie!',
      subtitle: '¡Gracias, su reserva está confirmada!',
      message1: 'NO LE CONTACTAREMOS, a menos que tengamos preguntas adicionales o estemos completos.',
      message2: '¡Para evitar reservas dobles, por favor NO LLAME para esta solicitud!',
      message3: 'Revisamos nuestro correo electrónico todo el día, por lo que su solicitud ha sido registrada.',
      backButton: 'Haga clic aquí para volver al sitio'
    },
    de: {
      title: 'Grazie!',
      subtitle: 'Vielen Dank, Ihre Reservierung ist bestätigt!',
      message1: 'WIR WERDEN SIE NICHT KONTAKTIEREN, es sei denn, wir haben zusätzliche Fragen oder sind ausgebucht.',
      message2: 'Um Doppelreservierungen zu vermeiden, rufen Sie bitte NICHT für diese Anfrage an!',
      message3: 'Wir überprüfen unsere E-Mails den ganzen Tag, daher wurde Ihre Anfrage notiert.',
      backButton: 'Klicken Sie hier, um zur Website zurückzukehren'
    },
    it: {
      title: 'Grazie!',
      subtitle: 'Grazie, la tua prenotazione è confermata!',
      message1: 'NON TI CONTATTEREMO, a meno che non abbiamo domande aggiuntive o siamo al completo.',
      message2: 'Per evitare doppie prenotazioni, per favore NON CHIAMARE per questa richiesta!',
      message3: 'Controlliamo la nostra email tutto il giorno quindi la tua richiesta è stata registrata.',
      backButton: 'Clicca qui per tornare al sito'
    }
  };

  const t = content[language] || content.nl;

  return (
    <div className="min-h-screen bg-black pt-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Success Icon */}
        <div className="flex justify-center mb-8">
          <div className="bg-gold/10 p-6 rounded-full">
            <CheckCircle size={80} className="text-gold" />
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
              <span className="font-bold text-gold">✓</span> {t.message1}
            </p>
            
            <p className="text-lg md:text-xl leading-relaxed">
              <span className="font-bold text-gold">✓</span> {t.message2}
            </p>
            
            <p className="text-lg md:text-xl leading-relaxed">
              <span className="font-bold text-gold">✓</span> {t.message3}
            </p>
          </div>
        </div>

        {/* Back to Home Button */}
        <div className="text-center">
          <Link
            to="/"
            className="inline-block bg-gold text-black px-8 py-4 rounded-lg font-bold text-lg hover:bg-gold/90 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
          >
            {t.backButton}
          </Link>
        </div>

        {/* Additional Info */}
        <div className="mt-12 text-center">
          <p className="text-gray-400 text-sm max-w-3xl mx-auto">
            {language === 'nl' && 'U ontvangt een automatische bevestigingsmail. Indien u een reservatie voor 15 personen of meer doorstuurde, kontakteren wij u persoonlijk binnen de 12 uur.'}
            {language === 'fr' && 'Vous recevrez un email de confirmation automatique. Si vous avez fait une réservation pour 15 personnes ou plus, nous vous contacterons personnellement dans les 12 heures.'}
            {language === 'en' && 'You will receive an automatic confirmation email. If you submitted a reservation for 15 people or more, we will contact you personally within 12 hours.'}
            {language === 'es' && 'Recibirá un correo electrónico de confirmación automático. Si realizó una reserva para 15 personas o más, nos pondremos en contacto con usted personalmente en un plazo de 12 horas.'}
            {language === 'de' && 'Sie erhalten eine automatische Bestätigungs-E-Mail. Wenn Sie eine Reservierung für 15 Personen oder mehr vorgenommen haben, werden wir Sie innerhalb von 12 Stunden persönlich kontaktieren.'}
            {language === 'it' && 'Riceverai un\'email di conferma automatica. Se hai effettuato una prenotazione per 15 persone o più, ti contatteremo personalmente entro 12 ore.'}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Confirmation;
