// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCfBsUtRuB4EVhjGVBQIiVYltV03XL6TU4",
  authDomain: "trip-ai-planner.firebaseapp.com",
  projectId: "trip-ai-planner",
  storageBucket: "trip-ai-planner.appspot.com",
  messagingSenderId: "451681470686",
  appId: "1:451681470686:web:c8d56fb63b060bb86bda4f",
  measurementId: "G-ZF483MF99D"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app)
// const analytics = getAnalytics(app);