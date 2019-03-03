import Vue from 'vue'
import main from './main.vue'
import index from './index.vue'
import myOrder from './myOrder.vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)
let router = new VueRouter({
	mode: 'history',
	base: '/wxdc',
	routes: [
	  {
	  	path: '/',
	  	name: 'index',
	  	component: index
	  },
	  {
	  	path: '/myorder',
	  	name: 'myorder',
	  	component: myOrder
	  }
	]
})
new Vue({
  el: '#main',
  router,
  render: h => h(main)
});