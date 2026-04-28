import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyC8w2ItFdZGGxrU9SNx0YttpDZOsciTFjA",
  authDomain: "uplift-1f94a.firebaseapp.com",
  projectId: "uplift-1f94a",
  storageBucket: "uplift-1f94a.firebasestorage.app",
  messagingSenderId: "1082455994957",
  appId: "1:1082455994957:web:0cb7b32d4877790e8f6204",
  measurementId: "G-KM1Z4TXEXD"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();

export default app;
