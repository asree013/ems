import { MissionTag } from "@/models/mission.model"
import React from "react"

export type TDammyContext = {
    selectTag: MissionTag[],
    setSelectTag: React.Dispatch<React.SetStateAction<MissionTag[]>>
}

export const dammyDataContext = React.createContext<TDammyContext>({} as TDammyContext)

export type TCartTagContext = {
    cartTag: MissionTag[],
    setCartTag: React.Dispatch<React.SetStateAction<MissionTag[]>>
}

export const cartTagContext = React.createContext<TCartTagContext>({} as TCartTagContext)


