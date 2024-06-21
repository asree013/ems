'use client';
import * as React from 'react';
import AccordionGroup from '@mui/joy/AccordionGroup';
import Accordion from '@mui/joy/Accordion';
import AccordionDetails, {
  accordionDetailsClasses,
} from '@mui/joy/AccordionDetails';
import AccordionSummary, {
  accordionSummaryClasses,
} from '@mui/joy/AccordionSummary';
import Switch from '@mui/joy/Switch';
import Stack from '@mui/joy/Stack';
import Typography from '@mui/joy/Typography';
import Avatar from '@mui/joy/Avatar';
import FormControl from '@mui/joy/FormControl';
import FormLabel from '@mui/joy/FormLabel';
import ListItemContent from '@mui/joy/ListItemContent';

import AccessibilityNewRoundedIcon from '@mui/icons-material/AccessibilityNewRounded';
import ZoomInRoundedIcon from '@mui/icons-material/ZoomInRounded';
import SpatialTrackingRoundedIcon from '@mui/icons-material/SpatialTrackingRounded';
import SettingsVoiceRoundedIcon from '@mui/icons-material/SettingsVoiceRounded';

import SupervisedUserCircleIcon from '@mui/icons-material/SupervisedUserCircle';
import TroubleshootIcon from '@mui/icons-material/Troubleshoot';
import Divider from '@mui/material/Divider';

import './monitor_id.css';
import Ecg from './Ecg';
import HR from './HR';
import Spo2 from './Spo2';
import PR from './PR';
import NIBP from './NIBP';
import Temp from './Temp';
import { findPatientById } from '@/services/paitent.service';
import { Patients } from '@/models/patient';
import { toast } from '@/services/alert.service';
import MonitorPatient from './Monitor_patient';

import SettingsAccessibilityIcon from '@mui/icons-material/SettingsAccessibility';
import BadgeIcon from '@mui/icons-material/Badge';
import WcIcon from '@mui/icons-material/Wc';
import MedicalInformationIcon from '@mui/icons-material/MedicalInformation';
import HomeIcon from '@mui/icons-material/Home';
import MonitorPatietnImage from './MonitorPatientImage';

type Props = {
  patient_id: string;
};

export default function Monitor_id_detail({ patient_id }: Props) {
  const arrPatient = new Array(17);

  const [patient, setPatient] = React.useState<Patients>({} as Patients);

  React.useEffect(() => {
    (async () => {
      try {
        const result = await findPatientById(patient_id);
        setPatient(result.data);
      } catch (error: any) {
        toast(error.message, 'error');
      }
    })();
  }, [patient_id]);

  return (
    <AccordionGroup
      variant="soft"
      transition="0.2s"
      sx={{
        borderRadius: 'md',
        [`& .${accordionDetailsClasses.content}.${accordionDetailsClasses.expanded}`]:
          {
            paddingBlock: '1rem',
          },
        [`& .${accordionSummaryClasses.button}`]: {
          paddingBlock: '1rem',
        },
      }}
      className="monitor_id_detail_menu"
    >
      <Accordion className="monitor_id_accrodion">
        <AccordionSummary>
          <Avatar color="primary">
            <SupervisedUserCircleIcon />
          </Avatar>
          <ListItemContent>
            <Typography level="title-md">Detail Patient</Typography>
            <Typography level="body-sm">
              {patient.first_name} {patient.last_name}
            </Typography>
          </ListItemContent>
        </AccordionSummary>
        <AccordionDetails variant="solid" sx={{ margin: '0 2px' }}>
          <Stack className="monitor_patient_item">
            <FormControl orientation="horizontal" sx={{ gap: 1 }}>
              <MonitorPatient
                icon={BadgeIcon}
                txt={patient.first_name}
                seconTxt={patient.last_name}
              />
            </FormControl>
            <FormControl orientation="horizontal" sx={{ gap: 1 }}>
              <MonitorPatient
                icon={WcIcon}
                txt={'เพศ: ' + patient.gender}
                seconTxt={
                  patient.age ? 'อายุ: ' + patient.age : 'อายุ: ' + 'no data'
                }
              />
            </FormControl>
            <FormControl orientation="horizontal" sx={{ gap: 1 }}>
              <MonitorPatient
                icon={MedicalInformationIcon}
                txt={
                  patient.group_blood
                    ? 'กรุ๊ป: ' + patient.group_blood
                    : 'กรุ๊ปเลือด: no data'
                }
                seconTxt={
                  patient.id_card ? 'IC: ' + patient.id_card : 'IC: no data'
                }
              />
            </FormControl>
            <FormControl orientation="horizontal" sx={{ gap: 1 }}>
              <MonitorPatient
                icon={HomeIcon}
                txt={
                  patient.birthday
                    ? 'เกิด: ' + patient.birthday
                    : 'เกิด: no data'
                }
                seconTxt={
                  patient.address
                    ? 'ที่อยู่: ' + patient.address
                    : 'ที่อยู่: no data'
                }
              />
            </FormControl>
          </Stack>
          <MonitorPatietnImage src="" title="Profile" />
          <MonitorPatietnImage src="" title="idCard" />
        </AccordionDetails>
      </Accordion>

      <Accordion className="monitor_id_accrodion" defaultExpanded>
        <AccordionSummary>
          <Avatar color="success">
            <TroubleshootIcon />
          </Avatar>
          <ListItemContent>
            <Typography level="title-md">Chart Detail</Typography>
            <Typography level="body-sm">
              Enable or disable your notifications
            </Typography>
          </ListItemContent>
        </AccordionSummary>
        <AccordionDetails variant="solid" sx={{ margin: '0 2px' }}>
          <Stack spacing={1.5}>
            <FormControl
              orientation="horizontal"
              sx={{ gap: 1, background: '#373535' }}
            >
              <HR />
            </FormControl>
            <FormControl orientation="horizontal" sx={{ gap: 1 }}>
              <Spo2 />
            </FormControl>
            <FormControl orientation="horizontal" sx={{ gap: 1 }}>
              <PR />
            </FormControl>
            <FormControl orientation="horizontal" sx={{ gap: 1 }}>
              <NIBP />
            </FormControl>
            <FormControl orientation="horizontal" sx={{ gap: 1 }}>
              <Temp />
            </FormControl>
          </Stack>
        </AccordionDetails>
      </Accordion>

      <Accordion className="monitor_id_accrodion">
        <AccordionSummary>
          <Avatar color="danger">
            <AccessibilityNewRoundedIcon />
          </Avatar>
          <ListItemContent>
            <Typography level="title-md">Accessibility</Typography>
            <Typography level="body-sm">
              Toggle your accessibility settings
            </Typography>
          </ListItemContent>
        </AccordionSummary>
        <AccordionDetails variant="solid" sx={{ margin: '0 2px' }}>
          <Stack spacing={1.5}>
            <FormControl orientation="horizontal" sx={{ gap: 1 }}>
              <ZoomInRoundedIcon fontSize="small" sx={{ mx: 1 }} />
              <FormLabel>Zoom</FormLabel>
              <Switch size="sm" />
            </FormControl>

            <FormControl orientation="horizontal" sx={{ gap: 1 }}>
              <SpatialTrackingRoundedIcon fontSize="small" sx={{ mx: 1 }} />
              <FormLabel>Audio Descriptions</FormLabel>
              <Switch size="sm" />
            </FormControl>

            <FormControl orientation="horizontal" sx={{ gap: 1 }}>
              <SettingsVoiceRoundedIcon fontSize="small" sx={{ mx: 1 }} />
              <FormLabel>Voice Control</FormLabel>
              <Switch size="sm" />
            </FormControl>
          </Stack>
        </AccordionDetails>
        <Divider sx={{ width: '100%' }} />
      </Accordion>
    </AccordionGroup>
  );
}
