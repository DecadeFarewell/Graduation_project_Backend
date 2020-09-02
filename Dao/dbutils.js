const mysql = require('mysql');

const createConnection = function () {
    const connection = mysql.createConnection({
        host: '127.0.0.1',
        port: '3306',
        user: 'root',
        password: '541246755zxc',
        database: 'alumni'
    })
    return connection
}
const exeQuerySql = function (createConnectFn, sql, params, callback) {
    const connection = createConnectFn();
    connection.connect();
    connection.query(sql, params, (err, result) => {
        if (err) {
            throw new Error(err);
        } else {
            callback(result);
        }
    });
    connection.end();
}

module.exports = {
    createConnection,
    exeQuerySql
}