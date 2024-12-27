'use client'
import React, { useCallback, useEffect, useState } from 'react';
import FromDevice from './FromDevice';
import { NIL } from 'uuid';
import { findDeviceById } from '../../../services/device.service';
import BreadCrumb, { TBreadCrumd } from '@/components/BreadCrumb';

type Props = {
  params: {
    device_id: string;
  };
};

const items: TBreadCrumd[] = [
  {
    labe: "หน้าหลัก",
    path: '/home'
  },
  {
    labe: "เครื่องวัด",
    path: '/device'
  },
  {
    labe: "เพิ่มเครื่องวัด",
    path: '/device'
  },

]

const Page: React.FC<Props> = ({ params }) => {
  const [device, setDevice] = useState<Device>({} as Device);

  const feedDevice = useCallback(async () => {
    try {
      const result = await findDeviceById(params.device_id);
      setDevice(result.data);
    } catch (error) {
      console.log(error);
      alert('error');
    }
  }, [params.device_id]);

  useEffect(() => {
    if (params.device_id !== NIL) {
      feedDevice();
    }
  }, [params.device_id, feedDevice]);

  return (
    <>
      <BreadCrumb item={items} />
      {params.device_id !== NIL ? (
        <FromDevice result={device} />
      ) : (
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexDirection: 'column',
          }}
        >
          <FromDevice />
        </div>
      )}
    </>
  );
};

export default Page;
