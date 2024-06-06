'use client'
import React from 'react'
import DeviceItem, { } from './DeviceItem'
import './device.css'
import { findDeviceAll } from '@/services/device.service'
import { useRouter } from 'next/navigation'
import Loadding from '@/components/Loadding'
import Bar from './Bar'

export default function page() {
  const router = useRouter()
  const [device, setDevice] = React.useState<Device[]>({} as Device[])
  const [load, setLoad] = React.useState(false)

  function onReturnSearch(str: string) {

  }
  React.useEffect(() => {
    async function feedDevice() {
      setLoad(true)
      try {
        const result = await findDeviceAll()
        setDevice(result)
        console.log(device);

      } catch (error: any) {
        if (error.message.includes('Network Error')) {
          router.push('/login')
        }
        alert(error)
        console.log(error);

      } finally {
        setLoad(false)
      }
    }

    feedDevice()
  }, [])
  return (
    <>
      {load === true ?
        <Loadding />
        : <div className='DeviceHome'>
          <h1>Device All</h1>
          <Bar nameBar='Search Device' nameToCreate='/device/' returnString={onReturnSearch} />
          {
            device.length > 0 ?
              device.map((r, i) =>
                <DeviceItem key={i} deviceItem={r} index={i} />
              ) :
              null
          }
        </div>

    }
    </>
  )
}
