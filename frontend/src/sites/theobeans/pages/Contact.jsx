import React, { useState } from 'react';
import { Mail, Phone, MapPin, Facebook } from 'lucide-react';
import { siteData } from '../data/mock';
import { useLanguage } from '../context/LanguageContext';

const Contact = () => {
  const { t } = useLanguage();
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    message: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Build mailto link - email sent via client's email
    const toEmail = 'valenciaveronica@live.be';
    const subject = encodeURIComponent(`Nouveau message de ${formData.firstName} ${formData.lastName} - Theo Beans Export`);
    const body = encodeURIComponent(
      `Prénom: ${formData.firstName || 'Non fourni'}\n` +
      `Nom: ${formData.lastName || 'Non fourni'}\n` +
      `Email: ${formData.email}\n` +
      `Téléphone: ${formData.phone}\n\n` +
      `Message:\n${formData.message || 'Pas de message'}`
    );
    
    window.location.href = `mailto:${toEmail}?subject=${subject}&body=${body}`;
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="min-h-screen pt-16 bg-[#f5f1ed]">
      {/* Hero Section with Background Image */}
      <section 
        className="relative bg-cover bg-center py-32 md:py-40 px-4"
        style={{
          backgroundImage: 'linear-gradient(rgba(184, 153, 158, 0.70), rgba(184, 153, 158, 0.70)), url(/images/contact/contact-hero.jpg)',
          backgroundSize: 'contain',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          backgroundColor: '#b8999e'
        }}
      >
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-light tracking-[0.3em] text-white">
            {t.contact.title}
          </h1>
        </div>
      </section>

      {/* Content */}
      <section className="py-12 md:py-20 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <div>
              <div className="bg-gray-50 p-8 rounded-lg shadow-lg">
                <h2 className="text-2xl font-light text-gray-900 mb-6">
                  Theo Beans Export
                </h2>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        {t.contact.firstName}
                      </label>
                      <input
                        type="text"
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#b8999e] focus:border-transparent transition-all"
                        data-testid="contact-firstname-input"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        {t.contact.lastName}
                      </label>
                      <input
                        type="text"
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#b8999e] focus:border-transparent transition-all"
                        data-testid="contact-lastname-input"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      {t.contact.email} *
                    </label>
                    <input
                      type="email"
                      name="email"
                      required
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#b8999e] focus:border-transparent transition-all"
                      data-testid="contact-email-input"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      {t.contact.phone} *
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      required
                      value={formData.phone}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#b8999e] focus:border-transparent transition-all"
                      data-testid="contact-phone-input"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      {t.contact.message}
                    </label>
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      rows={6}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#b8999e] focus:border-transparent transition-all resize-none"
                      data-testid="contact-message-input"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-[#b8999e] text-white py-3 rounded-lg hover:bg-[#a8898e] transition-colors font-light tracking-wide shadow-md hover:shadow-lg"
                    data-testid="contact-submit-button"
                  >
                    {t.contact.send}
                  </button>
                </form>
              </div>
            </div>

            {/* Contact Info */}
            <div className="space-y-8">
              {/* Photo Gallery */}
              <div className="grid grid-cols-2 gap-4">
                {siteData.contact.images.map((img, index) => (
                  <div key={index} className="rounded-lg overflow-hidden shadow-md aspect-square">
                    <img
                      src={img}
                      alt={`Contact ${index + 1}`}
                      className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                      loading="lazy" style={{ opacity: 1 }}
                    />
                  </div>
                ))}
              </div>

              {/* Contact Details */}
              <div className="bg-gray-50 p-8 rounded-lg space-y-6 shadow-md">
                <div className="flex items-start space-x-4">
                  <Mail className="text-[#b8999e] flex-shrink-0 mt-1" size={24} />
                  <div>
                    <p className="font-medium text-gray-900 mb-1">Email</p>
                    <a
                      href={`mailto:${siteData.contact.email}`}
                      className="text-gray-700 hover:text-[#b8999e] transition-colors"
                    >
                      {siteData.contact.email}
                    </a>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <Phone className="text-[#b8999e] flex-shrink-0 mt-1" size={24} />
                  <div>
                    <p className="font-medium text-gray-900 mb-1">{t.contact.phone}</p>
                    <a
                      href={`tel:${siteData.contact.phone}`}
                      className="text-gray-700 hover:text-[#b8999e] transition-colors"
                    >
                      {siteData.contact.phone}
                    </a>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <MapPin className="text-[#b8999e] flex-shrink-0 mt-1" size={24} />
                  <div>
                    <p className="font-medium text-gray-900 mb-1">{t.contact.address}</p>
                    <p className="text-gray-700">{siteData.contact.address}</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <Facebook className="text-[#b8999e] flex-shrink-0 mt-1" size={24} />
                  <div>
                    <p className="font-medium text-gray-900 mb-1">{t.contact.facebook}</p>
                    <a
                      href={`https://${siteData.contact.facebook}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-gray-700 hover:text-[#b8999e] transition-colors"
                    >
                      {siteData.contact.facebook}
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;
