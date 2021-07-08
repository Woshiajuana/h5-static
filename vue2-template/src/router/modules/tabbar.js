
export default [
    {
        path: '/',
        component: () => import(/* webpackChunkName: "main" */ 'src/views/main'),
        children: [
            {
                path: '',
                name: 'Home',
                component: () => import(/* webpackChunkName: "home" */ 'src/views/home'),
                meta: { depth: 1, title: 'router.home' },
            },
            {
                path: 'coupon',
                name: 'Coupon',
                component: () => import(/* webpackChunkName: "coupon" */ 'src/views/coupon'),
                meta: { depth: 1, title: 'router.coupon' },
            },
            {
                path: '/mine',
                name: 'Mine',
                component: () => import(/* webpackChunkName: "mine" */ 'src/views/mine'),
                meta: { depth: 1, title: 'router.mine' },
            },
        ]
    }
]
