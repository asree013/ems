import { createContext, Dispatch, SetStateAction } from 'react'
import {MissionById, Missions} from '../models/mission.model'

export type TMissionDetailC = {
    mission: MissionById
    setMission: Dispatch<SetStateAction<MissionById>>
}

export const MissionDetailContext = createContext<TMissionDetailC>({} as TMissionDetailC)