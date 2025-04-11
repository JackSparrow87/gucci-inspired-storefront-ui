
import { Link } from "react-router-dom";

const FeaturedCategories = () => {
  const categories = [
    {
      id: "women",
      name: "Women",
      image: "https://media.gucci.com/content/DarkGray_CategoryDoubleCard_Standard_926x1112/1673444110/CategoryDoubleCard_Gucci-Cruise-23_Women_001_Default.jpg",
      link: "/category/women"
    },
    {
      id: "men",
      name: "Men",
      image: "https://media.gucci.com/content/DarkGray_CategoryDoubleCard_Standard_926x1112/1673444110/CategoryDoubleCard_Gucci-Cruise-23_Men_001_Default.jpg",
      link: "/category/men"
    },
    {
      id: "bags",
      name: "Bags",
      image: "https://media.gucci.com/content/DarkGray_CategoryDoubleCard_Standard_926x1112/1679663725/CategoryDoubleCard_Gucci-Cruise-23_Bags_001_Default.jpg",
      link: "/category/bags"
    },
    {
      id: "accessories",
      name: "Accessories",
      image: "https://media.gucci.com/content/DarkGray_CategoryDoubleCard_Standard_926x1112/1679663723/CategoryDoubleCard_Gucci-Cruise-23_Accessories_001_Default.jpg",
      link: "/category/accessories"
    }
  ];

  return (
    <section className="container-custom py-16">
      <h2 className="section-title">CATEGORIES</h2>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
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
