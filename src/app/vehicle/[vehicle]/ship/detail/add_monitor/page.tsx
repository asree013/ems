'use client'

import Loadding from '@/components/Loadding';
import QRScannerOrder from '@/components/QrcodeScanOrder';
import { CreateOrder, OrderTranfer } from '@/models/order_tranfer.model';
import { ShipById } from '@/models/vehicle.model';
import { toast } from '@/services/alert.service';
import { createOrderTranfer, editOrderTranferByOrderId } from '@/services/order_tranfer.service';
import { findShipById } from '@/services/ship.service';
import { useParams, useSearchParams } from 'next/navigation';
import React, { useContext, useState } from 'react';
import styled from 'styled-components';

const Bodys = styled.div`
display: flex;
align-items: center;
justify-content: center;

`

export default function page() {
    const vehicleId = useParams().vehicle
    const patient_id = useSearchParams().get('patient_add_id')

    const [shipById, setShipById] = React.useState<ShipById>({} as ShipById)
    const [order, setOrder] = useState<CreateOrder>({} as CreateOrder)
    const [load, setLoad] = useState<boolean>(false)

    const feedShipById = React.useCallback(async () => {
        setLoad(true)
        try {
            const result = await findShipById(vehicleId.toString())
            setShipById(result.data)
        } catch (error: any) {
            toast(JSON.stringify(error.message), 'error')
        } finally {
            setLoad(false)
        }
    }, [setShipById])

    async function onScanOrder(str: string) {
        setOrder({ ...order, device_id: str })
    }

    async function onClickOrder(str: string) {
        setLoad(true)
        setOrder({ ...order, device_id: str })
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
            feedShipById()
        }

        return () => {
            feedShipById
        }
    }, [feedShipById])
    return (
        <>
            {
                load ?
                    <Loadding /> :
                    null
            }
            <Bodys>
                <QRScannerOrder onClickSearch={onClickOrder} onSendResult={onScanOrder} onSetDefault={onCreateOrderTranfer} />
            </Bodys>
        </>
    )
}
