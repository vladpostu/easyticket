// Import the functions you need from the SDKs you need
//import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

import { getFirestore } from "firebase/firestore";
import { initializeApp } from "firebase/app"
import { getStorage } from "firebase/storage";
import { getAuth } from "firebase/auth"

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAYzU05BOCyEZwn5jdBEkNHRJ0VFtSL8i0",
  authDomain: "easyticket-65a56.firebaseapp.com",
  projectId: "easyticket-65a56",
  storageBucket: "easyticket-65a56.firebasestorage.app",
  messagingSenderId: "1089510162656",
  appId: "1:1089510162656:web:919825ad8d992826d8d085",
  measurementId: "G-3YM37HZJ5E"
};

// Initialize Firebase

const app = initializeApp(firebaseConfig)
export const db = getFirestore(app)
export const storage = getStorage();
export const auth = getAuth(app);
//const analytics = getAnalytics(app);