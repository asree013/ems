'use client';
import * as React from 'react';
import Card from '@mui/material/Card';
import Box from '@mui/material/Box';
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';
import { Button, CardMedia, Fab, IconButton } from '@mui/material';
import { enviromentDev, enviromentPath } from '@/configs/enviroment.dev';
import HistoryIcon from '@mui/icons-material/History';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';;
import Loadding from '@/components/Loadding';

import MonitorHeartIcon from '@mui/icons-material/MonitorHeart';
import { assingPatinetToCarByCarIdAndPatientId } from '@/services/car.service';

import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

import { useTheme } from '@mui/material/styles';
import MobileStepper from '@mui/material/MobileStepper';
import Paper from '@mui/material/Paper';
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';
import SwipeableViews from 'react-swipeable-views';
import { autoPlay } from 'react-swipeable-views-utils';
import LocalAirportIcon from '@mui/icons-material/LocalAirport';
import MyMonitorVehicle from '@/app/monitors/MyMonitorVehicle';

type Props = {
    patient: {
        id: string
        first_name: string
        last_name: string
        qr_number: any
        gender: string
        age: any
        birthday: any
        id_card: any
        tel: any
        deviceId: string
        address: any
        group_blood: any
        image: string
        image_id_card: any
        user_create_id: any
        user_update_id: any
        date_time_died: any
        date_time_go_home: any
        create_date: string
        update_date: string
        mission_id: any
        risk_level_id: any
        History: Array<{
            id: string
            symptom_details: string
            status: string
            create_date: string
            update_date: string
            patient_id: string
            chief_complaint: string
            present_illness: string
            user_create_id: string
            user_update_id: string
            physical_status: string
            triage_lavel: string
            Exan: Array<{
                id: string
                element_id: string
                text: string
                image: string
                create_date: string
                update_date: string
                history_id: string
                user_create_id: string
                user_update_id: string
            }>
        }>
        OrderTransfer: Array<{
            id: string
            status_order: string
            element_seq: number
            create_date: string
            hospital_id: any
            patient_id: string
        }>
        Risklevel: any
    };
    order_tranfer_id?: string;
    car_id: string
};

export default function CardPatient({ patient, car_id }: Props) {
    const pathName = usePathname().includes('patient');
    const router = useRouter();
    const [isLoad, setIsLoad] = React.useState(false);
    const vehicle_id = useSearchParams().get('vehicle_id')


    async function handlerOnAddPatientInCar() {
        setIsLoad(true)
        try {
            if (vehicle_id) {
                await assingPatinetToCarByCarIdAndPatientId(vehicle_id, patient.id)
                // history.back()
            }
        } catch (error) {
            // timeOutJwt(error)
        } finally {
            setIsLoad(false)
        }
    }

    function handleAddMonitorInPatient() {
        setIsLoad(true)
        window.location.href = '/vehicle/' + car_id + '/car/detail/add_monitor?patient_add_id=' + patient.id
    }
    return (
        <>

            <Card variant="elevation" sx={{ maxWidth: 360, marginTop: '15px' }} elevation={3}>
                <Box sx={{ p: 2 }}>
                    <Stack
                        direction="row"
                        justifyContent="space-between"
                        alignItems="center"
                    >
                        <div>
                            <Typography
                                gutterBottom
                                variant="body1"
                                component="div"
                                style={{ fontWeight: 700 }}
                            >
                                {patient?.first_name ?? 'ไม่ทราบชื่อ'}
                            </Typography>
                            <Typography
                                gutterBottom
                                variant="body1"
                                component="div"
                                style={{ fontWeight: 700 }}
                            >
                                {patient?.last_name ?? 'ไม่ทราบสกุล'}
                            </Typography>
                            <Divider />
                            <Typography color="text.secondary" variant="body2">
                                เพศ: {patient.gender}
                            </Typography>
                            <Typography color="text.secondary" variant="body2">
                                อายุ: {patient.age ? patient.age : 'ไม่ทราบอายุ'}
                            </Typography>
                        </div>
                        <CardMedia
                            component="img"
                            sx={{ width: 100 }}
                            image={patient.image ? patient.image : enviromentPath.noImage}
                            alt="Live from space album cover"
                        />
                    </Stack>
                </Box>
                <Divider textAlign="left"><Chip label="ประวัติ" size="small" /></Divider>
                <Box sx={{ p: 2 }}>
                    {
                        patient?.History?.find(r => r.patient_id === patient.id) ?
                            null :
                            <Button onClick={() => {
                                setIsLoad(true)
                                window.location.href = '/patient/' + patient.id + '/history'
                            }} type='button' variant='contained'>เพิ่มประวัติ</Button>

                    }

                    {
                        patient.History === undefined || patient.History === null || patient.History.length === 0 ?
                            <div className='m-4'>
                                <p>ยังไม่มีข้อมูลประวัติ</p>
                            </div> :
                            <Accordion className='mt-2' elevation={3}>
                                <AccordionSummary
                                    expandIcon={<ExpandMoreIcon />}
                                    aria-controls="panel1-content"
                                    id="panel1-header"
                                >
                                    อาการ: {patient?.History?.find((r) => r.patient_id.includes(patient?.id))?.symptom_details}
                                </AccordionSummary>
                                <AccordionDetails>
                                    {
                                        patient?.History?.find((r, i) => r.patient_id === patient.id)?.Exan ?
                                            <SwipeableImage exam={patient?.History?.find((r, i) => r.patient_id === patient.id)?.Exan as any} /> :
                                            null
                                        // )
                                    }
                                    <p>อัพเดท เร็วๆนี้</p>
                                </AccordionDetails>
                            </Accordion>
                    }

                    {
                        patient.OrderTransfer === undefined || patient.OrderTransfer === null || patient.OrderTransfer.length === 0 ?
                            <div className='m-4'>
                                <p>ยังไม่มีข้อมูลจอแแสดงกราฟ</p>
                            </div> :
                            <Accordion className='mt-2' elevation={3}>
                                <AccordionSummary
                                    expandIcon={<ExpandMoreIcon />}
                                    aria-controls="panel1-content"
                                    id="panel1-header"
                                >
                                    หน้าจอแสดงกราฟ: {patient?.OrderTransfer.find(r => r.status_order.includes('Transfer'))?.status_order}
                                </AccordionSummary>
                                <AccordionDetails>
                                    <MyMonitorVehicle device_id={patient.deviceId} />
                                </AccordionDetails>
                            </Accordion>
                    }
                </Box>
                <Divider />
                <Box sx={{ p: 2, display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column' }}>
                    {
                        patient?.History[0]?.id.length > 0 ?
                            null :
                            <Stack className='m-1' direction="row" spacing={1}>
                                <Chip
                                    label="เพิ่มประวัติ"
                                    icon={<HistoryIcon />}
                                    onClick={handleAddMonitorInPatient}
                                    variant="outlined"
                                    color='success'
                                />
                            </Stack>
                    }
                    {
                        patient?.OrderTransfer.find(r => r.status_order.includes('Transfer'))?.id ?
                            null :
                            <Stack className='m-1' direction="row" spacing={1}>
                                <Chip
                                    label="เพิ่มจอแสดงข้อมูล"
                                    icon={<MonitorHeartIcon />}
                                    onClick={handleAddMonitorInPatient}
                                    variant="outlined"
                                    color='primary'
                                />
                            </Stack>
                    }
                    <Stack className='m-1' direction="row" spacing={1}>
                        <Chip
                            label="ย้ายผู้ป่วยขึ้น ฮ."
                            icon={<LocalAirportIcon />}
                            onClick={() => {
                                setIsLoad(true)
                                window.location.href = `/vehicle?tranfrom=helicopter&car_id=${car_id}&patient_id=${patient.id}`

                            }}
                            variant="outlined"
                            color='warning'
                        />
                    </Stack>
                </Box>

            </Card>

            {isLoad ?
                <Loadding /> :
                null
            }

        </>
    );
}

const AutoPlaySwipeableViews = autoPlay(SwipeableViews);

type PropSwipeabl = {
    exam:
    {
        id: string;
        element_id: string;
        text: string;
        image: string;
        create_date: string;
        update_date: string;
        history_id: string;
        user_create_id: string;
        user_update_id: string;

    }[]
}


function SwipeableImage({ exam }: PropSwipeabl) {
    // Fallback to an empty array if exam is undefined
    const dataImage: Array<{ imgPath: string; label: string }> = exam
        ? exam.map((r) => ({
            imgPath: r.image ?? enviromentDev.noImage,
            label: r.text,
        }))
        : [];

    const theme = useTheme();
    const [activeStep, setActiveStep] = React.useState(0);
    const maxSteps = dataImage.length;

    const handleNext = () => {
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
    };

    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };

    const handleStepChange = (step: number) => {
        setActiveStep(step);
    };

    return (
        <Box sx={{ maxWidth: 400, flexGrow: 1 }}>
            {dataImage.length > 0 ? (
                <>
                    <Paper
                        square
                        elevation={0}
                        sx={{
                            display: 'flex',
                            alignItems: 'center',
                            height: 30,
                            pl: 2,
                            bgcolor: 'background.default',
                        }}
                    >
                        <Typography>{dataImage[activeStep].label}</Typography>
                    </Paper>
                    <AutoPlaySwipeableViews
                        axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
                        index={activeStep}
                        onChangeIndex={handleStepChange}
                        enableMouseEvents
                    >
                        {dataImage.map((step, index) => (
                            <div key={step.label}>
                                {Math.abs(activeStep - index) <= 2 ? (
                                    <Box
                                        component="img"
                                        sx={{
                                            height: 'auto',
                                            display: 'block',
                                            overflow: 'hidden',
                                            maxWidth: 280,
                                            maxHeight: 200
                                        }}
                                        src={step.imgPath}
                                        alt={step.label}
                                    />
                                ) : null}
                            </div>
                        ))}
                    </AutoPlaySwipeableViews>
                    <MobileStepper
                        steps={maxSteps}
                        position="static"
                        activeStep={activeStep}
                        nextButton={
                            <Button
                                size="small"
                                onClick={handleNext}
                                disabled={activeStep === maxSteps - 1}
                            >
                                Next
                                {theme.direction === 'rtl' ? (
                                    <KeyboardArrowLeft />
                                ) : (
                                    <KeyboardArrowRight />
                                )}
                            </Button>
                        }
                        backButton={
                            <Button size="small" onClick={handleBack} disabled={activeStep === 0}>
                                {theme.direction === 'rtl' ? (
                                    <KeyboardArrowRight />
                                ) : (
                                    <KeyboardArrowLeft />
                                )}
                                Back
                            </Button>
                        }
                    />
                </>
            ) : (
                <Typography>No images available</Typography>
            )}
        </Box>
    );
}

