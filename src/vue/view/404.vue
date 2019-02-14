<template lang="html">
   <div class="index404">
        <div class="center">
            <p>Sorry ! 您访问的页面不存在......</p>
        </div>  
    </div>
</template> 
<script>
export default {
  name:'404',
  data:function(){
    return {
        base:base,
        
    }
  },
  watch:{
    
  },
  mounted(){
  },
  computed: {
    
  },
  components:{
     
  },
  methods:{
    
  }
};
</script>
<style rel="stylesheet/scss" lang="scss" scoped>
.index404{
  position:absolute;
  width:100%;
  height:100%;
  background:#fff;
  display:flex;
  display:-webkit-flex;
  justify-content:center;
  -webkit-justify-content:center;
  align-items:center;
  -webkit-align-items:center;
  .center{
    img{
      width:7.44rem;
      height:4.7rem;
    }
    p{
      height:.48rem;
      font-size:.48rem;
      font-family:STYuanti-SC-Regular;
      color:#666;
      width:100%;
      text-align:center;
    }
  }
  
}
</style>