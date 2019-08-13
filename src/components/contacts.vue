<template>
	<div>
	<div class="newfriend" @click="suree">
		<p>新朋友</p>
		<span v-if="realtime!=0">{{realtime}}</span>
	</div>
	<ul class="contactslist">
		<li v-for="(item,index) in contactdata" :key="index" class="clearfix" @click="inter(index)">
			<div><img :src="item.infor.src"></div>
			<div>{{item.infor.username}}</div>
		</li>
	</ul>
	</div>
</template>

<script>
import { friendlist,seefriend} from '@/data/api';
		export default {
		data() {
			return {
				contactdata:[],
				uid:'',
			}
		},
		props:{
			addmessage:{
				type: Array,
                default: ''
			},
		},
		computed:{
			realtime(){
				console.log(this.addmessage)
				return this.addmessage.filter(item=>{
					return item.uid != this.uid && item.status == 1
				}).length		
				
			}
		},
		methods:{
			inter(index){
				var a=[]
				a.push(this.contactdata[index].infor)
				this.$store.state.friendinfos = a
				this.$store.state.headothertitle = '个人资料'
				this.$emit('up', 5)
			},
			suree(){
				this.$store.state.headothertitle = '新朋友'
				this.$emit('up',6)				
				this.addmessage.map(item=>{
					item.status = 0
					return item;
				})
				if(this.realtime != 0){
				var account = JSON.parse(sessionStorage.getItem('userinfo')).account
				var a = {"recipient":account}
				seefriend(a).then(res =>{
					
				})
				}				
			},
			getlist(){
				var account = JSON.parse(sessionStorage.getItem('userinfo')).account
			var a={
				account:account
			}
				friendlist(a).then(res => {
			this.contactdata=res.data.userinfo	
			})
			}
		},


		created() {
			this.getlist()
			var avat = JSON.parse(sessionStorage.getItem('userinfo'));
			this.uid = avat.account;
		}
	}
</script>

<style lang="less" scoped="scoped">
.newfriend{
	margin-top: 1.2rem;
	width: 100%;
	height: 1.2rem;
	line-height: 1.2rem;
	background-color: #fff;
	position: relative;
	p{
		margin-left: 0.3rem;
			font-size: 0.35rem;
	}
	span{
		position: absolute;
		display: block;
		width: 0.4rem;
		height: 0.4rem;
		border-radius: 50%;
		font-size: 0.25rem;
		color: #fff;
		background-color: red;
		text-align: center;
		line-height: 0.4rem;
		right: 0.3rem;
		top: 0.4rem;
	}
}
.contactslist{
	margin-top: 0.2rem;
	li{
		width: 100%;
		height: 1.2rem;
		margin-bottom: 0.2rem;
		background-color: #fff;
		div{
			float: left;
		}
		div:first-child{
			width: 20%;
			height: 1.2rem;
			img{
				width: 0.9rem;
				height: 0.9rem;
				border-radius: 50%;
				margin: 0.15rem 0 0 0.2rem;
			}
		}
		div:nth-child(2){
			width: 80%;
			font-size: 0.3rem;
			line-height: 1.2rem;
			height: 1.2rem;
		}
	}
}
</style>