/**
 * 路由处理器模块
 */
const userController = require('../web/userController');
const dynamicController = require('../web/dynamicController');
const schoolMateCOntroller = require('../web/schollMateController');
const chatController = require('../web/chatController');
const noticeController = require('../web/noticeController');

/**
 * 中间件 
 */

/**
 * cookie解析
 */
const credentials = require('../utils/credentials');
const cookie = require('cookie-parser');
/**
 * 文件上传
 */
const path = require('path')
const multer = require('multer')
const uploadSingle = multer({ 'dest': path.join('static', 'images') })
const uploadMultyDynamic = multer({ 'dest': path.join('static', 'dynamic') })
const uploadMultyAlbum = multer({ 'dest': path.join('static', 'album') })


/**
 * 解析formData
 */
const multipart = require('connect-multiparty');
const multipartMiddleware = multipart();


module.exports = function (app) {
    app.disable('x-powered-by')//禁止在响应头中显示服务器类型
    // app.use(cookie(credentials.cookieSecret));


    // CORS
    app.use((req, res, next) => {
        let origin = req.headers.origin;
        res.setHeader('Access-Control-Allow-Origin', 'http://localhost:8080');
        res.setHeader('Access-Control-Allow-Credentials', true);
        res.setHeader('Access-Control-Allow-Headers', 'Authorization')
        if (req.method.toLowerCase() === 'options') {
            return res.end();
        }
        next();
    })

    //cookie拦截
    // app.use('/home/*', (req, res, next) => {
    //     if (req.cookies.userIdentifier) {
    //         next()
    //     } else {
    //         res.redirect('/login')
    //     }
    // })

    //登录
    app.get('/login', userController.login);
    //注册
    app.post('/register', userController.register);
    //获取用户信息
    app.get('/getUserinfo', userController.getUserinfo);

    //获取头像图片
    app.get('/static/images/*', userController.getAvater)
    //修改资料
    app.post('/modify', userController.modify);
    //修改头像
    app.post('/changeAvater', uploadSingle.single('avater'), userController.changeAvater);
    //查询当前头像的路径
    app.get('/getAvaterPath', userController.getAvaterPath);
    //获取班级列表
    app.get('/personal/getClassList', userController.getClassList);
    //获取当前用户发布的所有动态
    app.get('/personal/getMyDynamicList',userController.getMyDynamicList)
    //获取当前用户的通知数量
    app.get('/personal/getNewMessageNum',userController.getNewMessageNum)
    //消除通知
    app.post('/personal/hasLookAll',userController.hasLookAll)
    /**
     * 动态部分
     */
    //上传动态附加的图片
    app.post('/dynamic/pubDynamic/uploadImg', uploadMultyDynamic.array('img', 9), dynamicController.uploadImg);
    //上传动态文字的内容，图片路径等信息
    app.post('/dynamic/pubDynamic/uploadInfo', dynamicController.uploadInfo);
    //拉取所有的动态列表
    app.get('/dynamic/getAllDynamic', dynamicController.getAllDynamic);
    //获取动态中图片的路径
    app.get('/dynamic/getDynamicImgPath', dynamicController.getDynamicImgPath)
    //获取动态内容中的图片
    app.get('/static/dynamic/*', dynamicController.getDynamicImg)
    //根据id删除
    app.get('/dynamic/delById', dynamicController.delById)
    //发布动态留言
    app.post('/dynamic/leaveMessage', dynamicController.leaveMessage)
    //获取留言
    app.get('/dynamic/getMessageById', dynamicController.getMessageById)
    //删除留言
    app.post('/dynamic/delLeaveMsg',dynamicController.delLeaveMsg)

    /**
     * 同生校友部分
     */
    //获取班级列表
    app.get('/schoolMate/getClassMember', schoolMateCOntroller.getClassMember)
    //上传相片到班级相册
    app.post('/schoolMate/uploadToAlbum', uploadMultyAlbum.array('img', 12), schoolMateCOntroller.uploadToAlbum)
    // 获取班级相册图片路径
    app.get('/schoolMate/getAlbumImgsPath', schoolMateCOntroller.getAlbumImgsPath)
    // 获取班级相册的封面图片路径
    app.get('/schoolMate/getAlbumPost', schoolMateCOntroller.getAlbumPost)
    // 获取一个班级所有人的信息
    app.get('/schoolMate/getAllMember', schoolMateCOntroller.getAllMember)
    app.get('/schoolMate/getAllClass', schoolMateCOntroller.getAllClass)
    // 获取班级相册图片
    app.get('/static/album/*', schoolMateCOntroller.getAlbumImgs)
    //根据id删除某张照片
    app.get('/schoolMate/delPhotoById', schoolMateCOntroller.delPhotoById)
    //模糊查询
    app.post('/schoolMate/fuzzyQuery',schoolMateCOntroller.fuzzyQuery)

    /**
     * 聊天室部分
     */
    //获取聊天记录
    app.get('/chatRoom/getMsgList', chatController.getMsgList)
    //发送聊天记录
    app.post('/chatRoom/sendMsg', multipartMiddleware, chatController.sendMsg)
    //websocket
    app.ws('/chatRoom/:uId', chatController.sendMsg)

    /**
     * 公告部分
     */
    // 发布公告
    app.post('/notice/publishNotice', multipartMiddleware, noticeController.publishNotice);
    //获取公告
    app.get('/notice/getAllNotices', noticeController.getAllNotices);
    //删除公告
    app.post('/notice/delNoticeById', noticeController.delNoticeById)




    //404处理
    app.use(function (req, res) { res.status(404).end('404 not-found'); });
}