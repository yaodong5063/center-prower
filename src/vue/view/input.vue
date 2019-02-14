<template lang="html">
   <div class="inputIndex" :style="{height:$store.state.vLang.height+'rem'}" @click="qClick">
     <img class="bg" :src="bgImg" width="100%" />
     <div class="leftTop">
        <canvas-kjz :id="'canvas'"  :width=1 :height=1 :sizeW=0.5 :sizeH=0.5 :speed=300 :spd=1.5 :speedW=0 :cImg="kjzImg" :bImg="bImg" :time=0></canvas-kjz>
     </div>
     <div class="lang">
       <div class="langTip">中/英</div>
       <div class="langTop" @click="langClick">
         <div class="langQuan"></div>
       </div>
       <div class="langBom" v-if="langBol">
         <li class="langBor" @click="langQie('cn')">中文</li>
         <li @click="langQie('en')">ENG</li>
       </div>
     </div>
     <div class="inputDom">
           <div class="inputCom">
             <div class="inputComT"><img :src='inputImgs' /><span>{{lang.input.name}}</span></div>
             <div class="inputComC"><input @input="inputString" type='text' name="name" v-model="inputs.name"/></div>
             <div class="inputComTip">({{lang.input.text}})</div>
           </div>
           <div class="inputCom">
             <div class="inputComT"><img :src='inputImgs' /><span>{{lang.input.phone}}</span></div>
             <div class="inputComC"><input type='text' name="phone" v-model="inputs.phone"/></div>
           </div>
           <div class="inputCom">
             <div class="inputComT"><img :src='inputImgs' /><span>{{lang.input.email}}</span></div>
             <div class="inputComC"><input type='email' name="email" v-model="inputs.email"/></div>
           </div>
           <div class="inputButton">
             <img :src='buttonImg' class="button"/>
             <button @click="ajaxInput">{{lang.input.button}}</button>
           </div>
       </div>
      
      <div class="canvasImg">
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
import {accountValidate} from '../../js/server';

export default {
  name:'inputIndex',
  data:function(){
    return {
        base:base,
        bgImg:'./../img/www/bg.png',
        kjzImg:'./../img/www/kjz.png',
        bImg:'./../img/www/kjzBg.png',
        inputImgs:'./../img/www/ips.png',
        buttonImg:'./../img/www/buts.jpg',
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
          oneTime:0,
          twoTime:1800,
          threeTime:1100,
          fourTime:1400,
          fiveTime:100
        },
        inputs:{
          name:'',
          phone:'',
          email:''
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
     
     
     //this.base.prompt('这边是错误提示',-1,3000)
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
    ajaxInput(){
      let obj={};
      if(!this.inputs.phone &&!this.inputs.email) return this.base.prompt(this.lang.err.phone,-1,3000);
      obj.phone=this.inputs.phone;
      obj.email=this.inputs.email;
      accountValidate(obj,(data)=>{
        if(data.code===200){
           this.$store.commit('inputCom',this.inputs);
           localStorage.input=JSON.stringify(this.inputs);
           window.timeBol=true;
           clearTimeout(this.timeObj);
           setTimeout(()=>{this.$router.replace('sex');},30);
        }else{
           this.base.prompt(data.message,-1,3000)
        }
        
      },(err)=>{
         this.base.prompt(err,-1,3000)
      })
    },
    inputString(){
      let name=this.inputs.name.trim();
      //let name=this.inputs.name.replace(/[^\a-zA-Z\u4E00-\u9FA5]/g,'');
      let len=0;
      let val='';
      for(let item of name){
        if(!/^[\u0000-\u00ff]$/.test(item)){
          len+=2;
        }else{
          len++;
        }
        if(len<=100){
          val+=item;
        }
      }
      this.inputs.name=val;
    },
    langQie(val){
      this.$store.commit('modelLang',val);
      localStorage.lang=val=='cn'?'zh-cn':val;
    },
    qClick(ev){
      if(this.qBol) {
          this.qBol=false;
      }else{
          this.langBol=false;
      }
      
    },
    langClick(ev){
      this.qBol=true;
      this.langBol=!this.langBol;
      
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
.inputIndex{
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
   .lang{
     position: absolute;;
     top:1.28rem;
     right:1rem;
     z-index:999;
     display:flex;
     display:-webkit-flex;
     align-items:center;
      -webkit-align-items:center;
     .langTip{
       color:#00E5F6;
       font-size:.56rem;
       margin-right:.4rem;
     }
     .langTop{
       width:0.8rem;
       height:.8rem;
       border:1px solid #00E5F6;
       border-radius:100%;
       display:flex;
       display:-webkit-flex;
       justify-content:center;
       -webkit-justify-content:center;
       align-items:center;
       -webkit-align-items:center;

       .langQuan{
         background:#00E5F6;
         width:.4rem;
         height:.4rem;
         border-radius:100%;
       }
     }
     .langBom{
       margin-top:.15rem;
       border:1px solid #00E5F6;
       border-radius:.3rem;
       width:4rem;
       height:2.4rem;
       position:absolute;
       top:1.2rem;
       right:0;
       li{
          font-size:.64rem;
          color:#00E5F6;
          line-height:1.2rem;
          text-align:center;
       }
       .langBor{
         border-bottom:1px solid #00E5F6
       }
     }

   }
   .inputDom{
     padding-top:3rem;
     position:relative;
     z-index:1;
     .inputCom{
       padding-bottom:.3rem;
       text-align:center;
       .inputComT{
         position:relative;
         width:3.6rem;
         height:3.2rem;
         display:flex;
         display:-webkit-flex;
         align-items:center;
         justify-content:center;
         -webkit-align-items:center;
         -webkit-justify-content:center;
         font-size:.5rem;
         color:#000;
         margin: 0 auto;

         img{
             width:100%;
             position:absolute;
             top:0;
             left:0;
             z-index:-1
         }
       }
       .inputComC{
         margin:0 auto;
         width:5.5rem;
         height:1rem;
         padding-top:.1rem;
         input{
           padding:.15rem .3rem;
           width:100%;
           height:100%;
           border:1px solid #00E5F6;
           border-radius:.5rem;
           color:#00E5F6;
           background:none;
           font-size:.5rem;

         }
       }
       .inputComTip{
         padding-top:.6rem;
         text-align:center;
         font-size:.48rem;
         color:#fff;

       }
     }
     .inputButton{
       margin-top:.5rem;
       position:relative;
       display: flex;
       display: -webkit-flex;
       justify-content: center;
       -webkit-justify-content: center;
       img{
         width:3.3rem;
         height:1rem;
         position:absolute;
         top:0;
         left:-1.65rem;
         margin-left:50%;
         z-index:-1;
       }
       button{
         font-size:.56rem;
         line-height:1rem;
         margin:0;
         padding:0;
         border:0;
         background:none;
       }
     }
   }
   .canvasImg{
     width:12.9rem;
     position:absolute;
     height:6.6rem;
     bottom:0;
     margin-left:-6.45rem;
     left:50%;
     overflow:hidden;
     z-index:-1;
     .canvasQ{
       width:100%;
       height:100%;
       
     }
     .canvasRea{
       position: absolute;
       width:100%;
       height:100%;
       top:0;
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
     
   }

   
   
}
</style>