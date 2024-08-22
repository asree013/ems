'use client';

import * as React from 'react';
import FileCopyIcon from '@mui/icons-material/FileCopyOutlined';
import SaveIcon from '@mui/icons-material/Save';
import MessageIcon from '@mui/icons-material/Message';
import { Badge, BadgeProps, Box, Chip, Fab, IconButton, Paper, styled } from '@mui/material';

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

import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';

import ToggleButton from '@mui/material/ToggleButton';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';


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

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function CustomTabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

export default function ChatButton() {
  const [open, setOpen] = React.useState<boolean>(false);
  const [openChat, setOpenChat] = React.useState<boolean>(false);
  const [mission_id, setMissionId] = React.useState<string>('');
  const [currentChat, setCurrentChat] = React.useState<CurrenChat>({} as CurrenChat)
  const [user_id, setUserId] = React.useState<string>('');
  const [message, setMessage] = React.useState<string>('');
  const inputRef = React.useRef<HTMLInputElement>(null);
  const [messages, setMessages] = React.useState<Chats[]>([]);
  const [room_id, setRoomId] = React.useState<string>('');

  const [value, setValue] = React.useState(0);
  const [selected, setSelected] = React.useState(true);

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
        setMissionId(result.data.id);
        setMission(result.data);
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

  const handleChangeMessage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setMessage(event.target.value);
    inputRef.current?.focus();
  };

  function onSendMessage(e: React.ChangeEvent<HTMLFormElement>) {
    e.preventDefault()
    socket.emit('send-message', {
      room_id: room_id,
      message: message,
      user_id: user_id,
    });
    setMessage('')
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  React.useEffect(() => {
    getMissionIdBylocalstorage();

    socket.off('receive-message');  // ยกเลิกการลงทะเบียนก่อน
    socket.on('receive-message', (arrmessage: Chats) => {
      const arr = arrmessage
      arr.post_date = new Date().toLocaleString('th-TH')
      setMessages((prevMessages) => [...prevMessages, arrmessage]);
      console.log(messages);

    });

    // return () => {
    //   socket.off('receive-message');
    // };
  }, [getMissionIdBylocalstorage]);

  const WindowChat = () => <div>
    <ListItem sx={{ display: 'flex', alignItems: 'center', justifyContent: 'start' }}>
      <Button onClick={() => {
        setOpenChat(false)
        setMessages([])
        setCurrentChat({} as CurrenChat)
      }} variant='plain' color='neutral'><ArrowBackIosIcon /></Button>
      <ListItemAvatar>
        {currentChat.is_online ? (
          <StyledBadge badgeContent=" " color="success">
            <Avatar alt="Cindy Baker" sx={{width: '2rem', height: '2rem'}} src={currentChat.image_chat} />
          </StyledBadge>
        ) : (
          <StyledBadge badgeContent=" " color="error">
            <Avatar alt="Cindy Baker" sx={{width: '2rem', height: '2rem'}} src={currentChat.image_chat} />
          </StyledBadge>
        )}
      </ListItemAvatar>
      <Box>
        <Typography sx={{ fontSize: '1.3rem', fontWeight: 700 }}>
          {currentChat.title}
        </Typography>

      </Box>

    </ListItem>

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
    <form onSubmit={onSendMessage}>

      <Input type='text' value={message} autoFocus onChange={handleChangeMessage} ref={inputRef}  endDecorator={
        <Button
          variant="solid"
          color="primary"
          type="submit"
          sx={{ borderTopLeftRadius: 0, borderBottomLeftRadius: 0 }}
        >
          ส่ง
        </Button>
      } />
    </form>
  </div>

  function ChatTab() {
    return (
      <>

        {
          openChat === false ?
            <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper', cursor: 'pointer' }}>

              {/* <Divider>
                <Chip label="แชทส่วนตัว" size="small" />
              </Divider> */}

              <ListItem alignItems="flex-start">
                <ListItemAvatar>
                  <Avatar alt="Travis Howard" src="" />
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
                  <Avatar alt="Cindy Baker" src="" />
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
            <WindowChat />
        }
      </>
    )
  }

  function PersonalTab() {
    return (
      <>

        {
          openChat === false ?
            <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper', cursor: 'pointer' }}>

              <Divider>
                <Chip label="แชทศูนย์ AOC" size="small" />
              </Divider>

              <ListItem alignItems="flex-start">
                <ListItemAvatar>
                  <Avatar alt="Remy Sharp" src="" />
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
                  <Avatar alt="Travis Howard" src="" />
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
                  <Avatar alt="Cindy Baker" src="" />
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
            <WindowChat />
        }
      </>
    )
  }

  return (
    <>
      <ToggleButton
        value="check"
        selected={selected}
        size='large'
        onChange={(e) => {
          setSelected(!selected)
          if (e.currentTarget.ariaPressed === 'true') {
            setOpen(true)
          }
          else {
            setOpen(false);
            setMessage('')
          }
        }}
        color='warning'
        className={chatCss.positionChat}
      >
        {
          open ?
            <ArrowUpwardIcon fontSize='large' color='inherit' /> :
            <MessageIcon fontSize='large' color='inherit' />
        }
      </ToggleButton>


      {
        open ?
          <Paper elevation={8} className={chatCss.bodyCard}>
            <Sheet
              className={chatCss.chat_size}
            >
              <Box sx={{ width: '100%' }}>

                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
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
                  <div
                    style={{ cursor: 'pointer', borderRadius: '50%', backgroundColor: 'transparent' }}
                    onClick={() => {
                      setSelected(!selected);
                      setOpen(false);
                      setMessage('');
                    }}
                  >
                    <ModalClose variant='outlined' color='neutral' />
                  </div>
                </div>
                <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                  {
                    openChat === false ?
                      <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
                        <Tab label="การพูดคุย" {...a11yProps(0)} />
                        <Tab label="รายชื่อติดต่อ" {...a11yProps(1)} />
                      </Tabs> :
                      null
                  }
                </Box>
                <CustomTabPanel value={value} index={0}>
                  <ChatTab />
                </CustomTabPanel>
                <CustomTabPanel value={value} index={1}>
                  <PersonalTab />
                </CustomTabPanel>
              </Box>

            </Sheet>
          </Paper> :
          null
      }

    </>
  );


}


