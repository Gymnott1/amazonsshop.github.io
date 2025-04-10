import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/layout/Layout';
import Home from './components/pages/Home';
import Cart from './components/pages/Cart';
import OrderTracking from './components/pages/OrderTracking';
import ContactUs from './components/pages/ContactUs';
import { CartProvider } from './context/CartContext';
import { OrderProvider } from './context/OrderContext';

function App() {
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = (query) => {
    setSearchQuery(query);
  };

  return (
    <Router>
      <CartProvider>
        <OrderProvider>
          <Layout onSearch={handleSearch}>
            <Routes>
              <Route path="/" element={<Home searchQuery={searchQuery} />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="/order-tracking" element={<OrderTracking />} />
              <Route path="/contact" element={<ContactUs />} />
            </Routes>
          </Layout>
        </OrderProvider>
      </CartProvider>
    </Router>
  );
}

export default App;
