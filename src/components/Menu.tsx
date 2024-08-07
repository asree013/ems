'use client'
import React, { useContext, useState } from 'react'
import menuCss from './styles/MenuItem.module.css'
import WidgetsIcon from '@mui/icons-material/Widgets';
import { Card, IconButton, Paper } from '@mui/material';

import { MenuValueContext, TMenuValueC } from '@/contexts/menu.value.context';
import Loadding from './Loadding';

import HomeIcon from '@mui/icons-material/Home';
import HotelIcon from '@mui/icons-material/Hotel';


export default function MenuItem() {

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
                    <Card elevation={5} style={{ padding: 5, width: '100%' }}>
                        <div onClick={() => {
                            setLoad(true)
                            setValue(0)
                            window.location.href = '/home'
                        }}>
                            <HomeIcon style={{ height: '5rem', width: '5rem' }} />
                            <p>หน้าหลัก</p>
                        </div>
                    </Card>
                    <Card elevation={5} style={{ padding: 5, width: '100%' }}>
                        <div onClick={() => {
                            setLoad(true)
                            setValue(0)
                            window.location.href = '/patient'
                        }}>
                            <HotelIcon style={{ height: '5rem', width: '5rem' }} />
                            <p>ผู้ป่วย</p>
                        </div>
                    </Card>
                    <Card elevation={5} className={menuCss.cards}>
                        <HotelIcon style={{ height: '5rem', width: '5rem' }} />
                    </Card>
                    <Card elevation={5} className={menuCss.cards}>
                        <HotelIcon style={{ height: '5rem', width: '5rem' }} />
                    </Card>
                    <Card elevation={5} className={menuCss.cards}>
                        <HotelIcon style={{ height: '5rem', width: '5rem' }} />
                    </Card>
                    <Card elevation={5} className={menuCss.cards}>
                        <HotelIcon style={{ height: '5rem', width: '5rem' }} />
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
