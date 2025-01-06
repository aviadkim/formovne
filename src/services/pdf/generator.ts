import { jsPDF } from 'jspdf';
import type { FormData } from '../../types/form';

export async function generatePDF(formData: FormData) {
  try {
    const pdf = new jsPDF({
      orientation: 'portrait',
      unit: 'mm',
      format: 'a4',
      putOnlyUsedFonts: true,
      floatPrecision: 16
    });

    // מידות העמוד
    const pageWidth = pdf.internal.pageSize.getWidth();
    const pageHeight = pdf.internal.pageSize.getHeight();
    const margin = 20;  // שוליים של 20mm
    
    // הוספת לוגו
    const logoWidth = 40;
    const logoAspectRatio = 1;
    await pdf.addImage('/movne-logo.png', 'PNG', margin, margin, logoWidth, logoWidth * logoAspectRatio);

    // פונקציות עזר לעימוד
    const addTitle = (text: string, y: number) => {
      pdf.setFontSize(16);
      pdf.setTextColor(0, 0, 0);
      pdf.text(text, pageWidth - margin - 30, y, { align: 'right' });
      return y + 15;
    };

    const addFormField = (label: string, value: string, y: number, isRightSide = true) => {
      const x = isRightSide ? pageWidth - margin - 80 : margin + 10;
      
      // תווית השדה
      pdf.setFontSize(10);
      pdf.setTextColor(80, 80, 80);
      pdf.text(label, x, y);
      
      // תיבת הקלט
      pdf.setFontSize(12);
      pdf.setTextColor(0, 0, 0);
      const fieldY = y + 8;
      pdf.setDrawColor(200, 200, 200);
      pdf.setFillColor(255, 255, 255);
      pdf.roundedRect(x - 2, fieldY - 7, 70, 10, 2, 2, 'FD');
      
      // הערך עצמו
      pdf.text(value || '', x, fieldY);
      
      return y + 20;
    };

    const addRadioOption = (text: string, checked: boolean, x: number, y: number) => {
      // עיגול הרדיו
      pdf.setDrawColor(150, 150, 150);
      pdf.circle(x, y, 3, checked ? 'FD' : 'D');
      
      // טקסט האפשרות
      pdf.setFontSize(10);
      pdf.text(text, x + 7, y + 1, { align: 'left' });
      
      return x + 40;
    };

    const addProgressBar = (min: string, max: string, value: number, y: number) => {
      const barWidth = 120;
      const barHeight = 6;
      const x = pageWidth / 2 - barWidth / 2;
      
      // רקע הפס
      pdf.setFillColor(240, 240, 240);
      pdf.roundedRect(x, y, barWidth, barHeight, 1, 1, 'F');
      
      // הפס עצמו
      pdf.setFillColor(0, 150, 136);
      pdf.roundedRect(x, y, barWidth * (value / 100), barHeight, 1, 1, 'F');
      
      // טקסט מינימום ומקסימום
      pdf.setFontSize(8);
      pdf.text(min, x - 2, y + 5, { align: 'right' });
      pdf.text(max, x + barWidth + 2, y + 5, { align: 'left' });
      
      return y + 15;
    };

    // פרטים אישיים
    let currentY = margin + 40;
    currentY = addTitle('פרטים אישיים', currentY);

    currentY = addFormField('שם משפחה', formData.lastName || '', currentY, true);
    currentY = addFormField('שם פרטי', formData.firstName || '', currentY - 20, false);

    currentY = addFormField('כתובת', formData.address || '', currentY, true);
    currentY = addFormField('טלפון', formData.phone || '', currentY - 20, false);

    currentY = addFormField('תעסוקה', formData.occupation || '', currentY, true);
    currentY = addFormField('תאריך לידה', formData.birthDate || '', currentY - 20, false);

    currentY = addFormField('דוא"ל', formData.email || '', currentY, true);
    currentY = addFormField('חברה', formData.company || '', currentY - 20, false);

    currentY += 10;

    // שאלון השקעות
    currentY = addTitle('שאלון השקעות', currentY);

    currentY = addFormField('סכום מתוכנן להשקעה', formData.investmentAmount?.toString() || '', currentY, true);
    currentY += 10;

    // הערכת סיכונים
    currentY = addTitle('הערכת סיכונים', currentY);

    pdf.setFontSize(12);
    pdf.text('המטרה העיקרית של ההשקעה:', pageWidth - margin - 30, currentY, { align: 'right' });
    currentY += 10;

    let x = pageWidth - margin - 30;
    x = addRadioOption('לטווח ארוך', true, x, currentY);
    x = addRadioOption('לטווח בינוני', false, x, currentY);
    x = addRadioOption('לטווח קצר', false, x, currentY);
    currentY += 20;

    pdf.text('סיכון ההשקעה הרצוי:', pageWidth - margin - 30, currentY, { align: 'right' });
    currentY += 10;

    currentY = addProgressBar('סיכון נמוך', 'סיכון גבוה', 75, currentY);
    currentY += 10;

    // חתימה והסכמה
    currentY = addTitle('הצהרה וחתימה', currentY);
    
    pdf.setFontSize(10);
    pdf.setTextColor(100, 100, 100);
    const disclaimer = 'אני מצהיר/ה בזאת כי כל הפרטים שמסרתי נכונים ומדויקים. ידוע לי כי המידע ישמש לצורך הערכת התאמת ההשקעה עבורי.';
    pdf.text(disclaimer, pageWidth - margin, currentY, { align: 'right', maxWidth: pageWidth - 2 * margin });

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