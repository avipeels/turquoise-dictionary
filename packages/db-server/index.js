const couchbase = require('couchbase');
const uuid4 = require('uuid4');

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

// get document function
const getUser = async (email, password) => {
    try {
        const result = await cluster.query("SELECT * FROM `turqoise-dictionary` WHERE email = 'avinashpsk@gmail.com' AND `password`='12345'");
        // const result = await collection.get(email);
        console.log("Get Result: ");
        console.log(result);
    } catch (error) {
        console.error(error);
    }
};

// upsertUser({
//     email: 'aaa@ggg.com',
//     password: 'abc'
// })

getUser('avinashpsk@gmail.com', '12345');