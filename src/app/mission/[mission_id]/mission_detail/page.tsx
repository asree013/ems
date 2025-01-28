'use client'
import * as React from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import MissionDetail from './MissionDetail';
import { MissionDetailContext } from '../../../../contexts/mission.detail.context';
import { MissionById, Missions, MissionTag } from '../../../../models/mission.model';
import { findMissionByMissionId, leaveMission } from "../../../../services/mission.service"
import { timeOutJwt } from "../../../../services/timeout.service"
import MissionUser from './MissionUser';
import MissionStateTag from './MissionStateTag';
import { Button } from '@mui/material';
import { toast } from '@/services/alert.service';
import Loadding from '@/components/Loadding';
import MissionPatient from './MissionPatient';
import BreadCrumb, { TBreadCrumd } from '@/components/BreadCrumb';
import MissionDashBoard from './MissionDashBoard';
import MissionEditTag from './MissionEditTag';
import { Save, Settings } from 'lucide-react';
import Swal from 'sweetalert2';
import {cartTagContext, dammyDataContext} from './mission_detail.context'


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

const dammyData: MissionTag[] = [
    {
        status: 1,
        label: 'ศูนย์เฮลิคอปเตอร์พยาบาล(HOC)รับแจ้งเหตุ',
        id: '1',
        date_time_tag: '',
        mission_id: '1234',
        users_id: '',
        create_date: new Date().toString(),
        update_date: new Date().toString(),
        Users: {
            first_name: '',
            last_name: '',
            id: ''
        },
        description: ''
    },
    {
        status: 2,
        label: 'ทีมHEMSรับแจ้งภากิจ',
        id: '2',
        date_time_tag: '',
        mission_id: '1234',
        users_id: '',
        create_date: new Date().toString(),
        update_date: new Date().toString(),
        Users: {
            first_name: '',
            last_name: '',
            id: ''
        },
        description: ''
    },
    {
        status: 3,
        label: 'ทีมHEMSพร้อม รถEMS ออกไปสนาม ฮ.',
        id: '3',
        date_time_tag: '',
        mission_id: '1234',
        users_id: '',
        create_date: new Date().toString(),
        update_date: new Date().toString(),
        Users: {
            first_name: '',
            last_name: '',
            id: ''
        },
        description: ''
    },
    {
        status: 4,
        label: 'ทีมHEMSพร้อม รถEMS ถึง สนาม ฮ.',
        id: '4',
        date_time_tag: '',
        mission_id: '1234',
        users_id: '',
        create_date: new Date().toString(),
        update_date: new Date().toString(),
        Users: {
            first_name: '',
            last_name: '',
            id: ''
        },
        description: ''
    },
    {
        status: 5,
        label: 'ฮ. ยกตัวไปสนาม ฮ. ที่หมายผู้ป่วย',
        id: '5',
        date_time_tag: '',
        mission_id: '1234',
        users_id: '',
        create_date: new Date().toString(),
        update_date: new Date().toString(),
        Users: {
            first_name: '',
            last_name: '',
            id: ''
        },
        description: ''
    },
    {
        status: 6,
        label: "ฮ. ถึงสนาม ฮ. ที่หมายผู้ป่วย",
        id: '6',
        date_time_tag: '',
        mission_id: '1234',
        users_id: '',
        create_date: new Date().toString(),
        update_date: new Date().toString(),
        Users: {
            first_name: '',
            last_name: '',
            id: ''
        },
        description: ''
    },
    {
        status: 7,
        label: 'ทีมHEMS ออกเดินทางไป รพ.หรือจุดรับผู้ป่วย',
        id: '7',
        date_time_tag: '',
        mission_id: '1234',
        users_id: '',
        create_date: new Date().toString(),
        update_date: new Date().toString(),
        Users: {
            first_name: '',
            last_name: '',
            id: ''
        },
        description: ''
    },
    {
        status: 8,
        label: 'ทีมHEMS ถึง รพ.หรือจุดรับผู้ป่วย',
        id: '8',
        date_time_tag: '',
        mission_id: '1234',
        users_id: '',
        create_date: new Date().toString(),
        update_date: new Date().toString(),
        Users: {
            first_name: '',
            last_name: '',
            id: ''
        },
        description: ''
    },
    {
        label: "ทีมHEMS รับผู้ป่วยและทำการประเมิน ตกลงใจ",
        status: 9,
        description: "กดถัดไปเมื่อทีมHEMS รับผู้ป่วยและทำการประเมิน ตกลงใจ",
        id: '9',
        date_time_tag: '',
        mission_id: '1234',
        users_id: '',
        create_date: new Date().toString(),
        update_date: new Date().toString(),
        Users: {
            first_name: '',
            last_name: '',
            id: ''
        },
    },
    {
        label: "ทีมHEMS ลำเลียงผู้ป่วยออกจาก รพ. หรือจุดรับผู้ป่วย",
        status: 10,
        description: "กดถัดไปเมื่อทีมHEMS ลำเลียงผู้ป่วยออกจาก รพ.หรือจุดรับผู้ป่วย",
        id: '10',
        date_time_tag: '',
        mission_id: '1234',
        users_id: '',
        create_date: new Date().toString(),
        update_date: new Date().toString(),
        Users: {
            first_name: '',
            last_name: '',
            id: ''
        },
    },
    {
        label: "รับผู้ป่วยขึ้น ฮ. เสร็จและประเมิน preflight assessment",
        status: 11,
        description: "กดถัดไปเมื่อรับผู้ป่วยขึ้น ฮ.เสร็จและประเมิน preflight assessment",
        id: '11',
        date_time_tag: '',
        mission_id: '1234',
        users_id: '',
        create_date: new Date().toString(),
        update_date: new Date().toString(),
        Users: {
            first_name: '',
            last_name: '',
            id: ''
        },
    },
    {
        label: "ฮ. ยกตัวไปสนาม ฮ. ปลายทางและประเมิน flight assessment",
        status: 12,
        description: " กดถัดไปเมื่อ ฮ.ยกตัวไปสนาม ฮ.ปลายทางและประเมิน flight assessment",
        id: '12',
        date_time_tag: '',
        mission_id: '1234',
        users_id: '',
        create_date: new Date().toString(),
        update_date: new Date().toString(),
        Users: {
            first_name: '',
            last_name: '',
            id: ''
        },
    },
    {
        label: "ฮ. ถึงสนาม ฮ. ปลายทางและประเมินผู้ป่วยก่อนส่งต่อ ทีมภาคพื้น",
        status: 13,
        description: "กดถัดไปเมื่อ ฮ.ถึงสนาม ฮ.ปลายทางและประเมินผู้ป่วยก่อนส่งต่อ ทีมภาคพื้น",
        id: '13',
        date_time_tag: '',
        mission_id: '1234',
        users_id: '',
        create_date: new Date().toString(),
        update_date: new Date().toString(),
        Users: {
            first_name: '',
            last_name: '',
            id: ''
        },
    },
    {
        label: "ทีมภาคพื้น พร้อมรถEMS ออกเดินทางไป รพ.ปลายทาง",
        status: 14,
        description: "กดถัดไปเมื่อทีมภาคพื้น พร้อมรถEMS ออกเดินทางไป รพ.ปลายทาง",
        id: '14',
        date_time_tag: '',
        mission_id: '1234',
        users_id: '',
        create_date: new Date().toString(),
        update_date: new Date().toString(),
        Users: {
            first_name: '',
            last_name: '',
            id: ''
        },
    },
    {
        label: "ทีมภาคพื้นพร้อมรถEMS ถึง รพ.ปลายทาง",
        status: 15,
        description: "กดถัดไปเมื่อ ทีมภาคพื้นพร้อมรถEMS ถึง รพ.ปลายทาง",
        id: '15',
        date_time_tag: '',
        mission_id: '1234',
        users_id: '',
        create_date: new Date().toString(),
        update_date: new Date().toString(),
        Users: {
            first_name: '',
            last_name: '',
            id: ''
        },
    },
    {
        label: "ทีมภาคพื้น ส่งผู้ป่วย ที่รพ.ปลายทางเรียบร้อย พร้อมสรุปreport",
        status: 16,
        description: "กดถัดไปเมื่อทีมภาคพื้น ส่งผู้ป่วย ที่รพ.ปลายทางเรียบร้อย พร้อมสรุปreport",
        id: '16',
        date_time_tag: '',
        mission_id: '1234',
        users_id: '',
        create_date: new Date().toString(),
        update_date: new Date().toString(),
        Users: {
            first_name: '',
            last_name: '',
            id: ''
        },
    },
    {
        label: "สรุปภารกิจระหว่างทีมHEMSและทีมนักบิน",
        status: 17,
        description: "กดถัดไปเมื่อสรุปภารกิจระหว่างทีมHEMSและทีมนักบิน",
        id: '17',
        date_time_tag: '',
        mission_id: '1234',
        users_id: '',
        create_date: new Date().toString(),
        update_date: new Date().toString(),
        Users: {
            first_name: '',
            last_name: '',
            id: ''
        },
    },
    {
        label: "ฮ. ยกตัวบินกลับถึง สนาม ฮ. และส่งทีมHEMSลง",
        status: 18,
        description: "กดถัดไปเมื่อ ฮ.ยกตัวบินกลับถึง สนาม ฮ.และส่งทีมHEMSลง,",
        id: '18',
        date_time_tag: '',
        mission_id: '1234',
        users_id: '',
        create_date: new Date().toString(),
        update_date: new Date().toString(),
        Users: {
            first_name: '',
            last_name: '',
            id: ''
        },
    },
    {
        label: "รถEMSรับทีมHEMS จากสนาม ฮ.",
        status: 19,
        description: "กดถัดไปเมื่อรถEMSรับทีมHEMS จากสนาม ฮ.",
        id: '19',
        date_time_tag: '',
        mission_id: '1234',
        users_id: '',
        create_date: new Date().toString(),
        update_date: new Date().toString(),
        Users: {
            first_name: '',
            last_name: '',
            id: ''
        },
    },
    {
        label: "รถEMSและทีมHEMS กลับถึงที่ตั้ง",
        status: 20,
        description: "กดถัดไปเมื่อรถEMSและทีมHEMS กลับถึงที่ตั้ง",
        id: '20',
        date_time_tag: '',
        mission_id: '1234',
        users_id: '',
        create_date: new Date().toString(),
        update_date: new Date().toString(),
        Users: {
            first_name: '',
            last_name: '',
            id: ''
        },
    },
    {
        status: 21,
        label: 'ทีมSEMSพร้อม รถEMS ออกไปท่าเรือ',
        id: '3',
        date_time_tag: '',
        mission_id: '1234',
        users_id: '',
        create_date: new Date().toString(),
        update_date: new Date().toString(),
        Users: {
            first_name: '',
            last_name: '',
            id: ''
        },
        description: ''
    },
    {
        status: 22,
        label: 'ทีมSEMSพร้อม รถEMS ถึง ท่าเรือ.',
        id: '22',
        date_time_tag: '',
        mission_id: '1234',
        users_id: '',
        create_date: new Date().toString(),
        update_date: new Date().toString(),
        Users: {
            first_name: '',
            last_name: '',
            id: ''
        },
        description: ''
    },
    {
        status: 23,
        label: 'ทีมSEMS ออกเดินทางไป รถรับผู้ป่วย',
        id: '7',
        date_time_tag: '',
        mission_id: '1234',
        users_id: '',
        create_date: new Date().toString(),
        update_date: new Date().toString(),
        Users: {
            first_name: '',
            last_name: '',
            id: ''
        },
        description: ''
    },

    {
        label: "ทีมSEMS รับผู้ป่วยและทำการประเมิน ตกลงใจ",
        status: 24,
        description: "กดถัดไปเมื่อทีมHEMS รับผู้ป่วยและทำการประเมิน ตกลงใจ",
        id: '24',
        date_time_tag: '',
        mission_id: '1234',
        users_id: '',
        create_date: new Date().toString(),
        update_date: new Date().toString(),
        Users: {
            first_name: '',
            last_name: '',
            id: ''
        },
    },
    {
        label: "ทีมSEMS ลำเลียงผู้ป่วยออกจาก พืนที่ หรือจุดรับผู้ป่วย",
        status: 25,
        description: "กดถัดไปเมื่อทีมHEMS ลำเลียงผู้ป่วยออกจาก รพ.หรือจุดรับผู้ป่วย",
        id: '25',
        date_time_tag: '',
        mission_id: '1234',
        users_id: '',
        create_date: new Date().toString(),
        update_date: new Date().toString(),
        Users: {
            first_name: '',
            last_name: '',
            id: ''
        },
    },
    {
        label: "รับผู้ป่วยขึ้น ฮ. เสร็จและประเมิน preflight assessment",
        status: 11,
        description: "กดถัดไปเมื่อรับผู้ป่วยขึ้น ฮ.เสร็จและประเมิน preflight assessment",
        id: '11',
        date_time_tag: '',
        mission_id: '1234',
        users_id: '',
        create_date: new Date().toString(),
        update_date: new Date().toString(),
        Users: {
            first_name: '',
            last_name: '',
            id: ''
        },
    },
    {
        label: "ฮ. ยกตัวไปสนาม ฮ. ปลายทางและประเมิน flight assessment",
        status: 12,
        description: " กดถัดไปเมื่อ ฮ.ยกตัวไปสนาม ฮ.ปลายทางและประเมิน flight assessment",
        id: '12',
        date_time_tag: '',
        mission_id: '1234',
        users_id: '',
        create_date: new Date().toString(),
        update_date: new Date().toString(),
        Users: {
            first_name: '',
            last_name: '',
            id: ''
        },
    },
    {
        label: "ฮ. ถึงสนาม ฮ. ปลายทางและประเมินผู้ป่วยก่อนส่งต่อ ทีมภาคพื้น",
        status: 13,
        description: "กดถัดไปเมื่อ ฮ.ถึงสนาม ฮ.ปลายทางและประเมินผู้ป่วยก่อนส่งต่อ ทีมภาคพื้น",
        id: '13',
        date_time_tag: '',
        mission_id: '1234',
        users_id: '',
        create_date: new Date().toString(),
        update_date: new Date().toString(),
        Users: {
            first_name: '',
            last_name: '',
            id: ''
        },
    },
    {
        label: "ทีมภาคพื้น พร้อมรถEMS ออกเดินทางไป รพ.ปลายทาง",
        status: 14,
        description: "กดถัดไปเมื่อทีมภาคพื้น พร้อมรถEMS ออกเดินทางไป รพ.ปลายทาง",
        id: '14',
        date_time_tag: '',
        mission_id: '1234',
        users_id: '',
        create_date: new Date().toString(),
        update_date: new Date().toString(),
        Users: {
            first_name: '',
            last_name: '',
            id: ''
        },
    },
    {
        label: "ทีมภาคพื้นพร้อมรถEMS ถึง รพ.ปลายทาง",
        status: 15,
        description: "กดถัดไปเมื่อ ทีมภาคพื้นพร้อมรถEMS ถึง รพ.ปลายทาง",
        id: '15',
        date_time_tag: '',
        mission_id: '1234',
        users_id: '',
        create_date: new Date().toString(),
        update_date: new Date().toString(),
        Users: {
            first_name: '',
            last_name: '',
            id: ''
        },
    },
    {
        label: "ทีมภาคพื้น ส่งผู้ป่วย ที่รพ.ปลายทางเรียบร้อย พร้อมสรุปreport",
        status: 16,
        description: "กดถัดไปเมื่อทีมภาคพื้น ส่งผู้ป่วย ที่รพ.ปลายทางเรียบร้อย พร้อมสรุปreport",
        id: '16',
        date_time_tag: '',
        mission_id: '1234',
        users_id: '',
        create_date: new Date().toString(),
        update_date: new Date().toString(),
        Users: {
            first_name: '',
            last_name: '',
            id: ''
        },
    },
    {
        label: "สรุปภารกิจระหว่างทีมHEMSและทีมนักบิน",
        status: 17,
        description: "กดถัดไปเมื่อสรุปภารกิจระหว่างทีมHEMSและทีมนักบิน",
        id: '17',
        date_time_tag: '',
        mission_id: '1234',
        users_id: '',
        create_date: new Date().toString(),
        update_date: new Date().toString(),
        Users: {
            first_name: '',
            last_name: '',
            id: ''
        },
    },
    {
        label: "ฮ. ยกตัวบินกลับถึง สนาม ฮ. และส่งทีมHEMSลง",
        status: 18,
        description: "กดถัดไปเมื่อ ฮ.ยกตัวบินกลับถึง สนาม ฮ.และส่งทีมHEMSลง,",
        id: '18',
        date_time_tag: '',
        mission_id: '1234',
        users_id: '',
        create_date: new Date().toString(),
        update_date: new Date().toString(),
        Users: {
            first_name: '',
            last_name: '',
            id: ''
        },
    },
    {
        label: "รถEMSรับทีมHEMS จากสนาม ฮ.",
        status: 19,
        description: "กดถัดไปเมื่อรถEMSรับทีมHEMS จากสนาม ฮ.",
        id: '19',
        date_time_tag: '',
        mission_id: '1234',
        users_id: '',
        create_date: new Date().toString(),
        update_date: new Date().toString(),
        Users: {
            first_name: '',
            last_name: '',
            id: ''
        },
    },
    {
        label: "รถEMSและทีมHEMS กลับถึงที่ตั้ง",
        status: 20,
        description: "กดถัดไปเมื่อรถEMSและทีมHEMS กลับถึงที่ตั้ง",
        id: '20',
        date_time_tag: '',
        mission_id: '1234',
        users_id: '',
        create_date: new Date().toString(),
        update_date: new Date().toString(),
        Users: {
            first_name: '',
            last_name: '',
            id: ''
        },
    },
]
const dammyUse: MissionTag[] = [
    {
        status: 1,
        label: 'ศูนย์เฮลิคอปเตอร์พยาบาล(HOC)รับแจ้งเหตุ',
        id: '1',
        date_time_tag: '',
        mission_id: '1234',
        users_id: '',
        create_date: new Date().toString(),
        update_date: new Date().toString(),
        Users: {
            first_name: '',
            last_name: '',
            id: ''
        },
        description: ''
    },
    {
        status: 2,
        label: 'ทีมHEMSรับแจ้งภากิจ',
        id: '2',
        date_time_tag: '',
        mission_id: '1234',
        users_id: '',
        create_date: new Date().toString(),
        update_date: new Date().toString(),
        Users: {
            first_name: '',
            last_name: '',
            id: ''
        },
        description: ''
    },
    {
        status: 3,
        label: 'ทีมHEMSพร้อม รถEMS ออกไปสนาม ฮ.',
        id: '3',
        date_time_tag: '',
        mission_id: '1234',
        users_id: '',
        create_date: new Date().toString(),
        update_date: new Date().toString(),
        Users: {
            first_name: '',
            last_name: '',
            id: ''
        },
        description: ''
    },
]

export default function BasicTabs({ params }: Props) {
    const [value, setValue] = React.useState(0);
    const [mission, setMission] = React.useState<MissionById>({} as MissionById);
    const [load, setLoad] = React.useState(false)
    const [editTag, setEditTag] = React.useState<boolean>(false)
    const [selectTag, setSelectTag] = React.useState<MissionTag[]>(dammyUse)

    const [cartTag, setCartTag] = React.useState<MissionTag[]>(dammyData)


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
            path: "/mission/",
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

    function onUpdateArr(newArr: MissionTag[]) {
    }

    function onSaveData() {
        Swal.fire({
            title: "บันทึกข้อมูล?",
            text: "กดบันทึกเพื่อ บันทึกข้อมูล!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then((result) => {
            if (result.isConfirmed) {
                toast('เซฟข้อมูลเรียบร้อย', 'success')
                setEditTag(false)
            }
        });
    }

    return (
        <>
            <div className='mt-[60px]'>
                <BreadCrumb item={items} />
                <Box className="mt-5 flex flex-col justify-center items-center w-full">
                    <h1 style={{ fontSize: '20px', fontWeight: 700 }}>ชื่อภารกิจ: {mission.title}</h1>
                    <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                        <Tabs value={value} onChange={handleChange}
                            variant="scrollable"
                            scrollButtons="auto"
                            aria-label="scrollable auto tabs example"
                            className='w-[320px] md:w-full'
                        >
                            <Tab label="รายละเอียด" {...a11yProps(0)} />
                            <Tab label="สมาชิก" {...a11yProps(1)} />
                            <Tab label="ผู้ป่วย" {...a11yProps(2)} />
                            <Tab label="สถาณะ" {...a11yProps(3)} />
                            <Tab label="แดชบอร์ด" {...a11yProps(4)} />
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
                            <cartTagContext.Provider value={{ cartTag, setCartTag }}>
                                <dammyDataContext.Provider value={{ selectTag, setSelectTag }}>
                                    <div className='w-full'>
                                        <div className='w-full flex flex-col items-center justify-center mb-5'>
                                            {
                                                editTag ?

                                                    <div className='flex flex-row items-center justify-center'>
                                                        <button onClick={() => setEditTag(!editTag)} type='button' className='w-[130px] p-3 rounded-xl hover:bg-gray-500 bg-gray-400 flex flex-row items-center justify-center'>
                                                            <span className='text-white text-lg'>ยกเลิก</span>
                                                        </button>
                                                        <button onClick={onSaveData} type='button' className='w-[130px] ml-3 p-3 rounded-xl hover:bg-green-800 bg-green-700 flex flex-row items-center justify-evenly'>
                                                            <Save className='text-white' />
                                                            <span className='text-white text-lg'>บันทึก</span>
                                                        </button>
                                                    </div> :
                                                    <button onClick={() => setEditTag(!editTag)} type='button' className='p-3 rounded-xl hover:bg-blue-950 bg-blue-900 flex flex-row items-center justify-between'>
                                                        <Settings className='text-white' />
                                                        <span className='text-white text-lg ml-2'>แก้ไขแท็ก</span>
                                                    </button>
                                            }
                                        </div>
                                        {
                                            editTag ?
                                                <MissionEditTag retunArrayUseTag={onUpdateArr} /> :
                                                <MissionStateTag data={mission} missionTag={selectTag} />
                                        }
                                    </div>
                                </dammyDataContext.Provider>
                            </cartTagContext.Provider>
                        </CustomTabPanel>
                        <CustomTabPanel value={value} index={4}>
                            <MissionDashBoard mission={mission} />
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

