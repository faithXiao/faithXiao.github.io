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
          {img:require('../image/lily-almond-gruel.jpg'),id:'food_1',name:'百合杏仁粥',price:1,num:0},
          {img:require('../image/purple-sweet-potato-gruel.jpeg'),id:'food_2',name:'紫薯小米粥',price:1,num:0},
          {img:require('../image/jujube-yam.jpg'),id:'food_3',name:'红枣山药粥',price:1,num:0},
          {img:require('../image/red-bean-millet-gruel.png'),id:'food_4',name:'红豆薏米粥',price:1,num:0},
          {img:require('../image/tremella-lotus-porridge.jpeg'),id:'food_5',name:'银耳莲子粥',price:1,num:0},
          {img:require('../image/sydney-rice-gruel.jpeg'),id:'food_6',name:'雪梨小米粥',price:1,num:0},
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