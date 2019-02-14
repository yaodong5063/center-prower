<template lang="html">
  <div class="mostIndex" id="setIndex" :style="{height:$store.state.vLang.height+'rem'}">
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
             <p>{{lang.setIndex.name}}</p>
             <span>{{userObj.poems}}</span>
           </div>
           <!-- <h1>{{names}}</h1>
           <p>{{lang.setIndex.textOne}}<label>{{userObj.uid/9999>1?(userObj.uid-Math.floor(userObj.uid/9999)*9999):userObj.uid}}</label>{{lang.setIndex.textTwo}}</p> -->
         </div>
       </div>
        
     </div>
     <div class="bottomText">
        <div class="bText">
           <div class="bTextCom">
             <h3>{{names}}</h3>
             <div class="bTextComB">
               <p>{{lang.setIndex.textOne}}{{userObj.uid/9999>1?(userObj.uid-Math.floor(userObj.uid/9999)*9999):userObj.uid}}{{lang.setIndex.textTwo}}</p>
             </div>
           </div>
           <div class="bTextCom">
             <h3>{{lang.setIndex.hash}}</h3>
             <div class="bTextComB">
               <p>{{userObj.hash}}</p>
             </div>
           </div>
        </div>
        <div class="quanButton">
          <button @click="beeNext">{{lang.setIndex.jia}}</button>
          <!-- <div class="uploadText">
            <p  @click="downLoad">{{lang.setIndex.load}}</p>
          </div> -->
        </div>
    </div>
    <div class="canvasImg">
      <!-- <canvas id="canvasB" class="canvasB"></canvas> -->
      <div class="canvasDiv">
        <!-- <div class="bgq">
          <img :src="bjq" width="100%" />
        </div> -->
        <div class="canvasKJZ canvasCom">
          <canvas-kjz :id="'canvasKJZ'"  :width=1 :height=1 :sizeW=1.2 :sizeH=1.2 :speed=300 :spd=1.5 :speedW=0 :cImg="xie" :time=200></canvas-kjz>
        </div>
         
      </div>    
    </div>
    
  </div>
</template> 
<script>
// import htmlCanvas from 'html2canvas';
// import {wxConfig} from '../../js/server';
export default {
  name:'mostIndex',
  data:function(){
    return {
        base:base,
        textNum:0,
        canvasImgs:'',
        text:'.',
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
        userObj:!!localStorage.user?JSON.parse(localStorage.user):{},
        names:!!localStorage.input?JSON.parse(localStorage.input).name:'',
        timeObj:{},
        image:'',
        appid:'wxa3acc7ca5b6767d4',
        
    }
  },
  watch:{
    
  },
  mounted(){
     this.canvaBImg();
     base.localRemove();
     window.timeBol=false;
     setTimeout(()=>{this.uploadImg();this.wx();},50);
     
  },
  computed: {
    lang(){
      return lang[this.$store.state.vLang.lang];
    }
  },
  components:{
     
  },
  methods:{
    beeNext(){
      window.timeBol=true;
      clearTimeout(this.timeObj);
      setTimeout(()=>{this.$router.replace('bee');},30);
    },
    uploadImg(){
      // htmlCanvas(document.body, { // $(".myImg")是你要复制生成canvas的区域，可以自己选
      //   // onrendered:function(canvas){
      //   //     let dataURL =canvas.toDataURL("image/png");
      //   //     console.log(dataURL)
      //   //   },
      //   background:'#000'
      // }).then((canvas)=>{
      //   this.image = canvas.toDataURL("image/png"); 
        
      // });
    },
    downLoad(){
        // let aLink = document.createElement('a');
        // let blob = this.base64ToBlob(this.image); //new Blob([content]);

        // let evt = document.createEvent("HTMLEvents");
        // evt.initEvent("click", true, true);//initEvent 不加后两个参数在FF下会报错  事件类型，是否冒泡，是否阻止浏览器的默认行为
        // aLink.download = new Date().getTime()+'.png';
        //aLink.href = URL.createObjectURL(blob);

        // // aLink.dispatchEvent(evt);
        // aLink.click();
        //alert(wx.chooseImage);
        

        
    },
    base64ToBlob(code) {
        // let parts = code.split(';base64,');
        // let contentType = parts[0].split(':')[1];
        // let raw = window.atob(parts[1]);
        // let rawLength = raw.length;

        // let uInt8Array = new Uint8Array(rawLength);

        // for (let i = 0; i < rawLength; ++i) {
        //   uInt8Array[i] = raw.charCodeAt(i);
        // }
        // return new Blob([uInt8Array], {type: contentType});
    },
    refresh(){

    },
    inpiutClick(val){
      
      
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
       
       this.timeObj=setTimeout(()=>{this.imgB()},300);
    },
    wx(){
      // let obj={};
      // obj.url='http://power.blockchaincentreglobal.com/'
      // wxConfig(obj,(data)=>{
      //   if(data.code===200){
      //      let {datas:_data}=data;
      //      let _this=this;
      //      wx.config({
      //         debug: true,////生产环境需要关闭debug模式
      //         appId: _data.appId,//appId通过微信服务号后台查看
      //         timestamp: _data.timestamp,//生成签名的时间戳
      //         nonceStr: _data.noncestr,//生成签名的随机字符串
      //         signature: _data.signature,//签名
      //         jsApiList: [//需要调用的JS接口列表
      //             'chooseImage',
      //             'previewImage',
      //             'uploadImage',
      //             'downloadImage'
      //         ]
      //     });
      //     wx.ready(function () {
      //           wx.checkJsApi({
      //               jsApiList: [
      //                   'chooseImage',
      //                   'previewImage',
      //                   'uploadImage',
      //                   'downloadImage'
      //               ],
      //               success: function (res) {
      //                   //alert(JSON.stringify(res));
      //                   //alert(JSON.stringify(res.checkResult.getLocation));
      //                   if (res.checkResult.getLocation == false) {
      //                       alert('你的微信版本太低，不支持微信JS接口，请升级到最新的微信版本！');
      //                       return;
      //                   }else{
      //                       //wxChooseImage();
      //                   }
      //               }
      //           });
      //     });
      //     wx.error(function(res){
      //           // config信息验证失败会执行error函数，如签名过期导致验证失败，具体错误信息可以打开config的debug模式查看，也可以在返回的res参数中查看，对于SPA可以在这里更新签名。
      //           alert("验证失败，请重试！");
      //           wx.closeWindow();
      //     });
      //   }else{
      //      this.base.prompt(data.message,-1,3000)
      //   }
        
      // },(err)=>{
      //   this.base.prompt(err,-1,3000)
      // })
      
      
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
     bottom:.5rem;
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
      width:14rem;
      margin:.6rem auto 0;

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
}
</style>