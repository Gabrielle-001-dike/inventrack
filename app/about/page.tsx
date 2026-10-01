'use client';

import Link from 'next/link';
import { 
  Box, 
  TrendingUp, 
  Clock, 
  Eye, 
  AlertCircle, 
  Wrench, 
  Rocket, 
  Users, 
  ArrowRight, 
  LayoutDashboard, 
  Truck, 
  BarChart3, 
  ShieldCheck,
  Code,
  HeartHandshake,
  CheckCircle2
} from 'lucide-react';

// Using your exact Theme Colors
const Theme = {
  primaryColor: "#030303",
  secondaryColor: "#D4C9BE",
  brandColor: "#123458",
  backgroundColor: "#F1EFEC",
};

export default function AboutUs() {
  const missionCards = [
    {
      num: "1",
      title: "Simplify Inventory",
      description: "Replace messy spreadsheets with an intuitive, unified dashboard that tracks all stock items across multiple locations in real time.",
      icon: <Box className="w-10 h-10 text-[#123458]" />,
    },
    {
      num: "2",
      title: "Drive Efficient Decisions",
      description: "Leverage real-time sales reports and demand forecasting to reorder stock with precision, minimizing carrying costs.",
      icon: <TrendingUp className="w-10 h-10 text-[#123458]" />,
    },
    {
      num: "3",
      title: "Reduce Manual Work",
      description: "Automate stock adjustments, low-stock notifications, and barcode scanning to eliminate costly human error.",
      icon: <Clock className="w-10 h-10 text-[#123458]" />,
    },
  ];

  const journeySteps = [
    { title: "The Vision", desc: "Recognizing that small businesses lose millions to inventory miscounts.", icon: <Eye size={22} /> },
    { title: "The Problem", desc: "Overly complex, enterprise-only tools left SMBs stranded on spreadsheets.", icon: <AlertCircle size={22} /> },
    { title: "Building InvenTrack", desc: "Engineered a fast, accessible platform tailored to modern commerce.", icon: <Wrench size={22} /> },
    { title: "Launching Platform", desc: "Rolled out seamless multi-channel sync and real-time alerts.", icon: <Rocket size={22} /> },
    { title: "Empowering Growth", desc: "Helping hundreds of businesses eliminate stockouts and scale.", icon: <ShieldCheck size={22} /> },
  ];

  const team = [
    {
      role: "Visionary Leaders",
      desc: "Guiding the product roadmap with decades of combined logistics & retail experience.",
      icon: <Users size={32} />,
      tags: ["Strategy", "Operations", "Growth"]
    },
    {
      role: "Tech Innovators",
      desc: "Building high-speed syncing engines, robust security, and cloud backend systems.",
      icon: <Code size={32} />,
      tags: ["Engineering", "UX Design", "Data Analytics"]
    },
    {
      role: "Customer Champions",
      desc: "Dedicated 24/7 support ensuring every onboarding and integration is smooth.",
      icon: <HeartHandshake size={32} />,
      tags: ["Support", "Onboarding", "Success"]
    }
  ];

  return (
    <div className="min-h-screen pt-24 pb-16 font-sans bg-[url('/abouthero.jpg')] bg-stone-800/50 bg-blend-multiply bg-cover bg-center bg-no-repeat" >
      
      {/* 1. HERO / BANNER SECTION */}
      <section className="mx-auto w-[95%] max-w-7xl px-4 py-12 lg:px-6">
        <div 
          className="relative overflow-hidden rounded-3xl p-8 lg:p-16 text-white shadow-xl"
        >
          {/* Subtle Background Glow */}
          <div 
            className="absolute -right-20 -top-20 h-96 w-96 rounded-full opacity-20 blur-3xl"
            style={{ backgroundColor: Theme.brandColor }}
          />

          <div className="relative z-10 max-w-3xl">
            <span 
              className="inline-block rounded-full px-4 py-1.5 text-xs font-bold uppercase tracking-wider mb-4"
              style={{ backgroundColor: Theme.secondaryColor, color: Theme.primaryColor }}
            >
              About Us
            </span>
            <h1 className="text-4xl lg:text-6xl font-extrabold tracking-tight mb-6 leading-tight">
              Empowering businesses with total inventory visibility.
            </h1>
            <p className="text-lg lg:text-xl leading-relaxed opacity-90" style={{ color: Theme.backgroundColor }}>
              InvenTrack is a smart inventory management platform designed to help businesses track sales, monitor stock levels, and manage inventory efficiently in one place—reducing manual work and enabling faster data-driven decisions.
            </p>
          </div>
        </div>
      </section>

      {/* 2. OUR MISSION SECTION */}
      <section className="mx-auto w-[95%] max-w-7xl px-4 py-12 lg:px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl lg:text-4xl font-extrabold" style={{ color: Theme.primaryColor }}>
            OUR MISSION
          </h2>
          <p className="mt-3 text-base opacity-75 max-w-xl mx-auto" style={{ color: Theme.primaryColor }}>
            Three core pillars driving everything we build at InvenTrack.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {missionCards.map((card) => (
            <div 
              key={card.num}
              className="relative flex flex-col justify-between rounded-2xl bg-white p-8 shadow-sm transition-transform duration-300 hover:-translate-y-2 border border-black/5"
            >
              {/* Number Badge */}
              <div 
                className="absolute top-6 right-6 flex h-9 w-9 items-center justify-center rounded-full text-sm font-bold"
                style={{ backgroundColor: Theme.secondaryColor, color: Theme.primaryColor }}
              >
                {card.num}
              </div>

              <div>
                <div className="mb-6 p-3 rounded-xl inline-block" style={{ backgroundColor: `${Theme.secondaryColor}40` }}>
                  {card.icon}
                </div>
                <h3 className="text-xl font-bold mb-3" style={{ color: Theme.primaryColor }}>
                  {card.title}
                </h3>
                <p className="text-sm leading-relaxed text-gray-600">
                  {card.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 3. OUR JOURNEY (PICTORIAL TIMELINE) */}
      <section className="mx-auto w-[95%] max-w-7xl px-4 py-16 lg:px-6">
        <div className="rounded-3xl p-8 lg:p-12 border border-black/5 bg-white shadow-sm">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-extrabold uppercase tracking-wide" style={{ color: Theme.primaryColor }}>
              Our Journey
            </h2>
            <p className="mt-2 text-sm text-gray-600">How we evolved from an idea to an all-in-one platform.</p>
          </div>

          {/* Timeline Process Bar */}
          <div className="grid grid-cols-1 md:grid-cols-5 gap-6 relative">
            {journeySteps.map((step, idx) => (
              <div key={idx} className="flex flex-col items-center text-center relative z-10 group">
                
                {/* Step Icon */}
                <div 
                  className="flex h-14 w-14 items-center justify-center rounded-2xl shadow-md transition-all duration-300 group-hover:scale-110 mb-4"
                  style={{ 
                    backgroundColor: idx === 2 || idx === 3 ? Theme.brandColor : Theme.secondaryColor, 
                    color: idx === 2 || idx === 3 ? Theme.backgroundColor : Theme.primaryColor 
                  }}
                >
                  {step.icon}
                </div>

                <h3 className="text-base font-bold mb-2" style={{ color: Theme.primaryColor }}>
                  {step.title}
                </h3>
                <p className="text-xs text-gray-500 leading-relaxed max-w-[180px]">
                  {step.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. HOW WE HELP YOU (WORKFLOW DIAGRAM) */}
<section className="mx-auto w-[95%] max-w-7xl px-4 py-16 lg:px-6">
  <div className="text-center mb-12">
    <h2 className="text-3xl lg:text-4xl font-extrabold uppercase" style={{ color: Theme.primaryColor }}>
      How We Help You
    </h2>
    <p className="mt-2 text-sm text-gray-600">Connecting every piece of your supply chain seamlessly.</p>
  </div>

  <div className="bg-white rounded-3xl p-8 lg:p-12 border border-black/5 shadow-sm">
    {/* Switched to Flexbox layout to align all 3 steps & 2 connectors perfectly */}
    <div className="flex flex-col lg:flex-row items-center justify-between gap-6 lg:gap-3">
      
      {/* Step 1 */}
      <div className="relative flex-1 w-full flex flex-col items-center p-6 rounded-2xl text-center border border-dashed border-gray-200" style={{ backgroundColor: `${Theme.backgroundColor}50` }}>
        <span 
          className="absolute -top-3 left-6 px-3 py-0.5 rounded-full text-xs font-bold shadow-sm"
          style={{ backgroundColor: Theme.secondaryColor, color: Theme.primaryColor }}
        >
          Step 01
        </span>
        <div className="p-4 rounded-full mb-4 mt-2" style={{ backgroundColor: `${Theme.brandColor}15`, color: Theme.brandColor }}>
          <Box size={32} />
        </div>
        <h3 className="font-bold text-base mb-1" style={{ color: Theme.primaryColor }}>Monitor Stock</h3>
        <p className="text-xs text-gray-500 max-w-xs">Real-time counts across warehouses and storefronts.</p>
      </div>

      {/* Connector 1 (Rotates downward on mobile, rightward on desktop) */}
      <div className="flex items-center justify-center text-gray-400 my-2 lg:my-0">
        <ArrowRight size={28} className="rotate-90 lg:rotate-0 transition-transform" style={{ color: Theme.brandColor }} />
      </div>

      {/* Step 2 */}
      <div className="relative flex-1 w-full flex flex-col items-center p-6 rounded-2xl text-center border border-dashed border-gray-200" style={{ backgroundColor: `${Theme.backgroundColor}50` }}>
        <span 
          className="absolute -top-3 left-6 px-3 py-0.5 rounded-full text-xs font-bold shadow-sm"
          style={{ backgroundColor: Theme.secondaryColor, color: Theme.primaryColor }}
        >
          Step 02
        </span>
        <div className="p-4 rounded-full mb-4 mt-2" style={{ backgroundColor: `${Theme.brandColor}15`, color: Theme.brandColor }}>
          <BarChart3 size={32} />
        </div>
        <h3 className="font-bold text-base mb-1" style={{ color: Theme.primaryColor }}>Track Sales</h3>
        <p className="text-xs text-gray-500 max-w-xs">Instant multi-channel integration updates stock instantly.</p>
      </div>

      {/* Connector 2 */}
      <div className="flex items-center justify-center text-gray-400 my-2 lg:my-0">
        <ArrowRight size={28} className="rotate-90 lg:rotate-0 transition-transform" style={{ color: Theme.brandColor }} />
      </div>

      {/* Step 3 */}
      <div className="relative flex-1 w-full flex flex-col items-center p-6 rounded-2xl text-center border border-dashed border-gray-200" style={{ backgroundColor: `${Theme.backgroundColor}50` }}>
        <span 
          className="absolute -top-3 left-6 px-3 py-0.5 rounded-full text-xs font-bold shadow-sm"
          style={{ backgroundColor: Theme.secondaryColor, color: Theme.primaryColor }}
        >
          Step 03
        </span>
        <div className="p-4 rounded-full mb-4 mt-2" style={{ backgroundColor: `${Theme.brandColor}15`, color: Theme.brandColor }}>
          <Truck size={32} />
        </div>
        <h3 className="font-bold text-base mb-1" style={{ color: Theme.primaryColor }}>Optimize Orders</h3>
        <p className="text-xs text-gray-500 max-w-xs">Automated reordering avoids deadstock & stockouts.</p>
      </div>

    </div>
  </div>
</section>

      {/* 5. MEET THE TEAM SECTION */}
      <section className="mx-auto w-[95%] max-w-7xl px-4 py-16 lg:px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl lg:text-4xl font-extrabold uppercase" style={{ color: Theme.primaryColor }}>
            Meet The Team
          </h2>
          <p className="mt-2 text-sm text-gray-600">The minds powering your inventory intelligence.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {team.map((member, idx) => (
            <div key={idx} className="bg-white rounded-2xl p-8 border border-black/5 shadow-sm flex flex-col items-center text-center">
              <div 
                className="w-20 h-20 rounded-full flex items-center justify-center mb-6 shadow-inner"
                style={{ backgroundColor: Theme.secondaryColor, color: Theme.brandColor }}
              >
                {member.icon}
              </div>
              <h3 className="text-xl font-bold mb-2" style={{ color: Theme.primaryColor }}>
                {member.role}
              </h3>
              <p className="text-sm text-gray-600 leading-relaxed mb-6">
                {member.desc}
              </p>
              <div className="flex flex-wrap justify-center gap-2 mt-auto">
                {member.tags.map((tag, tIdx) => (
                  <span 
                    key={tIdx} 
                    className="text-xs px-3 py-1 rounded-full font-medium"
                    style={{ backgroundColor: Theme.backgroundColor, color: Theme.brandColor }}
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 6. CALL TO ACTION (CTA) */}
      <section className="mx-auto w-[95%] max-w-7xl px-4 pt-8 pb-12 lg:px-6">
        <div 
          className="rounded-3xl p-10 lg:p-16 text-center text-white flex flex-col items-center shadow-xl"
          style={{ backgroundColor: Theme.brandColor }}
        >
          <h2 className="text-3xl lg:text-5xl font-extrabold mb-4">
            Let's Build Better Inventory Together!
          </h2>
          <p className="text-base lg:text-lg opacity-90 max-w-2xl mb-8" style={{ color: Theme.backgroundColor }}>
            Ready to reduce manual work and gain full control over your stock levels?
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4">
            <Link
              href="/contact"
              className="rounded-full px-8 py-3.5 text-sm font-bold transition-transform hover:scale-105"
              style={{ backgroundColor: Theme.backgroundColor, color: Theme.primaryColor }}
            >
              Contact Us
            </Link>
            <Link
              href="/register"
              className="rounded-full px-8 py-3.5 text-sm font-bold transition-transform hover:scale-105 border border-white/20"
              style={{ backgroundColor: Theme.primaryColor, color: Theme.backgroundColor }}
            >
              Start Free Trial
            </Link>
          </div>
        </div>
      </section>

    </div>
  );
}