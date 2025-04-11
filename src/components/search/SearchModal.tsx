
import { useState, useEffect, useRef } from "react";
import { X, Search as SearchIcon } from "lucide-react";
import { Link } from "react-router-dom";
import { products } from "@/data/products";
import { Product } from "@/types";

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const SearchModal = ({ isOpen, onClose }: SearchModalProps) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<Product[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);
  
  // Focus input when modal opens
  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);
  
  // Search products based on query
  useEffect(() => {
    if (searchQuery.trim() === "") {
      setSearchResults([]);
      return;
    }
    
    const query = searchQuery.toLowerCase();
    const results = products.filter(product => 
      product.name.toLowerCase().includes(query) || 
      product.description.toLowerCase().includes(query) ||
      (product.tags && product.tags.some(tag => tag.toLowerCase().includes(query)))
    );
    
    setSearchResults(results);
  }, [searchQuery]);
  
  // Close modal when Escape key is pressed
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };
    
    document.addEventListener("keydown", handleEscape);
    return () => {
      document.removeEventListener("keydown", handleEscape);
    };
  }, [onClose]);
  
  if (!isOpen) return null;
  
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-start justify-center pt-20">
      <div className="bg-white w-full max-w-4xl rounded-md shadow-lg max-h-[80vh] overflow-hidden flex flex-col">
        <div className="p-4 border-b border-gray-200 flex items-center">
          <SearchIcon className="h-5 w-5 text-gray-400 mr-2" />
          <input
            ref={inputRef}
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search for products..."
            className="flex-1 outline-none text-lg"
          />
          <button onClick={onClose} className="ml-2">
            <X className="h-5 w-5 text-gray-400 hover:text-gray-600" />
          </button>
        </div>
        
        <div className="overflow-y-auto flex-1 p-4">
          {searchQuery.trim() === "" ? (
            <div className="text-center py-8 text-gray-500">
              Type to search for products
            </div>
          ) : searchResults.length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              No products found for "{searchQuery}"
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {searchResults.map(product => (
                <Link
                  key={product.id}
                  to={`/product/${product.id}`}
                  onClick={onClose}
                  className="flex items-center p-2 rounded hover:bg-gray-100 transition-colors"
                >
                  <div className="w-20 h-20 bg-gray-200 mr-4 flex-shrink-0">
                    <img 
                      src={product.images[0]} 
                      alt={product.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-medium">{product.name}</h3>
                    <p className="text-gucci-gold font-medium">R{product.price.toLocaleString()}</p>
                    <p className="text-sm text-gray-500 capitalize">{product.category}</p>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
        
        {searchResults.length > 0 && (
          <div className="p-4 border-t border-gray-200">
            <Link
              to={`/search?q=${searchQuery}`}
              onClick={onClose}
              className="text-gucci-black hover:text-gucci-gold transition-colors text-sm font-medium"
            >
              View all {searchResults.length} results
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchModal;
