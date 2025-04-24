import React, { useState, useContext, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { CartContext } from '../../context/CartContext';
import { ShoppingCartIcon, MagnifyingGlassIcon, Bars3Icon, XMarkIcon, SunIcon, MoonIcon } from '@heroicons/react/24/outline';

const Header = ({ onSearch }) => {
  const { itemCount } = useContext(CartContext);
  const [searchQuery, setSearchQuery] = useState('');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(() => {
    
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
      return savedTheme === 'dark';
    }
    return window.matchMedia('(prefers-color-scheme: dark)').matches;
  });
  const navigate = useNavigate();

  // Apply theme changes
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [darkMode]);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    onSearch(searchQuery); // Pass the search query to the parent component
    navigate('/'); // Navigate to the home page to display search results
  };

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

 
  const lightLogo = "https://i.ibb.co/b5TV3S5R/logo-1.png";
  const darkLogo = "https://i.ibb.co/HDqRRxjL/logo-white-1.png"; // Using the other logo as dark mode version

  return (
    <header className="bg-white dark:bg-gray-900 shadow-md sticky top-0 z-50 transition-all duration-500">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
         
          <Link to="/" className="flex items-center">
            <div className="relative h-10 w-40 overflow-hidden">
              <img
                src={lightLogo}
                alt="Amazons Enterprise Logo Light"
                className={`absolute h-10 w-auto object-contain transition-opacity duration-500 ${darkMode ? 'opacity-0' : 'opacity-100'}`}
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = "https://via.placeholder.com/160x50?text=Amazons+Enterprise";
                }}
              />
              <img
                src={darkLogo}
                alt="Amazons Enterprise Logo Dark"
                className={`absolute h-20 w-auto object-contain transition-opacity duration-500 ${darkMode ? 'opacity-100' : 'opacity-0'}`}
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = "https://via.placeholder.com/160x50?text=Amazons+Enterprise";
                }}
              />
            </div>
          </Link>

          
          <div className="hidden md:flex flex-grow max-w-md mx-4">
            <form onSubmit={handleSearch} className="w-full">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search products..."
                  className="w-full py-2 px-4 border border-gray-300 dark:border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200 transition-all duration-300"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                <button
                  type="submit"
                  className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-500 dark:text-gray-400 hover:text-orange-500 dark:hover:text-orange-400 transition-colors duration-300"
                >
                  <MagnifyingGlassIcon className="h-5 w-5" />
                </button>
              </div>
            </form>
          </div>

         
          <nav className="hidden md:flex items-center space-x-6">
            <Link to="/" className="text-gray-700 dark:text-gray-200 hover:text-orange-500 dark:hover:text-orange-400 font-medium transition-colors duration-300">Home</Link>
            <Link to="/order-tracking" className="text-gray-700 dark:text-gray-200 hover:text-orange-500 dark:hover:text-orange-400 font-medium transition-colors duration-300">Track Order</Link>
            <Link to="/contact" className="text-gray-700 dark:text-gray-200 hover:text-orange-500 dark:hover:text-orange-400 font-medium transition-colors duration-300">Contact Us</Link>
            
           
            <button 
              onClick={toggleDarkMode} 
              className="p-2 rounded-full text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 focus:outline-none transition-all duration-300 relative overflow-hidden"
              aria-label="Toggle dark mode"
            >
              <div className="transition-all duration-500 transform relative">
                <SunIcon className={`h-5 w-5 transition-all duration-500 absolute top-0 left-0 ${darkMode ? 'opacity-100 scale-100' : 'opacity-0 rotate-90 scale-0'}`} />
                <MoonIcon className={`h-5 w-5 transition-all duration-500 ${darkMode ? 'opacity-0 -rotate-90 scale-0' : 'opacity-100 scale-100'}`} />
              </div>
            </button>
            
            <Link to="/cart" className="relative text-gray-700 dark:text-gray-200 hover:text-orange-500 dark:hover:text-orange-400 transition-colors duration-300">
              <ShoppingCartIcon className="h-6 w-6" />
              {itemCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-orange-500 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center transition-all duration-300">
                  {itemCount}
                </span>
              )}
            </Link>
          </nav>

        
          <div className="md:hidden flex items-center space-x-4">
            
            <button 
              onClick={toggleDarkMode} 
              className="p-1 rounded-full text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 focus:outline-none transition-all duration-300 relative overflow-hidden"
              aria-label="Toggle dark mode"
            >
              <div className="transition-all duration-500 transform relative">
                <SunIcon className={`h-5 w-5 transition-all duration-500 absolute top-0 left-0 ${darkMode ? 'opacity-100 scale-100' : 'opacity-0 rotate-90 scale-0'}`} />
                <MoonIcon className={`h-5 w-5 transition-all duration-500 ${darkMode ? 'opacity-0 -rotate-90 scale-0' : 'opacity-100 scale-100'}`} />
              </div>
            </button>
            
            <Link to="/cart" className="relative text-gray-700 dark:text-gray-200 transition-colors duration-300">
              <ShoppingCartIcon className="h-6 w-6" />
              {itemCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-orange-500 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center transition-all duration-300">
                  {itemCount}
                </span>
              )}
            </Link>
            <button
              className="text-gray-700 dark:text-gray-200 hover:text-orange-500 dark:hover:text-orange-400 transition-colors duration-300"
              onClick={toggleMobileMenu}
            >
              {mobileMenuOpen ? (
                <XMarkIcon className="h-6 w-6" />
              ) : (
                <Bars3Icon className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>

       
        {mobileMenuOpen && (
          <div className="mt-4">
            <form onSubmit={handleSearch} className="w-full">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search products..."
                  className="w-full py-2 px-4 border border-gray-300 dark:border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200 transition-all duration-300"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                <button
                  type="submit"
                  className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-500 dark:text-gray-400 hover:text-orange-500 dark:hover:text-orange-400 transition-colors duration-300"
                >
                  <MagnifyingGlassIcon className="h-5 w-5" />
                </button>
              </div>
            </form>
          </div>
        )}

        
        {mobileMenuOpen && (
          <nav className="md:hidden mt-4 space-y-1 pb-3">
            <Link to="/" className="block text-gray-700 dark:text-gray-200 hover:text-orange-500 dark:hover:text-orange-400 hover:bg-gray-50 dark:hover:bg-gray-800 font-medium py-2 px-3 rounded-md transition-all duration-300">Home</Link>
            <Link to="/analytics" className="block text-gray-700 dark:text-gray-200 hover:text-orange-500 dark:hover:text-orange-400 hover:bg-gray-50 dark:hover:bg-gray-800 font-medium py-2 px-3 rounded-md transition-all duration-300">Dashboard</Link>
            <Link to="/order-tracking" className="block text-gray-700 dark:text-gray-200 hover:text-orange-500 dark:hover:text-orange-400 hover:bg-gray-50 dark:hover:bg-gray-800 font-medium py-2 px-3 rounded-md transition-all duration-300">Track Order</Link>
            <Link to="/contact" className="block text-gray-700 dark:text-gray-200 hover:text-orange-500 dark:hover:text-orange-400 hover:bg-gray-50 dark:hover:bg-gray-800 font-medium py-2 px-3 rounded-md transition-all duration-300">Contact Us</Link>
          </nav>
        )}
      </div>
    </header>
  );
};

export default Header;