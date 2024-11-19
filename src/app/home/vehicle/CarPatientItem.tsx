'use client'

import Loadding from '@/components/Loadding';
import { enviromentDev } from '@/configs/enviroment.dev';
import { PatientBelongCar } from '@/models/patient';
import { PatientBelongShip, Vehicles } from '@/models/vehicle.model';
import { toast } from '@/services/alert.service';
import { unAssingPatinetToCarByCarIdAndPatientId } from '@/services/car.service';
import { unAssingPatientInHelicopter } from '@/services/helicopter.service';
import { unAssingPatientInShip } from '@/services/ship.service';
import { convertGender } from '@/services/user.service';
import QueuePlayNextIcon from '@mui/icons-material/QueuePlayNext';
import { Button, IconButton, Tooltip } from '@mui/material';
import Avatar from '@mui/material/Avatar';
import Divider from '@mui/material/Divider';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemText from '@mui/material/ListItemText';
import * as React from 'react';
import Swal from 'sweetalert2';


export default function CarPatientitem({ patient, vehicle }: { patient: PatientBelongCar | PatientBelongShip, vehicle: Vehicles }) {
    const [load, setLoad] = React.useState(false)


    async function onLeafPatientOnCar() {
        setLoad(true)
        try {
            Swal.fire({
                title: "คุณต้องการเอา ผู้ป่วยออก?",
                text: "หากคลิ้กยืนยัน ผู้ป่วยจะออกจากยานพาหนะ",
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "#d33",
                confirmButtonText: "ยืนยัน"
            }).then(async (result) => {
                if (result.isConfirmed) {
                    if (vehicle.car) {
                        await unAssingPatinetToCarByCarIdAndPatientId(vehicle.car.Car.id, patient.Patient.id)
                        toast(`เอาผู้ป่วย ${patient.Patient.first_name} ${patient.Patient.last_name} ออกจากรถแล้ว`, 'success')
                    }
                    if (vehicle.helicopter) {
                        await unAssingPatientInHelicopter(vehicle.helicopter.helicopter_id, patient.patient_id)
                        toast(`เอาผู้ป่วย ${patient.Patient.first_name} ${patient.Patient.last_name} ออกจาก ฮ. แล้ว`, 'success')

                    }
                    if (vehicle.ship) {
                        await unAssingPatientInShip(vehicle.ship.ship_id, patient.id)
                        toast(`เอาผู้ป่วย ${patient.Patient.first_name} ${patient.Patient.last_name} ออกจากเรือแล้ว`, 'success')
                    }
                }
            });

        } catch (error: any) {
            console.log(error);
            toast(JSON.stringify(error.message), 'error')

        } finally {
            setLoad(false)
        }
    }

    function navigateToTronformCar() {
        if (vehicle.helicopter) {
            setLoad(true)
            window.location.href = `vehicle?tranfrom=car&heliopter_id=${vehicle.helicopter.helicopter_id}&patient_id=${patient.Patient.id}`
        }
        if (vehicle.ship) {
            setLoad(true)
            window.location.href = `vehicle?tranfrom=car&ship_id=${vehicle.ship.ship_id}&patient_id=${patient.Patient.id}`
        }
    }

    function navigateToTranformToHalicopter() {
        if (vehicle.ship) {
            setLoad(true)
            window.location.href = `vehicle?tranfrom=helicopter&ship_id=${vehicle.ship.ship_id}&patient_id=${patient.Patient.id}`
        }
        if (vehicle.car) {
            setLoad(true)
            window.location.href = `vehicle?tranfrom=helicopter&car_id=${vehicle.car.car_id}&patient_id=${patient.Patient.id}`
        }
    }

    return (
        <>
            <List sx={{ width: '100%', bgcolor: 'background.paper' }}>
                <ListItem alignItems="flex-start">
                    <ListItemAvatar style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'sp' }}>
                        <Avatar alt="Remy Sharp" src={patient.Patient.image ?? enviromentDev.noImage} />
                        <p>{convertGender(patient.Patient.gender)}</p>
                    </ListItemAvatar>
                    <ListItemText className='ml-4'>
                        <p>{patient.Patient.first_name}</p>
                        <p>{patient.Patient.last_name}</p>
                    </ListItemText>
                    {/* {
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
                    } */}
                </ListItem>
                <div >
                    {
                        vehicle.car ?
                            <div>
                                <Button variant='outlined' color='warning' style={{ width: '50%', margin: '5px 0' }} >ย้ายผู้ป่วยขึ้น เรือ</Button>
                                <Button onClick={navigateToTranformToHalicopter} variant='outlined' color='secondary' style={{ width: '50%', margin: '5px 0' }} >ย้ายผู้ป่วยขึ้น ฮ.</Button>
                                <Button onClick={onLeafPatientOnCar} variant='contained' color='error' style={{ width: '100%', margin: '10px 0' }} >เอาผู้ป่วยออก</Button>
                            </div> : null
                    }
                    {
                        vehicle.helicopter ?
                            <div>
                                <Button variant='outlined' color='warning' style={{ width: '50%', margin: '5px 0' }} >ย้ายผู้ป่วยขึ้น เรือ</Button>
                                <Button onClick={navigateToTronformCar} variant='outlined' color='primary' style={{ width: '50%', margin: '5px 0' }} >ย้ายผู้ป่วยขึ้น รถ</Button>
                                <Button onClick={onLeafPatientOnCar} variant='contained' color='error' style={{ width: '100%', margin: '10px 0' }} >เอาผู้ป่วยออก</Button>
                            </div> : null
                    }
                    {
                        vehicle.ship ?
                            <div>
                                <Button onClick={navigateToTranformToHalicopter} variant='outlined' color='secondary' style={{ width: '50%', margin: '5px 0' }} >ย้ายผู้ป่วยขึ้น ฮ.</Button>
                                <Button onClick={navigateToTronformCar} variant='outlined' color='primary' style={{ width: '50%', margin: '5px 0' }} >ย้ายผู้ป่วยขึ้น รถ</Button>
                                <Button onClick={onLeafPatientOnCar} variant='contained' color='error' style={{ width: '100%', margin: '10px 0' }} >เอาผู้ป่วยออก</Button>
                            </div> : null
                    }
                </div>
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
