import React, { useRef, useEffect } from 'react';

interface FlowTextProps {
  text: string;
  className?: string;
}

const FlowText: React.FC<FlowTextProps> = ({ text, className = '' }) => {
  const textRef = useRef<HTMLHeadingElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let requestId: number;

    const calculateEffect = () => {
      if (!textRef.current || !containerRef.current) return;

      const element = textRef.current;
      const rect = element.getBoundingClientRect();
      const viewportHeight = window.innerHeight;
      const viewportCenter = viewportHeight / 2;
      const elementCenter = rect.top + rect.height / 2;
      
      // Calculate distance from center (absolute value)
      const distanceFromCenter = Math.abs(viewportCenter - elementCenter);
      
      // Define the active zone where the effect happens
      // We want the effect to be fully applied (blurred) when the item is towards the edges
      // and fully clear when in the center.
      const maxDistance = viewportHeight * 0.55; // Effect range
      
      // Normalize distance to a 0-1 range (0 = center, 1 = edge)
      // We clamp it to ensure it stays within bounds
      let progress = Math.min(distanceFromCenter / maxDistance, 1);
      
      // Apply an easing function for a more "organic" feel (e.g., ease-in-out)
      // Google Flow often uses slightly exponential curves for smoothness
      // progress = 1 means far away (blurred), 0 means center (clear)
      
      // Values configuration
      const MAX_BLUR = 24; // px
      const MIN_OPACITY = 0.3;
      const MAX_SCALE = 1.05; // When focused
      const MIN_SCALE = 0.95; // When blurred
      
      // Interpolate values
      const blurAmount = progress * MAX_BLUR;
      const opacityAmount = 1 - (progress * (1 - MIN_OPACITY));
      
      // Scale logic: Scale UP as it gets to center.
      // At center (progress 0) -> Scale 1.05
      // At edge (progress 1) -> Scale 0.95
      const scaleAmount = MIN_SCALE + ((1 - progress) * (MAX_SCALE - MIN_SCALE));

      // Apply styles directly to the DOM for performance (avoiding React render cycle)
      element.style.filter = `blur(${blurAmount.toFixed(2)}px)`;
      element.style.opacity = opacityAmount.toFixed(3);
      element.style.transform = `scale3d(${scaleAmount.toFixed(3)}, ${scaleAmount.toFixed(3)}, 1)`;
    };

    const onScroll = () => {
      if (!requestId) {
        requestId = requestAnimationFrame(() => {
          calculateEffect();
          requestId = 0;
        });
      }
    };

    // Initial calculation
    calculateEffect();

    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', calculateEffect);

    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', calculateEffect);
      if (requestId) cancelAnimationFrame(requestId);
    };
  }, []);

  return (
    <div ref={containerRef} className="relative flex justify-center items-center py-20 w-full perspective-1000">
      <h1
        ref={textRef}
        className={`
          text-[15vw] md:text-[12rem] lg:text-[16rem] leading-none font-extrabold tracking-tighter text-transparent bg-clip-text bg-gradient-to-b from-white to-white/80
          will-change-[transform,opacity,filter]
          transition-colors duration-100 ease-linear
          select-none
          ${className}
        `}
        style={{
          // Initial state before JS takes over
          filter: 'blur(20px)',
          opacity: 0.6,
          transform: 'scale(1.0)',
        }}
      >
        {text}
      </h1>
    </div>
  );
};

export default FlowText;