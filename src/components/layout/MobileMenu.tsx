
import { X } from "lucide-react";
import { Link } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

const MobileMenu = ({ isOpen, onClose }: MobileMenuProps) => {
  const { isAuthenticated, signOut } = useAuth();

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-white z-50 overflow-y-auto">
      <div className="container-custom py-4">
        <div className="flex justify-between items-center mb-8">
          <Link to="/" className="text-3xl font-allura tracking-widest" onClick={onClose}>
            Riri
          </Link>
          <button onClick={onClose}>
            <X className="h-6 w-6" />
          </button>
        </div>
        
        <nav className="flex flex-col space-y-6">
          <Link 
            to="/category/women" 
            className="text-2xl font-serif uppercase tracking-wide py-2 border-b border-oldrose/20"
            onClick={onClose}
          >
            Women
          </Link>
          <Link 
            to="/category/men" 
            className="text-2xl font-serif uppercase tracking-wide py-2 border-b border-oldrose/20"
            onClick={onClose}
          >
            Men
          </Link>
          
          <div className="pt-8 space-y-4">
            {isAuthenticated ? (
              <>
                <Link 
                  to="/profile" 
                  className="block py-2 uppercase tracking-wide"
                  onClick={onClose}
                >
                  My Profile
                </Link>
                <Link 
                  to="/orders" 
                  className="block py-2 uppercase tracking-wide"
                  onClick={onClose}
                >
                  Order Tracking
                </Link>
                <button 
                  className="block py-2 uppercase tracking-wide w-full text-left text-oldrose"
                  onClick={() => {
                    signOut();
                    onClose();
                  }}
                >
                  Sign Out
                </button>
              </>
            ) : (
              <Link 
                to="/auth" 
                className="block py-2 uppercase tracking-wide"
                onClick={onClose}
              >
                Sign In / Register
              </Link>
            )}
            <Link 
              to="/cart" 
              className="block py-2 uppercase tracking-wide"
              onClick={onClose}
            >
              Shopping Bag
            </Link>
          </div>
        </nav>
      </div>
    </div>
  );
};

export default MobileMenu;
