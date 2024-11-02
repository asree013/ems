'use clietn'
import { MissionById } from '@/models/mission.model'
import { Card, Chip, styled } from '@mui/material'
import React from 'react'
import SupervisorAccountIcon from '@mui/icons-material/SupervisorAccount';
import MissionPateintCard from './MissionPateintCard';

type Props = {
    mission: MissionById
}

const CardMui = styled(Card)(({ theme }) => ({
    padding: 10,
    width: 250,
    height: 100,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderRadius: 10,
    border: '1px solid green',
    background: 'rgb(199, 241, 199)'
}))

export default function MissionPatient({ mission }: Props) {

    return (
        <div>
            <MissionPateintCard
                Icon={SupervisorAccountIcon}
                background='rgb(199, 241, 199)'
                border='1px solid green'
                color={'success'}
                count={12}
                title='จำนวนผู้ป่วยทั้งหมด'
            />
        </div>
    )
}
