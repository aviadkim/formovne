import { storage } from '../../firebase';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';

interface StorageResponse {
  success: boolean;
  url?: string;
  error?: string;
}

export const uploadFile = async (file: File, path: string): Promise<StorageResponse> => {
  try {
    const storageRef = ref(storage, path);
    const snapshot = await uploadBytes(storageRef, file);
    const url = await getDownloadURL(snapshot.ref);

    return {
      success: true,
      url
    };
  } catch (error) {
    if (error instanceof Error) {
      return {
        success: false,
        error: error.message
      };
    }
    return {
      success: false,
      error: 'An unknown error occurred'
    };
  }
};