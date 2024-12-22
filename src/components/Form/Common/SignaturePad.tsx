import React from 'react';
import SignatureCanvas from 'react-signature-canvas';
import { PenTool, Trash2, Save } from 'lucide-react';
import Button from '../../UI/Button';

interface SignaturePadProps {
  onSave: (signature: string) => void;
  signatureRef: React.RefObject<any>;
}

const SignaturePad: React.FC<SignaturePadProps> = ({ onSave, signatureRef }) => {
  const clearSignature = () => {
    if (signatureRef.current) {
      signatureRef.current.clear();
    }
  };

  const saveSignature = () => {
    if (signatureRef.current) {
      const dataUrl = signatureRef.current.toDataURL();
      onSave(dataUrl);
    }
  };

  return (
    <div className="p-6 bg-gradient-to-br from-gray-50 to-blue-50 rounded-xl">
      <div className="flex items-center gap-3 mb-4">
        <PenTool className="w-5 h-5 text-blue-600" />
        <h3 className="text-lg font-semibold text-gray-800">חתימה דיגיטלית</h3>
      </div>
      
      <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 bg-white">
        <SignatureCanvas
          ref={signatureRef}
          canvasProps={{
            className: "signature-canvas",
            width: 500,
            height: 200
          }}
        />
      </div>

      <div className="flex justify-end gap-3 mt-4">
        <Button
          variant="outline"
          onClick={clearSignature}
          className="flex items-center gap-2"
        >
          <Trash2 className="w-4 h-4" />
          נקה חתימה
        </Button>
        
        <Button
          onClick={saveSignature}
          className="flex items-center gap-2"
        >
          <Save className="w-4 h-4" />
          שמור חתימה
        </Button>
      </div>
    </div>
  );
};

export default SignaturePad;