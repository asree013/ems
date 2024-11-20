'use client'
import React from 'react'
import { MissionById } from '@/models/mission.model'
import { AspectRatio, Table } from '@mui/joy'
import { Accordion, AccordionDetails, AccordionSummary, Avatar, Box, Typography } from '@mui/material'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import PatientIcon from '@/assets/icon/patient_menu.png'
import { PatientBelongCar } from '@/models/patient'
import { CarInVehicle, PatientBelongShip } from '@/models/vehicle.model'
import TableResultPateint from './TableResultPateint'

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
                overflowX: 'auto'
            }}>
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
                                currentMission?.patients?.length
                            )                            
                        } คน
                    </Box>
                </Box>

            </AccordionSummary>
            <AccordionDetails >
                <Table aria-label="basic table" sx={{width: 'auto'}}>
                    <thead>
                        <tr>
                            <th>รูปถ่าย</th>
                            <th >ชื่อสกุล</th>
                            <th>เพศ</th>
                            <th>เลขบัตร</th>
                            <th>ยานพานะ</th>
                            <th>Protein&nbsp;(g)</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            currentMission?.patients?.map((r, i) =>
                                
                                <TableResultPateint key={i} pateint={r}  />
                            )
                        }
                    </tbody>
                </Table>
            </AccordionDetails>
        </Accordion>
    )

}
