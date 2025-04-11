
import { Link } from "react-router-dom";

const FeaturedCategories = () => {
  const categories = [
    {
      id: "women",
      name: "Women",
      image: "https://images.unsplash.com/photo-1525450824786-227cbef70703?q=80&w=2070&auto=format&fit=crop",
      link: "/category/women"
    },
    {
      id: "men",
      name: "Men",
      image: "https://images.unsplash.com/photo-1487222477894-8943e31ef7b2?q=80&w=2073&auto=format&fit=crop",
      link: "/category/men"
    }
  ];

  return (
    <section className="py-24">
      <div className="container-custom">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
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
                  className="w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-105"
                />
              </div>
              
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="bg-white bg-opacity-80 px-12 py-4 uppercase tracking-widest text-sm font-light text-black transition-all duration-300 group-hover:bg-opacity-90">
                  {category.name}
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedCategories;
