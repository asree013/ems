import { MissionById, Missions } from "../models/mission.model"
import { Dispatch, SetStateAction, createContext } from "react"

export type TMissionFromContext = {
    missions: MissionById,
    setMissions: Dispatch<SetStateAction<MissionById>>
}

export const MissionFromContext = createContext<TMissionFromContext>({} as TMissionFromContext)