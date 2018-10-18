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
        console.log(state.alldata)
        // state.years=payload.data
    }
}
const actions={
    requestcolordata({commit},ids){
        getcolordata(ids).then(res=>{
            commit('getcolordata',res)
        })
    }
}
export default{
    namespaced:true,
    state,
    getter,
    mutations,
    actions
}