'use client';

import Link from 'next/link';
import { 
  Smartphone, 
  Bell, 
  Layers, 
  BarChart3, 
  Building2, 
  RefreshCw,
  ArrowRight,
  CheckCircle2,
  Sliders,
  Zap
} from 'lucide-react';

// InvenTrack Theme Colors
export const Theme = {
  primaryColor: "#030303",
  secondaryColor: "#D4C9BE",
  brandColor: "#123458",
  backgroundColor: "#F1EFEC",
};

// Features directly tied to the layout in your reference image
// Excluded: Barcoding and Inventory Photos
// Included replacements: Multi-Location Sync & Automated Reordering
const featuresList = [
  {
    icon: <Smartphone className="w-6 h-6" style={{ color: Theme.brandColor }} />,
    title: "Mobile App",
    description: "Track inventory from any device, any location with our responsive mobile platform."
  },
  {
    icon: <Bell className="w-6 h-6" style={{ color: Theme.brandColor }} />,
    title: "Smart Alerts",
    description: "Simplify reordering with automated low-stock notifications and date-based alerts."
  },
  {
    icon: <Layers className="w-6 h-6" style={{ color: Theme.brandColor }} />,
    title: "Integrations",
    description: "Maximize efficiency by integrating InvenTrack with your favorite POS and e-commerce platforms."
  },
  {
    icon: <BarChart3 className="w-6 h-6" style={{ color: Theme.brandColor }} />,
    title: "Reporting & Analytics",
    description: "Generate powerful, data-driven insights with real-time inventory performance reporting."
  },
  {
    icon: <Building2 className="w-6 h-6" style={{ color: Theme.brandColor }} />,
    title: "Multi-Location Sync",
    description: "Effortlessly track and transfer stock across multiple warehouses and retail storefronts."
  },
  {
    icon: <RefreshCw className="w-6 h-6" style={{ color: Theme.brandColor }} />,
    title: "Automated Orders",
    description: "Automatically trigger purchase orders to your suppliers as soon as stock reaches minimum reorder points."
  }
];

const threeStepProcess = [
  {
    step: "01",
    title: "Connect Your Business",
    description: "Import your product catalog in minutes or sync directly with your existing POS and e-commerce platforms."
  },
  {
    step: "02",
    title: "Track Stock in Real Time",
    description: "Every sale, return, or stock movement is updated instantly across all your physical and online locations."
  },
  {
    step: "03",
    title: "Automate & Scale",
    description: "Set reorder triggers, receive instant low-stock alerts, and make confident data-backed decisions."
  }
];

export default function HowItWorks() {
  return (
    <div className="min-h-screen pt-28 pb-16 font-sans bg-[url('/hiwhero.jpg')] bg-cover bg-center shadow-lg bg-blend-multiply bg-black/40">
      
      {/* 1. HERO HEADER */}
      <section className="mx-auto w-[95%] max-w-7xl px-4 pt-8 pb-16 lg:px-6 text-center">
        <h1 className="text-4xl lg:text-6xl font-extrabold tracking-tight mb-6" style={{ color: Theme.primaryColor }}>
          Simple setup. Total control.
        </h1>
        <p className="max-w-2xl mx-auto text-base lg:text-lg opacity-80" style={{ color: Theme.primaryColor }}>
          InvenTrack strips away the complexity of inventory management, replacing messy manual spreadsheets with an automated, easy-to-use platform.
        </p>
      </section>

      {/* 2. THREE-STEP PROCESS FLOW */}
      <section className="mx-auto w-[95%] max-w-7xl px-4 py-12 lg:px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {threeStepProcess.map((item) => (
            <div 
              key={item.step}
              className="bg-white rounded-3xl p-8 border border-black/5 shadow-sm relative overflow-hidden flex flex-col justify-between"
            >
              <div 
                className="text-4xl font-black mb-6 opacity-30"
                style={{ color: Theme.brandColor }}
              >
                {item.step}
              </div>
              <div>
                <h3 className="text-xl font-bold mb-3" style={{ color: Theme.primaryColor }}>
                  {item.title}
                </h3>
                <p className="text-sm text-gray-600 leading-relaxed">
                  {item.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 3. FEATURE SECTION (DIRECTLY TIED TO YOUR PICTURE LAYOUT) */}
      <section className="mx-auto w-[95%] max-w-7xl px-4 py-16 lg:px-6">
        <div className="bg-white rounded-3xl p-8 lg:p-14 border border-black/5 shadow-sm">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            
            {/* Left Column (Title & Subtitle from Image) */}
            <div className="lg:col-span-4 flex flex-col justify-between h-full">
              <div>
                <div className="flex items-center gap-2 mb-3">
                  <h2 className="text-3xl font-extrabold tracking-tight" style={{ color: Theme.brandColor }}>
                    Features
                  </h2>
                  <ArrowRight size={28} style={{ color: Theme.brandColor }} />
                </div>
                <p className="text-sm leading-relaxed text-gray-600 max-w-sm mb-8">
                  Discover how InvenTrack simplifies inventory with features designed for ease and organization.
                </p>
              </div>

              <Link 
                href="/register" 
                className="inline-flex items-center gap-2 text-sm font-bold transition-transform hover:translate-x-1"
                style={{ color: Theme.brandColor }}
              >
                Explore all capabilities <ArrowRight size={16} />
              </Link>
            </div>

            {/* Right Column Grid (Matches 3x2 Grid structure in Reference Image) */}
            <div className="lg:col-span-8 grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-10">
              {featuresList.map((feature, idx) => (
                <div key={idx} className="flex gap-4 items-start">
                  <div 
                    className="p-3 rounded-xl flex-shrink-0"
                    style={{ backgroundColor: `${Theme.brandColor}10` }}
                  >
                    {feature.icon}
                  </div>
                  <div>
                    <h3 className="font-bold text-base mb-1" style={{ color: Theme.primaryColor }}>
                      {feature.title}
                    </h3>
                    <p className="text-xs text-gray-500 leading-relaxed">
                      {feature.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>

          </div>
        </div>
      </section>

      {/* 4. CALL TO ACTION SECTION */}
      <section className="mx-auto w-[95%] max-w-7xl px-4 pt-12 pb-8 lg:px-6">
        <div 
          className="rounded-3xl p-10 lg:p-16 text-center text-white flex flex-col items-center shadow-xl"
          style={{ backgroundColor: Theme.primaryColor }}
        >
          <h2 className="text-3xl lg:text-5xl font-extrabold mb-4" style={{ color: Theme.backgroundColor }}>
            Ready to streamline your stock?
          </h2>
          <p className="text-base lg:text-lg opacity-80 max-w-xl mb-8" style={{ color: Theme.secondaryColor }}>
            Start managing your inventory in real time with zero manual errors.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
            <Link
              href="/register"
              className="rounded-full px-8 py-3.5 text-sm font-bold transition-transform hover:scale-105"
              style={{ backgroundColor: Theme.backgroundColor, color: Theme.primaryColor }}
            >
              Start Free Trial
            </Link>
            <Link
              href="/contact"
              className="rounded-full px-8 py-3.5 text-sm font-bold transition-transform hover:scale-105 border border-white/20"
              style={{ backgroundColor: Theme.brandColor, color: Theme.backgroundColor }}
            >
              Request Demo
            </Link>
          </div>
        </div>
      </section>

    </div>
  );
}