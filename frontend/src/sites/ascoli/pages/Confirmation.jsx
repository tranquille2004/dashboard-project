import React from 'react';
import { Link } from 'react-router-dom';
import { CheckCircle } from 'lucide-react';
import { useBasePath } from '../context/BasePathContext';

// CSS voor de hartslag animatie
const pulseAnimation = `
  @keyframes heartbeat {
    0% { transform: scale(1); }
    25% { transform: scale(1.1); }
    50% { transform: scale(1); }
    75% { transform: scale(1.05); }
    100% { transform: scale(1); }
  }
`;

const Confirmation = () => {
  const basePath = useBasePath();
  const homePath = basePath || '/';
  
  return (
    <div className="min-h-screen bg-[#2a2a2a] flex items-center justify-center px-4">
      {/* Inject animation CSS */}
      <style>{pulseAnimation}</style>
      
      <div className="max-w-2xl w-full">
        <div className="bg-gray-900 rounded-lg p-12 text-center">
          <div 
            className="inline-block"
            style={{ animation: 'heartbeat 1.5s ease-in-out infinite' }}
          >
            <CheckCircle className="w-24 h-24 text-green-500 mx-auto mb-6" />
          </div>
          
          <h1 className="text-4xl font-serif text-white mb-8">Grazie!</h1>
          
          <h2 className="text-2xl text-[#a48f7a] mb-8">Bedankt, uw reservatie is bevestigd!</h2>
          
          <div className="space-y-6 text-gray-300 mb-8 text-left max-w-xl mx-auto">
            <p className="flex items-start gap-3">
              <span className="text-green-500 text-xl flex-shrink-0">✓</span>
              <span><strong className="text-white">WIJ KONTAKTEREN U NIET</strong>, tenzij wij bijkomende vragen hebben of vol zijn.</span>
            </p>
            
            <p className="flex items-start gap-3">
              <span className="text-green-500 text-xl flex-shrink-0">✓</span>
              <span>Om dubbele reservaties te vermijden, aub <strong className="text-white">BEL ONS NIET</strong> voor deze aanvraag!</span>
            </p>
            
            <p className="flex items-start gap-3">
              <span className="text-green-500 text-xl flex-shrink-0">✓</span>
              <span>Wij bekijken onze email de gehele dag dus <strong className="text-white">uw reservatie is genoteerd</strong>.</span>
            </p>
          </div>

          <div className="bg-[#6b1f1f]/10 border border-[#6b1f1f] rounded-sm p-6 mb-8">
            <p className="text-gray-300">
              U ontvangt een <strong className="text-white">automatische bevestigingsmail</strong>. 
              Indien u een reservatie voor <strong className="text-[#6b1f1f]">10 personen of meer</strong> doorstuurde, 
              kontakteren wij u persoonlijk binnen de <strong className="text-white">12 uur</strong>.
            </p>
          </div>

          <div className="space-y-4">
            <Link
              to={homePath}
              className="inline-block px-8 py-3 bg-[#6b1f1f] hover:bg-[#7d2424] text-white rounded-sm transition-colors"
            >
              Klik hier om terug te gaan naar de site
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Confirmation;
