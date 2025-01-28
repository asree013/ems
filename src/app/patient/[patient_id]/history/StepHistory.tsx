import * as React from 'react';
import Box from '@mui/material/Box';
import { useTheme } from '@mui/material/styles';
import MobileStepper from '@mui/material/MobileStepper';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';
import { TraigeLevelContext, TTriageLvelContext } from './StepContext';
import { toast } from '@/services/alert.service';
import { TriageLevels } from '@/models/historyDetail.model';
import { Divider } from '@mui/material';
import TriageLevel from './stepForm/TriageLevel';
import Vs from './stepForm/Vs';
import Ga from './stepForm/Ga';
import Airway from './stepForm/Airway';
import HistoryCreate from './stepForm/HistoryCreate';
import Respi from './stepForm/Respi';
import Cvs from './stepForm/Cvs';
import Neuro from './stepForm/Neuro';
import CreateHistoryFrom from './stepForm/CreateHistoryFrom';
import MotorPower from './stepForm/MotorPower';
import Circulation from './stepForm/Circulation';

const steps = [
  {
    label: "Circulation",
    component: <Circulation />
  },
  {
    label: 'กรอกรายละเอียด',
    component: <HistoryCreate />,
  },
  {
    label: 'เลือก Triage Level',
    component: <TriageLevel />,
  },
  {
    label: 'V/S',
    component: <Vs />
  },
  {
    label: 'GA',
    component: <Ga />
  },
  {
    label: 'Airway',
    component: <Airway />
  },
  {
    label: 'Respi',
    component: <Respi />
  },
  {
    label: 'CVS',
    component: <Cvs />
  },
  {
    label: 'Neuro / Glasgow Coma Scale (GCS)',
    component: <Neuro />
  },
  {
    label: 'Motor Power',
    component: <MotorPower />
  },

  {
    label: 'สร้างประวัติ',
    component: <CreateHistoryFrom />
  },

];

export default function StepHistory() {
  const theme = useTheme();
  const [activeStep, setActiveStep] = React.useState(0);
  const maxSteps = steps.length;
  const { setTriageLevel, triageLevel } = React.useContext<TTriageLvelContext>(TraigeLevelContext)

  function handleNext() {
    console.log(triageLevel)
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  return (
    <Box sx={{ maxWidth: 400, flexGrow: 1 }}>
      <Paper
        square
        elevation={0}
        sx={{
          display: 'flex',
          alignItems: 'center',
          height: 50,
          pl: 2,
          bgcolor: 'background.default',
        }}
      >
        <Typography sx={{ fontSize: '1.2rem', fontWeight: 700 }}>{steps[activeStep].label}</Typography>
      </Paper>
      <Divider />

      <Box sx={{ height: '100%', maxWidth: 400, width: '100%', p: 2 }}>
        {steps[activeStep].component}
      </Box>

      <MobileStepper
        variant="text"
        steps={maxSteps}
        position="static"
        activeStep={activeStep}
        nextButton={
          <Button
            size="small"
            onClick={handleNext}
            disabled={activeStep === maxSteps - 1}
          >
            ตัดไป
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
    </Box>
  );
}
