import Vue from 'vue'
import Router from 'vue-router'
import main from '../view/main.vue'
import index from '../view/index.vue'
import input from '../view/input.vue'
import select from '../view/select.vue'
import age from '../view/age.vue'
import stand from '../view/stand.vue'
import most from '../view/most.vue'
import mostTwo from '../view/mostTwo.vue'
import mostThree from '../view/mostThree.vue'
import load from '../view/load.vue'
import setIndex from '../view/setIndex.vue'
import bee from '../view/bee.vue'
import endIndex from '../view/endIndex.vue'
import setHua from '../view/setHua.vue'
import sos from '../view/404.vue'
Vue.use(Router)

export default new Router({
  routes: [
    { 
      path: '/',
      name: 'main',
      component: main,
      redirect:'/index',
      children:[
        { path: '/index', name: 'index', component: index },
        { path: '/user', name: 'input', component: input },
        { path: '/sex', name: 'select', component: select },
        { path: '/age', name: 'age', component: age },
        { path: '/stand', name: 'stand', component: stand },
        { path: '/most', name: 'most', component: most },
        { path: '/mostTwo', name: 'mostTwo', component: mostTwo },
        { path: '/mostThree', name: 'mostThree', component: mostThree },
        { path: '/load', name: 'load', component: load },
        { path: '/home', name: 'setIndex', component: setIndex },
        { path: '/bee', name: 'bee', component: bee },
        { path: '/endIndex', name: 'endIndex', component: endIndex },
        { path: '/users', name: 'setHua', component: setHua },
      ] 
    },
    { 
      path: '/404',
      name: 'sos',
      component: sos
    },
  ]
});