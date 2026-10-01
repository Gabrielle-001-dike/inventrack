'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Mail, ArrowRight } from 'lucide-react';
import { SiFacebook, SiGitter, SiInstagram, SiLinkerd } from "react-icons/si";
import { FaLinkedin } from "react-icons/fa";
import { FaXTwitter } from 'react-icons/fa6';
import type { IconType } from 'react-icons';

// Using your provided theme colors
export const Theme = {
  primaryColor: "#030303",
  secondaryColor: "#D4C9BE",
  brandColor: "#123458",
  backgroundColor: "#F1EFEC",
};

const footerLinks = {
  product: [
    { name: 'How it works', href: '/how-it-works' },
    { name: 'Subscriptions', href: '/subscriptions' },
    { name: 'Features', href: '/features' },
    { name: 'Integrations', href: '/integrations' },
  ],
  company: [
    { name: 'About', href: '/about' },
    { name: 'Enquiries/faqs', href: '/faqs' },
    { name: 'Careers', href: '/careers' },
    { name: 'Contact Us', href: '/contact' },
  ],
  legal: [
    { name: 'Privacy Policy', href: '/privacy' },
    { name: 'Terms of Service', href: '/terms' },
    { name: 'Cookie Policy', href: '/cookies' },
  ],
};

const socialIcons: IconType[] = [SiFacebook, SiGitter, SiLinkerd];

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer 
      className="relative mt-20 border-t border-white/10 pt-16 pb-8"
      style={{ backgroundColor: Theme.primaryColor, color: Theme.backgroundColor }}
    >
      <div className="mx-auto w-[95%] max-w-7xl px-4 lg:px-6">
        
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 gap-12 md:grid-cols-2 lg:grid-cols-5">
          
          {/* Brand & Description Column (Takes up 2 columns on large screens) */}
          <div className="lg:col-span-2">
            <Link href="/" className="mb-6 flex items-center gap-3">
              <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-white p-1 shadow-sm">
                <Image
                  src="/inventracklogo.png"
                  alt="InvenTrack Logo"
                  width={40}
                  height={40}
                  className="h-full w-full object-contain"
                />
              </div>
              <span className="text-2xl font-bold tracking-tight">InvenTrack</span>
            </Link>
            <p className="mb-8 max-w-sm text-sm leading-relaxed opacity-80">
              The smart inventory management platform designed to help businesses track sales, monitor stock levels, and manage inventory efficiently in one place.
            </p>
            
            {/* Social Links */}
            <div className="flex gap-4">
              {socialIcons.map((Icon, index) => (
                <a 
                  key={index} 
                  href="#" 
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-white/20 transition-all duration-300 hover:-translate-y-1"
                  style={{ backgroundColor: 'transparent' }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = Theme.brandColor;
                    e.currentTarget.style.borderColor = Theme.brandColor;
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = 'transparent';
                    e.currentTarget.style.borderColor = 'rgba(255,255,255,0.2)';
                  }}
                >
                  <Icon size={18} />
                </a>
              ))}
            </div>
          </div>

          {/* Links Columns */}
          <div>
            <h3 className="mb-6 font-semibold" style={{ color: Theme.secondaryColor }}>Product</h3>
            <ul className="flex flex-col gap-4">
              {footerLinks.product.map((link) => (
                <li key={link.name}>
                  <Link 
                    href={link.href}
                    className="group relative inline-block text-sm opacity-80 transition-opacity hover:opacity-100"
                  >
                    {link.name}
                    {/* Hover slide animation */}
                    <span 
                      className="absolute -bottom-1 left-0 h-[1px] w-0 transition-all duration-300 ease-out group-hover:w-full"
                      style={{ backgroundColor: Theme.secondaryColor }}
                    />
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="mb-6 font-semibold" style={{ color: Theme.secondaryColor }}>Company</h3>
            <ul className="flex flex-col gap-4">
              {footerLinks.company.map((link) => (
                <li key={link.name}>
                  <Link 
                    href={link.href}
                    className="group relative inline-block text-sm opacity-80 transition-opacity hover:opacity-100"
                  >
                    {link.name}
                    <span 
                      className="absolute -bottom-1 left-0 h-[1px] w-0 transition-all duration-300 ease-out group-hover:w-full"
                      style={{ backgroundColor: Theme.secondaryColor }}
                    />
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter / CTA Column */}
          <div>
            <h3 className="mb-6 font-semibold" style={{ color: Theme.secondaryColor }}>Stay Updated</h3>
            <p className="mb-4 text-sm opacity-80">
              Subscribe to our newsletter for the latest inventory tips and features.
            </p>
            <form className="flex flex-col gap-3" onSubmit={(e) => e.preventDefault()}>
              <div className="relative flex items-center">
                <Mail className="absolute left-3 opacity-50" size={16} style={{ color: Theme.primaryColor }} />
                <input 
                  type="email" 
                  placeholder="Enter your email" 
                  className="w-full rounded-lg py-2.5 pl-10 pr-4 text-sm outline-none focus:ring-2"
                  style={{ 
                    backgroundColor: Theme.backgroundColor, 
                    color: Theme.primaryColor,
                    caretColor: Theme.brandColor 
                  }}
                  required
                />
              </div>
              <button 
                type="submit"
                className="group flex w-full items-center justify-center gap-2 rounded-lg py-2.5 text-sm font-bold transition-transform hover:scale-105"
                style={{ 
                  backgroundColor: Theme.brandColor, 
                  color: Theme.backgroundColor 
                }}
              >
                Subscribe
                <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
              </button>
            </form>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="mt-16 flex flex-col items-center justify-between gap-4 border-t border-white/10 pt-8 sm:flex-row text-xs opacity-70">
          <p>&copy; {currentYear} InvenTrack. All rights reserved.</p>
          
          <ul className="flex flex-wrap gap-4 sm:gap-6">
            {footerLinks.legal.map((link) => (
              <li key={link.name}>
                <Link href={link.href} className="hover:underline hover:text-white transition-colors">
                  {link.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        
      </div>
    </footer>
  );
}