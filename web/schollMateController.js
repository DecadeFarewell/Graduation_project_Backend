const schoolMateDao = require('../Dao/schoolMateDao');
const resUtils = require('../utils/respUtils');
const fs = require('fs');
const path = require('path');
const url = require('url');

function getClassMember(req, res) {
    schoolMateDao.getClassMember((result) => {
        res.end(resUtils.writeResponse('ok', '获取成功', result))
    })
}

//上传图片
function uploadToAlbum(req, res) {
    const query = url.parse(req.url, true).query;
    const classID = query.classID;
    const files = req.files;
    const pathArr = [];
    for (let i = 0; i < files.length; i++) {
        const f = files[i];
        fileRename(f);
        const p = path.join(f.destination, f.originalname)
        pathArr.push(p);
    }
    schoolMateDao.uploadToAlbum(classID * 1, pathArr, (result) => {
        res.end(resUtils.writeResponse('ok', '上传成功'))
    })
}

//文件改名
function fileRename(file) {
    const oldPath = path.join(file.destination, file.filename);
    const newPath = path.join(file.destination, file.originalname);
    fs.renameSync(oldPath, newPath);
}

//获取班级相册的所有图片路径
function getAlbumImgsPath(req, res) {
    const query = url.parse(req.url, true).query;
    schoolMateDao.getAlbumImgsPath(query.classID, (result) => {
        res.end(resUtils.writeResponse('ok', '获取成功', result))
    })
}
// 获取班级相册里的图片
function getAlbumImgs(req, res) {
    const pathname = url.parse(req.url).pathname;
    const pathStr = path.join('./', pathname)
    fs.readFile(pathStr, (err, data) => {
        if (err) {
            throw new Error(err)
        } else {
            res.end(data)
        }
    })
}
//获取封面图片路径
function getAlbumPost(req, res) {
    const query = url.parse(req.url, true).query;
    schoolMateDao.getAlbumPost(query.classID, (result) => {
        if (result && result.length > 0) {
            const { className, posterUrl } = result[0];
            res.end(resUtils.writeResponse('ok', '获取成功', { className, posterUrl, counts: result.length }))
        } else {
            res.end(resUtils.writeResponse('ok', '获取成功', { counts: result.length }))
        }

    })
}
// 获取所有人信息
function getAllMember(req, res) {
    const query = url.parse(req.url, true).query;
    schoolMateDao.getAllMember(query.classID, (result) => {
        res.end(resUtils.writeResponse('ok', '获取成功', result))
    })
}

//所有班级名称及其对应的id
function getAllClass(req, res) {
    schoolMateDao.getAllClass((result) => {
        res.end(resUtils.writeResponse('ok', '获取成功', result))
    })
}

//删除一张战片
function delPhotoById(req, res) {
    const { id } = url.parse(req.url, true).query;
    schoolMateDao.delPhotoById(id * 1, result => {
        res.end(resUtils.writeResponse('ok', '删除成功！'))
    })
}
//模糊查询
function fuzzyQuery(req, res) {
    req.on('data', data => {
        const { searchWord } = JSON.parse(data.toString());
        schoolMateDao.fuzzyQuery(searchWord, result => {
            res.end(resUtils.writeResponse('ok', '查询成功',result))
        })
    })
}



module.exports = {
    getClassMember,
    uploadToAlbum,
    getAlbumImgsPath,
    getAlbumPost,
    getAlbumImgs,
    getAllMember,
    getAllClass,
    delPhotoById,
    fuzzyQuery
}