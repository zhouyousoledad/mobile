var express=require('express');
var bodyParser = require('body-parser')
var router=express.Router();
var MongoClient = require('mongodb').MongoClient;
var querystring = require("querystring");
var url = "mongodb://localhost:27017/";
var urls = require("url");
router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: false })); 
MongoClient.connect(url, { useNewUrlParser: true }, function(err, db) {
		if (err) throw err;
    var dbo = db.db("chat");  //选择数据库
        router.get('/',function(req,res,next){
        	var arg = urls.parse(req.url).query;
        	var params = querystring.parse(arg);
			var roomnumber = params.roomnumber;
			var privates = params.privates
			var where = {"roomnumber":roomnumber,"privates":privates}
        	dbo.collection("chathistory").find(where).toArray(function(err, result) { // 返回集合中所有数据
        if (err) throw err;
	var data ={
		code:0,
		userinfo:result
	};
	res.jsonp(data);
//	db.close();
        });        	
});
router.get('/lastinfo',function(req,res,next){
	var arg = urls.parse(req.url).query;
    var params = querystring.parse(arg);
    var privates = params.privates;
    var aa=res;
    dbo.collection("chathistory").aggregate([
    	{
    		$match:{
    			"privates":privates,
    			"status":1
    		}
    	},
    	{
    		$group:{
    			_id: "$roomnumber",
    			count:{$sum:1}
    		}
    	},
    ]).toArray(function(err, res) {
    	dbo.collection("firend").insertMany(res, function(err, res) {
        if (err) throw err;
        dbo.collection("chathistory").aggregate([
{
				$match: {
					"privates": privates,
				}
			},
			{
				$sort: {
					date: -1
				}
			},
			{
				$group: {
					_id: "$roomnumber",
					msg: {
						$first: "$msg"
					},
					time: {
						$first: "$time"
					}
				}
			},
			{
				$lookup: {
					from: "friend",
					localField: '_id',
					foreignField: 'roomnumber',
					as: 'infor'
				}
			},
			{
				$unwind: "$infor"
			},
			{
				$match: {
					"infor.account": privates,
				}
			},
			{
				$lookup: {
					from: "login",
					localField: 'infor.heaccount',
					foreignField: 'account',
					as: 'user'
				}
			},
			{
				$unwind: "$user"
			},
            {
                $lookup: {
					from: "firend",
					localField: '_id',
					foreignField: '_id',
					as: 'userss'
				}
                        },
                        {
				$unwind: "$userss"
			},
			{
				$project: {
					infor: 0,
                    _id:0
				}
			}
]).toArray(function(err, res) {
			var data = {
				code: 0,
				userinfo: res
			};
			aa.jsonp(data);
			var where = 
	dbo.collection("firend").deleteMany({},function(err,obj){
		if (err) throw err;
        console.log("删除成功");
	})
})
    });
   })
})
router.post('/updatastatus', function(req, res, next) {
	var aa = res
//		var whereStr = [
//		{"account":req.body.account,"heaccount":req.body.heaccount},
//		{"account":req.body.heaccount,"heaccount":req.body.account},
//		]
		var whereStr = {"roomnumber":req.body.roomnumber,"privates":req.body.privates,"status":1};  // 查询条件
    	var updateStr = {$set: { "status" : 0 }};
//		var arg = urls.parse(req.url).query;
//		var params = querystring.parse(arg);
//		var account = params.account;
//		var heaccount = params.heaccount;
		dbo.collection("chathistory").updateMany(whereStr, updateStr, function(err, res) {
        if (err) throw err;
        var data = {
				code: 0,
				msg:'修改成功'
			};
			aa.jsonp(data);
	})
		
});
}); 
module.exports=router
