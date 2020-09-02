const dbutils = require('./dbutils');
const path = require('path');

function publishNotice(params, callback) {
    const sql = 'insert into notice (title,content,publisher,ctime) values (?,?,?,?)';
    dbutils.exeQuerySql(dbutils.createConnection, sql, params, callback)

}

function getAllNotices(callback) {
    const sql = 'select * from notice order by id desc'
    dbutils.exeQuerySql(dbutils.createConnection, sql, [], callback)
}
function delNoticeById(id, callback) {
    const sql = 'delete from notice where id = ?'
    dbutils.exeQuerySql(dbutils.createConnection, sql, id, callback)
}

module.exports = {
    publishNotice,
    getAllNotices,
    delNoticeById
}