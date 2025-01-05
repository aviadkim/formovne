import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: "AIzaSyDf9QyOVRoRJHhKkrr5bMZCBPlM2uamCQY",
  authDomain: "client-d5bfe.firebaseapp.com",
  projectId: "client-d5bfe",
  storageBucket: "client-d5bfe.appspot.com",
  messagingSenderId: "662057251211",
  appId: "1:662057251211:web:8b3d314a4c3c75e7d0fb15"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const storage = getStorage(app);

export { app, db, storage };