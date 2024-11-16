import { ShipById } from "@/models/vehicle.model"
import { createContext, Dispatch, SetStateAction } from "react"

export type TShipByIdContext = {
    shipById: ShipById
    setShipById: Dispatch<SetStateAction<ShipById>>
}
export const ShipByIdContext = createContext<TShipByIdContext>({} as TShipByIdContext)

export type TShipDetailContext = {
    shipById: ShipById
    setShipById: Dispatch<SetStateAction<ShipById>>
}
export const ShipDetailContext = createContext<TShipByIdContext>({} as TShipByIdContext)