'use client';
import Avatar from '@mui/material/Avatar';
import React, { useState } from 'react';
import './home.css';
import { useRouter } from 'next/navigation';
import patientImage from '../../../public/assets/icon/examination_12772952.png';
import monitorImage from '../../../public/assets/icon/monitoring_12714969.png';
import deviceImage from '../../../public/assets/icon/mobile_14820652.png';
import Loadding from '../../components/Loadding';
import Nav from '../../components/Nav';

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

  function onRedirect(str: string) {
    setIsLoad(true);
    window.location.href = `/${str}`
  }
  return (
    <>
      <Nav />

      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '50px',
          flexDirection: 'column',
        }}
      >
        <h2 style={{ marginTop: '20px' }}>Home Menu</h2>
        <div className="menuItem">
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
                className="menuValue"
                onClick={() => onRedirect(r.name.toLocaleLowerCase())}
              >
                <Avatar variant="rounded" src={r.image.src} />
                <p>{r.name}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {isLoad ? <Loadding /> : null}
    </>
  );
}
