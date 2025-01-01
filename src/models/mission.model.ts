import { Patients } from "./patient"
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
  vehicle: string
  mgrs: string
  order_tranfer_id: string
  user_create_id: string
  user_update_id: string
  create_date: string
  update_date: string
  Users: Array<UserInMissionId>
  MissionHistory: Array<{
    id: string
    user_id: string
    status: string
    mission_id: string
  }>
  MissionSecondary: Array<any>
  CarJoinMission: Array<{
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
    mission_id: string
    create_date: string
    update_date: string
    hospital_id: string
    UserBelongCar: Array<{
      id: string
      user_id: string
      car_id: string
      time_un_belong: string
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
        mission_id: string
        create_date: string
        update_date: string
        hospital_id: string
        UserBelongCar: Array<{
          id: string
          user_id: string
          car_id: string
          time_un_belong: string
          create_date: string
          update_date: string
          User: {
            id: string
            username: string
            password: string
            first_name: string
            last_name: string
            status: string
            role: string
            email?: string
            address: any
            phone_number?: string
            career?: string
            id_card?: string
            image?: string
            create_date: string
            update_date: string
            hospital_branch_id: any
            refresh_token: string
            hospital_id?: string
            doctorsId: any
            squad_id?: string
            team_id: any
            mission_id: string
          }
        }>
      }
    }>
    PatientBelongCar: Array<{
      id: string
      car_id: string
      patient_id: string
      create_date: string
      update_date: string
      Patient: {
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
        OrderTransfer: Array<any>
      }
    }>
  }>
  ShipJoinMission: Array<any>
  LocationSearch: Array<any>
  Notification: Array<any>
  HelicopterJoinMission: Array<{
    id: string
    number: string
    description: any
    image_front: string
    image_back: string
    image_left: string
    image_rigth: string
    radio: string
    calling: string
    driver_id: string
    mission_id: string
    hospital_id: string
    create_date: string
    update_date: string
    UserBelongHelicopter: Array<{
      id: string
      user_id: string
      helicopter_id: string
      time_un_belong?: string
      not_anymore: boolean
      transpose_date_time: any
      transpose_to: any
      transpose_id: any
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
        driver_id: string
        mission_id: string
        hospital_id: string
        create_date: string
        update_date: string
        PatientBelongHelicopter: Array<{
          id: string
          helicopter_id: string
          patient_id: string
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
          }
        }>
      }
    }>
    PatientBelongHelicopter: Array<{
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
        driver_id: string
        mission_id: string
        hospital_id: string
        create_date: string
        update_date: string
        PatientBelongHelicopter: Array<{
          id: string
          helicopter_id: string
          patient_id: string
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
          }
        }>
      }
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
        OrderTransfer: Array<any>
      }
    }>
  }>
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
  patients: Array<{
    id: string
    first_name: string
    last_name: string
    qr_number?: string
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
    mission_id: string
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
    }>
    DiscoveredPatient: any
    OrderTransfer: Array<any>
    ParkingHistory: any
    BelongCar?: {
      id: string
      car_id: string
      patient_id: string
      create_date: string
      update_date: string
    }
    BelongShip?: {
      id: string
      ship_id: string
      patient_id: string
      transpose_date_time: any
      transpose_to: any
      transpose_id: any
      create_date: string
      update_date: string
    }
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
      transpose_date_time: any
      transpose_to: any
      transpose_id: any
      patient_id: string
      create_date: string
      update_date: string
    }>
    HistoryPatientBelongShip: Array<{
      id: string
      ship_id: string
      not_anymore: boolean
      patient_id: string
      create_date: string
      update_date: string
    }>
    HistoryPatientBelongHelicopter: Array<{
      id: string
      helicopter_id: string
      not_anymore: boolean
      transpose_date_time: any
      transpose_to: any
      transpose_id: any
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
  }>
}

export type UserInMissionId = {
  id: string
  first_name: string
  last_name: string
  phone_number?: string
  career?: string
  address: any
  image?: string
  role: string
  Responsibilities?: {
    role: string
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
  case_number: string
  vehicle: string
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

export interface PateintAllInMission {
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
  group_blood: any
  image: string
  image_id_card: any
  user_create_id: any
  user_update_id: any
  date_time_died: any
  date_time_go_home: any
  create_date: string
  update_date: string
  mission_id: string
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
  }>
  DiscoveredPatient: any
  OrderTransfer: Array<any>
  ParkingHistory: any
  BelongCar: {
    id: string
    car_id: string
    patient_id: string
    create_date: string
    update_date: string
  }
  BelongShip: any
  BelongHelicopter: any
  HistoryPatientBelongCar: Array<{
    id: string
    car_id: string
    not_anymore: boolean
    transpose_date_time: any
    transpose_to: any
    transpose_id: any
    patient_id: string
    create_date: string
    update_date: string
  }>
  HistoryPatientBelongShip: Array<any>
  HistoryPatientBelongHelicopter: Array<any>
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
