const couchbase = require('couchbase');
const uuid4 = require('uuid4');
// const N1qlQuery = couchbase.N1qlQuery;
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
        const result = await bucket.query(`SELECT * FROM \`turqoise-dictionary\` WHERE email = '${email}' AND \`password\`='${password}'`);
        // bucket.query(query, (err, rows, meta) => {
        //     console.log(rows);
        // })
        // const result = await cluster.query("SELECT * FROM `turqoise-dictionary` WHERE email = 'avinashpsk@gmail.com' AND `password`='12345'");
        // const result = await collection.get(email);
        // console.log(result.rows[0]['turqoise-dictionary']);
        console.log(result);
        return result;
        // if (result.rows[0]['turqoise-dictionary']) return true;

        // console.log(result[0]['turqoise-dictionary']);
    } catch (error) {
        console.error(error);
    }
};

// upsertUser({
//     email: 'aaa@ggg.com',
//     password: 'abc'
// })

getUser('avinashpsk@gmail.com', '12345');