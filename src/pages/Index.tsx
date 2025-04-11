
import Hero from "@/components/home/Hero";
import FeaturedCategories from "@/components/home/FeaturedCategories";
import Newsletter from "@/components/home/Newsletter";
import FeaturedSection from "@/components/home/HeroSection";

const Index = () => {
  return (
    <div className="bg-white">
      <Hero />
      <FeaturedCategories />
      <FeaturedSection />
      <Newsletter />
      
    </div>
  );
};

export default Index;
