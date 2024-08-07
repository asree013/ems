'use client'
import Loadding from '@/components/Loadding'
import React, { useEffect } from 'react'

export default function App() {
  useEffect(() => {
    window.location.href = '/login'

  }, [])
  return (
    <Loadding />
  )
}
