
import couchbase from 'couchbase';
import uuid4 from 'uuid4';
import { BUCKET } from './constants';

const cluster = new couchbase.Cluster("couchbase://localhost", {
    username: 'dbuser',
    password: 'dbuser'
});

const bucket = cluster.bucket('turqoise-dictionary');
const collection = bucket.defaultCollection();

const upsertUser = async (doc) => {
    try {
        const key = uuid4();
        console.log(key);
        const result = await collection.upsert(key, doc);
        console.log(result);
    }
    catch (e) {
        console.log(e)
    }
}

export const getUser = async (email, password) => {
    try {
        const query = `SELECT EXISTS(SELECT * FROM \`turqoise-dictionary\` WHERE email = '${email}' AND \`password\`='${password}' ) AS validUser`
        const { rows } = await cluster.query(query);
        return rows[0].validUser || false;
    } catch (error) {
        console.error(error);
        return error;
    }
};