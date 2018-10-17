<template>
    <div class="alert "><div class="alert-content">
        <div class="wraps">
            <span class="alert-title-sub" id="subTitle"></span>
            <span class="alert-title">请输入真实的中文姓名</span>
            <span class="alert-ok" data-hover="hover" @click='ok'>好</span>
        </div>
    </div></div>    
</template>
<script>
export default {
    methods:{
        ok(){
            this.$emit('namesverify')
        }
    }   
}
</script>
<style lang>
.alert{
    width: 100%;
    height: 100%;
    overflow: hidden;
    position: fixed;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    z-index: 1000;
    background-color: rgba(0,0,0,.4);
    -webkit-animation: a .3s ease forwards;
    animation: a .3s ease forwards;
}
.alert .alert-content {
    position: fixed;
    z-index: 9999;
    background: #f6f6f6;
    border-radius: 7px;
    width: 72%;
    left: 50%;
    top: 50%;
    -webkit-transform: translate(-50%,-50%);
    transform: translate(-50%,-50%);
    -webkit-transform-origin: 50% 50%;
    transform-origin: 50% 50%;
    text-align: center;
    font-size: 0;
}
.wraps{
    overflow-y: scroll;
    height: 100%;
}
.alert .alert-content .alert-title-sub {
    display: block;
    width: 80%;
    margin: 0 auto;
    padding: 18px 0 6px;
    line-height: 22px;
    font-size: 16px;
    font-weight: 700;
}
.alert .alert-content .alert-title {
    display: block;
    margin: 0 auto;
    padding: 0 0 20px;
    max-width: 86%;
    line-height: 16px;
    font-size: 13px;
}
.alert .alert-content .alert-ok {
    position: relative;
    display: block;
    width: 100%;
    padding: 14px 0;
    border-radius: 0 0 7px 7px;
    line-height: 16px;
    font-size: 16px;
    color: #007aff;
    transition: background-color .1s;
}
.alert .alert-content .alert-ok:before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    border-bottom: 1px solid #c8c7cc;
    -webkit-transform: scaleY(.5);
    transform: scaleY(.5);
    -webkit-transform-origin: 0 0;
    transform-origin: 0 0;
}
</style>
