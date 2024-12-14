'use client';
import * as React from 'react';
import Card from '@mui/material/Card';
import Box from '@mui/material/Box';
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';
import { Patients } from '@/models/patient';
import { Avatar, Badge, CardMedia, Fab, IconButton } from '@mui/material';
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
import FolderDeleteIcon from '@mui/icons-material/FolderDelete';

import DirectionsCarIcon from '@mui/icons-material/DirectionsCar';

import EditCalendarIcon from '@mui/icons-material/EditCalendar';
import { timeOutJwt } from '@/services/timeout.service';
import { assingPatinetToCarByCarIdAndPatientId } from '@/services/car.service';
import { assingPatientInHelicopter } from '@/services/helicopter.service';
import QrCode2Icon from '@mui/icons-material/QrCode2';

import AirplanemodeActiveIcon from '@mui/icons-material/AirplanemodeActive';
import DirectionsBoatIcon from '@mui/icons-material/DirectionsBoat';
import HelicopterIcon from '@/assets/image/icon_menu/helicopter_5768628.png'
import CarIcon from '@/assets/icon/ambulance.png'
import ShipIcon from '@/assets/image/icon_menu/ship_3469160.png'
import BlockIcon from '@mui/icons-material/Block';
import { assingPatientInShip } from '@/services/ship.service';
import { dbDexie } from '@/configs/dexie.config';

type Props = {
  patient: Patients;
  order_tranfer_id?: string;
};

export default async function PatientList({ patient, order_tranfer_id }: Props) {
  console.log(patient);
  
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

  async function handlerOnAddPatientInVehicles() {
    setIsLoad(true)
    try {
      if (vehicle_id) {
        if (key === 'add-helicopter') {
          await assingPatientInHelicopter(vehicle_id, patient.id)
          history.back()
        }
        if (key === 'add-car') {
          await assingPatinetToCarByCarIdAndPatientId(vehicle_id, patient.id)
          history.back()
        }
        if (key === 'add-ship') {
          await assingPatientInShip(vehicle_id, patient.id)
          history.back()
        }
      }
    } catch (error: any) {
      toast(error.message, 'error')
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
            width={'100%'}
            direction="row"
            justifyContent="space-between"
            alignItems="center"
          >
            <Typography
              gutterBottom
              variant="body1"
              component="div"
              style={{ fontWeight: 700 }}
            >
              QR_Number: {patient.qr_number ?? "ไม่มีเลข"}
            </Typography>
            {
              patient.BelongHelicopter ?
                <IconButton color='primary' onClick={() => {
                  setIsLoad(true)
                  window.location.href = '/vihecle/' + patient.BelongHelicopter.helicopter_id + '/helicopter'
                }}>
                  <Badge sx={{ overflow: 'scroll' }} badgeContent="อยู๋" color='success'>
                    <img style={{ width: 30 }} src={HelicopterIcon.src} />
                  </Badge>
                </IconButton> : null
            }
            {
              patient.BelongCar ?
                <IconButton color='default' onClick={() => {
                  setIsLoad(true)
                  window.location.href = '/vehicle/' + patient.BelongCar.car_id + '/car/detail'
                }}>
                  <Badge badgeContent="อยู๋" color='success'>
                    <img style={{ width: 30 }} src={CarIcon.src} />
                  </Badge>
                </IconButton>
                : null
            }
            {
              patient.BelongChip ?
                <IconButton color='default' onClick={() => {
                  setIsLoad(true)
                  window.location.href = '/vehicle/' + patient.BelongCar.car_id + '/car/detail'
                }}>
                  <Badge badgeContent="อยู๋" color='success'>
                    <img style={{ width: 30 }} src={ShipIcon.src} />
                  </Badge>
                </IconButton>
                : null
            }
            {
              !patient.BelongHelicopter && !patient.BelongCar && !patient.BelongChip ?
                <IconButton color='primary'>
                  <Badge badgeContent="ว่าง" color='warning'>
                    <BlockIcon color='error' />
                  </Badge>
                </IconButton>
                : null
            }

          </Stack>
          <Divider />
          <Stack
            width={'100%'}
            direction="row"
            justifyContent="space-between"
            alignItems="center"
          >
            <div>
              <Typography
                gutterBottom
                variant="body1"
                component="div"
                style={{ fontWeight: 500 }}
              >
                ชื่อ: {patient.first_name}
              </Typography>
              <Typography
                gutterBottom
                variant="body1"
                component="div"
                style={{ fontWeight: 500 }}
              >
                สกุล: {patient.last_name}
              </Typography>
              <Typography color="text.secondary" variant="body2" component={'div'}>
                G:{patient.gender}, Age:
                {patient.age ? patient.age : 'ไม่ได้ระบุ'}, Birthday:
                {patient.birthday ? patient.birthday : 'ไม่ได้ระบุ'}
              </Typography>
            </div>
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column' }}>
              <Avatar
                sx={{ width: 90, height: 90, objectFit: 'fill' }}
                src={patient.image ? patient.image : enviromentPath.noImage}
                alt="Live from space album cover"
              />
            </Box>
          </Stack>
        </Box>
        <Divider />
        <Box sx={{ p: 2 }}>
          {
            key ?

              <Chip
                label={onConvertStr(key)}
                icon={onConvertIcon(key)}
                onClick={handlerOnAddPatientInVehicles}
                variant="outlined"
                color='success'
              />
              :
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
                  <IconButton
                    size="small"
                    color="primary"

                  >
                    <QrCode2Icon color="inherit" />
                  </IconButton>
                  {
                    window.navigator.onLine ?
                      <IconButton
                        size="small"
                        color="primary"
                        onClick={async () => {
                          await dbDexie.patients.delete(patient.id).catch(e => null)
                          window.location.reload()
                        }}
                      >
                        <FolderDeleteIcon color="error" />
                      </IconButton> : null
                  }
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

  function onConvertStr(str: string) {
    if (str.includes('add-car')) {
      return "เพื่มผู้ป่วยในรถรับส่ง"
    }
    if (str.includes('add-helicopter')) {
      return "เพื่มผู้ป่วยใน ฮ. รับส่ง"
    }
    if (str.includes('add-ship')) {
      return "เพื่มผู้ป่วยใน เรื่อ รับส่ง"
    }
  }

  function onConvertIcon(str: string) {
    if (str.includes('add-car')) {
      return <DirectionsCarIcon />
    }
    if (str.includes('add-helicopter')) {
      return <AirplanemodeActiveIcon />
    }
    if (str.includes('add-ship')) {
      return <DirectionsBoatIcon />
    }
  }
}
