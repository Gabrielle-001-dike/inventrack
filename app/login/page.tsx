'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { 
  Mail, 
  Lock, 
  Eye, 
  EyeOff, 
  ArrowRight, 
  Building2, 
  ShieldCheck, 
  CheckCircle2,
  Sparkles,
  Layers,
  Briefcase
} from 'lucide-react';

// InvenTrack Theme Palette
export const Theme = {
  primaryColor: "#030303",
  secondaryColor: "#D4C9BE",
  brandColor: "#123458",
  backgroundColor: "#F1EFEC",
};

export default function SignInPage() {
  const router = useRouter();

  // Form State
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);

  // Loading & State Simulations
  const [isAuthenticatingGoogle, setIsAuthenticatingGoogle] = useState(false);
  const [isAuthenticatingEmail, setIsAuthenticatingEmail] = useState(false);
  const [restoredUserData, setRestoredUserData] = useState(null);

  // 1. Google OAuth Sign In (Retrieves initial registration data & launches web app)
  const handleGoogleSignIn = () => {
    setIsAuthenticatingGoogle(true);

    // Simulate OAuth handshake & database profile retrieval
    setTimeout(() => {
      const existingAccount = {
        name: "Alex Morgan",
        email: "alex.morgan@gmail.com",
        avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80",
        businessName: "Apex Retail Solutions Ltd",
        industry: "Retail & Storefront",
        role: "Business Owner / CEO"
      };

      setRestoredUserData(existingAccount);

      // Redirect directly to the Web App Dashboard after brief profile sync
      setTimeout(() => {
        router.push('/dashboard');
      }, 1200);
    }, 1200);
  };

  // 2. Standard Email/Password Sign In
  const handleEmailSignIn = (e) => {
    e.preventDefault();
    setIsAuthenticatingEmail(true);

    setTimeout(() => {
      // Redirect to Web App Dashboard
      router.push('/dashboard');
    }, 1200);
  };

  return (
    <div className="min-h-screen pt-24 pb-16 font-sans text-[#030303] flex items-center justify-center" style={{ backgroundColor: Theme.backgroundColor }}>
      <div className="w-[95%] max-w-4xl mx-auto">
        
        {/* HEADER */}
        <div className="mb-8 text-center">
          <span 
            className="inline-block rounded-full px-4 py-1.5 text-xs font-bold uppercase tracking-wider mb-3"
            style={{ backgroundColor: Theme.secondaryColor, color: Theme.primaryColor }}
          >
            InvenTrack Web App Access
          </span>
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight" style={{ color: Theme.primaryColor }}>
            Welcome back to your workspace
          </h1>
          <p className="text-xs sm:text-sm text-gray-600 mt-1 max-w-md mx-auto">
            Sign in to access your inventory counts, multi-location stock sync, and real-time alerts.
          </p>
        </div>

        {/* MAIN CONTAINER */}
        <div className="bg-white rounded-3xl border border-black/10 shadow-xl overflow-hidden grid grid-cols-1 lg:grid-cols-12">
          
          {/* LEFT SIDEBAR: BRAND HIGHLIGHTS */}
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

              {/* RESTORED PROFILE BANNER (Shows when Google Sign-In fetches initial setup info) */}
              {restoredUserData ? (
                <div className="bg-white p-4 rounded-2xl border border-emerald-200 shadow-sm my-4 animate-fadeIn">
                  <div className="flex items-center gap-2 text-xs font-bold text-emerald-800 mb-3">
                    <CheckCircle2 size={16} className="text-emerald-600 shrink-0" />
                    <span>Workspace Data Loaded</span>
                  </div>

                  <div className="flex items-center gap-3 mb-3 pb-3 border-b border-stone-100">
                    <img 
                      src={restoredUserData.avatar} 
                      alt={restoredUserData.name} 
                      className="w-10 h-10 rounded-full object-cover border" 
                    />
                    <div className="overflow-hidden">
                      <p className="font-bold text-xs truncate" style={{ color: Theme.primaryColor }}>
                        {restoredUserData.name}
                      </p>
                      <p className="text-[11px] text-gray-500 truncate">{restoredUserData.email}</p>
                    </div>
                  </div>

                  <div className="space-y-1.5 text-[11px] text-stone-700">
                    <p className="flex items-center gap-1.5 font-bold">
                      <Building2 size={13} className="text-stone-400" />
                      {restoredUserData.businessName}
                    </p>
                    <p className="flex items-center gap-1.5 text-gray-500">
                      <Briefcase size={13} className="text-stone-400" />
                      {restoredUserData.industry} • {restoredUserData.role}
                    </p>
                  </div>
                </div>
              ) : (
                /* Default Benefits List */
                <div className="space-y-5 my-6">
                  <h3 className="font-bold text-sm" style={{ color: Theme.primaryColor }}>
                    Seamless Cloud Synchronization
                  </h3>

                  <div className="flex items-start gap-3 text-xs text-gray-600">
                    <div className="p-2 rounded-xl shrink-0 text-emerald-700 bg-emerald-50">
                      <ShieldCheck size={18} />
                    </div>
                    <div>
                      <p className="font-bold text-stone-900">Encrypted Session</p>
                      <p className="text-[11px] text-gray-500">256-bit SSL connection to your business database.</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3 text-xs text-gray-600">
                    <div className="p-2 rounded-xl shrink-0" style={{ backgroundColor: `${Theme.brandColor}15`, color: Theme.brandColor }}>
                      <Layers size={18} />
                    </div>
                    <div>
                      <p className="font-bold text-stone-900">Auto-restored Settings</p>
                      <p className="text-[11px] text-gray-500">Google OAuth automatically loads all your registered business data.</p>
                    </div>
                  </div>
                </div>
              )}
            </div>

            <div className="pt-6 border-t border-stone-200 flex items-center justify-between text-[11px] text-gray-500">
              <span>New to InvenTrack?</span>
              <Link href="/register" className="font-bold underline hover:text-black">
                Create Account
              </Link>
            </div>
          </div>

          {/* RIGHT SIDEBAR: SIGN IN FORM */}
          <div className="lg:col-span-7 p-6 sm:p-10 flex flex-col justify-center">
            
            {/* 1. GOOGLE OAUTH BTN (MAIN CTA) */}
            <div className="space-y-4">
              <button
                type="button"
                onClick={handleGoogleSignIn}
                disabled={isAuthenticatingGoogle || isAuthenticatingEmail || restoredUserData}
                className="w-full py-3.5 px-5 rounded-2xl border border-gray-300 bg-white shadow-sm hover:shadow-md hover:border-gray-400 transition-all flex items-center justify-center gap-3 font-bold text-xs text-gray-800 disabled:opacity-50"
              >
                {isAuthenticatingGoogle ? (
                  <span className="flex items-center gap-2">
                    <span className="w-4 h-4 border-2 border-stone-400 border-t-transparent rounded-full animate-spin"></span>
                    Retrieving Google profile & business data...
                  </span>
                ) : restoredUserData ? (
                  <span className="flex items-center gap-2 text-emerald-700">
                    <CheckCircle2 size={16} /> Launching Web App...
                  </span>
                ) : (
                  <>
                    {/* Google SVG Logo */}
                    <svg className="w-5 h-5 shrink-0" viewBox="0 0 24 24">
                      <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                      <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                      <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" />
                      <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" />
                    </svg>
                    <span>Sign in with Google</span>
                  </>
                )}
              </button>

              <div className="relative my-5">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-200"></div>
                </div>
                <div className="relative flex justify-center text-[10px] uppercase">
                  <span className="bg-white px-3 text-gray-400 font-bold">Or sign in with email</span>
                </div>
              </div>
            </div>

            {/* 2. STANDARD EMAIL & PASSWORD FORM */}
            <form onSubmit={handleEmailSignIn} className="space-y-4">
              
              {/* Email */}
              <div>
                <label className="block text-xs font-bold mb-1.5" style={{ color: Theme.primaryColor }}>
                  Email Address
                </label>
                <div className="relative">
                  <Mail size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
                  <input 
                    type="email" 
                    required
                    placeholder="name@company.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full rounded-xl pl-10 pr-3.5 py-2.5 text-xs outline-none border border-gray-200 focus:ring-2"
                    style={{ backgroundColor: Theme.backgroundColor, caretColor: Theme.brandColor }}
                  />
                </div>
              </div>

              {/* Password */}
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label className="block text-xs font-bold" style={{ color: Theme.primaryColor }}>
                    Password
                  </label>
                  <Link href="/forgot-password" className="text-[11px] font-bold text-gray-500 hover:text-black">
                    Forgot password?
                  </Link>
                </div>
                <div className="relative">
                  <Lock size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
                  <input 
                    type={showPassword ? "text" : "password"} 
                    required
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full rounded-xl pl-10 pr-10 py-2.5 text-xs outline-none border border-gray-200 focus:ring-2"
                    style={{ backgroundColor: Theme.backgroundColor, caretColor: Theme.brandColor }}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>
              </div>

              {/* Remember Me */}
              <div className="flex items-center justify-between pt-1">
                <label className="flex items-center gap-2 text-xs text-gray-600 cursor-pointer">
                  <input 
                    type="checkbox"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                    className="rounded border-gray-300 text-stone-900 focus:ring-black"
                  />
                  <span>Remember this device</span>
                </label>
              </div>

              {/* Submit Button */}
              <div className="pt-2">
                <button 
                  type="submit"
                  disabled={isAuthenticatingEmail || isAuthenticatingGoogle}
                  className="w-full py-3.5 px-6 rounded-xl text-xs font-bold text-white transition-all flex items-center justify-center gap-2 shadow-md disabled:opacity-50 hover:opacity-95"
                  style={{ backgroundColor: Theme.brandColor }}
                >
                  {isAuthenticatingEmail ? (
                    <span className="flex items-center gap-2">
                      <span className="w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                      Signing In...
                    </span>
                  ) : (
                    <>
                      <span>Sign In to Web App</span>
                      <ArrowRight size={16} />
                    </>
                  )}
                </button>
              </div>

            </form>

          </div>

        </div>
      </div>
    </div>
  );
}