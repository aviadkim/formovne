import { FormData } from '../../types/form';

export async function generatePDF(formData: FormData): Promise<Blob> {
  // כאן נוסיף את הלוגיקה של יצירת PDF
  // בינתיים מחזיר PDF ריק
  const pdfBlob = new Blob([''], { type: 'application/pdf' });
  return pdfBlob;
}

export default generatePDF;