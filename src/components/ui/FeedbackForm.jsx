import { useState } from 'react';
import { Star } from 'lucide-react';

const FeedbackForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    rating: 5,
    product: '',
    comment: '',
  });
  
  const [formStatus, setFormStatus] = useState({
    submitted: false,
    error: false,
    message: '',
  });
  
  const [isLoading, setIsLoading] = useState(false);
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: value
    }));
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Validate form
    if (!formData.name || !formData.comment) {
      setFormStatus({
        submitted: false,
        error: true,
        message: 'Please fill in all required fields.'
      });
      setIsLoading(false);
      return;
    }
    
    // Simulate API call to submit feedback
    setTimeout(() => {
      // Reset form after successful submission
      setFormData({
        name: '',
        email: '',
        rating: 5,
        product: '',
        comment: '',
      });
      
      setFormStatus({
        submitted: true,
        error: false,
        message: 'Thank you for your feedback! We appreciate your time.'
      });
      
      setIsLoading(false);
      
      // Clear success message after 5 seconds
      setTimeout(() => {
        setFormStatus({
          submitted: false,
          error: false,
          message: ''
        });
      }, 5000);
    }, 1000);
  };
  
  return (
    <div className="bg-white dark:bg-gray-900 rounded-xl shadow-xl p-8 mx-auto max-w-2xl border border-gray-200 dark:border-gray-700">
      <div className="mb-8 text-center">
        <h2 className="text-3xl font-bold text-gray-800 dark:text-white">Share Your Feedback</h2>
        <p className="text-gray-600 dark:text-gray-300 mt-2">We value your opinion and would love to hear from you</p>
      </div>
      
      {formStatus.message && (
        <div className={`mb-6 p-4 rounded-lg ${
          formStatus.error 
            ? 'bg-red-50 border border-red-200 text-red-700 dark:bg-red-900/30 dark:border-red-800 dark:text-red-400' 
            : 'bg-green-50 border border-green-200 text-green-700 dark:bg-green-900/30 dark:border-green-800 dark:text-green-400'
        }`}>
          <div className="flex items-center">
            {formStatus.error ? (
              <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
              </svg>
            ) : (
              <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
            )}
            <p>{formStatus.message}</p>
          </div>
        </div>
      )}
      
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-200">
              Name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-100 focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-colors duration-200"
              required
              placeholder="Your name"
            />
          </div>
          
          <div className="space-y-2">
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-200">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-100 focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-colors duration-200"
              placeholder="your.email@example.com"
            />
          </div>
        </div>
        
        <div className="space-y-2">
          <label htmlFor="product" className="block text-sm font-medium text-gray-700 dark:text-gray-200">
            Product (if applicable)
          </label>
          <select
            id="product"
            name="product"
            value={formData.product}
            onChange={handleChange}
            className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-100 focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-colors duration-200"
          >
            <option value="">Select a product</option>
            <option value="K-Gas Refill">K-Gas Refill</option>
            <option value="Pro Gas Refill">Pro Gas Refill</option>
            <option value="Total Refill">Total Refill</option>
            <option value="Men Gas Refill">Men Gas Refill</option>
            <option value="Lake Gas Refill">Lake Gas Refill</option>
            <option value="Hashi Gas Refill">Hashi Gas Refill</option>
            <option value="Top Gas Refill">Top Gas Refill</option>
            <option value="Electronics">Electronics</option>
            <option value="Gas Accessories">Gas Accessories</option>
            <option value="Other">Other</option>
          </select>
        </div>
        
        <div className="space-y-3">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-200">
            Your Rating
          </label>
          <div className="flex items-center">
            {[1, 2, 3, 4, 5].map((star) => (
              <button
                key={star}
                type="button"
                onClick={() => setFormData({ ...formData, rating: star })}
                className="focus:outline-none mr-1"
              >
                <Star
                  size={28}
                  className={`${
                    star <= formData.rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300 dark:text-gray-600'
                  } cursor-pointer hover:text-yellow-400 hover:fill-yellow-400 transition-colors duration-200`}
                />
              </button>
            ))}
            <span className="ml-3 text-gray-600 dark:text-gray-300">
              {formData.rating} {formData.rating === 1 ? "Star" : "Stars"}
            </span>
          </div>
        </div>
        
        <div className="space-y-2">
          <label htmlFor="comment" className="block text-sm font-medium text-gray-700 dark:text-gray-200">
            Your Feedback <span className="text-red-500">*</span>
          </label>
          <textarea
            id="comment"
            name="comment"
            value={formData.comment}
            onChange={handleChange}
            rows="4"
            className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-100 focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-colors duration-200"
            required
            placeholder="Tell us about your experience..."
          ></textarea>
        </div>
        
        <div className="pt-2">
          <button
            type="submit"
            disabled={isLoading}
            className="w-full px-6 py-3 bg-orange-600 hover:bg-orange-700 text-white font-medium rounded-lg shadow-md hover:shadow-lg focus:outline-none focus:ring-4 focus:ring-orange-500/50 transition-all duration-200 disabled:opacity-70 disabled:cursor-not-allowed disabled:hover:bg-orange-600 disabled:hover:shadow-md"
          >
            {isLoading ? (
              <div className="flex items-center justify-center">
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Submitting...
              </div>
            ) : (
              'Submit Feedback'
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default FeedbackForm;