import { Missions } from "../models/mission.model"
import { Dispatch, SetStateAction, createContext } from "react"

export type TMissionFromContext = {
    missions: Missions,
    setMissions: Dispatch<SetStateAction<Missions>>
}

export const MissionFromContext = createContext<TMissionFromContext>({} as TMissionFromContext)