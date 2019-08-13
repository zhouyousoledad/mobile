<template>
	<div>

		<section class="seacher-top clearfix">
			<div><input type="text" v-model="account" class="input-seacher" placeholder="请输入对方账号"></div>
			<div class="flex" @click="seacher"><i class="fa fa-search"></i></div>
		</section>
		<div class="myaccount">我的聊天号:{{accounts}}</div>
		<ul class="contactslist">
		<li v-for="(item,index) in contactdata" :key="index" class="clearfix" @click="friendinfo">
			<div><img :src="item.src"></div>
			<div>{{item.username}}</div>
		</li>
	</ul>
	</div>
</template>

<script>
import {finduser} from '@/data/api';	
	export default {
		data() {
			return {
				account:'',
				accounts:'',
				contactdata:[]
			}
		},
		methods:{
			seacher(){
				var a={
					account:this.account
				}
				finduser(a).then(res => {
			this.contactdata=res.data.userinfo		
			})
			},
			friendinfo(){
				this.$store.state.friendinfos = this.contactdata
				this.$store.state.headothertitle = '个人资料'
				this.$store.state.swiperindex = 4
				this.$emit('up', 5)
			}
		},

		created() {
			this.accounts = JSON.parse(sessionStorage.getItem('userinfo')).account
			
		}
	}
</script>

<style lang="less" scoped="scoped">
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
.myaccount{
	font-size: 0.3rem;
	text-align: center;
	margin-top: 0.2rem;
}
.seacher-top{
	background-color: #fff;
	margin-top: 1rem;
	font-size: 0.3rem;
	height: 1rem;
	div{
		float: left;
		height: 1rem;
			i{
		font-size: 0.4rem;
		color:#e2e2e2;
	}
	}
	div:first-child{
		width: 85%;
	}
	div:nth-child(2){
		width: 15%;
	}
}
.input-seacher{
	height: 1rem;
	border:none;
	width: 90%;
	padding-left: 0.3rem;
	font-size: 0.3rem;
}
</style>