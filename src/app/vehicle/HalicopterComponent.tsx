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
import { findMissionCurrent } from '@/services/mission.service'
import { toast } from '@/services/alert.service'
import { MissionById } from '@/models/mission.model'
import { useSearchParams } from 'next/navigation'

export default function HelicopterComponent() {
  const tranfrom = useSearchParams().get('tranfrom')

  const [load, setLoad] = useState<boolean>(false)
  const [helicopter, setHelicopter] = useState<Helicopters[]>({} as Helicopters[])
  const [currentMission, setCurrentMission] = useState<MissionById>({} as MissionById)
  const [isMissionNull, setIsMissionNull] = useState<boolean>(false)

  const onFeedCurrentMission = useCallback(async() => {
    try {
      const resutl = await findMissionCurrent()
      setCurrentMission(resutl.data)
    } catch (error) {
      toast('คุณไม่มีภากิจ', 'error')
    }
  }, [setCurrentMission])

  const feedHelicopterAll = useCallback(async () => {
    try {
      const result = await findHalecopterAll()
      if (!tranfrom) {
        console.log(result.data);
        setHelicopter(result.data)
        return
      }
      const newData = await result.data.filter((r => {
        if (r.mission_id === currentMission.id) {
          return r
        }
        else{
          return null
        }
      }))
      console.log(newData);
      if(newData.length === 0) {
        setIsMissionNull(true)
      }
      setHelicopter(result.data)
      
    } catch (error) {
      console.log(error);
      timeOutJwt(error)
    }
  }, [setHelicopter])

  useEffect(() => {
    feedHelicopterAll()
    onFeedCurrentMission()

    return () => {
      feedHelicopterAll
      onFeedCurrentMission
    }
  }, [feedHelicopterAll, onFeedCurrentMission])

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
