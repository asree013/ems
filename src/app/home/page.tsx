'use client'
import Avatar from '@mui/material/Avatar';
import React, { useCallback, useContext, useEffect, useRef, useState } from 'react';
import homeCss from './home.module.css';
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
import { Button, Divider } from '@mui/joy';
import { Missions } from '@/models/mission.model';
import { findMission } from '@/services/mission.service';
import { MissionContext, MissionContexts } from '@/contexts/missions.context';
import { OpenModalUserContext } from '@/contexts/modalUser.context';
import ModalUser from '@/components/ModalUser';
import { findUsers, saveLocation } from '@/services/user.service';
const utmObj = require('utm-latlng')
import * as mgrs from 'mgrs'
import { Locations } from '@/models/location.model';
import HomeSideBard from './HomeSideBard';
import HomeContent from './HomeContent';
import { UsersContexts } from '@/contexts/users.context';
import { Users } from '@/models/users.model';

const drawerWidth = 240;

export default function Page() {
  const UTM = new utmObj('Everest');
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openUser, setOpenUser] = useState(false);
  const [isClosing, setIsClosing] = useState(false);
  const [missions, setMissions] = useState<Missions[]>([]); // Initialize as an empty array
  const [missionId, setMissionId] = useState<Missions>({} as Missions); // Initialize as an empty object
  const [userLocate, setUserLocate] = useState<Locations>({} as Locations); // Initialize as an empty object
  const [users, setUsers] = useState<Users[]>([]); // Initialize as an empty array

  const feedMission = useCallback(async () => {
    try {
      const result = await findMission(1, 10);
      console.log(result.data);
      setMissions(result.data);
    } catch (error) {
      console.log(error);
    }
  }, []);

  const pushLocationUser = useCallback(async () => {
    try {
      return new Promise<void>((resolve, reject) => {
        if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(
            async (position) => {
              const { latitude, longitude } = position.coords;
              const utm = UTM.convertLatLngToUtm(longitude, latitude, 1);
              const mgrss = mgrs.forward([longitude, latitude]);
              const g = {} as Locations;
              g.lat = latitude.toString();
              g.long = longitude.toString();
              g.mgrs = mgrss;
              g.utm = JSON.stringify(utm);

              setUserLocate(g);
              const a = await saveLocation(g);
              console.log(a);
              console.log(g);

              resolve();
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
  }, []);

  const feedUser = useCallback(async () => {
    try {
      const result = await findUsers(1, 10);
      setUsers(result.data);
      console.log(result.data);
    } catch (error) {
      console.log(error);
    }
  }, []);

  useEffect(() => {
    feedMission();
    feedUser();
    const saveLo = setInterval(() => {
      console.log('timeout');
      pushLocationUser();
    }, 5000);

    return () => {
      clearInterval(saveLo);
    };
  }, [feedMission, feedUser]);

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

  const container = typeof window !== 'undefined' ? () => window.document.body : undefined;

  return (
    <MissionContexts.Provider value={{ missions, setMissions }}>
      <OpenModalUserContext.Provider value={{ openUser, setOpenUser, missionId, setMissionId }}>
        <UsersContexts.Provider value={{ users, setUsers }} >

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
              sx={{ flexGrow: 1, p: 3, marginTop: '60px' }}
              className={homeCss.contentBox}
            >
              <Toolbar />
              <HomeContent />
            </Box>
          </Box>
          <ModalUser />

        </UsersContexts.Provider>
      </OpenModalUserContext.Provider>
    </MissionContexts.Provider>
  );
}

