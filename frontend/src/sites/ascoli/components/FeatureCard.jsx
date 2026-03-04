import React from 'react';

const FeatureCard = ({ title, description, image }) => {
  return (
    <div className="group relative overflow-hidden rounded-sm h-80 cursor-pointer">
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
        style={{ backgroundImage: `url(${image})` }}
      >
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent"></div>
      </div>

      {/* Content */}
      <div className="relative h-full flex flex-col justify-end p-6 text-white">
        <h3 className="text-2xl font-serif mb-2 group-hover:text-[#6b1f1f] transition-colors duration-300">
          {title}
        </h3>
        <p className="text-gray-200 text-sm">{description}</p>
      </div>
    </div>
  );
};

export default FeatureCard;