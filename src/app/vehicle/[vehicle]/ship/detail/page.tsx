'use client'
import * as React from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import CarDetail from '../../../../../components/car/CarDetail';
import { findCarByCarId } from '@/services/car.service';
import { timeOutJwt } from '@/services/timeout.service';
import { CarByCarId, ShipById } from '@/models/vehicle.model';
import { CarDetailContext } from '../../../../../components/car/CarDetail.context';
import PateintDetail from '../../../../../components/car/PateintDetail';
import { useSearchParams } from 'next/navigation';
import CarUser from '@/components/car/CarUser';
import { ShipByIdContext, ShipDetailContext } from './ShipById.context';
import { findShipById } from '@/services/ship.service';
import BedInShip from './BedInShip';

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function CustomTabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

type Props = {
  params: {
    vehicle: string
  }
}

export default function Page({ params }: Props) {
  const key = useSearchParams().get('key')
  const [value, setValue] = React.useState(key ? key.includes('patient') ? 2 : 1 : 0);
  const [shipById, setShipById] = React.useState<ShipById>({} as ShipById)

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  const feedShipById = React.useCallback(async () => {
    try {
      const result = await findShipById(params.vehicle)
      setShipById(result.data)
    } catch (error) {
      timeOutJwt(error)
    }
  }, [setShipById])

  React.useEffect(() => {
    feedShipById()

    return () => {
        feedShipById
    }
  }, [feedShipById])

  return (
    <Box sx={{ width: '100%' }}>
      <ShipByIdContext.Provider value={{shipById, setShipById}} >
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
            <Tab label="รายละเอียดรถ" {...a11yProps(0)} />
            <Tab label="สมาชิก" {...a11yProps(1)} />
            <Tab label="ผู้ป่วย" {...a11yProps(2)} />
            <Tab label="เตียงในเรือ" {...a11yProps(3)} />
          </Tabs>
        </Box>
        <ShipDetailContext.Provider value={{ shipById, setShipById }} >
          <CustomTabPanel value={value} index={0}>
            <CarDetail />
          </CustomTabPanel>
          <CustomTabPanel value={value} index={1}>
            <CarUser />
          </CustomTabPanel>
          <CustomTabPanel value={value} index={2}>
            <PateintDetail />
          </CustomTabPanel>
          <CustomTabPanel value={value} index={3}>
            <BedInShip />
          </CustomTabPanel>
        </ShipDetailContext.Provider>
      </ShipByIdContext.Provider>

    </Box>

  );
}
