import React, { useState, useEffect } from 'react';
import Banner from '../ui/Banner';
import ProductGrid from '../ui/ProductGrid';
import TestimonialCarousel from '../ui/TestimonialCarousel';
import FeedbackForm from '../ui/FeedbackForm';
import productsData from '../../data/products.json';
import { motion, AnimatePresence } from 'framer-motion';

// Sample testimonial data (in production, this would come from an API or database)
const testimonials = [
  {
    name: "Jane Doe",
    rating: 5,
    comment: "I've been using their gas cylinders for over a year now. The delivery is always prompt and the staff are very professional. Highly recommended!",
    date: "March 15, 2025",
    avatar: null
  },
  {
    name: "John Smith",
    rating: 4,
    comment: "Great service and quality products. The Pro Gas refill has been my go-to for cooking. Would appreciate more delivery slot options though.",
    date: "February 28, 2025",
    avatar: null
  },
  {
    name: "Mary Johnson",
    rating: 5,
    comment: "The website is so easy to use! I ordered a Men Gas refill and it was delivered the same day. Will definitely be ordering again.",
    date: "April 2, 2025",
    avatar: null
  },
  {
    name: "Robert Brown",
    rating: 5,
    comment: "Not only do they deliver gas cylinders, but their electronics section is also amazing. Just bought a laptop and it works perfectly!",
    date: "March 20, 2025",
    avatar: null
  }
];

const Home = ({ searchQuery }) => {
  const [filteredProducts, setFilteredProducts] = useState(productsData.products);
  const [isLoading, setIsLoading] = useState(false);
  const [activeSection, setActiveSection] = useState('products'); // 'products', 'testimonials', or 'feedback'
  
  useEffect(() => {
    setIsLoading(true);
    
    const timer = setTimeout(() => {
      if (searchQuery) {
        const filtered = productsData.products.filter(product =>
          product.name.toLowerCase().includes(searchQuery.toLowerCase())
        );
        setFilteredProducts(filtered);
      } else {
        setFilteredProducts(productsData.products);
      }
      setIsLoading(false);
    }, 300); // Small delay for transition effect
    
    return () => clearTimeout(timer);
  }, [searchQuery]);

  return (
    <div className="container mx-auto px-4 py-8">
      <AnimatePresence mode="wait">
        <motion.div
          key="banner"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-8"
        >
          <Banner />
        </motion.div>
      </AnimatePresence>

      {/* Section Navigation */}
      <div className="flex justify-center mb-8">
        <div className="inline-flex rounded-md shadow-sm bg-gray-100 dark:bg-gray-300 p-1">
          <button
            onClick={() => setActiveSection('products')}
            className={`px-4 py-2 text-sm font-medium rounded-md ${
              activeSection === 'products'
                ? 'bg-white text-orange-600 shadow-sm'
                : 'text-gray-700 hover:bg-gray-50'
            }`}
          >
            Products
          </button>
          <button
            onClick={() => setActiveSection('testimonials')}
            className={`px-4 py-2 text-sm font-medium rounded-md ${
              activeSection === 'testimonials'
                ? 'bg-white text-orange-600 shadow-sm'
                : 'text-gray-700 hover:bg-gray-50'
            }`}
          >
            Testimonials
          </button>
          <button
            onClick={() => setActiveSection('feedback')}
            className={`px-4 py-2 text-sm font-medium rounded-md ${
              activeSection === 'feedback'
                ? 'bg-white text-orange-600 shadow-sm'
                : 'text-gray-700 hover:bg-gray-50'
            }`}
          >
            Leave Feedback
          </button>
        </div>
      </div>

      {/* Active Section Content */}
      <AnimatePresence mode="wait">
        {activeSection === 'products' && (
          <motion.div
            key="products-section"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            transition={{ duration: 0.3 }}
          >
            <div className="mb-8">
              <h2 className="text-2xl font-bold mb-4">
                {searchQuery ? `Search Results: "${searchQuery}"` : "Featured Products"}
              </h2>
              
              <AnimatePresence mode="wait">
                {isLoading ? (
                  <motion.div
                    key="loading"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="flex justify-center items-center h-64"
                  >
                    <div className="flex items-center space-x-2">
                      <div className="w-4 h-4 rounded-full bg-blue-500 animate-pulse"></div>
                      <div className="w-4 h-4 rounded-full bg-blue-500 animate-pulse delay-150"></div>
                      <div className="w-4 h-4 rounded-full bg-blue-500 animate-pulse delay-300"></div>
                    </div>
                  </motion.div>
                ) : (
                  <motion.div
                    key="products"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.5, staggerChildren: 0.1 }}
                  >
                    <ProductGrid 
                      products={filteredProducts} 
                      emptyMessage={searchQuery ? "No products match your search" : "No products available"} 
                    />
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.7, duration: 0.5 }}
              className="mt-12"
            >
              <h2 className="text-2xl font-bold mb-6">Why Choose Us</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-white dark:bg-gray-700 p-6 rounded-lg shadow-md transform transition duration-300 hover:scale-105">
                  <div className="text-orange-500 mb-2">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <h3 className="text-lg font-semibold mb-2">Quality Products</h3>
                  <p className="text-gray-600 dark:text-gray-300">We offer only the highest quality gas cylinders and electronics.</p>
                </div>
                
                <div className="bg-white dark:bg-gray-700  p-6 rounded-lg shadow-md transform transition duration-300 hover:scale-105">
                  <div className="text-orange-500 mb-2">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <h3 className="text-lg font-semibold mb-2">Fast Delivery</h3>
                  <p className="text-gray-600 dark:text-gray-300">Get your orders delivered quickly and conveniently.</p>
                </div>
                
                <div className="bg-white dark:bg-gray-700  p-6 rounded-lg shadow-md transform transition duration-300 hover:scale-105">
                  <div className="text-orange-500 mb-2">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                    </svg>
                  </div>
                  <h3 className="text-lg font-semibold mb-2">Cash on Delivery</h3>
                  <p className="text-gray-600 dark:text-gray-300">Convenient payment option with no advance required.</p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}

        {activeSection === 'testimonials' && (
          <motion.div
            key="testimonials-section"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            transition={{ duration: 0.3 }}
          >
            <TestimonialCarousel testimonials={testimonials} />
          </motion.div>
        )}

        {activeSection === 'feedback' && (
          <motion.div
            key="feedback-section"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            transition={{ duration: 0.3 }}
          >
            <FeedbackForm />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Home;