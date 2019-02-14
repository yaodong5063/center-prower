<template lang="html">
  <div class="selectIndex" :style="{height:$store.state.vLang.height+'rem'}">
     <img class="bg" :src="bgImg" width="100%" />
     <div class="leftTop">
        <canvas-kjz :id="'canvas'"  :width=1 :height=1 :sizeW=0.5 :sizeH=0.5 :speed=300 :spd=1.5 :speedW=0 :cImg="kjzImg" :bImg="bImg" :time=0></canvas-kjz>
     </div>
     <div class="selectDom">
       <h3>
         <p>{{lang.select.title}}</p>
         <p>{{lang.select.subTitle}}</p>
       </h3>
       <div class="selectCom">
         <div class="selectTop">
           <div class="selectInput" @click="selectClick(1)">
             <div class="selectImg">
               <img class="topImg" :src='inputImgs' />
               <img class="bomImg" :src='nanImg' />
             </div>
             <p>{{lang.select.male}}</p>
           </div>
           <div class="selectInput" @click="selectClick(2)">
             <div class="selectImg">
               <img :src='inputImgs' />
               <img class="bomImg" :src='nvImg' />
             </div>
             <p>{{lang.select.female}}</p>
           </div>
         </div>
         <div class="selectBom">
            <div class="selectInput" @click="selectClick(3)">
             <div class="selectImg">
               <img class="topImg" :src='inputImgs' />
               <img class="bomImg" :src='maoImg' />
             </div>
             <p>{{lang.select.kitty}}</p>
           </div>
         </div>
       </div>
           
    </div>
    <div class="canvasImg">
          <div class="huojian">
             <yun-canvas :id="'huoImg'" :width=.3 :height=.7 :sizeW=2.3 :sizeH=2.8 :speed=800 :spd=0 :speedW=0 :cImg="comCanvas.huoImg" :time="comCanvas.huoTime"></yun-canvas>
          </div>
          <canvas id="canvasQ" class="canvasQ"></canvas>
          <div class="canvasRea">
              <div class="yunOne yunCom">
                <yun-canvas :id="'yunImgOne'" :width=.5 :height=1 :sizeW=1.8 :sizeH=0.6 :speed=0 :spd=0 :speedW=1500 :cImg="comCanvas.yunImg" :time="comCanvas.oneTime"></yun-canvas>
              </div>
              <div class="yunTwo yunCom">
                <yun-canvas :id="'yunImgTwo'" :width=.5 :height=1 :sizeW=1.8 :sizeH=0.6 :speed=0 :spd=0 :speedW=2200 :cImg="comCanvas.yunImg" :time="comCanvas.twoTime"></yun-canvas>
              </div>
              <div class="yunThree yunCom">
                <yun-canvas :id="'yunImgThree'" :width=.5 :height=1 :sizeW=1.8 :sizeH=0.6 :speed=0 :spd=0 :speedW=1800 :cImg="comCanvas.yunImg" :time="comCanvas.threeTime"></yun-canvas>
              </div>
              <div class="yunFour yunCom">
                <yun-canvas :id="'yunImgFour'" :width=.3 :height=.6 :sizeW=1.8 :sizeH=0.6 :speed=0 :spd=0 :speedW=2500 :cImg="comCanvas.yunImg" :time="comCanvas.fourTime"></yun-canvas>
              </div>
              <div class="yunFive yunCom">
                <yun-canvas :id="'yunImgFive'" :width=.5 :height=1 :sizeW=1.8 :sizeH=0.6 :speed=0 :spd=0 :speedW=2200 :cImg="comCanvas.yunImg" :time="comCanvas.FiveTime"></yun-canvas>
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
        inputImgs:'./../img/www/ips.png',
        nanImg:'./../img/www/nan.png',
        nvImg:'./../img/www/woman.png',
        maoImg:'./../img/www/mao.png',
        langBol:false,
        qBol:false,
        canvas:{
          cxt:{},
          w:0,
          h:0,
          img:['./../img/www/qiu1.png','./../img/www/qiu2.png','./../img/www/qiu3.png','./../img/www/qiu4.png','./../img/www/qiu5.png',],
          imgNum:0
        },
        comCanvas:{
          yunImg:'./../img/www/yun.png',
          huoImg:'./../img/www/huo2.png',
          oneTime:0,
          twoTime:1800,
          threeTime:1100,
          fourTime:1400,
          fiveTime:100,
          huoTime:0,
        },
        gender:{
          gender:1
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
    selectClick(val){
      this.gender.gender=val;
      this.$store.commit('inputCom',this.gender);
      localStorage.gender=JSON.stringify(this.gender);
      window.timeBol=true;
      clearTimeout(this.timeObj);
      setTimeout(()=>{this.$router.replace('age');},30);
    },
    canvasImg(){
        let canvas=document.getElementById('canvasQ');
        this.canvas.cxt=canvas.getContext('2d');
        this.canvas.w=canvas.width;
        this.canvas.h=canvas.height;
        this.imgD();
       
        
        
		},
		imgD(){   
        let img=new Image();
        img.src=this.canvas.img[this.canvas.imgNum];
        this.canvas.imgNum++;
        if(this.canvas.imgNum==5) this.canvas.imgNum=0;
         
        img.onload=()=>{
          this.canvas.cxt.clearRect(0, 0,this.canvas.w,this.canvas.h);
          this.canvas.cxt.save();
          this.canvas.cxt.drawImage(img,0,0,this.canvas.w,this.canvas.h);
          this.canvas.cxt.restore();  
          
        }; 
       
       this.timeObj=setTimeout(()=>{this.imgD()},180);
       //requestAnimFrame(this.imgD);
    }
    
  }
};
</script>
<style rel="stylesheet/scss" lang="scss" scoped>
.selectIndex{
   width:100%;
   position:relative;
   .bg{
     position:fixed;
     top:0;
     left:0;
     z-index:-10;
   }
   .leftTop{
     position: absolute;
     width:3rem;
     height:3rem;
     top:0.2rem;
     left:0.4rem;
   }
   .selectDom{
     padding-top:4rem;
     h3{
       font-size:.64rem;
       text-align:center;
       color:#00E5F6;
       p{
         line-height:1rem;
       }
     }
     .selectCom{
        width:10rem;
        margin:1rem auto 0;
        position:relative;
        z-index:1;
        .selectTop{
          display:flex;
          display:-webkit-flex;
          justify-content:space-between;
          -webkit-justify-content:space-between;
          .selectInput{
            width:3.6rem;
            .selectImg{
              position:relative;
              width:3.6rem;
              height:3.2rem;
            }
            img{
              width:100%;
              position:absolute;
              top:0;
              left:0;
              z-index:-1
            }
            .bomImg{
              width: 1rem;
              top: .92rem;
              left: 1.32rem;
            }
            p{
              font-size:.6rem;
              text-align:center;
              color:#00E5F6;
              padding:0;
              margin:0;
            }
          }
        }
        .selectBom{
          display:flex;
          display:-webkit-flex;
          justify-content:center;
          -webkit-justify-content:center;
          .selectInput{
            width:3.6rem;
            .selectImg{
              position:relative;
              width:3.6rem;
              height:3.2rem;
            }
            img{
              width:100%;
              position:absolute;
              top:0;
              left:0;
              z-index:-1
            }
            .bomImg{
              width: 1rem;
              top: 1.1rem;
              left: 1.32rem;
            }
            p{
              font-size:.6rem;
              text-align:center;
              color:#00E5F6;
              padding:0;
              margin:0;
            }
          }
        }
     }
     
   }
   .canvasImg{
     width:12.9rem;
     position:absolute;
     height:7.5rem;
     bottom:0;
     margin-left:-6.45rem;
     left:50%;
     overflow:hidden;
     z-index:-1;
     .canvasQ{
       width:100%;
       height:6.6rem;
       margin-top:.9rem;
       
     }
     .canvasRea{
       position: absolute;
       width:100%;
       height:6.6rem;
       bottom:0;
       left:0;
       .yunCom{
         position:absolute;
         width:.8rem;
         height:.52rem;
         top:0;
         left:0;
      }
      .yunOne{
        top:1.9rem;
        left:3.6rem;
      }
      .yunTwo{
        top:1rem;
        left:6.8rem;
      }
      .yunThree{
        top:4.2rem;
        left:4.5rem;
      }
      .yunFour{
        width:.5rem;
        height:.3rem;
        top:3.5rem;
        left:6.5rem;
      }
      .yunFive{
        top:2.5rem;
        left:8.8rem;
      }
     }
     .huojian{
       position:absolute;
       top:0rem;
       width:1.4rem;
       height:2rem;
       margin-left:-.7rem;
       left:50%;
     }
     
   }


   
   
}
</style>