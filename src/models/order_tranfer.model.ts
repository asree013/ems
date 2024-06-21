export interface OrderTranfer {
  id: string;
  status_order: string;
  device_monitor_id: string;
  element_seq: number;
  create_date: string;
  patient_id: string;
  hospital_branch_id: string;
  Device: Device;
}
export interface Device {
  id: string;
  device_id: string;
  branch_id?: any;
  is_active: boolean;
  create_date: string;
}

export interface CreateOrder {
  device_id: string;
  element_seq: number;
}
