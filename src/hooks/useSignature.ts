import { useRef, useState } from 'react';

export function useSignature() {
  const signatureRef = useRef<any>(null);
  const [signature, setSignature] = useState<string>('');

  const clearSignature = () => {
    if (signatureRef.current) {
      signatureRef.current.clear();
    }
    setSignature('');
  };

  const saveSignature = () => {
    if (signatureRef.current) {
      const dataUrl = signatureRef.current.toDataURL();
      setSignature(dataUrl);
      return dataUrl;
    }
    return '';
  };

  return {
    signatureRef,
    signature,
    clearSignature,
    saveSignature
  };
}

export default useSignature;