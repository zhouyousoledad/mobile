var express = require('express');
var bodyParser = require('body-parser')
var router = express.Router();
var MongoClient = require('mongodb').MongoClient;
var querystring = require("querystring");
var url = "mongodb://localhost:27017/";
var urls = require("url");
router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: false })); 
MongoClient.connect(url, {
	useNewUrlParser: true
}, function(err, db) {
	if(err) throw err;
	var dbo = db.db("chat"); //选择数据库
	router.get('/', function(req, res, next) {
		
		var arg = urls.parse(req.url).query;
		var params = querystring.parse(arg);
		var account = params.account;
		var aa=res;
		 dbo.collection("friend").aggregate([
{
   $match:{
      "account":account
   }
},
{
    $lookup:{
      from:'login',
      localField:'heaccount',
      foreignField:'account',
      as:'infor'  
    }
},
{
    $unwind:"$infor"
},
{
    $project:{
        "_id":0
    }
}
]).toArray(function(err,res){
	if(err) throw err;
		var data = {
			code: 0,
			userinfo: res
		};
		aa.jsonp(data);
})
	});
	router.post('/addconcacts', function(req, res, next) {
		var whereStr = [
		{"account":req.body.account,"heaccount":req.body.heaccount,"roomnumber":req.body.roomnumber},
		{"account":req.body.heaccount,"heaccount":req.body.account,"roomnumber":req.body.roomnumber},
		]
		dbo.collection("friend").insertMany(whereStr, function(err, res) {
        if (err) throw err;
	})		
		var data = {
				code: 0,
				msg:'添加成功'
			};
			res.jsonp(data);
	});

});
module.exports = router