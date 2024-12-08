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
import { dbDexie } from '@/configs/dexie.config';


export default function Page() {
  const [load, setLoad] = useState<boolean>(false)
  const [patients, setPatients] = useState<Patients[]>([]);
  const [patientData, setPatientsData] = useState<Patients[]>([]);
  const [value, setValue] = useState<string>('')

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
      const result = await findPatientAll(1, 15);
      console.log(result.data);
      
      setPatientsData(result.data)
      setPatients(result.data?.filter((r) => {
        if(!r.mission_id && !r.BelongHelicopter && !r.BelongCar && !r.BelongChip ) return r
        else return null
      }));

    } catch (error) {
      console.log(error);
      timeOutJwt(error)
    } finally {
      setLoad(false);
    }
  }, [setPatients, setPatientsData]);

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

    const newData = patientData.filter(r => r.BelongCar)
    console.log(newData);

    setPatients(newData)
  }

  function onFindHalicopter() {
    const newData = patientData.filter(r => r.BelongHelicopter)
    setPatients(newData)
  }

  function onFindShip() {
    const newData = patientData.filter(r => r.BelongChip.Chip)
    setPatients({} as Patients[])
  }

  function onAssignValue(value: string) {
    console.log(value);

  }

  function patientNoneAssign() {
    setPatients(patientData.filter(r => !r.mission_id && !r.BelongHelicopter && !r.BelongCar && !r.BelongChip));
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
      <PatientContextsArr.Provider value={{ patients, setPatients }} >
        <QRScannerComponent onSendResult={onScan} onClickSearch={onClickSear} onSetDefault={onFeedPatientAgain} />
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column' }}>
          <Button style={{ width: 326 }} variant='outlined' type='button' onClick={() => {
            setLoad(true)
            window.location.href = '/patient/' + NIL
          }}>+ ผู้ป่วย</Button>
          <TabPatient
            onReturnNone={patientNoneAssign}
            onRetunFindAll={onFindAll}
            onRetunFindCar={onFindCars}
            onRetunFindHalicopter={onFindHalicopter}
            onRetunFindShip={onFindShip}
            onSetValue={onAssignValue}
          />
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

