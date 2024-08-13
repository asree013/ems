'use client'
import ECG from '@/app/chart/ECG'
import SPO from '@/app/chart/SPO'
import React from 'react'

type Props = {
  
}

export default function page() {
  return (
    <div>
      <ECG />
      <SPO order_id='' />
    </div>
  )
}
