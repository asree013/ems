'use client'
import * as React from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import order_idCss from './order_idCss.module.css'
import { Avatar } from '@mui/material';

export default function AccordionDetail() {
  return (
    <div>
      <Accordion style={{background: '#2c3e50', color: 'white', borderRadius: 0}}>
        <AccordionSummary
          expandIcon={<ArrowDownwardIcon />}
          aria-controls="panel1-content"
          id="panel1-header"
          className={order_idCss.accrodion}
        >
          <div style={{display: 'flex', alignItems:'center', justifyContent: 'space-around', width: '100%'}}>
            <Avatar className={order_idCss.avatar} src='' />
            <Typography>asree</Typography>
            <Typography>hayeema</Typography>
            <Typography>male</Typography>
            <Typography>color</Typography>
          </div>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
            malesuada lacus ex, sit amet blandit leo lobortis eget.
          </Typography>
        </AccordionDetails>
      </Accordion>
    </div>
  );
}
