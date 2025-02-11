'use client'
import { Button } from '@mui/material'
import React, { useContext } from 'react'
import { CirculationsContext, PatientIdContext, PhysicalStatusContext, TPhysicalStatusContext, TraigeLevelContext, TreatmentContext, TTreatmentContext, TTriageLvelContext } from '../StepContext'

import { toast } from '@/services/alert.service'
import { useParams } from 'next/navigation'
import { Treatments } from '@/models/traeteMent'
import { createTreatment } from '@/services/treatment.service'

export default function CreateHistoryFrom() {
    const { treatment, setTreatment } = useContext<TTreatmentContext>(TreatmentContext)
    const { physicalStatus, setPhysicalStatus } = useContext<TPhysicalStatusContext>(PhysicalStatusContext)
    const { triageLevel, setTriageLevel } = useContext<TTriageLvelContext>(TraigeLevelContext)
    const {circulation, setCirculation} = useContext(CirculationsContext)
    const {patient_id} = useContext(PatientIdContext)
    
    async function onTreatMent() {
        try {
            const h = {} as Treatments
            h.chief_complaint = treatment.chief_complaint
            h.present_illness = treatment.present_illness
            h.triage_lavel = JSON.stringify(triageLevel)
            h.physical_status = JSON.stringify(physicalStatus)
            h.description = JSON.stringify(circulation)
            h.patient_id = patient_id
            alert(JSON.stringify(h.patient_id))
            const result = await createTreatment(h)
            console.log(result.data);
            
            // console.log(result.data);
            // window.location.reload()
        } catch (error: any) {
            // timeOutJwt(error)
            toast(JSON.stringify(error.message), 'error')
        }
    }
    return (
        <div style={{ display: 'flex', alignContent: 'center', justifyContent: 'center' }}>
            <Button onClick={onTreatMent} variant='contained' color='success' sx={{ fontSize: '1.5rem' }}>เพิ่มประวัติ</Button>
        </div>
    )
}
