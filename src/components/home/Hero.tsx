
import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";

const Hero = () => {
  const headingRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const buttonsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Initial animations
    const heading = headingRef.current;
    const subtitle = subtitleRef.current;
    const buttons = buttonsRef.current;

    if (heading) {
      heading.classList.add('animate-slide-up');
      heading.style.animationDelay = '0.3s';
    }

    if (subtitle) {
      subtitle.classList.add('animate-slide-up');
      subtitle.style.animationDelay = '0.6s';
    }

    if (buttons) {
      buttons.classList.add('animate-slide-up');
      buttons.style.animationDelay = '0.9s';
    }

    // Scroll animations
    const handleScroll = () => {
      const scrollElements = document.querySelectorAll('.animate-on-scroll');
      
      scrollElements.forEach(el => {
        const elementTop = el.getBoundingClientRect().top;
        const elementVisible = 150;
        
        if (elementTop < window.innerHeight - elementVisible) {
          el.classList.add('is-visible');
        }
      });
    };

    // Add scroll event listener
    window.addEventListener('scroll', handleScroll);
    
    // Trigger once on load for elements already in view
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div className="relative h-[90vh] overflow-hidden">
      <div className="absolute inset-0">
        <img 
          src="https://images.unsplash.com/photo-1527181599081-e2f071bc4bca?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" 
          alt="Riri Fashion"
          className="w-full h-full object-cover object-center"
        />
      </div>
      
      <div className="absolute inset-0 bg-black bg-opacity-10" />
      
      <div className="absolute inset-0 flex flex-col items-center justify-center text-white text-center p-4">
        <h1 
          ref={headingRef}
          className="text-5xl md:text-7xl font-allura mb-6 tracking-wider opacity-0"
        >
          Riri
        </h1>
        <p 
          ref={subtitleRef}
          className="text-lg md:text-xl mb-10 max-w-md font-light tracking-widest uppercase opacity-0"
        >
          Elegance in simplicity
        </p>
        <div 
          ref={buttonsRef}
          className="flex space-x-8 opacity-0"
        >
          <Link 
            to="/category/women" 
            className="border border-white text-white px-8 py-3 hover:bg-oldrose hover:border-oldrose hover:text-white transition-colors duration-300 uppercase tracking-widest text-sm"
          >
            Women
          </Link>
          <Link 
            to="/category/men" 
            className="border border-white text-white px-8 py-3 hover:bg-oldrose hover:border-oldrose hover:text-white transition-colors duration-300 uppercase tracking-widest text-sm"
          >
            Men
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Hero;
