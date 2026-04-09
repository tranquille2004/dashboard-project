import { useEffect } from 'react';

const SEO = ({ 
  title, 
  description, 
  keywords, 
  image, 
  url, 
  type = 'website',
  locale = 'nl_BE',
  siteName,
  // Hotel-specific props
  hotelData = null,
  alternateLanguages = null
}) => {
  useEffect(() => {
    // Update document title
    document.title = title;
    
    // Helper function to update or create meta tag
    const setMeta = (name, content, isProperty = false) => {
      if (!content) return;
      const attr = isProperty ? 'property' : 'name';
      let meta = document.querySelector(`meta[${attr}="${name}"]`);
      if (!meta) {
        meta = document.createElement('meta');
        meta.setAttribute(attr, name);
        document.head.appendChild(meta);
      }
      meta.setAttribute('content', content);
    };
    
    // Basic meta tags
    setMeta('description', description);
    setMeta('keywords', keywords);
    setMeta('robots', 'index, follow');
    setMeta('author', siteName);
    setMeta('geo.region', hotelData?.geoRegion || '');
    setMeta('geo.placename', hotelData?.geoPlacename || '');
    setMeta('geo.position', hotelData?.geoPosition || '');
    setMeta('ICBM', hotelData?.geoPosition || '');
    
    // Open Graph tags (Facebook, LinkedIn, etc.)
    setMeta('og:title', title, true);
    setMeta('og:description', description, true);
    setMeta('og:image', image, true);
    setMeta('og:image:width', '1200', true);
    setMeta('og:image:height', '630', true);
    setMeta('og:image:alt', title, true);
    setMeta('og:url', url, true);
    setMeta('og:type', type, true);
    setMeta('og:locale', locale, true);
    setMeta('og:site_name', siteName, true);
    
    // Twitter Card tags
    setMeta('twitter:card', 'summary_large_image');
    setMeta('twitter:title', title);
    setMeta('twitter:description', description);
    setMeta('twitter:image', image);
    setMeta('twitter:image:alt', title);
    
    // Additional SEO tags
    setMeta('theme-color', hotelData?.themeColor || '#4A7C59');
    setMeta('apple-mobile-web-app-title', siteName);
    setMeta('application-name', siteName);
    setMeta('msapplication-TileColor', hotelData?.themeColor || '#4A7C59');
    
    // Canonical URL
    let canonical = document.querySelector('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement('link');
      canonical.setAttribute('rel', 'canonical');
      document.head.appendChild(canonical);
    }
    canonical.setAttribute('href', url);
    
    // Alternate language links (hreflang)
    if (alternateLanguages) {
      // Remove old hreflang links
      document.querySelectorAll('link[hreflang]').forEach(el => el.remove());
      
      Object.entries(alternateLanguages).forEach(([lang, langUrl]) => {
        const link = document.createElement('link');
        link.setAttribute('rel', 'alternate');
        link.setAttribute('hreflang', lang);
        link.setAttribute('href', langUrl);
        document.head.appendChild(link);
      });
      
      // Add x-default
      const xDefault = document.createElement('link');
      xDefault.setAttribute('rel', 'alternate');
      xDefault.setAttribute('hreflang', 'x-default');
      xDefault.setAttribute('href', url);
      document.head.appendChild(xDefault);
    }
    
    // JSON-LD Structured Data for Hotels
    if (hotelData) {
      // Remove old JSON-LD
      document.querySelectorAll('script[type="application/ld+json"]').forEach(el => el.remove());
      
      // Hotel Schema
      const hotelSchema = {
        "@context": "https://schema.org",
        "@type": "Hotel",
        "name": hotelData.name,
        "description": description,
        "url": url,
        "telephone": hotelData.phone,
        "email": hotelData.email,
        "image": image,
        "logo": hotelData.logo,
        "priceRange": hotelData.priceRange || "$$",
        "starRating": {
          "@type": "Rating",
          "ratingValue": hotelData.stars || "3"
        },
        "address": {
          "@type": "PostalAddress",
          "streetAddress": hotelData.streetAddress,
          "addressLocality": hotelData.city,
          "addressRegion": hotelData.region,
          "postalCode": hotelData.postalCode,
          "addressCountry": hotelData.country
        },
        "geo": {
          "@type": "GeoCoordinates",
          "latitude": hotelData.latitude,
          "longitude": hotelData.longitude
        },
        "amenityFeature": hotelData.amenities?.map(amenity => ({
          "@type": "LocationFeatureSpecification",
          "name": amenity,
          "value": true
        })) || [],
        "numberOfRooms": hotelData.numberOfRooms,
        "checkinTime": hotelData.checkinTime || "14:00",
        "checkoutTime": hotelData.checkoutTime || "12:00",
        "petsAllowed": hotelData.petsAllowed || false,
        "availableLanguage": hotelData.languages || ["Spanish", "English"],
        "paymentAccepted": hotelData.paymentAccepted || ["Cash", "Credit Card"],
        "currenciesAccepted": hotelData.currencies || "USD",
        "hasMap": hotelData.mapUrl,
        "sameAs": hotelData.socialMedia || []
      };
      
      const hotelScript = document.createElement('script');
      hotelScript.type = 'application/ld+json';
      hotelScript.text = JSON.stringify(hotelSchema);
      document.head.appendChild(hotelScript);
      
      // LocalBusiness Schema (additional for local SEO)
      const localBusinessSchema = {
        "@context": "https://schema.org",
        "@type": "LodgingBusiness",
        "name": hotelData.name,
        "image": image,
        "url": url,
        "telephone": hotelData.phone,
        "email": hotelData.email,
        "address": {
          "@type": "PostalAddress",
          "streetAddress": hotelData.streetAddress,
          "addressLocality": hotelData.city,
          "addressRegion": hotelData.region,
          "addressCountry": hotelData.country
        },
        "geo": {
          "@type": "GeoCoordinates",
          "latitude": hotelData.latitude,
          "longitude": hotelData.longitude
        },
        "openingHoursSpecification": {
          "@type": "OpeningHoursSpecification",
          "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
          "opens": "00:00",
          "closes": "23:59"
        }
      };
      
      const localScript = document.createElement('script');
      localScript.type = 'application/ld+json';
      localScript.text = JSON.stringify(localBusinessSchema);
      document.head.appendChild(localScript);
      
      // BreadcrumbList Schema
      if (hotelData.breadcrumbs) {
        const breadcrumbSchema = {
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          "itemListElement": hotelData.breadcrumbs.map((crumb, index) => ({
            "@type": "ListItem",
            "position": index + 1,
            "name": crumb.name,
            "item": crumb.url
          }))
        };
        
        const breadcrumbScript = document.createElement('script');
        breadcrumbScript.type = 'application/ld+json';
        breadcrumbScript.text = JSON.stringify(breadcrumbSchema);
        document.head.appendChild(breadcrumbScript);
      }
    }
    
  }, [title, description, keywords, image, url, type, locale, siteName, hotelData, alternateLanguages]);
  
  return null;
};

export default SEO;
