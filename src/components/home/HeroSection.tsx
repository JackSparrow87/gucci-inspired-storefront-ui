import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';

const HeroSection: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const text = textRef.current;

    if (!section || !text) return;

    // Add animation class immediately instead of waiting for scroll
    text.classList.add('animate-fade-in');

    const handleScroll = () => {
      const sectionTop = section.getBoundingClientRect().top;
      const windowHeight = window.innerHeight;
      
      // Keep the animation visible when in viewport
      if (sectionTop < windowHeight * 0.75) {
        if (!text.classList.contains('animate-fade-in')) {
          text.classList.add('animate-fade-in');
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    
    // Check once on load
    handleScroll();
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="w-full" ref={sectionRef}>
      <div className="relative h-[90vh] overflow-hidden">
        <div className="absolute inset-0">
          <img 
            src="https://images.unsplash.com/photo-1586437474999-0fccfae90418?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" 
            alt="Riri Fashion"
            className="w-full h-full object-cover object-center"
          />
        </div>
        
        <div className="absolute inset-0 bg-black bg-opacity-20" />
        
        <div className="absolute inset-0 flex flex-col items-center justify-center text-white text-center p-4">
          <p 
            ref={textRef}
            className="text-lg md:text-xl mb-10 max-w-md font-light tracking-widest uppercase"
          >
            Elegance in simplicity
          </p>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
