<template>
    <div class="lists">
        <div class="tab">
            <p class="tab_top" v-if="item=='全部'" v-for="(item,index) in yearsdata" :key="index"  @click='goback(item,index)'>全部车款</p> 
            <p class="c-type"> 
                <span v-if="item!=='全部'" :class="ids==index?'active':''" v-for="(item,index) in yearsdata" :key="index"  @click='clicks(item,index)'>{{item}}</span>
            </p>
        </div>
        <div class="tablist">
            <div class='listdata' v-for="(val,key,index) in tablist" :key="index">
                <p class="listtit">{{key}}</p>
                <div class="listbox" @click="gobackdetail" v-for="(v,i) in val" :key="i" :data-ind='v.car_id' :data-val='v.market_attribute.year+v.car_name'>
                    <p>
                        <span>{{v.market_attribute.year}} {{v.car_name}}</span> 
                        <span>{{v.market_attribute.dealer_price_min}}起</span>
                    </p> 
                    <p>
                        <span>{{v.horse_power}}马力{{v.gear_num}}档</span> 
                        <span>指导价{{v.market_attribute.official_refer_price}}</span>
                    </p>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import {mapState,mapActions} from 'vuex';
export default {
    data(){
        return{
            ids:0
        }
    },
    computed:{
        ...mapState({
            yearsdata:(state)=>{
                // console.log(state.shouye.yearsdata)
                return state.shouye.yearsdata;
            },
            tablist:(state)=>{
                // console.log(state.shouye.tablist,'dadaaadadadadad')
                return state.shouye.tablist;
            }
        })
    },
    methods:{
        ...mapActions({
           godetail:'shouye/godetail'
        }),
        backroute(){
            this.$router.back(-1)
        },
        clicks(year,index){
            this.$store.dispatch('shouye/getyear',year)
            this.ids=index;
        },
        goback(val){
            window.sessionStorage.setItem('cartype',JSON.stringify({SerialID:this.$route.query.SerialID,tit:val}))
            this.$router.go(-1)
        },
        gobackdetail(e){
            // console.log(e.srcElement.parentNode,'adaadadhal嘿嘿');
            // console.log(e.target.dataset.ind,'e.target.dataset')
            window.sessionStorage.setItem('cartype',JSON.stringify({SerialID:this.$route.query.SerialID,CarID:e.target.dataset.ind,tit:e.currentTarget.dataset.val}))
            this.$router.go(-1)
        }
    },
    mounted(){
        // console.log(this.$route.query)
        window.sessionStorage.removeItem('carcolor')
        this.godetail(this.$route.query.SerialID)
    },
}
</script>
<style scoped>
.lists{
    width: 100%;
    height: 100%;
    background-color: #eee;
}
.tab{
    width: 100%;
    background-color: #eee;
}
.tab_top{
    font-size: .34rem;
    color: #00afff;
    background: #fff;
    text-align: center;
    line-height: .8rem;
    height: .8rem;
}

.c-type {
    margin-top: .15rem;
    font-size: .3rem;
    line-height: .76rem;
    height: .76rem;
    background: #fff;
    overflow-x: scroll;
    -webkit-overflow-scrolling: touch;
}
.c-type span{
    margin: 0 .2rem;
}
.c-type span.active, .type .c-type span.active {
    color: #00afff;
}
.tablist{
    width: 100%;
}
.listtit{
    width: 100%;
    padding: .2rem 0 .1rem .2rem;
    box-sizing: border-box;
    font-size: .24rem;
    color: #666;
}
.listbox{
    background-color: #fff;
    padding: .28rem .2rem;
    border-bottom: 1px solid #eee;
    box-sizing: border-box;
    height: 1.25rem;
    line-height: 1;
}

.listbox p:first-child span:nth-child(1) {
    width: 5rem;
    display: inline-block;
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
}
.listbox p:first-child {
    font-size: .3rem;
}
.listbox p:first-child span:nth-child(2) {
    float: right;
    color: red;
    font-size: .26rem;
}
.listbox p:nth-child(2) span:first-child {
    color: #b3b3b3;
}
.listbox p:nth-child(2) {
    padding-top: .16rem;
    font-size: .24rem;
}
.listbox p:nth-child(2) span:nth-child(2) {
    color: #818181;
    float: right;
}
</style>
