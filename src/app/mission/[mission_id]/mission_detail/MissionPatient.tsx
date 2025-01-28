'use clietn'
import { MissionById } from '@/models/mission.model'
import React from 'react'
import SupervisorAccountIcon from '@mui/icons-material/SupervisorAccount';
import MissionPateintCard from './MissionPateintCard';
import ManIcon from '@mui/icons-material/Man';
import WomanIcon from '@mui/icons-material/Woman';

type Props = {
    mission: MissionById
}

export default function MissionPatient({ mission }: Props) {

    return (
        <div className='flex flex-row justify-around items-start w-full'>
            <MissionPateintCard
                Icon={SupervisorAccountIcon}
                background='bg-green-100 cursor-pointer'
                border='border-green-300 hover:border-green-600'
                color={'success'}
                fontColor={'text-green-900'}
                count={`${mission.patients.length} คน`}
                title='จำนวนผู้ป่วยทั้งหมด'
            />
            <MissionPateintCard
                Icon={ManIcon}
                background='bg-blue-100 cursor-pointer'
                border='border-blue-300 hover:border-blue-500'
                color={'primary'}
                fontColor={'text-blue-950'}
                count={`${mission.patients.filter(r => r.gender.toLocaleLowerCase() === 'male').length} คน`}
                title='จำนวนผู้ป่วยเพศชาย'
            />
            <MissionPateintCard
                Icon={WomanIcon}
                background='bg-red-100 cursor-pointer'
                border='border-red-300 hover:border-red-500'
                color={'error'}
                fontColor={'text-red-700'}
                count={`${mission.patients.filter(r => r.gender.toLocaleLowerCase() === 'female').length} คน`}
                title='จำนวนผู้ป่วยเพศหญิง'
            />

        </div>
    )
}
