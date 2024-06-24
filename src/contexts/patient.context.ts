import { Patients } from "@/models/patient";
import { Dispatch, SetStateAction, createContext } from "react";

export type PContext = {
    patient: Patients;
    setPatient: Dispatch<SetStateAction<Patients>>;
};

export const PatientContext = createContext<PContext>({} as PContext);

export type PContexts = {
    patients: Patients[];
    setPatients: Dispatch<SetStateAction<Patients[]>>;
}

export const PatientContextsArr = createContext<PContexts>({} as PContexts)