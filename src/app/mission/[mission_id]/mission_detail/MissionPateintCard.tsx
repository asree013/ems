'use client'
import { Card, Chip, SvgIconTypeMap } from '@mui/material'
import React from 'react'
import styled from 'styled-components'
import SupervisorAccountIcon from '@mui/icons-material/SupervisorAccount';
import { OverridableComponent } from '@mui/material/OverridableComponent';

type Props = {
  background: string
  border: string
  title: string
  count: string
  color: string | any
  fontColor? : string
  labelColor?: string
  Icon: OverridableComponent<SvgIconTypeMap<{}, "svg">> & {
    muiName: string;
  }
}

export default function MissionPateintCard({ background, border, count, title, Icon, color, fontColor, labelColor }: Props) {
  const CardMui = styled(Card)(({ theme }) => ({
    padding: 10,
    width: 250,
    height: 100,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderRadius: 10,
  }))

  return (
    <CardMui elevation={4} className={`${background} border-2 ${border}`}>
      <Chip style={{ height: '4.5rem', borderRadius: 50 }} variant='filled' color={color} icon={<Icon color={color?? "disabled"} sx={{ width: '3rem', height: '3rem' }} />} />
      <div style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column' }}>
        <p className={`${labelColor?? 'text-black ml-3'}`}>{title}</p>
        <p className={`${fontColor?? 'text-black'}`} style={{ fontSize: '26px', fontWeight: 600 }}>{count}</p>
      </div>
    </CardMui>
  )
}
