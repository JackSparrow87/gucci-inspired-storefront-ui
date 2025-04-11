
import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { getProductById } from "@/data/products";
import { useCart } from "@/hooks/useCart";
import { Button } from "@/components/ui/button";
import { 
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Minus, Plus, ShoppingBag } from "lucide-react";

const ProductDetail = () => {
  const { productId } = useParams();
  const { addToCart } = useCart();
  
  const [mainImage, setMainImage] = useState(0);
  const [selectedSize, setSelectedSize] = useState("");
  const [selectedColor, setSelectedColor] = useState("");
  const [quantity, setQuantity] = useState(1);
  
  const product = productId ? getProductById(productId) : null;
  
  if (!product) {
    return (
      <div className="container-custom py-16 text-center">
        <h1 className="text-2xl font-medium mb-4">Product Not Found</h1>
        <p className="mb-6">The product you're looking for doesn't exist or has been removed.</p>
        <Link to="/" className="btn-primary inline-block">
          Return to Home
        </Link>
      </div>
    );
  }
  
  const increaseQuantity = () => {
    setQuantity(prev => prev + 1);
  };
  
  const decreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity(prev => prev - 1);
    }
  };
  
  const handleAddToCart = () => {
    addToCart(product, quantity);
  };
  
  return (
    <div className="container-custom py-12">
      <div className="flex flex-col lg:flex-row gap-12">
        {/* Product Images */}
        <div className="lg:w-1/2">
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
            {/* Thumbnails - desktop: vertical, mobile: horizontal */}
            <div className="hidden md:flex md:flex-col order-1 md:order-none space-y-4">
              {product.images.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setMainImage(index)}
                  className={`border-2 ${mainImage === index ? 'border-gucci-gold' : 'border-transparent'}`}
                >
                  <img 
                    src={image} 
                    alt={`${product.name} - view ${index + 1}`}
                    className="w-full h-auto"
                  />
                </button>
              ))}
            </div>
            
            {/* Main Image */}
            <div className="md:col-span-4">
              <img 
                src={product.images[mainImage]} 
                alt={product.name}
                className="w-full h-auto"
              />
            </div>
            
            {/* Mobile Thumbnails - horizontal */}
            <div className="flex md:hidden space-x-4 mt-4">
              {product.images.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setMainImage(index)}
                  className={`border-2 ${mainImage === index ? 'border-gucci-gold' : 'border-transparent'}`}
                >
                  <img 
                    src={image} 
                    alt={`${product.name} - view ${index + 1}`}
                    className="w-20 h-auto"
                  />
                </button>
              ))}
            </div>
          </div>
        </div>
        
        {/* Product Info */}
        <div className="lg:w-1/2">
          <h1 className="text-3xl font-serif mb-2">{product.name}</h1>
          <p className="text-xl font-medium text-gucci-gold mb-6">R{product.price.toLocaleString()}</p>
          
          <p className="text-gray-600 mb-8">
            {product.description}
          </p>
          
          {/* Color Selection */}
          {product.colors && product.colors.length > 0 && (
            <div className="mb-6">
              <h3 className="text-sm font-medium mb-2">COLOR:</h3>
              <div className="flex space-x-3">
                {product.colors.map(color => (
                  <button
                    key={color}
                    onClick={() => setSelectedColor(color)}
                    className={`w-8 h-8 rounded-full border ${selectedColor === color ? 'ring-2 ring-gucci-gold' : 'ring-1 ring-gray-300'}`}
                    style={{ backgroundColor: color === 'multicolor' ? 'linear-gradient(to right, red, orange, yellow, green, blue, indigo, violet)' : color }}
                    aria-label={color}
                  />
                ))}
              </div>
            </div>
          )}
          
          {/* Size Selection */}
          {product.sizes && product.sizes.length > 0 && (
            <div className="mb-6">
              <div className="flex justify-between items-center mb-2">
                <h3 className="text-sm font-medium">SIZE:</h3>
                <button className="text-sm underline">Size Guide</button>
              </div>
              <Select value={selectedSize} onValueChange={setSelectedSize}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select size" />
                </SelectTrigger>
                <SelectContent>
                  {product.sizes.map(size => (
                    <SelectItem key={size} value={size}>
                      {size}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          )}
          
          {/* Quantity Selection */}
          <div className="mb-8">
            <h3 className="text-sm font-medium mb-2">QUANTITY:</h3>
            <div className="flex border border-gray-300">
              <button 
                onClick={decreaseQuantity}
                className="px-4 py-2 border-r border-gray-300"
                disabled={quantity <= 1}
              >
                <Minus className="h-4 w-4" />
              </button>
              <span className="flex-1 text-center py-2">{quantity}</span>
              <button 
                onClick={increaseQuantity}
                className="px-4 py-2 border-l border-gray-300"
              >
                <Plus className="h-4 w-4" />
              </button>
            </div>
          </div>
          
          {/* Add to Cart Button */}
          <Button 
            onClick={handleAddToCart}
            className="w-full bg-gucci-black hover:bg-gucci-darkGray text-white py-6 mb-6"
          >
            <ShoppingBag className="h-5 w-5 mr-2" />
            Add to Bag
          </Button>
          
          {/* Accordions for additional info */}
          <Accordion type="single" collapsible className="mt-8">
            <AccordionItem value="details">
              <AccordionTrigger className="text-base font-medium py-4">Product Details</AccordionTrigger>
              <AccordionContent>
                <ul className="list-disc pl-5 space-y-2 text-gray-600">
                  <li>Made in Italy</li>
                  <li>{product.category.charAt(0).toUpperCase() + product.category.slice(1)}</li>
                  {product.tags?.map((tag, index) => (
                    <li key={index}>{tag.charAt(0).toUpperCase() + tag.slice(1)}</li>
                  ))}
                </ul>
              </AccordionContent>
            </AccordionItem>
            
            <AccordionItem value="shipping">
              <AccordionTrigger className="text-base font-medium py-4">Shipping & Returns</AccordionTrigger>
              <AccordionContent>
                <p className="text-gray-600 mb-4">
                  Free standard shipping on all orders over R600. Delivery time is typically 3-5 business days.
                </p>
                <p className="text-gray-600">
                  Free returns within 30 days of delivery. Items must be unworn, undamaged, and in their original packaging.
                </p>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
