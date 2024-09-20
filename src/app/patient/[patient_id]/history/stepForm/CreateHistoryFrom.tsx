'use client'
import { Button } from '@mui/material'
import React, { useContext } from 'react'
import { HistoryDetailContext, PhysicalStatusContext, THitorysContext, TPhysicalStatusContext, TraigeLevelContext, TTriageLvelContext } from '../StepContext'
import { Historys } from '@/models/history.model'
import { timeOutJwt } from '@/services/timeout.service'
import { toast } from '@/services/alert.service'
import { createHistory } from '@/services/history.service'
import { useParams } from 'next/navigation'

export default function CreateHistoryFrom() {
    const { historyDetail, setHistoryDetail } = useContext<THitorysContext>(HistoryDetailContext)
    const { physicalStatus, setPhysicalStatus } = useContext<TPhysicalStatusContext>(PhysicalStatusContext)
    const { triageLevel, setTriageLevel } = useContext<TTriageLvelContext>(TraigeLevelContext)

    const patient_id = useParams().patient_id
    
    async function onCreateHistory() {
        try {
            const h = {} as Historys
            h.chief_complaint = historyDetail.chief_complaint
            h.symptom_details = historyDetail.symptom_details
            h.present_illness = historyDetail.present_illness
            h.triage_lavel = JSON.stringify(triageLevel)
            h.physical_status = JSON.stringify(physicalStatus)
            h.patient_id = patient_id.toString()
            const result = await createHistory(h)
            console.log(result.data);
            window.location.reload()
        } catch (error: any) {
            // timeOutJwt(error)
            toast(JSON.stringify(error.message), 'error')
        }
    }
    return (
        <div style={{ display: 'flex', alignContent: 'center', justifyContent: 'center' }}>
            <Button onClick={onCreateHistory} variant='contained' color='success' sx={{ fontSize: '1.5rem' }}>เพิ่มประวัติ</Button>
        </div>
    )
}
