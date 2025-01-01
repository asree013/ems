import { AllergyDrug } from "./allergyDrug.model"
import { AllergyFoods } from "./allertgyFood.model"

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
  BelongCar: BelongCar
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

interface BelongCar {
  id: string
  car_id: string
  patient_id: string
  create_date: string
  update_date: string
  Car: {
    id: string
    status: string
    type: string
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
    create_date: string
    update_date: string
    hospital_id: string
    Mission: any
  }
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
    History: Array<HistoryInVehicle>
    OrderTransfer: Array<OrderTranferInVehicle>
    Risklevel: any
  }
}


export type HistoryInVehicle = {
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
}

export type OrderTranferInVehicle = {
  id: string
  status_order: string
  element_seq: number
  create_date: string
  hospital_id: any
  patient_id: string
}

export const PatientOffline = {
  title: "PatientOffline Schema",
  description: "Schema for offline patients with relations",
  version: 0,
  type: "object",
  primaryKey: "id", // กำหนด primaryKey
  properties: {
    id: { type: "string" },
    first_name: { type: "string" },
    last_name: { type: "string" },
    qr_number: { type: "string" },
    gender: { type: "string" },
    age: { type: "string" },
    birthday: { type: "string", format: "date" },
    id_card: { type: "string" },
    tel: { type: "string" },
    address: { type: "string" },
    group_blood: { type: "string" },
    image: { type: "string" },
    image_id_card: { type: "string" },
    user_create_id: { type: "string" },
    user_update_id: { type: "string" },
    date_time_died: { type: "string", format: "date-time" },
    date_time_go_home: { type: "string", format: "date-time" },
    create_date: { type: "string", format: "date-time" },
    update_date: { type: "string", format: "date-time" },
    mission_id: { type: "string" },
    risk_level_id: { type: "string" },
    TriageSieve: { type: "object", additionalProperties: true },
    TriageSort: { type: "object", additionalProperties: true },
    Teatment: { type: "object", additionalProperties: true },
    Risklevel: { type: "object", additionalProperties: true },
    Loading: { type: "object", additionalProperties: true },
    Parking: { type: "object", additionalProperties: true },
    AllergyDrug: {
      type: "array",
      items: { type: "object", ref: "AllergyDrug" },
    },
    AllergyFood: {
      type: "array",
      items: { type: "object", ref: "AllergyFoods" },
    },
    BedUseHistory: {
      type: "array",
      items: { type: "object", additionalProperties: true },
    },
    CongenitalDisease: {
      type: "array",
      items: { type: "object", additionalProperties: true },
    },
    History: {
      type: "array",
      items: { type: "object", additionalProperties: true },
    },
    DiscoveredPatient: {
      type: "object",
      properties: {
        id: { type: "string" },
        discovery_date: { type: "string", format: "date-time" },
        location: { type: "string" },
        discovered_by: { type: "string" },
        details: { type: "string" },
      },
      required: ["id", "discovery_date", "location"],
    },
    OrderTransfer: {
      type: "array",
      items: { type: "object", additionalProperties: true },
    },
    ParkingHistory: { type: "object", additionalProperties: true },
    BelongCar: {
      type: "object",
      properties: {
        id: { type: "string" },
        car_id: { type: "string" },
        patient_id: { type: "string" },
        create_date: { type: "string", format: "date-time" },
        update_date: { type: "string", format: "date-time" },
        Car: {
          type: "object",
          properties: {
            id: { type: "string" },
            number: { type: "string" },
            description: { type: "string" },
            image_front: { type: "string" },
            image_back: { type: "string" },
          },
        },
      },
    },
    BelongHelicopter: {
      type: "object",
      properties: {
        id: { type: "string" },
        helicopter_id: { type: "string" },
        patient_id: { type: "string" },
        create_date: { type: "string", format: "date-time" },
        update_date: { type: "string", format: "date-time" },
        Helicopter: {
          type: "object",
          properties: {
            id: { type: "string" },
            number: { type: "string" },
            image_front: { type: "string" },
            radio: { type: "string" },
            calling: { type: "string" },
          },
        },
      },
    },
    HistoryPatientBelongCar: {
      type: "array",
      items: { type: "object", additionalProperties: true },
    },
    HistoryPatientBelongShip: {
      type: "array",
      items: { type: "object", additionalProperties: true },
    },
    HistoryPatientBelongHelicopter: {
      type: "array",
      items: { type: "object", additionalProperties: true },
    },
    _count: {
      type: "object",
      properties: {
        OrderTransfer: { type: "number" },
        BedUseHistory: { type: "number" },
        AllergyFood: { type: "number" },
        AllergyDrug: { type: "number" },
        CongenitalDisease: { type: "number" },
        History: { type: "number" },
      },
    },
  },
  required: ["id", "first_name", "last_name", "create_date"],
};



