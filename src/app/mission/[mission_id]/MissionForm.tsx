'use client'
import { useEffect, useState, useContext, useCallback } from 'react';
import Card from '@mui/material/Card';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import missionCss from './mission_id.module.css'
import { Alert, Button, Fab, IconButton, Paper, TextField } from '@mui/material';
import CreateNewFolderIcon from '@mui/icons-material/CreateNewFolder';
import AddAPhotoIcon from '@mui/icons-material/AddAPhoto';
import { OpenModalMapContext, TOpenModalMap } from '@/contexts/openModal.context';
import CheckIcon from '@mui/icons-material/Check';
import { Missions } from '@/models/mission.model';
import Divider from '@mui/material/Divider';
import AddLocationAltIcon from '@mui/icons-material/AddLocationAlt';
import { toast } from '@/services/alert.service';
import { createMission, findMissionByMissionId, findMissionByUser, updateMissionByMissionId } from '@/services/mission.service';
import ImageListItem from '@mui/material/ImageListItem';
import ImageListItemBar from '@mui/material/ImageListItemBar';
import CancelIcon from '@mui/icons-material/Cancel';
import Loadding from '@/components/Loadding';
import { timeOutJwt } from '@/services/timeout.service';
import { NIL } from 'uuid';
import MapSelect from './MapSelect';
import { MissionFromContext, TMissionFromContext } from '@/contexts/mission.from.context'

type Props = {
  mission_id: string
}

export default function MissionForm({ mission_id }: Props) {
  const { open, setOpen } = useContext<TOpenModalMap>(OpenModalMapContext)
  const [missions, setMissions] = useState<Missions>({} as Missions)
  const [isNull, setIsNull] = useState<boolean>(false)
  const [load, setLoad] = useState<boolean>(false)
  const [src, setSrc] = useState<string>('')

  async function onCreateMission(e: React.MouseEvent<HTMLButtonElement | MouseEvent>) {
    e.preventDefault()
    setIsNull(false)
    if (!missions.title || !missions.description || !missions.lat || !missions.image) {
      toast('กรอกข่อมูลให้ครบ', 'warning')
      setIsNull(true)
    }
    else {
      try {
        const m = {} as Missions
        m.title = missions.title
        m.description = missions.description
        m.image = missions.image
        m.lat = missions.lat
        m.long = missions.long
        m.utm = missions.utm
        m.mgrs = missions.mgrs
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
          setMissions({ ...missions, image: base64 })
        }
      }

      FR.readAsDataURL(e.target.files[0])
    }
  }

  async function onUpdateMission() {
    try {
      const result = await updateMissionByMissionId(mission_id, missions)
      toast('แก้ไขสำเร็จ', 'success')
      setMissions(result.data)
    } catch (error: any) {
      toast(JSON.stringify(error.message), 'error')
      timeOutJwt(error)
    }
  }

  const feedMissionByMissionId = useCallback(async () => {
    try {
      const result = await findMissionByMissionId(mission_id)
      console.log(result.data);
      setMissions(result.data)
    } catch (error) {
      timeOutJwt(error)
    }
  }, [setMissions])

  useEffect(() => {
    if (mission_id !== NIL) {
      feedMissionByMissionId()

    }
    return () => {
      feedMissionByMissionId
    }
  }, [feedMissionByMissionId])

  return (
    <>
      <Card variant="outlined" sx={{ maxWidth: '90%' }} className={missionCss.card}>
        <Box sx={{ p: 2 }} >
          <Stack direction="row" justifyContent="space-between" alignItems="center">
            <Typography gutterBottom variant="h5" component="div">
              {
                mission_id.includes(NIL) ?
                  'สร้าง ภารกิจ' :
                  'แก้ไข ภารกิจ'
              }
            </Typography>
            <Typography gutterBottom variant="h6" component="div">
              <CreateNewFolderIcon color='primary' sx={{ fontSize: '2rem' }} />
            </Typography>
          </Stack>
          <Typography color="text.secondary" variant="body2" component={'div'} style={{ marginTop: '25px' }}>
            <TextField value={missions.title ?? ''} onChange={(e) => setMissions({ ...missions, title: e.target.value })} error={isNull} style={{ width: '100%' }} id="filled-basic" label="Title" variant="filled" />
            <TextField value={missions.description ?? ''} onChange={(e) => setMissions({ ...missions, description: e.target.value })} error={isNull} style={{ width: '100%', marginTop: '10px' }} id="filled-basic" label="Description" variant="filled" />
            <Alert hidden={!missions.lat ? true : false} style={{ marginTop: '10px' }} icon={<CheckIcon fontSize="inherit" />} severity="success">
              Select location Success
            </Alert>
          </Typography>

          <Divider />
          <Box >
            <Typography gutterBottom variant="body2">
              Select Map
            </Typography>
            <div style={{ margin: '5px' }}>
              <MissionFromContext.Provider value={{ missions, setMissions }} >
                <MapSelect />
              </MissionFromContext.Provider>
            </div>
            <Stack style={{ padding: 2 }}>
              <Box sx={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <TextField error={isNull} value={missions.lat ? missions.lat : '0.000000'} style={{ width: '48%', marginTop: '10px' }} id="filled-basic" label="lat" variant="filled" disabled />
                <TextField error={isNull} value={missions.long ? missions.long : '0.000000'} style={{ width: '48%', marginTop: '10px' }} id="filled-basic" label="long" variant="filled" disabled />
              </Box>
              <Box sx={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <TextField error={isNull} value={missions.utm ? missions.utm : '0.000000'} style={{ width: '48%', marginTop: '10px' }} id="filled-basic" label="utm" variant="filled" disabled />
                <TextField error={isNull} value={missions.mgrs ? missions.mgrs : '0.000000'} style={{ width: '48%', marginTop: '10px' }} id="filled-basic" label="mgrs" variant="filled" disabled />
              </Box>
              <IconButton size='small' style={{ marginTop: '10px' }} color='success' onClick={() => setOpen(true)}>
                <AddLocationAltIcon />
              </IconButton>
            </Stack>

          </Box>
        </Box>

        <Divider />
        <Box sx={{ p: 2 }}>
          {/* <Stack spacing={1} style={{ margin: '10px 40px' }}>
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
          </Stack> */}
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-around', width: '100%' }}>
            <Button onClick={(e) => history.back()} style={{ width: '8rem' }} variant='contained' color='error'>ยกเลิก</Button>
            {
              mission_id.includes(NIL) ?
                <Button onClick={onCreateMission} style={{ width: '8rem' }} variant='contained' color='primary'>สร้าง</Button> :
                <Button onClick={onUpdateMission} style={{ width: '8rem' }} variant='contained' color='primary'>แก้ไก</Button>

            }
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


