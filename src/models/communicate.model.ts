export interface Communicates {
    owner: {
        id: string
        first_name: string
        last_name: string
        status: string
        role: string
        email: any
        address: any
        phone_number: any
        career: any
        id_card: any
        image: any
        create_date: string
        update_date: string
        hospital_branch_id: any
        hospital_id: string
        doctorsId: any
        squad_id: any
        team_id: any
        mission_id: string
        Squad: any
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
        Responsibilities: any
        DriverCar: {
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
        }
        DriverShip: {
            id: string
            name: string
            phone_number: string
            description: any
            status: string
            image: string
            radio: string
            calling: string
            hospital_id: string
            create_date: string
            update_date: string
            driver_id: string
            type_id: string
            mission_id: any
        }
        DriverHelicopter: any
    }
    communication_id: string
    Joiner: Array<any>
}

export interface Rooms {
    id: string
    owner_id: string
    Joiner: Array<{
      first_name: string
      last_name: string
      phone_number: any
      image: string
    }>
  }
