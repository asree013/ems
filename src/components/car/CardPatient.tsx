'use client';
import * as React from 'react';
import Card from '@mui/material/Card';
import Box from '@mui/material/Box';
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';
import { Patients } from '@/models/patient';
import { Button, CardMedia, Fab, IconButton } from '@mui/material';
import { enviromentDev, enviromentPath } from '@/configs/enviroment.dev';
import HistoryIcon from '@mui/icons-material/History';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import PersonAddAltIcon from '@mui/icons-material/PersonAddAlt';
import {
    editOrderTranferByOrderId,
    findOrderTranferByOrderId,
} from '@/services/order_tranfer.service';
import { OrderTranfer } from '@/models/order_tranfer.model';
import { toast } from '@/services/alert.service';
import Loadding from '@/components/Loadding';

import DirectionsCarIcon from '@mui/icons-material/DirectionsCar';

import EditCalendarIcon from '@mui/icons-material/EditCalendar';
import { timeOutJwt } from '@/services/timeout.service';
import { assingPatinetToCarByCarIdAndPatientId } from '@/services/car.service';

import Accordion from '@mui/material/Accordion';
import AccordionActions from '@mui/material/AccordionActions';
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
import { Exans, ExanShows } from '@/models/exan.model';

type Props = {
    patient: Patients;
    order_tranfer_id?: string;
};

export default function CardPatient({ patient }: Props) {
    const pathName = usePathname().includes('patient');
    const router = useRouter();
    const [isLoad, setIsLoad] = React.useState(false);
    const key = useSearchParams().get('key')
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
                                {patient.first_name}
                            </Typography>
                            <Typography
                                gutterBottom
                                variant="body1"
                                component="div"
                                style={{ fontWeight: 700 }}
                            >
                                {patient.last_name}
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
                    <Button type='button' variant='contained'>เพิ่มประวัต</Button>

                    {
                        !patient.History ?
                            <p>ยังไม่มีข้อมูล</p> :
                            <Accordion className='mt-2' elevation={3}>
                                <AccordionSummary
                                    expandIcon={<ExpandMoreIcon />}
                                    aria-controls="panel1-content"
                                    id="panel1-header"
                                >
                                    อาการ: {patient.History[0].symptom_details}
                                </AccordionSummary>
                                <AccordionDetails>
                                    {/* {
                                        <SwipeableTextMobileStepper history_id={patient.History[0].id} />
                                    } */}
                                    <p>อัพเดท เร็วๆนี้</p>
                                </AccordionDetails>
                            </Accordion>
                    }
                </Box>
                <Divider />
                <Box sx={{ p: 2 }}>
                    <Stack direction="row" spacing={1}>
                        <Chip
                            label="เพื่มจอแสดงข้อมูล"
                            icon={<DirectionsCarIcon />}
                            onClick={handlerOnAddPatientInCar}
                            variant="outlined"
                            color='success'
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


function SwipeableTextMobileStepper({ history_id }: { history_id: string }) {

    const [history, setHistory] = React.useState<History>()
    const theme = useTheme();
    const [activeStep, setActiveStep] = React.useState(0);
    // const maxSteps = exan?.length;

    const handleNext = () => {
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
    };

    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };

    const handleStepChange = (step: number) => {
        setActiveStep(step);
    };

    // if (exan) {
    //     return (
    //         <Box sx={{ maxWidth: 400, flexGrow: 1 }}>
    //             <Paper
    //                 square
    //                 elevation={0}
    //                 sx={{
    //                     display: 'flex',
    //                     alignItems: 'center',
    //                     height: 50,
    //                     pl: 2,
    //                     bgcolor: 'background.default',
    //                 }}
    //             >
    //                 <Typography>{exan[activeStep].text}</Typography>
    //             </Paper>
    //             <AutoPlaySwipeableViews
    //                 axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
    //                 index={activeStep}
    //                 onChangeIndex={handleStepChange}
    //                 enableMouseEvents
    //             >
    //                 {exan.map((step, index) => (
    //                     <div key={step.id}>
    //                         {Math.abs(activeStep - index) <= 2 ? (
    //                             <Box
    //                                 component="img"
    //                                 sx={{
    //                                     height: 'auto',
    //                                     display: 'block',
    //                                     maxWidth: 400,
    //                                     overflow: 'hidden',
    //                                     width: '100%',
    //                                 }}
    //                                 src={step.ImageExan[0] ? step.ImageExan[0].src : enviromentDev.noImage}
    //                                 alt={step.text}
    //                             />
    //                         ) : null}
    //                     </div>
    //                 ))}
    //             </AutoPlaySwipeableViews>
    //             <MobileStepper
    //                 steps={maxSteps}
    //                 position="static"
    //                 activeStep={activeStep}
    //                 nextButton={
    //                     <Button
    //                         size="small"
    //                         onClick={handleNext}
    //                         disabled={activeStep === maxSteps - 1}
    //                     >
    //                         Next
    //                         {theme.direction === 'rtl' ? (
    //                             <KeyboardArrowLeft />
    //                         ) : (
    //                             <KeyboardArrowRight />
    //                         )}
    //                     </Button>
    //                 }
    //                 backButton={
    //                     <Button size="small" onClick={handleBack} disabled={activeStep === 0}>
    //                         {theme.direction === 'rtl' ? (
    //                             <KeyboardArrowRight />
    //                         ) : (
    //                             <KeyboardArrowLeft />
    //                         )}
    //                         Back
    //                     </Button>
    //                 }
    //             />
    //         </Box>
    //     );
    // }
}
