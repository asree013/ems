'use client'
import React, { useContext, useState } from 'react'
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
import { CurrentVehicleContext, TCurrentVehicles } from './CurrentVehicle.context';

import AddIcon from '@mui/icons-material/Add';

import HomeCss from './HomeCss.module.css'
import { Paper } from '@mui/material';
import Loadding from '@/components/Loadding';

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
                    <Typography level="h3">ยานพาหนะของฉัน</Typography>
                    <Divider inset="none" />
                    <Box sx={{ height: '100%' }}>
                        {
                            vehicle.car || vehicle.helicopter || vehicle.ship ?
                                <p>มี</p>
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
                load?
                <Loadding />
                : null
            }
        </>
    )
}
