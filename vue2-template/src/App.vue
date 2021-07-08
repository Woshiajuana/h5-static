<template>
    <div id="app">
        <!--主体内容视图-->
        <transition :name="transitionName">
<!--            <keep-alive>-->
            <router-view class="view-wrap" :key="$route.path"></router-view>
<!--            </keep-alive>-->
        </transition>
    </div>
</template>

<script>
    import TransitionMixin from 'src/mixins/transition'
    export default {
        mixins: [
            TransitionMixin,
        ],
    }
</script>

<style lang="scss">
    @import "src/assets/scss/base";
    html,
    body{
        @extend %h100;
        @extend %w100;
        @extend %oh;
    }
    #app{
        @extend %w100;
        @extend %h100;
    }
    .view-wrap{
        @extend %pa;
        @extend %t0;
        @extend %l0;
        @extend %r0;
        @extend %b0;
        overflow-y: auto;
    }
    .view-flex{
        @extend %df;
        @extend %df1;
        @extend %fdc;
        @extend %oh;
    }
    .view-flex1{
        @extend %df1;
    }
    .c-van-tabs{
        @extend %df;
        @extend %df1;
        @extend %fdc;
        @extend %oh;
        .van-tabs__content{
            @extend %df1;
            @extend %oh;
            .van-tab__pane{
                @extend %h100;
                .view-flex{
                    @extend %h100;
                }
            }
        }
    }
</style>
