import React, { useState, useEffect, useRef } from 'react';

const Banner = () => {
  // Main slides
  const slides = [
    { id: 1, image: "https://i.ibb.co/gkK8BQZ/slide2-1.jpg" },
    { id: 2, image: "https://i.ibb.co/XZsJ45ky/image-slider-4.jpg" },
    { id: 3, image: "https://i.ibb.co/f3vcjhk/image-slider-2.jpg" },
    { id: 4, image: "https://i.ibb.co/Qy9qSwy/Whats-App-Image-2025-04-09-at-17-47-38-98055102.jpg" },
  ];

  // Rotating text (ticker)
  const announcements = [
    "Happy New Year Month! Pay on delivery!",
    "Free delivery on orders above Ksh 3,000",
    "New stock of K-Gas cylinders now available",
    "Download our app for exclusive deals",
  ];

  // Enhanced Desktop advertisement mini-carousel items with more data
  const adverts = [
    {
      id: 1,
      image: "https://i.ibb.co/spFtGwm8/images.png",
      title: "HELP CENTER",
      subtitle: "Get Help From Customer Care",
      description: "24/7 support via WhatsApp, call, or email",
      stats: ["95% satisfaction", "< 2hr response"],
      bgColor: "from-orange-500/20 to-orange-600/30",
      icon: "💬",
      sticker: "NEW",
      stickerColor: "bg-green-500"
    },
    {
      id: 2,
      image: "https://i.ibb.co/CspqvyMP/download-4.png",
      title: "TOP DEALS",
      subtitle: "Live Now",
      description: "Limited-time offers on K-Gas & Pro-Gas cylinders",
      stats: ["Up to 20% off", "Free regulator"],
      bgColor: "from-purple-500/20 to-blue-600/30",
      icon: "🔥",
      sticker: "HOT",
      stickerColor: "bg-red-500"
    },
    {
      id: 3,
      image: "https://i.ibb.co/zVkz3Ws6/download-3.png",
      title: "SELL ON AMAZONS SHOP",
      subtitle: "Students Trust Us",
      description: "Partner with us to reach more customers",
      stats: ["15K+ daily users", "lower listing fees"],
      bgColor: "from-green-500/20 to-teal-600/30",
      icon: "📈",
      sticker: "EARN",
      stickerColor: "bg-blue-500"
    },
    {
      id: 4,
      image: "https://i.ibb.co/3bjLRmp/download-2.png",
      title: "Call/WhatsApp",
      subtitle: "0715 080 432 to order",
      description: "Quick order processing via direct contact",
      stats: ["Same-day delivery", "No app needed"],
      bgColor: "from-blue-500/20 to-cyan-600/30",
      icon: "📱",
      sticker: "FAST",
      stickerColor: "bg-amber-500"
    },
  ];

  // Slider logic for main banner
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const slideInterval = useRef(null);

  useEffect(() => {
    const startSlideTimer = () => {
      slideInterval.current = setInterval(() => {
        if (!isPaused) {
          setCurrentSlide(prevSlide => (prevSlide + 1) % slides.length);
        }
      }, 5000);
    };

    startSlideTimer();

    return () => {
      if (slideInterval.current) {
        clearInterval(slideInterval.current);
      }
    };
  }, [isPaused, slides.length]);

  const goToSlide = (index) => {
    setCurrentSlide(index);
  };

  const handlePrev = () => {
    setCurrentSlide(prevSlide =>
      prevSlide === 0 ? slides.length - 1 : prevSlide - 1
    );
  };

  const handleNext = () => {
    setCurrentSlide(prevSlide =>
      (prevSlide + 1) % slides.length
    );
  };

  const handleMouseEnter = () => setIsPaused(true);
  const handleMouseLeave = () => setIsPaused(false);

  // Enhanced Mini-carousel for desktop adverts
  const [currentAdvert, setCurrentAdvert] = useState(0);
  const [isAdvertPaused, setIsAdvertPaused] = useState(false);
  const advertInterval = useRef(null);
  const [flashingState, setFlashingState] = useState(false);

  // Add flashing effect
  useEffect(() => {
    const flashingInterval = setInterval(() => {
      setFlashingState(prev => !prev);
    }, 600); // Flash every 600ms

    return () => clearInterval(flashingInterval);
  }, []);

  useEffect(() => {
    const startAdvertTimer = () => {
      advertInterval.current = setInterval(() => {
        if (!isAdvertPaused) {
          setCurrentAdvert((prev) => (prev + 1) % adverts.length);
        }
      }, 4000); // rotates adverts every 4 seconds
    };

    startAdvertTimer();

    return () => {
      if (advertInterval.current) {
        clearInterval(advertInterval.current);
      }
    };
  }, [adverts.length, isAdvertPaused]);

  const handleAdvertPrev = () => {
    setCurrentAdvert(prev => 
      prev === 0 ? adverts.length - 1 : prev - 1
    );
  };

  const handleAdvertNext = () => {
    setCurrentAdvert(prev => 
      (prev + 1) % adverts.length
    );
  };

  const handleAdvertMouseEnter = () => setIsAdvertPaused(true);
  const handleAdvertMouseLeave = () => setIsAdvertPaused(false);

  return (
    <div className="mb-10 -mt-8">
      {/* Announcements Ticker */}
      <div className="bg-gradient-to-r from-orange-900 to-orange-600 text-white py-2 overflow-hidden relative border-y border-orange-400 shadow-lg shadow-orange-500/50">
        <div className="whitespace-nowrap inline-block font-mono text-orange-300">
          {announcements.map((text, index) => (
            <span key={index} className="mx-8">💠 {text}</span>
          ))}
        </div>
        <style jsx>{`
          @keyframes tickerMoveFromMiddle {
            0% { transform: translateX(0); }
            100% { transform: translateX(-100%); }
          }
          .whitespace-nowrap {
            animation: tickerMoveFromMiddle 30s linear infinite;
            position: relative;
            left: 50%;
            transform: translateX(0);
          }
          @keyframes pulse {
            0%, 100% { opacity: 1; }
            50% { opacity: 0.6; }
          }
          .flash {
            animation: pulse 0.6s infinite;
          }
          @keyframes spin {
            from { transform: rotate(0deg); }
            to { transform: rotate(360deg); }
          }
          .spin {
            animation: spin 10s linear infinite;
          }
          @keyframes bounce {
            0%, 100% { transform: translateY(0); }
            50% { transform: translateY(-6px); }
          }
          .bounce {
            animation: bounce 1s ease-in-out infinite;
          }
        `}</style>
      </div>

      {/* Banner Slider + Desktop Advert */}
      <div className="flex flex-col md:flex-row gap-4 mt-2">
        {/* Banner Slider */}
        <div
          className="relative rounded-lg overflow-hidden shadow-2xl border border-orange-500 w-full md:flex-1"
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          <div className="relative bg-orange-900 w-full h-64 md:h-96 lg:h-[400px]">
            <div className="slider-container">
              {slides.map((slide, index) => (
                <div
                  key={slide.id}
                  className={`slide absolute top-0 left-0 w-full h-full transition-transform duration-500 ease-in-out ${
                    index === currentSlide ? 'translate-x-0' : 'translate-x-full'
                  }`}
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-orange-900/30 to-purple-900/30 mix-blend-color-dodge z-10"></div>
                  <img
                    src={slide.image}
                    alt={`Slide ${slide.id}`}
                    className="h-full w-full object-contain object-center"
                  />
                  <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-black/60 to-transparent z-10"></div>
                </div>
              ))}
            </div>
          </div>

          {/* Prev Button */}
          <button
            className="absolute left-4 top-1/2 -translate-y-1/2 bg-orange-600/50 hover:bg-orange-600/80 text-orange-300 p-2 md:p-3 rounded-full z-20 transition-colors duration-200 backdrop-blur-sm border border-orange-400"
            onClick={handlePrev}
            aria-label="Previous Slide"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 md:h-6 md:w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          
          {/* Next Button */}
          <button
            className="absolute right-4 top-1/2 -translate-y-1/2 bg-orange-600/50 hover:bg-orange-600/80 text-orange-300 p-2 md:p-3 rounded-full z-20 transition-colors duration-200 backdrop-blur-sm border border-orange-400"
            onClick={handleNext}
            aria-label="Next Slide"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 md:h-6 md:w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>

          {/* Slide Indicators */}
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-2 md:space-x-3 z-20">
            {slides.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`w-2 md:w-3 transition-all duration-300 ${
                  index === currentSlide
                    ? 'bg-orange-400 shadow-lg shadow-orange-500/50 h-8 md:h-10'
                    : 'bg-white/20 hover:bg-white/40 h-4 md:h-6'
                } rounded-sm`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>

          {/* Slide Counter */}
          <div className="absolute top-4 right-4 bg-black/30 backdrop-blur-sm text-orange-300 px-2 md:px-3 py-1 rounded-full z-20 font-mono border border-orange-400 text-sm md:text-base">
            {currentSlide + 1}/{slides.length}
          </div>
        </div>

        {/* ENHANCED Desktop Advertisement Container (Mini-Carousel) with FLASHING ELEMENTS */}
        <div 
          className="hidden md:block md:w-1/3"
          onMouseEnter={handleAdvertMouseEnter}
          onMouseLeave={handleAdvertMouseLeave}
        >
          <div className="relative w-full h-[400px] rounded-lg shadow-lg overflow-hidden border border-orange-300">
            {/* Background Gradient Effect */}
            <div className="absolute inset-0 bg-gradient-to-br from-orange-100 to-orange-50"></div>
            
            {/* Top Corner Flash */}
            <div className={`absolute -top-10 -right-10 w-20 h-20 rotate-45 ${flashingState ? 'bg-orange-500' : 'bg-orange-400'} z-30`}></div>
            
            {/* Title Bar */}
            <div className="absolute top-0 left-0 right-0 bg-gradient-to-r from-orange-600 to-orange-500 text-white p-2 flex justify-between items-center">
              <h3 className="text-sm font-bold flex items-center">
                <span className={flashingState ? 'text-yellow-300' : 'text-white'}>★</span> 
                <span className="ml-1">SHOP FEATURES</span>
              </h3>
              <div className="flex space-x-1 text-xs">
                <span className="px-2 py-1 bg-orange-700/50 rounded-full">{currentAdvert + 1}/{adverts.length}</span>
              </div>
            </div>
            
            {/* Advert Cards */}
            {adverts.map((ad, idx) => (
              <div
                key={ad.id}
                className={`absolute top-0 left-0 w-full h-full transition-all duration-700 ease-in-out flex flex-col items-center justify-center p-4 pt-12
                  ${idx === currentAdvert ? "opacity-100 z-10 translate-x-0" : "opacity-0 z-0 translate-x-full"}`}
              >
                {/* Sticker Badge (Flashing) */}
                <div className={`absolute -top-2 -left-2 z-30 ${ad.stickerColor} text-white px-3 py-1 rounded-br-lg transform rotate-345 shadow-md ${flashingState ? 'opacity-100' : 'opacity-80'}`}>
                  {ad.sticker}
                </div>
                
                {/* Card Content with gradient background */}
                <div className={`w-full h-full rounded-lg bg-gradient-to-br ${ad.bgColor} p-6 flex flex-col items-center justify-center border border-orange-200 shadow-md relative overflow-hidden`}>
                  {/* Decorative elements */}
                  <div className="absolute top-4 left-4 w-16 h-16 rounded-full bg-orange-400/20 spin"></div>
                  <div className="absolute bottom-4 right-4 w-24 h-24 rounded-full bg-orange-400/10 spin"></div>
                  
                  {/* Icon Badge with pulsing effect */}
                  <div className={`absolute -top-4 right-6 w-12 h-12 flex items-center justify-center ${flashingState ? 'bg-orange-600' : 'bg-orange-500'} text-white rounded-full shadow-lg text-xl`}>
                    {ad.icon}
                  </div>
                  
                  <div className="flex flex-col items-center space-y-4 mt-4 z-10">
                    {/* Image with circular frame */}
                    <div className={`w-24 h-24 rounded-full bg-white p-2 shadow-md overflow-hidden border-2 ${flashingState ? 'border-orange-400' : 'border-orange-300'}`}>
                      <img src={ad.image} alt={ad.title} className="w-full h-full object-cover rounded-full" />
                    </div>
                    
                    {/* Text Content */}
                    <div className="text-center mt-4">
                      <h2 className="font-extrabold text-orange-900 text-xl text-center tracking-tight">{ad.title}</h2>
                      <div className={`w-16 h-1 ${flashingState ? 'bg-orange-600' : 'bg-orange-500'} mx-auto my-2`}></div>
                      <p className="text-gray-700 text-center font-medium">{ad.subtitle}</p>
                      
                      {/* Additional description data */}
                      <p className="text-gray-600 text-sm mt-2 px-2">{ad.description}</p>
                      
                      {/* Stats Data as Pills */}
                      <div className="flex flex-wrap justify-center gap-2 mt-3">
                        {ad.stats.map((stat, i) => (
                          <span 
                            key={i} 
                            className={`text-xs px-2 py-1 rounded-full ${
                              flashingState && i === 0 ? 'bg-orange-200 text-orange-800' : 'bg-orange-100 text-orange-800'
                            }`}
                          >
                            {stat}
                          </span>
                        ))}
                      </div>
                    </div>
                    
                    {/* Action Button with flash effect */}
                    <button className={`mt-4 px-6 py-2 bg-gradient-to-r from-orange-500 to-orange-600 text-white rounded-full shadow-md hover:shadow-lg transition-all duration-300 text-sm font-medium transform hover:scale-105 ${
                      flashingState ? 'shadow-orange-400/50' : ''
                    }`}>
                      Learn More →
                    </button>
                  </div>
                </div>
              </div>
            ))}
            
            {/* Navigation Buttons */}
            <div className="absolute bottom-4 left-0 right-0 flex justify-center space-x-2 z-20">
              <button 
                onClick={handleAdvertPrev}
                className={`p-2 ${
                  flashingState ? 'bg-orange-700/70' : 'bg-orange-600/70'
                } hover:bg-orange-600 text-white rounded-l-lg shadow-md backdrop-blur-sm transition-colors duration-200 flex items-center justify-center`}
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              
              {/* Dot Indicators with flashing */}
              <div className="flex items-center space-x-1 px-2 py-1 bg-black/20 backdrop-blur-sm rounded-md">
                {adverts.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentAdvert(index)}
                    className={`w-2 h-2 rounded-full transition-all duration-300 ${
                      index === currentAdvert
                        ? flashingState ? 'bg-yellow-300 scale-125' : 'bg-white scale-125'
                        : 'bg-white/50 hover:bg-white/70'
                    }`}
                    aria-label={`Go to advert ${index + 1}`}
                  />
                ))}
              </div>
              
              <button 
                onClick={handleAdvertNext}
                className={`p-2 ${
                  flashingState ? 'bg-orange-700/70' : 'bg-orange-600/70'
                } hover:bg-orange-600 text-white rounded-r-lg shadow-md backdrop-blur-sm transition-colors duration-200 flex items-center justify-center`}
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>
            
            {/* Limited time flash banner */}
            <div className={`absolute bottom-16 left-1/2 transform -translate-x-1/2 bg-orange-800 text-white text-xs px-4 py-1 rounded-full ${flashingState ? 'bg-orange-700' : 'bg-orange-800'}`}>
              Limited Time Offers!
            </div>
          </div>
        </div>
      </div>

      {/* Promotion Section */}
      <div className="flex flex-col md:flex-row justify-center items-center mt-2 space-y-2 md:space-y-0 md:space-x-4">
        <div className="bg-orange-900/20 backdrop-blur-sm text-orange-600 px-4 md:px-6 py-2 rounded-full z-20 font-mono border border-orange-400 text-sm md:text-base shadow-lg shadow-orange-500/50">
          <p className="text-center">
            Get 10% off on your first order! Use code: <span className="font-bold">WELCOME10</span>
          </p>
        </div>
        <p className="text-sm text-gray-500">*Terms and conditions apply</p>
      </div>
    </div>
  );
};

export default Banner;