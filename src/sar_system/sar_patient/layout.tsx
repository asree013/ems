'use client';

import { useEffect, useState } from 'react';
import Loadding from '@/components/Loadding';
import Nav from '@/components/nav/Nav';

export default function DashboardLayout({
    children, 
}: {
    children: React.ReactNode;
}) {
    const userOfline = localStorage.getItem('oflineUserId')
    const [load, setLoad] = useState(false)

    useEffect(() => {
        if (!userOfline) {
            setLoad(true)
            window.location.href = '/sar_system'
        }
    }, [userOfline])

    return (
        <section style={{ width: '100%' }}>
            <Nav />
            {children}
            {load? <Loadding />: null}
        </section>
    );
}
