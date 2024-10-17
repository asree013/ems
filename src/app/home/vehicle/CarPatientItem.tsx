'use client'
import * as React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Divider from '@mui/material/Divider';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import { PatientBelongCar, Patients } from '@/models/patient';
import { findPatientById } from '@/services/paitent.service';
import { timeOutJwt } from '@/services/timeout.service';
import { toast } from '@/services/alert.service';
import { enviromentDev } from '@/configs/enviroment.dev';
import { convertGender, findCurrentVehicleByUser } from '@/services/user.service';
import { Button, IconButton, Tooltip } from '@mui/material';
import { unAssingPatinetToCarByCarIdAndPatientId } from '@/services/car.service';
import Loadding from '@/components/Loadding';

import MonitorHeartIcon from '@mui/icons-material/MonitorHeart';
import QueuePlayNextIcon from '@mui/icons-material/QueuePlayNext';


export default function CarPatientitem({ patient }: { patient: PatientBelongCar }) {
    const [load, setLoad] = React.useState(false)


    async function onLeafPatientOnCar() {
        setLoad(true)
        try {
            const cars = await findCurrentVehicleByUser()
            const result = await unAssingPatinetToCarByCarIdAndPatientId(patient.id, cars.data.car.Car.id)
            toast('เอาผู้ป่วยออกจากรถแล้ว', 'success')
        } catch (error: any) {
            console.log(error);
            toast(JSON.stringify(error.message), 'error')

        } finally {
            setLoad(false)
        }
    }

    return (
        <>
            <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
                <ListItem alignItems="flex-start">
                    <ListItemAvatar style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'sp' }}>
                        <Avatar alt="Remy Sharp" src={patient.Patient.image ?? enviromentDev.noImage} />
                        <p>{convertGender(patient.Patient.gender)}</p>
                    </ListItemAvatar>
                    <ListItemText className='ml-4'>
                        <p>{patient.Patient.first_name}</p>
                        <p>{patient.Patient.last_name}</p>
                    </ListItemText>
                    {
                        patient.Patient.OrderTransfer.filter(r => r.status_order.toLocaleLowerCase().includes('transfer')).length > 0 ?
                            null :
                            <ListItemText className='ml-4'>
                                <Tooltip title="เพิ่มจอแสดงกราฟ">
                                    <IconButton color='primary' onClick={() => {
                                        setLoad(true)
                                        window.location.href = `vehicle/${patient.car_id}/car/detail/add_monitor?patient_add_id=${patient.Patient.id}`
                                    }}>
                                        <QueuePlayNextIcon />
                                    </IconButton>
                                </Tooltip>
                            </ListItemText>
                    }
                </ListItem>
                <Button onClick={onLeafPatientOnCar} variant='outlined' color='error' className='w-full'>เอาผู้ป่วยออก</Button>
                <Divider className='mt-2' />
            </List>


            {
                load ?
                    <Loadding />
                    : null
            }
        </>
    );
}
