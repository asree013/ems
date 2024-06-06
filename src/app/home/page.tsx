'use client'
import Nav from '@/components/Nav'
import Avatar from '@mui/material/Avatar';
import React from 'react'
import './home.css'
import { useRouter } from 'next/navigation';
import Loadding from '@/components/Loadding';
import patientImage from '@/assets/icon/examination_12772952.png'
import monitorImage from '@/assets/icon/monitoring_12714969.png'
import deviceImage from '@/assets/icon/mobile_14820652.png'

const menuBottom = [
    {
        name: 'Patient',
        image: patientImage
    },
    {
        name: 'Device',
        image: deviceImage
    },
    {
        name: 'Monitor',
        image: monitorImage
    },
]

export default function page() {
    const router = useRouter()
    const [isLoad, setIsLoad] = React.useState(false)

    function onRedirect(str: string) {
        setIsLoad(true)
        router.push(`/${str}`)
    }
    return (
        <>
            <Nav />

            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '50px', flexDirection: 'column' }}>
                <h2 style={{ marginTop: '20px' }}>Home Menu</h2>
                <div className='menuItem'>
                    {
                        menuBottom.map(r =>
                            <div key={r.name} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                <div className='menuValue' onClick={() => onRedirect(r.name.toLocaleLowerCase())}>
                                    <Avatar variant="rounded" src={r.image.src} />
                                    <p>{r.name}</p>
                                </div>
                            </div>
                        )
                    }
                </div>
            </div>

            {
                isLoad ?
                    <Loadding />
                    : null
            }

        </>
    )
}
