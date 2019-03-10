<template>
  <div id="modal">
    <div id="modal-content">
      <div>
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
      document.getElementById('modal-content').style.animation='modelShow .8s 1 forwards';
    }
  }
</script>

<style scoped>
#modal{
  position: fixed;
  z-index: 10000;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  width: 100%;
  height: 100%;
  margin: auto;
  background-color: #00000080;
}
#modal-content{
  display: flex;
  margin: auto;
  border-radius: .5rem;
  width: 90%;
  height: 100%;
}
#modal-content>div{
  margin: auto;
  background-color: white;
}
#modal-content img{
  display: block;
  width: 90%;
  margin: 0 auto;
}
#modal-content button{
  display: block;
  float: right;
  font-size: 1.65rem;
}
</style>