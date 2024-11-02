import { Users } from "./users.model"
import { CarInVehicle } from "./vehicle.model"

export interface MissionById {
  id: string
  status: string
  type: string
  title: string
  case_number: any
  description: string
  end_date: any
  address: string
  image: string
  lat: string
  long: string
  utm: string
  mgrs: string
  order_tranfer_id: any
  user_create_id: string
  user_update_id: string
  create_date: string
  update_date: string
  Users: Array<{
    first_name: string
    last_name: string
    phone_number?: string
    career: string
    address: any
    image: string
    role: string
    Responsibilities?: {
      role: string
    }
  }>
  MissionHistory: Array<{
    id: string
    user_id: string
    status: string
    mission_id: string
  }>
  MissionSecondary: Array<any>
  MissionTag: MissionTag[]
  CarJoinMission: CarInVehicle[]
  ShipJoinMission: Array<any>
  LocationSearch: Array<any>
  Notification: Array<any>
  HelicopterJoinMission: Array<any>
  MainMission: any
  Patient: Array<any>
  _count: {
    Notification: number
    LocationSearch: number
    Users: number
    MissionHistory: number
    MissionTag: number
    CarJoinMission: number
    ShipJoinMission: number
    HelicopterJoinMission: number
    MissionSecondary: number
    Patient: number
  }
  patients: PatientInMissionMissionId[]
}

export type PatientInMissionMissionId = {
  id: string
  first_name: string
  last_name: string
  qr_number: string
  gender: string
  age: any
  birthday: any
  id_card: any
  tel: any
  address: any
  group_blood?: string
  image: string
  image_id_card?: string
  user_create_id: any
  user_update_id: any
  date_time_died: any
  date_time_go_home: any
  create_date: string
  update_date: string
  mission_id: any
  risk_level_id: any
  TriageSieve: any
  TriageSort: any
  Teatment: any
  Risklevel: any
  Loading: any
  Parking: any
  AllergyDrug: Array<any>
  AllergyFood: Array<any>
  BedUseHistory: Array<any>
  CongenitalDisease: Array<any>
  History: Array<any>
  DiscoveredPatient: any
  OrderTransfer: Array<{
    id: string
    status_order: string
    element_seq: number
    create_date: string
    hospital_id: any
    patient_id: string
    Device: Array<{
      id: string
      brand: string
      device_id: string
      type: string
      is_active: boolean
      create_date: string
      hospital_id: any
    }>
  }>
  ParkingHistory: any
  BelongCar: {
    id: string
    car_id: string
    patient_id: string
    create_date: string
    update_date: string
  }
  BelongChip: any
  BelongHelicopter?: {
    id: string
    helicopter_id: string
    patient_id: string
    create_date: string
    update_date: string
  }
  HistoryPatientBelongCar: Array<{
    id: string
    car_id: string
    not_anymore: boolean
    transpose_date_time?: string
    transpose_to: string
    transpose_id: string
    patient_id: string
    create_date: string
    update_date: string
  }>
  HistoryPatientBelongShip: Array<any>
  HistoryPatientBelongHelicopter: Array<{
    id: string
    helicopter_id: string
    not_anymore: boolean
    transpose_date_time: string
    transpose_to: string
    transpose_id: string
    patient_id: string
    create_date: string
    update_date: string
  }>
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


export interface Missions {
  id: string
  status: string
  type: string
  title: string
  description: string
  end_date: string
  address: string
  image: string
  lat: string
  long: string
  utm: string
  mgrs: string
  user_create_id: string
  user_update_id: string
  create_date: string
  update_date: string
  Users: Array<UsersR>
  MissionHistory: Array<any>
  MissionSecondary: Array<any>
  MissionTag: any
  CarJoinMission: Array<any>
  ShipJoinMission: Array<any>
  LocationSearch: Array<any>
  Notification: Array<any>
  _count: {
    Notification: number
    LocationSearch: number
    Users: number
    MissionHistory: number
    CarJoinMission: number
    ShipJoinMission: number
    MissionSecondary: number
  }
}

export interface MissionState {
  id: string
  status: number
  mission_id: string
  users_id: string
  create_date: string
  update_date: string
  mission: Missions
}

type UsersR = {
  first_name: string
  last_name: string
  phone_number: string
  career: string
  address: any
  role: string
  image: string
  Responsibilities: {
    role: string
  }
}

export interface MissionTag{
  id: string
  status: number
  date_time_tag: string
  mission_id: string
  users_id: string
  create_date: string
  update_date: string
  Users: {
    first_name: string
    last_name: string
    id: string
  }
  label: string
  description: string
}
