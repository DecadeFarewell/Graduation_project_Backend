const userDao = require('../Dao/userDao');
const resUtils = require('../utils/respUtils');
const fs = require('fs');
const path = require('path');
const url = require('url');
const credentials = require('../utils/credentials');
const jwt = require('jsonwebtoken');
const authList = require('../utils/authList')


//登录
function login(req, res) {
    const params = url.parse(req.url, true).query;
    // 管理员和普通人的登录区分开来。
    if (params.userName === 'admin') {
        //管理员登录
        userDao.adminLogin(params.userName, (result) => {
            const resp = loginValidate(params, result, 'admin', responseData = null);
            res.end(resp)
        })
    } else {
        //普通人登录
        userDao.login(params.userName, (result) => {
            const resp = loginValidate(params, result, 'ordinary', responseData = null);
            res.end(resp)
        })
    }
}
function loginValidate(params, result, role, responseData) {
    if (result && result.length > 0) {
        if (result[0].password === params.password) {
            const token = jwt.sign({ id: result[0].id, role }, credentials.secret);
            responseData = resUtils.writeResponse('ok', '登录成功！', token);
        } else {
            responseData = resUtils.writeResponse('no', '密码错误！');
        }
    } else {
        responseData = resUtils.writeResponse('no', '用户名不存在！');
    }
    return responseData
}
//获取用户信息
function getUserinfo(req, res) {
    const token = req.headers.authorization;
    const decode = jwt.verify(token, credentials.secret);
    const { id, role } = decode;
    new Promise((resolve, reject) => {
        role === 'admin' ? getAdmin(id, resolve) : getOrdinary(id, resolve)
    }).then(result => {
        result[0].role = authList[role];
        res.end(resUtils.writeResponse('ok', '获取用户信息成功', result))
    })
}
function getOrdinary(id, callback) {
    userDao.getOrdinaryInfo(id * 1, callback)
}
function getAdmin(id, callback) {
    userDao.getAdminInfo(id * 1, callback)

}
//注册
function register(req, res) {
    req.on('data', e => {
        const data = JSON.parse(e.toString());
        userDao.register(data.userName, data.password, (result) => {
            res.writeHead(200);
            let responseData = null;
            if (result) {
                responseData = resUtils.writeResponse('ok', '注册成功！');
            } else {
                responseData = resUtils.writeResponse('no', '用户名已经存在！')
            }
            res.write(responseData);
            res.end();
        })
    })
}
//修改
function modify(req, res) {
    req.on('data', e => {
        const data = JSON.parse(e.toString());
        const params = [
            data.username,
            data.real_name,
            data.sex,
            data.height * 1,
            data.weight * 1,
            data.birthday,
            data.constellation,
            data.e_mail,
            data.tel,
            data.qq,
            data.wx,
            data.depart,
            data.classID * 1,
            data.hobby,
            data.id * 1
        ];
        userDao.modify(params, (result) => {
            res.writeHead(200);
            let responseData = null;
            responseData = resUtils.writeResponse('ok', '修改成功', result);
            res.write(responseData);
            res.end();
        })
    })
}
//获取班级列表
function getClassList(req, res) {
    userDao.getClassList((result) => {
        res.end(resUtils.writeResponse('no', '获取成功', result))
    })
}
//获取头像图片
function getAvater(req, res) {
    const pathname = url.parse(req.url).pathname;
    const pathStr = path.join('./', pathname)
    const data = fs.readFileSync(pathStr)
    res.set({
        'Cache-Control': 'max-age=31536000'
    })
    res.end(data)
}
//更改头像
function changeAvater(req, res) {
    const file = req.file;
    fileRename(file);
    let id = url.parse(req.url).query.split('=')[1];
    let pathName = path.join('static', 'images', file.originalname)
    userDao.changeAvater(pathName, id, (result) => {
        res.writeHead(200);
        let responseData = resUtils.writeResponse('ok', '修改成功', result);
        res.write(responseData);
        res.end();
    })
}
//给上传的图片重命名
function fileRename(file) {
    const oldPath = path.join(file.destination, file.filename);
    const newPath = path.join(file.destination, file.originalname);
    fs.renameSync(oldPath, newPath);
}
//头像路劲
function getAvaterPath(req, res) {
    let params = url.parse(req.url, true).query;
    userDao.getAvaterPath(params.id, (result) => {
        res.writeHead(200);
        let responseData = resUtils.writeResponse('ok', '查询成功', result);
        res.write(responseData);
        res.end();
    })
}

//获取当前用户的动态列表
function getMyDynamicList(req, res) {
    const { userID } = url.parse(req.url, true).query;
    userDao.getMyDynamicList(userID, result => {
        res.end(resUtils.writeResponse('ok', '获取成功', result))
    })
}

//获取当前用户的通知数量
function getNewMessageNum(req, res) {
    const { userID } = url.parse(req.url, true).query;
    userDao.getNewMessageNum(parseInt(userID), result => {
        res.end(resUtils.writeResponse('ok', '获取成功', result))
    })
}
//消除通知
function hasLookAll(req, res) {
    req.on('data', data => {
        const { userID } = JSON.parse(data.toString())
        userDao.hasLookAll(userID, result => {
            res.end(resUtils.writeResponse('ok', '清除成功'))
        })
    })
}

module.exports = {
    login,
    getUserinfo,
    register,
    modify,
    getAvater,
    changeAvater,
    getAvaterPath,
    getClassList,
    getMyDynamicList,
    getNewMessageNum,
    hasLookAll
}