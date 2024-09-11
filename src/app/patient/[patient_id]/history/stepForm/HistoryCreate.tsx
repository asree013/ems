'use client';
import React, { ChangeEvent, useCallback, useContext, useEffect, useState } from 'react';
import Typography from '@mui/joy/Typography';
import { Historys } from '@/models/history.model';
import {
    createHistory,
} from '@/services/history.service';

import AssignmentIcon from '@mui/icons-material/Assignment';
import { Input, Textarea } from '@mui/joy';
import { HistoryDetailContext, THitorysContext } from '../StepContext';

export default function HistoryCreate() {
    const { historyDetail, setHistoryDetail } = useContext<THitorysContext>(HistoryDetailContext)
    const [err, setErr] = useState<boolean>(false);


    function onChangeNumber(e: ChangeEvent<HTMLInputElement>) {
        e.preventDefault()
        const value = e.target.value;

        // กรองให้เหลือเฉพาะตัวเลข
        const numericValue = value.replace(/[^0-9.]/g, '');
        e.target.value = numericValue
        setHistoryDetail({ ...historyDetail, chief_complaint_number: e.target.value.toString() })

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
                Creact History
            </Typography>
            <Input
                onChange={(e) => setHistoryDetail({ ...historyDetail, symptom_details: e.target.value })}
                placeholder="Symptom Detail"
                value={historyDetail?.symptom_details ?? ''}
                startDecorator={<AssignmentIcon />}
                error={err}
            />

            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }} className='mt-2'>
                <Input
                    value={historyDetail?.chief_complaint ?? ''}
                    onChange={(e) => setHistoryDetail({ ...historyDetail, chief_complaint: e.target.value })}
                    placeholder="Chief Complaint (CC.)"
                    error={err}
                />
                <input
                    value={historyDetail?.chief_complaint_number ?? 0}
                    onChange={onChangeNumber}
                    style={{ width: '40px', border: '1px solid gray', borderRadius: '5pxe' }} maxLength={4} type='text' defaultValue={0} />
            </div>
            <label htmlFor="Present Illness (PI.)"></label>
            <Textarea    
                value={historyDetail?.present_illness?? ''}
                minRows={2}
                className='mt-2'
                onChange={(e) => setHistoryDetail({ ...historyDetail, present_illness: e.target.value })}
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
