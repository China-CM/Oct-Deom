<template>
    <div class="imgbox">
        <div class="imgpagebox">
            <div class="imgpageboxtop">
                <p @click='getcolor'>颜色</p>
                <p>车款</p>
            </div>
            <div class="imgpagescroll">
                <div class="imgpagebottom">
                    <div class="imgpageboxlist" v-for="(item,key) in imgpagedata" :key="key">
                        <div class="imgpageboxlistdiv" v-for="(val,i) in item.List" :key="i" @click="goimgdetail(i,item.Id)" :class="i==0?'imgactive':''">
                            <div v-if="i==0"><p>{{item.Name}}</p><p>{{item.Count}}张></p></div>
                            <img @click="swiperbanner(i,item.Id)" :src='val.Url.slice(0,val.Url.length-7)+val.LowSize+".jpg"' />
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="swiperbanner" v-show="swipershow" @click="closebanner">
            <swiper :options='swiperOption' class="swiperbox" ref="mySwiper">
                <swiper-slide v-for="(item,index) in imgdetailtwo" :key='index'>
                    <img :data-src='item.Url.slice(0,item.Url.length-7)+item.LowSize+".jpg"' class="swiper-lazy"/>
                    <div class="swiper-lazy-preloader"></div>
                </swiper-slide>
            </swiper>
            <div class="bannernum">{{numindex*1+1}}/{{imgdetailtwo.length}}</div>
        </div>
        <imgdetail v-if="flag" :SerialID="SerialID" :ImageID="ImageID"/>
    </div>
</template>
<script>
import {mapState,mapActions} from 'vuex';
import {lazyLoad} from '@/utils/lazyLoad';
import {swiper,swiperSlide} from 'vue-awesome-swiper';
import imgdetail from '@/components/imgdetail';
export default {
    data(){
        return {
            flag:false,
            SerialID:0,
            ImageID:0,
            swipershow:false,
            newimgdataarr:[],
            numindex:0
        }
    },
    computed:{
        ...mapState({
            imgpagedata:(state)=>{
                // console.log(state.imgpage.imgpagedata)
                return state.imgpage.imgpagedata
            },
            imgdetailtwo:(state)=>{
                // console.log(state.imgdetail.imgdetailtwo)
                return state.imgdetail.imgdetailtwo
            },
            // imgpagedetaildata:(state)=>{
            //     // console.log(state.imgdetail.imgpagedata)
            //     return state.imgdetail.imgpagedata
            // },
            swiperOption(){
                let that=this
                return {
                    on:{
                        slideChange:function(){
                            // console.log(this.activeIndex,that.imgpagedetaildata.length-3)
                            // if(this.activeIndex>that.imgdetailtwo.length-3){
                            //     console.log(that.ImageID,'这里哟')
                            //     that.getimgdataTwo({
                            //         SerialID:that.$route.query.ids,
                            //         ImageID:6
                            //     })
                            // }
                            // console.log(this.activeIndex);
                            that.numindex=this.activeIndex
                        }
                    }
                    ,
                    observer:true,
                    lazy: {
                        loadPrevNext: true
                    }
                }
            },
            swiper(){
                return this.$refs.mySwiper.swiper
            }
        })
    },
    components:{
        imgdetail,
        swiper,
        swiperSlide
    },
    methods:{
        ...mapActions({
            imgpage:'imgpage/imgpage',
            getimgdataTwo:'imgdetail/getimgdataTwo'
        }),
        goimgdetail(index,ids){
            // console.log()
            if(index=='0'){
                this.flag=true
            }
            this.SerialID=this.$route.query.ids;
            this.ImageID=ids;
        },
        swiperbanner(i,ids){
            // console.log(ids,'这里')
            if(i!=0){
                this.swipershow=true;
                this.getimgdataTwo({
                    SerialID:this.$route.query.ids,
                    ImageID:ids
                })
            }
            this.numindex=i;
            this.swiper.slideTo(this.numindex,1000,false)
        },
        closebanner(){
            this.swipershow=false;
        },
        //去选择颜色
        getcolor(){
            this.$router.push({
                path:"/getcolorcar",
                query:{
                    SerialID:this.$route.query.ids
                }
            })
        }
    },
    mounted(){
        this.imgpage(this.$route.query.ids);
        // new swiper('.swiperbox',{
        //     on:{
        //         slideChange:()=>{
        //             numindex++;
        //         }
        //     },
        // })
    },
    updated(){
        lazyLoad('.imgpagescroll')
    }
}
</script>
<style scoped>
.imgbox{
    width: 100%;
    height: 100%;
    overflow: hidden;
}
.imgpagebox{
    width: 100%;
    height: 100%;
    overflow: hidden;
    display: flex;
    flex-direction: column;
    background-color: #eee;
}
.imgpageboxtop{
    width: 100%;
    display: flex;
    padding: .2rem 0;
    box-sizing: border-box;
    background: #fff;
}
.imgpageboxtop p{
    width: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
}
.imgpagescroll{
    width: 100%;
    overflow: hidden;
    overflow-y: scroll;
    margin-top: .2rem;
}
.imgpagebottom{
    width: 100%;
}
.imgpageboxlist{
    width: 100%;
}
.imgpageboxlistdiv{
    width: 31.3%;
    margin:0 1%;
    display: inline-block;
}
.imgpageboxlistdiv img{
    width: 100%;
    border: none;
}
.imgactive{
    position: relative;
}
.imgactive div{
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    background:rgba(0,0,0,0.1);
    color: #fff;
}
.swiperbanner{
    width: 100%;
    height: 100%;
    position: fixed;
    background: rgba(0,0,0,1);
    top: 0;left: 0;
    z-index: 99;
    color:#fff;
    display: flex;
    align-items: center;
    justify-content: center;
}
.swiperbanner img{
    width: 100%;
}
.bannernum{
    position: absolute;
    bottom: 5%;
    left: 50%;
    transform: translateX(-50%);
}
.swiperbanner{
touch-action: none;
}
.swiper-container{
    height: 4rem;
}
</style>
