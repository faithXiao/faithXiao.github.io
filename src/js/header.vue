<template>
  <div id="header" class="container-fluid">
		<h2>欢迎使用微信扫码点餐</h2>
		<p>当前桌号：{{ desk }}</p>
	  <ul class="nav nav-fill nav-tabs">
      <li class="nav-item" v-for="(list,index) in menu" v-on:click="turn(index)">
      	<a href="#" class="nav-link">
      		<span class="d-inline-block" v-bind:style="{backgroundImage: 'url('+list.img+')'}"></span>
      		<span class="d-inline-block">{{ list.name }}</span>
      	</a>
      </li>
    </ul>
  </div>
</template>

<script type="text/javascript">
  export default {
    props:['desknum'],
    data () {
      return {
        menu:[
    	    {name:'盖饭',img:'./dist/rice.png',component:'foodcomponent'},
    	    {name:'面条',img:'./dist/noodle.png',component:'noodlecomponent'},
    	    {name:'稀粥',img:'./dist/conjee.jpg',component:'conjeecomponent'},
    	    {name:'饮品',img:'./dist/drink.png',component:'drinkcomponent'}
    	  ],
        desk:this.desknum
      }
    },
    methods:{
      turn:function(index){
        this.$emit('turn',this.menu[index].component,index);
      }
    }
  }
</script>

<style>

</style>
