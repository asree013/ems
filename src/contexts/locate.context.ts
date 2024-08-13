import { Locations } from "@/models/location.model"
import { createContext, Dispatch, SetStateAction } from "react"

export type TLocateC = {
    userLocate: Locations
    setUserLocate: Dispatch<SetStateAction<Locations>>
}

export const LocateContextUser = createContext<TLocateC>({} as TLocateC)