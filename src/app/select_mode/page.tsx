'use client';
import React, { useCallback, useEffect, useState } from 'react';
import selectModel from './selctMode.module.css';
import SystemSecurityUpdateIcon from '@mui/icons-material/SystemSecurityUpdate';
import SailingIcon from '@mui/icons-material/Sailing';
import AirplanemodeActiveIcon from '@mui/icons-material/AirplanemodeActive';
import ReportIcon from '@mui/icons-material/Report';
import MedicalServicesIcon from '@mui/icons-material/MedicalServices';
import { FindUserMe } from '@/services/authen.service';
import { useRouter } from 'next/navigation';
import Loadding from '@/components/Loadding';
import { Button } from '@mui/material';

export default function page() {
  const router = useRouter();
  const [isLoad, setIsLoad] = useState<boolean>(false);
  // const getRoleByUserId = useCallback(async() => {
  //     try {
  //         const result = await FindUserMe()
  //         console.log(result.data);

  //     } catch (error) {
  //         console.log(error);

  //     }
  // }, [])

  // useEffect(() => {
  //     getRoleByUserId()
  // }, [getRoleByUserId])
  function onRedirectPath(path: string) {
    setIsLoad(true);
    router.push('/' + path);
  }

  return (
    <>
      <div className={selectModel.home}>
        <div className={selectModel.cardHome}>
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
