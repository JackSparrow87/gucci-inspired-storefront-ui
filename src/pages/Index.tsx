
import Hero from "@/components/home/Hero";
import ProductGrid from "@/components/products/ProductGrid";
import FeaturedCategories from "@/components/home/FeaturedCategories";
import Newsletter from "@/components/home/Newsletter";
import { getFeaturedProducts, getNewProducts } from "@/data/products";

const Index = () => {
  const featuredProducts = getFeaturedProducts();
  const newProducts = getNewProducts();
  
  return (
    <div>
      <Hero />
      
      <div className="container-custom py-16">
        <ProductGrid products={featuredProducts} title="FEATURED PRODUCTS" />
      </div>
      
      <FeaturedCategories />
      
      <div className="container-custom py-16">
        <ProductGrid products={newProducts} title="NEW ARRIVALS" />
      </div>
      
      <Newsletter />
    </div>
  );
};

export default Index;
