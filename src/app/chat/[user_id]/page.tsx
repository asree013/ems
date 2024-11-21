'use client'
import * as React from 'react';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Toolbar from '@mui/material/Toolbar';
import AppBarChat from './components/AppBarChat';
import DrawerChat from './components/DrawerChat';
import ChatItem from './components/ChatItem';

const drawerWidth = 300;

type Props = { 
    params: {
        user_id: string
    }
}

export default function page(props: Props) {
    const [mobileOpen, setMobileOpen] = React.useState(false);
    const [isClosing, setIsClosing] = React.useState(false);

    const container = typeof window !== 'undefined' ? () => window.document.body : undefined;

    return (
        <Box sx={{ display: 'flex' }}>
            <CssBaseline />
            <AppBarChat isClosing={isClosing} mobileOpen={mobileOpen} setMobileOpen={setMobileOpen} drawerWidth={drawerWidth} />
            <DrawerChat
                container={container}
                drawerWidth={drawerWidth}
                mobileOpen={mobileOpen}
                setIsClosing={setIsClosing}
                setMobileOpen={setMobileOpen}
            />
            <Box
                component="main"
                sx={{ flexGrow: 1, p: 3, width: { sm: `calc(100% - ${drawerWidth}px)` } }}
            >
                <Toolbar />
                <ChatItem />
            </Box>
        </Box>
    );
}
