'use client'
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';
import { useSearchParams } from 'next/navigation';
import * as React from 'react';

import CarComponet from './CarComponet';
import HelicopterComponent from './HalicopterComponent';
import MyVehicle from './MyVehicle';
import ShipComponent from './ShipComponent';
import { TabValueVehicleContext } from './tabValue.context';

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

export default function TabVehicle() {
  const [value, setValue] = React.useState(0);
  const tranfrom = useSearchParams().get('tranfrom')
  

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  React.useEffect(() => {
    if(tranfrom === 'helicopter') {
      setValue(2)
    }
    if(tranfrom === 'car') {
      setValue(1)
    }
  }, [tranfrom]) 
  return (
    <Box sx={{ width: '100%' }}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
          <Tab label="ยานพาหนะของฉัน" {...a11yProps(0)} />
          <Tab label="รถยนต์" {...a11yProps(1)} />
          <Tab label="แฮลิคอปเตอร์" {...a11yProps(2)} />
          <Tab label="เรือ" {...a11yProps(2)} />
          <Tab label="หน่วยเดินเท้า" {...a11yProps(2)} />
        </Tabs>
      </Box>
      <CustomTabPanel value={value} index={0}>
        <TabValueVehicleContext.Provider value={{ value, setValue }} >
          <MyVehicle />
        </TabValueVehicleContext.Provider>
      </CustomTabPanel>
      <CustomTabPanel value={value} index={1}>
        <TabValueVehicleContext.Provider value={{ value, setValue }} >
          <CarComponet />
        </TabValueVehicleContext.Provider>
      </CustomTabPanel>
      <CustomTabPanel value={value} index={2}>
        <TabValueVehicleContext.Provider value={{ value, setValue }} >
          <HelicopterComponent />
        </TabValueVehicleContext.Provider>
      </CustomTabPanel>
      <CustomTabPanel value={value} index={3}>
        <TabValueVehicleContext.Provider value={{ value, setValue }} >
          <ShipComponent />
        </TabValueVehicleContext.Provider>
      </CustomTabPanel>
    </Box>
  );
}
