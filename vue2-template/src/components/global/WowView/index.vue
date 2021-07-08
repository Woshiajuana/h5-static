
<template>
    <div>
        <van-nav-bar
            fixed
            placeholder
            :title="title || $t($route.meta.title)"
            :left-arrow="leftArrow"
            @click-left="handleLeft"
            @click-right="$emit('right')"
        ></van-nav-bar>
        <slot></slot>
    </div>
</template>

<script>
    import { NavBar as VanNavBar } from 'vant'
    export default {
        props: {
            title: { default: '' },
            useLeftEvent: { type: Boolean, default: true },
            leftArrow: { type: Boolean, default: true },
        },
        methods: {
            handleLeft () {
                this.$emit('left', () => this.$router.go(-1));
                if (this.useLeftEvent) {
                    this.$router.go(-1);
                }
            },
        },
        components: {
            VanNavBar
        }
    }
</script>
