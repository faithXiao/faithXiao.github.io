<template>
  <div class="modal fade container-fluid" id="money_img" tabindex="-1">
    <div class="modal-dialog modal-lg">
      <div class="modal-content">
        <div class="modal-header">
          <h3 class="modal-title">长按识别付款二维码即可完成支付</h3>
          <button type="button" class="close" data-dismiss="modal" v-on:click="back">&times;</button>
        </div>
        <div class="modal-body">
          <img v-bind:src="showimg" class="img-fluid" alt="#" id="img">
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" data-dismiss="modal" v-on:click="back">返回重选</button>
          <button type="button" class="btn btn-primary" data-dismiss="modal" v-on:click="back">已完成支付</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script type="text/javascript">
  export default {
    props:['desknum','food_money'],
    data () {
      return {
        imgsrc:'',
      }
    },
    methods:{
      back:function(){
        this.$emit('hiddenimg');
      }
    },
    computed:{
      showimg:function(){
        this.imgsrc='./dist/'+this.desknum+'_'+this.food_money+'.png';
        return this.imgsrc
      }
    },
    mounted:function(){
      document.getElementById('img').onload=function(){
        console.log('666');
        $("#money_img").modal({
          show:true
        });
      };
    }
  }
</script>

<style scoped>
#money_img img{
  display: block;
  width: 90%;
  margin: 0 auto;
}
.modal-dialog{
  max-width: 100%;
  margin: .5rem;
}
.modal-content{
  border-radius: .6rem;
}
.modal-footer button{
  font-size: 1.65rem;
}
.close{
  font-size: 2.6rem;
  line-height: 35px;
}
</style>