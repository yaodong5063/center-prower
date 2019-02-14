<template>
	<transition>
      <router-view></router-view>
    </transition>
</template>	
<script>
export default {
  data(){
    return {

    }
  },
  mounted(){
    this.heights();
    let resizeEvt = 'orientationchange' in window ? 'onorientationchange' : 'onresize';
    window[resizeEvt] = () => {
       this.heights()
    }
  },
  methods:{
    heights(){
       this.$store.commit('cHeight');
    },
  }
};
</script>


