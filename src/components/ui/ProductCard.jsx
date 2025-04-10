import React, { useState, useContext } from 'react';
import { CartContext } from '../../context/CartContext';
import OrderPopup from './OrderPopup';

const ProductCard = ({ product, showCategory = true }) => {
  const [showPopup, setShowPopup] = useState(false);
  const { addToCart } = useContext(CartContext);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [showShareTooltip, setShowShareTooltip] = useState(false);

  const handleNextImage = () => {
    if (product.images && product.images.length > 1) {
      setCurrentImageIndex((prevIndex) =>
        prevIndex === product.images.length - 1 ? 0 : prevIndex + 1
      );
    }
  };

  const handlePrevImage = () => {
    if (product.images && product.images.length > 1) {
      setCurrentImageIndex((prevIndex) =>
        prevIndex === 0 ? product.images.length - 1 : prevIndex - 1
      );
    }
  };

  const openOrderPopup = () => {
    setShowPopup(true);
  };

  const closeOrderPopup = () => {
    setShowPopup(false);
  };

  const handleAddToCart = () => {
    addToCart(product);
  };

  const handleShare = () => {
    const productUrl = `${window.location.origin}/product/${product.id}`;

    if (navigator.share) {
      // For mobile devices with Web Share API
      navigator.share({
        title: product.name,
        text: `Check out this ${product.name} - ${product.description}`,
        url: productUrl,
      }).catch(error => console.log('Error sharing', error));
    } else {
      // Fallback to clipboard
      navigator.clipboard.writeText(productUrl).then(() => {
        setShowShareTooltip(true);
        setTimeout(() => setShowShareTooltip(false), 2000);
      }).catch(err => {
        console.error('Failed to copy: ', err);
      });
    }
  };

  const hasDiscount = product.regularPrice > product.salePrice;
  const discountPercent = hasDiscount
    ? Math.round(((product.regularPrice - product.salePrice) / product.regularPrice) * 100)
    : 0;

  // Generate category badge color based on category name
  const getCategoryColor = (category) => {
    const categories = {
      'gas-cylinders': 'bg-red-100 text-red-800 dark:bg-red-200 dark:text-red-900',
      'gas-accessories': 'bg-orange-100 text-orange-800 dark:bg-orange-200 dark:text-orange-900',
      'electronics': 'bg-blue-100 text-blue-800 dark:bg-blue-200 dark:text-blue-900',
      'phones': 'bg-indigo-100 text-indigo-800 dark:bg-indigo-200 dark:text-indigo-900',
      'laptops': 'bg-purple-100 text-purple-800 dark:bg-purple-200 dark:text-purple-900',
      'accessories': 'bg-green-100 text-green-800 dark:bg-green-200 dark:text-green-900',
      'default': 'bg-gray-100 text-gray-800 dark:bg-gray-200 dark:text-gray-900'
    };

    return categories[category] || categories.default;
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden transition-transform duration-300 hover:shadow-lg relative">
      {/* Category Badge - Only show if showCategory is true */}
      {showCategory && product.category && (
        <div className={`absolute top-2 left-2 z-10 px-2 py-1 rounded-full text-xs font-medium ${getCategoryColor(product.category)}`}>
          {product.category.replace('-', ' ')}
        </div>
      )}

      {/* Product Image */}
      <div className="relative h-56 bg-gray-100 dark:bg-gray-700">
        <img
          src={product.images ? product.images[currentImageIndex] : ""}
          alt={product.name}
          className="w-full h-full object-contain p-2"
          onError={(e) => {
            e.target.onerror = null;
            e.target.src = "https://via.placeholder.com/300x300?text=Product+Image";
          }}
        />

        {/* Image Navigation Arrows (only show if more than one image) */}
        {product.images && product.images.length > 1 && (
          <>
            <button
              onClick={handlePrevImage}
              className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-white dark:bg-gray-900 bg-opacity-50 dark:bg-opacity-75 rounded-full p-1 hover:bg-opacity-75 dark:hover:bg-opacity-90"
              aria-label="Previous image"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <button
              onClick={handleNextImage}
              className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-white dark:bg-gray-900 bg-opacity-50 dark:bg-opacity-75 rounded-full p-1 hover:bg-opacity-75 dark:hover:bg-opacity-90"
              aria-label="Next image"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </>
        )}

        {/* Discount Tag */}
        {hasDiscount && (
          <div className="absolute top-2 right-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded flex items-center">
            <svg className="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.118 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
            </svg>
            {discountPercent}% OFF
          </div>
        )}

        {/* Stock Status Tag */}
        {product.stockStatus && (
          <div className={`absolute bottom-2 left-2 px-2 py-1 rounded text-xs font-medium ${
            product.stockStatus === 'in-stock' ? 'bg-green-100 text-green-800 dark:bg-green-200 dark:text-green-900' :
            product.stockStatus === 'low-stock' ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-200 dark:text-yellow-900' :
            'bg-red-100 text-red-800 dark:bg-red-200 dark:text-red-900'
          }`}>
            {product.stockStatus === 'in-stock' ? 'In Stock' :
             product.stockStatus === 'low-stock' ? 'Low Stock' :
             'Out of Stock'}
          </div>
        )}
      </div>

      {/* Product Info */}
      <div className="p-4">
        <div className="flex justify-between items-start">
          <div>
            <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100">{product.name}</h3>
            {product.brand && <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">{product.brand}</p>}
          </div>

          {/* Share button */}
          <div className="relative">
            <button
              onClick={handleShare}
              className="text-gray-500 dark:text-gray-300 hover:text-gray-700 dark:hover:text-gray-100"
              aria-label="Share product"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
              </svg>
            </button>

            {/* Share tooltip */}
            {showShareTooltip && (
              <div className="absolute right-0 -top-10 bg-gray-800 text-white text-xs rounded py-1 px-2 whitespace-nowrap">
                Link copied to clipboard!
                <div className="absolute -bottom-1 right-2 w-2 h-2 bg-gray-800 transform rotate-45"></div>
              </div>
            )}
          </div>
        </div>

        <p className="text-sm text-gray-600 dark:text-gray-400 mb-4 line-clamp-2">{product.description}</p>

        {/* Features (if any) */}
        {product.features && product.features.length > 0 && (
          <div className="mb-3">
            <ul className="text-xs text-gray-600 dark:text-gray-400">
              {product.features.slice(0, 2).map((feature, index) => (
                <li key={index} className="flex items-center">
                  <svg className="h-3 w-3 text-green-500 dark:text-green-400 mr-1" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  {feature}
                </li>
              ))}
            </ul>
          </div>
        )}

        <div className="flex justify-between items-center">
          <div className="flex items-baseline">
            <span className="text-lg font-bold text-gray-900 dark:text-gray-100">KSh {product.salePrice.toLocaleString()}</span>
            {hasDiscount && (
              <span className="ml-2 text-sm text-gray-500 dark:text-gray-400 line-through">KSh {product.regularPrice.toLocaleString()}</span>
            )}
          </div>

          {/* Rating (if available) */}
          {product.rating && (
            <div className="flex items-center">
              <div className="flex items-center">
                {[...Array(5)].map((_, i) => (
                  <svg key={i} className={`w-4 h-4 ${i < Math.floor(product.rating) ? 'text-yellow-400 dark:text-yellow-300' : 'text-gray-300 dark:text-gray-500'}`} fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                  </svg>
                ))}
              </div>
              {product.reviewCount && <span className="text-xs text-gray-500 dark:text-gray-400 ml-1">({product.reviewCount})</span>}
            </div>
          )}
        </div>
      </div>

      {/* Order Buttons */}
      <div className="px-4 pb-4 flex justify-between">
        <button
          onClick={openOrderPopup}
          className="bg-orange-300 hover:bg-orange-600 text-white font-medium py-2 px-4 rounded transition duration-300 flex-1 mr-2"
          disabled={product.stockStatus === 'out-of-stock'}
        >
          {product.stockStatus === 'out-of-stock' ? 'Out of Stock' : 'Order Now'}
        </button>

        <button
          onClick={handleAddToCart}
          className="bg-gray-200 hover:bg-gray-300 text-gray-800 dark:text-gray-900 font-medium py-2 px-4 rounded transition duration-300 flex-grow-0"
          disabled={product.stockStatus === 'out-of-stock'}
          aria-label="Add to cart"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
          </svg>
        </button>
      </div>

      {/* Order Popup */}
      {showPopup && (
        <OrderPopup
          product={product}
          onClose={closeOrderPopup}
        />
      )}
    </div>
  );
};

export default ProductCard;
