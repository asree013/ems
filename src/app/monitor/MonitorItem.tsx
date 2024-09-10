'use client';
import React, { useRef, useState } from 'react';
import monitorCss from './chart.module.css';
import EcgChart from '@/components/EcgChart';
import SpoChart from '@/components/SpoChart';
import ECG from '../chart/ECG';
import SPO from '../chart/SPO';
import { enviromentDev } from '@/configs/enviroment.dev';
import ChartLightling from '../chart/ChartLightning';
import { ecg, ecgNull, spo2 } from '@/data/data.medical_result';
import { ColorRGBA } from '@lightningchart/lcjs';
import ChartLightning from '../chart/ChartLightning';
import MonitorItemCss from './MonitorItemCss.module.css'
import AccordionDetail from './[monitor_id]/monitor_detail/[order_id]/AccrodionDetail';


type Props = {
  el_id: number
  order_id: string
}

export default function MonitorItem({ el_id, order_id }: Props) {


  const [xviewEcg, setXviewEcg] = useState(6)
  const [xviewSpo, setXviewSpo] = useState(6)

  return (
    <div className={MonitorItemCss.body}>
      <div className={MonitorItemCss.title}>
        <AccordionDetail />
      </div>
      <div className={MonitorItemCss.chartDetail}>
        
        <div className={MonitorItemCss.monitor}>
          <div style={{ display: 'flex', flexDirection: 'column',alignItems: 'center', justifyContent: 'space-between', background: 'black', margin: '20px', width: '100%', height: '100%',padding: '5px' }}>
            <div style={{ background: 'black', color: '#2ecc71', display: 'flex', width: '100%', alignItems: 'center', justifyContent: 'space-between' }}>
              <div>
                <p>HR</p>
                <p>bpm</p>
              </div>
              <p style={{ fontSize: '2rem', fontWeight: 700 }}>62</p>
            </div>
            <div style={{ background: 'black', color: '#3498db ', display: 'flex', width: '100%', alignItems: 'center', justifyContent: 'space-between' }}>
              <div>
                <p>Spo2</p>
                <p>%</p>
              </div>
              <p style={{ fontSize: '2rem', fontWeight: 700 }}>78</p>
            </div>
          </div>
        </div>

        <div style={{width: '100%'}}>
          <div className={MonitorItemCss.chartSize}>
            <ECG order_id={order_id} />
          </div>
          <div className={MonitorItemCss.chartSize}>
            <SPO order_id={order_id} />
          </div>
        </div>

      </div>

    </div>
  );
}
