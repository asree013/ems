import { Users } from "./users.model"

export interface Missions {
    id: string
    status: string
    type: string
    title: string
    description: string
    image: string
    lat: string
    long: string
    utm: string
    mgrs: string
    user_create_id: string
    user_update_id: string
    create_date: string
    update_date: string
    Users: Array<Users>
    _count: {
      Notification: number
      LocationSearch: number
      Users: number
      MissionHistory: number
    }
  }
  