'use client'
import PaginationThemplete from '@/components/PaginationThemplete'
import React, { useCallback, useEffect, useState } from 'react'
import MissionItem from './MissionItem';
import { Missions } from '@/models/mission.model';
import { findMission } from '@/services/mission.service';
import { timeOutJwt } from '@/services/timeout.service';
import missionCss from './add_missionCss.module.css'
import { getLocationUser } from '@/services/user.service';
import { Locations } from '@/models/location.model';
import { Button } from '@mui/material';
import { NIL } from 'uuid';
import Loadding from '@/components/Loadding';

export default function Page() {
  const [missions, setMissions] = useState<Missions[]>({} as Missions[])
  const [locate, setLocate] = useState<Locations[]>({} as Locations[])
  const [load, setLoad] = useState<boolean>(false)

  const feedMissionAll = useCallback(async () => {
    setLoad(true)
    try {
      const result = await findMission(1, 5)
      setMissions(result.data)
      console.log(result.data);

    } catch (error) {
      timeOutJwt(error)
    } finally {
      setLoad(false)
    }
  }, [setMissions])

  const feedLocationUser = useCallback(async() => {
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
        <div className={missionCss.itemCard}>
          {/* <Button type='button' variant='outlined' onClick={() => {
            setLoad(true)
            window.location.href = '/mission/'+ NIL
          }} >สร้างภารกิจ</Button> */}
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
        load?
        <Loadding />:
        null
      }
    </>
  )
}
