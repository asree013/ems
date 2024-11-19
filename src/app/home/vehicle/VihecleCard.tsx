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
import { Badge, Paper } from '@mui/material';
import Loadding from '@/components/Loadding';
import { toast } from '@/services/alert.service';
import CarDetailHome from './CarDetailHome';
import LogoutIcon from '@mui/icons-material/Logout';
import ShipIcon from '@/assets/icon/ship_6122344.png'
import Ambulance from '@/assets/icon/ambulance.png'
import Helicopter from '@/assets/image/icon_menu/helicopter_5768628.png'

import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { Vehicles } from '@/models/vehicle.model';
import { unJiontHelicopter } from '@/services/helicopter.service';
import { unJoinCar } from '@/services/car.service';
import { unJionMissioon } from '@/services/mission.service';
import { unJoinShip } from '@/services/ship.service';
import CarDetailCard from './CarDetailCard';
import { CurrentMissionContext, TCurrentMission } from '@/contexts/currentMission.context';
import { LocateContextUser, TLocateC } from '@/contexts/locate.context';
import styled from 'styled-components';

const HeaderVehicle = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-around;

    @media only screen and (max-width: 1300px) {
        flex-direction: column;
        align-items: center;

    }
`

const NumberVehicle = styled.p`
    font-size: 18px;
    font-weight: 600;
    border: 1px solid black;
    border-radius: 10px;
    padding: 2px 8px;
`

export default function VehicleCard() {
    const { vehicle, setVehicle } = useContext<TCurrentVehicles>(CurrentVehicleContext)
    const [load, setLoad] = useState(false)
    const { missionUser, setMissionUser } = useContext<TCurrentMission>(CurrentMissionContext)
    const { userLocate, setUserLocate } = useContext<TLocateC>(LocateContextUser)

    return (
        <>
            <Box
                className={HomeCss.myVehicle}
            >
                <Card size="md" variant="outlined">
                    <HeaderVehicle>
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'start' }}>
                            <p style={{ fontSize: '1.2rem', fontWeight: 600, marginLeft: '5px' }}>
                                ยานพาหนะของฉัน
                            </p>
                        </div>
                        <div style={{display: 'flex', alignItems: 'center', justifyContent: 'space-around', flexDirection: 'row'}}>
                            {
                                vehicle.car ?
                                    <img src={Ambulance.src} style={{ width: 30, height: 30, margin: '0 10px' }} alt="" /> :
                                    null
                            }
                            {
                                vehicle.ship ?
                                    <img src={ShipIcon.src} style={{ width: 30, height: 30, margin: '0 10px' }} alt="" /> :
                                    null
                            }
                            {
                                vehicle.helicopter ?
                                    <img src={Helicopter.src} style={{ width: 30, height: 30, margin: '0 10px' }} alt="" /> :
                                    null
                            }
                            <NumberVehicle>
                                {
                                    vehicle.car ?
                                        vehicle.car.Car.number :
                                        null
                                }
                                {
                                    vehicle.helicopter ?
                                        vehicle.helicopter.Helicopter.number :
                                        null
                                }
                                {
                                    vehicle.ship ?
                                        vehicle.ship.Ship.calling :
                                        null
                                }
                            </NumberVehicle>
                        </div>

                    </HeaderVehicle>

                    <AlertDialog />

                    <Divider inset="none" />
                    <Box>
                        <CarDetailCard latlngMission={{
                            lat: missionUser.lat,
                            long: missionUser.long
                        }} latlngUser={{
                            lat: userLocate.lat,
                            long: userLocate.long
                        }} />
                    </Box>
                    {/* <CardActions>
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
                                <Badge badgeContent={'new'} color="error">
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
                                    </Button>
                                </Badge>
                                : null
                        }
                    </CardActions> */}
                </Card>
            </Box >

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
        <>
            <React.Fragment>
                {
                    vehicle.car || vehicle.helicopter || vehicle.ship ?
                        <Button variant="outlined" color='danger' endDecorator={<LogoutIcon />} onClick={handleClickOpen}>
                            ออกยานพาหนะ
                        </Button> : <Button endDecorator={<AddIcon />} variant="outlined" color='primary' onClick={() => {
                            setLoad(true)
                            window.location.href = '/vehicle'
                        }}>
                            เพิ่มยานพาหนะ
                        </Button>
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
                                    ออกจาก {vehicle.car ? "รถ" : null} {vehicle.helicopter ? "ฮ." : null} {vehicle.ship ? "เรือ" : null}
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
                                    ออกจาก {vehicle.car ? "รถ" : null} {vehicle.helicopter ? "ฮ." : null} {vehicle.ship ? "เรือ" : null} และภารกิจ
                                </Typography>
                            </Typography>
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button disabled={load} color='neutral' onClick={handleClose}>
                            {
                                load ? <CircularProgress size="sm" />
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
                                if (vehicle.ship) {
                                    await unJoinShip(vehicle.ship.ship_id)
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
                                    <p>ออกจาก{vehicle.car ? "รถ" : null} {vehicle.helicopter ? "ฮ." : null} {vehicle.ship ? "เรือ" : null}</p>
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
                                load ? <CircularProgress size="sm" />
                                    : <p>และภารกิจ</p>
                            }
                        </Button>
                    </DialogActions>
                </Dialog>
            </React.Fragment>

            {load ? <Loadding /> : null}
        </>
    );
}
