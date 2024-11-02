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
  count: number
  color: string | any
  Icon: OverridableComponent<SvgIconTypeMap<{}, "svg">> & {
    muiName: string;
  }
}

export default function MissionPateintCard({ background, border, count, title, Icon, color }: Props) {
  const CardMui = styled(Card)(({ theme }) => ({
    padding: 10,
    width: 250,
    height: 100,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderRadius: 10,
    border: border,
    background: background
  }))

  return (
    <CardMui elevation={4}>
      <Chip style={{ height: '4.5rem', borderRadius: 50 }} variant='filled' color='success' icon={<Icon color={color?? "disabled"} sx={{ width: '3rem', height: '3rem' }} />} />
      <div style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column' }}>
        <p>{title}</p>
        <p style={{ fontSize: '26px', fontWeight: 600 }}>{count} คน</p>
      </div>
    </CardMui>
  )
}
