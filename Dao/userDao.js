const dbutils = require('./dbutils');
const path = require('path');

//查询所有用户
function searchAllUser(callback) {
    const sql = 'select * from user';
    dbutils.exeQuerySql(dbutils.createConnection, sql, [], callback);
}
//用户注册
function register(userName, pwd, callback) {
    const promise = new Promise((resolve, reject) => {
        searchAllUser(resolve);
    })
    promise.then((allUsers) => {
        const exist = allUsers.every(user => user.username !== userName);
        if (exist) { //用户名没有被注册
            const sql = 'insert into user (username, password, avater_path) values (?,?,?)';
            const pathStr = path.join('static', 'images', 'common.jpg');
            const params = [userName, pwd, pathStr];
            dbutils.exeQuerySql(dbutils.createConnection, sql, params, callback);
        } else {// 用户名已经存在
            const suc = false
            success(suc);
        }
    })
        .catch(err => {
            throw new Error(err)
        })
}

//根据用户名获取用户信息 --登录
function login(userName, callback) {
    const sql = 'select * from user where username = ?';
    dbutils.exeQuerySql(dbutils.createConnection, sql, [userName], callback);
}
// 根据管理员名获取管理员信息 --登录
function adminLogin(adminName, callback) {
    const sql = 'select * from admin where adminName = ?';
    dbutils.exeQuerySql(dbutils.createConnection, sql, [adminName], callback);
}
function getOrdinaryInfo(id, callback) {
    const sql = 'select * from user where id = ?'
    dbutils.exeQuerySql(dbutils.createConnection, sql, [id], callback);
}
function getAdminInfo(id, callback) {
    const sql = 'select * from admin where id = ?'
    dbutils.exeQuerySql(dbutils.createConnection, sql, [id], callback);
}
//修改用户信息
function modify(params, callback) {
    const paramStr = 'username = ?, real_name = ?,sex = ?,height = ?,weight = ?,birthday = ?,constellation = ?,e_mail = ?,tel = ?,qq = ?,wx = ?,depart = ?,classID = ?,hobby = ?'
    const sql = `update user set ${paramStr} where id = ?`;
    dbutils.exeQuerySql(dbutils.createConnection, sql, params, callback);
}
// 获取班级列表
function getClassList(callback) {
    const sql = 'select cID as classID,className from class'
    dbutils.exeQuerySql(dbutils.createConnection, sql, [], callback);
}
// 修改头像地址
function changeAvater(pathName, id, callback) {
    const sql = 'update user set avater_path = ? where id = ?';
    const params = [pathName, id];
    dbutils.exeQuerySql(dbutils.createConnection, sql, params, callback);
}
//获取头像地址
function getAvaterPath(id, callback) {
    const sql = 'select a.avater_path from user as a where id = ?';
    dbutils.exeQuerySql(dbutils.createConnection, sql, [id], callback);
}
//获取当前用户发布的动态
function getMyDynamicList(id, callback) {
    const sql = `    
    select a.id as listID, a.content, a.ctime, a.favorite,b.username, b.real_name,b.avater_path
    from dynamic_list as a , user as b
    where a.userID = b.id and a.userID = ?
    order by a.id desc
    `;
    dbutils.exeQuerySql(dbutils.createConnection, sql, id, callback);
}
//获取当前用户的通知数量
function getNewMessageNum(id, callback) {
    const sql = `
    select count(*) as count
    from user as a,dynamic_list as b,replay as c
    where a.id = ? and b.userID = a.id and b.id = c.dID and c.lookover = -1
    `;
    dbutils.exeQuerySql(dbutils.createConnection, sql, id, callback);
}
//清除通知
function hasLookAll(id, callback) {
    const sql = `
    update replay as a,
    (select a.id
    from replay as a,dynamic_list as b
    where a.lookover = -1 and a.dID = b.id and b.userID = ?
    ) as b 
    set a.lookover = 1 where a.id = b.id
    `;
    dbutils.exeQuerySql(dbutils.createConnection, sql, id, callback);
}

module.exports = {
    searchAllUser,
    register,
    login,
    adminLogin,
    modify,
    changeAvater,
    getAvaterPath,
    getClassList,
    getOrdinaryInfo,
    getAdminInfo,
    getMyDynamicList,
    getNewMessageNum,
    hasLookAll
}

