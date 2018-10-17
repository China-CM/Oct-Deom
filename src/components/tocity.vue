<template>
    <div class="cityfixed">
        <div class="leftbox" @click='cityhide'></div>
        <div class="rightbox">
            <div class="rightscroll">
                <div class="citydata" @click="getval(item.CityName,item.CityID)" v-for="(item,index) in provincedata" :key="index">
                    {{item.CityName}}
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import {mapState,mapActions} from 'vuex';
export default {
    props:['ids'],
    computed:{
        ...mapState({
            provincedata:(state)=>{
                return state.citypage.provincedata;
            }
        })
    },
    methods:{
        ...mapActions({
            requestprovince:'citypage/requestprovince'
        }),
        cityhide(){
            this.$emit('hidedata')
        },
        getval(val,cityid){
            eventBus.$emit('getval',{val:val,flags:false,cityId:cityid})
        }
    },
    mounted(){
        this.requestprovince(this.ids)
    },
    components:{

    }
}
</script>
<style>
.cityfixed{
    width: 100%;
    height: 100%;
    position: fixed;
    z-index: 99;
    left: 0;
    top: 0;
    background:rgba(0,0,0,0.6);
    overflow: hidden;
    overflow-y: scroll;
    overflow: hidden;
    display: flex;
}
.leftbox{
    flex:25%;
}
.rightbox{
    width: 75%;
    height: 100%;
    overflow: hidden;
    overflow-y: scroll;
    background-color: #fff;
}
.rightscroll{
    width: 100%;
    padding: 0 .1rem;
    box-sizing: border-box;
}
.citydata{
    border-bottom: 1px solid #eee;
    padding: .2rem .2rem;
    box-sizing: border-box;
}
</style>
