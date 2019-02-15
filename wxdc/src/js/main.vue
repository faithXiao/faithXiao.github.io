<template>
	<div id="main">
		<template v-if="show">
			<money-img-component v-on:hiddenimg="toggle" v-bind:desknum="desk" v-bind:food_money="money"></money-img-component>
		</template>
		<headercomponent v-on:turn="turn" v-bind:desknum="desk"></headercomponent>
    <div id="content" style="position: relative;" v-on:touchstart="touchstart" v-on:touchmove="touchmove" v-on:touchend="touchend">
  		<keep-alive>
		    <component v-bind:is="current" v-on:add="add" v-on:minus="minus"></component>
		  </keep-alive>
    </div>
		<paycomponent v-on:showimg="toggle" v-bind:food_info="select" v-bind:food_money="money" v-bind:desknum="desk"></paycomponent>
  </div>
</template>

<script type="text/javascript">
import Vue from 'vue'
const moneyImgComponent = Vue.component('moneyImgComponent', function (resolve) {
	require(['./moneyImg.vue'], resolve);
});
import headercomponent from './header.vue'
import foodcomponent from './food.vue'
import noodlecomponent from './noodle.vue'
import conjeecomponent from './conjee.vue'
import drinkcomponent from './drink.vue'
import paycomponent from './pay.vue'
export default{
	components:{
		headercomponent,
		foodcomponent,
		noodlecomponent,
		conjeecomponent,
		drinkcomponent,
		paycomponent,
		moneyImgComponent
	},
  data(){
	  return{
	  	select: [],
	  	currents: ['foodcomponent','noodlecomponent','conjeecomponent','drinkcomponent'],
	  	current: 'foodcomponent',
	  	desk: '1',
	  	money: 0,
	  	show: false,
	  	index: 0,
      startX: 0,
      startY: 0,
      endX: 0,
      endY: 0,
      startDate: 0,
      endDate: 0,
      state: ''
	  }
  },
  methods:{
    touchstart:function(event){
      var touch=event.targetTouches[0];
      this.endX=0;
      this.endY=0;
      this.startX=touch.pageX;
      this.startY=touch.pageY;
      var d=new Date();
      this.startDate=d.getTime();
    },
    touchmove:function(event){
      var touch=event.targetTouches[0];
      this.endX=touch.pageX;
      this.endY=touch.pageY;
      if(Math.abs(this.endY-this.startY)>Math.abs(this.endX-this.startX)){
        if(this.state==""){
          this.state="noSlide";
        }
      }else{
        if(this.state==""){
          this.state="slide";
        }
      }
      if(this.state=="slide"){
        event.preventDefault();
        $("#content").css("left",(this.endX-this.startX)+'px');
      }
    },
    touchend:function(event){
      var d=new Date();
      this.endDate=d.getTime();
      var timeDifference=this.endDate-this.startDate;
      var distanceX=this.endX-this.startX;
      if(this.state=="slide"){
        if(timeDifference<=250&&distanceX>60&&this.index>0){
          this.index--;
          this.current=this.currents[this.index];
        }else if(timeDifference<=250&&distanceX<-60&&this.index<3){
          this.index++;
          this.current=this.currents[this.index];
        }else if(distanceX>=160&&this.index>0){
          this.index--;
          this.current=this.currents[this.index];
        }else if(distanceX<=-160&&this.index<3){
          this.index++;
          this.current=this.currents[this.index];
        }
        $("#header ul li").eq(this.index).children().addClass("active").end().siblings().children().removeClass("active");
        $("#content").animate({left:"0"},150);
      }
      this.state="";
    },
  	add:function(id,name,num,price){
  		this.money=0;
  		if(this.select.length==0){
  			this.select.push({food_id:id,food_name:name,food_num:num,food_price:price});
  		}else{
  			let j=0;
  			let i;
  			for(i=0; i<this.select.length; i++){
  				if(this.select[i].food_id==id){
  					this.select[i].food_num++;
  				}else{
  					j++;
  				}
  			}
  			if(j==i){
  				this.select.push({food_id:id,food_name:name,food_num:num,food_price:price});
  			}
  		}
  		for(let i=0; i<this.select.length; i++){
  			this.money+=this.select[i].food_num*this.select[i].food_price;
  		}
  	},
  	minus:function(id,price){
  		this.money=0;
  		for(let i=0; i<this.select.length; i++){
  			if(this.select[i].food_id==id){
  				this.select[i].food_num--;
  				if(this.select[i].food_num==0){
  			    this.select.splice(i,1)
  		    }
  				break;
  			}
  		}
  		for(let i=0; i<this.select.length; i++){
  			this.money+=this.select[i].food_num*this.select[i].food_price
  		}
  	},
  	turn:function(component,index){
  		this.current=component;
  		this.index=index;
  	},
  	toggle:function(){
			this.show = !this.show;
		}
  }
};

</script>

<style type="text/css">

</style>