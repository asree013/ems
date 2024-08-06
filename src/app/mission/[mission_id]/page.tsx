'use client'
import React, { useState } from 'react'
import missionCss from './mission_id.module.css'
import MissionForm from './MissionForm'
import MapModal from './MapModal'
import { Missions } from '@/models/mission.model'
import { OpenModalMapContext } from '@/contexts/openModal.context'
import { MissionContext } from '@/contexts/missions.context'

type Props = {
  params: {
    mission_id: string
  }
}

export default function Page({params}: Props) {
  const [open, setOpen] = useState<boolean>(false)
  return (
    <>
      <OpenModalMapContext.Provider value={{ open, setOpen }}>
          <div className={missionCss.home}>
            <MissionForm mission_id={params.mission_id} />
          </div>
      </OpenModalMapContext.Provider>
    </>
  )
}
