<template lang="html">
  <div class="mostIndex" :style="{height:$store.state.vLang.height+'rem'}">
     <!-- <img class="bg" :src="bgImg" width="100%" /> -->
     <div class="leftTop">
        <canvas-kjz :id="'canvas'"  :width=1 :height=1 :sizeW=0.5 :sizeH=0.5 :speed=300 :spd=1.5 :speedW=0 :cImg="kjzImg" :bImg="bImg" :time=0></canvas-kjz>
     </div>
     <div class="fontsDom">
       <h3>
         <p>{{lang.most.title}}</p>
       </h3>
       <div class="fontsCom">
           <li @click="inpiutClick(item.pid)" v-for="(item,index) in mostArr">
             <label>{{Arr[index]}}.</label>
             <span>{{item.content}}</span>
           </li>
           
       </div>
       <div class="button">
           <button @click="refresh">{{lang.most.button}}</button>
       </div>
       
           
    </div>
    <div class="canvasImg">
      <img class="bq" :src="qiuImg" width="100%" />
      <div class="canvasDiv">
        <div class="bgq">
          <img :src="bjq" width="100%" />
        </div>
        <div class="canvasH canvasCom" :style="{left:hyLeft}">
          <!-- <canvas id="canvasQ" class="canvasQ"></canvas> -->
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
import {getPoems} from '../../js/server';
export default {
  name:'mostIndex',
  data:function(){
    return {
        base:base,
        bgImg:'./../img/www/bg.png',
        kjzImg:'./../img/www/kjz.png',
        bImg:'./../img/www/kjzBg.png',
        qiuImg:'./../img/www/mostBg.png',
        bjq:'./../img/www/tuo.png',
        hjt:'./../img/www/hjt.png',
        langBol:false,
        qBol:false,
        hyLeft:'6.5rem',
        canvas:{
          cxt:{},
          w:0,
          h:0,
          img:['./../img/www/hy1.png','./../img/www/hy2.png','./../img/www/hy3.png','./../img/www/hy4.png','./../img/www/hy5.png'],
          imgNum:0,
          numbol:true,
          leftArr:['6.5rem','6.4rem','6.3rem','6.2rem','6.1rem']
        },
        comCanvas:{},
        mostArr:[],
        Arr:['A','B','C','D'],
        timeObj:{}

        
    }
  },
  watch:{
    
  },
  mounted(){
     //this.canvasImg();
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
    refresh(){
        window.timeBol=true;
        clearTimeout(this.timeObj);
        setTimeout(()=>{this.$router.replace('mostTwo');},30);
    },
    inpiutClick(val){
        let obj={};
        obj.poems=val;
        this.$store.commit('inputCom',obj);
        localStorage.poems=val;
        base.localRemove();
        window.timeBol=true;
        clearTimeout(this.timeObj);
        setTimeout(()=>{this.$router.replace('load');},30);
      
    },
    mostAjax(){
      
      if(!!localStorage.most) return this.mostArr=JSON.parse(localStorage.most);
      let obj={};
      obj.language=localStorage.lang=='en'?2:1;
      obj.exceptIds='';
      getPoems(obj,(data)=>{
        if(data.code===200){
           let {datas:_data}=data;
           this.mostArr=_data;
           localStorage.most=JSON.stringify(_data);
        }else{
           this.base.prompt(data.message,-1,3000)
        }
      },(err)=>{
         this.base.prompt(err,-1,3000)
      })
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
        this.hyLeft=this.canvas.leftArr[this.canvas.imgNum];
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
       
       this.timeObj=setTimeout(()=>{this.imgD()},230);
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
        margin:1.2rem 0 0 1.34rem;
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
       
       margin:1rem 3.4rem 0;
       display:flex;
       display:-webkit-flex;
       justify-content: center;
       -webkit-justify-content: center;
      button{
        padding:0 .5rem;
        line-height:1.05rem;
        height:1rem;
        background:#00E5F6;
        border:0;
        border-radius:.6rem;
        display:inline-block;
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
     .bq{
       width:80%;
       position:absolute;
       top:0;
       right:0;
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
         width:8.3rem;
         height:7.6rem;
         position:absolute;
         left:0;
         top:0.4rem;
       }
       .canvasH{
         width:2.6rem;
         height:1.46rem;
         top: 3.82rem;
         left: 6.2rem;
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
         left: 8.2rem;
       }
     }
     
   }


   
   
}
</style>