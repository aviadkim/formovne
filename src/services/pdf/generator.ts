import html2canvas from 'html2canvas';
import { jsPDF } from 'jspdf';
import type { FormData } from '../../types/form';

export async function generatePDF(formData: FormData) {
  try {
    const formElement = document.getElementById('form-container');
    if (!formElement) throw new Error('Form container not found');

    // הוספת סטיילינג לפני הצילום
    formElement.classList.add('print-mode');
    
    // הגדרות צילום משופרות
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
          
          // הוספת כותרת עליונה
          const header = document.createElement('div');
          header.innerHTML = `
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 20px;">
              <img src="/movne-logo.png" style="height: 50px;" />
              <div style="text-align: left;">
                <div>תאריך: ${new Date().toLocaleDateString('he-IL')}</div>
                <div>שעה: ${new Date().toLocaleTimeString('he-IL')}</div>
              </div>
            </div>
          `;
          element.insertBefore(header, element.firstChild);
          
          // שיפור נראות השדות
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

    // יצירת PDF באיכות גבוהה
    const pdf = new jsPDF({
      orientation: 'portrait',
      unit: 'px',
      format: 'a4',
      compress: true,
      hotfixes: ['px_scaling']
    });

    // חישוב מספר עמודים
    const pageHeight = pdf.internal.pageSize.getHeight();
    const contentWidth = pdf.internal.pageSize.getWidth();
    const contentHeight = canvas.height * (contentWidth / canvas.width);
    const totalPages = Math.ceil(contentHeight / pageHeight);

    // הוספת כל העמודים
    for (let i = 0; i < totalPages; i++) {
      if (i > 0) pdf.addPage();

      // הוספת מספר עמוד
      pdf.setFontSize(10);
      pdf.text(
        `עמוד ${i + 1} מתוך ${totalPages}`,
        pdf.internal.pageSize.getWidth() - 20,
        pdf.internal.pageSize.getHeight() - 10
      );

      // הוספת התוכן
      pdf.addImage(
        canvas.toDataURL('image/jpeg', 1.0),
        'JPEG',
        0,
        -(pageHeight * i),
        contentWidth,
        contentHeight,
        undefined,
        'FAST'
      );
    }

    // הסרת סטיילינג זמני
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