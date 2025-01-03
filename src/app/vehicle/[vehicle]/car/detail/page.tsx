'use client'
import * as React from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import CarDetail from '../../../../../components/car/CarDetail';
import { findCarByCarId } from '@/services/car.service';
import { timeOutJwt } from '@/services/timeout.service';
import { CarByCarId } from '@/models/vehicle.model';
import { CarDetailContext } from '../../../../../components/car/CarDetail.context';
import PateintDetail from '../../../../../components/car/PateintDetail';
import { useSearchParams } from 'next/navigation';
import { CarByIdContext } from './CarById.context';
import CarUser from '@/components/car/CarUser';
import BreadCrumb, { TBreadCrumd } from '@/components/BreadCrumb';

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

  const items: TBreadCrumd[] = [
    {
      labe: "หน้าหลัก",
      path: '/home'
    },
    {
      labe: "ยานพาหนะ",
      path: '/vehicle'
    },
    {
      labe: "รายละเอียดรถรับส่ง",
      path: '/vehicle'
    },

  ]

  const key = useSearchParams().get('key')
  const [value, setValue] = React.useState(key ? key.includes('patient') ? 2 : 1 : 0);
  const [carByid, setCarById] = React.useState<CarByCarId>({} as CarByCarId)

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  const feedCarById = React.useCallback(async () => {
    try {
      const result = await findCarByCarId(params.vehicle)
      setCarById(result.data)
    } catch (error) {
      timeOutJwt(error)
    }
  }, [setCarById])

  React.useEffect(() => {
    feedCarById()

    return () => {
      feedCarById
    }
  }, [feedCarById])

  return (
    <Box sx={{ width: '100%', padding: 2 }}>
      <BreadCrumb item={items} />
      <CarByIdContext.Provider value={{ carByid, setCarById }} >
        <Box sx={{ borderBottom: 1, borderColor: 'divider', marginTop: 2 }}>
          <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
            <Tab label="รายละเอียดรถ" {...a11yProps(0)} />
            <Tab label="สมาชิก" {...a11yProps(1)} />
            <Tab label="ผู้ป่วย" {...a11yProps(2)} />
          </Tabs>
        </Box>
        <CarDetailContext.Provider value={{ carByid, setCarById }} >
          <CustomTabPanel value={value} index={0}>
            <CarDetail />
          </CustomTabPanel>
          <CustomTabPanel value={value} index={1}>
            <CarUser />
          </CustomTabPanel>
          <CustomTabPanel value={value} index={2}>
            <PateintDetail />
          </CustomTabPanel>
        </CarDetailContext.Provider>
      </CarByIdContext.Provider>

    </Box>

  );
}
