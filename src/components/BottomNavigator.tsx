'use client'
import * as React from 'react';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import Paper from '@mui/material/Paper';
import HomeIcon from '@mui/icons-material/Home';
import MonitorIcon from '@mui/icons-material/Monitor';
import { usePathname, useRouter } from 'next/navigation';
import PlaceIcon from '@mui/icons-material/Place';
import SpeedDialButton from './SpeedDialButton';
import Loadding from './Loadding';

export default function BottomNavigater() {
  const [value, setValue] = React.useState<number | null>(null);
  const ref = React.useRef<HTMLDivElement>(null);
  const [load, setLoad] = React.useState<boolean>(false);
  const pathName = usePathname();
  const router = useRouter();

  React.useEffect(() => {
    if (ref.current) {
      ref.current.ownerDocument.body.scrollTop = 0;
    }
    onCheckPath();
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
              setLoad(true);
              switch (newValue) {
                case 0:
                  router.push('/home');
                  break;
                case 1:
                  router.push('/map');
                  break;
                case 2:
                  router.push('/monitor');
                  break;
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
      setValue(0);
    } else if (pathName.includes('/map')) {
      setValue(1);
    } else if (pathName.includes('/patient')) {
      setValue(2);
    } else if (pathName.includes('/device')) {
      setValue(3);
    } else if (pathName.includes('/monitor')) {
      setValue(4);
    } else if (pathName.includes('/camera')) {
      setValue(5);
    }
  }
}
