import React, { useState, useEffect } from 'react';
import { MessageCircle, Clock, Laptop, Wallet, CheckCircle2, ArrowRight, MapPin, Languages, Sparkles, Heart, ChevronDown } from 'lucide-react';

/**
 * Chat Home Base — Online Werken pagina
 * Verborgen pagina onder fworksbuilders.com/onlinewerken
 * Eigen visuele identiteit binnen de fworks site.
 *
 * WhatsApp nummer is verborgen achter de knop (+32494516064).
 * JotForm placeholder klaar om embed-code in te plakken.
 */

const WHATSAPP_NUMBER = '32494516064'; // verborgen in CTA; nooit getoond

const OnlineWerken = () => {
  const [showFaq, setShowFaq] = useState(null);

  useEffect(() => {
    document.title = 'Chat Home Base — Werk vanuit huis als Chat Moderator';
    window.scrollTo(0, 0);
  }, []);

  const whatsappText = encodeURIComponent('Hallo, ik ben geïnteresseerd in de chat moderator job via Chat Home Base.');
  const whatsappHref = `https://wa.me/${WHATSAPP_NUMBER}?text=${whatsappText}`;

  const benefits = [
    { icon: Clock, title: 'Jij bepaalt je uren', desc: "Werk wanneer het in jouw agenda past — 's avonds, in het weekend of overdag. Geen vaste roosters." },
    { icon: MapPin, title: 'Werk waar je wilt', desc: 'Vanuit je woonkamer, vanaf een terras of zelfs onderweg. Zolang je internet hebt, ben je goed.' },
    { icon: Laptop, title: 'Heel weinig nodig', desc: 'Een laptop of computer, een stabiele wifi-verbinding en goede schrijfvaardigheid in het Nederlands.' },
    { icon: Wallet, title: 'Per bericht betaald', desc: 'Een eerlijk vast tarief per verstuurd bericht. Helder, transparant en zonder verborgen voorwaarden.' },
  ];

  const expectFromYou = [
    'Je bent minstens 18 jaar',
    'Je hebt oog voor detail en kwaliteit',
    'Je beheerst het Nederlands vlot, ook spreektaal en uitdrukkingen',
    'Je kunt flexibel uren inplannen',
    'Je beschikt over een werkende laptop of PC',
    'Je hebt een stabiele internetverbinding',
    'Je hebt een e-mailadres en een Zoom-account voor onze gesprekken',
    'Je staat open voor opbouwende feedback'
  ];

  const expectFromUs = [
    'Een van de hoogste vergoedingen in de sector',
    '24/7 inloggen — geen vaste shifts of strakke roosters',
    'Een snel en gebruiksvriendelijk werkplatform',
    'Elke week een duidelijke en gedetailleerde factuur',
    'Wekelijkse uitbetaling vanaf €25 verdiend',
    'Steeds meer berichten dankzij onze groei',
    'Open en eerlijke communicatie',
    'Persoonlijke feedback met praktische tips'
  ];

  const faqs = [
    { q: 'Heb ik ervaring nodig?', a: 'Nee, ervaring is geen vereiste. Belangrijker is dat je vlot kunt schrijven, creatief bent en zin hebt om mensen te boeien via tekst.' },
    { q: 'Hoeveel kan ik verdienen?', a: 'Dat hangt af van hoeveel berichten je per week verstuurt. Veel van onze actieve moderators halen een vergelijkbaar inkomen als een parttime job, sommigen zelfs voltijds.' },
    { q: 'Werk ik in loondienst?', a: 'Nee, je werkt als zelfstandig freelancer. Je beheert je eigen uren en factureert per week.' },
    { q: 'Hoe snel kan ik beginnen?', a: 'Na je aanmelding reageren wij binnen 48 uur. Vaak verstuur je binnen enkele dagen al je eerste berichten.' },
  ];

  return (
    <div className="chb-root min-h-screen text-gray-100">
      <style>{`
        .chb-root { background: #0a0e2e; font-family: 'Inter', system-ui, sans-serif; }
        .chb-gradient-text { background: linear-gradient(135deg, #ff45a8 0%, #4dbcff 50%, #ffd344 100%); -webkit-background-clip: text; background-clip: text; color: transparent; }
        .chb-glow { box-shadow: 0 20px 60px rgba(77, 188, 255, 0.25), 0 0 0 1px rgba(255,255,255,0.08); }
        .chb-card { background: linear-gradient(180deg, rgba(255,255,255,0.06) 0%, rgba(255,255,255,0.02) 100%); border: 1px solid rgba(255,255,255,0.08); backdrop-filter: blur(10px); }
        .chb-bg-decor { position: absolute; inset: 0; overflow: hidden; pointer-events: none; }
        .chb-blob { position: absolute; border-radius: 50%; filter: blur(80px); opacity: 0.4; }
        .chb-blob-pink { background: #ff45a8; width: 400px; height: 400px; top: -100px; right: -100px; }
        .chb-blob-blue { background: #4dbcff; width: 500px; height: 500px; top: 30%; left: -150px; }
        .chb-blob-yellow { background: #ffd344; width: 350px; height: 350px; bottom: 10%; right: -50px; opacity: 0.25; }
        .chb-dot-pink { background: #ff45a8; } .chb-dot-blue { background: #4dbcff; } .chb-dot-yellow { background: #ffd344; }
      `}</style>

      {/* Background decor */}
      <div className="chb-bg-decor">
        <div className="chb-blob chb-blob-pink"></div>
        <div className="chb-blob chb-blob-blue"></div>
        <div className="chb-blob chb-blob-yellow"></div>
      </div>

      <div className="relative z-10">
        {/* Top bar */}
        <header className="max-w-6xl mx-auto px-5 md:px-8 pt-6 md:pt-8 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img src="/images/fworks/chathomebase/chathomebase-logo.jpg" alt="Chat Home Base" className="w-12 h-12 rounded-xl object-cover shadow-lg" />
            <span className="text-lg md:text-xl font-bold text-white tracking-tight">Chat Home Base</span>
          </div>
          <a href="#solliciteer" className="hidden sm:inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 hover:bg-white/20 transition-all text-sm font-medium border border-white/15">
            Direct solliciteren <ArrowRight size={14} />
          </a>
        </header>

        {/* HERO */}
        <section className="max-w-6xl mx-auto px-5 md:px-8 pt-12 md:pt-20 pb-16 md:pb-24">
          <div className="grid lg:grid-cols-[1.3fr_1fr] gap-10 lg:gap-14 items-center">
            <div>
              <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 border border-white/15 text-xs font-medium tracking-wide mb-6">
                <span className="w-1.5 h-1.5 rounded-full chb-dot-pink"></span>
                <span className="w-1.5 h-1.5 rounded-full chb-dot-blue"></span>
                <span className="w-1.5 h-1.5 rounded-full chb-dot-yellow"></span>
                Online werken · Vanuit huis
              </span>
              <h1 className="text-4xl md:text-6xl font-bold leading-[1.05] tracking-tight mb-6">
                Verdien geld met <br />
                <span className="chb-gradient-text">jouw verbeelding</span> en <br />
                <span className="text-white">jouw woorden.</span>
              </h1>
              <p className="text-lg md:text-xl text-gray-300 leading-relaxed max-w-xl mb-8">
                Word chat moderator bij <strong className="text-white">Chat Home Base</strong> en bouw vanuit huis een stabiel weekinkomen op. Eerlijk betaald, geen vaste uren, en alles wat je nodig hebt is een laptop en een vlotte pen.
              </p>
              <div className="flex flex-wrap gap-3">
                <a href="#solliciteer" data-testid="hero-apply-btn" className="inline-flex items-center gap-2 px-7 py-4 rounded-full bg-white text-[#0a0e2e] font-bold text-base hover:scale-[1.02] hover:shadow-2xl transition-all">
                  Solliciteer nu <ArrowRight size={18} />
                </a>
                <a href={whatsappHref} target="_blank" rel="noopener noreferrer" data-testid="hero-whatsapp-btn" className="inline-flex items-center gap-2 px-7 py-4 rounded-full bg-[#25D366] text-white font-bold text-base hover:bg-[#1FB856] hover:scale-[1.02] transition-all shadow-lg">
                  <MessageCircle size={18} /> Stuur een berichtje
                </a>
              </div>
              <p className="text-sm text-gray-400 mt-5 flex items-center gap-2">
                <Sparkles size={14} className="text-[#ffd344]" /> Reactie binnen 48 uur · Snel aan de slag
              </p>
            </div>

            {/* Logo card */}
            <div className="relative">
              <div className="chb-card rounded-3xl p-10 chb-glow text-center">
                <img src="/images/fworks/chathomebase/chathomebase-logo.jpg" alt="Chat Home Base logo" className="w-full max-w-xs mx-auto rounded-2xl shadow-2xl" />
                <p className="mt-6 text-sm text-gray-300 leading-relaxed">
                  Wij brengen tekst tot leven. Onze moderators creëren gesprekken die mensen aan onze platformen binden — dag na dag.
                </p>
              </div>
              <div className="absolute -top-4 -right-4 w-20 h-20 rounded-full chb-dot-yellow opacity-80 blur-sm"></div>
            </div>
          </div>
        </section>

        {/* OVER DE JOB */}
        <section className="max-w-5xl mx-auto px-5 md:px-8 pb-20">
          <div className="text-center mb-10">
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-3">Zoek je een (bij)baan die <span className="chb-gradient-text">echt bij je past</span>?</h2>
            <p className="text-gray-300 max-w-2xl mx-auto">
              Wij zijn op zoek naar gemotiveerde, betrouwbare chat moderators met verbeelding en taalgevoel.
            </p>
          </div>

          <div className="chb-card rounded-3xl p-7 md:p-10 space-y-5 text-gray-200 leading-relaxed">
            <p>
              Als chat moderator ben jij <strong className="text-white">de stem achter levendige online community's</strong>. Je voert gesprekken via verschillende social platformen, brengt energie in de groepen en bouwt zo duurzame relaties op met leden.
            </p>
            <p>
              Een vlotte, fantasierijke ervaring bieden is wat onze opdrachtgevers verwachten. Jij houdt mensen geboeid, registreert wat belangrijk is, en zorgt ervoor dat klanten met een glimlach terugkomen.
            </p>
            <p className="text-white/90">
              Het mooie is: je werkt als <strong className="text-[#4dbcff]">zelfstandig freelancer</strong>. Wanneer en waar het jou uitkomt. Met je taalgevoel en verbeeldingskracht bouw je aan een stabiel weekinkomen.
            </p>
          </div>
        </section>

        {/* VOORDELEN GRID */}
        <section className="max-w-6xl mx-auto px-5 md:px-8 pb-20">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-10 tracking-tight">De voordelen op een rij</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {benefits.map((b, i) => {
              const Icon = b.icon;
              const accents = ['chb-dot-pink', 'chb-dot-blue', 'chb-dot-yellow', 'chb-dot-pink'];
              return (
                <div key={i} className="chb-card rounded-2xl p-6 hover:-translate-y-1 transition-transform duration-300 group">
                  <div className={`w-12 h-12 rounded-xl ${accents[i]} flex items-center justify-center mb-4 shadow-lg`}>
                    <Icon size={22} className="text-white" />
                  </div>
                  <h3 className="font-bold text-lg mb-2 text-white">{b.title}</h3>
                  <p className="text-sm text-gray-300 leading-relaxed">{b.desc}</p>
                </div>
              );
            })}
          </div>
        </section>

        {/* VERWACHTINGEN */}
        <section className="max-w-6xl mx-auto px-5 md:px-8 pb-20">
          <div className="grid md:grid-cols-2 gap-6">
            <div className="chb-card rounded-3xl p-7 md:p-9">
              <h3 className="text-xl md:text-2xl font-bold mb-5 flex items-center gap-3">
                <span className="w-8 h-8 rounded-lg chb-dot-pink flex items-center justify-center"><Heart size={16} className="text-white" /></span>
                Wat we van jou verwachten
              </h3>
              <ul className="space-y-3">
                {expectFromYou.map((item, i) => (
                  <li key={i} className="flex items-start gap-3 text-gray-200">
                    <CheckCircle2 size={18} className="text-[#ff45a8] mt-0.5 flex-shrink-0" />
                    <span className="text-sm md:text-base leading-relaxed">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="chb-card rounded-3xl p-7 md:p-9">
              <h3 className="text-xl md:text-2xl font-bold mb-5 flex items-center gap-3">
                <span className="w-8 h-8 rounded-lg chb-dot-blue flex items-center justify-center"><Sparkles size={16} className="text-white" /></span>
                Wat jij van ons mag verwachten
              </h3>
              <ul className="space-y-3">
                {expectFromUs.map((item, i) => (
                  <li key={i} className="flex items-start gap-3 text-gray-200">
                    <CheckCircle2 size={18} className="text-[#4dbcff] mt-0.5 flex-shrink-0" />
                    <span className="text-sm md:text-base leading-relaxed">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="max-w-3xl mx-auto px-5 md:px-8 pb-20">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-8 tracking-tight">Veelgestelde vragen</h2>
          <div className="space-y-3">
            {faqs.map((f, i) => (
              <button
                key={i}
                onClick={() => setShowFaq(showFaq === i ? null : i)}
                data-testid={`faq-${i}`}
                className="chb-card w-full text-left rounded-2xl p-5 hover:bg-white/10 transition-all"
              >
                <div className="flex items-center justify-between gap-4">
                  <span className="font-semibold text-white">{f.q}</span>
                  <ChevronDown size={18} className={`text-gray-400 flex-shrink-0 transition-transform ${showFaq === i ? 'rotate-180' : ''}`} />
                </div>
                {showFaq === i && (
                  <p className="text-gray-300 text-sm mt-3 leading-relaxed">{f.a}</p>
                )}
              </button>
            ))}
          </div>
        </section>

        {/* SOLLICITEER (JOTFORM PLACEHOLDER) */}
        <section id="solliciteer" className="max-w-4xl mx-auto px-5 md:px-8 pb-20">
          <div className="chb-card rounded-3xl p-7 md:p-12 chb-glow">
            <div className="text-center mb-8">
              <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 border border-white/15 text-xs font-medium tracking-wide mb-4">
                <Languages size={12} /> Aanmelden in 2 minuten
              </span>
              <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-3">Klaar om te beginnen?</h2>
              <p className="text-gray-300">Vul je gegevens in en wij nemen binnen 48 uur contact met je op.</p>
            </div>

            {/* JotForm container - vervang door embed code */}
            <div id="jotform-container" className="min-h-[380px] flex flex-col items-center justify-center text-center bg-white/5 rounded-2xl p-8 border border-dashed border-white/20">
              {/* TODO: Plak hier het JotForm iframe of script */}
              <MessageCircle size={36} className="text-[#4dbcff] mb-4" />
              <p className="text-white font-semibold text-lg mb-2">Sollicitatieformulier komt binnenkort online</p>
              <p className="text-gray-300 text-sm max-w-sm mb-6">Wil je nu al solliciteren? Stuur ons een berichtje via WhatsApp — we reageren snel.</p>
              <a
                href={whatsappHref}
                target="_blank"
                rel="noopener noreferrer"
                data-testid="cta-whatsapp-bottom"
                className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-[#25D366] hover:bg-[#1FB856] text-white font-bold transition-all shadow-lg hover:scale-[1.02]"
              >
                <MessageCircle size={18} /> WhatsApp ons direct
              </a>
            </div>
          </div>
        </section>

        {/* FOOTER */}
        <footer className="border-t border-white/10 mt-10">
          <div className="max-w-6xl mx-auto px-5 md:px-8 py-8 flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-gray-400">
            <div className="flex items-center gap-3">
              <img src="/images/fworks/chathomebase/chathomebase-logo.jpg" alt="" className="w-8 h-8 rounded-lg" />
              <span className="text-white font-semibold">Chat Home Base</span>
            </div>
            <p>© {new Date().getFullYear()} Chat Home Base · Werk vanuit huis</p>
            <a href="https://fworksbuilders.com" className="text-gray-500 hover:text-white transition-colors">Powered by fworksbuilders</a>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default OnlineWerken;
