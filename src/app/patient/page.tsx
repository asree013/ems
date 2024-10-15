"use client"
import React, { useCallback, useEffect, useState } from 'react';
import PatientItem from './PatientItem';
import { Box, Button, Divider, Fab, SpeedDial } from '@mui/material';
import SpeedDialIcon from '@mui/material/SpeedDialIcon';
import patientCss from './patient.module.css'
import Loadding from '@/components/Loadding';
import { NIL } from 'uuid';
import { PatientContextsArr } from '@/contexts/patient.context';
import { Patients } from '@/models/patient';
import { findPatientAll, findPatientById, findPatientByQrNumber } from '@/services/paitent.service';
import PaginationThemplete from '@/components/PaginationThemplete';
import { timeOutJwt } from '@/services/timeout.service';
import QRScannerComponent from '@/components/QrcodeScan';
import { toast } from '@/services/alert.service';

export default function Page() {
  const [load, setLoad] = useState<boolean>(false)
  const [patients, setPatients] = useState<Patients[]>([]);

  async function onUpdatePage(page: number, limit: number) {
    console.log('page' ,page);
    
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
      // const data = await result.json<Patients[]>()
      setPatients(result.data);
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
    } finally{
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
    } finally{
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

  useEffect(() => {
    feedPateint();
  }, [feedPateint]);

  return (
    <>
      {/* <PatientList patient={{} as Patient}/> */}
      <PatientContextsArr.Provider value={{ patients, setPatients }} >
        <QRScannerComponent onSendResult={onScan} onClickSearch={onClickSear} onSetDefault={onFeedPatientAgain} />
        <Button style={{width: '100%'}} variant='outlined' type='button' onClick={() => {
          setLoad(true)
          window.location.href = '/patient/' + NIL
        }}>เพิ่มผู้ป่าย</Button>
        <PatientItem />
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', marginTop: '25px' }}>
          <PaginationThemplete returnCurrent={onUpdatePage} />
        </div>

      </PatientContextsArr.Provider>
      {/* <Box className={patientCss.buttonCreate}>
        <Fab
          style={{ background: '#2c387e', color: 'white' }}
          onClick={() => {
            setLoad(true)
            window.location.href = '/patient/' + NIL
          }}
        >
          <SpeedDialIcon />
        </Fab>
      </Box> */}

      {
        load ?
          <Loadding /> :
          null
      }
    </>
  );
}

