'use client'
import EcgChartJS from '@/components/chart/EcgChartJs'
import PlethChartJs from '@/components/chart/PlethChartJs'
import { enviromentDev } from '@/configs/enviroment.dev'
import { socket } from '@/configs/socket.config'
import { ContactRound, History, ScreenShare, UserRoundPlus } from 'lucide-react'
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import { NIL } from 'uuid'

type Props = {
    device: Device
}

export default function ChartDetail({ device }: Props) {
    const [spo, setSpo] = useState<number>(0)
    const [ecg, setEcg] = useState<number>(0)
    const [bp, setBp] = useState<number>(0)
    const [dia, setDia] = useState<number>(0)
    const [pr, setPr] = useState<number>(0)
    const [sys, setSys] = useState<number>(0)
    const [mean, setMean] = useState<number>(0)
    const [load, setLoad] = useState<boolean>(false)
    const router = useRouter()

    useEffect(() => {
        socket.off('spo2/' + device.device_id);
        socket.on('spo2/' + device.device_id, (message: any) => {
            console.log("SPO@: ", message);
            setSpo(message.spo2)
        });
    }, [spo]);

    useEffect(() => {
        socket.off('ecg_hl/' + device.device_id);
        socket.on('ecg_hl/' + device.device_id, (message: any) => {
            console.log("SPO@: ", message);
            setEcg(message.ecg_hr)
        });
    }, [spo]);

    useEffect(() => {
        socket.off('bp/' + device.device_id);
        socket.on('bp/' + device.device_id, (message: any) => {
            setMean(message.mean)
            setSys(message.sys)
            setDia(message.dia)
        });
    }, [spo]);
    return (
        <div className='p-3 bg-gray-600 w-full sm:max-w-[725px]' id={device.device_id}>
            <div className=' p-3 flex flex-row items-center justify-start'>
                <img className='w-[45px] h-[45px] rounded-[50%] object-contain border-white border' src={device?.patient?.length > 0 ? device?.patient[0]?.image : enviromentDev.noImage} alt="" />
                <div className='ml-4 flex flex-col sm:flex-row justify-between items-start sm:items-center w-full'>
                    <div className='flex flex-col items-start justify-center w-full'>
                        <p className='text-xl text-white border-b border-white w-full mb-3'>{device?.patient?.length > 0 ? device?.patient[0]?.first_name : "ไม่มีข้อมูล"} {device?.patient?.length > 0 ? device.patient[0]?.last_name : "ไม่มีข้อมูล"}</p>
                        <div className='text-white '><span>DeviceID: </span> <span className='text-green-600'>{device.device_id}</span></div>
                    </div>
                    <div className='flex flex-row items-center justify-end'>
                        {
                            device?.patient?.length > 0 ?
                                device.patient[0]?.gender.toLocaleLowerCase() === 'male' ?
                                    <p className='ml-2 text-white bg-sky-500 p-2 w-[40px] text-center rounded-[50%]'>M</p>
                                    : <p className='ml-2 text-white bg-pink-400 p-2 w-[40px] text-center rounded-[50%]'>FM</p>
                                : null

                        }
                        <ScreenShare onClick={() => window.location.href = '/monitors/' + device.device_id} className='ml-2 text-white bg-green-600 p-2 w-[50px] h-[40px] text-center cursor-pointer rounded-lg hover:bg-green-700' />
                        {
                            device?.patient?.length > 0 ?
                                <ContactRound className='ml-2 text-white bg-orange-600 p-2 w-[50px] h-[40px] text-center cursor-pointer rounded-lg hover:bg-orange-700' />
                                : <UserRoundPlus onClick={() => {
                                    setLoad(true)
                                    router.push('/patient?device_id='+ device.device_id)
                                }} className='ml-2 text-white bg-sky-600 p-2 w-[50px] h-[40px] text-center cursor-pointer rounded-lg hover:bg-sky-700' />
                        }
                    </div>
                </div>
            </div>
            <div>
                <div className='flex flex-row items-start justify-end border-b border-gray-400 w-full'>
                    <div className='bg-black p-2 border-3 border-gray-600 text-white flex flex-row items-center w-full h-20 sm:h-[88px] justify-end'>
                        <p className='h-full justify-start items-center font-bold'>NIBP</p>
                        <p className='text-[3rem] m-2 font-bold'>{sys}/{dia}({mean})</p>
                        <p className='h-full flex flex-col justify-end items-center'>mmHg</p>
                    </div>
                </div>
                <div className='flex flex-col-reverse md:flex-row justify-between items-center'>
                    <EcgChartJS device={{ device_id: device.device_id } as Device} />
                    <div className='bg-black p-2 border-3 border-gray-600 text-green-700 flex flex-row items-center w-full h-20 sm:h-[88px] justify-end'>
                        <p className='h-full justify-start items-center font-bold'>HR</p>
                        <p className='text-[3rem] m-2 font-bold'>{ecg}</p>
                        <p className='h-full flex flex-col justify-end items-center'>bpm</p>
                    </div>
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
