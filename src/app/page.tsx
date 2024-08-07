// pages/some-page.js

'use client';
import { useEffect } from 'react';

const SomePage = () => {

  useEffect(() => {
    // ลงทะเบียน Service Worker เฉพาะในหน้านี้
    if ('serviceWorker' in navigator) {
      window.addEventListener('load', () => {
        const swUrl = '/service-worker.js';
        navigator.serviceWorker.register(swUrl)
          .then(registration => {
            console.log('Service Worker registered with scope:', registration.scope);
          })
          .catch(error => {
            console.error('Service Worker registration failed:', error);
          });
      });
    }
  }, []);

  return (
    <div>
      <h1>Service Worker Page</h1>
      {/* เนื้อหาของหน้านี้ */}
    </div>
  );
}

export default SomePage;
