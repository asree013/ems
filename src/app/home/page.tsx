'use client';
import Avatar from '@mui/material/Avatar';
import React, { useCallback, useContext, useEffect, useState } from 'react';
import homeCss from './home.module.css';
import { useRouter } from 'next/navigation';
import patientImage from '../../../public/assets/icon/examination_12772952.png';
import monitorImage from '../../../public/assets/icon/monitoring_12714969.png';
import deviceImage from '../../../public/assets/icon/mobile_14820652.png';
import Loadding from '../../components/Loadding';
import Nav from '../../components/Nav';
import { PatientContextsArr } from '@/contexts/patient.context';
import { findPatientAll } from '@/services/paitent.service';
import { toast } from '@/services/alert.service';
import { Patients } from '@/models/patient';
import { findDeviceAll } from '@/services/device.service';
import { findAllOrderTranfer } from '@/services/order_tranfer.service';
import { OrderTranfer } from '@/models/order_tranfer.model';
import MapEms from './MapEms';
import Vitalsing from './Vitalsing';
import GoogleApiMap from './GoogleApiMap';
import { RoleContext } from '@/contexts/role.context';
import { FindUserMe } from '@/services/authen.service';
import CarmeraCar from './CarmeraCar';

const menuBottom = [
  {
    name: 'Patient',
    image: patientImage,
  },
  {
    name: 'Device',
    image: deviceImage,
  },
  {
    name: 'Monitor',
    image: monitorImage,
  },
];

export default function Page() {
  const [isLoad, setIsLoad] = useState(false);
  const [patients, setPatients] = useState<Patients[]>({} as Patients[])
  const [device, setDevice] = useState<Device[]>({} as Device[])
  const [order, setOrder] = useState<OrderTranfer[]>({} as OrderTranfer[])
  const [role, setRole] = useState<string>('')
  const [hightMap, setHightMap] = useState<number>(0)

  function onRedirect(str: string) {
    setIsLoad(true);
    window.location.href = `/${str}`
  }

  const feedPatient = useCallback(async () => {
    try {
      const result = await findPatientAll()
      setPatients(result.data)
    } catch (error: any) {
      console.log(error);
      toast(JSON.stringify(error.message), 'error')
      window.location.href = '/login'
    }
  }, [setPatients])

  const feedDevice = useCallback(async () => {
    try {
      const result = await findDeviceAll()
      setDevice(result)
    } catch (error: any) {
      console.log(error);
      toast(JSON.stringify(error.message), 'error')
      window.location.href = '/login'
    }
  }, [setDevice])

  const feedOrder = useCallback(async () => {
    try {
      const result = await findAllOrderTranfer()
      setOrder(result.filter(r => r.status_order !== 'Closed'))
    } catch (error: any) {
      console.log(error);
      toast(JSON.stringify(error.message), 'error')
      window.location.href = '/login'
    }
  }, [setOrder])

  // const checkRole = useCallback(async () => {
  //   try {
  //     const result = await FindUserMe()
  //     setRole(result.data.role)

  //   } catch (error) {
  //     toast('error', 'error')
  //     window.location.href = '/login'
  //   }
  // }, [setRole])

  useEffect(() => {
    feedPatient()
    feedDevice()
    feedOrder()
    // checkRole()
    setHightMap(window.innerHeight);
  }, [feedPatient, feedDevice, feedOrder])
  return (
    <>
      <RoleContext.Provider value={{ role, setRole }} >
        <Nav />

        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            marginTop: '65px',
            padding: '10px',
            flexDirection: 'column',
          }}
        >
          <div className={homeCss.menuItem}>
            {menuBottom.map((r) => (
              <div
                key={r.name}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <div
                  className={homeCss.menuValue}
                  onClick={() => onRedirect(r.name.toLocaleLowerCase())}
                >
                  <Avatar variant="rounded" src={r.image.src} />
                  <p>{r.name}: {onCheckNumData(r.name)}</p>
                </div>
              </div>
            ))}
          </div>
          <div className={homeCss.mapMenu}>
            <GoogleApiMap />
            <Vitalsing hightMap={hightMap} />
          </div>
          <div className={homeCss.cameraCar}>
            <CarmeraCar />
          </div>
        </div>
        {isLoad ? <Loadding /> : null}

      </RoleContext.Provider>

    </>
  );

  function onCheckNumData(key: string) {
    switch (true) {
      case key.toLocaleLowerCase().includes('patient'):
        return patients.length
      case key.toLocaleLowerCase().includes('device'):
        return device.length
      case key.toLocaleLowerCase().includes('monitor'):
        return order.length
    }
  }
}
