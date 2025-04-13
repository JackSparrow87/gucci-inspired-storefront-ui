
import { useEffect } from "react";
import Hero from "@/components/home/Hero";
import FeaturedCategories from "@/components/home/FeaturedCategories";
import Newsletter from "@/components/home/Newsletter";
import FeaturedSection from "@/components/home/HeroSection";

const Index = () => {
  useEffect(() => {
    // Function to handle animations on scroll
    const handleScrollAnimations = () => {
      const elements = document.querySelectorAll('.animate-on-scroll');
      
      elements.forEach(element => {
        const position = element.getBoundingClientRect();
        
        // If element is in viewport
        if (position.top < window.innerHeight * 0.8) {
          element.classList.add('is-visible');
        }
      });
    };
    
    // Add event listener
    window.addEventListener('scroll', handleScrollAnimations);
    
    // Run once on component mount to check for elements already in view
    handleScrollAnimations();
    
    // Clean up
    return () => {
      window.removeEventListener('scroll', handleScrollAnimations);
    };
  }, []);

  return (
    <div className="bg-white">
      <Hero />
      <div className="animate-on-scroll">
        <FeaturedCategories />
      </div>
      <div className="animate-on-scroll">
        <FeaturedSection />
      </div>
      <div className="animate-on-scroll">
        <Newsletter />
      </div>
    </div>
  );
};

export default Index;
