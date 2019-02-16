<template>
	<div id="main">
		<component v-bind:is="current" v-on:turn="turn" v-on:back="turn"></component>
  </div>
</template>

<script type="text/javascript">
	import indexcomponent from './index.vue'
  import myordercomponent from './myOrder.vue'
	export default{
		components:{
			indexcomponent,
			myordercomponent
		},
	  data(){
		  return{
		  	currents: ['indexcomponent','myordercomponent'],
		  	current: 'indexcomponent'
		  }
	  },
	  methods:{
	  	turn:function(component){
	  		this.current=component;
	  	}
	  },
	}
</script>

<style>

</style>