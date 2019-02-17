<template>
	<div id="footer" class="container-fluid">
		<div id="pay" class="row">
			<div class="col-8">
				<span v-if="_num">数量：{{ _num }}个&nbsp;&nbsp;&nbsp;金额：{{ money }}￥</span>
			</div>
			<div class="col-4">
				<button class="btn btn-primary" v-on:click="order">去支付</button>
			</div>
		</div>
  </div>
</template>

<script type="text/javascript">
export default{
	props:['orderInfo','money','desk'],
	data(){
		return{
			num:0,
			money:this.money
		}
	},
	computed:{
		_num:function(){
			let i;
			this.num=0;
			for(i=0; i<this.orderInfo.length; i++){
				this.num+=this.orderInfo[i].food_num
			}
			return this.num
		},
	},
	methods:{
		order:function(){
			if(this.orderInfo.length==0){
				alert("未选择所需商品！");
			}else{
				var date=new Date();
				var m=date.getMonth()+1;
				if(m<10){
					m="0"+m.toString();
				}else{
					m=m.toString();
				}
				var d=date.getDate();
				if(d<10){
					d="0"+d.toString();
				}else{
					d=d.toString();
				}
				var h=date.getHours();
				if(h<10){
					h="0"+h.toString();
				}else{
					h=h.toString();
				}
				var f=date.getMinutes();
				if(f<10){
					f="0"+f.toString();
				}else{
					f=f.toString();
				}
				var s=date.getSeconds();
				if(s<10){
					s="0"+s.toString();
				}else{
					s=s.toString();
				}
				var orderInfo='';
				for(var i=0; i<this.orderInfo.length; i++){
					orderInfo+=this.orderInfo[i].food_name+' x'+(this.orderInfo[i].food_num).toString()+', ';
				}
				var order={
					orderId: this.desk+"_"+m+d+h+f+s,
					orderInfo: orderInfo,
					orderMoney: this.money,
					orderTime: h+':'+f+':'+s
				}
		    this.$emit('showImg');
    		if(typeof(Storage)!=="undefined"){
    			var time=new Date().getTime();
    			if(localStorage.order==undefined||localStorage.order==""||localStorage.order==null||localStorage.time==undefined||localStorage.time==""||localStorage.time==null||time>localStorage.time){
    				localStorage.order=JSON.stringify(order);
    			}else{
    				localStorage.order+=";"+JSON.stringify(order);
    			}
    			localStorage.time=new Date().getTime()+3600000;
    		}
			}
		}
	}
}
</script>

<style type="text/css" scoped>

</style>