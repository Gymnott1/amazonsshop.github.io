import React, { useState } from 'react';
import { Clock, Package, Truck, CheckCircle, Search, MapPin, Calendar, Phone, User, CreditCard, ShoppingBag, ArrowRight, AlertCircle, RefreshCw } from 'lucide-react';

const OrderTracking = () => {
  const [identifier, setIdentifier] = useState('');
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [animate, setAnimate] = useState(false);

  // Sample order data
  const sampleOrders = {
    "orders": [
      {
        "id": "ORD12345",
        "customerName": "John Doe",
        "phone": "0712345678",
        "address": "123 Mombasa Road, Nairobi",
        "items": [
          {
            "productId": 1,
            "name": "Pro Gas Refill",
            "price": 1250,
            "quantity": 1
          }
        ],
        "total": 1250,
        "paymentMethod": "Cash on delivery",
        "status": "Delivered",
        "orderDate": "2025-01-05T10:30:00",
        "deliveryDate": "2025-01-05T14:45:00",
        "deliveryPerson": "Mike Johnson",
        "deliveryPhone": "0700123456",
        "deliveryVehicle": "KCA 123B",
        "estimatedTime": "14:30-15:30"
      },
      {
        "id": "ORD12346",
        "customerName": "Jane Smith",
        "phone": "0723456789",
        "address": "45 Ngong Road, Nairobi",
        "items": [
          {
            "productId": 2,
            "name": "Men Gas Refill",
            "price": 1250,
            "quantity": 1
          },
          {
            "productId": 9,
            "name": "Gas Burner",
            "price": 1000,
            "quantity": 1
          }
        ],
        "total": 2250,
        "paymentMethod": "Cash on delivery",
        "status": "Delivered",
        "orderDate": "2025-01-08T09:15:00",
        "estimatedTime": "12:30-13:30",
        "deliveryPerson": "Sarah Kamau",
        "deliveryPhone": "0711987654",
        "deliveryVehicle": "KBZ 789C"
      }
    ]
  };

  const trackOrder = (id) => {
    return sampleOrders.orders.find(order =>
      order.id.toLowerCase() === id.toLowerCase() ||
      order.phone.replace(/\s/g, '') === id.replace(/\s/g, '')
    );
  };

  const handleTrack = (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setAnimate(true);

    setTimeout(() => {
      const foundOrder = trackOrder(identifier);
      if (foundOrder) {
        setOrder(foundOrder);
      } else {
        setError('No order found with the provided ID or phone number.');
      }
      setLoading(false);
      setAnimate(false);
    }, 1500);
  };

  const formatDate = (dateString) => {
    if (!dateString) return "Not available";
    const date = new Date(dateString);
    return date.toLocaleString('en-KE', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getStatusIndex = (status) => {
    const statuses = ['Processing', 'Out for Delivery', 'Delivered'];
    return statuses.indexOf(status);
  };

  const getProgress = (status) => {
    switch (status) {
      case 'Processing': return '25%';
      case 'Out for Delivery': return '65%';
      case 'Delivered': return '100%';
      default: return '0%';
    }
  };

  const StatusIcon = ({ status }) => {
    switch (status) {
      case 'Processing':
        return <Package className="text-yellow-500 dark:text-yellow-400" size={24} />;
      case 'Out for Delivery':
        return <Truck className="text-blue-500 dark:text-blue-400" size={24} />;
      case 'Delivered':
        return <CheckCircle className="text-green-500 dark:text-green-400" size={24} />;
      default:
        return <Clock className="text-gray-500 dark:text-gray-400" size={24} />;
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center dark:bg-gradient-to-br dark:from-gray-900 dark:to-gray-800 py-12 px-4 transition-colors duration-700">
      <div className="max-w-4xl w-full">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold dark:text-white mb-2">Track Your Order</h1>
          <p className="dark:text-gray-300">Get real-time updates on your delivery status</p>
        </div>

        {/* Search Box */}
        <div className="bg-white dark:bg-gray-800 bg-opacity-10 backdrop-filter backdrop-blur-lg rounded-xl p-8 mb-8 shadow-2xl border border-gray-700">
          <form onSubmit={handleTrack} className="mb-4">
            <div className="flex flex-col sm:flex-row items-center gap-4">
              <div className="relative flex-grow">
                <input
                  type="text"
                  placeholder="Enter Order ID or Phone Number"
                  value={identifier}
                  onChange={(e) => setIdentifier(e.target.value)}
                  className="w-full px-5 py-4 pl-12 dark:bg-gray-800 border border-gray-700 rounded-xl dark:text-white font-medium focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                />
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 dark:text-gray-500" size={20} />
              </div>
              <button
                type="submit"
                disabled={loading}
                className={`px-8 py-4 bg-gradient-to-r from-orange-600 to-orange-300 hover:from-orange-700 hover:to-orange-300 text-white font-bold rounded-xl transition-all duration-300 flex items-center justify-center min-w-40 ${loading ? 'opacity-70 cursor-not-allowed' : ''}`}
              >
                {loading ? (
                  <RefreshCw className="animate-spin mr-2" size={20} />
                ) : (
                  <Search className="mr-2" size={20} />
                )}
                Track Order
              </button>
            </div>
          </form>

          {error && (
            <div className="bg-red-500 bg-opacity-20 border border-red-400 text-red-100 px-4 py-3 rounded-lg flex items-center mb-4">
              <AlertCircle className="mr-2" size={20} />
              {error}
            </div>
          )}

          {/* Order Details */}
          {order && (
            <div className={`transition-all duration-500 ${animate ? 'opacity-0 scale-95' : 'opacity-100 scale-100'}`}>
              <div className="dark:bg-gray-800 rounded-xl p-6 border border-gray-700 mb-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h2 className="text-2xl font-bold dark:text-white mb-4 flex items-center">
                      <ShoppingBag className="mr-2" size={24} />
                      Order #{order.id}
                    </h2>
                    <div className="space-y-3">
                      <div className="flex items-center dark:text-gray-300">
                        <User className="mr-3 dark:text-gray-400" size={18} />
                        <span className="font-medium">{order.customerName}</span>
                      </div>
                      <div className="flex items-center dark:text-gray-300">
                        <Phone className="mr-3 dark:text-gray-400" size={18} />
                        <span>{order.phone}</span>
                      </div>
                      <div className="flex items-start dark:text-gray-300">
                        <MapPin className="mr-3 dark:text-gray-400 mt-1" size={18} />
                        <span>{order.address}</span>
                      </div>
                      <div className="flex items-center dark:text-gray-300">
                        <Calendar className="mr-3 dark:text-gray-400" size={18} />
                        <span>Ordered: {formatDate(order.orderDate)}</span>
                      </div>
                      <div className="flex items-center dark:text-gray-300">
                        <CreditCard className="mr-3 dark:text-gray-400" size={18} />
                        <span>{order.paymentMethod}</span>
                      </div>
                    </div>
                  </div>

                  <div className="border-l border-gray-700 pl-6 hidden md:block">
                    <h3 className="text-xl font-bold dark:text-white mb-4">Order Items</h3>
                    <div className="space-y-3">
                      {order.items.map((item, index) => (
                        <div key={index} className="flex justify-between dark:text-gray-300">
                          <span>
                            {item.name} x{item.quantity}
                          </span>
                          <span className="font-medium">KSh {item.price.toLocaleString()}</span>
                        </div>
                      ))}
                      <div className="border-t border-gray-700 pt-3 flex justify-between dark:text-white font-bold">
                        <span>Total</span>
                        <span>KSh {order.total.toLocaleString()}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Order Status Timeline */}
              <div className="dark:bg-gray-800 rounded-xl p-6 border border-gray-700">
                <h3 className="text-xl font-bold dark:text-white mb-6">Delivery Status</h3>

                {/* Progress Bar */}
                <div className="mb-4">
                  <div className="h-2 dark:bg-gray-700 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-orange-400 to-orange-300 transition-all duration-1000 ease-in-out"
                      style={{ width: getProgress(order.status) }}
                    ></div>
                  </div>
                </div>

                {/* Status Timeline */}
                <div className="relative">
                  <div className="absolute left-8 top-0 h-full w-px dark:bg-gray-700"></div>

                  {/* Processing */}
                  <div className="relative flex items-start mb-6">
                    <div className={`flex items-center justify-center w-16 h-16 rounded-full ${getStatusIndex(order.status) >= 0 ? 'bg-yellow-500 bg-opacity-20' : 'bg-gray-700'}`}>
                      <Package className={getStatusIndex(order.status) >= 0 ? 'text-yellow-400' : 'text-gray-500'} size={24} />
                    </div>
                    <div className="ml-6">
                      <h4 className={`text-lg font-bold ${getStatusIndex(order.status) >= 0 ? 'text-yellow-400' : 'text-gray-500'}`}>
                        Processing
                      </h4>
                      <p className="dark:text-gray-400 mt-1">
                        {getStatusIndex(order.status) >= 0
                          ? `Your order has been processed on ${formatDate(order.orderDate)}`
                          : 'Waiting for processing'
                        }
                      </p>
                    </div>
                  </div>

                  {/* Out for Delivery */}
                  <div className="relative flex items-start mb-6">
                    <div className={`flex items-center justify-center w-16 h-16 rounded-full ${getStatusIndex(order.status) >= 1 ? 'bg-blue-500 bg-opacity-20' : 'bg-gray-700'}`}>
                      <Truck className={getStatusIndex(order.status) >= 1 ? 'text-blue-400' : 'text-gray-500'} size={24} />
                    </div>
                    <div className="ml-6">
                      <h4 className={`text-lg font-bold ${getStatusIndex(order.status) >= 1 ? 'text-blue-400' : 'text-gray-500'}`}>
                        Out for Delivery
                      </h4>
                      <p className="text-gray-400 mt-1">
                        {getStatusIndex(order.status) >= 1
                          ? 'Your order is on its way!'
                          : 'Waiting to be dispatched'
                        }
                      </p>

                      {getStatusIndex(order.status) >= 1 && (
                        <div className="dark:bg-blue-900 bg-opacity-30 rounded-lg p-4 mt-3 border border-blue-800">
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                            <div>
                              <p className="text-blue-300 text-sm">Delivery Person</p>
                              <p className="dark:text-white">{order.deliveryPerson}</p>
                            </div>
                            <div>
                              <p className="text-blue-300 text-sm">Contact</p>
                              <p className="dark:text-white">{order.deliveryPhone}</p>
                            </div>
                            <div>
                              <p className="text-blue-300 text-sm">Vehicle</p>
                              <p className="dark:text-white">{order.deliveryVehicle}</p>
                            </div>
                            <div>
                              <p className="text-blue-300 text-sm">Estimated Time</p>
                              <p className="dark:text-white">{order.estimatedTime}</p>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Delivered */}
                  <div className="relative flex items-start">
                    <div className={`flex items-center justify-center w-16 h-16 rounded-full ${getStatusIndex(order.status) >= 2 ? 'bg-green-500 bg-opacity-20' : 'bg-gray-700'}`}>
                      <CheckCircle className={getStatusIndex(order.status) >= 2 ? 'text-green-400' : 'text-gray-500'} size={24} />
                    </div>
                    <div className="ml-6">
                      <h4 className={`text-lg font-bold ${getStatusIndex(order.status) >= 2 ? 'text-green-400' : 'text-gray-500'}`}>
                        Delivered
                      </h4>
                      <p className="text-gray-400 mt-1">
                        {getStatusIndex(order.status) >= 2
                          ? `Your order was delivered on ${formatDate(order.deliveryDate)}`
                          : 'Pending delivery'
                        }
                      </p>

                      {getStatusIndex(order.status) >= 2 && (
                        <div className="mt-3">
                          <button className="flex items-center text-green-400 hover:text-green-300 transition-colors">
                            Rate your delivery experience
                            <ArrowRight className="ml-2" size={16} />
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Recent Orders Summary (only if no order is searched) */}
        {!order && !loading && (
          <div className="bg-white dark:bg-gray-800 bg-opacity-10 backdrop-filter backdrop-blur-lg rounded-xl p-6 border border-gray-700">
            <h3 className="text-xl font-bold dark:text-white mb-4">Recent Delivered Orders</h3>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="text-left dark:text-gray-400">
                    <th className="pb-3 pl-3">Order ID</th>
                    <th className="pb-3">Date</th>
                    <th className="pb-3">Total</th>
                    <th className="pb-3">Status</th>
                    <th className="pb-3 text-right pr-3">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-700">
                  {sampleOrders.orders.map((sampleOrder) => (
                    <tr key={sampleOrder.id} className="dark:text-gray-300">
                      <td className="py-4 pl-3">{sampleOrder.id}</td>
                      <td className="py-4">{new Date(sampleOrder.orderDate).toLocaleDateString()}</td>
                      <td className="py-4">KSh {sampleOrder.total.toLocaleString()}</td>
                      <td className="py-4">
                        <div className="flex items-center">
                          <StatusIcon status={sampleOrder.status} />
                          <span className="ml-2">{sampleOrder.status}</span>
                        </div>
                      </td>
                      <td className="py-4 text-right pr-3">
                        <button
                          onClick={() => {
                            setIdentifier(sampleOrder.id);
                            handleTrack({ preventDefault: () => {} });
                          }}
                          className="text-blue-400 hover:text-blue-300"
                        >
                          View
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Help Box */}
        <div className="mt-8 text-center">
          <p className="dark:text-gray-400">Need help tracking your order? Call us at <span className="dark:text-white font-medium">0700 123 456</span></p>
        </div>
      </div>
    </div>
  );
};

export default OrderTracking;
