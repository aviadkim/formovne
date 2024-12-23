import { jsPDF } from 'jspdf';
import { FormData } from '../../types/form';

export async function generatePDF(formData: FormData): Promise<Blob> {
  // Create new document
  const doc = new jsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format: 'a4'
  });

  try {
    // Set RTL mode
    doc.setR2L(true);
    
    // Add title
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(20);
    doc.text('הסכם שיווק השקעות', 105, 20, { align: 'center' });
    
    // Personal Details Section
    doc.setFontSize(16);
    doc.text('פרטים אישיים', 190, 40, { align: 'right' });
    doc.setFontSize(12);
    if (formData.personal) {
      const { firstName, lastName, phone, email, address, birthDate, occupation, company } = formData.personal;
      doc.text(`שם מלא: ${firstName || ''} ${lastName || ''}`, 190, 50, { align: 'right' });
      doc.text(`טלפון: ${phone || ''}`, 190, 60, { align: 'right' });
      doc.text(`דוא"ל: ${email || ''}`, 190, 70, { align: 'right' });
      doc.text(`כתובת: ${address || ''}`, 190, 80, { align: 'right' });
      doc.text(`תאריך לידה: ${birthDate || ''}`, 190, 90, { align: 'right' });
      doc.text(`תעסוקה: ${occupation || ''}`, 190, 100, { align: 'right' });
      doc.text(`חברה: ${company || ''}`, 190, 110, { align: 'right' });
    }

    // Investment Details Section
    doc.setFontSize(16);
    doc.text('פרטי השקעה', 190, 130, { align: 'right' });
    doc.setFontSize(12);
    if (formData.investment) {
      const { investmentAmount, selectedBank, currencies, purposes } = formData.investment;
      doc.text(`סכום השקעה: ${investmentAmount?.toLocaleString() || ''} ₪`, 190, 140, { align: 'right' });
      doc.text(`בנק נבחר: ${selectedBank || ''}`, 190, 150, { align: 'right' });
      
      // Currencies
      if (currencies) {
        const selectedCurrencies = Object.entries(currencies)
          .filter(([_, selected]) => selected)
          .map(([currency]) => currency)
          .join(', ');
        doc.text(`מטבעות: ${selectedCurrencies}`, 190, 160, { align: 'right' });
      }

      // Investment Purposes
      if (purposes) {
        const selectedPurposes = Object.entries(purposes)
          .filter(([_, selected]) => selected)
          .map(([purpose]) => purpose)
          .join(', ');
        doc.text(`מטרות השקעה: ${selectedPurposes}`, 190, 170, { align: 'right' });
      }
    }

    // Risk Assessment Section
    doc.setFontSize(16);
    doc.text('הערכת סיכונים', 190, 190, { align: 'right' });
    doc.setFontSize(12);
    if (formData.risk) {
      const { mainGoal, investmentPeriod, investmentPercentage } = formData.risk;
      doc.text(`מטרת השקעה: ${mainGoal || ''}`, 190, 200, { align: 'right' });
      doc.text(`תקופת השקעה: ${investmentPeriod || ''}`, 190, 210, { align: 'right' });
      doc.text(`אחוז מסך הנכסים: ${investmentPercentage || ''}`, 190, 220, { align: 'right' });
    }

    // Add signature if exists
    if (formData.declarations?.signature) {
      doc.addImage(formData.declarations.signature, 'PNG', 130, 240, 60, 30);
      doc.text('חתימת הלקוח:', 190, 235, { align: 'right' });
    }

    // Add current date
    const currentDate = new Date().toLocaleDateString('he-IL');
    doc.text(`תאריך: ${currentDate}`, 190, 260, { align: 'right' });

    return doc.output('blob');
  } catch (error) {
    console.error('Error generating PDF:', error);
    throw error;
  }
}