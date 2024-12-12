import { addRxPlugin, createRxDatabase } from 'rxdb';
import { getRxStorageDexie } from 'rxdb/plugins/storage-dexie';
import { RxDBDevModePlugin } from 'rxdb/plugins/dev-mode';
import { PatientOffline, Patients } from '@/models/patient';
import axios from 'axios';
import { dbDexie } from '@/configs/dexie.config';
import { createPatient, findPatientById } from './paitent.service';
import { assingPatinetToCarByCarIdAndPatientId } from './car.service';

export async function checkOnline() {
    return new Promise<boolean>((r) => {
        axios.get('https://one.one.one.one/').then((d) => r(true))
            .catch(e => r(false))
    })
}

export async function syncDb() {
    try {
        ///do create patient
        if (await checkOnline()) {
            const findPatientOf = await dbDexie.patients.toArray()
            if (findPatientOf.length === 0) return 
            console.log('syncing');

            await Promise.all(findPatientOf.map(async (r) => {
                const find = await findPatientById(r.id)
                if(!find.data) return
                const create = await createPatient(find.data)
                console.log('sync ===> create pateint', create);
                
            }))
            dbDexie.patients.clear().catch(e => null)
            
            // if(findAddInVehicel[0].helicopter.Helicopter.PatientBelongHelicopter.length > 0){
            //     await Promise.all(findAddInVehicel[0].helicopter.Helicopter.PatientBelongHelicopter.map(async (r) => await assingPatinetToCarByCarIdAndPatientId(r.car_id, r.Patient.id)))
            // }
            return
        }
        else {
            console.log('cannot sync');
            return
        }
        /// do create history
    } catch (error) {
        console.log('catch sync');

    }
}