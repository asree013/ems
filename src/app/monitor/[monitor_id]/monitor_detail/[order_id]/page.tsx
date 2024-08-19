'use client'
import ECG from '@/app/chart/ECG'
import SPO from '@/app/chart/SPO'
import React, { useCallback, useEffect, useState } from 'react'
import order_idCss from './order_id.module.css'
import AccordionDetail from './AccrodionDetail'
import { findOrderTranferByOrderId } from '@/services/order_tranfer.service'
import { timeOutJwt } from '@/services/timeout.service'
import { OrderTranfer } from '@/models/order_tranfer.model'
import { findPatientById } from '@/services/paitent.service'
import { Patients } from '@/models/patient'

type Props = {
  params: {
    order_id: string
  }
}

export default function Page({ params }: Props) {
  const [order, setOrder] = useState<OrderTranfer>({} as OrderTranfer)
  const [patient, setPatient] = useState<Patients>({} as Patients)
  const [haveOrder, setHaveOrder] = useState<boolean>(false)

  const findOrderByOrferId = useCallback(async() => {
    try {
      const result = await findOrderTranferByOrderId(params.order_id)
      setOrder(result.data)
      setHaveOrder(true)
    } catch (error) {
      timeOutJwt(error)
    }
  }, [setOrder])

  const feedPatientByPatientId = useCallback(async() => {
    try {
      const result = await findPatientById(order.patient_id)
      setPatient(result.data)
    } catch (error) {
      timeOutJwt(error)
    }
  }, [setPatient])

  useEffect(() => {
    findOrderByOrferId()
    if(order && haveOrder){
      feedPatientByPatientId()
    }

    return() => {
      findOrderByOrferId
      feedPatientByPatientId
    }
  }, [findOrderByOrferId, haveOrder, feedPatientByPatientId])
  return (
    <div className={order_idCss.body}>
      <div className={order_idCss.title}>
        <AccordionDetail />
      </div>
      <div className='mt-2'>
        <ECG order_id={params.order_id} />
        <SPO order_id={params.order_id} />
      </div>
    </div>
  )
}
