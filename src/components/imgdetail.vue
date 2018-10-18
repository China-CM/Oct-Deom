<template>
    <div class="detailbox" @scroll="scroll">
        <div class="detailimg" ref="detailbox">
            <div v-for="(item,index) in imgpagedata" :key='index' @click="swiperimg">
                <img :src='item.Url.slice(0,item.Url.length-7)+item.HighSize+".jpg"'/>
            </div>
        </div>
    </div>
</template>
<script>
import {mapState,mapActions} from 'vuex';
import {lazyLoad} from '@/utils/lazyLoad';
export default {
    props:['SerialID','ImageID'],
    computed:{
        ...mapState({
            imgpagedata:(state)=>{
                return state.imgdetail.imgpagedata
            }
        })
    },
    methods:{
        ...mapActions({
            getimgdata:'imgdetail/getimgdata'
        }),
        scroll(e){
            let height=this.$refs.detailbox.getBoundingClientRect().height;
            if(e.target.scrollTop>((height-window.innerHeight)-20)){
                this.getimgdata({
                    SerialID:this.SerialID,
                    ImageID:this.ImageID
                })
            }
        },
        swiperimg(){
            
        }
    },
    mounted(){
        console.log(this.SerialID)
        this.getimgdata({
            SerialID:this.SerialID,
            ImageID:this.ImageID
        })
    },
    updated(){
        lazyLoad('.detailbox')
    }
}
</script>
<style scoped>
.detailbox{
    width: 100%;
    height: 100%;
    position: fixed;
    top: 0;
    left: 0;
    overflow: hidden;
    overflow-y:scroll;
    background-color: #eee;
}
.detailimg{
    width: 100%;
}
.detailimg div{
    display: inline-block;
    width: 31.3%;
    margin:0 1%;
}
.detailimg div img{
    width: 100%;
}
</style>
