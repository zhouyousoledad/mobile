<template>
	<div class="app-exam" ref="total">
		<swiper :options="swiperOption" ref="mySwiper">
			<!-- slides -->
			<swiper-slide style="height: 736px;">
				<!--个人资料0-->
				<Myroom @infor="updown" @up="second"></Myroom>
			</swiper-slide>
			<swiper-slide style="height: 736px;">
				<!--聊天列表1-->
				<Headindex @ee="updown" @up="second"></Headindex>
				<div class="content-main">
				<div v-if="findex==0">
					<!--<History @join="joining" :data="users" :datatwo="messageList"></History>-->
<History @join="joining" :datass="users" :datatwo="messageList"></History>
				</div>
				<div v-if="findex==1">
					<Contacts ref="mychild" :addmessage="addmessage" @up="second"></Contacts>
				</div>
				<div v-if="findex==2">
					<News></News>
				</div>
				<div v-if="findex==3">
					<FriendCircle></FriendCircle>
				</div>
				</div>
				<Footers></Footers>
			</swiper-slide>
			<swiper-slide class="swiper-no-swiping" style="height: 736px;">
				<!--聊天室2-->
				<Headreturn @back="updown" :Title="title"></Headreturn>
				<Chat :ok="sendMessage" :Data="currentMessage" :Title="title" :Acav="otheracav"></Chat>
			</swiper-slide>
			<!--修改个人资料3-->
			<swiper-slide class="swiper-no-swiping" style="height: 736px;">
			<Headother @back="second"></Headother>	
			<Updatainfo></Updatainfo>
			</swiper-slide>
			<!--查找用户4-->
			<swiper-slide class="swiper-no-swiping" style="height: 736px;">
			<Headother @back="second"></Headother>	
			<Addfirend @up="second"></Addfirend>
			</swiper-slide>
			<!--好友信息5-->
			<swiper-slide class="swiper-no-swiping" style="height: 736px;">
			<Friendinfo :ok="sendfriendmessage" @back="second" @join="joining"></Friendinfo>
			</swiper-slide>
			<!--请求添加好友6-->
			<swiper-slide class="swiper-no-swiping" style="height: 736px;">
			<Headother @back="second"></Headother>		
			<Sure :ok="sendfriendmessage" @back="second"></Sure>
			</swiper-slide>
		</swiper>
<Prompt :Titles="topl" :Flagt="flagt" @pro="provals"></Prompt>
	</div>
</template>

<script>
	import { mapState } from 'vuex'
	import { historyinfo,updatahistoryinfor } from '@/data/api';
	import { swiper, swiperSlide } from 'vue-awesome-swiper'
	import Headindex from '../components/Headindex'	
	import Headreturn from '../components/Headreturn'
	import Headother from '../components/Headother'
	import Footers from '../components/Footers'	
	import History from '../components/history'	
	import Contacts from '../components/contacts'
	import News from '../components/news'
	import FriendCircle from '../components/friendCircle'
	import Chat from '../components/chat'
	import Myroom from '../components/myroom'
	import Updatainfo from '../components/updatainfo'
	import Addfirend from '../components/addfirend'
	import Friendinfo from '../components/friendinfo'
	import Sure from '../components/sure'
	import Prompt from '../components/prompt'
	export default {
		name: 'HelloWorld',
		components: {
			swiper,
			swiperSlide,
			Headindex,
			Footers,
			History,
			Contacts,
			News,
			FriendCircle,
			Chat,
			Headreturn,
			Myroom,
			Updatainfo,
			Headother,
			Addfirend,
			Friendinfo,
			Sure,
			Prompt
		},
		data() {
			return {
				swiperOption: { //设置swiper实现左右滑动切换tab
					pagination: {
						el: '.swiper-pagination',
					},
					noSwiping: true,
					resistanceRatio: 0,
					allowSlideNext: true,
				},
				topl:'',
				flagt:false,
				findex:0, //底部导航索引
				uid:'',
				nums:0,
				nickname: '',
      			socket: '',
      			msg: '',
      			avac:'',
      			historylist:[],
      			flag:true, //保证只从后台获取一次历史列表
      			messageList:[],  //聊天列表
      			addmessage:[],   //添加好友列表
      			users: [],
      			bridge: [],
      			title:'',
      			otheracav:'',
      			changeflag:false,
      			closeflag:false,
			}
		},
		methods: {
			joining(data){
				this.bridge = data.bridge
				if(data.uid == this.uid){
					this.title = data.himname
					this.otheracav = data.himavac
				}else{
					this.title = data.nickname
					this.otheracav = data.avac
				}
				this.updown(2)
			},
			updown(index) {  //调整页面位置
				if(index == 2) {
					this.swiper.allowSlideNext = true
					this.swiper.slideTo(index, 500, false)
				} else if(index == 1) {
					this.swiper.slideTo(index, 500, false)
					this.swiper.allowSlideNext = false
					this.bridge=[];
				}else{
						this.swiper.slideTo(index, 500, false)
				}
			},
			second(index){
				this.swiper.allowSlideNext = true
				this.swiper.slideTo(index, 0, false)
				if(index!=0){
					this.swiper.allowSlideNext = false
				}else{
					this.swiper.allowSlideNext = true
				}				
			},
			provals(data){
  				this.flagt = data
  			},
			conWebSocket(){     //连接
		let vm = this;
		if(window.WebSocket){
vm.socket = new WebSocket('ws://localhost:8001');
let socket = vm.socket;
socket.onopen = function(e){
    console.log("连接服务器成功");
    // 向服务器发送消息
	vm.sendMessage(1)
}
socket.onclose = function(e){
    console.log("服务器关闭");
}
socket.onerror = function(){
    console.log("连接出错");
}
// 接收服务器的消息
socket.onmessage = function(e){
    let message = JSON.parse(e.data);
    if(message.type == 3){
    	vm.addmessage.push(message)
    	if(message.uid != vm.uid){
    		vm.topl = '您有收到一条好友请求，请确认'
  			vm.flagt = true
    	}else{
    		vm.topl = '发送成功，请等待对方答复'
  			vm.flagt = true
    	}
    }else if(message.type == 4){
    	message.bridge.forEach(v=>{
    		if(v == vm.uid){
    			if(vm.$refs.mychild != undefined){
    				vm.$refs.mychild.getlist();
    			}
    		}
    	})
    	if(message.uid != vm.uid){
    		vm.topl = message.msg
  			vm.flagt = true
    	}
    }else if(message.type == 2){	 
    	this.changeflag = false
    	vm.messageList.push(message);
    	  	var datas = vm.messageList
    	  	var data = JSON.parse(JSON.stringify(datas))
    	  	data = data.reverse();  
var hash = {};
    data = data.reduce(function(item, next) {
        hash[next.roomnumber] ? '' : hash[next.roomnumber] = true && item.push(next);
        return item
    }, [])
vm.users = data

 }else{
 	this.changeflag = true
  	vm.messageList = message
  	var datas = message
    var data = JSON.parse(JSON.stringify(datas))
  	data = data.reverse();  
var hash = {};
    data = data.reduce(function(item, next) {
        hash[next.roomnumber] ? '' : hash[next.roomnumber] = true && item.push(next);
        return item
    }, [])
vm.users = data
    }
    
}   
}
	},
	sendMessage(type,msg,name,acav){   //发送聊天消息方法
		var _this = this
		var date = new Date();
		var hour = date.getHours();//获取系统时间
				if(hour>12){
					hour = '下午'+(hour-12)
				}else{
					hour = '上午'+hour
				}
		var minute = date.getMinutes(); //分
		var total = hour+':'+minute
		this.socket.send(JSON.stringify({
			uid:this.uid,
			type:type,
			nickname:this.nickname,
			msg:msg,
			avac:this.avac,
			bridge:this.bridge,
			time:total,
			himname:name,
			himavac:acav
		}));
		this.msg = '';
	},
	sendfriendmessage(type,msg,bridge){		
		var recipient;
		bridge.forEach(v=>{
			if(v != this.uid){
				recipient = v
			}
		})
		this.socket.send(JSON.stringify({
			uid:this.uid,
			type:type,
			nickname:this.nickname,
			msg:msg,
			avac:this.avac,
			bridge:bridge,
			recipient:recipient,
		}));
	},
	newaddinfor(){
		historyinfor()
	},
		},
		computed: { //计算swiper目前所在的位置
			swiper() {
				return this.$refs.mySwiper.swiper;
			},
			...mapState(['footerindex']),
			currentMessage(){
				let vm = this;

				let data = vm.messageList.filter(item=>{
					if(vm.bridge == "undefined"){
						return true
					}else{
						return item.bridge.sort().join(',') == vm.bridge.sort().join(',')
					}
					
				})
				if(this.changeflag == false){
					this.closeflag == true
					data.map(item=>{
				if(item.status == 1 && this.closeflag == false){
					var a={"roomnumber":item.roomnumber,"privates":this.uid};   //通过id
				updatahistoryinfor(a).then(res=>{
					this.closeflag = true
				})	
				}
					item.status = 0
					return item;
				})
				}

					return vm.messageList;
		        },
		},
		watch: {
			footerindex: function(li) {
				this.findex = li
			}
		},
		mounted() {
			var avat = JSON.parse(sessionStorage.getItem('userinfo'));
			this.avac = avat.src;
			this.uid = avat.account;
			this.nickname = avat.username;
			this.conWebSocket();
			this.swiper.slideTo(1, 0, true)
			this.swiper.allowSlideNext = false
			let vm = this;
			this.swiper.on('slideChange', function() { //swiper滑动结束后的回调函数
				if(this.activeIndex == 1) {
					this.allowSlideNext = false
				} else if(this.activeIndex == 0) {
					this.allowSlideNext = true
				}

			});
		}
	}
</script>

<style lang="less" scoped="scoped">
.content-main{
	margin-top: 1rem;
	margin-bottom: 1.2rem;
}
</style>