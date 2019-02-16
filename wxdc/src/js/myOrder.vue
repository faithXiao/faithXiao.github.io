<template>
	<div id="myOrder" class="container-fluid">
		<div class="header">
			<h2 class="myOrder">我的订单：</h2>
			<h2 class="back"><a href="#" v-on:click="back">返回</a></h2>
			<div class="clear"></div>
		</div>
		<ul v-if="orderList.length">
			<li v-for="item in orderList">
				<p>订单编号：{{ item.orderId }}</p>
				<p>订单内容：{{ item.orderInfo }}</p>
				<P>订单金额：{{ item.orderMoney }}</P>
				<p>下单时间：{{ item.orderTime }}</p>
				<p>订单状态：<span class="orderState">待确认</span></p>
			</li>
		</ul>
		<p v-else>暂无订单记录！</p>
	</div>
</template>

<script type="text/javascript">
export default{
	data(){
		return{
			order: [],
			orderList: []
		}
	},
	methods:{
		back:function(){
			this.$emit('back','indexcomponent');
		}
	},
	created:function(){
		if(typeof(Storage)!=="undefined"){
			var time=new Date().getTime();
	    if(localStorage.order==undefined||localStorage.order==""||localStorage.order==null||time>localStorage.time){
	    	this.order=[];
	    	localStorage.order="";
	    }else{
	    	this.order=localStorage.order.split(";").reverse();
	    	for(let i=0; i<this.order.length; i++){
	    		this.orderList[i]=JSON.parse(this.order[i]);
	    	}
	    }
	  }
	}
}
</script>

<style type="text/css" scoped>
#myOrder{
	background-color: #fcfcfc;
}
h2{
	margin-bottom: .8rem;
}
.myOrder{
	width: 75%;
	float: left;
}
.back{
	width: 20%;
	float: right;
	text-align: right;
}
ul{
	list-style: none;
	padding-left: 20px;
}
li{
	border-top: 1px solid #867e7e;
	padding-top: .8rem;
}
p{
	font-size: 1.4rem;
}
.clear{
	clear: both;
}
.orderState{
	color: rgb(255, 193, 7);
}
</style>
