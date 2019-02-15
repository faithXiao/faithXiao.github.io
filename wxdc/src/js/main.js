import Vue from 'vue'
import Main from './main.vue'
//import VueTouch from 'vue-touch'
//Vue.use(VueTouch,{name: 'v-touch'});
//import "../../node_modules/babel-polyfill/dist/polyfill.min.js"
new Vue({
  el: '#main',
  render: h => h(Main)
});