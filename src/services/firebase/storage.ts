import { db, storage } from '../../config/firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';

export const saveFormToFirebase = async (formData: any, pdfBlob: Blob) => {
  try {
    // Upload PDF to Storage
    const fileName = `forms/${Date.now()}_${formData.personal.lastName}.pdf`;
    const storageRef = ref(storage, fileName);
    await uploadBytes(storageRef, pdfBlob);
    const pdfUrl = await getDownloadURL(storageRef);

    // Save form data to Firestore
    const docRef = await addDoc(collection(db, 'forms'), {
      ...formData,
      pdfUrl,
      createdAt: serverTimestamp()
    });

    // Send emails
    await sendFormEmails(formData.personal.email, 'info@movne.co.il', pdfUrl, formData);

    console.log('Form saved successfully with ID:', docRef.id);
    return { success: true, docId: docRef.id };

  } catch (error) {
    console.error('Error saving form:', error);
    throw error;
  }
};

const sendFormEmails = async (userEmail: string, adminEmail: string, pdfUrl: string, formData: any) => {
  try {
    const emailData = {
      to: [userEmail, adminEmail],
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

    // Here you would integrate with your email service
    // This is a placeholder - you'll need to implement the actual email sending
    console.log('Would send email with:', emailData);
    
  } catch (error) {
    console.error('Error sending emails:', error);
  }
};