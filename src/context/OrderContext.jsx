import React, { createContext, useState, useEffect } from 'react';
import ordersData from '../data/orders.json';

export const OrderContext = createContext();

export const OrderProvider = ({ children }) => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    // In a real app, this would be an API call
    setOrders(ordersData.orders);
  }, []);

  // Find order by ID or phone number
  const trackOrder = (identifier) => {
    return orders.find(order => 
      order.id === identifier || order.phone === identifier
    );
  };

  // Place a new order
  const placeOrder = (orderDetails) => {
    const newOrder = {
      id: `ORD${Math.floor(Math.random() * 90000) + 10000}`,
      status: 'Processing',
      orderDate: new Date().toISOString(),
      ...orderDetails
    };
    
    setOrders([...orders, newOrder]);
    return newOrder.id;
  };

  return (
    <OrderContext.Provider value={{ orders, trackOrder, placeOrder }}>
      {children}
    </OrderContext.Provider>
  );
};