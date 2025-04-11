
import { Link } from "react-router-dom";

const FeaturedCategories = () => {
  const categories = [
    {
      id: "women",
      name: "Women",
      image: "https://images.unsplash.com/photo-1539008835657-9e8e9680c956?q=80&w=1974&auto=format&fit=crop",
      link: "/category/women"
    },
    {
      id: "men",
      name: "Men",
      image: "https://images.unsplash.com/photo-1552374196-1ab2a1c593e8?q=80&w=1974&auto=format&fit=crop",
      link: "/category/men"
    }
  ];

  return (
    <section className="container-custom py-16">
      <h2 className="section-title">CATEGORIES</h2>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {categories.map(category => (
          <Link 
            key={category.id}
            to={category.link}
            className="group block relative overflow-hidden"
          >
            <div className="aspect-[3/4] overflow-hidden">
              <img 
                src={category.image} 
                alt={category.name}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
            </div>
            
            <div className="absolute inset-0 bg-black bg-opacity-20 transition-opacity duration-300 group-hover:bg-opacity-40 flex items-center justify-center">
              <div className="bg-white bg-opacity-90 px-8 py-3 uppercase tracking-widest text-sm font-medium text-gucci-black">
                {category.name}
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
};

export default FeaturedCategories;
