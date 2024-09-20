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
import HistoryIcon from '@mui/icons-material/History';

import HomeCss from '../HomeCss.module.css'
import { Paper } from '@mui/material';
import Loadding from '@/components/Loadding';
import CarDetail from '@/components/car/CarDetail';
import { CarDetailContext } from '@/components/car/CarDetail.context';
import { Cars } from '@/models/vehicle.model';
import { findCarByCarId } from '@/services/car.service';
import { toast } from '@/services/alert.service';
import CarDetailHome from './CarDetailHome';
import CarPatientitem from './CarPatientItem';
import CarHistoryItem from './CarHistoryItem';


export default function CarHistoryPatient() {
    const { vehicle, setVehicle } = useContext<TCurrentVehicles>(CurrentVehicleContext)
    const [load, setLoad] = useState(false)
    const {car, setCar} = useContext<TCurrentCars>(CurrentCarsContext)

    return (
        <>
            <Box
                className={HomeCss.myVehicle2}
            >

                <Card size="lg" variant="outlined">
                    {/* <Chip size="sm" variant="outlined" color="neutral">
                    BASIC
                </Chip> */}
                    <Typography level="h4"><HistoryIcon color='success' /> ประวัติผู้ป่วยในยานพาหนะ</Typography>
                    <Divider inset="none" />
                    <Box sx={{ height: '100%' }}>
                        {
                            vehicle.car || vehicle.helicopter || vehicle.ship ?
                                <div style={{  height: '22rem', overflow: 'scroll', }}>
                                    {
                                        car?.PatientBelongCar?.map((r, i) => 
                                            <CarHistoryItem key={i} patient_id={r.patient_id} />
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
                        <Typography level="title-lg" sx={{ mr: 'auto' }}>
                            <Button color='success' onClick={() => {
                                setLoad(true)
                                window.location.href = '/patient'
                            }}>เพิ่มประวัตผู้ป่วย</Button>
                        </Typography>
                        <Button
                            variant="soft"
                            color="neutral"
                            endDecorator={<KeyboardArrowRight />}
                        >
                            Start now
                        </Button>
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