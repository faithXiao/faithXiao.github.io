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
          {img:require('../image/lily-almond-gruel.jpg'),name:'百合杏仁粥',price:8,num:0},
          {img:require('../image/purple-sweet-potato-gruel.jpeg'),name:'紫薯小米粥',price:8,num:0},
          {img:require('../image/jujube-yam.jpg'),name:'红枣山药粥',price:8,num:0},
          {img:require('../image/red-bean-millet-gruel.png'),name:'红豆薏米粥',price:8,num:0},
          {img:require('../image/tremella-lotus-porridge.jpeg'),name:'银耳莲子粥',price:8,num:0},
          {img:require('../image/sydney-rice-gruel.jpeg'),name:'雪梨小米粥',price:8,num:0},
        ]
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