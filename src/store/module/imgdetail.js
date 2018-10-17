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
        let arr=[];
        // console.log(payload.List)
        arr.push(...payload.List);
        console.log(arr,'arr')
        state.imgdetailtwo=arr;
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
            // console.log(1)
            state.imgid = obj.ImageID
            state.imgdetailtwo=[];
            obj.Page=state.Page;
            if(state.isFetching){
                return;
            }
            commit('startFetching');
            getimgdetail(obj).then(res=>{
                console.log(res);
                commit('getimgdataTwo',res.data);
            })
        }else if(obj.ImageID==state.imgid){
            obj.Page=state.Page++;
            console.log(obj.Page)
            if(state.isFetching){
                return;
            }
            commit('startFetching');
            getimgdetail(obj).then(res=>{
                // console.log(res);
                commit('getimgdataTwo',res.data);
            })
        }
        
        // console.log(obj)
    }
}
export default {
    namespaced:true,
    state,
    getters,
    mutations,
    actions
}