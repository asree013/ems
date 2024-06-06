import React, { useEffect } from 'react';
import { Html5QrcodeScanner } from 'html5-qrcode';

interface returnData {
  onChangeScanSuccess:(decodedText: string, decodedResult: any) => void
  onChangeScanFailure: (error: any) => void
}
export default function Camera({onChangeScanSuccess, onChangeScanFailure}: returnData) {
  

  useEffect(() => {
    const html5QrcodeScanner = new Html5QrcodeScanner(
        "reader",
        { fps: 10, qrbox: { width: 450, height: 450 }, },
        /* verbose= */ false
    );
    function onScanSuccess(decodedText: string, decodedResult: any) {
        // Handle the scanned code as you like, for example:
        onChangeScanSuccess(decodedText, decodedResult)
        console.log(`Code matched = ${decodedText}`, decodedResult);
        
      }
    
      function onScanFailure(error: any) {
        onChangeScanFailure(error)
        console.warn(`Code scan error = ${error}`);
        
      }
    html5QrcodeScanner.render(onScanSuccess, onScanFailure);

    return () => {
      // Cleanup when the component is unmounted
      html5QrcodeScanner.clear();
    };
  }, []);

  return <div id="reader"></div>;
}
