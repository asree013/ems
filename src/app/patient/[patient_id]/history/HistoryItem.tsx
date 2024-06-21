import * as React from 'react';
import Typography from '@mui/material/Typography';
import historyCss from './historyCss.module.css';
import { Box, Card, Chip, Divider, Fab, Stack } from '@mui/material';
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
type Props = {
  value: Historys;
};

export default function HistoryItem({ value }: Props) {
  const router = useRouter();
  const [load, setLoad] = React.useState<boolean>(false);
  function pipeTime(time: string) {
    const hour = parseInt(time.split('T')[1].split(':')[0]) + 7;
    const minute = time.split('T')[1].split(':')[0];
    return `${hour}:${minute}`;
  }

  function onRedirect(historyId: string) {
    setLoad(true);
    router.push('history/' + historyId);
  }
  return (
    <>
      {value.status.includes('Draft') ? (
        <Card variant="outlined" className={` ${historyCss.card}`}>
          <Box sx={{ p: 2 }}>
            <Stack
              direction="row"
              justifyContent="space-between"
              alignItems="center"
            >
              <Typography gutterBottom variant="h5" component="div">
                {value.symptom_details}
              </Typography>
              <Typography
                sx={{ cursor: 'pointer' }}
                onClick={() => onRedirect(value.id)}
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
            <Typography color="text.secondary" variant="body2">
              {value.Patient.first_name} {value.Patient.last_name}
            </Typography>
            <Stack
              style={{ marginTop: '5px' }}
              direction="row"
              justifyContent="start"
              alignItems="center"
            >
              <Typography gutterBottom component="div" width={'100%'}>
                <AccessTimeIcon />: {pipeTime(value.create_date)} น
              </Typography>
              <Typography
                gutterBottom
                style={{ fontSize: '1rem' }}
                component="div"
                width={'100%'}
              >
                <CalendarMonthIcon />: {value.create_date.split('T')[0]}
              </Typography>
            </Stack>
          </Box>
          <Divider />
          <Box sx={{ p: 2 }}>
            <Stack direction="row" spacing={1}>
              <Chip
                icon={<EditNoteIcon />}
                color="primary"
                label={value.status}
                style={{ fontSize: '1.2rem', padding: '5px', width: '50%' }}
              />
            </Stack>
          </Box>
        </Card>
      ) : null}
      {value.status.includes('Completed') ? (
        <Card variant="outlined" className={` ${historyCss.card}`}>
          <Box sx={{ p: 2 }}>
            <Stack
              direction="row"
              justifyContent="space-between"
              alignItems="center"
            >
              <Typography gutterBottom variant="h5" component="div">
                {value.symptom_details}
              </Typography>
              <Typography
                sx={{ cursor: 'pointer' }}
                onClick={() => onRedirect(value.id)}
                gutterBottom
                component="div"
                style={{
                  border: '1px solid green',
                  borderRadius: '50%',
                  padding: '6px',
                }}
              >
                <ArrowForwardIcon color="success" />
              </Typography>
            </Stack>
            <Typography color="text.secondary" variant="body2">
              {value.Patient.first_name} {value.Patient.last_name}
            </Typography>
            <Stack
              style={{ marginTop: '5px' }}
              direction="row"
              justifyContent="start"
              alignItems="center"
            >
              <Typography gutterBottom component="div" width={'100%'}>
                <AccessTimeIcon />: {pipeTime(value.create_date)} น
              </Typography>
              <Typography
                gutterBottom
                style={{ fontSize: '1rem' }}
                component="div"
                width={'100%'}
              >
                <CalendarMonthIcon />: {value.create_date.split('T')[0]}
              </Typography>
            </Stack>
          </Box>
          <Divider />
          <Box sx={{ p: 2 }}>
            <Stack direction="row" spacing={1}>
              <Chip
                icon={<CheckCircleIcon />}
                color="success"
                label={value.status}
                style={{ fontSize: '1.2rem', padding: '5px', width: '50%' }}
              />
            </Stack>
          </Box>
        </Card>
      ) : null}
      {value.status.includes('Close') ? (
        <Card variant="outlined" className={`${historyCss.card}`}>
          <Box sx={{ p: 2 }}>
            <Stack
              direction="row"
              justifyContent="space-between"
              alignItems="center"
            >
              <Typography gutterBottom variant="h5" component="div">
                {value.symptom_details}
              </Typography>
              <Typography
                sx={{ cursor: 'pointer' }}
                onClick={() => onRedirect(value.id)}
                gutterBottom
                component="div"
                style={{
                  border: '1px solid rgb(181, 181, 1)',
                  borderRadius: '50%',
                  padding: '6px',
                }}
              >
                <ArrowForwardIcon sx={{ color: 'rgb(181, 181, 1)' }} />
              </Typography>
            </Stack>
            <Typography color="text.secondary" variant="body2">
              {value.Patient.first_name} {value.Patient.last_name}
            </Typography>
            <Stack
              style={{ marginTop: '5px' }}
              direction="row"
              justifyContent="start"
              alignItems="center"
            >
              <Typography gutterBottom component="div" width={'100%'}>
                <AccessTimeIcon />: {pipeTime(value.create_date)} น
              </Typography>
              <Typography
                gutterBottom
                style={{ fontSize: '1rem' }}
                component="div"
                width={'100%'}
              >
                <CalendarMonthIcon />: {value.create_date.split('T')[0]}
              </Typography>
            </Stack>
          </Box>
          <Divider />
          <Box sx={{ p: 2 }}>
            <Stack direction="row" spacing={1}>
              <Chip
                icon={<DoDisturbIcon />}
                sx={{ backgroundColor: 'rgb(181, 181, 1)', color: 'white' }}
                label={value.status}
                style={{ fontSize: '1.2rem', padding: '5px', width: '50%' }}
              />
            </Stack>
          </Box>
        </Card>
      ) : null}
      {value.status.includes('Cancel') ? (
        <Card variant="outlined" className={`${historyCss.card}`}>
          <Box sx={{ p: 2 }}>
            <Stack
              direction="row"
              justifyContent="space-between"
              alignItems="center"
            >
              <Typography gutterBottom variant="h5" component="div">
                {value.symptom_details}
              </Typography>
              <Typography
                sx={{ cursor: 'pointer' }}
                onClick={() => onRedirect(value.id)}
                gutterBottom
                component="div"
                style={{
                  border: '1px solid rgb(181, 181, 1)',
                  borderRadius: '50%',
                  padding: '6px',
                }}
              >
                <ArrowForwardIcon sx={{ color: 'rgb(181, 181, 1)' }} />
              </Typography>
            </Stack>
            <Typography color="text.secondary" variant="body2">
              {value.Patient.first_name} {value.Patient.last_name}
            </Typography>
            <Stack
              style={{ marginTop: '5px' }}
              direction="row"
              justifyContent="start"
              alignItems="center"
            >
              <Typography gutterBottom component="div" width={'100%'}>
                <AccessTimeIcon />: {pipeTime(value.create_date)} น
              </Typography>
              <Typography
                gutterBottom
                style={{ fontSize: '1rem' }}
                component="div"
                width={'100%'}
              >
                <CalendarMonthIcon />: {value.create_date.split('T')[0]}
              </Typography>
            </Stack>
          </Box>
          <Divider />
          <Box sx={{ p: 2 }}>
            <Stack direction="row" spacing={1}>
              <Chip
                icon={<CancelIcon />}
                color="error"
                label={value.status}
                style={{ fontSize: '1.2rem', padding: '5px', width: '50%' }}
              />
            </Stack>
          </Box>
        </Card>
      ) : null}
      {load ? <Loadding /> : null}
    </>
  );
}
