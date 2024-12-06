import { createRxDatabase } from 'rxdb';
import { getRxStorageDexie } from 'rxdb/plugins/storage-dexie';

export const db = createRxDatabase({
    name: 'heroesdb',
    storage: getRxStorageDexie(),
    password: 'myPassword',
    multiInstance: true,
    eventReduce: true,
    cleanupPolicy: {}
})

