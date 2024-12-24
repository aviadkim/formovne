// src/services/firebase/storage.ts

export async function saveTempImage(imageData: string): Promise<string> {
  try {
    const filename = `temp_${Date.now()}.png`;
    const blob = await (await fetch(imageData)).blob();
    return URL.createObjectURL(blob);
  } catch (error) {
    console.error('Error saving temp image:', error);
    throw error;
  }
}

export async function savePersonalDetailsToFirebase(data: any): Promise<void> {
  // יישום בהמשך אם יהיה צורך
  console.log('Saving personal details:', data);
}