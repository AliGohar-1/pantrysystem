// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBkUFf1eJZe8ytowLFKAM50LcQSjBWZgEo",
  authDomain: "inventory-management-1e52a.firebaseapp.com",
  projectId: "inventory-management-1e52a",
  storageBucket: "inventory-management-1e52a.appspot.com",
  messagingSenderId: "907534576559",
  appId: "1:907534576559:web:8c551d5ab91c5e59fa9d5a",
  measurementId: "G-3GYEBCDJCS"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const firestore = getFirestore(app)

export {firestore}