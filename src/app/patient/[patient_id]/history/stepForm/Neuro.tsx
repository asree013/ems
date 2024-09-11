'use client'
import React, { useContext } from 'react'
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { Divider } from '@mui/material';
import { PhysicalStatusContext, TPhysicalStatusContext } from '../StepContext';

export default function Neuro() {

    const { physicalStatus, setPhysicalStatus } = useContext<TPhysicalStatusContext>(PhysicalStatusContext)
    const handleChange = (event: SelectChangeEvent) => {
    };
    return (
        <Box sx={{ minWidth: 120 }}>
            <FormControl className='mt-2' fullWidth>
                <InputLabel id="demo-simple-select-label">E (Eye Response)</InputLabel>
                <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={String(physicalStatus?.neuro?.e) ?? ''}
                    label="Age"
                    onChange={(e) => {
                        setPhysicalStatus({
                            ...physicalStatus, neuro: {
                                ...physicalStatus.neuro, e: parseInt(e.target.value)
                            }
                        })
                    }}
                >
                    <MenuItem value={4}>E4 ลืมตาเองตามปกติ 4คะแนน</MenuItem>
                    <MenuItem value={3}>E3 ลืมตาเมื่อมีการกระตุ้นด้วยเสียง 3คะแนน</MenuItem>
                    <MenuItem value={2}>E2 ลืมตาเมื่อกระตุ้นด้วยความเจ็บปวด 2คะแนน</MenuItem>
                    <MenuItem value={1}>E1 ไม่ตอบสนอง (ไม่ลืมตา) 1คะแนน</MenuItem>
                </Select>
            </FormControl>
            <Divider />
            <FormControl className='mt-3' fullWidth>
                <InputLabel id="demo-simple-select-label">V (Verbal Response)</InputLabel>
                <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={physicalStatus?.neuro?.v?.toString() ?? ''}
                    label="Age"
                    onChange={(e) => {
                        setPhysicalStatus({
                            ...physicalStatus, neuro: {
                                ...physicalStatus.neuro, v: parseInt(e.target.value)
                            }
                        })
                    }}
                >
                    <MenuItem value={5}>V5 ตอบสนองได้ตามปกติ (สนทนาเข้าใจ) 5คะแนน</MenuItem>
                    <MenuItem value={4}>V4 พูดสับสน (แต่ยังตอบได้) 4คะแนน</MenuItem>
                    <MenuItem value={3}>V3 พูดคำที่ไม่มีความหมาย 3คะแนน</MenuItem>
                    <MenuItem value={2}>V2 เสียงไม่มีความหมาย (เช่น คราง) 2คะแนน</MenuItem>
                    <MenuItem value={1}>V1 ไม่ตอบสนองทางคำพูด 1คะแนน</MenuItem>
                </Select>
            </FormControl>
            <Divider />
            <FormControl className='mt-3' fullWidth>
                <InputLabel id="demo-simple-select-label">M (Motor Response)</InputLabel>
                <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={physicalStatus?.neuro?.m?.toString() ?? ''}
                    label="Age"
                    onChange={(e) => {
                        setPhysicalStatus({
                            ...physicalStatus, neuro: {
                                ...physicalStatus.neuro, m: parseInt(e.target.value)
                            }
                        })
                    }}
                >
                    <MenuItem value={6}>M6 ทำตามคำสั่งได้ 6คะแนน</MenuItem>
                    <MenuItem value={5}>M5 เคลื่อนไหวตอบสนองต่อความเจ็บปวด (ยกมือกดจุดที่เจ็บ) 5คะแนน</MenuItem>
                    <MenuItem value={4}>M4 หลบหลีกความเจ็บปวด (การถอนตัว) 4คะแนน</MenuItem>
                    <MenuItem value={3}>M3 การตอบสนองที่ผิดปกติ (การงอแขนขา) 3คะแนน</MenuItem>
                    <MenuItem value={2}>M2 การตอบสนองที่แย่ลง (การเหยียดแขนขา) 2คะแนน</MenuItem>
                    <MenuItem value={1}>M1 ไม่ตอบสนอง 1คะแนน</MenuItem>
                </Select>
            </FormControl>

        </Box>
    )
}
