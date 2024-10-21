import { Hospitals } from "./hospital.model"

export type Users = {
  id: string
  username: string,
  password: string
  first_name: string
  last_name: string
  status: string
  role: string
  email: string
  address: string
  phone_number: string
  career: string
  id_card: string
  image: string
  create_date: string
  update_date: string
  hospital_branch_id: string
  hospital_id: string
  doctorsId: string
  squad_id: string
  team_id: string
  mission_id: string
  Squad: string
  Hospital: Hospitals
  Responsibilities: string
  LocationActive: LocationActive[]
}

export type LocationActive = {
  id: string
  lat: string
  long: string
  utm: string
  mgrs: string
  create_date: string
  users_id: string
}

export interface UserRegister {
  id: string
  username: string
  first_name: string
  last_name: string
  status: string
  role: string
  email: string
  address: any
  phone_number: string
  career: string
  id_card: string
  image: string
  create_date: string
  update_date: string
  hospital_branch_id: any
  refresh_token: any
  hospital_id: any
  doctorsId: any
  squad_id: string
  team_id: any
  mission_id: any
}