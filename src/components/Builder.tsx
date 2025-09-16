import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Shuffle, Download } from 'lucide-react';

interface TraitState {
  background: string | null;
  base: string | null;
  clothes: string | null;
  eyes: string | null;
  mouth: string | null;
  accessories: string | null;
  hat: string | null;
}

const Builder: React.FC = () => {
  const navigate = useNavigate();
  const canvasRef = useRef<HTMLCanvasElement>(null);
  
  const [traits, setTraits] = useState<TraitState>({
    background: null,
    base: null,
    clothes: null,
    eyes: null,
    mouth: null,
    accessories: null,
    hat: null,
  });

  // Sample trait options (in a real app, these would be dynamically loaded)
  const traitOptions = {
    background: ['apocalypse', 'aztec', 'classic', 'Lavender'],
    base: ['Diamon', 'Glyph', 'Normal', 'Robotb', 'Tattoo'],
    clothes: ['Hoodie', 'Leather', 'Poncho', 'Vest'],
    eyes: ['Eyes1 copy', 'eyes2 copy', 'eyes3 copy'],
    mouth: [ 'Mouth1', 'Mouth3', 'Mouth4'],
    accessories: ['Devilhorn', 'Gchain', 'Halo'],
    hat: ['aztecclassic', 'Aztecy', 'Crown'],
  };

  // Generate random particles for mystical atmosphere
  const particles = Array.from({ length: 15 }, (_, i) => ({
    id: i,
    left: Math.random() * 100,
    delay: Math.random() * 8,
    duration: 6 + Math.random() * 3,
  }));

  const handleTraitChange = (category: keyof TraitState, value: string | null) => {
    setTraits(prev => ({ ...prev, [category]: value }));
  };

  const randomizeTrait = () => {
    const newTraits: TraitState = {
      clothes: null,
      eyes: null,
      mouth: null,
      accessories: null,
      hat: null,
    };

    Object.keys(traitOptions).forEach(category => {
      const options = traitOptions[category as keyof typeof traitOptions];
      if (category === 'background' || category === 'base') {
        // Always have background and base
        const randomIndex = Math.floor(Math.random() * options.length);
        newTraits[category as keyof TraitState] = options[randomIndex];
      } else if (Math.random() > 0.3) { // 70% chance to have other traits
        const randomIndex = Math.floor(Math.random() * options.length);
        newTraits[category as keyof TraitState] = options[randomIndex];
      }
    });

    setTraits(newTraits);
  };

  const saveAsJPEG = async () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = 400;
    canvas.height = 400;

    // Fill with background
    ctx.fillStyle = '#1f2937';
    ctx.fillRect(0, 0, 400, 400);

    // Draw traits in correct order
    const layerOrder: (keyof TraitState)[] = ['background', 'base', 'clothes', 'eyes', 'mouth', 'accessories', 'hat'];
    
    for (const layer of layerOrder) {
      const traitValue = traits[layer];
      if (traitValue) {
        try {
          const img = new Image();
          img.crossOrigin = 'anonymous';
          await new Promise((resolve, reject) => {
            img.onload = resolve;
            img.onerror = reject;
            img.src = `/assets/${layer}/${traitValue}.png`;
          });
          ctx.drawImage(img, 0, 0, 400, 400);
        } catch (error) {
          console.warn(`Failed to load ${layer}/${traitValue}.png`);
        }
      }
    }

    // Convert to JPEG and download
    canvas.toBlob((blob) => {
      if (blob) {
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'aztec-avatar.jpeg';
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
      }
    }, 'image/jpeg', 0.9);
  };

  return (
    <motion.div
      className="min-h-screen bg-gradient-to-br from-[#0d0d0d] via-[#1a1a1a] to-[#0d0d0d] relative overflow-hidden p-4 md:p-8"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
    >
      {/* Aztec Glyph Background */}
      <div className="absolute inset-0 flex items-center justify-center opacity-5 pointer-events-none">
        <div className="w-96 h-96 bg-gradient-radial from-[#d4af37]/20 to-transparent rounded-full animate-pulse-slow" />
        <div className="absolute w-80 h-80 border-4 border-[#d4af37]/20 rounded-full animate-pulse-slow" style={{ animationDelay: '1s' }} />
        <div className="absolute w-64 h-64 border-2 border-[#d4af37]/15 rounded-full animate-pulse-slow" style={{ animationDelay: '2s' }} />
      </div>

      {/* Golden Particles */}
      {particles.map((particle) => (
        <div
          key={particle.id}
          className="absolute w-1 h-1 bg-[#d4af37] rounded-full animate-float opacity-60 pointer-events-none"
          style={{
            left: `${particle.left}%`,
            animationDelay: `${particle.delay}s`,
            animationDuration: `${particle.duration}s`,
          }}
        />
      ))}

      {/* Header */}
      <div className="flex items-center justify-between mb-4 md:mb-8 relative z-10">
        <button
          onClick={() => navigate('/')}
          className="flex items-center gap-2 px-3 sm:px-4 py-2 bg-[#d4af37]/20 hover:bg-[#d4af37]/30 text-[#d4af37] border border-[#d4af37]/30 rounded-lg transition-all duration-200 backdrop-blur-sm text-sm sm:text-base"
        >
          <ArrowLeft className="w-4 h-4" />
          <span className="hidden sm:inline">Back</span>
        </button>
        <h1 
          className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-[#d4af37] drop-shadow-[0_0_15px_rgba(212,175,55,0.7)] text-center flex-1 mx-2"
          style={{ fontFamily: 'Cinzel Decorative, serif' }}
        >
          Build Your Avatar
        </h1>
        <div className="w-12 sm:w-20" /> {/* Spacer */}
      </div>

      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-8 relative z-10">
        {/* Avatar Preview */}
        <motion.div
          className="bg-[#1a1a1a]/80 backdrop-blur-xl border border-[#d4af37]/20 rounded-xl shadow-2xl shadow-[#d4af37]/10 p-4 md:p-8 order-1 lg:order-none"
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <h2 
            className="text-xl md:text-2xl font-bold text-[#d4af37] mb-4 md:mb-6 text-center drop-shadow-[0_0_10px_rgba(212,175,55,0.5)]"
            style={{ fontFamily: 'Cinzel Decorative, serif' }}
          >
            Preview
          </h2>
          <div className="relative w-64 h-64 sm:w-80 sm:h-80 mx-auto bg-gradient-to-br from-[#0d0d0d] to-[#2a2a2a] border border-[#d4af37]/30 rounded-xl overflow-hidden shadow-inner">
            {/* Base avatar background */}
            <div className="absolute inset-0 bg-gradient-to-br from-[#d4af37]/10 to-[#8b4513]/10" />
            
            {/* Trait layers */}
            {['background', 'base', 'clothes', 'eyes', 'mouth', 'accessories', 'hat'].map((layer) => {
              const traitValue = traits[layer as keyof TraitState];
              return traitValue ? (
                <img
                  key={layer}
                  src={`/assets/${layer}/${traitValue}.png`}
                  alt={`${layer}: ${traitValue}`}
                  className="absolute inset-0 w-full h-full object-contain"
                  onError={(e) => {
                    console.warn(`Failed to load image: /assets/${layer}/${traitValue}.png`);
                    // Hide broken images
                    (e.target as HTMLImageElement).style.display = 'none';
                  }}
                />
              ) : null;
            })}
            
            {/* Default state when no traits selected */}
            {Object.values(traits).filter(v => v !== null).length === 0 && (
              <div className="absolute inset-0 flex items-center justify-center text-[#d4af37]/60 text-sm sm:text-lg font-medium text-center px-4">
                Select traits to build your avatar
              </div>
            )}
          </div>
          
          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 mt-4 md:mt-6 justify-center">
            <button
              onClick={randomizeTrait}
              className="flex items-center justify-center gap-2 px-4 sm:px-6 py-2 sm:py-3 bg-[#d4af37]/20 hover:bg-[#d4af37]/30 text-[#d4af37] border border-[#d4af37]/40 rounded-lg transition-all duration-200 transform hover:scale-105 hover:shadow-[0_0_15px_rgba(212,175,55,0.4)] backdrop-blur-sm text-sm sm:text-base"
            >
              <Shuffle className="w-4 h-4" />
              Randomize
            </button>
            <button
              onClick={saveAsJPEG}
              className="flex items-center justify-center gap-2 px-4 sm:px-6 py-2 sm:py-3 bg-[#d4af37] hover:bg-[#b8941f] text-black rounded-lg transition-all duration-200 transform hover:scale-105 hover:shadow-[0_0_15px_rgba(212,175,55,0.6)] font-semibold text-sm sm:text-base"
            >
              <Download className="w-4 h-4" />
              Save as JPEG
            </button>
          </div>
        </motion.div>

        {/* Trait Controls */}
        <motion.div
          className="bg-[#1a1a1a]/80 backdrop-blur-xl border border-[#d4af37]/20 rounded-xl shadow-2xl shadow-[#d4af37]/10 p-4 md:p-8 order-2 lg:order-none"
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <h2 
            className="text-xl md:text-2xl font-bold text-[#d4af37] mb-4 md:mb-6 text-center drop-shadow-[0_0_10px_rgba(212,175,55,0.5)]"
            style={{ fontFamily: 'Cinzel Decorative, serif' }}
          >
            Customize Traits
          </h2>
          
          <div className="space-y-4 md:space-y-6">
            {Object.entries(traitOptions).map(([category, options]) => (
              <div key={category} className="space-y-2 md:space-y-3">
                <label className="text-base md:text-lg font-semibold text-[#d4af37]/90 capitalize tracking-wide block">
                  {category}
                </label>
                <select
                  value={traits[category as keyof TraitState] || ''}
                  onChange={(e) => handleTraitChange(category as keyof TraitState, e.target.value || null)}
                  className="w-full px-3 md:px-4 py-2 md:py-3 bg-[#0d0d0d]/80 border border-[#d4af37]/30 rounded-lg text-[#cccccc] focus:outline-none focus:ring-2 focus:ring-[#d4af37]/50 focus:border-[#d4af37] transition-all duration-200 backdrop-blur-sm text-sm md:text-base"
                >
                  <option value="">None</option>
                  {options.map((option) => (
                    <option key={option} value={option}>
                      {option.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase())}
                    </option>
                  ))}
                </select>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Hidden canvas for JPEG export */}
      <canvas ref={canvasRef} style={{ display: 'none' }} />
    </motion.div>
  );
};

export default Builder;