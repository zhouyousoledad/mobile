// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import axios from 'axios' //引入axios
import Mint from 'mint-ui';
import VueAwesomeSwiper from 'vue-awesome-swiper'
import 'swiper/dist/css/swiper.css'
import store from './store'
import 'mint-ui/lib/style.css'
import 'font-awesome/css/font-awesome.css'
Vue.use(Mint);
Vue.use(VueAwesomeSwiper);
Vue.config.productionTip = false

/* eslint-disable no-new */
router.beforeEach((to, from, next) => {
	if(to.path === '/index/chat') { 
//		store.dispatch("updatehead",1);
//		store.dispatch("updatefoot",1);

	}
	next();
	})
new Vue({
  el: '#app',
  router,
  store,
  axios,
  components: { App },
  template: '<App/>'
})
