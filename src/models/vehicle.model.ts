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
    mission_id: string
    hospital_id: string
    create_date: string
    update_date: string
}

export interface Vehicles {
    car: {
      id: string
      user_id: string
      car_id: string
      time_un_belong: any
      create_date: string
      update_date: string
      Car: Cars
      is_driver: boolean
    },
    helicopter: Helicopters,
    ship: {}
}
