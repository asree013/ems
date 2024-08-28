import PouchDB from 'pouchdb';
import PouchDBFind from 'pouchdb-find';
const sar_local_db = new PouchDB('sar_local_db');
PouchDB.plugin(PouchDBFind);
export default sar_local_db