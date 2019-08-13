<template>
  <div class="modal-pr">
  	<div v-if="flag == true">
	<div class="modal-body-pr">
		<p>{{Titles}}</p>
	</div>
	</div>
  </div>
</template>

<script>
export default {
  data () {
    return {
			flag:false,
    }
  },
  props:{
Titles:{
  type:String,
},
Flagt:{
	
},

},
methods:{

},
watch: {  //监听计时器
			Flagt: {
				handler(newVal) {
					console.log(newVal)
					this.flag = newVal;
					if(newVal==true){
						setTimeout(() => {
this.flag = false
this.$emit("pro",false)
   }, 2000);
					}
				}
			},

		},


}
</script>

<style lang="less" scoped>
.modal-pr{
	.modal-body-pr{
		position: fixed;
		left: 11%;
		top: 50%;
		width: 6rem;
		height: auto;
		background-color: rgba(0,0,0,0.5);
		border-radius: 5px;
		text-align: center;
		z-index:999;
		p{
			font-size: 0.35rem;
			padding: 0.2rem 0.6rem 0.2rem 0.6rem;
			color: #fff;
		}
		.confirm{
			border-top: 1px solid #ccc;
			display: flex;
			li{
			width: 3rem;
			float: left;
			height: 1rem;
			display: flex;
			align-items: center;
			justify-content: center;
			font-size: 0.3rem;
			color:#3399FF;
			}
			li:first-child{
				border-right: 1px solid #ccc;
			}
		}
	}
}

</style>
