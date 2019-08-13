var express=require('express');
var router=express.Router();
var bodyParser = require('body-parser')
var MongoClient = require('mongodb').MongoClient;
var querystring = require("querystring");
var url = "mongodb://localhost:27017/";
var ObjectId = require('mongodb').ObjectId;
var urls = require("url");
router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: false })); 
MongoClient.connect(url, { useNewUrlParser: true }, function(err, db) {
		if (err) throw err;
    var dbo = db.db("chat");  //选择数据库
        router.get('/',function(req,res,next){
        	var arg = urls.parse(req.url).query;
        	var params = querystring.parse(arg);
			var account = params.account;
        	dbo.collection("login").find({"account":account}).toArray(function(err, result) { // 返回集合中所有数据
        if (err) throw err;
	var data ={
		code:0,
		userinfo:result
	};
	res.jsonp(data);
//	db.close();
        });        	
});
      router.get('/iffriend',function(req,res,next){
      		var arg = urls.parse(req.url).query;
        	var params = querystring.parse(arg);
        	var account = params.account;
			var heaccount = params.heaccount;
			
        	dbo.collection("friend").find(
        		{
        			"heaccount":heaccount,
        			"account":account
        		}
        		).toArray(function(err, result) { // 返回集合中所有数据
        if (err) throw err;
        var data = {}
        if(result == ""){
        	data={
        		code:0,
        		msg:0
        	}
        }else{
        	data={
        		code:0,
        		msg:1
        	}
        }
	res.jsonp(data);
//	db.close();
        }); 
      })
    router.get('/findnewinfor',function(req,res,next){
      		var arg = urls.parse(req.url).query;
        	var params = querystring.parse(arg);
        	var recipient = params.recipient;

        	dbo.collection("shortmessage").find(
        		{
        			"recipient":recipient,
        		}
        		).toArray(function(err, result) { // 返回集合中所有数据
        if (err) throw err;
        var data={
        		code:0,
        		data:result
        	}
        
	res.jsonp(data);
//	db.close();
        }); 
      })  
    router.post('/seefriendinfo',function(req, res, next){
    	var ress = res
    	var whereStr = {"recipient":req.body.recipient,"status":1}
    	var updateStr = {$set:{"status":0}};
		dbo.collection("shortmessage").updateOne(whereStr, updateStr, function(err, res) {
        if (err) throw err;
      	console.log("执行成功")
      	var data = {
				code: 0,
				msg:'修改成功'
			};
			ress.jsonp(data);
        //db.close();
    });
    })
    router.post('/changestate',function(req, res, next){
    	var ress = res
    	var whereStr ={"_id":ObjectId(req.body._id)};	
    	var updateStr = {$set:{"zt":req.body.zt}};
		dbo.collection("shortmessage").updateOne(whereStr, updateStr, function(err, res) {
        if (err) throw err;

      	var data = {
				code: 0,
				msg:'修改成功'
			};
			ress.jsonp(data);
        //db.close();
    });
    })
}); 
module.exports=router
