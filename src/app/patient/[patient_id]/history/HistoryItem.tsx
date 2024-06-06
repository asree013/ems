import * as React from 'react';
import Typography from '@mui/material/Typography';
import History from './History.module.css'
import { Box, Card, Chip, Divider, Fab, Stack } from '@mui/material';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';

export default function HistoryItem() {
  return (
    <div className={History.history_item}>
      <Card variant="outlined" className={`${History.history_card_success} ${History.card}`}>
        <Box sx={{ p: 2 }}>
          <Stack direction="row" justifyContent="space-between" alignItems="center">
            <Typography gutterBottom variant="h5" component="div">
              History of Patient
            </Typography>
            <Typography gutterBottom component="div" style={{ border: '1px solid green', borderRadius: '50%', padding: '6px' }}>
              <ArrowForwardIcon color='success' />
            </Typography>
          </Stack>
          <Typography color="text.secondary" variant="body1">
            Pinstriped cornflower blue cotton blouse takes you on a walk to the park or
            just down the hall.
          </Typography>
          <Stack style={{ marginTop: '5px' }} direction="row" justifyContent="start" alignItems="center">
            <Typography gutterBottom variant="h6" component="div" width={'100%'}>
              <AccessTimeIcon />: 12:30 น
            </Typography>
            <Typography gutterBottom variant="h6" component="div" width={'100%'}>
              <CalendarMonthIcon />: 12/04/2566
            </Typography>
          </Stack>
        </Box>
        <Divider />
        <Box sx={{ p: 2 }}>
          <Stack direction="row" spacing={1}>
            <Chip color="success" label="Success" style={{ fontSize: '1.2rem', padding: '5px', width: '50%' }} />
          </Stack>
        </Box>
      </Card>
      <Card variant="outlined" className={`${History.history_card_draft} ${History.card}`}>
        <Box sx={{ p: 2 }}>
          <Stack direction="row" justifyContent="space-between" alignItems="center">
            <Typography gutterBottom variant="h5" component="div">
              Toothbrush
            </Typography>
            <Typography gutterBottom component="div" style={{ border: '1px solid #2979ff', borderRadius: '50%', padding: '6px' }}>
              <ArrowForwardIcon color='primary' />
            </Typography>
          </Stack>
          <Typography color="text.secondary" variant="body2">
            Pinstriped cornflower blue cotton blouse takes you on a walk to the park or
            just down the hall.
          </Typography>
          <Stack style={{ marginTop: '5px' }} direction="row" justifyContent="start" alignItems="center">
            <Typography gutterBottom variant="h6" component="div" width={'100%'}>
              <AccessTimeIcon />: 12:30 น
            </Typography>
            <Typography gutterBottom variant="h6" component="div" width={'100%'}>
              <CalendarMonthIcon />: 12/04/2566
            </Typography>
          </Stack>
        </Box>
        <Divider />
        <Box sx={{ p: 2 }}>
          <Stack direction="row" spacing={1}>
            <Chip color="primary" label="Darft" style={{ fontSize: '1.2rem', padding: '5px', width: '50%' }} />
          </Stack>
        </Box>
      </Card>
      <Card variant="outlined" className={`${History.card}`}>
        <Box sx={{ p: 2 }}>
          <Stack direction="row" justifyContent="space-between" alignItems="center">
            <Typography gutterBottom variant="h5" component="div">
              Toothbrush
            </Typography>
            <Typography gutterBottom component="div" style={{ border: '1px solid green', borderRadius: '50%', padding: '6px' }}>
              <ArrowForwardIcon color='success' />
            </Typography>
          </Stack>
          <Typography color="text.secondary" variant="body2">
            Pinstriped cornflower blue cotton blouse takes you on a walk to the park or
            just down the hall.
          </Typography>
          <Stack style={{ marginTop: '5px' }} direction="row" justifyContent="start" alignItems="center">
            <Typography gutterBottom variant="h6" component="div" width={'100%'}>
              <AccessTimeIcon />: 12:30 น
            </Typography>
            <Typography gutterBottom variant="h6" component="div" width={'100%'}>
              <CalendarMonthIcon />: 12/04/2566
            </Typography>
          </Stack>
        </Box>
        <Divider />
        <Box sx={{ p: 2 }}>
          <Stack direction="row" spacing={1}>
            <Chip color="success" label="Darft" style={{ fontSize: '1.2rem', padding: '5px', width: '50%' }} />
          </Stack>
        </Box>
      </Card>
      <Card variant="outlined" className={`${History.card}`}>
        <Box sx={{ p: 2 }}>
          <Stack direction="row" justifyContent="space-between" alignItems="center">
            <Typography gutterBottom variant="h5" component="div">
              Toothbrush
            </Typography>
            <Typography gutterBottom component="div" style={{ border: '1px solid green', borderRadius: '50%', padding: '6px' }}>
              <ArrowForwardIcon color='success' />
            </Typography>
          </Stack>
          <Typography color="text.secondary" variant="body2">
            Pinstriped cornflower blue cotton blouse takes you on a walk to the park or
            just down the hall.
          </Typography>
          <Stack style={{ marginTop: '5px' }} direction="row" justifyContent="start" alignItems="center">
            <Typography gutterBottom variant="h6" component="div" width={'100%'}>
              <AccessTimeIcon />: 12:30 น
            </Typography>
            <Typography gutterBottom variant="h6" component="div" width={'100%'}>
              <CalendarMonthIcon />: 12/04/2566
            </Typography>
          </Stack>
        </Box>
        <Divider />
        <Box sx={{ p: 2 }}>
          <Stack direction="row" spacing={1}>
            <Chip color="success" label="Darft" style={{ fontSize: '1.2rem', padding: '5px', width: '50%' }} />
          </Stack>
        </Box>
      </Card>
      <Card variant="outlined" className={`${History.card}`}>
        <Box sx={{ p: 2 }}>
          <Stack direction="row" justifyContent="space-between" alignItems="center">
            <Typography gutterBottom variant="h5" component="div">
              Toothbrush
            </Typography>
            <Typography gutterBottom component="div" style={{ border: '1px solid green', borderRadius: '50%', padding: '6px' }}>
              <ArrowForwardIcon color='success' />
            </Typography>
          </Stack>
          <Typography color="text.secondary" variant="body2">
            Pinstriped cornflower blue cotton blouse takes you on a walk to the park or
            just down the hall.
          </Typography>
          <Stack style={{ marginTop: '5px' }} direction="row" justifyContent="start" alignItems="center">
            <Typography gutterBottom variant="h6" component="div" width={'100%'}>
              <AccessTimeIcon />: 12:30 น
            </Typography>
            <Typography gutterBottom variant="h6" component="div" width={'100%'}>
              <CalendarMonthIcon />: 12/04/2566
            </Typography>
          </Stack>
        </Box>
        <Divider />
        <Box sx={{ p: 2 }}>
          <Stack direction="row" spacing={1}>
            <Chip color="success" label="Darft" style={{ fontSize: '1.2rem', padding: '5px', width: '50%' }} />
          </Stack>
        </Box>
      </Card>
    </div>
  );
}
