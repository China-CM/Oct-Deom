import {getcolordata} from '../../api'
const state={
    alldata:{},
    years:[],
    colordata:[]
}
const getter={

}
const mutations={
    getcolordata(state,payload){
        state.alldata=payload.data;
        state.years=Object.keys(payload.data).reverse();
        // state.colordata=payload.data['2017']
        // console.log(state.colordata)
        // state.years=payload.data
    },
    getcolor(state,payload){
        state.colordata=state.alldata[payload];
    }
}
const actions={
    requestcolordata({commit},ids){
        getcolordata(ids).then(res=>{
            commit('getcolordata',res)
        })
    },
    getcolordata({commit},txt){
        commit("getcolor",txt)
    }
}
export default{
    namespaced:true,
    state,
    getter,
    mutations,
    actions
}