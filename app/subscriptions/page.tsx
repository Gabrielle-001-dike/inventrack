'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { 
  Check, 
  Info, 
  Sparkles, 
  Rocket, 
  Building2, 
  Zap, 
  HelpCircle,
  FileCheck,
  Clock
} from 'lucide-react';

// Theme Configuration
export const Theme = {
  primaryColor: "#030303",
  secondaryColor: "#D4C9BE",
  brandColor: "#123458",
  backgroundColor: "#F1EFEC",
};

export default function SubscriptionPage() {
  const [isYearly, setIsYearly] = useState(true);
  const [showEligibilityModal, setShowEligibilityModal] = useState(false);

  // Base Monthly Prices
  const enterpriseMonthlyPrice = 150;
  const startupMonthlyPrice = Math.round(enterpriseMonthlyPrice * 0.6); // 40% cheaper than Enterprise ($90)
  const growthMonthlyPrice = 115;

  // Discount multiplier for yearly (15% off)
  const yearlyDiscount = 0.85;

  const getPrice = (baseMonthlyPrice: number) => {
    if (isYearly) {
      return Math.round(baseMonthlyPrice * yearlyDiscount);
    }
    return baseMonthlyPrice;
  };

  return (
    <div className="min-h-screen pt-24 pb-16 font-sans text-[#030303] bg-[url('/subhero.jpg')] bg-cover bg-center shadow-lg bg-blend-multiply bg-black/40">
      
      {/* 1. HEADER SECTION */}
      <section className="mx-auto w-[95%] max-w-5xl px-4 text-center mb-10">
        <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight mb-4" style={{ color: Theme.secondaryColor }}>
          Choose the plan that fits your growth
        </h1>
        <p className="text-sm sm:text-base text-gray-600 max-w-xl mx-auto">
          Scale your inventory seamlessly with no hidden fees. Switch or cancel your subscription anytime.
        </p>

        {/* 2. MONTHLY / YEARLY TOGGLE */}
        <div className="mt-8 inline-flex items-center gap-3 bg-white p-1.5 rounded-full border border-black/10 shadow-sm">
          <button
            onClick={() => setIsYearly(false)}
            className={`px-5 py-2 rounded-full text-xs sm:text-sm font-bold transition-all ${
              !isYearly 
                ? 'shadow-sm text-white' 
                : 'text-gray-600 hover:text-black'
            }`}
            style={{ backgroundColor: !isYearly ? Theme.brandColor : 'transparent' }}
          >
            Monthly Billing
          </button>
          
          <button
            onClick={() => setIsYearly(true)}
            className={`px-5 py-2 rounded-full text-xs sm:text-sm font-bold transition-all flex items-center gap-2 ${
              isYearly 
                ? 'shadow-sm text-white' 
                : 'text-gray-600 hover:text-black'
            }`}
            style={{ backgroundColor: isYearly ? Theme.brandColor : 'transparent' }}
          >
            Yearly Billing
            <span 
              className="text-[10px] font-extrabold px-2 py-0.5 rounded-full uppercase transition-colors"
              style={{ 
                backgroundColor: isYearly ? Theme.secondaryColor : '#E2E8F0', 
                color: isYearly ? Theme.primaryColor : '#475569' 
              }}
            >
              Save 15%
            </span>
          </button>
        </div>
      </section>

      {/* 3. PRICING CARDS GRID */}
      <section className="mx-auto w-[95%] max-w-6xl px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 items-stretch">
          
          {/* TIER 1: STARTUP PLAN */}
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-black/10 shadow-sm flex flex-col justify-between relative">
            <div>
              {/* Badge */}
              <div className="flex items-center justify-between mb-4">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-amber-50 text-amber-800 border border-amber-200">
                  <Rocket size={14} /> Startup Program
                </span>
                <span className="text-[11px] font-extrabold text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200">
                  40% Off Enterprise
                </span>
              </div>

              <h3 className="text-xl font-bold mb-1" style={{ color: Theme.primaryColor }}>Startup</h3>
              <p className="text-xs text-gray-500 mb-6">Designed for early-stage companies getting off the ground.</p>

              {/* Price */}
              <div className="mb-6">
                <div className="flex items-baseline gap-1">
                  <span className="text-4xl font-extrabold" style={{ color: Theme.brandColor }}>
                    ${getPrice(startupMonthlyPrice)}
                  </span>
                  <span className="text-xs text-gray-500 font-medium">/ month</span>
                </div>
                {isYearly && (
                  <p className="text-[11px] text-emerald-600 font-semibold mt-1">
                    Billed annually (${getPrice(startupMonthlyPrice) * 12}/yr) — Save 15%
                  </p>
                )}
              </div>

              {/* Startup Rule Banner */}
              <div className="bg-stone-50 rounded-2xl p-3.5 border border-dashed border-stone-300 mb-6">
                <div className="flex items-start gap-2 text-xs text-stone-700">
                  <Info size={16} className="text-amber-600 shrink-0 mt-0.5" />
                  <div>
                    <p className="font-bold text-stone-900">Eligibility Requirement</p>
                    <p className="text-[11px] text-stone-600 mt-0.5 leading-snug">
                      Must provide proof business is <strong>under 6 months old</strong>. Businesses over 2 years old are not eligible.
                    </p>
                    <button 
                      onClick={() => setShowEligibilityModal(true)}
                      className="text-[11px] font-bold text-amber-700 hover:underline mt-1 inline-flex items-center gap-1"
                    >
                      View guidelines <HelpCircle size={12} />
                    </button>
                  </div>
                </div>
              </div>

              {/* Features List */}
              <div className="space-y-3 mb-8">
                <p className="text-xs font-bold uppercase tracking-wider text-gray-400">Included Features:</p>
                {[
                  "Up to 2,000 tracked items",
                  "1 Warehouse / Store location",
                  "2 Team Member accounts",
                  "Automated Low-Stock Alerts",
                  "Mobile App access",
                  "Standard Email support"
                ].map((feat, i) => (
                  <div key={i} className="flex items-center gap-2 text-xs text-gray-700">
                    <Check size={16} className="text-emerald-600 shrink-0" />
                    <span>{feat}</span>
                  </div>
                ))}
              </div>
            </div>

            <button
              onClick={() => setShowEligibilityModal(true)}
              className="w-full py-3 px-4 rounded-xl text-xs font-bold transition-all text-center border border-black/10 hover:bg-stone-100"
              style={{ backgroundColor: Theme.backgroundColor, color: Theme.primaryColor }}
            >
              Apply for Startup Plan
            </button>
          </div>

          {/* TIER 2: GROWTH / PROFESSIONAL (MOST POPULAR) */}
          <div 
            className="bg-white rounded-3xl p-6 sm:p-8 border-2 shadow-md flex flex-col justify-between relative transform lg:-translate-y-2"
            style={{ borderColor: Theme.brandColor }}
          >
            <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full text-[11px] font-extrabold uppercase tracking-wider text-white shadow-sm flex items-center gap-1"
                 style={{ backgroundColor: Theme.brandColor }}>
              <Sparkles size={12} /> Most Popular
            </div>

            <div>
              <div className="flex items-center justify-between mb-4 mt-2">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-blue-50 text-blue-900 border border-blue-200">
                  <Zap size={14} /> Growth
                </span>
              </div>

              <h3 className="text-xl font-bold mb-1" style={{ color: Theme.primaryColor }}>Standard Business</h3>
              <p className="text-xs text-gray-500 mb-6">Ideal for established SMBs requiring multi-channel tracking.</p>

              {/* Price */}
              <div className="mb-6">
                <div className="flex items-baseline gap-1">
                  <span className="text-4xl font-extrabold" style={{ color: Theme.brandColor }}>
                    ${getPrice(growthMonthlyPrice)}
                  </span>
                  <span className="text-xs text-gray-500 font-medium">/ month</span>
                </div>
                {isYearly && (
                  <p className="text-[11px] text-emerald-600 font-semibold mt-1">
                    Billed annually (${getPrice(growthMonthlyPrice) * 12}/yr) — Save 15%
                  </p>
                )}
              </div>

              {/* Features List */}
              <div className="space-y-3 mb-8 pt-4 border-t border-gray-100">
                <p className="text-xs font-bold uppercase tracking-wider text-gray-400">Everything in Startup, plus:</p>
                {[
                  "Up to 25,000 tracked items",
                  "Up to 5 Warehouse / Store locations",
                  "10 Team Member accounts",
                  "POS & E-commerce Integrations",
                  "Multi-Location Sync",
                  "Priority Email & Chat support"
                ].map((feat, i) => (
                  <div key={i} className="flex items-center gap-2 text-xs text-gray-700">
                    <Check size={16} className="text-emerald-600 shrink-0" />
                    <span>{feat}</span>
                  </div>
                ))}
              </div>
            </div>

            <Link
              href="/register?plan=growth"
              className="w-full py-3 px-4 rounded-xl text-xs font-bold transition-all text-center text-white shadow-md hover:opacity-95"
              style={{ backgroundColor: Theme.brandColor }}
            >
              Start 14-Day Free Trial
            </Link>
          </div>

          {/* TIER 3: ENTERPRISE PLAN */}
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-black/10 shadow-sm flex flex-col justify-between relative">
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-purple-50 text-purple-900 border border-purple-200">
                  <Building2 size={14} /> Enterprise
                </span>
              </div>

              <h3 className="text-xl font-bold mb-1" style={{ color: Theme.primaryColor }}>Enterprise</h3>
              <p className="text-xs text-gray-500 mb-6">For large operations needing custom scale, SLA & dedicated support.</p>

              {/* Price */}
              <div className="mb-6">
                <div className="flex items-baseline gap-1">
                  <span className="text-4xl font-extrabold" style={{ color: Theme.brandColor }}>
                    ${getPrice(enterpriseMonthlyPrice)}
                  </span>
                  <span className="text-xs text-gray-500 font-medium">/ month</span>
                </div>
                {isYearly && (
                  <p className="text-[11px] text-emerald-600 font-semibold mt-1">
                    Billed annually (${getPrice(enterpriseMonthlyPrice) * 12}/yr) — Save 15%
                  </p>
                )}
              </div>

              {/* Features List */}
              <div className="space-y-3 mb-8 pt-4 border-t border-gray-100">
                <p className="text-xs font-bold uppercase tracking-wider text-gray-400">Everything in Growth, plus:</p>
                {[
                  "Unlimited tracked items",
                  "Unlimited Locations & Warehouses",
                  "Unlimited User Seats",
                  "Automated Purchase Orders",
                  "Custom Analytics & Reports",
                  "24/7 Dedicated Account Manager"
                ].map((feat, i) => (
                  <div key={i} className="flex items-center gap-2 text-xs text-gray-700">
                    <Check size={16} className="text-emerald-600 shrink-0" />
                    <span>{feat}</span>
                  </div>
                ))}
              </div>
            </div>

            <Link
              href="/contact?plan=enterprise"
              className="w-full py-3 px-4 rounded-xl text-xs font-bold transition-all text-center border border-black/10 hover:bg-stone-100"
              style={{ backgroundColor: Theme.backgroundColor, color: Theme.primaryColor }}
            >
              Contact Enterprise Sales
            </Link>
          </div>

        </div>
      </section>

      {/* 4. STARTUP ELIGIBILITY MODAL / POPUP */}
      {showEligibilityModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-fadeIn">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 sm:p-8 shadow-2xl border border-black/10 relative">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-3 rounded-2xl bg-amber-100 text-amber-800">
                <Rocket size={24} />
              </div>
              <div>
                <h3 className="text-lg font-bold" style={{ color: Theme.primaryColor }}>Startup Discount Rules</h3>
                <p className="text-xs text-gray-500">40% lower price than Enterprise rate</p>
              </div>
            </div>

            <div className="space-y-3 text-xs text-gray-600 mb-6 bg-stone-50 p-4 rounded-2xl border border-stone-200">
              <div className="flex items-start gap-2">
                <FileCheck size={16} className="text-emerald-600 shrink-0 mt-0.5" />
                <p>
                  <strong>Proof Required:</strong> Must present incorporation docs (e.g. CAC registration, certificate) showing your company was formed within the last <strong>6 months</strong>.
                </p>
              </div>
              <div className="flex items-start gap-2">
                <Clock size={16} className="text-rose-600 shrink-0 mt-0.5" />
                <p>
                  <strong>Maximum Age Limit:</strong> Any business operating for <strong>over 2 years</strong> is strictly ineligible for the Startup discount.
                </p>
              </div>
            </div>

            <div className="flex gap-3">
              <button
                onClick={() => setShowEligibilityModal(false)}
                className="flex-1 py-2.5 rounded-xl text-xs font-bold border border-gray-300 hover:bg-gray-50"
              >
                Close
              </button>
              <Link
                href="/register?plan=startup"
                onClick={() => setShowEligibilityModal(false)}
                className="flex-1 py-2.5 rounded-xl text-xs font-bold text-center text-white transition-opacity hover:opacity-90"
                style={{ backgroundColor: Theme.brandColor }}
              >
                Proceed with Proof
              </Link>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}