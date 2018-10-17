<template>
    <div class="appbox">
        <router-view></router-view>
        <Loading/>
    </div>
</template>
<script>
import Loading from '@/components/loading.vue';
export default {
    name:'app',
    components:{
        Loading
    }
}
</script>

<style>
*{
    margin:0;
    padding:0;
    list-style-type: none;
}
html,body{
    width: 100%;
    height: 100%;
    font-size: .32rem;
}
.appbox{
    height: 100%;
}
</style>