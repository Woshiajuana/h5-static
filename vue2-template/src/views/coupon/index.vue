
<template>
    <wow-view :left-arrow="false" class="coupon-wrap">
        <h1>优惠卷</h1>
    </wow-view>
</template>

<script>
    export default {

    }
</script>

<style lang="scss" scoped>
    @import "src/assets/scss/define";
    .coupon-wrap {
        @extend %df;
        @extend %aic;
        @extend %jcc;
        @extend %fdc;
        font-size: j(78);
        background-color: #f242ff;
    }
</style>
