
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useCart } from "@/hooks/useCart";
import { useAuth } from "@/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { toast } from "@/components/ui/use-toast";
import { AlertCircle } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

const CheckoutPage = () => {
  const { cartItems, subtotal, clearCart } = useCart();
  const { user, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  
  const [step, setStep] = useState(1);
  const [sameAddress, setSameAddress] = useState(true);
  const [paymentReference, setPaymentReference] = useState("");
  
  // Shipping details
  const [shipping, setShipping] = useState({
    firstName: "",
    lastName: "",
    address: "",
    city: "",
    state: "",
    zipCode: "",
    country: "South Africa",
    phone: "",
    email: "",
  });
  
  // Billing details
  const [billing, setBilling] = useState({
    firstName: "",
    lastName: "",
    address: "",
    city: "",
    state: "",
    zipCode: "",
    country: "South Africa",
    phone: "",
  });
  
  // Payment details
  const [payment, setPayment] = useState({
    method: "payshap",
    reference: "",
  });
  
  const shippingCost = subtotal > 200 ? 0 : 20;
  const taxCost = subtotal * 0.08;
  const totalCost = subtotal + shippingCost + taxCost;
  
  // Handle form input change
  const handleShippingChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setShipping(prev => ({ ...prev, [name]: value }));
    
    if (sameAddress) {
      setBilling(prev => ({ ...prev, [name]: value }));
    }
  };
  
  const handleBillingChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setBilling(prev => ({ ...prev, [name]: value }));
  };
  
  const handlePaymentChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setPayment(prev => ({ ...prev, [name]: value }));
  };
  
  // Handle form submission
  const handleShippingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Basic validation
    if (!shipping.firstName || !shipping.lastName || !shipping.address || 
        !shipping.city || !shipping.state || !shipping.zipCode || 
        !shipping.phone || !shipping.email) {
      toast({
        title: "Please complete all fields",
        description: "All fields are required to proceed to checkout",
        variant: "destructive",
      });
      return;
    }
    
    setStep(2);
    window.scrollTo(0, 0);
  };
  
  const handleBillingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Basic validation
    if (!sameAddress) {
      if (!billing.firstName || !billing.lastName || !billing.address || 
          !billing.city || !billing.state || !billing.zipCode || !billing.phone) {
        toast({
          title: "Please complete all fields",
          description: "All fields are required to proceed to checkout",
          variant: "destructive",
        });
        return;
      }
    }
    
    setStep(3);
    window.scrollTo(0, 0);
  };
  
  const saveOrderToDatabase = async (orderNumber: string) => {
    if (!isAuthenticated || !user) {
      console.log("User not authenticated, order will not be saved to database");
      return { success: true, orderId: null };
    }
    
    try {
      // Insert the order
      const { data: orderData, error: orderError } = await supabase
        .from('orders')
        .insert({
          user_id: user.id,
          order_number: orderNumber,
          total_amount: totalCost,
          payment_reference: payment.reference,
          status: 'pending'
        })
        .select('id')
        .single();
      
      if (orderError) throw orderError;
      
      const orderId = orderData.id;
      
      // Insert shipping address
      const { error: shippingError } = await supabase
        .from('shipping_addresses')
        .insert({
          order_id: orderId,
          first_name: shipping.firstName,
          last_name: shipping.lastName,
          address: shipping.address,
          city: shipping.city,
          state: shipping.state,
          zip_code: shipping.zipCode,
          country: shipping.country,
          phone: shipping.phone,
          email: shipping.email
        });
      
      if (shippingError) throw shippingError;
      
      // Insert order items
      const orderItems = cartItems.map(item => ({
        order_id: orderId,
        product_id: item.product.id,
        product_name: item.product.name,
        product_price: item.product.price,
        quantity: item.quantity
      }));
      
      const { error: itemsError } = await supabase
        .from('order_items')
        .insert(orderItems);
      
      if (itemsError) throw itemsError;
      
      return { success: true, orderId };
    } catch (error: any) {
      console.error("Error saving order:", error);
      toast({
        title: "Error saving order",
        description: error.message || "There was an error saving your order. Please try again.",
        variant: "destructive"
      });
      
      return { success: false, orderId: null };
    }
  };
  
  const handlePaymentSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Basic validation for payment reference
    if (!payment.reference) {
      toast({
        title: "Please enter payment reference",
        description: "Payment reference is required to confirm your order",
        variant: "destructive",
      });
      return;
    }
    
    // Show loading state
    setStep(4);
    
    // Generate a random order number
    const orderNumber = Math.floor(100000000 + Math.random() * 900000000).toString();
    
    try {
      // Save order to database
      const { success } = await saveOrderToDatabase(orderNumber);
      
      if (success) {
        // Navigate to order confirmation
        navigate("/orders/confirmation", { 
          state: { 
            orderNumber, 
            totalAmount: totalCost,
            shippingAddress: shipping,
            paymentReference: payment.reference
          } 
        });
        
        // Clear cart after successful order placement
        clearCart();
      } else {
        // If database save failed, go back to payment step
        setStep(3);
        toast({
          title: "Order processing failed",
          description: "There was an error processing your order. Please try again.",
          variant: "destructive"
        });
      }
    } catch (error) {
      console.error("Order processing error:", error);
      setStep(3);
      toast({
        title: "Order processing failed",
        description: "There was an error processing your order. Please try again.",
        variant: "destructive"
      });
    }
  };
  
  // If cart is empty, redirect to cart page
  if (cartItems.length === 0 && step !== 4) {
    return (
      <div className="container-custom py-16 text-center">
        <h1 className="text-3xl font-serif mb-6">Checkout</h1>
        <p className="text-gray-600 mb-8">Your bag is empty</p>
        <Link to="/" className="btn-primary">
          Continue Shopping
        </Link>
      </div>
    );
  }
  
  // If user is not authenticated, show login prompt
  if (!isAuthenticated && step === 1) {
    return (
      <div className="container-custom py-16 text-center">
        <h1 className="text-3xl font-serif mb-6">Checkout</h1>
        <div className="bg-yellow-50 border border-yellow-200 p-6 max-w-md mx-auto mb-8">
          <AlertCircle className="h-8 w-8 text-yellow-600 mx-auto mb-4" />
          <h2 className="text-xl font-medium mb-2">Please Sign In</h2>
          <p className="text-gray-600 mb-6">
            You need to be signed in to complete your purchase and track your orders.
          </p>
          <div className="flex flex-col gap-4">
            <Button 
              asChild
              className="bg-oldrose hover:bg-oldrose/90 text-white"
            >
              <Link to="/auth?redirect=/checkout">Sign In</Link>
            </Button>
            <Button 
              variant="outline"
              onClick={() => setStep(1)}
              className="border-oldrose text-oldrose hover:bg-oldrose/10"
            >
              Continue as Guest
            </Button>
          </div>
        </div>
      </div>
    );
  }
  
  // Handle same address checkbox toggle
  const handleSameAddressChange = (checked: boolean) => {
    setSameAddress(checked);
    
    if (checked) {
      setBilling({
        firstName: shipping.firstName,
        lastName: shipping.lastName,
        address: shipping.address,
        city: shipping.city,
        state: shipping.state,
        zipCode: shipping.zipCode,
        country: shipping.country,
        phone: shipping.phone,
      });
    }
  };
  
  return (
    <div className="container-custom py-12">
      <h1 className="text-3xl font-serif text-center mb-8">Checkout</h1>
      
      {/* Progress bar */}
      <div className="mb-12">
        <div className="flex justify-between items-center">
          <div className={`flex-1 text-center ${step >= 1 ? 'text-gucci-black' : 'text-gray-400'}`}>
            Shipping
          </div>
          <div className={`flex-1 text-center ${step >= 2 ? 'text-gucci-black' : 'text-gray-400'}`}>
            Billing
          </div>
          <div className={`flex-1 text-center ${step >= 3 ? 'text-gucci-black' : 'text-gray-400'}`}>
            Payment
          </div>
        </div>
        <div className="flex w-full h-1 bg-gray-200 mt-2">
          <div 
            className="h-full bg-oldrose transition-all duration-300"
            style={{ width: `${(step / 3) * 100}%` }}
          />
        </div>
      </div>
      
      <div className="flex flex-col lg:flex-row gap-12">
        {/* Checkout form */}
        <div className="lg:w-2/3">
          {/* Step 1: Shipping */}
          {step === 1 && (
            <form onSubmit={handleShippingSubmit}>
              <h2 className="text-xl font-medium mb-6">Shipping Information</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div>
                  <label className="block text-sm font-medium mb-2">First Name *</label>
                  <Input
                    type="text"
                    name="firstName"
                    value={shipping.firstName}
                    onChange={handleShippingChange}
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Last Name *</label>
                  <Input
                    type="text"
                    name="lastName"
                    value={shipping.lastName}
                    onChange={handleShippingChange}
                    required
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium mb-2">Address *</label>
                  <Input
                    type="text"
                    name="address"
                    value={shipping.address}
                    onChange={handleShippingChange}
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">City *</label>
                  <Input
                    type="text"
                    name="city"
                    value={shipping.city}
                    onChange={handleShippingChange}
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">State/Province *</label>
                  <Input
                    type="text"
                    name="state"
                    value={shipping.state}
                    onChange={handleShippingChange}
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">ZIP/Postal Code *</label>
                  <Input
                    type="text"
                    name="zipCode"
                    value={shipping.zipCode}
                    onChange={handleShippingChange}
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Country *</label>
                  <Select 
                    value={shipping.country} 
                    onValueChange={(value) => setShipping(prev => ({ ...prev, country: value }))}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select country" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="South Africa">South Africa</SelectItem>
                      <SelectItem value="United States">United States</SelectItem>
                      <SelectItem value="Canada">Canada</SelectItem>
                      <SelectItem value="United Kingdom">United Kingdom</SelectItem>
                      <SelectItem value="Nigeria">Nigeria</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Phone Number *</label>
                  <Input
                    type="tel"
                    name="phone"
                    value={shipping.phone}
                    onChange={handleShippingChange}
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Email Address *</label>
                  <Input
                    type="email"
                    name="email"
                    value={shipping.email}
                    onChange={handleShippingChange}
                    required
                  />
                </div>
              </div>
              
              <div className="flex justify-between mt-8">
                <Link to="/cart" className="text-oldrose underline hover:text-oldrose/80 transition-colors">
                  Return to Cart
                </Link>
                <Button 
                  type="submit" 
                  className="bg-oldrose hover:bg-oldrose/90 text-white"
                >
                  Continue to Billing
                </Button>
              </div>
            </form>
          )}
          
          {/* Step 2: Billing */}
          {step === 2 && (
            <form onSubmit={handleBillingSubmit}>
              <h2 className="text-xl font-medium mb-6">Billing Information</h2>
              
              <div className="mb-6">
                <div className="flex items-center space-x-2">
                  <Checkbox 
                    id="sameAddress" 
                    checked={sameAddress}
                    onCheckedChange={handleSameAddressChange}
                  />
                  <label 
                    htmlFor="sameAddress"
                    className="text-sm font-medium cursor-pointer"
                  >
                    Same as shipping address
                  </label>
                </div>
              </div>
              
              {!sameAddress && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  <div>
                    <label className="block text-sm font-medium mb-2">First Name *</label>
                    <Input
                      type="text"
                      name="firstName"
                      value={billing.firstName}
                      onChange={handleBillingChange}
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Last Name *</label>
                    <Input
                      type="text"
                      name="lastName"
                      value={billing.lastName}
                      onChange={handleBillingChange}
                      required
                    />
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium mb-2">Address *</label>
                    <Input
                      type="text"
                      name="address"
                      value={billing.address}
                      onChange={handleBillingChange}
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">City *</label>
                    <Input
                      type="text"
                      name="city"
                      value={billing.city}
                      onChange={handleBillingChange}
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">State/Province *</label>
                    <Input
                      type="text"
                      name="state"
                      value={billing.state}
                      onChange={handleBillingChange}
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">ZIP/Postal Code *</label>
                    <Input
                      type="text"
                      name="zipCode"
                      value={billing.zipCode}
                      onChange={handleBillingChange}
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Country *</label>
                    <Select 
                      value={billing.country} 
                      onValueChange={(value) => setBilling(prev => ({ ...prev, country: value }))}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select country" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="South Africa">South Africa</SelectItem>
                        <SelectItem value="United States">United States</SelectItem>
                        <SelectItem value="Canada">Canada</SelectItem>
                        <SelectItem value="United Kingdom">United Kingdom</SelectItem>
                        <SelectItem value="Nigeria">Nigeria</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Phone Number *</label>
                    <Input
                      type="tel"
                      name="phone"
                      value={billing.phone}
                      onChange={handleBillingChange}
                      required
                    />
                  </div>
                </div>
              )}
              
              <div className="flex justify-between mt-8">
                <Button 
                  type="button" 
                  variant="outline"
                  onClick={() => setStep(1)}
                >
                  Back to Shipping
                </Button>
                <Button 
                  type="submit" 
                  className="bg-oldrose hover:bg-oldrose/90 text-white"
                >
                  Continue to Payment
                </Button>
              </div>
            </form>
          )}
          
          {/* Step 3: Payment */}
          {step === 3 && (
            <form onSubmit={handlePaymentSubmit}>
              <h2 className="text-xl font-medium mb-6">Payment Information</h2>
              
              <div className="bg-yellow-50 border border-yellow-300 p-6 mb-8 rounded-md">
                <div className="flex items-start gap-3">
                  <AlertCircle className="h-5 w-5 text-yellow-700 mt-0.5" />
                  <div>
                    <h3 className="font-medium text-yellow-800 mb-2">Payment Instructions</h3>
                    <p className="text-yellow-700 mb-4">
                      Please make a payment to the following Payshap account:
                    </p>
                    <div className="bg-white p-4 rounded-md mb-4">
                      <p className="font-medium mb-1">Payshap Account Details:</p>
                      <ul className="space-y-1 text-gray-700">
                        <li><span className="font-medium">ID:</span> 0614247711</li>
                        <li><span className="font-medium">Name:</span> Ms. Reneilwe Chakala</li>
                        <li><span className="font-medium">Reference:</span> Your Order #{Math.floor(1000 + Math.random() * 9000)}</li>
                      </ul>
                    </div>
                    <p className="text-yellow-700 text-sm mb-2">
                      After making the payment, please enter your payment reference below to confirm your order.
                    </p>
                  </div>
                </div>
              </div>

              <div className="space-y-6 mb-6">
                <div>
                  <label className="block text-sm font-medium mb-2">Payment Reference *</label>
                  <Input
                    type="text"
                    name="reference"
                    value={payment.reference}
                    onChange={handlePaymentChange}
                    placeholder="Enter the reference used for your payment"
                    required
                  />
                  <p className="text-sm text-gray-500 mt-1">
                    This helps us match your payment to your order
                  </p>
                </div>
              </div>
              
              <div className="flex justify-between mt-8">
                <Button 
                  type="button" 
                  variant="outline"
                  onClick={() => setStep(2)}
                >
                  Back to Billing
                </Button>
                <Button 
                  type="submit" 
                  className="bg-oldrose hover:bg-oldrose/90 text-white"
                >
                  Place Order
                </Button>
              </div>
            </form>
          )}
          
          {/* Step 4: Processing */}
          {step === 4 && (
            <div className="text-center py-12">
              <h2 className="text-xl font-medium mb-4">Processing Your Order</h2>
              <p className="text-gray-600 mb-8">Please wait while we verify your payment...</p>
              <div className="flex justify-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-oldrose"></div>
              </div>
            </div>
          )}
        </div>
        
        {/* Order Summary */}
        <div className="lg:w-1/3 bg-gray-50 p-6 h-fit">
          <h2 className="text-xl font-medium mb-6">Order Summary</h2>
          
          <div className="space-y-4 mb-6">
            {cartItems.map(item => (
              <div key={item.product.id} className="flex gap-3">
                <div className="w-16 h-20 bg-gray-200 flex-shrink-0">
                  <img 
                    src={item.product.images[0]} 
                    alt={item.product.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex-1">
                  <p className="font-medium">{item.product.name}</p>
                  <p className="text-gray-500 text-sm">Qty: {item.quantity}</p>
                  <p>R{(item.product.price * item.quantity).toLocaleString()}</p>
                </div>
              </div>
            ))}
          </div>
          
          <div className="border-t border-gray-200 pt-4 space-y-4">
            <div className="flex justify-between">
              <span>Subtotal</span>
              <span className="font-medium">R{subtotal.toLocaleString()}</span>
            </div>
            
            <div className="flex justify-between">
              <span>Shipping</span>
              <span className="font-medium">
                {shippingCost === 0 ? "Free" : `R${shippingCost.toLocaleString()}`}
              </span>
            </div>
            
            <div className="flex justify-between">
              <span>Tax</span>
              <span className="font-medium">R{taxCost.toLocaleString()}</span>
            </div>
            
            <div className="border-t border-gray-300 pt-4 flex justify-between text-lg">
              <span className="font-medium">Total</span>
              <span className="font-bold">R{totalCost.toLocaleString()}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;
