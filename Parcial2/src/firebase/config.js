// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCb_rDP7z-IGFswII7D87rQCa7FyIpw9gw",
  authDomain: "parcial2-9bd98.firebaseapp.com",
  projectId: "parcial2-9bd98",
  storageBucket: "parcial2-9bd98.firebasestorage.app",
  messagingSenderId: "386286491039",
  appId: "1:386286491039:web:57535f0db2b8d8ba8c59aa",
  measurementId: "G-6HV08T4261"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth();

export { app, analytics, auth };