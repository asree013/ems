'use client'
import Loadding from '@/components/Loadding'
import { Users } from '@/models/users.model'
import { FindUserMe } from '@/services/authen.service'
import React, { useCallback, useEffect, useState } from 'react'

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
    <Loadding />
  )
}
