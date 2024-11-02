'use client'
import * as React from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import { timeOutJwt } from '@/services/timeout.service';
import { HelicopterById } from '@/models/vehicle.model';
import { useSearchParams } from 'next/navigation';
import { findHelicopterById } from '@/services/helicopter.service';
import { HelicopterByIdContext } from './HelicopterById.context';
import HelicopterDetail from '@/components/helicopter/HelicopterDetail';
import { HelicopterByIdDetailContext } from '@/components/helicopter/helicopterDetail.context';
import HelicopterPatientDetail from '@/components/helicopter/HelicopterPatientDetail';
import HalicopterUser from '@/components/helicopter/HalicopterUser';

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
    const [halicoptorById, setHelicopterById] = React.useState<HelicopterById>({} as HelicopterById)

    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
        setValue(newValue);
    };

    const feedHelicopterById = React.useCallback(async () => {
        try {
            const result = await findHelicopterById(params.vehicle)
            setHelicopterById(result.data)
            //   setHelicopterById(result.data)
        } catch (error) {
            timeOutJwt(error)
        }
    }, [setHelicopterById])

    React.useEffect(() => {
        feedHelicopterById()

        return () => {
            feedHelicopterById
        }
    }, [feedHelicopterById])

    return (
        <Box sx={{ width: '100%' }}>
            <HelicopterByIdContext.Provider value={{ halicoptorById, setHelicopterById }} >
                <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                    <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
                        <Tab label="รายละเอียดรถ" {...a11yProps(0)} />
                        <Tab label="สมาชิก" {...a11yProps(1)} />
                        <Tab label="ผู้ป่วย" {...a11yProps(2)} />
                    </Tabs>
                </Box>
                <HelicopterByIdDetailContext.Provider value={{ halicoptorById, setHelicopterById }}>
                    <CustomTabPanel value={value} index={0}>
                        <div style={{display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                            <HelicopterDetail />
                        </div>
                    </CustomTabPanel>
                    <CustomTabPanel value={value} index={1}>
                        <HalicopterUser />
                    </CustomTabPanel>
                    <CustomTabPanel value={value} index={2}>
                        <HelicopterPatientDetail />
                    </CustomTabPanel>
                </HelicopterByIdDetailContext.Provider>


            </HelicopterByIdContext.Provider>

        </Box>

    );
}
