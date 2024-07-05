import { Missions } from "@/models/mission.model"
import { createContext, Dispatch, SetStateAction } from "react"

export type TCurrentMission = {
    missionUser: Missions[]
    setMissionUser: Dispatch<SetStateAction<Missions[]>>
}

export const CurrentMissionContext = createContext<TCurrentMission>({} as TCurrentMission)