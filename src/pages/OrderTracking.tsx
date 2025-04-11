
import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "@/components/ui/use-toast";
import { 
  PackageOpen, 
  Truck, 
  PackageCheck, 
  Package, 
  HomeIcon, 
  ClipboardCheck 
} from "lucide-react";

const mockOrders = [
  {
    orderNumber: "123456789",
    email: "user@example.com",
    status: "processing",
    date: "2025-03-15",
    items: 3,
    total: 1250,
  },
  {
    orderNumber: "987654321",
    email: "user@example.com",
    status: "shipped",
    date: "2025-03-01",
    trackingNumber: "TN7891234567",
    carrier: "FedEx",
    estimatedDelivery: "2025-03-20",
    items: 2,
    total: 850,
  },
  {
    orderNumber: "456789123",
    email: "user@example.com",
    status: "delivered",
    date: "2025-02-15",
    deliveryDate: "2025-02-19",
    items: 1,
    total: 650,
  }
];

const OrderTracking = () => {
  const [orderNumber, setOrderNumber] = useState("");
  const [email, setEmail] = useState("");
  const [orderData, setOrderData] = useState<typeof mockOrders[0] | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!orderNumber || !email) {
      toast({
        title: "Missing information",
        description: "Please enter both order number and email",
        variant: "destructive",
      });
      return;
    }
    
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      const foundOrder = mockOrders.find(order => 
        order.orderNumber === orderNumber && order.email === email
      );
      
      if (foundOrder) {
        setOrderData(foundOrder);
      } else {
        toast({
          title: "Order not found",
          description: "We couldn't find an order with that number and email combination",
          variant: "destructive",
        });
      }
      
      setIsLoading(false);
    }, 1000);
  };
  
  const renderOrderStatus = () => {
    if (!orderData) return null;
    
    const steps = [
      { label: "Order Placed", icon: ClipboardCheck, completed: true },
      { label: "Processing", icon: PackageOpen, completed: orderData.status !== "processing" },
      { label: "Shipped", icon: Truck, completed: orderData.status === "shipped" || orderData.status === "delivered" },
      { label: "Delivered", icon: HomeIcon, completed: orderData.status === "delivered" }
    ];
    
    const currentStep = orderData.status === "processing" ? 1 : 
                      orderData.status === "shipped" ? 2 : 
                      orderData.status === "delivered" ? 3 : 0;
    
    return (
      <div className="py-8">
        <div className="relative">
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-full border-t border-gray-300"></div>
          </div>
          
          <div className="relative flex justify-between">
            {steps.map((step, index) => (
              <div key={index} className="flex flex-col items-center">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                  step.completed ? 'bg-gucci-gold text-white' : 'bg-gray-200 text-gray-400'
                }`}>
                  <step.icon className="h-5 w-5" />
                </div>
                <div className="text-xs text-center mt-2 max-w-[80px]">
                  {step.label}
                </div>
              </div>
            ))}
          </div>
        </div>
        
        <div className="mt-10">
          <h3 className="text-lg font-medium mb-4">Order Details</h3>
          
          <div className="space-y-4">
            <div className="flex justify-between border-b border-gray-200 pb-3">
              <span className="text-gray-600">Order Number:</span>
              <span className="font-medium">{orderData.orderNumber}</span>
            </div>
            
            <div className="flex justify-between border-b border-gray-200 pb-3">
              <span className="text-gray-600">Order Date:</span>
              <span className="font-medium">{new Date(orderData.date).toLocaleDateString()}</span>
            </div>
            
            <div className="flex justify-between border-b border-gray-200 pb-3">
              <span className="text-gray-600">Order Status:</span>
              <span className="font-medium capitalize">{orderData.status}</span>
            </div>
            
            {orderData.trackingNumber && (
              <div className="flex justify-between border-b border-gray-200 pb-3">
                <span className="text-gray-600">Tracking Number:</span>
                <span className="font-medium">{orderData.trackingNumber}</span>
              </div>
            )}
            
            {orderData.carrier && (
              <div className="flex justify-between border-b border-gray-200 pb-3">
                <span className="text-gray-600">Carrier:</span>
                <span className="font-medium">{orderData.carrier}</span>
              </div>
            )}
            
            {orderData.estimatedDelivery && (
              <div className="flex justify-between border-b border-gray-200 pb-3">
                <span className="text-gray-600">Estimated Delivery:</span>
                <span className="font-medium">{new Date(orderData.estimatedDelivery).toLocaleDateString()}</span>
              </div>
            )}
            
            {orderData.deliveryDate && (
              <div className="flex justify-between border-b border-gray-200 pb-3">
                <span className="text-gray-600">Delivered On:</span>
                <span className="font-medium">{new Date(orderData.deliveryDate).toLocaleDateString()}</span>
              </div>
            )}
            
            <div className="flex justify-between border-b border-gray-200 pb-3">
              <span className="text-gray-600">Items:</span>
              <span className="font-medium">{orderData.items}</span>
            </div>
            
            <div className="flex justify-between">
              <span className="text-gray-600">Total:</span>
              <span className="font-medium">${orderData.total.toLocaleString()}</span>
            </div>
          </div>
        </div>
      </div>
    );
  };
  
  return (
    <div className="container-custom py-16 max-w-3xl mx-auto">
      <h1 className="text-3xl font-serif text-center mb-8">Order Tracking</h1>
      
      {!orderData ? (
        <div className="bg-gray-50 p-8">
          <p className="text-center mb-6 text-gray-600">
            Enter your order number and email address to track your order
          </p>
          
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">Order Number *</label>
              <Input
                type="text"
                value={orderNumber}
                onChange={(e) => setOrderNumber(e.target.value)}
                placeholder="e.g. 123456789"
                required
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-2">Email Address *</label>
              <Input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="e.g. your@email.com"
                required
              />
            </div>
            
            <div className="pt-4">
              <Button 
                type="submit" 
                className="w-full bg-gucci-black hover:bg-gucci-darkGray text-white"
                disabled={isLoading}
              >
                {isLoading ? "Searching..." : "Track Order"}
              </Button>
            </div>
          </form>
          
          <div className="mt-8 text-center">
            <p className="text-sm text-gray-500 mb-2">
              For demonstration purposes, use these test credentials:
            </p>
            <div className="text-xs text-gray-500 space-y-1">
              <p>Order: 123456789, Email: user@example.com (Processing)</p>
              <p>Order: 987654321, Email: user@example.com (Shipped)</p>
              <p>Order: 456789123, Email: user@example.com (Delivered)</p>
            </div>
          </div>
        </div>
      ) : (
        <div className="bg-gray-50 p-8">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-xl font-medium">Tracking Information</h2>
            <Button 
              variant="outline" 
              onClick={() => setOrderData(null)}
              className="text-sm"
            >
              Track Another Order
            </Button>
          </div>
          
          {renderOrderStatus()}
        </div>
      )}
    </div>
  );
};

export default OrderTracking;
