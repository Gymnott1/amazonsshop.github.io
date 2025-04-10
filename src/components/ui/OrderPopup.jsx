import React, { useState, useContext } from 'react';
import { OrderContext } from '../../context/OrderContext';
import { CartContext } from '../../context/CartContext';

const OrderPopup = ({ product, onClose }) => {
  const { placeOrder } = useContext(OrderContext);
  const { clearCart } = useContext(CartContext);

  const [formData, setFormData] = useState({
    customerName: '',
    phone: '',
    address: '',
    quantity: 1,
  });

  const [formErrors, setFormErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [orderSuccess, setOrderSuccess] = useState(false);
  const [orderId, setOrderId] = useState('');

  const validateForm = () => {
    const errors = {};

    if (!formData.customerName.trim()) {
      errors.customerName = 'Name is required';
    }

    if (!formData.phone.trim()) {
      errors.phone = 'Phone number is required';
    } else if (!/^\d{9,12}$/.test(formData.phone.replace(/\s+/g, ''))) {
      errors.phone = 'Please enter a valid phone number';
    }

    if (!formData.address.trim()) {
      errors.address = 'Address is required';
    }

    return errors;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const incrementQuantity = () => {
    setFormData({
      ...formData,
      quantity: formData.quantity + 1
    });
  };

  const decrementQuantity = () => {
    if (formData.quantity > 1) {
      setFormData({
        ...formData,
        quantity: formData.quantity - 1
      });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const errors = validateForm();
    setFormErrors(errors);

    if (Object.keys(errors).length === 0) {
      setIsSubmitting(true);

      // Calculate total
      const total = product.salePrice * formData.quantity;

      // Create order object
      const orderDetails = {
        customerName: formData.customerName,
        phone: formData.phone,
        address: formData.address,
        items: [{
          productId: product.id,
          name: product.name,
          price: product.salePrice,
          quantity: formData.quantity
        }],
        total,
        paymentMethod: 'Cash on delivery'
      };

      // Simulate API call
      setTimeout(() => {
        const newOrderId = placeOrder(orderDetails);
        setOrderId(newOrderId);
        setOrderSuccess(true);
        setIsSubmitting(false);
        clearCart(); // Clear cart after successful order
      }, 1500);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl max-w-md w-full max-h-screen overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700">
          <div className="flex items-center">
            <img
              src="/images/logos/amazons-enterprise-logo.png"
              alt="Amazons Enterprise"
              className="h-8"
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = "https://via.placeholder.com/160x50?text=Amazons+Enterprise";
              }}
            />
          </div>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 dark:text-gray-300 dark:hover:text-gray-100"
          >
            <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
            </svg>
          </button>
        </div>

        {orderSuccess ? (
          <div className="p-6 text-center">
            <svg className="mx-auto h-16 w-16 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
            </svg>
            <h3 className="mt-4 text-xl font-medium text-gray-900 dark:text-gray-100">Order Placed Successfully!</h3>
            <p className="mt-2 text-gray-600 dark:text-gray-300">Your order ID is: <span className="font-bold">{orderId}</span></p>
            <p className="mt-1 text-gray-600 dark:text-gray-300">We will contact you soon via WhatsApp/Phone for confirmation.</p>
            <div className="mt-6">
              <button
                onClick={onClose}
                className="inline-flex justify-center px-4 py-2 text-sm font-medium text-white bg-primary hover:bg-pink-600 rounded-md"
              >
                Close
              </button>
            </div>
          </div>
        ) : (
          <>
            {/* Product Info */}
            <div className="p-4 border-b border-gray-200 dark:border-gray-700">
              <div className="flex">
                <div className="w-24 h-24 bg-gray-100 dark:bg-gray-700 rounded overflow-hidden">
                  <img
                    src={product.images[0]}
                    alt={product.name}
                    className="w-full h-full object-contain"
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = "https://via.placeholder.com/100x100?text=Product";
                    }}
                  />
                </div>
                <div className="ml-4 flex-1">
                  <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100">{product.name}</h3>
                  <div className="mt-1">
                    <p className="text-gray-500 dark:text-gray-400">Was KSh {product.regularPrice.toLocaleString()}</p>
                    <p className="text-lg font-bold text-gray-900 dark:text-gray-100">Now KSh {product.salePrice.toLocaleString()}</p>
                  </div>
                  <div className="mt-2 flex items-center">
                    <button
                      onClick={decrementQuantity}
                      className="text-gray-500 focus:outline-none focus:text-gray-600 dark:text-gray-300 dark:focus:text-gray-100"
                    >
                      <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20 12H4"></path>
                      </svg>
                    </button>
                    <input
                      type="number"
                      min="1"
                      name="quantity"
                      value={formData.quantity}
                      onChange={handleChange}
                      className="mx-2 border rounded w-16 text-center py-1 dark:bg-gray-700 dark:text-gray-200 dark:border-gray-600"
                    />
                    <button
                      onClick={incrementQuantity}
                      className="text-gray-500 focus:outline-none focus:text-gray-600 dark:text-gray-300 dark:focus:text-gray-100"
                    >
                      <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4"></path>
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Order Form */}
            <form onSubmit={handleSubmit} className="p-4">
              <div className="mb-4">
                <label className="block text-gray-700 dark:text-gray-200 text-sm font-bold mb-2" htmlFor="customerName">
                  Your Name*
                </label>
                <input
                  type="text"
                  id="customerName"
                  name="customerName"
                  value={formData.customerName}
                  onChange={handleChange}
                  className={`w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-primary ${
                    formErrors.customerName ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'
                  } dark:bg-gray-700 dark:text-gray-200`}
                  placeholder="Enter your full name"
                />
                {formErrors.customerName && (
                  <p className="text-red-500 text-xs mt-1">{formErrors.customerName}</p>
                )}
              </div>

              <div className="mb-4">
                <label className="block text-gray-700 dark:text-gray-200 text-sm font-bold mb-2" htmlFor="phone">
                  Phone Number* (we will contact you via this number)
                </label>
                <div className="flex">
                  <span className="inline-flex items-center px-3 text-gray-500 dark:text-gray-300 bg-gray-100 dark:bg-gray-700 border border-r-0 border-gray-300 dark:border-gray-600 rounded-l-md">
                    +254
                  </span>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className={`w-full px-3 py-2 border rounded-r-md focus:outline-none focus:ring-2 focus:ring-primary ${
                      formErrors.phone ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'
                    } dark:bg-gray-700 dark:text-gray-200`}
                    placeholder="e.g 712345678"
                  />
                </div>
                {formErrors.phone && (
                  <p className="text-red-500 text-xs mt-1">{formErrors.phone}</p>
                )}
              </div>

              <div className="mb-4">
                <label className="block text-gray-700 dark:text-gray-200 text-sm font-bold mb-2" htmlFor="address">
                  Exact Location / Address*
                </label>
                <textarea
                  id="address"
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  className={`w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-primary ${
                    formErrors.address ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'
                  } dark:bg-gray-700 dark:text-gray-200`}
                  rows="3"
                  placeholder="e.g Maseno ABC Hostels, Room 3"
                ></textarea>
                {formErrors.address && (
                  <p className="text-red-500 text-xs mt-1">{formErrors.address}</p>
                )}
              </div>

              <div className="mb-6">
                <label className="block text-gray-700 dark:text-gray-200 text-sm font-bold mb-2">
                  Payment Method
                </label>
                <div className="flex items-center border border-gray-300 dark:border-gray-600 rounded p-3 bg-gray-50 dark:bg-gray-700">
                  <input
                    type="radio"
                    id="cash"
                    name="paymentMethod"
                    value="cash"
                    checked
                    readOnly
                    className="h-4 w-4 text-primary focus:ring-primary dark:bg-gray-700 dark:border-gray-600"
                  />
                  <label htmlFor="cash" className="ml-2 block text-gray-700 dark:text-gray-200">
                    Cash on Delivery
                  </label>
                </div>
              </div>

              <div className="border-t pt-4 border-gray-200 dark:border-gray-700">
                <div className="flex justify-between text-lg font-bold mb-4">
                  <span className="dark:text-gray-200">Total:</span>
                  <span className="dark:text-gray-200">KSh {(product.salePrice * formData.quantity).toLocaleString()}</span>
                </div>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-orange-300 hover:bg-orange-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-300 disabled:opacity-50"
                >
                  {isSubmitting ? 'Processing...' : 'Place Order'}
                </button>
                <p className="text-center text-gray-500 dark:text-gray-400 text-xs mt-2">
                  We will contact you via WhatsApp/Call to confirm your order
                </p>
              </div>
            </form>
          </>
        )}
      </div>
    </div>
  );
};

export default OrderPopup;
