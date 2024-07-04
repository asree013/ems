'use client'
import * as React from 'react';
import Card from '@mui/material/Card';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import missionCss from './mission_id.module.css'
import { Alert, Button, Fab, Paper, TextField } from '@mui/material';
import CreateNewFolderIcon from '@mui/icons-material/CreateNewFolder';
import AddAPhotoIcon from '@mui/icons-material/AddAPhoto';
import { useContext, useState } from 'react';
import { OpenModalMapContext, TOpenModalMap } from '@/contexts/openModal.context';
import { MissionContext, TMissionC } from '@/contexts/missions.context';
import CheckIcon from '@mui/icons-material/Check';
import { Missions } from '@/models/mission.model';
import Divider from '@mui/material/Divider';
import AddLocationAltIcon from '@mui/icons-material/AddLocationAlt';
import { toast } from '@/services/alert.service';
import { createMission } from '@/services/mission.service';
import ImageListItem from '@mui/material/ImageListItem';
import ImageListItemBar from '@mui/material/ImageListItemBar';
import CancelIcon from '@mui/icons-material/Cancel';
import Loadding from '@/components/Loadding';

export default function MissionForm() {
  const { open, setOpen } = useContext<TOpenModalMap>(OpenModalMapContext)
  const { mission, setMission } = useContext<TMissionC>(MissionContext)
  const [isNull, setIsNull] = useState<boolean>(false)
  const [load, setLoad] = useState<boolean>(false)
  const [src, setSrc] = useState<string>('')

  async function onCreateMission(e: React.MouseEvent<HTMLButtonElement | MouseEvent>) {
    e.preventDefault()
    setIsNull(false)
    if (!mission.titel || !mission.description || !mission.lat || !mission.image) {
      toast('กรอกข่อมูลให้ครบ', 'warning')
      setIsNull(true)
    }
    else {
      try {
        const m = {} as Missions
        m.titel = mission.titel
        m.description = mission.description
        m.image = mission.image
        m.lat = mission.lat
        m.long = mission.long
        m.utm = mission.utm
        m.mgrs = mission.mgrs
        await createMission(m)
        toast('Created Mission', 'success')
        history.back()
      } catch (error: any) {
        console.log(error);
        toast(JSON.stringify(error.message), 'error')
      }
    }
  }

  function handlerUpload(e: React.ChangeEvent<HTMLInputElement>) {
    if (e.target.files) {
      const FR = new FileReader()
      FR.onload = async (event) => {
        if (event.target && event.target.result) {
          const base64 = event.target.result as string
          setSrc(base64)
          setMission({ ...mission, image: base64 })
        }
      }

      FR.readAsDataURL(e.target.files[0])
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
            <TextField onChange={(e) => setMission({ ...mission, titel: e.target.value })} error={isNull} style={{ width: '100%' }} id="filled-basic" label="Title" variant="filled" />
            <TextField onChange={(e) => setMission({ ...mission, description: e.target.value })} error={isNull} style={{ width: '100%', marginTop: '10px' }} id="filled-basic" label="Description" variant="filled" />
            <Fab size='small' style={{ marginTop: '10px' }} color='success' onClick={() => setOpen(true)}>
              <AddLocationAltIcon />
            </Fab>
            <Box sx={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <TextField error={isNull} value={mission.lat ? mission.lat : '0.000000'} style={{ width: '48%', marginTop: '10px' }} id="filled-basic" label="lat" variant="filled" disabled />
              <TextField error={isNull} value={mission.long ? mission.long : '0.000000'} style={{ width: '48%', marginTop: '10px' }} id="filled-basic" label="long" variant="filled" disabled />
            </Box>
            <Box sx={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <TextField error={isNull} value={mission.utm ? mission.utm : '0.000000'} style={{ width: '48%', marginTop: '10px' }} id="filled-basic" label="utm" variant="filled" disabled />
              <TextField error={isNull} value={mission.mgrs ? mission.mgrs : '0.000000'} style={{ width: '48%', marginTop: '10px' }} id="filled-basic" label="mgrs" variant="filled" disabled />
            </Box>
            <Alert hidden={!mission.lat? true: false } style={{ marginTop: '10px' }} icon={<CheckIcon fontSize="inherit" />} severity="success">
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
            {
              src.length > 0 ?
                <>
                  <Fab size='small' color='error' onClick={() => {
                    setSrc('')
                    setMission({ ...mission, image: '' })
                  }}>
                    <CancelIcon />
                  </Fab>
                  <ImageListItem style={{ width: '14rem', height: '12rem' }}>
                    <img
                      src={src}
                      alt={src}
                      loading="lazy"
                    />
                    <ImageListItemBar
                      title={'image mission'}
                      subtitle={<span>by: nonuser</span>}
                      position="below"
                    />
                  </ImageListItem>
                </> :
                <Typography component={'div'}
                  style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                  color="initial" onClick={() => document.getElementById('camera')?.click()}>
                  <Paper elevation={3} style={{ padding: '20px', cursor: 'pointer' }} >
                    <AddAPhotoIcon style={{ fontSize: '12rem' }} />
                  </Paper>
                </Typography>

            }
            <input onChange={handlerUpload} id='camera' type="file" capture accept='image/*' hidden />
          </Stack>
          <Divider style={{ marginTop: '20px' }} />
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-around', width: '100%', marginTop: '40px' }}>
            <Button onClick={(e) => history.back()} style={{ width: '8rem' }} variant='contained' color='error'>Cancel</Button>
            <Button onClick={onCreateMission} style={{ width: '8rem' }} variant='contained' color='primary'>Save</Button>
          </Box>
        </Box>
      </Card>

      {
        load ?
          <Loadding /> :
          null
      }
    </>
  );
}


