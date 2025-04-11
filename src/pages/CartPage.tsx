
import { useState } from "react";
import { Link } from "react-router-dom";
import { useCart } from "@/hooks/useCart";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Minus, Plus, X } from "lucide-react";

const CartPage = () => {
  const { cartItems, removeFromCart, updateQuantity, subtotal } = useCart();
  const [promoCode, setPromoCode] = useState("");
  const [promoApplied, setPromoApplied] = useState(false);
  
  const shippingCost = subtotal > 200 ? 0 : 20;
  const discount = promoApplied ? subtotal * 0.1 : 0;
  const totalCost = subtotal + shippingCost - discount;
  
  const handlePromoSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (promoCode.toLowerCase() === "welcome10") {
      setPromoApplied(true);
    }
  };
  
  if (cartItems.length === 0) {
    return (
      <div className="container-custom py-16 text-center">
        <h1 className="text-3xl font-serif mb-6">Your Shopping Bag</h1>
        <p className="text-gray-600 mb-8">Your bag is empty</p>
        <Link to="/" className="btn-primary">
          Continue Shopping
        </Link>
      </div>
    );
  }
  
  return (
    <div className="container-custom py-12">
      <h1 className="text-3xl font-serif text-center mb-8">Your Shopping Bag</h1>
      
      <div className="flex flex-col lg:flex-row gap-12">
        {/* Cart Items */}
        <div className="lg:w-2/3">
          <div className="border-b border-gray-200 pb-2 mb-4 hidden md:grid md:grid-cols-12 gap-4">
            <div className="col-span-6">
              <h3 className="font-medium text-sm uppercase">Product</h3>
            </div>
            <div className="col-span-2 text-center">
              <h3 className="font-medium text-sm uppercase">Price</h3>
            </div>
            <div className="col-span-2 text-center">
              <h3 className="font-medium text-sm uppercase">Quantity</h3>
            </div>
            <div className="col-span-2 text-right">
              <h3 className="font-medium text-sm uppercase">Total</h3>
            </div>
          </div>
          
          {/* Mobile view: stacked items */}
          <div className="md:hidden space-y-6">
            {cartItems.map(item => (
              <div key={item.product.id} className="border-b border-gray-200 pb-6">
                <div className="flex gap-4">
                  <Link to={`/product/${item.product.id}`} className="w-24 h-32 bg-gray-100 flex-shrink-0">
                    <img
                      src={item.product.images[0]}
                      alt={item.product.name}
                      className="w-full h-full object-cover"
                    />
                  </Link>
                  
                  <div className="flex-1">
                    <div className="flex justify-between">
                      <Link to={`/product/${item.product.id}`} className="font-medium">
                        {item.product.name}
                      </Link>
                      <button 
                        onClick={() => removeFromCart(item.product.id)}
                        className="text-gray-400 hover:text-gray-700"
                      >
                        <X className="h-5 w-5" />
                      </button>
                    </div>
                    
                    <p className="text-gray-500 text-sm capitalize mb-4">
                      {item.product.category}
                    </p>
                    
                    <div className="mb-3">
                      <p className="font-medium">R{item.product.price.toLocaleString()}</p>
                    </div>
                    
                    <div className="flex border border-gray-300 w-28">
                      <button 
                        onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                        className="px-3 py-1 border-r border-gray-300"
                        disabled={item.quantity <= 1}
                      >
                        <Minus className="h-3 w-3" />
                      </button>
                      <span className="flex-1 text-center py-1">{item.quantity}</span>
                      <button 
                        onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                        className="px-3 py-1 border-l border-gray-300"
                      >
                        <Plus className="h-3 w-3" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          {/* Desktop view: table layout */}
          <div className="hidden md:block space-y-6">
            {cartItems.map(item => (
              <div key={item.product.id} className="grid grid-cols-12 gap-4 items-center border-b border-gray-200 pb-6">
                <div className="col-span-6">
                  <div className="flex gap-4">
                    <Link to={`/product/${item.product.id}`} className="w-24 h-32 bg-gray-100 flex-shrink-0">
                      <img
                        src={item.product.images[0]}
                        alt={item.product.name}
                        className="w-full h-full object-cover"
                      />
                    </Link>
                    
                    <div>
                      <Link to={`/product/${item.product.id}`} className="font-medium block mb-1">
                        {item.product.name}
                      </Link>
                      <p className="text-gray-500 text-sm capitalize">
                        {item.product.category}
                      </p>
                    </div>
                  </div>
                </div>
                
                <div className="col-span-2 text-center">
                  <p className="font-medium">R{item.product.price.toLocaleString()}</p>
                </div>
                
                <div className="col-span-2 text-center">
                  <div className="flex border border-gray-300 mx-auto w-28">
                    <button 
                      onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                      className="px-3 py-1 border-r border-gray-300"
                      disabled={item.quantity <= 1}
                    >
                      <Minus className="h-3 w-3" />
                    </button>
                    <span className="flex-1 text-center py-1">{item.quantity}</span>
                    <button 
                      onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                      className="px-3 py-1 border-l border-gray-300"
                    >
                      <Plus className="h-3 w-3" />
                    </button>
                  </div>
                </div>
                
                <div className="col-span-2 text-right flex justify-between items-center">
                  <button 
                    onClick={() => removeFromCart(item.product.id)}
                    className="text-gray-400 hover:text-gray-700"
                  >
                    <X className="h-5 w-5" />
                  </button>
                  
                  <p className="font-medium">
                    ${(item.product.price * item.quantity).toLocaleString()}
                  </p>
                </div>
              </div>
            ))}
          </div>
          
          <div className="mt-8 flex justify-between items-center">
            <Link to="/" className="text-gucci-black underline hover:text-gucci-gold transition-colors">
              Continue Shopping
            </Link>
          </div>
        </div>
        
        {/* Order Summary */}
        <div className="lg:w-1/3 bg-gray-50 p-6 h-fit">
          <h2 className="text-xl font-medium mb-6">Order Summary</h2>
          
          <div className="space-y-4 mb-6">
            <div className="flex justify-between">
              <span>Subtotal</span>
              <span className="font-medium">R{subtotal.toLocaleString()}</span>
            </div>
            
            <div className="flex justify-between">
              <span>Shipping</span>
              <span className="font-medium">
                {shippingCost === 0 ? "Free" : `$${shippingCost.toLocaleString()}`}
              </span>
            </div>
            
            {promoApplied && (
              <div className="flex justify-between text-gucci-red">
                <span>Discount</span>
                <span className="font-medium">-R{discount.toLocaleString()}</span>
              </div>
            )}
            
            <div className="border-t border-gray-300 pt-4 flex justify-between text-lg">
              <span className="font-medium">Total</span>
              <span className="font-bold">R{totalCost.toLocaleString()}</span>
            </div>
          </div>
          
          {/* Promo Code */}
          <form onSubmit={handlePromoSubmit} className="mb-6">
            <label className="block text-sm font-medium mb-2">Promo Code</label>
            <div className="flex gap-2">
              <Input
                type="text"
                value={promoCode}
                onChange={(e) => setPromoCode(e.target.value)}
                placeholder="Enter promo code"
                className="flex-1"
                disabled={promoApplied}
              />
              <Button 
                type="submit" 
                variant="outline"
                disabled={promoApplied}
              >
                Apply
              </Button>
            </div>
            {promoApplied && (
              <p className="text-green-600 text-sm mt-2">Promo code applied!</p>
            )}
          </form>
          
          <Button asChild className="w-full bg-gucci-black hover:bg-gucci-darkGray text-white py-6">
            <Link to="/checkout">Proceed to Checkout</Link>
          </Button>
          
          <div className="mt-6 text-sm text-center text-gray-500">
            <p>Secure checkout. Free returns within 30 days.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartPage;
