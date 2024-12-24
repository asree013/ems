'use client'
import Loadding from '@/components/Loadding'
import { FindUserMe } from '@/services/authen.service'
import React, { useCallback, useEffect } from 'react'
import './globals.css';

export default function App() {


  const checkFindMe = useCallback(async () => {
    try {
      await FindUserMe()
      window.location.href = '/home'
    } catch (error) {
      window.location.href = '/login'
    }
  }, [])

  useEffect(() => {
    checkFindMe()

    return () => {
      checkFindMe
    }
  }, [checkFindMe])
  return (
    <div>
      <Loadding />
    </div>
  )
}
