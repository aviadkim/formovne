import { jsPDF } from 'jspdf';
import { FormData } from '../../types/form';

export async function generatePDF(formData: FormData): Promise<{ pdfBlob: Blob; pngImages: string[] }> {
  const pngImages: string[] = [];
  
  // יצירת PDF חדש
  const doc = new jsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format: 'a4'
  });

  try {
    const formElement = document.getElementById('form-container');
    if (!formElement) {
      throw new Error('Form container not found');
    }

    // תפיסת התמונה של הטופס
    const canvas = await window.html2canvas(formElement);

    // שמירת התמונה
    const imageData = canvas.toDataURL('image/png');
    pngImages.push(imageData);

    // מידות הדף
    const pageWidth = doc.internal.pageSize.getWidth();
    const pageHeight = doc.internal.pageSize.getHeight();

    // הוספת התמונה לPDF
    doc.addImage(
      imageData,
      'PNG',
      0,
      0,
      pageWidth,
      pageHeight
    );

    // אם התמונה ארוכה מדי, נוסיף עמודים נוספים
    const imgHeight = canvas.height * pageWidth / canvas.width;
    let remainingHeight = imgHeight - pageHeight;
    let currentPosition = -pageHeight;

    while (remainingHeight > 0) {
      doc.addPage();
      doc.addImage(
        imageData,
        'PNG',
        0,
        currentPosition,
        pageWidth,
        imgHeight
      );
      remainingHeight -= pageHeight;
      currentPosition -= pageHeight;
    }

    return {
      pdfBlob: doc.output('blob'),
      pngImages
    };

  } catch (error) {
    console.error('Error generating PDF:', error);
    throw error;
  }
}