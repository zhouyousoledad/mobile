<template>
	<div>
	<ul class="chatlist">
		<li v-for="(item,index) in data" :key="index" class="clearfix" @click="joining(item)">		
			<div><img :src="item.himavac"></div>
			<div>
				<p>{{item.himname}}</p>
				<p>{{getlastmsg(item)}}</p>
			</div>
			<div>
				<p>{{gettime(item)}}</p>
				<p class="cricus" v-if="getMsgNum(item) != 0">{{getMsgNum(item)}}</p>
			</div>
			
		</li> 
	</ul>

	</div>
</template>

<script>
	import { lasthistory,updatahistoryinfor } from '@/data/api';
		export default {
		data() {
			return {
				chatdata:[],
				uid:''
			}
		},
		props:{
			datatwo:{
				type: Array,
                default: ''
			},
			data:{
				type: Array,
                default: ''
			}
		},
		methods:{
			joining(numbers){
				this.$emit('join',numbers)
				var a={"roomnumber":numbers.roomnumber,"privates":this.uid};
				if(this.getMsgNum(numbers) != 0){
				updatahistoryinfor(a).then(res=>{
					console.log(res)
				})	
				}
			},
			getMsgNum(user){	
				var a=this.datatwo.filter(item=>{
				return item.bridge.length && item.uid === user.uid && item.status ===1
				})
				var lengths = a.length
				if(lengths != 0){
				return lengths;
			}else{
				return 0
			}
  			},
			getlastmsg(user){
			var a=this.datatwo.filter(item=>{
				return item.roomnumber === user.roomnumber && item.type ===2
			})

			var lengths = a.length
			if(lengths != 0){
				var b=a[lengths-1].msg;
				return b;
			}else{
				
			}
			},
			gettime(user){
				var a=this.datatwo.filter(item=>{
				return item.uid === user.uid && item.type ===2
			})
			var lengths = a.length
			if(lengths != 0){
				var b=a[lengths-1].time;
				return b
			}else{
				
			}
			},
		},
		created(){
			var user = JSON.parse(sessionStorage.getItem('userinfo'))
			this.uid = user.account
//			var a={
//				privates:this.uid
//			}
//			lasthistory(a).then(res => {
//				this.chatdata = res.data.userinfo
//				
//			})

		}
	}
</script>

<style lang="less" scoped="scoped">
.chatlist{
	margin-bottom: 1.2rem;
	margin-top: 1rem;
	li{
		width: 100%;
		background-color: #fff;
		padding: 0.3rem 0rem;
		div{
			float: left;
		}
		div:first-child{
			width: 25%;
			img{
				width: 1.3rem;
				height: 1.3rem;
				border-radius: 50%;
				margin-left: 0.3rem;
			}
		}
		div:nth-child(2){
			width: 50%;
			p:first-child{
					font-size: 0.38rem;
				margin-top: 0.15rem;
			}
			p:nth-child(2){
				padding-top: 0.1rem;
				color: #b6b6b6;
				font-size: 0.3rem;
				white-space:nowrap; /*文本不换行*/
				text-overflow:ellipsis;/*设置超出部分显示...*/
				overflow: hidden;
			}
		}
		div:nth-child(3){
			width: 25%;
			text-align: right;
			p:first-child{
				margin-right: 0.3rem;
				margin-top: 0.2rem;
				font-size: 0.28rem;
				color: #b6b6b6;
			}
		}
	}
	li:first-child{
		background-color: azure;
	}
}
.cricus{
	width: 0.4rem;
	height: 0.4rem;
	background-color: red;
	line-height: 0.4rem;
	text-align: center;
	font-size: 0.25rem;
	color: #fff;
	border-radius: 50%;
	float: right;
	margin-right: 0.3rem;
	margin-top: 0.2rem;
}

</style>