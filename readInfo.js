var xlsx = require('node-xlsx');
var fs = require('fs');
var sheets = xlsx.parse('./学生信息/');
console.log(sheets, '===')

var arr = [];
//sheets是一个数组，数组中的每一项对应test.xlsx这个文件里的多个表格，如sheets[0]对应test.xlsx里的“测试参数”这个表格，sheets[1]对应Sheet2这个表格
sheets.forEach(function (sheet) {
    var newSheetsArr = [];
    //sheet是一个json对象，格式为{name:"测试参数",data:[]},我们想要的数据就存储在data里
    for (var i = 3; i < sheet["data"].length; i++) { //excel文件里的表格一般有标题所以不一定从0开始
        var row = sheet['data'][i];
        if (row && row.length > 0) {
            // console.log(row)
            newSheetsArr.push({
                studentName: row[0],
                tel: row[2],
                depart: row[3],
                classes: row[4]
            });
        }
    }
    arr.push(newSheetsArr);
})
// console.log(arr)

const dbutils = require('./Dao/dbutils');
const path = require('path')
function addStudent(username, real_name, password, depart, classID) {
    const sql = 'insert into user (username,real_name, password, avater_path,depart,classID) values (?,?,?,?,?,?)';
    const pathStr = path.join('static', 'images', 'common.jpg');
    const params = [username, real_name, password, pathStr, depart, classID];
    dbutils.exeQuerySql(dbutils.createConnection, sql, params, () => { });
}

for (let i = 5; i < arr[0].length; i++) {
    const { studentName, tel, depart, classes } = arr[0][i];
    addStudent(studentName, studentName, '123456', depart, 11)
}

