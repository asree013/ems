import { createContext, Dispatch, SetStateAction } from "react"

export type TtabvalueC = {
    value: number
    setValue: Dispatch<SetStateAction<number>>
}

export const TabValueVehicleContext = createContext<TtabvalueC>({} as TtabvalueC)