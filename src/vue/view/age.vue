<template lang="html">
  <div class="fontsIndex" :style="{height:$store.state.vLang.height+'rem'}">
     <!-- <img class="bg" :src="bgImg" width="100%" /> -->
     <div class="leftTop">
        <canvas-kjz :id="'canvas'"  :width=1 :height=1 :sizeW=0.5 :sizeH=0.5 :speed=300 :spd=1.5 :speedW=0 :cImg="kjzImg" :bImg="bImg" :time=0></canvas-kjz>
     </div>
     <div class="fontsDom">
       <h3>
         <p>{{lang.age.title}}</p>
       </h3>
       <div class="fontsCom">
           <li @click="inpiutClick(1)">
             <label>A.</label>
             <span>{{lang.age.selectArr[0]}}</span>
           </li>
           <li @click="inpiutClick(2)">
             <label>B.</label>
             <span>{{lang.age.selectArr[1]}}</span>
           </li>
           <li @click="inpiutClick(3)">
             <label>C.</label>
             <span>{{lang.age.selectArr[2]}}</span>
           </li>
           <li @click="inpiutClick(4)">
             <label>D.</label>
             <span>{{lang.age.selectArr[3]}}</span>
           </li>
       </div>
           
    </div>
    <div class="canvasImg">
      <img class="bq" :src="qiuImg" width="100%" />
      <div class="canvasDiv">
        <div class="canvasB canvasCom">
          <yun-canvas :id="'yunImgB'" :width=.8 :height=.85 :sizeW=3.2 :sizeH=3.8 :speed=200 :spd=1 :speedW=1000 :cImg="canvas.b" :time="0"></yun-canvas>
        </div>
        <div class="canvasL canvasCom">
          <yun-canvas :id="'yunImgL'" :width=.86 :height=.86 :sizeW=1.8 :sizeH=3 :speed=200 :spd=1 :speedW=0 :cImg="canvas.l" :time="200"></yun-canvas>
        </div>
        <div class="canvasO canvasCom">
          <yun-canvas :id="'yunImgO'" :width=.81 :height=.81 :sizeW=3 :sizeH=3 :speed=0 :spd=0 :speedW=500 :cImg="canvas.o" :time="500"></yun-canvas>
        </div>
        <div class="canvasC canvasCom">
          <yun-canvas :id="'yunImgC'" :width=.86 :height=.785 :sizeW=3.3 :sizeH=4 :speed=200 :spd=0 :speedW=500 :cImg="canvas.c" :time="100"></yun-canvas>
        </div>
        <div class="canvasK canvasCom">
          <yun-canvas :id="'yunImgK'" :width=.74 :height=.75 :sizeW=3 :sizeH=3.2 :speed=200 :spd=0 :speedW=500 :cImg="canvas.k" :time="1000"></yun-canvas>
        </div>
        <div class="canvasC1 canvasCom">
          <yun-canvas :id="'yunImgC1'" :width=.88 :height=.8 :sizeW=5.2 :sizeH=6 :speed=150 :spd=0 :speedW=0 :cImg="canvas.c1" :time="1000"></yun-canvas>
        </div>
        <div class="canvasE1 canvasCom">
          <yun-canvas :id="'yunImgE1'" :width=.95 :height=.8 :sizeW=1.1 :sizeH=1.8 :speed=180 :spd=0 :speedW=0 :cImg="canvas.e1" :time="500"></yun-canvas>
        </div>
        <div class="canvasR canvasCom">
          <yun-canvas :id="'yunImgR'" :width=.88 :height=.84 :sizeW=1 :sizeH=1.8 :speed=0 :spd=4 :speedW=500 :cImg="canvas.r" :time="0"></yun-canvas>
        </div>
        <div class="canvasT canvasCom">
          <yun-canvas :id="'yunImgT'" :width=.90 :height=.825 :sizeW=4.4 :sizeH=5.5 :speed=200 :spd=1 :speedW=0 :cImg="canvas.t" :time="2500"></yun-canvas>
        </div>
        <div class="canvasN canvasCom">
          <yun-canvas :id="'yunImgN'" :width=.85 :height=.95 :sizeW=6 :sizeH=4.7 :speed=0 :spd=.7 :speedW=500 :cImg="canvas.n" :time="0"></yun-canvas>
        </div>
        <div class="canvasE canvasCom">
          <yun-canvas :id="'yunImgE'" :width=.87 :height=.88 :sizeW=6 :sizeH=2.2 :speed=150 :spd=.7 :speedW=200 :cImg="canvas.e" :time="200"></yun-canvas>
        </div>
        <div class="canvasHu canvasCom">
          <img :src="canvas.hu" width="100%" />
        </div>
        <div class="canvasQuan canvasCom">
          <img :src="canvas.quan" width="100%" />
        </div>
        <div class="canvasHuo canvasCom">
          <yun-canvas :id="'yunImgHuo'" :width=.86 :height=.33 :sizeW=2 :sizeH=2 :speed=0 :spd=.7 :speedW=1000 :cImg="canvas.huo" :time="0"></yun-canvas>
        </div>
         
      </div>    
    </div>
  </div>
</template> 
<script>
import yunCanvas from '../../vue/component/yunCanvas.vue';

export default {
  name:'selectIndex',
  data:function(){
    return {
        base:base,
        bgImg:'./../img/www/bg.png',
        kjzImg:'./../img/www/kjz.png',
        bImg:'./../img/www/kjzBg.png',
        qiuImg:'./../img/www/bq.png',
        langBol:false,
        qBol:false,
        canvas:{
          b:'./../img/www/b.png',
          l:'./../img/www/l.png',
          o:'./../img/www/o.png',
          c:'./../img/www/c.png',
          k:'./../img/www/k.png',
          c1:'./../img/www/c1.png',
          e1:'./../img/www/e1.png',
          r:'./../img/www/r.png',
          t:'./../img/www/t.png',
          n:'./../img/www/n.png',
          e:'./../img/www/e.png',
          quan:'./../img/www/quan.png',
          hu:'./../img/www/hu.png',
          huo:'./../img/www/huo1.png',
        },
        comCanvas:{
          
        },
        age:{
          ageType:1
        }
        
    }
  },
  watch:{
    
  },
  mounted(){
     //this.canvasImg();
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
      this.age.ageType=val;
      this.$store.commit('inputCom',this.age);
      localStorage.age=JSON.stringify(this.age);
      window.timeBol=true;
      setTimeout(()=>{this.$router.replace('stand');},30);
      
      
    },
    canvasImg(){
        
       
        
        
		},
		imgD(){   
        
       //requestAnimFrame(this.imgD);
    }
    
  }
};
</script>
<style rel="stylesheet/scss" lang="scss" scoped>
.fontsIndex{
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
        width:4.95rem;
        margin:0 auto;
        li{
          width:4.95rem;
          height:1rem;
          border:1px solid #00E5F6;
          border-radius:.6rem;
          margin-top:1.2rem;
          text-align:center;
          color:#00E5F6;
          font-size:.52rem;
          line-height:.95rem;

        }
        
     }
     
   }
   .canvasImg{
     width:100%;
     position:absolute;
     height:12rem;
     bottom:0;
     left:0;
     z-index:-1;
     overflow:hidden;
     .bq{
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
       .canvasB{
         width:2.6rem;
         height:3.4rem;
         top:0;
         left:0;
       }
       .canvasL{
         width:1.56rem;
         height:2.6rem;
         top:2.2rem;
         left:1.7rem;
         z-index:5;
       }
       .canvasO{
         width:2.44rem;
         height:2.44rem;
         top:1.68rem;
         left:3rem;
       }
       .canvasC{
         width:2.84rem;
         height:3.14rem;
         top:3.2rem;
         left:3.76rem;
       }
       .canvasK{
         width:2.2rem;
         height:2.4rem;
         top:2.6rem;
         left:6.4rem;
       }
       .canvasC1{
         width:4.6rem;
         height:4.8rem;
         top:4.3rem;
         left:6.6rem;
         z-index:10;
       }
       .canvasE1{
         width:1.04rem;
         height:1.44rem;
         top:6rem;
         left:10.1rem;
       }
       .canvasR{
         width:.88rem;
         height:1.2rem;
         top:7.28rem;
         left:11.44rem;
       }
       .canvasT{
         width:3.98rem;
         height:4.54rem;
         top:4.14rem;
         right:.1rem;
       }
       .canvasN{
         width:5.1rem;
         height:4.46rem;
         bottom:0;
         left:3.6rem;
       }
       .canvasE{
         width:4.96rem;
         height:1.94rem;
         bottom:.2rem;
         left:9.2rem;
       }
       .canvasHu{
         width:5.6rem;
         height:1.2rem;
         top:4rem;
         left:.64rem;
         z-index:4
       }
       .canvasQuan{
         width:1.86rem;
         height:2.36rem;
         top:3.46rem;
         left:12.16rem;
       }
       .canvasHuo{
         top:6rem;
         left:8rem;
         width:1.72rem;
         height:.66rem;
       }
     }
     
   }


   
   
}
</style>