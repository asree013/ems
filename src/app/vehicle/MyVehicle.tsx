'use client'
import { Button, Card } from '@mui/material'
import React, { useCallback, useContext, useEffect, useState } from 'react'
import CarCard from './CarICard'
import { Cars, Helicopters, Vehicles } from '@/models/vehicle.model'
import vehicleCss from './vehicle.module.css'
import Ambulance from '@/assets/icon/ambulance_1032989.png'
import Helicopter from '@/assets/icon/army-helicopter_4806203.png'
import ShipIcon from '@/assets/icon/ship_6122344.png'
import { TabValueVehicleContext, TtabvalueC } from './tabValue.context'
import { findCurrentVehicleByUser } from '@/services/user.service'
import { timeOutJwt } from '@/services/timeout.service'
import TabPanel from '@mui/joy/TabPanel';
import Typography from '@mui/joy/Typography';
import { TVehicleHomeContext, VehiclesHomeContext } from './vehicle_home.context'
import StatusVehicle from './StatusVehicle'
import CardHelicopter from './CardHelicopter'
import Loadding from '@/components/Loadding'
import { unJoinCar } from '@/services/car.service'
import { toast } from '@/services/alert.service'

export default function MyVehicle() {
    const [load, setLoad] = useState<boolean>(false)
    const { value, setValue } = useContext<TtabvalueC>(TabValueVehicleContext)
    const { vehicle, setVehicle } = useContext<TVehicleHomeContext>(VehiclesHomeContext)

    return (
        <>
            {onRenderButtonSelectVehicle()}
            {
                !vehicle.car ?
                    null :
                    <div>
                        <Button onClick={ async () => {
                            setLoad(true)
                            try {
                                await unJoinCar(vehicle.car.car_id)
                                setVehicle({} as Vehicles)
                            } catch (error: any) {
                                toast(error.message, 'error')
                            } finally{
                                setLoad(false)
                            }
                        }} style={{width: '100%'}} variant='outlined' color='error'>ออกจากรถ</Button>
                        <StatusVehicle isDriver={vehicle.car.is_driver} mission_id={vehicle.car.Car?.mission_id} statusbol={!vehicle.car.Car?.mission_id ? true : false} vehicle={vehicle} />
                        <CarCard data={{} as Cars} car_id={vehicle.car.car_id} />
                    </div>
            }

            {
                !vehicle.helicopter ?
                    null :
                    <div>
                        <Button onClick={ async () => {
                            setLoad(true)
                            try {
                                await unJoinCar(vehicle.car.car_id)
                                setVehicle({} as Vehicles)
                            } catch (error: any) {
                                toast(error.message, 'error')
                            } finally{
                                setLoad(false)
                            }
                        }} style={{width: '100%'}} variant='outlined' color='error'>ออกจาก ฮ.</Button>
                        <StatusVehicle isDriver={vehicle.helicopter.is_driver} mission_id={vehicle.helicopter.Helicopter?.mission_id} statusbol={!vehicle.helicopter.Helicopter.mission_id ? true : false} vehicle={vehicle} />
                        <CardHelicopter data={{} as Helicopters} ho_id={vehicle.helicopter.Helicopter.id} />
                    </div>
            }

            {
                !vehicle.ship ?
                    null :
                    <div>
                        <Button sx={{ width: '100%' }} type='button' variant='contained' color='success'>นำยานพาหนะเข้าร่วมภารกิจ</Button>
                        <CarCard data={{} as Cars} />
                    </div>
            }

            {/* <CarCard data={{} as Cars} /> */}

            {/* <Button sx={{ width: '100%' }} type='button' variant='contained' color='success'>นำยานพาหนะเข้าร่วมภารกิจ</Button> */}
            
            {
                load?
                <Loadding />:
                null
            }
        </>
    )

    function onRenderButtonSelectVehicle() {
        if (!vehicle.car && !vehicle.helicopter && !vehicle.ship) {
            return (
                <>
                    <div>
                        <Card elevation={3}>
                            <div onClick={() => {
                                setLoad(true)
                                setValue(1)
                            }} className={vehicleCss.menuItem}>
                                <img src={Ambulance.src} style={{ height: '4rem', width: '4rem' }} alt="" />
                                <div className={vehicleCss.menuDetail}>
                                    <h3>เลือกรถรับส่ง</h3>
                                    <p>detail</p>
                                </div>
                            </div>
                        </Card>
                        <Card elevation={3} className='mt-4'>
                            <div onClick={() => {
                                setLoad(true)
                                setValue(2)
                            }} className={vehicleCss.menuItem}>
                                <img src={Helicopter.src} style={{ height: '4rem', width: '4rem' }} alt="" />
                                <div className={vehicleCss.menuDetail}>
                                    <h3>เลือกแฮลิค็อปเตอร์รับส่ง</h3>
                                    <p>detail</p>
                                </div>
                            </div>
                        </Card>
                        <Card elevation={3} className='mt-4'>
                            <div onClick={() => {
                                setLoad(true)
                                setValue(3)
                            }} className={vehicleCss.menuItem}>
                                <img src={ShipIcon.src} style={{ height: '4rem', width: '4rem' }} alt="" />
                                <div className={vehicleCss.menuDetail}>
                                    <h3>เลือกเรือรับส่ง</h3>
                                    <p>detail</p>
                                </div>
                            </div>
                        </Card>
                    </div>
                </>
            )
        }
        else {
            return null
        }
    }

}

