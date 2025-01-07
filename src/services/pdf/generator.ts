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

    // Load Hebrew font (Make sure you have the font file in your public folder)
    pdf.addFont('public/fonts/Arial.ttf', 'Arial', 'normal');
    pdf.setFont('Arial');

    // Page dimensions
    const pageWidth = pdf.internal.pageSize.getWidth();
    const pageHeight = pdf.internal.pageSize.getHeight();
    const margin = 40;
    const effectiveWidth = pageWidth - (2 * margin);

    // Helper function to measure text width
    const getTextWidth = (text: string, fontSize: number): number => {
      pdf.setFontSize(fontSize);
      return pdf.getStringUnitWidth(text) * fontSize;
    };

    // Helper function to draw a field with label
    const drawField = (label: string, value: string | undefined, y: number, isRight = true) => {
      const safeValue = value || '';
      const x = isRight ? pageWidth - margin : margin + effectiveWidth / 2;
      const width = (effectiveWidth / 2) - 20;
      const fieldPadding = 10;

      // Label
      pdf.setFontSize(11);
      pdf.setTextColor(80, 80, 80);
      const labelY = y;
      pdf.text(label, x, labelY);

      // Input box with more padding
      pdf.setDrawColor(200, 200, 200);
      pdf.setFillColor(255, 255, 255);
      const boxY = labelY + 5;
      pdf.roundedRect(x - width, boxY, width, 35, 3, 3, 'FD'); // Increased height to 35

      // Value text with overflow handling
      pdf.setFontSize(12);
      pdf.setTextColor(0, 0, 0);
      const textY = boxY + 23; // Centered vertically in the larger box
      
      // Handle text overflow
      const maxWidth = width - (2 * fieldPadding);
      let displayText = safeValue;
      let textWidth = getTextWidth(displayText, 12);
      
      if (textWidth > maxWidth) {
        // Truncate text and add ellipsis
        while (textWidth > maxWidth && displayText.length > 0) {
          displayText = displayText.slice(0, -1);
          textWidth = getTextWidth(displayText + '...', 12);
        }
        displayText += '...';
      }

      pdf.text(displayText, x - width + fieldPadding, textY, { align: 'right' });

      return textY + 25; // Return next Y position with more spacing
    };

    // Header and timestamp
    const headerY = margin;
    const now = new Date();

    // Logo
    try {
      await pdf.addImage('/movne-logo.png', 'PNG', pageWidth - margin - 60, headerY, 50, 50);
    } catch (error) {
      console.warn('Could not load logo:', error);
    }
    
    // Date and time info
    pdf.setFontSize(10);
    pdf.text(`תאריך: ${now.toLocaleDateString('he-IL')}`, margin, headerY + 15);
    pdf.text(`שעה: ${now.toLocaleTimeString('he-IL')}`, margin, headerY + 30);

    // Personal Details Section
    let currentY = headerY + 80;
    pdf.setFontSize(16);
    pdf.setTextColor(0, 0, 0);
    pdf.text('פרטים אישיים', pageWidth - margin, currentY);
    currentY += 40; // Increased spacing after section title

    // Draw personal information fields with more spacing
    const drawPersonalFields = () => {
      // First row - Last name and First name
      currentY = drawField('שם משפחה', formData.personal?.lastName, currentY, true);
      currentY = drawField('שם פרטי', formData.personal?.firstName, currentY - 50, false);
      currentY += 25;

      // Second row - Address and Phone
      currentY = drawField('כתובת', formData.personal?.address, currentY, true);
      currentY = drawField('טלפון', formData.personal?.phone, currentY - 50, false);
      currentY += 25;

      // Third row - Occupation and Birth Date
      currentY = drawField('תעסוקה', formData.personal?.occupation, currentY, true);
      currentY = drawField('תאריך לידה', formData.personal?.birthDate, currentY - 50, false);
      currentY += 25;

      // Fourth row - Email and Company
      currentY = drawField('דוא"ל', formData.personal?.email, currentY, true);
      currentY = drawField('חברה', formData.personal?.company, currentY - 50, false);
      currentY += 45; // Extra spacing before next section
    };

    drawPersonalFields();

    // Investment Questionnaire Section
    pdf.setFontSize(16);
    pdf.text('שאלון השקעות', pageWidth - margin, currentY);
    currentY += 30;

    // Investment Amount
    pdf.setFillColor(240, 247, 250);
    pdf.rect(margin, currentY - 5, effectiveWidth, 70, 'F'); // Increased height
    
    pdf.setFontSize(12);
    pdf.text('סכום מתוכנן להשקעה:', pageWidth - margin - 10, currentY + 25);
    pdf.setFontSize(14);
    pdf.text(
      (formData.investment?.investmentAmount?.toLocaleString() || '0') + ' ₪',
      pageWidth - margin - 180,
      currentY + 25
    );

    // Page numbers
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