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
import { MissionById, Missions } from '@/models/mission.model'
import { findMissionCurrent } from '@/services/mission.service'
import { toast } from '@/services/alert.service'

export default function CarComponet() {
  const tranfrom = useSearchParams().get('tranfrom')

  const [load, setLoad] = useState<boolean>(false)
  const [cars, setCars] = useState<Cars[]>({} as Cars[])
  const [currentMission, setCurrentMission] = useState<MissionById>({} as MissionById)
  const [isMissionNull, setIsMissionNull] = useState<boolean>(false)

  const onFeedCurrentMission = useCallback(async () => {
    try {
      const resutl = await findMissionCurrent()
      setCurrentMission(resutl.data)
    } catch (error) {
      toast('คุณไม่มีภากิจ', 'error')
    }
  }, [setCurrentMission])

  const feedCar = useCallback(async () => {
    setLoad(true)
    try {
      const result = await findCarAll()

      if (!tranfrom) {
        console.log(result.data);
        setCars(result.data)
        return
      }
      const newData = await result.data.filter((r => {
        if (r.mission_id === currentMission.id) {
          return r
        }
        else {
          return null
        }
      }))
      console.log(newData);
      if (newData.length === 0) {
        setIsMissionNull(true)
      }
      setCars(newData)
    } catch (error) {
      timeOutJwt(error)
    } finally {
      setLoad(false)
    }
  }, [setCars])

  useEffect(() => {
    feedCar()
    onFeedCurrentMission()

  }, [feedCar, onFeedCurrentMission])

  return (
    <>
      <Button onClick={() => {
        window.location.href = '/vehicle/' + NIL + '/car'
        setLoad(true)
      }} type='button' sx={{ width: '100%' }} variant='contained' color='primary'>สร้างรถรับส่ง</Button>

      <div className='flex flex-col flex-wrap gap-4 lg:flex-row lg:justify-start justify-center items-start'>
        {
          Object.keys(cars).length === 0 ?
            null :
            cars.map((r, i) =>
              <CarCard key={i} data={r} />
            )
        }
      </div>
      {
        isMissionNull ?
          <p style={{ margin: 20, fontSize: 23 }}>ไม่มีรถรับส่งอื่นในภารกิจของคุณ</p> : null
      }

      {
        load ?
          <Loadding /> :
          null
      }
    </>
  )
}
