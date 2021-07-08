
<template>
    <wow-view :left-arrow="false">
        <h1>{{$t('home.title')}}</h1>
        <br/>
        <van-button></van-button>
    </wow-view>
</template>

<script>
    import { Button as VanButton } from 'vant'
    export default {
        methods: {
            handleSwitch () {

            }
        },
        components: {
            VanButton,
        }
    }
</script>

<style lang="scss">
    @import "src/assets/scss/define";
</style>
