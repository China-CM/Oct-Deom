<template>
        <div class="color">
            <p data-hover="hover" @click="allcolorcar">全部颜色</p> 
            <div>
                <p class="c-type">
                    <span :class="years==index?'active':''" v-for="(item,index) in Object.keys(alldata).reverse()" :key='index' :data-index='index' @click="clickyear">
                        {{item}}
                    </span>
                </p> 
                <ul>
                    <li :data-id="item.ColorId" v-for="(item,index) in Object.values(alldata).reverse()[years]" :key='index' data-hover="hover">
                        <span :style='`background-color:${item.Value}`'></span>
                        {{item.Name}}
                    </li>
                    <!-- <li index="0" data-id="23110" data-hover="hover">
                        <span style="background-color: rgb(87, 27, 54);"></span>
                        阿格斯棕
                    </li>
                    <li index="1" data-id="4219" data-hover="hover">
                        <span style="background-color: rgb(248, 247, 243);"></span>
                        朱鹭白
                    </li> -->
                </ul>
            </div>
        </div>
</template>
<script>
import {mapState,mapActions} from 'vuex';
export default {
    data(){
        return{
            years:0
        }
    },
    computed:{
        ...mapState({
            alldata:(state)=>{
                return state.getcolordata.alldata
            }
        })
    },
    methods:{
        ...mapActions({
            requestcolordata:'getcolordata/requestcolordata'
        }),
        clickyear(e){
            // console.log(e.target.dataset.index)
            this.years=e.target.dataset.index
            
        },
        //回退所有颜色
        allcolorcar(){
            this.$router.back(-1)
        }
    },
    mounted(){
        this.requestcolordata(this.$route.query.SerialID)
    }
}
</script>
<style scoped>
.color{
    widows: 100%;
    height: 100%;
}
.color, .type {
    position: absolute;
    top: 0;
    z-index: 101;
    background: #f4f4f4;
    height: 100%;
    width: 100%;
    -webkit-animation: c .2s ease forwards;
    animation: c .2s ease forwards;
}
.color>p, .type>p {
    margin: .15rem 0;
    font-size: .34rem;
    color: #00afff;
    background: #fff;
    text-align: center;
    line-height: .8rem;
    height: .8rem;
}
.color .c-type, .type .c-type {
    margin-top: .15rem;
    padding-left: .2rem;
    font-size: .3rem;
    line-height: .76rem;
    height: .76rem;
    background: #fff;
    overflow-x: scroll;
    -webkit-overflow-scrolling: touch;
}
.color .c-type span.active, .type .c-type span.active {
    color: #00afff;
}
.color .c-type span, .type .c-type span {
    padding-right: .42rem;
}
.color .c-type, .type .c-type {
    margin-top: .15rem;
    padding-left: .2rem;
    font-size: .3rem;
    line-height: .76rem;
    height: .76rem;
    display: flex;
    flex-wrap: nowrap;
    background: #fff;
    overflow-x: scroll;
    -webkit-overflow-scrolling: touch;
}
.color .c-type span, .type .c-type span {
    padding-right: .42rem;
}
.color ul {
    margin-top: .15rem;
    padding: 0 .2rem;
    overflow: hidden;
    background: #fff;
}
.color ul li:nth-child(odd) {
    margin-right: .2rem;
}
.color ul li {
    float: left;
    width: 3.45rem;
    font-size: .32rem;
    line-height: .68rem;
    border: 1px solid #3aacff;
    box-sizing: border-box;
    margin: .2rem 0;
    border-radius: .05rem;
}
li, ul {
    list-style-type: none;
}
.color ul li {
    float: left;
    width: 3.45rem;
    font-size: .32rem;
    line-height: .68rem;
    border: 1px solid #3aacff;
    box-sizing: border-box;
    margin: .2rem 0;
    border-radius: .05rem;
}
.color ul li span {
    display: inline-block;
    width: .4rem;
    height: .4rem;
    margin-left: .2rem;
    vertical-align: -12%;
    box-sizing: border-box;
    border: 1px solid #818181;
}
</style>
