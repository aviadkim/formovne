import { db } from './config';
import { collection, addDoc, Timestamp } from 'firebase/firestore';

export const saveFormToFirebase = async (formData: any) => {
  try {
    const docRef = await addDoc(collection(db, 'forms'), {
      ...formData,
      createdAt: Timestamp.now()
    });
    console.log("Form saved with ID: ", docRef.id);
    return docRef.id;
  } catch (error) {
    console.error("Error saving form: ", error);
    throw error;
  }
};
