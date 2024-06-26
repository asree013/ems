'use client'
import PatientItem from '@/app/patient/PatientItem';
import React from 'react';

type Props = {
  params: {
    monitor_id: string;
  };
};

export default function page({ params }: Props) {
  return (
    <div style={{ marginTop: '70px' }}>
      <PatientItem order_tranfer_id={params.monitor_id} />
    </div>
  );
}
