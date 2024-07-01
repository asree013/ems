import { AllergyDrug } from "./allergyDrug.model"
import { AllergyFoods } from "./allertgyFood.model"
import { Bed } from "./bed.model"
import { CongenitalDiseases } from "./congenitalDisease.model"
import { OrderTranfer } from "./order_tranfer.model"
import { ParkingHistorys } from "./parkingHistory.model"

export interface Patients {
  id: string
  first_name: string
  last_name: string
  gender: string
  age: number
  risk_level: string
  birthday: string
  id_card: string
  tel: string
  address: string
  group_blood: string
  image: string
  image_id_card: string
  user_create_id: string
  user_update_id: string
  create_date: string
  update_date: string
  TriageSieve: string
  TriageSort: string
  Teatment: string
  Loading: string
  Parking: any
  AllergyDrug: Array<AllergyDrug>
  AllergyFood: Array<AllergyFoods>
  BedUseHistory: Array<Bed>
  CongenitalDisease: Array<CongenitalDiseases>
  History: Array<History>
  DiscoveredPatient: any
  OrderTransfer: Array<OrderTranfer>
  ParkingHistory: ParkingHistorys
  _count: {
    AllergyFood: number
    AllergyDrug: number
    CongenitalDisease: number
    History: number
    OrderTransfer: number
    BedUseHistory: number
  }
}