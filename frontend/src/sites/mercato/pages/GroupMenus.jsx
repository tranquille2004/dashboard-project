import React from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../contexts/LanguageContext';
import { Wine, Users, ChefHat } from 'lucide-react';

const GroupMenus = () => {
  const { language } = useLanguage();

  const pageTitle = {
    nl: 'Groepmenus',
    fr: 'Menus de Groupe',
    en: 'Group Menus',
    es: 'Menús de Grupo',
    de: 'Gruppenmenüs',
    it: 'Menu di Gruppo'
  };

  const subtitle = {
    nl: 'Perfecte keuze voor groepen vanaf 10 personen',
    fr: 'Choix parfait pour les groupes à partir de 10 personnes',
    en: 'Perfect choice for groups from 10 people',
    es: 'Elección perfecta para grupos desde 10 personas',
    de: 'Perfekte Wahl für Gruppen ab 10 Personen',
    it: 'Scelta perfetta per gruppi da 10 persone'
  };

  const reserveButton = {
    nl: 'Reserveer voor groepen',
    fr: 'Réserver pour groupes',
    en: 'Reserve for groups',
    es: 'Reservar para grupos',
    de: 'Für Gruppen reservieren',
    it: 'Prenota per gruppi'
  };

  const menus = [
    {
      name: 'Menu 1',
      price: '€45',
      icon: ChefHat,
      color: 'from-amber-600/20 to-amber-900/10',
      items: [
        {
          title: 'Aperitivo (spumante)',
          dishes: [
            'Rundercarpaccio met rucola en parmezaanse kaas\nCarpaccio de bœuf, roquette et parmesan\nBeefcarpaccio with arugula salad and parmesan cheese',
            'Gemarineerde zalm / Saumon mariné / Marinated salmon',
            'Parmigiana\nGratin van aubergine met gerookte mozzarella\nGratin d\'aubergines à la mozzarella fumée\nGratinated eggplant with smoked mozzarella',
            'Tagliere \'Mercato\'\nItaliaanse charcuterie, kaas\nCharcuterie italienne, fromage\nItalian charcuterie, cheese'
          ]
        },
        {
          title: '',
          dishes: [
            'Ravioli al Tartufo\nRavioli met truffel / ravioli à la truffe / ravioli with truffle',
            'Gebraden zalm met grof zout, purée, spumante saus, seizoensgroenten\nSaumon rôti au gros sel, purée, sauce spumante, légumes de saison\nSmoked salmon with coarse salt, puree, spumante sauce, seasonal vegetables',
            'Involtino di vitello\nKalfsrollade gevuld met hesp en kaas, portsaus, rozijnen, pijnboompitten en pasta\nRoulade de veau farcie au jambon cuit et fromage, sauce porto, raisin sec, pignons de pin et pâtes\nVeal rolls filled with ham and cheese, port sauce, raisins, pine nuts, served with pasta'
          ]
        },
        {
          title: '',
          dishes: ['Verrassingsdessert / dessert surprise']
        }
      ]
    },
    {
      name: 'Menu 2',
      price: '€55',
      icon: Wine,
      color: 'from-red-600/20 to-red-900/10',
      wine: '½ fles huiswijn per persoon / ½ bouteille de vin maison par personne / ½ bottle per person of housewine',
      items: [
        {
          title: 'Aperitivo (spumante)',
          dishes: [
            'Triologie van zeecarpaccio: zwaardvis, tonijn, zalm\nTriologie de carpaccio de mer : espadon, thon, saumon\nTriologie of sea carpaccio: swordfish, tuna, salmon',
            'Parmaham met burratina\nJambon de Parme et burratina\nParma ham and burratina cheese',
            'Sapori \'Mercato\'\nRundercarpaccio, vitello tonnato, Parmaham\nCarpaccio de boeuf, vitello tonnato, jambon de Parme\nBeefcarpaccio, vitello tonnato, Parma ham',
            'Scampi met truffel en groene asperges\nScampi à la truffe et asperges vertes\nScampi with truffles and green asparagus'
          ]
        },
        {
          title: '',
          dishes: [
            'Kalfsribstuk, crème met bospaddenstoelen, aardappelen\nCôte de veau, crème aux champignons de bois, pommes de terre\nVeal chop, wild mushroom cream sauce, potatoes',
            'Zwaardvis op mediterraanse wijze (kappertjes, olijven, kerstomaatjes), groenten en aardappelen\nEspadon façon méditerranée (câpres, olives, tomates cerises), légumes et pommes de terre\nMediterranean-style swordfish (capers, olives, cherry tomatoes), vegetables and potatoes',
            'Trio van verse pasta \'Mercato\': ravioli met truffel, tortelloni met ricotta, tagliatelle met paddenstoelen en Parmaham\nTrio de pâtes fraiches \'Mercato\' : ravioli à la truffe, tortelloni à la ricotta, tagliatelle aux champignons et jambon de parme\nTrio of fresh pasta: ravioli with truffle, tortelloni with ricotta, tagliatelle with mushrooms and Parma ham'
          ]
        },
        {
          title: '',
          dishes: ['Verrassingsdessert / dessert surprise']
        }
      ]
    },
    {
      name: 'Menu 3',
      price: '€65',
      icon: Users,
      color: 'from-green-600/20 to-green-900/10',
      wine: '½ fles huiswijn per persoon / ½ bouteille de vin maison par personne / ½ bottle per person of housewine',
      items: [
        {
          title: 'Aperitivo (spumante)',
          dishes: [
            'Vitello tonnato\nKalfslapje, crème van tonijn, ansjovis, mayonnaise en kappertjes\nBraisé de veau, sauce au thon, anchois, mayonnaise et câpres\nBraised veal, tuna sauce, anchovies, mayonnaise and capers',
            'Gerookte zalm / Saumon fumé / Smoked salmon',
            'Ravioli met kreeft\nRavioli de homard\nLobster ravioli',
            'Salade van ganzenlever, sperziebonen, venkel, zoetzure vinaigrette\nSalade de foie gras, haricots verts, fenouille, vinaigrette aigre-douce\nFoie gras salad with green beans, fennel and sweet and sour dressing'
          ]
        },
        {
          title: '',
          dishes: [
            'Runderfilet Rossini: ganzenlever met rodewijnsaus, aardappelen, seizoensgroenten\nFilet de bœuf Rossini : foie gras, sauce au vin rouge, pommes de terre, légumes de saison\nFilet of beef Rossini: foie gras, red wine sauce, potatoe, seasonal vegetables',
            'Ravioli met ganzenlever, porto saus, kalfszwezerik\nRavioli au foie gras, sauce porto, ris de veau\nRavioli with foie gras, port sauce, sweetbreads',
            'Gegilde vissoorten met salade\nGrillade de poissons et salade\nGrilled fishes and salad'
          ]
        },
        {
          title: '',
          dishes: ['Verrassingsdessert / dessert surprise']
        }
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-black pt-24 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16 animate-fade-in">
          <h1 className="text-5xl md:text-6xl font-bold text-gold mb-4">
            {pageTitle[language]}
          </h1>
          <p className="text-xl text-gray-300 mb-6">{subtitle[language]}</p>
          <div className="w-24 h-1 bg-gold mx-auto mb-8"></div>
          
          {/* Reserve link boven menus */}
          <Link
            to="/reserve"
            className="inline-block bg-gold text-black px-8 py-3 rounded-lg font-bold text-lg hover:bg-gold/90 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 mb-4"
          >
            {reserveButton[language]}
          </Link>
          
          {/* PDF link */}
          <div className="mt-4">
            <a
              href="/groepmenus-mercato.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block text-gray-400 hover:text-gold transition-colors text-sm underline"
            >
              📄 {language === 'nl' && 'Bekijk Groepmenus PDF'}
              {language === 'fr' && 'Voir Menus de Groupe PDF'}
              {language === 'en' && 'View Group Menus PDF'}
              {language === 'es' && 'Ver Menús de Grupo PDF'}
              {language === 'de' && 'Gruppenmenüs PDF ansehen'}
              {language === 'it' && 'Visualizza Menu di Gruppo PDF'}
            </a>
          </div>
        </div>

        {/* Menus Grid */}
        <div className="grid md:grid-cols-3 gap-8 mb-12">
          {menus.map((menu, idx) => (
            <div
              key={idx}
              className={`bg-gradient-to-br ${menu.color} border-2 border-gold/30 rounded-xl overflow-hidden transform hover:scale-105 transition-all duration-300 shadow-2xl animate-fade-in`}
              style={{ animationDelay: `${idx * 0.2}s` }}
            >
              {/* Menu Header */}
              <div className="bg-black/60 backdrop-blur-sm p-6 border-b border-gold/20">
                <h2 className="text-3xl font-bold text-gold mb-2">{menu.name}</h2>
                <p className="text-4xl font-bold text-white">{menu.price}</p>
              </div>

              {/* Menu Content */}
              <div className="p-6 space-y-6">
                {menu.items.map((course, courseIdx) => (
                  <div key={courseIdx}>
                    {course.title && (
                      <h3 className="text-lg text-gold mb-4 text-center">
                        {course.title}
                      </h3>
                    )}
                    <div className="space-y-4">
                      {course.dishes.map((dish, dishIdx) => (
                        <div key={dishIdx} className="relative text-center">
                          <p className="text-sm text-gray-300 leading-relaxed whitespace-pre-line">
                            {dish}
                          </p>
                          {dishIdx < course.dishes.length - 1 && course.dishes.length > 1 && (
                            <div className="text-center text-gold/40 text-xs my-2">OF / OU / OR</div>
                          )}
                        </div>
                      ))}
                    </div>
                    {courseIdx < menu.items.length - 1 && (
                      <div className="text-center text-gold/60 text-lg my-4">--o--</div>
                    )}
                  </div>
                ))}
                
                {/* Wine info at bottom for Menu 2 & 3 */}
                {menu.wine && (
                  <div className="mt-6 pt-6 border-t border-gold/20">
                    <p className="text-xs text-gray-300 italic text-center flex items-center justify-center gap-2">
                      <Wine size={16} className="text-gold flex-shrink-0" />
                      <span className="whitespace-pre-line">{menu.wine}</span>
                    </p>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Reserve Button */}
        <div className="text-center animate-fade-in" style={{ animationDelay: '0.6s' }}>
          <Link
            to="/reserve"
            className="inline-block bg-gold text-black px-12 py-4 rounded-lg font-bold text-xl hover:bg-gold/90 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
          >
            {reserveButton[language]}
          </Link>
          <p className="mt-4 text-gray-400 text-sm">
            {language === 'nl' && 'Menu mogelijk vanaf minimaal 10 personen'}
            {language === 'fr' && 'Menu disponible à partir de 10 personnes minimum'}
            {language === 'en' && 'Menu available from minimum 10 people'}
            {language === 'es' && 'Menú disponible desde mínimo 10 personas'}
            {language === 'de' && 'Menü erhältlich ab mindestens 10 Personen'}
            {language === 'it' && 'Menu disponibile da minimo 10 persone'}
          </p>
        </div>
      </div>
    </div>
  );
};

export default GroupMenus;
