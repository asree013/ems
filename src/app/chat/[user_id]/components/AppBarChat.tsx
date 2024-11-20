'use client'
import { AppBar, Avatar, IconButton, Toolbar, Typography } from '@mui/material'
import React, { Dispatch, SetStateAction } from 'react'
import MenuIcon from '@mui/icons-material/Menu';
import styled from 'styled-components';
import LogoEms from '@/assets/image/icon_menu/logo4.png'

type Props = {
  drawerWidth: number
  mobileOpen: boolean
  setMobileOpen: Dispatch<SetStateAction<boolean>>
  isClosing: boolean
}

const StyleAppBar = styled(AppBar)`
  background: linear-gradient(125deg, #021B79, #0575E6);
`

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

export default function AppBarChat({ drawerWidth, setMobileOpen, mobileOpen, isClosing }: Props) {
  const handleDrawerToggle = () => {
    if (!isClosing) {
      setMobileOpen(!mobileOpen);
    }
  };
  return (
    <StyleAppBar
      position="fixed"
      sx={{
        width: { sm: `calc(100% - ${drawerWidth}px)` },
        ml: { sm: `${drawerWidth}px` },
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
        <Typography variant="h6" sx={{ my: 2 }}>
          <Brander onClick={() => {
            // setIsLoad(true)
            window.location.href = '/home'
          }}>
            <Avatar src={LogoEms.src} />
            <span style={{ marginLeft: '10px', fontSize: '1.4rem', fontWeight: 700 }}>Marine-EMS</span>
          </Brander>
        </Typography>
      </Toolbar>
    </StyleAppBar>
  )
}
