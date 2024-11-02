import { MissionById, Missions } from "@/models/mission.model"
import { createContext, Dispatch, SetStateAction } from "react"

export type TCurrentMission = {
    missionUser: MissionById
    setMissionUser: Dispatch<SetStateAction<MissionById>>
}

export const CurrentMissionContext = createContext<TCurrentMission>({} as TCurrentMission)