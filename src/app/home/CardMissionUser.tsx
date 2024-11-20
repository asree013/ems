'use client'
import * as React from 'react';
import AspectRatio from '@mui/joy/AspectRatio';
import Link from '@mui/joy/Link';
import Card from '@mui/joy/Card';
import CardContent from '@mui/joy/CardContent';
import Chip from '@mui/joy/Chip';
import Typography from '@mui/joy/Typography';
import { useContext } from 'react';
import { CurrentMissionContext, TCurrentMission } from '@/contexts/currentMission.context';
import { getLatLng, haversines } from '@/services/sum_lat_long.service';
import { LocateContextUser, TLocateC } from '@/contexts/locate.context';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Box } from '@mui/material';
import PatientCount from './accrodien/PatientCount';
import UserCount from './accrodien/UserCount';
import styled from 'styled-components';

const GrinMenu = styled(Box)`
    display: grid;
    grid-template-columns: repeat(2, 2fr);
    grid-gap: 10px;

    @media only screen and (max-width: 1025px) {
        grid-template-columns: repeat(1, 2fr);
    }
`

export default function CardMissionUser() {
    const { missionUser, setMissionUser } = useContext<TCurrentMission>(CurrentMissionContext)
    const { userLocate, setUserLocate } = useContext<TLocateC>(LocateContextUser)

    return (
        <>
            {
                missionUser ?
                    <Accordion variant="outlined"
                        sx={{
                            cursor: 'pointer',
                            width: '100%',
                            '&:hover': { boxShadow: 'md', borderColor: 'neutral.outlinedHoverBorder' },
                        }}                   >
                        <AccordionSummary
                            expandIcon={<ExpandMoreIcon />}
                            aria-controls="panel1-content"
                            id="panel1-header"
                        >
                            <AspectRatio ratio="1" sx={{ width: 90 }}>
                                <img
                                    src={missionUser.image}
                                    srcSet={missionUser.image}
                                    loading="lazy"
                                    alt=""
                                />
                            </AspectRatio>
                            <CardContent sx={{ margin: '0 10px' }}>
                                <Typography level="title-lg" id="card-description">
                                    {missionUser.title}
                                </Typography>
                                <Typography level="body-sm" aria-describedby="card-description" mb={1}>
                                    <Link
                                        overlay
                                        underline="none"
                                        href="#interactive-card"
                                        sx={{ color: 'text.tertiary' }}
                                    >
                                        {missionUser.status}
                                    </Link>
                                </Typography>
                                <Chip
                                    variant="outlined"
                                    color="primary"
                                    size="sm"
                                    sx={{ pointerEvents: 'none' }}
                                >
                                    {
                                        'ห่างจากที่เกิดเหตุ ' + haversines(Number(userLocate.lat), Number(userLocate.long), Number(missionUser.lat), Number(missionUser.long)).toFixed(2) + " km"
                                    }
                                </Chip>
                            </CardContent>
                        </AccordionSummary>
                        <AccordionDetails>
                            <GrinMenu>
                                <UserCount currentMission={missionUser} />
                                <PatientCount currentMission={missionUser} />
                            </GrinMenu>

                        </AccordionDetails>
                    </Accordion>
                    :
                    <h1>ไม่มี ภารกิจ</h1>
            }
        </>
    );
}
