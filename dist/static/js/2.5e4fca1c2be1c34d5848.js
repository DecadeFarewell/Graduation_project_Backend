webpackJsonp([2],{"/FRM":function(t,i){},"/gwD":function(t,i){},Cdx3:function(t,i,a){var s=a("sB3e"),e=a("lktj");a("uqUo")("keys",function(){return function(t){return e(s(t))}})},NclR:function(t,i,a){"use strict";Object.defineProperty(i,"__esModule",{value:!0});var s=a("fZjL"),e=a.n(s),n=a("woOf"),o=a.n(n),l={created:function(){var t=this.$store.state.userInfo;this.info=o()({},t)},mounted:function(){this.setAvaterPath(),this.changeOriginAvater(),this.getClassList()},computed:{className:function(){var t=this.info.classID,i=this.options.find(function(i){return i.classID===t});return i?i.className:""}},data:function(){return{name:"",info:{},avater_path:"",avater_path_copy:"",formData:{},isModifing:!1,neededSubmit:!1,showSaveBtn:!1,showCancelBtn:!1,options:[],constellation:[{value:"白羊座",label:"白羊座"},{value:"金牛座",label:"金牛座"},{value:"双子座",label:"双子座"},{value:"巨蟹座",label:"巨蟹座"},{value:"狮子座",label:"狮子座"},{value:"处女座",label:"处女座"},{value:"天枰座",label:"天枰座"},{value:"天蝎座",label:"天蝎座"},{value:"射手座",label:"射手座"},{value:"摩羯座",label:"摩羯座"},{value:"水瓶座",label:"水瓶座"},{value:"双鱼座",label:"双鱼座"}],realNameTips:"",emailTips:"",telTips:""}},methods:{validateRealName:function(){var t=/^([a-zA-Z\u4e00-\u9fa5\·]{2,6})$/.test(this.info.real_name);this.realNameTips=t?"":"请输入正确的姓名！"},validateEmail:function(){var t=/^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(\.[a-zA-Z0-9_-])+/.test(this.info.e_mail);this.emailTips=t?"":"请输入正确的邮箱！"},validateTel:function(){var t=/^[1]([3-9])[0-9]{9}$/.test(this.info.tel);this.telTips=t?"":"请输入正确的电话号码！"},getClassList:function(){var t=this;this.$api.getClassList().then(function(i){t.options=i.data.data})},setAvaterPath:function(){var t=this.info.avater_path;t=t.split(/\\|\//),this.avater_path=this.$url+"/"+t.join("/")},modifyUserInfo:function(){this.isModifing=!this.isModifing},saveInfo:function(){this.validateAll()?this.$message({message:"请检查是否有错误格式或者漏填项！",type:"warning",duration:3e3}):(this.isModifing=!this.isModifing,this.neededSubmit=!0)},validateAll:function(){var t=this.info,i=e()(t).some(function(i){return!t[i]}),a=""!==this.realNameTips||""!==this.emailTips||""!==this.telTips;return i||a},submiteModify:function(){var t=this;this.neededSubmit=!1,this.$api.modifyUserInfo("/modify",this.info).then(function(i){t.modifySuccess(i)})},modifySuccess:function(t){var i=JSON.parse(t.config.data);this.$store.commit({type:"set_user_info",info:i})},changeAvater:function(){this.$refs.changeAvater.click()},showNewAvater:function(t){var i=this;console.log(t);var a=new FileReader,s=t.target.files[0];a.readAsDataURL(s),a.onload=function(t){return i.avater_path=t.target.result},this.addToFormData(s),this.shwoBtn()},addToFormData:function(t){var i=new FormData;i.append("avater",t),this.formData=i},subToServer:function(){var t=this;this.$api.replaceAvater("/changeAvater?id="+this.info.id,this.formData).then(function(i){console.log(i),t.changeOriginAvater(),t.updateStore(),t.hidenBtn()})},cancelHandle:function(){this.hidenBtn(),this.returnOriginAvater()},changeOriginAvater:function(){this.avater_path_copy=this.avater_path},returnOriginAvater:function(){this.avater_path=this.avater_path_copy},shwoBtn:function(){this.showSaveBtn=!0,this.showCancelBtn=!0},hidenBtn:function(){this.showSaveBtn=!1,this.showCancelBtn=!1},updateStore:function(){var t=this,i=o()({},this.info);this.$api.getAvaterPath("/getAvaterPath",{id:this.info.id}).then(function(a){i.avater_path=a.data.data[0].avater_path,t.$store.commit({type:"set_user_info",info:i})})}}},c={render:function(){var t=this,i=t.$createElement,a=t._self._c||i;return a("div",{staticClass:"per"},[a("div",{staticClass:"head"},[a("a",{staticClass:"avater",attrs:{title:"更换头像"},on:{click:t.changeAvater}},[a("img",{staticClass:"img",attrs:{src:t.avater_path,alt:""}}),t._v(" "),a("input",{ref:"changeAvater",attrs:{type:"file",hidden:"hidden"},on:{change:t.showNewAvater}})]),t._v(" "),a("p",{staticClass:"nick-name"},[t.isModifing&&"admin"!==t.info.root?a("el-input",{model:{value:t.info.username,callback:function(i){t.$set(t.info,"username",i)},expression:"info.username"}}):t._e(),t._v(" "),t.isModifing&&"admin"!=t.info.root?t._e():a("span",[t._v(t._s(t.info.username))])],1)]),t._v(" "),t.showSaveBtn?a("div",{staticClass:"saved",on:{click:t.subToServer}},[t._v("保存")]):t._e(),t._v(" "),t.showCancelBtn?a("div",{staticClass:"cancel",on:{click:t.cancelHandle}},[t._v("取消")]):t._e(),t._v(" "),a("table",{staticClass:"user-info"},[a("tbody",[a("tr",[a("td",[a("span",{staticClass:"td-key"},[t._v("真实姓名")]),t._v("：\n          "),t.isModifing?t._e():a("span",{staticClass:"td-val"},[t._v(t._s(t.info.real_name))]),t._v(" "),t.isModifing?a("span",{staticClass:"td-val modify-input"},[a("el-input",{on:{blur:t.validateRealName},model:{value:t.info.real_name,callback:function(i){t.$set(t.info,"real_name",i)},expression:"info.real_name"}}),t._v(" "),t.realNameTips?a("span",{staticClass:"tips"},[t._v(t._s(t.realNameTips))]):t._e()],1):t._e()]),t._v(" "),a("td",[a("span",{staticClass:"td-key"},[t._v("性别")]),t._v("：\n          "),t.isModifing?t._e():a("span",{staticClass:"td-val"},[t._v(t._s(t.info.sex))]),t._v(" "),t.isModifing?a("span",{staticClass:"td-val modify-input"},[a("el-radio",{attrs:{label:"男"},model:{value:t.info.sex,callback:function(i){t.$set(t.info,"sex",i)},expression:"info.sex"}},[t._v("男")]),t._v(" "),a("el-radio",{attrs:{label:"女"},model:{value:t.info.sex,callback:function(i){t.$set(t.info,"sex",i)},expression:"info.sex"}},[t._v("女")])],1):t._e()])]),t._v(" "),a("tr",[a("td",[a("span",{staticClass:"td-key"},[t._v("身高(cm)")]),t._v("：\n          "),t.isModifing?t._e():a("span",{staticClass:"td-val"},[t._v(t._s(t.info.height))]),t._v(" "),t.isModifing?a("span",{staticClass:"td-val modify-input"},[a("el-input",{model:{value:t.info.height,callback:function(i){t.$set(t.info,"height",i)},expression:"info.height"}})],1):t._e()]),t._v(" "),a("td",[a("span",{staticClass:"td-key"},[t._v("体重(kg)")]),t._v("：\n          "),t.isModifing?t._e():a("span",{staticClass:"td-val"},[t._v(t._s(t.info.weight))]),t._v(" "),t.isModifing?a("span",{staticClass:"td-val modify-input"},[a("el-input",{model:{value:t.info.weight,callback:function(i){t.$set(t.info,"weight",i)},expression:"info.weight"}})],1):t._e()])]),t._v(" "),a("tr",[a("td",[a("span",{staticClass:"td-key"},[t._v("生日")]),t._v("：\n          "),t.isModifing?t._e():a("span",{staticClass:"td-val"},[t._v(t._s(t.info.birthday))]),t._v(" "),t.isModifing?a("span",{staticClass:"td-val modify-input"},[a("el-input",{attrs:{type:"date"},model:{value:t.info.birthday,callback:function(i){t.$set(t.info,"birthday",i)},expression:"info.birthday"}})],1):t._e()]),t._v(" "),a("td",[a("span",{staticClass:"td-key"},[t._v("星座")]),t._v("：\n          "),t.isModifing?t._e():a("span",{staticClass:"td-val"},[t._v(t._s(t.info.constellation))]),t._v(" "),t.isModifing?a("span",{staticClass:"td-val modify-input"},[a("el-select",{attrs:{placeholder:"请选择"},model:{value:t.info.constellation,callback:function(i){t.$set(t.info,"constellation",i)},expression:"info.constellation"}},t._l(t.constellation,function(t){return a("el-option",{key:t.value,attrs:{label:t.label,value:t.value}})}),1)],1):t._e()])]),t._v(" "),a("tr",[a("td",[a("span",{staticClass:"td-key"},[t._v("邮箱地址")]),t._v("：\n          "),t.isModifing?t._e():a("span",{staticClass:"td-val"},[t._v(t._s(t.info.e_mail))]),t._v(" "),t.isModifing?a("span",{staticClass:"td-val modify-input"},[a("el-input",{on:{blur:t.validateEmail},model:{value:t.info.e_mail,callback:function(i){t.$set(t.info,"e_mail",i)},expression:"info.e_mail"}}),t._v(" "),t.emailTips?a("span",{staticClass:"tips"},[t._v(t._s(t.emailTips))]):t._e()],1):t._e()]),t._v(" "),a("td",[a("span",{staticClass:"td-key"},[t._v("电话号码")]),t._v("：\n          "),t.isModifing?t._e():a("span",{staticClass:"td-val"},[t._v(t._s(t.info.tel))]),t._v(" "),t.isModifing?a("span",{staticClass:"td-val modify-input"},[a("el-input",{on:{blur:t.validateTel},model:{value:t.info.tel,callback:function(i){t.$set(t.info,"tel",i)},expression:"info.tel"}}),t._v(" "),t.telTips?a("span",{staticClass:"tips"},[t._v(t._s(t.telTips))]):t._e()],1):t._e()])]),t._v(" "),a("tr",[a("td",[a("span",{staticClass:"td-key"},[t._v("QQ")]),t._v(":\n          "),t.isModifing?t._e():a("span",{staticClass:"td-val"},[t._v(t._s(t.info.qq))]),t._v(" "),t.isModifing?a("span",{staticClass:"td-val modify-input"},[a("el-input",{model:{value:t.info.qq,callback:function(i){t.$set(t.info,"qq",i)},expression:"info.qq"}})],1):t._e()]),t._v(" "),a("td",[a("span",{staticClass:"td-key"},[t._v("微信")]),t._v("：\n          "),t.isModifing?t._e():a("span",{staticClass:"td-val"},[t._v(t._s(t.info.wx))]),t._v(" "),t.isModifing?a("span",{staticClass:"td-val modify-input"},[a("el-input",{model:{value:t.info.wx,callback:function(i){t.$set(t.info,"wx",i)},expression:"info.wx"}})],1):t._e()])]),t._v(" "),a("tr",[a("td",[a("span",{staticClass:"td-key"},[t._v("学院")]),t._v("：\n          "),t.isModifing?t._e():a("span",{staticClass:"td-val"},[t._v(t._s(t.info.depart))]),t._v(" "),t.isModifing?a("span",{staticClass:"td-val modify-input"},[a("el-input",{model:{value:t.info.depart,callback:function(i){t.$set(t.info,"depart",i)},expression:"info.depart"}})],1):t._e()]),t._v(" "),a("td",[a("span",{staticClass:"td-key"},[t._v("专业班级")]),t._v("：\n          "),t.isModifing?t._e():a("span",{staticClass:"td-val"},[t._v(t._s(t.className))]),t._v(" "),t.isModifing?a("span",{staticClass:"td-val modify-input"},[a("el-select",{attrs:{placeholder:"请选择"},model:{value:t.info.classID,callback:function(i){t.$set(t.info,"classID",i)},expression:"info.classID"}},t._l(t.options,function(t){return a("el-option",{key:t.value,attrs:{label:t.className,value:t.classID}})}),1)],1):t._e()])]),t._v(" "),a("tr",[a("td",[a("span",{staticClass:"td-key"},[t._v("个人爱好")]),t._v("：\n          "),t.isModifing?t._e():a("span",{staticClass:"td-val"},[t._v(t._s(t.info.hobby))]),t._v(" "),t.isModifing?a("span",{staticClass:"td-val modify-input"},[a("el-input",{model:{value:t.info.hobby,callback:function(i){t.$set(t.info,"hobby",i)},expression:"info.hobby"}})],1):t._e()]),t._v(" "),a("td")])])]),t._v(" "),t.isModifing?a("el-button",{staticClass:"modify",attrs:{type:"success"},on:{click:t.saveInfo}},[t._v("保存")]):t._e(),t._v(" "),t.isModifing?t._e():a("el-button",{staticClass:"modify",attrs:{type:"primary"},on:{click:t.modifyUserInfo}},[t._v("修改资料")]),t._v(" "),t.neededSubmit&&!t.isModifing?a("el-button",{staticClass:"modify",attrs:{type:"success"},on:{click:t.submiteModify}},[t._v("提交修改")]):t._e()],1)},staticRenderFns:[]};var f={components:{Infomation:a("VU/8")(l,c,!1,function(t){a("/FRM")},"data-v-12b7eece",null).exports}},v={render:function(){var t=this.$createElement,i=this._self._c||t;return i("div",{staticClass:"personal"},[i("Infomation")],1)},staticRenderFns:[]};var d=a("VU/8")(f,v,!1,function(t){a("/gwD")},"data-v-5104d52c",null);i.default=d.exports},fZjL:function(t,i,a){t.exports={default:a("jFbC"),__esModule:!0}},jFbC:function(t,i,a){a("Cdx3"),t.exports=a("FeBl").Object.keys},uqUo:function(t,i,a){var s=a("kM2E"),e=a("FeBl"),n=a("S82l");t.exports=function(t,i){var a=(e.Object||{})[t]||Object[t],o={};o[t]=i(a),s(s.S+s.F*n(function(){a(1)}),"Object",o)}}});
//# sourceMappingURL=2.5e4fca1c2be1c34d5848.js.map