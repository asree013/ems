'use client'
import React, { useCallback, useEffect, useState } from 'react'
import TabVehicle from './TabVehicle'
import { Vehicles } from '@/models/vehicle.model'
import { findCurrentVehicleByUser } from '@/services/user.service'
import { timeOutJwt } from '@/services/timeout.service'
import { VehiclesHomeContext } from './vehicle_home.context'
import Loadding from '@/components/Loadding'

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
        <VehiclesHomeContext.Provider value={{ vehicle, setVehicle }}>
          <TabVehicle />
        </VehiclesHomeContext.Provider>
      </div>

      {
        load?
        <Loadding />:
        null
      }
    </>
  )
}
