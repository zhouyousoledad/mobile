<template>
	<div class="content-list">
		<div class="content-over" :style="{height:height+'px',marginTop:top+'px'}" @touchstart="touchstart($event)" @touchmove="touchmove($event)" @touchend="touchend($event)">
			<div class="load-height" ref="load">
				<i class="fa fa-spinner fa-pulse"></i>
			</div>
			<ul class="clearfix colist">
				<li v-for="(item,index) in Data" :key="index" class="clearfix">
					<section v-if="item.uid!=uid" style="width: 100%;" class="clearfix">
						<div class="yourimg"><img :src="item.avac"></div>
						<div class="yourpop flex">
							{{item.msg}}
						</div>
					</section>
					<section v-else-if="item.uid==uid" style="width: 100%;" class="clearfix">
						<div class="myimg"><img :src="item.avac"></div>
						<div class="mypop flex">
							{{item.msg}}
						</div>
					</section>
				</li>
			</ul>
		</div>
		<section class="chat-foot" ref="foots">
			<section class="clearfix chat-first">
				<div class="chat-first-left">
					<Chat v-model='textareas' ref="mychild" :key="menindex"></Chat>
				</div>
					<button type="button" class="btn btn-bottom" @click="send" v-if="textareas !='' ">发送</button>
					<button type="button" class="btn btn-bottom nodata" v-else>发送</button>
			</section>
			<section class="chat-second">
				<ul class="clearfix">
					<li v-for="(item,index) in icondata" :key="index" @click="icon(index)">
						<i :class="item.icon" :style="{'color': (active==index ? '#09F':'')}"></i>
					</li>
				</ul>
			</section>
		</section>
	</div>
</template>

<script>
	import Chat from '../components/chatiputs'
	export default {
		components: {
			Chat,
		},
		data() {
			return {
				active: 5, //底部功能索引
				height: '',
				startY: '',
				startX: '',
				nowstartY: '',
				nowstartX: '',
				userdata:{},
				list:[],
				uid:'',
				linknum:0,  //连接数
				menindex: 1,
				textareas: '',
				myaccount: '', //自己的账号
				hisaccount: '', //对方的账号
				myavat: '', //自己头像
				hisavat:'',
				top: 0,
				chatdata: [ //0表示他人的信息，1表示自己发送的信息
				],
				icondata: [{
						icon: 'fa fa-picture-o',
					},
					{
						icon: 'fa fa-camera',
					},
					{
						icon: 'fa fa-smile-o',
					},
					{
						icon: 'fa fa-plus-circle',
					},
				]
			}
		},
		props:{
			ok: {
    			type: Function,
    			default: null
			},
			Data:{
				type: Array,
                default: ''
			},
			Title:{
				type: String,
				default:''
			},
			Acav:{
				type: String,
				default:''
			},
			Huid:{
				type: String,
				default:''
			},
		},
		methods: {
			send() {			
				var blank = this.textareas.split(' ').every(n => {
					return /^(&nbsp;)+$/.test(n); // 针对空格为&nbsp;的情况
				}) || this.textareas.trim().length === 0; // 普通空格的情况
				if(blank) {
					return;
				}
				this.textareas = this.textareas.replace(/(\s*$)/g, "");
				this.ok(2,this.textareas,this.Title,this.Acav,this.Huid);
				this.textareas = "";
				this.$refs.mychild.parentHandleclick();
				++this.menindex;
				setTimeout(() => {
					let el = document.querySelector('.content-over');
					let scrollHeight = el.scrollHeight;
					el.scrollTo(0, scrollHeight);
				}, 0)
			
			},
			icon(index) {
				if(this.active == index) {
					this.active = 5
				} else {
					this.active = index
				}
			},
			setheight() {
				var totol = document.body.clientHeight;
				var a = this.$refs.foots.offsetHeight;
				this.height = totol - a;
			},
			touchstart(e) {
				this.startY = e.targetTouches[0].pageY;
				this.startX = e.targetTouches[0].pageX;
			},
			touchmove(e) {
				this.nowstartY = e.targetTouches[0].pageY;
				this.nowstartX = e.targetTouches[0].pageX;
				var distanceY = this.nowstartY - this.startY;
				var distanceX = this.nowstartX - this.startX;
				let el = document.querySelector('.content-over');
				let scrollTop = el.scrollTop
				if(Math.abs(distanceX) < Math.abs(distanceY) && distanceY < 0) {
					//向上
				} else if(Math.abs(distanceX) < Math.abs(distanceY) && distanceY > 0) {
					if(scrollTop == 0) {
						this.top = distanceY
					}
				}
			},
			touchend(e) {
				var load = this.$refs.load.offsetHeight
				if(this.top >= load) {
					this.top = load
					setTimeout(() => {
						this.top = 0;
					}, 2000)
				} else {
					this.top = 0
				}
			},
			websockets() {


			}
		},
		created() {
			var avat = JSON.parse(sessionStorage.getItem('userinfo'));
			this.uid = avat.account;
			setTimeout(() => {
				this.setheight()
			}, 0)
		}
	}
</script>

<style lang="less" scoped="scoped">
	.content-list {
		background-color: #f1f2f7;
		height: 100%;
	}
	
	.content-over {
		overflow-y: auto;
	}
	
	.colist {
		li {
			width: 100%;
			margin: 0.4rem 0 0 0;
			div {
				float: left;
			}
		}
	}
	
	.yourimg {
		img {
			width: 1rem;
			height: 1rem;
			border-radius: 50%;
			margin-left: 0.3rem;
		}
	}
	
	.myimg {
		float: right !important;
		img {
			width: 1rem;
			height: 1rem;
			border-radius: 50%;
			margin-right: 0.3rem;
		}
	}
	
	.yourpop {
		max-width: 50%;
		min-height: 0.6rem;
		height: auto;
		border-radius: 10px;
		position: relative;
		background-color: #fff;
		font-size: 0.35rem;
		padding: 0.2rem 0.3rem 0.2rem 0.3rem;
		color: #000;
		margin-left: 0.3rem;
		white-space: normal;
		word-break: break-all;
		word-wrap: break-word;
		&:before {
			content: "";
			display: block;
			border-width: 0.3rem;
			position: absolute;
			top: 0.15rem;
			left: -0.45rem;
			border-style: solid dashed dashed;
			border-color: transparent #fff transparent transparent;
			font-size: 0;
			line-height: 0;
		}
	}
	
	.mypop {
		float: right !important;
		max-width: 50%;
		min-height: 0.6rem;
		height: auto;
		border-radius: 10px;
		position: relative;
		background-color: #09F;
		font-size: 0.35rem;
		padding: 0.2rem 0.3rem 0.2rem 0.3rem;
		color: #fff;
		margin-right: 0.3rem;
		white-space: normal;
		word-break: break-all;
		word-wrap: break-word;
		&:before {
			content: "";
			display: block;
			border-width: 0.3rem;
			position: absolute;
			top: 0.15rem;
			right: -0.45rem;
			border-style: solid dashed dashed;
			border-color: transparent transparent transparent #09F;
			font-size: 0;
			line-height: 0;
		}
	}
	
	.load-height {
		height: 1rem;
		text-align: center;
		color: #989eb4;
		line-height: 1rem;
		i {
			font-size: 0.5rem;
		}
	}
	
	.chat-foot {
		width: 100%;
		background-color: #ebeef5;
		position: fixed;
		bottom: 0;
		padding-bottom: 0.1rem;
	}
	.chat-first-left{
		width: 75%;
		margin-left: 0.3rem;
		
	}
	.btn-bottom{
		width: 17%;
		margin-right: 0.3rem;
		position: absolute;
		right: 0;
		bottom: 0;

	}
	.chat-first {
		padding: 0.15rem 0 0rem 0;
		position: relative;
		button {
			height: 0.6rem;
		}
	}
	
	.chat-second {		
		height: 0.8rem;
		ul {
			li {
				float: left;
				width: 25%;
				text-align: center;
				height: 0.8rem;
				line-height: 1.1rem;
				i {
					font-size: 0.5rem;
					color: #989eb4;
				}
			}
		}
	}
	
	.chatinput {
		border: none;
		border-radius: 10px;
		width: 90% !important;
		margin-left: 0 !important;
		min-height: 0.4rem;
		font-size: 0.3rem;
		padding: 0.1rem 0.2rem;
		background-color: #fff;
		display: flex;
		align-items: center;
		white-space: normal;
		word-break: break-all;
		word-wrap: break-word;
	}
	
	.chatinput:focus {
		border: 0;
		outline: none;
	}
	
	.nodata {
		background-color: #a7e1f6 !important;
	}
</style>