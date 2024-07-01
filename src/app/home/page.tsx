'use client';
import Avatar from '@mui/material/Avatar';
import React, { useCallback, useContext, useEffect, useRef, useState } from 'react';
import homeCss from './home.module.css';
import patientImage from '../../../public/assets/icon/examination_12772952.png';
import monitorImage from '../../../public/assets/icon/monitoring_12714969.png';
import deviceImage from '../../../public/assets/icon/mobile_14820652.png';
import Loadding from '../../components/Loadding';
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
import { Locations } from '@/models/location.model';
import Divider from '@mui/material/Divider';
import HomeSideBard from './HomeSideBard';
import HomeContent from './HomeContent';

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
  const [patients, setPatients] = useState<Patients[]>([]);
  const [device, setDevice] = useState<Device[]>([]);
  const [order, setOrder] = useState<OrderTranfer[]>([]);
  const [role, setRole] = useState<string>('');
  const [hightMap, setHightMap] = useState<number>(0);
  const [widths, setWidths] = useState<number>(0);
  const [userLocate, setUserLocate] = useState<Locations>({} as Locations)

  function onRedirect(str: string) {
    setIsLoad(true);
    window.location.href = `/${str}`
  }

  const feedPatient = useCallback(async () => {
    try {
      const result = await findPatientAll();
      setPatients(result.data);
    } catch (error: any) {
      console.log(error);
      toast(JSON.stringify({ status: error.message, message: 'Error fetching patients' }), 'error');
    }
  }, [setPatients]);

  const pushLocationUser = useCallback(async () => {
    try {
      return new Promise<void>((resolve, reject) => {
        if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(
            (position) => {
              const { latitude, longitude } = position.coords;
              const g = { lat: latitude, lng: longitude };
              setUserLocate(g);
              console.log(g);

              resolve(); // Resolve without returning any value
            },
            (error) => {
              console.error("Error getting geolocation:", error);
              reject(error);
            }
          );
        } else {
          const error = new Error("Geolocation is not supported by this browser.");
          console.error(error);
          reject(error);
        }
      });
    } catch (error) {
      console.log(error);

    }
  }, [setUserLocate])

  const feedDevice = useCallback(async () => {
    try {
      const result = await findDeviceAll();
      setDevice(result);
    } catch (error: any) {
      console.log(error);
      toast(JSON.stringify({ status: error.message, message: 'Error fetching devices' }), 'error');
    }
  }, [setDevice]);

  const feedOrder = useCallback(async () => {
    try {
      const result = await findAllOrderTranfer();
      setOrder(result.filter(r => r.status_order !== 'Closed'));
    } catch (error: any) {
      console.log(error);
    }
  }, [setOrder]);

  const checkRole = useCallback(async () => {
    try {
      const result = await FindUserMe();
      setRole(result.data.role);
    } catch (error) {
      toast('Error checking role', 'error');
    }
  }, [setRole]);

  useEffect(() => {
    const idhight = document.getElementById('content')
    feedPatient();
    feedDevice();
    feedOrder();
    checkRole();
    if (idhight) {
      setHightMap(idhight.offsetHeight);
    }
    setWidths(window.innerWidth)

    const getLo = setInterval(() => {
      pushLocationUser()
    }, 5000)

    return () => {
      clearInterval(getLo)
    }
  }, [feedPatient, feedDevice, feedOrder, checkRole, pushLocationUser]);

  function onCheckNumData(key: string) {
    switch (true) {
      case key.toLocaleLowerCase().includes('patient'):
        return patients.length;
      case key.toLocaleLowerCase().includes('device'):
        return device.length;
      case key.toLocaleLowerCase().includes('monitor'):
        return order.length;
      default:
        return 0;
    }
  }

  return (
    <>
      <RoleContext.Provider value={{ role, setRole }}>
        {/* <Nav /> */}
        <div className={homeCss.homeBody} style={{ height: hightMap  }}>
          <HomeSideBard />
          <div style={{ border: '1px solid gainsboro', height: '90%', marginTop: '3%' }}></div>
          <div id='content'>
            <HomeContent />
          </div>
          {/* <div className={homeCss.menuItem}>
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
          </div> */}
        </div>
        {isLoad ? <Loadding /> : null}
      </RoleContext.Provider>
    </>
  );
}
