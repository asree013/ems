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
  TriageSieve: {}
  TriageSort: {}
  Teatment: {}
  Risklevel: {}
  Loading: {}
  Parking: {}
  AllergyDrug: Array<{}>
  AllergyFood: Array<{}>
  BedUseHistory: Array<{}>
  CongenitalDisease: Array<{}>
  History: Array<Historys>
  DiscoveredPatient: {}
  OrderTransfer: Array<{}>
  ParkingHistory: {}
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
