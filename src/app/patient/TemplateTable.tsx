import Loadding from '@/components/Loadding'
import { StationPatient } from '@/models/patient'
import { toast } from '@/services/alert.service'
import { createStationPatient, findPatientAllByStation } from '@/services/paitent.service'
import { Search } from 'lucide-react'
import React, { Dispatch, SetStateAction, useCallback, useEffect, useState } from 'react'
import ModalTransferPatient from './ModalTransferPatient'
import { enviromentDev } from '@/configs/enviroment.dev'

type Props = {
    stationPatient: StationPatient[]
    setStationPatient: Dispatch<SetStateAction<StationPatient[]>>
    title: string
}

export default function TemplateTable({ stationPatient, setStationPatient, title }: Props) {
    const [load, setLoad] = useState<boolean>(false)
    const [openModals, setOpenModals] = useState<{ [key: string]: boolean }>({})

    async function onReturnData(station: string, patient_id: string) {
        if (!patient_id) {
            toast('Patient ID ไม่ถูกต้อง', 'error')
            return
        }
        setLoad(true)
        try {
            await createStationPatient(patient_id, { station })
            window.location.reload()
        } catch (error) {
            console.error(error)
            toast('เกิดข้อผิดพลาดในการส่งข้อมูล', 'error')
        } finally {
            setLoad(false)
        }
    }

    function toggleModal(patient_id?: string) {

        if (!patient_id) return
        setOpenModals((prev) => ({ ...prev, [patient_id]: !prev[patient_id] }))
    }

    const findStation = useCallback(async () => {
        setLoad(true)
        try {
            const result = await findPatientAllByStation(title, 1, 100, new Date().toISOString().split("T")[0])
            setStationPatient(result.data || [])
        } catch (error: any) {
            console.error(error)
            toast(error.message, 'error')
        } finally {
            setLoad(false)
        }
    }, [setStationPatient, title])

    useEffect(() => {
        findStation()
    }, [findStation])

    return (
        <>
            <div>
                <div className="relative overflow-x-auto shadow-md sm:rounded-lg border border-gray-200">
                    <div className='flex items-center justify-center mt-3'>
                        <div className='flex flex-row items-center justify-center p-3 border border-gray-400 rounded-lg'>
                            <span className='text-lg'>ตารางผู้ป่วยใน</span>
                            <p className='ml-2 text-2xl font-medium'>{title}</p>
                        </div>
                    </div>
                    <div className='overflow-auto'>
                        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400 ">
                            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                                <tr>
                                    <th className="px-6 py-3 w-full">ชื่อ สกุล</th>
                                    <th className="px-6 py-3">เวลาเข้า</th>
                                    <th className="px-6 py-3">เวลาออก</th>
                                    <th className="px-6 py-3">ส่งไป</th>
                                </tr>
                            </thead>
                            <tbody>
                                {Array.isArray(stationPatient) && stationPatient.length > 0 ? (
                                    stationPatient.map((r) => (
                                        r.Patient ? (
                                            <tr key={r.id} className="bg-white border-b hover:bg-gray-50 dark:bg-gray-800 dark:border-gray-700">
                                                <th scope="row" className="w-full flex items-center px-6 py-4 text-gray-900 dark:text-white">
                                                    <img className="w-10 h-10 rounded-full" src={r.Patient.image || enviromentDev.noImage} alt="Patient" />
                                                    <div className="ps-3">
                                                        <div className="text-base font-semibold">{r.Patient.first_name} {r.Patient.last_name}</div>
                                                    </div>
                                                </th>
                                                <td className="px-6 py-4">{new Date(r.create_date).toLocaleString('th-TH')}</td>
                                                <td className="px-6 py-4">{new Date(r.out_date ?? r.create_date).toLocaleString('th-TH')}</td>
                                                <td className="px-6 py-4">
                                                    <button onClick={() => toggleModal(r.id)} className="text-blue-600 hover:underline">ส่งออกผู้ป่วย</button>
                                                    <ModalTransferPatient
                                                        key={r.id}
                                                        open={!!openModals[r.id]}
                                                        setOpen={() => toggleModal(r.patient_id)}
                                                        query=''
                                                        patient_id={r.patient_id ?? ''}
                                                        returnData={onReturnData}
                                                    />
                                                </td>
                                            </tr>
                                        ) : null
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan={4} className="text-center py-4">ไม่มีข้อมูลผู้ป่วย</td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>

                </div>
            </div>
            {load && <Loadding />}
        </>
    )
}
