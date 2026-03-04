import React from 'react';
import Hero from '../components/Hero';
import { Link } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import { useBasePath } from '../context/BasePathContext';
import { allTranslations } from '../translations/allTranslations';

const Menu = () => {
  const { currentLanguage } = useLanguage();
  const basePath = useBasePath();
  const t = allTranslations.menu[currentLanguage] || allTranslations.menu.nl;

  return (
    <div className="min-h-screen bg-[#2a2a2a]">
      <Hero
        title={t.title}
        subtitle={t.subtitle}
        image="/images/ascoli/gallery/img-5788_orig.jpg"
      />

      <section className="py-16 bg-gradient-to-b from-[#f2f1d5] to-[#e8e6c8]">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            
            {/* Cold Appetizers */}
            <div className="mb-16">
              <h2 className="text-3xl md:text-4xl font-serif text-[#6b1f1f] mb-8 text-left border-b-2 border-[#6b1f1f] pb-4">
                {t.coldAppetizers}
              </h2>
              <div className="space-y-6">
                <div className="bg-white/60 p-6 rounded-sm">
                  <h3 className="text-gray-900 mb-2 leading-tight">
                    Burrata van buffel met tomaten en basilicum in olijfolie
                    <br/><span className="italic">Burrata de buffle aux tomates et basilic à l'huile d'olive</span>
                    <br/>Buffalo burrata with tomatoes and basil in olive oil
                  </h3>
                  <p className="text-[#6b1f1f] font-semibold">€ 22,00</p>
                </div>

                <div className="bg-white/60 p-6 rounded-sm">
                  <h3 className="text-gray-900 mb-2 leading-tight">
                    Rundercarpaccio gemarineerd in olijfolie en citroen, met parmezaanschilfers (allergeen 8)
                    <br/><span className="italic">Carpaccio de boeuf mariné à l'huile d'olive et citron, avec copeaux de parmesan (allergène 8)</span>
                    <br/>Beef carpaccio marinated in olive oil and lemon, with parmesan shavings (allergen 8)
                  </h3>
                  <p className="text-[#6b1f1f] font-semibold">€ 21,50</p>
                </div>

                <div className="bg-white/60 p-6 rounded-sm">
                  <h3 className="text-gray-900 mb-2 leading-tight">
                    Bresaola gemarineerd in olijfolie en citroen, met parmezaanschilfers (allergeen 8)
                    <br/><span className="italic">Bresaola marinée à l'huile d'olive et citron, avec copeaux de parmesan (allergène 8)</span>
                    <br/>Bresaola marinated in olive oil and lemon, with parmesan shavings (allergen 8)
                  </h3>
                  <p className="text-[#6b1f1f] font-semibold">€ 24,50</p>
                </div>

                <div className="bg-white/60 p-6 rounded-sm">
                  <h3 className="text-gray-900 mb-2 leading-tight">
                    Salade van inktvis (allergeen 3,10)
                    <br/><span className="italic">Salade de calamar (allergène 3,10)</span>
                    <br/>Squid salad (allergen 3,10)
                  </h3>
                  <p className="text-[#6b1f1f] font-semibold">€ 24,50</p>
                </div>

                <div className="bg-white/60 p-6 rounded-sm">
                  <h3 className="text-gray-900 mb-2 leading-tight">
                    Parmaham met meloen (allergeen 3,10)
                    <br/><span className="italic">Jambon de Parme au melon (allergène 3,10)</span>
                    <br/>Parma ham with melon (allergen 3,10)
                  </h3>
                  <p className="text-[#6b1f1f] font-semibold">€ 23,50</p>
                </div>

                <div className="bg-white/60 p-6 rounded-sm">
                  <h3 className="text-gray-900 mb-2 leading-tight">
                    Gegratineerde aubergines op grootmoeders wijze (allergeen 3,10)
                    <br/><span className="italic">Aubergines gratinées de la nonna (allergène 3,10)</span>
                    <br/>Grandmother's eggplant (allergen 3,10)
                  </h3>
                  <p className="text-[#6b1f1f] font-semibold">€ 21,50</p>
                </div>

                <div className="bg-white/60 p-6 rounded-sm">
                  <h3 className="text-gray-900 mb-2 leading-tight">
                    Vitello tonnato; Kalfslapje, crème van tonijn, ansjovis, mayonnaise, kappertjes (allergeen 2,3,9,10,11)
                    <br/><span className="italic">Vitello tonnato; Escalope de veau, crème de thon, anchois, mayonnaise, câpres (allergène 2,3,9,10,11)</span>
                    <br/>Vitello tonnato; Veal escalope, tuna cream, anchovies, mayonnaise, capers (allergen 2,3,9,10,11)
                  </h3>
                  <p className="text-[#6b1f1f] font-semibold">€ 24,50</p>
                </div>

                <div className="bg-white/60 p-6 rounded-sm">
                  <h3 className="text-gray-900 mb-2 leading-tight">
                    Bordje antipasti (allergeen 4,6,8)
                    <br/><span className="italic">Assiette d'antipasti (allergène 4,6,8)</span>
                    <br/>Antipasti plate (allergen 4,6,8)
                  </h3>
                  <p className="text-[#6b1f1f] font-semibold">€ 23,50</p>
                </div>

                <div className="bg-white/60 p-6 rounded-sm">
                  <h3 className="text-gray-900 mb-2 leading-tight">
                    Verse gemarineerde zalm (allergeen 3,10)
                    <br/><span className="italic">Saumon frais mariné (allergène 3,10)</span>
                    <br/>Fresh marinated salmon (allergen 3,10)
                  </h3>
                  <p className="text-[#6b1f1f] font-semibold">€ 24,50</p>
                </div>
              </div>
            </div>

            {/* Soups */}
            <div className="mb-16">
              <h2 className="text-3xl md:text-4xl font-serif text-[#6b1f1f] mb-8 text-left border-b-2 border-[#6b1f1f] pb-4">
                {t.soups}
              </h2>
              <div className="space-y-6">
                <div className="bg-white/60 p-6 rounded-sm">
                  <h3 className="text-gray-900 mb-2 leading-tight">
                    Minestrone, soep van verse groenten uit de tuin
                    <br/><span className="italic">Minestrone, soupe de légumes frais du jardin</span>
                    <br/>Minestrone, fresh garden vegetable soup
                  </h3>
                  <p className="text-[#6b1f1f] font-semibold">€ 12,50</p>
                </div>

                <div className="bg-white/60 p-6 rounded-sm">
                  <h3 className="text-gray-900 mb-2 leading-tight">
                    Tomatenroomsoep met zachte look en basilicum
                    <br/><span className="italic">Soupe crémeuse de tomate à l'ail doux et basilic</span>
                    <br/>Creamy tomato soup with soft garlic and basil
                  </h3>
                  <p className="text-[#6b1f1f] font-semibold">€ 12,50</p>
                </div>

                <div className="bg-white/60 p-6 rounded-sm">
                  <h3 className="text-gray-900 mb-2 leading-tight">
                    Heldere soep van eend, tortellini geparfumeerd met verse munt en limoen
                    <br/><span className="italic">Bouillon de canard, tortellini parfumés à la menthe fraîche et citron vert</span>
                    <br/>Clear duck soup, tortellini flavored with fresh mint and lime
                  </h3>
                  <p className="text-[#6b1f1f] font-semibold">€ 14,50</p>
                </div>
              </div>
            </div>

            {/* Pasta */}
            <div className="mb-16">
              <h2 className="text-3xl md:text-4xl font-serif text-[#6b1f1f] mb-8 text-left border-b-2 border-[#6b1f1f] pb-4">
                {t.homemadePasta}
              </h2>
              <div className="space-y-6">
                <div className="bg-white/60 p-6 rounded-sm">
                  <h3 className="text-gray-900 mb-2 leading-tight">
                    Spaghetti met verse kerstomaten, look en basilicum (allergeen 5)
                    <br/><span className="italic">Spaghetti aux tomates cerises fraîches, ail et basilic (allergène 5)</span>
                    <br/>Spaghetti with fresh cherry tomatoes, garlic and basil (allergen 5)
                  </h3>
                  <p className="text-[#6b1f1f] font-semibold">€ 17,50</p>
                </div>

                <div className="bg-white/60 p-6 rounded-sm">
                  <h3 className="text-gray-900 mb-2 leading-tight">
                    Spaghetti met look, olie en pepertjes (allergeen 5)
                    <br/><span className="italic">Spaghetti à l'ail, huile et piment (allergène 5)</span>
                    <br/>Spaghetti with garlic, oil and chili peppers (allergen 5)
                  </h3>
                  <p className="text-[#6b1f1f] font-semibold">€ 17,50</p>
                </div>

                <div className="bg-white/60 p-6 rounded-sm">
                  <h3 className="text-gray-900 mb-2 leading-tight">
                    Spaghetti met schelpdieren (allergeen 5,14)
                    <br/><span className="italic">Spaghetti aux fruits de mer (allergène 5,14)</span>
                    <br/>Spaghetti with shellfish (allergen 5,14)
                  </h3>
                  <p className="text-[#6b1f1f] font-semibold">€ 24,50</p>
                </div>

                <div className="bg-white/60 p-6 rounded-sm">
                  <h3 className="text-gray-900 mb-2 leading-tight">
                    Linguini met scampi, courgette en pijnboompitten (allergeen 1,5,9)
                    <br/><span className="italic">Linguini aux scampi, courgette et pignons de pin (allergène 1,5,9)</span>
                    <br/>Linguini with scampi, zucchini and pine nuts (allergen 1,5,9)
                  </h3>
                  <p className="text-[#6b1f1f] font-semibold">€ 24,50</p>
                </div>

                <div className="bg-white/60 p-6 rounded-sm">
                  <h3 className="text-gray-900 mb-2 leading-tight">
                    Tagliolini met pesto van zwarte truffel, boter en parmezaanschilfers (allergeen 2,4,5,8,10)
                    <br/><span className="italic">Tagliolini au pesto de truffe noire, beurre et copeaux de parmesan (allergène 2,4,5,8,10)</span>
                    <br/>Tagliolini with black truffle pesto, butter and parmesan shavings (allergen 2,4,5,8,10)
                  </h3>
                  <p className="text-[#6b1f1f] font-semibold">€ 28,50</p>
                </div>

                <div className="bg-white/60 p-6 rounded-sm">
                  <h3 className="text-gray-900 mb-2 leading-tight">
                    Bucatini all'amatriciana (allergeen 5)
                    <br/><span className="italic">Bucatini all'amatriciana (allergène 5)</span>
                    <br/>Bucatini all'amatriciana (allergen 5)
                  </h3>
                  <p className="text-[#6b1f1f] font-semibold">€ 19,50</p>
                </div>

                <div className="bg-white/60 p-6 rounded-sm">
                  <h3 className="text-gray-900 mb-2 leading-tight">
                    Ravioli met rivierkreeftjes en champignons (allergeen 5)
                    <br/><span className="italic">Ravioli aux écrevisses et champignons (allergène 5)</span>
                    <br/>Ravioli with crayfish and mushrooms (allergen 5)
                  </h3>
                  <p className="text-[#6b1f1f] font-semibold">€ 23,50</p>
                </div>

                <div className="bg-white/60 p-6 rounded-sm">
                  <h3 className="text-gray-900 mb-2 leading-tight">
                    Ravioli met ricotta en verse tomaat (allergeen 8)
                    <br/><span className="italic">Ravioli à la ricotta et tomates fraîches (allergène 8)</span>
                    <br/>Ravioli with ricotta cheese and tomatoes (allergen 8)
                  </h3>
                  <p className="text-[#6b1f1f] font-semibold">€ 19,50</p>
                </div>

                <div className="bg-white/60 p-6 rounded-sm">
                  <h3 className="text-gray-900 mb-2 leading-tight">
                    Carameles gevuld met osso buco, crème van parmezaan en salie (allergeen 8)
                    <br/><span className="italic">Carameles farcis à l'osso buco, crème de parmesan et sauge (allergène 8)</span>
                    <br/>Carameles stuffed with osso buco, parmesan cream and sage (allergen 8)
                  </h3>
                  <p className="text-[#6b1f1f] font-semibold">€ 23,50</p>
                </div>

                <div className="bg-white/60 p-6 rounded-sm">
                  <h3 className="text-gray-900 mb-2 leading-tight">
                    Tagliolini met citroen van de Amalfi, gember en schaafsels van parmezaan (allergeen 2,5,8)
                    <br/><span className="italic">Tagliolini au citron d'Amalfi, gingembre et copeaux de parmesan (allergène 2,5,8)</span>
                    <br/>Tagliolini with lemon from Amalfi, ginger and shaved parmesan cheese (allergen 2,5,8)
                  </h3>
                  <p className="text-[#6b1f1f] font-semibold">€ 21,50</p>
                </div>

                <div className="bg-white/60 p-6 rounded-sm">
                  <h3 className="text-gray-900 mb-2 leading-tight">
                    Kwartet van verse huisgemaakte pasta (allergeen 2,3,4,5,8,10)
                    <br/><span className="italic">Quartet de pâtes fraîches maison (allergène 2,3,4,5,8,10)</span>
                    <br/>Quartet of fresh homemade pasta (allergen 2,3,4,5,8,10)
                  </h3>
                  <p className="text-[#6b1f1f] font-semibold">€ 23,50</p>
                </div>
              </div>
            </div>

            {/* Fish Dishes */}
            <div className="mb-16">
              <h2 className="text-3xl md:text-4xl font-serif text-[#6b1f1f] mb-8 text-left border-b-2 border-[#6b1f1f] pb-4">
                Visgerechten / <span className="italic">Poissons</span> / Fish Dishes
              </h2>
              <div className="space-y-6">
                <div className="bg-white/60 p-6 rounded-sm">
                  <h3 className="text-gray-900 mb-2 leading-tight">
                    Gegrilde inkvis met italiaanse kruiden, zachte look en salade (allergeen 1,14)
                    <br/><span className="italic">Seiches grillées aux arômes italiens, parfumées à l'ail doux, salade (allergène 1,14)</span>
                    <br/>Grilled octopus with italian herbs, perfumed with soft garlic, salad (allergen 1,14)
                  </h3>
                  <p className="text-[#6b1f1f] font-semibold">€ 26,50</p>
                </div>

                <div className="bg-white/60 p-6 rounded-sm">
                  <h3 className="text-gray-900 mb-2 leading-tight">
                    Gefrituurde calamares met tartaarsaus (allergeen 1,2,4,5,11,14)
                    <br/><span className="italic">Calamars frais frits, sauce tartare (allergène 1,2,4,5,11,14)</span>
                    <br/>Fresh fried calamari, tartar sauce (allergen 1,2,4,5,11,14)
                  </h3>
                  <p className="text-[#6b1f1f] font-semibold">€ 25,50</p>
                </div>

                <div className="bg-white/60 p-6 rounded-sm">
                  <h3 className="text-gray-900 mb-2 leading-tight">
                    Filet van wilde zeebaars met rozemarijn, salie, olijfolie en citroen (allergeen 3)
                    <br/><span className="italic">Filet de bar sauvage au romarin, sauge, huile d'olive et citron (allergène 3)</span>
                    <br/>Wild bass fillet with rosemary, sage, olive oil and lemon (allergen 3)
                  </h3>
                  <p className="text-[#6b1f1f] font-semibold">€ 34,50</p>
                </div>

                <div className="bg-white/60 p-6 rounded-sm">
                  <h3 className="text-gray-900 mb-2 leading-tight">
                    Rode tonijnfilet met italiaanse kruiden, verse tomatenblokjes, basilicum, oregano, balsamiek-azijn, op een bedje van fijne groenten (allergeen 3,12,13)
                    <br/><span className="italic">Filet de thon rouge macéré aux arômes italiens, dés de tomates fraîches, basilic, origan, vinaigre balsamique, servi sur julienne de légumes (allergène 3,12,13)</span>
                    <br/>Red tuna fillet macerated with italian herbs, cubes of fresh tomatoes, basil, oregano, balsamic vinegar, served on a bed of vegetables (allergen 3,12,13)
                  </h3>
                  <p className="text-[#6b1f1f] font-semibold">€ 33,50</p>
                </div>

                <div className="bg-white/60 p-6 rounded-sm">
                  <h3 className="text-gray-900 mb-2 leading-tight">
                    Filet van zeebrasem aqua pazza (allergeen 3,4,10)
                    <br/><span className="italic">Filet de Daurade aqua pazza (allergène 3,4,10)</span>
                    <br/>Sea bream fillet aqua pazza (allergen 3,4,10)
                  </h3>
                  <p className="text-[#6b1f1f] font-semibold">€ 32,50</p>
                </div>
              </div>
            </div>

            {/* Meat Dishes */}
            <div className="mb-16">
              <h2 className="text-3xl md:text-4xl font-serif text-[#6b1f1f] mb-8 text-left border-b-2 border-[#6b1f1f] pb-4">
                Vleesgerechten / <span className="italic">Viandes</span> / Meat Dishes
              </h2>
              <div className="space-y-6">
                <div className="bg-white/60 p-6 rounded-sm">
                  <h3 className="text-gray-900 mb-2 leading-tight">
                    Mechelse koekoek met Amalfi citroen en seizoensgroenten (allergeen 8,13)
                    <br/><span className="italic">Poitrine de coucou de Malines au citron d'Amalfi et ses légumes de saison (allergène 8,13)</span>
                    <br/>Breast of chicken from Mechelen with lemon from Amalfi and seasonal vegetables (allergen 8,13)
                  </h3>
                  <p className="text-[#6b1f1f] font-semibold">€ 25,50</p>
                </div>

                <div className="bg-white/60 p-6 rounded-sm">
                  <h3 className="text-gray-900 mb-2 leading-tight">
                    Kalkoenskotelet op Milaneese wijze en seizoensgroenten (allergeen 8,13)
                    <br/><span className="italic">Escalope de dinde à la Milanèse et légumes de saison (allergène 8,13)</span>
                    <br/>Turkey cutlet Milanese with seasonal vegetables (allergen 8,13)
                  </h3>
                  <p className="text-[#6b1f1f] font-semibold">€ 24,50</p>
                </div>

                <div className="bg-white/60 p-6 rounded-sm">
                  <h3 className="text-gray-900 mb-2 leading-tight">
                    Kalfslever met gestoofde ajuin op Venetiaanse wijze (allergeen 8,10)
                    <br/><span className="italic">Foie de veau aux oignons fondants à la mode de Venise (allergène 8,10)</span>
                    <br/>Veal liver with fondant onions Venice style (allergen 8,10)
                  </h3>
                  <p className="text-[#6b1f1f] font-semibold">€ 27,50</p>
                </div>

                <div className="bg-white/60 p-6 rounded-sm">
                  <h3 className="text-gray-900 mb-2 leading-tight">
                    Saltimbocca alla Romana, kalfsmédaillon, Parmaham, scamorza en salie. Saus van Marsala (allergeen 5,8,10)
                    <br/><span className="italic">Saltimbocca alla Romana, petite médaillon de veau, jambon de Parme, scamorza, sauge, sauce au marsala (allergène 5,8,10)</span>
                    <br/>Saltimbocca alla Romana, small veal medaillon, Parmaham, scamorza, sage, Marsala sauce (allergen 5,8,10)
                  </h3>
                  <p className="text-[#6b1f1f] font-semibold">€ 28,50</p>
                </div>

                <div className="bg-white/60 p-6 rounded-sm">
                  <h3 className="text-gray-900 mb-2 leading-tight">
                    Iberische filet pur met koninklijke boleten (allergeen 10)
                    <br/><span className="italic">Filet pur d'Iberico aux bolets royals (allergène 10)</span>
                    <br/>Iberian pure tenderloin with royal mushrooms (allergen 10)
                  </h3>
                  <p className="text-[#6b1f1f] font-semibold">€ 32,50</p>
                </div>

                <div className="bg-white/60 p-6 rounded-sm">
                  <h3 className="text-gray-900 mb-2 leading-tight">
                    Kalfsniertjes "trifolati" met oesterzwammen (allergeen 8)
                    <br/><span className="italic">Rognons de veau "trifolati" aux pleurotes (allergène 8)</span>
                    <br/>Veal kidneys "trifolati" with oyster mushrooms (allergen 8)
                  </h3>
                  <p className="text-[#6b1f1f] font-semibold">€ 23,50</p>
                </div>

                <div className="bg-white/60 p-6 rounded-sm">
                  <h3 className="text-gray-900 mb-2 leading-tight">
                    Tagliata, Runderlapje op een bedje van raketsla en balsamieksaus, parmezaanschilfers (allergeen 8,13)
                    <br/><span className="italic">Tagliata, Emincé de bœuf sur lit de roquette, sauce balsamique et copeaux de Parmesan (allergène 8,13)</span>
                    <br/>Tagliata, slices of beef on a bed of arugula salad, balsamic sauce and shaved parmesan cheese (allergen 8,13)
                  </h3>
                  <p className="text-[#6b1f1f] font-semibold">€ 32,50</p>
                </div>

                <div className="bg-white/60 p-6 rounded-sm">
                  <h3 className="text-gray-900 mb-2 leading-tight">
                    Gegrilde Filet pur met groenten (allergeen 8,13)
                    <br/><span className="italic">Filet pur grillé aux légumes (allergène 8,13)</span>
                    <br/>Grilled pure tenderloin with vegetables (allergen 8,13)
                  </h3>
                  <p className="text-[#6b1f1f] font-semibold">€ 36,50</p>
                </div>
              </div>
            </div>

            {/* CTA */}
            <div className="text-center mt-16">
              <Link
                to={`${basePath}/reservations`}
                className="inline-block px-10 py-4 bg-[#6b1f1f] hover:bg-[#7d2424] text-white rounded-sm transition-colors text-lg uppercase tracking-wide"
              >
                {t.makeReservation}
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Menu;
