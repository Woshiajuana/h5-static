import Vue from 'vue'
import VueRouter from 'vue-router'
import { loadLanguageAsync } from 'src/locale'

Vue.use(VueRouter);

const routes = (s => [
    ...s.keys().map(k => s(k).default).flat(),
    {
        path: '*',
        redirect: '/',
    },
])(require.context('./modules/', true, /\.js$/));

const router = new VueRouter({
    mode: 'hash',
    base: process.env.BASE_URL,
    routes,
});

router.beforeEach((to, from, next) => {
    loadLanguageAsync(undefined, to.meta).then(() => next());
});

export default router
