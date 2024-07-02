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

export default function page({ params }: Props) {
  const [mission, setMission] = useState<Missions>({} as Missions)
  const [open, setOpen] = useState<boolean>(false)
  return (
    <>
      <div className={missionCss.home}>

        <OpenModalMapContext.Provider value={{ open, setOpen }}>
          <MissionContext.Provider value={{ mission, setMission }}>
            <MissionForm />
            <MapModal />
          </MissionContext.Provider>
        </OpenModalMapContext.Provider>
      </div>
    </>
  )
}
