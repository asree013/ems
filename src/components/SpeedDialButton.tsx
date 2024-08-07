'use client'
import * as React from 'react';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import MenuOpenIcon from '@mui/icons-material/MenuOpen';
import MenuList from '@mui/material/MenuList';
import Paper from '@mui/material/Paper';
import ListItemIcon from '@mui/material/ListItemIcon';
import Typography from '@mui/material/Typography';
import DraftsIcon from '@mui/icons-material/Drafts';
import SendIcon from '@mui/icons-material/Send';
import PriorityHighIcon from '@mui/icons-material/PriorityHigh';
import AirlineSeatFlatAngledIcon from '@mui/icons-material/AirlineSeatFlatAngled';
import TabletAndroidIcon from '@mui/icons-material/TabletAndroid';
import CameraEnhanceIcon from '@mui/icons-material/CameraEnhance';
import { useState } from 'react';
import Loadding from './Loadding';

import RuleIcon from '@mui/icons-material/Rule';

const options = [
  'Patient',
  'Device',
  'Monitor',

];

const ITEM_HEIGHT = 48;

export default function SpeedDialButton() {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const [load, setLoad] = useState<boolean>(false)
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <IconButton
        aria-label="more"
        id="long-button"
        aria-controls={open ? 'long-menu' : undefined}
        aria-expanded={open ? 'true' : undefined}
        aria-haspopup="true"
        onClick={handleClick}
      >
        <MenuOpenIcon />
      </IconButton>
      <Menu
        id="long-menu"
        MenuListProps={{
          'aria-labelledby': 'long-button',
        }}
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        PaperProps={{
          style: {
            maxHeight: ITEM_HEIGHT * 4.5,
            width: '20ch',
          },
        }}
      >
          <MenuList>

            <MenuItem onClick={() => {
              setLoad(true)
              window.location.href = '/patient'
            }}>
              <ListItemIcon>
                <AirlineSeatFlatAngledIcon fontSize="small" />
              </ListItemIcon>
              <Typography variant="inherit">Patient</Typography>
            </MenuItem>

            <MenuItem onClick={() => {
              setLoad(true)
              window.location.href = '/device'
            }}>
              <ListItemIcon>
                <TabletAndroidIcon fontSize="small" />
              </ListItemIcon>
              <Typography variant="inherit">Device</Typography>
            </MenuItem>

            <MenuItem onClick={() => {
              setLoad(true)
              window.location.href = '/camera'
            }}>
              <ListItemIcon>
                <CameraEnhanceIcon fontSize="small" />
              </ListItemIcon>
              <Typography variant="inherit" noWrap>
                Camera
              </Typography>
            </MenuItem>

            <MenuItem onClick={() => {
              setLoad(true)
              window.location.href = '/mission'
            }}>
              <ListItemIcon>
                <RuleIcon fontSize="small" />
              </ListItemIcon>
              <Typography variant="inherit" noWrap>
                Mission
              </Typography>
            </MenuItem>
          </MenuList>
        {/* {options.map((option) => (
          <MenuItem key={option} selected={option === 'Pyxis'} onClick={handleClose}>
            {option}
          </MenuItem>
        ))} */}
      </Menu>

      {
        load?
        <Loadding />:
        null
      }
    </>
  );
}
