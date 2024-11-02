import { PatientBelongCar } from "./patient"

export interface ShipsCars {
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
  Parking: Array<any>
  UserBelongCar: Array<{
    id: string
    user_id: string
    car_id: string
    time_un_belong: any
    create_date: string
    update_date: string
  }>
  PatientBelongCar: Array<{
    id: string
    car_id: string
    patient_id: string
    transpose_date_time: any
    transpose_to: any
    transpose_id: any
    create_date: string
    update_date: string
  }>
  _count: {
    UserBelongCar: number
    Parking: number
    PatientBelongCar: number
    UserHistoryDriveCar: number
    CarLocation: number
    HistoryPatientBelongCar: number
  }
}

export interface Cars{
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
}

export interface CarByCarId {
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
  driver_id: string
  mission_id: string
  create_date: string
  update_date: string
  hospital_id: string
  Parking: Array<any>
  UserBelongCar: Array<{
    id: string
    user_id: string
    car_id: string
    time_un_belong: any
    create_date: string
    update_date: string
  }>
  PatientBelongCar: PatientBelongCar[]
  Mission: {
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
  }
  CarLocation: Array<any>
  Driver: {
    id: string
    username: string
    password: string
    first_name: string
    last_name: string
    status: string
    role: string
    email: any
    address: any
    phone_number: any
    career: any
    id_card: any
    image: string
    create_date: string
    update_date: string
    hospital_branch_id: any
    refresh_token: string
    hospital_id: string
    doctorsId: any
    squad_id: any
    team_id: any
    mission_id: string
  }
  HistoryPatientBelongCar: Array<{
    id: string
    car_id: string
    not_anymore: boolean
    patient_id: string
    create_date: string
    update_date: string
  }>
  Hospital: {
    id: string
    hospital_name: string
    hospital_tel: string
    lat: string
    long: string
    utm: string
    mgrs: string
    status: string
    create_date: string
    update_date: string
  }
  UserHistoryDriveCar: Array<{
    id: string
    driver_id: string
    car_id: string
    date_time_drive: string
    date_time_un_drive: any
    create_date: string
    update_date: string
  }>
  _count: {
    UserBelongCar: number
    Parking: number
    PatientBelongCar: number
    UserHistoryDriveCar: number
    CarLocation: number
    HistoryPatientBelongCar: number
  }
}


export interface Helicopters {
  id: string
  number: string
  description: string
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
}

export interface HelicopterById {
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
  HelicopterLocation: Array<any>
  Mission: any
  HistoryPatientBelongHelicopter: PatientBelongCar[]
  UserBelongHelicopter: Array<{
    id: string
    user_id: string
    helicopter_id: string
    time_un_belong: any
    create_date: string
    update_date: string
  }>
  PatientBelongHelicopter: Array<any>
  _count: {
    HelicopterLocation: number
    UserHistoryDriveHelicopter: number
    UserBelongHelicopter: number
    PatientBelongHelicopter: number
    HistoryPatientBelongHelicopter: number
  }
}

export interface Ships {
  id: string;
  status: string
  name: string
  phone_number: string
  description: string
  image: string
  radio: string
  calling: string
  hospital_id: string
  type_id: string
  missionId: string
}

export interface Vehicles {
  car: {
    id: string
    user_id: string
    car_id: string
    time_un_belong: any
    create_date: string
    update_date: string
    Car: CarInVehicle
    is_driver: boolean
  }
  ship: any
  helicopter: {
    id: string
    user_id: string
    helicopter_id: string
    time_un_belong: any
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
      mission_id: any
      hospital_id: string
      create_date: string
      update_date: string
      PatientBelongHelicopter: Array<any>
    }
    is_driver: boolean
  }

  
}

export type CarInVehicle = {
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
  driver_id: string
  mission_id: string
  create_date: string
  update_date: string
  hospital_id: string
  PatientBelongCar: PatientBelongCar[]
}
