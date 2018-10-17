<template>
    <div class="citylist">
        <div class="listsscroll">
            <div class="lists">
                <p>自动定位</p>
                <div>北京</div>
                <p>省市</p>
                <div v-for="(item,index) in citydata" 
                    @click="tocity"
                    :key="index" 
                    :data-CityID='item.CityID' 
                    :data-ParentID='item.ParentID'>
                    {{item.CityName}}
                </div>
            </div>
        </div>
        <tocity v-if="flags" :ids="ids" @hidedata='hideShow'/>
    </div>
</template>
<script>
import {mapState,mapActions} from 'vuex';
import tocity from './tocity';
export default {
    data(){
        return{
            ids:0,
            flags:false
        }
    },
    computed:{
        ...mapState({
            citydata:(state)=>{
                return state.citypage.citydata
            }
        })
    },
    methods:{
        ...mapActions({
            requestCityData:'citypage/requestCityData'
        }),
        tocity(e){
            this.flags=true;
            // console.log(e.target.dataset.cityid)
            this.ids=e.target.dataset.cityid;
        },
        hideShow(){
            this.flags=false;
        }
    },
    components:{
        tocity
    },
    mounted(){
        this.requestCityData()
    },
}
</script>
<style scoped>
.citylist{
    width: 100%;
    height: 100%;
    background-color: #fff;
    position: fixed;
    top: 0;
    left: 0;
    z-index: 9;
    overflow: hidden;
    padding: 0 .1rem;
    box-sizing: border-box;
}
.listsscroll{
    width: 100%;
    height: 100%;
    overflow: hidden;
    overflow-y: scroll;
}
.lists{
    width: 100%;
}
.lists p{
    width: 100%;
    padding:.05rem .2rem;
    background: #eee;
    box-sizing: border-box;
}
.lists div{
    width: 100%;
    padding: .2rem .1rem;
    box-sizing: border-box;
    border-bottom: 1px solid #ccc;
    position: relative;
}
.lists div:nth-child(2){
    border: none;
}
.lists div:last-child{
    border: none;
}
.lists div::before {
    content: "";
    display: inline-block;
    padding-top: .16rem;
    padding-right: .16rem;
    border-top: 1px solid #999;
    border-right: 1px solid #999;
    -webkit-transform: rotate(45deg);
    transform: rotate(45deg);
    position: absolute;
    right: .2rem;
    top: .34rem;
}
</style>
