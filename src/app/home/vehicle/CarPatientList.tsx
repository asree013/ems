'use client'
import React, { useCallback, useContext, useEffect, useState } from 'react'
import Box from '@mui/joy/Box';
import Button from '@mui/joy/Button';
import Card from '@mui/joy/Card';
import CardActions from '@mui/joy/CardActions';
import Chip from '@mui/joy/Chip';
import Divider from '@mui/joy/Divider';
import List from '@mui/joy/List';
import ListItem from '@mui/joy/ListItem';
import ListItemDecorator from '@mui/joy/ListItemDecorator';
import Typography from '@mui/joy/Typography';
import Check from '@mui/icons-material/Check';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';
import { CurrentCarsContext, CurrentVehicleContext, TCurrentCars, TCurrentVehicles } from '../CurrentVehicle.context';

import AddIcon from '@mui/icons-material/Add';
import AirlineSeatFlatAngledIcon from '@mui/icons-material/AirlineSeatFlatAngled';

import HomeCss from '../HomeCss.module.css'
import { Paper } from '@mui/material';
import Loadding from '@/components/Loadding';
import CarDetail from '@/components/car/CarDetail';
import { CarDetailContext } from '@/components/car/CarDetail.context';
import { Cars } from '@/models/vehicle.model';
import { findCarByCarId } from '@/services/car.service';
import { toast } from '@/services/alert.service';
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
                                <div style={{ height: '100%', minHeight: '22rem', overflow: 'scroll' }}>
                                    {
                                        !vehicle.car ?
                                            null :
                                            vehicle.car.Car.PatientBelongCar?.map((r, i) =>
                                                <CarPatientitem key={i} patient={r} />
                                            )
                                    }

                                    {
                                        !vehicle.helicopter ?
                                            null :
                                            vehicle.helicopter.Helicopter.PatientBelongHelicopter?.map((r, i) =>
                                                <CarPatientitem key={i} patient={r} />
                                            )
                                    }

                                    {/* {
                                        !vehicle.ship ?
                                            null :
                                            vehicle.ship?.map((r, i) =>
                                                <CarPatientitem key={i} patient={r} />
                                            )
                                    } */}

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
                            <Button color='danger' onClick={() => {
                                setLoad(true)
                                if (vehicle.car) {
                                    window.location.href = '/patient?key=add-car&vehicle_id=' + vehicle.car.Car.id
                                }
                                if (vehicle.helicopter) {
                                    window.location.href = '/patient?key=add-helicopter&vehicle_id=' + vehicle.helicopter.Helicopter.id
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
