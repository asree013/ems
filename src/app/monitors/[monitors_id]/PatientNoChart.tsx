'use client'
import EcgChartJS from '@/components/chart/EcgChartJs'
import PlethChartJs from '@/components/chart/PlethChartJs'
import { socket } from '@/configs/socket.config'
import { Patients } from '@/models/patient'
import { ContactRound, History } from 'lucide-react'
import React, { useEffect, useState } from 'react'

type Props = {
    patient: Patients
}

export default function PatientNoChart({ patient }: Props) {
    const [spo, setSpo] = useState<number>(0)
    return (
        <div className='p-3 bg-gray-600 w-full sm:max-w-[725px]'>
            <div className=' p-3 flex flex-row items-center justify-start'>
                <img className='w-[45px] h-[45px] rounded-[50%] object-contain border-white border' src={patient.image } alt="" />
                <div className='ml-4 flex flex-col sm:flex-row justify-between items-start sm:items-center w-full'>
                    <p className='text-xl text-white border-b border-white w-full mb-3'>{patient.first_name} {patient.last_name }</p>
                    <div className='flex flex-row items-center justify-end'>
                        {
                                patient.gender.toLocaleLowerCase() === 'male' ?
                                    <p className='ml-2 text-white bg-sky-500 p-2 w-[40px] text-center rounded-[50%]'>M</p>          
                                    :  <p className='ml-2 text-white bg-pink-400 p-2 w-[40px] text-center rounded-[50%]'>FM</p>
                        }
                        <History className='ml-2 text-white bg-green-600 p-2 w-[50px] h-[40px] text-center cursor-pointer rounded-lg hover:bg-green-700' />
                        <ContactRound className='ml-2 text-white bg-orange-600 p-2 w-[50px] h-[40px] text-center cursor-pointer rounded-lg hover:bg-orange-700' />
                    </div>
                </div>
            </div>
            {/* <PlethChartJs device={{ device_id: device.device_id } as Device} /> */}
        </div>
    )
}
