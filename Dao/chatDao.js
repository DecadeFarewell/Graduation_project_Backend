const dbutils = require('./dbutils');
const path = require('path');

function getMsgList(callback) {
    // const sql = `
    // select username as name, content as msg, ctime
    // from chat_recode
    // `;
    const sql = `
    select a.chatID as id,b.username as name, a.content as msg, a.ctime
    from chat_recode as a, user as b
    where a.userID = b.id
    order by a.chatID
    `;
    dbutils.exeQuerySql(dbutils.createConnection, sql, [], callback);
}

function sendMsg(params, callback) {
    const sql = 'insert into chat_recode (userID, content, ctime) values (?,?,?)'
    dbutils.exeQuerySql(dbutils.createConnection, sql, params, callback);
}

module.exports = {
    getMsgList,
    sendMsg
}