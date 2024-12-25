// src/config/firebase.ts
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  // הקונפיגורציה שלך כאן
  apiKey: "AIzaSyABz82yg01JJcbNZBzlVWqYEu3LlzFP7PM",
  authDomain: "forms-7f40e.firebaseapp.com",
  projectId: "forms-7f40e",
  storageBucket: "forms-7f40e.appspot.com",
  messagingSenderId: "256898537105",
  appId: "1:256898537105:web:2c74f85e2cb2e170c7c84f"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const storage = getStorage(app);

export { app, db, storage };