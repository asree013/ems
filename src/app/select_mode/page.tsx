'use client'
import React, { useCallback, useEffect, useState } from 'react'
import selectModel from './selctMode.module.css'
import SystemSecurityUpdateIcon from '@mui/icons-material/SystemSecurityUpdate';
import SailingIcon from '@mui/icons-material/Sailing';
import AirplanemodeActiveIcon from '@mui/icons-material/AirplanemodeActive';
import ReportIcon from '@mui/icons-material/Report';
import MedicalServicesIcon from '@mui/icons-material/MedicalServices';
import { FindUserMe } from '@/services/authen.service';
import { useRouter } from 'next/navigation';
import Loadding from '@/components/Loadding';

export default function page() {
    const router = useRouter()
    const [isLoad, setIsLoad] = useState<boolean>(false)
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
        setIsLoad(true)
        router.push('/'+ path)
    }

    return (
        <>
            <div className={selectModel.home}>
                <div className={selectModel.cardHome}>
                    <p>SELECT MODE</p>
                    <div className={selectModel.line}></div>
                    <div className={selectModel.gridButton}>
                        <div className={selectModel.cardButton} onClick={() => onRedirectPath('home')}>
                            <SystemSecurityUpdateIcon fontSize='large'  />
                            <p style={{ fontSize: '1.3rem' }}>EMS</p>
                        </div>
                        <div className={selectModel.cardButton}>
                            <SailingIcon fontSize='large' />
                            <p style={{ fontSize: '1.3rem' }}>Marine EMS</p>
                        </div>
                        <div className={selectModel.cardButton}>
                            <AirplanemodeActiveIcon fontSize='large' />
                            <p style={{ fontSize: '1.3rem' }}>Halicopter EMS</p>
                        </div>
                        <div className={selectModel.cardButton}>
                            <MedicalServicesIcon fontSize='large' />
                            <p style={{ fontSize: '1.3rem' }}>MERT</p>
                        </div>
                        <div className={selectModel.cardButton}>
                            <ReportIcon fontSize='large' />
                            <p style={{ fontSize: '1.3rem' }}>SAR</p>
                        </div>
                    </div>
                </div>
            </div>
            {
                isLoad?
                <Loadding />:
                null
            }
        </>
    )
}
