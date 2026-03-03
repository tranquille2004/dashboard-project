import React, { useState } from 'react';
import Hero from '../components/Hero';
import { X } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { allTranslations } from '../translations/allTranslations';

const Gallery = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const { currentLanguage } = useLanguage();
  const t = allTranslations.gallery[currentLanguage] || allTranslations.gallery.nl;

  const galleryImages = [
    // WhatsApp images van home page
    'https://ascolizaventem.weebly.com/uploads/1/0/1/5/101515486/whatsapp-image-2025-04-01-04-58-23-22885cf8_orig.jpg',
    'https://ascolizaventem.weebly.com/uploads/1/0/1/5/101515486/whatsapp-image-2025-04-03-04-43-39-02471e93_orig.jpg',
    'https://ascolizaventem.weebly.com/uploads/1/0/1/5/101515486/whatsapp-image-2025-04-03-04-44-17-a8d120fb_orig.jpg',
    'https://ascolizaventem.weebly.com/uploads/1/0/1/5/101515486/whatsapp-image-2025-04-03-04-45-00-af3787a2_orig.jpg',
    'https://ascolizaventem.weebly.com/uploads/1/0/1/5/101515486/whatsapp-image-2025-04-03-04-45-19-dc927aca_orig.jpg',
    'https://ascolizaventem.weebly.com/uploads/1/0/1/5/101515486/whatsapp-image-2025-04-03-04-47-10-e8195e67_orig.jpg',
    
    // IMG series
    'https://ascolizaventem.weebly.com/uploads/1/0/1/5/101515486/img-6046_1_orig.jpg',
    'https://ascolizaventem.weebly.com/uploads/1/0/1/5/101515486/img-5497_1_orig.jpg',
    'https://ascolizaventem.weebly.com/uploads/1/0/1/5/101515486/img-5548_orig.jpg',
    'https://ascolizaventem.weebly.com/uploads/1/0/1/5/101515486/img-5673_orig.jpg',
    'https://ascolizaventem.weebly.com/uploads/1/0/1/5/101515486/img-5674_orig.jpg',
    'https://ascolizaventem.weebly.com/uploads/1/0/1/5/101515486/img-5677_orig.jpg',
    'https://ascolizaventem.weebly.com/uploads/1/0/1/5/101515486/img-5685.jpg',
    'https://ascolizaventem.weebly.com/uploads/1/0/1/5/101515486/img-5701.jpg',
    'https://ascolizaventem.weebly.com/uploads/1/0/1/5/101515486/img-5714_1.jpg',
    'https://ascolizaventem.weebly.com/uploads/1/0/1/5/101515486/img-5744.jpg',
    'https://ascolizaventem.weebly.com/uploads/1/0/1/5/101515486/img-5746_orig.jpg',
    'https://ascolizaventem.weebly.com/uploads/1/0/1/5/101515486/img-5769.jpg',
    'https://ascolizaventem.weebly.com/uploads/1/0/1/5/101515486/img-5788_orig.jpg',
    'https://ascolizaventem.weebly.com/uploads/1/0/1/5/101515486/img-5797.jpg',
    'https://ascolizaventem.weebly.com/uploads/1/0/1/5/101515486/img-5801_orig.jpg',
    'https://ascolizaventem.weebly.com/uploads/1/0/1/5/101515486/img-5812.jpg',
    'https://ascolizaventem.weebly.com/uploads/1/0/1/5/101515486/img-5849_orig.jpg',
    'https://ascolizaventem.weebly.com/uploads/1/0/1/5/101515486/img-5850.jpg',
    'https://ascolizaventem.weebly.com/uploads/1/0/1/5/101515486/img-5857_orig.jpg',
    'https://ascolizaventem.weebly.com/uploads/1/0/1/5/101515486/img-5869.jpg',
    'https://ascolizaventem.weebly.com/uploads/1/0/1/5/101515486/img-5879_orig.jpg',
    'https://ascolizaventem.weebly.com/uploads/1/0/1/5/101515486/img-5880.jpg',
    'https://ascolizaventem.weebly.com/uploads/1/0/1/5/101515486/img-5889_orig.jpg',
    'https://ascolizaventem.weebly.com/uploads/1/0/1/5/101515486/img-5927.jpg',
    'https://ascolizaventem.weebly.com/uploads/1/0/1/5/101515486/img-5928_orig.jpg',
    'https://ascolizaventem.weebly.com/uploads/1/0/1/5/101515486/img-5933.jpg',
    'https://ascolizaventem.weebly.com/uploads/1/0/1/5/101515486/img-5947_orig.jpg',
    'https://ascolizaventem.weebly.com/uploads/1/0/1/5/101515486/img-5948.jpg',
    'https://ascolizaventem.weebly.com/uploads/1/0/1/5/101515486/img-5986_orig.jpg',
    'https://ascolizaventem.weebly.com/uploads/1/0/1/5/101515486/img-5988.jpg',
    'https://ascolizaventem.weebly.com/uploads/1/0/1/5/101515486/img-6015_orig.jpg',
    'https://ascolizaventem.weebly.com/uploads/1/0/1/5/101515486/img-6029.jpg',
    'https://ascolizaventem.weebly.com/uploads/1/0/1/5/101515486/img-6039_orig.jpg',
    
    // Facebook numbered images
    'https://ascolizaventem.weebly.com/uploads/1/0/1/5/101515486/169411-385984901480862-203349961-o.jpg',
    'https://ascolizaventem.weebly.com/uploads/1/0/1/5/101515486/182330-333084176770935-1117883968-n.jpg',
    'https://ascolizaventem.weebly.com/uploads/1/0/1/5/101515486/197716-333122696767083-1155574542-n.jpg',
    'https://ascolizaventem.weebly.com/uploads/1/0/1/5/101515486/205381-333121426767210-1247916254-n.jpg',
    'https://ascolizaventem.weebly.com/uploads/1/0/1/5/101515486/229972-333122243433795-457428830-n.jpg',
    'https://ascolizaventem.weebly.com/uploads/1/0/1/5/101515486/251975-333084096770943-1356252185-n.jpg',
    'https://ascolizaventem.weebly.com/uploads/1/0/1/5/101515486/255285-333121310100555-1472928157-n.jpg',
    'https://ascolizaventem.weebly.com/uploads/1/0/1/5/101515486/255321-333084590104227-1437982470-n.jpg',
    'https://ascolizaventem.weebly.com/uploads/1/0/1/5/101515486/255388-333082793437740-378573578-n.jpg',
    'https://ascolizaventem.weebly.com/uploads/1/0/1/5/101515486/282321-333085086770844-819522197-n.jpg',
    'https://ascolizaventem.weebly.com/uploads/1/0/1/5/101515486/283704-333122643433755-1629869143-n.jpg',
    'https://ascolizaventem.weebly.com/uploads/1/0/1/5/101515486/292329-333121876767165-272439284-n.jpg',
    'https://ascolizaventem.weebly.com/uploads/1/0/1/5/101515486/292385-333122373433782-954650644-n.jpg',
    'https://ascolizaventem.weebly.com/uploads/1/0/1/5/101515486/303552-333083143437705-1087960295-n.jpg',
    'https://ascolizaventem.weebly.com/uploads/1/0/1/5/101515486/318422-359273720818647-1945642442-n.jpg',
    'https://ascolizaventem.weebly.com/uploads/1/0/1/5/101515486/333497-362660580479961-522768784-o.jpg',
    'https://ascolizaventem.weebly.com/uploads/1/0/1/5/101515486/376397-333083623437657-83815547-n_1.jpg',
    'https://ascolizaventem.weebly.com/uploads/1/0/1/5/101515486/376480-333083706770982-1778830359-n.jpg',
    'https://ascolizaventem.weebly.com/uploads/1/0/1/5/101515486/376494-333121523433867-740381803-n.jpg',
    'https://ascolizaventem.weebly.com/uploads/1/0/1/5/101515486/376545-333086103437409-1809843103-n.jpg',
    'https://ascolizaventem.weebly.com/uploads/1/0/1/5/101515486/382543-333121550100531-1406964291-n.jpg',
    'https://ascolizaventem.weebly.com/uploads/1/0/1/5/101515486/394646-333082916771061-724606439-n.jpg',
    'https://ascolizaventem.weebly.com/uploads/1/0/1/5/101515486/396836-333121250100561-1381786768-n.jpg',
    'https://ascolizaventem.weebly.com/uploads/1/0/1/5/101515486/397675-333084970104189-703309647-n.jpg',
    'https://ascolizaventem.weebly.com/uploads/1/0/1/5/101515486/397728-333121970100489-1334003568-n.jpg',
    'https://ascolizaventem.weebly.com/uploads/1/0/1/5/101515486/403498-333084296770923-868509162-n.jpg',
    'https://ascolizaventem.weebly.com/uploads/1/0/1/5/101515486/426358-333086296770723-587515597-n.jpg',
    'https://ascolizaventem.weebly.com/uploads/1/0/1/5/101515486/428825-333122740100412-521262302-n.jpg',
    'https://ascolizaventem.weebly.com/uploads/1/0/1/5/101515486/459369-406807212731964-25071634-o.jpg',
    'https://ascolizaventem.weebly.com/uploads/1/0/1/5/101515486/483205-333085933437426-116654710-n.jpg',
    'https://ascolizaventem.weebly.com/uploads/1/0/1/5/101515486/484489-333086160104070-1493768514-n.jpg',
    'https://ascolizaventem.weebly.com/uploads/1/0/1/5/101515486/487312-333086033437416-1746005526-n.jpg',
    'https://ascolizaventem.weebly.com/uploads/1/0/1/5/101515486/487390-333083216771031-802463534-n.jpg',
    'https://ascolizaventem.weebly.com/uploads/1/0/1/5/101515486/522073-333082566771096-396489776-n.jpg',
    'https://ascolizaventem.weebly.com/uploads/1/0/1/5/101515486/525936-333122163433803-904136638-n.jpg',
    'https://ascolizaventem.weebly.com/uploads/1/0/1/5/101515486/527883-333122310100455-1705567818-n.jpg',
    'https://ascolizaventem.weebly.com/uploads/1/0/1/5/101515486/529377-333122270100459-220724913-n.jpg',
    'https://ascolizaventem.weebly.com/uploads/1/0/1/5/101515486/529385-333121920100494-840111479-n.jpg',
    'https://ascolizaventem.weebly.com/uploads/1/0/1/5/101515486/532484-333121363433883-1943680454-n.jpg',
    'https://ascolizaventem.weebly.com/uploads/1/0/1/5/101515486/539486-333083916770961-723750862-n.jpg',
    'https://ascolizaventem.weebly.com/uploads/1/0/1/5/101515486/540527-333084463437573-920446636-n.jpg',
    'https://ascolizaventem.weebly.com/uploads/1/0/1/5/101515486/540560-333085130104173-2005742295-n.jpg',
    'https://ascolizaventem.weebly.com/uploads/1/0/1/5/101515486/545155-333085456770807-1084091903-n.jpg',
    'https://ascolizaventem.weebly.com/uploads/1/0/1/5/101515486/553772-333084670104219-1244553572-n.jpg',
    'https://ascolizaventem.weebly.com/uploads/1/0/1/5/101515486/557080-333086223437397-1682125667-n.jpg',
    'https://ascolizaventem.weebly.com/uploads/1/0/1/5/101515486/557179-333086266770726-1915611778-n.jpg',
    'https://ascolizaventem.weebly.com/uploads/1/0/1/5/101515486/557419-359268287485857-2052248987-n.jpg',
    'https://ascolizaventem.weebly.com/uploads/1/0/1/5/101515486/562706-333121783433841-1097097422-n.jpg',
    'https://ascolizaventem.weebly.com/uploads/1/0/1/5/101515486/562711-333122720100414-2076518887-n.jpg',
    'https://ascolizaventem.weebly.com/uploads/1/0/1/5/101515486/562858-333121850100501-1542542216-n.jpg',
    'https://ascolizaventem.weebly.com/uploads/1/0/1/5/101515486/562864-333083836770969-417064798-n.jpg',
    'https://ascolizaventem.weebly.com/uploads/1/0/1/5/101515486/562908-333083030104383-2068179430-n.jpg',
    'https://ascolizaventem.weebly.com/uploads/1/0/1/5/101515486/575365-333082716771081-2145551297-n.jpg',
    'https://ascolizaventem.weebly.com/uploads/1/0/1/5/101515486/575617-333122333433786-1080339655-n.jpg',
    'https://ascolizaventem.weebly.com/uploads/1/0/1/5/101515486/582207-333084046770948-1380189215-n.jpg',
    'https://ascolizaventem.weebly.com/uploads/1/0/1/5/101515486/598876-333121836767169-398523122-n.jpg',
    'https://ascolizaventem.weebly.com/uploads/1/0/1/5/101515486/602558-333085396770813-1124849477-n.jpg',
    'https://ascolizaventem.weebly.com/uploads/1/0/1/5/101515486/621674-359267387485947-1058145216-o.jpg',
    'https://ascolizaventem.weebly.com/uploads/1/0/1/5/101515486/644419-359273764151976-1461805831-n.jpg',
    'https://ascolizaventem.weebly.com/uploads/1/0/1/5/101515486/737449-406806959398656-1908575789-o.jpg',
    'https://ascolizaventem.weebly.com/uploads/1/0/1/5/101515486/1146853-800539433358738-8205662333664647040-o.jpg',
    'https://ascolizaventem.weebly.com/uploads/1/0/1/5/101515486/1555431-756607277751954-8746856432459200280-n.jpg',
    'https://ascolizaventem.weebly.com/uploads/1/0/1/5/101515486/1557161-769780396434642-665577081680491253-o.jpg',
    'https://ascolizaventem.weebly.com/uploads/1/0/1/5/101515486/1965606-800539653358716-4433902469632126427-o.jpg',
    'https://ascolizaventem.weebly.com/uploads/1/0/1/5/101515486/10506702-756607441085271-1639151473056636647-o_1.jpg',
    'https://ascolizaventem.weebly.com/uploads/1/0/1/5/101515486/10887584-800539603358721-5008044500598867271-o.jpg',
    'https://ascolizaventem.weebly.com/uploads/1/0/1/5/101515486/10982331-793530434059638-265323003088619962-o_1.jpg',
    'https://ascolizaventem.weebly.com/uploads/1/0/1/5/101515486/10987725-793525214060160-5935937181240242479-o.jpg',
    
    // WhatsApp 2018 images
    'https://ascolizaventem.weebly.com/uploads/1/0/1/5/101515486/whatsapp-image-2018-12-09-at-14-14-16.jpeg',
    'https://ascolizaventem.weebly.com/uploads/1/0/1/5/101515486/whatsapp-image-2018-12-09-at-14-26-40.jpeg',
    'https://ascolizaventem.weebly.com/uploads/1/0/1/5/101515486/whatsapp-image-2018-12-09-at-14-27-44.jpeg',
    'https://ascolizaventem.weebly.com/uploads/1/0/1/5/101515486/whatsapp-image-2018-12-09-at-14-29-01.jpeg',
    'https://ascolizaventem.weebly.com/uploads/1/0/1/5/101515486/whatsapp-image-2018-12-09-at-14-30-19.jpeg',
    'https://ascolizaventem.weebly.com/uploads/1/0/1/5/101515486/whatsapp-image-2018-12-09-at-14-32-48.jpeg',
    'https://ascolizaventem.weebly.com/uploads/1/0/1/5/101515486/whatsapp-image-2018-12-09-at-14-33-57.jpeg',
    'https://ascolizaventem.weebly.com/uploads/1/0/1/5/101515486/whatsapp-image-2018-12-09-at-14-34-46.jpeg',
    'https://ascolizaventem.weebly.com/uploads/1/0/1/5/101515486/whatsapp-image-2018-12-09-at-14-36-46.jpeg',
    'https://ascolizaventem.weebly.com/uploads/1/0/1/5/101515486/whatsapp-image-2018-12-16-at-14-52-37.jpeg',
    
    // WebP images
    'https://ascolizaventem.weebly.com/uploads/1/0/1/5/101515486/unnamed.webp',
    'https://ascolizaventem.weebly.com/uploads/1/0/1/5/101515486/unnamed-1.webp',
    'https://ascolizaventem.weebly.com/uploads/1/0/1/5/101515486/unnamed-2.webp',
    'https://ascolizaventem.weebly.com/uploads/1/0/1/5/101515486/unnamed-3.webp',
    'https://ascolizaventem.weebly.com/uploads/1/0/1/5/101515486/unnamed-4.webp',
    'https://ascolizaventem.weebly.com/uploads/1/0/1/5/101515486/unnamed-5.webp',
    'https://ascolizaventem.weebly.com/uploads/1/0/1/5/101515486/unnamed-6.webp',
    'https://ascolizaventem.weebly.com/uploads/1/0/1/5/101515486/unnamed-7.webp',
    'https://ascolizaventem.weebly.com/uploads/1/0/1/5/101515486/unnamed-8.webp',
    'https://ascolizaventem.weebly.com/uploads/1/0/1/5/101515486/unnamed-9.webp',
    'https://ascolizaventem.weebly.com/uploads/1/0/1/5/101515486/unnamed-10.webp',
    'https://ascolizaventem.weebly.com/uploads/1/0/1/5/101515486/unnamed-11.webp',
    'https://ascolizaventem.weebly.com/uploads/1/0/1/5/101515486/unnamed-12.webp',
    'https://ascolizaventem.weebly.com/uploads/1/0/1/5/101515486/unnamed-13.webp',
    'https://ascolizaventem.weebly.com/uploads/1/0/1/5/101515486/unnamed-14.webp',
    'https://ascolizaventem.weebly.com/uploads/1/0/1/5/101515486/unnamed-15.webp',
    'https://ascolizaventem.weebly.com/uploads/1/0/1/5/101515486/unnamed-16.webp',
    'https://ascolizaventem.weebly.com/uploads/1/0/1/5/101515486/unnamed-17.webp',
    'https://ascolizaventem.weebly.com/uploads/1/0/1/5/101515486/unnamed-18.webp',
    'https://ascolizaventem.weebly.com/uploads/1/0/1/5/101515486/unnamed-19.webp',
    'https://ascolizaventem.weebly.com/uploads/1/0/1/5/101515486/unnamed-20.webp',
    'https://ascolizaventem.weebly.com/uploads/1/0/1/5/101515486/unnamed-21.webp',
    'https://ascolizaventem.weebly.com/uploads/1/0/1/5/101515486/unnamed-22.webp',
    'https://ascolizaventem.weebly.com/uploads/1/0/1/5/101515486/unnamed-23.webp',
    'https://ascolizaventem.weebly.com/uploads/1/0/1/5/101515486/unnamed-24.webp',
    'https://ascolizaventem.weebly.com/uploads/1/0/1/5/101515486/unnamed-25.webp',
    
    // Main images from home
    'https://ascolizaventem.weebly.com/uploads/1/0/1/5/101515486/20689781-1380875678699421-9174551204022883676-o_1_orig.jpg',
    'https://ascolizaventem.weebly.com/uploads/1/0/1/5/101515486/45280374-1885058464947804-146153777123033088-o_2_orig.jpg',
  ];

  return (
    <div className="min-h-screen bg-[#1a1a1a]">
      <Hero
        title={t.title}
        subtitle={t.subtitle}
        image="https://ascolizaventem.weebly.com/uploads/1/0/1/5/101515486/img-5879_orig.jpg"
      />

      <section className="py-16 bg-[#1a1a1a]">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {galleryImages.map((image, index) => (
              <div
                key={index}
                className="aspect-square overflow-hidden rounded-sm cursor-pointer group"
                onClick={() => setSelectedImage(image)}
              >
                <img
                  src={image}
                  alt={`Gallery ${index + 1}`}
                  className="w-full h-full object-cover hover:scale-110 transition-transform duration-500"
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Lightbox */}
      {selectedImage && (
        <div
          className="fixed inset-0 z-50 bg-[#1a1a1a]/95 flex items-center justify-center p-4"
          onClick={() => setSelectedImage(null)}
        >
          <button
            className="absolute top-4 right-4 text-white hover:text-[#6b1f1f] transition-colors"
            onClick={() => setSelectedImage(null)}
          >
            <X className="w-8 h-8" />
          </button>
          <img
            src={selectedImage}
            alt="Selected"
            className="max-w-full max-h-full object-contain"
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )}
    </div>
  );
};

export default Gallery;
