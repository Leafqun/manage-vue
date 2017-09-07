<template>
    <div id="wrapper">
        <_header></_header>
        <_sidebar></_sidebar>
        <div class="main">
            <router-view></router-view>
        </div>
    </div>
</template>

<script>
    import _header from './header.vue'
    import _sidebar from './sidebar.vue'
    export default {
        data() {
            return {
                a: 'a'
            }
        },
        components:{
            _header,
            _sidebar
        }
    }
</script>

<style >

</style>