import { Missions } from "@/models/mission.model"
import { Dispatch, SetStateAction, createContext } from "react"

export type TOpenModalUser = {
    openUser: boolean
    setOpenUser: Dispatch<SetStateAction<boolean>>
    missionId: Missions
    setMissionId: Dispatch<SetStateAction<Missions>>
}

export const OpenModalUserContext = createContext<TOpenModalUser>({} as TOpenModalUser)