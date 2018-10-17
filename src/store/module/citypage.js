import {getcitydata,getprovincedata} from '../../api';
const state={
    citydata:[],
    provincedata:[]
}
const getters={

}
const mutations={
    getcitydata(state,payload){
        // console.log(payload)
        state.citydata=payload;
    },
    getprovincedata(state,payload){
        // console.log(payload)
        state.provincedata=payload;
    }
}
const actions={
    requestCityData({commit}){
        getcitydata().then(res=>{
            commit('getcitydata',res.data);
        })
    },
    requestprovince({commit},payload){
        getprovincedata(payload).then(res=>{
            commit('getprovincedata',res.data);
        })
    }
}
export default{
    namespaced:true,
    state,
    getters,
    mutations,
    actions
}