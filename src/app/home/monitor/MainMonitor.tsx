'use client'
import SubMonitor from '@/app/monitor/SubMonitor'
import React from 'react'

import main_css from './main_css.module.css'

import MonitorItem from '@/app/monitor/MonitorItem'
import SubMainMonitor from './SubManinMonitor'
import { Monitorchart } from '@/data/monitor.data'

export default function MainMonitor() {
  return (
    <>
        <div className={main_css.bodyHomeChart}>
          <div className={main_css.monitorChart}>
            {Monitorchart.map((r, i) => (
              <SubMainMonitor key={i} el_id={r.el_id} index={i} />
            ))}
          </div>
        </div>
    </>
  )
}
