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


export default function HomeContent() {
    const [alignment, setAlignment] = useState<string | null>('left');
    const [selected, setSelected] = useState<boolean>(true);
    const [load, setLoad] = useState<boolean>(false);
    const { findMe, setFindMe } = useContext<TFindContext>(FindMeContext)
    const { missionUser, setMissionUser } = useContext<TCurrentMission>(CurrentMissionContext)
    const {vehicle, setVehicle} = useContext<TCurrentVehicles>(CurrentVehicleContext)

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
                        {
                            vehicle.car || vehicle.helicopter || vehicle.ship ?
                            <div className='mt-4'>
                                <CarPatientList />
                            </div>:
                            <p>โปรเลือกยานพาหนะ</p>
                        }
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
