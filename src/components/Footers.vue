<template>
	<div class="foot">
		<ul class="clearfix">
	<li :class="{'active':index == nindex}" @click="exchange(index,item.text)" v-for="(item,index) in footerdata" :key="index">
  			<p><span :class="item.icon"></span></p>
			<p>{{item.text}}</p>
  </li>
		</ul>
	</div>
</template>

<script>
	import { mapState } from 'vuex'
	export default {
		data() {
			return {
				nindex:0,
				footerdata:[
				{
					'icon':'fa fa-comment-o',
					'text':'消息',
				},
				{
					'icon':'fa fa-user-circle',
					'text':'联系人',
				},
				{
					'icon':'fa fa-eye',
					'text':'看点',
				},
				{
					'icon':'fa fa-life-buoy',
					'text':'动态',
				},
				]
			}
		},
		methods: {
			exchange(index,text) {
				this.nindex = index
				this.$store.state.footerindex = index
				this.$store.state.headindextitle = text
			}
		},
		computed:{
         ...mapState(['footerindex']),
        },
		watch: {
			footerindex: function(li) {
				this.type = li
			}
		},
		mounted() {
	
		

		}
	}
</script>

<style lang="less" scoped="scoped">
.foot{
	width: 100%;
	height: 1.2rem;
	position: fixed;
	bottom: 0;
	background-color: #f2f2f2;
	ul{
		li{
			width: 25%;
			text-align: center;
			float: left;
			color: #b6b6b6;
			p{
				font-size: 0.25rem;
				span{
					font-size: 0.5rem;
				}
			}
			p:first-child{
				margin-top: 0.2rem;
			}
			p:nth-child(2){
				margin-top: 0.05rem;
			}
			
		}
	}
}	
.active{
	color: #3172DD !important;
}
</style>