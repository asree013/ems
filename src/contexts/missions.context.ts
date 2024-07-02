import { Missions } from "@/models/mission.model"
import { Dispatch, SetStateAction, createContext } from "react"

export type TMissionC = {
    mission: Missions
    setMission: Dispatch<SetStateAction<Missions>>
}

export const MissionContext = createContext<TMissionC>({} as TMissionC)