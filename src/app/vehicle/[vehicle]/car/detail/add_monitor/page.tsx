'use client'
import React, { useContext, useState } from 'react'
import { CarByIdContext, TCarIdContext } from '../CarById.context'
import { CarByCarId } from '@/models/vehicle.model'
import { toast } from '@/services/alert.service'
import { findCarByCarId } from '@/services/car.service'
import { useParams, useSearchParams } from 'next/navigation'
import { findPatientById } from '@/services/paitent.service'
import { Patients } from '@/models/patient'
import styled from 'styled-components'
import QRScannerOrder from '@/components/QrcodeScanOrder'
import { CreateOrder, OrderTranfer } from '@/models/order_tranfer.model'
import Loadding from '@/components/Loadding'
import { createOrderTranfer, editOrderTranferByOrderId } from '@/services/order_tranfer.service'

export default function page() {
  const vehicleId = useParams().vehicle
  const patient_id = useSearchParams().get('patient_add_id')

  const [carByid, setCarById] = React.useState<CarByCarId>({} as CarByCarId)
  const [order, setOrder] = useState<CreateOrder>({} as CreateOrder)
  const [load, setLoad] = useState<boolean>(false)

  const feedCarById = React.useCallback(async () => {
    setLoad(true)
    try {
      const result = await findCarByCarId(vehicleId.toString())
      setCarById(result.data)
    } catch (error: any) {
      toast(JSON.stringify(error.message), 'error')
    } finally{
      setLoad(false)
    }
  }, [setCarById])

  async function onScanOrder(str: string) {
    // console.log(str);
    setOrder({...order, device_id: str})
  }

  async function onClickOrder(str: string) {
    setLoad(true)
    console.log(str);
    setOrder({...order, device_id: str})
    const co = {} as CreateOrder
    co.device_id = str
    co.element_seq = 0
    try {
      const o = {} as OrderTranfer
      o.patient_id = String(patient_id)
      const result = await createOrderTranfer(co)
      const addPatient = await editOrderTranferByOrderId(result.data.id, o)
      history.back()
    } catch (error: any) {
      toast(error.message, 'error')
    } finally {
      setLoad(false)
    }
  }


  async function onCreateOrderTranfer() {
    
  }

  React.useEffect(() => {
    if (!patient_id) {
      feedCarById()
    }

    return () => {
      feedCarById
    }
  }, [feedCarById])

  const Bodys = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;

  `
  return (
    <>
      {
        load?
        <Loadding />:
        null
      }
      <Bodys>
        <QRScannerOrder onClickSearch={onClickOrder} onSendResult={onScanOrder} onSetDefault={onCreateOrderTranfer} />
      </Bodys>
    </>
  )
}
