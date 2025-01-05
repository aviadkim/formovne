import { db, storage } from '../../config/firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { generatePDF } from '../pdf/generator';

interface FormResponse {
  success: boolean;
  docId?: string;
  pdfUrl?: string;
  error?: string;
}

export const saveFormToFirebase = async (formData: any): Promise<FormResponse> => {
  try {
    // ולידציה בסיסית
    if (!formData.personal?.email || !formData.personal?.phone) {
      throw new Error('חסרים פרטים בסיסיים');
    }

    // יצירת PDF
    const { pdfBlob } = await generatePDF(formData);
    
    // העלאה ל-Storage
    const fileName = `forms/${Date.now()}_${formData.personal.lastName}.pdf`;
    const storageRef = ref(storage, fileName);
    await uploadBytes(storageRef, pdfBlob);
    const pdfUrl = await getDownloadURL(storageRef);

    // שמירה ב-Firestore
    const docRef = await addDoc(collection(db, 'forms'), {
      ...formData,
      pdfUrl,
      createdAt: serverTimestamp(),
      status: 'new',
      metadata: {
        userAgent: navigator.userAgent,
        timestamp: new Date().toISOString(),
        version: '1.0'
      }
    });

    // שליחת מייל
    await sendFormEmails({
      to: [formData.personal.email, 'info@movne.co.il'],
      subject: 'טופס השקעה חדש - מובנה',
      pdfUrl,
      formData
    });

    console.log('Form saved successfully', { docId: docRef.id, pdfUrl });
    return { 
      success: true, 
      docId: docRef.id, 
      pdfUrl 
    };

  } catch (err) {
    console.error('Error saving form:', err);
    const error = err as Error;
    return {
      success: false,
      error: error?.message || 'אירעה שגיאה בשמירת הטופס'
    };
  }
};

interface EmailData {
  to: string[];
  subject: string;
  pdfUrl: string;
  formData: any;
}

const sendFormEmails = async (emailData: EmailData): Promise<boolean> => {
  try {
    // כאן יהיה החיבור לשירות המיילים שלך
    // לדוגמה: SendGrid, AWS SES, וכו'
    console.log('Would send email:', emailData);
    return true;
  } catch (err) {
    console.error('Error sending emails:', err);
    return false;
  }
};