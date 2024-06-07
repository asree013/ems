import { Patients } from "./patient"

export interface Historys {
    id: string
    symptom_details: string
    status: string
    create_date: string
    update_date: string
    patient_id: string
    user_create_id: string
    user_update_id: string
    Patient: Patients
    Diagnose: Array<any>
    Exan: Array<any>
  }