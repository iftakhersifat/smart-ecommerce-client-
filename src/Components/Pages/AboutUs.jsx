import React from "react";
import { FaBullseye, FaEye, FaBoxOpen, FaLinkedinIn, FaQuoteLeft, FaArrowRight, FaHandshake, FaCertificate, FaGithub, FaGlobe } from "react-icons/fa";
import { FaShield, FaTruckFast, FaCartShopping, FaArrowTrendUp, FaHeadset } from "react-icons/fa6";
import { Link } from "react-router";

const AboutUs = () => {
  const teamMembers = [
    { name: "Iftakher Hossen Sifat", role: "Founder & CEO", img: "https://img.daisyui.com/images/profile/demo/spiderperson@192.webp" },
    { name: "Sarah Jenkins", role: "Head of Supply Chain", img: "https://img.daisyui.com/images/profile/demo/spiderperson@192.webp" },
    { name: "Marcus Chen", role: "Chief Technology Officer", img: "https://img.daisyui.com/images/profile/demo/spiderperson@192.webp" },
    { name: "Emma Rodriguez", role: "Customer Experience Lead", img: "https://img.daisyui.com/images/profile/demo/spiderperson@192.webp" }
  ];

  return (
    <div className="min-h-screen bg-white dark:bg-[#020617] text-slate-900 dark:text-white transition-colors duration-500 pb-24">
      
      {/* hero sectio */}
      <section className="relative pt-32 pb-56 overflow-hidden bg-slate-50 dark:bg-slate-900/50 border-b border-slate-100 dark:border-white/5">
        <div className="max-w-6xl mx-auto px-6 md:px-6 lg:px-0 relative z-10">
          <div className="flex flex-col gap-6">
            <div className="flex items-center gap-2 px-3 py-1 bg-indigo-100 dark:bg-indigo-900/30 text-indigo-600 rounded-full w-fit">
               <FaCartShopping size={12} />
               <span className="text-[10px] font-black uppercase tracking-widest">Premium Shopping Experience</span>
            </div>
            <h1 className="text-6xl md:text-8xl font-black tracking-tighter leading-[0.85] mb-6">
              Your Gateway to <br /> 
              <span className="text-indigo-600">Authentic Retail.</span>
            </h1>
            <p className="max-w-2xl text-xl text-slate-500 dark:text-slate-400 font-medium leading-relaxed italic">
              "We’ve simplified global commerce to bring the world’s finest products directly to your doorstep with speed and integrity."
            </p>
          </div>
        </div>
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/grid-me.png')]"></div>
      </section>

      <div className="max-w-6xl mx-auto px-6 md:px-6 lg:px-0  -mt-32 relative z-20">
        
        {/* mission & vision */}
        <div className="grid md:grid-cols-2 gap-8 mb-32">
          {/* Mission Card */}
          <div className="group relative p-12 bg-white dark:bg-slate-900 rounded-[3rem] shadow-2xl shadow-slate-200/50 dark:shadow-none border border-slate-100 dark:border-white/5 transition-all hover:-translate-y-2 overflow-hidden">
            <div className="absolute -right-10 -top-10 text-indigo-50 dark:text-white/5 group-hover:scale-110 transition-transform duration-700">
                <FaBullseye size={180} />
            </div>
            <div className="relative z-10">
                <div className="w-14 h-14 bg-indigo-600 rounded-2xl flex items-center justify-center text-white mb-8 shadow-lg shadow-indigo-200 dark:shadow-none">
                    <FaBullseye size={24} />
                </div>
                <h3 className="text-sm font-black text-indigo-600 uppercase tracking-[0.3em] mb-4">Our Mission</h3>
                <h2 className="text-3xl font-bold tracking-tight mb-6">Reliability in Every Click.</h2>
                <p className="text-slate-500 dark:text-slate-400 text-lg leading-relaxed font-medium">
                    Our mission is to eliminate the uncertainty of online shopping. By leveraging data-driven logistics and direct manufacturer partnerships, we ensure that what you see is exactly what you get—delivered with unmatched efficiency.
                </p>
            </div>
          </div>

          {/* Vision Card */}
          <div className="group relative p-12 bg-white dark:bg-slate-900 rounded-[3rem] shadow-2xl shadow-slate-200/50 dark:shadow-none border border-slate-100 dark:border-white/5 transition-all hover:-translate-y-2 overflow-hidden">
            <div className="absolute -right-10 -top-10 text-purple-50 dark:text-white/5 group-hover:scale-110 transition-transform duration-700">
                <FaEye size={180} />
            </div>
            <div className="relative z-10">
                <div className="w-14 h-14 bg-purple-600 rounded-2xl flex items-center justify-center text-white mb-8 shadow-lg shadow-purple-200 dark:shadow-none">
                    <FaEye size={24} />
                </div>
                <h3 className="text-sm font-black text-purple-600 uppercase tracking-[0.3em] mb-4">Our Vision</h3>
                <h2 className="text-3xl font-bold tracking-tight mb-6">A World Without Retail Barriers.</h2>
                <p className="text-slate-500 dark:text-slate-400 text-lg leading-relaxed font-medium">
                    We envision a future where borders don't define your shopping cart. We are building the most trusted smart-commerce network that connects artisanal craftsmanship with global consumers through sustainable and ethical trade.
                </p>
            </div>
          </div>
        </div>

        {/* pillars */}
        <section className="mb-32">
            <div className="text-center mb-16">
                <h2 className="text-xs font-black text-indigo-600 uppercase tracking-[0.4em] mb-4">Why Shop With Us</h2>
                <h3 className="text-4xl font-bold tracking-tight">Built for Today's Conscious Consumer.</h3>
            </div>
            <div className="grid md:grid-cols-3 gap-px bg-slate-200 dark:bg-white/5 border border-slate-200 dark:border-white/5 overflow-hidden rounded-[2.5rem]">
            {[
                { title: "Smart Supply Chain", icon: <FaTruckFast />, desc: "We utilize automated sorting and AI-routed delivery to ensure your packages arrive in record time." },
                { title: "100% Secure Checkout", icon: <FaShield />, desc: "Industry-standard SSL encryption and multi-factor authentication protect every transaction you make." },
                { title: "Ethical Sourcing", icon: <FaCertificate />, desc: "We vet 100% of our vendors to ensure fair labor practices and genuine product authenticity." }
            ].map((pillar, i) => (
                <div key={i} className="bg-white dark:bg-[#020617] p-16 space-y-8 hover:bg-slate-50 dark:hover:bg-white/[0.02] transition-colors group">
                    <div className="text-indigo-600 text-3xl group-hover:scale-110 transition-transform duration-500">{pillar.icon}</div>
                    <h3 className="text-2xl font-black tracking-tight">{pillar.title}</h3>
                    <p className="text-slate-500 dark:text-slate-400 text-lg leading-relaxed font-medium">{pillar.desc}</p>
                </div>
            ))}
            </div>
        </section>

        {/* team role */}
        <section className="pb-32">
          <div className="flex flex-col md:flex-row justify-between items-end mb-24 border-b border-slate-100 dark:border-white/10 pb-12">
              <h2 className="text-6xl font-black tracking-tighter">The Experts.</h2>
              <p className="text-slate-400 font-medium max-w-[300px] text-right text-sm">Our diverse team of retail experts, engineers, and designers working for you.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-x-12 gap-y-20">
            {teamMembers.map((member, idx) => (
              <div key={idx} className="group cursor-default">
                <div className="relative overflow-hidden mb-8 aspect-[3/4] bg-slate-100 dark:bg-white/5 rounded-2xl border border-slate-100 dark:border-white/10">
                  <img 
                    src={member.img} 
                    alt={member.name}
                    className="w-full h-full object-cover grayscale transition-all duration-1000 group-hover:grayscale-0 group-hover:scale-105"
                  />
                  <div className="absolute bottom-4 right-4 flex flex-col gap-4 translate-x-16 opacity-0 group-hover:translate-x-0 group-hover:opacity-100 transition-all duration-500 bg-white dark:bg-black p-3 rounded-lg shadow-xl">
                      <FaLinkedinIn className="text-xs hover:text-indigo-600 cursor-pointer transition-colors" />
                      <FaGithub className="text-xs hover:text-indigo-600 cursor-pointer transition-colors" />
                      <FaGlobe className="text-xs hover:text-indigo-600 cursor-pointer transition-colors" />
                  </div>
                </div>
                <h4 className="text-sm font-black uppercase tracking-[0.2em] mb-1">{member.name}</h4>
                <p className="text-slate-400 text-[10px] font-bold uppercase tracking-widest">{member.role}</p>
              </div>
            ))}
          </div>
        </section>

        {/* buttons */}
        <section className="text-center bg-indigo-600 rounded-[4rem] py-24 px-6 text-white overflow-hidden relative group">
            <div className="relative z-10 space-y-8">
                <h2 className="text-4xl md:text-5xl font-black tracking-tighter">Your Satisfaction, Our Priority.</h2>
                <p className="max-w-xl mx-auto text-indigo-100 text-lg">Have a question? Our 24/7 dedicated support team is here to help you with every step of your shopping journey.</p>
                <div className="flex flex-wrap justify-center gap-6">
                    <Link to='/products-list'><button className="px-12 py-5 bg-white text-indigo-600 font-black rounded-2xl hover:scale-105 transition-transform uppercase text-[10px] tracking-[0.3em] flex items-center gap-2">
                        <FaCartShopping /> Back to Shop
                    </button></Link>
                    <button className="px-12 py-5 bg-transparent border border-white/30 text-white font-black rounded-2xl hover:bg-white/10 transition-all uppercase text-[10px] tracking-[0.3em] flex items-center gap-3">
                        <FaHeadset /> Get Support
                    </button>
                </div>
            </div>
            <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-white/5 rounded-full blur-[100px] -mr-40 -mt-40"></div>
        </section>

      </div>
    </div>
  );
};

export default AboutUs;