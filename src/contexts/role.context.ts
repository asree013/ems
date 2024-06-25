import { Dispatch, SetStateAction, createContext } from "react"

export type TRoleContext = {
    role: string
    setRole: Dispatch<SetStateAction<string>>
}

export const RoleContext = createContext<TRoleContext>({} as TRoleContext)