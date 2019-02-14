<template lang="html">
  <div class="mostIndex" :style="{height:$store.state.vLang.height+'rem'}">
     <div class="leftTop">
        <canvas-kjz :id="'canvas'"  :width=1 :height=1 :sizeW=0.5 :sizeH=0.5 :speed=300 :spd=1.5 :speedW=0 :cImg="kjzImg" :bImg="bImg" :time=0></canvas-kjz>
     </div>
     <div class="fontsDom">
       <h3>
         <p>{{lang.mostTwo.title}}</p>
       </h3>
       <div class="fontsCom">
           <li @click="inpiutClick(item.pid)" v-for="(item,index) in mostArr">
             <label>{{Arr[index]}}.</label>
             <span>{{item.content}}</span>
           </li>
       </div>
       <div class="button">
           <button @click="refresh">{{lang.mostTwo.button}}</button>
           <button @click="back">{{lang.mostTwo.back}}</button>
       </div>
       
           
    </div>
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
        <div class="canvasKJZ canvasCom">
          <canvas-kjz :id="'canvasKJZ'"  :width=1 :height=1 :sizeW=1 :sizeH=1 :speed=300 :spd=1.5 :speedW=0 :cImg="xie" :bImg="''" :time=0></canvas-kjz>
        </div>
         
      </div>    
    </div>
  </div>
</template> 
<script>
import yunCanvas from '../../vue/component/yunCanvas.vue';
import {getPoems} from '../../js/server';
export default {
  name:'mostIndex',
  data:function(){
    return {
        base:base,
        bgImg:'./../img/www/bg.png',
        kjzImg:'./../img/www/kjz.png',
        xie:'./../img/www/xie.png',
        bImg:'./../img/www/kjzBg.png',
        qiuImg:'./../img/www/mostBg.png',
        bjq:'./../img/www/qiuB.jpg',
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
          numbol:true
        },
        mostArr:!!localStorage.mostTwo?JSON.parse(localStorage.mostTwo):[],
        Arr:['A','B','C','D'],
        timeObj:{},
        timeObj1:{}
        
    }
  },
  watch:{
    
  },
  mounted(){
     this.canvasImg();
     this.canvaBImg();
     this.mostAjax();
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
    mostAjax(){
      if(!!localStorage.mostTwo) return !1;
      let obj={};
      obj.language=localStorage.lang=='en'?2:1;
      const mostArr=JSON.parse(localStorage.most);
      let arr=[];
      mostArr.map((item)=>{
         arr.push(item.pid);
      });
      obj.exceptIds=arr.join(',');
      getPoems(obj,(data)=>{
        if(data.code===200){
           let {datas:_data}=data;
           this.mostArr=_data;
           localStorage.mostTwo=JSON.stringify(_data);
        }else{
           this.base.prompt(data.message,-1,3000)
        }
      },(err)=>{
         this.base.prompt(err,-1,3000)
      })
    },
    refresh(){
       window.timeBol=true;
       clearTimeout(this.timeObj);
        clearTimeout(this.timeObj1);
       setTimeout(()=>{this.$router.replace('mostThree');},30);
    },
    back(){
       localStorage.mostTwo='';
       window.timeBol=true;
       clearTimeout(this.timeObj);
       clearTimeout(this.timeObj1);
       setTimeout(()=>{this.$router.replace('most');},30);
    },
    inpiutClick(val){
        let obj={};
        obj.poems=val;
        this.$store.commit('inputCom',obj);
        localStorage.poems=val;
        base.localRemove();
        window.timeBol=true;
        clearTimeout(this.timeObj);
        clearTimeout(this.timeObj1);
        setTimeout(()=>{this.$router.replace('load');},30);
      
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
   .fontsDom{
     padding-top:4.5rem;
     text-align:center;
     h3{
       font-size:.64rem;
       color:#000;
       p{
         line-height:1.05rem;
         background:#00E5F6;
         border-radius:.5rem;
         padding:0 .6rem;
         height:1rem;
         display:inline-block
       }
     }
     .fontsCom{
        margin:1rem 0 0 1.34rem;
        text-align:left;
        min-height: 10rem;
        
        li{
          min-width:11rem;
          height:1rem;
          margin-top:1rem;
          text-align:center;
          color:#00E5F6;
          font-size:.52rem;
          line-height:.95rem;
          padding:0 .5rem;
          display:inline-block;
          text-align:left;
        }
        
     }
     .button{
       
       margin:1.2rem 2.4rem 0;
       display:flex;
       display:-webkit-flex;
       justify-content: space-between;
       -webkit-justify-content: space-between;
      button{
        padding:0 .5rem;
        line-height:1.05rem;
        height:1rem;
        background:#00E5F6;
        border:0;
        border-radius:.6rem;
        //min-width:3rem;
        font-size:.64rem;
       }
     }
     
   }
   .canvasImg{
     width:100%;
     position:absolute;
     height:8rem;
     bottom:0;
     left:0;
     z-index:-1;
     overflow:hidden;
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
         left:0;
         bottom:0rem;
       }
       .canvasH{
         width:2.6rem;
         height:1.46rem;
         top: 3.84rem;
         left: 4.63rem;
         .canvasQ{
           width:100%;
           height:100%;
         }
       }
       .canvashjt{
         width:.92rem;
         height:.68rem;
         position:absolute;
         top: 3.85rem;
         left: 7.2rem;
       }
       .canvasKJZ{
         right:0;
         top:1.5rem;
       }
     }
     
   }


   
   
}
</style>