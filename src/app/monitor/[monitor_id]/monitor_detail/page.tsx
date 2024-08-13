'use client'
import ECG from '@/app/chart/ECG'
import SPO from '@/app/chart/SPO'
import React from 'react'

export default function page() {
  return (
    <div>
      <ECG />
      <SPO />
    </div>
  )
}
