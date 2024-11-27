'use client'
import React, { useState } from 'react'
import { MissionById } from '@/models/mission.model'
import { AspectRatio, Table } from '@mui/joy'
import { Accordion, AccordionDetails, AccordionSummary, Box, IconButton, Switch, Typography } from '@mui/material'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Solder from '@/assets/icon/soldier_6142078.png'
import TableResultUser from './TableResulltUser'
import Ambulance from '@/assets/icon/ambulance.png'
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel'
import ChatIcon from '@mui/icons-material/Chat';
import MyLocationIcon from '@mui/icons-material/MyLocation';


type Props = {
    currentMission: MissionById
}

export default function VehicleCount({ currentMission }: Props) {
    const [selected, setSelected] = useState<string>('all')

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
                                src={Ambulance.src}
                                srcSet={Ambulance.src}
                                loading="lazy"
                                alt=""
                            />
                        </AspectRatio>
                        <p style={{ margin: '0 10px', fontSize: '1rem', fontWeight: 500 }}>ยานพาหนะ</p>
                    </Box>

                    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1rem', fontWeight: 500 }}>
                        {
                            (currentMission?.HelicopterJoinMission?.length ?? 0 + currentMission?.CarJoinMission?.length ?? 0 + currentMission?.ShipJoinMission?.length ?? 0) ?
                                (currentMission?.HelicopterJoinMission?.length ?? 0 + currentMission?.CarJoinMission?.length ?? 0 + currentMission?.ShipJoinMission?.length ?? 0) + 1 :
                                0
                        } คัน
                    </Box>
                </Box>

            </AccordionSummary>
            <AccordionDetails>
                <FormControl>
                    <FormLabel id="demo-radio-buttons-group-label">เลือกยานพาหนะ</FormLabel>
                    <RadioGroup
                        aria-labelledby="demo-radio-buttons-group-label"
                        defaultValue="female"
                        name="radio-buttons-group"
                        sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexDirection: 'row' }}
                        onChange={(e) => setSelected(e.target.value)}
                        value={selected}

                    >
                        <FormControlLabel value="all" control={<Radio />} label="ทั้งหมด" />
                        <FormControlLabel value="car" control={<Radio />} label="รถ" />
                        <FormControlLabel value="ship" control={<Radio />} label="เรือ" />
                        <FormControlLabel value="helicopter" control={<Radio />} label="ฮ." />
                    </RadioGroup>
                </FormControl>
                <Table aria-label="basic table" sx={{ width: 'auto' }}>
                    <thead>
                        <tr>
                            <th >รูป</th>
                            <th >นามเรียกขาน</th>
                            <th>เลขทะเบียน</th>
                            <th>คลืนวิทยุ</th>
                            <th>สถานะใช้งาน</th>
                            <th>การพูดคุยภานใน</th>
                            <th>โชว์ในแผนที่</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            selected === 'all' ?
                                currentMission?.CarJoinMission?.map((r, i) =>
                                    <tr key={i}>
                                        <td><img style={{ width: 40, height: 40, objectFit: 'contain' }} src={r.image_front} alt="" /></td>
                                        <td>{r.calling}</td>
                                        <td>{r.number}</td>
                                        <td>{r.radio ?? 'ไม่ได้ระบุ'}</td>
                                        <td>{r.status}</td>
                                        <td>
                                            <IconButton>
                                                <ChatIcon />
                                            </IconButton>
                                        </td>
                                        <td>
                                            <Switch  />
                                        </td>
                                    </tr>
                                ) : null
                        }
                        {
                            selected === 'all' ?
                                currentMission?.ShipJoinMission?.map((r, i) =>
                                    <tr key={i}>
                                        <td><img style={{ width: 40, height: 40, objectFit: 'contain' }} src={r.image} alt="" /></td>
                                        <td>{r.calling}</td>
                                        <td>{r.number}</td>
                                        <td>{r.radio ?? 'ไม่ได้ระบุ'}</td>
                                        <td>{r.status}</td>
                                        <td>
                                            <IconButton>
                                                <ChatIcon />
                                            </IconButton>
                                        </td>
                                        <td>
                                            <Switch  />
                                        </td>
                                    </tr>
                                ) : null
                        }
                        {
                            selected === 'all' ?
                                currentMission?.HelicopterJoinMission?.map((r, i) =>
                                    <tr key={i}>
                                        <td><img style={{ width: 40, height: 40, objectFit: 'contain' }} src={r.image_front} alt="" /></td>
                                        <td>{r.calling}</td>
                                        <td>{r.number}</td>
                                        <td>{r.radio ?? 'ไม่ได้ระบุ'}</td>
                                        <td>NotInUes</td>
                                        <td>
                                            <IconButton>
                                                <ChatIcon />
                                            </IconButton>
                                        </td>
                                        <td>
                                            <Switch  />
                                        </td>
                                    </tr>
                                ) : null
                        }
                    </tbody>
                </Table>
            </AccordionDetails>
        </Accordion>
    )
}
