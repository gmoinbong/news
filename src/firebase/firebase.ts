import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from 'firebase/storage';

export const firebaseConfig = {
  apiKey: "AIzaSyCeHXPBeKWT-J1u4tabp8oeGPhNWNl0NBQ",
  authDomain: "ring-bb297.firebaseapp.com",
  projectId: "ring-bb297",
  storageBucket: "ring-bb297.appspot.com",
  messagingSenderId: "952024322592",
  appId: "1:952024322592:web:b590e73ad83f9663a4e245",
  measurementId: "G-8J0CMXYYMX"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const storage = getStorage(app);
const auth = getAuth(app);

export { app, db, storage, auth };
