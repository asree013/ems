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
    driver_id: string
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
      driver_id: string
      mission_id: string
      create_date: string
      update_date: string
      hospital_id: string
      PatientBelongCar: Array<{
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
          }>
        }
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
          driver_id: string
          mission_id: any
          create_date: string
          update_date: string
          hospital_id: string
        }
      }>
    },
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
