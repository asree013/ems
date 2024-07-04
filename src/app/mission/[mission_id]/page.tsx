'use client'
import React, { useState } from 'react'
import missionCss from './mission_id.module.css'
import MissionForm from './MissionForm'
import MapModal from './MapModal'
import { Missions } from '@/models/mission.model'
import { OpenModalMapContext } from '@/contexts/openModal.context'
import { MissionContext } from '@/contexts/missions.context'

export default function Page() {
  const [mission, setMission] = useState<Missions>({} as Missions)
  const [open, setOpen] = useState<boolean>(false)
  return (
    <>
      <OpenModalMapContext.Provider value={{ open, setOpen }}>
        <MissionContext.Provider value={{ mission, setMission }}>
          <div className={missionCss.home}>
            <MissionForm />
            <MapModal />
          </div>
        </MissionContext.Provider>
      </OpenModalMapContext.Provider>
    </>
  )
}
