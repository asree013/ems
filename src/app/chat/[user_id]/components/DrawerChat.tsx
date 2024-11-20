'use client'
import { Avatar, Box, Divider, Drawer, IconButton, InputAdornment, List, ListItem, ListItemButton, ListItemIcon, ListItemText, TextField, Toolbar } from '@mui/material'
import React, { Dispatch, SetStateAction } from 'react'
import MailIcon from '@mui/icons-material/Mail';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import SearchIcon from '@mui/icons-material/Search';

type Props = {
    drawerWidth: number
    mobileOpen: boolean
    container: (() => HTMLElement) | undefined
    setIsClosing: Dispatch<SetStateAction<boolean>>
    setMobileOpen: Dispatch<SetStateAction<boolean>>
}


export default function DrawerChat({ drawerWidth, mobileOpen, container, setIsClosing, setMobileOpen }: Props) {
    const handleDrawerClose = () => {
        setIsClosing(true);
        setMobileOpen(false);
    };

    const handleDrawerTransitionEnd = () => {
        setIsClosing(false);
    };
    const drawer = (
        <div>
            <Toolbar />
            <Divider />
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
                <ListItem disablePadding>
                    <ListItemButton onClick={handleDrawerClose}>
                        <ListItemIcon>
                            <Avatar sx={{ width: 30, height: 30 }} src='' />
                        </ListItemIcon>
                        <ListItemText primary={'สมชาย สมหมาย'} />
                    </ListItemButton>
                </ListItem>
            </List>
        </div>
    );

    return (
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
                        '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
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
    )
}
