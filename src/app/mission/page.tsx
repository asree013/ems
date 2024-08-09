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

export default function page() {
  const [missions, setMissions] = useState<Missions[]>({} as Missions[])
  const [locate, setLocate] = useState<Locations[]>({} as Locations[])

  const feedMissionAll = useCallback(async () => {
    try {
      const result = await findMission(1, 5)
      setMissions(result.data)
      console.log(result.data);

    } catch (error) {
      timeOutJwt(error)
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

  useEffect(() => {
    feedMissionAll()
    feedLocationUser()
  }, [feedMissionAll, feedLocationUser])
  return (
    <>
      <div>
        <div className={missionCss.itemCard}>
          {
            Object.keys(missions).length === 0 ?
              null :
              missions.map(r =>
                <MissionItem key={r.id} mission={r} currentLo={locate[0]} />
              )
          }
        </div>
        <PaginationThemplete returnCurrent={onUpdatePage} />
      </div>
    </>
  )
}
