// השאר את כל הקוד בדיוק כמו שהוא, רק נשנה את בלוק ה-catch
export const saveFormToFirebase = async (formData: any): Promise<FormResponse> => {
  try {
    // ... כל הקוד הקיים נשאר בדיוק אותו דבר ...
  } catch (error: unknown) {
    console.error('Error saving form:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'An unknown error occurred'
    };
  }
};