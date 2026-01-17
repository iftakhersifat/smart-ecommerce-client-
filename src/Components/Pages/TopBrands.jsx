import React from 'react';
import { Link } from 'react-router';

const TopBrands = () => {
  const brands = [
    { id: 1, logo: "/assets/visa.png" },
    { id: 2, logo: "/assets/mastercard.png" },
    { id: 3, logo: "/assets/roket.png" },
    { id: 4, logo: "/assets/nogod.png" },
    { id: 5, logo: "/assets/bkash.png" },
    { id: 6, logo: "/assets/american.png" },
    { id: 7, logo: "/assets/das.png" },
    { id: 8, logo: "/assets/easy.png" },
  ];

  return (
    <section className="py-24 transition-colors duration-500">
      <div className="max-w-6xl mx-auto px-6 lg:px-0">
        
        <div className="text-center mb-16">
          <span className="text-primary font-black text-[10px] uppercase tracking-[0.5em] mb-4 block opacity-70">Strategic Partners</span>
          <h2 className="text-4xl md:text-5xl font-black tracking-tighter text-slate-900 dark:text-white uppercase italic">
            Top <span className="text-primary">Brands</span> & Partners
          </h2>
        </div>

        <div className="relative border-y border-slate-100 dark:border-slate-800/60 bg-slate-50/30 dark:bg-slate-900/20 py-14">
          <marquee direction="left" scrollamount="10" onMouseOver={(e) => e.target.stop()} onMouseOut={(e) => e.target.start()}>
            <div className="flex items-center gap-24 px-10">
              {[...brands, ...brands].map((brand, index) => (
                <div key={index} className="flex-shrink-0">
                  <img src={brand.logo} alt="partner" className="h-10 md:h-12 w-auto object-contain grayscale opacity-40 hover:grayscale-0 hover:opacity-100 hover:scale-110 transition-all duration-500 cursor-pointer"/>
                </div>
              ))}
            </div>
          </marquee>

          {/* Effect Part */}
          <div className="absolute inset-y-0 left-0 w-32 bg-linear-to-r from-white dark:from-slate-950 to-transparent pointer-events-none"></div>
          <div className="absolute inset-y-0 right-0 w-32 bg-linear-to-l from-white dark:from-slate-950 to-transparent pointer-events-none"></div>
        </div>

        {/* Join Section */}
        <div className="mt-16 flex flex-col md:flex-row items-center justify-between gap-8 p-10 md:p-14 bg-primary dark:bg-primary rounded-[3rem] shadow-2xl shadow-slate-200 dark:shadow-none relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -mr-32 -mt-32 blur-3xl group-hover:bg-white/10 transition-all duration-700"></div>
          
          <div className="relative z-10 text-center md:text-left">
            <h4 className="text-3xl font-black text-white italic tracking-tight">Grow with SmartStore</h4>
            <p className="text-slate-400 dark:text-primary-content/80 mt-2 font-medium">Join our global network and scale your business today.</p>
          </div>
          
          <button className="relative z-10 px-12 py-5 bg-white text-slate-900 font-black rounded-2xl transition-all duration-300 active:scale-95 uppercase tracking-widest text-sm">Join as Partner</button>
        </div>

      </div>
    </section>
  );
};

export default TopBrands;