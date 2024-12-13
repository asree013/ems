'use client'
import * as React from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import { Button, Paper } from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import WidgetsIcon from '@mui/icons-material/Widgets';
import Avatar from '@mui/material/Avatar';
import { FindMeContext } from '@/contexts/findme.context';
import { Users } from '@/models/users.model';
import { useCallback } from 'react';
import { FindUserMe, logout } from '@/services/authen.service';
import Loadding from './Loadding';
import MenuItem from './Menu';
import { MenuValueContext } from '@/contexts/menu.value.context';
import { timeOutJwt } from '@/services/timeout.service';
import ProfileComponent from './ProfileComponent';
import { FindMeTabContext } from './subContext/findMeTab.content';
import { checkOnline, syncDb } from '@/services/worker.service';
import { toast } from '@/services/alert.service';

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

type Props = {
    children: React.ReactNode
}

export default function TabMenu({ children }: Props) {
    const [value, setValue] = React.useState(0);
    const ref = React.useRef<HTMLDivElement>(null);
    const [findMe, setFindMe] = React.useState<Users>({} as Users)
    const [load, setLoad] = React.useState<boolean>(false)
    const [isOnline, setIsOnline] = React.useState<boolean>(navigator.onLine);

    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
        setValue(newValue);
    };

    const checkRole = useCallback(async () => {
        try {
            setLoad(true);
            const result = await FindUserMe();
            setFindMe(result.data);
            localStorage.setItem('user_id', result.data.id)
            setLoad(false);
        } catch (error: any) {
            timeOutJwt(error)
        }
    }, [setFindMe]);

    React.useEffect(() => {
        if (ref.current) {
            ref.current.ownerDocument.body.scrollTop = 0;
        }
        if (Object.keys(findMe).length === 0) {
            checkRole()
        }
        return () => {
            checkRole
        }
    }, [checkRole]);

    React.useEffect(() => {
        const updateOnlineStatus = async () => {
            setIsOnline(navigator.onLine);
            if (navigator.onLine) {
                await syncDb()
                return
            }
            else{
                console.log('cannot sync');
                
                return
            }
        };

        window.addEventListener('online', () =>
            updateOnlineStatus()
        );
        window.addEventListener('offline', updateOnlineStatus);

        return () => {
            window.removeEventListener('online', updateOnlineStatus);
            window.removeEventListener('offline', updateOnlineStatus);
        };
    }, []);

    return (
        <>
            <Box sx={{ pb: 7, position: 'absolute' }} ref={ref} style={{ width: '100%' }}>
                <CssBaseline />
                <FindMeContext.Provider value={{ findMe, setFindMe }}>
                    <CustomTabPanel value={value} index={0} >
                        <div style={{ width: '100%' }}>
                            {children}
                        </div>
                    </CustomTabPanel>
                    <CustomTabPanel value={value} index={1}>
                        <MenuValueContext.Provider value={{ value, setValue }}>
                            <MenuItem />
                        </MenuValueContext.Provider>
                    </CustomTabPanel>
                    <CustomTabPanel value={value} index={2}>
                        <FindMeTabContext.Provider value={{ findMe, setFindMe }} >
                            <ProfileComponent />
                        </FindMeTabContext.Provider>
                    </CustomTabPanel>
                </FindMeContext.Provider>
                <Paper sx={{ position: 'fixed', bottom: 0, left: 0, right: 0, zIndex: 1 }} elevation={6}>

                    <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                        <Tabs value={value} onChange={handleChange} aria-label="basic tabs example" centered>
                            <Tab style={{ margin: '0 5px' }} label="Home" {...a11yProps(0)} icon={<HomeIcon />} />
                            <Tab style={{ margin: '0 5px' }} label="Menu" {...a11yProps(1)} icon={<WidgetsIcon />} />
                            <Tab style={{ margin: '0 5px' }} label="Profile" {...a11yProps(2)} icon={<Avatar src={findMe?.image} sx={{ width: 25, height: 25 }} />} />
                        </Tabs>
                    </Box>
                </Paper>
            </Box>

            {
                load ?
                    <Loadding /> :
                    null
            }
        </>
    );
}
