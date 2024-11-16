'use client'

import Loadding from '@/components/Loadding';
import AirlineSeatFlatAngledIcon from '@mui/icons-material/AirlineSeatFlatAngled';
import Box from '@mui/joy/Box';
import Button from '@mui/joy/Button';
import Card from '@mui/joy/Card';
import CardActions from '@mui/joy/CardActions';
import Divider from '@mui/joy/Divider';
import Typography from '@mui/joy/Typography';
import React, { useCallback, useContext, useEffect, useState } from 'react';

import { CurrentVehicleContext, TCurrentVehicles } from '../CurrentVehicle.context';
import HomeCss from '../HomeCss.module.css';
import CarPatientitem from './CarPatientItem';


export default function CarPatientList() {
    const { vehicle, setVehicle } = useContext<TCurrentVehicles>(CurrentVehicleContext)
    const [load, setLoad] = useState(false)

    return (
        <>
            <Box
                className={HomeCss.myVehicle2}
            >

                <Card size="lg" variant="outlined">
                    {/* <Chip size="sm" variant="outlined" color="neutral">
                    BASIC
                </Chip> */}
                    <Typography level="h4"><AirlineSeatFlatAngledIcon color='error' /> ผู้ป่วยภายในยานพาหนะ</Typography>
                    <Divider inset="none" />
                    <Box sx={{ height: '100%' }}>
                        {
                            vehicle.car || vehicle.helicopter || vehicle.ship ?
                                <div style={{ height: '22rem', overflow: 'scroll',}}>
                                    {
                                        !vehicle.car ?
                                            null :
                                            vehicle.car.Car.PatientBelongCar?.map((r, i) =>
                                                <CarPatientitem key={i} patient={r} vehicle={vehicle} />
                                            )
                                    }

                                    {
                                        !vehicle.helicopter ?
                                            null :
                                            vehicle.helicopter.Helicopter.PatientBelongHelicopter?.map((r, i) =>
                                                <CarPatientitem key={i} patient={r} vehicle={vehicle} />
                                            )
                                    }

                                    {
                                        !vehicle.ship ?
                                            null :
                                            vehicle.ship.Ship.PatientBelongShip.map((r, i) =>
                                                <CarPatientitem key={i} patient={r} vehicle={vehicle} />
                                            )
                                    }

                                </div>
                                : <div onClick={() => {
                                    setLoad(true)
                                    window.location.href = '/vehicle'
                                }}>
                                    <p>ไม่มียานพาหนะที่คุณใช้งานในคณะนี้ โปรดเลือกยานพหานะที่ต้องการใช้งาน</p>

                                </div>
                        }
                    </Box>
                    <Divider inset="none" />
                    <CardActions>
                        {/* <Typography level="title-lg" sx={{ mr: 'auto' }}> */}
                            <Button color='danger' variant='soft' onClick={() => {
                                setLoad(true)
                                if (vehicle.car) {
                                    window.location.href = '/patient?key=add-car&vehicle_id=' + vehicle.car.Car.id
                                }
                                if (vehicle.helicopter) {
                                    window.location.href = '/patient?key=add-helicopter&vehicle_id=' + vehicle.helicopter.Helicopter.id
                                }
                                if (vehicle.ship) {
                                    window.location.href = '/patient?key=add-ship&vehicle_id=' + vehicle.ship.ship_id
                                }
                            }}>
                                {
                                    vehicle.car?
                                    'เพิ่มผู้ป่วยในรถ': null
                                }
                                {
                                    vehicle.helicopter?
                                    'เพิ่มผู้ป่วยใน ฮ.': null
                                }
                                {
                                    vehicle.ship?
                                    'เพิ่มผู้ป่วยในเรือ': null
                                }
                            </Button>
                        {/* </Typography> */}
                        {/* <Button
                            variant="soft"
                            color="neutral"
                            endDecorator={<KeyboardArrowRight />}
                        >
                            Start now
                        </Button> */}
                    </CardActions>
                </Card>
            </Box>

            {
                load ?
                    <Loadding />
                    : null
            }
        </>
    )
}
