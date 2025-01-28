'use client'
import EcgChartJS from '@/components/chart/EcgChartJs'
import PlethChartJs from '@/components/chart/PlethChartJs'
import { socket } from '@/configs/socket.config'
import { ContactRound, History } from 'lucide-react'
import React, { useEffect, useState } from 'react'

type Props = {
    device: Device
}

export default function ChartDetail({ device }: Props) {
    const [spo, setSpo] = useState<number>(0)
    return (
        <div className='p-3 bg-gray-600 w-full sm:max-w-[725px]'>
            <div className=' p-3 flex flex-row items-center justify-start'>
                <img className='w-[45px] h-[45px] rounded-[50%] object-contain border-white border' src={Array.isArray(device.Patient) ? device.Patient[0].image : ""} alt="" />
                <div className='ml-4 flex flex-col sm:flex-row justify-between items-start sm:items-center w-full'>
                    <p className='text-xl text-white border-b border-white w-full mb-3'>{Array.isArray(device.Patient) ? device?.Patient[0].first_name : ""} {Array.isArray(device.Patient) ? device.Patient[0].last_name : ""}</p>
                    <div className='flex flex-row items-center justify-end'>
                        {
                            Array.isArray(device.Patient) ?
                                device.Patient[0].gender.toLocaleLowerCase() === 'male' ?
                                    <p className='ml-2 text-white bg-sky-500 p-2 w-[40px] text-center rounded-[50%]'>M</p>          
                                    :  <p className='ml-2 text-white bg-pink-400 p-2 w-[40px] text-center rounded-[50%]'>FM</p>
                                : null

                        }
                        <History className='ml-2 text-white bg-green-600 p-2 w-[50px] h-[40px] text-center cursor-pointer rounded-lg hover:bg-green-700' />
                        <ContactRound className='ml-2 text-white bg-orange-600 p-2 w-[50px] h-[40px] text-center cursor-pointer rounded-lg hover:bg-orange-700' />
                    </div>
                </div>
            </div>
            <div className='flex flex-col-reverse md:flex-row justify-between items-center'>
                <EcgChartJS device={{ device_id: device.device_id } as Device} />
                <div className='bg-black p-2 border-3 border-gray-600 text-green-700 flex flex-row items-center w-full h-20 sm:h-[88px] justify-end'>
                    <p className='h-full justify-start items-center font-bold'>HR</p>
                    <p className='text-[3rem] m-2 font-bold'>72</p>
                    <p className='h-full flex flex-col justify-end items-center'>bpm</p>
                </div>
            </div>
            <div className='flex flex-col-reverse md:flex-row justify-between items-center border-t-4 border-gray-600'>
                <PlethChartJs device={{ device_id: device.device_id } as Device} />
                <div className='bg-black p-2 border-3 border-gray-600 text-sky-400 flex flex-row items-center w-full h-20 sm:h-[88px] justify-end'>
                    <p className='h-full justify-start items-center font-bold'>sp02</p>
                    <p className='text-[3rem] m-2 font-bold'>{spo}</p>
                    <p className='h-full flex flex-col justify-end items-center'>%</p>
                </div>
            </div>
            {/* <PlethChartJs device={{ device_id: device.device_id } as Device} /> */}
        </div>
    )
}
