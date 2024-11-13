import { AllergyDrug } from "./allergyDrug.model"
import { AllergyFoods } from "./allertgyFood.model"
import { Bed } from "./bed.model"
import { CongenitalDiseases } from "./congenitalDisease.model"
import { Historys } from "./history.model"
import { OrderTranfer } from "./order_tranfer.model"
import { ParkingHistorys } from "./parkingHistory.model"

export interface Patients {
  id: string
  first_name: string
  last_name: string
  qr_number: string
  gender: string
  age: string
  birthday: string
  id_card: string
  tel: string
  address: string
  group_blood: string
  image: string
  image_id_card: string
  user_create_id: string
  user_update_id: string
  date_time_died: string
  date_time_go_home: string
  create_date: string
  update_date: string
  mission_id: string
  risk_level_id: string
  TriageSieve: any
  TriageSort: any
  Teatment: any
  Risklevel: any
  Loading: any
  Parking: any
  AllergyDrug: Array<AllergyDrug>
  AllergyFood: Array<AllergyFoods>
  BedUseHistory: Array<any>
  CongenitalDisease: Array<any>
  History: Array<any>
  DiscoveredPatient: any
  OrderTransfer: Array<any>
  ParkingHistory: any
  BelongCar: any
  BelongChip: any
  BelongHelicopter: BelongToHelicopter
  HistoryPatientBelongCar: Array<any>
  HistoryPatientBelongShip: Array<any>
  HistoryPatientBelongHelicopter: Array<HistoryPatientBelongHelicopter>
  _count: {
    OrderTransfer: number
    BedUseHistory: number
    AllergyFood: number
    AllergyDrug: number
    CongenitalDisease: number
    History: number
    HistoryPatientBelongCar: number
    HistoryPatientBelongShip: number
    HistoryPatientBelongHelicopter: number
  }
}

interface BelongToHelicopter {
  id: string
  helicopter_id: string
  patient_id: string
  create_date: string
  update_date: string
  Helicopter: {
    id: string
    number: string
    description: any
    image_front: string
    image_back: string
    image_left: string
    image_rigth: string
    radio: string
    calling: string
    driver_id: any
    mission_id: any
    hospital_id: string
    create_date: string
    update_date: string
  }
}

interface HistoryPatientBelongHelicopter {
  id: string
  helicopter_id: string
  not_anymore: boolean
  transpose_date_time: any
  transpose_to: any
  transpose_id: any
  patient_id: string
  create_date: string
  update_date: string
}

export interface PatientBelongCar {
  id: string
  car_id: string
  patient_id: string
  transpose_date_time: any
  transpose_to: any
  transpose_id: any
  create_date: string
  update_date: string
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
    History: Array<{
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
      }>
    }>
    OrderTransfer: Array<{
      id: string
      status_order: string
      element_seq: number
      create_date: string
      hospital_id: any
      patient_id: string
    }>
    Risklevel: any
  }
}
