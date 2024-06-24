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
    
  }, []);

  return (
    <>
      {/* <DeviceContexts.Provider /> */}
      <Loadding />

    </>
  );
}
