import React from "react";
import {
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaLinkedinIn,
  FaYoutube,
} from "react-icons/fa";

function Footer() {
  return (
    <footer className="bg-gradient-to-r from-[#1A6EB5] to-[#073CA4] text-white py-6 px-4 sm:px-6">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
        {/* Copyright */}
        <p className="text-xs sm:text-sm md:text-base">
          &copy; 2025 BMKG Provinsi Bengkulu. All rights reserved.
        </p>

        {/* Social Icons */}
        <div className="flex space-x-4 sm:space-x-6 text-lg sm:text-xl justify-center sm:justify-start">
          <a
            href="#"
            aria-label="Facebook"
            className="hover:text-cyan-300 transition duration-200"
          >
            <FaFacebookF />
          </a>
          <a
            href="#"
            aria-label="Twitter"
            className="hover:text-cyan-300 transition duration-200"
          >
            <FaTwitter />
          </a>
          <a
            href="https://www.instagram.com/info_bmkg_bengkulu/"
            aria-label="Instagram"
            className="hover:text-cyan-300 transition duration-200"
          >
            <FaInstagram />
          </a>
          <a
            href="https://www.youtube.com/@infobmkgbengkulu3513"
            aria-label="Youtube"
            className="hover:text-cyan-300 transition duration-200"
          >
            <FaYoutube />
          </a>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
