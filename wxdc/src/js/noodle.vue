<template>
  <div class="container-fluid food">
    <div class="food-list" v-for="(food,index) in food_list">
      <div class="food-img float-left">
        <img v-bind:src="food.img" class="img-fluid rounded">
      </div>
      <div class="food-info float-left">
        <span class="d-block">{{ food.name }}</span>
        <span class="d-block">{{ food.price }}元/份</span>
      </div>
      <div class="food-choose float-right">
        <span class="float-left" v-show="food.num" v-on:click="minus(index)"></span>
        <span v-show="food.num">{{ food.num }}</span>
        <span class="float-right" v-on:click="add(index)"></span>
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
          {img:require('../image/Lanzhou-beef-noodles.jpeg'),name:'兰州牛肉面',price:8,num:0},
          {img:require('../image/Daoxiao-noodles.jpg'),name:'刀削面',price:8,num:0},
          {img:require('../image/fried-sauce-noodles.jpg'),name:'炸酱面',price:8,num:0},
          {img:require('../image/stewed-noodles.jpg'),name:'烩面',price:8,num:0},
          {img:require('../image/tomato-egg-noodles.jpg'),name:'西红柿鸡蛋面',price:8,num:0},
          {img:require('../image/Chongqing-small-noodles.jpg'),name:'重庆小面',price:8,num:0},
          {img:require('../image/plain-noodle-soup.jpg'),name:'阳春面',price:8,num:0},
        ],
      }
    },
    mounted:function(){
      this.$emit('load');
    },
    methods:{
      add:function(index){
        this.food_list[index].num++;
        this.$emit('add',this.food_list[index].name,this.food_list[index].num,this.food_list[index].price)
      },
      minus:function(index){
        this.food_list[index].num--;
        this.$emit('minus',this.food_list[index].name,this.food_list[index].price)
      },
    }
  }
</script>

<style type="text/css">

</style>