import Vue from 'vue';

import canvasKJZ from './../vue/component/canvasKJZ.vue'
// 这里是重点
const canvasK = {
    install: function(Vue){
        Vue.component('canvas-kjz',canvasKJZ)
    }
}
Vue.use(canvasK);


import router from './../vue/router/router';
import store from './../vue/store/store';


Vue.config.productionTip = false
// import VueHighcharts from 'vue-highcharts';
// import Highcharts from 'highcharts/highstock';

// Vue.use(VueHighcharts, { Highcharts });

import App from './../vue/main.vue';

router.beforeEach((to, from, next) =>{
   //判断路由是否正确
   if(!!to.name){
     next()
   }else{
     next({name:'sos'});
   }
   
})
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
});



 
