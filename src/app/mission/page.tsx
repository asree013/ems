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
import BreadCrumb, { TBreadCrumd } from '@/components/BreadCrumb';

const items: TBreadCrumd[] = [
  {
    labe: "หน้าหลัก",
    path: '/home'
  },
  {
    labe: "ภารกิจ",
    path: '/mission'
  },

]

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
      <div className='mt-12 p-2'>
        <BreadCrumb item={items} />
        <div className={missionCss.body}>
          <div className='flex flex-col lg:flex-row items-center justify-between w-full p-7 rounded-lg border border-gray-300 shadow-lg'>
            <input className='border border-gray-400 p-2 rounded-lg w-[290px]' type="text" placeholder='ค้นหาภารกิจ' />
            <button type='button' className='w-full max-w-[130px] mt-2 text-md bg-gray-400 hover:bg-gray-500 text-white p-2 rounded-lg' onClick={() => {
              setLoad(true)
              window.location.href = '/mission/' + NIL
            }} >สร้างภารกิจ</button>
          </div>
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
      </div>

      {
        load ?
          <Loadding /> :
          null
      }
    </>
  )
}
