
import { useState, useEffect } from "react";
import { useParams, Link, Navigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import { Separator } from "@/components/ui/separator";
import { 
  ArrowLeft, 
  FileDown, 
  Printer,
  Loader2,
  CheckCircle,
  Truck, 
  Calendar,
  MapPin
} from "lucide-react";
import html2pdf from 'html2pdf.js';

interface OrderDetailsData {
  orderNumber: string;
  date: string;
  status: string;
  items: {
    id: string;
    productName: string;
    price: number;
    quantity: number;
    total: number;
  }[];
  shipping: {
    firstName: string;
    lastName: string;
    address: string;
    city: string;
    state: string;
    zipCode: string;
    country: string;
    phone: string;
    email?: string;
  };
  payment: {
    method: string;
    reference: string;
  };
  subtotal: number;
  shippingCost: number;
  tax: number;
  total: number;
}

const OrderDetails = () => {
  const { orderNumber } = useParams<{ orderNumber: string }>();
  const [order, setOrder] = useState<OrderDetailsData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  useEffect(() => {
    const fetchOrderDetails = async () => {
      setLoading(true);
      setError(null);
      
      try {
        if (!orderNumber) {
          setError("Order number is missing");
          setLoading(false);
          return;
        }
        
        // Fetch order from database
        const { data: orderData, error: orderError } = await supabase
          .from('orders')
          .select(`
            id,
            order_number,
            status,
            total_amount,
            created_at,
            payment_reference,
            shipping_addresses (
              first_name,
              last_name,
              address,
              city,
              state,
              zip_code,
              country,
              phone,
              email
            ),
            order_items (
              id,
              product_name,
              product_price,
              quantity
            )
          `)
          .eq('order_number', orderNumber)
          .single();
        
        if (orderError) {
          // If not found in database, use mock data (for demo purposes)
          const mockOrder = getMockOrderByNumber(orderNumber);
          
          if (mockOrder) {
            setOrder(mockOrder);
          } else {
            setError("Order not found");
          }
          
          setLoading(false);
          return;
        }
        
        if (orderData) {
          const shippingAddress = orderData.shipping_addresses[0];
          
          // Transform Supabase data to OrderDetailsData
          const transformedOrder: OrderDetailsData = {
            orderNumber: orderData.order_number,
            date: new Date(orderData.created_at).toISOString().split('T')[0],
            status: orderData.status || 'pending',
            items: orderData.order_items.map(item => ({
              id: item.id,
              productName: item.product_name,
              price: Number(item.product_price),
              quantity: item.quantity,
              total: Number(item.product_price) * item.quantity
            })),
            shipping: {
              firstName: shippingAddress.first_name,
              lastName: shippingAddress.last_name,
              address: shippingAddress.address,
              city: shippingAddress.city,
              state: shippingAddress.state,
              zipCode: shippingAddress.zip_code,
              country: shippingAddress.country,
              phone: shippingAddress.phone,
              email: shippingAddress.email
            },
            payment: {
              method: 'Payshap',
              reference: orderData.payment_reference || 'N/A'
            },
            subtotal: orderData.order_items.reduce(
              (sum, item) => sum + (Number(item.product_price) * item.quantity), 
              0
            ),
            shippingCost: 20, // Fixed shipping cost for now
            tax: Number(orderData.total_amount) * 0.08, // Assuming tax is 8%
            total: Number(orderData.total_amount)
          };
          
          setOrder(transformedOrder);
        }
      } catch (err) {
        console.error("Error fetching order details:", err);
        setError("Failed to load order details");
      } finally {
        setLoading(false);
      }
    };
    
    fetchOrderDetails();
  }, [orderNumber]);
  
  // Fallback mock orders for demonstration
  const getMockOrderByNumber = (num?: string): OrderDetailsData | null => {
    const mockOrders = [
      {
        orderNumber: "123456789",
        date: "2025-04-10",
        status: "processing",
        items: [
          {
            id: "prod-1",
            productName: "Classic White T-Shirt",
            price: 250,
            quantity: 2,
            total: 500
          },
          {
            id: "prod-2",
            productName: "Slim Fit Jeans",
            price: 450,
            quantity: 1,
            total: 450
          },
          {
            id: "prod-3",
            productName: "Leather Belt",
            price: 300,
            quantity: 1,
            total: 300
          }
        ],
        shipping: {
          firstName: "Jane",
          lastName: "Doe",
          address: "123 Main Street",
          city: "Cape Town",
          state: "Western Cape",
          zipCode: "8001",
          country: "South Africa",
          phone: "0712345678",
          email: "jane.doe@example.com"
        },
        payment: {
          method: "Payshap",
          reference: "PSH12345678"
        },
        subtotal: 1250,
        shippingCost: 0,
        tax: 100,
        total: 1350
      },
      {
        orderNumber: "987654321",
        date: "2025-04-05",
        status: "shipped",
        items: [
          {
            id: "prod-4",
            productName: "Cotton Sweatshirt",
            price: 450,
            quantity: 1,
            total: 450
          },
          {
            id: "prod-5",
            productName: "Leather Wallet",
            price: 400,
            quantity: 1,
            total: 400
          }
        ],
        shipping: {
          firstName: "John",
          lastName: "Smith",
          address: "456 Oak Avenue",
          city: "Johannesburg",
          state: "Gauteng",
          zipCode: "2000",
          country: "South Africa",
          phone: "0823456789",
          email: "john.smith@example.com"
        },
        payment: {
          method: "Payshap",
          reference: "PSH87654321"
        },
        subtotal: 850,
        shippingCost: 0,
        tax: 68,
        total: 918
      },
      {
        orderNumber: "456789123",
        date: "2025-03-28",
        status: "delivered",
        items: [
          {
            id: "prod-6",
            productName: "Designer Sunglasses",
            price: 650,
            quantity: 1,
            total: 650
          }
        ],
        shipping: {
          firstName: "Michael",
          lastName: "Johnson",
          address: "789 Pine Road",
          city: "Durban",
          state: "KwaZulu-Natal",
          zipCode: "4001",
          country: "South Africa",
          phone: "0734567890",
          email: "michael.johnson@example.com"
        },
        payment: {
          method: "Payshap",
          reference: "PSH45678912"
        },
        subtotal: 650,
        shippingCost: 20,
        tax: 52,
        total: 722
      }
    ];
    
    return mockOrders.find(order => order.orderNumber === num) || null;
  };
  
  const handlePrintReceipt = () => {
    if (!order) return;
    
    const receiptElement = document.getElementById('receipt');
    if (!receiptElement) return;
    
    const opt = {
      margin:       [10, 10, 10, 10],
      filename:     `order-receipt-${order.orderNumber}.pdf`,
      image:        { type: 'jpeg', quality: 0.98 },
      html2canvas:  { scale: 2 },
      jsPDF:        { unit: 'mm', format: 'a4', orientation: 'portrait' }
    };
    
    html2pdf().set(opt).from(receiptElement).save();
  };
  
  if (loading) {
    return (
      <div className="container-custom py-16 text-center">
        <Loader2 className="h-10 w-10 animate-spin mx-auto text-oldrose" />
        <p className="mt-4 text-gray-600">Loading order details...</p>
      </div>
    );
  }
  
  if (error || !order) {
    return (
      <div className="container-custom py-16 text-center">
        <h1 className="text-3xl font-serif mb-6">Order Not Found</h1>
        <p className="text-gray-600 mb-8">{error || "We couldn't find the order you're looking for."}</p>
        <Button asChild className="bg-oldrose hover:bg-oldrose/90 text-white">
          <Link to="/orders">Back to Orders</Link>
        </Button>
      </div>
    );
  }
  
  const getStatusIcon = () => {
    switch(order.status) {
      case 'delivered':
        return <CheckCircle className="h-5 w-5 text-green-600" />;
      case 'shipped':
        return <Truck className="h-5 w-5 text-blue-600" />;
      case 'processing':
      default:
        return <Calendar className="h-5 w-5 text-yellow-600" />;
    }
  };
  
  return (
    <div className="container-custom py-16">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <Link to="/orders" className="flex items-center text-oldrose hover:underline">
            <ArrowLeft className="h-4 w-4 mr-1" />
            Back to Orders
          </Link>
          
          <div className="flex items-center gap-3">
            <Button 
              variant="outline"
              onClick={handlePrintReceipt}
              className="flex items-center gap-2"
            >
              <Printer className="h-4 w-4" />
              <span className="hidden sm:inline">Print</span> Receipt
            </Button>
            
            <Button 
              variant="outline"
              onClick={handlePrintReceipt}
              className="flex items-center gap-2"
            >
              <FileDown className="h-4 w-4" />
              <span className="hidden sm:inline">Download</span> PDF
            </Button>
          </div>
        </div>
        
        <div className="bg-white border border-gray-200 shadow-sm" id="receipt">
          <div className="p-8">
            <div className="flex justify-between mb-8">
              <div>
                <h1 className="text-2xl font-serif mb-2">Order Receipt</h1>
                <p className="text-gray-600">Thank you for your purchase!</p>
              </div>
              <div className="text-right">
                <h2 className="text-lg font-medium mb-1">RIRI</h2>
                <p className="text-sm text-gray-600">Cape Town, South Africa</p>
                <p className="text-sm text-gray-600">support@riri.co.za</p>
              </div>
            </div>
            
            <div className="flex flex-col md:flex-row justify-between gap-6 mb-8">
              <div>
                <h3 className="text-sm font-medium uppercase text-gray-500 mb-2">Bill To</h3>
                <p className="text-gray-800">
                  {order.shipping.firstName} {order.shipping.lastName}<br />
                  {order.shipping.address}<br />
                  {order.shipping.city}, {order.shipping.state} {order.shipping.zipCode}<br />
                  {order.shipping.country}
                </p>
                {order.shipping.email && (
                  <p className="text-gray-600 mt-2">{order.shipping.email}</p>
                )}
              </div>
              
              <div>
                <h3 className="text-sm font-medium uppercase text-gray-500 mb-2">Invoice Details</h3>
                <div className="space-y-1">
                  <div className="flex gap-2">
                    <span className="text-gray-600">Order Number:</span>
                    <span className="font-medium">{order.orderNumber}</span>
                  </div>
                  <div className="flex gap-2">
                    <span className="text-gray-600">Date:</span>
                    <span className="font-medium">{new Date(order.date).toLocaleDateString()}</span>
                  </div>
                  <div className="flex gap-2 items-center">
                    <span className="text-gray-600">Status:</span>
                    <div className="flex items-center gap-1">
                      {getStatusIcon()}
                      <span className="font-medium capitalize">{order.status}</span>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <span className="text-gray-600">Payment:</span>
                    <span className="font-medium">{order.payment.method}</span>
                  </div>
                  <div className="flex gap-2">
                    <span className="text-gray-600">Reference:</span>
                    <span className="font-medium">{order.payment.reference}</span>
                  </div>
                </div>
              </div>
            </div>
            
            <h3 className="text-sm font-medium uppercase text-gray-500 mb-2">Order Items</h3>
            
            <div className="border border-gray-200 rounded-md mb-8">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th scope="col" className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Product
                    </th>
                    <th scope="col" className="py-3 px-4 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Price
                    </th>
                    <th scope="col" className="py-3 px-4 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Quantity
                    </th>
                    <th scope="col" className="py-3 px-4 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Total
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {order.items.map((item) => (
                    <tr key={item.id}>
                      <td className="py-4 px-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">{item.productName}</div>
                      </td>
                      <td className="py-4 px-4 whitespace-nowrap text-right text-sm text-gray-500">
                        R{item.price.toLocaleString()}
                      </td>
                      <td className="py-4 px-4 whitespace-nowrap text-right text-sm text-gray-500">
                        {item.quantity}
                      </td>
                      <td className="py-4 px-4 whitespace-nowrap text-right text-sm font-medium">
                        R{item.total.toLocaleString()}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            
            <div className="flex justify-end">
              <div className="w-full max-w-xs">
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Subtotal:</span>
                    <span>R{order.subtotal.toLocaleString()}</span>
                  </div>
                  
                  <div className="flex justify-between">
                    <span className="text-gray-600">Shipping:</span>
                    <span>
                      {order.shippingCost === 0 ? "Free" : `R${order.shippingCost.toLocaleString()}`}
                    </span>
                  </div>
                  
                  <div className="flex justify-between">
                    <span className="text-gray-600">Tax:</span>
                    <span>R{order.tax.toLocaleString()}</span>
                  </div>
                  
                  <Separator className="my-2" />
                  
                  <div className="flex justify-between font-medium text-lg">
                    <span>Total:</span>
                    <span>R{order.total.toLocaleString()}</span>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="mt-12 text-center text-gray-500 text-sm">
              <p>This is your official receipt. Thank you for shopping with RIRI.</p>
              <p className="mt-1">For any questions, please contact our customer service at support@riri.co.za</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderDetails;
