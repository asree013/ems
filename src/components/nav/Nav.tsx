'use client';
import * as React from 'react';
import AppBar, { AppBarProps } from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { usePathname, useRouter } from 'next/navigation';

import LogoEms from '@/assets/image/icon_menu/logo4.png'

import Loadding from '../Loadding';

import { Avatar, styled as styledM, useMediaQuery } from '@mui/material';
import { IconVehicleContext, TIconVehicleC } from '@/app/home/IconVehicleContext';
import styled from 'styled-components';
import { toast } from '@/services/alert.service';

interface Props {
  windows?: () => Window;
}

const drawerWidth = 240;

const Brander = styled.div`
  display: flex;
  align-items: center;
  justify-content: start;
  flex-direction: row;
  cursor: pointer;

  :hover {
    transform: scale(1.1);
    transition: 0.5s;
  }
`

export default function Nav(props: Props) {
  const router = useRouter();
  const { windows } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [isLoad, setIsLoad] = React.useState(false);
  const path = usePathname()
  const [isOnline, setIsOnline] = React.useState<boolean>(navigator.onLine);

  const handleDrawerToggle = () => {
    setMobileOpen((prevState) => !prevState);
  };

  const maxWidth = useMediaQuery('(max-width: 450px)')

  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: 'center' }}>
      <Typography variant="h6" sx={{ my: 2 }}>
        <Brander onClick={() => {
          setIsLoad(true)
          window.location.href = '/home'
        }}>
          <Avatar src={LogoEms.src} />
          <span style={{ marginLeft: '10px', fontSize: '1.4rem', fontWeight: 700 }}>EMSink App</span>
        </Brander>
      </Typography>
      <Divider />

    </Box>
  );

  const container =
    windows !== undefined ? () => windows().document.body : undefined;

  const Themes = styledM(AppBar)<AppBarProps>(({ theme }) => ({
    background: 'linear-gradient(125deg, #021B79, #0575E6)',
  }));

  React.useEffect(() => {
    if (typeof window === 'undefined') {
      console.log('syncDb can only run on client-side');
    }
    const updateOnlineStatus = () => {
      setIsOnline(navigator.onLine);
    };

    window.addEventListener('online', updateOnlineStatus);
    window.addEventListener('offline', updateOnlineStatus);

    return () => {
      window.removeEventListener('online', updateOnlineStatus);
      window.removeEventListener('offline', updateOnlineStatus);
    };
  }, []);

  return (
    <>
      <Box sx={{ display: 'flex', zIndex: 1 }} >
        <CssBaseline />
        <Themes >
          <Toolbar>

            {
              maxWidth ?
                <Typography
                  sx={{ opacity: 1 }}
                  variant="body1"
                  color="ButtonHighlight"
                >
                  <Brander onClick={() => {
                    setIsLoad(true)
                    window.location.href = '/home'
                  }}>
                    <Avatar src={LogoEms.src} />
                    <span style={{ marginLeft: '10px', fontSize: '1.4rem', fontWeight: 700 }}>Marine-EMS</span>
                  </Brander>
                </Typography>
                : null
            }
            <Typography
              variant="h6"
              component="div"
              sx={{ flexGrow: 1, display: { xs: 'none', sm: 'block', flexDirection: 'row' } }}
            >
              <Brander onClick={() => {
                setIsLoad(true)
                window.location.href = '/home'
              }}>
                <Avatar src={LogoEms.src} />
                <span style={{ marginLeft: '10px', fontSize: '1.4rem', fontWeight: 700 }}>Marine-EMS</span>
              </Brander>
            </Typography>


            {/* <Box sx={{ display: { xs: 'none', sm: 'block' } }}>
              <Button style={{ cursor: 'default' }} color='inherit' variant='text'>สถาณะ: </Button>
              <div style={{ width: 20, height: 20, background: 'red', border: '1px solid white', borderRadius: 20 }}></div>
            </Box> */}
            <Button sx={{
              cursor: 'default', position: 'fixed', right: 20, top: 10
              , display: 'flex', alignItems: 'center', justifyContent: 'center'
            }} color='inherit' variant='text'>
              <p style={{ fontSize: '16px' }}>{isOnline ? 'ออนไลน์' : 'ออฟไลน์'} :</p>
              <div style={{ marginLeft: 8, width: 20, height: 20, background: isOnline ? 'green' : 'red', border: '1px solid white', borderRadius: 20 }}></div>
            </Button>


          </Toolbar>
        </Themes>

        <nav>
          <Drawer
            container={container}
            variant="temporary"
            open={mobileOpen}
            onClose={handleDrawerToggle}
            ModalProps={{
              keepMounted: true, // Better open performance on mobile.
            }}
            sx={{
              display: { xs: 'block', sm: 'none' },
              '& .MuiDrawer-paper': {
                boxSizing: 'border-box',
                width: drawerWidth,
              },
            }}
          >
            {drawer}
          </Drawer>
        </nav>
      </Box>


      {isLoad ? <Loadding /> : null}
    </>
  );
}
