const express = require('express');
const app = new express();
const credentials = require('./utils/credentials');
const cookie = require('cookie-parser');
const multer = require('multer');
const uploadSingle = multer({ 'dest': './static/images' })
const uploadMultyDynamic = multer({ 'dest': './static/dynamic' })
const uploadMultyAlbum = multer({ 'dest': './static/album' })

const multipart = require('connect-multiparty');
const multipartMiddleware = multipart();

app.disable('x-powered-by')//禁止在响应头中显示服务器类型
app.use(cookie(credentials.cookieSecret));
app.use(express.static('./dist'))

const userController = require('./web/userController');
const dynamicController = require('./web/dynamicController');
const schoolMateCOntroller = require('./web/schollMateController')
const chatController = require('./web/chatController');


// CORS
app.use((req, res, next) => {
    let origin = req.headers.origin;
    console.log(origin);
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:8080');
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
})

//cookie拦截
app.use('/home/*', (req, res, next) => {
    if (req.cookies.userIdentifier) {
        next()
    } else {
        res.redirect('/login')
    }
})
//登录注册
app.get('/login', userController.login);
app.post('/register', userController.register);

// 个人中心
//获取头像图片
app.get('/static/images/*', userController.getAvater)
//修改资料
app.post('/modify', userController.modify);
//修改头像
app.post('/changeAvater', uploadSingle.single('avater'), userController.changeAvater);
//查询当前头像的路径
app.get('/getAvaterPath', userController.getAvaterPath);
//获取班级列表
app.get('/getClassList', userController.getClassList)

//动态部分
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

//同生缘 班级部分
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



//聊天室
//获取聊天记录
app.get('/chatRoom/getMsgList', chatController.getMsgList)
//发送聊天记录
app.post('/chatRoom/sendMsg', multipartMiddleware, chatController.sendMsg)

//404
app.use(function (req, res) { res.status(404).end('404 not-found'); });



app.listen(3110, () => {
    console.log('serve run in localhost:3110//')
})