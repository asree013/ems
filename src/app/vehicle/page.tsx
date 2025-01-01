'use client'
import Loadding from '@/components/Loadding';
import { Vehicles } from '@/models/vehicle.model';
import { timeOutJwt } from '@/services/timeout.service';
import { findCurrentVehicleByUser } from '@/services/user.service';
import React, { useCallback, useEffect, useState } from 'react';

import TabVehicle from './TabVehicle';
import { VehiclesHomeContext } from './vehicle_home.context';
import BreadCrumb, { TBreadCrumd } from '@/components/BreadCrumb';

const items: TBreadCrumd[] = [
  {
    labe: "หน้าหลัก",
    path: '/home'
  },
  {
    labe: "ยานพาหนะ",
    path: '/vehivcle'
  },

]

export default function page() {
  const [vehicle, setVehicle] = useState<Vehicles>({} as Vehicles)
  const [load, setLoad] = useState(false)
  const findVehicleByUserId = useCallback(async () => {
    setLoad(true)
    try {
      const result = await findCurrentVehicleByUser()
      setVehicle(result.data)
      console.log(result.data);

    } catch (error) {
      timeOutJwt(error)
    } finally {
      setLoad(false)
    }
  }, [setVehicle])
  

  useEffect(() => {
    findVehicleByUserId()

    return () => {
      findVehicleByUserId
    }
  }, [findVehicleByUserId])
  return (
    <>
      <div>
        <BreadCrumb item={items} />
        <div className='p-2'>
          <VehiclesHomeContext.Provider value={{ vehicle, setVehicle }}>
            <TabVehicle />
          </VehiclesHomeContext.Provider>
        </div>
      </div>

      {
        load ?
          <Loadding /> :
          null
      }
    </>
  )
}
