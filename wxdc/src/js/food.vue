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
        <span class="d-inline-block float-left" v-if="food.num" v-on:mousedown="minus(index)">-</span>
        <span class="d-inline-block" v-if="food.num">{{ food.num }}</span>
        <span class="d-inline-block float-right" v-on:mousedown="add(index)">+</span>
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
          {img:require('../image/bean-curd.jpg'),id:'food_1',name:'麻婆豆腐盖饭',price:1,num:0},
          {img:require('../image/braised-eggplant.jpg'),id:'food_2',name:'红烧茄子盖饭',price:1,num:0},
          {img:require('../image/green-pepper-bacon.jpg'),id:'food_3',name:'尖椒腊肉盖饭',price:1,num:0},
          {img:require('../image/green-pepper-shredded-meat.jpg'),id:'food_4',name:'青椒肉丝盖饭',price:1,num:0},
          {img:require('../image/kung-pao-chicken.jpg'),id:'food_5',name:'宫保鸡丁盖饭',price:1,num:0},
          {img:require('../image/leek-egg.jpg'),id:'food_6',name:'韭菜鸡蛋盖饭',price:1,num:0},
          {img:require('../image/sour-hot-potato.png'),id:'food_7',name:'酸辣土豆丝盖饭',price:1,num:0},
          {img:require('../image/stew-pork.jpg'),id:'food_8',name:'回锅肉盖饭',price:1,num:0},
          {img:require('../image/tomato-agg.png'),id:'food_9',name:'西红柿鸡蛋盖饭',price:1,num:0},
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