// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBdqkWySQ5lH5UHA1zXODQWnQ-J8hwkmpc",
  authDomain: "quotes-2e087.firebaseapp.com",
  projectId: "quotes-2e087",
  storageBucket: "quotes-2e087.appspot.com",
  messagingSenderId: "327524409869",
  appId: "1:327524409869:web:302c987faf13d0bba0ab44",
  measurementId: "G-X2GHHR5MRV"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Cloud Firestore and get a reference to the service
export const db = getFirestore(app);