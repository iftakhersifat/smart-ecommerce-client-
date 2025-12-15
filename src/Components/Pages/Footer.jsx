import React from "react";
import { FaFacebookF, FaInstagram, FaLinkedinIn } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { Link } from "react-router";

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-gray-200 mt-24">
      <div className="max-w-6xl mx-auto px-6 lg:px-0 py-12 grid grid-cols-2 md:grid-cols-4 gap-8">
        
        {/* customer service */}
        <div>
          <h6 className="text-lg font-bold mb-4 border-b-2 border-indigo-500 inline-block">Customer Service</h6>
          <ul className="flex flex-col gap-2">
            <li><Link to="/help" className="hover:text-indigo-400">Help Center</Link></li>
            <li><Link to="/returns" className="hover:text-indigo-400">Returns</Link></li>
            <li><Link to="/shipping" className="hover:text-indigo-400">Shipping Info</Link></li>
            <li><Link to="/faq" className="hover:text-indigo-400">FAQ</Link></li>
          </ul>
        </div>

        {/* company */}
        <div>
          <h6 className="text-lg font-bold mb-4 border-b-2 border-indigo-500 inline-block">Company</h6>
          <ul className="flex flex-col gap-2">
            <li><Link to="/about" className="hover:text-indigo-400">About Us</Link></li>
            <li><Link to="/contact" className="hover:text-indigo-400">Contact Us</Link></li>
            <li><Link to="/careers" className="hover:text-indigo-400">Careers</Link></li>
            <li><Link to="/press" className="hover:text-indigo-400">Press</Link></li>
            <li><Link to="/blog" className="hover:text-indigo-400">Blog</Link></li>
          </ul>
        </div>

        {/* legal */}
        <div>
          <h6 className="text-lg font-bold mb-4 border-b-2 border-indigo-500 inline-block">Legal</h6>
          <ul className="flex flex-col gap-2">
            <li><Link to="/terms" className="hover:text-indigo-400">Terms of Use</Link></li>
            <li><Link to="/privacy" className="hover:text-indigo-400">Privacy Policy</Link></li>
            <li><Link to="/cookie" className="hover:text-indigo-400">Cookie Policy</Link></li>
          </ul>
        </div>

        {/* contact */}
        <div>
          <h6 className="text-lg font-bold mb-4 border-b-2 border-indigo-500 inline-block">Connect</h6>
          <ul className="flex flex-col gap-2 mb-4">
            <li><Link to="/contact" className="hover:text-indigo-400">Contact Us</Link></li>
            <li><Link to="/support" className="hover:text-indigo-400">Customer Support</Link></li>
          </ul>
        </div>
      </div>

      {/* bottom footer */}
      <div className="bg-gray-900 border-t border-gray-700 py-6">
        <div className="max-w-6xl mx-auto px-6 lg:px-0 flex flex-col md:flex-row justify-between items-center gap-6 text-gray-100 text-sm">
          
          {/* info */}
          <div>
            <h1 className="text-white font-bold text-2xl">Smart E-Commerce</h1>
            <p className="text-gray-300 text-sm mt-1">Your smart shopping & service platform.</p>
          </div>

          {/* social icons */}
          <div className="flex gap-4">
            <a href="#" className="hover:text-blue-600 text-2xl" aria-label="Facebook"><FaFacebookF /></a>
            <a href="#" className="hover:text-blue-400 text-2xl" aria-label="Twitter/X"><FaXTwitter /></a>
            <a href="#" className="hover:text-pink-500 text-2xl" aria-label="Instagram"><FaInstagram /></a>
            <a href="#" className="hover:text-blue-700 text-2xl" aria-label="LinkedIn"><FaLinkedinIn /></a>
          </div>

          {/* copyright */}
          <p className="text-gray-400">&copy; {new Date().getFullYear()} Smart E-Commerce. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
