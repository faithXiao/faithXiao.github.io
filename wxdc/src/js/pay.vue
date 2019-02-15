<template>
	<div id="footer" class="container-fluid">
		<div id="pay" class="row">
			<div class="col-4">
				<span>在线点餐</span>
			</div>
			<div class="col-4">
				<span class="my-order">我的订单</span>
			</div>
			<div class="col-4">
				<button class="btn btn-primary" v-on:mousedown="sendimg">去支付</button>
			</div>
		</div>
  </div>
</template>

<script type="text/javascript">
	export default{
		props:['food_info','food_money','desknum'],
		data(){
			return{
				food_num:0,
				food_money:this.food_money
			}
		},
		computed:{
			num:function(){
				let i;
				this.food_num=0;
				for(i=0; i<this.food_info.length; i++){
					this.food_num+=this.food_info[i].food_num
				}
				return this.food_num
			},
			
		},
		methods:{
			sendimg:function(){
				if(this.food_info.length==0){
					alert("未选择所需商品！");
				}else{
		      this.$emit('showimg');
				}
			}
		}
	}
</script>