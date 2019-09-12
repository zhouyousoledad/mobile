<template>
	<div class="login-bg flex">

		<img src="../../build/logo.png" class="logo">
		<div class="login-body">
			<p><input type="text" v-model="logining.account" placeholder="请输入用户名"></p>
			<p><input type="password" v-model="logining.password" placeholder="请输入密码"></p>
			<div><button type="button" @click="login">登录</button></div>
		</div>
	</div>
</template>

<script>
	import {login} from '@/data/api';
	export default {
		data() {
			return {
				logining:{},
				saber:''
			}
		},
		methods:{
			login(){
				login(this.logining).then(res => {
					if(res.data.code==0){
						alert("用户名错误")
					}else if(res.data.code==1){
						alert("密码错误")
					}else{
						sessionStorage.setItem('userinfo',JSON.stringify(res.data.data))
						this.$router.push({path:'/index'})
					}
				})
			},
		}
	}
</script>

<style lang="less" scoped="scoped">
.login-bg{
	width: 100%;
	height: 100%;
	background: url(../../static/img/timg.jpg) no-repeat;
	background-size: 100% 100%;
	position: fixed;
	width: 100%;
	height:100%;
}
.logo{
	position: fixed;
	top: 1rem;
	width: 2.5rem;
	height: 2.5rem;
}
.login-body{
	width: 6rem;
	height: auto;
	background-color: #fff;
	border-radius: 10px;
	p{
		border-bottom: 1px solid #d6d6d6;
		margin: 0.4rem 0.3rem 0.4rem 0.3rem;
	}
	div{
		text-align: center;
		margin: 0rem 0.3rem 0rem 0.3rem;
		padding-bottom: 0.4rem;
		button{
			width: 100%;
			height: 0.6rem;
			font-size: 0.3rem;
			border:none;
			background-color: #3399ff;
			color: #fff;
			border-radius: 5px;
		}
	}
}
input{
	border: none;
	height: 0.6rem;
	width: 100%;
	font-size: 0.3rem;
}
</style>