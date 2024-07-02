'use client'
import React from 'react'
import homeCss from './home.module.css'
import { Avatar, Divider, List, ListItem, ListItemButton, ListItemIcon, ListItemText } from '@mui/material'
import SpaceDashboardIcon from '@mui/icons-material/SpaceDashboard';
import Link from 'next/link';


export default function HomeSideBard() {
  return (
    <div className={homeCss.sideBar}>
      <div className={homeCss.logoAdin}>
        <Avatar sx={{ bgcolor: 'red' }}>A</Avatar>
        <p>Admin Home</p>
      </div>
      <div className={homeCss.sideBarContent}>
        {/* <Link href={''} style={{ display: 'flex', alignItems: 'center' }}>
          <SpaceDashboardIcon />
          <p>Dashbord</p>
        </Link> */}
        <Divider />
        <List>
            <ListItem disablePadding>
              <ListItemButton>
                <ListItemIcon>
                  {<SpaceDashboardIcon />}
                </ListItemIcon>
                <ListItemText primary={'Dashbord'} />
              </ListItemButton>
            </ListItem>
        </List>
        <Divider />
      </div>
    </div>
  )
}
