import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "@/components/ui/use-toast";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";
import { 
  PackageOpen, 
  Truck, 
  HomeIcon, 
  ClipboardCheck,
  FileDown,
  ExternalLink,
  Loader2
} from "lucide-react";

interface OrderData {
  id: string;
  orderNumber: string;
  email?: string;
  status: 'pending' | 'processing' | 'shipped' | 'delivered';
  date: string;
  items: number;
  total: number;
  trackingNumber?: string;
  carrier?: string;
  estimatedDelivery?: string;
  deliveryDate?: string;
}

const OrderTracking = () => {
  const { user, isAuthenticated } = useAuth();
  const [orderNumber, setOrderNumber] = useState("");
  const [email, setEmail] = useState("");
  const [orderData, setOrderData] = useState<OrderData | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [userOrders, setUserOrders] = useState<OrderData[]>([]);
  const [loadingUserOrders, setLoadingUserOrders] = useState(false);
  
  useEffect(() => {
    const fetchUserOrders = async () => {
      if (!isAuthenticated || !user) return;
      
      setLoadingUserOrders(true);
      
      try {
        const { data, error } = await supabase
          .from('orders')
          .select(`
            id,
            order_number,
            status,
            total_amount,
            created_at,
            shipping_addresses(email),
            order_items(id)
          `)
          .eq('user_id', user.id)
          .order('created_at', { ascending: false });
        
        if (error) throw error;
        
        if (data) {
          const formattedOrders: OrderData[] = data.map(order => ({
            id: order.id,
            orderNumber: order.order_number,
            email: order.shipping_addresses?.[0]?.email,
            status: (order.status as 'pending' | 'processing' | 'shipped' | 'delivered') || 'pending',
            date: new Date(order.created_at).toISOString().split('T')[0],
            items: order.order_items?.length || 0,
            total: Number(order.total_amount)
          }));
          
          setUserOrders(formattedOrders);
        }
      } catch (error) {
        console.error('Error fetching orders:', error);
        toast({
          title: 'Failed to load orders',
          description: 'There was a problem loading your orders. Please try again later.',
          variant: 'destructive'
        });
      } finally {
        setLoadingUserOrders(false);
      }
    };
    
    fetchUserOrders();
  }, [isAuthenticated, user]);
  
  const handleSubmit = async (e: React.FormEvent) => {
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
    
    try {
      const { data, error } = await supabase
        .from('orders')
        .select(`
          id,
          order_number,
          status,
          total_amount,
          created_at,
          shipping_addresses!inner(email),
          order_items(id)
        `)
        .eq('order_number', orderNumber)
        .eq('shipping_addresses.email', email)
        .single();
      
      if (error) {
        if (error.code === 'PGRST116') {
          const mockOrder = getMockOrderByNumber(orderNumber);
          if (mockOrder && mockOrder.email === email) {
            setOrderData(mockOrder);
          } else {
            toast({
              title: "Order not found",
              description: "We couldn't find an order with that number and email combination",
              variant: "destructive",
            });
            setOrderData(null);
          }
        } else {
          throw error;
        }
      } else if (data) {
        setOrderData({
          id: data.id,
          orderNumber: data.order_number,
          email: data.shipping_addresses[0].email,
          status: (data.status as 'pending' | 'processing' | 'shipped' | 'delivered') || 'pending',
          date: new Date(data.created_at).toISOString().split('T')[0],
          items: data.order_items.length,
          total: Number(data.total_amount)
        });
      }
    } catch (error) {
      console.error('Error fetching order:', error);
      toast({
        title: 'Error retrieving order',
        description: 'There was a problem retrieving your order details. Please try again later.',
        variant: 'destructive'
      });
    } finally {
      setIsLoading(false);
    }
  };
  
  const getMockOrderByNumber = (number: string): OrderData | null => {
    const mockOrders = [
      {
        id: "mock-123456789",
        orderNumber: "123456789",
        email: "user@example.com",
        status: "processing" as const,
        date: "2025-03-15",
        items: 3,
        total: 1250,
      },
      {
        id: "mock-987654321",
        orderNumber: "987654321",
        email: "user@example.com",
        status: "shipped" as const,
        date: "2025-03-01",
        trackingNumber: "TN7891234567",
        carrier: "FedEx",
        estimatedDelivery: "2025-03-20",
        items: 2,
        total: 850,
      },
      {
        id: "mock-456789123",
        orderNumber: "456789123",
        email: "user@example.com",
        status: "delivered" as const,
        date: "2025-02-15",
        deliveryDate: "2025-02-19",
        items: 1,
        total: 650,
      }
    ];
    
    return mockOrders.find(order => order.orderNumber === number) || null;
  };
  
  const renderOrderStatus = () => {
    if (!orderData) return null;
    
    const steps = [
      { label: "Order Placed", icon: ClipboardCheck, completed: true },
      { label: "Processing", icon: PackageOpen, completed: orderData.status !== "processing" },
      { label: "Shipped", icon: Truck, completed: orderData.status === "shipped" || orderData.status === "delivered" },
      { label: "Delivered", icon: HomeIcon, completed: orderData.status === "delivered" }
    ];
    
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
                  step.completed ? 'bg-oldrose text-white' : 'bg-gray-200 text-gray-400'
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
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-medium">Order Details</h3>
            <Button 
              asChild
              variant="outline"
              size="sm"
              className="text-oldrose border-oldrose hover:bg-oldrose/10"
            >
              <Link to={`/orders/${orderData.orderNumber}`}>
                View Complete Details
                <ExternalLink className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
          
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
              <span className="font-medium">R{orderData.total.toLocaleString()}</span>
            </div>
          </div>
        </div>
        
        <div className="mt-8 flex justify-center">
          <Button 
            asChild
            className="bg-oldrose hover:bg-oldrose/90 text-white"
          >
            <Link to={`/orders/${orderData.orderNumber}`}>
              <FileDown className="mr-2 h-4 w-4" />
              View Receipt
            </Link>
          </Button>
        </div>
      </div>
    );
  };
  
  const renderUserOrders = () => {
    if (loadingUserOrders) {
      return (
        <div className="text-center py-8">
          <Loader2 className="h-8 w-8 animate-spin mx-auto text-oldrose" />
          <p className="mt-2 text-gray-600">Loading your orders...</p>
        </div>
      );
    }
    
    if (userOrders.length === 0) {
      return (
        <div className="text-center py-8 border border-dashed border-gray-300 rounded-md">
          <p className="text-gray-600">You haven't placed any orders yet.</p>
          <Button asChild className="mt-4 bg-oldrose hover:bg-oldrose/90 text-white">
            <Link to="/">Start Shopping</Link>
          </Button>
        </div>
      );
    }
    
    return (
      <div className="mt-6 space-y-6">
        <h2 className="text-xl font-medium">Your Orders</h2>
        
        <div className="space-y-4">
          {userOrders.map((order) => (
            <div 
              key={order.id} 
              className="border border-gray-200 p-4 hover:border-oldrose transition-colors"
            >
              <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4">
                <div>
                  <p className="font-medium">Order #{order.orderNumber}</p>
                  <p className="text-sm text-gray-600">
                    {new Date(order.date).toLocaleDateString()} • 
                    <span className="ml-1 capitalize">{order.status}</span>
                  </p>
                </div>
                
                <div className="flex items-center gap-3">
                  <div className="text-right">
                    <p className="text-sm text-gray-600">{order.items} {order.items === 1 ? 'item' : 'items'}</p>
                    <p className="font-medium">R{order.total.toLocaleString()}</p>
                  </div>
                  
                  <Button 
                    asChild 
                    variant="outline" 
                    size="sm"
                    className="ml-4 whitespace-nowrap"
                  >
                    <Link to={`/orders/${order.orderNumber}`}>
                      View Details
                    </Link>
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };
  
  return (
    <div className="container-custom py-16 max-w-3xl mx-auto">
      <h1 className="text-3xl font-serif text-center mb-8">Order Tracking</h1>
      
      {isAuthenticated && renderUserOrders()}
      
      {!orderData ? (
        <div className="bg-gray-50 p-8 mt-10">
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
                className="w-full bg-oldrose hover:bg-oldrose/90 text-white"
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Searching...
                  </>
                ) : "Track Order"}
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
        <div className="bg-gray-50 p-8 mt-6">
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
