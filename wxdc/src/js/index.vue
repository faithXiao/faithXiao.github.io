<template>
	<div id="index">
		<template v-if="showMoneyImg">
			<money-img-component v-on:clear="clear" v-on:showOrder="showOrder" v-bind:desk="desk" v-bind:money="money"></money-img-component>
		</template>
		<header-component v-on:turn="turn" v-on:showOrder="showOrder" v-bind:desk="desk" v-bind:index="index"></header-component>
		<div id="content" v-on:touchstart="touchstart" v-on:touchmove="touchmove" v-on:touchend="touchend">
			<!--<keep-alive>
			  <component v-bind:is="current" v-on:sendAdd="sendAdd" v-on:sendMinus="sendMinus"></component>
			</keep-alive>-->

			<template v-for="componentList in componentState">
				<template v-if="componentList.loading">
					<loading-component></loading-component>
				</template>
				<template v-if="componentList.show">
					<keep-alive>
						<component v-bind:is="componentList.name" v-on:add="add" v-on:minus="minus" v-on:load="load"></component>
					</keep-alive>
				</template>
			</template>

			<div class="clearfix"></div>
		</div>
		<pay-component v-on:showImg="showImg" v-bind:orderInfo="orderInfo" v-bind:money="money" v-bind:desk="desk"></pay-component>
  </div>
</template>

<script type="text/javascript">
	import Vue from 'vue';
	import headerComponent from './header.vue'  //header组件
  import payComponent from './pay.vue'  //footer组件
  import loadingComponent from './loading.vue'  //loading组件

	const moneyImgComponent = Vue.component(  //图片金额二维码组件
		'moneyImgComponent', 
		function (resolve) {
	    require(['./moneyImg.vue'],resolve)
    }
  );
  const foodComponent= Vue.component(
  	'foodComponent',
  	function(resolve) {
  		require(['./food.vue'],resolve)
  	}
  );
  const noodleComponent= Vue.component(
  	'noodleComponent',
  	function(resolve) {
  		require(['./noodle.vue'],resolve)
  	}
  );
  const conjeeComponent= Vue.component(
  	'conjeeComponent',
  	function(resolve) {
  		require(['./conjee.vue'],resolve)
  	}
  );
  const drinkComponent= Vue.component(
  	'drinkComponent',
  	function(resolve) {
  		require(['./drink.vue'],resolve)
  	}
  );

	export default{
		components:{
			headerComponent,
			foodComponent,
			conjeeComponent,
			drinkComponent,
			payComponent,
			moneyImgComponent,
			loadingComponent
		},
	  data(){
		  return{
		  	orderInfo: [],  //点餐信息数组
		  	desk: '1',  //桌号
		  	money: 0,  //初始化金额
		  	showMoneyImg: false,  //金额二维码显示隐藏
		  	index: 0,  //初始组件位置
	      startX: 0,  //X，Y坐标值
	      startY: 0,
	      endX: 0,
	      endY: 0,
	      startDate: 0,  //触屏按下时间戳
	      endDate: 0,  //触屏抬起时间戳
	      slideState: '',  //滑动状态
	      componentState: [  //组件信息
	      	{
	      		name: 'food-component',  //组件名
	      		show: false,  //异步组件状态
	      		loading: true  //loading组件状态
	      	},
	      	{
	      		name: 'noodle-component',
	      		show: false,
	      		loading: true
	      	},
	      	{
	      		name: 'conjee-component',
	      		show: false,
	      		loading: true
	      	},
	      	{
	      		name: 'drink-component',
	      		show: false,
	      		loading: true
	      	}
	      ]
		  }
	  },
	  methods:{
	  	touchstart:function(event){
	  		var touch=event.targetTouches[0];
	  		this.endX=0;
	  		this.endY=0;
	  		this.startX=touch.pageX;
	  		this.startY=touch.pageY;
	  		this.startDate=+new Date();
	  	},
	  	touchmove:function(event){
	  		var touch=event.targetTouches[0];
	  		this.endX=touch.pageX;
	  		this.endY=touch.pageY;
	  		if(Math.abs(this.endY-this.startY)>Math.abs(this.endX-this.startX)){  //垂直距离大于水平距离
	  			if(this.slideState==""){  //防止先垂直再水平滑动出现紊乱，只能出现单向滑动
	  				this.slideState="noSlide";  //禁止左右滑动
	  			}
	  		}else{  //同理
	  			if(this.slideState==""){
	  				this.slideState="slide";
	  			}
	  		}
	  		if(this.slideState=="slide"){
	  			event.preventDefault();  //若允许左右滑动，则阻止浏览器默认垂直滚动事件
	  			if(this.index==0&&(this.endX-this.startX)>0){  //第一页则不可右滑动
	  				this.startX=this.endX;
	  				return;
	  			}else if(this.index==3&&(this.endX-this.startX)<0){  //最后一页则不可左滑动
	  				this.startX=this.endX;
	  				return;
	  			}else{
	  			  $("#content").css("left",(-this.index*640+this.endX-this.startX)+'px');
	  			}
	  		}
	  	},
	  	touchend:function(event){
	  		this.endDate=+new Date();
	  		var timeDifference=this.endDate-this.startDate;  //滑动时间间隔
	  		var distanceX=this.endX-this.startX;  //滑动距离
	  		if(this.slideState=="slide"){
	  			if(timeDifference<=250&&distanceX>60&&this.index>0){  //时间间隔小于250ms 距离大于60
	  				this.index--;  //右滑
	  			}else if(timeDifference<=250&&distanceX<-60&&this.index<3){
	  				this.index++;  //左滑
	  			}else if(distanceX>=160&&this.index>0){  //距离大于160
	  				this.index--;  //右滑
	  			}else if(distanceX<=-160&&this.index<3){
	  				this.index++;  //左滑
	  			}
	  			var _this=this;
	  			$("#content").animate(  //滑动动画
	  				{ left: -this.index*640+'px' },
	  				150,
	  				function(){
	  				  _this.componentState[_this.index].show=true;  //动画执行完后加载异步组件
	  				}
	  			);
	  		}
	  		this.slideState="";  //清空滑动状态
	  	},
	  	load:function(){  //异步组件加载完后隐藏loading状态组件
	  		this.componentState[this.index].loading=false;
	  	},
	  	add:function(name,num,price){
	  		this.money=0;
	  		if(this.orderInfo.length==0){
	  			this.orderInfo.push({food_name:name,food_num:num,food_price:price});
	  		}else{
	  			let j=0;
	  			let i;
	  			for(i=0; i<this.orderInfo.length; i++){
	  				if(this.orderInfo[i].food_name==name){
	  					this.orderInfo[i].food_num++;
	  				}else{
	  					j++;
	  				}
	  			}
	  			if(j==i){
	  				this.orderInfo.push({food_name:name,food_num:num,food_price:price});
	  			}
	  		}
	  		for(let i=0; i<this.orderInfo.length; i++){
	  			this.money+=this.orderInfo[i].food_num*this.orderInfo[i].food_price;
	  		}
	  	},
	  	minus:function(name,price){
	  		this.money=0;
	  		for(let i=0; i<this.orderInfo.length; i++){
	  			if(this.orderInfo[i].food_name==name){
	  				this.orderInfo[i].food_num--;
	  				if(this.orderInfo[i].food_num==0){
	  			    this.orderInfo.splice(i,1)
	  		    }
	  				break;
	  			}
	  		}
	  		for(let i=0; i<this.orderInfo.length; i++){
	  			this.money+=this.orderInfo[i].food_num*this.orderInfo[i].food_price
	  		}
	  	},
	  	turn:function(index){  //组件切换
  		  this.index=index;
  		  var _this=this;
	 			$("#content").animate(  //滑动动画
  				{ left: -this.index*640+'px' },
  				150,
  				function(){
  				  _this.componentState[_this.index].show=true;
  				}
  			);
	  	},
	  	showImg:function () {  //图片金额二维码组件显示隐藏
				this.showMoneyImg = !this.showMoneyImg;
			},
			clear:function(){
				window.location.reload();
			},
			showOrder:function(){  //调用订单信息组件
				this.$emit('turn','myordercomponent');
			}
	  },
	  created:function(){
	  	this.componentState[0].show=true;  //初始化加载第一个组件
	  },
	}
</script>

<style>

</style>