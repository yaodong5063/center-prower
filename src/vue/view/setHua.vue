<template lang="html">
<div>
  <div class="index" :style="{height:$store.state.vLang.height+'rem'}" v-show="indexBol">
      <img class="bg" :src="bgImg" width="100%" />
      <div class="content">
          <canvas-kjz :id="'canvases'" :sizeW=1 :width=1 :height=1 :sizeH=1 :speed=300 :spd=0 :speedW=0 :cImg="kjzImg" :bImg="bImg" :time=0></canvas-kjz>
          <img class="man" :src="man" />
          <p>登录中<label>{{text}}</label></p>
      </div>
      
    </div>
  <div class="mostIndex" id="setIndex" :style="{height:$store.state.vLang.height+'rem'}" v-show="!indexBol">
     <div class="leftTop">
        <canvas-kjz :id="'canvas'"  :width=1 :height=1 :sizeW=0.5 :sizeH=0.5 :speed=300 :spd=1.5 :speedW=0 :cImg="kjzImg" :bImg="bImg" :time=0></canvas-kjz>
     </div>
     <div class="setIndex">
       <div class="man">
         <img :src="manImg">
       </div>
       <div class="lineText">
         <!-- <img :src="lineImg"> -->
         <div class="textLine">
           <div class="textTit">
             <p :class="{el:(false),optShow:(className==0),optHide:(className==1)}">{{lang.setIndex.name}}</p>
             <span :class="{el:(false),optShow:(className==0),optHide:(className==1)}">{{!!userObj.poems?userObj.poems:''}}</span>
           </div>
           <!-- <h1 :class="{el:(false),optShow:(className==0),optHide:(className==1)}">{{userObj.name}}</h1>
           <p :class="{el:(false),optShow:(className==0),optHide:(className==1)}">{{lang.setIndex.textOne}}<label>{{userObj.uid/9999>1?(userObj.uid-Math.floor(userObj.uid/9999)*9999):userObj.uid}}</label>{{lang.setIndex.textTwo}}</p> -->
         </div>
       </div>
        
     </div>
     <div class="bottomText">
        <div class="bText">
           <div class="bTextCom">
             <h3>{{userObj.name}}</h3>
             <div :class="{bTextComB:(true)}">
               <p :class="{pText:(true),optShow:(className==0),optHide:(className==1)}">{{lang.setIndex.textOne}}{{userObj.uid/9999>1?(userObj.uid-Math.floor(userObj.uid/9999)*9999):userObj.uid}}{{lang.setIndex.textTwo}}</p>
             </div>
           </div>
           <div class="bTextCom">
             <h3>{{lang.setIndex.hash}}</h3>
             <div :class="{bTextComB:(true)}">
               <p :class="{pTexts:(true),optShow:(className==0),optHide:(className==1)}">{{userObj.hash}}</p>
             </div>
           </div>
        </div>
        <!-- <div class="quanButton">
          <button @click="$router.replace('bee')">{{lang.setIndex.jia}}</button>
          <div class="uploadText">
            <p  @click="uploadImg">{{lang.setIndex.load}}</p>
          </div>
        </div> -->

    </div>
    <div class="canvasImg">
      <!-- <canvas id="canvasB" class="canvasB"></canvas> -->
      <div class="canvasDiv">
        <!-- <div class="bgq">
          <img :src="bjq" width="100%" />
        </div> -->
        <div class="canvasKJZ canvasCom">
          <canvas-kjz :id="'canvasKJZ'"  :width=1 :height=1 :sizeW=1.2 :sizeH=1.2 :speed=300 :spd=1.5 :speedW=0 :cImg="xie" :time=0></canvas-kjz>
        </div>
         
      </div>    
    </div>
    
  </div>
</div>  
</template> 
<script>
import {screenShow} from '../../js/server';
export default {
  name:'mostIndex',
  data:function(){
    return {
        indexBol:true,
        base:base,
        textNum:0,
        canvasImgs:'',
        text:'.',
        man:'./../img/www/man.png',
        text:'.',
        textNum:1,
        setOut:{},
        bgImg:'./../img/www/bg.png',
        kjzImg:'./../img/www/kjz.png',
        xie:'./../img/www/xie.png',
        bImg:'./../img/www/kjzBg.png',
        bjq:'./../img/www/setIndex.jpg',
        hjt:'./../img/www/hjt.png',
        manImg:'./../img/www/ren.png',
        lineImg:'./../img/www/xian.png',
        comCanvaB:{
          cxt:{},
          w:0,
          h:0,
          img:['./../img/www/start1.png','./../img/www/start2.png','./../img/www/start3.png','./../img/www/start4.png','./../img/www/start5.png'],
          imgNum:0,
          numbol:true,
          
        },
        userArr:[],
        userObj:{},
        num:0,
        className:0,
        timeObj:{},
        timeObj1:{},
        time:0,
        ifNum:0,
        timeOuts:{}
        
    }
  },
  watch:{
  },
  mounted(){
     this.times();
     this.usersAjax();
     window.timeBol=false;
     this.setOut=setInterval(()=>{this.timeJ()},500);
     base.localRemove();
     this.canvaBImg();
     
  },
  computed: {
    lang(){
      return lang[this.$store.state.vLang.lang];
    },
    len(){
      return this.userArr.length;
    }
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
    timeEnd(time){
         var day=new Date(time).getDate()<10?('0'+new Date(time).getDate()):new Date(time).getDate(),
             month=new Date(time).getMonth()+1<10?(0+(new Date(time).getMonth()+1)):new Date(time).getMonth()+1,
             year=new Date(time).getFullYear(),
             hour=new Date(time).getHours()<10?('0'+new Date(time).getHours()):new Date(time).getHours(),
             getMinutes=new Date(time).getMinutes()<10?('0'+new Date(time).getMinutes()):new Date(time).getMinutes(),
             secon=new Date(time).getSeconds()<10?('0'+new Date(time).getSeconds()):new Date(time).getSeconds()
         return `${hour}:${getMinutes}`;
    },
    timel(time){
         var day=new Date(time).getDate()<10?('0'+new Date(time).getDate()):new Date(time).getDate(),
             month=new Date(time).getMonth()+1<10?(0+(new Date(time).getMonth()+1)):new Date(time).getMonth()+1,
             year=new Date(time).getFullYear(),
             hour=new Date(time).getHours()<10?('0'+new Date(time).getHours()):new Date(time).getHours(),
             getMinutes=new Date(time).getMinutes()<10?('0'+new Date(time).getMinutes()):new Date(time).getMinutes(),
             secon=new Date(time).getSeconds()<10?('0'+new Date(time).getSeconds()):new Date(time).getSeconds();
         if(getMinutes<5){
           getMinutes=5;
         }else if(getMinutes<10&&getMinutes>=5){
           getMinutes=10;
         }else if(getMinutes<15&&getMinutes>=10){
           getMinutes=15;
         } else if(getMinutes<20&&getMinutes>=15){
           getMinutes=20;
         } else if(getMinutes<25&&getMinutes>=20){
           getMinutes=25;
         } else if(getMinutes<30&&getMinutes>=25){
           getMinutes=30;
         } else if(getMinutes<35&&getMinutes>=30){
           getMinutes=35;
         } else if(getMinutes<40&&getMinutes>=35){
           getMinutes=40;
         } else if(getMinutes<45&&getMinutes>=40){
           getMinutes=45;
         } else if(getMinutes<50&&getMinutes>=45){
           getMinutes=50;
         } else if(getMinutes<55&&getMinutes>=50){
           getMinutes=55;
         } else if(getMinutes<60&&getMinutes>=55){
           getMinutes='00';
           hour=Number(hour);
           hour++;
           hour=hour<10?('0'+hour):hour;
         }            
         return `${year}/${month}/${day} ${hour}:${getMinutes}:00`;
    },
    times(){
      let time=new Date().getTime();
      let m=new Date(this.timel(time)).getTime();
      this.time=m-time;
    },
    usersAjax(){
      let time=new Date().getTime();//+(new Date().getTimezoneOffset()/60)*60*60*1000
      //time='1536143688000';
       //console.log(this.time);
       //clearTimeout(this.timeOuts);
       setTimeout(()=>{this.usersAjax();this.num=0;this.className=0;},this.time);
       this.time=5*60*1000
       
       screenShow(`?entryTime=${time}`,(data)=>{
        if(data.code===200){
            
           this.userArr=data.datas;
           if(!this.userArr.length) return this.indexBol=true,clearTimeout(this.timeObj1),clearInterval(this.timeObj);
           clearInterval(this.setOut);
           this.ifNum++;
           this.indexBol=false;
           clearInterval(this.timeObj);
           clearTimeout(this.timeObj1);
           this.userQie();
           this.timeObj=setInterval(()=>{this.userQie();},5000);
           
           
        }else{
           this.base.prompt(data.message,-1,3000)
        }
        
      },(err)=>{
         this.base.prompt(err,-1,3000)
      })
    },
    userQie(){
        this.userObj=this.userArr[this.num];
        this.className=0;
        if(this.num<this.userArr.length-1){
          this.num++;
        }else if(this.userArr.length==1){
          this.num==0;
        }else{
          this.num=0;
        }
        this.timeObj1=setTimeout(()=>{this.className=1;},4500);
        
    },
    canvaBImg(){
        // let canvas=document.getElementById('canvasB');
        // this.comCanvaB.cxt=canvas.getContext('2d');
        // this.comCanvaB.w=canvas.width;
        // this.comCanvaB.h=canvas.height;
        // this.imgB();
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
   .setIndex{
       width:100%;
       .man{
         width:6.12rem;
         padding-top:.66rem;
         margin:0 auto;
         img{
           width:100%;
         }
       }
       .lineText{
         width:12rem;
         margin:.56rem auto 0;
         position:relative;
        //  img{
        //    position:absolute;
        //    top:0;
        //    left:0;
        //    width:100%
        //  }
         .textLine{
           width:100%;
           .textTit{
             color:#fff;
             font-size:.52rem;
             text-align:center;
             p{
               background: #00E5F6;
               line-height:1.2rem;
               display:inline-block;
               border-radius: .8rem;
               color:#fff;
               padding:0 .5rem;
             }
             span{
               display:inline-block;
               margin-top:.5rem;
               width:8rem;
             }
           }
           h1{
             width:100%;
             line-height:1rem;
             font-size:0.8rem;
             color:#00E5F6;
             text-align:center;
             word-break: normal;
             word-break: break-all;
           }
          //  p{
          //    width:100%;
          //    height:1rem;
          //    line-height:1rem;
          //    text-align:center;
          //    color:#00E5F6;
          //    font-size:.48rem;
          //    label{
          //      font-size:.72rem;
          //    }
          //  }
         }
       }
   } 
   .canvasImg{
     width:100%;
     position:absolute;
     height:8rem;
     bottom:.8rem;
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
         width:6.24rem;
         height:5.14rem;
         position:absolute;
         left:1.44rem;
         top:1.8rem;
       }
       .canvasH{
         width:2.6rem;
         height:1.46rem;
         top: 3.8rem;
         left: 5.5rem;
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
         left:5rem;
         top:1.2rem;
       }
     }
     
   }
   .bottomText{
      margin:.6rem auto 0;
      width:14rem;
      
      .bText{
        width:100%;
        .bTextCom{
          width:100%;
          
          overflow:hidden;
          margin-bottom:.5rem;
          h3{
            width:100%;
            line-height:1rem;
            height:2.1rem;
            font-size:.52rem;
            color:#fff;
            text-align:center;
            font-size:400;
            border:1px solid #00E5F6;
            border-bottom:0;
            word-wrap: break-word;
          }
          .bTextComB{
            font-size:.5rem;
            color:#000;
            width:100%;
            background:#00E5F6;
            padding:.5rem .3rem;
            display:flex;
            display:-webkit-flex;
            justify-content:center;
            -webkit-justify-content:center;
            align-items:center;
            -webkit-align-items:center;
            flex-direction: column;
            -webkit-flex-direction: column;
            p{
              width:100%;
              line-height:.6rem;
              word-wrap: break-word;
              text-align:center;
            }
          }
        }
      }
      .quanButton{
        margin:.2rem 0 1rem;
        text-align: center;
        button{
           height:1.34rem;
           display:inline-block;
           padding:0 .6rem;
           color:#fff;
           border:1px solid #00E5F6;
           border-radius:1rem;
           background:none;
           font-size:.56rem;
        }
        .uploadText{
          width:100%;
          text-align:center;
          margin:.66rem 0 1rem;
          p{
            font-size:.48rem;
            border-bottom:1px solid #fff;
            color:#fff;
            display:inline-block;
            padding-bottom:.3rem;
          }
        }
        
      }
   }    
   .optShow{
     opacity: 1;
     transition: opacity .5s;
     -moz-transition: opacity .5s;	/* Firefox 4 */
     -webkit-transition: opacity .5s;	/* Safari 和 Chrome */
     -o-transition: opacity .5s;	/* Opera */
   }
   .optHide{
     opacity: 0;
     transition: opacity .5s;
     -moz-transition: opacity .5s;	/* Firefox 4 */
     -webkit-transition: opacity .5s;	/* Safari 和 Chrome */
     -o-transition: opacity .5s;	/* Opera */
   }
}
</style>