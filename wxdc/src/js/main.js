import Vue from 'vue'
import main from './main.vue'
import index from './index.vue'
import myOrder from './myOrder.vue'
import VueRouter from 'vue-router'
import Vuex from 'vuex'

Vue.use(VueRouter)
Vue.use(Vuex)
let store = new Vuex.Store({
	state: {
		orderInfo: [],
		money: 0
	},
	mutations: {
		increment(state,foodObj){
			let j=0;
			let i;
			for(i=0; i<state.orderInfo.length; i++){
				if( state.orderInfo[i].food_name == foodObj.name){
					state.orderInfo[i].food_num=foodObj.num;
          state.money+=foodObj.price;
          i++;
          break;
				}else{
					j++;
				}
			}
			if(j==i){
				state.orderInfo.push(
					{
						food_name: foodObj.name,
						food_num: foodObj.num,
						food_price: foodObj.price
					}
				);
        state.money+=foodObj.price;
			}
		},
		decrement(state,foodObj){
  		for(let i=0; i<state.orderInfo.length; i++){
  			if( state.orderInfo[i].food_name == foodObj.name){
  				state.orderInfo[i].food_num=foodObj.num;
  				if( state.orderInfo[i].food_num == 0){
  			    state.orderInfo.splice(i,1);
  		    }
  				break;
  			}
  		}
  		state.money-=foodObj.price;
		}
	}
}) 
let router = new VueRouter({
	mode: 'history',
	base: '/',
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
  store,
  render: h => h(main)
});