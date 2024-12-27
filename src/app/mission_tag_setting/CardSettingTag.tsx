import { MissionTagSetting } from '@/models/missionTagSetting.model'
import { Divider } from '@mui/material'
import React from 'react'
import { FileCog, Trash2 } from 'lucide-react'

type Props = {
    data: MissionTagSetting,
}

export default function CardSettingTag({ data }: Props) {
    return (
        <div className='shadow-shadow rounded-md'>
            <div className='flex flex-row items-start justify-between mt-2'>
                <p className='text-lg font-bold w-[60px]'>ขั้นที่ {data.seq}</p>
                <p className=''>{data.label}</p>
            </div>
            <div className='flex flex-row items-center justify-end'>
                <FileCog className='mr-2 cursor-pointer' color="#103489" />
                <Trash2 className='mr-2 cursor-pointer' color="#dd0303" />
            </div>
            <Divider className='mt-2' />
        </div>
    )
}
