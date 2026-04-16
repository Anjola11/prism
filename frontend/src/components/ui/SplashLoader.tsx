import React, { useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';
import { Logo } from './Logo';

interface SplashLoaderProps {
  onComplete?: () => void;
}

export const SplashLoader: React.FC<SplashLoaderProps> = ({ onComplete }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const logoRef = useRef<HTMLDivElement>(null);
  const scanLineRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        onComplete: () => {
          gsap.to(containerRef.current, {
            opacity: 0,
            duration: 0.3,
            onComplete: onComplete
          });
        }
      });

      // 1. Logo fades in
      tl.fromTo(logoRef.current, 
        { opacity: 0, scale: 0.8 },
        { opacity: 1, scale: 1, duration: 0.4, ease: "power2.out" }
      );

      // 2. Refraction rays (targets specifically the rays in the Logo SVG)
      // Note: We'll target them via class if possible, or just animate them in the SVG
      tl.from(".refraction-rays line", {
        scaleX: 0,
        transformOrigin: "left center",
        duration: 0.5,
        stagger: 0.08,
        ease: "power2.out"
      }, "+=0");

      // 3. Wordmark letters fade in
      // Target the text span
      const letters = document.querySelectorAll(".wordmark-letter");
      if (letters.length > 0) {
        tl.fromTo(letters,
          { opacity: 0, y: 8 },
          { opacity: 1, y: 0, duration: 0.4, stagger: 0.04, ease: "power2.out" },
          "-=0.2"
        );
      } else {
        // Fallback for wordmark if not split
        tl.fromTo(".wordmark-text",
          { opacity: 0, y: 8 },
          { opacity: 1, y: 0, duration: 0.4, ease: "power2.out" },
          "-=0.2"
        );
      }

      // 4. Scan line
      tl.fromTo(scanLineRef.current,
        { scaleX: 0 },
        { scaleX: 1, duration: 0.6, ease: "power1.inOut" }
      );

      // Wait a bit
      tl.to({}, { duration: 0.5 });
    }, containerRef);

    return () => ctx.revert();
  }, [onComplete]);

  // Split wordmark into letters for animation
  const wordmark = "PRISM";
  
  return (
    <div 
      ref={containerRef}
      className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-prism-navy"
    >
      <div className="flex flex-col items-center">
        <div ref={logoRef}>
          {/* We'll use a modified Logo component here or just manually render it to handle the split animation */}
          <div className="flex items-center gap-3">
            <Logo variant="full" className="logo-icon-only" />
          </div>
        </div>
        
        <div className="mt-8 flex flex-col items-center">
          <div ref={textRef} className="flex font-mono font-bold uppercase tracking-[0.2em] text-2xl text-prism-text-1 overflow-hidden">
             {/* We'll handle letters manually for the stagger */}
             {wordmark.split("").map((char, i) => (
               <span key={i} className="wordmark-letter inline-block">{char}</span>
             ))}
          </div>
          
          <div className="relative mt-2 w-32 h-[1px] bg-prism-navy-3 overflow-hidden">
            <div 
              ref={scanLineRef}
              className="absolute inset-0 bg-prism-steel origin-left"
            ></div>
          </div>
          
          <div className="mt-4 font-mono text-[10px] uppercase tracking-widest text-[#4A6785]">
            INITIALIZING SIGNAL ENGINE...
          </div>
        </div>
      </div>
    </div>
  );
};
