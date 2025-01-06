import html2canvas from 'html2canvas';
import { jsPDF } from 'jspdf';
import type { FormData } from '../../types/form';

export async function generatePDF(formData: FormData) {
  try {
    const formElement = document.getElementById('form-container');
    if (!formElement) throw new Error('Form container not found');

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
          // הגדלת הpadding של הטופס
          element.style.padding = '80px';
          element.style.background = 'white';
          
          const inputs = element.querySelectorAll('input, select, textarea');
          inputs.forEach(input => {
            const el = input as HTMLElement;
            // הגדלת הגובה והמרווח של האינפוטים
            el.style.margin = '20px 0';  // הגדלת margin
            el.style.minHeight = '50px';  // הגדלת גובה מינימלי
            el.style.padding = '12px 16px';  // הגדלת padding
            el.style.width = 'calc(100% - 32px)';
            el.style.background = 'white';
            el.style.border = '1px solid #000';
            el.style.fontSize = '16px';  // הגדלת גודל הטקסט
          });

          // הוספת מרווח בין השדות
          const formFields = element.querySelectorAll('.form-field');
          formFields.forEach(field => {
            (field as HTMLElement).style.marginBottom = '30px';
          });

          const textareas = element.querySelectorAll('textarea');
          textareas.forEach(textarea => {
            const el = textarea as HTMLElement;
            el.style.minHeight = '120px';
            el.style.lineHeight = '1.6';
          });

          const header = document.createElement('div');
          header.innerHTML = `
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 40px;">
              <img src="/movne-logo.png" style="height: 60px;" />
              <div style="text-align: left;">
                <div style="font-size: 14px;">תאריך: ${new Date().toLocaleDateString('he-IL')}</div>
                <div style="font-size: 14px;">שעה: ${new Date().toLocaleTimeString('he-IL')}</div>
              </div>
            </div>
          `;
          element.insertBefore(header, element.firstChild);
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

    const pageHeight = pdf.internal.pageSize.getHeight();
    const contentWidth = pdf.internal.pageSize.getWidth();
    const contentHeight = canvas.height * (contentWidth / canvas.width);
    const totalPages = Math.ceil(contentHeight / pageHeight);

    for (let i = 0; i < totalPages; i++) {
      if (i > 0) pdf.addPage();

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

      pdf.setFontSize(12);  // הגדלת גודל הטקסט של מספרי העמודים
      pdf.text(
        `עמוד ${i + 1} מתוך ${totalPages}`,
        pdf.internal.pageSize.getWidth() - 50,
        pdf.internal.pageSize.getHeight() - 30,
        { align: 'right' }
      );
    }

    return {
      pdfBlob: pdf.output('blob'),
      pdfBase64: pdf.output('datauristring')
    };

  } catch (error) {
    console.error('Error generating PDF:', error);
    throw error;
  }
}