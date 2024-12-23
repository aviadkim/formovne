import { addDoc, collection, doc, updateDoc } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { db, storage } from './config';
import { FormData } from '../../types/form';

// Save initial personal details
export const savePersonalDetailsToFirebase = async (personalData: any) => {
  try {
    const docRef = await addDoc(collection(db, 'personalDetails'), {
      ...personalData,
      timestamp: new Date(),
      status: 'partial',
      formType: 'personal'
    });
    console.log('Personal details saved with ID:', docRef.id);
    return docRef.id;
  } catch (error) {
    console.error('Error saving personal details:', error);
    throw error;
  }
};

// Save complete form
export const saveFormToFirebase = async (formData: FormData) => {
  try {
    const docRef = await addDoc(collection(db, 'forms'), {
      ...formData,
      timestamp: new Date(),
      status: 'complete',
      formType: 'full'
    });
    console.log('Form saved with ID:', docRef.id);
    return docRef.id;
  } catch (error) {
    console.error('Error saving form:', error);
    throw error;
  }
};

// Save PDF to Firebase Storage
export const savePDFToFirebase = async (pdfBlob: Blob, formId: string): Promise<string> => {
  try {
    // Upload PDF to Storage
    const pdfRef = ref(storage, `forms/${formId}/form.pdf`);
    await uploadBytes(pdfRef, pdfBlob);
    const downloadUrl = await getDownloadURL(pdfRef);

    // Update form document with PDF URL
    const formRef = doc(db, 'forms', formId);
    await updateDoc(formRef, {
      pdfUrl: downloadUrl,
      pdfGeneratedAt: new Date()
    });

    console.log('PDF uploaded to Firebase:', downloadUrl);
    return downloadUrl;
  } catch (error) {
    console.error('Error saving PDF:', error);
    throw error;
  }
};