import { jsPDF } from 'jspdf';
import type { FormData } from '../../types/form';

export async function generatePDF(formData: FormData) {
  try {
    const pdf = new jsPDF({
      orientation: 'portrait',
      unit: 'pt',
      format: 'a4',
      compress: true,
    });

    // מידות העמוד
    const pageWidth = pdf.internal.pageSize.getWidth();
    const pageHeight = pdf.internal.pageSize.getHeight();
    const margin = 40;
    const effectiveWidth = pageWidth - (2 * margin);

    // פונקציית עזר למדידת רוחב טקסט
    const getTextWidth = (text: string, fontSize: number): number => {
      pdf.setFontSize(fontSize);
      return pdf.getStringUnitWidth(text) * fontSize;
    };

    // פונקציית עזר לציור שדה עם תווית
    const drawField = (label: string, value: string | undefined, y: number, isRight = true) => {
      const safeValue = value || '';
      const x = isRight ? pageWidth - margin : margin + effectiveWidth / 2;
      const width = (effectiveWidth / 2) - 10;  // הגדלת רוחב התיבה
      const fieldPadding = 15;  // הגדלת המרווח הפנימי
      const boxHeight = 45;  // הגדלת גובה התיבה

      // תווית
      pdf.setFontSize(11);
      pdf.setTextColor(80, 80, 80);
      const labelY = y;
      pdf.text(label, x, labelY);

      // תיבת הקלט עם מרווח גדול יותר
      pdf.setDrawColor(200, 200, 200);
      pdf.setFillColor(255, 255, 255);
      const boxY = labelY + 5;
      pdf.roundedRect(x - width, boxY, width, boxHeight, 3, 3, 'FD');

      // טקסט הערך עם טיפול בגלישה
      pdf.setFontSize(12);
      pdf.setTextColor(0, 0, 0);
      const textY = boxY + 28;  // ממורכז אנכית בתיבה הגדולה יותר
      
      // טיפול בטקסט ארוך
      const maxWidth = width - (3 * fieldPadding);  // יותר מקום לטקסט
      let displayText = safeValue;
      let textWidth = getTextWidth(displayText, 12);
      
      if (textWidth > maxWidth) {
        // קיצור הטקסט והוספת נקודות
        while (textWidth > maxWidth && displayText.length > 0) {
          displayText = displayText.slice(0, -1);
          textWidth = getTextWidth(displayText + '...', 12);
        }
        displayText += '...';
      }

      pdf.text(displayText, x - width + fieldPadding, textY, { align: 'right' });

      return textY + 35;  // החזרת מיקום Y הבא עם מרווח גדול יותר
    };

    // כותרת וזמן
    const headerY = margin;
    const now = new Date();

    // לוגו
    try {
      await pdf.addImage('/movne-logo.png', 'PNG', pageWidth - margin - 60, headerY, 50, 50);
    } catch (error) {
      console.warn('Could not load logo:', error);
    }
    
    // מידע על התאריך והשעה
    pdf.setFontSize(10);
    pdf.text(`תאריך: ${now.toLocaleDateString('he-IL')}`, margin, headerY + 15);
    pdf.text(`שעה: ${now.toLocaleTimeString('he-IL')}`, margin, headerY + 30);

    // פרטים אישיים
    let currentY = headerY + 80;
    pdf.setFontSize(16);
    pdf.setTextColor(0, 0, 0);
    pdf.text('פרטים אישיים', pageWidth - margin, currentY);
    currentY += 40;  // מרווח מוגדל אחרי כותרת הסעיף

    const drawPersonalFields = () => {
      // שורה ראשונה - שם משפחה ושם פרטי
      currentY = drawField('שם משפחה', formData.personal?.lastName, currentY, true);
      currentY = drawField('שם פרטי', formData.personal?.firstName, currentY - 50, false);
      currentY += 35;  // מרווח מוגדל בין השורות

      // שורה שנייה - כתובת וטלפון
      currentY = drawField('כתובת', formData.personal?.address, currentY, true);
      currentY = drawField('טלפון', formData.personal?.phone, currentY - 50, false);
      currentY += 35;

      // שורה שלישית - תעסוקה ותאריך לידה
      currentY = drawField('תעסוקה', formData.personal?.occupation, currentY, true);
      currentY = drawField('תאריך לידה', formData.personal?.birthDate, currentY - 50, false);
      currentY += 35;

      // שורה רביעית - דוא"ל וחברה
      currentY = drawField('דוא"ל', formData.personal?.email, currentY, true);
      currentY = drawField('חברה', formData.personal?.company, currentY - 50, false);
      currentY += 45;  // מרווח נוסף לפני הסעיף הבא
    };

    drawPersonalFields();

    // שאלון השקעות
    pdf.setFontSize(16);
    pdf.text('שאלון השקעות', pageWidth - margin, currentY);
    currentY += 30;

    // סכום השקעה
    pdf.setFillColor(240, 247, 250);
    pdf.rect(margin, currentY - 5, effectiveWidth, 70, 'F');  // הגדלת הגובה
    
    pdf.setFontSize(12);
    pdf.text('סכום מתוכנן להשקעה:', pageWidth - margin - 10, currentY + 25);
    pdf.setFontSize(14);
    pdf.text(
      (formData.investment?.investmentAmount?.toLocaleString() || '0') + ' ₪',
      pageWidth - margin - 180,
      currentY + 25
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