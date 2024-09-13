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
import { CurrentVehicleContext, TCurrentVehicles } from '../CurrentVehicle.context';

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
import CarDetailHome from './CarDetailHome';
import CarPatientitem from './CarPatientItem';


export default function CarPatientList() {
    const { vehicle, setVehicle } = useContext<TCurrentVehicles>(CurrentVehicleContext)
    const [car, setCar] = useState<Cars>({} as Cars)
    const [load, setLoad] = useState(false)

    const assingCarByVehicleId = useCallback(async () => {
        setLoad(true)
        // const interval = setInterval(async () => {
            try {
                const result = await findCarByCarId(vehicle?.car?.Car.id)
                setCar(result.data)
            } catch (error: any) {
                toast(JSON.stringify(error.message), 'error')
            } finally {
                // clearInterval(interval)
                setLoad(false)
            }
        // }, 2500)

    }, [setCar, vehicle])

    useEffect(() => {
        assingCarByVehicleId()

        return () => {
            assingCarByVehicleId
        }
    }, [vehicle, assingCarByVehicleId])

    return (
        <>
            <Box
                className={HomeCss.myVehicle}
            >

                <Card size="lg" variant="outlined">
                    {/* <Chip size="sm" variant="outlined" color="neutral">
                    BASIC
                </Chip> */}
                    <Typography level="h3"><AirlineSeatFlatAngledIcon /> ผู้ป่วยภายในยานพาหนะ</Typography>
                    <Divider inset="none" />
                    <Box sx={{ height: '100%' }}>
                        {
                            vehicle.car || vehicle.helicopter || vehicle.ship ?
                                <div style={{ height: '100%' }}>
                                    {
                                        car?.PatientBelongCar?.map((r, i) => 
                                            <CarPatientitem key={i} patient_id={r.patient_id} />
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
                            3.990€{' '}
                            <Typography textColor="text.tertiary" sx={{ fontSize: 'sm' }}>
                                / month
                            </Typography>
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
