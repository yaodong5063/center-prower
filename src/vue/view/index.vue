<template lang="html">
   <div class="index" :style="{height:$store.state.vLang.height+'rem'}">
      <img class="bg" :src="bgImg" width="100%" />
      <div class="content">
          <canvas-kjz :id="'canvas'" :sizeW=1 :width=1 :height=1 :sizeH=1 :speed=300 :spd=0 :speedW=0 :cImg="kjzImg" :bImg="bImg" :time=0></canvas-kjz>
          <img class="man" :src="man" />
          <p>登录中<label>{{text}}</label></p>
      </div>
      
    </div>
</template> 
<script>
export default {
  name:'index',
  data:function(){
    return {
        base:base,
        bgImg:'./../img/www/bg.png',
        man:'./../img/www/man.png',
        kjzImg:'./../img/www/kjz.png',
        bImg:'./../img/www/kjzBg.png',
        text:'.',
        textNum:1,
        setOut:{}
        
    }
  },
  watch:{
    
  },
  mounted(){
     window.timeBol=false;
     this.setOut=setInterval(()=>{this.timeJ()},500);
     setTimeout(()=>{
       clearInterval(this.setOut);
       window.timeBol=true;
       setTimeout(()=>{this.$router.replace('user');},30);
     },3000);
     base.localRemove();
  },
  computed: {
    
  },
  components:{
     
  },
  methods:{
    timeJ(){
      this.textNum++;
      if(this.textNum==1){
        this.text='.';
      }else if(this.textNum==2){
        this.text='..';
      }else if(this.textNum==3){
        this.text='...';
        this.textNum=0;
      }
      
    },
    
  }
};
</script>
<style rel="stylesheet/scss" lang="scss" scoped>
.index{
   width:100%;
   position:relative;
   text-align:center;
   .bg{
     position:fixed;
     top:0;
     left:0;
     z-index:-1;
   }
   .content{
      padding:6.88rem 0 0;
      width:100%;
      .canvas{
        width:5rem;
        height:6.1rem;
      }
      .man{
        width:1.06rem;
        
      }
      p{
        color:#00E5F6;
        font-size:.5rem;
        margin-top:1.6rem;
        font-size:'MicrosoftYaHei','GBpc-EUC-H';
        label{
          width:1rem;
          display:inline-block;
          text-align:left;
        }
      }
   }

   
   
}
</style>