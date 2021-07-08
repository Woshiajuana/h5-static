
<template>
    <van-empty
        class="wow-super-box"
        :image="error ? 'error' : 'default'"
        :description="error ? error : loading ? '' : $t('emptyText')">
        <template v-if="loading && !error" #image>
            <van-loading
                class="wow-super-loading"
                vertical
                size="40"
            ></van-loading>
        </template>
        <van-button
            v-if="error"
            @click="$emit('refresh')"
            round
            type="danger"
            class="wow-super-button"
        >{{ $t('retryText') }}</van-button>
    </van-empty>
</template>

<script>
    import { Empty as VanEmpty, Button as VanButton, Loading as VanLoading } from 'vant'

    export default {
        i18n: {
            messages: {
                'zh-CN': {
                    emptyText: '空空如也',
                    retryText: '刷新一下',
                    loadingText: '加载中',
                },
                'en-US': {
                    emptyText: 'Nothing...',
                    retryText: 'Try again',
                    loadingText: 'Loading',
                },
            }
        },
        props: {
            loading: { default: true },
            error: { default: '' },
        },
        components: {
            VanEmpty,
            VanLoading,
            VanButton,
        }
    }
</script>

<style lang="scss">
    @import "src/assets/scss/define";
    .wow-super-box{
        @extend %w100;
        @extend %df;
        @extend %aic;
        @extend %jcc;
        height: 66.6%;
        min-height: j(1000);
        .van-empty__image{
            @extend %df;
            @extend %aic;
            @extend %jcc;
        }
    }
    .wow-super-loading{
        @extend %df;
        @extend %aic;
        @extend %jcc;
        @extend %h100;
        @extend %ma;
        width: j(100);
        height: j(100);
        color: #fff;
        padding: j(20);
        border-radius: j(20);
        background-color: rgba(0, 0, 0, .5);
    }
    .wow-super-button {
        width: 160px;
        height: 40px;
    }
</style>
