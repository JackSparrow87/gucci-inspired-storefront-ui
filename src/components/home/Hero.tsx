
import { Link } from "react-router-dom";

const Hero = () => {
  return (
    <div className="relative h-[90vh] overflow-hidden">
      <div className="absolute inset-0">
        <img 
          src="https://images.unsplash.com/photo-1527181599081-e2f071bc4bca?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" 
          alt="Riri Fashion"
          className="w-full h-full object-cover object-center"
        />
      </div>
      
      <div className="absolute inset-0 bg-black bg-opacity-20" />
      
      <div className="absolute inset-0 flex flex-col items-center justify-center text-white text-center p-4">
        <h1 className="text-5xl md:text-7xl font-serif font-light mb-6 tracking-wider">
          RIRI
        </h1>
        <p className="text-lg md:text-xl mb-10 max-w-md font-light tracking-widest uppercase">
          Elegance in simplicity
        </p>
        <div className="flex space-x-8">
          <Link to="/category/women" className="border border-white text-white px-8 py-3 hover:bg-white hover:text-black transition-colors duration-300 uppercase tracking-widest text-sm">
            Women
          </Link>
          <Link to="/category/men" className="border border-white text-white px-8 py-3 hover:bg-white hover:text-black transition-colors duration-300 uppercase tracking-widest text-sm">
            Men
          </Link>
        </div>
        
      </div>
      
    </div>
  );
};

export default Hero;
