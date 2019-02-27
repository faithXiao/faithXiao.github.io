<template>
  <div class="modal fade container-fluid" id="money_img" tabindex="-1">
    <div class="modal-dialog modal-lg">
      <div class="modal-content">
        <div class="modal-header">
          <h3 class="modal-title">&nbsp;&nbsp;&nbsp;&nbsp;长按识别付款二维码即可完成支付</h3>
        </div>
        <div class="modal-body">
          <img v-bind:src="imgSrc" class="img-fluid" alt="#">
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" data-dismiss="modal" v-on:click="back">返回</button>
          <router-link :to="{path: 'myorder'}">
            <button type="button" class="btn btn-primary" data-dismiss="modal">已完成支付</button>
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script type="text/javascript">
  export default {
    props:['desk','money'],
    data () {
      return {
        //imgSrc:'',
        imgSrc: require('../image/money.png')
      }
    },
    methods:{
      back:function(){
        this.$emit('clear');
      }
    },
    computed:{
      /*showimg:function(){
        this.imgSrc='./dist/'+this.desk+'_'+this.money+'.png';
        return this.imgSrc
      }*/
    },
    mounted:function(){
      $("#money_img").modal({
        show:true
      });
      $("html").css({
        height: $('body').height(),
        overflow: 'hidden'
      });
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