<template lang="html">
	<div class="kjz">
		 <canvas class="canvas" :id="id" :width="5*sizeW*size+'px'" :height="6.1*sizeH*size+'px'"></canvas>
     <div class="kjzBj" :style="{'width':6*sizeW+'rem','height':6*sizeH+'rem','margin-left':-(6*sizeW)/2+'rem'}"><img class="qiu" :src="bImg"></div>
	</div>
</template>	
<script>
//以下都是倍数
//sizeW宽度倍数,sizeH高度倍数,speed上下移动速度,spd角度移动速度,speedW左右移动速度，time为延迟动画时长,cImg为画布图片,bImg为画布背景
export default {
	name:'databoll',
	props: {
    id:{
      type:String
    },
		sizeW:{
			type:Number
    },
    sizeH:{
			type:Number
    },
    width:{
      type:Number
    },
    height:{
      type:Number
    },
		speed:{
			type:Number
		},
		spd:{
			type:Number
    },
    speedW:{
      type:Number
    },
    time:{
      type:Number
    },
    cImg:{
      type:String
    },
    bImg:{
      type:String
    }
	},
  data(){
    return {
			rNum:0.00034,
			numOne:0,
			numbol:false,
			w:0,
      h:0,
      size:size,
			img:new Image(),
			cxt:{},
    }
  },
  watch:{
    
  },
  mounted(){
    
    setTimeout(()=>{this.canvasImg();},this.time);
    
    
	},
  methods:{
     canvasImg(){
        let canvas=document.getElementById(this.id);
        this.cxt=canvas.getContext('2d');
        this.w=canvas.width;
        this.h=canvas.height;
        this.img.src=this.cImg;
        this.img.onload=()=>{
          this.cxt.translate(0.5 * this.w, .5 * this.h);
          this.imgD();
        }; 
        
        
		},
		imgD(){   
       if(this.numOne>=24) this.numbol=false;
       if(this.numOne<=-24) this.numbol=true;
       
       if(this.numbol){
         this.numOne++;
         this.cxt.rotate(this.rNum*this.spd);  
       }else{
         this.numOne--;
         this.cxt.rotate(-this.rNum*this.spd);  
       }
       
       let numC=this.numOne * this.rNum*this.speed;
       let numW=this.numOne * this.rNum*this.speedW;
       this.cxt.clearRect(-0.5 * this.w, -.5 * this.h,this.w,this.h);
       this.cxt.save();
       this.cxt.drawImage(this.img,-0.5 * this.w+numW, -.5 * this.h+numC,this.w*this.width,this.h*this.height);
       this.cxt.restore();  
       if(window.timeBol) return !1;
       //console.log(this.id);
       requestAnimFrame(this.imgD);
    }

  }
};

</script>
<style rel="stylesheet/scss" lang="scss" scoped>
.kjz{
  position:relative;
  text-align:center;
	.kjzBj{
     position:absolute;
     width:6rem;
     height:6rem;
     left:50%;
     top:0;
     .qiu{
        width:100%;
        
      }
   }
   
}
</style>