
<template>
    <wow-view
        class="mine-wrap"
        :left-arrow="false">

        <div class="section-card">
            <div class="section-head">
                <h2>我的订单</h2>
                <router-link to="/order" class="order-link">
                    <span>全部订单</span>
                    <i class="c-arrow right"></i>
                </router-link>
            </div>
            <van-grid :border="false" :column-num="3">
                <van-grid-item icon="completed" text="已完成"/>
                <van-grid-item icon="todo-list-o" text="代付款"/>
                <van-grid-item icon="newspaper-o" text="退换货"/>
            </van-grid>
        </div>

        <div class="section-card">
            <div class="section-head">
                <h2>其他服务</h2>
            </div>
            <van-grid :border="false">
                <van-grid-item icon="shop-o" text="商家入驻"/>
                <van-grid-item icon="location-o" text="我的地址"/>
                <van-grid-item icon="question-o" text="常见问题"/>
                <van-grid-item icon="description" text="反馈"/>
                <van-grid-item icon="service-o" text="在线客服"/>
                <van-grid-item icon="setting-o"  text="设置" to="/setting"/>
            </van-grid>
        </div>

    </wow-view>
</template>

<script>
    import { Grid as VanGrid, GridItem as VanGridItem } from 'vant'
    export default {
        components: {
            VanGrid,
            VanGridItem,
        }
    }
</script>

<style lang="scss" scoped>
    @import "src/assets/scss/define";
    .mine-wrap{
        background: #f2f2f2;
    }
    .section-card{
        @extend %oh;
        padding-top: j(10);
        margin: j(32);
        border-radius: j(20);
        background: #fff;
    }
    .section-head{
        @extend %df;
        @extend %aic;
        @extend %jcs;
        height: j(80);
        padding: 0 j(32);
        h2{
            font-size: j(28);
        }
    }
    .order-link{
        @extend %df;
        @extend %aic;
        color: #999;
    }
</style>
