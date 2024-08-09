'use client'
import * as React from 'react';
import FileCopyIcon from '@mui/icons-material/FileCopyOutlined';
import SaveIcon from '@mui/icons-material/Save';
import MessageIcon from '@mui/icons-material/Message';
import { Chip, Fab } from '@mui/material';

import Input from '@mui/joy/Input';

import Button from '@mui/joy/Button';
import Modal from '@mui/joy/Modal';
import ModalClose from '@mui/joy/ModalClose';
import Typography from '@mui/joy/Typography';
import Sheet from '@mui/joy/Sheet';

import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Divider from '@mui/material/Divider';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import TypographyM from '@mui/material/Typography';
import { findMissionByMissionId } from '@/services/mission.service';
import { Missions } from '@/models/mission.model';
import { timeOutJwt } from '@/services/timeout.service';
import { socket } from '@/configs/socket';


const actions = [
  { icon: <FileCopyIcon />, name: 'Mission' },
  { icon: <SaveIcon />, name: 'AOC' },
];

export default function ChatButton() {
  const [open, setOpen] = React.useState<boolean>(false)
  const [openChat, setOpenChat] = React.useState<boolean>(false)
  const [mission_id, setMissionId] = React.useState<string>('')
  const [user_id, setUserId] = React.useState<string>('')

  const [mission, setMission] = React.useState<Missions>({} as Missions)

  const getMissionIdBylocalstorage = React.useCallback(async () => {
    const missId = localStorage.getItem('mission_id')
    const userId = localStorage.getItem('mission_id')
    if (missId && userId) {
      setMissionId(missId)
      setUserId(userId)
      try {
        const result = await findMissionByMissionId(missId)
        setMission(result.data)
      } catch (error) {
        timeOutJwt(error)
      }
    }
  }, [setMissionId])

  function onOpenChatAndChatId(chat_id: string) {
    setOpenChat(true)
    socket.emit('join-room', {room_id: chat_id, usre_id: user_id})
  }

  React.useEffect(() => {
    getMissionIdBylocalstorage()
  }, [getMissionIdBylocalstorage])
  return (
    <>
      <Fab color='warning' onClick={() => setOpen(true)}>
        <MessageIcon color='inherit' />
      </Fab>

      <Modal
        aria-labelledby="modal-title"
        aria-describedby="modal-desc"
        open={open}
        onClose={() => {
          setOpen(false)
          setOpenChat(false)
        }}
        sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}
      >
        <Sheet
          variant="outlined"
          sx={{
            maxWidth: 500,
            borderRadius: 'md',
            p: 3,
            boxShadow: 'lg',
          }}
        >
          <ModalClose variant="plain" sx={{ m: 1 }} />
          <Typography
            component="h2"
            id="modal-title"
            level="h4"
            textColor="inherit"
            fontWeight="lg"
            mb={1}
          >
            Chat mobile
          </Typography>
          {
            openChat === false ?
              <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>

                <Divider>
                  <Chip label="แชทกลุ่มภารกิจ" size="small" />
                </Divider>

                <ListItem alignItems="flex-start" onClick={() => onOpenChatAndChatId(mission.id)}>
                  <ListItemAvatar>
                    <Avatar alt="Remy Sharp" src={mission.image} />
                  </ListItemAvatar>
                  <ListItemText
                    primary={mission.title}
                  />
                </ListItem>

                <Divider>
                  <Chip label="แชทศูนย์ AOC" size="small" />
                </Divider>

                <ListItem alignItems="flex-start">
                  <ListItemAvatar>
                    <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
                  </ListItemAvatar>
                  <ListItemText
                    primary="Brunch this weekend?"
                  />
                </ListItem>

                <Divider>
                  <Chip label="แชทส่วนตัว" size="small" />
                </Divider>


                <ListItem alignItems="flex-start">
                  <ListItemAvatar>
                    <Avatar alt="Travis Howard" src="/static/images/avatar/2.jpg" />
                  </ListItemAvatar>
                  <ListItemText
                    primary="Summer BBQ"
                    secondary={
                      <React.Fragment>
                        <TypographyM
                          sx={{ display: 'inline' }}
                          component="span"
                          variant="body2"
                          color="text.primary"
                        >
                          to Scott, Alex, Jennifer
                        </TypographyM>
                        {" — Wish I could come, but I'm out of town this…"}
                      </React.Fragment>
                    }
                  />
                </ListItem>

                <Divider variant="inset" component="li" />

                <ListItem alignItems="flex-start">
                  <ListItemAvatar>
                    <Avatar alt="Cindy Baker" src="/static/images/avatar/3.jpg" />
                  </ListItemAvatar>
                  <ListItemText
                    primary="Oui Oui"
                    secondary={
                      <React.Fragment>
                        <TypographyM
                          sx={{ display: 'inline' }}
                          component="span"
                          variant="body2"
                          color="text.primary"
                        >
                          Sandra Adams
                        </TypographyM>
                        {' — Do you have Paris recommendations? Have you ever…'}
                      </React.Fragment>
                    }
                  />
                </ListItem>
              </List> :
              <div>
                <Input type='text' endDecorator={
                  <Button
                    variant="solid"
                    color="primary"
                    type="submit"
                    sx={{ borderTopLeftRadius: 0, borderBottomLeftRadius: 0 }}
                  >
                    ส่ง
                  </Button>
                } />
              </div>
          }
        </Sheet>
      </Modal>
    </>
  );
}