'use client'
import * as React from 'react';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import Paper from '@mui/material/Paper';
import HomeIcon from '@mui/icons-material/Home';
import MonitorIcon from '@mui/icons-material/Monitor';
import Loadding from './Loadding';
import { usePathname } from 'next/navigation';
import PlaceIcon from '@mui/icons-material/Place';
import SpeedDialButton from './SpeedDialButton';

export default function BottomNavigater() {
  const [value, setValue] = React.useState<number | null>(null);
  const ref = React.useRef<HTMLDivElement>(null);
  const [load, setLoad] = React.useState<boolean>(false)
  const pathName = usePathname()


  React.useEffect(() => {
    (ref.current as HTMLDivElement).ownerDocument.body.scrollTop = 0;
    onCheckPath()
  }, []);

  return (
    <>
      <Box sx={{ pb: 7, position: 'absolute' }} ref={ref}>
        <CssBaseline />
        <Paper sx={{ position: 'fixed', bottom: 0, left: 0, right: 0 }} elevation={3}>
          <BottomNavigation
            showLabels
            value={value}
            onChange={(event, newValue) => {
              if (newValue === 0) {
                setLoad(true)
                window.location.href = '/home'
              }
              if (newValue === 1) {
                setLoad(true)
                window.location.href = '/map'
              }
              if (newValue === 2) {
                window.location.href = '/monitor'
                setLoad(true)
              }
            }}
          >
            <BottomNavigationAction label="Home" icon={<HomeIcon />} />
            <BottomNavigationAction label="Map" icon={<PlaceIcon />} />
            <BottomNavigationAction label="Monitor" icon={<MonitorIcon />} />
            <BottomNavigationAction label="All" icon={<SpeedDialButton />} />
          </BottomNavigation>
        </Paper>
      </Box>

      {
        load ?
          <Loadding /> :
          null
      }
    </>
  );

  function onCheckPath() {
    if (pathName.includes('/home')) {
      setValue(0)
    }
    if (pathName.includes('/map')) {
      setValue(1)
    }
    if (pathName.includes('/patient')) {
      setValue(2)
    }
    if (pathName.includes('/device')) {
      setValue(3)
    }
    if (pathName.includes('/monitor')) {
      setValue(4)
    }
    if (pathName.includes('/camera')) {
      setValue(5)
    }
  }
}




