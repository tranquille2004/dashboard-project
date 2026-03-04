import React from 'react';
import Hero from '../components/Hero';
import { Link } from 'react-router-dom';
import { Users, Wine } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { useBasePath } from '../context/BasePathContext';
import { allTranslations } from '../translations/allTranslations';

const GroupMenu = () => {
  const { currentLanguage } = useLanguage();
  const basePath = useBasePath();
  const t = allTranslations.groupMenu[currentLanguage] || allTranslations.groupMenu.nl;
  
  return (
    <div className="min-h-screen bg-[#2a2a2a]">
      <Hero
        title={t.title}
        subtitle={t.subtitle}
        image="/images/ascoli/gallery/img-5714_1_orig.jpg"
      />

      <section className="py-16 bg-[#2a2a2a]">
        <div className="container mx-auto px-4">
          <div className="max-w-7xl mx-auto">
            
            {/* Header */}
            <div className="text-center mb-12">
              <div className="w-24 h-1 bg-[#6b1f1f] mx-auto mb-8"></div>
              <Link
                to={`${basePath}/reservations`}
                className="inline-block bg-[#6b1f1f] text-white px-8 py-3 rounded-lg font-bold text-lg hover:bg-[#7d2424] transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 mb-4"
              >
                {t.reserveButton}
              </Link>
              <div className="mt-6">
                <a 
                  href="/groepmenus-ascoli.html" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 bg-[#6b1f1f] hover:bg-[#7d2424] text-white px-6 py-3 rounded-lg font-semibold transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                  {t.viewPDF}
                </a>
              </div>
            </div>

            {/* Group Info */}
            <div className="mb-12 bg-gradient-to-br from-[#6b1f1f]/10 to-[#a48f7a]/5 border-2 border-[#6b1f1f]/30 rounded-xl p-8">
              <div className="flex items-center justify-center gap-3 mb-6">
                <Users className="w-8 h-8 text-[#6b1f1f]" />
                <h3 className="text-2xl font-serif text-[#a48f7a]">{t.groupInfoTitle}</h3>
              </div>
              <div className="text-gray-300 text-center space-y-3">
                <p>{t.groupInfo1} <strong className="text-white">80 {t.persons}</strong>.</p>
                <p>{t.groupInfo2} <strong className="text-white">20 {t.persons}</strong>.</p>
                <p>{t.groupInfo3} <strong className="text-white">150 {t.persons}</strong> {t.ontvangen}.</p>
              </div>
            </div>

            {/* Menus Grid */}
            <div className="grid md:grid-cols-2 gap-8 mb-12">
              
              {/* MENU TORINO */}
              <div className="bg-gradient-to-br from-amber-600/20 to-amber-900/10 border-2 border-[#6b1f1f]/30 rounded-xl overflow-hidden shadow-2xl">
                <div className="bg-[#2a2a2a]/90 backdrop-blur-sm p-6 border-b border-[#6b1f1f]/20 text-center">
                  <h2 className="text-3xl font-bold text-[#a48f7a] mb-2">TORINO</h2>
                  <p className="text-4xl font-bold text-white">€47,50</p>
                </div>
                <div className="p-6 space-y-6">
                  <div>
                    <h3 className="text-lg text-[#a48f7a] mb-4 text-center">{t.aperitivo}</h3>
                    <div className="space-y-4">
                      <div className="text-center">
                        <p className="text-sm text-gray-300 leading-tight">
                          Italiaans antipasti buffet (Italiaanse fijne vleeswaren, mozzarella, gegrilde groenten van het seizoen)
                          <br/><span className="italic">Buffet d'antipasti italiens (charcuterie fine italienne, mozzarella, légumes grillés de saison)</span>
                          <br/>Italian antipasti buffet (Italian fine meats, mozzarella, grilled seasonal vegetables)
                        </p>
                        <div className="text-center text-white/60 text-xs my-3">
                          OF / OU / OR
                        </div>
                      </div>
                      <div className="text-center">
                        <p className="text-sm text-gray-300 leading-tight">
                          Vitello Tonnato
                        </p>
                        <div className="text-center text-white/60 text-xs my-3">
                          OF / OU / OR
                        </div>
                      </div>
                      <div className="text-center">
                        <p className="text-sm text-gray-300 leading-tight">
                          Penne met aubergines, mozzarella en tomaat
                          <br/><span className="italic">Penne aux aubergines, mozzarella et tomate</span>
                          <br/>Penne with eggplant, mozzarella and tomato
                        </p>
                      </div>
                    </div>
                    <div className="text-center text-white/60 text-lg my-4">--o--</div>
                  </div>
                  
                  <div>
                    <div className="space-y-4">
                      <div className="text-center">
                        <p className="text-sm text-gray-300 leading-tight">
                          Emincé van kalkoen met citroen et italiaanse kruiden, geserveerd met groenten of verse pasta
                          <br/><span className="italic">Emincé de dinde au citron et herbes italiennes, servi avec légumes ou pâtes fraîches</span>
                          <br/>Turkey strips with lemon and Italian herbs, served with vegetables or fresh pasta
                        </p>
                        <div className="text-center text-white/60 text-xs my-3">
                          OF / OU / OR
                        </div>
                      </div>
                      <div className="text-center">
                        <p className="text-sm text-gray-300 leading-tight">
                          Escalope van zalm, gebakken met grof zout, saus van spumante, geserveerd met een purée van spinazie en kleine peertjes
                          <br/><span className="italic">Escalope de saumon, cuit au gros sel, sauce au spumante, servi avec une purée d'épinards et petites poires</span>
                          <br/>Salmon escalope, baked with coarse salt, spumante sauce, served with spinach purée and small pears
                        </p>
                        <div className="text-center text-white/60 text-xs my-3">
                          OF / OU / OR
                        </div>
                      </div>
                      <div className="text-center">
                        <p className="text-sm text-gray-300 leading-tight">
                          Rode poonfilet op Libournaise wijze
                          <br/><span className="italic">Filet de poon rouge à la Libournaise</span>
                          <br/>Red gurnard fillet Libournaise style
                        </p>
                      </div>
                    </div>
                    <div className="text-center text-white/60 text-lg my-4">--o--</div>
                  </div>

                  <div>
                    <div className="space-y-3">
                      <div className="text-center">
                        <p className="text-sm text-gray-300 leading-tight">
                          Italiaanse pâtisserie
                          <br/><span className="italic">Pâtisserie italienne</span>
                          <br/>Italian pastries
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="pt-6 border-t border-[#6b1f1f]/20">
                    <p className="text-xs text-gray-400 italic text-center flex items-center justify-center gap-2">
                      <Wine className="w-4 h-4 text-[#a48f7a] flex-shrink-0" />
                      <span>{t.included}</span>
                    </p>
                  </div>
                </div>
              </div>

              {/* MENU PUGLIA */}
              <div className="bg-gradient-to-br from-green-600/20 to-green-900/10 border-2 border-[#6b1f1f]/30 rounded-xl overflow-hidden shadow-2xl">
                <div className="bg-[#2a2a2a]/90 backdrop-blur-sm p-6 border-b border-[#6b1f1f]/20 text-center">
                  <h2 className="text-3xl font-bold text-[#a48f7a] mb-2">PUGLIA</h2>
                  <p className="text-4xl font-bold text-white">€52,50</p>
                </div>
                <div className="p-6 space-y-6">
                  <div>
                    <h3 className="text-lg text-[#a48f7a] mb-4 text-center">{t.aperitivo}</h3>
                    <div className="space-y-4">
                      <div className="text-center">
                        <p className="text-sm text-gray-300 leading-tight">
                          Burrata op een bedje van biologische tomaat, vièrge olijfolie, basilicum en oregano
                          <br/><span className="italic">Burrata sur un lit de tomate bio, huile d'olive vierge, basilic et origan</span>
                          <br/>Burrata on a bed of organic tomato, virgin olive oil, basil and oregano
                        </p>
                        <div className="text-center text-white/60 text-xs my-3">
                          OF / OU / OR
                        </div>
                      </div>
                      <div className="text-center">
                        <p className="text-sm text-gray-300 leading-tight">
                          Salade van verse zeevruchten, hart van selderij, peterselie en zacht look
                          <br/><span className="italic">Salade de fruits de mer frais, cœur de céleri, persil et ail doux</span>
                          <br/>Fresh seafood salad, celery heart, parsley and soft garlic
                        </p>
                        <div className="text-center text-white/60 text-xs my-3">
                          OF / OU / OR
                        </div>
                      </div>
                      <div className="text-center">
                        <p className="text-sm text-gray-300 leading-tight">
                          Ravioli gevuld met rivierkreeftjes en wilde paddenstoelen in hun saus
                          <br/><span className="italic">Raviolis farcis aux écrevisses et champignons sauvages dans leur sauce</span>
                          <br/>Ravioli stuffed with crayfish and wild mushrooms in their sauce
                        </p>
                      </div>
                    </div>
                    <div className="text-center text-white/60 text-lg my-4">--o--</div>
                  </div>
                  
                  <div>
                    <div className="space-y-4">
                      <div className="text-center">
                        <p className="text-sm text-gray-300 leading-tight">
                          Tagliata: emincé van Ierse contre-filet, geserveerd op een bedje van groenten, raketsla, schaafsels van parmezaan, balsamico azijn en olijfolie
                          <br/><span className="italic">Tagliata: émincé de contre-filet irlandais, servi sur un lit de légumes, roquette, copeaux de parmesan, vinaigre balsamique et huile d'olive</span>
                          <br/>Tagliata: Irish sirloin strips, served on a bed of vegetables, arugula, parmesan shavings, balsamic vinegar and olive oil
                        </p>
                        <div className="text-center text-white/60 text-xs my-3">
                          OF / OU / OR
                        </div>
                      </div>
                      <div className="text-center">
                        <p className="text-sm text-gray-300 leading-tight">
                          Magret van eend, Marsala saus, geserveerd met een Trevise salade, appelsien, pijnboompitten en basilicum, gratin van witte selderij en zwarte olijven
                          <br/><span className="italic">Magret de canard, sauce Marsala, servi avec une salade de Trévise, orange, pignons de pin et basilic, gratin de céleri blanc et olives noires</span>
                          <br/>Duck breast, Marsala sauce, served with Treviso salad, orange, pine nuts and basil, white celery and black olive gratin
                        </p>
                        <div className="text-center text-white/60 text-xs my-3">
                          OF / OU / OR
                        </div>
                      </div>
                      <div className="text-center">
                        <p className="text-sm text-gray-300 leading-tight">
                          Filet van brasem aqua pazza met groenten en gestoomde aardappelen, specialiteit van de amalfikust
                          <br/><span className="italic">Filet de dorade aqua pazza avec légumes et pommes de terre vapeur, spécialité de la côte amalfitaine</span>
                          <br/>Sea bream fillet aqua pazza with vegetables and steamed potatoes, Amalfi coast specialty
                        </p>
                      </div>
                    </div>
                    <div className="text-center text-white/60 text-lg my-4">--o--</div>
                  </div>

                  <div>
                    <div className="space-y-3">
                      <div className="text-center">
                        <p className="text-sm text-gray-300 leading-tight">
                          Profiteroles met warme chocolade
                          <br/><span className="italic">Profiteroles au chocolat chaud</span>
                          <br/>Profiteroles with hot chocolate
                        </p>
                        <div className="text-center text-white/60 text-xs my-3">
                          OF / OU / OR
                        </div>
                      </div>
                      <div className="text-center">
                        <p className="text-sm text-gray-300 leading-tight">
                          Affogato: vanille ijs met kersen en amaretto
                          <br/><span className="italic">Affogato: glace vanille aux cerises et amaretto</span>
                          <br/>Affogato: vanilla ice cream with cherries and amaretto
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="pt-6 border-t border-[#6b1f1f]/20">
                    <p className="text-xs text-gray-400 italic text-center flex items-center justify-center gap-2">
                      <Wine className="w-4 h-4 text-[#a48f7a] flex-shrink-0" />
                      <span>{t.included}</span>
                    </p>
                  </div>
                </div>
              </div>

              {/* MENU AMALFI */}
              <div className="bg-gradient-to-br from-red-600/20 to-red-900/10 border-2 border-[#6b1f1f]/30 rounded-xl overflow-hidden shadow-2xl">
                <div className="bg-[#2a2a2a]/90 backdrop-blur-sm p-6 border-b border-[#6b1f1f]/20 text-center">
                  <h2 className="text-3xl font-bold text-[#a48f7a] mb-2">AMALFI</h2>
                  <p className="text-4xl font-bold text-white">€57,50</p>
                </div>
                <div className="p-6 space-y-6">
                  <div>
                    <h3 className="text-lg text-[#a48f7a] mb-4 text-center">{t.aperitivo}</h3>
                    <div className="space-y-4">
                      <div className="text-center">
                        <p className="text-sm text-gray-300 leading-tight">
                          Risotto met paddenstoelen
                          <br/><span className="italic">Risotto aux champignons</span>
                          <br/>Risotto with mushrooms
                        </p>
                        <div className="text-center text-white/60 text-xs my-3">
                          OF / OU / OR
                        </div>
                      </div>
                      <div className="text-center">
                        <p className="text-sm text-gray-300 leading-tight">
                          Paccheri met baarsfilet, kerstomaatjes en oregano
                          <br/><span className="italic">Paccheri au filet de bar, tomates cerises et origan</span>
                          <br/>Paccheri with sea bass fillet, cherry tomatoes and oregano
                        </p>
                        <div className="text-center text-white/60 text-xs my-3">
                          OF / OU / OR
                        </div>
                      </div>
                      <div className="text-center">
                        <p className="text-sm text-gray-300 leading-tight">
                          Integrale tagliatelle met pancetta en doperwtjes
                          <br/><span className="italic">Tagliatelle intégrales à la pancetta et petits pois</span>
                          <br/>Wholegrain tagliatelle with pancetta and peas
                        </p>
                      </div>
                    </div>
                    <div className="text-center text-white/60 text-lg my-4">--o--</div>
                  </div>
                  
                  <div>
                    <div className="space-y-4">
                      <div className="text-center">
                        <p className="text-sm text-gray-300 leading-tight">
                          Ballotine van konijn gevuld met ganzenlever en bergspek, rode wijnsaus uit de Piemont, geserveerd met gecarameliseerde appels en groenten
                          <br/><span className="italic">Ballotine de lapin farcie au foie gras et lard de montagne, sauce au vin rouge du Piémont, servie avec pommes caramélisées et légumes</span>
                          <br/>Rabbit ballotine stuffed with foie gras and mountain bacon, Piedmont red wine sauce, served with caramelized apples and vegetables
                        </p>
                        <div className="text-center text-white/60 text-xs my-3">
                          OF / OU / OR
                        </div>
                      </div>
                      <div className="text-center">
                        <p className="text-sm text-gray-300 leading-tight">
                          Noisette van lam met thijm en citroen, gratin van witte selderij en artisjok
                          <br/><span className="italic">Noisette d'agneau au thym et citron, gratin de céleri blanc et artichaut</span>
                          <br/>Lamb noisette with thyme and lemon, white celery and artichoke gratin
                        </p>
                        <div className="text-center text-white/60 text-xs my-3">
                          OF / OU / OR
                        </div>
                      </div>
                      <div className="text-center">
                        <p className="text-sm text-gray-300 leading-tight">
                          Baarsfilet de ligne met rozemarijn en citroen, olijfolie en salie, geserveerd met groenten
                          <br/><span className="italic">Filet de bar de ligne au romarin et citron, huile d'olive et sauge, servi avec légumes</span>
                          <br/>Line-caught sea bass fillet with rosemary and lemon, olive oil and sage, served with vegetables
                        </p>
                      </div>
                    </div>
                    <div className="text-center text-white/60 text-lg my-4">--o--</div>
                  </div>

                  <div>
                    <div className="space-y-3">
                      <div className="text-center">
                        <p className="text-sm text-gray-300 leading-tight">
                          Ricotta taart met citroen
                          <br/><span className="italic">Tarte à la ricotta et citron</span>
                          <br/>Ricotta and lemon tart
                        </p>
                        <div className="text-center text-white/60 text-xs my-3">
                          OF / OU / OR
                        </div>
                      </div>
                      <div className="text-center">
                        <p className="text-sm text-gray-300 leading-tight">
                          Mix van sorbet ijs
                          <br/><span className="italic">Mélange de sorbets</span>
                          <br/>Mix of sorbet ice creams
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="pt-6 border-t border-[#6b1f1f]/20">
                    <p className="text-xs text-gray-400 italic text-center flex items-center justify-center gap-2">
                      <Wine className="w-4 h-4 text-[#a48f7a] flex-shrink-0" />
                      <span>{t.included}</span>
                    </p>
                  </div>
                </div>
              </div>

              {/* MENU ASCOLI */}
              <div className="bg-gradient-to-br from-blue-600/20 to-blue-900/10 border-2 border-[#6b1f1f]/30 rounded-xl overflow-hidden shadow-2xl">
                <div className="bg-[#2a2a2a]/90 backdrop-blur-sm p-6 border-b border-[#6b1f1f]/20 text-center">
                  <h2 className="text-3xl font-bold text-[#a48f7a] mb-2">ASCOLI</h2>
                  <p className="text-4xl font-bold text-white">€67,50</p>
                </div>
                <div className="p-6 space-y-6">
                  <div>
                    <h3 className="text-lg text-[#a48f7a] mb-4 text-center">{t.aperitivo}</h3>
                    <div className="space-y-4">
                      <div className="text-center">
                        <p className="text-sm text-gray-300 leading-tight">
                          Slaatje van ganzenlever, geserveerd op een bedje van venkel, groene bonen, olijfolie, balsamico azijn en verse amandelmelk
                          <br/><span className="italic">Salade de foie gras, servie sur un lit de fenouil, haricots verts, huile d'olive, vinaigre balsamique et lait d'amande frais</span>
                          <br/>Foie gras salad, served on a bed of fennel, green beans, olive oil, balsamic vinegar and fresh almond milk
                        </p>
                        <div className="text-center text-white/60 text-xs my-3">
                          OF / OU / OR
                        </div>
                      </div>
                      <div className="text-center">
                        <p className="text-sm text-gray-300 leading-tight">
                          Gefrituurde scampi met tartaarsaus, geserveerd met gepaneerde stokjes van courgette en citroen
                          <br/><span className="italic">Scampi frits sauce tartare, servis avec bâtonnets panés de courgette et citron</span>
                          <br/>Fried scampi with tartar sauce, served with breaded zucchini sticks and lemon
                        </p>
                        <div className="text-center text-white/60 text-xs my-3">
                          OF / OU / OR
                        </div>
                      </div>
                      <div className="text-center">
                        <p className="text-sm text-gray-300 leading-tight">
                          Tartaar van verse zalm, sint jakobs, groene appel, pijnboompitten, en gember
                          <br/><span className="italic">Tartare de saumon frais, saint-jacques, pomme verte, pignons de pin et gingembre</span>
                          <br/>Fresh salmon tartare, scallops, green apple, pine nuts and ginger
                        </p>
                      </div>
                    </div>
                    <div className="text-center text-white/60 text-lg my-4">--o--</div>
                  </div>
                  
                  <div>
                    <div className="space-y-4">
                      <div className="text-center">
                        <p className="text-sm text-gray-300 leading-tight">
                          Kabeljauwfilet livornese met seizoensgroenten, kappertjes, olijven, sjalot, zacht look en oregano
                          <br/><span className="italic">Filet de cabillaud livornese avec légumes de saison, câpres, olives, échalote, ail doux et origan</span>
                          <br/>Cod fillet livornese with seasonal vegetables, capers, olives, shallot, soft garlic and oregano
                        </p>
                        <div className="text-center text-white/60 text-xs my-3">
                          OF / OU / OR
                        </div>
                      </div>
                      <div className="text-center">
                        <p className="text-sm text-gray-300 leading-tight">
                          Saltimbocca alla Romana
                        </p>
                        <div className="text-center text-white/60 text-xs my-3">
                          OF / OU / OR
                        </div>
                      </div>
                      <div className="text-center">
                        <p className="text-sm text-gray-300 leading-tight">
                          Filet van varken op wijze van Maremma met regionale kruiden en kastanjehoning, geserveerd met een purée van zoete aardappel en biet
                          <br/><span className="italic">Filet de porc façon Maremme aux herbes régionales et miel de châtaigne, servi avec une purée de patate douce et betterave</span>
                          <br/>Pork fillet Maremma style with regional herbs and chestnut honey, served with sweet potato and beetroot purée
                        </p>
                      </div>
                    </div>
                    <div className="text-center text-white/60 text-lg my-4">--o--</div>
                  </div>

                  <div>
                    <div className="space-y-3">
                      <div className="text-center">
                        <p className="text-sm text-gray-300 leading-tight">
                          Fruitsalade
                          <br/><span className="italic">Salade de fruits</span>
                          <br/>Fruit salad
                        </p>
                        <div className="text-center text-white/60 text-xs my-3">
                          OF / OU / OR
                        </div>
                      </div>
                      <div className="text-center">
                        <p className="text-sm text-gray-300 leading-tight">
                          Panna cotta
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="pt-6 border-t border-[#6b1f1f]/20">
                    <p className="text-xs text-gray-400 italic text-center flex items-center justify-center gap-2">
                      <Wine className="w-4 h-4 text-[#a48f7a] flex-shrink-0" />
                      <span>{t.included}</span>
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Bottom CTA */}
            <div className="text-center">
              <Link
                to={`${basePath}/reservations`}
                className="inline-block bg-[#6b1f1f] text-white px-12 py-4 rounded-lg font-bold text-xl hover:bg-[#7d2424] transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
              >
                {t.reserveButton}
              </Link>
              <p className="mt-4 text-gray-400 text-sm">
                {t.menuFrom}
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default GroupMenu;
