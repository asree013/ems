'use client';
import * as React from 'react';
import AppBar, { AppBarProps } from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import MenuIcon from '@mui/icons-material/Menu';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import LogoutIcon from '@mui/icons-material/Logout';
import { logout } from '@/services/authen.service';
import { useRouter } from 'next/navigation';

import LogoEms from '@/assets/image/icon_menu/logo4.png'

import style from './Nav.module.css';
import Loadding from '../Loadding';

import { styled } from '@mui/material/styles';
import { Avatar, useMediaQuery } from '@mui/material';
import { ThemLinear } from '@/configs/themes';

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
      <List>
        {navItems.map((item) => (
          <ListItem key={item} disablePadding>
            <ListItemButton
              onClick={() => setIsLoad(true)}
              href={'/' + item.toLocaleLowerCase()}
              sx={{ textAlign: 'center' }}
            >
              <ListItemText primary={item} />
            </ListItemButton>
          </ListItem>
        ))}
        <ListItemButton
          onClick={async () => {
            try {
              setIsLoad(true);
              await logout();
              localStorage.removeItem('camera')
              router.push('/login');
            } catch (error) {
              alert(JSON.stringify(error));
            }
          }}
          sx={{ textAlign: 'center' }}
        >
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <LogoutIcon />
            <ListItemText primary={'Logout'} />
          </Box>
        </ListItemButton>
      </List>
    </Box>
  );

  const container =
    windows !== undefined ? () => windows().document.body : undefined;

  const Themes = styled(AppBar)<AppBarProps>(({ theme }) => ({
    background: 'linear-gradient(125deg, #1e3c72, #2a5298)',
  }));



  return (
    <>

      <Box sx={{ display: 'flex', zIndex: 1 }} >
        <CssBaseline />
        <ThemLinear >
          <Toolbar>
            {/* <IconButton
              color="inherit"
              aria-label="open drawer"
              edge="start"
              onClick={handleDrawerToggle}
              sx={{ mr: 2, display: { sm: 'none' } }}
            >
              <MenuIcon />
            </IconButton> */}
            {
               maxWidth?
                <Typography
                  className={style.logo}
                  variant="body1"
                  color="ButtonHighlight"
                >
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'start' }}>
                    <Avatar src={LogoEms.src} />
                    <span style={{ marginLeft: '10px', fontSize: '1.4rem', fontWeight: 700 }}>EMSink App</span>
                  </div>
                </Typography>: null
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

              <Button
                onClick={async () => {
                  try {
                    setIsLoad(true);
                    await logout();
                    router.push('/login');
                    localStorage.removeItem('camera')
                  } catch (error) {
                    alert(JSON.stringify(error));
                  }
                }}
                style={{ color: 'white' }}
              >
                <LogoutIcon />
              </Button>
            </Box>
          </Toolbar>
        </ThemLinear>

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
