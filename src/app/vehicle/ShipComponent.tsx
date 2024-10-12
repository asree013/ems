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
import SailingIcon from '@mui/icons-material/Sailing';

export default function ShipComponent() {
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
        window.location.href = '/vehicle/' + NIL + '/ship'
        setLoad(true)
      }} endIcon={<SailingIcon />} type='button' sx={{ width: '100%', fontSize: '1.2rem' }} variant='contained' color='primary'>สร้างเรือรับส่ง</Button>

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
