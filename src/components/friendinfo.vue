<template>
	<div class="friendinfo">
		<div class="friendinfo-bg">
			<img src="../../static/img/51yuansu.png">
			<div class="friendmc">
				<p @click="returns"><i class="fa fa-angle-left"></i></p>
			</div>
		</div>
		<section class="friendinfo-content">
		<div class="friendinfo-two">
			<div><img :src="frienddata.src"></div>
			<div>
				<p>{{frienddata.username}}</p>
				<p>账号：{{frienddata.account}}</p>
				<p><span>{{sexchange(frienddata.sex)}}</span><span>白羊座</span></p>
			</div>
		</div>
		</section>
		<section class="friendinfo-detail">
			<ul>
			<li>
				<i class="fa fa-pencil-square-o"></i>
				<p>{{frienddata.signature}}</p>
				<i class="fa fa-angle-right"></i>
			</li><!--签名-->
			<li>
				<i class="fa fa-briefcase"></i>
				<p>{{profess(frienddata.professional)}}</p>
				<i class="fa fa-angle-right"></i>
			</li><!--职业-->
			<li>
				<i class="fa fa-flag"></i>
				<p>{{frienddata.school}}</p>
				<i class="fa fa-angle-right"></i>
			</li><!--学校-->
			<li>
				<i class="fa fa-institution"></i>
				<p>{{frienddata.company}}</p>
				<i class="fa fa-angle-right"></i>
			</li><!--公司-->
			<li>
				<i class="fa fa-envelope"></i>
				<p>{{frienddata.email}}</p>
				<i class="fa fa-angle-right"></i>
			</li><!--邮箱-->
			</ul>
		</section>
		<section class="friendinfo-bottom flex">
			<div v-if="optarion==0" class="flex bottom-footer" @click="personinfo">
				编辑资料
			</div>
			<div v-else-if="optarion==1" class="flex bottom-footer" @click="sendinfo">
				发送消息
			</div>
			<div v-else-if="optarion==2" class="flex bottom-footer" @click="addfriend">
				添加好友
			</div>
		</section>
	</div>
	
</template>

<script>
	import { mapState } from 'vuex';
	import {findiffriend} from '@/data/api';
	export default {
		data() {
			return {
				frienddata:{},
				uid:"",
				optarion:0,
			}
		},
		props:{
			ok: {
    			type: Function,
    			default: null
			},
		},
		methods:{
			returns(){ //返回上一页
				this.$emit('back',this.$store.state.swiperindex)
				this.$store.state.swiperindex = 1
				this.$store.state.headothertitle = '查找好友'
			},
			personinfo(){  //编辑个人资料
				this.$emit('back', 0)
			},
			sendinfo(){    //进入聊天室
				var a={
					uid:this.frienddata.account,
					nickname:this.frienddata.username,
					bridge:[this.uid,this.frienddata.account],
					himavac:this.frienddata.src,
					avac:this.frienddata.src
				}
				this.$emit('join',a)
			},
			addfriend(){   //添加好友
				var arr=[this.frienddata.account,this.uid]
				this.ok(3,"请求添加好友",arr)
//				this.$emit('add',3,'请求添加好友')
				this.$emit('back', 1)
			},
			saber(){
				this.ok(3);
			},
			sexchange(data){
				if(data==0){
					return '男'
				}else{
					return '女'
				}
			},
			profess(data){
				if(data==0){
					return '计算机/互联网/通信'
				}else if(data==1){
					return '生产/工艺/制造'
				}else if(data==2){
					return '医疗/护理/制药'
				}else if(data==3){
					return '金融/银行/投资/保险'
				}else if(data==4){
					return '商业/服务业/个体经营'
				}else if(data==5){
					return '文化/广告/传媒'
				}else if(data==6){
					return '娱乐/艺术/表演'
				}else if(data==7){
					return '律师/法务'
				}else if(data==8){
					return '教育/培训'
				}else if(data==9){
					return '公务员/行政/事业单位'
				}else if(data==10){
					return '模特'
				}else if(data==11){
					return '空姐'
				}else if(data==12){
					return '学生'
				}else if(data==13){
					return '其他职业'
				}
			}
		},
		props:{
			socket: {
    			type: Object,
			},
			ok: {
    			type: Function,
    			default: null
			},
		},
		computed:{
         ...mapState(['friendinfos']),
        },
        watch: {
			friendinfos:function(li){
				var obj={}
				li.map(function (e, item) {
  					obj['src'] = e.src;
					obj['username'] = e.username;
					obj['account'] = e.account;
					obj['sex'] = e.sex;
					obj['signature'] = e.signature;
					obj['professional'] = e.professional;
					obj['school'] = e.school;
					obj['company'] = e.company;
					obj['email'] = e.email;
  				});
				this.frienddata = obj
				if(this.frienddata.account == this.uid){
					this.optarion=0;
 					return false;
				}else{
					var a={
						heaccount:this.frienddata.account,
						account:this.uid
					}
					findiffriend(a).then(res => {
						if(res.data.msg==0){
							this.optarion=2;
						}else{
							this.optarion=1;
						}
					})
					
				}

			},
		},
		created() {
			var avat = JSON.parse(sessionStorage.getItem('userinfo'));
			this.uid = avat.account;
		}
	}
</script>

<style lang="less" scoped="scoped">
	.friendinfo-bg{
		width: 100%;
		height: 5rem;
		position: relative;
		img{
		width: 100%;
		height: 5rem;	
		}
	}
	.friendmc{
		position: absolute;
		width: 100%;
		height: 5rem;
		background-color: rgba(0,0,0,0.4);
		top: 0;
		left: 0;
		p{
			width: 1rem;
			height: 1rem;
			position: relative;
			i{
				color: #fff;
				font-size: 0.8rem;
				position:absolute;
				top:0.1rem;
				left:0.3rem;
			}
		}
		
	}
	.friendinfo-two{
		position: absolute;
		top: -0.9rem;
		div{
			float: left;
			img{
				width: 2rem;
				height: 2rem;
				border-radius: 50%;
				margin-left: 0.3rem;
			}
			p{
				font-size: 0.3rem;
			}
		}
		div:nth-child(2){
			margin-left: 0.3rem;
			p:first-child{
				color: #fff;
				font-size: 0.4rem;
				margin-top: 0.26rem;
			}
			p:nth-child(2){
				margin-top: 0.15rem;
			}
			p:nth-child(3){
				margin-top: 0.05rem;
				span:nth-child(2){
					padding-left: 0.2rem;
				}
			}
		}
	}
	.friendinfo-content{
		position: relative;
	}
	.friendinfo-detail{
		margin-top: 1.2rem;
		ul{
			li{
				border-bottom: 1px solid #ccc;
				height: 1rem;
				line-height: 1rem;
				font-size: 0.3rem;
				position: relative;
				p{
					overflow: hidden;
					text-overflow:ellipsis;
					white-space: nowrap;
					margin-left: 1rem;
					width: 5.8rem;
				}
				i:first-child{
					font-size: 0.4rem;
					position: absolute;
					top: 0.27rem;
					left: 0.3rem;
					color:#b6b6b6;
				}
				i:nth-child(3){
					font-size: 0.5rem;
					position: absolute;
					top:0.27rem;
					right: 0.3rem;
					color: #b6b6b6;
				}
			}
		}
	}
	.friendinfo-bottom{
		position: fixed;
		width: 100%;
		bottom: 0;
		z-index:99;
		height: 1rem;
		border-top:1px solid #ccc;
	}
	.bottom-footer{
		width: 90%;
		height: 0.8rem;
		line-height: 0.8rem;
		background-color: #3172dd;
		font-size: 0.3rem;
		border-radius: 5px;
		color: #fff;
	}
</style>