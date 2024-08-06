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
import { Fab, IconButton } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import Loadding from '@/components/Loadding';

type Props = {
  mission: Missions
}

export default function TableMsssiion({ mission }: Props) {
  const [load, setLoad] = useState(false)
  return (
    <>
      <div>
        <Accordion>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1-content"
            id="panel1-header"
          >
            <img src={mission.image} alt="" />
            <p>{mission.title}</p>
          </AccordionSummary>
          <AccordionDetails>
            <Button onClick={() => {
              setLoad(true)
              window.location.href = '/mission/'+ mission.id
            }} variant="outlined" endIcon={<EditIcon />}>แก้ไขภารกิจ</Button>
          </AccordionDetails>
        </Accordion>
      </div>

      {
        load?
        <Loadding />:
        null
      }
    </>
  );
}