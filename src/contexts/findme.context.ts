import { Users } from "@/models/users.model"
import { Dispatch, SetStateAction, createContext } from "react"

export type TFindContext = {
    findMe: Users
    setFindMe: Dispatch<SetStateAction<Users>>
}

export const FindMeContext = createContext<TFindContext>({} as TFindContext)