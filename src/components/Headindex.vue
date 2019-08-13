<template>
	<div class="head-content">
	<div class="chatheader clearfix">
		<div><img :src="avac"></div>
		<!--<div @click="show"><img src="../../server/public/avat/saber.jpg"></div>-->
		<div>{{indextitle}}</div>
		<div @click="add"><i class="fa fa-plus"></i></div>
	</div>
	</div>
</template>

<script>
	import { mapState } from 'vuex'
	export default {
		data() {
			return {
				indextitle:"消息",
				chattitle:'',
				type:0,
				avac:'',
			}
		},
		props: {

  		},
		methods:{
			add(){
				this.$store.state.headothertitle = '查找好友'
				this.$store.state.swiperindex = 1
				this.$emit('up', 4)
			},
			show(){
				this.$emit('ee', 0)
			},
		},
		computed:{
         ...mapState(['headindex']),
         ...mapState(['headtitle']),
         ...mapState(['headindextitle']),
        },
		watch: {
			headindex: function(li) {
				this.type = li
			},
			headtitle:function(li){
				this.chattitle = li
			},
			headindextitle:function(li){
				this.indextitle = li
			}
		},
		created() {
			var avat = JSON.parse(sessionStorage.getItem('userinfo'))
			this.avac = avat.src
		}
	}
</script>

<style lang="less" scoped="scoped">
.head-content{
	width: 100%;
	height: 1rem;
	background-color: #3172dd;
	font-size: 0.3rem;
	color: #fff;
	position: fixed;
	top: 0;
	z-index:99;
}
.head-toping{
	width: 100%;
	height: 0.6rem;
	background-color: #3172dd;	
}
.chatheader{
	background-color: #3172dd;	
	div{
		float: left;
		height: 1rem;
		line-height: 1rem;
		text-align: center;
		position: relative;
	}
	div:first-child{
		width: 15%;
		i{
			font-size: 0.6rem;
		}
		img{
			width: 0.75rem;
			height: 0.75rem;
			border-radius: 50%;
			position: absolute;
			left: 0.3rem;
			top:0.1rem;
		}
	}
	div:nth-child(2){
		width: 70%;
		letter-spacing:1px;
		font-size: 0.35rem;
	}
	div:nth-child(3){
		width: 15%;
		i{
			font-size: 0.4rem;
			position: absolute;
			right: 0.3rem;
			top: 0.3rem;
		}
	}
}
.return{
	i{
		position: absolute;
		left: 0.3rem;
		top:0.19rem;
	}
}
.infos{
	i{
		right: 0.3rem;
		top: 0.3rem;	
		font-size: 0.45rem !important;
	}
}
</style>