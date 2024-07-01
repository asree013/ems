export interface AllergyDrug {
    id: string
    name_drug: string
    create_date: string
    update_date: string
    patient_id: string
    Patient: {
      id: string
      first_name: string
      last_name: string
      gender: string
      age: number
      risk_level: any
      birthday: any
      id_card: string
      tel: string
      address: any
      group_blood: string
      image: any
      image_id_card: any
      user_create_id: any
      user_update_id: any
      create_date: string
      update_date: string
    }
  }
  