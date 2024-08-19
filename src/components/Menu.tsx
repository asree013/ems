'use client'
import React, { useContext, useEffect, useState } from 'react'
import menuCss from './styles/MenuItem.module.css'
import WidgetsIcon from '@mui/icons-material/Widgets';
import { Card, IconButton, Paper } from '@mui/material';

import { MenuValueContext, TMenuValueC } from '@/contexts/menu.value.context';
import Loadding from './Loadding';

// import HomeIcon from '@mui/icons-material/Home';
// import HotelIcon from '@mui/icons-material/Hotel';
import DeviceIcon from '@/assets/icon/device_5062836.png'
import MissionIcon from '@/assets/icon/mission.png'
import PatientIcon from '@/assets/icon/patient_menu.png'
import HomeIcons from '@/assets/icon/home_9449216.png'
import MornitorIcon from '@/assets/icon/monitor_4765315.png'
import ChatIcon from '@/assets/icon/ui-element_15768343.png'
import Ambulance from '@/assets/icon/ambulance.png'

export default function MenuItem() {

    function onRedirect() {
        setInterval(() => {
            setValue(0)
        }, 4000)
    }

    useEffect(() => {
        return() => {
            onRedirect
        }
    }, [])

    const { value, setValue } = useContext<TMenuValueC>(MenuValueContext)
    const [load, setLoad] = useState<boolean>(false)
    return (
        <>
            <div className={menuCss.homeMenu}>

                <div className={menuCss.header}>
                    <WidgetsIcon />
                    <p style={{ fontSize: '1.4rem', fontWeight: 700 }}>Menu</p>
                </div>

                <div className={menuCss.body}>
                    <Card elevation={3} style={{ padding: 5, width: '100%' }}>
                        <div onClick={() => {
                            window.location.href = '/home'
                            setLoad(true)
                            onRedirect()
                        }} className={menuCss.menuItem}>
                            <img src={HomeIcons.src} style={{ height: '4rem', width: '4rem' }} alt="" />
                            <div className={menuCss.menuDetail}>
                                <h3>หน้าหลัก</h3>
                                <p>detail</p>
                            </div>
                        </div>
                    </Card>
                    <Card elevation={3} style={{ padding: 5, width: '100%' }}>
                        <div onClick={() => {
                            window.location.href = '/chat'
                            setLoad(true)
                            onRedirect()
                        }} className={menuCss.menuItem}>
                            <img src={ChatIcon.src} style={{ height: '4rem', width: '4rem' }} alt="" />
                            <div className={menuCss.menuDetail}>
                                <h3>แชท</h3>
                                <p>detail</p>
                            </div>
                        </div>
                    </Card>
                    <Card elevation={3}>
                        <div onClick={() => {
                            window.location.href = '/mission'
                            setLoad(true)
                            onRedirect()
                        }} className={menuCss.menuItem}>
                            <img src={MissionIcon.src} style={{ height: '4rem', width: '4rem' }} alt="" />
                            <div className={menuCss.menuDetail}>
                                <h3>ภารกิจ</h3>
                                <p>detail</p>
                            </div>
                        </div>
                    </Card>
                    <Card elevation={3} style={{ padding: 5, width: '100%' }}>
                        <div onClick={() => {
                            window.location.href = '/patient'
                            setLoad(true)
                            onRedirect()
                        }} className={menuCss.menuItem}>
                            <img src={PatientIcon.src} style={{ height: '4rem', width: '4rem' }} alt="" />
                            <div className={menuCss.menuDetail}>
                                <h3>ผู้ป่วย</h3>
                                <p>detail</p>
                            </div>
                        </div>
                    </Card>
                    <Card elevation={3} >
                        <div onClick={() => {
                            window.location.href = '/device'
                            setLoad(true)
                            onRedirect()
                        }} className={menuCss.menuItem}>
                            <img src={DeviceIcon.src} style={{ height: '4rem', width: '4rem' }} alt="" />
                            <div className={menuCss.menuDetail}>
                                <h3>เครื่องวัด</h3>
                                <p>detail</p>
                            </div>
                        </div>
                    </Card>
                    <Card elevation={3}>
                        <div onClick={() => {
                            setLoad(true)
                            window.location.href = '/monitor'
                            onRedirect()
                        }} className={menuCss.menuItem}>
                            <img src={MornitorIcon.src} style={{ height: '4rem', width: '4rem' }} alt="" />
                            <div className={menuCss.menuDetail}>
                                <h3>จอแสดงเครื่องวัด</h3>
                                <p>detail</p>
                            </div>
                        </div>
                    </Card>
                    <Card elevation={3}>
                        <div onClick={() => {
                            setLoad(true)
                            window.location.href = '/vehicle'
                            onRedirect()
                        }} className={menuCss.menuItem}>
                            <img src={Ambulance.src} style={{ height: '4rem', width: '4rem' }} alt="" />
                            <div className={menuCss.menuDetail}>
                                <h3>ยานภาหณะ</h3>
                                <p>detail</p>
                            </div>
                        </div>
                    </Card>
                </div>
            </div>

            {
                load ?
                    <Loadding /> :
                    null
            }
        </>
    )
}
