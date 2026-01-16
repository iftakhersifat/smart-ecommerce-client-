import React, { useState, useEffect } from 'react';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import { useNavigate } from 'react-router';

const HeroSlider = () => {
  const navigate = useNavigate();
  const slides = [
    {
      id: 1,
      image: "/assets/banner1.jpeg",
      tag: "Premium Quality",
      title: "Elevate Your Shopping Experience",
      desc: "Curated collection of world-class products delivered to your doorstep with speed and care.",
      primaryBtn: "Shop Now",
      link: "/products-list",
    },
    {
      id: 2,
      image: "/assets/banner2.jpeg",
      tag: "Expert Solutions",
      title: "Professional Services On Demand",
      desc: "Connect with verified industry experts and scale your business with precision.",
      primaryBtn: "Get Started",
      link: "/",
    },
    {
      id: 3,
      image: "/assets/banner3.jpg",
      tag: "Smart Management",
      title: "Track Every Move of Your Parcel",
      desc: "Experience the transparency of real-time GPS tracking for all your international and local orders.",
      primaryBtn: "Order List",
      link: "/order-list",
    },
  ];

  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const slideInterval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(slideInterval);
  }, [slides.length]);

  const handlePrev = () => setCurrentSlide((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
  const handleNext = () => setCurrentSlide((prev) => (prev + 1) % slides.length);

  return (
    <div className="relative w-full h-[60vh] md:h-[70vh] lg:h-[85vh] overflow-hidden bg-slate-900">
      
      <div 
        className="flex h-full transition-transform duration-1000]"
        style={{ transform: `translateX(-${currentSlide * 100}%)` }}>
        
        {slides.map((slide, index) => (
          <div key={slide.id} className="relative w-full h-full flex-shrink-0">
            
            <div 
              className={`absolute inset-0 transition-transform duration-[5000ms] ${currentSlide === index ? 'scale-110' : 'scale-100'}`}
              style={{
                backgroundImage: `url(${slide.image})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center'
              }}>
            </div>

            {/* overlay */}
            <div className="absolute inset-0 bg-linear-to-r from-black/80 via-black/40 to-transparent"></div>

            {/* container */}
            <div className="relative h-full max-w-7xl mx-auto px-6 md:px-22 lg:px-20 flex items-center">
              <div className="max-w-xl md:max-w-2xl lg:max-w-6xl text-left">
                
                <div className={`mb-4 transition-all duration-700 delay-100 ${currentSlide === index ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}>
                  <span className="bg-indigo-600 px-3 py-1 rounded text-[10px] md:text-xs font-bold text-white uppercase tracking-widest">
                    {slide.tag}
                  </span>
                </div>

                <h1 className={`text-3xl md:text-2xl lg:text-7xl font-extrabold text-white leading-tight mb-4 md:mb-6 transition-all duration-1000 delay-200 ${currentSlide === index ? 'translate-y-0 opacity-100' : 'translate-y-12 opacity-0'}`}>
                  {slide.title}
                </h1>
                <p className={`hidden md:block text-base md:text-md lg:text-lg text-slate-300 mb-8 leading-relaxed transition-all duration-1000 delay-300 ${currentSlide === index ? 'translate-y-0 opacity-100' : 'translate-y-12 opacity-0'}`}>
                  {slide.desc}
                </p>

                {/* buttons */}
                <div className={`flex items-center gap-4 transition-all duration-1000 delay-400 ${currentSlide === index ? 'translate-y-0 opacity-100' : 'translate-y-12 opacity-0'}`}>
                  <button onClick={() => navigate(slide.link)} className="px-6 lg:px-8 md:px-3 py-3 md:py-2 lg:py-4 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-lg shadow-lg transition-transform active:scale-95 text-sm md:text-base">
                    {slide.primaryBtn}
                  </button>
                  <button onClick={() => navigate('/about')} className="px-6 lg:px-8 md:px-3 py-3 md:py-2 lg:py-4 bg-white/10 hover:bg-white/20 backdrop-blur-md text-white font-bold rounded-lg border border-white/20 transition-all text-sm md:text-base">
                    Learn More
                  </button>
                </div>

              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="absolute hidden md:flex justify-between items-center w-full px-6 top-1/2 -translate-y-1/2 z-20 pointer-events-none">
        <button 
          onClick={handlePrev} 
          className="lg:w-12 lg:h-12 md:w-10 md:h-10 flex items-center justify-center rounded-full bg-black/30 hover:bg-indigo-600 text-white backdrop-blur-md border border-white/10 transition-all pointer-events-auto">
          <FaChevronLeft size={18} />
        </button>
        <button 
          onClick={handleNext} 
          className="lg:w-12 lg:h-12 md:w-10 md:h-10 flex items-center justify-center rounded-full bg-black/30 hover:bg-indigo-600 text-white backdrop-blur-md border border-white/10 transition-all pointer-events-auto">
          <FaChevronRight size={18} />
        </button>
      </div>

      <div className="absolute bottom-6 md:bottom-2 lg:bottom-10 left-1/2 -translate-x-1/2 flex items-center gap-2 z-20">
        {slides.map((_, index) => (
          <button 
            key={index} 
            onClick={() => setCurrentSlide(index)}
            className={`h-1.5 md:h-2 rounded-full transition-all duration-500 ${currentSlide === index ? 'w-8 md:w-12 bg-indigo-500' : 'w-2 md:w-3 bg-white/40'}`}>
          </button>
        ))}
      </div>

    </div>
  );
};

export default HeroSlider;