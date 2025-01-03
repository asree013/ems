'use client'
import React, { useState, useEffect, useContext } from 'react';
import PatientForm from './PatientForm';
import PatientGenModel from './PatientGenModal';
import { NIL } from 'uuid';
import WcIcon from '@mui/icons-material/Wc';
import Typography from '@mui/joy/Typography';
import { Patients } from '@/models/patient';
import { Box, Card, Input, TextField } from '@mui/material';
import {
  createPatient,
  findPatientById,
  updatePatient,
} from '@/services/paitent.service';
import Loadding from '@/components/Loadding';

import Divider from '@mui/material/Divider';
import InfoOutlined from '@mui/icons-material/InfoOutlined';

import pateintIdCss from './patient_id.module.css';
import RiskLevelModal from './RiskLevelModal';
import { toast } from '@/services/alert.service';
import { PatientContext } from '@/contexts/patient.context';
import { timeOutJwt } from '@/services/timeout.service';
import BreadCrumb, { TBreadCrumd } from '@/components/BreadCrumb';

type Props = {
  params: {
    patient_id: string;
  };
};

const items: TBreadCrumd[] = [
  {
    labe: 'หน้าหลัก',
    path: '/home'
  },
  {
    labe: 'ผู้ป่วย',
    path: '/patient'
  },
  {
    labe: 'เพิ่ม ผู้ป่วย',
    path: '/patient'
  },
]

const Page: React.FC<Props> = ({ params }: Props) => {
  const [open, setOpen] = useState<boolean>(true);
  const [openRisk, setOpenRisk] = useState<boolean>(false);
  const [isLoad, setIsLoad] = useState(false);
  const [patient, setPatient] = useState<Patients>({} as Patients)

  const onReturnGender = (txt: string) => {
    setPatient({ ...patient, gender: txt });
  };

  const onReturnStateOpen = (bool: boolean) => {
    setOpen(bool);
  };

  const onReturnRiskLevel = (txt: string) => {
    alert(txt);
  };

  const onReturnStateRiskLevel = (bool: boolean) => {
    setOpenRisk(bool);
  };

  const onCreatePatient = async () => {
    setIsLoad(true)
    try {
      const p = {} as Patients;
      p.address = patient.address;
      p.age = patient.age;
      p.birthday = patient.birthday;
      p.first_name = patient.first_name
        ? patient.first_name
        : patient.gender.includes('Male')
          ? 'ชายไม่ทราบชื่อ'
          : 'หญิงไม่ทราบชื่อ';
      p.gender = patient.gender;
      p.group_blood = patient.group_blood;
      p.id_card = patient.id_card;
      p.image = patient.image;
      p.image_id_card = patient.image_id_card;
      p.last_name = patient.last_name
        ? patient.last_name
        : patient.gender.includes('Male')
          ? 'ชายไม่ทราบนามสกุล'
          : 'หญิงไม่ทราบนามสกุล';
      // p.risk_level = patient.risk_level;
      p.tel = patient.tel;
      p.qr_number = patient.qr_number
      console.log(p);

      await createPatient(p);
      history.back();
    } catch (error) {
      timeOutJwt(error)
      toast('error', 'error');
      console.log(error);
      setIsLoad(false)
    }
  };

  const onUpdatePatient = async () => {
    setIsLoad(true)
    try {
      const p = {} as Patients;
      p.address = patient.address;
      p.age = patient.age;
      p.birthday = p.birthday; // This line may need correction, check your logic
      p.first_name = patient.first_name;
      p.gender = patient.gender;
      p.group_blood = patient.group_blood;
      p.id_card = patient.id_card;
      p.image = patient.image;
      p.image_id_card = patient.image_id_card;
      p.last_name = patient.last_name;
      // p.risk_level = patient.risk_level;
      p.tel = patient.tel;
      const result = await updatePatient(params.patient_id, p);
      toast('update patient', 'success');
      history.back();
    } catch (error) {
      toast('error', 'error');
      setIsLoad(false)
    }
  };

  useEffect(() => {
    if (params.patient_id !== NIL) {
      const feedPatientById = async () => {
        setIsLoad(true);
        try {
          const result = await findPatientById(params.patient_id);
          setPatient(result.data);
          setOpen(false);
        } catch (error) {
          alert('error');
        } finally {
          setIsLoad(false);
        }
      };

      feedPatientById();
    }
  }, [params.patient_id]);

  return (
    <>
      <BreadCrumb item={items} />
      <PatientContext.Provider value={{ patient, setPatient }} >
        <div className={pateintIdCss.patient_id_flex}>
          <div className={pateintIdCss.patient_id_home}>
            <Box
              sx={{
                width: '100%',
                alignItems: 'center',
                justifyContent: 'start',
              }}
            >
              <Typography level="title-lg" startDecorator={<InfoOutlined />}>
                {params.patient_id === NIL
                  ? 'Patient form Create'
                  : 'Detail Patient'}
              </Typography>
            </Box>
            <Card className="card_item">
              <Box sx={{}}>
                <Typography
                  sx={{ margin: '10px' }}
                  level="title-lg"
                  startDecorator={<WcIcon />}
                  onClick={() => {
                    setOpen(true);
                  }}
                >
                  Gender:{' '}
                  {patient.gender ? patient.gender : 'กรุณาเลือกเพศ'}
                </Typography>
                <Divider />
              </Box>
            </Card>

            <Card style={{ width: '92%', padding: '10px', margin: '10px 0' }} elevation={4}>
              <label style={{ margin: '5px 0' }}>กรอกเลข Qr-Number </label>
              <TextField onChange={(e) => {
                setPatient({ ...patient, qr_number: e.target.value })
              }} id="Qe" label="Qr Number" variant="filled" style={{ width: '100%' }} />
            </Card>

            <PatientForm
              returnOnCreatePatient={onCreatePatient}
              returnOnUpdatePatient={onUpdatePatient}
            />

          </div>
          <PatientGenModel
            returnStateOpen={onReturnStateOpen}
            openModel={open}
            returnGender={onReturnGender}
          />
          <RiskLevelModal
            openModel={openRisk}
            returnRiskLevel={onReturnRiskLevel}
            returnStateOpenRisk={onReturnStateRiskLevel}
          />
        </div>
      </PatientContext.Provider>

      {
        isLoad ?
          <Loadding /> :
          null
      }
    </>
  );
};

export default Page;
