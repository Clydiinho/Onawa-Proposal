
import React, { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import MouseFlowHero from './MouseFlowHero';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, X } from 'lucide-react';
import { GlowingShadow } from './ui/glowing-shadow';

const cards = [
  {
    id: 1,
    title: "Follow The Light",
    subtitle: "Cinematic Reality",
    src: "https://images.unsplash.com/photo-1535498730771-e735b998cd64?q=80&w=1600&auto=format&fit=crop",
    meta: "24th Apr, 2024 · 34 clips"
  },
  {
    id: 2,
    title: "Electric Pink",
    subtitle: "Neon Nights",
    src: "https://images.unsplash.com/photo-1595760780346-f972eb49f094?q=80&w=1600&auto=format&fit=crop",
    meta: "02nd May, 2024 · 12 clips"
  },
  {
    id: 3,
    title: "Winging It",
    subtitle: "Freedom Series",
    src: "https://images.unsplash.com/photo-1506057213338-1560206e1bda?q=80&w=1600&auto=format&fit=crop",
    meta: "15th May, 2024 · 8 clips"
  },
  {
    id: 4,
    title: "Bloom",
    subtitle: "Natural Order",
    src: "https://images.unsplash.com/photo-1621644886561-98752d5377cd?q=80&w=1600&auto=format&fit=crop",
    meta: "21st Jun, 2024 · 45 clips"
  },
  {
    id: 5,
    title: "Urban Air",
    subtitle: "City Pulse",
    src: "https://images.unsplash.com/photo-1514565131-fce0801e5785?q=80&w=1600&auto=format&fit=crop",
    meta: "10th Jul, 2024 · 20 clips"
  }
];

const ParallaxGallery: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const stackContainerRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Lock body scroll when modal is open
  useEffect(() => {
    if (selectedId !== null) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [selectedId]);

  // Handle keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (selectedId === null) return;
      if (e.key === "Escape") setSelectedId(null);
      if (e.key === "ArrowLeft") handlePrev();
      if (e.key === "ArrowRight") handleNext();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [selectedId]);

  const handleNext = () => {
    if (selectedId === null) return;
    const currentIndex = cards.findIndex(c => c.id === selectedId);
    const nextIndex = (currentIndex + 1) % cards.length;
    setSelectedId(cards[nextIndex].id);
  };

  const handlePrev = () => {
    if (selectedId === null) return;
    const currentIndex = cards.findIndex(c => c.id === selectedId);
    const prevIndex = (currentIndex - 1 + cards.length) % cards.length;
    setSelectedId(cards[prevIndex].id);
  };

  const scrollToInfo = () => {
    const element = document.getElementById('about');
    if (element) {
      const offset = 40;
      const elementPosition = element.getBoundingClientRect().top + window.scrollY;
      window.scrollTo({
        top: elementPosition - offset,
        behavior: 'smooth'
      });
    }
  };

  useEffect(() => {
    let animationFrameId: number;

    const animate = () => {
      if (!containerRef.current) return;

      const rect = containerRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      
      const scrollDist = -rect.top;
      const rawProgress = scrollDist / (windowHeight * 0.8);
      const progress = Math.max(0, Math.min(cards.length, rawProgress));

      let tilt = 0;
      let entryScale = 1;

      if (progress < 1) {
        const t = 1 - progress;
        tilt = t * 40; 
        entryScale = 0.8 + (0.2 * (1 - t)); 
      }

      if (stackContainerRef.current) {
        stackContainerRef.current.style.transform = `perspective(1000px) rotateX(${tilt}deg) scale(${entryScale})`;
      }

      cardRefs.current.forEach((card, i) => {
        if (!card) return;
        
        const dist = (i + 1) - progress;

        let y = 0;
        let scale = 1;
        let brightness = 1;
        let blur = 0;

        if (dist > 0) {
          const enterProgress = Math.min(dist, 2);
          y = enterProgress * 110; 
          scale = 1.0 - (enterProgress * 0.1);
        } else {
          const stackProgress = Math.abs(dist);
          y = -(stackProgress * 10);
          scale = 1.0 - (stackProgress * 0.05);
          brightness = 1.0 - (stackProgress * 0.1);
          blur = stackProgress * 2;
        }

        // Only apply transform if not selected (avoids conflict with Framer Motion layoutId when selected)
        if (selectedId !== cards[i].id) {
           card.style.transform = `translate3d(0, ${y}%, 0) scale(${scale})`;
           card.style.filter = `brightness(${brightness}) blur(${blur}px)`;
        } else {
           card.style.transform = `translate3d(0, ${y}%, 0) scale(${scale})`;
           card.style.filter = `brightness(${brightness}) blur(${blur}px)`;
        }
        
        card.style.zIndex = (i + 10).toString();
      });

      animationFrameId = requestAnimationFrame(animate);
    };

    window.addEventListener('scroll', animate, { passive: true });
    animate();

    return () => {
      window.removeEventListener('scroll', animate);
      cancelAnimationFrame(animationFrameId);
    };
  }, [selectedId]); 

  const selectedCard = cards.find(c => c.id === selectedId);

  return (
    <>
      <style>
        {`
          @keyframes neon-trace {
            0% { stroke-dashoffset: 0; }
            100% { stroke-dashoffset: -2; } 
          }
          .animate-neon-trace {
            /* Slowed down from 3s to 8s */
            animation: neon-trace 8s linear infinite;
          }
        `}
      </style>
      <div ref={containerRef} className="relative w-full" style={{ height: `${(cards.length + 2) * 80}vh` }}>
        <div className="sticky top-0 h-screen w-full overflow-hidden flex items-center justify-center">
          
          <div className="absolute inset-0 z-0 flex items-center justify-center">
               <MouseFlowHero text="Proposal" />
          </div>

          {/* CTA Button Overlay - Positioned below the hero title via top margin */}
          <div className="absolute inset-0 z-[5] flex items-center justify-center pointer-events-none">
              <div className="pointer-events-auto transform transition-transform duration-300 hover:scale-105 mt-40 md:mt-32">
                 <GlowingShadow 
                    onClick={scrollToInfo}
                    style={{ 
                      '--card-width': '180px', 
                      '--card-radius': '999px',
                      '--border-width': '2px',
                      '--card-color': 'rgba(0,0,0,0.8)'
                    } as React.CSSProperties}
                 >
                   More Info
                 </GlowingShadow>
              </div>
          </div>

          <div 
            ref={stackContainerRef}
            className="relative w-[90vw] md:w-[70vw] lg:w-[60vw] aspect-video z-10 will-change-transform origin-bottom pointer-events-none"
            style={{ transformStyle: 'preserve-3d' }}
          >
            {cards.map((card, index) => (
              <div
                key={card.id}
                ref={(el) => (cardRefs.current[index] = el)}
                className="absolute inset-0 w-full h-full rounded-[2.5rem] shadow-2xl bg-neutral-900 will-change-transform cursor-zoom-in group pointer-events-auto"
                style={{
                   transformOrigin: 'center top',
                   overflow: 'visible', // Changed to visible to allow glow
                }}
                onClick={() => setSelectedId(card.id)}
              >
                {/* Neon Animated Stroke Overlay */}
                <svg className="absolute inset-[-2px] w-[calc(100%+4px)] h-[calc(100%+4px)] z-20 pointer-events-none overflow-visible rounded-[2.5rem]">
                   {/* Glow Filter */}
                   <defs>
                      <filter id="neon-glow" x="-50%" y="-50%" width="200%" height="200%">
                        <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
                        <feMerge>
                          <feMergeNode in="coloredBlur"/>
                          <feMergeNode in="SourceGraphic"/>
                        </feMerge>
                      </filter>
                      {/* Animated Gradient Definition */}
                      <linearGradient id={`gradient-${card.id}`} x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%" stopColor="#ccff00" />
                        <stop offset="25%" stopColor="#6366f1" />
                        <stop offset="50%" stopColor="#d946ef" />
                        <stop offset="75%" stopColor="#06b6d4" />
                        <stop offset="100%" stopColor="#ccff00" />
                      </linearGradient>
                   </defs>
                   
                   {/* Base Border (Subtle) */}
                   <rect 
                     x="2" y="2" 
                     width="calc(100% - 4px)" 
                     height="calc(100% - 4px)" 
                     rx="2.5rem" 
                     ry="2.5rem" 
                     fill="none" 
                     stroke="rgba(255,255,255,0.1)" 
                     strokeWidth="1"
                   />

                   {/* Animated Traveling Beam */}
                   <rect 
                     x="2" y="2" 
                     width="calc(100% - 4px)" 
                     height="calc(100% - 4px)" 
                     rx="2.5rem" 
                     ry="2.5rem" 
                     fill="none" 
                     stroke={`url(#gradient-${card.id})`}
                     strokeWidth="1.5" /* Thinner stroke */
                     pathLength="1"
                     strokeDasharray="0.3 0.7" 
                     strokeLinecap="round"
                     className="animate-neon-trace opacity-100"
                     style={{ filter: 'drop-shadow(0 0 4px rgba(255, 255, 255, 0.5))' }}
                   />
                </svg>

                {/* Inner Content Container - Clips Image */}
                <div className="absolute inset-0 rounded-[2.5rem] overflow-hidden">
                  {/* Wrap content in motion div for Shared Layout Transition */}
                  <motion.div 
                    className="w-full h-full relative"
                    layoutId={`card-wrapper-${card.id}`}
                  >
                    <motion.img 
                      layoutId={`card-img-${card.id}`}
                      src={card.src} 
                      alt={card.title} 
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    
                    {/* Text overlays removed for clean gallery look */}
                  </motion.div>
                </div>
              </div>
            ))}
          </div>
          
          <div className="absolute bottom-8 left-1/2 -translate-x-1/2 text-white/30 text-xs font-mono tracking-widest uppercase animate-pulse pointer-events-none z-20">
            Scroll to Flow
          </div>
        </div>
      </div>

      {/* Fullscreen Overlay via Portal */}
      {mounted && createPortal(
        <AnimatePresence>
          {selectedId && selectedCard && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4 }}
              className="fixed inset-0 z-[100] bg-black flex items-center justify-center"
              onClick={() => setSelectedId(null)}
            >
              {/* Controls */}
              <button 
                className="absolute top-6 right-6 z-[110] p-4 text-white/50 hover:text-white transition-colors hover:rotate-90 duration-300 bg-black/20 hover:bg-black/40 backdrop-blur-md rounded-full"
                onClick={() => setSelectedId(null)}
              >
                <X size={32} />
              </button>

              <button 
                className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 z-[110] p-4 text-white/50 hover:text-white hover:bg-white/10 rounded-full transition-all group backdrop-blur-sm"
                onClick={(e) => { e.stopPropagation(); handlePrev(); }}
              >
                <ChevronLeft size={48} className="group-hover:-translate-x-1 transition-transform" />
              </button>

              <button 
                className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 z-[110] p-4 text-white/50 hover:text-white hover:bg-white/10 rounded-full transition-all group backdrop-blur-sm"
                onClick={(e) => { e.stopPropagation(); handleNext(); }}
              >
                <ChevronRight size={48} className="group-hover:translate-x-1 transition-transform" />
              </button>

              {/* Main Carousel Card - Full Screen */}
              <div 
                className="relative w-full h-full flex items-center justify-center pointer-events-none"
              >
                 <motion.div 
                   className="relative w-full h-full pointer-events-auto"
                   layoutId={`card-wrapper-${selectedId}`}
                   onClick={(e) => e.stopPropagation()}
                 >
                   <motion.img 
                     layoutId={`card-img-${selectedId}`}
                     src={selectedCard.src}
                     className="w-full h-full object-cover"
                   />
                   
                   {/* Clean View - No Text Overlay in Fullscreen Mode */}
                 </motion.div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>,
        document.body
      )}
    </>
  );
};

export default ParallaxGallery;
