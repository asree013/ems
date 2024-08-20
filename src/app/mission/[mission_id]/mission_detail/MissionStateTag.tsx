import * as React from 'react';
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import StepContent from '@mui/material/StepContent';
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import { Missions, MissionState, MissionTag } from '@/models/mission.model';
import { findMissionStateByMissionId, findMissionTagByMissionId, updateMissionTagByMissionId } from '@/services/mission.service';
import { timeOutJwt } from '@/services/timeout.service';

import CheckCircleIcon from '@mui/icons-material/CheckCircle';

let steps = [
    {
        id: 1,
        label: 'ทีมHEMSรับแจ้งภากิจ',
        time_stamp: '',
        description: `รับภารกิจ เพื่อเก็บข้อมูลเวลาเริ่มภารกิจ`,
    },
    {
        id: 2,
        label: 'ทีมHEMSพร้อม รถEMS ออกไปสนาม ฮ.',
        time_stamp: '',
        description: `เริ่มภารกิจ เพื่อเก็บข้อมูลเวลาเริ่มภารกิจ`,
    },
    {
        id: 3,
        label: 'ทีมHEMSพร้อม รถEMS ถึง สนาม ฮ.',
        time_stamp: '',
        description:
            'An ad group contains one or more ads which target a shared set of keywords.',
    },
    {
        id: 4,
        label: 'ฮ. ยกตัวไปสนาม ฮ. ที่หมายผู้ป่วย',
        time_stamp: '',
        description: `Try out different ad text to see what brings in the most customers,
              and learn how to enhance your ads using features like ad extensions.
              If you run into any problems with your ads, find out how to tell if
              they're running and how to resolve approval issues.`,
    },
    {
        id: 5,
        label: 'ฮ. ถึงสนาม ฮ. ที่หมายผู้ป่วย',
        time_stamp: '',
        description: `Try out different ad text to see what brings in the most customers,
              and learn how to enhance your ads using features like ad extensions.
              If you run into any problems with your ads, find out how to tell if
              they're running and how to resolve approval issues.`,
    },
    {
        id: 6,
        label: 'ทีมHEMS ออกเดินทางไป รพ.หรือจุดรับผู้ป่วย',
        time_stamp: '',
        description: `Try out different ad text to see what brings in the most customers,
              and learn how to enhance your ads using features like ad extensions.
              If you run into any problems with your ads, find out how to tell if
              they're running and how to resolve approval issues.`,
    },
    {
        id: 7,
        label: 'ทีมHEMS ถึง รพ.หรือจุดรับผู้ป่วย',
        time_stamp: '',
        description: `Try out different ad text to see what brings in the most customers,
              and learn how to enhance your ads using features like ad extensions.
              If you run into any problems with your ads, find out how to tell if
              they're running and how to resolve approval issues.`,
    },
    {
        id: 8,
        label: 'ทีมHEMS รับผู้ป่วยและทำการประเมิน ตกลงใจ',
        time_stamp: '',
        description: `Try out different ad text to see what brings in the most customers,
              and learn how to enhance your ads using features like ad extensions.
              If you run into any problems with your ads, find out how to tell if
              they're running and how to resolve approval issues.`,
    },
    {
        id: 9,
        label: 'ทีมHEMS ลำเลียงผู้ป่วยออกจาก รพ. หรือจุดรับผู้ป่วย',
        time_stamp: '',
        description: `Try out different ad text to see what brings in the most customers,
              and learn how to enhance your ads using features like ad extensions.
              If you run into any problems with your ads, find out how to tell if
              they're running and how to resolve approval issues.`,
    },
    {
        id: 10,
        label: 'รับผู้ป่วยขึ้น ฮ. เสร็จและประเมิน preflight assessment',
        time_stamp: '',
        description: `Try out different ad text to see what brings in the most customers,
              and learn how to enhance your ads using features like ad extensions.
              If you run into any problems with your ads, find out how to tell if
              they're running and how to resolve approval issues.`,
    },
    {
        id: 11,
        label: 'ฮ. ยกตัวไปสนาม ฮ. ปลายทางและประเมิน flight assessment',
        time_stamp: '',
        description: `Try out different ad text to see what brings in the most customers,
              and learn how to enhance your ads using features like ad extensions.
              If you run into any problems with your ads, find out how to tell if
              they're running and how to resolve approval issues.`,
    },
    {
        id: 12,
        label: 'ฮ. ถึงสนาม ฮ. ปลายทางและประเมินผู้ป่วยก่อนส่งต่อ ทีมภาคพื้น',
        time_stamp: '',
        description: `Try out different ad text to see what brings in the most customers,
              and learn how to enhance your ads using features like ad extensions.
              If you run into any problems with your ads, find out how to tell if
              they're running and how to resolve approval issues.`,
    },
    {
        id: 13,
        label: 'ทีมภาคพื้น พร้อมรถEMS ออกเดินทางไป รพ.ปลายทาง',
        time_stamp: '',
        description: `Try out different ad text to see what brings in the most customers,
              and learn how to enhance your ads using features like ad extensions.
              If you run into any problems with your ads, find out how to tell if
              they're running and how to resolve approval issues.`,
    },
    {
        id: 14,
        label: 'ทีมภาคพื้นพร้อมรถEMS ถึง รพ.ปลายทาง',
        time_stamp: '',
        description: `Try out different ad text to see what brings in the most customers,
              and learn how to enhance your ads using features like ad extensions.
              If you run into any problems with your ads, find out how to tell if
              they're running and how to resolve approval issues.`,
    },
    {
        id: 15,
        label: 'ทีมภาคพื้น ส่งผู้ป่วย ที่รพ.ปลายทางเรียบร้อย พร้อมสรุปreport',
        time_stamp: '',
        description: `Try out different ad text to see what brings in the most customers,
              and learn how to enhance your ads using features like ad extensions.
              If you run into any problems with your ads, find out how to tell if
              they're running and how to resolve approval issues.`,
    },
    {
        id: 16,
        label: 'สรุปภารกิจระหว่างทีมHEMSและทีมนักบิน',
        time_stamp: '',
        description: `Try out different ad text to see what brings in the most customers,
              and learn how to enhance your ads using features like ad extensions.
              If you run into any problems with your ads, find out how to tell if
              they're running and how to resolve approval issues.`,
    },
    {
        id: 17,
        label: 'ฮ. ยกตัวบินกลับถึง สนาม ฮ. และส่งทีมHEMSลง',
        time_stamp: '',
        description: `Try out different ad text to see what brings in the most customers,
              and learn how to enhance your ads using features like ad extensions.
              If you run into any problems with your ads, find out how to tell if
              they're running and how to resolve approval issues.`,
    },
    {
        id: 18,
        label: 'รถEMSรับทีมHEMS จากสนาม ฮ.',
        time_stamp: '',
        description: `Try out different ad text to see what brings in the most customers,
              and learn how to enhance your ads using features like ad extensions.
              If you run into any problems with your ads, find out how to tell if
              they're running and how to resolve approval issues.`,
    },
    {
        id: 19,
        label: 'รถEMSและทีมHEMS กลับถึงที่ตั้ง',
        time_stamp: '',
        description: `Try out different ad text to see what brings in the most customers,
              and learn how to enhance your ads using features like ad extensions.
              If you run into any problems with your ads, find out how to tell if
              they're running and how to resolve approval issues.`,
    },
];

let stepsDammy = [
    {
        label: 'ศูนย์เฮลิคอปเตอร์พยาบาล(HOC)รับแจ้งเหตุ',
        status: 1,
        description: `สถาณะนี้จะแสดงขึ้นเมื่อศูนย์เฮลิคอปเตอร์พยาบาล(HOC)รับแจ้งเหตุ`,
    },
    {
        label: 'ทีมHEMSรับแจ้งภากิจ',
        status: 2,
        description: `ทีมHEMSรับแจ้งภากิจ เพื่อเตรียมพร้อมออกปฎิบัตการ`,
    },
    {
        label: 'ทีมHEMSพร้อม รถEMS ออกไปสนาม ฮ.',
        status: 3,
        description: `กดถัดไปเมื่อทีมHEMSพร้อม รถEMS ออกไปสนาม ฮ. เพื่อเก็บข้อมูลเวลาออกไปสนาม ฮ.`,
    },
    {
        label: 'ทีมHEMSพร้อม รถEMS ถึง สนาม ฮ.',
        status: 4,
        description:
            'กดถัดไปเมื่อทีมHEMSพร้อม รถEMS ถึง สนาม ฮ.',
    },
    {
        label: 'ฮ. ยกตัวไปสนาม ฮ. ที่หมายผู้ป่วย',
        status: 5,
        description: `กดถัดไปเมื่อ ฮ. ยกตัวไปสนาม ฮ. ที่หมายผู้ป่วย`,
    },
    {
        label: 'ฮ. ถึงสนาม ฮ. ที่หมายผู้ป่วย',
        status: 6,
        description: `กดถัดไปเมื่อ ฮ. ถึงสนาม ฮ. ที่หมายผู้ป่วย`,
    },
    {
        label: 'ทีมHEMS ออกเดินทางไป รพ.หรือจุดรับผู้ป่วย',
        status: 7,
        description: `กดถัดไปเมื่อ ทีมHEMS ออกเดินทางไป รพ.หรือจุดรับผู้ป่วย`,
    },
    {
        label: 'ทีมHEMS ถึง รพ.หรือจุดรับผู้ป่วย',
        status: 8,
        description: `กดถัดไปเมื่อทีมHEMS ถึง รพ.หรือจุดรับผู้ป่วย`,
    },
    {
        label: 'ทีมHEMS รับผู้ป่วยและทำการประเมิน ตกลงใจ',
        status: 9,
        description: `กดถัดไปเมื่อทีมHEMS รับผู้ป่วยและทำการประเมิน ตกลงใจ`,
    },
    {
        label: 'ทีมHEMS ลำเลียงผู้ป่วยออกจาก รพ. หรือจุดรับผู้ป่วย',
        status: 10,
        description: `กดถัดไปเมื่อทีมHEMS ลำเลียงผู้ป่วยออกจาก รพ. หรือจุดรับผู้ป่วย`,
    },
    {
        label: 'รับผู้ป่วยขึ้น ฮ. เสร็จและประเมิน preflight assessment',
        status: 11,
        description: `กดถัดไปเมื่อรับผู้ป่วยขึ้น ฮ. เสร็จและประเมิน preflight assessment`,
    },
    {
        label: 'ฮ. ยกตัวไปสนาม ฮ. ปลายทางและประเมิน flight assessment',
        status: 12,
        description: `กดถัดไปเมื่อ ฮ. ยกตัวไปสนาม ฮ. ปลายทางและประเมิน flight assessment`,
    },
    {
        label: 'ฮ. ถึงสนาม ฮ. ปลายทางและประเมินผู้ป่วยก่อนส่งต่อ ทีมภาคพื้น',
        status: 13,
        description: `กดถัดไปเมื่อ ฮ. ถึงสนาม ฮ. ปลายทางและประเมินผู้ป่วยก่อนส่งต่อ ทีมภาคพื้น`,
    },
    {
        label: 'ทีมภาคพื้น พร้อมรถEMS ออกเดินทางไป รพ.ปลายทาง',
        status: 14,
        description: `กดถัดไปเมื่อทีมภาคพื้น พร้อมรถEMS ออกเดินทางไป รพ.ปลายทาง`,
    },
    {
        label: 'ทีมภาคพื้นพร้อมรถEMS ถึง รพ.ปลายทาง',
        status: 15,
        description: `กดถัดไปเมื่อ ทีมภาคพื้นพร้อมรถEMS ถึง รพ.ปลายทาง`,
    },
    {
        label: 'ทีมภาคพื้น ส่งผู้ป่วย ที่รพ.ปลายทางเรียบร้อย พร้อมสรุปreport',
        status: 16,
        description: `กดถัดไปเมื่อทีมภาคพื้น ส่งผู้ป่วย ที่รพ.ปลายทางเรียบร้อย พร้อมสรุปreport`,
    },
    {
        label: 'สรุปภารกิจระหว่างทีมHEMSและทีมนักบิน',
        status: 17,
        description: `กดถัดไปเมื่อสรุปภารกิจระหว่างทีมHEMSและทีมนักบิน`,
    },
    {
        label: 'ฮ. ยกตัวบินกลับถึง สนาม ฮ. และส่งทีมHEMSลง',
        status: 18,
        description: `กดถัดไปเมื่อ ฮ. ยกตัวบินกลับถึง สนาม ฮ. และส่งทีมHEMSลง`,
    },
    {
        label: 'รถEMSรับทีมHEMS จากสนาม ฮ.',
        status: 19,
        description: `กดถัดไปเมื่อรถEMSรับทีมHEMS จากสนาม ฮ.`,
    },
    {
        label: 'รถEMSและทีมHEMS กลับถึงที่ตั้ง',
        status: 20,
        description: `กดถัดไปเมื่อรถEMSและทีมHEMS กลับถึงที่ตั้ง`,
    },
];


type Props = {
    data: Missions
}

export default function MissionStateTag({ data }: Props) {
    steps[0].time_stamp = new Date(data.create_date).toLocaleString('th-TH')
    const [missionState, setMissionState] = React.useState<MissionState>({} as MissionState)
    const [missionTag, setMissionTag] = React.useState<MissionTag[]>({} as MissionTag[])

    const [activeStep, setActiveStep] = React.useState(1);

    const findStateByMissionId = React.useCallback(async () => {
        try {
            const result = await findMissionStateByMissionId(data.id)
            setMissionState(result.data)
            setActiveStep(result.data.status)


        } catch (error) {
            timeOutJwt(error)
        }
    }, [setMissionState])

    const findTagAll = React.useCallback(async () => {
        try {
            const result = await findMissionTagByMissionId(data.id)
            setMissionTag(result.data)
        } catch (error) {
            timeOutJwt(error)
        }
    }, [setMissionTag])

    async function updateTagCurrentByMissionIdAndTagId(tag_id: string, newCerrenr: number) {
        try {
            const result = await updateMissionTagByMissionId(data.id, tag_id, newCerrenr)
            console.log(result.data);

            setMissionState(result.data)
        } catch (error) {
            console.log(error);

        }
    }

    React.useEffect(() => {
        findStateByMissionId()
        findTagAll()

        return () => {
            findStateByMissionId
            findTagAll
        }
    }, [findStateByMissionId, findTagAll])

    const handleNext = (i: number) => {
        const findMis = missionTag.find(r => r.status === missionState.status)
        if (findMis) {
            console.log(findMis.status + 1);
            const newCurrent = missionTag.find(r => r.status >= findMis.status + 1)
            if (newCurrent) {
                updateTagCurrentByMissionIdAndTagId(newCurrent.id, newCurrent.status)
                setActiveStep((prevActiveStep) => prevActiveStep + 1);
                const t = steps.filter((r) => {
                    if (r.id === i) {
                        return r.time_stamp = new Date().toLocaleString('th-TH')
                    }
                    else {
                        return r
                    }
                })
                steps = t
            }
        }

    };

    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };

    const handleReset = () => {
        setActiveStep(0);
    };

    return (
        <Box sx={{ maxWidth: 400 }}>
            <Stepper activeStep={activeStep} orientation="vertical" style={{ width: '100%' }}>
                {steps.map((step, index) => (
                    <Step key={step.label}>
                        <StepLabel >
                            {step.label} {step.time_stamp ? 'เวลา: ' + step.time_stamp.split(' ')[1] : ''}
                        </StepLabel>
                        <StepContent>
                            <Typography>{step.description}</Typography>
                            <Box sx={{ mb: 2 }}>
                                <div>
                                    <Button
                                        variant="contained"
                                        onClick={() => handleNext(index)}
                                        sx={{ mt: 1, mr: 1 }}
                                        color={index === steps.length - 1 ? 'success' : 'primary'}
                                    >
                                        {index === 0 ? 'รับภารกิจ' : null}
                                        {index > 0 && index !== steps.length - 1 ? 'ถัดไป' : null}
                                        {index === steps.length - 1 ? 'จบภารกิจ' : null}
                                        {/* {index === 0 ? 'เสร็จสิ้น' : 'ถัดไป'} */}
                                    </Button>
                                    <Button
                                        color='secondary'
                                        variant='contained'
                                        onClick={handleBack}
                                        sx={{ mt: 1, mr: 1 }}
                                    >
                                        ข้าม
                                    </Button>
                                    <Button
                                        color='success'
                                        variant='contained'
                                        onClick={handleBack}
                                        sx={{ mt: 1, mr: 1 }}
                                    >
                                        จบภารกิจ
                                    </Button>
                                    {/* <Button
                                        disabled={index === 0}
                                        onClick={handleBack}
                                        sx={{ mt: 1, mr: 1 }}
                                    >
                                        Back
                                    </Button> */}
                                </div>
                            </Box>
                        </StepContent>
                    </Step>
                ))}
            </Stepper>
            {activeStep === steps.length && (
                <Paper square elevation={0} sx={{ p: 3 }}>
                    <Typography>All steps completed - you&apos;re finished</Typography>
                    <Button onClick={handleReset} sx={{ mt: 1, mr: 1 }}>
                        Reset
                    </Button>
                </Paper>
            )}
        </Box>
    );
}