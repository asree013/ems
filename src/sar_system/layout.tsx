'use client';

import React, { useEffect, useState } from 'react';
import { db, remoteDB } from '@/configs/pouchDb.config';
import Nav from '@/components/nav/Nav';


export default function DashboardLayout({ children }: { children: React.ReactNode }) {
    const [syncError, setSyncError] = useState<string | null>(null);
    const [isOnline, setIsOnline] = useState<boolean>(navigator.onLine);


    const clearCache = async () => {
        if ('caches' in window) {
            try {
                const cacheNames = await caches.keys();
                await Promise.all(cacheNames.map(cache => caches.delete(cache)));
                console.log('Cache cleared after sync');
            } catch (error) {
                console.error('Failed to clear cache:', error);
            }
        }
    };

    const syncWithCouchDB = () => {

        db.sync(remoteDB)
            .on('complete', async () => {
                console.log('Sync complete');

                setSyncError(null); // Reset error on success
                await clearCache(); // Clear cache after successful sync
            })
            .on('error', (err) => {
                console.error('Sync error', err);
                setSyncError('Sync error occurred. Please check your connection.');
            });
    };

    const handleOnline = () => {
        console.log('Internet connection detected');
        setIsOnline(true);
        syncWithCouchDB();
    };

    const handleOffline = () => {
        console.log('No internet connection');
        setIsOnline(false);
    };

    useEffect(() => {
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
            {!isOnline && <p style={{ color: 'red' }}>You are currently offline.</p>}
            {syncError && <p style={{ color: 'red' }}>{syncError}</p>}
        </section>
    );
}
