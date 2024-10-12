import { ExanShows } from './exan.model';
import { Patients } from './patient';

export interface Historys {
  id: string
  symptom_details: string
  status: string
  create_date: string
  update_date: string
  patient_id: string
  chief_complaint: string
  present_illness: string
  user_create_id: string
  user_update_id: string
  physical_status: string
  triage_lavel: string
  Patient: {
    id: string
    first_name: string
    last_name: string
    qr_number: any
    gender: string
    age: any
    birthday: any
    id_card: any
    tel: any
    address: any
    group_blood: any
    image: string
    image_id_card: any
    user_create_id: any
    user_update_id: any
    date_time_died: any
    date_time_go_home: any
    create_date: string
    update_date: string
    mission_id: any
    risk_level_id: any
  }
  Diagnose: Array<any>
  Exan: Array<{
    id: string
    element_id: string
    text: string
    image: string
    create_date: string
    update_date: string
    history_id: string
    user_create_id: string
    user_update_id: string
    // ImageExan: Array<ExanShows>
  }>
  _count: {
    Exan: number
    Diagnose: number
  }
}


