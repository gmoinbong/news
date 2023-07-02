import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from 'firebase/storage';

export const firebaseConfig = {
  apiKey: "AIzaSyAeStUOOr1CsAKVvlM3vlPCl7eo0V76NvI",
  authDomain: "news-517f9.firebaseapp.com",
  projectId: "news-517f9",
  storageBucket: "news-517f9.appspot.com",
  messagingSenderId: "147907557417",
  appId: "1:147907557417:web:991667809f4b6160e60438"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const storage = getStorage(app);
const auth = getAuth(app);

export { app, db, storage, auth };
