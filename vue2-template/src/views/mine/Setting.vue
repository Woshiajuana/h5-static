
<template>
    <wow-view>
        <van-cell-group>
            <van-cell :title="$t('setting.translations')" :value="computeTranslations.name" is-link @click="show = true"/>
        </van-cell-group>
        <van-button type="primary">切换主题</van-button>
        <div class="test-button">
            <span class="test-button-text">哈哈</span>
        </div>
        <van-action-sheet
            v-model="show"
            :actions="computedLangOptions"
            @select="handleSelect"
            :cancel-text="$t('setting.cancel')"
            close-on-click-action
        ></van-action-sheet>
    </wow-view>
</template>

<script>
    import { Cell as VanCell, CellGroup as VanCellGroup, ActionSheet as VanActionSheet, Button as VanButton } from 'vant'
    export default {
        data() {
            return {
                show: false,
            };
        },
        computed: {
            computedLangOptions () {
                const { langOptions } = this.$i18n;
                return langOptions;
            },
            computeTranslations () {
                const { locale } = this.$i18n;
                return this.computedLangOptions.find(item => item.value === locale);
            },
        },
        methods: {
            handleSelect (item) {
                const { value } = item;
                this.$i18n.loadLanguageAsync(value, this.$route.meta);
            }
        },
        components: {
            VanCell,
            VanButton,
            VanCellGroup,
            VanActionSheet,
        }
    }
</script>

<style lang="scss">
    @import "src/assets/scss/define";
    .test-button{
        @extend %df;
        @extend %aic;
        @extend %jcc;
        @extend %bsb;
        width: j(200);
        height: j(50);
        margin: j(20);
        border: 1px solid red;
    }
    @include b(human) {
        padding: j(20);
        background-color: red;
        @include e(finger) {
            padding: j(20);
            background-color: #42bdff;
            @include m(little) {
                padding: j(20);
                background-color: #ffa442;
            }
        }
    }
</style>
