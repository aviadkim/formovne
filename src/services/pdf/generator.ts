// src/services/pdf/generator.ts
import html2canvas from 'html2canvas';
import { jsPDF } from 'jspdf';
import type { FormData } from '../../types/form';

export async function generatePDF(formData: FormData) {
  try {
    const formElement = document.getElementById('form-container');
    if (!formElement) throw new Error('Form container not found');

    // הוספת מחלקה זמנית לשיפור סגנון ההדפסה
    formElement.classList.add('print-mode');

    // שיפור איכות הצילום
    const canvas = await html2canvas(formElement, {
      scale: 2,
      useCORS: true,
      allowTaint: true,
      logging: false,
      windowHeight: formElement.scrollHeight,
      height: formElement.scrollHeight,
      onclone: (clonedDoc) => {
        const element = clonedDoc.getElementById('form-container');
        if (element) {
          element.style.padding = '40px';
          element.style.background = 'white';
          
          // שיפור נראות התיבות
          const inputs = element.querySelectorAll('input, select, textarea');
          inputs.forEach(input => {
            const el = input as HTMLElement;
            el.style.border = '1px solid #000';
            el.style.padding = '8px';
            el.style.minHeight = '40px';
            el.style.background = 'white';
          });
        }
      }
    });

    // הגדרת גודל A4
    const pdf = new jsPDF({
      orientation: 'portrait',
      unit: 'px',
      format: 'a4',
      compress: true
    });

    // חישוב יחס דפים
    const pageHeight = pdf.internal.pageSize.getHeight();
    const contentHeight = canvas.height * (pdf.internal.pageSize.getWidth() / canvas.width);
    const totalPages = Math.ceil(contentHeight / pageHeight);

    // הוספת כל הדפים
    for (let i = 0; i < totalPages; i++) {
      if (i > 0) {
        pdf.addPage();
      }

      pdf.addImage(
        canvas.toDataURL('image/jpeg', 1.0),
        'JPEG',
        0,
        -(pageHeight * i),
        pdf.internal.pageSize.getWidth(),
        contentHeight,
        undefined,
        'FAST'
      );
    }

    // הסרת המחלקה הזמנית
    formElement.classList.remove('print-mode');

    return {
      pdfBlob: pdf.output('blob'),
      pdfBase64: pdf.output('datauristring')
    };

  } catch (error) {
    console.error('Error generating PDF:', error);
    throw error;
  }
}