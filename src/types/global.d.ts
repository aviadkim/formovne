declare global {
    interface Window {
      html2canvas: (element: HTMLElement, options?: {
        scale?: number;
        useCORS?: boolean;
        logging?: boolean;
        width?: number;
        height?: number;
      }) => Promise<HTMLCanvasElement>;
      
      fs: {
        readFile: (path: string, options?: { encoding?: string }) => Promise<Uint8Array | string>;
        writeFile: (path: string, data: Uint8Array | string) => Promise<void>;
      };
    }
  }
  
  export {};