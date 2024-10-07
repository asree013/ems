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
import DirectionsCarIcon from '@mui/icons-material/DirectionsCar';

import HomeCss from '../HomeCss.module.css'
import { Paper } from '@mui/material';
import Loadding from '@/components/Loadding';
import CarDetail from '@/components/car/CarDetail';
import { CarDetailContext } from '@/components/car/CarDetail.context';
import { Cars } from '@/models/vehicle.model';
import { findCarByCarId } from '@/services/car.service';
import { toast } from '@/services/alert.service';
import CarDetailHome from './CarDetailHome';

export default function VehicleCard() {
    const { vehicle, setVehicle } = useContext<TCurrentVehicles>(CurrentVehicleContext)
    const [load, setLoad] = useState(false)
    const {car, setCar} = useContext<TCurrentCars>(CurrentCarsContext)


    return (
        <>
            <Box
                className={HomeCss.myVehicle}
            >

                <Card size="lg" variant="outlined">
                    {/* <Chip size="sm" variant="outlined" color="neutral">
                    BASIC
                </Chip> */}
                    <Typography level="h4"><DirectionsCarIcon color='primary' /> ยานพาหนะของฉัน</Typography>
                    <Divider inset="none" />
                    <Box sx={{ height: '100%' }}>
                        {
                            vehicle.car || vehicle.helicopter || vehicle.ship ?
                                <div style={{ height: '100%' }}>
                                    <CarDetailHome vehicles={vehicle}  />
                                </div>
                                : <div onClick={() => {
                                    setLoad(true)
                                    window.location.href = '/vehicle'
                                }}>
                                    <p>ไม่มียานพาหนะที่คุณใช้งานในคณะนี้ กดบวกเพื่อเลือกยานพหานะที่ต้องการใช้งาน</p>
                                    <div style={{ width: '100%', height: '10rem', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                        <Paper elevation={3} style={{ width: '9rem', height: '9rem' }} >
                                            <AddIcon style={{ width: '9rem', height: '9rem' }} />
                                        </Paper>
                                    </div>
                                </div>
                        }
                    </Box>
                    <Divider inset="none" />
                    <CardActions>
                        <Typography level="title-lg" sx={{ mr: 'auto' }}>
                            <Typography textColor="text.tertiary" sx={{ fontSize: 'sm' }}>
                                เลขทะเบียน
                                {
                                    vehicle.car?.Car.number?? null
                                }
                                {
                                    vehicle.helicopter?.Helicopter.number?? null
                                }
                            </Typography>
                        </Typography>
                        <Button
                            onClick={() => {
                                setLoad(true)
                                window.location.href = '/vehicle/'+ car.id + '/car/detail'
                            }}
                            variant="soft"
                            color="neutral"
                            endDecorator={<KeyboardArrowRight />}
                        >
                            ไปที่รถ
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
