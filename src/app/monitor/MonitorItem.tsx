'use client';
import React, { useRef } from 'react';
import monitorCss from './chart.module.css';
import EcgChart from '@/components/EcgChart';
import SpoChart from '@/components/SpoChart';
import ECG from '../chart/ECG';
import SPO from '../chart/SPO';
import { enviromentDev } from '@/configs/enviroment.dev';

type Props = {
  el_id: number
  order_id: string
}

export default function MonitorItem({ el_id, order_id }: Props) {

  return (
    <div style={{ width: '100%', height: '100%' }} key={el_id}>
      <div>
        <p>monitor num {el_id }</p>
        <p>start</p>
        <div>
          <p>viatul sing</p>
        </div>
        <a style={{color: 'white'}} href={enviromentDev.myUrl + '/monitor/' + order_id + '/monitor_detail/' + order_id} target='_blank'>monitor</a>
      </div>
    </div>
  );
}
