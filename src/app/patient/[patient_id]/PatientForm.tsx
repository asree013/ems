'use client';
import * as React from 'react';
import Card from '@mui/joy/Card';
import CardActions from '@mui/joy/CardActions';
import CardContent from '@mui/joy/CardContent';
import Checkbox from '@mui/joy/Checkbox';
import Divider from '@mui/joy/Divider';
import FormControl from '@mui/joy/FormControl';
import FormLabel from '@mui/joy/FormLabel';
import Input from '@mui/joy/Input';
import Typography from '@mui/joy/Typography';
import Button from '@mui/joy/Button';
import { usePathname } from 'next/navigation';
import { NIL } from 'uuid';

import PermContactCalendarIcon from '@mui/icons-material/PermContactCalendar';
import LocalPhoneIcon from '@mui/icons-material/LocalPhone';
import BadgeIcon from '@mui/icons-material/Badge';
import DetailsIcon from '@mui/icons-material/Details';
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Box,
} from '@mui/material';

import { AspectRatio } from '@mui/joy';
import CardOverflow from '@mui/joy/CardOverflow';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import pateintIdCss from './patient_id.module.css';
import PatientImageCard from './PatientImageCard';
import { PContext, PatientContext } from '@/contexts/patient.context';
import { useContext, useState } from 'react';

import BoxJ from '@mui/joy/Box';
import FormLabelJ from '@mui/joy/FormLabel';
import Radio, { radioClasses } from '@mui/joy/Radio';
import RadioGroup from '@mui/joy/RadioGroup';
import Sheet from '@mui/joy/Sheet';
import Done from '@mui/icons-material/Done';
import Loadding from '@/components/Loadding';
import { uploadBase64Image, uploadImage } from '@/services/uploadImage.service';
type Props = {
  returnOnCreatePatient: () => void;
  returnOnUpdatePatient: () => void;
};

export default function PatientForm({
  returnOnCreatePatient,
  returnOnUpdatePatient,
}: Props) {
  const pathName = usePathname().includes(NIL);
  const { patient, setPatient } = useContext<PContext>(PatientContext);
  const [onCheck, setOnCheck] = useState(false);
  const [load, setLoad] = useState(false)

  return (
    <>
      <div className={pateintIdCss.patient_toggle}>
        <Accordion elevation={4}>
          <AccordionSummary
            expandIcon={'v'}
            aria-controls="panel1-content"
            id="panel1-header"
            onClick={() => {
              onCheck ? setOnCheck(false) : setOnCheck(true);
            }}
          >
            <Checkbox
              label={pathName ? 'กรอรายละเอียดข้อมูล' : 'แก้ไขรายละเอียดข้อมูล'}
              sx={{ gridColumn: '1/-1', my: 1 }}
              checked={onCheck}
            />
          </AccordionSummary>
          <AccordionDetails>
            <Typography level="title-lg" startDecorator={<DetailsIcon />}>
              {pathName ? 'Detail Patients' : 'Edit Patients'}
            </Typography>
            <Divider inset="none" />
            <CardContent
              sx={{
                display: 'grid',
                gridTemplateColumns: 'repeat(2, minmax(80px, 1fr))',
                gap: 1.5,
                marginTop: '10px'
              }}
            >
              <FormControl>
                <FormLabel>Fistname</FormLabel>
                <Input
                  value={patient.first_name ? patient.first_name : ''}
                  onChange={(e) =>
                    setPatient({ ...patient, first_name: e.target.value })
                  }
                  endDecorator={'ชื่อ'}
                />
              </FormControl>
              <FormControl>
                <FormLabel>Lastname</FormLabel>
                <Input
                  value={patient.last_name}
                  onChange={(e) =>
                    setPatient({ ...patient, last_name: e.target.value })
                  }
                  endDecorator={'นามสกุล'}
                />
              </FormControl>
              <FormControl>
                <FormLabel>Birthday</FormLabel>
                <Input
                  onChange={(e) => {
                    setPatient({ ...patient, birthday: e.target.value });
                    setPatient({
                      ...patient,
                      age: new Date().getFullYear() - Number(e.target.value.split('-')),
                    });
                  }}
                  type="date"
                  endDecorator={'D/M/Y'}
                />
              </FormControl>
              <FormControl>
                <FormLabel>Age</FormLabel>
                <Input
                  type='number'
                  value={patient.age ? patient.age : 0}
                  onChange={(e) =>
                    setPatient({ ...patient, age: Number(e.target.value )})
                  }
                  endDecorator={<PermContactCalendarIcon />}
                />
              </FormControl>
              <FormControl>
                <FormLabel>idCard</FormLabel>
                <Input
                  onChange={(e) =>
                    setPatient({ ...patient, id_card: e.target.value })
                  }
                  endDecorator={<BadgeIcon />}
                />
              </FormControl>
              <FormControl>
                <FormLabel>Phone</FormLabel>
                <Input
                  onChange={(e) =>
                    setPatient({ ...patient, tel: e.target.value })
                  }
                  endDecorator={<LocalPhoneIcon />}
                />
              </FormControl>


              <FormControl sx={{ gridColumn: '1/-1' }}>
                <Box sx={{ resize: 'horizontal', overflow: 'auto', px: 2 }}>
                  <FormLabel
                    id="product-size-attribute"
                    sx={{
                      mb: 1.5,
                      fontWeight: 'xl',
                      textTransform: 'uppercase',
                      fontSize: 'xs',
                      letterSpacing: '0.1em',
                    }}
                  >
                    กรุ็ปเลือด
                  </FormLabel>
                  <RadioGroup
                    aria-labelledby="product-size-attribute"
                    sx={{ gap: 2, mb: 2, flexWrap: 'wrap', flexDirection: 'row' }}
                    onChange={(e) => setPatient({ ...patient, group_blood: e.target.value })}
                  >
                    {['A', 'B', 'AB', 'O'].map((size) => (
                      <Sheet
                        key={size}
                        sx={{
                          position: 'relative',
                          width: 40,
                          height: 40,
                          flexShrink: 0,
                          borderRadius: '50%',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          '--joy-focus-outlineOffset': '4px',
                          '--joy-palette-focusVisible': (theme) =>
                            theme.vars.palette.neutral.outlinedBorder,
                          [`& .${radioClasses.checked}`]: {
                            [`& .${radioClasses.label}`]: {
                              fontWeight: 'lg',
                            },
                            [`& .${radioClasses.action}`]: {
                              '--variant-borderWidth': '2px',
                              borderColor: 'text.secondary',
                            },
                          },
                          [`& .${radioClasses.action}.${radioClasses.focusVisible}`]: {
                            outlineWidth: '2px',
                          },
                        }}
                      >
                        <Radio color="neutral" overlay disableIcon value={size} label={size} />
                      </Sheet>
                    ))}
                  </RadioGroup>
                </Box>
              </FormControl>


            </CardContent>
          </AccordionDetails>
        </Accordion>
        <Box className="patientImage">
          <input type="file" id='profileP' onChange={async(e) => {
            setLoad(true)
            if (e.target.files) {
                const image = await uploadBase64Image(e.target.files[0])
                setPatient({ ...patient, image: String(image) })
              
                setLoad(false)
            }
          }} hidden />

          <input type="file" id='profileId' onChange={async (e) => {
            setLoad(true)
            if (e.target.files) {
              const image = await uploadBase64Image(e.target.files[0])
              setPatient({ ...patient, image_id_card: String(image) })
              setLoad(false)
            }
          }} hidden />

          {patient.image ? (
            <div onClick={() => document.getElementById('profileP')?.click()} className='mt-3'>
              <PatientImageCard
                value={{ key: 'profile', image: patient.image }}
              />
            </div>
          ) : (
            <div onClick={() => document.getElementById('profileP')?.click()} className='mt-3'>
              <Card
                orientation="horizontal"
                size="sm"
                sx={{
                  bgcolor: 'background.surface',
                  borderRadius: 0,
                  mb: 1,
                  cursor: 'pointer'

                }}

              >
                <CardOverflow>
                  <AspectRatio
                    ratio="1"
                    sx={{
                      minWidth: 70,
                      '& img[data-first-child]': { p: 1.5 },
                    }}
                  >
                    <AccountBoxIcon />
                  </AspectRatio>
                </CardOverflow>
                <CardContent>
                  <Typography textAlign="center" level="h4">
                    +
                  </Typography>
                  <Typography level="title-md">upload Profile</Typography>
                </CardContent>
              </Card>
            </div>
          )}
          {patient.image_id_card ? (
            <div className='mt-3' onClick={() => document.getElementById('profileId')?.click()}>
              <PatientImageCard
                value={{ key: 'idCard', image: patient.image_id_card }}
              />
            </div>

          ) : (
            <div className='mt-3' onClick={() => document.getElementById('profileId')?.click()}>
              <Card
                orientation="horizontal"
                size="sm"
                sx={{
                  bgcolor: 'background.surface',
                  borderRadius: 0,
                  mb: 1,
                  cursor: 'pointer'
                }}
              >
                <CardOverflow>
                  <AspectRatio
                    ratio="1"
                    sx={{
                      minWidth: 70,
                      '& img[data-first-child]': { p: 1.5 },
                    }}
                  >
                    <BadgeIcon />
                  </AspectRatio>
                </CardOverflow>
                <CardContent>
                  <Typography textAlign="center" level="h4">
                    +
                  </Typography>
                  <Typography level="title-md">Upload ID Card</Typography>
                </CardContent>
              </Card>
            </div>

          )}
        </Box>
        <CardActions sx={{ gridColumn: '1/-1', marginTop: '25px' }}>
          {pathName ? (
            <Button
              variant="outlined"
              color="primary"
              onClick={returnOnCreatePatient}
              style={{ fontSize: '1.1rem', fontWeight: 700 }}
            >
              Add Patient
            </Button>
          ) : (
            <Button
              variant="outlined"
              color="primary"
              onClick={returnOnUpdatePatient}
              style={{ fontSize: '1.1rem', fontWeight: 700 }}
            >
              Edit Patient
            </Button>
          )}
        </CardActions>
      </div>

      {
        load ?
          <Loadding />
          : null
      }
    </>
  );
}
