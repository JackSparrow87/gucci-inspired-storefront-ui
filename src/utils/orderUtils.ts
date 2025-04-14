
import { supabase } from "@/integrations/supabase/client";
import { Product } from "@/types";

interface OrderSummary {
  orderNumber: string;
  date: string;
  status: string;
  total: number;
  items: number;
}

interface OrderItem {
  productId: string;
  productName: string;
  productPrice: number;
  quantity: number;
}

interface ShippingAddress {
  firstName: string;
  lastName: string;
  address: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
  phone: string;
  email?: string;
}

interface OrderDetails {
  orderNumber: string;
  userId: string;
  totalAmount: number;
  paymentReference: string;
  status?: string;
  items: OrderItem[];
  shipping: ShippingAddress;
}

/**
 * Creates a new order in the database
 */
export const createOrder = async (orderDetails: OrderDetails) => {
  try {
    // Insert the order record
    const { data: orderData, error: orderError } = await supabase
      .from('orders')
      .insert({
        user_id: orderDetails.userId,
        order_number: orderDetails.orderNumber,
        total_amount: orderDetails.totalAmount,
        payment_reference: orderDetails.paymentReference,
        status: orderDetails.status || 'pending'
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
        first_name: orderDetails.shipping.firstName,
        last_name: orderDetails.shipping.lastName,
        address: orderDetails.shipping.address,
        city: orderDetails.shipping.city,
        state: orderDetails.shipping.state,
        zip_code: orderDetails.shipping.zipCode,
        country: orderDetails.shipping.country,
        phone: orderDetails.shipping.phone,
        email: orderDetails.shipping.email
      });
    
    if (shippingError) throw shippingError;
    
    // Insert order items
    const orderItems = orderDetails.items.map(item => ({
      order_id: orderId,
      product_id: item.productId,
      product_name: item.productName,
      product_price: item.productPrice,
      quantity: item.quantity
    }));
    
    const { error: itemsError } = await supabase
      .from('order_items')
      .insert(orderItems);
    
    if (itemsError) throw itemsError;
    
    return { success: true, orderId };
  } catch (error) {
    console.error("Error creating order:", error);
    return { success: false, error };
  }
};

/**
 * Gets a list of orders for a specific user
 */
export const getUserOrders = async (userId: string): Promise<OrderSummary[]> => {
  try {
    const { data, error } = await supabase
      .from('orders')
      .select(`
        id,
        order_number,
        status,
        total_amount,
        created_at,
        order_items(id)
      `)
      .eq('user_id', userId)
      .order('created_at', { ascending: false });
    
    if (error) throw error;
    
    if (!data || data.length === 0) return [];
    
    return data.map(order => ({
      orderNumber: order.order_number,
      date: new Date(order.created_at).toISOString().split('T')[0],
      status: order.status || 'pending',
      total: Number(order.total_amount),
      items: order.order_items?.length || 0
    }));
  } catch (error) {
    console.error("Error fetching user orders:", error);
    return [];
  }
};

/**
 * Formats cart items for order creation
 */
export const formatCartItemsForOrder = (
  cartItems: { product: Product; quantity: number }[]
): OrderItem[] => {
  return cartItems.map(item => ({
    productId: item.product.id,
    productName: item.product.name,
    productPrice: item.product.price,
    quantity: item.quantity
  }));
};
