import { Historys } from "@/models/history.model"
import {  PhysicalStatus, TriageLevels } from "@/models/historyDetail.model"
import { createContext, Dispatch, SetStateAction } from "react"

export type TStepContext = {
    currentStep: number []
    setCurrentStep: Dispatch<SetStateAction<number[]>>
}
export const StepContext = createContext({} as TStepContext)

export type TTriageLvelContext = {
    triageLevel: TriageLevels
    setTriageLevel: Dispatch<SetStateAction<TriageLevels>>
}
export const TraigeLevelContext = createContext({} as TTriageLvelContext)

export type TPhysicalStatusContext = {
    physicalStatus: PhysicalStatus
    setPhysicalStatus: Dispatch<SetStateAction<PhysicalStatus>>
}
export const PhysicalStatusContext = createContext<TPhysicalStatusContext>({} as TPhysicalStatusContext)

export type THitorysContext = {
    historyDetail: Historys
    setHistoryDetail: Dispatch<SetStateAction<Historys>>
}
export const HistoryDetailContext = createContext<THitorysContext>({} as THitorysContext)