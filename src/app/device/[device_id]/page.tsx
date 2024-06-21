'use client'
import React, { useEffect } from 'react';
import FromDevice from './FromDevice';
import { NIL } from 'uuid';
import { findDeviceById } from '../../../services/device.service';

type Props = {
  params: {
    device_id: string;
  };
};

export default function page({ params }: Props) {
  const [device, setDevice] = React.useState<Device>({} as Device);
  if (params.device_id !== NIL) {
    useEffect(() => {
      async function feedDevice() {
        try {
          const result = await findDeviceById(params.device_id);
          setDevice(result.data);
        } catch (error) {
          console.log(error);
          alert('error');
        }
      }

      feedDevice();
    }, []);
    return (
      <>
        <FromDevice result={device} />
      </>
    );
  } else {
    return (
      <>
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
      </>
    );
  }
}
