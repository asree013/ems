'use client'
import ECG from '@/app/chart/ECG'
import SPO from '@/app/chart/SPO'
import React from 'react'

type Props = {
  params: {
    order_id: string
  }
}

export default function page({params}: Props) {
  return (
    <div>
      <ECG order_id={params.order_id} />
      <SPO order_id={params.order_id} />
    </div>
  )
}
