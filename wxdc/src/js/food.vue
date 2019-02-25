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
    props:['foodList'],
    data(){
      return{
        food_list: null
      }
    },
    created:function(){
      this.food_list=this.foodList;
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