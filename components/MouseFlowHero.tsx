
import React, { useRef, useEffect, useState } from 'react';
import { Typewriter } from './ui/typewriter';

interface MouseFlowHeroProps {
  text?: string;
}

const MouseFlowHero: React.FC<MouseFlowHeroProps> = ({ text = "Proposal" }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [charRects, setCharRects] = useState<{ x: number; y: number }[]>([]);
  const spansRef = useRef<(HTMLSpanElement | null)[]>([]);

  // Split text into characters
  const chars = text.split('');

  useEffect(() => {
    // Function to calculate center position of each character relative to the document
    const handleResize = () => {
      if (spansRef.current.length > 0) {
        const newRects = spansRef.current.map((span) => {
          if (!span) return { x: 0, y: 0 };
          const rect = span.getBoundingClientRect();
          // Store page-relative coordinates to handle scrolling
          return {
            x: rect.left + window.scrollX + rect.width / 2,
            y: rect.top + window.scrollY + rect.height / 2
          };
        });
        setCharRects(newRects);
      }
    };

    // Initial measurement
    handleResize();
    
    // Add a delay to ensure fonts and layout are stable before measuring
    const timeout = setTimeout(handleResize, 100);
    
    window.addEventListener('resize', handleResize);
    window.addEventListener('scroll', handleResize); // Re-measure on scroll to be safe

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('scroll', handleResize);
      clearTimeout(timeout);
    };
  }, [text]);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      // Use pageX/pageY for document-relative coordinates
      const mouseX = e.pageX;
      const mouseY = e.pageY;
      
      const MAX_DIST = 300; // Interaction radius in pixels (Slightly reduced for tighter control)
      const MAX_BLUR = 12; // Maximum blur in pixels
      const HOVER_OPACITY = 0.5; // Opacity when blurred (hovered)
      
      spansRef.current.forEach((span, index) => {
        if (!span) return;
        const rect = charRects[index];
        if (!rect) return; // Guard against missing measurements

        const dx = mouseX - rect.x;
        const dy = mouseY - rect.y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        // Calculate progress: 0 (at cursor) to 1 (far away)
        let progress = Math.min(dist / MAX_DIST, 1);
        
        // Easing function for smoother drop-off
        // Using a cubic ease-out for a more natural feel
        const ease = 1 - Math.pow(1 - progress, 3); // ease out cubic

        // INVERTED LOGIC:
        // Default (Far): Clear, Opacity 1, Scale 1.
        // Hover (Near): Blurred, Lower Opacity, Scale Up (Distortion).
        
        // Blur: Near -> Max, Far -> 0
        const blur = (1 - progress) * MAX_BLUR;
        
        // Opacity: Near -> HOVER_OPACITY, Far -> 1
        const opacity = HOVER_OPACITY + (progress * (1 - HOVER_OPACITY));
        
        // Scale: Near -> 1.1 (distortion), Far -> 1
        // We use the raw linear progress for scale to keep it punchy near the center
        const scale = 1.0 + ((1 - progress) * 0.15);
        
        // Apply inline styles for high performance
        span.style.filter = `blur(${blur.toFixed(2)}px)`;
        span.style.opacity = opacity.toFixed(3);
        span.style.transform = `scale3d(${scale.toFixed(3)}, ${scale.toFixed(3)}, 1)`;
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [charRects]);

  return (
    <div 
      ref={containerRef} 
      className="relative min-h-screen w-full flex flex-col items-center justify-center overflow-hidden select-none cursor-crosshair"
    >
       {/* Background handled globally in App.tsx */}
       
       <div className="flex flex-col items-center justify-center -translate-y-24 md:-translate-y-32 transition-transform duration-700">
         <div className="relative z-20 mb-4 md:mb-8 text-sm md:text-xl font-mono text-white/50 tracking-widest uppercase flex items-center gap-2 flex-wrap justify-center px-4 text-center">
            <span>We</span>
            <Typewriter
              text={[
                "not just anybody",
                "make it look sexy",
                "Create",
                "Innovate",
                "Inspire",
                "Disrupt",
                "Solve",
                "Support",
              ]}
              speed={70}
              className="font-bold text-[#ccff00] drop-shadow-[0_0_10px_rgba(204,255,0,0.5)]"
              waitTime={1500}
              deleteSpeed={40}
              cursorChar={"_"}
            />
         </div>

         {/* Adjusted font sizing for longer text */}
         <h1 className="relative z-10 text-[13vw] md:text-[10rem] lg:text-[12rem] font-extrabold tracking-tighter leading-none text-white whitespace-nowrap">
          {chars.map((char, i) => (
            <span
              key={i}
              ref={(el) => (spansRef.current[i] = el)}
              className="inline-block will-change-[filter,opacity,transform] transition-[filter,opacity,transform] duration-75 ease-out"
              style={{
                // Default state (before JS interactions) -> Clear
                filter: 'blur(0px)',
                opacity: 1,
                transform: 'scale(1)'
              }}
            >
              {char === ' ' ? '\u00A0' : char}
            </span>
          ))}
         </h1>
       </div>
    </div>
  );
};

export default MouseFlowHero;
