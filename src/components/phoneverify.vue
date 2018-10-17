<template>
    <div class="alert "><div class="alert-content">
        <div class="wrap">
            <span class="alert-title-sub" id="subTitle"></span>
            <span class="alert-title">请输入正确的手机号</span>
            <span class="alert-ok" data-hover="hover" @click='ok'>好</span>
        </div>
    </div></div>
</template>
<script>
export default {
    methods:{
        ok(){
            this.$emit('phoneverify')
        }
    }
}
</script>
<style>
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
