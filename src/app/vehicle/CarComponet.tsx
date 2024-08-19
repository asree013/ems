'use client'
import Loadding from '@/components/Loadding'
import { Cars } from '@/models/vehicle.model'
import { Button } from '@mui/material'
import React, { useCallback, useEffect, useState } from 'react'
import { NIL } from 'uuid'
import CarCard from './CarICard'
import { findCarAll } from '@/services/car.service'
import { timeOutJwt } from '@/services/timeout.service'

export default function CarComponet() {
  const [load, setLoad] = useState<boolean>(false)
  const [cars, setCars] = useState<Cars[]>({} as Cars[])

  const feedCar = useCallback(async() => {
    setLoad(true)
    try {
      const result = await findCarAll()
      setCars(result.data)
    } catch (error) {
      timeOutJwt(error)
    } finally{
      setLoad(false)
    }
  }, [setCars])

  useEffect(() => {
    feedCar()
  }, [feedCar])
  
  return (
    <>
        <Button onClick={() =>{
            window.location.href = '/vehicle/' + NIL + '/car'
            setLoad(true)
        }} type='button' sx={{width: '100%'}} variant='contained' color='primary'>สร้างรถรับส่ง</Button>

        {
          Object.keys(cars).length === 0?
          null:
          cars.map((r, i) => 
            <CarCard key={i} data={r} />
          )
        }

        {
          load?
          <Loadding />:
          null
        }
    </>
  )
}
