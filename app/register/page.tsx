'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { 
  Building2, 
  Briefcase, 
  UserCheck, 
  ArrowRight, 
  CheckCircle2, 
  ShieldCheck, 
  Sparkles, 
  Lock,
  PackageCheck,
  ChevronLeft
} from 'lucide-react';

// InvenTrack Theme Palette
export const Theme = {
  primaryColor: "#030303",
  secondaryColor: "#D4C9BE",
  brandColor: "#123458",
  backgroundColor: "#F1EFEC",
};

const industryOptions = [
  "Retail & Storefront",
  "E-Commerce / Online Store",
  "Wholesale & Distribution",
  "Manufacturing & Assembly",
  "Food & Beverage / Restaurant",
  "Healthcare & Pharmaceuticals",
  "Logistics & Warehousing",
  "Other Services"
];

const roleOptions = [
  "Business Owner / CEO",
  "Inventory Manager",
  "Operations Lead",
  "Store Manager",
  "Finance / Purchasing",
  "IT / Administrator"
];

export default function GoogleOAuthRegisterPage() {
  const router = useRouter();
  
  // Step 1: OAuth Authentication | Step 2: Collect Business Data
  const [currentStep, setCurrentStep] = useState(1);
  const [isGoogleAuthenticating, setIsGoogleAuthenticating] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Authenticated Google User Data (Captured after Step 1)
  const [googleUser, setGoogleUser] = useState(null);

  // Business Data Collection Form
  const [businessData, setBusinessData] = useState({
    businessName: '',
    industry: 'Retail & Storefront',
    role: 'Business Owner / CEO'
  });

  // Handle Google OAuth Action
  const handleGoogleSignIn = () => {
    setIsGoogleAuthenticating(true);

    // Simulating OAuth popup / token validation delay
    setTimeout(() => {
      setGoogleUser({
        name: "Alex Morgan",
        email: "alex.morgan@gmail.com",
        avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80",
        verified: true
      });
      setIsGoogleAuthenticating(false);
      setCurrentStep(2); // Move to business info collection
    }, 1200);
  };

  // Final Submission -> Directs to Web App Dashboard
  const handleFinalSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    setTimeout(() => {
      router.push('/dashboard');
    }, 1500);
  };

  return (
    <div className="min-h-screen pt-24 pb-16 font-sans text-[#030303] flex items-center justify-center" style={{ backgroundColor: Theme.backgroundColor }}>
      <div className="w-[95%] max-w-4xl mx-auto">
        
        {/* PROGRESS INDICATOR */}
        <div className="mb-8 text-center">
          <span 
            className="inline-block rounded-full px-4 py-1.5 text-xs font-bold uppercase tracking-wider mb-3"
            style={{ backgroundColor: Theme.secondaryColor, color: Theme.primaryColor }}
          >
            Google Single Sign-On
          </span>
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight" style={{ color: Theme.primaryColor }}>
            {currentStep === 1 ? "Create your InvenTrack Account" : "Tell us about your business"}
          </h1>
          <p className="text-xs sm:text-sm text-gray-600 mt-1 max-w-md mx-auto">
            {currentStep === 1 
              ? "Sign up securely using your official Google Workspace or personal Google account." 
              : "Complete your profile to customize your inventory management dashboard."}
          </p>
        </div>

        {/* MAIN REGISTRATION CONTAINER */}
        <div className="bg-white rounded-3xl border border-black/10 shadow-xl overflow-hidden grid grid-cols-1 lg:grid-cols-12">
          
          {/* LEFT SIDEBAR: VALUE PROPS & TRUST BADGES */}
          <div className="lg:col-span-5 p-6 sm:p-8 flex flex-col justify-between border-b lg:border-b-0 lg:border-r border-gray-100" style={{ backgroundColor: "#FAF9F6" }}>
            <div>
              <div className="flex items-center gap-2 mb-6">
                <div className="w-8 h-8 rounded-xl flex items-center justify-center font-black text-white text-sm" style={{ backgroundColor: Theme.brandColor }}>
                  iT
                </div>
                <span className="font-extrabold text-lg tracking-tight" style={{ color: Theme.primaryColor }}>
                  InvenTrack
                </span>
              </div>

              {currentStep === 1 ? (
                /* Step 1 Benefits */
                <div className="space-y-5 my-6">
                  <h3 className="font-bold text-sm" style={{ color: Theme.primaryColor }}>
                    Why register with Google OAuth?
                  </h3>

                  <div className="flex items-start gap-3 text-xs text-gray-600">
                    <div className="p-2 rounded-xl shrink-0 text-emerald-700 bg-emerald-50">
                      <ShieldCheck size={18} />
                    </div>
                    <div>
                      <p className="font-bold text-stone-900">Instant Verification</p>
                      <p className="text-[11px] text-gray-500">No email confirmation links or passwords to remember.</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3 text-xs text-gray-600">
                    <div className="p-2 rounded-xl shrink-0 text-blue-700 bg-blue-50">
                      <Lock size={18} />
                    </div>
                    <div>
                      <p className="font-bold text-stone-900">Enterprise Security</p>
                      <p className="text-[11px] text-gray-500">Protected by Google 2FA and 256-bit SSL cloud encryption.</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3 text-xs text-gray-600">
                    <div className="p-2 rounded-xl shrink-0 text-purple-700 bg-purple-50">
                      <Sparkles size={18} />
                    </div>
                    <div>
                      <p className="font-bold text-stone-900">14-Day Free Trial</p>
                      <p className="text-[11px] text-gray-500">Full access to multi-location tracking and real-time alerts.</p>
                    </div>
                  </div>
                </div>
              ) : (
                /* Step 2 Google Profile Preview */
                <div className="my-4">
                  <p className="text-[11px] font-bold uppercase tracking-wider text-gray-400 mb-2">
                    Authenticated Google Account
                  </p>
                  
                  <div className="flex items-center gap-3 p-3.5 bg-white rounded-2xl border border-gray-200 shadow-sm mb-6">
                    <img 
                      src={googleUser?.avatar} 
                      alt={googleUser?.name} 
                      className="w-10 h-10 rounded-full object-cover border shrink-0" 
                    />
                    <div className="overflow-hidden">
                      <h4 className="font-bold text-xs truncate" style={{ color: Theme.primaryColor }}>
                        {googleUser?.name}
                      </h4>
                      <p className="text-[11px] text-gray-500 truncate">{googleUser?.email}</p>
                    </div>
                    <span className="ml-auto p-1 rounded-full bg-emerald-100 text-emerald-700 shrink-0">
                      <CheckCircle2 size={16} />
                    </span>
                  </div>

                  <p className="text-xs text-gray-500 leading-relaxed">
                    Your Google account is now linked. Completing this form builds your enterprise database instance.
                  </p>
                </div>
              )}
            </div>

            <div className="pt-6 border-t border-stone-200 flex items-center justify-between text-[11px] text-gray-500">
              <span>Already registered?</span>
              <Link href="/login" className="font-bold underline hover:text-black">
                Sign In
              </Link>
            </div>
          </div>

          {/* RIGHT SIDEBAR: INTERACTIVE OAUTH FLOW */}
          <div className="lg:col-span-7 p-6 sm:p-10 flex flex-col justify-center">
            
            {/* STEP 1: GOOGLE OAUTH BUTTON */}
            {currentStep === 1 && (
              <div className="space-y-6 text-center">
                <div className="max-w-sm mx-auto">
                  <h3 className="text-xl font-bold mb-2" style={{ color: Theme.primaryColor }}>
                    Get Started in Seconds
                  </h3>
                  <p className="text-xs text-gray-500 mb-6">
                    Click below to authorize your Google account with InvenTrack.
                  </p>

                  {/* OFFICIAL GOOGLE OAUTH BUTTON */}
                  <button
                    type="button"
                    onClick={handleGoogleSignIn}
                    disabled={isGoogleAuthenticating}
                    className="w-full py-3.5 px-5 rounded-2xl border border-gray-300 bg-white shadow-sm hover:shadow-md hover:border-gray-400 transition-all flex items-center justify-center gap-3 font-bold text-xs text-gray-800 disabled:opacity-50"
                  >
                    {isGoogleAuthenticating ? (
                      <span className="flex items-center gap-2">
                        <span className="w-4 h-4 border-2 border-stone-400 border-t-transparent rounded-full animate-spin"></span>
                        Connecting to Google...
                      </span>
                    ) : (
                      <>
                        {/* Google Logo SVG */}
                        <svg className="w-5 h-5 shrink-0" viewBox="0 0 24 24">
                          <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                          <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                          <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" />
                          <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" />
                        </svg>
                        <span>Continue with Google</span>
                      </>
                    )}
                  </button>

                  {/* Standard email alternative link */}
                  <div className="relative my-6">
                    <div className="absolute inset-0 flex items-center">
                      <div className="w-full border-t border-gray-200"></div>
                    </div>
                    <div className="relative flex justify-center text-[10px] uppercase">
                      <span className="bg-white px-3 text-gray-400 font-bold">Fast & Secure SSO</span>
                    </div>
                  </div>

                  <p className="text-[10px] text-gray-400">
                    By clicking Continue, you agree to InvenTrack's{' '}
                    <a href="#" className="underline">Terms of Service</a> and{' '}
                    <a href="#" className="underline">Privacy Policy</a>.
                  </p>
                </div>
              </div>
            )}

            {/* STEP 2: BUSINESS DATA COLLECTION FORM */}
            {currentStep === 2 && (
              <form onSubmit={handleFinalSubmit} className="space-y-4">
                <div className="flex items-center justify-between border-b pb-3 mb-2">
                  <div>
                    <h3 className="text-lg font-bold" style={{ color: Theme.primaryColor }}>
                      Business Profile
                    </h3>
                    <p className="text-xs text-gray-500">Provide details to configure your workspace.</p>
                  </div>

                  <button
                    type="button"
                    onClick={() => setCurrentStep(1)}
                    className="text-[11px] font-bold text-gray-500 hover:text-black flex items-center gap-1"
                  >
                    <ChevronLeft size={14} /> Back
                  </button>
                </div>

                {/* 1. Business / Store Name */}
                <div>
                  <label className="block text-xs font-bold mb-1.5" style={{ color: Theme.primaryColor }}>
                    Business / Store Name <span className="text-rose-500">*</span>
                  </label>
                  <div className="relative">
                    <Building2 size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
                    <input 
                      type="text" 
                      required
                      placeholder="e.g. Apex General Retail Ltd"
                      value={businessData.businessName}
                      onChange={(e) => setBusinessData({ ...businessData, businessName: e.target.value })}
                      className="w-full rounded-xl pl-10 pr-3.5 py-2.5 text-xs outline-none border border-gray-200 focus:ring-2"
                      style={{ backgroundColor: Theme.backgroundColor, caretColor: Theme.brandColor }}
                    />
                  </div>
                </div>

                {/* 2. Type of Industry */}
                <div>
                  <label className="block text-xs font-bold mb-1.5" style={{ color: Theme.primaryColor }}>
                    Type of Industry <span className="text-rose-500">*</span>
                  </label>
                  <div className="relative">
                    <Briefcase size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
                    <select 
                      value={businessData.industry}
                      onChange={(e) => setBusinessData({ ...businessData, industry: e.target.value })}
                      className="w-full rounded-xl pl-10 pr-3.5 py-2.5 text-xs outline-none border border-gray-200 focus:ring-2 appearance-none"
                      style={{ backgroundColor: Theme.backgroundColor }}
                    >
                      {industryOptions.map((ind, idx) => (
                        <option key={idx} value={ind}>{ind}</option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* 3. Your Role */}
                <div>
                  <label className="block text-xs font-bold mb-1.5" style={{ color: Theme.primaryColor }}>
                    Your Role in the Business <span className="text-rose-500">*</span>
                  </label>
                  <div className="relative">
                    <UserCheck size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
                    <select 
                      value={businessData.role}
                      onChange={(e) => setBusinessData({ ...businessData, role: e.target.value })}
                      className="w-full rounded-xl pl-10 pr-3.5 py-2.5 text-xs outline-none border border-gray-200 focus:ring-2 appearance-none"
                      style={{ backgroundColor: Theme.backgroundColor }}
                    >
                      {roleOptions.map((r, idx) => (
                        <option key={idx} value={r}>{r}</option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* SUBMIT BUTTON -> WEB APP */}
                <div className="pt-3">
                  <button 
                    type="submit"
                    disabled={isSubmitting || !businessData.businessName}
                    className="w-full py-3.5 px-6 rounded-xl text-xs font-bold text-white transition-all flex items-center justify-center gap-2 shadow-md disabled:opacity-50 hover:opacity-95"
                    style={{ backgroundColor: Theme.brandColor }}
                  >
                    {isSubmitting ? (
                      <span className="flex items-center gap-2">
                        <span className="w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                        Launching Web App...
                      </span>
                    ) : (
                      <>
                        <span>Complete Setup & Launch Web App</span>
                        <ArrowRight size={16} />
                      </>
                    )}
                  </button>
                </div>
              </form>
            )}

          </div>

        </div>
      </div>
    </div>
  );
}