import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

const Landing: React.FC = () => {
  const navigate = useNavigate();

  const handleEnter = () => {
    navigate('/builder');
  };

  useEffect(() => {
    const handleKeyPress = (event: KeyboardEvent) => {
      if (event.key === 'Enter') {
        handleEnter();
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, []);

  // Generate random particles
  const particles = Array.from({ length: 20 }, (_, i) => ({
    id: i,
    left: Math.random() * 100,
    delay: Math.random() * 10,
    duration: 8 + Math.random() * 4,
  }));

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0d0d0d] via-[#1a1a1a] to-[#0d0d0d] relative overflow-hidden flex items-center justify-center">
      {/* Aztec Glyph Background */}
      <div className="absolute inset-0 flex items-center justify-center opacity-10">
        <div className="w-96 h-96 bg-gradient-radial from-[#d4af37]/20 to-transparent rounded-full animate-pulse-slow" />
        <div className="absolute w-80 h-80 border-4 border-[#d4af37]/30 rounded-full animate-pulse-slow" style={{ animationDelay: '1s' }} />
        <div className="absolute w-64 h-64 border-2 border-[#d4af37]/20 rounded-full animate-pulse-slow" style={{ animationDelay: '2s' }} />
      </div>

      {/* Golden Particles */}
      {particles.map((particle) => (
        <div
          key={particle.id}
          className="absolute w-1 h-1 bg-[#d4af37] rounded-full animate-float opacity-70"
          style={{
            left: `${particle.left}%`,
            animationDelay: `${particle.delay}s`,
            animationDuration: `${particle.duration}s`,
          }}
        />
      ))}

      {/* Main Content */}
      <div className="text-center z-10 px-4">
        {/* Main Title */}
        <motion.h1
          className="text-4xl sm:text-5xl md:text-6xl lg:text-8xl font-bold mb-4 md:mb-6 tracking-wider px-4"
          style={{ fontFamily: 'Cinzel Decorative, serif' }}
          initial={{ opacity: 0, scale: 0.8, y: 30 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 1.2, ease: "easeOut" }}
        >
          <span className="text-[#D4FF2A] drop-shadow-[0_0_15px_rgba(212,255,42,0.7)]">AZTEC</span>{' '}
          <span className="text-[#d4af37] drop-shadow-[0_0_15px_rgba(212,175,55,0.7)]">PFP MAKER</span>
        </motion.h1>

        {/* Subtext */}
        <motion.p
          className="text-lg sm:text-xl md:text-2xl text-[#cccccc] mb-8 md:mb-12 font-light tracking-wide px-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.5, ease: "easeOut" }}
        >
          Made with ❤️ by B
        </motion.p>

        {/* Enter Button */}
        <motion.button
          onClick={handleEnter}
          className="px-8 sm:px-12 py-3 sm:py-4 bg-[#d4af37] text-black font-bold text-lg sm:text-xl rounded-xl shadow-lg hover:scale-105 hover:shadow-[0_0_20px_rgba(212,175,55,0.8)] transition-all duration-300 tracking-wider mx-4"
          style={{ fontFamily: 'Cinzel Decorative, serif' }}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 1, ease: "easeOut" }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          ENTER
        </motion.button>

        {/* Bottom hint */}
        <motion.div
          className="absolute bottom-4 sm:bottom-8 left-1/2 transform -translate-x-1/2 text-[#888888] text-xs sm:text-sm tracking-wide px-4 text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.5 }}
        >
          Press Enter to continue
        </motion.div>
      </div>
    </div>
  );
};

export default Landing;