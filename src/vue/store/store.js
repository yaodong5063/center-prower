import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

const vLang={
  state:{
    height:26.5,
    lang:localStorage.lang=='en'?'en':'cn',
    obj:{
      name:'',
      phone:'',
      email:'',
      poems:'',
      gender:'',
      ageType:'',
      chainType:'',
      language:''
    }
  },
  mutations:{
    cHeight(state){
       let w=document.documentElement.clientWidth;
       let h=document.documentElement.clientHeight;

       let size= 50*(w / 750);
       let b=h/size;
       state.height=b>21?b:'26';
    },
    modelLang(state,name){
      state.lang=name;
      state.obj.language=name;
    },
    inputCom(state,obj){
        Object.assign(state.obj,obj);
    }
  }
};
const local={
  state:{
    most:[],
    mostTwo:[],
    mostThree:[]
  },
  mutations:{
    mOne(state,arr){
        state.most=arr;
    },
    mTwo(state,arr){
        state.mostTwo=arr;
    },
    mThree(state,arr){
        state.mostThree=arr;
    },
  }
}

const store = new Vuex.Store({
    state: {
      
    },
    mutations: {
      

    },
    modules:{
      vLang,
      local
    }
  });

  export default store;