
export default {
    data () {
        return {
            transitionName: '',
        }
    },
    watch: {
        '$route' (to, from) {
            const { depth: toDepth } = to.meta;
            const { depth: fromDepth = toDepth } = from.meta;
            this.transitionName = toDepth === fromDepth
                ? '' : toDepth > fromDepth ? 'vux-pop-in' : 'vux-pop-out';
        }
    }
}
