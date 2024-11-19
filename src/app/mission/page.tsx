'use client'
import PaginationThemplete from '@/components/PaginationThemplete'
import React, { useCallback, useEffect, useState } from 'react'
import MissionItem from './MissionItem';
import { Missions } from '@/models/mission.model';
import { findMission } from '@/services/mission.service';
import { timeOutJwt } from '@/services/timeout.service';
import missionCss from './missionCss.module.css'
import { getLocationUser } from '@/services/user.service';
import { Locations } from '@/models/location.model';
import { Button } from '@mui/material';
import { NIL } from 'uuid';
import Loadding from '@/components/Loadding';
import { toast } from '@/services/alert.service';

export default function Page() {
  const [missions, setMissions] = useState<Missions[]>({} as Missions[])
  const [locate, setLocate] = useState<Locations[]>({} as Locations[])
  const [load, setLoad] = useState<boolean>(false)

  const feedMissionAll = useCallback(async () => {
    setLoad(true)
    try {
      const result = await findMission(1, 10)    
      setMissions(result.data.filter(r => r.status.includes('Progress')))

    } catch (error: any) {
      toast(error.message, 'error')
    } finally {
      setLoad(false)
    }
  }, [setMissions])

  const feedLocationUser = useCallback(async () => {
    try {
      const result = await getLocationUser()
      setLocate(result.data)
    } catch (error) {
      timeOutJwt(error)
    }
  }, [setLocate])

  function onUpdatePage(page: number) {
    console.log(page);

  }
  function onUpdateLimit(limit: number) {
    console.log('limit: ', limit);

  }

  function onSetLoad(bool: boolean) {
    setLoad(bool)
  }

  useEffect(() => {
    feedMissionAll()
    feedLocationUser()
  }, [feedMissionAll, feedLocationUser])
  return (
    <>
      <div className={missionCss.body}>
        <Button type='button' className='w-full' variant='outlined' onClick={() => {
          setLoad(true)
          window.location.href = '/mission/' + NIL
        }} >สร้างภารกิจ</Button>
        <div className={missionCss.itemCard}>
          {
            Object.keys(missions).length === 0 ?
              null :
              missions.map(r =>
                <MissionItem returnLoad={onSetLoad} key={r.id} mission={r} currentLo={locate[0]} />
              )
          }
        </div>
        <PaginationThemplete returnCurrent={onUpdatePage} />
      </div>

      {
        load ?
          <Loadding /> :
          null
      }
    </>
  )
}
