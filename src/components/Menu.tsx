'use client'
import React, { useCallback, useContext, useEffect, useState } from 'react'
import menuCss from './styles/MenuItem.module.css'
import WidgetsIcon from '@mui/icons-material/Widgets';
import { Badge, Card, IconButton, Paper } from '@mui/material';

import { MenuValueContext, TMenuValueC } from '@/contexts/menu.value.context';
import Loadding from './Loadding';

import DeviceIcon from '@/assets/icon/device_5062836.png'
import MissionIcon from '@/assets/icon/mission.png'
import PatientIcon from '@/assets/icon/patient_menu.png'
import HomeIcons from '@/assets/icon/home_9449216.png'
import MornitorIcon from '@/assets/icon/monitor_4765315.png'
import ChatIcon from '@/assets/icon/ui-element_15768343.png'
import Ambulance from '@/assets/icon/ambulance.png'
import styled from 'styled-components';
import { Users } from '@/models/users.model';
import { FindUserMe } from '@/services/authen.service';
import { toast } from '@/services/alert.service';

const ButtonMenu = styled(Card)`
    width: 100%;
    padding: 3px;
    cursor: pointer;
    :hover {
        background: #ececec;
    }
`

export default function MenuItem() {

    const [findMe, setFindMe] = useState<Users>({} as Users)

    const onFindUserMe = useCallback(async () => {
        try {
            const result = await FindUserMe()
            setFindMe(result.data)
        } catch (error: any) {
            toast(error.message, 'error')
        }
    }, [setFindMe])

    function onRedirect() {
        setInterval(() => {
            setValue(0)
        }, 4000)
    }

    useEffect(() => {
        onFindUserMe()
        return () => {
            onRedirect
        }
    }, [onFindUserMe])

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
                    <ButtonMenu elevation={3}>
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
                    </ButtonMenu>
                    <ButtonMenu elevation={3}>
                        <div onClick={() => {
                            window.location.href = '/chat/' + findMe.id
                            setLoad(true)
                            onRedirect()
                        }} className={menuCss.menuItem}>
                            <img src={ChatIcon.src} style={{ height: '4rem', width: '4rem' }} alt="" />
                            <div className={menuCss.menuDetail}>
                                <h3>แชท</h3>
                                <p>detail</p>
                            </div>
                        </div>
                    </ButtonMenu>
                    <ButtonMenu elevation={3}>
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
                    </ButtonMenu>
                    <ButtonMenu elevation={3}>
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
                    </ButtonMenu>
                    <ButtonMenu elevation={3}>
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
                    </ButtonMenu>
                    <ButtonMenu elevation={3}>
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
                    </ButtonMenu>
                    <ButtonMenu elevation={3}>
                        <div onClick={() => {
                            setLoad(true)
                            window.location.href = '/vehicle'
                            onRedirect()
                        }} className={menuCss.menuItem}>
                            <img src={Ambulance.src} style={{ height: '4rem', width: '4rem' }} alt="" />
                            <div className={menuCss.menuDetail}>
                                <h3>ยานพาหนะ</h3>
                                <p>detail</p>
                            </div>
                        </div>
                    </ButtonMenu>
                    <Badge badgeContent={'new'} color="error">
                        <ButtonMenu elevation={3}>
                            <div onClick={() => {
                                setLoad(true)
                                window.location.href = '/mission_tag_setting'
                                onRedirect()
                            }} className={menuCss.menuItem}>
                                <img src={Ambulance.src} style={{ height: '4rem', width: '4rem' }} alt="" />
                                <div className={menuCss.menuDetail}>
                                    <h3>ลักษณะภารกิจ</h3>
                                    <p>detail</p>
                                </div>
                            </div>
                        </ButtonMenu>
                    </Badge>
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
