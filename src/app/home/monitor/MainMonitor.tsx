'use client'
import SubMonitor from '@/app/monitor/SubMonitor'
import React, { useCallback, useEffect, useState } from 'react'

import main_css from './main_css.module.css'

import MonitorItem from '@/app/monitor/MonitorItem'
import SubMainMonitor from './SubManinMonitor'
import { Monitorchart } from '@/data/monitor.data'
import { CarByCarId, Vehicles } from '@/models/vehicle.model'
import { findCarByCarId } from '@/services/car.service'
import { toast } from '@/services/alert.service'
import styled from 'styled-components'
import { Avatar, Card } from '@mui/material'

import ManIcon from '@mui/icons-material/Man';
import Woman2Icon from '@mui/icons-material/Woman2';
import { PatientBelongCar, Patients } from '@/models/patient'
import { timeOutJwt } from '@/services/timeout.service'

type Props = {
  vehicle: Vehicles
}

export default function MainMonitor({ vehicle }: Props) {
  const [carId, setCarId] = useState<CarByCarId>({} as CarByCarId)
  const feedCarByCarId = useCallback(async () => {
    try {
      const car_id = await vehicle.car.car_id
      const result = await findCarByCarId(car_id)
      setCarId(result.data)
    } catch (error: any) {
      toast(error.message, 'error')
      timeOutJwt(error)
    }
  }, [setCarId, vehicle])

  useEffect(() => {
    feedCarByCarId()

    return () => {
      feedCarByCarId
    }
  }, [feedCarByCarId])

  const Headers = styled.div`
    padding: 10px;
    display: flex;
    align-items: center;
    justify-content: space-between;
  `
  return (
    <>
      <div>
        {
          !carId.PatientBelongCar ?
            null :
            carId.PatientBelongCar.map((r, i) => {
              if (!r.Patient.OrderTransfer) {
                return null
              }
              return (
                <div key={i}>
                  <Headers>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-around', width: '30%' }}>
                      <Avatar src={r.Patient.image} />
                      <p>{r.Patient.first_name}</p>
                      <p>{r.Patient.last_name}</p>
                    </div>
                    {convertGender(r)}
                  </Headers>
                  <MonitorItem el_id={i} order_id={r.Patient.OrderTransfer[0]?.id} />
                </div>
              )
            })
        }
      </div>
    </>
  )

  function convertGender(patient: PatientBelongCar) {
    if (patient.Patient?.gender.toLocaleLowerCase().includes('male')) {
      return <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'row', width: '10rem', marginTop: '15px'}}>
        <p>เพศ: ชาย</p>
        <Card elevation={4} sx={{background: '#1e88e5', marginLeft: '10px'}}>
          <ManIcon style={{width: '2.5rem', height: '2.5rem', color: 'white'}}  />
        </Card>
      </div>
    }
    else {
      return <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'row', width: '10rem', marginTop: '15px'}}>
        <p>เพศ: หญิง</p>
        <Card elevation={4} sx={{background: '#f73378', marginLeft: '10px'}}>
          <Woman2Icon style={{width: '2.5rem', height: '2.5rem', color: 'white'}}  />
        </Card>
      </div>
    }
  }
}
