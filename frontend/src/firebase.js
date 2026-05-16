import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyAuITysevmgb3Aiz6gr-KlP6KNu9jrfCVY",
  authDomain: "chatterverse-32255.firebaseapp.com",
  projectId: "chatterverse-32255",
  storageBucket: "chatterverse-32255.firebasestorage.app",
  messagingSenderId: "968968058926",
  appId: "1:968968058926:web:37e2fcd279db51743c47bf",
  measurementId: "G-50B7ZL7NXS"
};

const app = initializeApp(firebaseConfig);
export const analytics = getAnalytics(app);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();

export default app;
