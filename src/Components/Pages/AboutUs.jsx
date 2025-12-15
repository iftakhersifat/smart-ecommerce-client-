import React from "react";
import { FaBullseye, FaEye, FaUsers, FaBoxOpen, FaSmile } from "react-icons/fa";
import { FaFacebookF, FaInstagram, FaLinkedinIn } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6"

const AboutUs = () => {
  return (
    <div className="max-w-6xl mx-auto px-6 md:px-6 lg:px-0 mt-12">

      {/* title & description*/}
      <div className="text-center mb-16">
        <h1 className="text-5xl font-bold text-indigo-600 mb-4">About Us</h1>
        <p className="text-gray-600 text-lg max-w-2xl mx-auto">Discover Smart E-Commerce, our mission, vision, and meet the dedicated team behind our platform that brings smart shopping to life.</p>
      </div>

      {/* Organization/project overview */}
      <div className="mb-16">
        <h2 className="text-3xl font-semibold text-gray-800 mb-6 border-b-2 border-indigo-400 inline-block">Our Organization</h2>
        <p className="text-gray-600 leading-relaxed text-lg">Smart E-Commerce is a modern full-stack e-commerce and service management platform that allows users to browse products, place orders, track shipments, submit reviews, and enjoy a seamless shopping experience. Our platform is designed to be responsive, secure, and user-friendly for both customers and administrators.</p>
      </div>

      {/* mission & vision */}
      <section className="mb-16 grid md:grid-cols-2 gap-8">
        <div className="p-6 bg-indigo-50 rounded-lg shadow hover:shadow-lg transition-all duration-300 flex flex-col items-start gap-3"><FaBullseye className="text-indigo-600 text-3xl" />
          <h3 className="text-2xl font-semibold text-indigo-600">Our Mission</h3>
          <p className="text-gray-600 text-lg">To provide a smart, seamless, and personalized online shopping experience while maintaining the highest standards of security, efficiency, and innovation.</p>
        </div>

        <div className="p-6 bg-indigo-50 rounded-lg shadow hover:shadow-lg transition-all duration-300 flex flex-col items-start gap-3"><FaEye className="text-indigo-600 text-3xl" />
          <h3 className="text-2xl font-semibold text-indigo-600">Our Vision</h3>
          <p className="text-gray-600 text-lg">To become a leading e-commerce platform recognized for delivering quality products and services, outstanding user experience, and cutting-edge technology solutions.</p>
        </div>
      </section>

      {/* team information */}     
      <div className="mb-16">
      <h2 className="text-3xl font-semibold text-gray-800 mb-10 border-b-2 border-indigo-400 inline-block"> Meet Our Team</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">

      {/* team member 1 */}
      <div className="text-center p-6 bg-white rounded-2xl shadow-md hover:shadow-xl transform     hover:-translate-y-2 transition-all duration-300">
        <div className="w-32 h-32 mx-auto mb-4 overflow-hidden rounded-full border-4 border-indigo-500">
          <img src="https://img.daisyui.com/images/profile/demo/spiderperson@192.webp" alt="Team Member 1"
            className="w-full h-full object-cover"/>
        </div>
        <h4 className="text-xl font-semibold text-gray-800 mb-1 group-hover:text-indigo-600">Iftakher Hossen Sifat</h4>
        <p className="text-gray-500 text-sm mb-4">Full-Stack Developer & Project Lead</p>

        <div className="flex justify-center gap-4 text-gray-400">
          <a href="#" className="hover:text-blue-600 transition-colors text-xl"     aria-label="Facebook"><FaFacebookF /></a>
          <a href="#" className="hover:text-blue-400 transition-colors text-xl" aria-label="Twitter/    X"><FaXTwitter /></a>
          <a href="#" className="hover:text-pink-500 transition-colors text-xl"     aria-label="Instagram"><FaInstagram /></a>
          <a href="#" className="hover:text-blue-700 transition-colors text-xl"     aria-label="LinkedIn"><FaLinkedinIn /></a>
        </div>

      </div>

      {/* team member 2 */}
      <div className="text-center p-6 bg-white rounded-2xl shadow-md hover:shadow-xl transform     hover:-translate-y-2 transition-all duration-300">
        <div className="w-32 h-32 mx-auto mb-4 overflow-hidden rounded-full border-4 border-indigo-500">
          <img src="https://img.daisyui.com/images/profile/demo/spiderperson@192.webp" alt="Team Member 2"
            className="w-full h-full object-cover"/>
        </div>
        <h4 className="text-xl font-semibold text-gray-800 mb-1 group-hover:text-indigo-600">Jane Doe</h4>
        <p className="text-gray-500 text-sm mb-4">UI/UX Designer</p>

        <div className="flex justify-center gap-4 text-gray-400">
          <a href="#" className="hover:text-blue-600 transition-colors text-xl"     aria-label="Facebook"><FaFacebookF /></a>
          <a href="#" className="hover:text-blue-400 transition-colors text-xl" aria-label="Twitter/    X"><FaXTwitter /></a>
          <a href="#" className="hover:text-pink-500 transition-colors text-xl"     aria-label="Instagram"><FaInstagram /></a>
          <a href="#" className="hover:text-blue-700 transition-colors text-xl"     aria-label="LinkedIn"><FaLinkedinIn /></a>
        </div>

      </div>

      {/* team member 3 */}
      <div className="text-center p-6 bg-white rounded-2xl shadow-md hover:shadow-xl transform     hover:-translate-y-2 transition-all duration-300">
        <div className="w-32 h-32 mx-auto mb-4 overflow-hidden rounded-full border-4 border-indigo-500">
          <img src="https://img.daisyui.com/images/profile/demo/spiderperson@192.webp" alt="Team Member 3"
            className="w-full h-full object-cover"/>
        </div>
        <h4 className="text-xl font-semibold text-gray-800 mb-1 group-hover:text-indigo-600">John Smith</h4>
        <p className="text-gray-500 text-sm mb-4">Backend Developer</p>

        <div className="flex justify-center gap-4 text-gray-400">
          <a href="#" className="hover:text-blue-600 transition-colors text-xl"     aria-label="Facebook"><FaFacebookF /></a>
          <a href="#" className="hover:text-blue-400 transition-colors text-xl" aria-label="Twitter/    X"><FaXTwitter /></a>
          <a href="#" className="hover:text-pink-500 transition-colors text-xl"     aria-label="Instagram"><FaInstagram /></a>
          <a href="#" className="hover:text-blue-700 transition-colors text-xl"     aria-label="LinkedIn"><FaLinkedinIn /></a>
        </div>

      </div>

      {/* team member 4 */}
      <div className="text-center p-6 bg-white rounded-2xl shadow-md hover:shadow-xl transform     hover:-translate-y-2 transition-all duration-300">
        <div className="w-32 h-32 mx-auto mb-4 overflow-hidden rounded-full border-4 border-indigo-500">
          <img src="https://img.daisyui.com/images/profile/demo/spiderperson@192.webp" alt="Team Member 4"
            className="w-full h-full object-cover"/>
        </div>
        <h4 className="text-xl font-semibold text-gray-800 mb-1 group-hover:text-indigo-600">Alice Brown</h4>
        <p className="text-gray-500 text-sm mb-4">Digital Marketing & SEO</p>

        <div className="flex justify-center gap-4 text-gray-400">
          <a href="#" className="hover:text-blue-600 transition-colors text-xl"     aria-label="Facebook"><FaFacebookF /></a>
          <a href="#" className="hover:text-blue-400 transition-colors text-xl" aria-label="Twitter/    X"><FaXTwitter /></a>
          <a href="#" className="hover:text-pink-500 transition-colors text-xl"     aria-label="Instagram"><FaInstagram /></a>
          <a href="#" className="hover:text-blue-700 transition-colors text-xl"     aria-label="LinkedIn"><FaLinkedinIn /></a>
        </div>

      </div>

  </div>
      </div>

    </div>
  );
};

export default AboutUs;
