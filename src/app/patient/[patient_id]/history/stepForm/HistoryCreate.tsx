'use client';
import React, { ChangeEvent, useCallback, useContext, useEffect, useState } from 'react';
import Typography from '@mui/joy/Typography';
import { Input, Textarea } from '@mui/joy';
import { TreatmentContext, TTreatmentContext } from '../StepContext';

export default function HistoryCreate() {
    const { treatment, setTreatment } = useContext<TTreatmentContext>(TreatmentContext)
    const [err, setErr] = useState<boolean>(false);


    function onChangeNumber(e: ChangeEvent<HTMLInputElement>) {
        e.preventDefault()
        const value = e.target.value;

        // กรองให้เหลือเฉพาะตัวเลข
        const numericValue = value.replace(/[^0-9.]/g, '');
        e.target.value = numericValue
        setTreatment({ ...treatment, chief_complaint: treatment.chief_complaint + e.target.value.toString() })

    }

    // async function onCreateHistory() {
    //     setErr(false);
    //     if (!historyDetail.symptom_details || !historyDetail.present_illness || !historyDetail.chief_complaint || !historyDetail.chief_complaint_number) {
    //         return setErr(true);
    //     }
    //     try {
    //         const data = {} as Historys;
    //         data.symptom_details = historyDetail.symptom_details;
    //         data.present_illness = historyDetail.present_illness
    //         data.chief_complaint = historyDetail.chief_complaint
    //         data.chief_complaint_number = historyDetail.chief_complaint_number
    //         data.status = 'Draft';
    //         data.patient_id = params.patient_id;
    //         console.log(data);

    //         const result = await createHistory(data);
    //         setHistory([...history, result.data]);
    //         setHistory_id(result.data.id);
    //     } catch (error) {
    //         console.log(error);
    //     }
    // }
    return (
        <>
            <Typography
                component="h2"
                id="modal-title"
                level="h4"
                textColor="inherit"
                fontWeight="lg"
                mb={1}
            >
                Create Triage
            </Typography>

            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }} className='mt-2'>
                <Input
                    value={treatment?.chief_complaint ?? ''}
                    onChange={(e) => setTreatment({ ...treatment, chief_complaint: e.target.value })}
                    placeholder="Chief Complaint (CC.)"
                    error={err}
                />
            </div>
            <label htmlFor="Present Illness (PI.)"></label>
            <Textarea    
                value={treatment?.present_illness?? ''}
                minRows={2}
                className='mt-2'
                onChange={(e) => setTreatment({ ...treatment, present_illness: e.target.value })}
                placeholder="Present Illness (PI.)"
                error={err}
            />
            {/* <Button
                sx={{ fontSize: '1.2rem', width: '100%', marginTop: '10px' }}
                onClick={onCreateHistory}
                loading={created}
            >
                เพิ่มประวัติ
            </Button> */}
        </>
    )
}
