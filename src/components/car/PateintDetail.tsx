'use client'
import React, { useCallback, useContext, useEffect, useState } from 'react'

import PDetailCss from '../styles/Pdetail.module.css'
import { Card, Chip, Divider } from '@mui/material'
import ControlPointIcon from '@mui/icons-material/ControlPoint';

import PatinetIcon from '@/assets/icon/patient_menu.png'
import MonitorIcon from '@/assets/icon/monitoring_12714969.png'
import Loadding from '@/components/Loadding';
import { CarDetailContext, TCarDetailContent } from './CarDetail.context';
import PatientList from './CardPatient';
import { findPatientById } from '@/services/paitent.service';
import { Patients } from '@/models/patient';
import CardPatient from './CardPatient';

import car_vihecle from '../styles/car_vihecle.module.css'

export default function PateintDetail() {
  const [load, setLoad] = useState<boolean>(false)
  const { carByid, setCarById } = useContext<TCarDetailContent>(CarDetailContext)
  console.log(carByid);
  

  return (
    <>
      <div className={PDetailCss.home}>
        <div>
          <Card elevation={3}>
            <div onClick={() => {
              setLoad(true)
              window.location.href = '/patient?key=add-car&vehicle_id=' + carByid.id
            }} className={PDetailCss.menuItem}>
              <img src={PatinetIcon.src} style={{ height: '4rem', width: '4rem' }} alt="" />
              <div className={PDetailCss.menuDetail}>
                <h3>เพิ่มผู้ป่วย</h3>
                <p>detail</p>
              </div>
            </div>
          </Card>
        </div>
        <div>
          <Card elevation={3} className='mt-3'>
            <div onClick={() => {
              setLoad(true)
            }} className={PDetailCss.menuItem}>
              <img src={MonitorIcon.src} style={{ height: '4rem', width: '4rem' }} alt="" />
              <div className={PDetailCss.menuDetail}>
                <h3>เพิ่มผจอแสดงผล</h3>
                <p>detail</p>
              </div>
            </div>
          </Card>
        </div>
        <Divider className='mt-4' ><Chip label="ผู้ป่วยในรถ" size="small" color='primary' /></Divider>
        {
          Object.keys(carByid).length === 0 ?
            null :
            <div className={car_vihecle.grid}>
              {
                carByid.PatientBelongCar.map((r, i) =>
                  <CardPatient patient={r.Patient} car_id={r.car_id} key={i} />
                )
              }
            </div>

        }

      </div>

      {
        load ?
          <Loadding /> :
          null
      }
    </>
  )
}

function MapPatientId({ patient_id, car_id }: { patient_id: string, car_id : string }) {
  const [patient, setPatient] = useState<Patients>({} as Patients)

  const feedPatientByPatientId = useCallback(async () => {
    try {
      const result = await findPatientById(patient_id)
      setPatient(result.data)
    } catch (error) {
      console.log(error);
    }
  }, [setPatient])

  useEffect(() => {
    feedPatientByPatientId()

    return () => {
      feedPatientByPatientId
    }
  }, [feedPatientByPatientId])

  return (
    <CardPatient patient={patient} car_id={car_id} />
  )
}
