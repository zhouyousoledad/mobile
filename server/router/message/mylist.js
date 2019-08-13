var express = require('express');
var router = express.Router();
var MongoClient = require('mongodb').MongoClient;
var querystring = require("querystring");
var url = "mongodb://localhost:27017/";
var urls = require("url");

MongoClient.connect(url, {
	useNewUrlParser: true
}, function(err, db) {
	if(err) throw err;
	var dbo = db.db("chat"); //选择数据库
	router.get('/', function(req, res, next) {
		var arg = urls.parse(req.url).query;
		var params = querystring.parse(arg);
		var privates = params.privates
		var aa = res
		var arrs=[]
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
				$project: {
					infor: 0,
				}
			}
		]).toArray(function(err, res) {			
			if(err) throw err;
			res.forEach(v=>{
    			var a=dbo.collection("chathistory").find(
			{
				"privates":privates,
				"roomnumber":v._id,
				"status":1
			}
		).count(function (err, result) {
    		arrs.push(result)
		});
		
			});
			var data = {
				code: 0,
				userinfo: res
			};
			aa.jsonp(data);	

		})

	});

});
module.exports = router