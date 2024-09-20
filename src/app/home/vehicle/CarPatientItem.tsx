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

export default function CarPatientitem({ patient_id }: { patient_id: string }) {
    const [patient, setPatient] = React.useState<Patients>({} as Patients)
    const [load, setLoad] = React.useState(false)

    const feedPatientByPatientId = React.useCallback(async () => {
        try {
            const result = await findPatientById(patient_id)
            setPatient(result.data)
        } catch (error: any) {
            timeOutJwt(error)
            toast(JSON.stringify(error.message), 'error')
        }
    }, [setPatient])

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

    React.useEffect(() => {
        feedPatientByPatientId()

        return () => {
            feedPatientByPatientId
        }
    }, [feedPatientByPatientId])
    return (
        <>
            <div>
                <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
                    <ListItem alignItems="flex-start">
                        <ListItemAvatar style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'sp' }}>
                            <Avatar alt="Remy Sharp" src={patient.image ?? enviromentDev.noImage} />
                            <p>{convertGender(patient.gender)}</p>
                        </ListItemAvatar>
                        <ListItemText className='ml-4'>
                            <p>{patient.first_name}</p>
                            <p>{patient.last_name}</p>
                        </ListItemText>
                    </ListItem>
                </List>
                <Button onClick={onLeafPatientOnCar} variant='outlined' color='error' className='w-full'>เอาผู้ป่วยออก</Button>
                <Divider className='mt-2' />
            </div>

            {
                load?
                <Loadding />
                :null
            }
        </>
    );
}
