'use client'
import ECG from '@/app/chart/ECG'
import SPO from '@/app/chart/SPO'
import React, { useCallback, useEffect, useState } from 'react'
import order_idCss from './order_idCss.module.css'
import AccordionDetail from './AccrodionDetail'
import { findOrderTranferByOrderId } from '@/services/order_tranfer.service'
import { timeOutJwt } from '@/services/timeout.service'
import { OrderTranfer } from '@/models/order_tranfer.model'
import { findPatientById } from '@/services/paitent.service'
import { Patients } from '@/models/patient'
import ChartLightning from '@/app/chart/ChartLightning'
import { ecg, ecgNull } from '@/data/data.medical_result'
import { ColorRGBA } from '@lightningchart/lcjs'

type Props = {
  params: {
    order_id: string
  }
}

export default function Page({ params }: Props) {
  const [order, setOrder] = useState<OrderTranfer>({} as OrderTranfer)
  const [patient, setPatient] = useState<Patients>({} as Patients)
  const [haveOrder, setHaveOrder] = useState<boolean>(false)

  const findOrderByOrferId = useCallback(async () => {
    try {
      const result = await findOrderTranferByOrderId(params.order_id)
      setOrder(result.data)
      setHaveOrder(true)
    } catch (error) {
      timeOutJwt(error)
    }
  }, [setOrder])

  const feedPatientByPatientId = useCallback(async () => {
    try {
      const result = await findPatientById(order.patient_id)
      setPatient(result.data)
    } catch (error) {
      timeOutJwt(error)
    }
  }, [setPatient])

  useEffect(() => {
    findOrderByOrferId()
    if (order && haveOrder) {
      feedPatientByPatientId()
    }

    return () => {
      findOrderByOrferId
      feedPatientByPatientId
    }
  }, [findOrderByOrferId, haveOrder, feedPatientByPatientId])
  return (
    <div className={order_idCss.body}>
      <div className={order_idCss.title}>
        <AccordionDetail />
      </div>
      <div className={order_idCss.chartDetail}>
        
        <div className={order_idCss.monitor}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', background: 'black', padding: '20px', width: '100%' }}>
            <div style={{ background: 'black', color: '#2ecc71', display: 'flex', width: '40%', alignItems: 'center', justifyContent: 'space-between' }}>
              <div>
                <p>HR</p>
                <p>bpm</p>
              </div>
              <p style={{ fontSize: '2.2rem', fontWeight: 700 }}>62</p>
            </div>
            <div style={{ background: 'black', color: '#3498db ', display: 'flex', width: '40%', alignItems: 'center', justifyContent: 'space-between' }}>
              <div>
                <p>Spo2</p>
                <p>%</p>
              </div>
              <p style={{ fontSize: '2.2rem', fontWeight: 700 }}>62</p>
            </div>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'end', background: 'black', width: '100%' }}>
            <div style={{ color: 'white', padding: '8px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '15rem' }}>
              <div>
                <p>NIBP</p>
                <p>mmhg</p>
              </div>
              <p style={{ fontSize: '1.8rem', fontWeight: 700 }}>122/344</p>
            </div>
          </div>
        </div>

        <div style={{width: '100%'}}>
          <div className={order_idCss.chartSize}>
            <ChartLightning data={ecgNull} lineColor={ColorRGBA(52, 211, 153)}
              yMin={-100} yMax={100} rateHz={500} xView={6} sig_name={'ECG'} />
          </div>
          <div className={order_idCss.chartSize}>
            <ChartLightning data={ecgNull} lineColor={ColorRGBA(52, 152, 219)}
              yMin={-100} yMax={100} rateHz={500} xView={6} sig_name={'spo2'} />
          </div>
        </div>

      </div>

    </div>
  )
}
