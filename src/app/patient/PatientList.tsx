'use client';
import * as React from 'react';
import Card from '@mui/material/Card';
import Box from '@mui/material/Box';
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';
import { Patients } from '@/models/patient';
import { CardMedia, Fab, IconButton } from '@mui/material';
import { enviromentDev, enviromentPath } from '@/configs/enviroment.dev';
import HistoryIcon from '@mui/icons-material/History';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import PersonAddAltIcon from '@mui/icons-material/PersonAddAlt';
import {
  editOrderTranferByOrderId,
  findOrderTranferByOrderId,
} from '@/services/order_tranfer.service';
import { OrderTranfer } from '@/models/order_tranfer.model';
import { toast } from '@/services/alert.service';
import Loadding from '@/components/Loadding';

import DirectionsCarIcon from '@mui/icons-material/DirectionsCar';

import EditCalendarIcon from '@mui/icons-material/EditCalendar';
import { timeOutJwt } from '@/services/timeout.service';
import { assingPatinetToCarByCarIdAndPatientId } from '@/services/car.service';

type Props = {
  patient: Patients;
  order_tranfer_id?: string;
};

export default function PatientList({ patient, order_tranfer_id }: Props) {
  const pathName = usePathname().includes('patient');
  const router = useRouter();
  const [isLoad, setIsLoad] = React.useState(false);
  const key = useSearchParams().get('key')
  const vehicle_id = useSearchParams().get('vehicle_id')


  async function onClickAddPatientInOrder() {
    setIsLoad(true);
    try {
      if (order_tranfer_id) {
        const order = await findOrderTranferByOrderId(order_tranfer_id);
        const ot = {} as OrderTranfer;
        ot.patient_id = patient.id;
        ot.device_monitor_id = order.data.device_monitor_id;
        editOrderTranferByOrderId(order_tranfer_id, ot);
        toast('add Patient', 'success');
        router.push('/monitor');
      }
    } catch (error) {
      console.log(error);
      setIsLoad(false);
    }
  }

  async function handlerOnAddPatientInCar() {
    setIsLoad(true)
    try {
      if (vehicle_id) {
        await assingPatinetToCarByCarIdAndPatientId(vehicle_id, patient.id)
        history.back()
      }
    } catch (error) {
      // timeOutJwt(error)
    } finally {
      setIsLoad(false)
    }
  }
  return (
    <>

      <Card variant="outlined" sx={{ maxWidth: 360 }}>
        <Box sx={{ p: 2 }}>
          <Stack
            direction="row"
            justifyContent="space-between"
            alignItems="center"
          >
            <div>
              <Typography
                gutterBottom
                variant="body1"
                component="div"
                style={{ fontWeight: 700 }}
              >
                {patient.first_name}
              </Typography>
              <Typography
                gutterBottom
                variant="body1"
                component="div"
                style={{ fontWeight: 700 }}
              >
                {patient.last_name}
              </Typography>
              <Typography color="text.secondary" variant="body2">
                G:{patient.gender}, Age:
                {patient.age ? patient.age : 'ไม่ได้ระบุ'}, Birthday:
                {patient.birthday ? patient.birthday : 'ไม่ได้ระบุ'}
              </Typography>
            </div>
            <CardMedia
              component="img"
              sx={{ width: 151 }}
              image={patient.image ? patient.image : enviromentPath.noImage}
              alt="Live from space album cover"
            />
          </Stack>
        </Box>
        <Divider />
        <Box sx={{ p: 2 }}>
          {
            key ?
              <Chip
                label="เพื่มผู้ป่วยในรถรับส่ง"
                icon={<DirectionsCarIcon />}
                onClick={handlerOnAddPatientInCar}
                variant="outlined"
                color='success'
              /> :
              pathName ? (
                <Stack direction="row" spacing={1}>
                  <IconButton
                    size="small"
                    color="warning"
                    onClick={() => {
                      router.push('/patient/' + patient.id);
                      setIsLoad(true);
                    }}
                  >
                    <EditCalendarIcon color="inherit" />
                  </IconButton>
                  <IconButton
                    size="small"
                    color="success"
                    onClick={() => {
                      router.push('/patient/' + patient.id + '/history');
                      setIsLoad(true);
                    }}
                  >
                    <HistoryIcon color="inherit" />
                  </IconButton>
                </Stack>
              ) : (
                <Stack direction="row" spacing={1}>
                  <Fab size="small" onClick={onClickAddPatientInOrder}>
                    <PersonAddAltIcon color="primary" />
                  </Fab>
                  <Chip label="Medium" size="medium" />
                  <Chip label="Hard" size="medium" />
                </Stack>
              )
          }
        </Box>
      </Card>

      {isLoad ?
        <Loadding /> :
        null
      }

    </>
  );
}
