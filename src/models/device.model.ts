interface Device {
  id: string;
  brand: string
  device_id: string;
  branch_id?: any;
  is_active: boolean;
  create_date: string;
  type: string;
  Patient: Array<{
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
    device_id: any
    risk_level_id: any
    deviceId: string
  }>
}
