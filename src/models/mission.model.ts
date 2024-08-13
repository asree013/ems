import { Users } from "./users.model"

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
