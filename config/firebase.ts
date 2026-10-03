import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";


// Your InvenTrack Firebase Web Client Configuration
// const firebaseConfig = {
//   apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY || "AIzaSyAYukoUjWUbgBOKoHw3PFBoMlKwDzgO-Nc",
//   authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN || "inventrack01-4f853.firebaseapp.com",
//   projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID || "inventrack01-4f853",
//   storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET || "inventrack01-4f853.firebasestorage.app",
//   messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID || "99980013130",
//   appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID || "1:99980013130:web:6a81746e1b660acc0dc0b3"
// };

const firebaseConfig = {
  apiKey: "AIzaSyDdUSrSnOGhAP4KU9FdElwUc8DaIpKMDSY",
  authDomain: "inventrack02.firebaseapp.com",
  projectId: "inventrack02",
  storageBucket: "inventrack02.firebasestorage.app",
  messagingSenderId: "104789900505",
  appId: "1:104789900505:web:8661235b284a99001d92c8"
};
// Initialize Firebase once to prevent Next.js hot-reloading errors
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();

export const auth = getAuth(app);
export const db = getFirestore(app);
export const googleProvider = new GoogleAuthProvider();

export default app;