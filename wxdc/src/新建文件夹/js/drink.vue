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
  			food_list:[
          {img:require('../image/cola.jpg'),id:'food_1',name:'可乐',price:1,num:0},
          {img:require('../image/grapefruit-tea.jpg'),id:'food_2',name:'柚子茶',price:1,num:0},
          {img:require('../image/orange-juice.jpg'),id:'food_3',name:'橙汁',price:1,num:0},
          {img:require('../image/syrup-plum.jpg'),id:'food_4',name:'酸梅汤',price:1,num:0},
          {img:require('../image/sprite.jpg'),id:'food_5',name:'雪碧',price:1,num:0},
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