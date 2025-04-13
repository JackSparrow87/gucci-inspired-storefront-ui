
import { useState } from "react";
import { Link } from "react-router-dom";
import { Search, ShoppingBag, User, Menu, LogOut } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { useCart } from "@/hooks/useCart";
import { useAuth } from "@/hooks/useAuth";
import MobileMenu from "./MobileMenu";
import SearchModal from "../search/SearchModal";
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuSeparator, 
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";

const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const { cartItems } = useCart();
  const { user, signOut, isAuthenticated } = useAuth();
  
  const cartItemsCount = cartItems.length;

  return (
    <header className="border-b border-gray-100 sticky top-0 bg-white z-50">
      <div className="container-custom py-5">
        <div className="flex items-center justify-between">
          {/* Mobile menu button */}
          <button 
            className="md:hidden"
            onClick={() => setMobileMenuOpen(true)}
          >
            <Menu className="h-5 w-5" />
          </button>
          
          {/* Logo */}
          <div className="flex-1 flex justify-start md:justify-center">
            <Link to="/" className="text-3xl font-allura tracking-widest">
              Riri
            </Link>
          </div>

          {/* Navigation - Desktop only */}
          <nav className="hidden md:flex items-center space-x-12 mx-8">
            <Link to="/category/women" className="nav-link text-sm tracking-widest font-light uppercase">Women</Link>
            <Link to="/category/men" className="nav-link text-sm tracking-widest font-light uppercase">Men</Link>
          </nav>

          {/* Actions */}
          <div className="flex items-center space-x-5">
            <button 
              className="p-1 hover:text-oldrose transition-colors"
              onClick={() => setSearchOpen(true)}
            >
              <Search className="h-5 w-5" />
            </button>
            
            {isAuthenticated ? (
              <DropdownMenu>
                <DropdownMenuTrigger className="p-1 hover:text-oldrose transition-colors outline-none">
                  <User className="h-5 w-5" />
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem asChild>
                    <Link to="/profile" className="cursor-pointer">My Profile</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link to="/orders" className="cursor-pointer">My Orders</Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem 
                    className="cursor-pointer text-destructive flex items-center gap-2"
                    onClick={() => signOut()}
                  >
                    <LogOut className="h-4 w-4" /> Sign Out
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <Link to="/auth" className="p-1 hover:text-oldrose transition-colors">
                <User className="h-5 w-5" />
              </Link>
            )}
            
            <Link to="/cart" className="p-1 hover:text-oldrose transition-colors relative">
              <ShoppingBag className="h-5 w-5" />
              {cartItemsCount > 0 && (
                <Badge className="absolute -top-2 -right-2 bg-oldrose text-white text-xs min-w-[1.25rem] h-[1.25rem] flex items-center justify-center rounded-full p-0">
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
