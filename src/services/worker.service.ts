import { useEffect } from 'react';
import { dbDexie } from '@/configs/dexie.config';
import { createPatient, findPatientById } from './paitent.service';
import axios from 'axios';

let isOnline = false

const isNavigator = typeof navigator !== 'undefined'
if (isNavigator) {
    isOnline = navigator.onLine
}


export const syncDb = async (): Promise<void> => {
    try {
        if (isOnline=== false) {
            console.log('Cannot sync, offline');
            return;
        }

        const findPatientOf = await dbDexie.patients.toArray();
        if (findPatientOf.length === 0) {
            console.log('No patients to sync');
            return;
        }

        console.log('Syncing...');
        await Promise.all(
            findPatientOf.map(async (patient) => {
                const find = await findPatientById(patient.id);
                if (!find.data) return;

                const create = await createPatient(find.data);
                console.log('Sync ===> Create patient', create);
            })
        );

        await dbDexie.patients.clear().catch((e) => console.log('Error clearing local DB:', e));
    } catch (error) {
        console.error('Error during sync:', error);
    }
};


