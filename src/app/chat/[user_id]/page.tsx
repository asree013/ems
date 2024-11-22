'use client'
import * as React from 'react';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Toolbar from '@mui/material/Toolbar';
import AppBarChat from './components/AppBarChat';
import DrawerChat from './components/DrawerChat';
import ChatItem from './components/ChatItem';
import { Communicates } from '@/models/communicate.model';
import { getCommunicationMe } from '@/services/communication.service';
import { toast } from '@/services/alert.service';
import Loadding from '@/components/Loadding';
import { CommunicateMeContext } from './communicateMe.context';

const drawerWidth = 300;

type Props = {
    params: {
        user_id: string
    }
}

export default function page({ params }: Props) {
    const [mobileOpen, setMobileOpen] = React.useState(false);
    const [isClosing, setIsClosing] = React.useState(false);
    const [communicateMe, setCommunicateMe] = React.useState<Communicates>({} as Communicates)
    const [load, setload] = React.useState<boolean>(false)

    const container = typeof window !== 'undefined' ? () => window.document.body : undefined;

    const findCommunicate = React.useCallback(async () => {
        setload(true)
        try {
            const result = await getCommunicationMe()
            setCommunicateMe(result.data)
        } catch (error: any) {
            toast(error.message, 'error')
        } finally {
            setload(false)
        }
    }, [setCommunicateMe])

    React.useEffect(() => {
        findCommunicate()
    }, [findCommunicate])

    return (
        <>
            <CommunicateMeContext.Provider value={{communicateMe, setCommunicateMe}}>
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
            </CommunicateMeContext.Provider>

            {
                load ?
                    <Loadding /> :
                    null
            }
        </>
    );
}
