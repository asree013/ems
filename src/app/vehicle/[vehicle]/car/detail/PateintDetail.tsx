'use client'
import React, { useState } from 'react'

import PDetailCss from './Pdetail.module.css'
import { Card } from '@mui/material'
import ControlPointIcon from '@mui/icons-material/ControlPoint';

import PatinetIcon from '@/assets/icon/patient_menu.png'
import MonitorIcon from '@/assets/icon/monitoring_12714969.png'
import Loadding from '@/components/Loadding';

export default function PateintDetail() {
  const [load, setLoad] = useState<boolean>(false)
  return (
    <>
      <div className={PDetailCss.home}>
        <h1>เพิ่ม จอแสดงผล</h1>
        <div>
          <Card elevation={3}>
            <div onClick={() => {
              setLoad(true)
              window.location.href = '/patient?key=add-car'
            }} className={PDetailCss.menuItem}>
              <img src={PatinetIcon.src} style={{ height: '4rem', width: '4rem' }} alt="" />
              <div className={PDetailCss.menuDetail}>
                <h3>เพิ่มผู้ป่วย</h3>
                <p>detail</p>
              </div>
            </div>
          </Card>
        </div>
        <div>
          <Card elevation={3} className='mt-3'>
            <div onClick={() => {
              setLoad(true)
            }} className={PDetailCss.menuItem}>
              <img src={MonitorIcon.src} style={{ height: '4rem', width: '4rem' }} alt="" />
              <div className={PDetailCss.menuDetail}>
                <h3>เพิ่มผจอแสดงผล</h3>
                <p>detail</p>
              </div>
            </div>
          </Card>
        </div>
      </div>

      {
        load?
        <Loadding />:
        null
      }
    </>
  )
}
