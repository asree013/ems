'use client';
import React, { useRef } from 'react';
import monitorCss from './chart.module.css';
import EcgChart from '@/components/EcgChart';
import SpoChart from '@/components/SpoChart';

type Props = {
  el_id: number
}

export default function MonitorItem({ el_id }: Props) {

  return (
    <div style={{ width: '100%', height: '100%' }}>
      <div>
        <p>start</p>
        <p>viatul sing</p>
      </div>
      <div style={{ width: '100%', height: '400px' }}>
        <div style={{marginTop: ''}}>
          {/* <EcgChart /> */}
          <SpoChart />
        </div>
      </div>


    </div>
  );
}
