
import Hero from "@/components/home/Hero";
import FeaturedCategories from "@/components/home/FeaturedCategories";
import Newsletter from "@/components/home/Newsletter";

const Index = () => {
  return (
    <div className="bg-white">
      <Hero />
      <FeaturedCategories />
      <Newsletter />
    </div>
  );
};

export default Index;
