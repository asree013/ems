'use client';

import React, { useState, useEffect } from 'react';
import selectModel from './selctMode.module.css';
import SystemSecurityUpdateIcon from '@mui/icons-material/SystemSecurityUpdate';
import SailingIcon from '@mui/icons-material/Sailing';
import AirplanemodeActiveIcon from '@mui/icons-material/AirplanemodeActive';
import ReportIcon from '@mui/icons-material/Report';
import MedicalServicesIcon from '@mui/icons-material/MedicalServices';
import Loadding from '@/components/Loadding';
import { Button } from '@mui/material';

const Page: React.FC = () => {
  const [isLoad, setIsLoad] = useState<boolean>(false);
  const [windowHeight, setWindowHeight] = useState<number>(0);

  useEffect(() => {
    setWindowHeight(window.innerHeight);
  }, []);

  function onRedirectPath(path: string) {
    setIsLoad(true);
    window.location.href = '/' + path;
  }

  return (
    <>
      <div className={selectModel.home} style={{ height: windowHeight }}>
        <div className={selectModel.cardHome} style={{height: windowHeight - windowHeight/5}}>
          <p>SELECT MODE</p>
          <div className={selectModel.line}></div>
          <div className={selectModel.gridButton}>
            <Button
              className={selectModel.cardButton}
              onClick={() => onRedirectPath('home')}
            >
              <SystemSecurityUpdateIcon fontSize="large" />
              <p style={{ fontSize: '1.3rem' }}>EMS</p>
            </Button>
            <Button className={selectModel.cardButton} disabled>
              <SailingIcon fontSize="large" />
              <p style={{ fontSize: '1.3rem' }}>Marine EMS</p>
            </Button>
            <Button className={selectModel.cardButton} disabled>
              <AirplanemodeActiveIcon fontSize="large" />
              <p style={{ fontSize: '1.3rem' }}>Halicopter EMS</p>
            </Button>
            <Button className={selectModel.cardButton} disabled>
              <MedicalServicesIcon fontSize="large" />
              <p style={{ fontSize: '1.3rem' }}>MERT</p>
            </Button>
            <Button className={selectModel.cardButton} disabled>
              <ReportIcon fontSize="large" />
              <p style={{ fontSize: '1.3rem' }}>SAR</p>
            </Button>
          </div>
        </div>
      </div>
      {isLoad ? <Loadding /> : null}
    </>
  );
}

export default Page;
