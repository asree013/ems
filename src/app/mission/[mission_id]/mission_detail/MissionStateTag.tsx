import * as React from 'react';
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import StepContent from '@mui/material/StepContent';
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';

let steps = [
    {
        id: 0,
        label: 'รับภากิจ',
        time_stamp: '',
        description: `รับภารกิจ เพื่อเก็บข้อมูลเวลาเริ่มภารกิจ`,
    },
    {
        id: 1,
        label: 'เริ่มภากิจ',
        time_stamp: '',
        description: `เริ่มภารกิจ เพื่อเก็บข้อมูลเวลาเริ่มภารกิจ`,
    },
    {
        id: 2,
        label: 'ถึงที่เกิดเหตุ',
        time_stamp: '',
        description:
            'An ad group contains one or more ads which target a shared set of keywords.',
    },
    {
        id: 3,
        label: 'ออกจากที่เกิดเหตุ',
        time_stamp: '',
        description: `Try out different ad text to see what brings in the most customers,
              and learn how to enhance your ads using features like ad extensions.
              If you run into any problems with your ads, find out how to tell if
              they're running and how to resolve approval issues.`,
    },
    {
        id: 3,
        label: 'จบภารกิจ',
        time_stamp: '',
        description: `Try out different ad text to see what brings in the most customers,
              and learn how to enhance your ads using features like ad extensions.
              If you run into any problems with your ads, find out how to tell if
              they're running and how to resolve approval issues.`,
    },
];

export default function MissionStateTag() {
    const [activeStep, setActiveStep] = React.useState(0);
    const [] = React.useState()
    const handleNext = (i: number) => {
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
        const t = steps.filter((r) => {
            if(r.id === i) {
                return r.time_stamp = new Date().toLocaleString('th-TH')
            }
            else{
                return r
            }
        })
        steps = t
        
        
    };

    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };

    const handleReset = () => {
        setActiveStep(0);
    };

    function onGetDate() {
        
    }

    return (
        <Box sx={{ maxWidth: 400 }}>
            <Stepper activeStep={activeStep} orientation="vertical" style={{width: '100%'}}>
                {steps.map((step, index) => (
                    <Step key={step.label}>
                        <StepLabel
                        >
                            {step.label} {step.time_stamp? 'เวลา: '+ step.time_stamp.split(' ')[1]: ''}
                        </StepLabel>
                        <StepContent>
                            <Typography>{step.description}</Typography>
                            <Box sx={{ mb: 2 }}>
                                <div>
                                    <Button
                                        variant="contained"
                                        onClick={() => handleNext(index)}
                                        sx={{ mt: 1, mr: 1 }}
                                        color={index === steps.length - 1 ? 'success': 'primary'}
                                    >
                                        {index === 0 ? 'รับภารกิจ': null}
                                        {index === 1 ? 'เริ่มภารกิจ': null}
                                        {index > 1 && index !== steps.length -1  ? 'ถัดไป' : null}
                                        {index === steps.length -1  ? 'จบภารกิจ' : null}
                                        {/* {index === 0 ? 'เสร็จสิ้น' : 'ถัดไป'} */}
                                    </Button>
                                    <Button
                                        disabled={index === 0}
                                        onClick={handleBack}
                                        sx={{ mt: 1, mr: 1 }}
                                    >
                                        Back
                                    </Button>
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