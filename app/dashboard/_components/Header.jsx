"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { UserButton } from "@clerk/nextjs";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const Header = () => {
  const path = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    setIsMobileMenuOpen(false); // Close menu when route changes
  }, [path]);

  const navItems = [
    { name: "Dashboard", href: "/dashboard" },
    { name: "Questions", href: "/questions" },
    { name: "Upgrade", href: "/upgrade" },
    { name: "How it Works?", href: "/how-it-works" },
  ];

  return (
    <header className="flex items-center justify-between p-4 bg-white shadow-md">
      {/* Logo & Brand Name */}
      <Link href="/" className="flex items-center gap-2">
        <Image src="/logo.svg" width={50} height={50} alt="Logo" className="cursor-pointer" />
        <span className="hidden md:block text-2xl font-bold tracking-wide uppercase">
          <span className="bg-gradient-to-r from-violet-500 to-pink-500 bg-clip-text text-transparent">Grill</span>
          <span className="text-gray-900">Bot</span>
        </span>
      </Link>

      {/* Desktop Navigation */}
      <nav className="hidden md:flex gap-6">
        {navItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className={`text-gray-700 hover:text-transparent hover:bg-clip-text hover:bg-gradient-to-r hover:from-indigo-600 hover:to-pink-500 transition-all font-medium ${
              path === item.href ? "text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-pink-500 font-bold" : ""
            }`}
          >
            {item.name}
          </Link>
        ))}
      </nav>

      {/* User Button for Larger Screens */}
      <div className="hidden md:block">
        <UserButton />
      </div>

      {/* Mobile Menu Toggle */}
      <button className="md:hidden text-gray-700" onClick={() => setIsMobileMenuOpen(true)}>
        <Menu size={28} />
      </button>

      {/* Mobile Navigation */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            {/* Background Overlay */}
            <motion.div
              className="fixed inset-0 bg-black bg-opacity-50 z-40"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMobileMenuOpen(false)}
            />

            {/* Menu Content */}
            <motion.div
              initial={{ y: "-100%", opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: "-100%", opacity: 0 }}
              transition={{ type: "spring", stiffness: 100 }}
              className="fixed top-0 left-0 w-full bg-white shadow-lg md:hidden flex flex-col items-center gap-6 py-8 z-50 rounded-b-lg"
            >
              {/* Close Button Inside Menu */}
              <button className="absolute top-4 right-4 text-gray-700" onClick={() => setIsMobileMenuOpen(false)}>
                <X size={30} />
              </button>

              {/* User Button Inside Mobile Menu */}
              <div className="mt-4 w-30 h-30">
                <UserButton />
              </div>

              {/* Navigation Links */}
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`text-gray-700 hover:text-transparent hover:bg-clip-text hover:bg-gradient-to-r hover:from-indigo-600 hover:to-pink-500 text-lg font-semibold transition-all ${
                    path === item.href ? "text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-pink-500 font-bold" : ""
                  }`}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Header;
