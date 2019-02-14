import Vue from 'vue';
import iView from 'iview';
import 'iview/dist/styles/iview.css';
Vue.use(iView);
Vue.config.productionTip = false
// import VueHighcharts from 'vue-highcharts';
// import Highcharts from 'highcharts/highstock';

// Vue.use(VueHighcharts, { Highcharts });

import App from './../vue/view/ba/index.vue';
/* eslint-disable no-new */
new Vue({
  el: '#app',
  components: { App },
  template: '<App/>'
})
