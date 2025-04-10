import React, { useContext, useState } from 'react';
import { CartContext } from '../../context/CartContext';
import { Link } from 'react-router-dom';
import CartOrderPopup from '../ui/CartOrderPopup'; // Adjust the import path as necessary

const Cart = () => {
  const { cart, total, removeFromCart, updateQuantity } = useContext(CartContext);
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  const openPopup = () => {
    setIsPopupOpen(true);
  };

  const closePopup = () => { 
    setIsPopupOpen(false);
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <h1 className="text-3xl font-bold mb-6 text-gray-800 dark:text-gray-200 border-b pb-4">Shopping Cart</h1>

      {cart.length === 0 ? (
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-8 text-center">
          <svg className="w-16 h-16 mx-auto text-gray-400 dark:text-gray-600 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"></path>
          </svg>
          <p className="text-xl text-gray-600 dark:text-gray-400 mb-4">Your cart is empty</p>
          <Link to="/" className="bg-orange-600 hover:bg-orange-700 text-white font-medium py-2 px-6 rounded-md transition duration-300">
            Continue Shopping
          </Link>
        </div>
      ) : (
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden">
          {/* Header */}
          <div className="bg-gray-50 dark:bg-gray-700 px-6 py-4 border-b border-gray-200 dark:border-gray-600 grid grid-cols-12 gap-4 text-gray-600 dark:text-gray-300 font-medium">
            <div className="col-span-6">Product</div>
            <div className="col-span-2 text-center">Price</div>
            <div className="col-span-2 text-center">Quantity</div>
            <div className="col-span-2 text-right">Subtotal</div>
          </div>

          {/* Cart Items */}
          <div className="divide-y divide-gray-200 dark:divide-gray-600">
            {cart.map((item) => (
              <div key={item.id} className="px-6 py-4 grid grid-cols-12 gap-4 items-center">
                <div className="col-span-6 flex items-center">
                  <div className="w-20 h-20 flex-shrink-0 bg-gray-100 dark:bg-gray-700 rounded-md overflow-hidden">
                    <img
                      src={item.images[0]}
                      alt={item.name}
                      className="w-full h-full object-contain"
                    />
                  </div>
                  <div className="ml-4">
                    <h3 className="text-lg font-medium text-gray-800 dark:text-gray-200">{item.name}</h3>
                    <button
                      onClick={() => removeFromCart(item.id)}
                      className="text-sm text-red-500 hover:text-red-700 mt-1 flex items-center"
                    >
                      <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path>
                      </svg>
                      Remove
                    </button>
                  </div>
                </div>

                <div className="col-span-2 text-center text-gray-800 dark:text-gray-200">
                  KSh {item.salePrice.toLocaleString()}
                </div>

                <div className="col-span-2 flex justify-center">
                  <div className="flex items-center border rounded-md border-gray-300 dark:border-gray-600">
                    <button
                      onClick={() => updateQuantity(item.id, Math.max(1, item.quantity - 1))}
                      className="w-8 h-8 flex items-center justify-center text-gray-600 dark:text-gray-300 hover:text-gray-800 dark:hover:text-gray-100"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20 12H4"></path>
                      </svg>
                    </button>
                    <span className="w-10 text-center font-medium text-gray-800 dark:text-gray-200">{item.quantity}</span>
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      className="w-8 h-8 flex items-center justify-center text-gray-600 dark:text-gray-300 hover:text-gray-800 dark:hover:text-gray-100"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
                      </svg>
                    </button>
                  </div>
                </div>

                <div className="col-span-2 text-right font-medium text-gray-800 dark:text-gray-200">
                  KSh {(item.salePrice * item.quantity).toLocaleString()}
                </div>
              </div>
            ))}
          </div>

          {/* Order Summary */}
          <div className="bg-gray-50 dark:bg-gray-700 p-6 border-t border-gray-200 dark:border-gray-600">
            <div className="flex justify-between items-center mb-4">
              <span className="text-gray-600 dark:text-gray-300">Subtotal</span>
              <span className="text-lg font-medium text-gray-800 dark:text-gray-200">KSh {total.toLocaleString()}</span>
            </div>
            <div className="flex justify-between items-center mb-4">
              <span className="text-gray-600 dark:text-gray-300">Shipping</span>
              <span className="text-lg font-medium text-gray-800 dark:text-gray-200">Calculated at checkout</span>
            </div>
            <div className="flex justify-between items-center border-t border-gray-200 dark:border-gray-600 pt-4 mt-4">
              <span className="text-lg font-bold text-gray-800 dark:text-gray-200">Total</span>
              <span className="text-2xl font-bold text-gray-800 dark:text-gray-200">KSh {total.toLocaleString()}</span>
            </div>

            <div className="mt-6 flex flex-col sm:flex-row justify-between items-center">
              <div className="flex items-center mb-4 sm:mb-0">
                <svg className="w-8 h-8 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                </svg>
                <span className="text-lg font-medium text-gray-800 dark:text-gray-200">Cash on Delivery Only</span>
              </div>
              <button
                onClick={openPopup}
                className="w-full sm:w-auto bg-orange-600 hover:bg-orange-700 text-white font-medium py-3 px-8 rounded-md transition duration-300"
              >
                Place Order
              </button>
            </div>
          </div>
        </div>
      )}

      {isPopupOpen && <CartOrderPopup cart={cart} onClose={closePopup} />}
    </div>
  );
};

export default Cart;
