'use client'
import React, { useCallback, useEffect, useState } from 'react'

import main_css from './main_css.module.css'

import { CarByCarId, PatientBelongShip, Vehicles } from '@/models/vehicle.model'
import styled from 'styled-components'
import { Avatar, Card, IconButton, ListItemText, Tooltip } from '@mui/material'
import QueuePlayNextIcon from '@mui/icons-material/QueuePlayNext';

import ManIcon from '@mui/icons-material/Man';
import Woman2Icon from '@mui/icons-material/Woman2';
import { PatientBelongCar, Patients } from '@/models/patient'
import { timeOutJwt } from '@/services/timeout.service'
import Loadding from '@/components/Loadding'
import ChartDetail from '@/app/monitors/[monitors_id]/ChartDetail'
import MyMonitorVehicle from '@/app/monitors/MyMonitorVehicle'

type Props = {
  vehicle: Vehicles
}

export default function MainMonitor({ vehicle }: Props) {
  const [load, setLoad] = useState<boolean>(false)

  const Headers = styled.div`
    padding: 10px;
    display: flex;
    align-items: center;
    justify-content: space-between;
  `

  const HeadDetail = styled.div`
     display: flex;
    align-items: center;
    justify-content: space-around;
    width: 30% ;

    @media only screen and (max-width: 450px) {
      display: flex;
    align-items: center;
    justify-content: space-around;
    width: 30% ;
    flex-direction: column;
    }
  `
  return (
    <>
      <div>
        {
          vehicle.car ?
            vehicle.car.Car.PatientBelongCar ?
              vehicle.car.Car.PatientBelongCar.map((r, i) => {
                if (r.Patient.OrderTransfer.length === 0) {
                  return <div key={i}>
                    <Headers>
                      <HeadDetail>
                        <Avatar src={r.Patient.image} />
                        <p>{r.Patient.first_name}</p>
                        <p>{r.Patient.last_name}</p>
                      </HeadDetail>
                      {convertGender(r)}
                    </Headers>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-around' }}>
                      <p style={{ fontSize: 26 }}>โปรดเพิ่มจอแสดงผล</p>

                      <ListItemText className='ml-4'>
                        <Tooltip title="เพิ่มจอแสดงกราฟ">
                          <IconButton color='primary' onClick={() => {
                            setLoad(true)
                            window.location.href = `vehicle/${vehicle.car.car_id}/car/detail/add_monitor?patient_add_id=${r.Patient.id}`
                          }}>
                            <QueuePlayNextIcon style={{ width: 50, height: 50 }} />
                          </IconButton>
                        </Tooltip>
                      </ListItemText>
                    </div>
                  </div>

                }
                return (
                  <div key={i}>
                    <Headers>
                      <HeadDetail>
                        <Avatar src={r.Patient.image} />
                        <p>{r.Patient.first_name}</p>
                        <p>{r.Patient.last_name}</p>
                      </HeadDetail>
                      {convertGender(r)}
                    </Headers>
                    <MyMonitorVehicle device_id={r.Patient.deviceId} />
                  </div>
                )
              })
              : null
            : null
        }

        {/* {
          vehicle.ship ?
            vehicle.ship.Ship.PatientBelongShip ?
              vehicle.ship.Ship.PatientBelongShip.map((r, i) => {
                if (r.Patient.OrderTransfer.length === 0) {
                  return (
                    <div key={i}>
                      <Headers>
                        <HeadDetail>
                          <Avatar src={r.Patient.image} />
                          <p>{r.Patient.first_name}</p>
                          <p>{r.Patient.last_name}</p>
                        </HeadDetail>
                        {convertGender(r)}
                      </Headers>
                      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-around' }}>
                        <p style={{ fontSize: 26 }}>โปรดเพิ่มจอแสดงผล</p>

                        <ListItemText className='ml-4'>
                          <Tooltip title="เพิ่มจอแสดงกราฟ">
                            <IconButton color='primary' onClick={() => {
                              setLoad(true)
                              window.location.href = `vehicle/${vehicle.ship.ship_id}/ship/detail/add_monitor?patient_add_id=${r.Patient.id}`
                            }}>
                              <QueuePlayNextIcon style={{ width: 50, height: 50 }} />
                            </IconButton>
                          </Tooltip>
                        </ListItemText>
                      </div>
                    </div>
                  )
                }
                return (
                  <div key={i}>
                    <Headers>
                      <HeadDetail>
                        <Avatar src={r.Patient.image} />
                        <p>{r.Patient.first_name}</p>
                        <p>{r.Patient.last_name}</p>
                      </HeadDetail>
                      {convertGender(r)}
                    </Headers>
                    <MonitorItem el_id={i} order_id={r.Patient.OrderTransfer[0]?.id} />
                  </div>
                )
              })
              : null
            : null
        } */}
      </div>

      {
        load ?
          <Loadding /> :
          null
      }
    </>
  )

  function convertGender(patient: PatientBelongCar | PatientBelongShip) {
    console.log(patient.Patient.gender.toLocaleLowerCase());

    if (patient.Patient.gender.toLocaleLowerCase() === 'male') {
      return <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'row', width: '10rem', marginTop: '15px' }}>
        <p>เพศ: ชาย</p>
        <Card elevation={4} sx={{ background: '#1e88e5', marginLeft: '10px' }}>
          <ManIcon style={{ width: '2.5rem', height: '2.5rem', color: 'white' }} />
        </Card>
      </div>
    }
    else {
      return <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'row', width: '10rem', marginTop: '15px' }}>
        <p>เพศ: หญิง</p>
        <Card elevation={4} sx={{ background: '#f73378', marginLeft: '10px' }}>
          <Woman2Icon style={{ width: '2.5rem', height: '2.5rem', color: 'white' }} />
        </Card>
      </div>
    }
  }
}
