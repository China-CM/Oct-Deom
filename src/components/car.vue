<template>
    <div class="carbox">
        <div v-for="(item,index) in carlists" :key="index" class="carlists">
            <p class="toptit">{{item.GroupName}}</p>
            <dl v-for="(v,i) in item.GroupList" :key="i" class="cardl" @click='godetaildata(v.SerialID)'>
                <dt>
                    <img :src='v.Picture'/>
                </dt>
                <dd>
                    <p><span>{{v.AliasName}}</span></p>
                    <p><span>{{v.DealerPrice}}</span></p>
                </dd>
            </dl>
        </div>
    </div>
</template>
<script>
import {mapState,mapActions} from 'vuex';
export default {
    computed:{
        ...mapState({
            carlists:(state)=>{
                return state.shouye.cardata;
            }
        })
    },
    methods:{
       ...mapActions({
           godetail:'shouye/godetail'
       }),
       godetaildata(ids){
           this.godetail(ids)
           this.$router.push({
               path:'/detail',
               query:{
                   SerialID:ids
               }
           })
       }
    },
    mounted(){
    }
}
</script>
<style>
    .carbox{
        width: 100%;
    }
    .carlists{
        width: 100%
    }
    .toptit{
        width: 100%;
        background: #ccc;
        padding:.1rem .4rem;
        box-sizing: border-box; 
    }
    .cardl{
        padding: .1rem 0;
        box-sizing: border-box;
        width: 100%;
        display: flex;
        border-bottom: 1px solid #ccc;
        align-items: center;
    }
    .cardl dt{
        width: 30%;
    }
    .cardl dt img{
        width: 100%;
    }
    .cardl dd{
        flex:1;
        padding-left: .2rem;
        box-sizing: border-box;
    }

</style>
