"use client"

import Loadding from '@/components/Loadding';
import PaginationThemplete from '@/components/PaginationThemplete';
import QRScannerComponent from '@/components/QrcodeScan';
import { PatientContextsArr } from '@/contexts/patient.context';
import { Patients } from '@/models/patient';
import { toast } from '@/services/alert.service';
import { findPatientAll, findPatientByQrNumber } from '@/services/paitent.service';
import { timeOutJwt } from '@/services/timeout.service';
import { Box, Button, Divider } from '@mui/material';
import { useSearchParams } from 'next/navigation';
import React, { useCallback, useEffect, useState } from 'react';
import styled from 'styled-components';
import { NIL } from 'uuid';

import PatientItem from './PatientItem';
import TabPatient from './TabPateint';


export default function Page() {
  const [load, setLoad] = useState<boolean>(false)
  const [patients, setPatients] = useState<Patients[]>([]);
  const [patientData, setPatientsData] = useState<Patients[]>([]);
  const key = useSearchParams().get('key')
  
  async function onUpdatePage(page: number, limit: number) {

    setLoad(true)
    try {
      const result = await findPatientAll(page, limit)
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
      const result = await findPatientAll(1, 5);
      setPatientsData(result.data)
      if (!key) {
        setPatients(result.data)
      }
      else if (key?.includes('add-helicopter')) {
        setPatients(result.data.filter(r => r.mission_id !== null && r.BelongHelicopter.Helicopter.id !== null));
      }
      else {
        setPatients(result.data.filter(r => r.mission_id === null && r.BelongHelicopter.Helicopter.id === null));
      }
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

  async function onFeedPatientAgain() {
    setLoad(true);
    try {
      const result = await findPatientAll(1, 5);
      // const data = await result.json<Patients[]>()
      setPatients(result.data);
    } catch (error) {
      console.log(error);
      timeOutJwt(error)
    } finally {
      setLoad(false);
    }

  }

  function onFindAll() {

    setPatients(patientData)
  }

  function onFindCars() {
    setPatients({} as Patients[])
  }

  function onFindHalicopter() {
    const newData = patientData.filter(r => r.BelongHelicopter.Helicopter.id.length > 0)
    setPatients(newData)
  }

  function onFindShip() {
    // const newData = patientData.filter(r => r.BelongChip.Chip.id.length > 0)
    setPatients({} as Patients[])
  }

  useEffect(() => {
    feedPateint();
  }, [feedPateint]);

  return (
    <>
      {/* <PatientList patient={{} as Patient}/> */}
      <PatientContextsArr.Provider value={{ patients, setPatients }} >
        <QRScannerComponent onSendResult={onScan} onClickSearch={onClickSear} onSetDefault={onFeedPatientAgain} />
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column' }}>
          <Button style={{ width: 326 }} variant='outlined' type='button' onClick={() => {
            setLoad(true)
            window.location.href = '/patient/' + NIL
          }}>+ ผู้ป่วย</Button>
          {
            String(key).length === 0 ?
              null:
              <TabPatient
                onRetunFindAll={onFindAll}
                onRetunFindCar={onFindCars}
                onRetunFindHalicopter={onFindHalicopter}
                onRetunFindShip={onFindShip}
              />
          }
        </Box>
        <Divider sx={{ marginTop: '10px' }} />
        <PatientItem />
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', marginTop: '25px' }}>
          <PaginationThemplete returnCurrent={onUpdatePage} />
        </div>

      </PatientContextsArr.Provider>


      {
        load ?
          <Loadding /> :
          null
      }
    </>
  );
}

