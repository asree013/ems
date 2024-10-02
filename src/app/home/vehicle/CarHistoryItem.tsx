'use client'
import HistoryItem from '@/components/HistoryItem'
import { Historys } from '@/models/history.model'
import { toast } from '@/services/alert.service'
import { findHistoryByPatientId } from '@/services/history.service'
import { Button, Card } from '@mui/material'
import React, { useCallback, useEffect, useState } from 'react'

export type HistoryInCar = {
    id: string
    symptom_details: string
    status: string
    create_date: string
    update_date: string
    patient_id: string
    chief_complaint: string
    present_illness: string
    user_create_id: string
    user_update_id: string
    physical_status: string
    triage_lavel: string
}
type Props = {
    history: HistoryInCar
    patient_id: string
}

export default function CarHistoryItem({ history, patient_id }: Props) {

    const [load, setLoad] = React.useState<boolean>(false);


    return (
        <div className='mt-1'>
            {
                history ?
                    <HistoryItem value={history} />
                    : <Card elevation={3} style={{ margin: '10px 5px', padding: '10px' }}>
                        <p>ยังไม่มีประวัติ</p>
                        <div style={{ display: 'flex', alignContent: 'center', justifyContent: 'space-around' }}>
                            <p>asree</p>
                            <p>hayeema</p>
                        </div>
                        <Button onClick={() => {
                            setLoad(true)
                            window.location.href = '/patient/' + patient_id + '/history'
                        }} className='w-full' variant='outlined' color='success'>เพิ่มประวัติ</Button>
                    </Card>
            }

        </div>
    )
}
