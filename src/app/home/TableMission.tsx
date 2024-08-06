'use client'

import { useContext, useState } from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionActions from '@mui/material/AccordionActions';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Button from '@mui/material/Button';
import { MissionContexts, TMissionCs } from '@/contexts/missions.context';
import { Missions } from '@/models/mission.model';
import { Box, Fab, IconButton } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import Loadding from '@/components/Loadding';
import { enviromentDev } from '@/configs/enviroment.dev';

import InfoIcon from '@mui/icons-material/Info';

type Props = {
  mission: Missions
}

export default function TableMsssiion({ mission }: Props) {
  const [load, setLoad] = useState(false)
  return (
    <>
      <div>
        <Accordion elevation={3}>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1-content"
            id="panel1-header"
          >

            <Box style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '90%' }}>
              <img src={mission.image ? mission.image : ''} style={{ width: '6rem' }} alt="" />
              <div style={{display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column'}}>
                <h2 style={{fontSize: '1.3rem', fontWeight: 700}}>{mission.title}</h2>
                <p>สมาชิก: {mission._count.Users}</p>
                <p>{mission.status}</p>
              </div>
            </Box>

          </AccordionSummary>
          <AccordionDetails>
            <Button onClick={() => {
              setLoad(true)
              window.location.href = '/mission/' + mission.id
            }} variant="outlined" endIcon={<EditIcon />}>แก้ไข</Button>
            <Button onClick={() => {
              setLoad(true)
              window.location.href = '/mission/' + mission.id+ '/mission_detail'
            }} color='warning' variant="outlined" endIcon={<InfoIcon />}>รายละเอียด</Button>
          </AccordionDetails>
        </Accordion>
      </div>

      {
        load ?
          <Loadding /> :
          null
      }
    </>
  );
}