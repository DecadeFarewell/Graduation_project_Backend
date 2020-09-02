const dbutils = require('./dbutils');
const path = require('path');

function getClassMember(callback) {
    const sql = `
    select a.classID, b.className, count(*) as counts
    from user as a,class as b
    where  classID is not null and a.classID = b.cID
    group by a.classID
    `;
    const params = [];
    dbutils.exeQuerySql(dbutils.createConnection, sql, params, callback);
}

//上传到班级相册
function uploadToAlbum(classID, pathArr, callback) {
    let values = '';
    const params = [];
    for (let i = 0; i < pathArr.length; i++) {
        const v = i === 0 ? '(?,?,?)' : ',(?,?,?)'
        values += v;
        //整合参数
        const timer = new Date().getTime()
        params.push(classID, pathArr[i], timer);
    }
    const sql = `insert into album (cID,img_path,ctime) values ${values}`
    dbutils.exeQuerySql(dbutils.createConnection, sql, params, callback);
}

//获取班级相册的所有图片路径
function getAlbumImgsPath(classID, callback) {
    const sql = `
    select a.aID as id,b.className,a.img_path as url,a.ctime
    from album as a,class as b
    where a.cID = b.cID and a.cID = ?
    order by aID desc
    `;
    dbutils.exeQuerySql(dbutils.createConnection, sql, [classID], callback);

}

//获取封面图片路径
function getAlbumPost(classID, callback) {
    const sql = `
    select a.className,b.img_path as posterUrl
    from class as a,album as b
    where b.cID = a.cID and b.cID = ?
    order by b.aID desc
    `;
    dbutils.exeQuerySql(dbutils.createConnection, sql, [classID], callback);
}

//获取一个班级所有人的信息
function getAllMember(classID, callback) {
    const sql = `select id,username,real_name,sex,height,weight,birthday,constellation,e_mail,tel,qq,wx,depart,classID,hobby,avater_path
    from user 
    where classID = ?
    `;
    dbutils.exeQuerySql(dbutils.createConnection, sql, [classID], callback);
}

//所有班级名称及其对应的id
function getAllClass(callback) {
    const sql = 'select cID,className from class'
    dbutils.exeQuerySql(dbutils.createConnection, sql, [], callback);
}

//删除一张根据id
function delPhotoById(id, callback) {
    const sql = 'delete from album where aID = ?';
    dbutils.exeQuerySql(dbutils.createConnection, sql, id, callback);

}
//模糊查询
function fuzzyQuery(searchWord, callback) {
    const sql = `
    select id,username,real_name
    from user
    where real_name like ?
    `;
    dbutils.exeQuerySql(dbutils.createConnection, sql, [`%${searchWord}%`], callback);

}

module.exports = {
    getClassMember,
    uploadToAlbum,
    getAlbumImgsPath,
    getAlbumPost,
    getAllMember,
    getAllClass,
    delPhotoById,
    fuzzyQuery
}