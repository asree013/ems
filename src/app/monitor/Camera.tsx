'use client'
import React, { useEffect, useCallback, useMemo } from 'react';
import { Html5QrcodeScanner } from 'html5-qrcode';

interface ReturnData {
  onChangeScanSuccess: (decodedText: string, decodedResult: any) => void;
  onChangeScanFailure: (error: any) => void;
}

export default function Camera({
  onChangeScanSuccess,
  onChangeScanFailure,
}: ReturnData) {
  const html5QrcodeScanner = useMemo(
    () =>
      new Html5QrcodeScanner(
        'reader',
        { fps: 10, qrbox: { width: 450, height: 450 } },
        false, // verbose
      ),
    []
  );

  const onScanSuccess = useCallback(
    (decodedText: string, decodedResult: any) => {
      onChangeScanSuccess(decodedText, decodedResult);
      console.log(`Code matched = ${decodedText}`, decodedResult);
    },
    [onChangeScanSuccess]
  );

  const onScanFailure = useCallback(
    (error: any) => {
      onChangeScanFailure(error);
      console.warn(`Code scan error = ${error}`);
    },
    [onChangeScanFailure]
  );

  useEffect(() => {
    html5QrcodeScanner.render(onScanSuccess, onScanFailure);

    return () => {
      html5QrcodeScanner.clear();
    };
  }, [html5QrcodeScanner, onScanSuccess, onScanFailure]);

  return <div id="reader"></div>;
}
