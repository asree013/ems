'use client'
import * as React from 'react';
import AspectRatio from '@mui/joy/AspectRatio';
import Avatar from '@mui/joy/Avatar';
import Box from '@mui/joy/Box';
import Card from '@mui/joy/Card';
import CardContent from '@mui/joy/CardContent';
import CardOverflow from '@mui/joy/CardOverflow';
import Link from '@mui/joy/Link';
import IconButton from '@mui/joy/IconButton';
import Input from '@mui/joy/Input';
import Typography from '@mui/joy/Typography';
import MoreHoriz from '@mui/icons-material/MoreHoriz';
import FavoriteBorder from '@mui/icons-material/FavoriteBorder';
import ModeCommentOutlined from '@mui/icons-material/ModeCommentOutlined';
import SendOutlined from '@mui/icons-material/SendOutlined';
import Face from '@mui/icons-material/Face';
import BookmarkBorderRoundedIcon from '@mui/icons-material/BookmarkBorderRounded';
import { useTheme } from '@mui/material/styles';
import MobileStepper from '@mui/material/MobileStepper';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';
import SwipeableViews from 'react-swipeable-views';
import { autoPlay } from 'react-swipeable-views-utils';
import { Cars } from '@/models/vehicle.model';
import { CarDetailContext, TCarDetailContent } from '@/components/car/CarDetail.context';

import HomeCss from '../HomeCss.module.css'

const AutoPlaySwipeableViews = autoPlay(SwipeableViews);

type CarProps = {
    car: Cars
    setCar: React.Dispatch<React.SetStateAction<Cars>>
}

export default function CarDetailHome({car, setCar}: CarProps) {
  return (
    <Card
      variant="outlined"
      sx={{
        minWidth: 200,
        '--Card-radius': (theme) => theme.vars.radius.xs,
      }}
    >
      <CardContent orientation="horizontal" sx={{ alignItems: 'center', gap: 1 }}>
        <Typography fontWeight="lg">{car.calling}</Typography>
        <IconButton variant="plain" color="neutral" size="sm" sx={{ ml: 'auto' }}>
          <MoreHoriz />
        </IconButton>
      </CardContent>
      <CardOverflow>
          <SwipeableTextMobileStepper car={car} />
      </CardOverflow>

    </Card>
  );
}

type Props ={
  car: Cars
}

function SwipeableTextMobileStepper({car}: Props) {

    let dataImage = [
      {
        imgPath: car.image_front,
        label: 'หน้ารถ'
      },
      {
        imgPath: car.image_back,
        label: 'หลังรถ'
      },
      {
        imgPath: car.image_left,
        label: 'ด้านซ้านตัวรถ'
      },
      {
        imgPath: car.image_rigth,
        label: 'ด้านหลังตัวรถ'
      },
    ]

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
  

