import React, { useState, useEffect } from 'react';

const HeroSlider = () => {
  const slides = [
    {
      id: 1,
      image: "/public/assets/banner1.jpeg",
      title: "Smart Shopping Experience",
      desc: "Discover premium products with fast delivery and secure payment.",
      primaryBtn: "Shop Now",
      secondaryBtn: "View Details"
    },
    {
      id: 2,
      image: "/public/assets/banner2.jpeg",
      title: "Book Professional Services",
      desc: "Trusted experts for your business and personal needs.",
      primaryBtn: "Get Services",
      secondaryBtn: "Learn More"
    },
    {
      id: 3,
      image: "/public/assets/banner3.jpg",
      title: "Manage Orders Easily",
      desc: "Track, update, and manage orders from one dashboard.",
      primaryBtn: "Dashboard",
      secondaryBtn: "Contact Us"
    },
  ];

  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const slideInterval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 4000);

    return () => clearInterval(slideInterval);
  }, [slides.length]);

  const handlePrev = () => {
    setCurrentSlide((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  return (
    <div className="relative w-full h-[70vh] overflow-hidden">
      
      <div 
        className="flex h-full w-full transition-transform duration-700 ease-in-out"
        style={{ transform: `translateX(-${currentSlide * 100}%)` }}>
        {slides.map((slide) => (
          <div key={slide.id} className="relative w-full h-full flex-shrink-0">
            <div
              className="hero w-full h-full"
              style={{
                backgroundImage: `url(${slide.image})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center'
              }}>
              <div className="hero-overlay bg-opacity-60"></div>
              <div className="hero-content text-center text-neutral-content">
                <div className="max-w-md">
                  <h1 className="mb-5 text-4xl md:text-4xl lg:text-5xl font-bold">{slide.title}</h1>
                  <p className="mb-5">{slide.desc}</p>
                  <button className="btn btn-primary mr-2">{slide.primaryBtn}</button>
                  <button className="btn btn-outline text-white">{slide.secondaryBtn}</button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="absolute hidden md:flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2 z-10">
        <button onClick={handlePrev} className="btn btn-circle glass hover:bg-white/20 text-white">❮</button>
        <button onClick={handleNext} className="btn btn-circle glass hover:bg-white/20 text-white">❯</button>
      </div>


      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2 z-10">
        {slides.map((_, index) => (
            <button key={index} onClick={() => setCurrentSlide(index)}
                className={`w-3 h-3 rounded-full transition-all ${currentSlide === index ? 'bg-primary w-6' : 'bg-white/50'}`}></button>
        ))}
      </div>
    </div>
  );
};

export default HeroSlider;