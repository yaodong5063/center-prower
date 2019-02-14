<template lang="html">
  <div class="mostIndex" :style="{height:$store.state.vLang.height+'rem'}">
     <div class="leftTop">
        <canvas-kjz :id="'canvas'"  :width=1 :height=1 :sizeW=0.5 :sizeH=0.5 :speed=300 :spd=1.5 :speedW=0 :cImg="kjzImg" :bImg="bImg" :time=0></canvas-kjz>
     </div>
     <div class="fontsDom">
       <h3>
         <p>{{lang.bee.titOne}}</p>
         <p>{{lang.bee.titTwo}}</p>
         <p>{{lang.bee.titThree}}</p>
       </h3>
       <div class="fontsCom">
           <li v-for="(item,index) in timeS" @click="inpiutClick(item,timeArr[index])">
             <label>{{arrs[index]}}</label>
             <span>{{timeArr[index]}}</span>
           </li>
       </div>
       
           
    </div>
    <div class="canvasImg">
      <canvas id="canvasB" class="canvasB"></canvas>
      <div class="canvasDiv">
        <div class="bgq">
          <img :src="hjr" width="100%" />
        </div>
        <div class="canvasH canvasCom" :id="hyLeft">
          <canvas id="canvasQ" class="canvasQ"></canvas>
        </div>
         
      </div>    
    </div>
  </div>
</template> 
<script>
import yunCanvas from '../../vue/component/yunCanvas.vue';
import {getEinlass,updateUser} from '../../js/server';
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
        bjq:'./../img/www/shou.png',
        hjr:'./../img/www/hjr.jpg',
        langBol:false,
        qBol:false,
        hyLeft:'2.9rem',
        canvas:{
          cxt:{},
          w:0,
          h:0,
          img:['./../img/www/hy1.png','./../img/www/hy2.png','./../img/www/hy3.png','./../img/www/hy4.png','./../img/www/hy5.png'],
          imgNum:0,
          numbol:true,
          leftArr:['2.9rem','2.8rem','2.7rem','2.6rem','2.5rem']
        },
        comCanvaB:{
          cxt:{},
          w:0,
          h:0,
          img:['./../img/www/start1.png','./../img/www/start2.png','./../img/www/start3.png','./../img/www/start4.png','./../img/www/start5.png'],
          imgNum:0,
          numbol:true
        },
        timeArr:[],
        timeS:[],
        timeObj:{},
        timeObj1:{},
        timeObj2:{},
        arrs:['A.','B.','C.']
        
    }
  },
  watch:{
    
  },
  mounted(){
     this.canvasImg();
     this.canvaBImg();
     this.timeAjax();
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
    timeAjax(){
        getEinlass('',(data)=>{
          if(data.code===200){
            this.timeStart(data.datas);
            this.timeS=[];
            data.datas.forEach(item=>{
              this.timeS.push(item*1000);
            })
          }else{
            this.base.prompt(data.message,-1,3000)
          }
        },(err)=>{
          this.base.prompt(err,-1,3000)
        })
    },
    timeEnd(time){
         var day=new Date(time).getDate()<10?('0'+new Date(time).getDate()):new Date(time).getDate(),
             month=new Date(time).getMonth()+1<10?(0+(new Date(time).getMonth()+1)):new Date(time).getMonth()+1,
             year=new Date(time).getFullYear(),
             hour=new Date(time).getHours()<10?('0'+new Date(time).getHours()):new Date(time).getHours(),
             getMinutes=new Date(time).getMinutes()<10?('0'+new Date(time).getMinutes()):new Date(time).getMinutes(),
             secon=new Date(time).getSeconds()<10?('0'+new Date(time).getSeconds()):new Date(time).getSeconds()
         return hour+':'+getMinutes;
    },
    timeStart(time){
        time.forEach(element => {
           let t1=element*1000;
           this.timeArr=[];
           this.timeArr.push(this.timeEnd(t1));
        });
        
        this.timeObj2=setTimeout(()=>{this.timeAjax();},10000*60*5);
    },
    refresh(){

    },
    inpiutClick(val,item){
      let obj={};
      obj.uid=!!localStorage.user?JSON.parse(localStorage.user).uid:'';
      obj.timeStr=val;
      updateUser(obj,(data)=>{
        if(data.code===200){
          localStorage.timeStr=this.timeEnd(val+5*60*1000);
          window.timeBol=true;
          clearTimeout(this.timeObj);
          clearTimeout(this.timeObj2);
          clearTimeout(this.timeObj1);
          setTimeout(()=>{this.$router.replace('endIndex');},30);
        }else{
          this.base.prompt(data.message,-1,3000)
        }
      },(err)=>{
        this.base.prompt(err,-1,3000)
      })
      
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
     padding:5rem 0 0;
     margin:0 auto;
     width:10.5rem;
     h3{
       width:100%;
       text-align:center;
       p{
         color:#00E5F6;
         line-height:1rem;
         font-size:.56rem;
       }
     }
     .fontsCom{
       padding-top:.8rem;
       text-align:center;
      height: 7.5rem;
      display: flex;
      display: -webkit-flex;
      align-items: center;
      flex-wrap: wrap;
      width: 5.5rem;
      margin: 0 2.5rem;
       li{
         display:inline-block;
         width:5.24rem;
         height:1rem;
         border:1px solid #00E5F6;
         border-radius:.6rem;
         color:#00E5F6;
         margin-bottom:1rem;
         font-size:.52rem;
         line-height:.95rem;
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
         left: 2rem;
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


   
   
}
</style>