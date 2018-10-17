import Vue from 'vue';
import Vuex from 'vuex';
import Logger from 'vuex/dist/logger';

import shouye from './module/shouye.js';
import imgpage from './module/imgpage';
import imgdetail from './module/imgdetail';
import citypage from './module/citypage';
import getcolordata from './module/getcolordata'
Vue.use(Vuex);
export default new Vuex.Store({
    state:{
        loading:true
    },
    mutations:{
        changeLoading(state,payload){
            state.loading=payload;
        }
    },
    modules:{
        shouye,
        imgpage,
        imgdetail,
        citypage,
        getcolordata
    },
    plugins:[Logger()]
})
