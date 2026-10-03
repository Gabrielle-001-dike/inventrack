'use client';

import React, { useState, ChangeEvent, FormEvent } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

// --- FIREBASE CLIENT IMPORTS ---
import { 
  createUserWithEmailAndPassword, 
  signInWithPopup, 
  updateProfile,
  User 
} from 'firebase/auth';
import { 
  doc, 
  setDoc, 
  serverTimestamp 
} from 'firebase/firestore';

// --- ICONS ---
import { 
  FaArrowLeftLong, 
  FaEnvelope, 
  FaLock, 
  FaUser, 
  FaBuilding, 
  FaBriefcase,
  FaUserTag,
  // FaCheckCircle,
  FaArrowRight
} from 'react-icons/fa6';
import { FcGoogle } from 'react-icons/fc';
import { auth, db, googleProvider } from '@/config/firebase';

// ============================================================================
// TYPESCRIPT INTERFACES
// ============================================================================
export interface RegisterFormData {
  userName: string;
  email: string;
  password: string;
  businessName: string;
  industry: string;
  userRole: string;
}

export interface SignedInUserSummary {
  uid: string;
  name: string | null;
  email: string | null;
  photoURL?: string | null;
}

const INDUSTRY_OPTIONS: string[] = [
  'Retail & Storefront',
  'E-Commerce & Online Store',
  'Wholesale & Distribution',
  'Manufacturing & Assembly',
  'Food & Beverage / Restaurant',
  'Logistics & Warehousing',
  'Healthcare & Pharmaceuticals',
  'Other Services'
];

const ROLE_OPTIONS: string[] = [
  'Business Owner / CEO',
  'Inventory Manager',
  'Operations Lead',
  'Store Manager',
  'Purchasing Agent',
  'IT / Administrator'
];

export default function RegisterPage(): React.ReactElement {
  const router = useRouter();

  // Typed Form State
  const [formData, setFormData] = useState<RegisterFormData>({
    userName: '',
    email: '',
    password: '',
    businessName: '',
    industry: INDUSTRY_OPTIONS[0],
    userRole: ROLE_OPTIONS[0]
  });

  const [loading, setLoading] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [signedInUser, setSignedInUser] = useState<SignedInUserSummary | null>(null);

  // Type-safe Input Change Handler
  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>): void => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Type-safe Helper Function to Save User Data to Firestore
  const saveUserDataToFirestore = async (
    user: User, 
    customData: Partial<RegisterFormData> = {}
  ): Promise<void> => {
    const userDocRef = doc(db, 'users', user.uid);
    
    const userData = {
      uid: user.uid,
      displayName: customData.userName || user.displayName || 'InvenTrack User',
      email: user.email,
      photoURL: user.photoURL || null,
      businessName: customData.businessName || formData.businessName || 'Default Store',
      industry: customData.industry || formData.industry,
      userRole: customData.userRole || formData.userRole,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp()
    };

    await setDoc(userDocRef, userData, { merge: true });
  };

  // --- 1. EMAIL & PASSWORD REGISTRATION ---
  const handleEmailRegister = async (e: FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();
    setLoading(true);
    setErrorMessage('');

    try {
      // Create user account in Firebase Auth
      const userCredential = await createUserWithEmailAndPassword(
        auth, 
        formData.email, 
        formData.password
      );
      const user: User = userCredential.user;  

      // Update Firebase Auth Display Name
      await updateProfile(user, { displayName: formData.userName });

      // Save user details to Firestore
      await saveUserDataToFirestore(user, formData);

      // Transition to Confirmation Screen
      setSignedInUser({
        uid: user.uid,
        name: formData.userName,
        email: user.email
      });
    } catch (error: any) {
      console.error("Registration Error:", error);
      const message = error?.message ? error.message.replace("Firebase: ", "") : "An unexpected error occurred.";
      setErrorMessage(message);
    } finally {
      setLoading(false);
    }
  };

  // --- 2. GOOGLE OAUTH REGISTRATION ---
  const handleGoogleSignIn = async (): Promise<void> => {
    setLoading(true);
    setErrorMessage('');

    try {
      const result = await signInWithPopup(auth, googleProvider);
      const user: User = result.user;

      // Save Google User Profile to Firestore
      await saveUserDataToFirestore(user, formData);

      setSignedInUser({
        uid: user.uid,
        name: user.displayName,
        email: user.email,
        photoURL: user.photoURL
      });
    } catch (error: any) {
      console.error("Google Auth Error:", error);
      const message = error?.message ? error.message.replace("Firebase: ", "") : "Google Sign-In failed.";
      setErrorMessage(message);
    } finally {
      setLoading(false);
    }
  };

  const handleProceedToDashboard = (): void => {
    router.push('/dashboard');
  };

  return (
    <main className="min-h-dvh bg-[#F1EFEC] flex items-center justify-center p-4 md:p-8 font-sans text-[#030303]">
      <div className="w-full max-w-5xl bg-white rounded-3xl shadow-xl overflow-hidden flex flex-col md:flex-row min-h-[700px] border border-black/5">
        
        {/* BRAND SIDE PANEL */}
        <div className="md:w-5/12 bg-[#123458] relative hidden md:flex flex-col justify-between p-10 text-white">
          <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/40 z-0" />

          <div className="relative z-10">
            <Link href="/" className="text-2xl font-black tracking-tight text-white flex items-center gap-2">
              <span className="w-8 h-8 rounded-xl bg-[#D4C9BE] text-[#123458] flex items-center justify-center font-extrabold text-base shadow-sm">
                iT
              </span>
              InvenTrack<span className="text-[#D4C9BE]">.</span>
            </Link>
          </div>

          <div className="relative z-10 space-y-4">
            <span className="bg-[#D4C9BE] text-[#030303] font-extrabold text-[10px] uppercase tracking-widest px-3 py-1 rounded-full inline-block shadow-sm">
              Smart Stock Control
            </span>
            <h2 className="text-3xl font-extrabold leading-tight tracking-tight">
              Build Your <br />
              <span className="text-[#D4C9BE]">Inventory Database</span>
            </h2>
            <p className="text-stone-300 text-xs leading-relaxed">
              Track stock levels, configure automated low-stock alerts, and export real-time business reports in seconds.
            </p>
          </div>

          <div className="relative z-10 pt-4 border-t border-white/15 text-[11px] text-stone-300 flex items-center justify-between">
            <span>Precision warehouse management</span>
            <span className="font-bold text-[#D4C9BE]">v2.4 Pro</span>
          </div>
        </div>

        {/* FORM / CONFIRMATION PANEL */}
        <div className="w-full md:w-7/12 p-6 sm:p-10 flex flex-col justify-between relative bg-white">
          
          {/* CONFIRMATION SCREEN AFTER SIGN IN / REGISTER */}
          {signedInUser ? (
            <div className="my-auto space-y-6 max-w-md mx-auto w-full">
              <div className="text-center space-y-2">
                <div className="w-14 h-14 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto text-2xl shadow-inner">
                  {/* <FaCheckCircle />` */}
                </div>
                <h1 className="text-2xl font-extrabold text-[#030303]">
                  Registration Complete!
                </h1>
                <p className="text-xs text-stone-500">
                  Your account and business details have been securely saved.
                </p>
              </div>

              {/* USER CARD */}
              <div className="p-4 bg-[#F1EFEC] rounded-2xl border border-stone-200 flex items-center gap-4">
                {signedInUser.photoURL ? (
                  <img 
                    src={signedInUser.photoURL} 
                    alt={signedInUser.name || 'User'} 
                    className="w-12 h-12 rounded-full border border-stone-300 object-cover"
                  />
                ) : (
                  <div className="w-12 h-12 rounded-full bg-[#123458] text-white flex items-center justify-center font-bold text-lg">
                    {signedInUser.name?.charAt(0) || 'U'}
                  </div>
                )}
                
                <div className="overflow-hidden flex-1">
                  <h3 className="font-extrabold text-sm text-[#030303] truncate">
                    {signedInUser.name}
                  </h3>
                  <p className="text-xs text-stone-500 truncate">
                    {signedInUser.email}
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={handleProceedToDashboard}
                className="w-full bg-[#123458] hover:bg-[#0c243e] text-white font-extrabold py-3.5 px-4 rounded-xl transition-all shadow-md flex items-center justify-center gap-2 text-xs cursor-pointer"
              >
                <span>Confirm & Open Dashboard</span>
                <FaArrowRight size={14} />
              </button>
            </div>
          ) : (
            <div>
              {/* Header Navigation */}
              <div className="flex justify-between items-center mb-6">
                <Link
                  href="/"
                  className="inline-flex items-center gap-2 text-xs font-medium text-stone-500 hover:text-[#123458] transition-colors"
                >
                  <FaArrowLeftLong /> Back to Home
                </Link>
                <div className="text-xs">
                  <span className="text-stone-500">Already registered?</span>{' '}
                  <Link
                    href="/login"
                    className="font-bold text-[#123458] hover:underline"
                  >
                    Sign In
                  </Link>
                </div>
              </div>

              <div className="mb-4">
                <h1 className="text-2xl font-extrabold text-[#030303] tracking-tight">
                  Create your workspace
                </h1>
                <p className="text-stone-500 text-xs mt-1">
                  Fill in your details below to register and save your workspace data.
                </p>
              </div>

              {errorMessage && (
                <div className="mb-4 p-3 bg-rose-50 border border-rose-200 text-rose-700 text-xs rounded-xl font-medium">
                  {errorMessage}
                </div>
              )}

              {/* Google OAuth Option */}
              <div className="mb-4">
                <button
                  type="button"
                  onClick={handleGoogleSignIn}
                  disabled={loading}
                  className="w-full flex items-center justify-center gap-3 bg-white border border-stone-300 hover:bg-stone-50 text-stone-800 font-bold py-2.5 px-4 rounded-xl transition-all shadow-sm cursor-pointer text-xs disabled:opacity-50"
                >
                  <FcGoogle className="text-xl" />
                  <span>Register with Google</span>
                </button>

                <div className="relative flex items-center justify-center my-4">
                  <div className="border-t border-stone-200 w-full" />
                  <span className="bg-white px-3 text-[10px] font-bold text-stone-400 uppercase tracking-wider absolute">
                    Or register manually
                  </span>
                </div>
              </div>

              {/* Registration Form */}
              <form onSubmit={handleEmailRegister} className="space-y-3">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {/* 1. User Name */}
                  <div className="space-y-1">
                    <label className="text-[10px] font-bold text-[#030303] uppercase tracking-wider">
                      User Name / Full Name
                    </label>
                    <div className="relative">
                      <input
                        type="text"
                        name="userName"
                        required
                        value={formData.userName}
                        onChange={handleChange}
                        placeholder="Alex Morgan"
                        className="w-full pl-9 pr-3 py-2 bg-[#F1EFEC] border border-stone-200 rounded-xl text-xs focus:outline-none focus:bg-white focus:ring-2 focus:ring-[#123458]/40 transition-all text-[#030303]"
                      />
                      <FaUser className="absolute left-3 top-1/2 -translate-y-1/2 text-stone-400 text-xs" />
                    </div>
                  </div>

                  {/* 2. Email Address */}
                  <div className="space-y-1">
                    <label className="text-[10px] font-bold text-[#030303] uppercase tracking-wider">
                      Email Address
                    </label>
                    <div className="relative">
                      <input
                        type="email"
                        name="email"
                        required
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="alex@company.com"
                        className="w-full pl-9 pr-3 py-2 bg-[#F1EFEC] border border-stone-200 rounded-xl text-xs focus:outline-none focus:bg-white focus:ring-2 focus:ring-[#123458]/40 transition-all text-[#030303]"
                      />
                      <FaEnvelope className="absolute left-3 top-1/2 -translate-y-1/2 text-stone-400 text-xs" />
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {/* 3. Password */}
                  <div className="space-y-1">
                    <label className="text-[10px] font-bold text-[#030303] uppercase tracking-wider">
                      Password
                    </label>
                    <div className="relative">
                      <input
                        type="password"
                        name="password"
                        required
                        value={formData.password}
                        onChange={handleChange}
                        placeholder="••••••••"
                        className="w-full pl-9 pr-3 py-2 bg-[#F1EFEC] border border-stone-200 rounded-xl text-xs focus:outline-none focus:bg-white focus:ring-2 focus:ring-[#123458]/40 transition-all text-[#030303]"
                      />
                      <FaLock className="absolute left-3 top-1/2 -translate-y-1/2 text-stone-400 text-xs" />
                    </div>
                  </div>

                  {/* 4. Business Name */}
                  <div className="space-y-1">
                    <label className="text-[10px] font-bold text-[#030303] uppercase tracking-wider">
                      Business / Store Name
                    </label>
                    <div className="relative">
                      <input
                        type="text"
                        name="businessName"
                        required
                        value={formData.businessName}
                        onChange={handleChange}
                        placeholder="Apex Retail Ltd"
                        className="w-full pl-9 pr-3 py-2 bg-[#F1EFEC] border border-stone-200 rounded-xl text-xs focus:outline-none focus:bg-white focus:ring-2 focus:ring-[#123458]/40 transition-all text-[#030303]"
                      />
                      <FaBuilding className="absolute left-3 top-1/2 -translate-y-1/2 text-stone-400 text-xs" />
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {/* 5. Industry Dropdown */}
                  <div className="space-y-1">
                    <label className="text-[10px] font-bold text-[#030303] uppercase tracking-wider">
                      Industry
                    </label>
                    <div className="relative">
                      <select
                        name="industry"
                        value={formData.industry}
                        onChange={handleChange}
                        className="w-full pl-9 pr-3 py-2 bg-[#F1EFEC] border border-stone-200 rounded-xl text-xs focus:outline-none focus:bg-white focus:ring-2 focus:ring-[#123458]/40 transition-all text-[#030303] appearance-none"
                      >
                        {INDUSTRY_OPTIONS.map((ind) => (
                          <option key={ind} value={ind}>{ind}</option>
                        ))}
                      </select>
                      <FaBriefcase className="absolute left-3 top-1/2 -translate-y-1/2 text-stone-400 text-xs pointer-events-none" />
                    </div>
                  </div>

                  {/* 6. User Role Dropdown */}
                  <div className="space-y-1">
                    <label className="text-[10px] font-bold text-[#030303] uppercase tracking-wider">
                      User Role
                    </label>
                    <div className="relative">
                      <select
                        name="userRole"
                        value={formData.userRole}
                        onChange={handleChange}
                        className="w-full pl-9 pr-3 py-2 bg-[#F1EFEC] border border-stone-200 rounded-xl text-xs focus:outline-none focus:bg-white focus:ring-2 focus:ring-[#123458]/40 transition-all text-[#030303] appearance-none"
                      >
                        {ROLE_OPTIONS.map((role) => (
                          <option key={role} value={role}>{role}</option>
                        ))}
                      </select>
                      <FaUserTag className="absolute left-3 top-1/2 -translate-y-1/2 text-stone-400 text-xs pointer-events-none" />
                    </div>
                  </div>
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full text-white font-extrabold py-3 rounded-xl transition-all shadow-md mt-3 cursor-pointer text-xs hover:opacity-95 disabled:opacity-50"
                  style={{ backgroundColor: "#123458" }}
                >
                  {loading ? "Creating Account & Saving Data..." : "Complete Registration"}
                </button>
              </form>
            </div>
          )}

          <p className="text-[10px] text-stone-400 text-center mt-6">
            By registering, you agree to InvenTrack's{' '}
            <Link href="/terms" className="underline hover:text-stone-600">Terms</Link> and{' '}
            <Link href="/privacy" className="underline hover:text-stone-600">Privacy Policy</Link>.
          </p>
        </div>

      </div>
    </main>
  );
}