
import { useLocation, Navigate, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { CheckCircle } from "lucide-react";

const OrderConfirmation = () => {
  const location = useLocation();
  const { orderNumber, totalAmount, shippingAddress } = location.state || {};
  
  // If accessed directly without state, redirect to home
  if (!orderNumber) {
    return <Navigate to="/" />;
  }
  
  return (
    <div className="container-custom py-16 max-w-3xl mx-auto">
      <div className="text-center mb-8">
        <div className="flex justify-center mb-4">
          <CheckCircle className="h-16 w-16 text-green-600" />
        </div>
        <h1 className="text-3xl font-serif mb-2">Thank You for Your Order!</h1>
        <p className="text-gray-600">
          Your order has been received and is now being processed.
        </p>
      </div>
      
      <div className="bg-gray-50 p-8 mb-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
          <div>
            <h3 className="text-sm font-medium uppercase text-gray-500 mb-1">Order Number</h3>
            <p className="text-xl font-medium">{orderNumber}</p>
          </div>
          <div>
            <h3 className="text-sm font-medium uppercase text-gray-500 mb-1">Date</h3>
            <p className="text-xl font-medium">{new Date().toLocaleDateString()}</p>
          </div>
          <div>
            <h3 className="text-sm font-medium uppercase text-gray-500 mb-1">Total Amount</h3>
            <p className="text-xl font-medium">${totalAmount.toLocaleString()}</p>
          </div>
        </div>
      </div>
      
      <div className="mb-8">
        <h2 className="text-xl font-medium mb-4">Order Details</h2>
        <div className="border border-gray-200 p-6">
          <div className="mb-6">
            <h3 className="font-medium mb-2">Shipping Address</h3>
            <p className="text-gray-600">
              {shippingAddress.firstName} {shippingAddress.lastName}<br />
              {shippingAddress.address}<br />
              {shippingAddress.city}, {shippingAddress.state} {shippingAddress.zipCode}<br />
              {shippingAddress.country}
            </p>
          </div>
          
          <div>
            <h3 className="font-medium mb-2">Shipping Method</h3>
            <p className="text-gray-600">Standard Shipping (3-5 business days)</p>
          </div>
        </div>
      </div>
      
      <div className="mb-8">
        <h2 className="text-xl font-medium mb-4">What's Next?</h2>
        <ul className="list-disc pl-5 space-y-2 text-gray-600 mb-6">
          <li>You will receive an order confirmation email shortly.</li>
          <li>Another email will be sent when your order ships.</li>
          <li>You can track your order status in your account.</li>
        </ul>
        
        <div className="bg-yellow-50 border border-yellow-200 p-4 text-yellow-800">
          <p className="text-sm">
            <strong>Note:</strong> This is a demonstration UI. No actual orders are being processed.
          </p>
        </div>
      </div>
      
      <div className="flex flex-col sm:flex-row justify-center gap-4">
        <Button asChild variant="outline">
          <Link to="/orders">View Orders</Link>
        </Button>
        <Button asChild className="bg-gucci-black hover:bg-gucci-darkGray text-white">
          <Link to="/">Continue Shopping</Link>
        </Button>
      </div>
    </div>
  );
};

export default OrderConfirmation;
