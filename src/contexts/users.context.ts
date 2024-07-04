import { Users } from "@/models/users.model"
import { Dispatch, SetStateAction, createContext } from "react"

export type TUserContexts = {
    users: Users[]
    setUsers: Dispatch<SetStateAction<Users[]>>
}

export const UsersContexts = createContext<TUserContexts>({} as TUserContexts)