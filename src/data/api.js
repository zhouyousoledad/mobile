import Vue from 'vue'
import axios from 'axios'

//接口地址 带api
//登录
let login=(data)=>axios({
	method:'post',
	url:'/login/logins',
	data:data
})
//修改个人资料
let updata=(data)=>axios({
	method:'post',
	url:'/login/updata',
	data:data
})
////获取历史消息
let historyinfo=(data)=>axios({
	method:'get',
	url:'/message/historyinfor',
	params:data
})
////获取历史消息
let updatahistoryinfor=(data)=>axios({
	method:'post',
	url:'/message/historyinfor/updatastatus',
	data:data
})
//获取已经联系过的好友
let lasthistory=(data)=>axios({
	method:'get',
	url:'/message/historyinfor/lastinfo',
	params:data
})
////获取通信录
let friendlist=(data)=>axios({
	method:'get',
	url:'/message/friendlist',
	params:data
})
//添加到通信录
let addconcacts=(data)=>axios({
	method:'post',
	url:'/message/friendlist/addconcacts',
	data:data
})
////查询注册用户
let finduser=(data)=>axios({
	method:'get',
	url:'/message/newfriend',
	params:data
})
//查询用户是否为好友
let findiffriend=(data)=>axios({
	method:'get',
	url:'/message/newfriend/iffriend',
	params:data
})
//查询是否有未接收到的添加好友信息
let historyinfor=(data)=>axios({
	method:'get',
	url:'/message/newfriend/findnewinfor',
	params:data
})
//修改添加好友消息已读
let seefriend=(data)=>axios({
	method:'post',
	url:'/message/newfriend/seefriendinfo',
	data:data
})
//修改同意拒绝状态
let exchangestate=(data)=>axios({
	method:'post',
	url:'/message/newfriend/changestate',
	data:data
})
export{
login,
updata,
historyinfo,
lasthistory,
friendlist,
mylist,
finduser,
findiffriend,
addconcacts,
updatahistoryinfor,
historyinfor,
seefriend,
exchangestate
}
