'use client'

import { Vehicles } from '@/models/vehicle.model';
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';
import MoreHoriz from '@mui/icons-material/MoreHoriz';
import Box from '@mui/joy/Box';
import Card from '@mui/joy/Card';
import CardContent from '@mui/joy/CardContent';
import CardOverflow from '@mui/joy/CardOverflow';
import IconButton from '@mui/joy/IconButton';
import Typography from '@mui/joy/Typography';
import Button from '@mui/material/Button';
import MobileStepper from '@mui/material/MobileStepper';
import Paper from '@mui/material/Paper';
import { useTheme } from '@mui/material/styles';
import * as React from 'react';
import SwipeableViews from 'react-swipeable-views';
import { autoPlay } from 'react-swipeable-views-utils';

import HomeCss from '../HomeCss.module.css';

const AutoPlaySwipeableViews = autoPlay(SwipeableViews);

type CarProps = {
  vehicles: Vehicles
}

export default function CarDetailHome({ vehicles }: CarProps) {
  return (
    <Card
      variant="outlined"
      sx={{
        minWidth: 200,
        '--Card-radius': (theme) => theme.vars.radius.xs,
      }}
    >
      <CardContent orientation="horizontal" sx={{ alignItems: 'center', gap: 1 }}>
        <Typography fontWeight="lg">
          {
            !vehicles.car?
            null:
            vehicles?.car?.Car.calling
          }
          {
            !vehicles.helicopter?
            null:
            vehicles?.helicopter.Helicopter.calling
          }
        </Typography>
        <IconButton variant="plain" color="neutral" size="sm" sx={{ ml: 'auto' }}>
          <MoreHoriz />
        </IconButton>
      </CardContent>
      <CardOverflow>
        <SwipeableTextMobileStepper vehicle={vehicles} />
      </CardOverflow>

    </Card>
  );
}


type Props = {
  vehicle: Vehicles
}

function SwipeableTextMobileStepper({ vehicle }: Props) {
  let dataImage: any[] = []

  if (vehicle.car) {
    dataImage = [
      {
        imgPath: vehicle.car.Car?.image_front,
        label: 'หน้ารถ'
      },
      {
        imgPath: vehicle.car.Car?.image_back,
        label: 'หลังรถ'
      },
      {
        imgPath: vehicle.car.Car?.image_left,
        label: 'ด้านซ้านตัวรถ'
      },
      {
        imgPath: vehicle.car.Car?.image_rigth,
        label: 'ด้านหลังตัวรถ'
      },
    ]
  }

  if (vehicle.helicopter) {
    dataImage = [
      {
        imgPath: vehicle.helicopter.Helicopter?.image_front,
        label: 'หน้ารถ'
      },
      {
        imgPath: vehicle.helicopter.Helicopter?.image_back,
        label: 'หลังรถ'
      },
      {
        imgPath: vehicle.helicopter.Helicopter?.image_left,
        label: 'ด้านซ้านตัวรถ'
      },
      {
        imgPath: vehicle.helicopter.Helicopter?.image_rigth,
        label: 'ด้านหลังตัวรถ'
      },
    ]
  }

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
      <Paper
        square
        elevation={0}
        sx={{
          display: 'flex',
          alignItems: 'center',
          height: 10,
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
                  display: 'block',
                  overflow: 'hidden',
                  width: '100%',
                }}
                className={HomeCss.imageCarSize}
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
    </Box>
  );
}


