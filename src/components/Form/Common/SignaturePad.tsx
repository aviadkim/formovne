import React, { useRef, useEffect } from 'react';
import SignaturePadBase from 'react-signature-canvas';

interface SignaturePadProps {
  onSave?: (signatureData: string) => void;
  signatureRef?: any;
}

const SignaturePad: React.FC<SignaturePadProps> = ({ onSave, signatureRef }) => {
  const padRef = useRef<any>(null);
  
  useEffect(() => {
    if (signatureRef) {
      signatureRef.current = padRef.current;
    }
    
    // Resize handler
    const resizeCanvas = () => {
      const canvas = padRef.current?.getCanvas();
      if (canvas) {
        const ratio = Math.max(window.devicePixelRatio || 1, 1);
        canvas.width = canvas.offsetWidth * ratio;
        canvas.height = canvas.offsetHeight * ratio;
        canvas.getContext("2d").scale(ratio, ratio);
      }
    };
    
    window.addEventListener('resize', resizeCanvas);
    resizeCanvas();
    
    return () => window.removeEventListener('resize', resizeCanvas);
  }, [signatureRef]);

  const handleClear = () => {
    padRef.current?.clear();
  };

  const handleSave = () => {
    if (!padRef.current?.isEmpty()) {
      const signatureData = padRef.current?.toDataURL();
      onSave?.(signatureData);
    }
  };

  return (
    <div className="space-y-4">
      <div className="border-2 border-dashed border-gray-300 rounded-xl p-4 bg-white">
        <SignaturePadBase
          ref={padRef}
          canvasProps={{
            className: "w-full h-48",
            style: {
              width: '100%',
              height: '100%',
              maxWidth: '100%',
              maxHeight: '100%',
              touchAction: 'none'
            }
          }}
        />
      </div>
      <div className="flex gap-4 justify-center">
        <button
          type="button"
          onClick={handleSave}
          className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          שמור חתימה
        </button>
        <button
          type="button"
          onClick={handleClear}
          className="px-6 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
        >
          נקה חתימה
        </button>
      </div>
    </div>
  );
};

export default SignaturePad;