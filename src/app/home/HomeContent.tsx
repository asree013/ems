'use client'
import React, { useState } from 'react'
import homeCss from './home.module.css'
import Input from '@mui/joy/Input';
import SearchIcon from '@mui/icons-material/Search';
import { Button } from '@mui/joy';
import FormatAlignJustifyIcon from '@mui/icons-material/FormatAlignJustify';
import ToggleButton from '@mui/material/ToggleButton';
import { Fab, Paper, ToggleButtonGroup } from '@mui/material';
import SpaceDashboardIcon from '@mui/icons-material/SpaceDashboard';
import WorkOutlineIcon from '@mui/icons-material/WorkOutline';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import TableMissioon from './TableMission';
import { Missions } from '@/models/mission.model';
import AddIcon from '@mui/icons-material/Add';
import PlaceIcon from '@mui/icons-material/Place';
import GoogleApiMap from './GoogleApiMap';

export default function HomeContent() {
    const [alignment, setAlignment] = useState<string | null>('left');
    const [mission, setMission] = useState<Missions[]>({} as Missions[])

    const handleAlignment = (
        event: React.MouseEvent<HTMLElement>,
        newAlignment: string | null,
    ) => {
        setAlignment(newAlignment);
    };

    return (
        <div className={homeCss.content}>
            <div className={homeCss.headContent}>
                <ToggleButtonGroup
                    value={alignment}
                    exclusive
                    onChange={handleAlignment}
                    aria-label="text alignment"
                    color='primary'
                >
                    <ToggleButton value="justify" aria-label="justified" >
                        <FormatAlignJustifyIcon />
                    </ToggleButton>
                </ToggleButtonGroup>

                <Input
                    placeholder='Seach'
                    sx={{ width: '90%', borderRadius: '10px' }}
                    endDecorator={<Button><SearchIcon /></Button>}
                />
            </div>
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
                    <Fab size='small' color='primary'><AddIcon /></Fab>
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
                    <GoogleApiMap hight={'30vw'} width={'90%'} />
                </div>
            </div>
        </div>
    )
}
