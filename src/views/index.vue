<template>
    <div class="box">
        <div class="wrap">
            <div class="lists">
                <div class="everycls" v-for="(item,index) in indexdatalists" :key="index" :ref='index'>
                    <p ref='val'>{{item.title}}</p>
                    <div class="bor">
                        <dl class="everydl" v-for="(v,i) in item.list" :key="i" @click='cardiv(v.MasterID)'>
                            <dt><img :data-src='v.CoverPhoto' :alt="item.Name"></dt>
                            <dd>{{v.Name}}</dd>
                        </dl>
                    </div>
                </div>
            </div>
            <div class="fixed" ref='fixed'>
                <div v-for="(item,index) in indexdatalists" @touchstart="starts(index)" @touchmove='moves' @touchend='touchends(index)' :key="index">
                    {{item.title}}
                </div>
            </div>
        </div> 
        
        <div id='clsdiv' ref='clsdiv' :class="cls" @touchstart='closestart' @touchmove='closemove' @touchend='closeend'>
            <div class="clsbox">
                <Car/>
            </div>
        </div>   
    </div>
</template>
<script>
import {mapState,mapActions} from 'vuex';
import Car from '../components/car';
import Betterscroll from 'better-scroll';
import {lazyLoad} from '@/utils/lazyLoad';
export default {
  name: 'Index',
  data(){
      return{
          cls:'car',
          startx:0,
          movex:0
      }
  },
  computed:{
      ...mapState({
          indexdatalists:(state)=>{
              return state.shouye.indexdatalists;
          }
      })
  },
  components:{
      Car
  },
  updated(){
      lazyLoad('.wrap')
        // console.log(this.indexdatalists)

        // this.fixedTop=this.$refs.fixed.getBoundingClientRect().top;
        // this.divheight=this.$refs.fixed.children[0].getBoundingClientRect().height;
  },
  methods:{
      ...mapActions({
          dispatch:'shouye/dispatch',
          carslists:'shouye/carslists'
      }),
      starts(index){
        this.fixedTop=this.$refs.fixed.getBoundingClientRect().top;
        this.divheight=this.$refs.fixed.children[0].getBoundingClientRect().height;
        // this.wraps.scrollToElement(this.$refs.val[index],100,true,0,0)
      },
      moves(e){
        let wrap=document.querySelector('.wrap')
        let whichIndex=Math.floor((e.touches[0].pageY-this.fixedTop)/this.divheight)
        if(whichIndex<0){
            whichIndex=0;
        }else if(whichIndex>this.indexdatalists.length-1){
            whichIndex=this.indexdatalists.length-1;
        }
        let letter=this.$refs[whichIndex][0].offsetTop;
        // console.log(letter)
        wrap.scrollTop=letter
      },
      touchends(){

      },
      cardiv(index){
          this.carslists(index)
          if(this.cls=='car'){
              this.cls='car donghua'
          }
          _hmt.push(['_trackEvent','汽车报价','tap','品牌点击'])
      },
      closestart(e){
          let startx=e.changedTouches[0].pageX;
          this.startx=startx
      },
      closemove(e){
        let movex=e.changedTouches[0].pageX
        this.movex=movex
      },
      closeend(){
        //   console.log(this.movex,this.startx)
          if(this.movex-this.startx>30){
              this.cls='car'
              this.movex=0;
              this.startx=0
          }
      }
  },
  mounted(){
    //   this.wraps=new Betterscroll('.wrap',{
    //       click:true
    //   })
    //   new Betterscroll('#clsdiv',{
    //       click:true
    //   })
      this.dispatch();
    //   console.log(this.indexdatalists)
  }
}
</script>
<style lang="scss">
    .clsbox{
        height: 100%;
        overflow: hidden;
        overflow-y: scroll;
    }
    .clsbox{
        width: 100%;
    }
    .car{
        width: 75%;
        height: 100%;
        position: fixed;
        left:100%;
        top: 0;
        z-index: 9;
        background-color: #fff;
        transition: left 1s;
        transition-timing-function:ease-in-out;
        overflow: hidden;
        overflow-y: scroll;
    }
    .donghua{
        left:30%;
    }
    .box{
        width: 100%;
        height: 100%;
        overflow: hidden;
    }
    .wrap{
        width: 100%;
        height: 100%;
        overflow-y: scroll;
    }
    .lists{
        width: 100%;
        
    }
    .everycls{
        width: 100%;
        
    }
    .everycls p{
        width: 100%;
        background: #ccc;
        padding: .1rem .4rem;
        box-sizing: border-box;
    }
    .bor{
        width: 100%;
        padding: 0 .5rem;
        box-sizing: border-box;
    }
    .everydl{
        padding: .1rem 0;
        box-sizing: border-box;
        width: 100%;
        display: flex;
        align-items: center;
        border-bottom: 1px solid #ccc;
    }
    .everydl dt img{
        width: .8rem;
    }
    .everydl dd{
        padding-left: .3rem;
        box-sizing: border-box;
    }
    .fixed{
        font-size: .24rem;
        position: fixed;
        right: 0;
        z-index: 3;
        top: 50%;
        transform: translateY(-50%);
    }
    .fixed div{
        font-size: 16px;
        width: .4rem;
        text-align: center;
        line-height: .4rem;
        height: .4rem;
    }
</style>
