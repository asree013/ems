'use client'
import * as React from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import CarDetail from '../../../../../components/car/CarDetail';
import { findCarByCarId } from '@/services/car.service';
import { timeOutJwt } from '@/services/timeout.service';
import { Cars } from '@/models/vehicle.model';
import { CarDetailContext } from '../../../../../components/car/CarDetail.context';
import PateintDetail from '../../../../../components/car/PateintDetail';
import { useSearchParams } from 'next/navigation';

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
  const [value, setValue] = React.useState(key? key.includes('patient')? 2: 1 : 0);
  const [car, setCar] = React.useState<Cars>({} as Cars)

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  const feedCarById = React.useCallback(async () => {
    try {
      const result = await findCarByCarId(params.vehicle)
      setCar(result.data)
    } catch (error) {
      timeOutJwt(error)
    }
  }, [setCar])

  React.useEffect(() => {
    feedCarById()

    return () => {
      feedCarById
    }
  }, [feedCarById])

  return (
    <Box sx={{ width: '100%' }}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
          <Tab label="รายละเอียดรถ" {...a11yProps(0)} />
          <Tab label="สมาชิก" {...a11yProps(1)} />
          <Tab label="ผู้ป่วย" {...a11yProps(2)} />
        </Tabs>
      </Box>
      <CustomTabPanel value={value} index={0}>
        <CarDetailContext.Provider value={{ car, setCar }} >
          <CarDetail />
        </CarDetailContext.Provider>
      </CustomTabPanel>
      <CustomTabPanel value={value} index={1}>
        Item Two
      </CustomTabPanel>
      <CustomTabPanel value={value} index={2}>
        <CarDetailContext.Provider value={{ car, setCar }} >
          <PateintDetail />
        </CarDetailContext.Provider>
      </CustomTabPanel>
    </Box>
  );
}
