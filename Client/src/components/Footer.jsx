import React from "react";
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn } from "react-icons/fa";
import Logo from "./Logo";
import { Link } from "react-router-dom";


const Footer = () => {
  const scrollToSection = () => {
  const element = document.getElementById("aboutPage");
  const offset = 100; 

  const y =
    element.getBoundingClientRect().top +
    window.pageYOffset -
    offset;

  window.scrollTo({
    top: y,
    behavior: "smooth",
  });
};

  return (
    <div className="bg-[#fffaee]  border-t border-orange-200 ">

    <footer className="max-w-7xl mx-auto font-pop   py-10 ">
      <div className="   px-10 grid md:grid-cols-4 gap-15 text-gray-700">
        
        {/* Brand */}
        <div className="col-span-2 flex flex-col justify-center items-center">
          <Logo/>
          <div className="text-sm pt-3 leading-6 text-center text-gray-600">
            Bridging surplus food to those who need it most<p> — reducing waste, feeding hope.
          </p></div>
        </div>

        {/* Quick Links */}
        <div className="">
          <h3 className="text-lg font-semibold text-orange-600 mb-3">Quick Links</h3>
          <ul className="space-y-2 pl-1 text-sm">
            <li><Link to="/" className="hover:text-orange-500 transition">Home</Link></li>
            <li><button onClick={scrollToSection} className="hover:text-orange-500 transition">About</button></li>
            <li><Link to="/donor/profile" className="hover:text-orange-500 transition">Donor</Link></li>
            <li><Link to="/ngo/profile" className="hover:text-orange-500 transition">Ngo</Link></li>

          </ul>
        </div>

        {/* Socials */}
        <div className="flex flex-col">
          <h3 className="text-lg font-semibold text-orange-600 mb-3">Connect With Us</h3>
          <div className="flex space-x-4 text-orange-600">
            <a href="#" className="hover:text-orange-500 transition"><FaFacebookF /></a>
            <a href="#" className="hover:text-orange-500 transition"><FaTwitter /></a>
            <a href="#" className="hover:text-orange-500 transition"><FaInstagram /></a>
            <a href="#" className="hover:text-orange-500 transition"><FaLinkedinIn /></a>
          </div>
        </div>

      </div>

      {/* Bottom Text */}
      <div className="text-center text-sm text-gray-500 mt-8 border-t border-orange-200 pt-4">
        © {new Date().getFullYear()} Replate. All rights reserved.
      </div>
    </footer>
    </div>
  );
};

export default Footer;
