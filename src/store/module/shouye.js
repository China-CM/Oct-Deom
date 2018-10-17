import {getBrandList,getMakeList,getdetailList,getlowpricedata} from '../../api/index.js'
import {mergedata,sortdata,filterdata} from '../../utils/tablist'

const state={//默认
    indexdatalists:[],
    cardata:[],
    detaildata:{},
    tablist:{},
    yearsdata:[],
    lowpricedata:{}
}
const getters={//派生

}
const mutations={//同步
    updatalists(state,payload){
        var obj = {};
        payload.forEach(function(item) {
            var key = item.Spelling.slice(0,1);
            if (!obj[key]) {
                obj[key] = {
                    title: key,
                    list: []
                }
            }
            obj[key].list.push(item);
        })
        var arr = [];
        for (var k in obj) {
            arr.push(obj[k]);
        }
        state.indexdatalists=arr
    },
    carlistdata(state,payload){
        state.cardata=payload
    },
    detaildata(state,payload){
        // console.log(payload)
        state.detaildata=payload;
        let arr=payload.list.map((val,ind)=>{
           return val.market_attribute.year
        })
        let newarr=Array.from(new Set(arr))
        newarr.unshift('全部')
        state.yearsdata=newarr
        state.tablist=mergedata(sortdata(filterdata('全部',state.detaildata.list)))
    },
    howyears(state,payload){
        state.tablist=mergedata(sortdata(filterdata(payload,state.detaildata.list)))
    },
    getlowpricedata(state,payload){
        // console.log(payload.data)
        state.lowpricedata=payload.data;
    }
}
const actions={//异步
    dispatch({commit}){
        getBrandList().then(res=>{
            commit('updatalists',res.data);
        })
    },
    carslists({commit},ids){
        getMakeList(ids).then(res=>{
            commit('carlistdata',res.data);
        })
    },
    godetail({commit},ids){
        getdetailList(ids).then(res=>{
            commit('detaildata',res.data);
        })
    },
    getyear({commit},year){
        commit('howyears',year)
    },
    getlowprice({commit},obj){
        getlowpricedata(obj).then(res=>{
            commit('getlowpricedata',res)
        })
    }
}
export default {
    namespaced:true,
    state,
    getters,
    mutations,
    actions
}