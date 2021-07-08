
// 注册全局组件
export default {
    install (Vue) {
        (s => {
            s.keys().forEach(key => {
                const componentName = key.substring(2, key.indexOf('/index.vue'));
                Vue.component(componentName, s(key).default || s(key));
            });
        })(require.context('src/components/global', true, /.vue$/))
    }
}
