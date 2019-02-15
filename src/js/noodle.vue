<template>
  <div id="food" class="container-fluid">
  	<div class="food-list" v-for="(food,index) in food_list" :key="food.id">
      <div class="food-img float-left">
        <img v-bind:src="food.img" class="img-fluid rounded">
      </div>
      <div class="food-info float-left">
        <span class="d-block">{{ food.name }}</span>
        <span class="d-block">{{ food.price }}元/份</span>
      </div>
      <div class="food-choose float-right">
        <span class="d-block float-left" v-if="food.num" v-on:mousedown="minus(index)">-</span>
        <span class="d-block float-left" v-if="food.num">{{ food.num }}</span>
        <span class="d-block float-right" v-on:mousedown="add(index)">+</span>
      </div>
      <div class="clearfix"></div>
    </div>
  </div>
</template>

<script type="text/javascript">
  export default{
  	data(){
  		return{
  			food_list:[
          {img:require('../image/Lanzhou-beef-noodles.jpeg'),id:'food_1',name:'兰州牛肉面',price:1,num:0},
          {img:require('../image/Daoxiao-noodles.jpg'),id:'food_2',name:'刀削面',price:1,num:0},
          {img:require('../image/fried-sauce-noodles.jpg'),id:'food_3',name:'炸酱面',price:1,num:0},
          {img:require('../image/stewed-noodles.jpg'),id:'food_4',name:'烩面',price:1,num:0},
          {img:require('../image/tomato-egg-noodles.jpg'),id:'food_5',name:'西红柿鸡蛋面',price:1,num:0},
          {img:require('../image/Chongqing-small-noodles.jpg'),id:'food_6',name:'重庆小面',price:1,num:0},
          {img:require('../image/plain-noodle-soup.jpg'),id:'food_7',name:'阳春面',price:1,num:0},
        ],
  		}
  	},
    methods:{
      add:function(index){
        this.food_list[index].num++;
        this.$emit('add',this.food_list[index].id,this.food_list[index].name,this.food_list[index].num,this.food_list[index].price)
      },
      minus:function(index){
        this.food_list[index].num--;
        this.$emit('minus',this.food_list[index].id,this.food_list[index].price)
      },
    }
  }
</script>

<style type="text/css">

</style>