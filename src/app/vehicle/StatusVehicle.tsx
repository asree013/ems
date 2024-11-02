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

type Props = {
    statusbol: boolean
    mission_id: string
    isDriver: boolean
    vehicle: Vehicles
}

export default function StatusVehicle({ mission_id, statusbol, isDriver, vehicle }: Props) {
    const [load, setLoad] = React.useState<boolean>(false)

    return (
        <>
            <Paper elevation={8}>
                <Card variant="soft" color={statusbol ? "warning" : "success"} invertedColors>
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
                    <Typography
                        textColor="text.secondary"
                        sx={{ fontSize: 'sm', fontWeight: 'md' }}
                        className='m-4'
                    >
                        คุณคือ
                        {
                            isDriver ?
                                <Typography
                                    textColor="warning.400"
                                    className='ml-3'
                                    sx={{ fontSize: 'xl2', fontWeight: 'xl', mt: 1 }}
                                >
                                    ผลขับรถ
                                </Typography>
                                : <Typography
                                    className='ml-3'
                                    textColor="warning.400"
                                    sx={{ fontSize: 'xl2', fontWeight: 'xl', mt: 1 }}
                                >
                                    เจ้าหน้าที่รถ
                                </Typography>
                        }

                    </Typography>
                    <CardActions>
                        <Button variant="solid" size="sm" onClick={() => {
                            if (statusbol) {
                                if(vehicle.car){
                                    window.location.href = '/vehicle/' + vehicle.car.Car.id + '/add_mission?key=car'
                                }
                                if(vehicle.helicopter){
                                    window.location.href = '/vehicle/' + vehicle.helicopter.Helicopter.id + '/add_mission?key=helicopter'
                                }
                                if(vehicle.ship) {
                                    window.location.href = '/vehicle/' + vehicle.ship + '/add_mission?key=ship'
                                }
                            }
                            else {
                                setLoad(true)
                                window.location.href = '/mission/' + mission_id + '/mission_detail'
                            }
                        }}>
                            {statusbol ? 'นำยานพาหนะเข้าภารกิจ' : 'รายละเอียดภารกิจ'}
                        </Button>
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