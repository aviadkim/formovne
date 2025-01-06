import type { FormData } from '../types/form';

export async function sendEmail(pdfUrl: string, formData: FormData) {
  try {
    const emailData = {
      to: 'info@movne.co.il',
      subject: 'טופס חדש התקבל',
      text: `
        טופס חדש התקבל במערכת

        פרטי הטופס:
        שם: ${formData.personal.firstName} ${formData.personal.lastName}
        טלפון: ${formData.personal.phone}
        דוא"ל: ${formData.personal.email}

        לצפייה בטופס: ${pdfUrl}
      `,
      attachments: [{ filename: 'form.pdf', path: pdfUrl }]
    };
    
    return emailData;
  } catch (error) {
    console.error('Error sending email:', error);
    throw error;
  }
}