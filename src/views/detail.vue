<template>
    <div class="detailbox">
        <div class="bannerImg">
            <img :src='detaildata.CoverPhoto' :data-ids='detaildata.SerialID' @click="goimgpage"/>
        </div>
        <div class="askPrice">
            <div>
                <p style="color:red;font-size:.34rem">{{detaildata.market_attribute&&detaildata.market_attribute.dealer_price}}</p>
                <p style="color:#ccc;font-size:.28rem">指导价{{detaildata.market_attribute&&detaildata.market_attribute.official_refer_price}}</p>
            </div>
            <button style="background:red">{{detaildata.BottomEntranceTitle}}</button>
        </div>
        <div class="lists">
            <div class="tab">
                <span v-for="(item,index) in yearsdata" :key="index"  @click='clicks(item)'>{{item}}</span>
            </div>
            <div class="tablist">
                <div class='listdata' v-for="(val,key,index) in tablist" :key="index">
                    <p class="listtit">{{key}}</p>
                    <div class="listbox" v-for="(v,i) in val" :key="i">
                        <p>{{v.market_attribute.year}} {{v.car_name}}</p>
                        <p>{{v.horse_power}}马力{{v.gear_num}}档</p>
                        <p><span>指导价{{v.market_attribute.official_refer_price}}<span>{{v.market_attribute.dealer_price_min}}起</span></span></p>
                        <div class="btn" @click='ToLowPricePage(detaildata.list[0].car_id)' :data-routes="v.car_id">询问低价</div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import {mergedata,sortdata,filterdata} from '../utils/tablist'
import {mapState,mapActions} from 'vuex'
export default {
    computed:{
        ...mapState({
            yearsdata:(state)=>{
                return state.shouye.yearsdata;
            },
            detaildata:(state)=>{
                console.log(state.shouye.detaildata)
                return state.shouye.detaildata;
            },
            tablist:(state)=>{
                return state.shouye.tablist;
            }
        })
    },
    methods:{
        ...mapActions({
           godetail:'shouye/godetail'
        }),
        clicks(year){
            this.$store.dispatch('shouye/getyear',year)
        },
        ToLowPricePage(id){
            console.log(id)
            this.$router.push({
                path:"/toalowprice",
                query:{
                    carId:id
                }
            })
        },
        goimgpage(e){
            this.$router.push({
                path:'/imagepage',
                query:{
                    ids:e.target.dataset.ids
                }
            })
        }
    },
    beforeUpdate(){
        
    },
    mounted(){
        this.godetail(this.$route.query.SerialID)
    },
    updated(){

    }
    
}
</script>
<style scoped>
.blue{
    color: blue
}
.detailbox{
    width: 100%;
    height: 100%;
    background: #eee;
    overflow: hidden;
    overflow-y: scroll
}
.bannerImg{
    width: 100%;
    height: 3.4rem;
}
.bannerImg img{
    width: 100%;
    height: 100%;
}
.askPrice{
    background: #fff;
    width: 100%;
    display: flex;
    padding: .2rem .2rem;
    box-sizing: border-box;
    justify-content: space-between;
    align-items: center;
}
.askPrice button{
    padding: .15rem 1.2rem;
    color: #fff;
    border: none;
    background: skyblue;
    border-radius: 5px
}
.lists{
    margin-top: .2rem;
    width: 100%;
}
.tab{
    width:100%;
    padding: .2rem 0;
    background: #fff;
}
.tab span{
    margin: 0 .2rem;
}
.tablist{
    width: 100%;

}
.listdata{
    width: 100%;
}

.listtit{
    width: 100%;
    padding: .1rem .2rem;
    box-sizing: border-box;
    background: #eee;
}
.listbox{
    width: 100%;
    background: #fff;
}
.listbox p{
    padding: .1rem .1rem;
    box-sizing: border-box;
}
.listbox p span{
    margin: 0 .1rem;
}
.listbox p:nth-child(3){
    text-align: right;
}
.btn{
    width: 100%;
    background: #fff;
    text-align: center;
    padding: .2rem 0;
    border-top: 1px solid #ccc;
    color: skyblue;
}
</style>
