import { Historys } from "@/models/history.model"
import {  PhysicalStatus, TriageLevels } from "@/models/historyDetail.model"
import { createContext, Dispatch, SetStateAction } from "react"
import { Circulations } from "./stepForm/Circulation"
import { Treatments } from "@/models/traeteMent"

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


export type TPatientIdContext = {
    patient_id: string
    setPatient_id: React.Dispatch<React.SetStateAction<string>>
}
export const PatientIdContext = createContext({} as TPatientIdContext)

export type TCirculationsContext = {
    circulation: Circulations
    setCirculation: React.Dispatch<React.SetStateAction<Circulations>>
}
export const CirculationsContext = createContext({} as TCirculationsContext)

export type TPhysicalStatusContext = {
    physicalStatus: PhysicalStatus
    setPhysicalStatus: Dispatch<SetStateAction<PhysicalStatus>>
}
export const PhysicalStatusContext = createContext<TPhysicalStatusContext>({} as TPhysicalStatusContext)

export type TTreatmentContext = {
    treatment: Treatments
    setTreatment: Dispatch<SetStateAction<Treatments>>
}
export const TreatmentContext = createContext<TTreatmentContext>({} as TTreatmentContext)