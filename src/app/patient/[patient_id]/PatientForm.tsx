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

import Select from '@mui/joy/Select';
import Option from '@mui/joy/Option';

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

  return (
    <div className={pateintIdCss.patient_toggle}>
      <Accordion>
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
          <Card
            variant="outlined"
            sx={{
              maxHeight: 'max-content',
              maxWidth: '100%',
              mx: 'auto',
              // to make the demo resizable
              overflow: 'auto',
              resize: 'horizontal',
              marginTop: '10px',
            }}
          >
            <Typography level="title-lg" startDecorator={<DetailsIcon />}>
              {pathName ? 'Detail Patients' : 'Edit Patients'}
            </Typography>
            <Divider inset="none" />
            <CardContent
              sx={{
                display: 'grid',
                gridTemplateColumns: 'repeat(2, minmax(80px, 1fr))',
                gap: 1.5,
              }}
            >
              <FormControl>
                <FormLabel>Fistname</FormLabel>
                <Input
                  value={patient.first_name? patient.first_name: ''}
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
                      age:
                        new Date().getFullYear() -
                        Number(e.target.value.split('-')),
                    });
                  }}
                  type="date"
                  endDecorator={'D/M/Y'}
                />
              </FormControl>
              <FormControl>
                <FormLabel>Age</FormLabel>
                <Input
                  value={patient.age ? patient.age : 0}
                  onChange={(e) =>
                    setPatient({ ...patient, age: Number(e.target.value) })
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
                <Select
                  onChange={(e) =>
                    setPatient({
                      ...patient,
                      group_blood: (e?.target as HTMLInputElement).value,
                    })
                  }
                  value={patient.group_blood ? patient.group_blood : ''}
                  variant="soft"
                >
                  <Option value="" disabled>
                    กรุ็ปเลือด
                  </Option>
                  <Option value="A">A</Option>
                  <Option value="B">B</Option>
                  <Option value="AB">AB</Option>
                  <Option value="O">O</Option>
                </Select>
              </FormControl>
              <Box className="patientImage">
                {patient.image ? (
                  <PatientImageCard
                    value={{ key: 'profile', image: patient.image }}
                  />
                ) : (
                  <Card
                    orientation="horizontal"
                    size="sm"
                    sx={{
                      bgcolor: 'background.surface',
                      borderRadius: 0,
                      mb: 1,
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
                )}
                {patient.image_id_card ? (
                  <PatientImageCard
                    value={{ key: 'idCard', image: patient.image_id_card }}
                  />
                ) : (
                  <Card
                    orientation="horizontal"
                    size="sm"
                    sx={{
                      bgcolor: 'background.surface',
                      borderRadius: 0,
                      mb: 1,
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
                )}
              </Box>
            </CardContent>
          </Card>
        </AccordionDetails>
      </Accordion>
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
  );
}
