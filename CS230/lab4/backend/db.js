//please install pg first :npm install pg

const { Client } = require('pg');

const client = new Client({
    user: process.env.USER,
    host: process.env.HOST,
    database: 'cs130',
    password: process.env.PASSWORD,
    port: '5432',
    ssl: true,
});

client.connect((error) => {
    if (!error)
        console.log("DB connect successful ")
    else
        console.log("DB connect fail\n Error" + JSON.stringify(error))
})

module.exports = { client };




