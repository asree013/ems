import Loadding from '@/components/Loadding'
import { Patients } from '@/models/patient'
import { Search } from 'lucide-react'
import Link from 'next/link'
import React, { useState } from 'react'
import { NIL } from 'uuid'
import ModalTransferPatient from './ModalTransferPatient'
import { createStationPatient } from '@/services/paitent.service'
import { PhysicalStatus, TriageLevels } from '@/models/historyDetail.model'
import StepHistory from './[patient_id]/history/StepHistory'
import { CirculationsContext, PatientIdContext, PhysicalStatusContext, TraigeLevelContext, TreatmentContext } from './[patient_id]/history/StepContext'
import { Circulations } from './[patient_id]/history/stepForm/Circulation'
import { Treatments } from '@/models/traeteMent'
import { useRouter } from 'next/navigation'
import { enviromentDev } from '@/configs/enviroment.dev'

type Props = {
  patient: Patients[]
}

export default function PatientTable({ patient }: Props) {
  const [triageLevel, setTriageLevel] = useState<TriageLevels>({} as TriageLevels)
  const [physicalStatus, setPhysicalStatus] = useState<PhysicalStatus>({} as PhysicalStatus)
  const [load, setLoad] = useState<boolean>(false)
  const [openModals, setOpenModals] = useState<{ [key: string]: boolean }>({})
  const [patient_id, setPatient_id] = useState<string>('')

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

  const [open, setOpen] = useState(false)

  const router = useRouter()

  async function onReturnData(station: string, patient_id: string) {
    await createStationPatient(patient_id, { station })
    toggleModal(patient_id)
    window.location.reload()
  }

  function toggleModal(patient_id: string) {
    setOpenModals((prev) => ({ ...prev, [patient_id]: !prev[patient_id] }))
  }

  return (
    <>
      <div>
        <div className="relative overflow-x-auto shadow-md sm:rounded-lg border border-gray-200">
          <div className="flex items-center justify-between flex-wrap p-3 bg-white dark:bg-gray-900">
            {/* <select className="border border-gray-300 rounded-lg px-3 py-1.5">
              <option disabled selected>ขัดกรอง</option>
              <option>ผู้ป่วยทั้งหมด</option>
              <option>ผู้ป่วยที่มีเครื่องรับส่งสัญญาณชีพ</option>
              <option>ผู้ป่วยที่วินิจฉัยแล้ว</option>
            </select> */}
            <div className='flex flex-col sm:flex-row justify-end items-start w-full gap-2'>
              <input type="text" placeholder="ค้นหา..." className="border rounded-lg px-3 py-2" />
              <div className='flex flex-row items-center justify-center'>
                <button className='gap-3 bg-gray-100 hover:bg-gray-200 rounded-lg p-3'><Search /></button>
                <Link onClick={() => setLoad(true)} href={'/patient/' + NIL} className='ml-4 bg-blue-900 text-center hover:bg-blue-950 text-white py-2 px-3 w-full lg:w-[130px] rounded-lg'>เพิ่มผู้ป่วย</Link>
              </div>
            </div>
          </div>

          <div className='overflow-auto'>
            <table className="w-full text-sm text-gray-500">
              <thead className="text-xs bg-gray-50">
                <tr>
                  <th className="p-4"><input type="checkbox" /></th>
                  <th className="px-6 py-3">ชื่อ สกุล</th>
                  <th className="px-6 py-3">Triage</th>
                  <th className="px-6 py-3">ส่งไป</th>
                  <th className="px-6 py-3">Action</th>
                </tr>
              </thead>
              <tbody>
                {patient.map((r) => (
                  <tr key={r.id} className="border-b hover:bg-gray-50">
                    <td className="align-baseline p-4"><input type="checkbox" /></td>
                    <td className="align-baseline px-6 py-4 flex items-center">
                      <img className="w-10 h-10 rounded-full" src={r.image ?? enviromentDev.noImage} alt="patient" />
                      <div className="ml-3">
                        <div className="font-semibold">{r.first_name} {r.last_name}</div>
                        <div className="text-gray-500">neil.sims@flowbite.com</div>
                      </div>
                    </td>
                    <td className="align-baseline px-6 py-4">{r?.History[0]?.triage_lavel ?? "ยังไม่ได้ triage"}</td>
                    <td className="align-baseline px-6 py-4">{r?.StationPatientList[0]?.station ? convertStationString(r?.StationPatientList[0]?.station) : "ยังไม่ได้ส่งออก"}</td>
                    <td className="align-baseline px-6 py-4 flex flex-row items-start justify-center gap-2">
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
                    </td>

                    <ModalTransferPatient
                      key={r.id}
                      open={openModals[r.id] || false}
                      setOpen={() => toggleModal(r.id)}
                      query=''
                      patient_id={r.id}
                      returnData={onReturnData}
                    />
                  </tr>
                ))}
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

function convertStationString(str: string) {
  switch (true) {
    case str.includes('ER'):
      return <p className='bg-red-500 p-2 text-white text-center'>ER</p>
    case str.includes('OPD'):
      return <p className='bg-blue-500 p-2 text-white text-center'>OPD</p>
    case str.includes('Ward'):
      return <p className='bg-green-500 p-2 text-white text-center'>Ward</p>
    case str.includes('OR'):
      return <p className='bg-yellow-500 p-2 text-white text-center'>OR</p>
    case str.includes('IPD'):
      return <p className='bg-purple-500 p-2 text-white text-center'>IPD</p>
    case str.includes('D-C'):
      return <p className='bg-pink-500 p-2 text-white text-center'>D-C</p>
    case str.includes('Refer'):
      return <p className='bg-orange-500 p-2 text-white text-center'>Refer</p>
    case str.includes('Lose'):
      return <p className='bg-gray-500 p-2 text-white text-center'>Lose</p>
    case str.includes('Death'):
      return <p className='bg-black p-2 text-white text-center'>Death</p>
  }
}
