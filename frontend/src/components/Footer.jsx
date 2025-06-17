import React from "react";
import { MessageCircle, Heart, Github, Mail, Linkedin } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-gray-50 border-t border-gray-200 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 ">
        {/* Main Footer Content */}
        {/* <div className="py-12 grid grid-cols-1 md:grid-cols-3 gap-12"> */}
        <div className="py-12 grid grid-cols-1 md:grid-cols-3 gap-12">
          {/* Brand Section */}
          <div className="md:col-span-2">
            <div className="flex items-center mb-6 ">
              <MessageCircle className="h-8 w-8 text-green-600 mr-3" />
              <span className="text-2xl font-bold text-gray-900">ChatApp</span>
            </div>
            <p className="text-gray-600 text-base leading-relaxed mb-6">
              Connect with friends and family through secure, real-time
              messaging. Stay connected, stay close.
            </p>
          </div>

          {/* Quick Links */}
          {/* <div className="md:col-span-1">
            <h3 className="text-lg font-semibold text-gray-900 mb-6">
            Quick Links
            </h3>
            <ul className="space-y-3">
            <li>
            <a href="#" className="text-gray-600 hover:text-green-600 transition-colors">
            About Us
            </a>
            </li>
            <li>
            <a href="#" className="text-gray-600 hover:text-green-600 transition-colors">
            Privacy Policy
            </a>
            </li>
            <li>
            <a href="#" className="text-gray-600 hover:text-green-600 transition-colors">
            Terms of Service
            </a>
            </li>
            <li>
            <a href="#" className="text-gray-600 hover:text-green-600 transition-colors">
            Support
            </a>
            </li>
            </ul>
            </div> */}

          {/* Contact & Connect */}
          {/* <div className="md:col-span-1 flex flex-col items-center"> */}
          <div className="md:col-span-1 ">
            <h3 className="text-lg font-semibold text-gray-900 mb-6">
              Get in Touch
            </h3>
            <div className="mb-6">
              <a
                href="mailto:your.email@example.com"
                className="flex items-center text-gray-600 hover:text-green-600 transition-colors mb-3"
              >
                <Mail className="h-5 w-5 mr-3" />
                <span>prathamece04@gmail.com</span>
              </a>
            </div>

            <div>
              <p className="text-gray-600 text-sm mb-4">Follow me:</p>
              <div className="flex space-x-4">
                <a
                  href="https://linkedin.com/in/pratham-chaurasiya-a3a96a251/"
                  className="text-gray-400 hover:text-blue-600 transition-colors p-2 rounded-full hover:bg-gray-100"
                  aria-label="LinkedIn"
                >
                  <Linkedin className="h-5 w-5" />
                </a>
                <a
                  href="https://github.com/Pratham286"
                  className="text-gray-400 hover:text-gray-900 transition-colors p-2 rounded-full hover:bg-gray-100"
                  aria-label="GitHub"
                >
                  <Github className="h-5 w-5" />
                </a>
              </div>
            </div>
          </div>
        </div>
        <div className="border-t border-gray-200 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center text-gray-600 text-sm mb-4 md:mb-0">
              <span>© 2025 ChatApp. Made with</span>
              <Heart className="h-4 w-4 text-red-500 mx-1" />
              <span>for better connections.</span>
            </div>
            <div className="text-gray-500 text-sm">
              <span>Designed & Developed by Pratham Chaurasiya</span>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Footer */}
    </footer>
  );
};

export default Footer;
