import {getimgdata} from '../../api/index.js'

const state={//默认
    imgpagedata:[]
}
const getters={//派生

}
const mutations={//同步
    imgpagedata(state,payload){
        // console.log(payload.data)
        state.imgpagedata=payload.data;
    }
}
const actions={//异步
    imgpage({commit},obj){
        console.log(obj,'objobjobj')
        getimgdata(obj).then(res=>{
            // console.log(res,'resres')
            commit('imgpagedata',res)
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