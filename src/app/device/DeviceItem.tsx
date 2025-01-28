'use client'
import * as React from 'react';
import EditIcon from '@mui/icons-material/Edit';
import { useRouter, useSearchParams } from 'next/navigation';
import { DiamondPlus, FilePenLine } from 'lucide-react';
import Loadding from '@/components/Loadding';
import {Effect} from 'effect'
import { updatePatient } from '@/services/paitent.service';
import { Patients } from '@/models/patient';

type Props = {
  deviceItem: Device;
  index: number;
};

export default function AlignItemsList({ deviceItem, index }: Props) {
  const key = useSearchParams().get('key')
  const patient_id = useSearchParams().get('patient_id')
  const [load, setLoad] = React.useState<boolean>(false)

  async function onAddDeviceInPatient() {
    setLoad(true)
    const newData = {} as Patients
    newData.deviceId = deviceItem.id
    const programs = Effect.tryPromise({
      catch: e => alert(JSON.stringify(e)),
      try: () => updatePatient(patient_id as string, newData)
    })
    const result = await Effect.runPromise(programs)
    console.log(result.data);
    
    // router.back()

  }

  const router = useRouter();
  return (
    <>
      <div
        className='w-full flex flex-row items-center justify-between my-5 p-2 border border-gray-400 rounded-lg'
      >
        <div className='w-full flex-row flex justify-between'>
          <p className='border-r border-gray-400 pr-2'>{index + 1}</p>
          <div className='border-r border-gray-400 pr-2 w-full p-2'>
            <p className='text-sm text-black'>เลขเครื่อง : <span className='text-lg font-bold text-green-600'>{deviceItem.device_id}</span></p>
            <p className='text-sm text-black'>ยี่ห้อ: <span className='text-md text-blue-600'>{deviceItem.brand}</span></p>
            <p className='text-sm text-black'>ประเภท: <span className='text-md text-yellow-600'>{deviceItem.type}</span></p>
          </div>
          <div className='flex justify-center items-center cursor-pointer'>
            {

              key ?
                <DiamondPlus onClick={onAddDeviceInPatient} className='text-white w-8 h-8 bg-red-600 p-1 rounded-md' />
                : <FilePenLine className='text-white w-8 h-8 bg-orange-400 p-1 rounded-md' onClick={() => {
                  setLoad(true)
                  router.push(`/device/${deviceItem.id}`)
                }} />
            }
          </div>
        </div>
      </div>

      {
        load?
        <Loadding />: null
      }
    </>
  );
}
