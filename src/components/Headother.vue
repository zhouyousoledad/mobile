<template>
	<div class="head-content">
	<div class="chatheader clearfix">
		<div class="return" @click="exit"><i class="fa fa-angle-left"></i></div>
		<div>{{title}}</div>
		<div class="infos"><i class="fa fa-navicon"></i></div>
	</div>

	</div>
</template>

<script>
	import { mapState } from 'vuex'
	export default {
		data() {
			return {
				type:0,
				avac:'',
				title:'',
				swindex:1,
			}
		},
		props:{

		},
		methods:{
			exit(){
				this.$emit('back', this.swindex)
			},
		},
		computed:{
         ...mapState(['headothertitle']),
         ...mapState(['swiperindex']),
        },
        watch: {
			headothertitle:function(li){
				this.title = li
			},
			swiperindex:function(li){
				this.swindex = li
			}
		},
		created() {
			
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