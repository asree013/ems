import { Dispatch, SetStateAction, createContext } from "react"

export type TOpenModalMap = {
    open: boolean
    setOpen: Dispatch<SetStateAction<boolean>>
}

export const OpenModalMapContext = createContext<TOpenModalMap>({} as TOpenModalMap)
