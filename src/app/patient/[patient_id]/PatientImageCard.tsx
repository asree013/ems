'use client';
import * as React from 'react';
import AspectRatio from '@mui/joy/AspectRatio';
import Card from '@mui/joy/Card';
import CardOverflow from '@mui/joy/CardOverflow';
import { CardMedia } from '@mui/material';
import patientIdCss from './patient_id.module.css'
import { Patients } from '@/models/patient';

type Props = {
  value: { key: string; image: string };
};

export default function PatientImageCard({ value }: Props) {
  return (
    <Card orientation="horizontal" variant="outlined" className="imageDetail">
      <CardOverflow>
        <AspectRatio className={patientIdCss.imageItemDetail}>
          <CardMedia
            component="img"
            alt="green iguana"
            height="140"
            image="https://scontent.fbkk5-4.fna.fbcdn.net/v/t39.30808-6/414980625_7089112141134367_1209359816226383970_n.jpg?_nc_cat=103&ccb=1-7&_nc_sid=5f2048&_nc_ohc=BkqIc_AIQ48Q7kNvgGhHWVI&_nc_ht=scontent.fbkk5-4.fna&oh=00_AfCtimlt_bdDtiNH5UmLbsR-BHeD0oUfmetT7fV1ojdKCQ&oe=66416515"
          />
        </AspectRatio>
      </CardOverflow>
      <CardOverflow
        variant="soft"
        color="primary"
        sx={{
          px: 0.2,
          writingMode: 'vertical-rl',
          justifyContent: 'center',
          fontSize: 'xs',
          fontWeight: 'xl',
          letterSpacing: '1px',
          textTransform: 'uppercase',
          borderLeft: '1px solid',
          borderColor: 'divider',
        }}
      >
        {value.key.includes('profile') ? 'Your Image' : 'Your IdCard'}
      </CardOverflow>
    </Card>
  );
}
