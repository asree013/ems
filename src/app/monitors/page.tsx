'use client'
import BreadCrumb, { TBreadCrumd } from '@/components/BreadCrumb'
import NavBarLayout from '@/components/layouts/NavBarLayout'
import React, { useCallback, useEffect, useState } from 'react'
import MyMonitorVehicle from './MyMonitorVehicle'
import { findCurrentVehicleByUser } from '@/services/user.service'
import { Vehicles } from '@/models/vehicle.model'
import { toast } from '@/services/alert.service'
import axios from 'axios'
import PatientNoChart from './[monitors_id]/PatientNoChart'
import { findDeviceAll } from '@/services/device.service'
import ChartDetail from './[monitors_id]/ChartDetail'

export default function page() {
  const items: TBreadCrumd[] = [
    {
      labe: 'หน้าหลัก',
      path: '/home'
    },
    {
      labe: 'จอแสดงเครื่องวัดสัญญาชีพทั้งหมด',
      path: '/monitors'
    },
  ]

  const [device, setDevice] = useState<Device[]>({} as Device[])

  const onfindDevice = useCallback(async () => {
    try {
      const result = await findDeviceAll()
      setDevice(result)
    } catch (error: any) {
      toast(error.message, 'error')
    }
  }, [setDevice])

  useEffect(() => {
    onfindDevice()
  }, [onfindDevice])
  return (
    <NavBarLayout>
      <div className='mt-[50px] mb-3'>
        <BreadCrumb item={items} />
      </div>
      <div>
        {
          Array.isArray(device)?
          device.map((r, i) =>
            <div className='grid grid-cols-1 lg:grid-cols-2 gap-5'>
              {
                  <ChartDetail key={i} device={r} />
              }
            </div>

          ): null
        }
      </div>

    </NavBarLayout>
  )
}
