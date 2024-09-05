import PouchDB from 'pouchdb-browser';
import PouchDBFind from 'pouchdb-find';
PouchDB.plugin(PouchDBFind);

export const db = new PouchDB('sar_local_db');

export const remoteDB = new PouchDB('http://admin:admin@localhost:5984/sar_local_db');

