import * as React from 'react';
import Typography from '@mui/material/Typography';
import history_css from './styles/history_css.module.css';
import { Box, Button, Card, Chip, Divider, Fab, Stack } from '@mui/material';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import { Historys } from '@/models/history.model';
import { useRouter } from 'next/navigation';

import EditNoteIcon from '@mui/icons-material/EditNote';
import DoDisturbIcon from '@mui/icons-material/DoDisturb';
import CancelIcon from '@mui/icons-material/Cancel';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import Loadding from '@/components/Loadding';
import { HistoryInCar } from '@/app/home/vehicle/CarHistoryItem';
import Modal from '@mui/material/Modal';
import PhysicalStatusModal from './PhysicalstatusModal';

type Props = {
  value: HistoryInCar;
  name: {
    first_name: string,
    last_name: string,
    patient_id: string
  }
};

export default function HistoryItem({ value, name, }: Props) {
  const router = useRouter();
  const [load, setLoad] = React.useState<boolean>(false);
  const [open, setOpen] = React.useState<boolean>(false);

  function pipeTime(time: string) {
    if (time) {
      const hour = parseInt(time.split('T')[1].split(':')[0]) + 7;
      const minute = time.split('T')[1].split(':')[0];
      return `${hour}:${minute}`;
    }
  }

  function onRedirect(historyId: string) {
    setLoad(true);
    router.push('/patient/'+ name.patient_id + '/history/' + historyId);
  }
  return (
    <>
      <Card variant="outlined" className={` ${history_css.card}`}>
        <Box sx={{ p: 2 }}>
          <Stack
            direction="row"
            justifyContent="space-between"
            alignItems="center"
          >
            <Typography gutterBottom variant="h6" component="div">
              ชื่อ-สกุล: {name.first_name} {name.last_name}
            </Typography>
            <Typography
              sx={{ cursor: 'pointer' }}
              onClick={() => onRedirect(value?.id, )}
              gutterBottom
              component="div"
              style={{
                border: '1px solid #2979ff',
                borderRadius: '50%',
                padding: '6px',
              }}
            >
              <ArrowForwardIcon color="primary" />
            </Typography>
          </Stack>
          <Divider />
          <Typography gutterBottom variant="h6" component="div">
            Symptom: {value?.symptom_details}
          </Typography>
          <Typography gutterBottom variant="h6" component="div">
            CC: {value?.chief_complaint} time: {value?.chief_complaint ?? 0}
          </Typography>
          <Typography gutterBottom variant="h6" component="div">
            PI: {value?.present_illness}
          </Typography>
          <Typography color="text.secondary" variant="body2">
            {/* {value?.Patient.first_name} {value?.Patient.last_name} */}
          </Typography>
          <Stack
            style={{ marginTop: '5px' }}
            direction="row"
            justifyContent="start"
            alignItems="center"
          >
            <Typography gutterBottom component="div" width={'100%'}>
              <AccessTimeIcon />: {pipeTime(value?.create_date)} น
            </Typography>
            <Typography
              gutterBottom
              style={{ fontSize: '1rem' }}
              component="div"
              width={'100%'}
            >
              <CalendarMonthIcon />: {value?.create_date?.split('T')[0]}
            </Typography>
          </Stack>
        </Box>
        <Divider />
        <Box sx={{ margin: '15px 0', width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-around' }}>
          <Button variant='outlined' onClick={() => setOpen(true)} color='warning'>Triage Level</Button>
          <Button variant='outlined' onClick={() => setOpen(true)} color='inherit'>Physical Status</Button>
        </Box>
        <Divider />
        <Box sx={{ p: 2 }}>
          <Stack direction="row" spacing={1}>
            {
              value?.status?.includes('Draft') ?
                <Chip
                  icon={<EditNoteIcon />}
                  className='w-full'
                  color="primary"
                  label={value?.status}
                  style={{ fontSize: '1.2rem', padding: '5px', width: '50%' }}
                /> : null
            }

            {
              value?.status?.includes('Completed') ?
                <Chip
                  className='w-full'
                  icon={<EditNoteIcon />}
                  color="success"
                  label={value?.status}
                  style={{ fontSize: '1.2rem', padding: '5px', width: '50%' }}
                /> : null
            }

            {
              value?.status?.includes('Close') ?
                <Chip
                  icon={<EditNoteIcon />}
                  color="warning"
                  className='w-full'
                  label={value?.status}
                  style={{ fontSize: '1.2rem', padding: '5px', width: '50%' }}
                /> : null
            }

            {
              value?.status?.includes('Cancel') ?
                <Chip
                  icon={<EditNoteIcon />}
                  className='w-full'
                  color="error"
                  label={value?.status}
                  style={{ fontSize: '1.2rem', padding: '5px', width: '50%' }}
                /> : null
            }
          </Stack>
        </Box>
      </Card>

      {
        load ?
          <Loadding />
          : null
      }

      {
        <PhysicalStatusModal 
          name={{first_name: name.first_name, last_name: name.last_name}}
          historys={value}
          triageLevel={JSON.parse(value.triage_lavel)} 
          physicalStatus={JSON.parse(value.physical_status)}
          open={open} setOpen={setOpen} 
        />
      }

    </>
  );




}




