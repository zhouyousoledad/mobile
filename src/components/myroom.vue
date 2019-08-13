<template>
	<div>
		<div class="myroom-top">
			<div class="myroom-top-content">
				<div class="myroom-top-content-first clearfix">
					<div>个人资料</div>
				<div>
					<i class="fa fa-close" @click="returns"></i>
				</div>
				</div>
				<div class="myroom-top-content-second clearfix">
					<div>
						<img :src="avat">
					</div>
					<div>
						<p>{{username}}</p>
						<p>{{signature}}</p>
					</div>
				</div>
			</div>
			<img src="../../static/img/51yuansu.png" class="myroom-top-img">
		</div>  <!--图片部分-->
		<div class="myroom-bottom">
			<ul>
				<li @click="updata">
					<i class="fa fa-gear"></i>
					<p>修改个人资料</p>
					<i class="fa fa-angle-right"></i>
				</li>
				<li @click="exit">
					<i class="fa fa-sign-out"></i>
					<p>退出登录</p>
					<i class="fa fa-angle-right"></i>
				</li>
			</ul>
		</div>  <!--设置部分-->
	</div>
</template>

<script>
	export default {
		data() {
			return {
				avat:'',
				signature:'暂无个性签名',
				username:'',
			}
		},
		props: {

		},
		methods: {
			returns(){
				this.$emit('infor', 1)
			},
			updata(){
				this.$store.state.headothertitle = '编辑资料'
				this.$store.state.swiperindex = 0
				this.$emit('up', 3)
			},
			exit(){
				this.$router.push({path:'/'});
				sessionStorage.removeItem('userinfo')
			}
		},
		created() {
			var user = JSON.parse(sessionStorage.getItem('userinfo'))
			this.avat = user.src
			this.username = user.username
			this.signature = user.signature
		}
	}
</script>

<style scoped="scoped" lang="less">
.myroom-top{
	width: 100%;
	height: 3rem;
	position: relative;
}
.myroom-top-img{
	width: 100%;
	height: 3rem;
	position: absolute;
	z-index:1;
}
.myroom-top-content{
	position: absolute;
	width: 100%;
	height: 3rem;
	z-index:33;
	background-color: rgba(0,0,0,0.3);
}
.myroom-top-content-first{
	div{
		float: left;
		color: #fff;
	}
	div:first-child{
		font-size: 0.4rem;
		margin-top: 0.3rem;
		margin-left: 0.3rem;
	}
	div:nth-child(2){
		i{
			font-size: 0.5rem;
			position: absolute;
			right: 0.3rem;
			top: 0.3rem;
		}
	}
}	
.myroom-top-content-second{
	margin-top: 0.6rem;
	div{
		float: left;
	}
	div:first-child{
		img{
			width: 1.2rem;
			height: 1.2rem;
			border-radius: 50%;
			margin-left: 0.3rem;
		}
	}
	div:nth-child(2){
		width: 70%;
		p{
			color: #fff;
			padding-left: 0.3rem;
		}
		P:first-child{
			font-size: 0.4rem;
		}
		p:nth-child(2){
			font-size: 0.3rem;
			margin-top: 0.05rem;
			white-space:nowrap; /*文本不换行*/
			text-overflow:ellipsis;/*设置超出部分显示...*/
			overflow: hidden;
		}
	}
}
.myroom-bottom{
	width: 100%;
	margin-top: 0.3rem;
	ul{
		li{
			width: 100%;
			background-color: #fff;
			height: 1rem;
			line-height: 1rem;
			font-size: 0.3rem;
			margin-top: 0.35rem;
			position: relative;
			i:first-child{
				position: absolute;
				left: 0.3rem;
				top: 0.28rem;
				font-size: 0.5rem;
				color: #d6d6d6;
			}
			i:nth-child(3){
				position: absolute;
				right: 0.3rem;
				top: 0.28rem;
				font-size: 0.5rem;
				color: #d6d6d6;
			}
			p{
				font-size: 0.3rem;
				margin-left: 1rem;
			}
		}
	}
}
</style>