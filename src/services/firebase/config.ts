import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: "AIzaSyBlrfwQJmkUSnqoNZp3bxfH9DH0QuuJtMs",
  authDomain: "client-d5bfe.firebaseapp.com",
  projectId: "client-d5bfe",
  storageBucket: "client-d5bfe.appspot.com",
  messagingSenderId: "678297464867",
  appId: "1:678297464867:web:2c929a45d2e9f0cdb68196"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const storage = getStorage(app);
