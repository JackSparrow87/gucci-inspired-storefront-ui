
import { useState } from "react";
import { Link } from "react-router-dom";
import { Search, ShoppingBag, User, Menu, X } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { useCart } from "@/hooks/useCart";
import MobileMenu from "./MobileMenu";
import SearchModal from "../search/SearchModal";

const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const { cartItems } = useCart();
  
  const cartItemsCount = cartItems.length;

  return (
    <header className="border-b border-gucci-lightGray sticky top-0 bg-white z-50">
      <div className="container-custom py-4">
        <div className="flex items-center justify-between">
          {/* Mobile menu button */}
          <button 
            className="md:hidden"
            onClick={() => setMobileMenuOpen(true)}
          >
            <Menu className="h-6 w-6" />
          </button>
          
          {/* Logo */}
          <div className="flex-1 flex justify-start md:justify-center">
            <Link to="/" className="text-3xl font-serif font-bold tracking-tight">
              LUXIFY
            </Link>
          </div>

          {/* Navigation - Desktop only */}
          <nav className="hidden md:flex items-center space-x-8 mx-8">
            <Link to="/category/women" className="nav-link">Women</Link>
            <Link to="/category/men" className="nav-link">Men</Link>
            <Link to="/category/accessories" className="nav-link">Accessories</Link>
          </nav>

          {/* Actions */}
          <div className="flex items-center space-x-4">
            <button 
              className="p-1 hover:text-gucci-gold transition-colors"
              onClick={() => setSearchOpen(true)}
            >
              <Search className="h-5 w-5" />
            </button>
            
            <Link to="/account" className="p-1 hover:text-gucci-gold transition-colors">
              <User className="h-5 w-5" />
            </Link>
            
            <Link to="/cart" className="p-1 hover:text-gucci-gold transition-colors relative">
              <ShoppingBag className="h-5 w-5" />
              {cartItemsCount > 0 && (
                <Badge className="absolute -top-2 -right-2 bg-gucci-gold text-white text-xs min-w-[1.25rem] h-[1.25rem] flex items-center justify-center rounded-full p-0">
                  {cartItemsCount}
                </Badge>
              )}
            </Link>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <MobileMenu isOpen={mobileMenuOpen} onClose={() => setMobileMenuOpen(false)} />
      
      {/* Search Modal */}
      <SearchModal isOpen={searchOpen} onClose={() => setSearchOpen(false)} />
    </header>
  );
};

export default Header;
