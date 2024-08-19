'use client'
import * as React from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import MissionDetail from './MissionDetail';
import { MissionDetailContext } from '../../../../contexts/mission.detail.context';
import { Missions } from '../../../../models/mission.model';
import { findMissionByMissionId, leaveMission } from "../../../../services/mission.service"
import { timeOutJwt } from "../../../../services/timeout.service"
import MissionUser from './MissionUser';
import MissionStateTag from './MissionStateTag';
import { Button } from '@mui/material';
import { toast } from '@/services/alert.service';

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
        mission_id: string
    }
}

export default function BasicTabs({ params }: Props) {
    const [value, setValue] = React.useState(0);
    const [mission, setMission] = React.useState<Missions>({} as Missions);

    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
        setValue(newValue);
    };

    async function onLeaveMission() {
        try {
            await leaveMission(params.mission_id)
            toast('ออกจสกภารกิจสำเร็จ', 'success')
            // window.location.href = '/home'
        } catch (error) {
            // timeOutJwt(error)
        }
    }

    const feedMissionByMissionId = React.useCallback(async () => {
        try {
            const result = await findMissionByMissionId(params.mission_id);
            setMission(result.data);
        } catch (error) {
            console.log(error);
            timeOutJwt(error);
        }
    }, [params.mission_id]);

    React.useEffect(() => {
        feedMissionByMissionId();
    }, [feedMissionByMissionId]);

    if (!mission.id) {
        return <div>Loading...</div>; // หรือแสดง Loading component
    }

    return (
        <Box sx={{ width: '100%', marginTop: '60px', display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column' }}>
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
                    <Tab label="รายละเอียด" {...a11yProps(0)} />
                    <Tab label="สมาชิก" {...a11yProps(1)} />
                    <Tab label="ผู้ป่วย" {...a11yProps(2)} />
                    <Tab label="สถาณะ" {...a11yProps(3)} />
                </Tabs>
            </Box>
            <MissionDetailContext.Provider value={{ mission, setMission }} >
                <CustomTabPanel value={value} index={0}>
                    <MissionDetail />
                    <Button onClick={onLeaveMission} style={{width: '100%', margin: '10px 0'}} type='button' variant='contained' color='error'>ออกจากภารกิจ</Button>
                </CustomTabPanel>
                <CustomTabPanel value={value} index={1}>
                    <MissionUser />
                </CustomTabPanel>
                <CustomTabPanel value={value} index={2}>
                    Item Three
                </CustomTabPanel>
                <CustomTabPanel value={value} index={3}>
                    <MissionStateTag data={mission} />
                </CustomTabPanel>
            </MissionDetailContext.Provider>
        </Box>
    );
}
