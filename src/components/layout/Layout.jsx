import React, { useState, useEffect, useCallback } from 'react';
import Header from './Header';
import Footer from './Footer';
import ChatBot from '../ui/ChatBot'; // Import the ChatBot component

const Layout = ({ children, onSearch }) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [scrollPosition, setScrollPosition] = useState(0);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [announcementVisible, setAnnouncementVisible] = useState(true);

  // Handle initial page load animation
  useEffect(() => {
    console.log('Page loaded');
    setIsLoaded(true);
  }, []);

  // Debounce function to limit the rate of scroll event handling
  const debounce = (func, wait) => {
    let timeout;
    return function (...args) {
      clearTimeout(timeout);
      timeout = setTimeout(() => func.apply(this, args), wait);
    };
  };

  // Track scroll position for scroll-to-top button and header styling
  const handleScroll = useCallback(
    debounce(() => {
      const position = window.pageYOffset;
      console.log('Scroll position:', position);
      setScrollPosition(position);
      setShowScrollTop(position > 300);
    }, 100),
    []
  );

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [handleScroll]);

  // Scroll to top function
  const scrollToTop = () => {
    console.log('Scroll to top triggered');
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  // Scroll to products function
  const scrollToProducts = () => {
    const productsSection = document.getElementById('products');
    if (productsSection) {
      productsSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Optional announcement bar (for promotions, etc.)
  const Announcement = () => (
    <div>
      {announcementVisible && (
        <div className="bg-orange-600 text-white text-center py-2 px-4">
          <div className="container mx-auto flex items-center justify-center">
            <p className="text-sm font-medium">
              Free delivery on all orders above KSh 2,500! Use code: FREEGAS
            </p>
            <button
              onClick={() => {
                console.log('Announcement closed');
                setAnnouncementVisible(false);
              }}
              className="ml-4 text-white opacity-70 hover:opacity-100 focus:outline-none"
              aria-label="Close announcement"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>
      )}
    </div>
  );

  return (
    <div className="flex dark:bg-gray-800 flex-col min-h-screen dark:text-white bg-gray-50">
      <Announcement />

      <Header
        onSearch={onSearch}
        isScrolled={scrollPosition > 50}
      />

      <main className="flex-grow pt-4 pb-12">
        <div className="container mx-auto px-4">
          <div key={window.location.pathname}>
            {children}
          </div>
        </div>
      </main>

      {/* Pre-footer call to action */}
      <div className="bg-gray-100 dark:bg-gray-800 dark:text-gray-400 py-12 px-4">
        <div className="container mx-auto text-center">
          
          <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
            Experience the convenience of our delivery service. Order now and get your gas cylinders and electronics delivered straight to your doorstep.
          </p>
          
        </div>
      </div>

      <Footer />

      {/* Scroll to top button */}
      {showScrollTop && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-6 right-6 bg-orange-600 text-white p-3 rounded-full shadow-lg hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-orange-500 z-50"
          aria-label="Scroll to top"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
          </svg>
        </button>
      )}

      {/* ChatBot component */}
      <ChatBot />
    </div>
  );
};

export default Layout;
