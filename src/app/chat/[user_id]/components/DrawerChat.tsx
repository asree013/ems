'use client'
import { Avatar, Box, Divider, Drawer, IconButton, InputAdornment, List, ListItem, ListItemButton, ListItemIcon, ListItemText, TextField, Toolbar } from '@mui/material'
import React, { Dispatch, SetStateAction, useContext, useState } from 'react'
import MailIcon from '@mui/icons-material/Mail';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import SearchIcon from '@mui/icons-material/Search';
import { Communicates } from '@/models/communicate.model';
import { Button } from '@mui/joy';
import { useParams } from 'next/navigation';
import Loadding from '@/components/Loadding';
import { CommunicateMeContext, TCommunicateMeContext } from '../communicateMe.context';

type Props = {
    drawerWidth: number
    mobileOpen: boolean
    container: (() => HTMLElement) | undefined
    setIsClosing: Dispatch<SetStateAction<boolean>>
    setMobileOpen: Dispatch<SetStateAction<boolean>>
}


export default function DrawerChat({ drawerWidth, mobileOpen, container, setIsClosing, setMobileOpen }: Props) {
    const params = useParams()
    const {communicateMe, setCommunicateMe} = useContext<TCommunicateMeContext>(CommunicateMeContext)
    const handleDrawerClose = () => {
        setIsClosing(true);
        setMobileOpen(false);
    };
    const [load, setLoad] = useState(false)

    const handleDrawerTransitionEnd = () => {
        setIsClosing(false);
    };

    const drawer = (
        <div>
            <Toolbar />
            <Divider />
            <Button onClick={() => {
                setLoad(true)
                window.location.href = '/chat/' + params.user_id + '/add_friend'
            }} variant='outlined' sx={{ margin: '10px', width: '90%', fontSize: '1.1rem' }}>เพื่มเพื่อน</Button>
            <TextField sx={{ width: '90%', margin: '10px' }} id="outlined-basic" label="ค้นหารายชื่อ" variant="outlined" slotProps={{
                input: {
                    endAdornment: (
                        <InputAdornment position='end'>
                            <IconButton>
                                <SearchIcon />
                            </IconButton>
                        </InputAdornment>
                    )
                }
            }} />
            <Divider />
            <List>
                {
                    Array.isArray(communicateMe) ?
                        null :
                        communicateMe.Joiner?.map((r, i) =>
                            <ListItem disablePadding key={i}>
                                <ListItemButton onClick={handleDrawerClose}>
                                    <ListItemIcon>
                                        <Avatar sx={{ width: 30, height: 30 }} src='' />
                                    </ListItemIcon>
                                    <ListItemText primary={'สมชาย สมหมาย'} />
                                </ListItemButton>
                            </ListItem>
                        )
                }

            </List>
        </div>
    );

    return (
        <>
            <div>
                <Box
                    component="nav"
                    sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
                    aria-label="mailbox folders"
                >
                    <Drawer
                        container={container}
                        variant="temporary"
                        open={mobileOpen}
                        onTransitionEnd={handleDrawerTransitionEnd}
                        onClose={handleDrawerClose}
                        ModalProps={{
                            keepMounted: true,
                        }}
                        sx={{
                            display: { xs: 'block', sm: 'none' },
                            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth, zIndex: 0 },
                        }}
                    >
                        {drawer}
                    </Drawer>
                    <Drawer
                        variant="permanent"
                        sx={{
                            display: { xs: 'none', sm: 'block' },
                            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
                        }}
                        open
                    >
                        {drawer}
                    </Drawer>
                </Box>
            </div>

            {
                load?
                <Loadding />:
                null
            }
        </>
    )
}
