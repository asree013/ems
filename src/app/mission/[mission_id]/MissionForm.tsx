'use client'
import * as React from 'react';
import Card from '@mui/material/Card';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import missionCss from './mission_id.module.css'
import { Alert, Button, Paper, TextField } from '@mui/material';
import CreateNewFolderIcon from '@mui/icons-material/CreateNewFolder';
import MyLocationIcon from '@mui/icons-material/MyLocation';
import { useContext, useState } from 'react';
import { OpenModalMapContext, TOpenModalMap } from '@/contexts/openModal.context';
import { MissionContext, TMissionC } from '@/contexts/missions.context';
import CheckIcon from '@mui/icons-material/Check';
import { Missions } from '@/models/mission.model';
import Divider from '@mui/material/Divider';
import AddLocationAltIcon from '@mui/icons-material/AddLocationAlt';
import { toast } from '@/services/alert.service';
import { createMission } from '@/services/mission.service';

export default function MissionForm() {
  const { open, setOpen } = useContext<TOpenModalMap>(OpenModalMapContext)
  const { mission, setMission } = useContext<TMissionC>(MissionContext)
  const [isNull, setIsNull] = useState<boolean>(false)

  async function onCreateMission(e: React.MouseEvent<HTMLButtonElement| MouseEvent>) {
    e.preventDefault()
    setIsNull(false)
    if(!mission.titel || !mission.description || !mission.lat){
      toast('กรอกข่อมูลให้ครบ', 'warning')
      setIsNull(true)
    }
    else{
      toast('Created Mission', 'success')
      try {
        const m = {} as Missions 
        m.image = mission.image
        m.lat = mission.lat
        m.long = mission.long
        m.utm = mission.utm
        m.mgrs = mission.mgrs
        const result = await createMission(m)
      } catch (error) {
        console.log(error);
        
      }
    }
  }

  return (
    <>
      <Card variant="outlined" sx={{ maxWidth: '90%' }} className={missionCss.card}>
        <Box sx={{ p: 2 }} >
          <Stack direction="row" justifyContent="space-between" alignItems="center">
            <Typography gutterBottom variant="h5" component="div">
              Creact Mission
            </Typography>
            <Typography gutterBottom variant="h6" component="div">
              <CreateNewFolderIcon color='primary' sx={{ fontSize: '2rem' }} />
            </Typography>
          </Stack>
          <Typography color="text.secondary" variant="body2" component={'div'} style={{ marginTop: '25px' }}>
            <TextField onChange={(e) => setMission({...mission, titel: e.target.value})} error={isNull} style={{ width: '100%' }} id="filled-basic" label="Title" variant="filled" />
            <TextField onChange={(e) => setMission({...mission, description: e.target.value})} error={isNull} style={{ width: '100%', marginTop: '10px' }} id="filled-basic" label="Description" variant="filled" />
            <Box sx={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <TextField error={isNull} value={mission.lat ? mission.lat : '0.000000'} style={{ width: '48%', marginTop: '10px' }} id="filled-basic" label="lat" variant="filled" disabled />
              <TextField error={isNull} value={mission.long ? mission.long : '0.000000'} style={{ width: '48%', marginTop: '10px' }} id="filled-basic" label="long" variant="filled" disabled />
            </Box>
            <Box sx={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <TextField error={isNull} value={mission.utm ? mission.utm : '0.000000'} style={{ width: '48%', marginTop: '10px' }} id="filled-basic" label="utm" variant="filled" disabled />
              <TextField error={isNull} value={mission.mgrs ? mission.mgrs : '0.000000'} style={{ width: '48%', marginTop: '10px' }} id="filled-basic" label="mgrs" variant="filled" disabled />
            </Box>
            <Alert hidden={mission.lat? false: true} style={{ marginTop: '10px' }} icon={<CheckIcon fontSize="inherit" />} severity="success">
              Select location Success
            </Alert>
          </Typography>
        </Box>
        <Divider />
        <Box sx={{ p: 2 }}>
          <Typography gutterBottom variant="body2">
            Select type
          </Typography>
          <Stack spacing={1} style={{ margin: '10px 40px' }}>
            <Typography component={'div'} color="initial" onClick={() => setOpen(true)}>
              <Paper elevation={3} style={{ padding: '20px', cursor: 'pointer' }} >
                <AddLocationAltIcon style={{ fontSize: '12rem' }} />
              </Paper>
            </Typography>
          </Stack>
          <Divider style={{marginTop: '20px'}} />
          <Box sx={{display: 'flex', alignItems: 'center', justifyContent: 'space-around', width: '100%', marginTop: '40px'}}>
            <Button onClick={(e) => history.back()} style={{width: '8rem'}} variant='contained' color='error'>Cancel</Button>
            <Button onClick={onCreateMission} style={{width: '8rem'}} variant='contained' color='primary'>Save</Button>
          </Box>
        </Box>
      </Card>

    </>
  );
}


