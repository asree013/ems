import { Historys } from '@/models/history.model';
import { Patients } from '@/models/patient';
import { Users } from '@/models/users.model';
import { Dexie, type EntityTable } from 'dexie';
import { useLiveQuery } from 'dexie-react-hooks';

export const dbDexie = new Dexie('ems_local') as Dexie & {
    patients: EntityTable<Patients, 'id'>;
    historys: EntityTable<Historys, 'id'>
    userFindMe: EntityTable<Users, 'id'>
};

dbDexie.version(1).stores({
    patients: '&id',
    historys: '&id',
    userFindMe: '&id',
});
