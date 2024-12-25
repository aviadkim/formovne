// src/services/firebase/storage.ts

import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { getFirestore, doc, setDoc } from 'firebase/firestore';
import type { FormData } from '../../types/form';

// Save PDF to Firebase Storage and metadata to Firestore
export async function savePDFToFirebase(pdfBlob: Blob, formData: FormData): Promise<string> {
  try {
    const storage = getStorage();
    const timestamp = Date.now();
    const path = `forms/${timestamp}.pdf`;
    const storageRef = ref(storage, path);

    // Upload PDF to Storage
    await uploadBytes(storageRef, pdfBlob);
    const downloadUrl = await getDownloadURL(storageRef);

    // Save metadata to Firestore
    const db = getFirestore();
    await setDoc(doc(db, 'forms', timestamp.toString()), {
      downloadUrl,
      timestamp,
      formData,
      status: 'completed'
    });

    return downloadUrl;
  } catch (error) {
    console.error('Error saving PDF to Firebase:', error);
    throw error;
  }
}

export async function savePersonalDetailsToFirebase(data: any): Promise<void> {
  try {
    const db = getFirestore();
    const timestamp = Date.now().toString();
    
    await setDoc(doc(db, 'personalDetails', timestamp), {
      ...data,
      timestamp: Date.now(),
      status: 'draft'
    });

    console.log('Personal details saved successfully');
  } catch (error) {
    console.error('Error saving personal details:', error);
    throw error;
  }
}

export async function saveTempImage(imageData: string): Promise<string> {
  try {
    const response = await fetch(imageData);
    const blob = await response.blob();
    return URL.createObjectURL(blob);
  } catch (error) {
    console.error('Error saving temp image:', error);
    throw error;
  }
}