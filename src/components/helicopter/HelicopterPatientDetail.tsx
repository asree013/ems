'use client'
import React, { useContext, useState } from 'react'

import PDetailCss from '../styles/Pdetail.module.css'
import { Card, Chip, Divider } from '@mui/material'

import PatinetIcon from '@/assets/icon/patient_menu.png'
import MonitorIcon from '@/assets/icon/monitoring_12714969.png'
import Loadding from '@/components/Loadding';

import car_vihecle from '../styles/car_vihecle.module.css'
import HeliopterPatient from './HelicopterPatient'
import { HelicopterByIdDetailContext, THelicopterByIdDetail } from './helicopterDetail.context'

export default function HelicopterPatientDetail() {
    const [load, setLoad] = useState<boolean>(false)
    const { halicoptorById, setHelicopterById} = useContext<THelicopterByIdDetail>(HelicopterByIdDetailContext)

    return (
        <>
            <div className={PDetailCss.home}>
                <div>
                    <Card elevation={3}>
                        <div onClick={() => {
                            setLoad(true)
                            window.location.href = '/patient?key=add-helicopter&vehicle_id=' + halicoptorById.id
                        }} className={PDetailCss.menuItem}>
                            <img src={PatinetIcon.src} style={{ height: '4rem', width: '4rem' }} alt="" />
                            <div className={PDetailCss.menuDetail}>
                                <h3>เพิ่มผู้ป่วย</h3>
                                <p>detail</p>
                            </div>
                        </div>
                    </Card>
                </div>
                <Divider className='mt-4' ><Chip label="ผู้ป่วยใน ฮ." size="small" color='primary' /></Divider>
                {
                    Object.keys(halicoptorById).length === 0 ?
                        null :
                        <div className={car_vihecle.grid}>
                            {
                                halicoptorById.PatientBelongHelicopter.map((r, i) =>
                                    <HeliopterPatient patient={r.Patient} heliopter_id={r.car_id} key={i} />
                                )
                            }
                        </div>

                }

            </div>

            {
                load ?
                    <Loadding /> :
                    null
            }
        </>
    )
}
