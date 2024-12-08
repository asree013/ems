import { addRxPlugin, createRxDatabase } from 'rxdb';
import { getRxStorageDexie } from 'rxdb/plugins/storage-dexie';
import { RxDBDevModePlugin } from 'rxdb/plugins/dev-mode';
import { PatientOffline, Patients } from '@/models/patient';
import axios from 'axios';
import { dbDexie } from '@/configs/dexie.config';
import { createPatient } from './paitent.service';

export async function checkOnline() {
    return new Promise<boolean>((r) => {
        axios.get('https://one.one.one.one/').then((d) => r(true))
        .catch(e => r(false))
    })
}

export async function syncDb() {
    try {
        ///do create patient
        const findPatientOf = await dbDexie.patients.toArray()
        if(!findPatientOf) return
        await findPatientOf.forEach(async(r) => await createPatient(r))
        await dbDexie.patients.clear()
        /// do create history
    } catch (error) {
        console.log(error);
        
    }
}