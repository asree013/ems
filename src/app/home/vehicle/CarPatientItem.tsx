'use client'
import * as React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Divider from '@mui/material/Divider';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import { Patients } from '@/models/patient';
import { findPatientById } from '@/services/paitent.service';
import { timeOutJwt } from '@/services/timeout.service';
import { toast } from '@/services/alert.service';
import { enviromentDev } from '@/configs/enviroment.dev';
import { convertGender, findCurrentVehicleByUser } from '@/services/user.service';
import { Button } from '@mui/material';
import { unAssingPatinetToCarByCarIdAndPatientId } from '@/services/car.service';
import Loadding from '@/components/Loadding';

type PatientInCar = {
    id: string
    car_id: string
    patient_id: string
    transpose_date_time: any
    transpose_to: any
    transpose_id: any
    create_date: string
    update_date: string
    Patient: {
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
        risk_level_id: any
        History: Array<{
            id: string
            symptom_details: string
            status: string
            create_date: string
            update_date: string
            patient_id: string
            chief_complaint: string
            present_illness: string
            user_create_id: string
            user_update_id: string
            physical_status: string
            triage_lavel: string
        }>
    }
    Car: {
        id: string
        status: string
        type: string
        number: string
        description: any
        image_front: string
        image_back: string
        image_left: string
        image_rigth: string
        radio: string
        calling: string
        driver_id: string
        mission_id: any
        create_date: string
        update_date: string
        hospital_id: string
    }
}

export default function CarPatientitem({ patient }: { patient: PatientInCar }) {
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
