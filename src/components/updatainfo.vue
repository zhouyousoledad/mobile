<template>
	<div class="updata">
		<ul>
			<li class="clearfix">
				<p>昵称</p>
				<p><input type="text" v-model="personinfo.username"></p>
				<i class="fa fa-angle-right"></i>
			</li>
			<li class="clearfix">
				<p>密码</p>
				<p><input type="password" v-model="personinfo.password"></p>
				<i class="fa fa-angle-right"></i>
			</li>
			<li class="clearfix">
				<p>签名</p>
				<p><input type="text" v-model="personinfo.signature"></p>
				<i class="fa fa-angle-right"></i>
			</li>
			</ul>
			<ul>
			<li class="clearfix">
				<p>性别</p>
				<p>
					<select v-model="personinfo.sex">
						<option v-for="(item,index) in sexlist" :value="item.value" :key="index">{{item.label}}</option>
					</select>
				</p>
				<!--<p><input type="text" v-model="personinfo.sex"></p>-->
				<i class="fa fa-angle-right"></i>
			</li>
			<li class="clearfix">
				<p>职业</p>
				<p>
					<select v-model="personinfo.professional">
						<option v-for="(item,index) in professionallist" :value="item.value" :key="index">{{item.label}}</option>
					</select>
				</p>
				<!--<p><input type="text" v-model="personinfo.professional"></p>-->
				<i class="fa fa-angle-right"></i>
			</li>
			<li class="clearfix">
				<p>公司</p>
				<p><input type="text" v-model="personinfo.company"></p>
				<i class="fa fa-angle-right"></i>
			</li>
			</ul>
			<ul>
			<li class="clearfix">
				<p>学校</p>
				<p><input type="text" v-model="personinfo.school"></p>
				<i class="fa fa-angle-right"></i>
			</li>
			<li class="clearfix">
				<p>邮箱</p>
				<p><input type="text" v-model="personinfo.email"></p>
				<i class="fa fa-angle-right"></i>
			</li>
		</ul>
		<div class="save" @click="post">
			<p>保存</p>
		</div>
	</div>
</template>

<script>
	import {updata} from '@/data/api';
	export default {
		data() {
			return {
				personinfo:{
					
				},
				userid:'',
				sexlist:[
				{
					value:0,
					label:'男'
				},
				{
					value:1,
					label:'女'
				}
				],
				professionallist:[
				{
					value:0,
					label:'计算机/互联网/通信'
				},
				{
					value:1,
					label:'生产/工艺/制造'
				},
				{
					value:2,
					label:'医疗/护理/制药'
				},
				{
					value:3,
					label:'金融/银行/投资/保险'
				},
				{
					value:4,
					label:'商业/服务业/个体经营'
				},
				{
					value:5,
					label:'文化/广告/传媒'
				},
				{
					value:6,
					label:'娱乐/艺术/表演'
				},
				{
					value:7,
					label:'律师/法务'
				},
				{
					value:8,
					label:'教育/培训'
				},
				{
					value:9,
					label:'公务员/行政/事业单位'
				},
				{
					value:10,
					label:'模特'
				},
				{
					value:11,
					label:'空姐'
				},
				{
					value:12,
					label:'学生'
				},
				{
					value:13,
					label:'其他职业'
				}
				]
			}
		},
		methods: {
			returns(){
				this.$emit('infor', 1)
			},
			post(){
				this.personinfo._id = this.userid
				updata(this.personinfo).then(res => {

				})
			},
			updata(){
				this.$store.state.headothertitle = '编辑资料'
				this.$emit('up', 3)
			},
			exit(){
				this.$router.push({path:'/'});
				sessionStorage.removeItem('userinfo')
			}
		},
		created() {
			var user = JSON.parse(sessionStorage.getItem('userinfo'))
			this.userid = user.userid
			this.personinfo.username = user.username
			this.personinfo.password = user.password
			this.personinfo.signature = user.signature
			this.personinfo.sex = user.sex
			this.personinfo.professional = user.professional
			this.personinfo.company = user.company
			this.personinfo.school = user.school
			this.personinfo.email = user.email			
		}
	}
</script>

<style scoped="scoped" lang="less">
	.updata{
		margin-top: 1.3rem;
		ul{
			margin-top:0.3rem;
			li{
				width: 100%;
				height: 0.8rem;
				line-height: 0.8rem;
				background-color: #fff;
				position: relative;
				border-bottom: 1px solid #e2e2e2;
				p{
					float: left;
					font-size: 0.3rem;
					input{
						border:none;
						height: 0.7rem;
						background-color: transparent;
						margin-left: 0.5rem;
						width: 5rem;
						font-size: 0.3rem;
					}
					select{
						border:none;
						height: 0.7rem;
						background-color: transparent;
						margin-left: 0.5rem;
						width: 5rem;
						font-size: 0.3rem;
						appearance:none;
  						-moz-appearance:none;
  						-webkit-appearance:none;
					}
				}
				p:first-child{
					padding-left: 0.3rem;
				}
				i{
					font-size: 0.5rem;
					position: absolute;
					right: 0.3rem;
					color: #d6d6d6;
					top: 0.15rem;
				}
			}
			li:last-child{
				border:none
			}
		}
	}
	.save{
		width: 100%;
		background-color: #3172dd;
		height: 0.8rem;
		line-height: 0.8rem;
		text-align: center;
		color: #fff;
		position: fixed;
		bottom: 1rem;
		p{
			font-size: 0.3rem;
		}
	}
</style>