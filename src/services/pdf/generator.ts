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
          element.style.padding = '60px';
          element.style.background = 'white';
          
          const inputs = element.querySelectorAll('input, select, textarea');
          inputs.forEach(input => {
            const el = input as HTMLElement;
            el.style.margin = '10px 0';
            el.style.minHeight = '40px';
            el.style.padding = '8px 12px';
            el.style.width = 'calc(100% - 24px)';
            el.style.background = 'white';
            el.style.border = '1px solid #000';
          });

          const textareas = element.querySelectorAll('textarea');
          textareas.forEach(textarea => {
            const el = textarea as HTMLElement;
            el.style.minHeight = '100px';
            el.style.lineHeight = '1.5';
          });

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

      pdf.setFontSize(10);
      pdf.text(
        `עמוד ${i + 1} מתוך ${totalPages}`,
        pdf.internal.pageSize.getWidth() - 40,
        pdf.internal.pageSize.getHeight() - 20,
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