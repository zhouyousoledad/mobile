var express=require('express');
var bodyParser = require('body-parser')
var router=express.Router();
//var jwt = require('jsonwebtoken');
var path = require('path');
var fs = require('fs');
var MongoClient = require('mongodb').MongoClient;
var ObjectId = require('mongodb').ObjectId;
var url = "mongodb://localhost:27017/";
router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: false })); 
MongoClient.connect(url, { useNewUrlParser: true }, function(err, db) {
	if (err) throw err;
  	    var dbo = db.db("chat");
router.post('/logins',function(req,res,next){    //登录
  	    var whereStr = {"account":req.body.account}
  	    dbo.collection("login").find(whereStr).toArray(function(err, result) {
  	    	if(result == ""){
  	    		var data = {
  	    			code:0
  	    		}
  	    	}else if(result[0].password != req.body.password){
  	    		var data = {
  	    			code:1
  	    		}
  	    	}else{
  	    		var data = {
  	    			code:2,
  	    			msg:'登录成功',
  	    			data:result[0],
//	    			data:{
//					account:result[0].account,
//	    			userid:result[0]._id,
//	    			username:result[0].username,
//	    			password:result[0].password,
//	    			avatar:result[0].src
//	    			}
  	    		}
  	    	}
  	    	res.jsonp(data)
//	    	db.close();
  	    })
	})
router.post('/updata',function(req,res,next){   //修改资料
  	    var myobj ={"_id":ObjectId(req.body._id)};	
  	    var dx = req.body
  	    delete dx._id
  	    Object.keys(dx).forEach(function(key){
//   		console.log(key,dx[key]);
     		if(dx[key] == ''){
     			delete(dx[key]);
     		}
		});
        var updateStr = {$set:dx};
			dbo.collection("login").updateOne(myobj, updateStr, function(err, res) {
        if (err) throw err;
	})
	var data={
    	code: 1,
    	msg:'修改成功'
        }
        res.jsonp(data);
//      db.close();
    });

})


module.exports=router
