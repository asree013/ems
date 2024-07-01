'use client'
import React from 'react'
import homeCss from './home.module.css'
import { Avatar } from '@mui/material'
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
        <Link href={''} style={{display: 'flex', alignItems: 'center'}}>
          <SpaceDashboardIcon />
          <p>Dashbord</p>
        </Link>
        <a href="">map</a>
        <a href="">patient detail</a>
        <a href="">history</a>
      </div>
    </div>
  )
}
