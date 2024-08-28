'use client';

import React, { useEffect } from 'react';
import Nav from '@/components/Nav';
import PouchDB from 'pouchdb';

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
    useEffect(() => {
        const db = new PouchDB('sar_local_db');

        const syncWithCouchDB = () => {
            const remoteDB = new PouchDB('http://admin:admin@localhost:5984/sar_local_db');

            db.sync(remoteDB)
                .on('complete', () => {
                    console.log('Sync complete');
                })
                .on('error', (err) => {
                    console.error('Sync error', err);
                });
        };

        const handleOnline = () => {
            console.log('Internet connection detected');
            syncWithCouchDB();
        };

        const handleOffline = () => {
            console.log('No internet connection');
        };

        window.addEventListener('online', handleOnline);
        window.addEventListener('offline', handleOffline);

        if (navigator.onLine) {
            syncWithCouchDB();
        }

        return () => {
            window.removeEventListener('online', handleOnline);
            window.removeEventListener('offline', handleOffline);
        };
    }, []);

    return (
        <section style={{ width: '100%' }}>
            <Nav />
            <div style={{ marginTop: '60px' }}>
                {children}
            </div>
        </section>
    );
}
