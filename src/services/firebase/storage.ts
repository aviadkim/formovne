import { PersonalData } from '../../types/form';

export const savePersonalDetailsToFirebase = async (data: PersonalData): Promise<string> => {
  try {
    // יצירת מזהה ייחודי לפי תאריך
    const timestamp = Date.now();
    const fileName = `personal_details_${timestamp}.json`;

    // המרה ל-JSON
    const jsonData = JSON.stringify(data);

    // שמירה באמצעות ה-fs API
    await window.fs.writeFile(fileName, jsonData);

    // החזרת המזהה הייחודי
    return fileName;
  } catch (error) {
    console.error('שגיאה בשמירת פרטים אישיים:', error);
    throw error;
  }
};

declare global {
  interface Window {
    fs: {
      readFile: (path: string, options?: { encoding?: string }) => Promise<Uint8Array | string>;
      writeFile: (path: string, data: Uint8Array | string) => Promise<void>;
    }
  }
}