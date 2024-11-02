'use client'
import React, { useContext, useState } from 'react'
import Box from '@mui/joy/Box';
import Button from '@mui/joy/Button';
import Card from '@mui/joy/Card';
import CardActions from '@mui/joy/CardActions';
import Divider from '@mui/joy/Divider';
import Typography from '@mui/joy/Typography';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';
import { CurrentVehicleContext, TCurrentVehicles } from '../CurrentVehicle.context';

import AddIcon from '@mui/icons-material/Add';
import DirectionsCarIcon from '@mui/icons-material/DirectionsCar';
import CircularProgress from '@mui/joy/CircularProgress';

import HomeCss from '../HomeCss.module.css'
import { Paper } from '@mui/material';
import Loadding from '@/components/Loadding';
import { toast } from '@/services/alert.service';
import CarDetailHome from './CarDetailHome';

import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { Vehicles } from '@/models/vehicle.model';
import { unJiontHelicopter } from '@/services/helicopter.service';
import { unJoinCar } from '@/services/car.service';
import { unJionMissioon } from '@/services/mission.service';

export default function VehicleCard() {
    const { vehicle, setVehicle } = useContext<TCurrentVehicles>(CurrentVehicleContext)
    const [load, setLoad] = useState(false)


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
                    <AlertDialog />

                    <Divider inset="none" />
                    <Box sx={{ height: '100%' }}>
                        {
                            vehicle.car || vehicle.helicopter || vehicle.ship ?
                                <div style={{ height: '100%' }}>
                                    <CarDetailHome vehicles={vehicle} />
                                </div>
                                : <div onClick={() => {
                                    setLoad(true)
                                    window.location.href = '/vehicle'
                                }}>
                                    <p>ไม่มียานพาหนะที่คุณใช้งานในคณะนี้ กดบวกเพื่อเลือกยานพหานะที่ต้องการใช้งาน</p>
                                    <div style={{ width: '100%', minHeight: '4rem', maxHeight: '17.3rem', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                        <Paper elevation={3} style={{ width: '9rem', minHeight: '3.5rem', height: '9rem', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }} >
                                            <AddIcon style={{ width: '3rem', minHeight: '3rem', height: '9rem' }} />
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
                                    vehicle.car?.Car.number ?? null
                                }
                                {
                                    vehicle.helicopter?.Helicopter.number ?? null
                                }
                            </Typography>
                        </Typography>
                        {
                            vehicle.car || vehicle.helicopter || vehicle.ship ?
                                <Button
                                    onClick={() => {
                                        setLoad(true)
                                        if (vehicle.car) {
                                            window.location.href = '/vehicle/' + vehicle.car.Car.id + '/car/detail'
                                        }
                                        if (vehicle.helicopter) {
                                            window.location.href = '/vehicle/' + vehicle.helicopter.Helicopter.id + '/helicopter/detail'
                                        }
                                    }}
                                    variant="soft"
                                    color="neutral"
                                    endDecorator={<KeyboardArrowRight />}
                                >

                                    {vehicle.car ? "ไปที่รถ" : null}
                                    {vehicle.helicopter ? "ไปที่ ฮ." : null}
                                    {vehicle.ship ? "ไปที่ เรื่อ" : null}
                                </Button> : null
                        }
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

function AlertDialog() {
    const [open, setOpen] = React.useState(false);
    const { vehicle, setVehicle } = useContext<TCurrentVehicles>(CurrentVehicleContext)
    const [load, setLoad] = useState<boolean>(false)

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <React.Fragment>
            {
                vehicle.car || vehicle.helicopter || vehicle.ship ?
                    <Button variant="outlined" onClick={handleClickOpen}>
                        อออกจากยานพาหนะ
                    </Button> : null
            }
            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">
                    {"คุณต้องการออกจากยานพาหนะหรือไม่ ?"}
                </DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description" style={{ display: 'flex', alignItems: 'start', justifyContent: 'center', flexDirection: 'column' }}>
                        <Typography
                            component="p"
                            textColor="text.secondary"
                            sx={{ fontSize: 'sm', fontWeight: 'md' }}
                        >
                            - หากคุณต้องการออกจากยานพาหนะ ให้เลือก
                            <Typography
                                component="p"
                                // textColor="text.primary"
                                color='primary'
                                sx={{ fontSize: 'sm3', fontWeight: 'xl', mt: 1 }}
                            >
                                ออกจาก {vehicle.car ? "รถ" : null} {vehicle.helicopter ? "ฮ." : null}
                            </Typography>
                        </Typography>
                    </DialogContentText>
                    <DialogContentText style={{ marginTop: 10 }} id="alert-dialog-description">
                        <Typography
                            component="p"
                            textColor="text.secondary"
                            sx={{ fontSize: 'sm', fontWeight: 'md' }}
                        >
                            - หากคุณต้องการออกจากยานพาหนะและภารกิจ ให้เลือก
                            <Typography
                                component="p"
                                // textColor="text.primary"
                                color='danger'
                                sx={{ fontSize: 'sm3', fontWeight: 'xl', mt: 1 }}
                            >
                                ออกจาก {vehicle.car ? "รถ" : null} {vehicle.helicopter ? "ฮ." : null} และภารกิจ
                            </Typography>
                        </Typography>
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button disabled={load} color='neutral' onClick={handleClose}>
                        {
                            load? <CircularProgress size="sm" />
                            : <p>ยกเลิก</p>
                        }
                    </Button>
                    <Button color='primary' disabled={load} onClick={async () => {
                        setLoad(true)
                        try {
                            if (vehicle.car) {
                                await unJoinCar(vehicle.car.car_id)
                                window.location.reload()
                                handleClose()
                            }
                            if (vehicle.helicopter) {
                                await unJiontHelicopter(vehicle.helicopter.helicopter_id)
                                window.location.reload()
                                handleClose()
                            }
                        } catch (error) {
                            toast(`เกิดข้อผิดพลาดไม่สามารถออกจากยานพาหนะได้`, 'error')
                        } finally {
                            setLoad(false)
                        }
                    }} autoFocus>
                        {
                            load ?
                                <CircularProgress size="sm" /> :
                                <p>ออกจาก{vehicle.car ? "รถ" : null} {vehicle.helicopter ? "ฮ." : null}</p>
                        }
                    </Button>
                    <Button disabled={load} color='danger' onClick={async () => {
                        setLoad(true)
                        try {
                            if (vehicle.car) {
                                await unJoinCar(vehicle.car.Car.id)
                                await unJionMissioon(vehicle.car.Car.mission_id)
                                handleClose()
                                window.location.reload()
                            }
                            if (vehicle.helicopter) {
                                await unJiontHelicopter(vehicle.helicopter.Helicopter.id)
                                await unJionMissioon(vehicle.helicopter.Helicopter.mission_id)
                                handleClose()
                                window.location.reload()

                            }
                        } catch (error) {
                            toast(`เกิดข้อผิดพลาดไม่สามารถออกจากยานพาหนะได้`, 'error')
                        } finally {
                            setLoad(false)
                        }
                    }} autoFocus>
                        {
                            load? <CircularProgress size="sm" /> 
                            : <p>และภารกิจ</p>
                        }
                    </Button>
                </DialogActions>
            </Dialog>
        </React.Fragment>
    );
}
