var ws = require("nodejs-websocket");
var moment = require("moment")
var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/";
console.log("开始建立连接...")
let users = [];
let conns = {};
let onlineuser = [];
function boardcast(obj){
	if(obj.bridge && obj.bridge.length){
		obj.bridge.forEach(item=>{
			if(conns[item] == undefined){
			}else{
				conns[item].sendText(JSON.stringify(obj));
//				if(obj.type==1){
//					
//				}
			}
		})
MongoClient.connect(url, { useNewUrlParser: true }, function(err, db) {
    if (err) throw err;
    var dbo = db.db("chat");
    var arr=[]
	var c1=Object.assign({},obj)
	obj.privates = obj.bridge[0]
	c1.privates = obj.bridge[1]
	arr.push(obj)
	arr.push(c1)
    dbo.collection("chathistory").insertMany(arr, function(err, res) {
        if (err) throw err;
    });
    
});
		return;
	}
	server.connections.forEach((conn,index)=>{
		conn.sendText(JSON.stringify(obj));
	})
}

var server = ws.createServer(function(conn){
	conn.on("text",function(obj){
		obj = JSON.parse(obj);
		conns[''+obj.uid+''] = conn;
		if(obj.type===1){
			let isuser = users.some(item=>{  //some方法循环数组如果有一个为真，则这个数组都为真
				return item.uid === obj.uid
			})
			if(!isuser){
				users.push({
					nickname:obj.nickname,
					uid:obj.uid,
					avac:obj.avac,
				});
				onlineuser.push(obj.uid);
			}
//			boardcast({   //在线
//				type:1,
//				date:moment().format('YYYY-MM-DD HH:mm:ss'),
//				msg:obj.nickname+'加入聊天室',
//				users:users,
//				uid:obj.uid,
//				nickname:obj.nickname,
//				bridge:obj.bridge,
//				time:obj.time,
//			})
		}else if(obj.type===2){   //实时聊天
//			var him;
//			obj.bridge.forEach(v=>{  
//  			if(v != obj.uid){
//  				him = v
//  			}
//			});
			boardcast({
				type:2,
				date:moment().format('YYYY-MM-DD HH:mm:ss'),
				msg:obj.msg,
				uid:obj.uid,
				nickname:obj.nickname,
				avac:obj.avac,
				bridge:obj.bridge,
				time:obj.time,
				roomnumber:obj.bridge.sort().join(''),
//				target:him,
				status:1  //1表示未读
			})
}else if(obj.type===3){        //实时添加为好友
			boardcast({
				type:3,
				msg:obj.msg,
				uid:obj.uid,
				nickname:obj.nickname,
				avac:obj.avac,
				status:1,  //1表示未读
				zt:'',
			})
		}
	})
	conn.on("close",function(code,reason){
		console.log("关闭连接")
	});
	conn.on("error",function(code,reason){
		console.log("异常关闭")
	});
}).listen(8001)
console.log("WebSocket建立完毕")

