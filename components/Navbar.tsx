import React, { useState, useEffect } from 'react';
import { GlowingShadow } from './ui/glowing-shadow';

const Navbar: React.FC = () => {
  const [activeLink, setActiveLink] = useState('Work');
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Work', id: 'work' },
    { name: 'About', id: 'about' },
    { name: 'Price', id: 'price' },
  ];

  const scrollTo = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const offset = 80; // Buffer for navbar height
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  return (
    <nav 
      className={`
        fixed top-0 left-0 right-0 z-50 flex items-center justify-between 
        px-6 py-6 md:px-12 transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]
        ${scrolled ? 'bg-black/60 backdrop-blur-xl border-b border-white/5' : 'bg-transparent border-transparent'}
      `}
    >
      {/* Brand */}
      <div 
        className="flex items-center gap-3 z-10 cursor-pointer group"
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      >
        <div className="w-5 h-5 bg-white rounded-full transition-all duration-500 ease-out group-hover:scale-90 group-hover:shadow-[0_0_12px_rgba(255,255,255,0.6)]"></div>
        <span className="font-semibold text-lg tracking-tight text-white">Clyde</span>
      </div>

      {/* Navigation Links - Centered */}
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 hidden md:flex items-center gap-12">
        {navLinks.map((link) => {
          const isActive = activeLink === link.name;
          return (
            <button
              key={link.name}
              onClick={() => {
                setActiveLink(link.name);
                scrollTo(link.id);
              }}
              className={`
                relative text-sm font-medium tracking-wide transition-all duration-500 ease-out
                ${isActive 
                  ? 'text-white opacity-100 blur-0 scale-100' 
                  : 'text-neutral-300 opacity-60 blur-[1.5px] hover:blur-[0.5px] hover:opacity-90 hover:scale-105 hover:text-white'
                }
              `}
            >
              {link.name}
            </button>
          );
        })}
      </div>

      {/* Right Side Actions */}
      <div className="flex items-center gap-6 z-10">
         {/* Mobile Menu Toggle */}
         <button className="md:hidden text-white opacity-80 hover:opacity-100 transition-opacity">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="4" y1="12" x2="20" y2="12"></line>
              <line x1="4" y1="6" x2="20" y2="6"></line>
              <line x1="4" y1="18" x2="20" y2="18"></line>
            </svg>
        </button>

        <div className="hidden md:block transform scale-90 origin-right">
          <GlowingShadow 
             onClick={() => scrollTo('contact')}
             style={{ 
               '--card-width': '160px', 
               '--card-radius': '999px',
               '--border-width': '2px',
               '--card-color': 'rgba(0,0,0,0.8)'
             } as React.CSSProperties}
          >
            Get Started
          </GlowingShadow>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;