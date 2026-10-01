'use client';

import { useState } from 'react';
import { 
  ArrowRight, 
  TrendingDown, 
  AlertTriangle, 
  Clock, 
  Star, 
  ChevronLeft, 
  ChevronRight,
  ShoppingCart,
  Store,
  Factory
} from 'lucide-react';
import Image from 'next/image';

// Theme colors from your specifications
const Theme = {
  primaryColor: "#030303",
  secondaryColor: "#D4C9BE",
  brandColor: "#123458",
  backgroundColor: "#F1EFEC",
};

const consequences = [
  {
    icon: <TrendingDown size={28} className="mb-4 text-[#123458]" />,
    title: "Lost Sales & Stockouts",
    description: "When items aren't tracked accurately, you risk running out of your best-sellers, directly impacting revenue and customer trust."
  },
  {
    icon: <AlertTriangle size={28} className="mb-4 text-[#123458]" />,
    title: "Costly Overstocking",
    description: "Without data-driven visibility, businesses often over-order dead stock, tying up crucial capital and increasing storage costs."
  },
  {
    icon: <Clock size={28} className="mb-4 text-[#123458]" />,
    title: "Manual Inefficiencies",
    description: "Manual operations and spreadsheet errors pull your team away from productive work to fight fires and do constant recounts."
  }
];

const audiences = [
  { icon: <ShoppingCart size={32} />, title: "E-commerce Brands", desc: "Sync inventory across multiple online storefronts in real-time." },
  { icon: <Store size={32} />, title: "Retail Stores", desc: "Manage stock across single or multiple brick-and-mortar locations." },
  { icon: <Factory size={32} />, title: "Wholesale & Distributors", desc: "Track bulk orders, palettes, and complex supply chains efficiently." }
];

const testimonials = [
  { name: "Sarah Jenkins", role: "Owner, Bloom Boutique", text: "InvenTrack completely eliminated our phantom inventory issues. We finally know exactly what we have in the backroom.", rating: 5 },
  { name: "Michael Chen", role: "Operations Lead, TechGear", text: "The low-stock alerts have saved us thousands in lost sales. It's the most reliable tool in our tech stack.", rating: 5 },
  { name: "Amina Yusuf", role: "E-commerce Manager", text: "Moving from spreadsheets to InvenTrack felt like a huge weight lifted off my shoulders. Highly intuitive.", rating: 4 },
  { name: "David Miller", role: "Warehouse Supervisor", text: "The barcode scanning integration is flawless. Receiving new shipments takes half the time it used to.", rating: 5 },
  { name: "Jessica Taylor", role: "Founder, Organic Eats", text: "Tracking expiration dates and batches used to be a nightmare. InvenTrack made it entirely automated.", rating: 5 },
];

export default function LandingPage() {
  const [currentTestimonial, setCurrentTestimonial] = useState(0);

  const nextTestimonial = () => {
    setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentTestimonial((prev) => (prev === 0 ? testimonials.length - 1 : prev - 1));
  };

  return (
    <div className="min-h-screen font-sans" style={{ backgroundColor: Theme.backgroundColor }}>
      
      {/* 1. HERO SECTION (Light Background) */}
      <section className="relative pt-32 pb-48 lg:pt-40 lg:pb-56 overflow-hidden px-4 lg:px-6">
        <div className="mx-auto max-w-7xl flex flex-col-reverse lg:flex-row items-center gap-12">
          
          {/* Hero Text */}
          <div className="flex-1 text-center lg:text-left z-10">
            <h1 className="text-4xl lg:text-6xl font-extrabold tracking-tight mb-6" style={{ color: Theme.primaryColor }}>
              See it. Track it. <br />
              <span style={{ color: Theme.brandColor }}>Grow it.</span>
            </h1>
            <p className="text-lg mb-8 max-w-xl mx-auto lg:mx-0 opacity-80" style={{ color: Theme.primaryColor }}>
              InvenTrack is a smart inventory management platform designed to help businesses track sales, monitor stock levels, and manage their inventory efficiently in one place. Reduce manual work and make faster, data-driven decisions.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
              <button 
                className="w-full sm:w-auto px-8 py-3.5 rounded-full font-bold transition-transform hover:scale-105 flex items-center justify-center gap-2"
                style={{ backgroundColor: Theme.brandColor, color: Theme.backgroundColor }}
              >
                Start a free trial
                <ArrowRight size={18} />
              </button>
              <button 
                className="w-full sm:w-auto px-8 py-3.5 rounded-full font-bold transition-colors hover:bg-black/5"
                style={{ color: Theme.primaryColor, border: `2px solid ${Theme.primaryColor}` }}
              >
                Sign in
              </button>
            </div>
          </div>

          {/* Hero Graphic (Placeholder for Isometric Design) */}
          <div className="flex-1 relative w-full h-full lg:h-[500px] mx-auto my-auto">
                 <Image 
                   src="/hero.png" 
                   alt="InvenTrack Dashboard" 
                   fill 
                   className="mx-auto mb-4 lg:mb-0 object-contain"
                 />
          </div>
        </div>
      </section>

      {/* 2. OVERLAPPING CONSEQUENCES CARD & DARK SECTION */}
      <section className="relative pt-48 pb-24 px-4 lg:px-6" style={{ backgroundColor: Theme.primaryColor }}>
        
        {/* Overlapping Floating Card bridging light and dark sections */}
        <div className="absolute top-0 left-1/2 w-[95%] max-w-6xl -translate-x-1/2 -translate-y-1/2">
          <div className="bg-white rounded-2xl shadow-xl p-8 lg:p-12 border border-gray-100">
            <h2 className="text-2xl font-bold text-center mb-8" style={{ color: Theme.primaryColor }}>
              The High Cost of Poor Visibility
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 divide-y md:divide-y-0 md:divide-x divide-gray-200">
              {consequences.map((item, index) => (
                <div key={index} className="pt-6 md:pt-0 md:px-6 first:pl-0 last:pr-0">
                  {item.icon}
                  <h3 className="text-xl font-bold mb-3" style={{ color: Theme.primaryColor }}>{item.title}</h3>
                  <p className="text-sm leading-relaxed text-gray-600">{item.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Dark Section Content */}
        <div className="max-w-7xl mx-auto text-center mt-12">
          <h2 className="text-3xl lg:text-4xl font-bold mb-6" style={{ color: Theme.backgroundColor }}>
            Take back control of your operations.
          </h2>
          <p className="max-w-2xl mx-auto text-lg opacity-80 mb-12" style={{ color: Theme.secondaryColor }}>
            Every unscanned item and manual error creates a ripple effect of hidden costs. InvenTrack gives you 100% visibility across your entire workflow.
          </p>
        </div>
      </section>

      {/* 3. TARGET AUDIENCES SECTION */}
      <section className="py-24 px-4 lg:px-6" style={{ backgroundColor: Theme.backgroundColor }}>
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4" style={{ color: Theme.primaryColor }}>Built for modern businesses</h2>
            <p className="opacity-70 max-w-xl mx-auto text-lg" style={{ color: Theme.primaryColor }}>
              Whether you sell online, in-store, or distribute wholesale, we have the tools you need.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {audiences.map((aud, idx) => (
              <div 
                key={idx} 
                className="p-8 rounded-2xl transition-all hover:-translate-y-2"
                style={{ backgroundColor: "white", boxShadow: "0 10px 30px -10px rgba(0,0,0,0.05)" }}
              >
                <div 
                  className="w-16 h-16 rounded-full flex items-center justify-center mb-6"
                  style={{ backgroundColor: Theme.secondaryColor, color: Theme.brandColor }}
                >
                  {aud.icon}
                </div>
                <h3 className="text-xl font-bold mb-3" style={{ color: Theme.primaryColor }}>{aud.title}</h3>
                <p className="text-gray-600 leading-relaxed">{aud.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. TESTIMONIALS CAROUSEL */}
      <section className="py-24 px-4 lg:px-6" style={{ backgroundColor: Theme.secondaryColor }}>
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-12" style={{ color: Theme.primaryColor }}>Trusted by operators worldwide</h2>
          
          <div className="relative bg-white rounded-3xl p-8 lg:p-12 shadow-sm min-h-[300px] flex flex-col justify-center">
            
            {/* Stars */}
            <div className="flex justify-center gap-1 mb-6 text-yellow-400">
              {[...Array(testimonials[currentTestimonial].rating)].map((_, i) => (
                <Star key={i} fill="currentColor" size={24} />
              ))}
            </div>

            {/* Quote */}
            <p className="text-xl lg:text-2xl italic font-medium mb-8" style={{ color: Theme.primaryColor }}>
              "{testimonials[currentTestimonial].text}"
            </p>

            {/* Author */}
            <div>
              <p className="font-bold text-lg" style={{ color: Theme.brandColor }}>
                {testimonials[currentTestimonial].name}
              </p>
              <p className="text-sm opacity-70" style={{ color: Theme.primaryColor }}>
                {testimonials[currentTestimonial].role}
              </p>
            </div>

            {/* Carousel Controls */}
            <div className="absolute top-1/2 -translate-y-1/2 left-0 right-0 flex justify-between px-2 lg:-mx-6 pointer-events-none">
              <button 
                onClick={prevTestimonial}
                className="w-12 h-12 rounded-full bg-white shadow-md flex items-center justify-center pointer-events-auto transition-transform hover:scale-110"
                style={{ color: Theme.primaryColor }}
              >
                <ChevronLeft size={24} />
              </button>
              <button 
                onClick={nextTestimonial}
                className="w-12 h-12 rounded-full bg-white shadow-md flex items-center justify-center pointer-events-auto transition-transform hover:scale-110"
                style={{ color: Theme.primaryColor }}
              >
                <ChevronRight size={24} />
              </button>
            </div>

            {/* Dots */}
            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2">
              {testimonials.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrentTestimonial(idx)}
                  className={`w-2.5 h-2.5 rounded-full transition-all ${currentTestimonial === idx ? 'w-8' : ''}`}
                  style={{ backgroundColor: currentTestimonial === idx ? Theme.brandColor : '#CBD5E1' }}
                  aria-label={`Go to testimonial ${idx + 1}`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}