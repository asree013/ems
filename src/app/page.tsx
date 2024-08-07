'use client';
import Loadding from '@/components/Loadding';
import { DeviceContexts } from '@/contexts/device.context';
import { PatientContext, PatientContextsArr } from '@/contexts/patient.context';
import { Patients } from '@/models/patient';
import { toast } from '@/services/alert.service';
import { findPatientAll } from '@/services/paitent.service';
import React, { useCallback, useEffect, useState } from 'react';

export default function Home() {


  useEffect(() => {
    window.location.href = '/login';
    self.addEventListener('install', event => {
      // การติดตั้ง Service Worker
      console.log('Service Worker installing...');
    });
    
    self.addEventListener('activate', event => {
      // การเปิดใช้งาน Service Worker
      console.log('Service Worker activating...');
    });
    
  }, []);

  return (
    <>
      {/* <DeviceContexts.Provider /> */}
      <Loadding />

    </>
  );
}
