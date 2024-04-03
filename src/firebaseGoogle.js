// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBq0Q3wyxtxcLAMObc6JYbC5IparbHIeQg",
  authDomain: "vivu3mien-admin.firebaseapp.com",
  projectId: "vivu3mien-admin",
  storageBucket: "vivu3mien-admin.appspot.com",
  messagingSenderId: "1058964240468",
  appId: "1:1058964240468:web:f9fe829ea0a4e884e155c1",
  measurementId: "G-G5PKYF1CRP",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();
export { auth, provider };
