'use client'
import * as React from 'react';
import AppBar from '@mui/material/AppBar';
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
import Loadding from './Loadding';

import style from './styles/Nav.module.css'


interface Props {
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  window?: () => Window;
}

const drawerWidth = 240;
const navItems = ['Home', 'Patient', 'Device', 'Monitor', 'Select_Mode'];

export default function Nav(props: Props) {
  const router = useRouter()
  const { window } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [isLoad, setIsLoad] = React.useState(false)

  const handleDrawerToggle = () => {
    setMobileOpen((prevState) => !prevState);
  };

  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: 'center' }}>
      <Typography variant="h6" sx={{ my: 2 }}>
        EMS App
      </Typography>
      <Divider />
      <List>
        {navItems.map((item) => (
          <ListItem key={item} disablePadding>
            <ListItemButton onClick={() => setIsLoad(true)} href={'/' + item.toLocaleLowerCase()} sx={{ textAlign: 'center' }}>
              <ListItemText primary={item} />
            </ListItemButton>
          </ListItem>
        ))}
        <ListItemButton onClick={async () => {
          try {
            setIsLoad(true)
            await logout()
            router.push('/login')

          } catch (error) {
            alert(JSON.stringify(error))
          }
        }} sx={{ textAlign: 'center' }}>
          <Box sx={{display: 'flex', alignItems:'center', justifyContent: 'center'}}>
            <LogoutIcon />
            <ListItemText primary={'Logout'} />
          </Box>
        </ListItemButton>
      </List>
    </Box>
  );

  const container = window !== undefined ? () => window().document.body : undefined;

  return (
    <>
      <Box sx={{ display: 'flex' }}>
        <CssBaseline />
        <AppBar component="nav" style={{ background: '#2c387e' }}>
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
            <Typography className={style.logo} variant="body1" color="ButtonHighlight">EMS App</Typography>
            <Typography
              variant="h6"
              component="div"
              sx={{ flexGrow: 1, display: { xs: 'none', sm: 'block' } }}
            >
              EMS App
            </Typography>
            <Box sx={{ display: { xs: 'none', sm: 'block' } }}>
              {navItems.map((item) => (
                <Button onClick={() => setIsLoad(true)} href={"/" + item.toLocaleLowerCase()} key={item} sx={{ color: '#fff' }}>
                  {item}
                </Button>
              ))}
              <Button onClick={async () => {
                try {
                  setIsLoad(true)
                  await logout()
                  router.push('/login')

                } catch (error) {
                  alert(JSON.stringify(error))
                }
              }} style={{ color: 'white' }}><LogoutIcon /></Button>
            </Box>
          </Toolbar>
        </AppBar>
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
              '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
            }}
          >
            {drawer}
          </Drawer>
        </nav>
      </Box>

      {
        isLoad ?
          <Loadding /> :
          null
      }
    </>
  );
}