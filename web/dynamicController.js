const dynamicDao = require('../Dao/dynamicDao');
const resUtils = require('../utils/respUtils');
const dynamicService = require('../Service/dynamicService');
const fs = require('fs');
const path = require('path');
const url = require('url');

//上传动态图片
function uploadImg(req, res) {
    const files = req.files;
    let pathArr = [];
    for (let i = 0; i < files.length; i++) {
        const f = files[i];
        fileRename(f);
        const p = path.join(f.destination, f.originalname)
        pathArr.push(p);
    }
    res.end(resUtils.writeResponse('ok', '图片上传成功', pathArr))
}
//存储动态相关信息到数据库
function uploadInfo(req, res) {
    req.on('data', e => {
        const data = JSON.parse(e.toString())
        const params = [data.userID, data.content, new Date().getTime()];
        new Promise((resolve, reject) => {
            dynamicDao.uploadDynamicInfo(params, (result) => {
                const id = result.insertId;
                resolve(id)
            })
        }).then(id => {
            if (data.imgsPath.length > 0) {
                dynamicDao.uploadDynamicImg(id, data.imgsPath, (result) => {
                    res.end(resUtils.writeResponse('ok', '动态上传成功'))
                })
            }
            res.end(resUtils.writeResponse('ok', '动态上传成功'))
        })
    })
}

//拉取动态列表
function getAllDynamic(req, res) {
    const params = url.parse(req.url, true).query;
    dynamicDao.getDynamicByPage(params.page * 1, params.pageSize * 1, (result) => {
        res.writeHead(200, {
            "Content-Type": "text/html;charset=utf-8",
        })
        res.end(resUtils.writeResponse('ok', '列表获取成功', result))
    })
}
//获取动态对应的图片路径
function getDynamicImgPath(req, res) {
    const params = url.parse(req.url, true).query;
    dynamicDao.getDynamicImgPath(params.listID * 1, (result) => {
        res.end(resUtils.writeResponse('ok', '列表获取成功', result))
    })
}
//获取动态内容中的图片
function getDynamicImg(req, res) {
    const pathname = url.parse(req.url).pathname;
    const pathStr = path.join('./', pathname)
    const data = fs.readFileSync(pathStr)
    res.end(data)
}
//文件改名
function fileRename(file) {
    const oldPath = path.join(file.destination, file.filename);
    const newPath = path.join(file.destination, file.originalname);
    fs.renameSync(oldPath, newPath);
}
//按id删除
function delById(req, res) {
    const { id } = url.parse(req.url, true).query;
    dynamicDao.delById(id * 1, result => {
        res.end(resUtils.writeResponse('ok', '删除成功！'))
    })
}
//留言
function leaveMessage(req, res) {
    req.on('data', data => {
        const params = JSON.parse(data.toString());
        const {
            dynamicID,
            userID,
            content,
            ctime,
            pID,
            lookover
        } = params;
        dynamicDao.leaveMessage([dynamicID, userID, content, ctime, pID, lookover], result => {
            res.end(resUtils.writeResponse('ok', '评论成功！'))
        })

    })
}

//获取留言
function getMessageById(req, res) {
    const id = url.parse(req.url, true).query.listID;
    dynamicDao.getMessageById(id, result => {
        res.end(resUtils.writeResponse('ok', '获取评论成功！', result))
    })
}

//删除留言
function delLeaveMsg(req, res) {
    req.on('data', data => {
        const params = JSON.parse(data.toString());
        dynamicDao.delLeaveMsgById(parseInt(params.id), result => {
            res.end(resUtils.writeResponse('ok', '删除成功！'))
        })

    })
}



module.exports = {
    uploadImg,
    uploadInfo,
    getAllDynamic,
    getDynamicImg,
    getDynamicImgPath,
    delById,
    leaveMessage,
    leaveMessage,
    getMessageById,
    delLeaveMsg
}