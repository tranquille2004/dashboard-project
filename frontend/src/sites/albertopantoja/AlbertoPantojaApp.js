import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { Menu, X, Facebook, Youtube, Instagram, MapPin, Mail, Phone, ChevronRight, Users, Building, Heart, Briefcase, GraduationCap, Home, Trophy, Volume2, VolumeX, Play, Pause, Trash2 } from 'lucide-react';
import { trackVisit } from '@/utils/trackVisit';

const API_BASE = (process.env.REACT_APP_BACKEND_URL || '') + '/api';

// Helper to build a canonical key for any video (URL for FB, special key for YouTube)
const videoKey = (v) => v.type === 'youtube' ? `yt:${v.id}` : v.url;

// Helper for production image paths
const IMG = (path) => {
  if (!path) return '';
  if (path.startsWith('http')) return path;
  // Check if window exists (server-side rendering check)
  if (typeof window === 'undefined') return path;
  const isProduction = window.location.hostname.includes('.emergent.host');
  if (isProduction && path.startsWith('/images/')) {
    return '/api' + path;
  }
  return path;
};

// Color scheme: Blue (#1E3A8A), Red (#DC2626), White (#FFFFFF)
// Based on Revolución Ciudadana party colors

// Translations
const translations = {
  es: {
    nav: { home: 'Inicio', bio: 'Biografía', work: 'Trabajo', media: 'Medios', contact: 'Contacto', join: 'Únete' },
    hero: {
      subtitle: 'CONCEJAL RURAL DE SANTO DOMINGO',
      title: 'Alberto Pantoja',
      tagline: '',
      description: 'Ex-Director Provincial de la Revolución Ciudadana en Santo Domingo de los Tsáchilas y concejal del cantón Santo Domingo. Trabajando por el desarrollo integral de nuestras comunidades.',
      cta: 'Conoce Mi Trabajo',
      candidacy: {
        label: 'PRE-CANDIDATO OFICIAL',
        office: 'PREFECTURA DE SANTO DOMINGO',
        list: 'Lista 16 · Amigo'
      }
    },
    about: {
      label: 'SOBRE ALBERTO',
      title: 'Compromiso con el pueblo',
      description: 'Alberto Pantoja es concejal Rural del cantón Santo Domingo y Ex-Director Provincial de la Revolución Ciudadana (RC5) en Santo Domingo de los Tsáchilas. Con una profunda vocación de servicio público, Alberto representa los intereses de las comunidades rurales y urbanas de la provincia.',
      mission: 'Su compromiso abarca el desarrollo integral de las 7 parroquias urbanas de la ciudad y las 7 parroquias rurales del cantón, luchando por mejor infraestructura, servicios de salud, educación, y oportunidades económicas para todos los ciudadanos.',
      stats: {
        sessions: 'Sesiones del Concejo',
        parishes: 'Parroquias (7 urbanas + 7 rurales)',
        projects: 'Proyectos'
      }
    },
    work: {
      label: 'ÁREAS DE TRABAJO',
      title: 'Trabajando por el desarrollo',
      subtitle: 'Por las 7 parroquias urbanas de la ciudad y las 7 parroquias rurales del cantón de Santo Domingo',
      areas: [
        { title: 'Desarrollo Rural', desc: 'Mejorando la vida de las comunidades campesinas' },
        { title: 'Infraestructura', desc: 'Vías, agua potable y servicios básicos' },
        { title: 'Salud Pública', desc: 'Acceso a atención médica de calidad' },
        { title: 'Educación', desc: 'Oportunidades para niños y jóvenes' },
        { title: 'Economía Local', desc: 'Apoyo a emprendedores y pequeños negocios' },
        { title: 'Comunidad', desc: 'Fortaleciendo el tejido social' },
        { title: 'Deporte y Juventud', desc: 'Promoviendo el deporte y apoyando a los jóvenes de Santo Domingo con programas deportivos, canchas y eventos que fomentan valores y vida saludable' }
      ]
    },
    position: {
      label: 'REVOLUCIÓN CIUDADANA',
      title: 'RC5',
      subtitle: 'Por un Ecuador más justo',
      description: 'Como parte del movimiento Revolución Ciudadana, trabajamos por un Ecuador con oportunidades para todos, donde cada ciudadano tenga acceso a servicios básicos, educación de calidad, y la posibilidad de construir un futuro mejor para sus familias.',
      points: [
        'Justicia social y equidad',
        'Desarrollo sostenible',
        'Participación ciudadana',
        'Transparencia en la gestión pública'
      ]
    },
    media: {
      label: 'MEDIOS',
      title: 'Videos y Entrevistas',
      subtitle: 'Mantente informado sobre nuestras actividades y propuestas'
    },
    contact: {
      label: 'CONTACTO',
      title: 'Contáctame',
      subtitle: 'Estoy aquí para escucharte. Tu voz importa.',
      address: 'Santo Domingo de los Tsáchilas, Ecuador'
    },
    footer: {
      slogan: 'Por un Santo Domingo mejor',
      rights: 'Todos los derechos reservados',
      webmaster: 'Sitio web creado por'
    }
  },
  fr: {
    nav: { home: 'Accueil', bio: 'Biographie', work: 'Travail', media: 'Médias', contact: 'Contact', join: 'Rejoignez-nous' },
    hero: {
      subtitle: 'CONSEILLER RURAL DE SANTO DOMINGO',
      title: 'Alberto Pantoja',
      tagline: '',
      description: 'Ex-Directeur Provincial de la Revolución Ciudadana à Santo Domingo de los Tsáchilas et Conseiller du canton Santo Domingo. Travaillant pour le développement intégral de nos communautés.',
      cta: 'Découvrez Mon Travail',
      candidacy: {
        label: 'PRÉ-CANDIDAT OFFICIEL',
        office: 'PRÉFECTURE DE SANTO DOMINGO',
        list: 'Liste 16 · Amigo'
      }
    },
    about: {
      label: 'À PROPOS D\'ALBERTO',
      title: 'Engagement envers le peuple',
      description: 'Alberto Pantoja est Conseiller Rural du canton de Santo Domingo et Ex-Directeur Provincial de la Revolución Ciudadana (RC5) à Santo Domingo de los Tsáchilas. Avec une profonde vocation de service public, Alberto représente les intérêts des communautés rurales et urbaines de la province.',
      mission: 'Son engagement couvre le développement intégral des 7 paroisses urbaines de la ville et des 7 paroisses rurales du canton, en luttant pour de meilleures infrastructures, des services de santé, l\'éducation et des opportunités économiques pour tous les citoyens.',
      stats: {
        sessions: 'Sessions du Conseil',
        parishes: 'Paroisses (7 urbaines + 7 rurales)',
        projects: 'Projets'
      }
    },
    work: {
      label: 'DOMAINES DE TRAVAIL',
      title: 'Travailler pour le développement',
      subtitle: 'Pour les 7 paroisses urbaines de la ville et les 7 paroisses rurales du canton de Santo Domingo',
      areas: [
        { title: 'Développement Rural', desc: 'Améliorer la vie des communautés paysannes' },
        { title: 'Infrastructure', desc: 'Routes, eau potable et services de base' },
        { title: 'Santé Publique', desc: 'Accès à des soins médicaux de qualité' },
        { title: 'Éducation', desc: 'Opportunités pour les enfants et les jeunes' },
        { title: 'Économie Locale', desc: 'Soutien aux entrepreneurs et petites entreprises' },
        { title: 'Communauté', desc: 'Renforcer le tissu social' },
        { title: 'Sport et Jeunesse', desc: 'Promouvoir le sport et soutenir les jeunes de Santo Domingo avec des programmes sportifs, des terrains et des événements qui encouragent les valeurs et une vie saine' }
      ]
    },
    position: {
      label: 'REVOLUCIÓN CIUDADANA',
      title: 'RC5',
      subtitle: 'Pour un Équateur plus juste',
      description: 'En tant que membre du mouvement Revolución Ciudadana, nous travaillons pour un Équateur avec des opportunités pour tous, où chaque citoyen a accès aux services de base, à une éducation de qualité et à la possibilité de construire un meilleur avenir pour sa famille.',
      points: [
        'Justice sociale et équité',
        'Développement durable',
        'Participation citoyenne',
        'Transparence dans la gestion publique'
      ]
    },
    media: {
      label: 'MÉDIAS',
      title: 'Vidéos et Interviews',
      subtitle: 'Restez informé sur nos activités et propositions'
    },
    contact: {
      label: 'CONTACT',
      title: 'Contactez-moi',
      subtitle: 'Je suis là pour vous écouter. Votre voix compte.',
      address: 'Santo Domingo de los Tsáchilas, Équateur'
    },
    footer: {
      slogan: 'Pour un meilleur Santo Domingo',
      rights: 'Tous droits réservés',
      webmaster: 'Site web créé par'
    }
  },
  en: {
    nav: { home: 'Home', bio: 'Biography', work: 'Work', media: 'Media', contact: 'Contact', join: 'Join Us' },
    hero: {
      subtitle: 'RURAL COUNCILMAN OF SANTO DOMINGO',
      title: 'Alberto Pantoja',
      tagline: '',
      description: 'Ex-Provincial Director of Revolución Ciudadana in Santo Domingo de los Tsáchilas and Councilman of Santo Domingo canton. Working for the integral development of our communities.',
      cta: 'See My Work',
      candidacy: {
        label: 'OFFICIAL PRE-CANDIDATE',
        office: 'PREFECTURE OF SANTO DOMINGO',
        list: 'List 16 · Amigo'
      }
    },
    about: {
      label: 'ABOUT ALBERTO',
      title: 'Commitment to the people',
      description: 'Alberto Pantoja is Rural Councilman of Santo Domingo canton and Ex-Provincial Director of Revolución Ciudadana (RC5) in Santo Domingo de los Tsáchilas. With a deep vocation for public service, Alberto represents the interests of rural and urban communities in the province.',
      mission: 'His commitment covers the integral development of the 7 urban parishes of the city and the 7 rural parishes of the canton, fighting for better infrastructure, health services, education, and economic opportunities for all citizens.',
      stats: {
        sessions: 'Council Sessions',
        parishes: 'Parishes (7 urban + 7 rural)',
        projects: 'Projects'
      }
    },
    work: {
      label: 'WORK AREAS',
      title: 'Working for development',
      subtitle: 'For the 7 urban parishes of the city and the 7 rural parishes of Santo Domingo canton',
      areas: [
        { title: 'Rural Development', desc: 'Improving the lives of rural communities' },
        { title: 'Infrastructure', desc: 'Roads, drinking water and basic services' },
        { title: 'Public Health', desc: 'Access to quality medical care' },
        { title: 'Education', desc: 'Opportunities for children and youth' },
        { title: 'Local Economy', desc: 'Support for entrepreneurs and small businesses' },
        { title: 'Community', desc: 'Strengthening the social fabric' },
        { title: 'Sports & Youth', desc: 'Promoting sports and supporting the youth of Santo Domingo with athletic programs, courts and events that foster values and healthy living' }
      ]
    },
    position: {
      label: 'REVOLUCIÓN CIUDADANA',
      title: 'RC5',
      subtitle: 'For a fairer Ecuador',
      description: 'As part of the Revolución Ciudadana movement, we work for an Ecuador with opportunities for all, where every citizen has access to basic services, quality education, and the possibility to build a better future for their families.',
      points: [
        'Social justice and equity',
        'Sustainable development',
        'Citizen participation',
        'Transparency in public management'
      ]
    },
    media: {
      label: 'MEDIA',
      title: 'Videos and Interviews',
      subtitle: 'Stay informed about our activities and proposals'
    },
    contact: {
      label: 'CONTACT',
      title: 'Contact Me',
      subtitle: 'I\'m here to listen. Your voice matters.',
      address: 'Santo Domingo de los Tsáchilas, Ecuador'
    },
    footer: {
      slogan: 'For a better Santo Domingo',
      rights: 'All rights reserved',
      webmaster: 'Website created by'
    }
  }
};

// Working video embeds (Facebook and YouTube)
const WORKING_VIDEOS = [
  // === DESTACADOS ===
  {
    type: 'youtube',
    id: 'IZruu3cScWM',
    title: '¿Qué tiene en común con Rafael Correa?'
  },
  {
    type: 'facebook',
    url: 'https://www.facebook.com/elboligraforojoztv/videos/964375001521446/',
    title: '¿Quién es Alberto Pantoja?'
  },
  {
    type: 'facebook',
    url: 'https://www.facebook.com/AlbertoPantojaRC5/videos/391366400133630/',
    title: 'Mensaje a los jóvenes'
  },
  {
    type: 'facebook',
    url: 'https://www.facebook.com/AlbertoPantojaRC5/videos/1202824487276299/',
    title: 'Alberto Pantoja La voz del campo'
  },
  {
    type: 'facebook',
    url: 'https://www.facebook.com/alberto.p.guzman.7/videos/749319879738556/',
    title: 'Entrevista'
  },
  {
    type: 'facebook',
    url: 'https://www.facebook.com/AlbertoPantojaRC5/videos/867916851242102/',
    title: 'Otonga café en Alluriquín'
  },
  // === REELS ===
  {
    type: 'facebook_reel',
    url: 'https://www.facebook.com/reel/1723778411645487',
    title: 'Reel 1'
  },
  {
    type: 'facebook_reel',
    url: 'https://www.facebook.com/reel/3651348605173595',
    title: 'Reel 2'
  },
  {
    type: 'facebook_reel',
    url: 'https://www.facebook.com/reel/1309640917405315',
    title: 'Reel 3'
  },
  {
    type: 'facebook_reel',
    url: 'https://www.facebook.com/reel/1906760859878505',
    title: 'Reel 4'
  },
  {
    type: 'facebook_reel',
    url: 'https://www.facebook.com/reel/2432247437192051',
    title: 'Reel 5'
  },
  // === RADIO INTERVIEWS & VIDEOS ===
  {
    type: 'facebook',
    url: 'https://www.facebook.com/AlbertoPantojaRC5/videos/1650220352347310/',
    title: 'Video 1'
  },
  {
    type: 'facebook',
    url: 'https://www.facebook.com/AlbertoPantojaRC5/videos/1228041888972734/',
    title: 'Video 2'
  },
  {
    type: 'facebook',
    url: 'https://www.facebook.com/AlbertoPantojaRC5/videos/548003865047574/',
    title: 'Video 3'
  },
  {
    type: 'facebook',
    url: 'https://www.facebook.com/AlbertoPantojaRC5/videos/981445697312455/',
    title: 'Video 4'
  },
  {
    type: 'facebook',
    url: 'https://www.facebook.com/AlbertoPantojaRC5/videos/4033530786918402/',
    title: 'Video 5'
  },
  {
    type: 'facebook',
    url: 'https://www.facebook.com/AlbertoPantojaRC5/videos/924349143138861/',
    title: 'Video 6'
  },
  {
    type: 'facebook',
    url: 'https://www.facebook.com/AlbertoPantojaRC5/videos/1138102204635429/',
    title: 'Video 7'
  },
  {
    type: 'facebook',
    url: 'https://www.facebook.com/AlbertoPantojaRC5/videos/1080722876785526/',
    title: 'Video 8'
  },
  {
    type: 'facebook',
    url: 'https://www.facebook.com/AlbertoPantojaRC5/videos/8532855593489653/',
    title: 'Video 9'
  },
  {
    type: 'facebook',
    url: 'https://www.facebook.com/AlbertoPantojaRC5/videos/1092279462484874/',
    title: 'Video 10'
  },
  {
    type: 'facebook',
    url: 'https://www.facebook.com/AlbertoPantojaRC5/videos/1045741537221599/',
    title: 'Video 11'
  },
  {
    type: 'facebook',
    url: 'https://www.facebook.com/AlbertoPantojaRC5/videos/1241053807050768/',
    title: 'Video 12'
  },
  {
    type: 'facebook',
    url: 'https://www.facebook.com/AlbertoPantojaRC5/videos/1834862773701060/',
    title: 'Video 13'
  },
  {
    type: 'facebook',
    url: 'https://www.facebook.com/AlbertoPantojaRC5/videos/302792619144362/',
    title: 'Video 14'
  },
  {
    type: 'facebook',
    url: 'https://www.facebook.com/AlbertoPantojaRC5/videos/690771369630619/',
    title: 'Video 15'
  },
  {
    type: 'facebook',
    url: 'https://www.facebook.com/AlbertoPantojaRC5/videos/1527071004364779/',
    title: 'Video 16'
  },
  {
    type: 'facebook',
    url: 'https://www.facebook.com/AlbertoPantojaRC5/videos/845237860319262/',
    title: 'Video 17'
  },
  {
    type: 'facebook',
    url: 'https://www.facebook.com/AlbertoPantojaRC5/videos/1343766912937091/',
    title: 'Video 18'
  },
  {
    type: 'facebook',
    url: 'https://www.facebook.com/AlbertoPantojaRC5/videos/226933876409335/',
    title: 'Video 19'
  },
  {
    type: 'facebook',
    url: 'https://www.facebook.com/AlbertoPantojaRC5/videos/1290233991708293/',
    title: 'Video 20'
  },
  {
    type: 'facebook',
    url: 'https://www.facebook.com/AlbertoPantojaRC5/videos/1066930528033779/',
    title: 'Video 21'
  },
  {
    type: 'facebook',
    url: 'https://www.facebook.com/AlbertoPantojaRC5/videos/971856117110721/',
    title: 'Video 22'
  },
  {
    type: 'facebook',
    url: 'https://www.facebook.com/AlbertoPantojaRC5/videos/698160765379748/',
    title: 'Video 23'
  },
  {
    type: 'facebook',
    url: 'https://www.facebook.com/AlbertoPantojaRC5/videos/891656541752078/',
    title: 'Video 24'
  },
  {
    type: 'facebook',
    url: 'https://www.facebook.com/AlbertoPantojaRC5/videos/810038443379775/',
    title: 'Video 25'
  },
  {
    type: 'facebook',
    url: 'https://www.facebook.com/AlbertoPantojaRC5/videos/498809408792915/',
    title: 'Video 26'
  }
];

// Gallery photos - all 166 photos
const GALLERY_PHOTO_PATHS = [
  '/images/albertopantoja/Alberto/472952303_18477340369043721_5011479368151296835_n.jpg',
  '/images/albertopantoja/Alberto/478641831_653342143704312_3590459736061452532_n.jpg',
  '/images/albertopantoja/Alberto/480204303_656629500042243_9125989698012357854_n.jpg',
  '/images/albertopantoja/Alberto/480234149_655075170197676_3095455821364526613_n.jpg',
  '/images/albertopantoja/Alberto/480307455_655548596817000_7185293510812986926_n.jpg',
  '/images/albertopantoja/Alberto/480420139_656203370084856_4617900264739168853_n.jpg',
  '/images/albertopantoja/Alberto/480491262_655706246801235_7747192686795289121_n.jpg',
  '/images/albertopantoja/Alberto/480507403_656621136709746_5365126592573174961_n.jpg',
  '/images/albertopantoja/Alberto/480515354_655679926803867_5651133536485746327_n.jpg',
  '/images/albertopantoja/Alberto/480597505_657290146642845_592043654360335281_n.jpg',
  '/images/albertopantoja/Alberto/480707479_664558439249349_1595257261308133666_n.jpg',
  '/images/albertopantoja/Alberto/480709251_663836895988170_3797412518251391390_n.jpg',
  '/images/albertopantoja/Alberto/480711549_664567345915125_5958413020413343586_n.jpg',
  '/images/albertopantoja/Alberto/480713334_664562685915591_5007164056289956623_n.jpg',
  '/images/albertopantoja/Alberto/480774037_663522822686244_2715016025777416478_n.jpg',
  '/images/albertopantoja/Alberto/480786370_659474339757759_5500208258288237982_n.jpg',
  '/images/albertopantoja/Alberto/480791234_663504932688033_8187670340233454988_n.jpg',
  '/images/albertopantoja/Alberto/480807994_661243509580842_7638301278192419863_n.jpg',
  '/images/albertopantoja/Alberto/480826221_661238332914693_1950222681443014752_n.jpg',
  '/images/albertopantoja/Alberto/480860472_657275016644358_1581221998482835370_n.jpg',
  '/images/albertopantoja/Alberto/480983630_663666932671833_6619852466579408832_n.jpg',
  '/images/albertopantoja/Alberto/480994438_663829629322230_3965225250880568579_n.jpg',
  '/images/albertopantoja/Alberto/480996918_663503959354797_8069443481933364202_n.jpg',
  '/images/albertopantoja/Alberto/481038869_664566892581837_1463928018194383814_n.jpg',
  '/images/albertopantoja/Alberto/481056153_661234552915071_3125541129122087690_n.jpg',
  '/images/albertopantoja/Alberto/481072291_661226562915870_4083662330981547486_n.jpg',
  '/images/albertopantoja/Alberto/481075383_664152362623290_3868101445272029663_n.jpg',
  '/images/albertopantoja/Alberto/481075475_661240389581154_660570927459837005_n.jpg',
  '/images/albertopantoja/Alberto/481100468_663814392657087_1099306298357626231_n.jpg',
  '/images/albertopantoja/Alberto/481166447_664583795913480_2627893872316889168_n.jpg',
  '/images/albertopantoja/Alberto/481216783_663677912670735_548603755530380773_n.jpg',
  '/images/albertopantoja/Alberto/481221666_667363628968830_7668323349312129753_n.jpg',
  '/images/albertopantoja/Alberto/481225149_667366038968589_5235784937216913062_n.jpg',
  '/images/albertopantoja/Alberto/481234095_664310182607508_1784841354562135585_n.jpg',
  '/images/albertopantoja/Alberto/481247423_663671496004710_26449426074329130_n.jpg',
  '/images/albertopantoja/Alberto/481261388_667366232301903_1132387037546377867_n.jpg',
  '/images/albertopantoja/Alberto/481261847_667351782303348_2186856538270519019_n.jpg',
  '/images/albertopantoja/Alberto/481264580_666559779049215_5186556595470853376_n.jpg',
  '/images/albertopantoja/Alberto/481264599_666687159036477_804141891372611639_n.jpg',
  '/images/albertopantoja/Alberto/481266218_667366015635258_4778241687607143955_n.jpg',
  '/images/albertopantoja/Alberto/481463321_667123788992814_6415081231996730129_n.jpg',
  '/images/albertopantoja/Alberto/481465923_664560662582460_2173662479198137355_n.jpg',
  '/images/albertopantoja/Alberto/481472877_666565199048673_888175185952217895_n.jpg',
  '/images/albertopantoja/Alberto/481473713_664559525915907_2956917840563611724_n.jpg',
  '/images/albertopantoja/Alberto/481654126_667353872303139_5683543493365606997_n.jpg',
  '/images/albertopantoja/Alberto/481676856_664564485915411_3606854239573698285_n.jpg',
  '/images/albertopantoja/Alberto/481703124_666680322370494_406427975700643675_n.jpg',
  '/images/albertopantoja/Alberto/481703975_666558629049330_4161395890466585481_n.jpg',
  '/images/albertopantoja/Alberto/481765390_663814359323757_2347120516523527437_n.jpg',
  '/images/albertopantoja/Alberto/481766969_663675149337678_6424356835481615068_n.jpg',
  '/images/albertopantoja/Alberto/481767233_667353878969805_2437074188030803324_n.jpg',
  '/images/albertopantoja/Alberto/481801370_666686939036499_4200774667246636139_n.jpg',
  '/images/albertopantoja/Alberto/481809920_667368358968357_6461573214910938135_n.jpg',
  '/images/albertopantoja/Alberto/481908135_670475235324336_5612109026583249176_n.jpg',
  '/images/albertopantoja/Alberto/481949391_667363588968834_2851109949595358660_n.jpg',
  '/images/albertopantoja/Alberto/481950561_664572705914589_7320500258811969243_n.jpg',
  '/images/albertopantoja/Alberto/481989676_670461411992385_4283589097890102084_n.jpg',
  '/images/albertopantoja/Alberto/482020886_670183492020177_7225217704297194215_n.jpg',
  '/images/albertopantoja/Alberto/482025304_667482042290322_3124445830902764341_n.jpg',
  '/images/albertopantoja/Alberto/482077904_670190955352764_1917841792793064688_n.jpg',
  '/images/albertopantoja/Alberto/482085517_670193085352551_565611859118537506_n.jpg',
  '/images/albertopantoja/Alberto/482086172_670467908658402_7046386570360927872_n.jpg',
  '/images/albertopantoja/Alberto/482096215_670860845285775_1915966688192786072_n.jpg',
  '/images/albertopantoja/Alberto/482196269_670868551951671_6758116417102557468_n.jpg',
  '/images/albertopantoja/Alberto/482207909_670191725352687_3297574042290275444_n.jpg',
  '/images/albertopantoja/Alberto/482209877_667351795636680_3715128947390623690_n.jpg',
  '/images/albertopantoja/Alberto/482224820_667357628969430_6291735405319965598_n.jpg',
  '/images/albertopantoja/Alberto/482322398_666682282370298_542605208911398429_n.jpg',
  '/images/albertopantoja/Alberto/485157326_677204104651449_847888452424601585_n.jpg',
  '/images/albertopantoja/Alberto/486521206_3362637643867624_8639349669595908180_n.jpg',
  '/images/albertopantoja/Alberto/486525576_3362632520534803_9201062829055005510_n.jpg',
  '/images/albertopantoja/Alberto/486577839_3361743363957052_2074972252176003695_n.jpg',
  '/images/albertopantoja/Alberto/486641854_3365411216923600_2712643860251458528_n.jpg',
  '/images/albertopantoja/Alberto/486721255_3367016216763100_4058777480010809638_n.jpg',
  '/images/albertopantoja/Alberto/487073190_3367004853430903_9197240439070243626_n.jpg',
  '/images/albertopantoja/Alberto/487136987_3364931366971585_7614407715405862105_n.jpg',
  '/images/albertopantoja/Alberto/487143206_3365808930217162_918358489122195366_n.jpg',
  '/images/albertopantoja/Alberto/487185729_685332540505272_4918736397620921953_n.jpg',
  '/images/albertopantoja/Alberto/487385117_3366249713506417_4837405225366516864_n.jpg',
  '/images/albertopantoja/Alberto/487442896_3366249926839729_4788222070338726752_n.jpg',
  '/images/albertopantoja/Alberto/488909464_691370659901460_6048303810801967280_n.jpg',
  '/images/albertopantoja/Alberto/489073357_691372659901260_8894478628628242121_n.jpg',
  '/images/albertopantoja/Alberto/489106689_691372296567963_6411382729397502853_n.jpg',
  '/images/albertopantoja/Alberto/490373991_10161916053602772_8209487700055113804_n.jpg',
  '/images/albertopantoja/Alberto/492074035_704230295282163_44943598446438052_n.jpg',
  '/images/albertopantoja/Alberto/494383514_709319274773265_3340529442790566873_n.jpg',
  '/images/albertopantoja/Alberto/494846407_709652784739914_7468717487528991415_n.jpg',
  '/images/albertopantoja/Alberto/495307412_716559360715923_7822166491766794378_n.jpg',
  '/images/albertopantoja/Alberto/495857759_716116494093543_194888487634115349_n.jpg',
  '/images/albertopantoja/Alberto/496243497_716547274050465_3869242329580711119_n.jpg',
  '/images/albertopantoja/Alberto/500393636_10162668089614803_5713977786309093269_n.jpg',
  '/images/albertopantoja/Alberto/501307368_730531149318744_8488901729725034587_n.jpg',
  '/images/albertopantoja/Alberto/502619798_733301982374994_8346105277180544597_n.jpg',
  '/images/albertopantoja/Alberto/504690667_737083728663486_6002244764778823709_n.jpg',
  '/images/albertopantoja/Alberto/505879572_10162157529422772_5477881364361899492_n.jpg',
  '/images/albertopantoja/Alberto/508121084_10162165683607772_2029654061927947045_n.jpg',
  '/images/albertopantoja/Alberto/510557733_750220624016463_5431077435499929176_n.jpg',
  '/images/albertopantoja/Alberto/513863648_757017100003482_8711379241545039104_n.jpg',
  '/images/albertopantoja/Alberto/516449286_761618296210029_6643411971385946292_n.jpg',
  '/images/albertopantoja/Alberto/516926473_10162847807689803_1635027904074616235_n.jpg',
  '/images/albertopantoja/Alberto/517035847_761618252876700_4954891899802421673_n.jpg',
  '/images/albertopantoja/Alberto/517115297_10162874952239803_7096846969980499602_n.jpg',
  '/images/albertopantoja/Alberto/517396262_763193852719140_232806100776752872_n.jpg',
  '/images/albertopantoja/Alberto/517991074_10162861903679803_9018296962878372505_n.jpg',
  '/images/albertopantoja/Alberto/518271458_10162878989949803_7918998050366768045_n.jpg',
  '/images/albertopantoja/Alberto/518957037_764016382636887_1643133763717219090_n.jpg',
  '/images/albertopantoja/Alberto/520129482_768479935523865_3485893699291640828_n.jpg',
  '/images/albertopantoja/Alberto/520168261_767732742265251_7896378829678208541_n.jpg',
  '/images/albertopantoja/Alberto/520589327_768479972190528_2273228086157321832_n.jpg',
  '/images/albertopantoja/Alberto/520842663_769047775467081_5548212285928121053_n.jpg',
  '/images/albertopantoja/Alberto/524219776_775035911534934_6542427783220016218_n.jpg',
  '/images/albertopantoja/Alberto/524660300_774358568269335_5485827883027798037_n.jpg',
  '/images/albertopantoja/Alberto/524921628_775877598117432_7512052764065408906_n.jpg',
  '/images/albertopantoja/Alberto/525707914_10162966793944803_3147091270560848211_n.jpg',
  '/images/albertopantoja/Alberto/526673244_779086567796535_6154688933797499534_n.jpg',
  '/images/albertopantoja/Alberto/528242462_781439220894603_8852655452723440587_n.jpg',
  '/images/albertopantoja/Alberto/528286579_782428614128997_4741396581217572575_n.jpg',
  '/images/albertopantoja/Alberto/528303703_782428654128993_3421016760925008729_n.jpg',
  '/images/albertopantoja/Alberto/528645878_781439587561233_2815269067441081620_n.jpg',
  '/images/albertopantoja/Alberto/529430053_784755693896289_4489266015437964805_n.jpg',
  '/images/albertopantoja/Alberto/529645730_784755533896305_3647364555133346790_n.jpg',
  '/images/albertopantoja/Alberto/535094753_793492569689268_2042938304901107362_n.jpg',
  '/images/albertopantoja/Alberto/536896783_795345852837273_7428180870427606865_n.jpg',
  '/images/albertopantoja/Alberto/539464833_800907745614417_1604365765916956630_n.jpg',
  '/images/albertopantoja/Alberto/541970056_10163108334514803_3214060883013226990_n.jpg',
  '/images/albertopantoja/Alberto/542649945_10163100286954803_2324365682022305976_n.jpg',
  '/images/albertopantoja/Alberto/549176340_817833340588524_2713958324565028929_n.jpg',
  '/images/albertopantoja/Alberto/554468671_823542320017626_8923523889405969546_n.jpg',
  '/images/albertopantoja/Alberto/555499841_825293036509221_7663194453545599609_n.jpg',
  '/images/albertopantoja/Alberto/555732938_825293166509208_6261931247371465429_n.jpg',
  '/images/albertopantoja/Alberto/556058503_827651009606757_6593560417374675054_n.jpg',
  '/images/albertopantoja/Alberto/560927755_839170511788140_4456451950369688329_n.jpg',
  '/images/albertopantoja/Alberto/561763808_842132851491906_8438156866146645935_n.jpg',
  '/images/albertopantoja/Alberto/562381718_842138988157959_8184854978359410712_n.jpg',
  '/images/albertopantoja/Alberto/563458270_842132818158576_5808345663101430577_n (1).jpg',
  '/images/albertopantoja/Alberto/564588603_842132904825234_4272128383747926086_n.jpg',
  '/images/albertopantoja/Alberto/565367811_842132938158564_8373778431897263421_n.jpg',
  '/images/albertopantoja/Alberto/565624176_842133024825222_8251775728512714890_n.jpg',
  '/images/albertopantoja/Alberto/566236011_842139271491264_1593291405472370259_n.jpg',
  '/images/albertopantoja/Alberto/566364772_842139338157924_4113663319300709599_n.jpg',
  '/images/albertopantoja/Alberto/566374591_844926177879240_3372152882620777594_n.jpg',
  '/images/albertopantoja/Alberto/571168360_10163314696279803_3450548498500300037_n.jpg',
  '/images/albertopantoja/Alberto/571419148_852802953758229_8883338641998596987_n.jpg',
  '/images/albertopantoja/Alberto/578275613_861632199541971_3086833011310051514_n.jpg',
  '/images/albertopantoja/Alberto/578779782_861632319541959_1170563477998267963_n.jpg',
  '/images/albertopantoja/Alberto/578988260_861632252875299_7478494016679802367_n.jpg',
  '/images/albertopantoja/Alberto/579199501_861632162875308_3964887128357665411_n.jpg',
  '/images/albertopantoja/Alberto/586728560_10163445700299803_521490885492244063_n.jpg',
  '/images/albertopantoja/Alberto/591771272_10163477924134803_2046674434233931868_n.jpg',
  '/images/albertopantoja/Alberto/594829980_10163499267394803_2179917357638999117_n.jpg',
  '/images/albertopantoja/Alberto/602006774_904758158562708_4499873530878446677_n.jpg',
  '/images/albertopantoja/Alberto/611330332_904758291896028_4875099186624886461_n.jpg',
  '/images/albertopantoja/Alberto/612418992_904758161896041_4345709090054600897_n.jpg',
  '/images/albertopantoja/Alberto/616332892_909866671385190_5540965157346802957_n.jpg',
  '/images/albertopantoja/Alberto/617721234_10163678145539803_7835709025842143226_n.jpg',
  '/images/albertopantoja/Alberto/624570433_10163729829499803_6020772980040808805_n.jpg',
  '/images/albertopantoja/Alberto/640183448_939224118449445_1214158205869289218_n.jpg',
  '/images/albertopantoja/Alberto/643765039_10163851991904803_2808163826387162522_n.jpg',
  '/images/albertopantoja/Alberto/649301508_10163917427914803_3297400095641035746_n.jpg',
  '/images/albertopantoja/Alberto/653710743_10163959371539803_1145498374350872487_n.jpg',
  '/images/albertopantoja/Alberto/655273108_10163978439924803_2179546742476058211_n.jpg',
  '/images/albertopantoja/Alberto/657293400_10163992501119803_988835979914054785_n.jpg',
  '/images/albertopantoja/Alberto/657805826_10163992505109803_8576605590987168046_n.jpg',
  '/images/albertopantoja/Alberto/658198791_10163992500614803_3832256177700505877_n.jpg',
  '/images/albertopantoja/Alberto/658776777_10163992498794803_3721073907376182728_n.jpg',
];

// Images
const IMAGES = {
  logo: IMG('/images/albertopantoja/logo.jpg'),
  profileMain: IMG('/images/albertopantoja/Alberto/480491262_655706246801235_7747192686795289121_n.jpg'),
  profileBio: IMG('/images/albertopantoja/Alberto/472952303_18477340369043721_5011479368151296835_n.jpg'),
  heroBackground: IMG('/images/albertopantoja/hero-background.png'),
  soilHands: IMG('/images/albertopantoja/soil-hands.png'),
  rc5Logo: IMG('/images/albertopantoja/rc5-official.webp'),
  fworksLogo: IMG('/images/fworksbuilders.png')
};

// Social links
const SOCIAL_LINKS = {
  facebook: 'https://www.facebook.com/alberto.p.guzman.7/',
  tiktok: 'https://www.tiktok.com/@albertopantojasgb',
  instagram: 'https://www.instagram.com/alberto_pantoja_/'
};

// Sticky audio player — autoplay (muted) + visible controls so visitors can mute/pause
const SONG_FILENAME = '/audio/albertopantoja/alberto-pantoja-song.mp3';
// On production (Emergent host), audio is served from object storage via /api prefix
const SONG_URL = (() => {
  if (typeof window === 'undefined') return SONG_FILENAME;
  const isProduction = window.location.hostname.includes('.emergent.host') ||
                       window.location.hostname.includes('albertopantoja.');
  return isProduction ? '/api' + SONG_FILENAME : SONG_FILENAME;
})();
const SONG_LABELS = {
  es: { title: 'Canción de campaña', play: 'Reproducir', pause: 'Pausar', mute: 'Silenciar', unmute: 'Activar audio', close: 'Cerrar', volume: 'Volumen' },
  en: { title: 'Campaign song', play: 'Play', pause: 'Pause', mute: 'Mute', unmute: 'Enable audio', close: 'Close', volume: 'Volume' },
  nl: { title: 'Campagnelied', play: 'Afspelen', pause: 'Pauze', mute: 'Dempen', unmute: 'Geluid aan', close: 'Sluiten', volume: 'Volume' },
  fr: { title: 'Chanson de campagne', play: 'Lire', pause: 'Pause', mute: 'Couper', unmute: 'Activer le son', close: 'Fermer', volume: 'Volume' },
};

const SongPlayer = ({ language = 'es' }) => {
  const labels = SONG_LABELS[language] || SONG_LABELS.es;
  const audioRef = useRef(null);
  const [pref, setPref] = useState(() => {
    try { return localStorage.getItem('ap_song_pref'); } catch (e) { return null; }
  });
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [volume, setVolume] = useState(() => {
    try {
      const v = parseFloat(localStorage.getItem('ap_song_volume'));
      return Number.isFinite(v) && v >= 0 && v <= 1 ? v : 0.25;
    } catch (e) { return 0.25; }
  });
  const [showVolume, setShowVolume] = useState(false);

  // Autoplay attempt — try unmuted first; if blocked, fall back to muted + unmute on first user interaction
  useEffect(() => {
    if (pref === 'closed') return;
    const audio = audioRef.current;
    if (!audio) return;
    audio.loop = true;
    audio.volume = volume;
    audio.muted = false;

    const tryUnmuted = audio.play();
    if (tryUnmuted && typeof tryUnmuted.then === 'function') {
      tryUnmuted
        .then(() => {
          setIsPlaying(true);
          setIsMuted(false);
        })
        .catch(() => {
          // Browser blocked unmuted autoplay — start muted, then unmute on first user interaction
          audio.muted = true;
          setIsMuted(true);
          audio.play().then(() => setIsPlaying(true)).catch(() => setIsPlaying(false));

          const unmuteOnInteraction = () => {
            if (!audio) return;
            audio.muted = false;
            setIsMuted(false);
            if (audio.paused) { audio.play().then(() => setIsPlaying(true)).catch(() => {}); }
            cleanup();
          };
          const cleanup = () => {
            document.removeEventListener('click', unmuteOnInteraction);
            document.removeEventListener('touchstart', unmuteOnInteraction);
            document.removeEventListener('keydown', unmuteOnInteraction);
            document.removeEventListener('scroll', unmuteOnInteraction);
          };
          document.addEventListener('click', unmuteOnInteraction, { once: true });
          document.addEventListener('touchstart', unmuteOnInteraction, { once: true });
          document.addEventListener('keydown', unmuteOnInteraction, { once: true });
          document.addEventListener('scroll', unmuteOnInteraction, { once: true });
        });
    }
  }, []);

  // Keep audio volume in sync with state
  useEffect(() => {
    if (audioRef.current) audioRef.current.volume = volume;
    try { localStorage.setItem('ap_song_volume', String(volume)); } catch (e) { /* noop */ }
  }, [volume]);

  const togglePlay = () => {
    const audio = audioRef.current;
    if (!audio) return;
    if (audio.paused) { audio.play(); setIsPlaying(true); }
    else { audio.pause(); setIsPlaying(false); }
  };

  const toggleMute = () => {
    const audio = audioRef.current;
    if (!audio) return;
    const newMuted = !audio.muted;
    audio.muted = newMuted;
    setIsMuted(newMuted);
    if (!newMuted && audio.paused) { audio.play(); setIsPlaying(true); }
  };

  const close = () => {
    const audio = audioRef.current;
    if (audio) { audio.pause(); audio.muted = true; }
    try { localStorage.setItem('ap_song_pref', 'closed'); } catch (e) { /* noop */ }
    setPref('closed');
  };

  if (pref === 'closed') return null;

  return (
    <>
      <audio ref={audioRef} src={SONG_URL} preload="auto" data-testid="ap-song-audio" />
      <div
        className="fixed z-40 bottom-4 right-4 sm:bottom-6 sm:right-6 flex items-center gap-2 bg-white/95 backdrop-blur-md border-2 border-blue-600 rounded-full shadow-2xl px-3 py-2 transition-all hover:scale-[1.02]"
        data-testid="ap-song-player"
      >
        <div className="relative flex items-center justify-center w-8 h-8 rounded-full bg-gradient-to-br from-blue-600 to-blue-800">
          {isPlaying && !isMuted && (
            <span className="absolute inset-0 rounded-full bg-blue-500 animate-ping opacity-50"></span>
          )}
          <span className="relative text-white text-lg">♪</span>
        </div>
        <span className="hidden sm:inline text-xs font-semibold text-slate-800 max-w-[110px] truncate">
          {labels.title}
        </span>
        <button
          onClick={togglePlay}
          data-testid="ap-song-play-pause"
          aria-label={isPlaying ? labels.pause : labels.play}
          className="p-1.5 rounded-full hover:bg-blue-50 text-blue-700 transition-colors"
        >
          {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
        </button>
        <button
          onClick={toggleMute}
          data-testid="ap-song-mute"
          aria-label={isMuted ? labels.unmute : labels.mute}
          className={`p-1.5 rounded-full transition-colors ${isMuted ? 'bg-red-600 hover:bg-red-700 text-white animate-pulse' : 'hover:bg-blue-50 text-blue-700'}`}
        >
          {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
        </button>
        {/* Volume slider — toggles open on click */}
        <div className="relative">
          <button
            onClick={() => setShowVolume(v => !v)}
            data-testid="ap-song-volume-toggle"
            aria-label={labels.volume}
            className="p-1.5 rounded-full hover:bg-blue-50 text-blue-700 transition-colors text-[10px] font-bold"
          >
            {Math.round(volume * 100)}%
          </button>
          {showVolume && (
            <div className="absolute bottom-full right-0 mb-2 bg-white border-2 border-blue-600 rounded-xl shadow-lg p-2 flex items-center gap-2 w-44">
              <VolumeX className="w-3.5 h-3.5 text-slate-500 flex-shrink-0" />
              <input
                type="range"
                min="0"
                max="1"
                step="0.05"
                value={volume}
                onChange={(e) => setVolume(parseFloat(e.target.value))}
                data-testid="ap-song-volume-slider"
                className="flex-1 accent-blue-600"
              />
              <Volume2 className="w-3.5 h-3.5 text-blue-600 flex-shrink-0" />
            </div>
          )}
        </div>
        <button
          onClick={close}
          data-testid="ap-song-close"
          aria-label={labels.close}
          className="p-1 rounded-full hover:bg-slate-100 text-slate-500 transition-colors"
        >
          <X className="w-3.5 h-3.5" />
        </button>
      </div>
    </>
  );
};


const AlbertoPantojaApp = () => {
  const [language, setLanguage] = useState('es');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [visiblePhotos, setVisiblePhotos] = useState(24);
  const [visibleVideos, setVisibleVideos] = useState(12);
  const [isAdmin, setIsAdmin] = useState(false);
  const [hiddenKeys, setHiddenKeys] = useState(new Set());
  const t = translations[language];

  // Fetch hidden videos list (public) + check if current user is admin (for hide buttons)
  useEffect(() => {
    axios.get(`${API_BASE}/public/hidden-videos/albertopantoja`)
      .then(r => setHiddenKeys(new Set(r.data?.urls || [])))
      .catch(() => {});
    axios.get(`${API_BASE}/auth/me`, { withCredentials: true })
      .then(r => { if (r.data) setIsAdmin(true); })
      .catch(() => setIsAdmin(false));
  }, []);

  const hideVideo = async (video) => {
    const key = videoKey(video);
    const niceName = video.title || key;
    if (!window.confirm(`Video verbergen: "${niceName}"?\n\nDit verbergt de video voor alle bezoekers.`)) return;
    try {
      await axios.post(`${API_BASE}/admin/hide-video`,
        { site_slug: 'albertopantoja', url: key },
        { withCredentials: true }
      );
      setHiddenKeys(prev => new Set(prev).add(key));
    } catch (e) {
      alert('Fout: ' + (e.response?.data?.detail || e.message));
    }
  };

  // Scroll spy
  useEffect(() => {
    // Track page visit (was missing — fixed May 18 2026)
    trackVisit('albertopantoja', window.location.pathname);

    const handleScroll = () => {
      const sections = ['home', 'bio', 'work', 'gallery', 'media', 'contact'];
      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 100 && rect.bottom >= 100) {
            setActiveSection(section);
            break;
          }
        }
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
      setMobileMenuOpen(false);
    }
  };

  // Work area icons
  const workIcons = [Building, Home, Heart, GraduationCap, Briefcase, Users, Trophy];

  return (
    <div className="min-h-screen bg-white" style={{ fontFamily: "'Manrope', sans-serif" }}>
      {/* Google Fonts */}
      <link href="https://fonts.googleapis.com/css2?family=Manrope:wght@400;500;600;700;800&display=swap" rel="stylesheet" />

      {/* Sticky audio player — autoplay muted, visitor controls */}
      <SongPlayer language={language} />

      {/* Header - Blue theme */}
      <header className="fixed top-0 left-0 right-0 z-50 backdrop-blur-xl bg-white/90 border-b border-blue-100 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16 md:h-20">
            {/* Logo */}
            <div className="flex items-center gap-3" data-testid="header-logo">
              <img src={IMAGES.logo} alt="Alberto Pantoja" className="h-10 md:h-12 w-auto rounded-full border-2 border-blue-600" />
              <div className="hidden sm:block">
                <div className="text-blue-900 font-bold text-sm md:text-base">Alberto Pantoja</div>
                <div className="text-red-600 text-xs font-semibold">concejal de Santo Domingo</div>
              </div>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center gap-8">
              {['home', 'bio', 'work', 'gallery', 'media', 'contact'].map((section) => (
                <button
                  key={section}
                  onClick={() => scrollToSection(section)}
                  data-testid={`nav-${section}-link`}
                  className={`text-sm font-medium transition-colors ${
                    activeSection === section
                      ? 'text-red-600'
                      : 'text-blue-900 hover:text-red-600'
                  }`}
                >
                  {section === 'gallery' ? (language === 'es' ? 'Fotos' : language === 'fr' ? 'Photos' : 'Photos') : t.nav[section]}
                </button>
              ))}
            </nav>

            {/* Language Switcher & CTA */}
            <div className="flex items-center gap-4">
              {/* Language Switcher - Always visible */}
              <div className="flex items-center gap-1 text-xs sm:text-sm" data-testid="language-switcher">
                {['es', 'fr', 'en'].map((lang) => (
                  <button
                    key={lang}
                    onClick={() => setLanguage(lang)}
                    data-testid={`lang-${lang}-btn`}
                    className={`px-2 py-1 rounded transition-colors ${
                      language === lang
                        ? 'bg-blue-600 text-white'
                        : 'text-blue-900 hover:bg-blue-100'
                    }`}
                  >
                    {lang.toUpperCase()}
                  </button>
                ))}
              </div>

              {/* Social Links - Facebook, TikTok & Instagram */}
              <div className="hidden md:flex items-center gap-2">
                <a
                  href={SOCIAL_LINKS.facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                  data-testid="nav-facebook-btn"
                  className="flex items-center justify-center w-10 h-10 bg-blue-600 hover:bg-blue-700 text-white rounded-full transition-colors"
                >
                  <Facebook className="w-5 h-5" />
                </a>
                <a
                  href={SOCIAL_LINKS.tiktok}
                  target="_blank"
                  rel="noopener noreferrer"
                  data-testid="nav-tiktok-btn"
                  className="flex items-center justify-center w-10 h-10 bg-black hover:bg-gray-800 text-white rounded-full transition-colors"
                >
                  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z"/>
                  </svg>
                </a>
                <a
                  href={SOCIAL_LINKS.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  data-testid="nav-instagram-btn"
                  className="flex items-center justify-center w-10 h-10 bg-gradient-to-br from-purple-600 via-pink-500 to-orange-400 hover:opacity-90 text-white rounded-full transition-opacity"
                >
                  <Instagram className="w-5 h-5" />
                </a>
              </div>

              {/* Mobile Menu Button */}
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="md:hidden p-2 text-blue-900"
                data-testid="mobile-menu-btn"
              >
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-white border-t border-blue-100">
            <div className="px-4 py-4 space-y-3">
              {['home', 'bio', 'work', 'gallery', 'media', 'contact'].map((section) => (
                <button
                  key={section}
                  onClick={() => scrollToSection(section)}
                  data-testid={`mobile-nav-${section}`}
                  className="block w-full text-left px-3 py-2 text-blue-900 hover:bg-blue-50 rounded"
                >
                  {section === 'gallery' ? (language === 'es' ? 'Fotos' : language === 'fr' ? 'Photos' : 'Photos') : t.nav[section]}
                </button>
              ))}
              <div className="flex items-center gap-2 px-3 pt-2 border-t border-blue-100">
                {['es', 'fr', 'en'].map((lang) => (
                  <button
                    key={lang}
                    onClick={() => setLanguage(lang)}
                    className={`px-3 py-1 rounded text-sm ${
                      language === lang
                        ? 'bg-blue-600 text-white'
                        : 'text-blue-900 bg-blue-50'
                    }`}
                  >
                    {lang.toUpperCase()}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}
      </header>

      {/* Hero Section - Blue/Red/White with Video Background */}
      <section
        id="home"
        className="relative min-h-screen flex items-center justify-center pt-20 overflow-hidden"
        data-testid="hero-section"
      >
        {/* Video Background */}
        <video
          autoPlay
          loop
          muted
          playsInline
          preload="auto"
          className="absolute inset-0 w-full h-full object-cover"
          style={{ filter: 'brightness(0.5)' }}
          ref={(el) => { if (el) el.play().catch(() => {}); }}
        >
          <source src={IMG('/images/albertopantoja/hero-video.mp4')} type="video/mp4" />
        </video>
        
        {/* Blue overlay gradient - more transparent */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-900/60 via-blue-800/50 to-blue-900/60" />
        
        {/* Decorative elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-0 left-0 w-full h-2 bg-red-600" />
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-red-600/20 rounded-full blur-3xl" />
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-blue-400/20 rounded-full blur-3xl" />
        </div>

        {/* Content */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Text Content */}
            <div className="text-center lg:text-left">
              {/* Candidacy Announcement — dynamic campaign medallion with animated gold ring & shimmer */}
              <div className="relative inline-flex items-center gap-4 sm:gap-5 mb-8 group animate-float-gentle" data-testid="candidacy-banner">
                {/* AMIGO Medallion with rotating gold ring */}
                <div className="relative flex-shrink-0">
                  {/* Outer rotating gold ring */}
                  <div className="absolute inset-0 rounded-full animate-spin-medallion"
                       style={{
                         background: 'conic-gradient(from 0deg, #D4AF37, #FFD700, #B8860B, #FFD700, #D4AF37, #FFF9E5, #D4AF37)',
                         padding: '3px',
                         WebkitMask: 'radial-gradient(farthest-side, transparent calc(100% - 4px), #000 calc(100% - 4px))',
                         mask: 'radial-gradient(farthest-side, transparent calc(100% - 4px), #000 calc(100% - 4px))',
                       }} />
                  {/* Middle dark ring */}
                  <div className="absolute inset-[3px] rounded-full bg-[#1a0000]" />
                  {/* Inner glow */}
                  <div className="absolute inset-1 rounded-full bg-gradient-to-br from-red-500/40 via-transparent to-yellow-400/30 animate-pulse-slow" />
                  {/* Logo */}
                  <div className="relative w-20 h-20 sm:w-24 sm:h-24 rounded-full overflow-hidden bg-white flex items-center justify-center p-1.5 shadow-2xl">
                    <img
                      src="https://customer-assets.emergentagent.com/job_d9bb699b-4a81-4d6f-b624-bd86a4a2f156/artifacts/3g1nl9aj_amigo.jpg"
                      alt="AMIGO Lista 16"
                      className="w-full h-full object-contain group-hover:scale-110 transition-transform duration-700"
                    />
                  </div>
                  {/* Small pulsing star badge */}
                  <div className="absolute -top-1 -right-1 w-6 h-6 rounded-full bg-yellow-400 flex items-center justify-center shadow-lg animate-ping-slow">
                    <span className="text-red-700 text-xs font-bold">★</span>
                  </div>
                </div>

                {/* Text with shimmer sweep */}
                <div className="flex flex-col justify-center min-w-0 relative">
                  <div className="flex items-center gap-2 mb-0.5">
                    <span className="inline-block w-2 h-2 bg-yellow-400 rounded-full animate-pulse-slow shadow-[0_0_8px_2px_rgba(250,204,21,0.7)]"></span>
                    <span className="text-yellow-300 text-[10px] sm:text-[11px] font-bold tracking-[0.25em] uppercase drop-shadow-[0_1px_2px_rgba(0,0,0,0.6)]">
                      {t.hero.candidacy.label}
                    </span>
                  </div>

                  <div className="relative overflow-hidden">
                    <h2 className="text-2xl sm:text-4xl font-black uppercase leading-none tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-yellow-200 via-yellow-400 to-yellow-200 drop-shadow-[0_2px_8px_rgba(220,38,38,0.5)]"
                        style={{ fontFamily: 'Georgia, "Times New Roman", serif' }}>
                      Prefecto
                    </h2>
                    {/* Shimmer sweep overlay */}
                    <div className="absolute inset-0 -skew-x-12 bg-gradient-to-r from-transparent via-white/60 to-transparent w-1/3 animate-shimmer-sweep pointer-events-none" />
                  </div>

                  <div className="mt-1 text-[11px] sm:text-sm">
                    <span className="text-red-300 font-semibold tracking-wider drop-shadow-[0_1px_2px_rgba(0,0,0,0.7)]">
                      Santo Domingo · Lista 16
                    </span>
                  </div>
                </div>
              </div>

              <p className="text-red-400 text-xs md:text-sm font-semibold tracking-[0.2em] mb-4">
                {t.hero.subtitle}
              </p>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight mb-2">
                {t.hero.title}
              </h1>
              <p className="text-2xl sm:text-3xl font-bold text-red-400 mb-6">
                {t.hero.tagline}
              </p>
              <p className="text-lg md:text-xl text-blue-100 mb-8 max-w-xl mx-auto lg:mx-0">
                {t.hero.description}
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <button
                  onClick={() => scrollToSection('work')}
                  data-testid="hero-cta-btn"
                  className="inline-flex items-center justify-center gap-2 bg-red-600 hover:bg-red-700 text-white px-8 py-4 rounded-full text-lg font-semibold transition-colors shadow-lg"
                >
                  {t.hero.cta}
                  <ChevronRight className="w-5 h-5" />
                </button>
                <div className="flex gap-3 justify-center lg:justify-start">
                  <a
                    href={SOCIAL_LINKS.facebook}
                    target="_blank"
                    rel="noopener noreferrer"
                    data-testid="hero-facebook-btn"
                    className="inline-flex items-center justify-center w-14 h-14 bg-white/10 hover:bg-white/20 text-white rounded-full transition-colors border border-white/30"
                  >
                    <Facebook className="w-6 h-6" />
                  </a>
                  <a
                    href={SOCIAL_LINKS.tiktok}
                    target="_blank"
                    rel="noopener noreferrer"
                    data-testid="hero-tiktok-btn"
                    className="inline-flex items-center justify-center w-14 h-14 bg-white/10 hover:bg-white/20 text-white rounded-full transition-colors border border-white/30"
                  >
                    <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z"/>
                    </svg>
                  </a>
                  <a
                    href={SOCIAL_LINKS.instagram}
                    target="_blank"
                    rel="noopener noreferrer"
                    data-testid="hero-instagram-btn"
                    className="inline-flex items-center justify-center w-14 h-14 bg-white/10 hover:bg-white/20 text-white rounded-full transition-colors border border-white/30"
                  >
                    <Instagram className="w-6 h-6" />
                  </a>
                </div>
              </div>
            </div>

            {/* Profile Image */}
            <div className="flex justify-center lg:justify-end">
              <div className="relative">
                <div className="absolute -inset-4 bg-red-600/30 rounded-full blur-2xl" />
                <img
                  src={IMAGES.profileMain}
                  alt="Alberto Pantoja"
                  className="relative w-64 h-64 md:w-80 md:h-80 object-cover rounded-full border-4 border-white shadow-2xl"
                  data-testid="hero-profile-img"
                />
              </div>
            </div>
          </div>
        </div>

      </section>

      {/* About/Bio Section */}
      <section id="bio" className="py-20 md:py-32 bg-gray-50" data-testid="bio-section">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Image */}
            <div className="relative">
              <img
                src={IMAGES.profileBio}
                alt="Alberto Pantoja"
                className="w-full max-w-md mx-auto rounded-2xl shadow-xl"
                data-testid="bio-image"
              />
              <div className="absolute -bottom-6 -right-6 bg-blue-600 text-white p-6 rounded-2xl shadow-lg">
                <Users className="w-8 h-8" />
              </div>
            </div>

            {/* Content */}
            <div>
              <p className="text-red-600 text-xs font-semibold tracking-[0.2em] mb-4">
                {t.about.label}
              </p>
              <h2 className="text-3xl md:text-4xl font-extrabold text-blue-900 tracking-tight mb-6">
                {t.about.title}
              </h2>
              <p className="text-gray-600 text-lg mb-6 leading-relaxed">
                {t.about.description}
              </p>
              <p className="text-gray-600 text-lg mb-8 leading-relaxed">
                {t.about.mission}
              </p>

              {/* Stats */}
              <div className="grid grid-cols-3 gap-6">
                <div className="text-center p-4 bg-white rounded-xl shadow-md border-t-4 border-blue-600">
                  <div className="text-3xl font-extrabold text-blue-600">100+</div>
                  <div className="text-sm text-gray-600">{t.about.stats.sessions}</div>
                </div>
                <div className="text-center p-4 bg-white rounded-xl shadow-md border-t-4 border-red-600">
                  <div className="text-3xl font-extrabold text-red-600">14</div>
                  <div className="text-sm text-gray-600">{t.about.stats.parishes}</div>
                </div>
                <div className="text-center p-4 bg-white rounded-xl shadow-md border-t-4 border-blue-600">
                  <div className="text-3xl font-extrabold text-blue-600">50+</div>
                  <div className="text-sm text-gray-600">{t.about.stats.projects}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Work Areas Section */}
      <section id="work" className="py-20 md:py-32 bg-white" data-testid="work-section">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="text-center mb-16">
            <p className="text-red-600 text-xs font-semibold tracking-[0.2em] mb-4">
              {t.work.label}
            </p>
            <h2 className="text-3xl md:text-4xl font-extrabold text-blue-900 tracking-tight mb-4">
              {t.work.title}
            </h2>
            <p className="text-gray-600 text-lg max-w-3xl mx-auto">
              {t.work.subtitle}
            </p>
          </div>

          {/* Work Areas Grid - Compact on mobile */}
          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-8">
            {t.work.areas.map((area, index) => {
              const Icon = workIcons[index];
              return (
                <div
                  key={index}
                  className="bg-gray-50 rounded-xl md:rounded-2xl p-4 md:p-8 hover:shadow-lg transition-shadow border-l-4 border-blue-600"
                  data-testid={`work-area-${index}`}
                >
                  <div className="w-10 h-10 md:w-14 md:h-14 bg-blue-600 rounded-lg md:rounded-xl flex items-center justify-center mb-3 md:mb-6">
                    <Icon className="w-5 h-5 md:w-7 md:h-7 text-white" />
                  </div>
                  <h3 className="text-sm md:text-xl font-bold text-blue-900 mb-1 md:mb-3">{area.title}</h3>
                  <p className="text-xs md:text-base text-gray-600 line-clamp-2 md:line-clamp-none">{area.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Photo Gallery Section */}
      <section id="gallery" className="py-20 md:py-32 bg-white" data-testid="gallery-section">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="text-center mb-16">
            <p className="text-red-600 text-xs font-semibold tracking-[0.2em] mb-4">
              {language === 'es' ? 'GALERÍA' : language === 'fr' ? 'GALERIE' : 'GALLERY'}
            </p>
            <h2 className="text-3xl md:text-4xl font-extrabold text-blue-900 tracking-tight mb-4">
              {language === 'es' ? 'Momentos con la Comunidad' : language === 'fr' ? 'Moments avec la Communauté' : 'Moments with the Community'}
            </h2>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              {language === 'es' ? 'Imágenes de nuestro trabajo en las parroquias rurales de Santo Domingo de los Tsáchilas' : 
               language === 'fr' ? 'Images de notre travail dans les paroisses rurales de Santo Domingo de los Tsáchilas' :
               'Images from our work in the rural parishes of Santo Domingo de los Tsáchilas'}
            </p>
          </div>

          {/* Photo Grid */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {GALLERY_PHOTO_PATHS.slice(0, visiblePhotos).map((photoPath, index) => (
              <div
                key={index}
                className="relative aspect-square overflow-hidden rounded-xl group cursor-pointer"
                data-testid={`gallery-photo-${index}`}
              >
                <img
                  src={IMG(photoPath)}
                  alt={`Alberto Pantoja - Foto ${index + 1}`}
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                  style={{ opacity: 1 }}
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-blue-900/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>
            ))}
          </div>

          {/* Load More / View More Buttons */}
          <div className="text-center mt-12 space-y-4">
            {visiblePhotos < GALLERY_PHOTO_PATHS.length && (
              <button
                onClick={() => setVisiblePhotos(prev => Math.min(prev + 24, GALLERY_PHOTO_PATHS.length))}
                data-testid="load-more-photos-btn"
                className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-full text-lg font-semibold transition-colors mr-4"
              >
                {language === 'es' ? `Cargar más fotos (${GALLERY_PHOTO_PATHS.length - visiblePhotos} restantes)` : 
                 language === 'fr' ? `Charger plus de photos (${GALLERY_PHOTO_PATHS.length - visiblePhotos} restantes)` :
                 `Load more photos (${GALLERY_PHOTO_PATHS.length - visiblePhotos} remaining)`}
              </button>
            )}
            <a
              href={SOCIAL_LINKS.facebook}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-white border-2 border-blue-600 text-blue-600 hover:bg-blue-50 px-8 py-4 rounded-full text-lg font-semibold transition-colors"
            >
              <Facebook className="w-5 h-5" />
              {language === 'es' ? 'Ver más en Facebook' : language === 'fr' ? 'Voir plus sur Facebook' : 'See more on Facebook'}
            </a>
          </div>
          
          {/* Photo count indicator */}
          <p className="text-center text-gray-500 mt-4 text-sm">
            {language === 'es' ? `Mostrando ${visiblePhotos} de ${GALLERY_PHOTO_PATHS.length} fotos` : 
             language === 'fr' ? `Affichage de ${visiblePhotos} sur ${GALLERY_PHOTO_PATHS.length} photos` :
             `Showing ${visiblePhotos} of ${GALLERY_PHOTO_PATHS.length} photos`}
          </p>
        </div>
      </section>

      {/* Media/Videos Section */}
      <section id="media" className="py-20 md:py-32 bg-gray-50" data-testid="media-section">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="text-center mb-16">
            <p className="text-red-600 text-xs font-semibold tracking-[0.2em] mb-4">
              {t.media.label}
            </p>
            <h2 className="text-3xl md:text-4xl font-extrabold text-blue-900 tracking-tight mb-4">
              {t.media.title}
            </h2>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              {t.media.subtitle}
            </p>
          </div>

          {/* Video Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {WORKING_VIDEOS.filter(v => !hiddenKeys.has(videoKey(v))).slice(0, visibleVideos).map((video, index) => (
              <div
                key={index}
                className="relative bg-white rounded-2xl overflow-hidden shadow-lg group"
                data-testid={`video-card-${index}`}
              >
                {/* Admin-only "Hide" button — appears top-right when logged in */}
                {isAdmin && (
                  <button
                    onClick={() => hideVideo(video)}
                    data-testid={`video-hide-btn-${index}`}
                    title="Verberg deze video (alleen jij ziet deze knop)"
                    className="absolute top-2 right-2 z-10 p-2 rounded-full bg-rose-600 hover:bg-rose-700 text-white shadow-lg opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                )}
                <div className="aspect-video">
                  {video.type === 'youtube' ? (
                    <iframe
                      src={`https://www.youtube.com/embed/${video.id}`}
                      title={video.title}
                      className="w-full h-full"
                      frameBorder="0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    />
                  ) : video.type === 'facebook_reel' ? (
                    <iframe
                      src={`https://www.facebook.com/plugins/video.php?href=${encodeURIComponent(video.url)}&show_text=0&width=560`}
                      title={video.title}
                      className="w-full h-full"
                      frameBorder="0"
                      allow="autoplay; clipboard-write; encrypted-media; picture-in-picture"
                      allowFullScreen
                    />
                  ) : (
                    <iframe
                      src={`https://www.facebook.com/plugins/video.php?href=${encodeURIComponent(video.url)}&show_text=0&width=560`}
                      title={video.title}
                      className="w-full h-full"
                      frameBorder="0"
                      allow="autoplay; clipboard-write; encrypted-media; picture-in-picture"
                      allowFullScreen
                    />
                  )}
                </div>
                <div className="p-4">
                  <div className="flex items-center gap-2 mb-2">
                    {video.type === 'youtube' ? (
                      <Youtube className="w-5 h-5 text-red-600" />
                    ) : video.type === 'facebook_reel' ? (
                      <svg className="w-5 h-5 text-blue-600" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 14.5v-9l6 4.5-6 4.5z"/>
                      </svg>
                    ) : (
                      <Facebook className="w-5 h-5 text-blue-600" />
                    )}
                    <span className="text-xs text-gray-500 uppercase">
                      {video.type === 'youtube' ? 'YouTube' : video.type === 'facebook_reel' ? 'Reel' : 'Facebook'}
                    </span>
                  </div>
                  <h3 className="font-semibold text-blue-900">{video.title}</h3>
                </div>
              </div>
            ))}
          </div>

          {/* Load More Button & Counter */}
          <div className="text-center mt-12 space-y-4">
            {(() => {
              const visibleList = WORKING_VIDEOS.filter(v => !hiddenKeys.has(videoKey(v)));
              const remaining = visibleList.length - visibleVideos;
              if (remaining <= 0) return null;
              return (
                <button
                  onClick={() => setVisibleVideos(prev => Math.min(prev + 6, visibleList.length))}
                  data-testid="load-more-videos-btn"
                  className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-full text-lg font-semibold transition-colors mr-4"
                >
                  {language === 'es' ? `Cargar más videos (${remaining} restantes)` :
                   language === 'fr' ? `Charger plus de vidéos (${remaining} restantes)` :
                   `Load more videos (${remaining} remaining)`}
                </button>
              );
            })()}
            <a
              href={SOCIAL_LINKS.facebook}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-white border-2 border-blue-600 text-blue-600 hover:bg-blue-50 px-8 py-4 rounded-full text-lg font-semibold transition-colors"
            >
              <Facebook className="w-5 h-5" />
              {language === 'es' ? 'Ver más en Facebook' : language === 'fr' ? 'Voir plus sur Facebook' : 'See more on Facebook'}
            </a>
          </div>
          
          {/* Video count indicator */}
          <p className="text-center text-gray-500 mt-4 text-sm">
            {language === 'es' ? `Mostrando ${visibleVideos} de ${WORKING_VIDEOS.length} videos` : 
             language === 'fr' ? `Affichage de ${visibleVideos} sur ${WORKING_VIDEOS.length} vidéos` :
             `Showing ${visibleVideos} of ${WORKING_VIDEOS.length} videos`}
          </p>

          {/* Social Links */}
          <div className="mt-12 text-center">
            <p className="text-gray-600 mb-4">Síguenos en redes sociales</p>
            <div className="flex justify-center gap-4">
              <a
                href={SOCIAL_LINKS.facebook}
                target="_blank"
                rel="noopener noreferrer"
                data-testid="social-facebook"
                className="w-12 h-12 bg-blue-600 text-white rounded-full flex items-center justify-center hover:bg-blue-700 transition-colors"
              >
                <Facebook className="w-6 h-6" />
              </a>
              <a
                href={SOCIAL_LINKS.tiktok}
                target="_blank"
                rel="noopener noreferrer"
                data-testid="social-tiktok"
                className="w-12 h-12 bg-black text-white rounded-full flex items-center justify-center hover:bg-gray-800 transition-colors"
              >
                <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z"/>
                </svg>
              </a>
              <a
                href={SOCIAL_LINKS.instagram}
                target="_blank"
                rel="noopener noreferrer"
                data-testid="social-instagram"
                className="w-12 h-12 bg-gradient-to-br from-purple-600 via-pink-500 to-orange-400 text-white rounded-full flex items-center justify-center hover:opacity-90 transition-opacity"
              >
                <Instagram className="w-6 h-6" />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Political Position Section - RC5 */}
      <section className="py-20 md:py-32 bg-blue-900" data-testid="position-section">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-5 gap-12 items-center">
            {/* Content - takes 2 columns */}
            <div className="lg:col-span-2">
              <p className="text-red-400 text-xs font-semibold tracking-[0.2em] mb-4">
                {t.position.label}
              </p>
              <div className="flex items-center gap-4 mb-6">
                {/* Official RC5 Logo - clickable */}
                <a href="https://revolucionciudadana.com.ec/" target="_blank" rel="noopener noreferrer" className="bg-black rounded-xl p-3 hover:opacity-90 transition-opacity">
                  <img src={IMAGES.rc5Logo} alt="RC5 Revolución Ciudadana" className="h-16 w-auto" />
                </a>
              </div>
              <p className="text-2xl text-red-400 font-semibold mb-6">
                {t.position.subtitle}
              </p>
              <p className="text-blue-100 text-lg mb-8 leading-relaxed">
                {t.position.description}
              </p>

              {/* Points */}
              <ul className="space-y-4">
                {t.position.points.map((point, index) => (
                  <li key={index} className="flex items-center gap-3 text-white">
                    <div className="w-8 h-8 bg-red-600 rounded-full flex items-center justify-center flex-shrink-0">
                      <ChevronRight className="w-5 h-5" />
                    </div>
                    <span className="text-lg">{point}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* RC5 Correa Image - takes 3 columns */}
            <div className="lg:col-span-3 flex justify-center lg:justify-end">
              <a 
                href="https://revolucionciudadana.com.ec/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="relative group"
              >
                <div className="absolute -inset-4 bg-red-600/30 rounded-2xl blur-2xl group-hover:bg-red-600/40 transition-colors" />
                <img
                  src={IMG('/images/albertopantoja/rc5-correa.jpg')}
                  alt="Revolución Ciudadana"
                  className="relative rounded-2xl shadow-2xl w-full min-w-[500px] max-w-[700px] border-4 border-white/20 group-hover:border-red-500/50 transition-colors"
                  style={{ filter: 'saturate(0.8) contrast(1.1) brightness(1.05)', opacity: 1 }}
                />
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-t from-blue-900/40 to-transparent" />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 md:py-32 bg-white" data-testid="contact-section">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="text-center mb-12">
            <p className="text-red-600 text-xs font-semibold tracking-[0.2em] mb-4">
              {t.contact.label}
            </p>
            <h2 className="text-3xl md:text-4xl font-extrabold text-blue-900 tracking-tight mb-4">
              {t.contact.title}
            </h2>
            <p className="text-gray-600 text-lg">
              {t.contact.subtitle}
            </p>
          </div>

          {/* Contact Info */}
          <div className="flex flex-wrap justify-center gap-8 mb-12">
            <div className="flex items-center gap-3 text-gray-600">
              <MapPin className="w-5 h-5 text-red-600" />
              <span>{t.contact.address}</span>
            </div>
            <a
              href="https://wa.me/593983609973"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 text-gray-600 hover:text-green-600 transition-colors"
            >
              <svg className="w-5 h-5 text-green-600" viewBox="0 0 24 24" fill="currentColor">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
              </svg>
              <span>WhatsApp</span>
            </a>
          </div>

          {/* JotForm Embed Placeholder */}
          <div className="bg-gray-50 rounded-2xl p-8 shadow-lg border border-gray-200" data-testid="contact-form-container">
            <div className="text-center text-gray-600">
              <Mail className="w-12 h-12 mx-auto mb-4 text-blue-600" />
              <p className="text-lg font-semibold text-blue-900 mb-2">Formulario de Contacto</p>
              <p className="text-sm mb-4">JotForm será integrado aquí</p>
              {/* JotForm iframe placeholder - replace with actual form ID */}
              <div className="bg-white rounded-xl p-8 min-h-[400px] flex items-center justify-center border-2 border-dashed border-gray-300">
                <p className="text-gray-500">
                  Inserte el enlace de JotForm para activar el formulario de contacto
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-blue-900 py-12" data-testid="footer">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-8">
            {/* Logo & Slogan */}
            <div className="text-center md:text-left">
              <div className="flex items-center justify-center md:justify-start gap-3 mb-2">
                <img src={IMAGES.logo} alt="Alberto Pantoja" className="h-10 w-auto rounded-full border-2 border-white" />
                <span className="text-white font-bold">Alberto Pantoja</span>
              </div>
              <p className="text-blue-200 text-sm">{t.footer.slogan}</p>
            </div>

            {/* Social Links */}
            <div className="flex gap-4">
              <a
                href={SOCIAL_LINKS.facebook}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-200 hover:text-red-400 transition-colors"
              >
                <Facebook className="w-6 h-6" />
              </a>
              <a
                href={SOCIAL_LINKS.tiktok}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-200 hover:text-red-400 transition-colors"
              >
                <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z"/>
                </svg>
              </a>
              <a
                href={SOCIAL_LINKS.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-200 hover:text-red-400 transition-colors"
              >
                <Instagram className="w-6 h-6" />
              </a>
            </div>

            {/* Webmaster */}
            <div className="text-center md:text-right">
              <p className="text-blue-300 text-xs mb-2">{t.footer.webmaster}</p>
              <a
                href="https://fworksbuilders.com"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block"
              >
                <img src={IMAGES.fworksLogo} alt="fworksbuilders" className="h-6 w-auto opacity-60 hover:opacity-100 transition-opacity" />
              </a>
            </div>
          </div>

          <div className="mt-8 pt-8 border-t border-white/10 text-center">
            <p className="text-blue-300 text-sm">
              © {new Date().getFullYear()} Alberto Pantoja. {t.footer.rights}.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default AlbertoPantojaApp;
