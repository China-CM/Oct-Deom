<template>
    <div class="loprice_wrap">
        <div class="loprice_box">
            <div class="lowprice_top">
                <img :src='lowpricedata.details&&lowpricedata.details.serial.Picture'/>
                <div>
                    <p>{{lowpricedata.details&&lowpricedata.details.serial.AliasName}}</p>
                    <p>{{lowpricedata.details&&lowpricedata.details.market_attribute.year}} {{lowpricedata.details&&lowpricedata.details.car_name}}</p>
                </div>
                <div class="sanjiao">
                </div>
            </div>
            <div class="self-info">
                <p class="tip">个人信息</p> 
                    <ul>
                        <li>
                            <span>姓名</span> 
                            <input type="text" @blur="cnamesfn" placeholder="输入你的真实中文姓名" maxlength="4">
                        </li> 
                        <li>
                            <span>手机</span> 
                            <input type="tel" @blur="cphonefn" placeholder="输入你的真实手机号码" maxlength="11">
                        </li> 
                        <li>
                            <span>城市</span> 
                            <span @click="citychoose">{{citydefault}}</span>
                        </li>
                    </ul> 
                    <div class="question">
                        <button @click="ismask">询最低价</button>
                    </div>
            </div>
            <div class="dealer-info">
                <p class="tip">选择报价经销商</p> 
                <ul>
                    <li :class="idx.indexOf(item.dealerId)==-1?'':'active'"  data-hover="hover" :data-id="item.dealerId"  v-for="(item,index) in lowpricedata.list" :key="index" @click='actives(item.dealerId)'>
                        <p>
                            <span>{{item.dealerShortName}}</span> 
                            <span>{{item.promotePrice}}万</span>
                        </p> 
                        <p>
                            <span>{{item.address}}</span> 
                            <span>售{{item.saleRange}}</span>
                        </p>
                    </li>
                </ul>
            </div>
        </div>
        <delog v-show="sure" @namesverify='namesverify'/>
        <phoneverify v-show="flag" @phoneverify='phoneverify'/>
        <success @success='successful' v-show="success"/>
        <citypage v-if="cityShow"/>
    </div>
</template>
<script>
import {mapState,mapActions} from 'vuex';
import success from '../components/success.vue';
import delog from '../components/delog.vue';
import phoneverify from '../components/phoneverify.vue';
import citypage from '../components/citypage.vue';
let arr=[];
export default {
    data(){
        return {
            cls:false,
            idx:[],
            cnames:'',
            cphone:'',
            flag:false,
            sure:false,
            success:false,
            cityShow:false,
            citydefault:'北京'
        }
    },
    components:{
        success,
        delog,
        phoneverify,
        citypage
    },
    computed:{
        ...mapState({
            lowpricedata:(state)=>{
                return state.shouye.lowpricedata
            }
        })
    },
    methods:{
        ...mapActions({
            getlowprice:'shouye/getlowprice'
        }),
        actives(ids){
            if(arr.indexOf(ids)!=-1){
                arr.splice(arr.indexOf(ids),1)
                this.idx=arr
            }else{
                arr.push(ids)
                this.idx=arr
            }
        },
        cnamesfn(e){
            this.cnames=e.target.value
        },
        cphonefn(e){
            this.cphone=e.target.value
        },
        ismask(){
            var nameReg = /^[\u4E00-\u9FA5]{2,4}$/;
            var phoneReg = /(^1[3|4|5|7|8|9]\d{9}$)|(^09\d{8}$)/
            if(nameReg.test(this.cnames)){
                this.sure=false
                if(phoneReg.test(this.cphone)){
                    this.flag=false
                }else{
                    this.flag=true
                }
            }else{
                this.sure=true
            }
            
            if(!this.sure && !this.flag){
                this.success=true
            }
        },
        namesverify(){
            this.sure=false
        },
        phoneverify(){
            this.flag=false
        },
        successful(){
            this.success=false
        },
        //去城市选择页
        citychoose(){
            this.cityShow=true
        }
    },
    mounted(){
        this.getlowprice({carId:this.$route.query.carId,cityId:'201'});
        eventBus.$on('getval',(state)=>{
            this.citydefault=state.val
            this.cityShow=state.flags;
            this.getlowprice({carId:this.$route.query.carId,cityId:state.cityId})
        })
    }
}
</script>
<style scoped>
    .loprice_wrap{
        width: 100%;
        background: #f4f4f4;
        height: 100%;
        overflow: hidden;
    }
    .loprice_box{
        width: 100%;
        background: #f4f4f4;
        height: 100%;
        overflow: hidden;
        overflow-y:scroll;        
    }
    .lowprice_top{
        width: 100%;
        display: flex;
        align-items: center;
        background: #fff;
        padding: .32rem .18rem .24rem;
        height: 2rem;
        box-sizing: border-box;
        position: relative;
    }
    .lowprice_top img{
        width: 2.3rem;
        height: 1.41rem;
        border: 1px solid #eee;
        box-sizing: border-box;
        border-radius: 5px;
    }
    .sanjiao::before{
        content: "";
        display: inline-block;
        padding-top: .16rem;
        padding-right: .16rem;
        border-top: 2px solid #ccc;
        border-right: 2px solid #ccc;
        -webkit-transform: rotate(45deg);
        transform: rotate(45deg);
        position: absolute;
        right: .26rem;
        top: .9rem;
    }
    .tip{
        height: .5rem;
        line-height: .5rem;
        padding: 0 .2rem;
        font-size: .24rem;
        color: #666;
        background: #eee;
    }
    .self-info ul {
        background: #fff;
        padding: 0 .2rem;
        list-style-type: none;
    }
    .self-info ul li span:nth-child(2) {
        display: inline-block;
        width: 88%;
        color: #555;
        text-align: right;
        box-sizing: border-box;
    }
    .self-info ul li span:nth-child(2):after {
        content: "";
        display: inline-block;
        padding-top: .16rem;
        padding-right: .16rem;
        border-top: 1px solid silver;
        border-right: 1px solid silver;
        -webkit-transform: rotate(45deg);
        transform: rotate(45deg);
    }
    .self-info ul li{
        font-size: .32rem;
        height: .88rem;
        line-height: .88rem;
        border-bottom: 1px solid #eee;
        box-sizing: border-box;
        color: #000;
    }
    .self-info ul li input{
        font-size: .32rem;
        padding-right: .2rem;
        width: 88%;
        text-align: right;
        box-sizing: border-box;
        color: #555;
        outline: none;
        -webkit-appearance: none;
        border: none;
    }
    .question{
        background: #fff;
        text-align: center;
        padding-top: .3rem;
        padding-bottom: .28rem;
    }
    .question button{
        font-size: .32rem;
        color: #fff;
        width: 80%;
        background: #3aacff;
        height: .7rem;
        border-radius: .1rem;
        outline: none;
        -webkit-appearance: none;
        border: none;
        padding: 1px 6px;
    }
    .dealer-info ul{
        background: #fff;
        padding: 0 .18rem;
    }
    .dealer-info ul li{
        position: relative;
        padding: .26rem 0 .26rem .54rem;
        border-bottom: 1px solid #eee;
        box-sizing: border-box;
        height: 1.65rem;
    }
    .dealer-info li:before{
        content: "";
        display: inline-block;
        width: .32rem;
        height: .32rem;
        border-radius: 50%;
        border: 2px solid #ccc;
        box-sizing: border-box;
        position: absolute;
        left: .05rem;
        top: 50%;
        -webkit-transform: translate3d(0,-50%,0);
        transform: translate3d(0,-50%,0);
    }
    .dealer-info li.active::before{
        background: #3aacff;
        border: none;
    }
    .dealer-info li.active::after{
        content: "";
        display: inline-block;
        padding-top: .17rem;
        padding-right: .1rem;
        border: 2px solid #fff;
        -webkit-transform: rotate(40deg) translate3d(0,-50%,0);
        transform: rotate(40deg) translate3d(0,-50%,0);
        position: absolute;
        left: .07rem;
        border-left: none;
        border-top: none;
        top: 47%;
    }
    .dealer-info li p:first-child {
        font-size: .3rem;
    }
    .dealer-info li p:nth-child(2) span:first-child {
        display: inline-block;
        max-width: 4.6rem;
        margin-top: .1rem;
        font-size: .24rem;
        color: #a2a2a2;
    }
    .dealer-info li p:first-child span:last-child {
        font-size: .24rem;
        float: right;
        color: red;
    }
    .dealer-info li p:nth-child(2) span:nth-child(2) {
        float: right;
    }
    .dealer-info li p:nth-child(2) {
        margin-top: .1rem;
        font-size: .24rem;
        color: #a2a2a2;
    }
</style>
