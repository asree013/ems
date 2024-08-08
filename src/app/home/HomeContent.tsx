'use client'
import React, { useContext, useState } from 'react'
import homeCss from './home.module.css'

import { Fab, Paper, ToggleButtonGroup } from '@mui/material';
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
import { MissionContexts, TMissionCs } from '@/contexts/missions.context';


export default function HomeContent() {
    const [alignment, setAlignment] = useState<string | null>('left');
    const [selected, setSelected] = useState<boolean>(true);
    const [load, setLoad] = useState<boolean>(false);
    const { findMe, setFindMe } = useContext<TFindContext>(FindMeContext)
    const { missions, setMissions } = useContext<TMissionCs>(MissionContexts)

    return (
        <>
            <div className={homeCss.content}>
                <div className={homeCss.contentMenu}>
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
                </div>
                <div className={homeCss.contentMenu}>
                    <div className={homeCss.contentTitle}>
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                            <WorkOutlineIcon />
                            <p style={{ marginLeft: '10px' }}>Mission</p>
                        </div>

                        <Fab onClick={() => {
                            setLoad(true)
                            window.location.href = '/mission'
                        }} size='small' color='primary'><AddIcon /></Fab>
                    </div>
                    <div style={{ margin: '15px 0' }}>
                        {
                            findMe.role === 'user' ?
                                <CardMissionUser /> :
                                missions.length == 0 ?
                                    null :
                                    missions.map(r =>
                                        <TableMissioon key={r.id} mission={r} />
                                    )
                        }
                    </div>
                </div>
                <div className={homeCss.contentMenu}>
                    <div className={homeCss.contentTitle}>
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                            <PlaceIcon />
                            <p style={{ marginLeft: '10px' }}>Map</p>
                        </div>
                        <div></div>
                    </div>
                    <div style={{ margin: '15px 0' }}>
                        <GoogleApiMap />
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
