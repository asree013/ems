import { Users } from "@/models/users.model"
import { Dispatch, SetStateAction, createContext } from "react"

export type TRoleContext = {
    findMe: Users
    setFindMe: Dispatch<SetStateAction<Users>>
}

export const RoleContext = createContext<TRoleContext>({} as TRoleContext)