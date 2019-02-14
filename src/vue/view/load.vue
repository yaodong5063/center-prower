<template lang="html">
  <div class="mostIndex" :style="{height:$store.state.vLang.height+'rem'}">
     <div class="leftTop">
        <canvas-kjz :id="'canvas'"  :width=1 :height=1 :sizeW=0.5 :sizeH=0.5 :speed=300 :spd=1.5 :speedW=0 :cImg="kjzImg" :bImg="bImg" :time=0></canvas-kjz>
     </div>
     <p class="loading">{{lang.load.title}}<label>{{text}}</label></p>
    <div class="canvasImg">
      <canvas id="canvasB" class="canvasB"></canvas>
      <div class="canvasDiv">
        <div class="bgq">
          <img :src="bjq" width="100%" />
        </div>
        <div class="canvasH canvasCom">
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
import {addUser} from '../../js/server';
export default {
  name:'mostIndex',
  data:function(){
    return {
        base:base,
        textNum:0,
        text:'.',
        bgImg:'./../img/www/bg.png',
        kjzImg:'./../img/www/kjz.png',
        xie:'./../img/www/xie.png',
        bImg:'./../img/www/kjzBg.png',
        qiuImg:'./../img/www/mostBg.png',
        bjq:'./../img/www/huanq.jpg',
        hjt:'./../img/www/hjt.png',
        langBol:false,
        qBol:false,
        canvas:{
          cxt:{},
          w:0,
          h:0,
          img:['./../img/www/hy1.png','./../img/www/hy2.png','./../img/www/hy3.png','./../img/www/hy4.png','./../img/www/hy5.png'],
          imgNum:0,
          numbol:true,
        },
        comCanvaB:{
          cxt:{},
          w:0,
          h:0,
          img:['./../img/www/start1.png','./../img/www/start2.png','./../img/www/start3.png','./../img/www/start4.png','./../img/www/start5.png'],
          imgNum:0,
          numbol:true,
          setObj:{},
          timeObj:{},
          timeObj1:{}
        }
        
    }
  },
  watch:{
    
  },
  mounted(){
     this.canvasImg();
     this.canvaBImg();
     this.setObj=setInterval(()=>{this.timeJ()},500);
     this.butAjax();
     base.localRemove();
     window.timeBol=false;
  },
  computed: {
    lang(){
      return lang[this.$store.state.vLang.lang];
    }
  },
  components:{
     
  },
  methods:{
    butAjax(){
        let obj={};
        if(!localStorage.input){
          return this.timeOut('input');
        }else if(!localStorage.gender){
          return this.timeOut('select');
        }else if(!localStorage.age){
          return this.timeOut('age');
        }else if(!localStorage.chain){
          return this.timeOut('stand');
        }else if(!localStorage.poems){
          return this.timeOut('most');
        }else{
          Object.assign(obj,JSON.parse(localStorage.input),JSON.parse(localStorage.gender),JSON.parse(localStorage.age),JSON.parse(localStorage.chain));
          obj.poems=localStorage.poems;
          obj.language=localStorage.lang=='en'?2:1;
        }
        addUser(obj,(data)=>{
          if(data.code===200){
            
            localStorage.user=JSON.stringify(data.datas);
            setTimeout(()=>{
              window.timeBol=true;
              clearTimeout(this.timeObj)
              clearTimeout(this.timeObj1)
              clearInterval(this.setObj);
              setTimeout(()=>{this.$router.replace('home');},30);
            },3000);
          }else{
            this.base.prompt(data.message,-1,3000)
          }
        },(err)=>{
          this.base.prompt(err,-1,3000)
        })
    },
    timeOut(name){
      // this.base.prompt('您的信息填写不完整，请去填写',-1,3000);
      // setTimeout(()=>{
      //   this.$router.replace(name);
      // },3000);
    },
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
       
       this.timeObj=setTimeout(()=>{this.imgB()},300);
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
        if(this.canvas.imgNum>=4) this.canvas.numbol=false;
        if(this.canvas.imgNum<=0) this.canvas.numbol=true;
       
        if(this.canvas.numbol){
          this.canvas.imgNum++;
        }else{
          this.canvas.imgNum--;
        }
        let w=img.width;

        img.onload=()=>{
          this.canvas.cxt.clearRect(0,0,this.canvas.w,this.canvas.h);
          this.canvas.cxt.save();
          this.canvas.cxt.drawImage(img,0,0,this.canvas.w,this.canvas.h);
          this.canvas.cxt.restore();  
          
        }; 
       
       this.timeObj1=setTimeout(()=>{this.imgD()},230);
    }
    
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
   .loading{
       width:10.8rem;
       margin:0 auto;
       padding-top:10.6rem;
       color:#00E5F6;
       font-size:.64rem;
       line-height:1.5rem;
       text-align:center;
   } 
   .canvasImg{
     width:100%;
     position:absolute;
     height:8rem;
     bottom:0;
     left:0;
     z-index:-1;
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
         width:100%;
         position:absolute;
         left:0;
         bottom:0rem;
       }
       .canvasH{
         width:2.6rem;
         height:1.46rem;
         top: 3.8rem;
         left: 5.1rem;
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
         left: 7.6rem;
       }
       .canvasKJZ{
         right:0;
         top:1.5rem;
       }
     }
     
   }


   
   
}
</style>