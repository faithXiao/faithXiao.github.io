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
        food_list: [
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
  		}
  	},
    mounted:function(){
      this.$emit('load');
    },
    methods:{
      add:function(index){
        this.food_list[index].num++;
        this.$emit('add',this.food_list[index].name,this.food_list[index].num,this.food_list[index].price);
      },
      minus:function(index){
        if(this.food_list[index].num>0){
          this.food_list[index].num--;
          this.$emit('minus',this.food_list[index].name,this.food_list[index].price)
        }
      },
    }
  }
</script>

<style type="text/css">

</style>