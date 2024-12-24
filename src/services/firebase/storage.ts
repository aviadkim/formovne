import { addDoc, collection, doc, updateDoc } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { db, storage } from './config';
import { FormData } from '../../types/form';

// שמירת פרטים אישיים
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

// שמירת הטופס המלא
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

// שמירת ה-PDF ב-Storage
export const savePDFToFirebase = async (pdfBlob: Blob, formId: string): Promise<string> => {
  try {
    const date = new Date();
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    
    // יצירת נתיב מסודר לפי תאריך
    const path = `forms/${year}/${month}/${day}/${formId}.pdf`;
    const storageRef = ref(storage, path);
    
    // העלאת הקובץ ל-Storage
    await uploadBytes(storageRef, pdfBlob);
    const downloadUrl = await getDownloadURL(storageRef);

    // עדכון המסמך ב-Firestore עם הנתיב וה-URL
    const formRef = doc(db, 'forms', formId);
    await updateDoc(formRef, {
      pdfUrl: downloadUrl,
      pdfPath: path,
      pdfGeneratedAt: date,
      status: 'completed_with_pdf'
    });

    console.log('PDF saved successfully:', downloadUrl);
    return downloadUrl;
  } catch (error) {
    console.error('Error saving PDF:', error);
    throw error;
  }
};