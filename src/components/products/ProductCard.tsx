
import { Link } from "react-router-dom";
import { Product } from "@/types";
import { useCart } from "@/hooks/useCart";
import { Button } from "@/components/ui/button";
import { ShoppingBag } from "lucide-react";

interface ProductCardProps {
  product: Product;
}

const ProductCard = ({ product }: ProductCardProps) => {
  const { addToCart } = useCart();
  
  return (
    <div className="group">
      <Link to={`/product/${product.id}`} className="block relative">
        <div className="aspect-product overflow-hidden bg-gucci-lightGray">
          <img
            src={product.images[0]}
            alt={product.name}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
          {product.isNew && (
            <div className="absolute top-2 right-2 bg-oldrose text-white px-3 py-1 text-xs uppercase tracking-wider">
              New
            </div>
          )}
        </div>
        
        <div className="mt-4 px-1">
          <h3 className="font-medium">{product.name}</h3>
          <p className="text-oldrose font-medium mt-1">R{product.price.toLocaleString()}</p>
        </div>
      </Link>
      
      <div className="mt-3 px-1">
        <Button 
          onClick={() => addToCart(product)} 
          className="w-full bg-oldrose hover:bg-oldrose/90 text-white rounded-none"
        >
          <ShoppingBag className="h-4 w-4 mr-2" />
          Add to Bag
        </Button>
      </div>
    </div>
  );
};

export default ProductCard;
