import { jsPDF } from 'jspdf';
import type { FormData } from '../../types/form';

export async function generatePDF(formData: FormData) {
  try {
    const pdf = new jsPDF({
      orientation: 'portrait',
      unit: 'pt', // שימוש בפיקסלים לדיוק מירבי
      format: 'a4',
      compress: true
    });

    // מידות העמוד
    const pageWidth = pdf.internal.pageSize.getWidth();
    const pageHeight = pdf.internal.pageSize.getHeight();
    const margin = 40;
    const effectiveWidth = pageWidth - (2 * margin);

    // פונקציית עזר לציור שדה עם תווית
    const drawField = (label: string, value: string, y: number, isRight = true) => {
      // מיקום בהתאם לצד
      const x = isRight ? pageWidth - margin : margin + effectiveWidth / 2;
      const width = (effectiveWidth / 2) - 20;

      // תווית
      pdf.setFontSize(10);
      pdf.setTextColor(100, 100, 100);
      const labelY = y;
      pdf.text(label, x, labelY);

      // תיבת הקלט
      pdf.setDrawColor(220, 220, 220);
      pdf.setFillColor(255, 255, 255);
      const boxY = labelY + 5;
      pdf.roundedRect(x - width, boxY, width, 30, 3, 3, 'FD');

      // ערך
      pdf.setFontSize(11);
      pdf.setTextColor(0, 0, 0);
      const textY = boxY + 20;
      pdf.text(value || '', x - width + 10, textY);

      return textY + 20; // מחזיר את הגובה הבא
    };

    // כותרת וזמן
    const headerY = margin;
    const now = new Date();

    // לוגו
    await pdf.addImage('/movne-logo.png', 'PNG', pageWidth - margin - 60, headerY, 50, 50);
    
    // מידע על התאריך והשעה
    pdf.setFontSize(10);
    pdf.text(`תאריך: ${now.toLocaleDateString('he-IL')}`, margin, headerY + 15);
    pdf.text(`שעה: ${now.toLocaleTimeString('he-IL')}`, margin, headerY + 30);

    // פרטים אישיים
    let currentY = headerY + 80;
    pdf.setFontSize(16);
    pdf.text('פרטים אישיים', pageWidth - margin, currentY);
    currentY += 30;

    // שורה ראשונה - שם משפחה ושם פרטי
    currentY = drawField('שם משפחה', formData.personal.lastName, currentY, true);
    currentY = drawField('שם פרטי', formData.personal.firstName, currentY - 50, false);
    currentY += 20;

    // שורה שנייה - כתובת וטלפון
    currentY = drawField('כתובת', formData.personal.address, currentY, true);
    currentY = drawField('טלפון', formData.personal.phone, currentY - 50, false);
    currentY += 20;

    // שורה שלישית - תעסוקה ותאריך לידה
    currentY = drawField('תעסוקה', formData.personal.occupation, currentY, true);
    currentY = drawField('תאריך לידה', formData.personal.birthDate, currentY - 50, false);
    currentY += 20;

    // שורה רביעית - דוא"ל וחברה
    currentY = drawField('דוא"ל', formData.personal.email, currentY, true);
    currentY = drawField('חברה', formData.personal.company, currentY - 50, false);
    currentY += 40;

    // שאלון השקעות
    pdf.setFontSize(16);
    pdf.text('שאלון השקעות', pageWidth - margin, currentY);
    currentY += 30;

    // סכום השקעה
    pdf.setFillColor(240, 247, 250);
    pdf.rect(margin, currentY - 5, effectiveWidth, 60, 'F');
    
    pdf.setFontSize(12);
    pdf.text('סכום מתוכנן להשקעה:', pageWidth - margin - 10, currentY + 20);
    pdf.setFontSize(14);
    pdf.text(
      formData.investment.investmentAmount?.toLocaleString() || '0',
      pageWidth - margin - 180,
      currentY + 20
    );

    // מספרי עמודים
    pdf.setFontSize(10);
    pdf.text(
      '1/1',
      pageWidth - margin,
      pageHeight - margin,
      { align: 'right' }
    );

    return {
      pdfBlob: pdf.output('blob'),
      pdfBase64: pdf.output('datauristring')
    };

  } catch (error) {
    console.error('Error generating PDF:', error);
    throw error;
  }
}