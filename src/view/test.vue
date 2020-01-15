<template>
	<div class="login-bg">
		<div class="head" ref="head">23253</div>
		<div class="one" ref="one"></div>
		<div class="two" ref="two"></div>
		<div style="position: fixed;visibility: hidden;height: 0.2rem;" ref="hiddenheight"></div>
		<div class="list" :style="{height:height+'px'}">
		<div style="margin-top: 0.2rem;">
			<ul>
				<li>564564554</li>
				<li>564564554</li>
				<li>564564554</li>
				<li>564564554</li>
				<li>564564554</li>
				<li>564564554</li>
				<li>564564554</li>
				<li>564564554</li>
				<li>564564554</li>
				<li>564564554</li>
				<li>564564554</li>
				<li>564564554</li>
				<li>564564554</li>
				<li>564564554</li>
			</ul>
		</div>	
			
		</div>
		<div class="foot" ref="foot"></div>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				height:'',
			}
		},
		methods:{
			setheights() {
				var offsetHeight = window.innerHeight
				var detail = this.$refs.detail.offsetHeight
				var nav = this.$refs.nav.offsetHeight
				var foot = this.$refs.foot.offsetHeight
				var hiddenheight = this.$refs.hiddenheight.offsetHeight;
				var px = document.getElementById('head')
				var spx = px.offsetHeight;
				this.height = offsetHeight - detail - nav - foot - spx - hiddenheight * 2
			},
			setheight(){
				var offheight = window.innerHeight
				var scen = this.$refs.head.offsetHeight  
				var one = this.$refs.one.offsetHeight
				var two = this.$refs.two.offsetHeight
				var foot = this.$refs.foot.offsetHeight
				var hiddenheight = this.$refs.hiddenheight.offsetHeight 
				this.height =offheight-scen - foot - one -two - hiddenheight*2
			},
			saber(){
				alert("dsf")
			}
		},
		created(){
			setTimeout(()=>{
				this.setheight()
			},0)
		}
	}
</script>

<style lang="less" scoped="scoped">
.head{
	height: 1rem;
	width: 100%;
	font-size: 0.3rem;
	border-bottom: 1px solid #ccc;
	background-color: #fff;
}
.list{
	overflow-y: auto;
	font-size: 0.3rem;
}
.foot{
	position: fixed;
	bottom: 0;
	left: 0;
	width: 100%;
	height: 1rem;

	background-color: #0099FF;
}
.list{
	position: relative;

	li{
		height: 1rem;
			background-color: #fff;
		line-height: 1rem;
	}
}
.one{
	background-color: #fff;
	height:3rem;
	margin: 0.2rem 0;
}
.two{
	background-color: #fff;
	height: 1rem;
}
</style>