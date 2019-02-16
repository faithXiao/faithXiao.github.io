<template>
  <div id="header" class="container-fluid">
    <div>
      <div id="myOrder" v-on:click="showOrder">
        <img src="dist/myOrder.png" alt="#">
        <span>我的订单</span>
      </div>
  		<h2>欢迎使用微信扫码点餐</h2>
  		<p>当前桌号：{{ desk }}</p>
      <div style="clear: both;"></div>
    </div>
	  <ul class="nav nav-fill nav-tabs">
      <li class="nav-item" v-for="(list,index) in menu" v-on:click="turn(index,$event)">
      	<a href="#" class="nav-link" v-bind:class="{ active : list.active }">
      		<span class="d-inline-block" v-bind:style="{backgroundImage: 'url('+list.img+')'}"></span>
      		<span class="d-inline-block">{{ list.name }}</span>
      	</a>
      </li>
    </ul>
  </div>
</template>

<script type="text/javascript">
  export default {
    props:['desk','index'],
    data () {
      return {
        menu:[
    	    {name:'盖饭',img:'./src/image/rice.png',active:true},
    	    {name:'面条',img:'./src/image/noodle.png',active:false},
    	    {name:'稀粥',img:'./src/image/conjee.jpg',active:false},
    	    {name:'饮品',img:'./src/image/drink.png',active:false}
    	  ],
        desk:this.desk,
        index:this.index
      }
    },
    methods:{
      turn:function(index){
        this.$emit('turn',index);
      },
      showOrder:function(){
        this.$emit('showOrder');
      }
    },
    watch:{
      index:function(newValue,oldValue){
        this.menu[newValue].active=true;
        this.menu[oldValue].active=false
      }
    }
  }
</script>

<style scoped>
h2{
  width: 85%;
  float: left;
}
p{
  width: 85%;
  float: left;
}
#myOrder{
  float: right;
  margin-right: 8px;
  width: 64px;
  height: 88px;
}
#myOrder img{
  display: block;
}
#myOrder span{
  display: block;
  font-size: 1rem;
}
</style>
