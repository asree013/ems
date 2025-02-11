import { Historys } from '@/models/history.model';

export interface Exans {
  id?: string | undefined;
  element_id?: string | undefined;
  text?: string | undefined;
  image?: string | null | undefined;
  create_date?: Date | undefined;
  update_date?: Date | undefined;
  user_create_id?: string | undefined;
  user_update_id?: string | undefined;
  patient_id?: string | null | undefined;
}

export interface ExanShows {
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
}

export interface Examinations {
  id: string
  element_id: string
  text: string
  image: string
  create_date: string
  update_date: string
  history_id: string
  user_create_id: string
  user_update_id: string
  History: {
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
  }
  ImageExan: Array<any>
  _count: {
    ImageExan: number
  }
}

export interface ImageExan {
  id: string;
  src: string;
  name: string;
  create_date: string;
  update_date: string;
  exan_id: string;
  user_create_id: string;
  user_update_id: string;
}
