'use client';
import * as React from 'react';
import AppBar, { AppBarProps } from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import LogoutIcon from '@mui/icons-material/Logout';
import { logout } from '@/services/authen.service';
import { usePathname, useRouter } from 'next/navigation';

import LogoEms from '@/assets/image/icon_menu/logo4.png'

import Loadding from '../Loadding';

import { Avatar, styled, useMediaQuery } from '@mui/material';
import { IconVehicleContext, TIconVehicleC } from '@/app/home/IconVehicleContext';

interface Props {
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  windows?: () => Window;
}

const drawerWidth = 240;
const navItems = ['Home', 'Patient', 'Device', 'Monitor', 'Select_Mode'];

export default function Nav(props: Props) {
  const router = useRouter();
  const { windows } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [isLoad, setIsLoad] = React.useState(false);
  const { icon } = React.useContext<TIconVehicleC>(IconVehicleContext)
  const path = usePathname()
  
  const handleDrawerToggle = () => {
    setMobileOpen((prevState) => !prevState);
  };

  const maxWidth = useMediaQuery('(max-width: 450px)')

  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: 'center' }}>
      <Typography variant="h6" sx={{ my: 2 }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'start' }}>
          <Avatar src={LogoEms.src} />
          <span style={{ marginLeft: '10px', fontSize: '1.4rem', fontWeight: 700 }}>EMSink App</span>
        </div>
      </Typography>
      <Divider />

    </Box>
  );

  const container =
    windows !== undefined ? () => windows().document.body : undefined;

  const Themes = styled(AppBar)<AppBarProps>(({ theme }) => ({
    background: 'linear-gradient(125deg, #021B79, #0575E6)',

  }));

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
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'start' }}>
                    <Avatar src={LogoEms.src} />
                    <span style={{ marginLeft: '10px', fontSize: '1.4rem', fontWeight: 700 }}>EMSink App</span>
                  </div>
                </Typography>
                : null
            }
            <Typography
              variant="h6"
              component="div"
              sx={{ flexGrow: 1, display: { xs: 'none', sm: 'block' } }}
            >
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'start' }}>
                <Avatar src={LogoEms.src} />
                <span style={{ marginLeft: '10px', fontSize: '1.4rem', fontWeight: 700 }}>EMSink App</span>
              </div>
            </Typography>

            <Box sx={{ display: { xs: 'none', sm: 'block' } }}>
              <Button style={{ cursor: 'default' }} color='inherit' variant='text'>สถาณะ: </Button>
              <Button style={{ cursor: 'default' }} variant='contained' color='inherit'>

                {
                  path === '/home' ?
                  icon.length === 0 ?
                      'ไม่มียานพาหนะ' :
                      <>
                        {
                          icon.includes('car') ?
                            'รถรับส่ง' : null
                        }
                        {
                          icon.includes('helicopter') ?
                            'ฮ.รับส่ง' : null
                        }
                        {
                          icon.includes('ship') ?
                            'เรือรับส่ง' : null
                        }
                      </>:
                    null 

                }
              </Button>
            </Box>
            <Button sx={{ display: { xs: 'block', sm: 'none' }, cursor: 'default', position: 'absolute', right: 20 }} color='inherit' variant='text'>สถาณะ: </Button>



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
