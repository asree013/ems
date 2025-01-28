'use client'
import React, { useContext } from 'react'
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { Divider } from '@mui/material';
import { PhysicalStatusContext, TPhysicalStatusContext } from '../StepContext';

import Rating from '@mui/material/Rating';
import StarIcon from '@mui/icons-material/Star';

const labels: { [index: string]: string } = {
    1: '1 / 15',
    2: '2 / 15',
    3: '3 / 15',
    4: '4 / 15',
    5: '5 / 15',
    6: '6 / 15',
    7: '7 / 15',
    8: '8 / 15',
    9: '9 / 15',
    10: '10 / 15',
    11: '11 / 15',
    12: '12 / 15',
    13: '13 / 15',
    14: '14 / 15',
    15: '15 / 15'
};

function getLabelText(value: number) {
    return `${value} Star${value !== 1 ? 's' : ''}, ${labels[value]}`;
}

export default function Neuro() {
    const [hover, setHover] = React.useState(-1);

    const { physicalStatus, setPhysicalStatus } = useContext<TPhysicalStatusContext>(PhysicalStatusContext)

    // คำนวณผลรวมของคะแนน E, V, M
    const totalScore = (physicalStatus?.neuro?.e ?? 0) + (physicalStatus?.neuro?.v ?? 0) + (physicalStatus?.neuro?.m ?? 0);

    return (
        <Box sx={{ minWidth: 120 }}>
            <FormControl className='mt-2' fullWidth>
                <InputLabel >E (Eye Response)</InputLabel>
                <Select
                    value={physicalStatus?.neuro?.e ?? ''}
                    onChange={(e) => {
                        setPhysicalStatus({
                            ...physicalStatus, neuro: {
                                ...physicalStatus.neuro, e: Number(e.target.value)
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
                <InputLabel >V (Verbal Response)</InputLabel>
                <Select
                    value={physicalStatus?.neuro?.v?.toString() ?? ''}
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
                <InputLabel >M (Motor Response)</InputLabel>
                <Select
                    value={physicalStatus?.neuro?.m?.toString() ?? ''}
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

            <Box sx={{ width: '100%', display: 'flex', alignItems: 'center', margin: '15px 0', flexDirection: 'column', justifyContent: 'center' }}>
                <Box sx={{ ml: 2 }}>ผลรวมคะแนน: {labels[hover !== -1 ? hover : totalScore]}</Box>
                <Rating
                    name="total-feedback"
                    value={totalScore}
                    max={15}  // ปรับจำนวนดาวให้สูงสุด 15
                    precision={1}  // กำหนดความแม่นยำให้แต่ละดาวมีค่า 1 หน่วย
                    getLabelText={getLabelText}
                    // onChangeActive={(event, newHover) => {
                    //     setHover(newHover);
                    // }}
                    emptyIcon={<StarIcon style={{ opacity: 0.55 }} fontSize="inherit" />}
                />
            </Box>
        </Box>
    )
}
