
<template>
    <van-pull-refresh
        class="wow-scroll"
        v-model="refreshing"
        :pulling-text="$t('pullingText')"
        :loosing-text="$t('loosingText')"
        :loading-text="$t('loadingText')"
        :success-text="refreshErrorText ||$t('successText')"
        @refresh="handleRefresh">
        <van-list
            ref="list"
            v-model="loading"
            :finished="finished"
            :finished-text="$t('finishedText')"
            :loading-text="$t('loadingText')"
            :error.sync="loadError"
            :error-text="loadErrorText"
            @load="handleLoad">
            <slot></slot>
        </van-list>
    </van-pull-refresh>
</template>

<script>
    import { List as VanList, PullRefresh as VanPullRefresh } from 'vant'
    export default {
        i18n: {
            messages: {
                'zh-CN': {
                    pullingText: '↓ 下拉即可刷新',
                    loosingText: '↑ 释放即可刷新',
                    loadingText: '加载中...',
                    successText: '刷新成功',
                    finishedText: '没有更多了',
                    retryText: '，点击重新加载'
                },
                'en-US': {
                    pullingText: '↓ Pulling',
                    loosingText: '↑ Loosing',
                    loadingText: 'Loading...',
                    successText: 'Success',
                    finishedText: 'No more',
                    retryText: '，Try again'
                },
            }
        },
        data () {
            return {
                refreshing: false,
                refreshErrorText: '',
                loading: false,
                loadError: false,
                loadErrorText: '',
            }
        },
        props: {
            finished: { type: Boolean, default: false },
        },
        methods: {
            handleLoad () {
                this.$emit('load', err => {
                    this.loadError = !!err;
                    this.loadErrorText = err ? `${err}${this.$t('retryText')}` : '';
                    this.loading = false;
                });
            },
            handleRefresh () {
                this.$emit('refresh', err => {
                    this.refreshErrorText = err || '';
                    this.refreshing = false;
                    this.loadError = false;
                    this.loadErrorText = '';
                    this.$refs.list.check();
                });
            },
        },
        components: {
            VanList,
            VanPullRefresh,
        }
    }
</script>

<style lang="scss" scoped>
    @import "src/assets/scss/define";
    .wow-scroll{
        @extend %df1;
        @extend %h100;
        height: j(300);
        overflow-y: auto;
        .van-list{
            @extend %h100;
        }
    }
</style>
