import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: "AIzaSyCAcAzNCbM8BgdGYIHKVj4UKmtP2CDxQRI",
  authDomain: "client-d5bfe.firebaseapp.com",
  projectId: "client-d5bfe",
  storageBucket: "client-d5bfe.appspot.com",
  messagingSenderId: "125656223972",
  appId: "1:125656223972:web:c40cb29b4f5d62fc1d5f43"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const storage = getStorage(app);