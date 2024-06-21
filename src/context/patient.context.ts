import { Patients } from "@/models/patient";
import { Dispatch, SetStateAction, createContext } from "react";

export type PContext = {
    patient: Patients;
    setPatient: Dispatch<SetStateAction<Patients>>;
};

export const PatientContext = createContext<PContext>({} as PContext);