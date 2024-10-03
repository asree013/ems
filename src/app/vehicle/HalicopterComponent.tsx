'use client'
import Loadding from '@/components/Loadding'
import { Cars, Helicopters } from '@/models/vehicle.model'
import { Button } from '@mui/material'
import React, { useCallback, useEffect, useState } from 'react'
import { NIL } from 'uuid'
import CarCard from './CarICard'
import { findCarAll } from '@/services/car.service'
import { timeOutJwt } from '@/services/timeout.service'
import { findHalecopterAll } from '@/services/helicopter.service'
import CardHelicopter from './CardHelicopter'

export default function HelicopterComponent() {
  const [load, setLoad] = useState<boolean>(false)
  const [helicopter, setHelicopter] = useState<Helicopters[]>({} as Helicopters[])

  const feedHelicopterAll = useCallback(async () => {
    try {
      const result = await findHalecopterAll()
      setHelicopter(result.data)
      console.log(result.data);
      
    } catch (error) {
      console.log(error);
      timeOutJwt(error)
    }
  }, [setHelicopter])

  useEffect(() => {
    feedHelicopterAll()

    return () => {
      feedHelicopterAll
    }
  }, [feedHelicopterAll])

  return (
    <>
      <Button onClick={() => {
        window.location.href = '/vehicle/' + NIL + '/helicopter'
        setLoad(true)
      }} type='button' sx={{ width: '100%' }} variant='contained' color='primary'>สร้างรถแฮลิคอปเตอร์รับส่ง</Button>

      {
          Object.keys(helicopter).length === 0?
          null:
          helicopter.map((r, i) => 
            <CardHelicopter key={i} data={r} />
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
