import { createContext, Dispatch, SetStateAction } from 'react'
import {Missions} from '../models/mission.model'

export type TMissionDetailC = {
    mission: Missions
    setMission: Dispatch<SetStateAction<Missions>>
}

export const MissionDetailContext = createContext<TMissionDetailC>({} as TMissionDetailC)