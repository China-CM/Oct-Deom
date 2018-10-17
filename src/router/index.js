import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '../store';
let Index=()=>import('@/views/index')
let detail=()=>import('@/views/detail')
let toalowprice=()=>import('@/views/toalowprice')
let imagepage=()=>import('@/views/imagepage')
let getcolorcar=()=>import('@/views/getcolorcar');
Vue.use(VueRouter)

let router= new VueRouter({
    routes:[{
            path:'/',
            name:'Index',
            component:Index
        },{
            path:'/detail',
            name:detail,
            component:detail
        },{
            path:"/toalowprice",
            name:toalowprice,
            component:toalowprice
        },{
            path:'/imagepage',
            name:imagepage,
            component:imagepage
        },{
            path:'/getcolorcar',
            name:getcolorcar,
            component:getcolorcar
        },{
            path:"*",
            redirect:'/Index'
        }
    ]
})

router.beforeEach((to,from,next)=>{
    store.commit('changeLoading',true);
    next();
})
router.afterEach(()=>{
    setTimeout(()=>{
        store.commit('changeLoading',false);
    },2000);
})
export default router;