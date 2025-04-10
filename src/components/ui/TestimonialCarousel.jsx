import React, { useState, useEffect, useRef } from 'react';

const TestimonialCarousel = ({ testimonials }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const autoPlayRef = useRef(null);
  const timeoutRef = useRef(null);
  
  // Initialize visible slides based on screen width
  const [visibleSlides, setVisibleSlides] = useState(1);
  
  // Handle responsive behavior
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1280) {
        setVisibleSlides(3);
      } else if (window.innerWidth >= 768) {
        setVisibleSlides(2);
      } else {
        setVisibleSlides(1);
      }
    };
    
    handleResize();
    window.addEventListener('resize', handleResize);
    
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);
  
  // Auto slide functionality with pause on hover
  useEffect(() => {
    const play = () => {
      autoPlayRef.current = setInterval(() => {
        goToNext();
      }, 6000); // Change slide every 6 seconds
    };
    
    play();
    
    return () => {
      if (autoPlayRef.current) {
        clearInterval(autoPlayRef.current);
      }
    };
  }, [testimonials.length, currentIndex, visibleSlides]);
  
  // Smooth transition handling
  const goToSlide = (index) => {
    if (isAnimating) return;
    
    setIsAnimating(true);
    setCurrentIndex(index);
    
    // Clear animation state after transition completes
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    
    timeoutRef.current = setTimeout(() => {
      setIsAnimating(false);
    }, 500); // Match this with the CSS transition duration
  };
  
  const goToPrevious = () => {
    const newIndex = Math.max(currentIndex - 1, 0);
    goToSlide(newIndex);
  };
  
  const goToNext = () => {
    const maxIndex = Math.max(0, testimonials.length - visibleSlides);
    const newIndex = currentIndex >= maxIndex ? 0 : currentIndex + 1;
    goToSlide(newIndex);
  };
  
  // Pause autoplay on hover
  const handleMouseEnter = () => {
    if (autoPlayRef.current) {
      clearInterval(autoPlayRef.current);
    }
  };
  
  const handleMouseLeave = () => {
    if (autoPlayRef.current) {
      clearInterval(autoPlayRef.current);
    }
    autoPlayRef.current = setInterval(() => {
      goToNext();
    }, 6000);
  };
  
  return (
    <div className="relative w-full mx-auto py-16 px-4 bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-800">
      <div className="max-w-7xl mx-auto">
        <div className="mb-12 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-2 dark:text-white">Client Testimonials</h2>
          <div className="w-20 h-1 bg-orange-600 mx-auto mb-4"></div>
          <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Discover what our customers have to say about their experiences with our products and services.
          </p>
        </div>
        
        <div 
          className="relative overflow-hidden"
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          {/* Backdrop Decorations */}
          <div className="absolute -top-10 -left-10 w-40 h-40 bg-orange-100 dark:bg-orange-900 opacity-20 rounded-full blur-3xl"></div>
          <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-purple-100 dark:bg-purple-900 opacity-20 rounded-full blur-3xl"></div>
          
          {/* Carousel Container */}
          <div className="overflow-hidden">
            <div 
              className="flex transition-transform duration-500 ease-out"
              style={{ transform: `translateX(-${currentIndex * (100 / visibleSlides)}%)` }}
            >
              {testimonials.map((testimonial, index) => (
                <div 
                  key={index} 
                  className={`w-full md:w-1/2 xl:w-1/3 flex-shrink-0 px-4 md:px-6`}
                  style={{ flex: `0 0 ${100 / visibleSlides}%` }}
                >
                  <div className="h-full bg-white dark:bg-gray-800 rounded-xl shadow-lg hover:shadow-xl transition-shadow p-8 flex flex-col relative overflow-hidden group">
                    {/* Decorative accent */}
                    <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-orange-500 to-purple-600"></div>
                    
                    {/* Quote icon */}
                    <div className="absolute top-6 right-6 text-gray-200 dark:text-gray-700 opacity-60">
                      <svg className="w-16 h-16" fill="currentColor" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
                        <path d="M10.722 6.065c-5.793 2.303-9.76 7.754-9.76 14.172 0 3.056 1.168 5.339 3.364 5.339 1.712 0 2.986-1.334 2.986-3.26 0-1.877-1.3-3.481-2.986-3.798.523-2.88 2.576-5.339 5.442-6.762l.954-5.691zm13.952 0c-5.793 2.303-9.76 7.754-9.76 14.172 0 3.056 1.168 5.339 3.364 5.339 1.712 0 2.986-1.334 2.986-3.26 0-1.877-1.3-3.481-2.986-3.798.523-2.88 2.576-5.339 5.442-6.762l.954-5.691z"/>
                      </svg>
                    </div>
                    
                    <div className="flex items-center mb-6 relative z-10">
                      <div className="relative">
                        <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-orange-500 shadow-md">
                          {testimonial.avatar ? (
                            <img 
                              src={testimonial.avatar} 
                              alt={testimonial.name} 
                              className="w-full h-full object-cover"
                            />
                          ) : (
                            <div className="w-full h-full bg-gradient-to-br from-orange-500 to-purple-600 flex items-center justify-center text-white">
                              <span className="text-xl font-bold">
                                {testimonial.name.charAt(0)}
                              </span>
                            </div>
                          )}
                        </div>
                        <div className="absolute -bottom-1 -right-1 bg-green-500 w-6 h-6 rounded-full flex items-center justify-center border-2 border-white dark:border-gray-800">
                          <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7"></path>
                          </svg>
                        </div>
                      </div>
                      
                      <div className="ml-4">
                        <h3 className="font-bold text-lg text-gray-900 dark:text-white">{testimonial.name}</h3>
                        <p className="text-sm text-gray-500 dark:text-gray-400">{testimonial.location || "Verified Customer"}</p>
                      </div>
                    </div>
                    
                    <div className="mb-4 flex">
                      {[...Array(5)].map((_, i) => (
                        <svg 
                          key={i}
                          className={`w-5 h-5 ${i < testimonial.rating ? 'text-yellow-400' : 'text-gray-300 dark:text-gray-600'}`}
                          fill="currentColor"
                          viewBox="0 0 20 20"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                      ))}
                      
                      {testimonial.ratingText && (
                        <span className="ml-2 text-sm text-gray-500 dark:text-gray-400">
                          {testimonial.ratingText}
                        </span>
                      )}
                    </div>
                    
                    <p className="text-gray-700 dark:text-gray-300 mb-6 flex-grow">
                      "{testimonial.comment}"
                    </p>
                    
                    <div className="flex items-center justify-between mt-auto pt-4 border-t border-gray-100 dark:border-gray-700">
                      <div className="flex items-center">
                        <svg className="w-5 h-5 text-orange-500 mr-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                        </svg>
                        <span className="text-xs text-gray-500 dark:text-gray-400">{testimonial.date}</span>
                      </div>
                      
                      {testimonial.productPurchased && (
                        <div className="text-xs text-gray-500 dark:text-gray-400 flex items-center">
                          <svg className="w-4 h-4 mr-1 text-green-500" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                            <path fillRule="evenodd" d="M10 2a4 4 0 00-4 4v1H5a1 1 0 00-.994.89l-1 9A1 1 0 004 18h12a1 1 0 00.994-1.11l-1-9A1 1 0 0015 7h-1V6a4 4 0 00-4-4zm2 5V6a2 2 0 10-4 0v1h4zm-6 3a1 1 0 112 0 1 1 0 01-2 0zm7-1a1 1 0 100 2 1 1 0 000-2z" clipRule="evenodd" />
                          </svg>
                          <span>{testimonial.productPurchased}</span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          {/* Navigation Buttons */}
          <button 
            onClick={goToPrevious}
            disabled={currentIndex === 0}
            className={`absolute top-1/2 left-2 md:left-4 transform -translate-y-1/2 p-3 rounded-full shadow-lg z-10 transition-all duration-300 
              ${currentIndex === 0 
                ? 'bg-gray-200 text-gray-400 cursor-not-allowed opacity-70' 
                : 'bg-white hover:bg-orange-50 text-orange-600 hover:scale-110 hover:shadow-xl'
              } 
              dark:bg-gray-800 dark:text-white dark:hover:bg-gray-700`}
            aria-label="Previous testimonial"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          
          <button 
            onClick={goToNext}
            disabled={currentIndex >= testimonials.length - visibleSlides && visibleSlides < testimonials.length}
            className={`absolute top-1/2 right-2 md:right-4 transform -translate-y-1/2 p-3 rounded-full shadow-lg z-10 transition-all duration-300 
              ${currentIndex >= testimonials.length - visibleSlides && visibleSlides < testimonials.length
                ? 'bg-gray-200 text-gray-400 cursor-not-allowed opacity-70' 
                : 'bg-white hover:bg-orange-50 text-orange-600 hover:scale-110 hover:shadow-xl'
              }
              dark:bg-gray-800 dark:text-white dark:hover:bg-gray-700`}
            aria-label="Next testimonial"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
        
        {/* Dots Indicator */}
        <div className="flex justify-center mt-8 space-x-2">
          {Array.from({ length: Math.ceil(testimonials.length / visibleSlides) }).map((_, index) => {
            const isActive = index === Math.floor(currentIndex / visibleSlides);
            return (
              <button
                key={index}
                onClick={() => goToSlide(index * visibleSlides)}
                className={`h-2 rounded-full transition-all duration-300 ${
                  isActive 
                    ? 'w-8 bg-orange-600' 
                    : 'w-2 bg-gray-300 dark:bg-gray-600 hover:bg-gray-400 dark:hover:bg-gray-500'
                }`}
                aria-label={`Go to testimonial group ${index + 1}`}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
};


export default TestimonialCarousel;