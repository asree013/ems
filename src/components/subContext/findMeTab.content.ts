import { Users } from "@/models/users.model"
import { createContext, Dispatch, SetStateAction } from "react"

export type TfindMeSubC = {
    findMe: Users
    setFindMe: Dispatch<SetStateAction<Users>>
}

export const FindMeTabContext = createContext<TfindMeSubC>({} as TfindMeSubC)