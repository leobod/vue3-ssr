import {
    createRouter as createVueRouter,
    createMemoryHistory,
    createWebHistory
} from 'vue-router'

export const createRouter = (type) =>
    createVueRouter({
        history: type === 'client' ? createWebHistory() : createMemoryHistory(),
        routes: [
            {
                path: '/page1',
                name: 'page1',
                meta: {
                    title: 'page1',
                    keepAlive: true,
                    requireAuth: true
                },
                component: () => import('../pages/page1.vue')
            },
            {
                path: '/page2',
                name: 'page2',
                meta: {
                    title: 'page2',
                    keepAlive: true,
                    requireAuth: false
                },
                component: () => import('../pages/page2.vue')
            },
            {
                path: '/page3',
                name: 'page3',
                meta: {
                    title: 'page3',
                    keepAlive: true,
                    requireAuth: true
                },
                component: () => import('../pages/page3.vue')
            }
        ]
    });
