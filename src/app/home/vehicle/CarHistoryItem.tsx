'use client'
import HistoryItem from '@/components/HistoryItem'
import { Historys } from '@/models/history.model'
import { toast } from '@/services/alert.service'
import { findHistoryByPatientId } from '@/services/history.service'
import { Button, Card } from '@mui/material'
import React, { useCallback, useEffect, useState } from 'react'

type Props = {
    patient_id: string
}

export default function CarHistoryItem({ patient_id }: Props) {

    const [history, setHistory] = useState<Historys>({} as Historys)
    const [load, setLoad] = React.useState<boolean>(false);

    const feedHistoryByPatientId = useCallback(async () => {
        try {
            const result = await findHistoryByPatientId(patient_id)
            setHistory(result.data[0])
        } catch (error: any) {
            toast(JSON.stringify(error.message), 'error')
        }
    }, [setHistory])

    useEffect(() => {
        feedHistoryByPatientId()

        return () => {
            feedHistoryByPatientId
        }
    }, [feedHistoryByPatientId])
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
