'use client'
import React, { useContext, useState } from 'react'
import HomeCss from './HomeCss.module.css'

import { Divider, Fab, Paper, ToggleButtonGroup } from '@mui/material';
import WorkOutlineIcon from '@mui/icons-material/WorkOutline';
import AddIcon from '@mui/icons-material/Add';
import PlaceIcon from '@mui/icons-material/Place';
import GoogleApiMap from './GoogleApiMap';
import Loadding from '@/components/Loadding';
import { FindMeContext, TFindContext } from '@/contexts/findme.context';
import CardMissionUser from './CardMissionUser';
import { CurrentMissionContext, TCurrentMission } from '@/contexts/currentMission.context';
import VehicleCard from './vehicle/VihecleCard';
import { CurrentVehicleContext, TCurrentVehicles } from './CurrentVehicle.context';
import CarPatientList from './vehicle/CarPatientList';
import CarHistoryPatient from './vehicle/CarHistoryPatient';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';

import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import MainMonitor from './monitor/MainMonitor';
import CurrentMissionTah from './CurrentMissionTag';
import { Button } from '@mui/joy';
import { unJionMissioon } from '@/services/mission.service';
import { MissionById } from '@/models/mission.model';
import { toast } from '@/services/alert.service';
import { NIL } from 'uuid';

interface TabPanelProps {
    children?: React.ReactNode;
    index: number;
    value: number;
}

function CustomTabPanel(props: TabPanelProps) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
        </div>
    );
}

function a11yProps(index: number) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    };
}

export default function HomeContent() {
    const [load, setLoad] = useState<boolean>(false);
    const { missionUser, setMissionUser } = useContext<TCurrentMission>(CurrentMissionContext)

    const { vehicle, setVehicle } = useContext<TCurrentVehicles>(CurrentVehicleContext)

    const [value, setValue] = React.useState(0);

    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
        setValue(newValue);
    };


    return (
        <>
            <div className={HomeCss.content}>

                <div className={HomeCss.contentMenu}>
                    <div className={HomeCss.contentTitle}>
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                            <WorkOutlineIcon />
                            <p style={{ marginLeft: '10px' }}>Mission</p>
                        </div>

                        {
                            missionUser ?
                                <Button variant='outlined' color='danger'
                                    startDecorator={<ExitToAppIcon />} onClick={async () => {
                                        setLoad(true)
                                        try {
                                            localStorage.removeItem('mission_id')
                                            await unJionMissioon(missionUser.id)
                                            window.location.reload()
                                        } catch (error) {
                                            toast('เกิดข้อผิดพลายไม่สามารถออกจากภารกิจได้', 'error')
                                        } finally {
                                            setLoad(false)
                                        }
                                    }}>ออกจากภารกิจ</Button> :
                                <div>
                                    {/* <Fab onClick={() => {
                                        setLoad(true)
                                        window.location.href = '/mission'
                                    }} size='small' color='primary'><AddIcon /></Fab> */}
                                    <Button onClick={() => {
                                        setLoad(true)
                                        window.location.href = '/mission/'+ NIL
                                    }} variant='outlined' color='neutral' sx={{ margin: '0 10px' }}>สร้างภากิจ</Button>
                                    <Button onClick={() => {
                                        setLoad(true)
                                        window.location.href = '/mission'
                                    }} color='neutral'>เข้าร่วมภารกิจ</Button>
                                </div>
                        }
                    </div>
                    <div style={{ margin: '15px 0' }}>
                        <CardMissionUser />
                    </div>
                    {/* <div className='mt-2'>
                        <CurrentMissionTah />
                    </div> */}
                </div>
                <div className={HomeCss.contentMenu}>
                    <div className={HomeCss.contentTitle}>
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                            <PlaceIcon />
                            <p style={{ marginLeft: '10px' }}>Map</p>
                        </div>
                        <div></div>
                    </div>
                    <div className={HomeCss.mapItem}>
                        <GoogleApiMap mission={missionUser} />
                        <VehicleCard />
                    </div>
                    <div>
                        <Divider>ข้อมูลภายในยานพาหนะ</Divider>
                        <Box sx={{ width: '100%' }}>
                            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                                <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
                                    <Tab label="ข้อมูล" style={{ width: '50%' }} {...a11yProps(0)} />
                                    <Tab label="สัญญานชีพผู้ป่วย" style={{ width: '50%' }} {...a11yProps(1)} />
                                </Tabs>
                            </Box>
                            <CustomTabPanel value={value} index={0}>
                                {
                                    vehicle.car || vehicle.helicopter || vehicle.ship ?
                                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                            <div style={{ marginTop: '15px' }} className={`${HomeCss.girdCarItem}`}>
                                                <CarPatientList />
                                                <div className={HomeCss.mobileSetting}>
                                                    <CarHistoryPatient />
                                                </div>
                                            </div>
                                        </div> :
                                        <p>โปรเลือกยานพาหนะ</p>
                                }
                            </CustomTabPanel>
                            <CustomTabPanel value={value} index={1}>
                                {
                                    vehicle.car || vehicle.helicopter || vehicle.ship ?
                                        <MainMonitor vehicle={vehicle} /> :
                                        null

                                }
                            </CustomTabPanel>
                        </Box>
                    </div>
                </div>
            </div>

            {
                load ?
                    <Loadding /> :
                    null
            }
        </>
    )
}
