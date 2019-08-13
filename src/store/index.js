import Vue from "vue"
import VueX from "vuex"
Vue.use(VueX)
export default new VueX.Store({
	state:{
		footerindex:0,
		headindex:0,
		headtitle:"",
		headindextitle:'消息',
		headothertitle:'',
		swiperindex:1,
		friendinfos:[],
		refresh:0,
	},
	mutations:{
		updatehead(state,index){
			state.headindex = index;
		},
		updatefoot(state,index){
			state.footerindex = index;
		},
		updatetitle(state,index){
			state.headtitle = index;
		},
	},
	actions:{
		updatehead(context,index){
			context.commit ("updatehead",index);
		},
		updatefoot(context,index){
			context.commit ("updatefoot",index);
		},
		updatetitle(context,index){
			context.commit ("updatetitle",index);
		},
	},
	getters:{

	}
	
})