const chatDao = require('../Dao/chatDao');
const resUtils = require('../utils/respUtils');
const fs = require('fs');
const path = require('path');
const url = require('url');


function getMsgList(req, res) {
    chatDao.getMsgList((result) => {
        res.end(resUtils.writeResponse('ok', '获取成功', result))
    })
}

// function sendMsg(req, res) {
//     const body = req.body;
//     const params = [body.userID, body.content, new Date().getTime()];
//     chatDao.sendMsg(params, (result) => {
//         res.end(resUtils.writeResponse('ok', '发送成功'))
//     })
// }
const chatMembers = {}
function sendMsg(ws, req) {
    const { uId } = req.params;
    chatMembers[uId] = ws;//当前连进来的是谁
    ws.on('message', function (msg) {
        const query = JSON.parse(msg)
        const params = [query.userID, query.msg, query.ctime];
        chatDao.sendMsg(params, (result) => {
            brodCast(uId, msg, chatMembers);
        })
    });
}

function brodCast(uId, msg, chatMembers) {
    for (let id in chatMembers) {
        if (parseInt(uId) !== parseInt(id)) {
            chatMembers[id].send(msg);
        }
    }
}

module.exports = {
    getMsgList,
    sendMsg
}