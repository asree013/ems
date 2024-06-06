'use client'
import React from 'react'
import PatientForm from './PatientForm'
import PatientGenModel from './PatientGenModal'
import { NIL } from 'uuid'
import WcIcon from '@mui/icons-material/Wc';
import Typography from '@mui/joy/Typography';
import { Patients } from '@/models/patient'
import { Box, Card } from '@mui/material'
import { createPatient, findPatientById, updatePatient } from '@/services/paitent.service'
import Loadding from '@/components/Loadding'

import Divider from '@mui/material/Divider';
import InfoOutlined from '@mui/icons-material/InfoOutlined';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';

import './patient_id.css'
import RiskLevelModal from './RiskLevelModal'
import { useRouter } from 'next/navigation'
import { toast } from '@/services/alert.service'

type Props = {
  params: {
    patient_id: string
  }
}

export type PContext = {
  patient: Patients;
  setPatient: React.Dispatch<React.SetStateAction<Patients>>;
};

export const PatientContext = React.createContext<PContext>({} as PContext)


export default function page({ params }: Props) {

  const router = useRouter()

  const [open, setOpen] = React.useState<boolean>(true)
  const [openRisk, setOpenRisk] = React.useState<boolean>(false)
  const [patient, setPatient] = React.useState<Patients>({} as Patients)
  const [isLoad, setIsLoad] = React.useState(false)
  function onReturnGender(txt: string) {
    setPatient({ ...patient, gender: txt })
  }
  function onReturnStateOpen(bool: boolean) {
    setOpen(bool)
  }
  function onReturnRiskLevel(txt: string) {
    alert(txt)
  }
  function onReturnStateRiskLevel(bool: boolean) {
    setOpenRisk(bool)
  }

  async function onCreatePatient() {
    try {
      const p = {} as Patients
      p.address = patient.address
      p.age = patient.age
      p.birthday = patient.birthday
      p.first_name = patient.first_name ? patient.first_name : patient.gender.includes('Male') ? 'ชายไม่ทราบชื่อ' : 'หญิงไม่ทราบชื่อ'
      p.gender = patient.gender
      p.group_blood = patient.group_blood
      p.id_card = patient.id_card
      p.image = patient.image
      p.image_id_card = patient.image_id_card
      p.last_name = patient.last_name ? patient.last_name : patient.gender.includes('Male') ? 'ชายไม่ทราบนามสกุล' : 'หญิงไม่ทราบนามสกุล'
      p.risk_level = patient.risk_level
      p.tel = patient.tel

      await createPatient(p)
      router.back()
    } catch (error) {
      toast('error', 'error')
      console.log(error);

    }
  }

  async function onUpdatePatient() {
    try {
      const p = {} as Patients
      p.address = patient.address
      p.age = patient.age
      p.birthday = p.birthday
      p.first_name = patient.first_name
      p.gender = patient.gender
      p.group_blood = patient.group_blood
      p.id_card = patient.id_card
      p.image = patient.image
      p.image_id_card = patient.image_id_card
      p.last_name = patient.last_name
      p.risk_level = patient.risk_level
      p.tel = patient.tel
      const result = await updatePatient(params.patient_id, p)
      toast('update patient', 'success')
      router.back()
    } catch (error) {
      toast('error', 'error')
    }
  }
  if (params.patient_id === NIL) {
    return (
      <div className='patient_id_flex'>
        <PatientContext.Provider value={{ patient, setPatient }}>
          <div className='patient_id_home'>
            <Box sx={{ width: '100%', alignItems: 'center', justifyContent: 'start' }}>
              <Typography level="title-lg" startDecorator={<InfoOutlined />}>
                Patient form Create
              </Typography>
            </Box>
            <Card className='card_item'>
              <Box sx={{}}>
                <Typography sx={{ margin: '10px' }} level="title-lg" startDecorator={<WcIcon />} onClick={() => {
                  setOpen(true)
                }}>
                  Gender: {patient.gender ? patient.gender : 'กรุณาเลือกเพศ'}
                </Typography>
                <Divider />
                <Typography sx={{ margin: '10px' }} level="title-lg" startDecorator={<CheckCircleOutlineIcon color='success' />}
                  onClick={() => {
                    setOpenRisk(true)
                  }}>
                  Risk Level: {patient.risk_level ? null : 'กรุณาเลือกระดับความอันตรา'}
                  {patient.risk_level === 'W' ? 'W (บาดเจ็ยเล็กน้อย/ไม่อันราย)' : null}
                  {patient.risk_level === 'G' ? 'G (ปลอดภัย)' : null}
                  {patient.risk_level === 'Y' ? 'Y (บาดเจ็ยเล็กน้อย/อันราย)' : null}
                  {patient.risk_level === 'R' ? 'R (บาดเจ็บสาหัส)' : null}
                  {patient.risk_level === 'B' ? 'B (เสียชีวิต)' : null}
                </Typography>
              </Box>
            </Card>
            <PatientForm returnOnCreatePatient={onCreatePatient} returnOnUpdatePatient={onUpdatePatient} />
          </div>
          <PatientGenModel returnStateOpen={onReturnStateOpen} openModel={open} returnGender={onReturnGender} />
          <RiskLevelModal openModel={openRisk} returnRiskLevel={onReturnRiskLevel} returnStateOpenRisk={onReturnStateRiskLevel} />
        </PatientContext.Provider>
      </div>
    )
  }
  else {
    React.useEffect(() => {
      async function feedPatientById() {
        setIsLoad(true)
        try {
          const result = await findPatientById(params.patient_id)
          setPatient(result.data)
          setOpen(false)
        } catch (error) {
          alert('error')
        } finally {
          setIsLoad(false)
        }
      }

      feedPatientById()
    }, [])
    return (
      <>
        {
          isLoad ?
            <Loadding /> :
            <div className='patient_id_flex'>
              <PatientContext.Provider value={{ patient, setPatient }}>
                <div className='patient_id_home'>
                  <Box sx={{ width: '100%', alignItems: 'center', justifyContent: 'start' }}>
                    <Typography level="title-lg" startDecorator={<InfoOutlined />}>
                      Detail Patient
                    </Typography>
                  </Box>
                  <Card className='card_item'>
                    <Box sx={{}}>
                      <Typography sx={{ margin: '10px' }} level="title-lg" startDecorator={<WcIcon />} onClick={() => {
                        setOpen(true)
                      }}>
                        Gender: {patient.gender ? patient.gender : 'กรุณาเลือกเพศ'}
                      </Typography>
                      <Divider />
                      <Typography sx={{ margin: '10px' }} level="title-lg" startDecorator={<CheckCircleOutlineIcon color='success' />}
                        onClick={() => {
                          setOpenRisk(true)
                        }}>
                        Risk Level: {patient.risk_level ? null : 'กรุณาเลือกระดับความอันตรา'}
                        {patient.risk_level === 'W' ? 'W (บาดเจ็ยเล็กน้อย/ไม่อันราย)' : null}
                        {patient.risk_level === 'G' ? 'G (ปลอดภัย)' : null}
                        {patient.risk_level === 'Y' ? 'Y (บาดเจ็ยเล็กน้อย/อันราย)' : null}
                        {patient.risk_level === 'R' ? 'R (บาดเจ็บสาหัส)' : null}
                        {patient.risk_level === 'B' ? 'B (เสียชีวิต)' : null}
                      </Typography>
                    </Box>
                  </Card>
                  <PatientForm returnOnCreatePatient={onCreatePatient} returnOnUpdatePatient={onUpdatePatient} />
                </div>
                <PatientGenModel returnStateOpen={onReturnStateOpen} openModel={open} returnGender={onReturnGender} />
                <RiskLevelModal openModel={openRisk} returnRiskLevel={onReturnRiskLevel} returnStateOpenRisk={onReturnStateRiskLevel} />
              </PatientContext.Provider>
            </div>
        }
      </>
    )
  }
}
