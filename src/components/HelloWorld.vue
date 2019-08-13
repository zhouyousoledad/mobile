<template>
<div>
	<header style="font-size: 22px;">测试文档1-1</header>
	<p class="title">测试使用账户 admin</p>
	<p class="title"><span>测试使用浏览器 360</span><a href="../../static/img/测试文档.rar">下载文档及详情文件</a>
		<span>文档更新时间：2019年6月14日 12:00</span>
	</p>
	<router-link tag="div" :to="{path:'/index/sindex'}" style="position: fixed;right: 0;top:0">
	你没有看到这段字，对吧	
	</router-link>
	<ul class="listq">
		<li v-for="(item,index) in qudata">
			<p>{{item.text}}</p>
			<img :src="item.src">
		</li>
	</ul>
	<!--<mt-header fixed title="固定在顶部">
		<router-link to="/" slot="left">
    <mt-button icon="back">{{loading}}</mt-button>
  </router-link>
	</mt-header>
	<mt-loadmore :top-method="loadTop"  :bottom-all-loaded="allLoaded" ref="loadmore" style="margin-top: 40px;">
	<ul
  v-infinite-scroll="loadMore"
  infinite-scroll-disabled="loading"
  infinite-scroll-distance="10" class="more">
  <li v-for="item in list">{{ item }}</li>
<div style="display: flex;align-items: center;justify-content: center;">
	<mt-spinner type="fading-circle" :size="20"></mt-spinner>
	<span style="padding-left: 12px;">加载中</span>
</div>
</ul>
</mt-loadmore>-->
	<!--<mt-tab-container v-model="active" swipeable>
  <mt-tab-container-item id="tab-container1">
    <mt-cell v-for="(n,index) in 10" :key="index" title="tab-container 1"></mt-cell>
  </mt-tab-container-item>
  <mt-tab-container-item id="tab-container2">
    <mt-cell v-for="(n,index) in 5" :key="index" title="tab-container 2"></mt-cell>
  </mt-tab-container-item>
  <mt-tab-container-item id="tab-container3">
    <mt-cell v-for="(n,index) in 7" :key="index" title="tab-container 3"></mt-cell>
  </mt-tab-container-item>
</mt-tab-container>-->

	<!--<mt-button type="default" @click="saber">default</mt-button>
	<mt-button type="primary" @click="load">primary</mt-button>
	<mt-button type="primary" @click="modal">primary4</mt-button>
	<mt-cell title="标题文字" is-link>-->
		
  <!--<span style="color: green">这里是元素</span>-->
<!--</mt-cell>
<mt-cell-swipe
  title="标题文字"
  :right="[
    {
      content: 'Delete',
      style: { background: 'red', color: '#fff' },
      handler: () => this.$messagebox('delete')
    }
  ]"></mt-cell-swipe>
	<mt-actionsheet
  :actions="actions"
  v-model="sheetVisible">
</mt-actionsheet>-->
	<!--<div style="width: 100%;height: 50px;background-color: aqua;"></div>-->
	<!--<mt-loadmore :top-method="loadTop" :bottom-method="loadBottom" :bottom-all-loaded="allLoaded" ref="loadmore">
  <ul class="more">
    <li v-for="item in list">{{ item }}</li>
  </ul>
</mt-loadmore>-->
 </div>

</template>

<script>
	import { Toast } from 'mint-ui';
	import { Indicator } from 'mint-ui';
	import { MessageBox } from 'mint-ui';
export default {
  name: 'HelloWorld',
  data () {
  	let that = this;
    return {
  			toastInstanse: '',
  			allLoaded:false,
  			loading:false,
  			list:[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20],
  			sheetVisible:false,
  			actions:[
  			{"name":"servent","method":this.archur},
  			{"name":"lancer","method":this.kfl},
  			],
  			active:'tab-container1',
  			qudata:[
  			{
  				text:'问题1、用户管理页面下面有一块空白',
  				src:'../../static/img/1-1.gif'
  			},
  			{
  				text:'问题2、答题页面单选框和多选框不能选中',
  				src:'../../static/img/2-1.gif'
  			},
  			{
  				text:'问题3、跳题的时候，之前做过的题目的答案没有回显',
  				src:'../../static/img/3-1.gif'
  			},
  			{
  				text:'问题4、查看答题分析时，未答的题目的考生答案是空的',
  				src:'../../static/img/22.png'
  			},
  			{
  				text:'问题5、批改试卷在批改完成后仍出现在未批改中',
  				src:'../../static/img/4-1.gif'
  			},
  			{
  				text:'问题6 、培训视频没有自动播放',
  				src:'../../static/img/5-1.gif'
  			},
  			{
  				text:'问题7 、培训分类的下拉菜单在360浏览器下变乱',
  				src:'../../static/img/11.png'
  			},
  			{
  				text:'问题8 、练习考试重复题目次数过多',
  				src:'../../static/img/6-1.gif'
  			},
  			{
  				text:'问题9 、错题练习的单选框不能选中',
  				src:'../../static/img/7-1.gif'
  			},
  			{
  				text:'问题10、已经完成的考试，仍然出现在培训考试列表中',
  				src:'../../static/img/8-1.gif'
  			},
  			{
  				text:'问题11、已经结束的考试，在查询成绩的时候显示在考试中的列表中',
  				src:'../../static/img/9-1.gif'
  			},
  			{
  				text:'问题12、已经结束的考试（考试试卷：‘pc测试未答’）没有出现在批改试卷列表中',
  				src:'../../static/img/10-1.gif'
  			},
  			{
  				text:'问题13、两种浏览器首页的数据不一致(左为360，右为谷歌)',
  				src:'../../static/img/33.png'
  			},
  			{
  				text:'问题14、360浏览器下，学习ppt，课件积分并没有增加',
  				src:'../../static/img/11-1.gif',
  			}
  			],
    }
  },
  methods: {    
 		saber(){
 			this.show()
 			setTimeout(() => {
        //在setTimeout中，要用箭头函数，否则会改变作用域
        // 当 3 秒过后，数据获取回来了，要把 Toast 移除
        this.toastInstanse.close();
      }, 10000);
 		},
 		    show() {
      // 每当调用的时候，Toast 有一个返回值，这个返回值 重新赋值给 toastInstanse ,以至于后边手动关闭Toast
      this.toastInstanse = Toast({
        message: "2秒我就消失", //弹窗内容
        position: "middle", //弹窗位置
        duration: -1, //弹窗时间毫秒,如果值为-1，则不会消失
        iconClass: 'icon icon-success',
        className: "mytoast" //自定义Toast 样式，需要自己提供一个类名
      });
    },
    archur(){
    	console.log('Archur')
    },
    kfl(){
    	console.log('lancer')
    },
    loadMore() {
//this.loading = true;
  setTimeout(() => {
    let last = this.list[this.list.length - 1];
    for (let i = 1; i <= 10; i++) {
      this.list.push(last + i);
    }
    this.loading = false;
  }, 3000);
},
    load(){
    	Indicator.open({
  text: 'Loading...',
  spinnerType: 'fading-circle'
});
setTimeout(() => {
        //在setTimeout中，要用箭头函数，否则会改变作用域
        // 当 3 秒过后，数据获取回来了，要把 Toast 移除
        Indicator.close();
      }, 3000);

   },
   loadTop() {

//this.$refs.loadmore.onTopLoaded();  //关闭方法
},
loadBottom() {

this.allLoaded = true;// 如果全部数据加载完毕
//this.$refs.loadmore.onBottomLoaded(); //关闭方法
},
modal(){
//MessageBox.confirm('确定执行此操作?').then(action => {
//console.log("dsaf")
//});
	 MessageBox.confirm('', { 
 message: 'xxx,你确定？', 
 title: '提示', 
 confirmButtonText: 'abc', 
 cancelButtonText: '123' 
 }).then(action => { 
 if (action == 'confirm') {     //确认的回调
 console.log(1); 
 }
 }).catch(err => { 
 if (err == 'cancel') {     //取消的回调
 console.log(2);
 } 
 });

}
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
.refresh-desc{  
	text-align: center;
}
.more{
	height: 600px;
	overflow-y: auto;
}
.more li{
	padding: 15px 0;
	background-color: #f5f5f5;
}
.title{
	font-size: 18px;
}
.listq{
	margin-top: 30px;
	li{
		p{
			font-size: 30px;
			font-weight: 600;
			margin-bottom: 15px;
			margin-top: 15px;
		}
		img{
			width: 80%;
		}
	}
}
</style>
