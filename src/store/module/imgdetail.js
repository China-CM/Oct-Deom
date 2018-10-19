import {getimgdetail} from '../../api/index.js'

const state={//默认
    imgpagedata:[],
    Page:1,
    isFetching:false,
    imgdetailtwo:[],
    imgid: null
}
const getters={//派生

}
const mutations={//同步
    getdata(state,payload){
        state.imgpagedata=state.imgpagedata.concat(payload.List);
        // console.log(state.imgpagedata)
        state.Page++;
        state.isFetching=false;
    },
    startFetching(state){
        state.isFetching=true;
    },
    getimgdataTwo(state,payload){
        state.imgdetailtwo=payload.List;
        // console.log(state.imgdetailtwo)
    }
}
const actions={//异步
    getimgdata({commit,state},obj){
        // console.log(obj)
        obj.Page=state.Page;
        if(state.isFetching){
            return;
        }
        commit('startFetching');
        getimgdetail(obj).then(res=>{
            // console.log(res);
            commit('getdata',res.data);
        })
    },
    getimgdataTwo({commit,state},obj){
        if(obj.ImageID != state.imgid){
            state.imgid = obj.ImageID
            getimgdetail(obj).then(res=>{
                // console.log(res.data)
                commit('getimgdataTwo',res.data);
            })
        }
    }
}
export default {
    namespaced:true,
    state,
    getters,
    mutations,
    actions
}