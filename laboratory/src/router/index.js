import VueRouter from "vue-router";

const router = new VueRouter({
    routes: [
        {
            path: '/',
            component: () => import('../views'),
            redirect: {
                path: '/home'
            },
            children: [
                {
                    path: '/home',
                    name: 'home',
                    component: () => import('../views/Home/index.vue')
                }
            ]
        }
    ]
})

export default router