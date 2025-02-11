import { X } from 'lucide-react'
import React, { Dispatch, SetStateAction } from 'react'
import clsx from 'clsx'
import { createStationPatient } from '@/services/paitent.service'
import { Patients } from '@/models/patient'

type Props = {
  query: string
  open: boolean
  setOpen: Dispatch<SetStateAction<boolean>>
  patient_id: string,
  returnData: (newStation: string, patient_id: string) => void
} 

export default function ModalTransferPatient({ open, query, setOpen, patient_id, returnData }: Props) {
  function onCLickUpdateStation(newStation: string) {
    returnData(newStation, patient_id)
    setOpen(false)
  }

  const stations = [
    { label: 'ER', color: 'border-red-500', bg: 'bg-red-500', text: 'text-red-500' },
    { label: 'OPD', color: 'border-blue-500', bg: 'bg-blue-500', text: 'text-blue-500' },
    { label: 'Ward', color: 'border-green-500', bg: 'bg-green-500', text: 'text-green-500' },
    { label: 'OR', color: 'border-yellow-600', bg: 'bg-yellow-600', text: 'text-yellow-600' },
    { label: 'IPD', color: 'border-purple-500', bg: 'bg-purple-500', text: 'text-purple-500' },
    { label: 'D-C', color: 'border-pink-500', bg: 'bg-pink-500', text: 'text-pink-500' },
    { label: 'Refer', color: 'border-orange-500', bg: 'bg-orange-500', text: 'text-orange-500' },
    { label: 'Lose', color: 'border-gray-400', bg: 'bg-gray-400', text: 'text-gray-400' },
    { label: 'Death', color: 'border-gray-500', bg: 'bg-gray-500', text: 'text-gray-500' }
  ]

  return (
    <div className={`${open ? 'z-20' : 'hidden'} fixed top-0 left-0 flex items-center justify-center h-screen w-full`}>
      <div className="fixed top-0 left-0 w-full h-screen bg-black opacity-30" onClick={() => setOpen(false)}></div>
      <div className="bg-white p-5 z-30 rounded-lg w-[480px] max-h-[500px] m-3">
        <div className="flex flex-row items-center justify-between">
          <p className="text-xl font-medium">เลือกการส่งต่อผู้ป่วย</p>
          <X onClick={() => setOpen(false)} className="cursor-pointer" />
        </div>
        <p className="text-md font-light">สถาณะผู้ป่วยปัจจุบันอยู่ที่ {query}</p>
        <div className="flex flex-row flex-wrap my-4 gap-3">
          {stations.map(({ label, color, bg, text }) => (
            <button
              key={label}
              onClick={() => onCLickUpdateStation(label)}
              disabled={query === label}
              className={clsx(
                'border rounded-lg p-2 w-[85px] h-[85px] text-lg font-medium',
                query === label
                  ? 'border-gray-400 bg-gray-100 text-gray-500'
                  : `${color} hover:${bg} hover:text-black ${text}`
              )}
            >
              {label}
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}
