
import { Link } from "react-router-dom";

const Hero = () => {
  return (
    <div className="relative h-[80vh] overflow-hidden">
      <div className="absolute inset-0">
        <img 
          src="https://images.unsplash.com/photo-1445205170230-053b83016050?q=80&w=2071&auto=format&fit=crop" 
          alt="Luxify Fashion"
          className="w-full h-full object-cover object-center"
        />
      </div>
      
      <div className="absolute inset-0 bg-black bg-opacity-30" />
      
      <div className="absolute inset-0 flex flex-col items-center justify-center text-white text-center p-4">
        <h1 className="text-4xl md:text-6xl font-serif font-bold mb-4 tracking-wide">
          FALL WINTER 2023
        </h1>
        <p className="text-lg md:text-xl mb-8 max-w-xl font-light">
          Discover the new collection and redefine your style with luxury
        </p>
        <div className="flex space-x-4">
          <Link to="/category/women" className="btn-primary">
            Shop Women
          </Link>
          <Link to="/category/men" className="btn-primary">
            Shop Men
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Hero;
