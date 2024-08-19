export interface Cars {
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
  PatientBelongCar: Array<any>
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
