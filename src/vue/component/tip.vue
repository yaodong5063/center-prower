<template lang="html">
	<div class='promptMid' style='position:fixed;line-height:.8rem;top:50%;left:50%;background:rgba(0,0,0,.5);box-shadow: 0px .08rem .32rem 0px rgba(0,0,0,0.1);border-radius:.16rem ;padding:.4rem .64rem;z-index: 999;'>
		<p>
		  <em v-if="code==-1" style="color:#fff;font-size: .56rem;">{{text}}</em>
		  <em v-if="code==0" style="color:#fff;font-size: .56rem;">{{text}}</em>
		  <em v-if="code==1" style="color:#fff;font-size: .56rem;">{{text}}</em>
		</p>
	</div>	
</template>	
<script>
export default {
	name:'share',
	props: {
		code:{
			type:Number
		},
		text:{
			type:String
		},
		time:{
			type:Number
		}
	},
  data(){
    return {
			
    }
  },
  watch:{
    
  },
  mounted(){
	//this.wxAjax();
  },
  methods:{
		

  }
  
};

</script>
