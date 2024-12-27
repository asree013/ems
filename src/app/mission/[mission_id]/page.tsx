'use client'
import React, { useState } from 'react'
import missionCss from './mission_id.module.css'
import MissionForm from './MissionForm'
import MapModal from './MapModal'
import { Missions } from '@/models/mission.model'
import { OpenModalMapContext } from '@/contexts/openModal.context'
import { MissionContext } from '@/contexts/missions.context'
import BreadCrumb, { TBreadCrumd } from '@/components/BreadCrumb'
import { NIL } from 'uuid'

type Props = {
  params: {
    mission_id: string
  }
}


export default function Page({ params }: Props) {
  const items: TBreadCrumd[] = [
    {
      labe: "หน้าหลัก",
      path: '/home'
    },
    {
      labe: "ภารกิจ",
      path: '/mission'
    },
    {
      labe: params.mission_id.includes(NIL)? "สร้างภารกิจ": "แก้ไขภารกิจ",
      path: '/mission'
    },
  
  ]
  
  const [open, setOpen] = useState<boolean>(false)
  return (
    <div className='mt-12'>
      <BreadCrumb item={items} />
      <div className={missionCss.home}>
        <OpenModalMapContext.Provider value={{ open, setOpen }}>
          <MissionForm mission_id={params.mission_id} />
        </OpenModalMapContext.Provider>
      </div>
    </div>
  )
}
