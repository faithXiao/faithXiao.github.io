<template>
	<div id="index">
		<template v-if="showMoneyImg">
			<money-img-component v-on:clear="clear" v-on:showOrder="showOrder" v-bind:desk="desk" v-bind:money="money"></money-img-component>
		</template>
		<header-component v-on:turn="turn" v-on:showOrder="showOrder" v-bind:desk="desk" v-bind:index="index"></header-component>
		<div id="content" v-on:touchstart="touchstart" v-on:touchmove="touchmove" v-on:touchend="touchend" v-on:touchcancel="touchcancel">
			<!--<keep-alive>
			  <component v-bind:is="current" v-on:sendAdd="sendAdd" v-on:sendMinus="sendMinus"></component>
			</keep-alive>-->

			<template v-for="componentList in componentState">
				<template v-if="componentList.loading">
					<loading-component></loading-component>
				</template>
				<template v-if="componentList.show">
					<keep-alive>
						<food-component v-bind:foodList="componentList.foodList" v-on:add="add" v-on:minus="minus" v-on:load="load"></food-component>
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
  import foodComponent from './food.vue'

	const moneyImgComponent = Vue.component(  //图片金额二维码组件
		'moneyImgComponent', 
		function (resolve) {
	    require(['./moneyImg.vue'],resolve)
    }
  );

	export default{
		components:{
			headerComponent,
			foodComponent,
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
	      globalID: null,
	      componentState: [  //组件信息
	      	{
	      		show: false,  //异步组件状态
	      		loading: true,  //loading组件状态
	      		foodList: [
		          {img:require('../image/bean-curd.jpg'),name:'麻婆豆腐盖饭',price:8,num:0},
		          {img:require('../image/braised-eggplant.jpg'),name:'红烧茄子盖饭',price:8,num:0},
		          {img:require('../image/green-pepper-bacon.jpg'),name:'尖椒腊肉盖饭',price:8,num:0},
		          {img:require('../image/green-pepper-shredded-meat.jpg'),name:'青椒肉丝盖饭',price:8,num:0},
		          {img:require('../image/kung-pao-chicken.jpg'),name:'宫保鸡丁盖饭',price:8,num:0},
		          {img:require('../image/leek-egg.jpg'),name:'韭菜鸡蛋盖饭',price:8,num:0},
		          {img:require('../image/sour-hot-potato.png'),name:'酸辣土豆丝盖饭',price:8,num:0},
		          {img:require('../image/stew-pork.jpg'),name:'回锅肉盖饭',price:8,num:0},
		          {img:require('../image/tomato-agg.png'),name:'西红柿鸡蛋盖饭',price:8,num:0},
		        ],
	      	},
	      	{
	      		show: false,
	      		loading: true,
	      		foodList:[
		          {img:require('../image/Lanzhou-beef-noodles.jpeg'),name:'兰州牛肉面',price:8,num:0},
		          {img:require('../image/Daoxiao-noodles.jpg'),name:'刀削面',price:8,num:0},
		          {img:require('../image/fried-sauce-noodles.jpg'),name:'炸酱面',price:8,num:0},
		          {img:require('../image/stewed-noodles.jpg'),name:'烩面',price:8,num:0},
		          {img:require('../image/tomato-egg-noodles.jpg'),name:'西红柿鸡蛋面',price:8,num:0},
		          {img:require('../image/Chongqing-small-noodles.jpg'),name:'重庆小面',price:8,num:0},
		          {img:require('../image/plain-noodle-soup.jpg'),name:'阳春面',price:8,num:0},
		        ],
	      	},
	      	{
	      		show: false,
	      		loading: true,
	      		foodList:[
              {img:require('../image/lily-almond-gruel.jpg'),name:'百合杏仁粥',price:8,num:0},
              {img:require('../image/purple-sweet-potato-gruel.jpeg'),name:'紫薯小米粥',price:8,num:0},
              {img:require('../image/jujube-yam.jpg'),name:'红枣山药粥',price:8,num:0},
              {img:require('../image/red-bean-millet-gruel.png'),name:'红豆薏米粥',price:8,num:0},
              {img:require('../image/tremella-lotus-porridge.jpeg'),name:'银耳莲子粥',price:8,num:0},
              {img:require('../image/sydney-rice-gruel.jpeg'),name:'雪梨小米粥',price:8,num:0},
            ]
	      	},
	      	{
	      		show: false,
	      		loading: true,
	      		foodList:[
              {img:require('../image/cola.jpg'),name:'可乐',price:5,num:0},
              {img:require('../image/grapefruit-tea.jpg'),name:'柚子茶',price:5,num:0},
              {img:require('../image/orange-juice.jpg'),name:'橙汁',price:5,num:0},
              {img:require('../image/syrup-plum.jpg'),name:'酸梅汤',price:5,num:0},
              {img:require('../image/sprite.jpg'),name:'雪碧',price:5,num:0},
            ],
	      	}
	      ],
		  }
	  },
	  methods:{
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
	  	touchstart:function(event){
	  		var touch=event.targetTouches[0];
	  		this.endX=0;
	  		this.endY=0;
	  		this.startX=touch.pageX;
	  		this.startY=touch.pageY;
	  		this.startDate=+new Date();
	  	},
	  	animation: function(event){
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
	  			  $("#content").css("transform",'translateX('+(this.endX-this.startX-this.index*640)+'px)');  //触屏滑动
	  			}
	  		}
	  	},
	  	touchmove:function(event){
	  		this.globalID=window.requestAnimationFrame( () => {
          this.animation(event);
        });
	  	},
	  	touchend:function(event){
	  		cancelAnimationFrame(this.globalID);
	  		this.endDate=+new Date();
	  		var timeDifference=this.endDate-this.startDate;  //滑动时间间隔
	  		var distanceX=this.endX-this.startX;  //滑动距离
	  		if(this.slideState=="slide"){
	  			if(timeDifference<=250&&distanceX>60&&this.index>0){  //时间间隔小于250ms 距离大于60
	  				this.index--;  //右滑切换组件
	  			}else if(timeDifference<=250&&distanceX<-60&&this.index<3){
	  				this.index++;  //左滑切换组件
	  			}else if(distanceX>=160&&this.index>0){  //距离大于160
	  				this.index--;  //右滑
	  			}else if(distanceX<=-160&&this.index<3){
	  				this.index++;  //左滑
	  			}
	  			$("#content").css({  //滑动动画
	  				'transform': 'translateX('+(-this.index*640)+'px)',
	  				'transition': 'transform 0.25s linear' 
	  			});
	  			this.componentState[this.index].show=true;  //调用加载异步组件
	  		}
	  		this.slideState="";  //清空滑动状态
	  	},
	  	touchcancel:function(){
				$("#content").css({  //滑动动画
					'transform': 'translateX('+(-this.index*640)+'px)',
					'transition': 'transform 0.25s linear' 
				});
	  	},
	  	load:function(){  //异步组件加载完后隐藏loading状态组件
	  		this.componentState[this.index].loading=false;
	  	},
	  	turn:function(index){  //组件切换
  		  this.index=index;
  			$("#content").css({  //滑动动画
  				'transform': 'translateX('+(-this.index*640)+'px)',
  				'transition': 'transform 0.25s linear' 
  			})
  			this.componentState[this.index].show=true;  //调用加载异步组件
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