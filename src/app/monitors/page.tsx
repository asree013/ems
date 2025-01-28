'use client'
import BreadCrumb, { TBreadCrumd } from '@/components/BreadCrumb'
import NavBarLayout from '@/components/layouts/NavBarLayout'
import React, { useCallback, useEffect, useState } from 'react'
import MyMonitorVehicle from './MyMonitorVehicle'
import { findCurrentVehicleByUser } from '@/services/user.service'
import { Vehicles } from '@/models/vehicle.model'
import { toast } from '@/services/alert.service'
import axios from 'axios'
import PatientNoChart from './[monitors_id]/PatientNoChart'

export default function page() {
  const items: TBreadCrumd[] = [
    {
      labe: 'หน้าหลัก',
      path: '/home'
    },
    {
      labe: 'จอแสดงเครื่องวัดสัญญาชีพทั้งหมด',
      path: '/monitors'
    },
  ]

  const [vehicle, setVehicle] = useState<Vehicles>({} as Vehicles)

  const findMyVehicle = useCallback(async () => {
    try {
      const result = await findCurrentVehicleByUser()
      setVehicle(result.data)
    } catch (error) {
      if (axios.isAxiosError(error)) {
        toast(error.response?.data.message || error.message, 'error')
      }
    }
  }, [setVehicle])

  useEffect(() => {
    findMyVehicle()
  }, [findMyVehicle])
  return (
    <NavBarLayout>
      <div className='mt-[50px] mb-3'>
        <BreadCrumb item={items} />
      </div>
      <div>
        {
          vehicle?.car ?
            vehicle.car.Car.PatientBelongCar.map((r, i) =>
              <div className='grid grid-cols-1 lg:grid-cols-2 gap-5'>
                {
                  !r.Patient.deviceId?
                  <PatientNoChart patient={r.Patient as any} />
                  :<MyMonitorVehicle key={i} device_id={r.Patient.deviceId} />
                }
              </div>

            ) : null
        }
        {
          vehicle?.ship ?
            vehicle.ship.Ship.PatientBelongShip.map((r, i) =>
              <MyMonitorVehicle key={i} device_id={r.Patient.deviceId} />

            ) : null
        }
        {
          vehicle?.helicopter ?
            vehicle.helicopter.Helicopter.PatientBelongHelicopter.map((r, i) =>
              <MyMonitorVehicle key={i} device_id={r.Patient.deviceId} />

            ) : null
        }
      </div>
    </NavBarLayout>
  )
}
