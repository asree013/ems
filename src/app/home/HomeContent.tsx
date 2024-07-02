'use client'
import React, { useState } from 'react'
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


export default function HomeContent() {
    const [alignment, setAlignment] = useState<string | null>('left');
    const [selected, setSelected] = useState<boolean>(true);
    const [load, setLoad] = useState<boolean>(false);
    const [mission, setMission] = useState<Missions[]>({} as Missions[])



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
                            window.location.href = '/mission/' + NIL
                        }} size='small' color='primary'><AddIcon /></Fab>
                    </div>
                    <div style={{ margin: '15px 0' }}>
                        <TableMissioon data={mission} />
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
                        <GoogleApiMap hight={'30rem'} width={'100%'} />
                    </div>
                </div>
            </div>

            {
                load?
                <Loadding />:
                null
            }
        </>
    )
}
