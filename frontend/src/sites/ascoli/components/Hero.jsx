import React from 'react';
import { ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useBasePath } from '../context/BasePathContext';

const Hero = ({ title, subtitle, image, showButtons = false, buttonText1 = 'Reserveren', buttonText2 = 'Bekijk Menu' }) => {
  const basePath = useBasePath();
  
  return (
    <div className="relative h-[600px] flex items-center justify-center overflow-hidden">
      {/* Background Image with Overlay */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: `url(${image})`,
        }}
      >
        <div className="absolute inset-0 bg-[#1a1a1a]/60"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 text-center text-white px-4 max-w-4xl mx-auto">
        <h1 className="text-5xl md:text-6xl lg:text-7xl font-serif mb-6 animate-fade-in">
          {title}
        </h1>
        {subtitle && (
          <p className="text-xl md:text-2xl mb-8 text-gray-200 animate-fade-in-delay">
            {subtitle}
          </p>
        )}
        
        {showButtons && (
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center animate-fade-in-delay-2">
            <Link
              to={`${basePath}/reservations`}
              className="group px-8 py-4 bg-[#6b1f1f] hover:bg-[#7d2424] text-white rounded-sm transition-all duration-300 flex items-center gap-2 uppercase tracking-wide font-medium"
            >
              {buttonText1}
              <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link
              to={`${basePath}/menu`}
              className="group px-8 py-4 bg-transparent border-2 border-[#a48f7a] hover:bg-[#a48f7a] text-white rounded-sm transition-all duration-300 flex items-center gap-2 uppercase tracking-wide font-medium"
            >
              {buttonText2}
              <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default Hero;