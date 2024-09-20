'use client'
import React, { useContext, useState } from 'react'
import HomeCss from './HomeCss.module.css'

import { Divider, Fab, Paper, ToggleButtonGroup } from '@mui/material';
import SpaceDashboardIcon from '@mui/icons-material/SpaceDashboard';
import WorkOutlineIcon from '@mui/icons-material/WorkOutline';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import TableMissioon from './TableMission';
import { Missions } from '@/models/mission.model';
import AddIcon from '@mui/icons-material/Add';
import PlaceIcon from '@mui/icons-material/Place';
import GoogleApiMap from './GoogleApiMap';
import { NIL } from 'uuid';
import Loadding from '@/components/Loadding';
import { FindMeContext, TFindContext } from '@/contexts/findme.context';
import CardMissionUser from './CardMissionUser';
import { CurrentMissionContext, TCurrentMission } from '@/contexts/currentMission.context';
import VehicleCard from './vehicle/VihecleCard';
import { CurrentVehicleContext, TCurrentVehicles } from './CurrentVehicle.context';
import CarPatientList from './vehicle/CarPatientList';
import CarHistoryPatient from './vehicle/CarHistoryPatient';

import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import MainMonitor from './monitor/MainMonitor';

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
    const [alignment, setAlignment] = useState<string | null>('left');
    const [selected, setSelected] = useState<boolean>(true);
    const [load, setLoad] = useState<boolean>(false);
    const { findMe, setFindMe } = useContext<TFindContext>(FindMeContext)
    const { missionUser, setMissionUser } = useContext<TCurrentMission>(CurrentMissionContext)
    const { vehicle, setVehicle } = useContext<TCurrentVehicles>(CurrentVehicleContext)

    const [value, setValue] = React.useState(0);

    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
        setValue(newValue);
    };


    return (
        <>
            <div className={HomeCss.content}>
                {/* <div className={homeCss.contentMenu}>
                    <div className={homeCss.contentTitle}>
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                            <SpaceDashboardIcon />
                            <p style={{ marginLeft: '10px' }}>Dashbord</p>
                        </div>
                        <div></div>
                    </div>
                    <div className={homeCss.contentItem}>
                        <Paper className={homeCss.paperMenu} elevation={3} >
                            <ThumbUpIcon />
                            <p>success case</p>
                            <p style={{ fontSize: '2rem' }}>23</p>
                        </Paper>
                        <Paper className={homeCss.paperMenu} elevation={3} >
                            <p>2</p>
                        </Paper>
                        <Paper className={homeCss.paperMenu} elevation={3} >
                            <p>3</p>
                        </Paper>
                    </div>
                </div> */}
                <div className={HomeCss.contentMenu}>
                    <div className={HomeCss.contentTitle}>
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                            <WorkOutlineIcon />
                            <p style={{ marginLeft: '10px' }}>Mission</p>
                        </div>

                        {
                            missionUser ?
                                null :
                                <Fab onClick={() => {
                                    setLoad(true)
                                    window.location.href = '/mission'
                                }} size='small' color='primary'><AddIcon /></Fab>
                        }
                    </div>
                    <div style={{ margin: '15px 0' }}>
                        <CardMissionUser />
                    </div>
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
                                    <Tab label="ขอมูล" style={{ width: '50%' }} {...a11yProps(0)} />
                                    <Tab label="เครื่องแสดงผล" style={{ width: '50%' }} {...a11yProps(1)} />
                                </Tabs>
                            </Box>
                            <CustomTabPanel value={value} index={0}>
                                {
                                    vehicle.car || vehicle.helicopter || vehicle.ship ?
                                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                            <div className={`mt-4 ${HomeCss.girdCarItem}`}>
                                                <CarPatientList />
                                                <div className={HomeCss.mobileSetting}>
                                                    <CarHistoryPatient />
                                                </div>
                                            </div>
                                        </div> :
                                        <p>โปรเลือกยานพาหนะ</p>
                                }
                            </CustomTabPanel>
                            {/* <CustomTabPanel value={value} index={1}>
                                {
                                    value !== 1?
                                    null:
                                    <MainMonitor />
                                }
                            </CustomTabPanel> */}
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
