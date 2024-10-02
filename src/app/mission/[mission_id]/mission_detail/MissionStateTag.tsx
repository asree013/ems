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
import HourglassEmptyIcon from '@mui/icons-material/HourglassEmpty';
import CancelIcon from '@mui/icons-material/Cancel';
import HourglassFullTwoToneIcon from '@mui/icons-material/HourglassFullTwoTone';

type Props = {
    data: Missions
}

export default function MissionStateTag({ data }: Props) {
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
                // const t = missionTag.filter((r, index) => {
                //     if (index === i) {
                //         return r.time_stamp = new Date().toLocaleString('th-TH')
                //     }
                //     else {
                //         return r
                //     }
                // })
                // steps = t
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
                {
                    Object.keys(missionTag).length > 0 ?
                        missionTag.map((step, index) => (
                            <Step key={index}>
                                {generateFixIcon(index, activeStep, step)}

                                <StepContent>
                                    <Typography>{step.description}</Typography>
                                    <Box sx={{ mb: 2 }}>
                                        <div>
                                            <Button
                                                variant="contained"
                                                onClick={() => handleNext(index)}
                                                sx={{ mt: 1, mr: 1 }}
                                                color={index === missionTag.length - 1 ? 'success' : 'primary'}
                                            >
                                                {index === 0 ? 'รับภารกิจ' : null}
                                                {index > 0 && index !== missionTag.length - 1 ? 'ถัดไป' : null}
                                                {index === missionTag.length - 1 ? 'จบภารกิจ' : null}
                                                {/* {index === 0 ? 'เสร็จสิ้น' : 'ถัดไป'} */}
                                            </Button>
                                            {/* <Button
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
                                            </Button> */}
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
                        )) :
                        <p>Load Step Mission</p>
                }
            </Stepper>
            {activeStep === missionTag.length && (
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

const StepIconDoing = () => {
    return <HourglassFullTwoToneIcon color='warning' />
};

const StepIconCheck = () => {

    return <CheckCircleIcon color='success' />
};

const StepIconNotDo = () => {
    return <CancelIcon color='error' />
};

function generateFixIcon(index: number, currentIndex: number, step: MissionTag) {
    switch (true) {
        case index === 0:
            console.log('index0');

            return (
                <StepLabel StepIconComponent={StepIconCheck} data-last="true">
                    <div style={{ display: 'flex', alignItems: 'start', justifyContent: 'center', flexDirection: 'column' }}>
                        <p style={{ width: '100%' }}>{step.label}</p>
                        <p> เวลา: {new Date(step.create_date).toLocaleString('th-TH')} </p>
                    </div>

                </StepLabel>
            );
        case index === currentIndex:
            return (
                <StepLabel StepIconComponent={StepIconDoing}>
                    <p style={{background: '#F37335', padding: '3px', borderRadius: '5px', color: 'whitesmoke'}}>
                        {step.label}
                    </p>
                </StepLabel>
            );
        case index < currentIndex:
            return (
                <StepLabel StepIconComponent={StepIconCheck}>
                    <div style={{ display: 'flex', alignItems: 'start', justifyContent: 'center', flexDirection: 'column' }}>
                        <p style={{ width: '100%' }}>{step.label}</p>
                        <p> เวลา: {new Date(step.create_date).toLocaleString('th-TH')} </p>
                    </div>
                </StepLabel>
            );
        case index > currentIndex:
            return (
                <StepLabel StepIconComponent={StepIconNotDo}>
                    {step.label}
                </StepLabel>
            );
    }
}
