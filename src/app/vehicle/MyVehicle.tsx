'use client'
import { Button, Card } from '@mui/material'
import React, { useCallback, useContext, useEffect, useState } from 'react'
import CarCard from './CarICard'
import { Cars, Helicopters, Vehicles } from '@/models/vehicle.model'
import vehicleCss from './vehicle.module.css'
import Ambulance from '@/assets/icon/ambulance_1032989.png'
import Helicopter from '@/assets/icon/army-helicopter_4806203.png'
import { TabValueVehicleContext, TtabvalueC } from './tabValue.context'
import { findCurrentVehicleByUser } from '@/services/user.service'
import { timeOutJwt } from '@/services/timeout.service'

export default function MyVehicle() {
    const [currentMission, setCurrentMission] = useState({})
    const [load, setLoad] = useState<boolean>(false)
    const { value, setValue } = useContext<TtabvalueC>(TabValueVehicleContext)
    const [vehicle, setVehicle] = useState<Vehicles>({} as Vehicles)

    const findVehicleByUserId = useCallback(async () => {
        try {
            const result = await findCurrentVehicleByUser()
            setVehicle(result.data)
            console.log(result.data);

        } catch (error) {
            // timeOutJwt(error)
        }
    }, [setVehicle])

    useEffect(() => {
        findVehicleByUserId()

        return () => {
            findVehicleByUserId
        }
    }, [findVehicleByUserId])
    return (
        <>
            {
                !vehicle.car || vehicle.helicopter || vehicle.ship ?
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
                    </div> :
                    null
            }
            {
                !vehicle.car ?
                    null :
                    <div>
                        <Button sx={{ width: '100%' }} type='button' variant='contained' color='success'>นำยานพาหนะเข้าร่วมภารกิจ</Button>
                        <CarCard data={{} as Cars} car_id={vehicle.car.car_id} />
                    </div>
            }

            {
                !vehicle.helicopter ?
                    null :
                    <div>
                        <Button sx={{ width: '100%' }} type='button' variant='contained' color='success'>นำยานพาหนะเข้าร่วมภารกิจ</Button>
                        <CarCard data={{} as Cars} />
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
        </>
    )
}
