<template lang="html">
  <div class="standIndex" :style="{height:$store.state.vLang.height+'rem'}">
     <!-- <img class="bg" :src="bgImg" width="100%" /> -->
     <div class="leftTop">
        <canvas-kjz :id="'canvas'"  :width=1 :height=1 :sizeW=0.5 :sizeH=0.5 :speed=300 :spd=1.5 :speedW=0 :cImg="kjzImg" :bImg="bImg" :time=0></canvas-kjz>
     </div>
     <div class="fontsDom">
       <h3>
         <p>{{lang.stand.title}}</p>
       </h3>
       <div class="fontsCom">
           <li @click="inpiutClick(1)">
             <label>A.</label>
             <span>{{lang.stand.selectArr[0]}}</span>
           </li>
           <li @click="inpiutClick(2)">
             <label>B.</label>
             <span>{{lang.stand.selectArr[1]}}</span>
           </li>
           <li @click="inpiutClick(3)">
             <label>C.</label>
             <span>{{lang.stand.selectArr[2]}}</span>
           </li>
           <li @click="inpiutClick(4)">
             <label>D.</label>
             <span>{{lang.stand.selectArr[3]}}</span>
           </li>
       </div>
           
    </div>
    <div class="canvasImg">
      <img class="bq" :src="qiuImg" width="100%" />
      <div class="canvasDiv">
        <div class="canvasQuan canvasCom">
          <img :src="canvas.quan" width="100%" />
        </div>
        <div class="canvasC1 canvasCom">
          <yun-canvas :id="'yunImgC1'" :width=.88 :height=.8 :sizeW=5.2 :sizeH=6 :speed=150 :spd=0 :speedW=0 :cImg="canvas.c1" :time="1000"></yun-canvas>
        </div>
        <div class="canvasE1 canvasCom">
          <yun-canvas :id="'yunImgE1'" :width=.95 :height=.8 :sizeW=1.1 :sizeH=1.8 :speed=180 :spd=0 :speedW=0 :cImg="canvas.e1" :time="500"></yun-canvas>
        </div>
        <div class="canvasR canvasCom">
          <yun-canvas :id="'yunImgR'" :width=.9 :height=.88 :sizeW=1 :sizeH=1.8 :speed=0 :spd=4 :speedW=500 :cImg="canvas.r" :time="0"></yun-canvas>
        </div>
        
        <div class="canvasT canvasCom">
          <yun-canvas :id="'yunImgT'" :width=.90 :height=.825 :sizeW=4.4 :sizeH=5.5 :speed=200 :spd=1 :speedW=0 :cImg="canvas.t" :time="2500"></yun-canvas>
        </div>
        <div class="canvasE canvasCom">
          <yun-canvas :id="'yunImgE'" :width=.87 :height=.88 :sizeW=6 :sizeH=2.2 :speed=150 :spd=.7 :speedW=200 :cImg="canvas.e" :time="200"></yun-canvas>
        </div>
        
        <div class="canvasHuo canvasCom">
          <canvas id="canvasQ" class="canvasQ"></canvas>
        </div>
        <div class="canvashjt canvasCom">
          <img :src="hjt" width="100%" />
        </div>
         
      </div>    
    </div>
  </div>
</template> 
<script>
import yunCanvas from '../../vue/component/yunCanvas.vue';

export default {
  name:'standIndex',
  data:function(){
    return {
        base:base,
        bgImg:'./../img/www/bg.png',
        kjzImg:'./../img/www/kjz.png',
        bImg:'./../img/www/kjzBg.png',
        qiuImg:'./../img/www/bq2.png',
        langBol:false,
        qBol:false,
        hjt:'./../img/www/hjt.png',
        canvas:{
          c1:'./../img/www/c1.png',
          e1:'./../img/www/e1.png',
          r:'./../img/www/r.png',
          t:'./../img/www/t.png',
          e:'./../img/www/e.png',
          quan:'./../img/www/quan.png',
          huo:'./../img/www/huo1.png',
          cxt:{},
          w:0,
          h:0,
          img:['./../img/www/hy1.png','./../img/www/hy2.png','./../img/www/hy3.png','./../img/www/hy4.png','./../img/www/hy5.png'],
          imgNum:0,
          numbol:true,
        },
        comCanvas:{
          
        },
        chain:{
          chainType:1
        },
        timeObj:{}
        
    }
  },
  watch:{
    
  },
  mounted(){
     this.canvasImg();
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
    inpiutClick(val){
      this.chain.chainType=val;
      this.$store.commit('inputCom',this.chain);
      localStorage.chain=JSON.stringify(this.chain);
      window.timeBol=true;
      clearTimeout(this.timeObj);
      setTimeout(()=>{this.$router.replace('most');},30);
      
    },
    canvasImg(){
        let canvas=document.getElementById('canvasQ');
        this.canvas.cxt=canvas.getContext('2d');
        this.canvas.w=canvas.width;
        this.canvas.h=canvas.height;
        this.imgD();
        this.canvas.cxt.translate(this.canvas.w,0);
		},
		imgD(){   
        let img=new Image();
        img.src=this.canvas.img[this.canvas.imgNum];
        
        if(this.canvas.imgNum>=4) this.canvas.numbol=false;
        if(this.canvas.imgNum<=0) this.canvas.numbol=true;
       
        if(this.canvas.numbol){
          this.canvas.imgNum++;
        }else{
          this.canvas.imgNum--;
        }
        let w=img.width;
        
        img.onload=()=>{
          this.canvas.cxt.clearRect(-this.canvas.w,0,this.canvas.w,this.canvas.h);
          this.canvas.cxt.save();
          this.canvas.cxt.drawImage(img,-this.canvas.w,0,this.canvas.w,this.canvas.h);
          this.canvas.cxt.restore();  
          
        }; 
       
       this.timeObj=setTimeout(()=>{this.imgD()},230);
    }
    
  }
};
</script>
<style rel="stylesheet/scss" lang="scss" scoped>
.standIndex{
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
     padding-top:4.5rem;
     h3{
       font-size:.64rem;
       text-align:center;
       color:#00E5F6;
       p{
         line-height:1rem;
       }
     }
     .fontsCom{
        margin:1rem auto 0;
        text-align:center;
        li{
          min-width:11rem;
          height:1rem;
          border:1px solid #00E5F6;
          border-radius:.6rem;
          margin-top:1.2rem;
          text-align:center;
          color:#00E5F6;
          font-size:.52rem;
          line-height:.95rem;
          padding:0 .5rem;
          display:inline-block;
          //text-align:left;
        }
        
     }
     
   }
   .canvasImg{
     width:100%;
     position:absolute;
     height:6.6rem;
     bottom:0;
     left:0;
     overflow:hidden;
     z-index:-1;
     .bq{
       width:100%;
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
       .canvasC1{
         width:4.6rem;
         height:4.8rem;
         top:1rem;
         left:-3.2rem;
         z-index:10;
       }
       .canvasE1{
         width:1.04rem;
         height:1.44rem;
         top:2.75rem;
         left:.6rem;
       }
       .canvasR{
         width:.88rem;
         height:1.2rem;
         top:3.8rem;
         left:1.8rem;
       }
       .canvasT{
         width:3.98rem;
         height:4.54rem;
         top:0.8rem;
         left:1.6rem;
         z-index:0
       }
       .canvasQuan{
         width:1.86rem;
         height:2.36rem;
         top:.2rem;
         left:2.8rem;
         z-index:99;
       }
       .canvasE{
         width:4.96rem;
         height:1.94rem;
         bottom:-1.1rem;
         left:0rem;
       }
       
       .canvasHuo{
         width:2.6rem;
         height:1.46rem;
         top: 3rem;
         left: 4rem;
         .canvasQ{
           width:100%;
           height:100%;
         }
       }
       .canvashjt{
         width:.92rem;
         height:.68rem;
         top: 3rem;
         left: 6.5rem;
       }
     }
     
   }


   
   
}
</style>