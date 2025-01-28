'use client'
import React from 'react'
import ECG from './ECG'
import SPO from './SPO'
import ChartJsSPO from './ChartJsSPO'

export default function page() {
  return (
    <div>
      <ChartJsSPO />
      {/* <SPO /> */}
    </div>
  )
}
