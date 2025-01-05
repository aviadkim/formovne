import { db, storage } from '../../config/firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';

// פונקציה לשמירת כל הטופס
export const saveFormToFirebase = async (formData: any) => {
  try {
    console.log('Starting form submission to Firebase...', formData);
    
    // שמירה ב-Firestore
    const docRef = await addDoc(collection(db, 'forms'), {
      ...formData,
      createdAt: serverTimestamp()
    });

    console.log('Form data saved to Firestore with ID:', docRef.id);
    return { success: true, docId: docRef.id };

  } catch (error) {
    console.error('Error saving form to Firebase:', error);
    throw error;
  }
};

// פונקציה לשמירת ה-PDF
export const savePDFToFirebase = async (pdfBlob: Blob, lastName: string) => {
  try {
    console.log('Starting PDF upload to Firebase Storage...');
    
    const fileName = `forms/${Date.now()}_${lastName}.pdf`;
    const storageRef = ref(storage, fileName);
    
    // העלאת הקובץ
    await uploadBytes(storageRef, pdfBlob);
    console.log('PDF uploaded successfully');
    
    // קבלת URL להורדה
    const pdfUrl = await getDownloadURL(storageRef);
    console.log('PDF URL generated:', pdfUrl);
    
    return pdfUrl;

  } catch (error) {
    console.error('Error uploading PDF:', error);
    throw error;
  }
};

// פונקציה לשליחת מיילים
export const sendFormEmails = async (formData: any, pdfUrl: string) => {
  try {
    console.log('Preparing to send emails...');
    
    const emailContent = {
      to: [formData.personal.email, 'info@movne.co.il'],
      subject: 'טופס השקעה חדש - מובנה',
      html: `
        <div dir="rtl">
          <h2>פרטי הטופס:</h2>
          <p>שם: ${formData.personal.firstName} ${formData.personal.lastName}</p>
          <p>אימייל: ${formData.personal.email}</p>
          <p>טלפון: ${formData.personal.phone}</p>
          <p>סכום השקעה: ${formData.investment?.amount || 'לא צוין'}</p>
          <p><a href="${pdfUrl}">לחץ כאן לצפייה בטופס המלא</a></p>
        </div>
      `
    };

    console.log('Email content prepared:', emailContent);
    
    // TODO: להוסיף את שירות שליחת המיילים
    
    return true;

  } catch (error) {
    console.error('Error sending emails:', error);
    return false;
  }
};