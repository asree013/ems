import { Missions } from "@/models/mission.model"
import { Dispatch, SetStateAction, createContext } from "react"

export type TMissionC = {
    mission: Missions
    setMission: Dispatch<SetStateAction<Missions>>
}

export const MissionContext = createContext<TMissionC>({} as TMissionC)

export type TMissionCs = {
    missions: Missions[]
    setMissions: Dispatch<SetStateAction<Missions[]>>
}

export const MissionContexts = createContext<TMissionCs>({} as TMissionCs)