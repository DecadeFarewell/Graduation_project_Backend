const dbutils = require('./dbutils');
const path = require('path');

function uploadDynamicInfo(params, callback) {
    const sql = 'insert into dynamic_list (userID, content, ctime) values (?,?,?)';
    dbutils.exeQuerySql(dbutils.createConnection, sql, params, callback);
}

function uploadDynamicImg(id, pathArr, callback) {
    let strs = '';
    const params = []

    for (let i = 0; i < pathArr.length; i++) {
        strs += i === 0 ? '(?,?)' : ',(?,?)';
        params.push(id, pathArr[i]);
    }
    const sql = `insert into dynamic_imgs (listID, path) values ${strs}`;
    dbutils.exeQuerySql(dbutils.createConnection, sql, params, callback);
}

function getDynamicByPage(page, pageSize, callback) {
    // const sql = 'select * from dynamic_list order by id desc limit ?,?';
    const sql = `
    select a.id as listID, a.content, a.ctime, a.favorite,b.username, b.real_name,b.avater_path
    from dynamic_list as a left join user as b
    on a.userID = b.id
    order by a.id desc
    limit ?,?
    `;
    const params = [page * pageSize, pageSize];
    dbutils.exeQuerySql(dbutils.createConnection, sql, params, callback);
}

function getDynamicImgPath(listID, callback) {
    const sql = `select *
    from dynamic_imgs
    where listID = ?`;
    dbutils.exeQuerySql(dbutils.createConnection, sql, listID, callback);
}

function delById(id, callback) {
    const sql = 'delete from dynamic_list where id = ?'
    dbutils.exeQuerySql(dbutils.createConnection, sql, id, callback);
}
//评论留言
function leaveMessage(params, callback) {
    const sql = 'insert into replay (dID,uID,content,ctime,pID,lookover) values (?,?,?,?,?,?)'
    dbutils.exeQuerySql(dbutils.createConnection, sql, params, callback);

}
//获取某条动态的评论
function getMessageById(id, callback) {
    const sql = `
    select a.id,a.content,b.username,a.pID as parentID,a.lookover as hasLook
    from replay as a, user as b
    where a.uID = b.id and  a.dID= ?
    `;
    dbutils.exeQuerySql(dbutils.createConnection, sql, id, callback);

}

function delLeaveMsgById(id, callback) {
    const sql = 'delete from replay where id = ?';
    dbutils.exeQuerySql(dbutils.createConnection, sql, id, callback);
}


module.exports = {
    uploadDynamicInfo,
    uploadDynamicImg,
    getDynamicByPage,
    getDynamicImgPath,
    delById,
    leaveMessage,
    getMessageById,
    delLeaveMsgById
}