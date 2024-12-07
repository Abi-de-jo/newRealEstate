import React from "react";
import {
  FaFacebookF,
  FaTwitter,
  FaLinkedinIn,
  FaInstagram,
  FaPinterestP,
  FaYoutube,
  FaTelegramPlane,
} from "react-icons/fa";
import { useTranslation } from "react-i18next";

const GeoMapFooterDark = () => {
  const { t } = useTranslation("footer");

  return (
    <footer className="bg-zinc-900 text-white py-8 mt-24">
      <div className="container mx-auto px-4">
        {/* Vision Section */}
        <div className="text-center mb-6">
          <h3 className="text-xl font-semibold mb-2">{t("vision")}</h3>
        </div>

        {/* Social Media Icons */}
        <div className="flex justify-center space-x-4 mb-6">
          <a
            href="https://www.facebook.com/share/j6jBfExKXjgNVpVQ/"
            target="_blank"
            rel="noopener noreferrer"
            className="w-8 h-8 flex items-center justify-center rounded-full bg-gray-800 hover:bg-gray-600 transition duration-300 cursor-pointer"
          >
            <FaFacebookF className="w-4 h-4 text-white" />
          </a>
          <a
            href="https://www.twitter.com"
            target="_blank"
            rel="noopener noreferrer"
            className="w-8 h-8 flex items-center justify-center rounded-full bg-gray-800 hover:bg-gray-600 transition duration-300 cursor-pointer"
          >
            <FaTwitter className="w-4 h-4 text-white" />
          </a>
          <a
            href="https://www.linkedin.com"
            target="_blank"
            rel="noopener noreferrer"
            className="w-8 h-8 flex items-center justify-center rounded-full bg-gray-800 hover:bg-gray-600 transition duration-300 cursor-pointer"
          >
            <FaLinkedinIn className="w-4 h-4 text-white" />
          </a>
          <a
            href="https://www.instagram.com/rent_in_tbilisi?igsh=MWU5aWVxa3Fxd2dlbw=="
            target="_blank"
            rel="noopener noreferrer"
            className="w-8 h-8 flex items-center justify-center rounded-full bg-gray-800 hover:bg-gray-600 transition duration-300 cursor-pointer"
          >
            <FaInstagram className="w-4 h-4 text-white" />
          </a>
          <a
            href="https://www.pinterest.com"
            target="_blank"
            rel="noopener noreferrer"
            className="w-8 h-8 flex items-center justify-center rounded-full bg-gray-800 hover:bg-gray-600 transition duration-300 cursor-pointer"
          >
            <FaPinterestP className="w-4 h-4 text-white" />
          </a>
          <a
            href="https://www.youtube.com/@RENTINTBILISI"
            target="_blank"
            rel="noopener noreferrer"
            className="w-8 h-8 flex items-center justify-center rounded-full bg-gray-800 hover:bg-gray-600 transition duration-300 cursor-pointer"
          >
            <FaYoutube className="w-4 h-4 text-white" />
          </a>
        </div>

        {/* Main Links */}
        <div className="flex flex-wrap justify-center text-center text-gray-300 space-x-4 mb-6 text-sm">
          <a href="/" className="hover:text-gray-400">{t("information")}</a>
          <a href="/" className="hover:text-gray-400">{t("property")}</a>
          <a href="/" className="hover:text-gray-400">{t("services")}</a>
          <a href="/" className="hover:text-gray-400">{t("product")}</a>
          <a href="/" className="hover:text-gray-400">{t("aboutUs")}</a>
        </div>

        {/* Location Section */}
        <div className="text-center mb-6">
          <p className="text-gray-300 text-sm">{t("location")}</p>
        </div>

        {/* Additional Links */}
        <div className="flex flex-wrap justify-center text-center text-gray-300 space-x-4 mb-6 text-sm">
          <a href="/" className="hover:text-gray-400">Home Made</a>
          <a href="/" className="hover:text-gray-400">Tech Blog</a>
          <a href="/" className="hover:text-gray-400">Agent Blog</a>
          <a href="/" className="hover:text-gray-400">Sitemap</a>
          <a
            href="/"
            className="text-yellow-500 hover:text-yellow-400"
          >
            Do Not Sell or Share My Personal Information
          </a>
        </div>

        {/* Telegram Section */}
        <div className="text-center mb-6">
          <h4 className="text-lg font-bold text-white mb-4">{t("connectWithTelegram")}</h4>
          <div className="flex justify-center">
            <a
              href="https://t.me/GeoMap"
              target="_blank"
              rel="noopener noreferrer"
              className="w-36 h-12 bg-gray-800 rounded-lg flex items-center justify-center text-white font-semibold p-3 hover:bg-gray-700"
            >
              <FaTelegramPlane className="w-5 h-5 mr-2" /> {t("joinTelegram")}
            </a>
          </div>
        </div>

        {/* Disclaimer */}
        <div className="text-center text-gray-400 text-sm mt-4">
          <p>© 1995-2024 National Association of REALTORS® and Move, Inc. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default GeoMapFooterDark;
