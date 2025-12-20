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

  useEffect(() => {
    const targetSlide = document.getElementById(`slide-${currentSlide}`);
    if (targetSlide) {
      targetSlide.scrollIntoView({
        behavior: 'smooth',
        block: 'nearest',
        inline: 'start'
      });
    }
  }, [currentSlide]);

  const handlePrev = () => {
    setCurrentSlide((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  return (
    <div className="carousel w-full h-[70vh]">
      {slides.map((slide, index) => (
        <div key={slide.id} id={`slide-${index}`} className="carousel-item relative w-full">
          <div className="hero w-full"
            style={{
              backgroundImage: `url(${slide.image})`,
            }}>
            <div className="hero-overlay bg-opacity-60"></div>
            <div className="hero-content text-center text-neutral-content">
              <div className="max-w-md">
                <h1 className="mb-5 text-4xl md:text-4xl lg:text-5xl font-bold">{slide.title}</h1>
                <p className="mb-5">{slide.desc}</p>
                <button className="btn btn-primary mr-2">{slide.primaryBtn}</button>
                <button className="btn btn-outline">{slide.secondaryBtn}</button>
              </div>
            </div>
          </div>

          {/* Navigation Buttons */}
          <div className="absolute hidden md:flex flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
            <button onClick={handlePrev} className="btn btn-circle">❮</button>
            <button onClick={handleNext} className="btn btn-circle">❯</button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default HeroSlider;