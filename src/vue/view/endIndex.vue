<template lang="html">
  <div class="mostIndex" :style="{height:$store.state.vLang.height+'rem'}">
     <img class="bg" :src="bgImg" width="100%" />
     <div class="leftTop">
        <canvas-kjz :id="'canvas'"  :width=1 :height=1 :sizeW=0.5 :sizeH=0.5 :speed=300 :spd=1.5 :speedW=0 :cImg="kjzImg" :bImg="bImg" :time=0></canvas-kjz>
     </div>
     <div class="fontsDom" v-if="lang.name=='en'">
       <h3>
         <p>{{lang.endIndex.titOne}}</p>
         <p>{{lang.endIndex.titTwo}}{{timeStr}}</p>
         <p>{{lang.endIndex.titThree}}</p>
         <p>{{lang.endIndex.titFour}}</p>
         <p>{{lang.endIndex.titFive}}</p>
         <p>{{lang.endIndex.titSix}}</p>
         <p>{{lang.endIndex.titSeven}}</p>
       </h3>
       
           
    </div>
    <div class="fontsDom" v-if="lang.name=='cn'">
       <h3>
         <p>{{lang.endIndex.titOne}}{{timeStr}}{{lang.endIndex.titTwo}}</p>
         <p>{{lang.endIndex.titThree}}</p>
         <p>{{lang.endIndex.titFour}}</p>
         <p>{{lang.endIndex.titFive}}</p>
         <p>{{lang.endIndex.titSix}}</p>
         <p>{{lang.endIndex.titSeven}}</p>
       </h3>
       
       
           
    </div>
    <div class="canvasImg">
      
      <canvas id="canvasB" class="canvasB"></canvas>
      <div class="canvasDiv">
        <canvas-kjz :id="'canvasKJZ'"  :width=1 :height=1 :sizeW=1.2 :sizeH=1.2 :speed=300 :spd=0.5 :speedW=0 :cImg="xie" :bImg="bImg" :time=0></canvas-kjz>
         
      </div>    
    </div>
    <div class="footer" v-if="lang.name=='en'">
        <h3>{{lang.endIndex.textTwo}}</h3>
        <p>{{lang.endIndex.textThree}}</p>
    </div>
    <div class="footer" v-if="lang.name=='cn'">
        <p class="cnText">{{lang.endIndex.foot}}</p>
    </div>
  </div>
</template> 
<script>
import yunCanvas from '../../vue/component/yunCanvas.vue';

export default {
  name:'mostIndex',
  data:function(){
    return {
        base:base,
        bgImg:'./../img/www/bg.png',
        kjzImg:'./../img/www/kjz.png',
        xie:'./../img/www/kjz.png',
        bImg:'./../img/www/kjzBg.png',
        qiuImg:'./../img/www/mostBg.png',
        bjq:'./../img/www/shou.png',
        hjr:'./../img/www/hjr.jpg',
        ewm:'./../img/www/erweima.jpg',
        langBol:false,
        qBol:false,
        hyLeft:'2.9rem',
        comCanvaB:{
          cxt:{},
          w:0,
          h:0,
          img:['./../img/www/start1.png','./../img/www/start2.png','./../img/www/start3.png','./../img/www/start4.png','./../img/www/start5.png'],
          imgNum:0,
          numbol:true
        },
        timeStr:!!localStorage.timeStr?localStorage.timeStr:''
        
    }
  },
  watch:{
    
  },
  mounted(){
     this.canvaBImg();
     base.localRemove();
     window.timeBol=false;
  },
  computed: {
    lang(){
      return lang[this.$store.state.vLang.lang];
    }
  },
  components:{
     'yun-canvas':yunCanvas
  },
  methods:{
    refresh(){

    },
    inpiutClick(val){
      
      
    },
    canvaBImg(){
        let canvas=document.getElementById('canvasB');
        this.comCanvaB.cxt=canvas.getContext('2d');
        this.comCanvaB.w=canvas.width;
        this.comCanvaB.h=canvas.height;
        this.imgB();
		},
		imgB(){   
        let img=new Image();
        img.src=this.comCanvaB.img[this.comCanvaB.imgNum];
        if(this.comCanvaB.imgNum>=4) this.comCanvaB.numbol=false;
        if(this.comCanvaB.imgNum<=0) this.comCanvaB.numbol=true;
       
        if(this.comCanvaB.numbol){
          this.comCanvaB.imgNum++;
        }else{
          this.comCanvaB.imgNum--;
        }
        img.onload=()=>{
          this.comCanvaB.cxt.clearRect(0,0,this.comCanvaB.w,this.comCanvaB.h);
          this.comCanvaB.cxt.save();
          this.comCanvaB.cxt.drawImage(img,0,0,this.comCanvaB.w,this.comCanvaB.h);
          this.comCanvaB.cxt.restore();  
          
        }; 
       
       setTimeout(()=>{this.imgB()},300);
    },
    
    
  }
};
</script>
<style rel="stylesheet/scss" lang="scss" scoped>
.mostIndex{
   width:100%;
   position:relative;
   .bg{
     position:fixed;
     top:0;
     left:0;
     z-index:-1;
   }
   .leftTop{
     position: absolute;
     width:3rem;
     height:3rem;
     top:0.2rem;
     left:0.4rem;
   }
   .fontsDom{
     padding:5.5rem 0 0;
     margin:0 auto;
     width:12.5rem;
     h3{
       width:100%;
       text-align:center;
       p{
         color:#00E5F6;
         line-height:1rem;
         font-size:.56rem;
       }
     }
     
     
     
   }
   .canvasImg{
     width:100%;
     position:absolute;
     height:8rem;
     bottom:1.5rem;
     left:0;
     z-index:-1;
     .fontsCom{
       text-align:center;
       position:absolute;
       top:-1rem;
       width:100%;
       .erweima{
         width:100%;
         height:3.6rem;
         text-align:center;
         margin-bottom:.5rem;
         img{
           width:3.6rem;
         }
       }
       p{
         font-size:.52rem;
         color:#fff;
         line-height:1rem;
       }
     }
     .canvasB{
       width:100%;
       height:100%;
       position:absolute;
       top:0;
       left:0;
     }
     .canvasDiv{
       width:100%;
       height:100%;
       position:relative;
       .canvasCom{
         position:absolute;
         z-index:1;
         
       }
       .bgq{
         width:8.5rem;
         position:absolute;
         right:2rem;
         top:0rem;
       }
       .canvasH{
         width:2.6rem;
         height:1.46rem;
         top: 3.3rem;
         left: 4.8rem;
         .canvasQ{
           width:100%;
           height:100%;
         }
       }
       .canvashjt{
         width:.92rem;
         height:.68rem;
         position:absolute;
         top: 3.8rem;
         left: 6.9rem;
       }
       .canvasKJZ{
         right:0;
         top:1.5rem;
       }
     }
     
   }
   .footer{
     position:absolute;
     bottom:0.5rem;
     text-align:center;
     color:#fff;
     padding:0 1rem;
     width:100%;
     h3{
       font-size:.48rem;
     }
     p{
       font-size:.35rem;
     }
     .cnText{
       text-align:center;
     }
   }


   
   
}
</style>