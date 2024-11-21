'use client'
import React from 'react'
import { MissionById } from '@/models/mission.model'
import { AspectRatio, Table } from '@mui/joy'
import { Accordion, AccordionDetails, AccordionSummary, Box, Typography } from '@mui/material'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Solder from '@/assets/icon/soldier_6142078.png'
import TableResultUser from './TableResulltUser'

type Props = {
    currentMission: MissionById
}

export default function UserCount({ currentMission }: Props) {
    return (
        <Accordion variant="outlined"
            sx={{
                cursor: 'pointer',
                width: '100%',
                '&:hover': { boxShadow: 'md', borderColor: 'neutral.outlinedHoverBorder' },
                overflowX: 'auto'
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
                                src={Solder.src}
                                srcSet={Solder.src}
                                loading="lazy"
                                alt=""
                            />
                        </AspectRatio>
                        <p style={{ margin: '0 10px', fontSize: '1rem', fontWeight: 500 }}>เจ้าหน้าที่ภารกิจ</p>
                    </Box>

                    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1rem', fontWeight: 500  }}>
                        {currentMission?.Users?.length} คน
                    </Box>
                </Box>

            </AccordionSummary>
            <AccordionDetails>
            <Table aria-label="basic table" sx={{width: 'auto'}}>
                    <thead>
                        <tr>
                            <th>รูปถ่าย</th>
                            <th >ชื่อ-สกุล</th>
                            <th>อาชีพ</th>
                            <th>เบอร์โทรศัพท์มือถือ</th>
                            <th>สถานะ</th>
                            <th>สถานะผู้ใช้งาน</th>
                            <th>การพูดคุย</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            currentMission?.Users?.map((r, i) =>
                                <TableResultUser key={i} user={r} />
                            )
                        }
                    </tbody>
                </Table>
            </AccordionDetails>
        </Accordion>
    )
}
