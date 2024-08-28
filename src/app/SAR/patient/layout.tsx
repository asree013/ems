'use client'
import Nav from '@/components/Nav';
import { useCallback, useEffect, useState } from 'react';
import { FindUserMe } from '@/services/authen.service';
import TabMenu from '@/components/TabMenu';
import ChatButton from '@/components/ChatButton';
import Loadding from '@/components/Loadding';

export default function DashboardLayout({
    children, // will be a page or nested layout
}: {
    children: React.ReactNode;
}) {
    const userOfline = localStorage.getItem('oflineUserId')
    const [load, setLoad] = useState(false)

    useEffect(() => {
        if (!userOfline) {
            setLoad(true)
            window.location.href = '/SAR'
        }
    }, [])

    return (
        <section style={{ width: '100%' }}>
            {/* Include shared UI here e.g. a header or sidebar */}
            <Nav />

            {children}

            {
                load?
                <Loadding />
                : null
            }
        </section>
    );
}
