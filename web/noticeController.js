const resUtils = require('../utils/respUtils');
const noticeDao = require('../Dao/noticeDao');

function publishNotice(req, res) {
    const body = req.body;
    noticeDao.publishNotice([body.title, body.content, body.publisher, new Date().getTime()], (result) => {
        res.end(resUtils.writeResponse('ok', '发布成功'));
    })
}

function getAllNotices(req, res) {
    noticeDao.getAllNotices(result => {
        res.end(resUtils.writeResponse('ok', '获取成功', result))
    })
}

function delNoticeById(req, res) {
    req.on('data', data => {
        const id = JSON.parse(data.toString()).id;
        noticeDao.delNoticeById(parseInt(id), result => {
            res.end(resUtils.writeResponse('ok', '删除成功'));
        })
    })
}


module.exports = {
    publishNotice,
    getAllNotices,
    delNoticeById
}