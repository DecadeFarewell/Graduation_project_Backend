webpackJsonp([11],{"3bKv":function(t,e){},NHnr:function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var a=n("7+uW"),o={render:function(){var t=this.$createElement,e=this._self._c||t;return e("div",{attrs:{id:"app"}},[e("router-view")],1)},staticRenderFns:[]};var r=n("VU/8")({name:"App",data:function(){return{}}},o,!1,function(t){n("3bKv")},null,null).exports,s=n("/ocq");a.default.use(s.a);var c=new s.a({mode:"history",linkActiveClass:"active",linkExactActiveClass:"exact",routes:[{path:"/",redirect:"/login"},{path:"/login",name:"login",component:function(){return n.e(7).then(n.bind(null,"Ntyz"))}},{path:"/register",name:"register",component:function(){return n.e(8).then(n.bind(null,"mrsp"))}},{path:"/home",name:"home",component:function(){return n.e(3).then(n.bind(null,"lyB/"))},redirect:"/home/dynamic",children:[{path:"dynamic",name:"dynamic",component:function(){return n.e(0).then(n.bind(null,"JFQ5"))}},{path:"personal",name:"personal",component:function(){return n.e(2).then(n.bind(null,"NclR"))}},{path:"schoolMate",name:"schoolMate",component:function(){return n.e(1).then(n.bind(null,"3VZn"))},redirect:"schoolMate/class/1",children:[{path:"class/:classID",name:"class",component:function(){return n.e(4).then(n.bind(null,"ZmAd"))}},{path:"class/:classID/album",name:"classalbum",component:function(){return n.e(6).then(n.bind(null,"qQKj"))}}]},{path:"chat",name:"chat",component:function(){return n.e(5).then(n.bind(null,"WBc+"))}},{path:"notice",name:"notice",component:function(){return n.e(9).then(n.bind(null,"W7vR"))}}]}]}),l=n("mvHQ"),u=n.n(l),i=n("NYxO");a.default.use(i.a);var m=new i.a.Store({state:{userInfo:localStorage.getItem("userInfo")?JSON.parse(localStorage.getItem("userInfo")):{},classID:localStorage.getItem("classID")?JSON.parse(localStorage.getItem("classID")):null},mutations:{set_user_info:function(t,e){t.userInfo=e.info,localStorage.setItem("userInfo",u()(e.info))},clear_user_info:function(t,e){t.userInfo={},localStorage.removeItem("userInfo")},set_classID:function(t,e){t.classID=e.classID,localStorage.setItem("classID",u()(e.classID))}},actions:{}}),p=n("zL8q"),f=n.n(p),g=(n("tvR6"),n("zrzA"),n("AXdl")),d=n("Dd8w"),h=n.n(d),I=n("mtWM"),b=n.n(I);n("mw3O");var y=b.a.create({baseURL:baseUrl,timeout:8e3,withCredentials:!0,headers:{"Content-Type":"application/x-www-form-urlencoded"}}),v={login:function(t,e){return y.get(t,{params:e})},register:function(t,e){return y.post(t,e)}},A={publishDynamic_img:function(t){return y.post("/dynamic/pubDynamic/uploadImg",t)},publishDynamic_info:function(t){return y.post("/dynamic/pubDynamic/uploadInfo",t)},getAllDynamicList:function(t){return y.get("/dynamic/getAllDynamic",{params:t})},getDynamicImgPath:function(t){return y.get("/dynamic/getDynamicImgPath",{params:t})}},D={modifyUserInfo:function(t,e){return y.post(t,e)},getAvater:function(t,e){return y.get(t,{params:e})},replaceAvater:function(t,e){return y.post(t,e)},getAvaterPath:function(t,e){return y.get(t,{params:e})},getClassList:function(){return y.get("/getClassList")}},M={getClassMember:function(){return y.get("/schoolMate/getClassMember")},uploadToAlbum:function(t,e){return y.post("/schoolMate/uploadToAlbum?classID="+e,t)},getPoster:function(t){return y.get("/schoolMate/getAlbumPost",{params:t})},getAlbumImgsPath:function(t){return y.get("/schoolMate/getAlbumImgsPath",{params:t})},getClassMemberInfo:function(t){return y.get("/schoolMate/getAllMember",{params:t})},getClassNameMap:function(){return y.get("/schoolMate/getAllClass")}},w={getMessageList:function(){return y.get("/chatRoom/getMsgList")},sendMessage:function(t){return y.post("/chatRoom/sendMsg",t)}},C=h()({},v,A,D,M,w,{});a.default.prototype.$api=C;a.default.prototype.$url="http://127.0.0.1:3110",a.default.use(f.a),a.default.use(g.a,{preLoad:1.3,error:"/static/images/err.jpg",loading:"/static/images/loading.jpg",attempt:2}),a.default.config.productionTip=!1,new a.default({el:"#app",router:c,store:m,components:{App:r},template:"<App/>"})},tvR6:function(t,e){},zrzA:function(t,e){}},["NHnr"]);
//# sourceMappingURL=app.06758cc776daaf06fd02.js.map