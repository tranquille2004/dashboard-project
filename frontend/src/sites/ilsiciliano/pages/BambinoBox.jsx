import React, { useRef, useState, useEffect } from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { useBasePath } from '../contexts/BasePathContext';
import { Link } from 'react-router-dom';
import { Pizza, IceCream, GlassWater, Palette, ChefHat, Gift, Cake, Sparkles, Phone, MessageCircle, Play, Pause } from 'lucide-react';

const _ = (es, en, it, fr) => ({ es, en, it, fr, nl: es, de: en });

const t = {
  badge: _('¡Para los más pequeños!', 'For the little ones!', 'Per i più piccoli!', 'Pour les plus petits !'),
  tagline: _(
    'Diversión, sabor y experiencia para los niños',
    'Fun, flavor and experience for kids',
    'Divertimento, sapore ed esperienza per i bambini',
    'Plaisir, saveur et expérience pour les enfants'
  ),
  intro: _(
    'En Il Siciliano también pensamos en los peques. Por eso creamos el Bambino Box: una experiencia completa que combina comida deliciosa, sorpresas y actividades para que los niños vivan una aventura italiana inolvidable.',
    "At Il Siciliano we think about the little ones too. That's why we created the Bambino Box: a complete experience combining delicious food, surprises and activities so kids enjoy an unforgettable Italian adventure.",
    'Da Il Siciliano pensiamo anche ai più piccoli. Per questo abbiamo creato il Bambino Box: un\'esperienza completa che unisce cibo delizioso, sorprese e attività per far vivere ai bambini un\'avventura italiana indimenticabile.',
    'Chez Il Siciliano nous pensons aussi aux plus petits. Nous avons créé la Bambino Box : une expérience complète qui combine bonne cuisine, surprises et activités pour que les enfants vivent une aventure italienne inoubliable.'
  ),
  includesTitle: _('¿Qué incluye el Bambino Box?', 'What\'s in the Bambino Box?', 'Cosa contiene il Bambino Box?', 'Que contient la Bambino Box ?'),
  items: [
    {
      icon: 'Pizza',
      title: _('Pizza o Pasta', 'Pizza or Pasta', 'Pizza o Pasta', 'Pizza ou Pâtes'),
      desc: _('Pizza margherita o pasta a elección del niño', 'Margherita pizza or pasta of the child\'s choice', 'Pizza margherita o pasta a scelta del bambino', 'Pizza margherita ou pâtes au choix de l\'enfant')
    },
    {
      icon: 'IceCream',
      title: _('Postre delicioso', 'Delicious dessert', 'Dolce delizioso', 'Délicieux dessert'),
      desc: _('Una dulce sorpresa al final del menú', 'A sweet surprise at the end of the menu', 'Una dolce sorpresa a fine pasto', 'Une douceur en fin de repas')
    },
    {
      icon: 'GlassWater',
      title: _('Bebida', 'Drink', 'Bevanda', 'Boisson'),
      desc: _('Jugo natural o refresco para los pequeños', 'Natural juice or soft drink for the little ones', 'Succo naturale o bibita per i piccoli', 'Jus naturel ou boisson pour les petits')
    },
    {
      icon: 'Palette',
      title: _('Kit de pintura', 'Coloring kit', 'Kit da colorare', 'Kit de coloriage'),
      desc: _('Páginas para pintar y colores mientras esperan', 'Coloring pages and crayons while they wait', 'Pagine da colorare e pastelli mentre aspettano', 'Coloriages et crayons pendant l\'attente')
    },
    {
      icon: 'ChefHat',
      title: _('¡Prepara tu pizza!', 'Make your own pizza!', 'Prepara la tua pizza!', 'Prépare ta pizza !'),
      desc: _('Los niños se ponen el delantal de chef y hacen su propia pizza', 'Kids put on a chef apron and make their very own pizza', 'I bambini indossano il grembiule da chef e preparano la loro pizza', 'Les enfants enfilent un tablier de chef et préparent leur propre pizza')
    },
    {
      icon: 'Gift',
      title: _('Sorpresa Bambino', 'Bambino surprise', 'Sorpresa Bambino', 'Surprise Bambino'),
      desc: _('Una bolsita souvenir para llevar a casa', 'A souvenir bag to take home', 'Un sacchetto souvenir da portare a casa', 'Un sac souvenir à emporter à la maison')
    }
  ],
  clubTitle: _('Club Bambino', 'Club Bambino', 'Club Bambino', 'Club Bambino'),
  clubSubtitle: _('Tarjeta de beneficios para los pequeños chefs', 'Loyalty card for little chefs', 'Tessera vantaggi per piccoli chef', 'Carte avantages pour petits chefs'),
  clubDesc: _(
    'Con tu tarjeta Club Bambino disfruta de descuentos especiales, sorpresas en cada visita y un regalo muy especial el día de tu cumpleaños. Pregunta por tu tarjeta personalizada en el restaurante.',
    'With your Club Bambino card enjoy special discounts, surprises on every visit and a very special gift on your birthday. Ask for your personal card at the restaurant.',
    'Con la tua tessera Club Bambino approfitta di sconti speciali, sorprese ad ogni visita e un regalo speciale il giorno del tuo compleanno. Chiedi la tua tessera personalizzata al ristorante.',
    'Avec votre carte Club Bambino, profitez de réductions spéciales, surprises à chaque visite et un cadeau très spécial le jour de votre anniversaire. Demandez votre carte personnalisée au restaurant.'
  ),
  benefits: [
    _('Descuentos exclusivos para socios', 'Member-only discounts', 'Sconti esclusivi per soci', 'Réductions exclusives membres'),
    _('Regalo especial de cumpleaños', 'Special birthday gift', 'Regalo speciale di compleanno', 'Cadeau spécial anniversaire'),
    _('Sorpresas en cada visita', 'Surprises on every visit', 'Sorprese ad ogni visita', 'Surprises à chaque visite'),
    _('Invitaciones a eventos para niños', 'Invites to kids events', 'Inviti a eventi per bambini', 'Invitations aux événements enfants')
  ],
  birthdayTitle: _('¡Celebra tu cumpleaños con nosotros!', 'Celebrate your birthday with us!', 'Festeggia il compleanno con noi!', 'Fête ton anniversaire avec nous !'),
  birthdayDesc: _(
    'Si eres parte del Club Bambino, podrás celebrar tu cumpleaños en Il Siciliano con un menú especial, sorpresas y mucha diversión para ti y tus amigos.',
    'If you\'re part of Club Bambino, you can celebrate your birthday at Il Siciliano with a special menu, surprises and lots of fun for you and your friends.',
    'Se fai parte del Club Bambino potrai festeggiare il tuo compleanno da Il Siciliano con un menu speciale, sorprese e tanto divertimento per te e i tuoi amici.',
    'Si tu fais partie du Club Bambino, tu pourras fêter ton anniversaire chez Il Siciliano avec un menu spécial, des surprises et beaucoup de fun pour toi et tes amis.'
  ),
  ctaTitle: _('¿Listos para una aventura italiana?', 'Ready for an Italian adventure?', 'Pronti per un\'avventura italiana?', 'Prêts pour une aventure italienne ?'),
  ctaDesc: _('Reserva tu mesa o llámanos para más información sobre el Bambino Box', 'Book your table or call us for more info about the Bambino Box', 'Prenota il tuo tavolo o chiamaci per maggiori info sul Bambino Box', 'Réservez votre table ou appelez-nous pour plus d\'infos sur la Bambino Box'),
  reserveBtn: _('Reservar mesa', 'Book a table', 'Prenota un tavolo', 'Réserver une table'),
  whatsappBtn: _('WhatsApp', 'WhatsApp', 'WhatsApp', 'WhatsApp'),
  callBtn: _('Llamar', 'Call', 'Chiama', 'Appeler'),
  videoTitle: _('Mira la experiencia Bambino Box', 'Watch the Bambino Box experience', 'Guarda l\'esperienza Bambino Box', 'Découvrez l\'expérience Bambino Box'),
};

const ICONS = { Pizza, IceCream, GlassWater, Palette, ChefHat, Gift };

const BambinoBox = () => {
  const { language } = useLanguage();
  const basePath = useBasePath();
  const videoRef = useRef(null);
  const introRef = useRef(null);
  const [playing, setPlaying] = useState(false);

  // Try to auto-play intro with sound; fall back to muted if browser blocks it
  useEffect(() => {
    const v = introRef.current;
    if (!v) return;
    v.muted = false;
    v.volume = 1;
    const tryPlay = async () => {
      try {
        await v.play();
      } catch (err) {
        // Browser blocked unmuted autoplay → start muted instead
        v.muted = true;
        try { await v.play(); } catch (e) {}
      }
    };
    tryPlay();
  }, []);

  const togglePlay = () => {
    if (!videoRef.current) return;
    if (videoRef.current.paused) {
      videoRef.current.play();
      setPlaying(true);
    } else {
      videoRef.current.pause();
      setPlaying(false);
    }
  };

  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;
    const onPlay = () => setPlaying(true);
    const onPause = () => setPlaying(false);
    v.addEventListener('play', onPlay);
    v.addEventListener('pause', onPause);
    return () => {
      v.removeEventListener('play', onPlay);
      v.removeEventListener('pause', onPause);
    };
  }, []);

  const whatsappText = encodeURIComponent(
    language === 'es' ? 'Hola, me gustaría más información sobre el Bambino Box'
      : language === 'it' ? 'Ciao, vorrei più informazioni sul Bambino Box'
      : language === 'fr' ? 'Bonjour, je voudrais plus d\'informations sur la Bambino Box'
      : 'Hello, I\'d like more info about the Bambino Box'
  );

  return (
    <div className="min-h-screen bg-black pt-24 pb-16">
      {/* HERO */}
      <section className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 mb-16">
        {/* Top: badge + logo + tagline (centered) */}
        <div className="text-center mb-10">
          <span className="inline-block px-4 py-1.5 rounded-full bg-gold/10 border border-gold/40 text-gold text-xs tracking-[0.3em] uppercase mb-6">
            {t.badge[language]}
          </span>
          <img
            src="/images/ilsiciliano/bambino/bambino-logo.png"
            alt="Bambino Box"
            className="w-full max-w-md mx-auto mb-6 drop-shadow-2xl"
            data-testid="bambino-hero-logo"
          />
          <h1 className="sr-only">Bambino Box - Il Siciliano</h1>
          <p className="text-xl md:text-2xl text-gold font-semibold">{t.tagline[language]}</p>
        </div>

        {/* INTRO VIDEO - full width, prominent, autoplay */}
        <div className="relative rounded-2xl overflow-hidden border-2 border-gold/40 shadow-[0_20px_50px_rgba(178,34,34,0.3)] bg-black mb-12">
          <video
            ref={introRef}
            src="/images/ilsiciliano/bambino/video/intro-emanuele.mp4"
            poster="/images/ilsiciliano/bambino/intro-poster.jpg?v=2"
            className="w-full h-auto block"
            playsInline
            autoPlay
            loop
            controls
            preload="auto"
            data-testid="bambino-intro-video"
          />
        </div>

        {/* Chef + Intro text - balanced 2-col below */}
        <div className="grid lg:grid-cols-[1fr_1.2fr] gap-8 lg:gap-12 items-center">
          {/* Chef illustration */}
          <div className="relative flex justify-center lg:justify-start">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-radial from-gold/20 via-transparent to-transparent blur-3xl" />
              <img
                src="/images/ilsiciliano/bambino/chef-bambino-1.png"
                alt="Chef Il Siciliano"
                className="relative w-full max-w-xs lg:max-w-sm drop-shadow-[0_20px_50px_rgba(0,0,0,0.6)]"
                data-testid="bambino-chef-img"
              />
            </div>
          </div>

          {/* Intro text + main bambino video preview */}
          <div className="space-y-6">
            <p className="text-gray-300 leading-relaxed text-base md:text-lg">{t.intro[language]}</p>
            <div className="relative rounded-2xl overflow-hidden border-2 border-gold/30 shadow-[0_15px_40px_rgba(178,34,34,0.2)] bg-black max-w-sm">
              <video
                ref={videoRef}
                src="/images/ilsiciliano/bambino/video/bambino-video.mp4"
                poster="/images/ilsiciliano/bambino/bambino-poster.jpg?v=2"
                className="w-full h-auto block"
                playsInline
                controls
                preload="metadata"
                data-testid="bambino-video"
              />
            </div>
          </div>
        </div>
      </section>

      {/* WHAT'S INCLUDED */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-20">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gold mb-3">{t.includesTitle[language]}</h2>
          <div className="w-20 h-1 bg-gold mx-auto" />
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {t.items.map((item, idx) => {
            const Icon = ICONS[item.icon];
            return (
              <div
                key={idx}
                className="bg-gradient-to-br from-gray-900 to-black p-6 rounded-2xl border border-gold/20 hover:border-gold/60 hover:-translate-y-1 transition-all duration-300 group"
                data-testid={`bambino-include-${idx}`}
              >
                <div className="w-14 h-14 rounded-xl bg-gold/10 border border-gold/30 flex items-center justify-center mb-4 group-hover:bg-gold/20 transition-colors">
                  <Icon size={26} className="text-gold" />
                </div>
                <h3 className="text-white font-semibold text-lg mb-2">{item.title[language]}</h3>
                <p className="text-gray-400 text-sm leading-relaxed">{item.desc[language]}</p>
              </div>
            );
          })}
        </div>
      </section>

      {/* CLUB BAMBINO */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-20">
        <div className="bg-gradient-to-br from-gray-900 via-black to-gray-900 rounded-3xl p-6 md:p-12 border border-gold/20 overflow-hidden relative">
          <div className="absolute -top-20 -right-20 w-72 h-72 bg-gold/10 rounded-full blur-3xl" />
          <div className="relative grid lg:grid-cols-2 gap-10 items-center">
            <div>
              <span className="inline-block px-4 py-1.5 rounded-full bg-italian-green/20 text-white text-xs tracking-[0.3em] uppercase mb-4" style={{background:'rgba(67,160,71,0.18)', color:'#A5D6A7'}}>
                <Cake size={14} className="inline -mt-0.5 mr-1.5" />
                {t.clubTitle[language]}
              </span>
              <h2 className="text-3xl md:text-4xl font-bold text-gold mb-2">{t.clubSubtitle[language]}</h2>
              <p className="text-gray-300 leading-relaxed mb-6">{t.clubDesc[language]}</p>
              <ul className="space-y-3">
                {t.benefits.map((b, idx) => (
                  <li key={idx} className="flex items-start gap-3 text-gray-200">
                    <Sparkles size={18} className="text-gold mt-0.5 flex-shrink-0" />
                    <span>{b[language]}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="flex justify-center">
              <img
                src="/images/ilsiciliano/bambino/club-bambino-card.png"
                alt="Club Bambino - Tarjeta de Beneficios"
                className="w-full max-w-lg rounded-2xl shadow-[0_25px_60px_rgba(0,0,0,0.6)]"
                data-testid="bambino-club-card"
              />
            </div>
          </div>
        </div>
      </section>

      {/* BIRTHDAY */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 mb-20">
        <div className="bg-gradient-to-br from-[#7F0F0F]/30 to-black p-8 md:p-12 rounded-2xl border border-gold/20 text-center">
          <Cake size={48} className="text-gold mx-auto mb-4" />
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-3">{t.birthdayTitle[language]}</h2>
          <p className="text-gray-300 max-w-2xl mx-auto">{t.birthdayDesc[language]}</p>
        </div>
      </section>

      {/* CTA */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <h2 className="text-2xl md:text-3xl font-bold text-gold mb-2">{t.ctaTitle[language]}</h2>
          <p className="text-gray-400">{t.ctaDesc[language]}</p>
        </div>
        <div className="flex flex-wrap items-center justify-center gap-3 md:gap-4">
          <Link
            to={`${basePath}/reserve`}
            className="inline-flex items-center gap-2 px-7 py-3.5 bg-gold text-black font-bold rounded-lg hover:bg-gold/90 transition-all shadow-lg"
            data-testid="bambino-cta-reserve"
          >
            <Pizza size={18} /> {t.reserveBtn[language]}
          </Link>
          <a
            href={`https://wa.me/593984110781?text=${whatsappText}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-7 py-3.5 bg-[#25D366] text-white font-bold rounded-lg hover:bg-[#1FB856] transition-all shadow-lg"
            data-testid="bambino-cta-whatsapp"
          >
            <MessageCircle size={18} /> {t.whatsappBtn[language]}
          </a>
          <a
            href="tel:+593984110781"
            className="inline-flex items-center gap-2 px-7 py-3.5 border-2 border-gold text-gold font-bold rounded-lg hover:bg-gold/10 transition-all"
            data-testid="bambino-cta-call"
          >
            <Phone size={18} /> {t.callBtn[language]}
          </a>
        </div>
      </section>
    </div>
  );
};

export default BambinoBox;
