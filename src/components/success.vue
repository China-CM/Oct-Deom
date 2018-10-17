<template>
    <div class="result">
        <div class="wraps">
            <img src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1539354541586&di=22a159341ed73d012719beeb603fbc82&imgtype=0&src=http%3A%2F%2Fimgsrc.baidu.com%2Fimgad%2Fpic%2Fitem%2Fb812c8fcc3cec3fdaa7af852dd88d43f87942754.jpg">
             <p>询价成功</p> 
             <p>
                 稍后有专业汽车顾问为你服务<br>
                 请保持手机畅通
             </p> 
             <div>
                 <button data-hover="hover" @click="ok">确定</button>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    methods:{
        ok(){
            this.$emit('success')
        }
    }
}
</script>
<style lang>
.result {
    position: fixed;
    z-index: 101;
    top: 0;
    width: 100%;
    height: 100%;
    text-align: center;
    background: rgba(0,0,0,.5);
    display: -webkit-box;
    display: flex;
    -webkit-box-align: center;
    align-items: center;
    -webkit-box-pack: center;
    justify-content: center;
}
.result .wraps {
    -webkit-animation: e .3s ease forwards;
    animation: e .3s ease forwards;
    height: auto;
    background: #fff;
    border-radius: .2rem;
    padding: .3rem .3rem 0;
    text-align: center;
    display: inline-block;
    width: 76%;
    overflow: hidden;
}
.result img:first-child {
    width: .8rem;
    display: block;
    margin: 0 auto .3rem;
}
img{
    border: none;
}
.result p:nth-child(2) {
    font-size: .4rem;
    color: #3cc144;
    margin: .1rem;
}
.result p {
    display: block;
    margin-block-start: 1em;
    margin-block-end: 1em;
    margin-inline-start: 0px;
    margin-inline-end: 0px;
}
.result p:nth-child(3) {
    font-size: .24rem;
    color: silver;
    margin: .15rem;
}
.result .wraps div {
    width: 120%;
    margin-left: -10%;
    height: .8rem;
    margin-top: .3rem;
    border-top: 1px solid #f4f4f4;
}
.result .wraps div button:last-child {
    box-sizing: border-box;
    color: #3aacff;
}
.result .wrap div button {
    border: none;
    width: 50%;
    background: transparent;
    font-size: .3rem;
    line-height: .8rem;
    padding: 0;
    color: silver;
}
button, input {
    outline: none;
    -webkit-appearance: none;
    border: none;
}
.result .wraps div button:last-child {
    box-sizing: border-box;
    color: #3aacff;
}
.result .wraps div button {
    border: none;
    width: 50%;
    background: transparent;
    font-size: .3rem;
    line-height: .8rem;
    padding: 0;
    color: silver;
}
</style>
