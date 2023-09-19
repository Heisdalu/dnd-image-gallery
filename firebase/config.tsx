import { initializeApp, getApp, getApps } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBQ_5UOV-mz-lWK__g69b8HtUGUWZMWfLk",
  authDomain: "hng-stuff.firebaseapp.com",
  projectId: "hng-stuff",
  storageBucket: "hng-stuff.appspot.com",
  messagingSenderId: "415790716096",
  appId: "1:415790716096:web:2a87b3b0aa17e1e8fd0925",
  measurementId: "G-4DEHQD1VDD",
};

// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const auth = getAuth();

export const firebaseAuth = getAuth(app);
