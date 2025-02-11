import Loadding from '@/components/Loadding'
import { StationPatient } from '@/models/patient'
import { toast } from '@/services/alert.service'
import { createStationPatient, findPatientAllByStation, findStationAll } from '@/services/paitent.service'
import React, { Dispatch, SetStateAction, useCallback, useEffect, useState } from 'react'
import ModalTransferPatient from './ModalTransferPatient'
import { enviromentDev } from '@/configs/enviroment.dev'
import { useRouter, useSearchParams } from 'next/navigation'
import { CirculationsContext, PatientIdContext, PhysicalStatusContext, TraigeLevelContext, TreatmentContext } from './[patient_id]/history/StepContext'
import StepHistory from './[patient_id]/history/StepHistory'
import { PhysicalStatus, TriageLevels } from '@/models/historyDetail.model'
import { Treatments } from '@/models/traeteMent'
import { Circulations } from './[patient_id]/history/stepForm/Circulation'

type Props = {
    stationPatient: StationPatient[]
    setStationPatient: Dispatch<SetStateAction<StationPatient[]>>
    title: string
}

export default function TemplateTable({ stationPatient, setStationPatient, title }: Props) {
    const [load, setLoad] = useState<boolean>(false)
    const [openModals, setOpenModals] = useState<{ [key: string]: boolean }>({})
    const [open, setOpen] = useState(false)
    const [patient_id, setPatient_id] = useState<string>('')

    const [triageLevel, setTriageLevel] = useState<TriageLevels>({} as TriageLevels)
    const [physicalStatus, setPhysicalStatus] = useState<PhysicalStatus>({} as PhysicalStatus)
    const [treatment, setTreatment] = useState({} as Treatments)
    const [circulation, setCirculation] = useState<Circulations>({
        acetar: false,
        half_d_n_two: false,
        iv_fluid: false,
        nss: false,
        on_heparin_lock: false,
        rls: false,
        ten_d_n_two: false,
        other: {
            bool: false,
            txt: ''
        },
        direct_pressure: false,
        pressure_dressing: false,
        stop_bleed: false,
        tourniquet: false,
        immobilization: false,
        ked: false,
        pressure: false,
        sprint: false,
        cpr: false,
        aed: false
    })

    const router = useRouter()

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
            if (title === 'triage') {
                const result = await findStationAll(1, 100, new Date().toISOString().split("T")[0])
                setStationPatient(result.data || [])
            }
            else {
                const result = await findPatientAllByStation(title, 1, 100, new Date().toISOString().split("T")[0])
                setStationPatient(result.data || [])
            }
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
                        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400 mt-4">
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
                                                <td className="align-baseline px-6 py-4 flex flex-row items-start justify-center gap-2">
                                                    {
                                                        title === "triage" ?
                                                            <>
                                                                <button onClick={() => {
                                                                    setOpen(true)
                                                                    setPatient_id(r.id)
                                                                }} className="text-blue-600 hover:underline border w-[130px] border-blue-600 rounded-lg p-2">Triage ผู้ป่วย</button>
                                                                <button onClick={() => toggleModal(r.id)} className="ml-3 text-green-600 w-[130px] hover:underline border border-green-600 rounded-lg p-2">ส่งออกผู้ป่วย</button>
                                                                <button onClick={() => {
                                                                    setLoad(true)
                                                                    router.push('/patient/' + r.id + '/exam')
                                                                }} className="ml-3 text-yellow-600 hover:underline border w-[130px] border-yellow-600 rounded-lg p-2">เพิ่มรูปภาพแผล</button>
                                                                <button onClick={() => {
                                                                    setLoad(true)
                                                                    router.push('/device?key=add')
                                                                }} className="ml-3 text-red-600 hover:underline border w-[160px] border-red-600 rounded-lg p-2">เพิ่มเครื่องวัดสัญญานชีพ</button>
                                                            </> : <button onClick={() => toggleModal(r.id)} className="ml-3 text-green-600 w-[130px] hover:underline border border-green-600 rounded-lg p-2">ส่งออกผู้ป่วย</button>
                                                    }
                                                    <ModalTransferPatient
                                                        key={r.id}
                                                        open={openModals[r.id]}
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

            <div className={`${open ? "z-20" : "hidden"} fixed top-0 left-0 w-full h-screen flex items-center justify-center z-20`}>
                <div className='bg-black w-full h-screen fixed top-0 left-0 opacity-25' onClick={() => setOpen(false)}></div>
                <div className='bg-white p-3 z-30 w-[420px] m-2'>
                    <CirculationsContext.Provider value={{ circulation, setCirculation }}>
                        <TraigeLevelContext.Provider value={{ triageLevel, setTriageLevel }}>
                            <TreatmentContext.Provider value={{ treatment, setTreatment }} >
                                <PhysicalStatusContext.Provider value={{ physicalStatus, setPhysicalStatus }} >
                                    <PatientIdContext.Provider value={{ patient_id, setPatient_id }}>

                                        <StepHistory />

                                    </PatientIdContext.Provider>
                                </PhysicalStatusContext.Provider>
                            </TreatmentContext.Provider>
                        </TraigeLevelContext.Provider>
                    </CirculationsContext.Provider>


                </div>
            </div>
            {load && <Loadding />}
        </>
    )
}
