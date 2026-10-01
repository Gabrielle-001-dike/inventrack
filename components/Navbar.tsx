'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Menu, X } from 'lucide-react';

export const Theme = {
  primaryColor: "#030303",
  secondaryColor: "#D4C9BE",
  brandColor: "#123458",
  backgroundColor: "#F1EFEC",
};

const navLinks = [
  { name: 'Home', href: '/' },
  { name: 'About', href: '/about' },
  { name: 'How it works', href: '/how-it-works' },
  { name: 'Subscriptions', href: '/subscriptions' },
  { name: 'Enquiries/faqs', href: '/faqs' },
];

export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <>
      {/* 
        Fixed positioned, dark transparent with blur, curved borders (rounded-full).
        Background uses primaryColor with opacity for the glassmorphism effect.
      */}
      <header 
        className="fixed left-1/2 top-4 z-50 w-[95%] max-w-7xl -translate-x-1/2 rounded-full border border-white/10 p-2 shadow-lg backdrop-blur-md"
        style={{ backgroundColor: `${Theme.primaryColor}CC` }} // Hex CC is ~80% opacity for the blur effect
      >
        <div className="flex items-center justify-between px-4 lg:px-6">
          
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3">
            <div className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-full bg-white p-1 shadow-sm">
              <Image
                src="/inventracklogo.png"
                alt="InvenTrack Logo"
                width={40}
                height={40}
                className="h-full w-full object-contain"
              />
            </div>
            <div className="leading-tight hidden sm:block">
              <p className="font-bold text-lg" style={{ color: Theme.backgroundColor }}>InvenTrack</p>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden items-center gap-8 lg:flex">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="group relative py-2 text-sm font-medium transition-colors"
                style={{ color: Theme.backgroundColor }}
              >
                {link.name}
                {/* Sliding underline animation (color matches text/backgroundColor) */}
                <span 
                  className="absolute bottom-0 left-0 h-[2px] w-0 transition-all duration-300 ease-out group-hover:w-full"
                  style={{ backgroundColor: Theme.backgroundColor }}
                />
              </Link>
            ))}

            {/* Auth Buttons */}
            <div className="ml-2 flex items-center gap-3">
              <button
                className="rounded-full px-6 py-2.5 text-sm font-bold transition-transform hover:scale-105"
                style={{ 
                  backgroundColor: Theme.backgroundColor,
                  color: Theme.primaryColor 
                }}
              >
                Register
              </button>
              <button
                className="rounded-full px-6 py-2.5 text-sm font-bold transition-transform hover:scale-105"
                style={{ 
                  backgroundColor: Theme.backgroundColor,
                  color: Theme.primaryColor 
                }}
              >
                Sign in
              </button>
            </div>
          </nav>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="rounded-full p-2 transition-colors hover:bg-white/10 lg:hidden"
            style={{ color: Theme.backgroundColor }}
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </header>

      {/* Mobile Navigation Dropdown */}
      <div 
        className={`fixed left-1/2 top-24 z-40 w-[95%] max-w-md -translate-x-1/2 overflow-hidden rounded-2xl shadow-xl transition-all duration-300 ease-in-out lg:hidden ${
          isMobileMenuOpen ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0 pointer-events-none'
        }`}
        style={{ backgroundColor: Theme.primaryColor }}
      >
        <nav className="flex flex-col gap-4 p-6 items-center justify-center">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              onClick={() => setIsMobileMenuOpen(false)}
              className="text-lg font-medium transition-colors hover:opacity-80 border-b border-white/10 hover:pl-2 transition-all duration-200"
              style={{ color: Theme.backgroundColor }}
            >
              {link.name}
            </Link>
          ))}
          <div className="mt-4 flex flex-col gap-3">
            <button
              className="w-full rounded-full px-6 py-3 font-bold transition-transform hover:scale-105"
              style={{ 
                backgroundColor: Theme.backgroundColor,
                color: Theme.primaryColor 
              }}
            >
              Register
            </button>
            <button
              className="w-full rounded-full px-6 py-3 font-bold transition-transform hover:scale-105"
              style={{ 
                backgroundColor: Theme.backgroundColor,
                color: Theme.primaryColor 
              }}
            >
              Sign in
            </button>
          </div>
        </nav>
      </div>
    </>
  );
}