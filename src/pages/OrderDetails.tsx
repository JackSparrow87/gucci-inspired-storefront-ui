
import { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { FileDown, ChevronLeft } from "lucide-react";
import { 
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import html2pdf from "html2pdf.js";

// Mock order data (in a real app, this would come from an API)
const mockOrders = [
  {
    orderNumber: "123456789",
    date: "2025-03-15",
    status: "processing",
    items: [
      { name: "Leather Handbag", price: 450, quantity: 1 },
      { name: "Silk Scarf", price: 150, quantity: 2 }
    ],
    shippingAddress: {
      firstName: "John",
      lastName: "Doe",
      address: "123 Main Street",
      city: "Johannesburg",
      state: "Gauteng",
      zipCode: "2000",
      country: "South Africa"
    },
    paymentMethod: "Payshap",
    paymentReference: "REF123456",
    shipping: 100,
    tax: 50,
    subtotal: 750,
    total: 900
  },
  {
    orderNumber: "987654321",
    date: "2025-03-01",
    status: "shipped",
    items: [
      { name: "Designer Sunglasses", price: 350, quantity: 1 },
      { name: "Leather Belt", price: 250, quantity: 2 }
    ],
    shippingAddress: {
      firstName: "Jane",
      lastName: "Smith",
      address: "456 Park Avenue",
      city: "Cape Town",
      state: "Western Cape",
      zipCode: "8001",
      country: "South Africa"
    },
    paymentMethod: "Payshap",
    paymentReference: "REF789012",
    shipping: 100,
    tax: 100,
    subtotal: 850,
    total: 1050
  },
  {
    orderNumber: "456789123",
    date: "2025-02-15",
    status: "delivered",
    items: [
      { name: "Cashmere Sweater", price: 650, quantity: 1 }
    ],
    shippingAddress: {
      firstName: "Robert",
      lastName: "Johnson",
      address: "789 Beach Road",
      city: "Durban",
      state: "KwaZulu-Natal",
      zipCode: "4001",
      country: "South Africa"
    },
    paymentMethod: "Payshap",
    paymentReference: "REF345678",
    shipping: 100,
    tax: 65,
    subtotal: 650,
    total: 815
  }
];

const OrderDetails = () => {
  const { orderNumber } = useParams();
  const [order, setOrder] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  
  useEffect(() => {
    // Simulate API call to fetch order details
    setTimeout(() => {
      const foundOrder = mockOrders.find(o => o.orderNumber === orderNumber);
      if (foundOrder) {
        setOrder(foundOrder);
      }
      setLoading(false);
    }, 500);
  }, [orderNumber]);
  
  const downloadReceipt = () => {
    const receiptElement = document.getElementById('receipt');
    
    if (receiptElement) {
      const options = {
        margin: 10,
        filename: `order-receipt-${orderNumber}.pdf`,
        image: { type: 'jpeg', quality: 0.98 },
        html2canvas: { scale: 2 },
        jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' }
      };
      
      // Use html2pdf to generate the PDF
      html2pdf().from(receiptElement).set(options).save();
    }
  };
  
  if (loading) {
    return (
      <div className="container-custom py-16 max-w-3xl mx-auto">
        <div className="text-center">
          <p>Loading order details...</p>
        </div>
      </div>
    );
  }
  
  if (!order) {
    return (
      <div className="container-custom py-16 max-w-3xl mx-auto">
        <div className="text-center">
          <h1 className="text-3xl font-serif mb-4">Order Not Found</h1>
          <p className="mb-6">We couldn't find an order with the number {orderNumber}.</p>
          <Button asChild variant="outline">
            <Link to="/orders">View All Orders</Link>
          </Button>
        </div>
      </div>
    );
  }
  
  return (
    <div className="container-custom py-16 max-w-4xl mx-auto">
      <div className="mb-6">
        <Button 
          variant="ghost" 
          className="mb-2" 
          onClick={() => navigate(-1)}
        >
          <ChevronLeft className="h-4 w-4 mr-2" />
          Back
        </Button>
        
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-serif">Order #{orderNumber}</h1>
          <Button 
            onClick={downloadReceipt}
            className="bg-oldrose hover:bg-oldrose/90 text-white"
          >
            <FileDown className="h-4 w-4 mr-2" />
            Download Receipt
          </Button>
        </div>
        
        <p className="text-gray-600">
          Placed on {new Date(order.date).toLocaleDateString()} · {order.status.toUpperCase()}
        </p>
      </div>
      
      {/* Receipt to be downloaded - hidden on mobile, visible in PDF */}
      <div id="receipt" className="hidden md:block p-8 border border-gray-200 mb-6">
        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold">RECEIPT</h2>
          <p className="text-gray-600">Order #{orderNumber}</p>
          <p className="text-gray-600">{new Date(order.date).toLocaleDateString()}</p>
        </div>
        
        <div className="grid grid-cols-2 gap-8 mb-8">
          <div>
            <h3 className="font-medium mb-2">Shipping Address</h3>
            <p className="text-gray-600">
              {order.shippingAddress.firstName} {order.shippingAddress.lastName}<br />
              {order.shippingAddress.address}<br />
              {order.shippingAddress.city}, {order.shippingAddress.state} {order.shippingAddress.zipCode}<br />
              {order.shippingAddress.country}
            </p>
          </div>
          
          <div>
            <h3 className="font-medium mb-2">Payment Information</h3>
            <p className="text-gray-600">
              Method: {order.paymentMethod}<br />
              Reference: {order.paymentReference}
            </p>
          </div>
        </div>
        
        <Table>
          <TableCaption>Thank you for your purchase.</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead>Product</TableHead>
              <TableHead className="text-right">Quantity</TableHead>
              <TableHead className="text-right">Price</TableHead>
              <TableHead className="text-right">Total</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {order.items.map((item, index) => (
              <TableRow key={index}>
                <TableCell className="font-medium">{item.name}</TableCell>
                <TableCell className="text-right">{item.quantity}</TableCell>
                <TableCell className="text-right">R{item.price.toLocaleString()}</TableCell>
                <TableCell className="text-right">R{(item.price * item.quantity).toLocaleString()}</TableCell>
              </TableRow>
            ))}
            <TableRow>
              <TableCell colSpan={3} className="text-right font-medium">Subtotal</TableCell>
              <TableCell className="text-right">R{order.subtotal.toLocaleString()}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell colSpan={3} className="text-right font-medium">Shipping</TableCell>
              <TableCell className="text-right">R{order.shipping.toLocaleString()}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell colSpan={3} className="text-right font-medium">Tax</TableCell>
              <TableCell className="text-right">R{order.tax.toLocaleString()}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell colSpan={3} className="text-right font-medium">Total</TableCell>
              <TableCell className="text-right font-bold">R{order.total.toLocaleString()}</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </div>
      
      {/* Order Details */}
      <div className="bg-gray-50 p-6 mb-6">
        <h2 className="text-xl font-medium mb-4">Order Summary</h2>
        
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Product</TableHead>
              <TableHead className="text-right">Quantity</TableHead>
              <TableHead className="text-right">Price</TableHead>
              <TableHead className="text-right">Total</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {order.items.map((item, index) => (
              <TableRow key={index}>
                <TableCell className="font-medium">{item.name}</TableCell>
                <TableCell className="text-right">{item.quantity}</TableCell>
                <TableCell className="text-right">R{item.price.toLocaleString()}</TableCell>
                <TableCell className="text-right">R{(item.price * item.quantity).toLocaleString()}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        
        <div className="mt-4 border-t border-gray-200 pt-4">
          <div className="flex justify-between py-1">
            <span className="text-gray-600">Subtotal</span>
            <span className="font-medium">R{order.subtotal.toLocaleString()}</span>
          </div>
          <div className="flex justify-between py-1">
            <span className="text-gray-600">Shipping</span>
            <span className="font-medium">R{order.shipping.toLocaleString()}</span>
          </div>
          <div className="flex justify-between py-1">
            <span className="text-gray-600">Tax</span>
            <span className="font-medium">R{order.tax.toLocaleString()}</span>
          </div>
          <div className="flex justify-between py-1 text-lg">
            <span className="font-medium">Total</span>
            <span className="font-bold">R{order.total.toLocaleString()}</span>
          </div>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <div className="bg-gray-50 p-6">
          <h2 className="text-xl font-medium mb-4">Shipping Information</h2>
          <p className="mb-2">
            <span className="font-medium">Address:</span><br />
            {order.shippingAddress.firstName} {order.shippingAddress.lastName}<br />
            {order.shippingAddress.address}<br />
            {order.shippingAddress.city}, {order.shippingAddress.state} {order.shippingAddress.zipCode}<br />
            {order.shippingAddress.country}
          </p>
          <p className="mb-2">
            <span className="font-medium">Shipping Method:</span><br />
            Standard Shipping (3-5 business days)
          </p>
          <p>
            <span className="font-medium">Status:</span><br />
            <span className="capitalize">{order.status}</span>
          </p>
        </div>
        
        <div className="bg-gray-50 p-6">
          <h2 className="text-xl font-medium mb-4">Payment Information</h2>
          <p className="mb-2">
            <span className="font-medium">Method:</span><br />
            {order.paymentMethod}
          </p>
          <p className="mb-2">
            <span className="font-medium">Reference:</span><br />
            {order.paymentReference}
          </p>
          <p>
            <span className="font-medium">Billing Address:</span><br />
            Same as shipping address
          </p>
        </div>
      </div>
      
      <div className="flex justify-center">
        <Button asChild variant="outline" className="mr-4">
          <Link to="/orders">Back to Orders</Link>
        </Button>
        <Button 
          onClick={downloadReceipt}
          className="bg-oldrose hover:bg-oldrose/90 text-white"
        >
          <FileDown className="h-4 w-4 mr-2" />
          Download Receipt
        </Button>
      </div>
    </div>
  );
};

export default OrderDetails;
