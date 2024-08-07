// pages/some-page.js

'use client';
import Loadding from '@/components/Loadding';
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
    window.location.href = '/login'
  }, []);

  return (
    <Loadding />
  );
}

export default SomePage;
