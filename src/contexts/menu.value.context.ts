import { createContext, Dispatch, SetStateAction } from "react"

export type TMenuValueC = {
    value: number,
    setValue: Dispatch<SetStateAction<number>>
}

export const MenuValueContext = createContext<TMenuValueC>({} as TMenuValueC)