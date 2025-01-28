'use client'
import Loadding from '@/components/Loadding'
import { FindUserMe } from '@/services/authen.service'
import React, { useCallback, useEffect } from 'react'
import './globals.css';
import { useRouter } from 'next/navigation';

export default function App() {
  const router= useRouter()

  const checkFindMe = useCallback(async () => {
    try {
      await FindUserMe()
      router.push('/home')
    } catch (error) {
      router.push('/login')
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
