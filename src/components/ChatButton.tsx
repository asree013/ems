'use client';

import * as React from 'react';
import FileCopyIcon from '@mui/icons-material/FileCopyOutlined';
import SaveIcon from '@mui/icons-material/Save';
import MessageIcon from '@mui/icons-material/Message';
import { Badge, BadgeProps, Box, Chip, Fab, styled } from '@mui/material';

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
import { findMissionByMissionId, findMissionCurrent } from '@/services/mission.service';
import { Missions } from '@/models/mission.model';
import { timeOutJwt } from '@/services/timeout.service';
import { socket } from '@/configs/socket';

import chatCss from './styles/chat.module.css';
import { Chats } from '@/models/chat.model';
import Link from 'next/link';
import { NIL } from 'uuid';

const actions = [
  { icon: <FileCopyIcon />, name: 'Mission' },
  { icon: <SaveIcon />, name: 'AOC' },
];

type CurrenChat = {
  chat_id: string,
  title: string,
  is_online: boolean,
  image_chat: string
}

const StyledBadge = styled(Badge)<BadgeProps>(({ theme }) => ({
  '& .MuiBadge-badge': {
    right: 0,
    top: 5,
    border: `2px solid ${theme.palette.background.paper}`,
    padding: '0 4px',
  },
}));

export default function ChatButton() {
  const [open, setOpen] = React.useState<boolean>(false);
  const [openChat, setOpenChat] = React.useState<boolean>(false);
  const [mission_id, setMissionId] = React.useState<string>('');
  const [currentChat, setCurrentChat] = React.useState<CurrenChat>({} as CurrenChat)
  const [user_id, setUserId] = React.useState<string>('');
  const [message, setMessage] = React.useState<string>('');
  const [messages, setMessages] = React.useState<Chats[]>([]);
  const [room_id, setRoomId] = React.useState<string>('');

  const [mission, setMission] = React.useState<Missions>({} as Missions);

  const getMissionIdBylocalstorage = React.useCallback(async () => {
    const missId = localStorage.getItem('mission_id');
    const userId = localStorage.getItem('user_id');
    if (missId && userId) {
      setMissionId(missId);
      setUserId(userId);
      try {
        const result = await findMissionByMissionId(missId);
        setMission(result.data);
      } catch (error) {
        timeOutJwt(error);
      }
    }
    if (!missId && userId) {
      try {
        const result = await findMissionCurrent()
        setMissionId(result.data[0].id);
        setMission(result.data[0]);
        setUserId(userId);
      } catch (error) {
        timeOutJwt(error)
      }
    }
  }, []);

  function onOpenChatAndChatId(chat_id: string, key: string) {
    setOpenChat(true);
    setRoomId(chat_id);
    socket.emit('join-room', { room_id: chat_id, user_id: user_id });
    if (key === 'mis') {
      setCurrentChat({ ...currentChat, chat_id: room_id, title: mission.title, is_online: true, image_chat: mission.image })
    }
  }

  function onSendMessage() {
    socket.emit('send-message', {
      room_id: room_id,
      message: message,
      user_id: user_id,
    });
    setMessage('')
  }

  React.useEffect(() => {
    getMissionIdBylocalstorage();

    socket.off('receive-message');  // ยกเลิกการลงทะเบียนก่อน
    socket.on('receive-message', (arrmessage: Chats) => {
      const arr = arrmessage
      arr.post_date = new Date().toLocaleString('th-TH')
      setMessages((prevMessages) => [...prevMessages, arrmessage]);
      console.log(messages);
      
    });

    // ล้าง event listener เมื่อ component ถูกถอด
    return () => {
      socket.off('receive-message');
    };
  }, [getMissionIdBylocalstorage]);

  return (
    <>
      <Fab size='large' variant='extended' className={chatCss.positionChat} color='warning' onClick={() => setOpen(true)}>
        <MessageIcon fontSize='large' color='inherit' />
      </Fab>

      <Modal
        aria-labelledby="modal-title"
        aria-describedby="modal-desc"
        open={open}
        onClose={() => {
          setOpen(false);
          setOpenChat(false);
          setMessage('')
          setMessages([])
          setCurrentChat({} as CurrenChat)
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
          {
            openChat === false ?
              <Typography
                component="h2"
                id="modal-title"
                level="h4"
                textColor="inherit"
                fontWeight="lg"
                mb={1}
              >
                Chat mobile
              </Typography> :
              <ListItem alignItems="flex-start">
                <ListItemAvatar>
                  {
                    currentChat.is_online === true ?
                      <StyledBadge badgeContent color="success">
                        <Avatar alt="Cindy Baker" src={currentChat.image_chat} />
                      </StyledBadge> :
                      <StyledBadge badgeContent color="error">
                        <Avatar alt="Cindy Baker" src={currentChat.image_chat} />
                      </StyledBadge>
                  }
                </ListItemAvatar>
                <Box>
                  <Typography sx={{ fontSize: '1.5rem', fontWeight: 700 }}>
                    {currentChat.title}
                  </Typography>

                </Box>

              </ListItem>
          }

          {
            openChat === false ?
              <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>

                <Divider>
                  <Chip label="แชทศูนย์ AOC" size="small" />
                </Divider>

                <ListItem alignItems="flex-start">
                  <ListItemAvatar>
                    <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
                  </ListItemAvatar>
                  <ListItemText
                    primary="ผู้ดูแล/ควบคุม/ศูนย์ AOC"
                  />
                </ListItem>

                <Divider>
                  <Chip label="แชทกลุ่มภารกิจ" size="small" />
                </Divider>

                {
                  Object.keys(mission).length === 0 ?
                    <Box>
                      <Typography>ยังไม่มีภารกิจ</Typography>
                      <Link href={'/mission/' + NIL}>
                        <p>คลิกเพื่อเลือกภารกิจ</p>
                      </Link>
                    </Box> :
                    <ListItem alignItems="flex-start" onClick={() => onOpenChatAndChatId(mission.id, 'mis')}>
                      <ListItemAvatar>
                        <Avatar alt="Remy Sharp" src={mission.image} />
                      </ListItemAvatar>
                      <ListItemText
                        primary={mission.title}
                      />
                    </ListItem>
                }

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

                <div className={chatCss.chat}>
                  {
                    messages.length > 0 ?
                      messages.map((r, i) => {
                        if (r.user_id === user_id) {
                          return (
                            <div key={i} className={chatCss.is_user}>
                              <p style={{ fontSize: '12px' }}>{r.name_send}</p>
                              <div style={{ display: 'flex' }}>
                                <p className={chatCss.user}>{r.message}</p>
                                <Avatar style={{ marginLeft: '3px', height: '2rem', width: '2rem' }} src={r.avatar} />
                              </div>
                              <p style={{ fontSize: '10px' }}>{r.post_date}</p>
                            </div>
                          );
                        } else {
                          return (
                            <div key={i} className={chatCss.is_not_my_user}>
                              <p style={{ fontSize: '12px' }}>{r.name_send}</p>
                              <div style={{ display: 'flex' }}>
                                <Avatar style={{ marginRight: '3px', height: '2rem', width: '2rem' }} src={r.avatar} />
                                <p className={chatCss.not_user}>{r.message}</p>
                              </div>
                              <p style={{ fontSize: '10px' }}>{r.post_date}</p>
                            </div>
                          );
                        }
                      })
                      :
                      null
                  }
                </div>
                <Input type='text' value={message} onChange={(e) => setMessage(e.target.value)} endDecorator={
                  <Button
                    variant="solid"
                    color="primary"
                    type="button"
                    sx={{ borderTopLeftRadius: 0, borderBottomLeftRadius: 0 }}
                    onClick={onSendMessage}
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
