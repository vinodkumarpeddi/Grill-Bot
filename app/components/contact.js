import React from "react";
import { motion } from "framer-motion";
import { FaGithub, FaLinkedin, FaTwitter, FaInstagram } from "react-icons/fa";

const Contact = () => {
  const socialLinks = [
    { href: "https://github.com/vinodkumarpeddi", icon: <FaGithub />, alt: "GitHub" },
    { href: "https://www.linkedin.com/in/vinod-kumar-peddi-4a34b7262/", icon: <FaLinkedin />, alt: "LinkedIn" },
    { href: "https://x.com/vinod_kumar_200", icon: <FaTwitter />, alt: "Twitter X" },
    { href: "https://www.instagram.com/vinod_kumar_02_/", icon: <FaInstagram />, alt: "Instagram" }
  ];

  return (
    <motion.section
      id="contact"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      className="relative bg-gradient-to-br from-blue-50 via-purple-100 to-pink-50 p-12 text-black rounded-2xl shadow-2xl overflow-hidden"
    >
      <div className="container mx-auto relative z-10">
        <div className="lg:grid lg:grid-cols-2 lg:items-center lg:gap-16">

          {/* Left Side */}
          <div className="mb-10 lg:mb-2">
            <h2 className="text-5xl font-extrabold mb-5 drop-shadow-lg bg-gradient-to-r from-indigo-600 to-pink-500 text-transparent bg-clip-text">
              Let&apos;s Work Together!
            </h2>
            <p className="text-gray-700 mb-8 max-w-md leading-relaxed">
              Reach out for exciting collaborations! Always open to new opportunities.
            </p>

            {/* Social Links */}
            <div className="flex items-center space-x-4">
              {socialLinks.map(({ href, icon, alt }, key) => (
                <motion.a
                  key={key}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  className="group flex items-center justify-center w-14 h-14 text-2xl bg-gray-200 hover:bg-blue-500 transition-all rounded-full shadow-lg hover:shadow-blue-500/50 transform hover:scale-105 text-gray-800 hover:text-white relative"
                  aria-label={alt}
                >
                  {icon}
                  {/* Tooltip */}
                  <span className="absolute -bottom-10 hidden group-hover:flex px-3 py-1 text-sm text-white bg-black bg-opacity-80 rounded-md shadow-lg transition-all">
                    {alt}
                  </span>
                </motion.a>
              ))}
            </div>
          </div>

          {/* Contact Form */}
          <motion.form
            action="https://getform.io/f/bwnqwgxa"
            method="POST"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="max-w-lg w-full bg-white p-8 rounded-xl shadow-lg border border-gray-300"
          >
            <div className="md:grid md:grid-cols-2 md:gap-4">
              {/* Name Input */}
              <div className="mb-4">
                <label htmlFor="name" className="text-gray-700 font-semibold">Name</label>
                <input
                  type="text"
                  name="name"
                  id="name"
                  required
                  placeholder="Vinod Kumar"
                  className="w-full p-3 rounded-lg bg-gray-100 border border-gray-300 focus:ring-2 focus:ring-blue-500 text-gray-800 transition shadow-md focus:bg-white"
                />
              </div>

              {/* Email Input */}
              <div className="mb-4">
                <label htmlFor="email" className="text-gray-700 font-semibold">Email</label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  required
                  placeholder="vinod@gmail.com"
                  className="w-full p-3 rounded-lg bg-gray-100 border border-gray-300 focus:ring-2 focus:ring-blue-500 text-gray-800 transition shadow-md focus:bg-white"
                />
              </div>
            </div>

            {/* Message Textarea */}
            <div className="mb-4">
              <label htmlFor="message" className="text-gray-700 font-semibold">Message</label>
              <textarea
                name="message"
                id="message"
                required
                placeholder="Hey Vinod, let's work on something amazing!"
                className="w-full p-3 rounded-lg bg-gray-100 border border-gray-300 focus:ring-2 focus:ring-blue-500 text-gray-800 transition shadow-md resize-y min-h-32 max-h-80 focus:bg-white"
              ></textarea>
            </div>

            {/* Submit Button */}
            <motion.button
              type="submit"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="w-full py-3 text-lg font-semibold text-white bg-blue-500 rounded-lg transition-all duration-300 hover:scale-105 shadow-lg focus:ring-2 focus:ring-blue-400 focus:ring-offset-2"
            >
              Send Message 🚀
            </motion.button>
          </motion.form>
        </div>
      </div>
    </motion.section>
  );
};

export default Contact;
