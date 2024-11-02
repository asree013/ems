'use client'
import Loadding from '@/components/Loadding'
import { Cars } from '@/models/vehicle.model'
import { Button } from '@mui/material'
import React, { useCallback, useEffect, useState } from 'react'
import { NIL } from 'uuid'
import CarCard from './CarICard'
import { findCarAll } from '@/services/car.service'
import { timeOutJwt } from '@/services/timeout.service'
import { TVehicleHomeContext, VehiclesHomeContext } from './vehicle_home.context'
import { useSearchParams } from 'next/navigation'

export default function CarComponet() {
  const tranfrom = useSearchParams().get('tranfrom')
  const [load, setLoad] = useState<boolean>(false)
  const [cars, setCars] = useState<Cars[]>({} as Cars[])
  const { vehicle } = React.useContext<TVehicleHomeContext>(VehiclesHomeContext)


  const feedCar = useCallback(async () => {
    setLoad(true)
    try {
      const result = await findCarAll()
      if (!tranfrom) {    
        setCars(result.data)
      }
      else{
        const newData = result.data.filter((r => {
          if (r.mission_id === vehicle.car.Car.mission_id) {
            return r
          }
          if (r.mission_id === vehicle.helicopter.Helicopter.mission_id) {
            return r
          }
        }))
        setCars(newData)
      }
    } catch (error) {
      timeOutJwt(error)
    } finally {
      setLoad(false)
    }
  }, [setCars])

  useEffect(() => {
    feedCar()
  }, [feedCar])

  return (
    <>
      <Button onClick={() => {
        window.location.href = '/vehicle/' + NIL + '/car'
        setLoad(true)
      }} type='button' sx={{ width: '100%' }} variant='contained' color='primary'>สร้างรถรับส่ง</Button>

      {
        Object.keys(cars).length === 0 ?
          null :
          cars.map((r, i) =>
            <CarCard key={i} data={r} />
          )
      }

      {
        load ?
          <Loadding /> :
          null
      }
    </>
  )
}
