'use client'
import React from 'react'
import { MissionById } from '@/models/mission.model'
import { AspectRatio } from '@mui/joy'
import { Accordion, AccordionDetails, AccordionSummary, Box, Typography } from '@mui/material'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import PatientIcon from '@/assets/icon/patient_menu.png'

type Props = {
    currentMission: MissionById
}

export default function PatientCount({ currentMission }: Props) {
    return (
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
                <Box sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    flexDirection: 'row',
                    width: '90%'
                }}>
                    <Box sx={{ flexDirection: 'row', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <AspectRatio ratio="1" sx={{ width: 50 }}>
                            <img
                                src={PatientIcon.src}
                                srcSet={PatientIcon.src}
                                loading="lazy"
                                alt=""
                            />
                        </AspectRatio>
                        <p style={{ margin: '0 10px' }}>ผู้ป่วยในภารกิจ</p>
                    </Box>

                    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        {
                            (
                                currentMission?.CarJoinMission?.filter(r => r.PatientBelongCar.length).length
                                + currentMission?.HelicopterJoinMission?.filter(r => r.PatientBelongHelicopter.length).length
                                + currentMission?.ShipJoinMission?.filter(r => r.PatientBelongShip).length
                            )
                        } คน
                    </Box>
                </Box>

            </AccordionSummary>
            <AccordionDetails>
                <Typography>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
                    malesuada lacus ex, sit amet blandit leo lobortis eget.
                </Typography>
            </AccordionDetails>
        </Accordion>
    )
}
