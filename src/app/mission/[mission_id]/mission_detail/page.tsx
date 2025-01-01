'use client'
import * as React from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import MissionDetail from './MissionDetail';
import { MissionDetailContext } from '../../../../contexts/mission.detail.context';
import { MissionById, Missions } from '../../../../models/mission.model';
import { findMissionByMissionId, leaveMission } from "../../../../services/mission.service"
import { timeOutJwt } from "../../../../services/timeout.service"
import MissionUser from './MissionUser';
import MissionStateTag from './MissionStateTag';
import { Button } from '@mui/material';
import { toast } from '@/services/alert.service';
import Loadding from '@/components/Loadding';
import MissionPatient from './MissionPatient';
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
        mission_id: string
    }
}

export default function BasicTabs({ params }: Props) {
    const [value, setValue] = React.useState(0);
    const [mission, setMission] = React.useState<MissionById>({} as MissionById);
    const [load, setLoad] = React.useState(false)

    const items: TBreadCrumd[] = [
        {
            labe: 'หน้าหลัก',
            path: "/home",
        },
        {
            labe: 'ภารกิจ',
            path: "/mission",
        },
        {
            labe: 'ภารกิจ' + mission.title,
            path: "/mission/" ,
        },
    ]

    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
        setValue(newValue);
    };

    async function onLeaveMission() {
        setLoad(true)
        try {
            await leaveMission(params.mission_id)
            toast('ออกจสกภารกิจสำเร็จ', 'success')
            window.location.href = '/home'
        } catch (error: any) {
            toast(error.message, 'error')
        }
    }

    const feedMissionByMissionId = React.useCallback(async () => {
        setLoad(true)
        try {
            const result = await findMissionByMissionId(params.mission_id);
            setMission(result.data);
        } catch (error) {
            console.log(error);
            timeOutJwt(error);
        } finally {
            setLoad(false)
        }
    }, [params.mission_id]);

    React.useEffect(() => {
        feedMissionByMissionId();
    }, [feedMissionByMissionId]);

    if (!mission.id) {
        return <div>Loading...</div>;
    }

    return (
        <>
            <div className='mt-[60px]'>
                <BreadCrumb item={items} />
                <Box sx={{ width: '100%', marginTop: 10,display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column' }}>
                    <h1 style={{ fontSize: '22px', fontWeight: 700 }}>ชื่อภารกิจ: {mission.title}</h1>
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
                            <Button onClick={onLeaveMission} style={{ width: '100%', margin: '10px 0' }} type='button' variant='contained' color='error'>ออกจากภารกิจ</Button>
                            <Button style={{ width: '100%' }} variant='contained' color='inherit'>จบภารกิจ ยกเลิก</Button>

                        </CustomTabPanel>
                        <CustomTabPanel value={value} index={1}>
                            <MissionUser />
                        </CustomTabPanel>
                        <CustomTabPanel value={value} index={2}>
                            <MissionPatient mission={mission} />
                        </CustomTabPanel>
                        <CustomTabPanel value={value} index={3}>
                            <MissionStateTag data={mission} />
                        </CustomTabPanel>
                    </MissionDetailContext.Provider>
                </Box>
            </div>

            {
                load ?
                    <Loadding /> :
                    null
            }
        </>
    );
}
