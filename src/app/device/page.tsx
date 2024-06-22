'use client';
import React, { useCallback, useEffect, useState } from 'react';
import DeviceItem from './DeviceItem';
import './device.css';
import Bar from './Bar';
import Loadding from '../../components/Loadding';
import { findDeviceAll } from '../../services/device.service';

const Page: React.FC = () => {
  const [device, setDevice] = useState<Device[]>([]);
  const [load, setLoad] = useState(false);

  function onReturnSearch(str: string) {}

  const feedDevice = useCallback(async () => {
    setLoad(true);
    try {
      const result = await findDeviceAll();
      setDevice(result);
      console.log(device);
    } catch (error: any) {
      if (error.message.includes('Network Error')) {
        window.location.href = '/login'
      }
      alert(error);
      console.log(error);
    } finally {
      setLoad(false);
    }
  }, [setDevice]);

  useEffect(() => {
    feedDevice();
  }, [feedDevice]);

  return (
    <>
      {load === true ? (
        <Loadding />
      ) : (
        <div className="DeviceHome">
          <h1>Device All</h1>
          <Bar
            nameBar="Search Device"
            nameToCreate="/device/"
            returnString={onReturnSearch}
          />
          {device.length > 0
            ? device.map((r, i) => (
                <DeviceItem key={i} deviceItem={r} index={i} />
              ))
            : null}
        </div>
      )}
    </>
  );
};

export default Page;
