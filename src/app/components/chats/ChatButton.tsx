'use client';

import { enviromentDev } from '@/configs/enviroment.dev';
import { socket } from '@/configs/socket.config';
import { RoomChats, Chats } from '@/models/chat.model';
import { MissionById } from '@/models/mission.model';
import { toast } from '@/services/alert.service';
import { feedMessageChatByRoomId, findChatRoomAll, mapDataHistoryToChat } from '@/services/chat.service';
import { findMissionByMissionId, findMissionCurrent } from '@/services/mission.service';
import { timeOutJwt } from '@/services/timeout.service';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import MessageIcon from '@mui/icons-material/Message';
import Button from '@mui/joy/Button';
import CircularProgress from '@mui/joy/CircularProgress';
import Input from '@mui/joy/Input';
import ModalClose from '@mui/joy/ModalClose';
import Sheet from '@mui/joy/Sheet';
import Typography from '@mui/joy/Typography';
import { Badge, BadgeProps, Box, Chip, Paper } from '@mui/material';
import Avatar from '@mui/material/Avatar';
import Divider from '@mui/material/Divider';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemText from '@mui/material/ListItemText';
import { styled as styleMui } from '@mui/material/styles';
import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';
import ToggleButton from '@mui/material/ToggleButton';
import TypographyM from '@mui/material/Typography';
import Link from 'next/link';
import * as React from 'react';
import styled from 'styled-components';
import { NIL } from 'uuid';


const PopupButton = styled.div`
    .chatModal {
        width: 270px;
        height: 220px;
        padding: 5px;
        overflow-y: scroll;
    }

    .is_not_my_user {
        display: flex;
        justify-content: start;
        align-items: start;
        width: 100%; 
        margin-top: 10px;
        flex-direction: column;
    }
    .is_user{
        display: flex;
        justify-content: end;
        align-items: end;
        width: 100%; 
        margin-top: 10px;
        flex-direction: column;
    }
    .not_user{
        background: #e5e3e3;
        color: rgb(0, 0, 0);
        padding: 2px 8px;
        border-radius: 8px;
    }

    .user{
        background: #1769aa;
        color: aliceblue;
        padding: 2px 8px;
        border-radius: 8px;
    }

    @media only screen and (max-width: 450px) {
        .positionChat{
            right: 15px;
        }
        .chat_size {
            height: 25rem;
            width: 20rem;
        }
    }

    /* @media only screen and (min-width: 768px) {
      .positionChat{
          top: 900px;
          right: 3rem;
      }
      .chat_size {
          height: 25rem;
          width: 20rem;
      }
      .bodyCard{
          top: 480px;
          right: 3rem;
      }
    } */


  @media only screen and (max-width: 1370px) {
      .chat_size {
          height: 25rem;
          width: 20rem;
      }

    }
  `

type CurrenChat = {
  chat_id: string,
  title: string,
  is_online: boolean,
  image_chat: string
}

const StyledBadge = styleMui(Badge)<BadgeProps>(({ theme }) => ({
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
  const [chatRoom, setChatRoom] = React.useState<RoomChats[]>({} as RoomChats[])
  const [loadMessage, setLoadMessage] = React.useState<boolean>(false)

  const [value, setValue] = React.useState(0);
  const [selected, setSelected] = React.useState(true);

  const [mission, setMission] = React.useState<MissionById>({} as MissionById);

  const messagesEndRef = React.useRef<HTMLDivElement>(null);

  const chatBox = React.useRef<HTMLDivElement | null>(null);
  const messagePage = React.useRef<number>(1)
  const [loadingOlderMessages, setLoadingOlderMessages] = React.useState(false);
  const [onloadOld, setOnloadOld] = React.useState(false);


  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView();
  };

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

  async function onOpenChatAndChatId(chat_id: string, key: string) {
    setLoadMessage(true);
    setOpenChat(true);
    setRoomId(chat_id);

    // ส่ง event 'join-room' ไปที่ server เพื่อให้ user เข้าร่วมห้องแชท
    socket.emit('join-room', { room_id: chat_id, user_id: user_id });

    if (key === 'mis') {
      setCurrentChat({ ...currentChat, chat_id: room_id, title: mission.title, is_online: true, image_chat: mission.image });
    }

    try {
      const result = await feedMessageChatByRoomId(chat_id, 1, 10);
      const mapMessage = await mapDataHistoryToChat(result.data);
      setMessages(mapMessage);
    } catch (error: any) {
      toast(JSON.stringify(error.message), 'error');
    } finally {
      setLoadMessage(false);
    }
  }


  const handleChangeMessage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setMessage(event.target.value);
    inputRef.current?.focus();
  };

  async function feedChatRoom() {
    try {
      const result = await findChatRoomAll()
      console.log(result.data);
      setChatRoom(result.data)
    } catch (error) {
      // timeOutJwt(error)
    }
  }

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

    });

    // return () => {
    //   socket.off('receive-message');
    // };


  }, [getMissionIdBylocalstorage]);

  React.useEffect(() => {
    if (openChat && !loadingOlderMessages) {
      scrollToBottom();
    }
  }, [openChat, onSendMessage]);


  const WindowChat = () => <div>
    <ListItem sx={{ display: 'flex', alignItems: 'center', justifyContent: 'start' }}>
      <Button onClick={() => {
        setOpenChat(false)
        setMessages([])
        setCurrentChat({} as CurrenChat)
        setLoadingOlderMessages(false)
        messagePage.current = 1
      }} variant='plain' color='neutral'><ArrowBackIosIcon /></Button>
      <ListItemAvatar>
        {currentChat.is_online ? (
          <StyledBadge badgeContent=" " color="success">
            <Avatar alt="Cindy Baker" sx={{ width: '2rem', height: '2rem' }} src={currentChat.image_chat} />
          </StyledBadge>
        ) : (
          <StyledBadge badgeContent=" " color="error">
            <Avatar alt="Cindy Baker" sx={{ width: '2rem', height: '2rem' }} src={currentChat.image_chat} />
          </StyledBadge>
        )}
      </ListItemAvatar>
      <Box>
        <Typography sx={{ fontSize: '1.3rem', fontWeight: 700 }}>
          {currentChat.title}
        </Typography>

      </Box>

    </ListItem>

    <div>
      <div className='chatModal' ref={chatBox} onScroll={async (e) => {
        if (chatBox.current?.scrollTop === 0) {
          const scrollHeightBefore = chatBox.current.scrollHeight; // เก็บความสูงก่อน
          setLoadingOlderMessages(true)
          setOnloadOld(true)
          messagePage.current = messagePage.current === 1 ? 2 : messagePage.current + 1; // เพิ่ม page

          try {
            const newMessage = await feedMessageChatByRoomId(room_id, messagePage.current, 10);
            const mapMessage = await mapDataHistoryToChat(newMessage.data);

            setMessages((prev) => [...mapMessage, ...prev]);
            // setLoadingOlderMessages(false)

          } catch (error) {
            console.log(error);

          } finally {
            setOnloadOld(false)
          }

          // ให้ scroll กลับไปที่ตำแหน่งเดิม
          chatBox.current.scrollTop = chatBox.current.scrollHeight - scrollHeightBefore;
        }
      }}>
        {
          onloadOld ?
            <Divider textAlign="center">กำลังโหลดข้อความเก่า</Divider> :
            null
        }
        {
          messages.length > 0 ?
            messages.map((r, i) => {
              if (r.user_id === user_id) {
                return (
                  <div key={i} className={'is_user'}>
                    <p style={{ fontSize: '12px' }}>{r.name_send}</p>
                    <div style={{ display: 'flex' }}>
                      <p className={'user'}>{r.message}</p>
                    </div>
                    <p style={{ fontSize: '10px' }}>{r.post_date}</p>
                  </div>
                );
              } else {
                return (
                  <div key={i} className={'is_not_my_user'}>
                    <p style={{ fontSize: '12px' }}>{r.name_send}</p>
                    <div style={{ display: 'flex' }}>
                      <Avatar style={{ marginRight: '3px', height: '2rem', width: '2rem' }} src={r.avatar} />
                      <p className={'not_user'}>{r.message}</p>
                    </div>
                    <p style={{ fontSize: '10px' }}>{r.post_date}</p>
                  </div>
                );
              }
            })
            :
            null
        }
        {
          loadMessage ?
            <div className='w-full h-full' style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <p style={{ fontWeight: 700 }}>โหลดข้อความ</p>
                <CircularProgress size="sm" sx={{ marginLeft: '10px' }} />
              </div>
            </div> :
            null
        }
        <div ref={messagesEndRef} />
      </div>
      <form onSubmit={onSendMessage} style={{marginTop: '10px'}}>
        <Input type='text' value={message} autoFocus onChange={handleChangeMessage} ref={inputRef} endDecorator={
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
            <div style={{ overflow: 'scroll', height: 270, width: 270 }}>
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

                {
                  Object.keys(chatRoom).length === 0 ?
                    <p>ไม่มีคนออนไลน์</p> :
                    chatRoom.map((r, i) =>
                      <div key={i}>
                        <ListItem alignItems="flex-start" onClick={() => onOpenChatAndChatId(r.room_id, 'mis')}>
                          <ListItemAvatar>
                            <Avatar alt="Travis Howard" src={enviromentDev.noImage} />
                          </ListItemAvatar>
                          <ListItemText
                            primary={r.room_name}
                            secondary={
                              <React.Fragment>
                                <TypographyM
                                  sx={{ display: 'inline' }}
                                  component="span"
                                  variant="body2"
                                  color="text.primary"
                                >
                                  {r.room_name}
                                </TypographyM>
                                {" — Wish I could come, but I'm out of town this…"}
                              </React.Fragment>
                            }
                          />
                        </ListItem>

                        <Divider variant="inset" component="li" />
                      </div>
                    )
                }

              </List>
            </div> :
            <WindowChat />
        }
      </>
    )
  }

  return (
    <>
      <PopupButton>
        <ToggleButton
        sx={{borderRadius: '2rem',position: 'fixed', bottom: 86, right: 16}}
          className={'positionChat'}
          value="check"
          selected={selected}
          size='large'
          onChange={(e) => {
            setSelected(!selected)
            if (e.currentTarget.ariaPressed === 'true') {
              setOpen(true)
              feedChatRoom()
            }
            else {
              setOpen(false);
              setMessage('')
            }
          }}
          color='warning'
        >
          {
            open ?
              <ArrowUpwardIcon fontSize='large' color='inherit' /> :
              <MessageIcon fontSize='large' color='inherit' />
          }
        </ToggleButton>
      </PopupButton>

      {
        open ?
          <PopupButton>
            <Paper elevation={8} sx={{bottom: 166, right: 25,position: 'fixed', zIndex: 4, width: 340, padding: 2}}>
              <Sheet
                className={'chat_size'}
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
            </Paper>
          </PopupButton>
          :
          null
      }

    </>
  );


}


