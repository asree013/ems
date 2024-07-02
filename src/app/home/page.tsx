'use client';
import Avatar from '@mui/material/Avatar';
import React, { useCallback, useContext, useEffect, useRef, useState } from 'react';
import homeCss from './home.module.css';
import patientImage from '../../../public/assets/icon/examination_12772952.png';
import monitorImage from '../../../public/assets/icon/monitoring_12714969.png';
import deviceImage from '../../../public/assets/icon/mobile_14820652.png';
import Loadding from '../../components/Loadding';
import { PatientContextsArr } from '@/contexts/patient.context';
import { findPatientAll } from '@/services/paitent.service';
import { toast } from '@/services/alert.service';
import { Patients } from '@/models/patient';
import { findDeviceAll } from '@/services/device.service';
import { findAllOrderTranfer } from '@/services/order_tranfer.service';
import { OrderTranfer } from '@/models/order_tranfer.model';
import MapEms from './MapEms';
import Vitalsing from './Vitalsing';
import GoogleApiMap from './GoogleApiMap';
import { RoleContext } from '@/contexts/role.context';
import { FindUserMe } from '@/services/authen.service';
import CarmeraCar from './CarmeraCar';
import { Locations } from '@/models/location.model';
import Divider from '@mui/material/Divider';
import HomeSideBard from './HomeSideBard';
import HomeContent from './HomeContent';


export function test() {
  const [isLoad, setIsLoad] = useState(false);
  const [hiden, setHiden] = useState(false);
  const [patients, setPatients] = useState<Patients[]>([]);
  const [device, setDevice] = useState<Device[]>([]);
  const [order, setOrder] = useState<OrderTranfer[]>([]);
  const [role, setRole] = useState<string>('');
  const [hightMap, setHightMap] = useState<number>(0);
  const [widths, setWidths] = useState<number>(0);
  const [userLocate, setUserLocate] = useState<Locations>({} as Locations)

  function onRedirect(str: string) {
    setIsLoad(true);
    window.location.href = `/${str}`
  }

  const feedPatient = useCallback(async () => {
    try {
      const result = await findPatientAll();
      setPatients(result.data);
    } catch (error: any) {
      console.log(error);
      toast(JSON.stringify({ status: error.message, message: 'Error fetching patients' }), 'error');
    }
  }, [setPatients]);

  const pushLocationUser = useCallback(async () => {
    try {
      return new Promise<void>((resolve, reject) => {
        if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(
            (position) => {
              const { latitude, longitude } = position.coords;
              const g = { lat: latitude, lng: longitude };
              setUserLocate(g);
              console.log(g);

              resolve(); // Resolve without returning any value
            },
            (error) => {
              console.error("Error getting geolocation:", error);
              reject(error);
            }
          );
        } else {
          const error = new Error("Geolocation is not supported by this browser.");
          console.error(error);
          reject(error);
        }
      });
    } catch (error) {
      console.log(error);

    }
  }, [setUserLocate])

  const feedDevice = useCallback(async () => {
    try {
      const result = await findDeviceAll();
      setDevice(result);
    } catch (error: any) {
      console.log(error);
      toast(JSON.stringify({ status: error.message, message: 'Error fetching devices' }), 'error');
    }
  }, [setDevice]);

  const feedOrder = useCallback(async () => {
    try {
      const result = await findAllOrderTranfer();
      setOrder(result.filter(r => r.status_order !== 'Closed'));
    } catch (error: any) {
      console.log(error);
    }
  }, [setOrder]);

  const checkRole = useCallback(async () => {
    try {
      const result = await FindUserMe();
      setRole(result.data.role);
    } catch (error) {
      toast('Error checking role', 'error');
    }
  }, [setRole]);

  useEffect(() => {
    const idhight = document.getElementById('content')
    feedPatient();
    feedDevice();
    feedOrder();
    checkRole();
    if (idhight) {
      setHightMap(idhight.offsetHeight);
    }
    setWidths(window.innerWidth)

    const getLo = setInterval(() => {
      pushLocationUser()
    }, 5000)

    return () => {
      clearInterval(getLo)
    }
  }, [feedPatient, feedDevice, feedOrder, checkRole, pushLocationUser]);

  function onCheckNumData(key: string) {
    switch (true) {
      case key.toLocaleLowerCase().includes('patient'):
        return patients.length;
      case key.toLocaleLowerCase().includes('device'):
        return device.length;
      case key.toLocaleLowerCase().includes('monitor'):
        return order.length;
      default:
        return 0;
    }
  }

  function handlerSideBar(str: string) {
    if (str.includes('close')) {
      setHiden(true)
    }
    else {
      setHiden(false)
    }
  }

  return (
    <>
      <RoleContext.Provider value={{ role, setRole }}>
        {/* <Nav /> */}
        <div className={homeCss.homeBody}>
          <div hidden={hiden}>
            <HomeSideBard />
          </div>
          <div style={{ border: '1px solid gainsboro', height: '90%', marginTop: '3%' }}></div>
          <div id='content'>
            <HomeContent />
          </div>
          {/* <div className={homeCss.menuItem}>
            {menuBottom.map((r) => (
              <div
                key={r.name}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <div
                  className={homeCss.menuValue}
                  onClick={() => onRedirect(r.name.toLocaleLowerCase())}
                >
                  <Avatar variant="rounded" src={r.image.src} />
                  <p>{r.name}: {onCheckNumData(r.name)}</p>
                </div>
              </div>
            ))}
          </div>
          <div className={homeCss.mapMenu}>
            <GoogleApiMap />
            <Vitalsing hightMap={hightMap} />
          </div>
          <div className={homeCss.cameraCar}>
            <CarmeraCar />
          </div> */}
        </div>
        {isLoad ? <Loadding /> : null}
      </RoleContext.Provider>
    </>
  );
}

import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import MailIcon from '@mui/icons-material/Mail';
import MenuIcon from '@mui/icons-material/Menu';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Input from '@mui/joy/Input';
import SearchIcon from '@mui/icons-material/Search';
import { Button } from '@mui/joy';

const drawerWidth = 240;

interface Props {
  /**
   * Injected by the documentation to work in an iframe.
   * Remove this when copying and pasting into your project.
   */
  window?: () => Window;
}

export default function Page(props: Props) {
  const { window } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [isClosing, setIsClosing] = React.useState(false);

  const handleDrawerClose = () => {
    setIsClosing(true);
    setMobileOpen(false);
  };

  const handleDrawerTransitionEnd = () => {
    setIsClosing(false);
  };

  const handleDrawerToggle = () => {
    if (!isClosing) {
      setMobileOpen(!mobileOpen);
    }
  };

  const drawer = (
    <div>
      <Toolbar />
      <Divider />
      <List>
        {['Inbox', 'Starred', 'Send email', 'Drafts'].map((text, index) => (
          <ListItem key={text} disablePadding>
            <ListItemButton>
              <ListItemIcon>
                {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
              </ListItemIcon>
              <ListItemText primary={text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      <Divider />
      <List>
        {['All mail', 'Trash', 'Spam'].map((text, index) => (
          <ListItem key={text} disablePadding>
            <ListItemButton>
              <ListItemIcon>
                {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
              </ListItemIcon>
              <ListItemText primary={text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </div>
  );

  // Remove this const when copying and pasting into your project.
  const container = window !== undefined ? () => window().document.body : undefined;

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar
        sx={{
          background: 'white',
          color: 'black',
          width: '100%',
          ml: { sm: `${drawerWidth}px` },
          marginTop: '63px'

        }}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: 'none' } }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap component="div">
            <Input
              placeholder='Seach'
              sx={{ width: '90%', borderRadius: '10px' }}
              endDecorator={<Button><SearchIcon /></Button>}
            />
          </Typography>
        </Toolbar>
      </AppBar>
      <Box
        component="nav"
        sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 }, marginTop: '60px' }}
        aria-label="mailbox folders"
      >
        {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onTransitionEnd={handleDrawerTransitionEnd}
          onClose={handleDrawerClose}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: 'block', sm: 'none' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
          }}
        >
          <HomeSideBard />
        </Drawer>
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: 'none', sm: 'block' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth, marginTop: '63px' },
            
          }}
          open
        >
          <HomeSideBard />
        </Drawer>
      </Box>
      <Box
        component="main"
        sx={{ flexGrow: 1, p: 3, width: '100%', marginTop: '60px' }}
      >
        <Toolbar />
        <HomeContent />
      </Box>
    </Box>
  );
}


