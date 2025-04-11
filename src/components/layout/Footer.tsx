
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-gucci-black text-white mt-20">
      <div className="container-custom py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          <div>
            <h4 className="text-xl font-serif mb-4">LUXIFY</h4>
            <p className="text-sm text-gray-300 mb-4">
              Discover the world of luxury fashion and accessories.
            </p>
          </div>
          
          <div>
            <h5 className="font-medium uppercase mb-4 text-sm tracking-wider">
              Shop
            </h5>
            <ul className="space-y-2 text-gray-300 text-sm">
              <li><Link to="/category/women" className="hover:text-gucci-gold transition-colors">Women</Link></li>
              <li><Link to="/category/men" className="hover:text-gucci-gold transition-colors">Men</Link></li>
              <li><Link to="/category/accessories" className="hover:text-gucci-gold transition-colors">Accessories</Link></li>
              <li><Link to="/new-arrivals" className="hover:text-gucci-gold transition-colors">New Arrivals</Link></li>
            </ul>
          </div>
          
          <div>
            <h5 className="font-medium uppercase mb-4 text-sm tracking-wider">
              Customer Service
            </h5>
            <ul className="space-y-2 text-gray-300 text-sm">
              <li><Link to="/contact" className="hover:text-gucci-gold transition-colors">Contact Us</Link></li>
              <li><Link to="/shipping" className="hover:text-gucci-gold transition-colors">Shipping & Returns</Link></li>
              <li><Link to="/orders" className="hover:text-gucci-gold transition-colors">Order Tracking</Link></li>
              <li><Link to="/faq" className="hover:text-gucci-gold transition-colors">FAQ</Link></li>
            </ul>
          </div>
          
          <div>
            <h5 className="font-medium uppercase mb-4 text-sm tracking-wider">
              About
            </h5>
            <ul className="space-y-2 text-gray-300 text-sm">
              <li><Link to="/about" className="hover:text-gucci-gold transition-colors">Our Story</Link></li>
              <li><Link to="/sustainability" className="hover:text-gucci-gold transition-colors">Sustainability</Link></li>
              <li><Link to="/careers" className="hover:text-gucci-gold transition-colors">Careers</Link></li>
              <li><Link to="/privacy" className="hover:text-gucci-gold transition-colors">Privacy Policy</Link></li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-800 mt-12 pt-8 text-sm text-gray-400 flex flex-col md:flex-row justify-between">
          <p>© 2025 LUXIFY. All rights reserved.</p>
          <div className="space-x-4 mt-4 md:mt-0">
            <Link to="/terms" className="hover:text-gucci-gold transition-colors">Terms</Link>
            <Link to="/privacy" className="hover:text-gucci-gold transition-colors">Privacy</Link>
            <Link to="/cookies" className="hover:text-gucci-gold transition-colors">Cookies</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
