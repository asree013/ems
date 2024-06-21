'use client'
import React from 'react'
import ChatTamplate from './ChatTamplate'
import ChartEcg from '../monitor/ChartEcg'
import Spo2 from '../monitor/[monitor_id]/Spo2'

export default function page() {
  return (
    <div>
        <h1>Chat</h1>
        <Spo2 />
    </div>
  )
}
