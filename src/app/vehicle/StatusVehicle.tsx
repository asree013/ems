'use client'

import Loadding from '@/components/Loadding';
import { Vehicles } from '@/models/vehicle.model';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import HourglassFullTwoToneIcon from '@mui/icons-material/HourglassFullTwoTone';
import Button from '@mui/joy/Button';
import Card from '@mui/joy/Card';
import CardActions from '@mui/joy/CardActions';
import CardContent from '@mui/joy/CardContent';
import CircularProgress from '@mui/joy/CircularProgress';
import SvgIcon from '@mui/joy/SvgIcon';
import Typography from '@mui/joy/Typography';
import { Paper } from '@mui/material';
import * as React from 'react';
import MiniMap from './[vehicle]/MiniMap';
import { findLocationByUserId } from '@/services/user.service';
import { FindUserMe } from '@/services/authen.service';
import { Users } from '@/models/users.model';
import axios, { AxiosResponse } from 'axios';
import { Locations } from '@/models/location.model';
import { toast } from '@/services/alert.service';


type Props = {
    statusbol: boolean
    mission_id: string
    isDriver: boolean
    vehicle: Vehicles
}

export default function StatusVehicle({ mission_id, statusbol, isDriver, vehicle }: Props) {
    const [load, setLoad] = React.useState<boolean>(false)
    const [userLocate, setUserLocate] = React.useState<Locations>({} as Locations)

    const findLocateDriver = React.useCallback(async () => {
        try {
            if (vehicle.car) {
                const locate = await findLocationByUserId(vehicle.car.Car.driver_id, 1, 3)
                setUserLocate(locate.data[0])                
            }
            else if (vehicle.helicopter) {
                const locate = await findLocationByUserId(vehicle.helicopter.Helicopter.driver_id, 1, 3)
                setUserLocate(locate.data[0])
            }
            else {
                const locate = await findLocationByUserId(vehicle.ship.Ship.driver_id, 1, 3)
                setUserLocate(locate.data[0])
            }
        } catch (error) {
            toast('ไม่สามารถเข้าถึงที่ตั้งได้', 'error')
        }
    }, [setUserLocate])

    React.useEffect(() => {
        findLocateDriver()

        return () => {
            findLocateDriver
        }
    }, [findLocateDriver])

    return (
        <>
            <Paper elevation={8}>
                <Card className="w-[270px] h-[370px] flex flex-col justify-start items-center" variant="soft" color={statusbol ? "warning" : "success"} invertedColors>
                    <CardContent orientation="horizontal">
                        <CircularProgress size="lg" determinate value={20}>
                            <SvgIcon>
                                {
                                    statusbol ?
                                        <HourglassFullTwoToneIcon /> :
                                        <CheckCircleIcon />
                                }
                            </SvgIcon>
                        </CircularProgress>
                        <CardContent>
                            <Typography level="body-md">สถานะของยานพาหนะของคุณ</Typography>
                            {
                                statusbol ?
                                    <Typography level="h4">รอภารกิจ</Typography> :
                                    <Typography level="h4">กำลังปฏิบัติภารกิจ</Typography>
                            }
                        </CardContent>
                    </CardContent>
                    <div>
                        <MiniMap vehicle={vehicle} locate={userLocate} />
                    </div>
                    <Typography
                        textColor="text.secondary"
                        sx={{ fontSize: 'sm', fontWeight: 'md' }}
                    >
                        คุณคือ
                        {
                            isDriver ?
                                <Typography
                                    className='ml-3 text-gray-500'
                                    sx={{ fontSize: 'xl2', fontWeight: 'xl', mt: 1 }}
                                >
                                    ผลขับรถ
                                </Typography>
                                : <Typography
                                    className='ml-3 text-gray-500'
                                    sx={{ fontSize: 'xl2', fontWeight: 'xl', mt: 1 }}
                                >
                                    เจ้าหน้าที่รถ
                                </Typography>
                        }

                    </Typography>
                    <CardActions>
                        <button className='w-full hover:bg-green-800 bg-green-700 text-white p-1 rounded-md'  onClick={() => {
                            if (statusbol) {
                                if (vehicle.car) {
                                    window.location.href = '/vehicle/' + vehicle.car.Car.id + '/add_mission?key=car'
                                }
                                if (vehicle.helicopter) {
                                    window.location.href = '/vehicle/' + vehicle.helicopter.Helicopter.id + '/add_mission?key=helicopter'
                                }
                                if (vehicle.ship) {
                                    window.location.href = '/vehicle/' + vehicle.ship + '/add_mission?key=ship'
                                }
                            }
                            else {
                                setLoad(true)
                                window.location.href = '/mission/' + mission_id + '/mission_detail'
                            }
                        }}>
                            {statusbol ? 'นำยานพาหนะเข้าภารกิจ' : 'รายละเอียดภารกิจ'}
                        </button>
                    </CardActions>
                </Card>
            </Paper>

            {
                load ?
                    <Loadding /> :
                    null
            }
        </>
    );
}