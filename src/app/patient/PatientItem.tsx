'use client';
import * as React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Typography from '@mui/material/Typography';
import PatientList from './PatientList';
import patientCss from './patient.module.css';
import { Card, Fab } from '@mui/material';
import Loadding from '@/components/Loadding';
import { NIL } from 'uuid';
import { PatientContextsArr, PContexts } from '@/contexts/patient.context';


type Props = {
  order_tranfer_id?: string;
};

export default function PatientItem({ order_tranfer_id }: Props) {
  const {patients, setPatients} = React.useContext<PContexts>(PatientContextsArr)
  const [load, setLoad] = React.useState<boolean>(false)
  

  return (
    <>
      <React.Fragment>
        <CssBaseline />
        <div className={patientCss.patient_list}>
          {Array.isArray(patients) ? (
            <>
              {patients.map((r) => (
                <PatientList
                  order_tranfer_id={order_tranfer_id}
                  patient={r}
                  key={r.id}
                />
              ))}
            </>
          ) : (
            <div onClick={() => {
              setLoad(true)
              window.location.href = '/patient/' + NIL
            }}>
              <Card
                variant="outlined"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexDirection: 'column',
                  padding: '10px',
                  cursor: 'pointer',
                }}
              >
                <Typography variant="body1" color="initial">
                  No Patient Click to add Patient
                </Typography>
                <Typography variant="h1" color="initial">
                  +
                </Typography>
              </Card>
            </div>
          )}
        </div>
        {
          load ?
            <Loadding /> :
            null
        }
      </React.Fragment>
    </>
  );
}
