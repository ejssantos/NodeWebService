const test = require('ava');

require('dotenv').config();

const mysqlServer = require('mysql');

const connection = mysqlServer.createConnection({
    host: process.env.MYSQL_TEST_HOST,
    user: process.env.MYSQL_TEST_USER,
    password: process.env.MYSQL_TEST_PASSWORD,
    database: process.env.MYSQL_TEST_DATABASE
});

const errorHandler = (error, msg, rejectFunction) => {
    console.error(error);
    rejectFunction({ error: msg });
}

module.exports = { test, connection, errorHandler };