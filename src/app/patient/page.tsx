"use client"
import React, { useCallback, useEffect, useState } from 'react';
import PatientItem from './PatientItem';
import { Box, Divider, Fab, SpeedDial } from '@mui/material';
import SpeedDialIcon from '@mui/material/SpeedDialIcon';
import patientCss from './patient.module.css'
import Loadding from '@/components/Loadding';
import { NIL } from 'uuid';
import { PatientContextsArr } from '@/contexts/patient.context';
import { Patients } from '@/models/patient';
import { findPatientAll } from '@/services/paitent.service';

export default function Page() {
  const [load, setLoad] = useState<boolean>(false)
  const [patients, setPatients] = useState<Patients[]>([]);


  const feedPateint = useCallback(async () => {
    setLoad(true);
    try {
      const result = await findPatientAll();
      // const data = await result.json<Patients[]>()
      setPatients(result.data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoad(false);
    }
  }, [setPatients]);

  useEffect(() => {
    feedPateint();
  }, [feedPateint]);

  return (
    <>
      {/* <PatientList patient={{} as Patient}/> */}
      <PatientContextsArr.Provider value={{patients, setPatients}} >
        <PatientItem />
      </PatientContextsArr.Provider>
      <Box className={patientCss.buttonCreate}>
          <Fab
            style={{ background: '#2c387e', color: 'white' }}
            onClick={() => {
              setLoad(true)
              window.location.href = '/patient/' + NIL
            }}
          >
            <SpeedDialIcon />
          </Fab>
        </Box>

        {
          load ? 
          <Loadding />:
          null
        }
    </>
  );
}

