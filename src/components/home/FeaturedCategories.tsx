
import { Link } from "react-router-dom";

const FeaturedCategories = () => {
  const categories = [
    {
      id: "women",
      name: "Women",
      image: "https://images.unsplash.com/photo-1527203561188-dae1bc1a417f?q=80&w=2030&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      link: "/category/women"
    },
    {
      id: "men",
      name: "Men",
      image: "https://images.unsplash.com/photo-1688143030645-a84f15553f9f?q=80&w=1972&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
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
