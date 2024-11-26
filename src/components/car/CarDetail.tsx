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
import { CarDetailContext, TCarDetailContent } from './CarDetail.context';
import { useTheme } from '@mui/material/styles';
import MobileStepper from '@mui/material/MobileStepper';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';
import SwipeableViews from 'react-swipeable-views';
import { autoPlay } from 'react-swipeable-views-utils';
import { Cars, Helicopters, Ships } from '@/models/vehicle.model';
import { ShipDetailContext, TShipDetailContext } from '@/app/vehicle/[vehicle]/ship/detail/ShipById.context';
import { THelicopterByIdDetail, HelicopterByIdDetailContext } from '../helicopter/helicopterDetail.context';
import HelicopterDetail from '../helicopter/HelicopterDetail';

const AutoPlaySwipeableViews = autoPlay(SwipeableViews);


export default function CarDetail() {
  const { carByid, setCarById } = React.useContext<TCarDetailContent>(CarDetailContext)
  const { shipById, setShipById } = React.useContext<TShipDetailContext>(ShipDetailContext)
  const {halicoptorById, setHelicopterById} = React.useContext<THelicopterByIdDetail>(HelicopterByIdDetailContext)

  return (
    <Card
      variant="outlined"
      sx={{
        minWidth: 300,
        '--Card-radius': (theme) => theme.vars.radius.xs,
      }}
    >
      <CardContent orientation="horizontal" sx={{ alignItems: 'center', gap: 1 }}>
        <Typography fontWeight="lg">
          {carByid?.calling?? null}
          {shipById?.calling?? null}
          {halicoptorById?.calling ?? null}
        </Typography>
        <IconButton variant="plain" color="neutral" size="sm" sx={{ ml: 'auto' }}>
          <MoreHoriz />
        </IconButton>
      </CardContent>
      <CardOverflow>
        <SwipeableTextMobileStepper data={{car: carByid, helicopter: halicoptorById, ship: shipById}} />
      </CardOverflow>

      <CardContent>
        <Link
          component="button"
          underline="none"
          fontSize="sm"
          fontWeight="lg"
          textColor="text.primary"
        >
          8.1M Likes
        </Link>
        <Typography fontSize="sm">
          {shipById?.description?? 'ไม่มีข้อมูลรายละเอียด'}
          {halicoptorById?.description?? 'ไม่มีข้อมูลรายละเอียด'}
          {carByid?.description?? 'ไม่มีข้อมูลรายละเอียด'}
        </Typography>
        <Link
          component="button"
          underline="none"
          fontSize="sm"
          startDecorator="…"
          sx={{ color: 'text.tertiary' }}
        >
          more
        </Link>
        <Link
          component="button"
          underline="none"
          fontSize="10px"
          sx={{ color: 'text.tertiary', my: 0.5 }}
        >
          2 DAYS AGO
        </Link>
      </CardContent>
      <CardContent orientation="horizontal" sx={{ gap: 1 }}>
        <IconButton size="sm" variant="plain" color="neutral" sx={{ ml: -1 }}>
          <Face />
        </IconButton>
        <Input
          variant="plain"
          size="sm"
          placeholder="Add a comment…"
          sx={{ flex: 1, px: 0, '--Input-focusedThickness': '0px' }}
        />
        <Link disabled underline="none" role="button">
          Post
        </Link>
      </CardContent>
    </Card>
  );
}

type Props = {
  data: {
    car?: Cars,
    helicopter?: Helicopters
    ship?: Ships
  }
}

function SwipeableTextMobileStepper({ data }: Props) {

  let dataImage: any[] = []

  if(data.car){
    dataImage = [
      {
        imgPath: data.car.image_front,
        label: 'หน้ารถ'
      },
      {
        imgPath: data.car.image_back,
        label: 'หลังรถ'
      },
      {
        imgPath: data.car.image_left,
        label: 'ด้านซ้านตัวรถ'
      },
      {
        imgPath: data.car.image_rigth,
        label: 'ด้านหลังตัวรถ'
      },
    ]
  }

  if(data.helicopter){
    dataImage = [
      {
        imgPath: data.helicopter.image_front,
        label: 'หน้า ฮ.'
      },
      {
        imgPath: data.helicopter.image_back,
        label: 'หลัง ฮ.'
      },
      {
        imgPath: data.helicopter.image_left,
        label: 'ด้านซ้านตัว ฮ.'
      },
      {
        imgPath: data.helicopter.image_rigth,
        label: 'ด้านหลังตัว ฮ.'
      },
    ]
  }
  if(data.ship){
    dataImage = [
      {
        imgPath: data.ship.image,
        label: 'รูปเรือ'
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
          height: 50,
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
                  maxWidth: 400,
                  overflow: 'hidden',
                  width: '100%',
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
    </Box>
  );
}


