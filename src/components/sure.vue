<template>
	<div>
		<ul class="contactslist">
		<li v-for="(item,index) in addmessage" :key="index" class="clearfix">
			<div><img :src="item.avac"></div>
			<div>
				<p>{{item.nickname}}</p>
				<p>{{item.msg}}</p>
				<div class="sure-button">
					<div style="width: auto;" v-if="item.zt==0">
					<button type="button" @click="Agreed(index,item.uid,item._id)">同意</button>
					<button type="button" @click="Refused(index,item.uid,item._id)">拒绝</button>
					</div>
					<span v-else>{{ifsuorer(item.zt)}}</span>
				</div>
			</div>
			
		</li>
	</ul>
	</div>
</template>

<script>
	import {addconcacts,historyinfor,exchangestate} from '@/data/api';
	export default {
		data() {
			return{
				sure:false,
				uid:'',
				nums:0,
				username:'',
				addmessage:[],
			}
		},
		props:{
			ok: {
    			type: Function,
    			default: null
			},
		},
		methods:{
			ifsuorer(data){
				if(data == 1){
					return '已同意'
				}else if(data == 2){
					return '已拒绝'
				}
			},
			Agreed(index,uid,id){
				this.addmessage[index].zt = "已同意";
				this.sure = true;
				this.addmessage[index].status = 0;
				var arr=[]
				arr.push(this.uid)
				arr.push(uid)
				var roomnumber = arr.sort().join('')
				var a={
					account:this.uid,
					heaccount:uid,
					roomnumber:roomnumber
				}
				var b={
					"_id":id,
					"zt":1,
				}
				addconcacts(a).then(res => {
					var a = this.username + '同意添加为好友'
					var arrs=[this.uid,uid]
					this.ok(4,a,arrs)
				})
				exchangestate(b).then(res => {
					this.addmessage[index].zt = 1
				})
			},
			Refused(index,uid,id){
				this.addmessage[index].zt = "已拒绝";
				this.sure = true;
				this.addmessage[index].status = 0
				var a = this.username + '拒绝添加为好友'
				var arrs=[this.uid,uid]
				this.ok(4,a,arrs)
				var b={
					"_id":id,
					"zt":2,
				}
				exchangestate(b).then(res => {
					this.addmessage[index].zt = 2
				})
			}
		},
		created() {
			var user = JSON.parse(sessionStorage.getItem('userinfo'))
			this.uid = user.account		
			this.username = user.username
			var a = {"recipient":this.uid}
			historyinfor(a).then(res => {
				this.addmessage = res.data.data
			})
		}
		
	}
</script>

<style lang="less" scoped="scoped">
.contactslist{
	margin-top: 1rem;
	li{
		width: 100%;
		height: 1.5rem;
		margin-bottom: 0.2rem;
		background-color: #fff;
		div:first-child{
			width: 20%;
			height: 1.5rem;
			float: left;
			img{
				width: 1.2rem;
				height: 1.2rem;
				border-radius: 50%;
				margin: 0.15rem 0 0 0.2rem;
			}
		}
		div:nth-child(2){
			width: 80%;
			height: 1.5rem;
			float: left;
			position: relative;
			p{
				font-size: 0.3rem;
				padding-left: 0.3rem;
			}
			p:first-child{
				margin-top: 0.2rem;
				font-size: 0.35rem;
			}
			p:nth-child(2){
				color: #b6b6b6;
				margin-top: 0.1rem;
			}
		}
	}
}
.sure-button{
	position: absolute;
	right: 0.3rem;
	top: 0.5rem;
	width: auto;
	span{
		font-size: 0.3rem;
		color: #b6b6b6;
	}
	button:first-child{
		width: 1rem;
		height: 0.5rem;
		border: none;
		background-color: #0099FF;
		color: #fff;
		font-size: 0.25rem;
		border-radius: 5px;
	}
	button:nth-child(2){
		width: 1rem;
		height: 0.5rem;
		border: none;
		background-color: red;
		color: #fff;
		font-size: 0.25rem;
		border-radius: 5px;
	}
}
</style>