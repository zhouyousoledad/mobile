var express=require('express');
var router=express.Router();
var mylist=require('./message/mylist.js');//路由，查
var friendlist=require('./message/friendlist.js');//路由，查
var newfriend=require('./message/newfriend.js');//路由，查
var historyinfor=require('./message/historyinfor.js');//路由，查
router.use('/mylist',mylist); 
router.use('/friendlist',friendlist); 
router.use('/newfriend',newfriend); 
router.use('/historyinfor',historyinfor); 
//如果login  product user  不存在，则会走下面这个
router.use("/",function(req,res){
  res.send("table/");
})
 
module.exports =router;//暴露模