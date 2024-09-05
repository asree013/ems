import { Missions } from "@/models/mission.model"
import { createContext, Dispatch, SetStateAction } from "react"

export type TMisssionSubC = {
    missions: Missions[]
    setMissions: Dispatch<SetStateAction<Missions[]>>
}

export const MissionSubContext = createContext<TMisssionSubC>({} as TMisssionSubC)