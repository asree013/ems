"use client"

import Loadding from '@/components/Loadding';
import PaginationThemplete from '@/components/PaginationThemplete';
import QRScannerComponent from '@/components/QrcodeScan';
import { PatientContextsArr } from '@/contexts/patient.context';
import { Patients, StationPatient } from '@/models/patient';
import { toast } from '@/services/alert.service';
import { findPatientAll, findPatientAllByStation, findPatientByQrNumber } from '@/services/paitent.service';
import { timeOutJwt } from '@/services/timeout.service';
import { Divider } from '@mui/material';
import React, { useCallback, useEffect, useState } from 'react';

import TabPatient from './TabPateint';
import BreadCrumb, { TBreadCrumd } from '@/components/BreadCrumb';
import PatientTable from './PatientTable';
import { useRouter, useSearchParams } from 'next/navigation';
import { Link } from 'lucide-react';
import TemplateTable from './TemplateTable';

const items: TBreadCrumd[] = [
  {
    labe: 'หน้าหลัก',
    path: '/home'
  },
  {
    labe: 'ผู้ป่วย',
    path: '/patient'
  },
]


export default function Page() {
  const query = useSearchParams().get('table_name')
  const router = useRouter()
  const [load, setLoad] = useState<boolean>(false)
  const [patients, setPatients] = useState<Patients[]>([]);
  const [stationPatient, setStationPatient] = useState<StationPatient[]>({} as StationPatient[])

  async function onUpdatePage(page: number, limit: number) {
    setLoad(true)
    try {
      const result = await findPatientAll(page, 11)
      setPatients(result.data)
    } catch (error) {
      timeOutJwt(error)
    } finally {
      setLoad(false)
    }

  }

  const feedPateint = useCallback(async () => {
    setLoad(true);
    try {
      const result = await findPatientAll(1, 100);

      setPatients(result.data)

    } catch (error) {
      console.log(error);
      timeOutJwt(error)
    } finally {
      setLoad(false);
    }
  }, [setPatients]);

  async function onScan(str: string) {
    setLoad(true)
    try {
      const result = await findPatientByQrNumber(str)
      const data = []
      data.push(result.data)
      setPatients(data)
    } catch (error: any) {
      toast(error.message, 'error')
    } finally {
      setLoad(false)
    }

  }

  async function onClickSear(str: string) {
    setLoad(true)
    try {
      const result = await findPatientByQrNumber(str)
      let dataP: any[] = []
      dataP.push(result.data)
      setPatients(dataP)
      console.log(dataP);

    } catch (error: any) {
      toast(error.message, 'error')
    } finally {
      setLoad(false)
    }

  }
  useEffect(() => {
    feedPateint();

    return () => {
      feedPateint
    }
  }, [feedPateint]);

  return (
    <>
      {/* <PatientList patient={{} as Patient}/> */}
      <BreadCrumb item={items} />
      <PatientContextsArr.Provider value={{ patients, setPatients }} >

        <div className='flex flex-wrap gap-3 p-3'>
          <button onClick={() => {
            router.push('/patient')
          }} className='p-3 bg-rose-400 hover:bg-rose-500 min-w-[100px] text-white rounded-lg'>ผู้ป่วยสะสม</button>
          <button onClick={() => {
            router.push('/patient?table_name=triage')
          }} className='p-3 bg-teal-400 hover:bg-teal-500 min-w-[100px] text-white rounded-lg'>Triage</button>
          <button onClick={async () => {
            router.push('/patient?table_name=ER')
          }} className='p-3 bg-red-400 hover:bg-red-500 min-w-[100px] text-white rounded-lg'>ER</button>
          <button onClick={() => {
            router.push('/patient?table_name=OPD')
          }
          } className='p-3 bg-blue-400 hover:bg-blue-500 min-w-[100px] text-white rounded-lg'>OPD</button>
          <button onClick={() => {
            router.push('/patient?table_name=Ward')
          }} className='p-3 bg-green-400 hover:bg-green-500 min-w-[100px] text-white rounded-lg'>Ward</button>
          <button onClick={() => router.push('/patient?table_name=OR')} className='p-3 bg-yellow-400 hover:bg-yellow-500 min-w-[100px] text-white rounded-lg'>OR</button>
          <button onClick={() => router.push('/patient?table_name=IPD')} className='p-3 bg-purple-400 hover:bg-purple-500 min-w-[100px] text-white rounded-lg'>IPD</button>
          <button onClick={() => router.push('/patient?table_name=D-C')} className='p-3 bg-pink-400 hover:bg-pink-500 min-w-[100px] text-white rounded-lg'>D/C</button>
          <button onClick={() => router.push('/patient?table_name=Refer')} className='p-3 bg-orange-400 hover:bg-orange-500 min-w-[100px] text-white rounded-lg'>Refer</button>
          <button onClick={() => router.push('/patient?table_name=Lose')} className='p-3 bg-gray-400 hover:bg-gray-500 min-w-[100px] text-white rounded-lg'>Lose</button>
          <button onClick={() => router.push('/patient?table_name=Death')} className='p-3 bg-black hover:bg-black min-w-[100px] text-white rounded-lg'>Death</button>
        </div>

        <Divider sx={{ marginTop: '10px' }} className='mb-4' />
        {
          !query ?
            <PatientTable setPatient={setPatients} patients={patients} /> : <TemplateTable stationPatient={stationPatient} setStationPatient={setStationPatient} title={query} />
        }



        {
          !query ?
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', marginTop: '25px' }}>
              <PaginationThemplete returnCurrent={onUpdatePage} />
            </div> : null
        }

      </PatientContextsArr.Provider>


      {
        load ?
          <Loadding /> :
          null
      }
    </>
  );
}

