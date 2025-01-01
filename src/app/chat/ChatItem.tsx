'use client'
import { Badge, Button, Card, Divider, IconButton, ToggleButton } from '@mui/material'
import React, { useCallback, useEffect, useState } from 'react'
import styled from 'styled-components'
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import MessageIcon from '@mui/icons-material/Message';
import CloseIcon from '@mui/icons-material/Close';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import Avatar from '@mui/joy/Avatar';
import List from '@mui/joy/List';
import ListItem from '@mui/joy/ListItem';
import ListItemDecorator from '@mui/joy/ListItemDecorator';
import { RoomChats } from '@/models/chat.model';
import { findChatRoomAll } from '@/services/chat.service';
import { toast } from '@/services/alert.service';
import { timeOutJwt } from '@/services/timeout.service';
import { CircularProgress, Input } from '@mui/joy';
import CallIcon from '@mui/icons-material/Call';
import VideocamIcon from '@mui/icons-material/Videocam';
import MenuIcon from '@mui/icons-material/Menu';
import SendIcon from '@mui/icons-material/Send';

const ChatHeader = styled.div`
    height: 40px;
    width: 100%;
    background: linear-gradient(125deg, #021B79, #0575E6);
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 8px;
    color: white;
    font-size: 20px;
`

const ChatHeaderText = styled.div`
    height: 55px;
    width: 100%;
    padding: 5px;
    display: flex;
    align-items: center;
    justify-content: space-between;
`

export default function ChatItem() {
    const [selected, setSelected] = React.useState(true);
    const [open, setOpen] = React.useState<boolean>(false);
    const [currentRoomId, setCurrentRoomId] = useState<RoomChats>({} as RoomChats)
    const [loadChat, setLoadChat] = useState<boolean>(false)
    const [roomChat, setRoomChat] = useState<RoomChats[]>({} as RoomChats[])

    const onFeedUserOnline = useCallback(async () => {
        setLoadChat(true)
        try {
            const result = await findChatRoomAll()
            setRoomChat(result.data)
        } catch (error: any) {
            toast(error.message, 'error')
        } finally {
            setLoadChat(false)
        }
    }, [setRoomChat])

    useEffect(() => {
        onFeedUserOnline()

        return () => {
            onFeedUserOnline
        }

    }, [onFeedUserOnline])

    return (
        <>
            <ToggleButton
                sx={{ borderRadius: '2rem', position: 'fixed', bottom: 86, right: 16 }}
                value={''}
                selected={selected}
                size='large'
                onChange={(e) => {
                    setSelected(!selected)
                    setOpen(!open)
                }}
                color='warning'
            >
                {
                    open ?
                        <ArrowUpwardIcon fontSize='large' color='inherit' /> :
                        <MessageIcon fontSize='large' color='inherit' />
                }
            </ToggleButton>

            {
                open ? <CardChat /> : null
            }

        </>
    )

    function CardChat() {
        return (
            <Card elevation={4} sx={{ position: 'fixed', bottom: 166, right: 30, width: 320, height: 440, zIndex: 4 }}>
                <ChatHeader>
                    <p>ระบบแชท</p>
                    <IconButton onClick={() => {
                        setOpen(!open)
                        setSelected(!selected)
                    }}>
                        <CloseIcon sx={{ color: 'white' }} />
                    </IconButton>
                </ChatHeader>

                {
                    Object.keys(currentRoomId).length > 0 ?
                        <ChatText /> :
                        <TabChat />
                }
            </Card>
        )
    }

    function LoadingChat() {
        return <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <CircularProgress variant="solid" />
        </div>
    }

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


    function TabChat() {
        const [value, setValue] = React.useState(0);

        const handleChange = (event: React.SyntheticEvent, newValue: number) => {
            setValue(newValue);
        };

        function onChatNow(room: RoomChats) {
            setCurrentRoomId(room)
        }

        return (
            <Box sx={{ width: '100%' }}>
                <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                    <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
                        <Tab label="ออนไลน" {...a11yProps(0)} />
                        <Tab label="เพื่อน" {...a11yProps(1)} />
                        <Tab label="กลุ่ม" {...a11yProps(2)} />
                    </Tabs>
                </Box>
                <CustomTabPanel value={value} index={0}>
                    <div style={{ overflowY: 'scroll', height: 290, padding: '10px' }}>
                        {
                            roomChat.length === 0 ?
                                <p>ไม่มีใครออนไลน์</p> :
                                roomChat.map((r, i) => {
                                    if (r.type === "PTM") {
                                        return <div key={i} onClick={() => onChatNow(r)} className='cursor-pointer'>
                                            <List variant="outlined" sx={{ minWidth: 240, borderRadius: 'sm' }}>
                                                <ListItem >
                                                    <ListItemDecorator>
                                                        <Avatar size="sm" src={r?.owner?.image ?? ""} />
                                                    </ListItemDecorator>
                                                    {r.room_name}
                                                </ListItem>
                                            </List>
                                        </div>
                                    }
                                    else {
                                        return <div key={i} onClick={() => onChatNow(r)} className='cursor-pointer'>
                                            <List variant="outlined" sx={{ minWidth: 240, borderRadius: 'sm' }}>
                                                <ListItem >
                                                    <ListItemDecorator>
                                                        <Avatar size="sm" src={r?.owner?.image ?? ""} />
                                                    </ListItemDecorator>
                                                    {r.owner.first_name} {r.owner.last_name}
                                                </ListItem>
                                            </List>
                                        </div>
                                    }
                                })
                        }
                        {
                            loadChat ?
                                <LoadingChat /> :
                                null
                        }
                    </div>
                    <Divider sx={{ marginTop: '10px' }} />
                </CustomTabPanel>
                <CustomTabPanel value={value} index={1}>
                    <div style={{ overflowY: 'scroll', height: 290, padding: '10px' }}>
                        <List variant="outlined" sx={{ minWidth: 240, borderRadius: 'sm' }}>
                            <ListItem>
                                <ListItemDecorator>
                                    <Avatar size="sm" src="/static/images/avatar/1.jpg" />
                                </ListItemDecorator>
                                Mabel Boyle
                            </ListItem>
                        </List>
                    </div>
                    <Divider sx={{ marginTop: '10px' }} />
                </CustomTabPanel>
                <CustomTabPanel value={value} index={2}>
                    <div style={{ overflowY: 'scroll', height: 260, padding: '10px' }}>
                        <List variant="outlined" sx={{ minWidth: 240, borderRadius: 'sm' }}>
                            <ListItem>
                                <ListItemDecorator>
                                    <Avatar size="sm" src="/static/images/avatar/1.jpg" />
                                </ListItemDecorator>
                                Mabel Boyle
                            </ListItem>
                        </List>
                    </div>
                </CustomTabPanel>
            </Box>
        );
    }

    function ChatText() {
        function onLeafRoom() {
            setCurrentRoomId({} as RoomChats)
        }
        return (
            <div>
                <ChatHeaderText>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <IconButton onClick={onLeafRoom}>
                            <ArrowBackIosIcon />
                        </IconButton>
                        <Badge color={currentRoomId.is_online ? "success" : "default"} badgeContent variant="dot">
                            <Avatar src={currentRoomId?.owner?.image ?? ""} />
                        </Badge>
                        <div style={{ marginLeft: '8px', display: 'flex', flexDirection: 'column', alignItems: 'start', justifyContent: 'center' }}>
                            <p style={{ fontSize: '16px', fontWeight: 400, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', width: 100 }}>{currentRoomId?.owner?.first_name ? currentRoomId.owner.first_name : currentRoomId.room_name} {currentRoomId?.owner?.last_name}</p>
                            {
                                currentRoomId.is_online ?
                                    <p style={{ fontSize: '13px', fontWeight: 600, color: 'green' }}>กำลังใช้งาน</p> :
                                    <p style={{ fontSize: '13px', fontWeight: 600, color: 'gray' }}>ไม่ได้ใช้งาน</p>
                            }
                        </div>
                    </div>
                    <div>
                        <IconButton>
                            <CallIcon color='primary' />
                        </IconButton>
                        <IconButton>
                            <VideocamIcon color='primary' />
                        </IconButton>
                        <IconButton>
                            <MenuIcon color='primary' />
                        </IconButton>
                    </div>
                </ChatHeaderText>
                <Divider variant='fullWidth' />
                <div style={{ width: '100%', position: 'absolute', bottom: 3, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '0 5px' }}>
                    <Input sx={{ width: '100%' }} />
                    <IconButton>
                        <SendIcon fontSize='large' color='primary' />
                    </IconButton>
                </div>
            </div>
        )
    }
}
